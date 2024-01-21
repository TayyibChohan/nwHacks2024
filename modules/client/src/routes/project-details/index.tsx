import React from 'react'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'
import { useSnapshot } from 'valtio'
import { userData } from '../../utils/userData'
import { Navigate, useParams } from 'react-router-dom'

export const ProjectDetailPage = () => {
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
    </View>
  )
}
