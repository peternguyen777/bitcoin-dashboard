import "./App.css";
import {
  Heading,
  VStack,
  IconButton,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

import PriceStats from "./Components/Layout/PriceStats";
import MarketStats from "./Components/Layout/MarketStats";
import TradingStats from "./Components/Layout/TradingStats";
import MiningStats from "./Components/Layout/MiningStats";
import React from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <VStack p={4}>
        <IconButton
          icon={
            colorMode === "light" ? (
              <SunIcon style={{ height: "30px", width: "30px" }} />
            ) : (
              <MoonIcon style={{ height: "30px", width: "30px" }} />
            )
          }
          isRound="true"
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          // position="fixed"
        />
        <Heading
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, yellow.500,orange.400, red.400)"
          bgClip="text"
        >
          Bitcoin Dashboard
        </Heading>
        <Container pt={12}>
          <PriceStats />
          <MarketStats />
          <TradingStats />
          <MiningStats />
        </Container>
      </VStack>
    </React.Fragment>
  );
}

export default App;
