import React, { useEffect, useRef } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

const room_locations = [
  { lat: 49.26245880126953, lng: -123.24458312988281 },
  { lat: 49.26246538789983, lng: -123.2448949967859 },
]

export const GoogleMapsWrapper = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>
  }

  return (
    <Wrapper apiKey={apiKey}>
      <GoogleMaps locations={room_locations} />
    </Wrapper>
  )
}

const DEFAULT_CENTER = { lat: 49.26245880126953, lng: -123.24458312988281 }
const DEFAULT_ZOOM = 18

export const GoogleMaps = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
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

  return <div ref={ref} style={{ width: '1000px', height: '700px' }} />
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
