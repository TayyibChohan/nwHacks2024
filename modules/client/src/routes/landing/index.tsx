import React from 'react'
import { View } from 'reshaped'
import { LinkButton } from '../../components/LinkButton'

export const LandingPage = () => {
  return (
    <View align='center' paddingBlock={10}>
      <LinkButton to='/projects'>Go to projects</LinkButton>
    </View>
  )
}
