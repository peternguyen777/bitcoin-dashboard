import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { LightningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const LnStats = (props) => {
  const [lnData, setLnData] = useState([]);

  useEffect(() => {
    const fetchLnDataHandler = async () => {
      const data = await Promise.all([
        fetch(
          "https://pacific-hollows-07478.herokuapp.com/https://1ml.com/statistics?json=true"
        ).then((response) => response.json()),
        fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(
          (response) => response.json()
        ),
      ]);

      const selectedCurrency = props.currency.code.toLowerCase();
      const networkcap = data[0].networkcapacity / 100000000;
      const btcpricefiat = data[1].market_data.current_price[selectedCurrency];
      const networkcapfiat = networkcap * btcpricefiat;

      const transformedLnData = {
        noNodes: data[0].numberofnodes.toLocaleString("en-US"),

        networkCap: (data[0].networkcapacity / 100000000).toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 0,
          }
        ),
        networkCapFiat: networkcapfiat.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),
        noChannels: data[0].numberofchannels.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),

        avgNodeCap: data[0].averagenodecapacity.toFixed(2),
        avgNodeCapUsd: (
          data[0].averagenodecapacityusd *
          data[1].market_data.current_price[selectedCurrency]
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),
        avgNodeAge: data[0].averagenodeagedays.toFixed(0),
      };

      setLnData(transformedLnData);
    };

    fetchLnDataHandler();
  }, [props.currency]);

  return (
    <Table size="sm" variant="simple" mb={8}>
      <Thead>
        <Tr>
          <Th style={props.styles}>
            <LightningIcon style={{ height: "20px", width: "20px" }} />
            Lightning Network
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Network Capacity</Td>
          <Td isNumeric>{lnData.networkCap} BTC</Td>
        </Tr>
        <Tr>
          <Td>Network Capacity ({props.currency.code})</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {lnData.networkCapFiat}
          </Td>
        </Tr>
        <Tr>
          <Td>Number of Nodes</Td>
          <Td isNumeric>{lnData.noNodes}</Td>
        </Tr>
        <Tr>
          <Td>Number of Channels</Td>
          <Td isNumeric>{lnData.noChannels}</Td>
        </Tr>
        <Tr>
          <Td>Average Node Capacity</Td>
          <Td isNumeric>{lnData.avgNodeCap} BTC</Td>
        </Tr>
        <Tr>
          <Td>Average Node Capacity ({props.currency.code})</Td>
          <Td isNumeric>
            {props.currency.symbol}
            {lnData.avgNodeCapUsd}
          </Td>
        </Tr>
        <Tr>
          <Td>Average Node Age</Td>
          <Td isNumeric>{lnData.avgNodeAge} days</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default LnStats;
