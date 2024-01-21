import './maps.scss'
import React, { useEffect, useRef } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { proxy } from 'valtio'

export const GoogleMapsWrapper = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>
}) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>
  }

  return (
    <Wrapper apiKey={apiKey}>
      <GoogleMaps locations={locations} />
    </Wrapper>
  )
}

const DEFAULT_CENTER = { lat: 49.26245880126953, lng: -123.24458312988281 }
const DEFAULT_ZOOM = 18

export let map = proxy<google.maps.Map>()

export const GoogleMaps = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Display the map
    if (ref.current) {
      map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,

        // Remove unnecessary points of interest
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      // Displays single markers on map when called
      addSingleMarkers({ locations, map })
    }
  }, [ref, locations])

  return <div ref={ref} className='google-maps-rooms' />
}

export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>
  map: google.maps.Map | null | undefined
}) => {
  return locations.map(
    position =>
      new google.maps.Marker({
        position,
        map,
      })
  )
}
