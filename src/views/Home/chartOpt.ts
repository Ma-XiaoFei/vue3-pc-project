import { ECOption } from '@/common/echart';

function renderEchart(data: any = {}) {
  const options: ECOption = {
    dataZoom: {
      bottom: 5,
      borderRadius: 5,
      start: 0,
      end: 50
    },
    tooltip: {
      enterable: true,
      formatter: (params: any, a) => {
        const f = params;
        const rank = f.data.rank.split(',');
        const title = f.data.date;
        const comments = f.data.comments || [];
        const commentsLen = (f.data.comments || []).length;
        const noteHtml =  `<div>
          <label style="font-size:16px">笔记：</label>
          ${comments
            .map((t: any) => {
              return `<div style="width: 200px">
                  <label style="font-size:16px">${t.userName}</label>：<pre>${t.content}</pre>
                </div>`;
            })
            .join('')}
        </div>`;
        return `<div style="width: 250px; max-height: 30vh; overflow: auto">
            <div>${title}</div>
            <div>${f.marker} ${f.seriesName}：第${rank[0]}页，第${rank[1]}行，第${rank[2]}列</div>`
            + 
            (commentsLen ? noteHtml : '')
          + `</div>`;
      },
    },
    legend: {
      top: 0,
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 40,
      containLabel: true,
    },
    xAxis: [{
      position: 'top',
      type: 'category',
      show: false
    },{
      position: 'bottom',
      boundaryGap: false,
      type: 'category',
      data: data.xData,
    }],
    yAxis: {
      type: 'value',
      axisLine: {
        show: true
      },
      axisLabel: {
        show: false
      },
      inverse: true
    },
    series: [
      {
        name: '自然位',
        type: 'line',
        smooth: true,
        data: data.nature.map((t: CommonType.BaseObject)=> {
          //把0转成null，折线断掉链接
          return {
            ...t,
            value: t.value || null
          };
        }),
        connectNulls: false
      },
      {
        name: '广告位',
        type: 'line',
        smooth: true,
        data: data.advert.map((t: CommonType.BaseObject)=> {
          //把0转成null，折线断掉链接
          return {
            ...t,
            value: t.value || null
          };
        }),
        connectNulls: false
      },
    ],
  };
  return options;
}

export default renderEchart;
