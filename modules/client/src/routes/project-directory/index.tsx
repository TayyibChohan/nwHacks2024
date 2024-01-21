import './project-directory.scss'
import React from 'react'
import { Text, View } from 'reshaped'
import { Link } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { userData } from '../../utils/userData'
import { AddItemButton } from '../../components/AddItemButton'

export const ProjectDirectoryPage = () => {
  const projects = useSnapshot(userData).projects

  return (
    <View direction='column' align='center' gap={12} paddingBlock={10}>
      <View direction='row' gap={8} align='center'>
        <Text variant='title-5'>Your Projects</Text>
        <AddItemButton
          name='project'
          createButtonText='Create Project'
          placeholder='Give a name to your project'
          buttonTextSize='title-3'
          onCreate={title =>
            userData.projects.push({
              rooms: [],
              sections: [],
              students: [],
              uuid: `abc${Math.random() * 10}`.replace('.', ''),
              title: title,
            })
          }
        />
      </View>
      <View direction='column' gap={3} width='100%' maxWidth='720px'>
        {projects.map(project => (
          <Link to={`/projects/${project.uuid}`}>
            <View
              direction='row'
              borderColor='neutral'
              padding={5}
              className='project-item'
            >
              <Text variant='body-2' color='neutral'>
                {project.title}
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  )
}
