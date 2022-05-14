<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from 'vue';
import {
  getFieldsUsingGET,
  getFigureNaturalUsingGET,
  submitCommentUsingPOST,
  getFigureAssiUsing,
} from './api';
import echart from '@/common/echart';
import QueryGroup from '@/components/QueryGroup/Index.vue';
import renderEchart from './chartOpt';

interface paramsType {
  sourceGoods: undefined | string | number;
  productId: undefined | string | number;
  wordId: undefined | string;
}

const title =
  '看板介绍，样例内容看板介绍，样例内容看板介绍，样例内容看板介绍，样例内容看板介绍，样例内容看板';
const dialogFormVisible = ref(false);
const el = ref();
const popoverRef = ref();
let chart: echart.ECharts;

const params: paramsType = {
  sourceGoods: undefined,
  productId: undefined,
  wordId: undefined,
};

const selectData: CommonType.BaseObject = {
  sourceName: [],
  asinObj: [],
  searchWords: [],
};
const echartData: CommonType.BaseObject = reactive({});
const data = reactive({
  params,
  selectData,
  recordForm: {
    note: '',
  },
  sourceGoods: '',
  productId: '',
  wordId: '',
  popoverStyle: {
    display: 'none',
    left: '0',
    top: '0',
    opacity: 0,
  },
  currentEhartData: {
    pointType: '',
    pointId: '',
  },
});

/* 获取下拉数据 */
const getSelectFn = async () => {
  const res = await getFieldsUsingGET();
  const resData = res.data || [];
  if (resData) {
    const asinObj: CommonType.BaseObject = {};
    const searchWords: CommonType.BaseObject = {};
    const sourceName = resData.map((t) => {
      const asinArr = t.content?.map((t) => {
        const searchArr = (t.searchWords || []).map((t) => {
          return {
            label: t.word,
            value: t.wordId,
          };
        });
        searchWords[t.productId] = searchArr;
        return {
          label: t.asin,
          value: t.productId,
        };
      });
      t.sourceName && (asinObj[t.sourceName] = asinArr);

      return { label: t.sourceName, value: t.sourceName };
    });

    data.selectData = {
      sourceName,
      asinObj,
      searchWords,
    };
  }
};

getSelectFn();

const groups = computed(() => {
  const asinArr = data.selectData.asinObj[data.productId] || [];
  const searchArr = data.selectData.searchWords[data.wordId] || [];
  return [
    {
      label: '商品源',
      name: 'sourceGoods',
      options: data.selectData.sourceName,
    },
    {
      label: '商品',
      name: 'productId',
      options: asinArr,
    },
    {
      label: '搜索词',
      name: 'wordId',
      options: searchArr,
    },
  ];
});

const getDataSource = async () => {
  const { productId, wordId } = data.params;
  const param = {
    productId: String(productId) || undefined,
    wordId,
  };
  if (!(productId && wordId)) return;
  chart && chart.showLoading();
  const { data: natureData = [] } = await getFigureNaturalUsingGET(param);
  const { data: assiuData = [] } = await getFigureAssiUsing(param);
  const nature: any = [];
  const advert: any = [];
  const dateList = natureData.map((t) => {
    nature.push({ value: t.rankNum, ...t });
    return t.date;
  });
  assiuData.forEach((t) => {
    advert.push({ value: t.rankNum, ...t });
  });
  data.popoverStyle.display = 'none';
  echartData.nature = nature;
  echartData.advert = advert;
  echartData.xData = dateList;
};

const handleChange = (v: string, name: string) => {
  if (name === 'sourceGoods') {
    data.productId = v;
    data.params.productId = undefined;
    data.params.wordId = undefined;
  }
  if (name === 'productId') {
    data.wordId = v;
    data.params.wordId = undefined;
  }
};

const onFinish = () => {
  getDataSource();
};

const hidePopover = () => {
  data.popoverStyle.display = 'none';
  data.popoverStyle.opacity = 0;
};

const handleSave = async () => {
  dialogFormVisible.value = false;
  const { pointId, pointType } = data.currentEhartData;
  await submitCommentUsingPOST({
    sourceId: +pointId,
    sourceType: pointType,
    content: data.recordForm.note,
    userId: 6,
  });
  data.recordForm.note = '';
  data.popoverStyle.display = 'none';
  getDataSource();
};

onMounted(() => {
  chart = echart.init(el.value);
  chart.on('click', (params) => {
    data.currentEhartData = params.data as any;
    const elWidth = el.value.offsetWidth;
    const event = params.event;
    if (!event) return;
    const left =
      event.offsetX > elWidth - 100 ? event.offsetX - 100 : event.offsetX + 10;
    const top = (event?.offsetY || 0) + 10;
    const style = data.popoverStyle;
    style.display === 'none' && (style.display = 'block');
    style.left = `${left}px`;
    style.top = `${top}px`;
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
        :groups="groups"
        :onFinish="onFinish"
        :onChange="handleChange"
      />
      <div style="position: relative">
        <div id="echart-line" ref="el"></div>
        <div :style="data.popoverStyle" id="popover" ref="popoverRef">
          <span @click="dialogFormVisible = true">
            <svg
              style="
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-right: 5px;
              "
              t="1652361769679"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12420"
              width="200"
              height="200"
            >
              <path
                d="M954.5 336.466667A341.073333 341.073333 0 0 0 640 128H384a341.333333 341.333333 0 0 0-256 567.106667V917.333333a21.333333 21.333333 0 0 0 36.42 15.086667l132.873333-132.873333A342.193333 342.193333 0 0 0 384 810.666667h256a341.506667 341.506667 0 0 0 314.5-474.2z"
                fill="#ffffff"
                p-id="12421"
              ></path>
            </svg>
            添加笔记
          </span>
          <span class="close" @click="hidePopover">x</span>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="添加笔记"
      :close-on-click-modal="false"
    >
      <el-form :model="data.recordForm">
        <el-form-item>
          <el-input
            v-model="data.recordForm.note"
            autocomplete="off"
            :autosize="{ minRows: 8 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.mainPage {
  .page-title {
    height: 80px;
    margin: 20px auto 20px;
    text-align: justify;
    font-size: 14px;
    overflow: hidden;
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

    @media screen and(min-width: 1200px) {
      height: calc(100vh - 305px);
    }
  }

  #popover {
    position: absolute;
    width: 100px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    color: #dddddd;
    background-color: #4d4d4d;
    transition: all 0.3s linear;

    span,
    svg {
      font-size: 14px;
      cursor: pointer;
    }

    .close {
      position: absolute;
      right: 5px;
      top: -18px;
      cursor: pointer;
    }
  }
}
</style>
