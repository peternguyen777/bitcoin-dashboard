import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { LightningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const LnStats = (props) => {
  const [lnData, setLnData] = useState([]);

  useEffect(() => {
    const fetchLnDataHandler = async () => {
      const response = await fetch(
        "https://pacific-hollows-07478.herokuapp.com/https://1ml.com/statistics?json=true"
      );

      const data = await response.json();

      const transformedLnData = {
        noNodes: data.numberofnodes.toLocaleString("en-US"),

        networkCap: (data.networkcapacity / 100000000).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),
        networkCapUsd: data.networkcapacityusd.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),

        noChannels: data.numberofchannels.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),

        avgNodeCap: data.averagenodecapacity.toFixed(2),
        avgNodeCapUsd: data.averagenodecapacityusd.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),
        avgNodeAge: data.averagenodeagedays.toFixed(0),
      };

      setLnData(transformedLnData);
    };

    fetchLnDataHandler();
  }, []);

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
          <Td>Network Capacity (USD)</Td>
          <Td isNumeric>${lnData.networkCapUsd}</Td>
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
          <Td>Average Node Capacity (USD)</Td>
          <Td isNumeric>${lnData.avgNodeCapUsd}</Td>
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
