import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BlockIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MiningStats = ({ styles, miningData }) => {
  return (
    <Table size='sm' variant='simple' mb={8}>
      <Thead>
        <Tr>
          <Th style={styles}>
            <BlockIcon style={{ height: "20px", width: "20px" }} />
            <h2>Blockchain Data</h2>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Hash Rate (last 24h)</Td>
          <Td isNumeric>{miningData.hashRate} EH/s</Td>
        </Tr>
        <Tr>
          <Td>Block Height</Td>
          <Td isNumeric>{miningData.blockHeight}</Td>
        </Tr>
        <Tr>
          <Td>Next Retarget Height</Td>
          <Td isNumeric>{miningData.nextRetarg}</Td>
        </Tr>
        <Tr>
          <Td>Estimated Difficulty Adjustment</Td>
          <Td isNumeric>{miningData.diffAdj}%</Td>
        </Tr>
        <Tr>
          <Td>Average Interval between Blocks</Td>
          <Td isNumeric>{miningData.interval} min</Td>
        </Tr>
        <Tr>
          <Td>Average Hash Attempts per Block</Td>
          <Td isNumeric>{miningData.hashesToWin}</Td>
        </Tr>
        <Tr>
          <Td>Block Reward</Td>
          <Td isNumeric>{miningData.btcPerBlock} BTC</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default MiningStats;
