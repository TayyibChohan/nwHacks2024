import React from 'react'
import { useEffect, useRef } from 'react'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'
import { Wrapper } from "@googlemaps/react-wrapper";
import { useSnapshot } from 'valtio'
import { userData } from '../../utils/userData'
import { Navigate, useParams } from 'react-router-dom'

export const room_locations = [
  { lat: 49.26245880126953, lng: -123.24458312988281 },
  { lat: 49.26246538789983, lng: -123.2448949967859}
];
export const ProjectDetailPage = () => {
  const sections = ['Math 100', 'Math 101', 'Phys 117', 'Chem 123', 'Engl 110']
  const rooms = ['Room 1', 'Room 2', 'Room 3']
  let { projectId } = useParams()
  const snapshot = useSnapshot(userData)
  const project = snapshot.projects.find(project => project.uuid === projectId)

  if (!project) {
    return <Navigate to='/projects' />
  }

  const { sections, rooms } = project

  return (
    <View direction='row' justify='center' gap={6} paddingBlock={10}>
      <View.Item grow>
        <View direction='column' align='center'>
          <Text variant='featured-1'>Classes</Text>
          {sections.map(section => (
            <View>{section.title}</View>
          ))}
        </View>
      </View.Item>
      <View.Item grow>
        <View direction='column' align='center'>
          <Text variant='featured-1'>Rooms</Text>
          {rooms.map(room => (
            <View>{room.title}</View>
          ))}
        </View>
      </View.Item>
        <GoogleMapsWrapper>
          <GoogleMaps locations={room_locations} />
        </GoogleMapsWrapper>
    </View>
  )
}



export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
  
}) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

const DEFAULT_CENTER = { lat: 49.26245880126953, lng: -123.24458312988281 };
const DEFAULT_ZOOM = 18;

export const GoogleMaps = ({
  locations,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,

        // Remove unecessary points of interest
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Displays single markers on map when called
      addSingleMarkers({ locations, map });
    }
  }, [ref, locations]);

  return (
    <div
      ref={ref}
      style={{ width: "1000px", height: "700px" }}
    />
  );
};

export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) =>
  locations.map(
    position =>
      new google.maps.Marker({
        position,
        map,
      }),
  );