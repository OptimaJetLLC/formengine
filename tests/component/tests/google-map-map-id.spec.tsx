import {render, screen} from '@testing-library/react'
import type {ComponentProps, ReactNode} from 'react'
import {DEMO_MAP_ID} from '../../../packages/views/google-map/src/constants'
import {GoogleMapRenderer} from '../../../packages/views/google-map/src/GoogleMapRenderer'

type GoogleMapRendererProps = ComponentProps<typeof GoogleMapRenderer>

vi.mock('@react-form-builder/core', async importOriginal => {
  const actual = await importOriginal<typeof import('@react-form-builder/core')>()
  return {
    ...actual,
    useComponentData: () => ({field: undefined}),
  }
})

vi.mock('@vis.gl/react-google-maps', () => ({
  Map: ({mapId, children}: {mapId?: string; children?: ReactNode}) => (
    <div data-testid="google-map" data-map-id={mapId ?? ''}>
      {children}
    </div>
  ),
  MapControl: ({children}: {children?: ReactNode}) => <>{children}</>,
  useMap: () => null,
  useMapsLibrary: () => null,
}))

vi.mock('../../../packages/views/google-map/src/useGeocoding', () => ({
  useGeocoding: () => vi.fn().mockResolvedValue(undefined),
}))

vi.mock('../../../packages/views/google-map/src/Markers', () => ({
  Markers: () => null,
}))

vi.mock('../../../packages/views/google-map/src/CustomMapControl', () => ({
  CustomMapControl: () => null,
}))

const baseProps = {
  latitude: -33.86,
  longitude: 151.2,
  zoom: 13,
  mapTypeId: 'roadmap',
  showMapControl: false,
  mapControlPosition: 2 as GoogleMapRendererProps['mapControlPosition'],
  addMarkerOnSearch: false,
  allowMultipleMarkers: false,
  allowChangingMarkers: false,
  markerWindowTitle: 'Marker',
  removeMarkerCaption: 'Delete marker',
} satisfies GoogleMapRendererProps

describe('Google map mapId demo fallback', () => {
  it('falls back to Google DEMO_MAP_ID when mapId is empty', () => {
    render(<GoogleMapRenderer {...baseProps} mapId="" />)

    expect(screen.getByTestId('google-map')).toHaveAttribute('data-map-id', DEMO_MAP_ID)
    expect(DEMO_MAP_ID).toBe('DEMO_MAP_ID')
  })

  it('falls back to Google DEMO_MAP_ID when mapId is omitted', () => {
    render(<GoogleMapRenderer {...baseProps} />)

    expect(screen.getByTestId('google-map')).toHaveAttribute('data-map-id', DEMO_MAP_ID)
  })

  it('preserves an explicit production mapId', () => {
    render(<GoogleMapRenderer {...baseProps} mapId="production-map-id" />)

    expect(screen.getByTestId('google-map')).toHaveAttribute('data-map-id', 'production-map-id')
  })
})
