<template>
    <div class="drag_container">
        <VueDragResize :isResizable="true" :isActive="dragObj.isActive" :w="dragObj.width" :h="dragObj.height"
            @resizing="resize" :x="dragObj.left" :y="dragObj.top" @dragging="resize" contentClass="drag_style"
            :parentLimitation="true" @activated="onActivated" @deactivated="onDeactivated">
            <div id="main" :style="{ height: dragObj.height + 'px', width: dragObj.width + 'px' }">
            </div>
        </VueDragResize>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import echarts from '@/hooks/echartHook'
let dragObj = reactive({
    width: 300,
    height: 200,
    top: 0,
    left: 0,
    isActive: false
})
let chart;
// 调正
const resize = (newRect) => {
    dragObj.width = newRect.width;
    dragObj.height = newRect.height;
    dragObj.top = newRect.top;
    dragObj.left = newRect.left;
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

const onActivated = () => {
    dragObj.isActive = true;
}

const onDeactivated = () => {
    dragObj.isActive = false;
}

</script>

<style lang="scss" scoped>
.drag_container {
    position: relative;
    height: calc(100% - 5px);
    width: calc(100% - 4px);
}

.drag_style {
    border-radius: 50%;
}
</style>