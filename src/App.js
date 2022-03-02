import { VStack, Container } from "@chakra-ui/react";
// import { Heading } from "@chakra-ui/react";
import PriceStats from "./Components/Layout/PriceStats";
import MarketStats from "./Components/Layout/MarketStats";
import TradingStats from "./Components/Layout/TradingStats";
import MiningStats from "./Components/Layout/MiningStats";
import LnStats from "./Components/Layout/LnStats";
import React, { useState } from "react";
import Header from "./Components/Layout/Header";

const currencies = {
  AUD: { code: "AUD", name: "Australian Dollar", symbol: "$" },
  CNY: { code: "CNY", name: "Chinese Yuan Renminbi", symbol: "¥" },
  GBP: { code: "GBP", name: "United Kingdom Pound", symbol: "£" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  USD: { code: "USD", name: "United States Dollar", symbol: "$" },
};

function App() {
  const [selectedFiat, setSelectedFiat] = useState(currencies.USD);

  // const currencies = [
  //   { code: "AUD", name: "Australian Dollar", symbol: "$" },
  //   { code: "CNY", name: "Chinese Yuan Renminbi", symbol: "¥" },
  //   { code: "GBP", name: "United Kingdom Pound", symbol: "£" },
  //   { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  //   { code: "USD", name: "United States Dollar", symbol: "$" },
  // ];

  const labelStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <React.Fragment>
      <Header
        currencylist={currencies}
        currency={selectedFiat.code}
        setCurrency={setSelectedFiat}
      />
      <VStack p={4}>
        {/* <Heading
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, yellow.500,orange.400, red.400)"
          bgClip="text"
        >
          Bitcoin Dashboard
        </Heading> */}
        <Container>
          <PriceStats currency={selectedFiat} />
          <MarketStats styles={labelStyle} currency={selectedFiat} />
          <LnStats styles={labelStyle} currency={selectedFiat} />
          <MiningStats styles={labelStyle} currency={selectedFiat} />
          <TradingStats styles={labelStyle} currency={selectedFiat} />
        </Container>
      </VStack>
    </React.Fragment>
  );
}

export default App;
