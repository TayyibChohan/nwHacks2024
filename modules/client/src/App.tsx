import React from "react";
import { Reshaped, View } from "reshaped";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "reshaped/themes/reshaped/theme.css";
import { Root } from "./routes/root";
import { ErrorPage } from "./pages/error-page";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <Reshaped theme="reshaped">
      <View minHeight="100vh" direction="column" className="site-container">
        <SiteHeader />
        <RouterProvider router={router} />
        <SiteFooter />
      </View>
    </Reshaped>
  );
};

export default App;
