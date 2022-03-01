import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { MiningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

const MiningStats = (props) => {
  const [miningData, setMiningData] = useState([]);

  useEffect(() => {
    const fetchMiningDataHandler = async () => {
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
        fetch("https://mempool.space/api/v1/difficulty-adjustment").then(
          (response) => response.json()
        ),
      ]);

      const transformedMiningData = {
        blockHeight: data[0].toLocaleString("en-US"),
        btcPerBlock: data[1],
        interval: (data[2] / 60).toFixed(2),
        hashesToWin: data[3].toPrecision(3),
        hashRate: (data[4] / 1e9).toFixed(2),
        diffAdj: data[5].difficultyChange.toFixed(2),
        nextRetarg: data[5].nextRetargetHeight.toLocaleString("en-US"),
      };

      setMiningData(transformedMiningData);
    };

    fetchMiningDataHandler();
  }, []);

  return (
    <Table size="sm" variant="simple" mb={8}>
      <Thead>
        <Tr>
          <Th style={props.styles}>
            <MiningIcon style={{ height: "20px", width: "20px" }} />
            Mining Data
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
