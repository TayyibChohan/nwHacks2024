import './add-item.scss'
import React, { useState } from 'react'
import { Button, Modal, Text, TextField, useToggle, View } from 'reshaped'

interface AddItemButtonProps {
  name: string
  placeholder?: string
  createButtonText: string
  onCreate: (title: string) => void
}

export const AddItemButton = ({
  name,
  placeholder,
  createButtonText,
  onCreate,
}: AddItemButtonProps) => {
  const {
    active: addModalActive,
    activate: openAddModal,
    deactivate: closeAddModal,
  } = useToggle(false)
  const [newItemTitle, setNewItemTitle] = useState('')

  const onClickCreate = () => {
    closeAddModal()
    onCreate(newItemTitle)
    setNewItemTitle('')
  }

  return (
    <>
      <Button
        color='primary'
        size='large'
        className='add-item-button'
        onClick={openAddModal}
      >
        <Text variant='title-3'>+</Text>
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
            name={name}
            placeholder={placeholder}
            onChange={({ value }) => setNewItemTitle(value)}
          />
          <Button
            color='primary'
            fullWidth
            onClick={onClickCreate}
            disabled={!newItemTitle}
          >
            {createButtonText}
          </Button>
        </View>
      </Modal>
    </>
  )
}
