import React from 'react'
import { Button, Container, View } from 'reshaped'
import { Link } from 'react-router-dom'

export const Root = () => {
  return (
    <View.Item grow>
      <Container width='1440px' padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <View paddingBlock={8}>
          <Link to='/login'>
            <Button color='primary'>Get started</Button>
          </Link>
        </View>
      </Container>
    </View.Item>
  )
}
