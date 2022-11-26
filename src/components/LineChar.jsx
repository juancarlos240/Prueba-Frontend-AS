import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

export const LineChar = () => {
  const url = 'https://atlantia-dev-test.herokuapp.com/api/price-evolution-chart/';
  const { isLoading, loadData } = useFetch({ url });
  const [chartConfig, setChartConfig] = useState({});

  const filterArrs = data => {
    let result = data.reduce((prev, current) => {
      let exists = prev.find(x => x.sku === current.sku);
      if (!exists) {
        exists = { sku: current.sku, name: current.name, data: [], dateExtraction: [] };
        prev.push(exists);
      }
      if (current.price != null && current.dateExtraction != null) {
        let val = { y: current.price, x: current.dateExtraction };
        exists.data.push(val);
      }
      return prev;
    }, []);
    setChartConfig({
      series: result.map(item => ({ name: item.name, data: item.data })),
      xaxis: {
        type: 'datetime',
      },
      options: {
        chart: {
          height: 380,
          width: '100%',

          toolbar: {
            show: false,
          },

          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },

        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: 'datetime',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    });
  };

  useEffect(() => {
    loadData().then(response => {
      filterArrs(response);
    });
  }, []);

  return <>{isLoading ? 'loading' : <Chart style={{ width: '100%', padding: 30 }} options={chartConfig.options} series={chartConfig.series} height="80%" type="line" />}</>;
};
