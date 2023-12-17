<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="refreshMain" />
        </transition>
    </router-view>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import useTabbarStore from '@/store/modules/tabbar';
let tabbarStore = useTabbarStore();
let refreshMain = ref(true);
watch(() => tabbarStore.refresh, () => {
    refreshMain.value = false;
    nextTick(() => {
        refreshMain.value = true;
    })
})
</script>

<script>
export default {
    name: 'Main'
}
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>