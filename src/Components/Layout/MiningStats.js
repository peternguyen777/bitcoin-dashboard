import React, { useState, useEffect, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { MiningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MiningStats = () => {
  const [miningData, setMiningData] = useState([]);

  const fetchMiningDataHandler = useCallback(async () => {
    const data = await Promise.all([
      fetch("https://blockchain.info/q/getblockcount").then((response) =>
        response.json()
      ),
      fetch("https://blockchain.info/q/bcperblock").then((response) =>
        response.json()
      ),
      fetch("https://blockchain.info/q/interval").then((response) =>
        response.json()
      ),
      fetch("https://blockchain.info/q/hashestowin").then((response) =>
        response.json()
      ),
      fetch("https://blockchain.info/q/hashrate").then((response) =>
        response.json()
      ),
    ]);

    const transformedMiningData = {
      blockHeight: data[0].toLocaleString("en-US"),
      btcPerBlock: data[1],
      interval: (data[2] / 60).toFixed(2),
      hashesToWin: data[3].toPrecision(3),
      hashRate: (data[4] / 1e9).toFixed(2),
    };

    setMiningData(transformedMiningData);
  }, []);

  useEffect(() => {
    fetchMiningDataHandler();
  }, [fetchMiningDataHandler]);

  return (
    <Table size="sm" variant="simple" mb={8}>
      <Thead>
        <Tr>
          <Th>
            <MiningIcon style={{ height: "20px", width: "20px" }} />
            Mining Data
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Hash Rate</Td>
          <Td isNumeric>{miningData.hashRate} EH</Td>
        </Tr>
        <Tr>
          <Td>Block Height</Td>
          <Td isNumeric>{miningData.blockHeight}</Td>
        </Tr>
        <Tr>
          <Td>Block Reward</Td>
          <Td isNumeric>{miningData.btcPerBlock} BTC</Td>
        </Tr>
        <Tr>
          <Td>Average Interval between Blocks</Td>
          <Td isNumeric>{miningData.interval} min</Td>
        </Tr>
        <Tr>
          <Td>Average Hash Attempts per Block</Td>
          <Td isNumeric>{miningData.hashesToWin}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default MiningStats;
