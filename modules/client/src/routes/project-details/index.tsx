import React from 'react'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'

export const ProjectDetailPage = () => {
  const sections = ['Math 100', 'Math 101', 'Phys 117', 'Chem 123', 'Engl 110']
  const rooms = ['Room 1', 'Room 2', 'Room 3']

  return (
    <View direction='row' justify='center' gap={6} paddingBlock={10}>
      <View.Item grow>
        <View direction='column' align='center'>
          <Text variant='featured-1'>Classes</Text>
          {sections.map(section => (
            <View>{section}</View>
          ))}
        </View>
      </View.Item>
      <View.Item grow>
        <View direction='column' align='center'>
          <Text variant='featured-1'>Rooms</Text>
          {rooms.map(room => (
            <View>{room}</View>
          ))}
        </View>
      </View.Item>
    </View>
  )
}
