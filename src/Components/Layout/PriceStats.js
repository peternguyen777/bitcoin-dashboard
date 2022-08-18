import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const PriceStats = ({ currency, chartData }) => {
  const options = {
    chart: {
      backgroundColor: "transparent",
      type: "line",
    },
    navigator: {
      maskFill: "rgba(173, 173, 173, 0.35)",
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,
      floating: false,
      inputEnabled: false,
      buttons: [
        {
          type: "week",
          count: 1,
          text: "1w",
          title: "View 1 week",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 month",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          title: "View 6 months",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          title: "View 1 year",
        },
        {
          type: "year",
          count: 4,
          text: "4y",
          title: "View 4 year",
        },
        {
          type: "all",
          text: "All",
          title: "View all",
        },
      ],
      // selected: 2,
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
    // xAxis: [
    //   {
    //     // crosshair: false,
    //     events: {
    //       setExtremes({lastDateYear, lastDate})
    //     },
    //   },
    // ],
    yAxis: {
      labels: {
        // eslint-disable-next-line
        format: `${currency.symbol}{text}`, // The $ is literally a dollar unit
      },
      title: {
        text: `BTC-${currency.code}`,
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
