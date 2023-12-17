<template>
    <div class="drag_container">
        <VueDragResize :isResizable="true" :isActive="true" :w="body.width" :h="body.height" @resizing="resize"
            :x="body.left" :y="body.top" @dragging="resize" :preventActiveBehavior="true" contentClass="drag_style"
            :parentLimitation="true">
            <div id="main" :style="{ height: body.height + 'px', width: body.width + 'px' }">
            </div>
        </VueDragResize>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import echarts from '@/hooks/echartHook'
let body = reactive({
    width: 300,
    height: 200,
    top: 0,
    left: 0
})
let chart;
// 调正
const resize = (newRect) => {
    body.width = newRect.width;
    body.height = newRect.height;
    body.top = newRect.top;
    body.left = newRect.left;
    chart.resize();
}

onMounted(() => {
    chart = echarts.init(document.getElementById("main"));
    chart.setOption({
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
    })
})
</script>

<style lang="scss" scoped>
.drag_container {
    position: relative;
    height: calc(100% - 5px);
    width: calc(100% - 4px);
}
</style>