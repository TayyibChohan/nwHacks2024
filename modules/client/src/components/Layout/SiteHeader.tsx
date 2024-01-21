import React from 'react'
import { Button, Container, View } from 'reshaped'
import { LinkButton } from '../LinkButton'
import { Text } from 'reshaped/bundle'

export const SiteHeader = () => {
  return (
    <View className='site-header'>
      <Container width='1440px' padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <View direction='row' justify='space-between' paddingBlock={4}>
          <Button.Aligner side='start'>
            <LinkButton color='white' variant='ghost' to='/'>
              <Text variant='featured-3' weight='bold' className='site-title'>
                ROOM ROVER
              </Text>
            </LinkButton>
          </Button.Aligner>
          <View direction='row' gap={2}>
            <LinkButton color='white' to='/login' className='header-button'>
              LOGIN
            </LinkButton>
            <LinkButton color='primary' to='/signup' className='header-button'>
              SIGNUP
            </LinkButton>
          </View>
        </View>
      </Container>
    </View>
  )
}
