import { VStack, Container } from "@chakra-ui/react";
import PriceStats from "./Components/Layout/PriceStats";
import MarketStats from "./Components/Layout/MarketStats";
import TradingStats from "./Components/Layout/TradingStats";
import MiningStats from "./Components/Layout/MiningStats";
import LnStats from "./Components/Layout/LnStats";
import React, { useEffect, useState } from "react";
import Header from "./Components/Layout/Header";
import LoadingSpinner from "./Components/UI/LoadingSpinner";

const currencies = {
  AUD: { code: "AUD", name: "Australian Dollar", symbol: "$" },
  CNY: { code: "CNY", name: "Chinese Yuan Renminbi", symbol: "¥" },
  EUR: { code: "EUR", name: "European Euro", symbol: "€" },
  GBP: { code: "GBP", name: "United Kingdom Pound", symbol: "£" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  RUB: { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  USD: { code: "USD", name: "United States Dollar", symbol: "$" },
};

function App() {
  const [selectedFiat, setSelectedFiat] = useState(currencies.USD);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [isLoadingMarket, setIsLoadingMarket] = useState(true);
  const [isLoadingLn, setIsLoadingLn] = useState(true);
  const [isLoadingMining, setIsLoadingMining] = useState(true);
  const [isLoadingTrading, setIsLoadingTrading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [lnData, setLnData] = useState([]);
  const [miningData, setMiningData] = useState([]);

  useEffect(() => {
    setIsLoadingPrice(true);
    const fetchChartDataHandler = async () => {
      const selectedCurrency = await selectedFiat.code.toLowerCase();
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${selectedCurrency}&days=2200&interval=daily`
      );

      const data = await response.json();

      setChartData(data.prices);
      setIsLoadingPrice(false);
    };
    fetchChartDataHandler();
  }, [selectedFiat, setIsLoadingPrice]);

  useEffect(() => {
    setIsLoadingMarket(true);
    const fetchMarketDataHandler = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );

      const data = await response.json();

      const selectedCurrency = selectedFiat.code.toLowerCase();

      const transformedMarketData = {
        id: data.id,
        title: data.name,
        currentPrice:
          data.market_data.current_price[selectedCurrency].toLocaleString(
            "en-US"
          ),
        satsPerDollar: Math.round(
          100000000 / data.market_data.current_price[selectedCurrency]
        ),
        marketCapUsd:
          data.market_data.market_cap[selectedCurrency].toLocaleString("en-US"),
        fullyDilutedVal:
          data.market_data.fully_diluted_valuation[
            selectedCurrency
          ].toLocaleString("en-US"),
        circulatingSupply:
          data.market_data.circulating_supply.toLocaleString("en-US"),
        maxSupply: data.market_data.max_supply.toLocaleString("en-US"),
      };

      setMarketData(transformedMarketData);
      setIsLoadingMarket(false);
    };

    fetchMarketDataHandler();
  }, [selectedFiat, setIsLoadingMarket]);

  useEffect(() => {
    setIsLoadingLn(true);
    const fetchLnDataHandler = async () => {
      const data = await Promise.all([
        fetch(
          "https://pacific-hollows-07478.herokuapp.com/https://1ml.com/statistics?json=true"
        ).then((response) => response.json()),
        fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(
          (response) => response.json()
        ),
      ]);

      const selectedCurrency = selectedFiat.code.toLowerCase();
      const networkcap = data[0].networkcapacity / 100000000;
      const btcpricefiat = data[1].market_data.current_price[selectedCurrency];
      const networkcapfiat = networkcap * btcpricefiat;

      const transformedLnData = {
        noNodes: data[0].numberofnodes.toLocaleString("en-US"),

        networkCap: `${(data[0].networkcapacity / 100000000).toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 0,
          }
        )} BTC`,
        networkCapFiat: `${selectedFiat.symbol}${networkcapfiat.toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 0,
          }
        )}`,
        noChannels: data[0].numberofchannels.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        }),

        avgNodeCap: `${data[0].averagenodecapacity.toFixed(2)} BTC`,
        avgNodeCapFiat: `${selectedFiat.symbol}${(
          data[0].averagenodecapacity *
          data[1].market_data.current_price[selectedCurrency]
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}`,
        avgNodeAge: `${data[0].averagenodeagedays.toFixed(0)} days`,
      };

      setLnData(transformedLnData);
      setIsLoadingLn(false);
    };

    fetchLnDataHandler();
  }, [selectedFiat, setIsLoadingLn]);

  useEffect(() => {
    setIsLoadingMining(true);
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
      setIsLoadingMining(false);
    };

    fetchMiningDataHandler();
  }, [setIsLoadingMining]);

  const [tradingData, setTradingData] = useState([]);

  useEffect(() => {
    setIsLoadingTrading(true);
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

      const selectedCurrency = selectedFiat.code.toLowerCase();

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
      setIsLoadingTrading(false);
    };

    fetchTradingDataHandler();
  }, [selectedFiat, setIsLoadingTrading]);

  useEffect(() => {
    if (
      isLoadingLn ||
      isLoadingMarket ||
      isLoadingPrice ||
      isLoadingMining ||
      isLoadingTrading
    ) {
      setIsLoading(true);
    }

    if (
      !isLoadingLn &&
      !isLoadingMarket &&
      !isLoadingPrice &&
      !isLoadingMining &&
      !isLoadingTrading
    ) {
      setIsLoading(false);
    }
  }, [
    isLoadingLn,
    isLoadingMarket,
    isLoadingMining,
    isLoadingPrice,
    isLoadingTrading,
    setIsLoading,
  ]);

  const labelStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <React.Fragment>
      <Header
        currencylist={currencies}
        currency={selectedFiat.code}
        setCurrency={setSelectedFiat}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <VStack p={4}>
          <Container>
            <PriceStats chartData={chartData} currency={selectedFiat} />
            <MarketStats
              styles={labelStyle}
              currency={selectedFiat}
              marketData={marketData}
            />
            <LnStats
              styles={labelStyle}
              currency={selectedFiat}
              lnData={lnData}
            />

            <MiningStats styles={labelStyle} miningData={miningData} />

            <TradingStats
              styles={labelStyle}
              currency={selectedFiat}
              tradingData={tradingData}
            />
          </Container>
        </VStack>
      )}
    </React.Fragment>
  );
}

export default App;
