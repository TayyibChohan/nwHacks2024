import React from 'react'
import { Button, Container, View } from 'reshaped'
import { LinkButton } from '../LinkButton'
import { Text } from 'reshaped/bundle'

export const SiteFooter = () => {
  return (
    <View className='site-header'>
      <Container width='1440px' padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <View paddingBlock={4}>
          <Button.Aligner side='start'>
            <LinkButton variant='ghost' color='white' to='/'>
              <Text variant='featured-3' weight='bold' className='site-title'>
                ROOM ROVER
              </Text>
            </LinkButton>
          </Button.Aligner>
        </View>
      </Container>
    </View>
  )
}
