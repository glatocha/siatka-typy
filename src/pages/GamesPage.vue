<template>
  <q-page class="vvflex vvflex-center">
    <h4 class="text-center">Mecze</h4>
    <game-result
      class="q-mx-sm q-mb-sm"
      v-for="game in piniaStore.games"
      :key="game.id"
      :game="game"
      @click="openPopup(game)"
      :class="{
        'cursor-pointer': !game.result,
        'no-pointer-events': game.result,
      }"
    />
    <!-- <div class="flex items-center justify-around">
      <team-small
        class="w40"
        :team="piniaStore.team(piniaStore.games[0].teamHome)"
      ></team-small>
      <p class="text-h4 text-bold">{{ piniaStore.games[0].result }}</p>
      <team-small
        class="w40"
        :team="piniaStore.team(piniaStore.games[0].teamAway)"
      ></team-small>
    </div> -->
  </q-page>

  <q-dialog v-model="addScorePopup">
    <add-score
      class="q-pa-md"
      :prGame="selGame"
      @closePopup="addScorePopup = false"
    ></add-score>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GameResult from "src/components/GameResult.vue";
import AddScore from "src/components/AddScore.vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";
// import TeamSmall from "../components/TeamSmall.vue";

const piniaStore = usePiniaStore();
const addScorePopup = ref(false);

const selGame = ref(null);

function openPopup(game) {
  selGame.value = game;
  addScorePopup.value = true;
}
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
