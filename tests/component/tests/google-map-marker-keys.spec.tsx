import {googleMapModel} from '@react-form-builder/components-google-map'
import type {ComponentData} from '@react-form-builder/core'
import {createView} from '@react-form-builder/core'
import {act} from '@testing-library/react'
import type {ReactNode} from 'react'
import {renderForm} from '../util/renderForm'

vi.mock('@vis.gl/react-google-maps', async () => {
  const {forwardRef} = await import('react')
  const Container = ({children}: {children?: ReactNode}) => <div>{children}</div>
  return {
    APIProvider: Container,
    Map: Container,
    MapControl: Container,
    InfoWindow: Container,
    AdvancedMarker: forwardRef<HTMLDivElement, {title?: string}>(({title}, ref) => (
      <div ref={ref} data-testid="map-marker">
        {title}
      </div>
    )),
    useAdvancedMarkerRef: () => [() => {}, null],
    useMap: () => null,
    useMapsLibrary: () => null,
  }
})

const view = createView([googleMapModel])
const createForm = (markers: object[]) => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'map',
        type: 'GoogleMap',
        props: {
          apiKey: {value: 'test-key'},
          showMapControl: {value: false},
          markers: {value: markers},
        },
      },
    ],
  },
})

describe('Google map marker keys', () => {
  it('renders repeated input IDs without duplicate-key errors', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const form = createForm([
        {id: 'shared', position: {lat: 1, lng: 1}, title: 'First'},
        {id: 'shared', position: {lat: 2, lng: 2}, title: 'Second'},
      ])
      const {findAllByTestId} = renderForm(form, {view})

      expect(await findAllByTestId('map-marker')).toHaveLength(2)
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })

  it('keeps marker instances mounted when ID-less input data is updated', async () => {
    const form = createForm([
      {position: {lat: 1, lng: 1}, title: 'First'},
      {position: {lat: 2, lng: 2}, title: 'Second'},
    ])
    const {findAllByTestId, getAllByTestId, formData} = renderForm(form, {view})
    const originalMarkers = await findAllByTestId('map-marker')
    const map = (formData as ComponentData).findByKey('map')!

    act(() => {
      map.setUserDefinedProp('markers', [
        {position: {lat: 1, lng: 1}, title: 'Edited'},
        {position: {lat: 2, lng: 2}, title: 'Second'},
      ])
    })

    const updatedMarkers = getAllByTestId('map-marker')
    expect(updatedMarkers[0]).toHaveTextContent('Edited')
    expect(updatedMarkers[0]).toBe(originalMarkers[0])
    expect(updatedMarkers[1]).toBe(originalMarkers[1])
  })
})
