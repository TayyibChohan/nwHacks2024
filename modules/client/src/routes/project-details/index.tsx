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
import { AddSectionButton } from '../../components/AddItemButton/AddSectionButton'
import { AddRoomButton } from '../../components/AddItemButton/AddRoomButton'

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
      align='stretch'
      gap={6}
      paddingBlock={10}
      minHeight='100%'
      wrap
    >
      <View.Item grow className='detail-item-list'>
        <View direction='column' align='center' gap={3}>
          <View direction='row' gap={5} align='center'>
            <Text variant='featured-1'>Sections</Text>
            <AddSectionButton
              project={
                userData.projects.find(project => project.uuid === projectId)!
              }
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
            <AddRoomButton
              project={
                userData.projects.find(project => project.uuid === projectId)!
              }
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
