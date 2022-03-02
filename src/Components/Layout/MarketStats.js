import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BitcoinCircleIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MarketStats = (props) => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchMarketDataHandler = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );

      const data = await response.json();

      const selectedCurrency = props.currency.code.toLowerCase();

      const transformedMarketData = {
        id: data.id,
        title: data.name,
        currentPrice:
          data.market_data.current_price[selectedCurrency].toLocaleString(
            "en-US"
          ),
        satsPerDollar: Math.round(
          100000000 / data.market_data.current_price[selectedCurrency]
        ),
        marketCapUsd:
          data.market_data.market_cap[selectedCurrency].toLocaleString("en-US"),
        fullyDilutedVal:
          data.market_data.fully_diluted_valuation[
            selectedCurrency
          ].toLocaleString("en-US"),
        circulatingSupply:
          data.market_data.circulating_supply.toLocaleString("en-US"),
        maxSupply: data.market_data.max_supply.toLocaleString("en-US"),
      };

      setMarketData(transformedMarketData);
    };

    fetchMarketDataHandler();
  }, [props.currency]);

  return (
    <Table size="sm" variant="simple" mt={12} mb={8}>
      <Thead>
        <Tr>
          <Th style={props.styles}>
            <BitcoinCircleIcon style={{ height: "20px", width: "20px" }} />
            <h2>Market Data</h2>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Current Price</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {marketData.currentPrice}
          </Td>
        </Tr>
        <Tr>
          <Td>Sats per {props.currency.code}</Td>
          <Td isNumeric>{marketData.satsPerDollar}</Td>
        </Tr>
        <Tr>
          <Td>Market Cap</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {marketData.marketCapUsd}
          </Td>
        </Tr>
        <Tr>
          <Td>Fully Diluted Valuation</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {marketData.fullyDilutedVal}
          </Td>
        </Tr>
        <Tr>
          <Td>Circulating Supply</Td>
          <Td isNumeric>{marketData.circulatingSupply} BTC</Td>
        </Tr>
        <Tr>
          <Td>Max Supply</Td>
          <Td isNumeric>{marketData.maxSupply} BTC</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default MarketStats;
