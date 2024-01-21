import './layout.scss'
import React, { ReactNode } from 'react'
import { Container, View } from 'reshaped'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <View direction='column' className='site-container'>
      <SiteHeader />
      <View.Item grow>
        <Container
          width='1440px'
          padding={{ s: 4, m: 8, l: 14, xl: 25 }}
          className='site-content'
        >
          {children}
        </Container>
      </View.Item>
      <SiteFooter />
    </View>
  )
}
