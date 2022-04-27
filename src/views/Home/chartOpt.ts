import { ECOption } from '@/common/echart';

function renderEchart(data: any = {}) {
  const options: ECOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 0,
    },
    grid: {
      left: 10,
      right:10,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: [1, 2, 3, 4, 5, 6],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '自然位',
        type: 'line',
        smooth: true,
        data: data.a,
      },
      {
        name: '广告位',
        type: 'line',
        smooth: true,
        data: data.b,
      },
    ],
  };
  return options;
}

export default renderEchart;
