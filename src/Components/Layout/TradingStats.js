import React, { useState, useEffect, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ExchangeIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const TradingStats = () => {
  const [tradingData, setTradingData] = useState([]);

  const fetchTradingDataHandler = useCallback(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );

    const data = await response.json();

    const transformedTradingData = {
      id: data.id,
      dayTradingVol: data.market_data.total_volume.usd.toLocaleString("en-US"),
      dayHigh: data.market_data.high_24h.usd.toLocaleString("en-US"),
      dayLow: data.market_data.low_24h.usd.toLocaleString("en-US"),
      ath: data.market_data.ath.usd.toLocaleString("en-US"),
      athDate: data.market_data.ath_date.usd,
      athChange: data.market_data.ath_change_percentage.usd,
    };

    setTradingData(transformedTradingData);
  }, []);

  useEffect(() => {
    fetchTradingDataHandler();
  }, [fetchTradingDataHandler]);

  return (
    <Table size="sm" variant="simple" mb={8}>
      <Thead>
        <Tr>
          <Th>
            <ExchangeIcon style={{ height: "20px", width: "20px" }} />
            Trading Data
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>24 Hour Trading Volume</Td>
          <Td isNumeric>${tradingData.dayTradingVol}</Td>
        </Tr>
        <Tr>
          <Td>24 Hour High</Td>
          <Td isNumeric>${tradingData.dayHigh}</Td>
        </Tr>
        <Tr>
          <Td>24 Hour Low</Td>
          <Td isNumeric>${tradingData.dayLow}</Td>
        </Tr>
        <Tr>
          <Td>All Time High</Td>
          <Td isNumeric>${tradingData.ath}</Td>
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
