import './project-details.scss'
import React from 'react'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'
import { useSnapshot } from 'valtio'
import { userData } from '../../utils/userData'
import { Navigate, useParams } from 'react-router-dom'
import {
  addSingleMarkers,
  GoogleMapsWrapper,
  map,
} from '../../components/GoogleMapsWrapper'
import { AddItemButton } from '../../components/AddItemButton'

export const ProjectDetailPage = () => {
  let { projectId } = useParams()
  const snapshot = useSnapshot(userData)
  const project = snapshot.projects.find(project => project.uuid === projectId)

  if (!project) {
    return <Navigate to='/projects' />
  }

  const { sections, rooms } = project

  return (
    <View
      direction='row'
      justify='center'
      gap={6}
      paddingBlock={10}
      height='100%'
      wrap
    >
      <View.Item grow className='detail-item-list'>
        <View direction='column' align='center' gap={3}>
          <View direction='row' gap={5} align='center'>
            <Text variant='featured-1'>Sections</Text>
            <AddItemButton
              name='section'
              placeholder='Section name'
              createButtonText='Create Section'
              buttonTextSize='title-6'
              onCreate={title => {
                userData.projects
                  .find(project => project.uuid === projectId)
                  ?.sections.push({
                    uuid: `sect${Math.random() * 10}`.replace('.', ''),
                    title: title,
                    enrollment: Math.floor(Math.random() * 250),
                    timeSlot: 1 + Math.floor(Math.random() * 10),
                  })
              }}
            />
          </View>
          {sections.map(section => (
            <View
              borderColor='neutral'
              direction='row'
              gap={4}
              padding={3}
              width='100%'
            >
              <View.Item grow>{section.title}</View.Item>
              <View.Item grow>Students: {section.enrollment}</View.Item>
              <View.Item grow>Time: {section.timeSlot}</View.Item>
            </View>
          ))}
        </View>
      </View.Item>
      <View.Item grow className='detail-item-list'>
        <View direction='column' align='center' gap={3}>
          <View direction='row' gap={5} align='center'>
            <Text variant='featured-1'>Rooms</Text>
            <AddItemButton
              name='room'
              placeholder='Room name'
              createButtonText='Create Room'
              buttonTextSize='title-6'
              onCreate={title => {
                const location = {
                  x: -123.24458312988281 + (Math.random() - 0.5) * 0.001,
                  y: 49.26245880126953 + (Math.random() - 0.5) * 0.001,
                }

                if (map) {
                  addSingleMarkers({
                    locations: [
                      {
                        lng: location.x,
                        lat: location.y,
                      },
                    ],
                    map: map,
                  })
                }

                userData.projects
                  .find(project => project.uuid === projectId)
                  ?.rooms.push({
                    uuid: `room${Math.random() * 10}`.replace('.', ''),
                    title: title,
                    capacity: Math.floor(Math.random() * 250),
                    location: location,
                  })
              }}
            />
          </View>
          {rooms.map(room => (
            <View
              direction='column'
              borderColor='neutral'
              padding={3}
              gap={3}
              width='100%'
            >
              <View direction='row' gap={4} width='100%'>
                <View.Item grow>{room.title}</View.Item>
                <View.Item grow>Capacity: {room.capacity}</View.Item>
              </View>
              <View direction='row' gap={4} width='100%'>
                <View.Item grow>
                  {room.location
                    ? `lon=${room.location.x} lat=${room.location.y}`
                    : ''}
                </View.Item>
              </View>
            </View>
          ))}
        </View>
      </View.Item>
      <GoogleMapsWrapper
        locations={project.rooms.map(room => ({
          lng: room.location.x,
          lat: room.location.y,
        }))}
      />
    </View>
  )
}
