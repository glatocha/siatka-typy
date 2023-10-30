<template>
  <q-page class="vvflex vvflex-center">
    <h1 class="text-center">Bets</h1>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";

const piniaStore = usePiniaStore();
</script>

<style lang="scss" scoped>
.btn-round {
  font-size: 2em;
  aspect-ratio: 1;
  width: 40%;
  margin: 0.5em;
}

.flex-wrap {
  align-content: center;
}
</style>
