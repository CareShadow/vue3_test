<template>
    <div class="father">
        <VueDragResize :isResizable="true" :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize"
            :preventActiveBehavior="true">
            <h3>Hello World!</h3>
            <p>{{ body.top }} х {{ body.left }} </p>
            <p>{{ body.width }} х {{ body.height }}</p>
        </VueDragResize>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
let body = reactive({
    width: 200,
    height: 200,
    top: 200,
    left: 200
})

const resize = (newRect) => {
    body.width = newRect.width;
    body.height = newRect.height;
    body.top = newRect.top;
    body.left = newRect.left;
}
</script>

<style lang="scss" scoped>
.father {
    width: 400px;
    height: 400px;
    background-color: skyblue;
}
</style>