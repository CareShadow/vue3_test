<template>
  <div>
    <div class="container">
      <div class="silder">
        <div class="echart_component" draggable="true" ref="line">1</div>
        <div class="echart_component" draggable="true" ref="bar">2</div>
        <div class="echart_component" draggable="true">3</div>
        <div class="echart_component" draggable="true">4</div>
        <div class="echart_component" draggable="true">5</div>
        <div class="echart_component" draggable="true">6</div>
        <div class="echart_component" draggable="true">7</div>
        <div class="echart_component" draggable="true">8</div>
        <div class="echart_component" draggable="true">9</div>
        <div class="echart_component" draggable="true">10</div>
        <div class="echart_component" draggable="true">11</div>
        <div class="echart_component" draggable="true">12</div>
        <div class="echart_component" draggable="true">13</div>
        <div class="echart_component" draggable="true">14</div>
        <div class="echart_component" draggable="true">15</div>
        <div class="echart_component" draggable="true">16</div>
      </div>
      <div class="draw">
        <div class="tools_box">
          <label for="box_width">W:</label>
          <input id="box_width" type="text" class="mi-input" autocomplete="off" v-model.number.lazy="showWidth">
          <label for="box_height">H:</label>
          <input id="box_height" type="text" class="mi-input" autocomplete="off" v-model.number.lazy="showHeight">
          <label for="box_left">X:</label>
          <input id="box_left" type="text" class="mi-input" autocomplete="off" v-model.number.lazy="showLeft">
          <label for="box_top">Y:</label>
          <input id="box_top" type="text" class="mi-input" autocomplete="off" v-model.number.lazy="showTop">
          <label for="box_zindex">Z:</label>
          <input id="box_zindex" type="text" class="mi-input" autocomplete="off" v-model.number.lazy="showZindex">
        </div>
        <div ref="drawArea" @dragover.prevent @drop="createEcharts($event)" class="drawArea">
          <VueDragResize v-for="item in echartList"
                         :is-resizable="true"
                         :is-active="item.isActive"
                         :w="parseInt(item.width)"
                         :h="parseInt(item.height)"
                         :minw="0"
                         :minh="0"
                         :x="parseInt(item.left)"
                         :y="parseInt(item.top)"
                         :z="item.zIndex"
                         :parent-limitation="true"
                         @resizing="resize($event, item)"
                         @activated="onActivated(item)"
                         @deactivated="onDeactivated(item)"
                         @dragging="resize($event, item)">
            <div :style="item" :id="item.id">
            </div>
          </VueDragResize>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, nextTick, computed, watch} from "vue";
import {v4 as uuidv4} from "uuid";
import echarts from '@/hooks/echartHook';

// 被选择元素的数组
const selectedList = ref([]);
// 变量必须和ref="drawArea"同名
const drawArea = ref(null);
// 控件列表变量
const echartList = ref([]);
// 显示框信息
const showWidth = computed({
  get() {
    return selectedList.value.length > 0 ? parseInt(selectedList.value[0].width) : null;
  },
  set(newValue) {
    selectedList.value[0].width = newValue + 'px'
  }
});
const showHeight = computed({
  get() {
    return selectedList.value.length > 0 ? parseInt(selectedList.value[0].height) : null;
  },
  set(newValue) {
    selectedList.value[0].height = newValue + 'px'
  }
});
const showLeft = computed({
  get() {
    return selectedList.value.length > 0 ? parseInt(selectedList.value[0].left) : null;
  },
  set(newValue) {
    selectedList.value[0].left = newValue + 'px'
  }
});
const showTop = computed({
  get() {
    return selectedList.value.length > 0 ? parseInt(selectedList.value[0].top) : null;
  },
  set(newValue) {
    selectedList.value[0].top = newValue + 'px'
  }
});
const showZindex = computed({
  get() {
    return selectedList.value.length > 0 ? parseInt(selectedList.value[0].zIndex) : null;
  },
  set(newValue) {
    selectedList.value[0].zIndex = newValue
  }
});

// 拖拽创建组件,向列表中添加对象
const createEcharts = (e) => {
  const uuid = uuidv4();
  const item = {
    id: uuid,
    isActive: true,
    width: 200 + "px",
    height: 150 + "px",
    backgroundColor: "#90EE90",
    opacity: 0.3,
    left: e.clientX - 310 + "px",
    top: e.clientY + "px",
    zIndex: 0
  }
  echartList.value.push(item);
  nextTick(() => {
    // 找到渲染出来的dom元素，用于初始化echart组件
    const echartItem = drawArea.value.querySelector(`[id="${uuid}"]`);
    // echart中的option定义，用于测试
    const option = {
      grid: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        }
      ]
    };
    const barChart = echarts.init(echartItem);
    barChart.setOption(option);
  })
}

const resize = (e, item) => {
  item.left = e.left + "px";
  item.top = e.top + "px";
  item.width = e.width + "px";
  item.height = e.height + "px";
  // 找到渲染出来的dom元素，用于初始化echart组件
  const echartItem = drawArea.value.querySelector(`[id="${item.id}"]`);
  const chart = echarts.getInstanceByDom(echartItem);
  // echart组件重新适配容器大小
  chart.resize();
}

const onActivated = (item) => {
  // 点击元素将它的配置选项数值放置到被选择的元素数组上
  item.isActive = true;
  selectedList.value.push(item);
}

const onDeactivated = (item) => {
  const index = selectedList.value.findIndex(obj => obj.id = item.id);
  selectedList.value.splice(index, 1);
  item.isActive = false;
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: beige;
  background-image: url(@/assets/images/darw.png);

  .silder {
    display: flex;
    flex: none;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 310px;
    height: inherit;
    padding: 10px 0 0 0;
    background-color: #36383b;
    overflow-y: auto;

    .echart_component {
      width: 140px;
      height: 100px;
      color: #ffffff;
      margin: 0 0 10px 10px;
      background-color: #222830;
      text-align: center;
      line-height: 100px;
    }
  }

  .draw {
    width: calc(100vw - 310px);
    height: inherit;


    .drawArea {
      position: relative;
      height: calc(100vh - 30px);
      overflow: auto;
    }

    .tools_box {
      background-color: #36383B;
      height: 30px;
      padding: 5px 10px;
      color: #ffffff99;

      .mi-input {
        width: 40px;
        height: 17px;
        margin: 0 5px;
        background-color: #ffffff30;
        color: #eee;
        font-size: 14px;
        border: #ffffff99 1px solid;
      }
    }
  }
}
</style>