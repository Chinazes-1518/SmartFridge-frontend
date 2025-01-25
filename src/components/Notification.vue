<script setup lang="ts">
import { ref } from 'vue';
import {PhCheck} from "@phosphor-icons/vue";


</script>

<script lang="ts">
import { ref } from "vue";
import { viewNotify, notify, getNotification } from "@/utils/notification.ts";


</script>
<template>
<div class="notification" v-if="!viewNotify">
  <div class="notification-wrapper">
    <div class="notification-card">
      <div class="notification-title" v-if="notify.status === 0">
<!--        <PhCheck :size="36"></PhCheck>-->
        {{ notify.title }}
      </div>
      <div class="notification-body">{{ notify.msg }}</div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;

  &-card {
    width: 400px;
    padding: 20px;
    border: 1px solid #a3d886;
    background: #d9dbb2;
    //color: rgb(0, 204, 0);
    border-radius: 15px;
  }

  &-title {
    display: flex;
    align-items: center;
    gap: 0 15px;
    font-weight: 600;
    font-size: 1.15rem;
    margin-bottom: 10px;
  }
}
</style>