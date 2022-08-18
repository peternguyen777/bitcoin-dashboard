import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode='light' />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
