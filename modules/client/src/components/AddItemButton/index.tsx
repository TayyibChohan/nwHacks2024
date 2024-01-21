import './add-item.scss'
import React, { useState } from 'react'
import {
  Button,
  Modal,
  Responsive,
  Text,
  TextField,
  useToggle,
  View,
} from 'reshaped'
import { Variant } from 'reshaped/components/Text/Text.types'

type TextVariants =
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'title-5'
  | 'title-6'
  | 'featured-1'
  | 'featured-2'
  | 'featured-3'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'caption-1'
  | 'caption-2'

interface AddItemButtonProps {
  name: string
  placeholder?: string
  createButtonText: string
  buttonTextSize: Responsive<TextVariants>
  onCreate: (title: string) => void
}

export const AddItemButton = ({
  name,
  placeholder,
  createButtonText,
  onCreate,
  buttonTextSize,
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
        <Text variant={buttonTextSize}>+</Text>
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
