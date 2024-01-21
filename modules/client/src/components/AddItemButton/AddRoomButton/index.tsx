import React, { useState } from 'react'
import { Button, Modal, Text, TextField, useToggle, View } from 'reshaped'
import { userData } from '../../../utils/userData'
import { Project, Room } from '../../../utils/types'
import { addSingleMarkers, map } from '../../GoogleMapsWrapper'

const newRoom = (): Room => ({
  uuid: `room${Math.random() * 10}`.replace('.', ''),
  title: '',
  capacity: Math.floor(Math.random() * 250),
  location: {
    x: 0,
    y: 0,
  },
})

export const AddRoomButton = ({ project }: { project: Project }) => {
  const {
    active: addModalActive,
    activate: openAddModal,
    deactivate: closeAddModal,
  } = useToggle(false)
  const [room, setRoom] = useState<Room>(newRoom())

  const onClickCreate = () => {
    closeAddModal()

    room.location = {
      x: -123.24458312988281 + (Math.random() - 0.5) * 0.001,
      y: 49.26245880126953 + (Math.random() - 0.5) * 0.001,
    }

    if (map) {
      addSingleMarkers({
        locations: [
          {
            lng: room.location.x,
            lat: room.location.y,
          },
        ],
        map: map,
      })
    }

    userData.projects
      .find(entry => entry.uuid === project.uuid)
      ?.rooms.push(room)

    setRoom(newRoom)
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
            name='room-name'
            placeholder='Room name'
            onChange={({ value }) =>
              setRoom(prev => ({ ...prev, title: value }))
            }
          />
          <TextField
            name='room-capacity'
            placeholder='Room capacity'
            inputAttributes={{ inputMode: 'numeric' }}
            onChange={({ value }) =>
              setRoom(prev => ({ ...prev, capacity: Number(value) }))
            }
          />
          <Button
            color='primary'
            fullWidth
            onClick={onClickCreate}
            disabled={!room.title}
          >
            Create Room
          </Button>
        </View>
      </Modal>
    </>
  )
}
