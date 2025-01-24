<script setup lang="ts">
import { ref } from 'vue';
import {PhCheck} from "@phosphor-icons/vue";


</script>

<script lang="ts">
import { ref } from "vue";
import { viewNotify, notify, getNotification } from "@/utils/notification.ts";


</script>
<template>
<div class="notification" v-if="viewNotify">
  <div class="notification-wrapper">
    <div class="notification-card">
      <div class="notification-title" v-if="notify.status === 0">
        <PhCheck :size="30"></PhCheck>
        {{ notify.title }}
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>