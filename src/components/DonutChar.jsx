import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
export const DonutChar = () => {
  const url = 'https://atlantia-dev-test.herokuapp.com/api/presence-share-chart/';
  const { isLoading, loadData } = useFetch({ url });
  const [chartConfig, setChartConfig] = useState();
  useEffect(() => {
    loadData().then(response => {
      setChartConfig({
        series: response && response.map(item => item.presenceShare),
        options: {
          chart: {
            width: 380,
            height: 200,
            type: 'pie',
          },
          labels: response.map(item => item.name),
          dataLabels: {
            enabled: false,
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
    });
  }, []);

  return <>{isLoading ? 'loading' : <Chart style={{ width: '100%' }} options={chartConfig && chartConfig.options} series={chartConfig && chartConfig.series} type="pie" />}</>;
};
