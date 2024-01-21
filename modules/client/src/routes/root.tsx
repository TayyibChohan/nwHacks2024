import React from "react";
import { Button, Container, View } from "reshaped";

export const Root = () => {
  return (
    <View.Item grow>
      <Container width="1440px" padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <Button href="/">Get started</Button>
      </Container>
    </View.Item>
  );
};
