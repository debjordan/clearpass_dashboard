import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getClearPassData } from '../api/clearpassApi';

const ClearPassChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClearPassData();
        console.log('Data fetched from API:', data); // Verifique a estrutura dos dados aqui
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data for chart', error);
      }
    };
    fetchData();
  }, []);

  const sectors = ['Montagem', 'Embalagem', 'Injeção', 'Manutenção']; // Adicione mais setores conforme necessário

  const datasetWithFilters = [];
  const seriesList = [];

  sectors.forEach(sector => {
    const datasetId = `dataset_${sector}`;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 2020 },
            { dimension: 'Sector', '=': sector }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: sector,
      endLabel: {
        show: true,
        formatter: params => `${params.value[2]}: ${params.value[0]}`
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Concessions',
        label: ['Sector', 'Concessions'],
        itemName: 'Year',
        tooltip: ['Concessions']
      }
    });
  });

  const getOption = () => ({
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: chartData
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Concessões Liberadas por Setor'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Concessions'
    },
    grid: {
      right: 140
    },
    series: seriesList
  });

  return (
    <div>
      <h2>ClearPass Chart</h2>
      {chartData.length > 0 ? (
        <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ClearPassChart;
