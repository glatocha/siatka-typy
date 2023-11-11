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
        {{
          piniaStore.betsTable.find((b) => b.id == piniaStore.players[0].id)
            .score
        }}
      </div>
      <div class="col bg-player2">
        {{
          piniaStore.betsTable.find((b) => b.id == piniaStore.players[1].id)
            .score
        }}
      </div>
      <div class="col bg-player3">
        {{
          piniaStore.betsTable.find((b) => b.id == piniaStore.players[2].id)
            .score
        }}
      </div>
      <div class="col bg-player4">
        {{
          piniaStore.betsTable.find((b) => b.id == piniaStore.players[3].id)
            .score
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePiniaStore } from "src/stores/pinia";
const piniaStore = usePiniaStore();
</script>

<style lang="scss" scoped></style>
