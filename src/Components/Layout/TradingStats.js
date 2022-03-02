import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ExchangeIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const TradingStats = (props) => {
  const [tradingData, setTradingData] = useState([]);

  useEffect(() => {
    const fetchTradingDataHandler = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );

      const data = await response.json();

      const dataAthDate = data.market_data.ath_date.usd;

      const formatDate = (dataAthDate) => {
        const dateTimeUTC = new Date(dataAthDate);
        const date = dateTimeUTC.toDateString();
        return date;
      };

      const selectedCurrency = props.currency.code.toLowerCase();

      const transformedTradingData = {
        id: data.id,
        dayTradingVol:
          data.market_data.total_volume[selectedCurrency].toLocaleString(
            "en-US"
          ),
        dayHigh:
          data.market_data.high_24h[selectedCurrency].toLocaleString("en-US"),
        dayLow:
          data.market_data.low_24h[selectedCurrency].toLocaleString("en-US"),
        ath: data.market_data.ath[selectedCurrency].toLocaleString("en-US"),
        athDate: formatDate(dataAthDate),
        athChange:
          data.market_data.ath_change_percentage[selectedCurrency].toFixed(2),
      };

      setTradingData(transformedTradingData);
    };

    fetchTradingDataHandler();
  }, [props.currency]);

  // let dateTimeUTC = new Date(tradingData.athDate);
  // let date = dateTimeUTC.toDateString();
  // console.log(n);

  return (
    <Table size="sm" variant="simple" mb={8}>
      <Thead>
        <Tr>
          <Th style={props.styles}>
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
            {props.currency.symbol}
            {tradingData.dayTradingVol}
          </Td>
        </Tr>
        <Tr>
          <Td>24 Hour High</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {tradingData.dayHigh}
          </Td>
        </Tr>
        <Tr>
          <Td>24 Hour Low</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {tradingData.dayLow}
          </Td>
        </Tr>
        <Tr>
          <Td>All Time High</Td>
          <Td isNumeric>
            {props.currency.symbol}
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
