import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ExchangeIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const TradingStats = ({ styles, currency, tradingData }) => {
  return (
    <Table size='sm' variant='simple' mb={8}>
      <Thead>
        <Tr>
          <Th style={styles}>
            <ExchangeIcon style={{ height: "20px", width: "20px" }} />
            Trading Data
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>24 Hour Trading Volume</Td>
          <Td isNumeric>
            {currency.symbol}
            {tradingData.dayTradingVol}
          </Td>
        </Tr>
        <Tr>
          <Td>24 Hour High</Td>
          <Td isNumeric>
            {currency.symbol}
            {tradingData.dayHigh}
          </Td>
        </Tr>
        <Tr>
          <Td>24 Hour Low</Td>
          <Td isNumeric>
            {currency.symbol}
            {tradingData.dayLow}
          </Td>
        </Tr>
        <Tr>
          <Td>All Time High</Td>
          <Td isNumeric>
            {currency.symbol}
            {tradingData.ath}
          </Td>
        </Tr>
        <Tr>
          <Td>All Time High Date</Td>
          <Td isNumeric>{tradingData.athDate}</Td>
        </Tr>
        <Tr>
          <Td>All Time High Change</Td>
          <Td isNumeric>{tradingData.athChange}%</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TradingStats;
