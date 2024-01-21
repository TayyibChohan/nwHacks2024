import { importExpression } from '@babel/types';
import React, { useState } from 'react';
import { Button, Text, View, Container } from 'reshaped/bundle';
import { LinkButton } from '../LinkButton';

export const SiteHeader = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [token, setToken] = useState(searchParams.get('token'));

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
            {!token && (
              <LinkButton
                color='white'
                to='http://localhost:3000/login'
                className='header-button'
              >
                LOGIN
              </LinkButton>
            )}
            {token && (
              <LinkButton
                color='white'
                to='/'
                onClick={() => {
                  setToken(null);
                }}
                className='header-button'
              >
                LOGOUT
              </LinkButton>
            )}
            {/* <LinkButton color='primary' to='/signup' className='header-button'>
              SIGNUP
            </LinkButton> */}
          </View>
        </View>
      </Container>
    </View>
  );
};