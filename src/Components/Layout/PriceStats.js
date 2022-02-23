import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useCallback, useEffect } from "react";

const PriceStats = () => {
  const [chartData, setChartData] = useState([]);

  const fetchChartDataHandler = useCallback(async () => {
    const response = await fetch(
      "https://pacific-hollows-07478.herokuapp.com/https://api.blockchain.info/charts/market-price?timespan=5years"
    );

    const data = await response.json();

    const transformedChartData = data.values.map((datePrice) => [
      datePrice.x * 1000,
      datePrice.y,
    ]);

    console.log(transformedChartData);
    setChartData(transformedChartData);
  }, []);

  useEffect(() => {
    fetchChartDataHandler();
  }, [fetchChartDataHandler]);

  const options = {
    chart: {
      backgroundColor: "transparent",
      type: "line",
    },
    navigator: {
      // enabled: false,
      maskFill: "rgba(173, 173, 173, 0.35)",
    },
    rangeSelector: {
      // enabled: false,
      floating: false,
      inputEnabled: false,
      buttonTheme: {
        // styles for the buttons
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 8,
        style: {
          color: "#F7931A",
          fontWeight: "bold",
        },
        states: {
          hover: {},
          select: {
            fill: "#F7931A",
            style: {
              color: "white",
            },
          },
        },
      },
    },
    scrollbar: {
      enabled: false,
    },
    plotOptions: {
      series: {
        color: "#F7931A",
      },
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      crosshair: false,
    },
    yAxis: {
      labels: {
        // eslint-disable-next-line
        format: "${text}", // The $ is literally a dollar unit
      },
      title: {
        text: "BTC-USD",
      },
    },
    series: [
      {
        data: chartData,
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default PriceStats;
