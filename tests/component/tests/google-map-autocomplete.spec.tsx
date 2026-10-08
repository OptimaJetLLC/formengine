import {act, render, waitFor} from '@testing-library/react'
import {PlaceAutocomplete} from '../../../packages/views/google-map/src/AutoComplete'

const mocks = vi.hoisted(() => ({
  places: null as google.maps.PlacesLibrary | null,
}))

vi.mock('@vis.gl/react-google-maps', () => ({
  useMapsLibrary: () => mocks.places,
}))

class MockPlaceAutocompleteElement extends HTMLElement {
  placeholder: string | null = null
}

if (!customElements.get('test-place-autocomplete')) {
  customElements.define('test-place-autocomplete', MockPlaceAutocompleteElement)
}

const createPlace = (overrides: Partial<{fetchFields: ReturnType<typeof vi.fn>}> = {}) => {
  const location = {toJSON: () => ({lat: -33.8568, lng: 151.2153})} as google.maps.LatLng
  const viewport = {} as google.maps.LatLngBounds
  const fetchFields = overrides.fetchFields ?? vi.fn().mockResolvedValue(undefined)

  return {
    place: {
      addressComponents: [
        {
          longText: 'Bennelong Point',
          shortText: 'Bennelong Point',
          types: ['route'],
        },
      ],
      displayName: 'Sydney Opera House',
      fetchFields,
      formattedAddress: 'Bennelong Point, Sydney NSW 2000, Australia',
      id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
      location,
      viewport,
    } as unknown as google.maps.places.Place,
    fetchFields,
    location,
    viewport,
  }
}

const dispatchPlaceSelect = (autocomplete: Element | null, place: google.maps.places.Place) => {
  const event = new Event('gmp-select')
  Object.defineProperty(event, 'placePrediction', {
    value: {toPlace: () => place},
  })
  autocomplete?.dispatchEvent(event)
}

describe('Google map place autocomplete', () => {
  beforeEach(() => {
    mocks.places = {
      PlaceAutocompleteElement: MockPlaceAutocompleteElement,
    } as unknown as google.maps.PlacesLibrary
  })

  it('uses the new Places widget and returns the Place after fetchFields', async () => {
    const {place, fetchFields} = createPlace()
    const onPlaceSelect = vi.fn()

    const {container} = render(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Search for a place" />)
    const autocomplete = container.querySelector('test-place-autocomplete')

    expect(autocomplete).toBeInstanceOf(MockPlaceAutocompleteElement)
    expect((autocomplete as MockPlaceAutocompleteElement).placeholder).toBe('Search for a place')

    dispatchPlaceSelect(autocomplete, place)

    await waitFor(() => {
      expect(fetchFields).toHaveBeenCalledWith({
        fields: ['addressComponents', 'displayName', 'formattedAddress', 'location', 'viewport'],
      })
      expect(onPlaceSelect).toHaveBeenCalledWith(place)
    })
  })

  it('notifies onError when fetchFields fails and does not call onPlaceSelect', async () => {
    const error = new Error('Places API (New) is not enabled')
    const {place, fetchFields} = createPlace({
      fetchFields: vi.fn().mockRejectedValue(error),
    })
    const onPlaceSelect = vi.fn()
    const onError = vi.fn()

    const {container} = render(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} onError={onError} />)
    dispatchPlaceSelect(container.querySelector('test-place-autocomplete'), place)

    await waitFor(() => {
      expect(fetchFields).toHaveBeenCalled()
      expect(onError).toHaveBeenCalledWith(error)
    })
    expect(onPlaceSelect).not.toHaveBeenCalled()
  })

  it('forwards gmp-error events to onError', () => {
    const onPlaceSelect = vi.fn()
    const onError = vi.fn()

    const {container} = render(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} onError={onError} />)
    const autocomplete = container.querySelector('test-place-autocomplete')
    const errorEvent = new Event('gmp-error')
    autocomplete?.dispatchEvent(errorEvent)

    expect(onError).toHaveBeenCalledWith(errorEvent)
    expect(onPlaceSelect).not.toHaveBeenCalled()
  })

  it('keeps the same Places widget when the selection callback identity changes', () => {
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()

    const {container, rerender} = render(<PlaceAutocomplete onPlaceSelect={firstCallback} placeholder="Search" />)
    const autocompleteBefore = container.querySelector('test-place-autocomplete')

    expect(autocompleteBefore).toBeInstanceOf(MockPlaceAutocompleteElement)

    rerender(<PlaceAutocomplete onPlaceSelect={secondCallback} placeholder="Search" />)
    const autocompleteAfter = container.querySelector('test-place-autocomplete')

    expect(autocompleteAfter).toBe(autocompleteBefore)
    expect(container.querySelectorAll('test-place-autocomplete')).toHaveLength(1)
  })

  it('delivers a pending selection to the latest callback after the callback identity changes', async () => {
    let resolveFetch: (() => void) | undefined
    const fetchFields = vi.fn(
      () =>
        new Promise<void>(resolve => {
          resolveFetch = resolve
        })
    )
    const {place} = createPlace({fetchFields})
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()

    const {container, rerender} = render(<PlaceAutocomplete onPlaceSelect={firstCallback} />)
    const autocomplete = container.querySelector('test-place-autocomplete')

    dispatchPlaceSelect(autocomplete, place)
    expect(fetchFields).toHaveBeenCalledTimes(1)

    rerender(<PlaceAutocomplete onPlaceSelect={secondCallback} />)
    expect(container.querySelector('test-place-autocomplete')).toBe(autocomplete)

    await act(async () => {
      resolveFetch?.()
    })

    await waitFor(() => {
      expect(secondCallback).toHaveBeenCalledWith(place)
    })
    expect(firstCallback).not.toHaveBeenCalled()
  })

  it('does not notify the callback after unmount while fetchFields is pending', async () => {
    let resolveFetch: (() => void) | undefined
    const fetchFields = vi.fn(
      () =>
        new Promise<void>(resolve => {
          resolveFetch = resolve
        })
    )
    const {place} = createPlace({fetchFields})
    const onPlaceSelect = vi.fn()

    const {container, unmount} = render(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} />)
    dispatchPlaceSelect(container.querySelector('test-place-autocomplete'), place)
    expect(fetchFields).toHaveBeenCalledTimes(1)

    unmount()

    await act(async () => {
      resolveFetch?.()
    })

    expect(onPlaceSelect).not.toHaveBeenCalled()
  })

  it('updates the widget placeholder without recreating the element', () => {
    const onPlaceSelect = vi.fn()
    const {container, rerender} = render(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Search" />)
    const autocompleteBefore = container.querySelector('test-place-autocomplete') as MockPlaceAutocompleteElement

    expect(autocompleteBefore.placeholder).toBe('Search')

    rerender(<PlaceAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Find a place" />)
    const autocompleteAfter = container.querySelector('test-place-autocomplete') as MockPlaceAutocompleteElement

    expect(autocompleteAfter).toBe(autocompleteBefore)
    expect(autocompleteAfter.placeholder).toBe('Find a place')
  })
})
