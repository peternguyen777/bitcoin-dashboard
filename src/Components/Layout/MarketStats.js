import React, { useState, useEffect, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BitcoinCircleIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MarketStats = () => {
  const [marketData, setMarketData] = useState([]);

  const fetchMarketDataHandler = useCallback(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );

    const data = await response.json();

    const transformedMarketData = {
      id: data.id,
      title: data.name,
      currentPriceUsd:
        data.market_data.current_price.usd.toLocaleString("en-US"),
      satsPerDollar: Math.round(100000000 / data.market_data.current_price.usd),
      marketCapUsd: data.market_data.market_cap.usd.toLocaleString("en-US"),
      fullyDilutedVal:
        data.market_data.fully_diluted_valuation.usd.toLocaleString("en-US"),
      circulatingSupply:
        data.market_data.circulating_supply.toLocaleString("en-US"),
      maxSupply: data.market_data.max_supply.toLocaleString("en-US"),
    };

    setMarketData(transformedMarketData);
  }, []);

  useEffect(() => {
    fetchMarketDataHandler();
  }, [fetchMarketDataHandler]);

  return (
    <Table size="sm" variant="simple" mt={12} mb={8}>
      <Thead>
        <Tr>
          <Th>
            <BitcoinCircleIcon style={{ height: "20px", width: "20px" }} />
            Market Data
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Current Price (USD)</Td>
          <Td isNumeric>${marketData.currentPriceUsd}</Td>
        </Tr>
        <Tr>
          <Td>Sats per dollar</Td>
          <Td isNumeric>{marketData.satsPerDollar}</Td>
        </Tr>
        <Tr>
          <Td>Market Cap</Td>
          <Td isNumeric>${marketData.marketCapUsd}</Td>
        </Tr>
        <Tr>
          <Td>Fully Diluted Valuation</Td>
          <Td isNumeric>${marketData.fullyDilutedVal}</Td>
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
