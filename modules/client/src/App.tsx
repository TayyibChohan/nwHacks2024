import React from "react";
import "./App.css";
import { Button, Container, Reshaped } from "reshaped";
import "reshaped/themes/reshaped/theme.css";

const App = () => {
  return (
    <Reshaped theme="reshaped">
      <Container width="1440px" padding={{ s: 4, m: 8, l: 14, xl: 25 }}>
        <Button href="/">Get started</Button>
      </Container>
    </Reshaped>
  );
};

export default App;
