import React, { useState } from 'react'
import { Button, Modal, Text, TextField, useToggle, View } from 'reshaped'
import { ClassSection, Project } from '../../../utils/types'
import { userData } from '../../../utils/userData'

const newSection = (): ClassSection => ({
  uuid: `room${Math.random() * 10}`.replace('.', ''),
  title: '',
  enrollment: 0,
  timeSlot: 0,
})

export const AddSectionButton = ({ project }: { project: Project }) => {
  const {
    active: addModalActive,
    activate: openAddModal,
    deactivate: closeAddModal,
  } = useToggle(false)
  const [section, setSection] = useState<ClassSection>(newSection())

  const onClickCreate = () => {
    closeAddModal()

    userData.projects
      .find(entry => entry.uuid === project.uuid)
      ?.sections.push(section)

    setSection(newSection())
  }

  return (
    <>
      <Button
        color='primary'
        size='large'
        className='add-item-button'
        onClick={openAddModal}
      >
        <Text variant='title-6'>+</Text>
      </Button>
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
            name='section-name'
            placeholder='Section name'
            onChange={({ value }) =>
              setSection(prev => ({ ...prev, title: value }))
            }
          />
          <TextField
            name='section-enrollment'
            placeholder='Section enrollment'
            inputAttributes={{ inputMode: 'numeric' }}
            onChange={({ value }) =>
              setSection(prev => ({ ...prev, enrollment: Number(value) }))
            }
          />
          <TextField
            name='section-timeslot'
            placeholder='Section timeslot'
            inputAttributes={{ inputMode: 'numeric' }}
            onChange={({ value }) =>
              setSection(prev => ({ ...prev, timeSlot: Number(value) }))
            }
          />
          <Button
            color='primary'
            fullWidth
            onClick={onClickCreate}
            disabled={!section.title}
          >
            Create Section
          </Button>
        </View>
      </Modal>
    </>
  )
}
