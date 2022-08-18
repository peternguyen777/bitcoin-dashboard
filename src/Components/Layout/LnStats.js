import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { LightningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const LnStats = ({ styles, currency, lnData }) => {
  return (
    <Table size='sm' variant='simple' mb={8}>
      <Thead>
        <Tr>
          <Th style={styles}>
            <LightningIcon style={{ height: "20px", width: "20px" }} />
            Lightning Network
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Network Capacity</Td>
          <Td isNumeric>{lnData.networkCap}</Td>
        </Tr>
        <Tr>
          <Td>Network Capacity ({currency.code})</Td>
          <Td isNumeric>{lnData.networkCapFiat}</Td>
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
          <Td isNumeric>{lnData.avgNodeCap}</Td>
        </Tr>
        <Tr>
          <Td>Average Node Capacity ({currency.code})</Td>
          <Td isNumeric>{lnData.avgNodeCapFiat}</Td>
        </Tr>
        <Tr>
          <Td>Average Node Age</Td>
          <Td isNumeric>{lnData.avgNodeAge}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default LnStats;
