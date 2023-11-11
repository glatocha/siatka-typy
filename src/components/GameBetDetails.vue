<template>
  <q-card>
    <game-result :game="game" />
    <ol class="q-mx-none q-pl-none">
      <li
        v-for="(pl, index) in piniaStore.players"
        :key="pl.id"
        class="flex justify-between score-line q-mt-sm"
      >
        <div class="q-mr-auto q-ml-sm">
          {{ piniaStore.players[index].name }}
        </div>
        <div
          class="q-px-md q-mr-sm"
          :class="{
            betOK: game.winner && game[`player${index + 1}Bet`] == game.winner,
          }"
        >
          {{ game[`player${index + 1}Bet`] }}
        </div>
      </li>
    </ol>
    <q-btn
      class="q-mx-auto q-mt-sm full-width"
      label="Zamknij"
      glossy
      type="button"
      color="primary"
      @click="close"
    />
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import GameResult from "./GameResult.vue";
import { usePiniaStore } from "src/stores/pinia";

const piniaStore = usePiniaStore();

const props = defineProps({
  game: {
    required: true,
  },
});
const emit = defineEmits(["closePopup"]);

async function close() {
  emit("closePopup");
}
</script>

<style lang="scss" scoped>
.score-line {
  font-size: 2em;
  border-bottom: 1px solid black;
}

.betOK {
  background-color: $bet-highlight;
}
</style>
