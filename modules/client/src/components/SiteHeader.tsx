import React from "react";
import { Container, View } from "reshaped";

export const SiteHeader = () => {
  return (
    <View backgroundColor="neutral">
      <Container width="1440px" padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <View paddingBlock={4}>Header :)</View>
      </Container>
    </View>
  );
};
