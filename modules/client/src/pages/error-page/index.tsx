import React from "react";
import { useRouteError } from "react-router-dom";
import { Container, View } from "reshaped";
import { Text } from "reshaped/bundle";

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <View.Item grow>
      <Container width="1440px" padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <View
          direction="column"
          gap={10}
          paddingBlock={{ s: 10, m: 20, l: 25 }}
          align="center"
        >
          <Text variant="title-1">Oops!</Text>
          <Text variant="title-2">
            Sorry, an unexpected error has occurred.
          </Text>
          <Text variant="body-2">
            <i>{error.statusText || error.message}</i>
          </Text>
        </View>
      </Container>
    </View.Item>
  );
};
