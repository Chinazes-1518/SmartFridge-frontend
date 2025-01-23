<script setup lang="ts">
import InfoBlock from "@/components/InfoBlock.vue";
import { PhBasket } from "@phosphor-icons/vue";
import {onMounted} from "vue";
import {APIRequest} from "@/utils/http";
import {ref} from 'vue'
import router from '@/router'

import { authStore } from "@/utils/auth";


let userData = ref({
  username: '',
  login: ''
})

const auth = authStore()

</script>

<template>
<div class="">
  <InfoBlock />
  </div>
</template>

<style scoped lang="scss">

</style>

