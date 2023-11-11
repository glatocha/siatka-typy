<template>
  <div>
    <div class="row text-center">
      <div class="col"></div>
      <div class="col-3"></div>
      <div class="col"></div>
      <div class="col-3"></div>
      <!-- <div class="col"></div> -->
      <div class="col bg-player1 bold q-ml-sm">
        {{ piniaStore.players[0].name[0] }}
      </div>
      <div class="col bg-player2 bold">{{ piniaStore.players[1].name[0] }}</div>
      <div class="col bg-player3 bold">{{ piniaStore.players[2].name[0] }}</div>
      <div class="col bg-player4 bold">{{ piniaStore.players[3].name[0] }}</div>
    </div>
    <div class="row text-center">
      <div class="col"></div>
      <div class="col-3">GOSPODARZ</div>
      <div class="col"></div>
      <div class="col-3">GOŚĆ</div>
      <!-- <div class="col"></div> -->
      <div class="col bg-player1 q-ml-sm">
        {{ piniaStore.betsTable[0].score }}
      </div>
      <div class="col bg-player2">{{ piniaStore.betsTable[1].score }}</div>
      <div class="col bg-player3">{{ piniaStore.betsTable[2].score }}</div>
      <div class="col bg-player4">{{ piniaStore.betsTable[3].score }}</div>
    </div>
  </div>
</template>

<script setup>
import { usePiniaStore } from "src/stores/pinia";
const piniaStore = usePiniaStore();
</script>

<style lang="scss" scoped></style>
