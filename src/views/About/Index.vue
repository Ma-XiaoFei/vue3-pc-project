<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import echart from '@/common/echart';
import QueryGroup from '@/components/QueryGroup/Index.vue';
import renderEchart from './chartOpt';
import { getList } from './api';

interface paramsType {
  sourceGoods: undefined | string | number;
  goods: undefined | string | number;
  searchItem: undefined | string;
}
let timer: any;
const title =
  '看板介绍第三方付付付付付付付付付付付付付付容看板第三方士大夫';
const dialogFormVisible = ref(false);
const el = ref();
const popoverRef = ref();
let chart: echart.ECharts;
const params: paramsType = {
  sourceGoods: undefined,
  goods: undefined,
  searchItem: undefined,
};

const groups = [
  {
    label: '商品源',
    name: 'sourceGoods',
    options: [
      { label: '自家商品', value: 1 },
      { label: '竞品', value: 2 },
    ],
  },
  {
    label: '商品',
    name: 'goods',
    options: [{ label: '111', value: 111 }],
  },
  {
    label: '搜索词',
    name: 'searchItem',
    options: [{ label: 'ass', value: 2 }],
  },
];

const data = reactive({
  params,
  groups,
  recordForm: {
    note: '',
  },
  popoverStyle: {
    display: 'none',
    left: '0',
    top: '0',
    opacity: 0,
  },
});

const echartData: any = reactive({});

const getDataSource = async () => {
  const { data } = await getList();
  echartData.a = data.a;
  echartData.b = data.b;
};

const onFinish = () => {
  console.log(data.params, 'params');
};

const hidePopover = () => {
  data.popoverStyle.display = 'none';
  data.popoverStyle.opacity = 0;
};

onMounted(() => {
  getDataSource();
  chart = echart.init(el.value);
  chart.showLoading();

  chart.on('click', (params) => {
    console.log(params);
    const event = params.event;
    const style = data.popoverStyle;
    style.display === 'none' && (style.display = 'block');
    style.left = `${(event?.offsetX || 0) + 10}px`;
    style.top = `${(event?.offsetY || 0) + 10}px`;
    style.opacity = 1;
  });
  window.addEventListener('resize', () => chart?.resize());
});

watch(echartData, (value) => {
  if (!chart) return;
  chart.setOption(renderEchart(value));
  chart.hideLoading();
});
</script>

<template>
  <div class="mainPage">
    <h1>产品页面排位看板</h1>
    <p class="page-title" :title="title">{{ title }}</p>
    <div class="main-content">
      <QueryGroup
        v-model="data.params"
        :groups="data.groups"
        :onFinish="onFinish"
      />
      <div style="position: relative">
        <div id="echart-line" ref="el"></div>
        <div :style="data.popoverStyle" id="popover" ref="popoverRef">
          <span @click="dialogFormVisible = true">记笔记</span>
          <span class="close" @click="hidePopover">x</span>
        </div>
      </div>
    </div>
   
  </div>
</template>
<style lang="less" scoped>
.mainPage {
  .page-title {
    max-height: 80px;
    margin: 20px auto 20px;
    text-align: justify;
    font-size: 14px;
  }
  .main-content {
    padding: 15px;
    width: 100%;
    border-radius: 10px;
    background: #dddddd;
  }

  #echart-line {
    margin-top: 30px;
    width: 100%;
    height: calc(100vh - 380px);
  }

  #popover {
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: rgb(157, 165, 168);
    transition: all 0.3s linear;

    .close {
      position: absolute;
      right: 0;
      top: -5px;
      cursor: pointer;
    }
  }
}
</style>
