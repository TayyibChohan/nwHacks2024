import React from 'react'
import { useRouteError } from 'react-router-dom'
import { View } from 'reshaped'
import { Text } from 'reshaped/bundle'
import { Layout } from '../../components/Layout'

export const ErrorPage = () => {
  const error: any = useRouteError()
  console.error(error)

  return (
    <Layout>
      <View
        direction='column'
        gap={10}
        paddingBlock={{ s: 10, m: 20, l: 25 }}
        align='center'
      >
        <Text variant='title-5'>Oops!</Text>
        <Text variant='featured-2'>
          Sorry, an unexpected error has occurred.
        </Text>
        <Text variant='body-2'>
          <i>
            {error.status} {error.statusText || error.message}
          </i>
        </Text>
      </View>
    </Layout>
  )
}
