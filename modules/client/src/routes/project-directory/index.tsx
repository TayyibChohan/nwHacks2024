import './project-directory.scss'
import React, { useState } from 'react'
import { Button, Modal, Text, TextField, useToggle, View } from 'reshaped'
import { Link } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { userData } from '../../utils/userData'

export const ProjectDirectoryPage = () => {
  const projects = useSnapshot(userData).projects
  const {
    active: addModalActive,
    activate: openAddModal,
    deactivate: closeAddModal,
  } = useToggle(false)
  const [newProjectTitle, setNewProjectTitle] = useState('')

  const addProject = () => {
    userData.projects.push({
      rooms: [],
      sections: [],
      students: [],
      uuid: 'abcd' + Math.random() * 1000,
      title: newProjectTitle,
    })
    closeAddModal()
    setNewProjectTitle('')
  }

  return (
    <View direction='column' align='center' gap={12} paddingBlock={10}>
      <View direction='row' gap={8} align='center'>
        <Text variant='title-5'>Your Projects</Text>
        <Button
          color='primary'
          size='large'
          className='project-add-button'
          onClick={openAddModal}
        >
          <Text variant='title-3'>+</Text>
        </Button>
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
      <Modal active={addModalActive}>
        <View position='absolute' className='modal-close-button-wrapper'>
          <Button
            className='modal-close-button'
            variant='ghost'
            onClick={closeAddModal}
          >
            <Text variant='body-2' weight='bold'>
              X
            </Text>
          </Button>
        </View>
        <View direction='column' gap={4} paddingBlock={12} paddingInline={8}>
          <TextField
            name='title'
            placeholder='Enter a name for your project'
            onChange={({ value }) => setNewProjectTitle(value)}
          />
          <Button
            color='primary'
            fullWidth
            onClick={addProject}
            disabled={!newProjectTitle}
          >
            Create Project
          </Button>
        </View>
      </Modal>
    </View>
  )
}
