import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BitcoinCircleIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MarketStats = ({ styles, currency, marketData }) => {
  return (
    <Table size='sm' variant='simple' mt={12} mb={8}>
      <Thead>
        <Tr>
          <Th style={styles}>
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
            {currency.symbol}
            {marketData.currentPrice}
          </Td>
        </Tr>
        <Tr>
          <Td>Sats per {currency.code}</Td>
          <Td isNumeric>{marketData.satsPerDollar}</Td>
        </Tr>
        <Tr>
          <Td>Market Cap</Td>
          <Td isNumeric>
            {currency.symbol}
            {marketData.marketCapUsd}
          </Td>
        </Tr>
        <Tr>
          <Td>Fully Diluted Valuation</Td>
          <Td isNumeric>
            {currency.symbol}
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
