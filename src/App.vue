<template>
  <div class="root" id="root">
    <router-view v-slot="{ Component, route }">
      <div class="layout">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </div>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}
</style>
