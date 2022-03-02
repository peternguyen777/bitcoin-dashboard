import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";

const PriceStats = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartDataHandler = async () => {
      const response = await fetch(
        "https://pacific-hollows-07478.herokuapp.com/https://api.blockchain.info/charts/market-price?timespan=5years"
      );

      const data = await response.json();

      const transformedChartData = data.values.map((datePrice) => [
        datePrice.x * 1000,
        datePrice.y,
      ]);

      setChartData(transformedChartData);
    };
    fetchChartDataHandler();
  }, []);

  const options = {
    chart: {
      backgroundColor: "transparent",
      type: "line",
    },
    navigator: {
      maskFill: "rgba(173, 173, 173, 0.35)",
    },
    rangeSelector: {
      floating: false,
      inputEnabled: false,
      // selected: 4,
      buttonTheme: {
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
    <React.Fragment>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </React.Fragment>
  );
};

export default PriceStats;
