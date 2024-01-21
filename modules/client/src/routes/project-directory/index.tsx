import './project-directory.scss'
import React from 'react'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'
import { Link } from 'react-router-dom'

export const ProjectDirectoryPage = () => {
  const projects = ['Test', 'Check', 'Project']

  return (
    <View direction='column' align='center' gap={12} paddingBlock={10}>
      <Text variant='title-5'>Your Projects</Text>
      <View direction='column' gap={3} width='100%' maxWidth='720px'>
        {projects.map(project => (
          <Link to={`/projects/${project}`}>
            <View
              direction='row'
              borderColor='neutral'
              padding={5}
              className='project-item'
            >
              <Text variant='body-2' color='neutral'>
                {project}
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  )
}
