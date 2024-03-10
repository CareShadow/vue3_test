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
      <div class="draw" ref="drawArea" @dragover.prevent @drop="createEcharts($event)">
        <input type="text" placeholder="w" id="w">
        <input type="text" placeholder="h" id="h">
        <input type="text" placeholder="x" id="x">
        <input type="text" placeholder="y" id="y">
        <VueDragResize v-for="item in echartList"
                       :is-resizable="true"
                       :w="parseInt(item.width)"
                       :h="parseInt(item.height)"
                       :x="parseInt(item.left)"
                       :y="parseInt(item.top)"
                       :parent-limitation="true"
                       @resizing="resize($event, item)"
                       @dragging="resize($event, item)">
          <div :style="item" :id="item.id">
          </div>
        </VueDragResize>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, nextTick} from "vue";
import {v4 as uuidv4} from "uuid";
import echarts from '@/hooks/echartHook';

// 变量必须和ref="drawArea"同名
const drawArea = ref(null);
// 控件列表变量
const echartList = ref([]);
// 拖拽创建组件,向列表中添加对象
const createEcharts = (e) => {
  const uuid = uuidv4();
  const item = {
    id: uuid,
    width: 200 + "px",
    height: 150 + "px",
    backgroundColor: "#90EE90",
    opacity: 0.3,
    left: e.clientX - 310 + "px",
    top: e.clientY + "px"
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
    position: relative;
    height: inherit;
    overflow: auto;
  }
}


.newElement {
  background-color: #c6ffff70;
  position: absolute;
  left: 0px;
  top: 0px;
}

.newElement_click {
  border: 1px green dashed;
}
</style>