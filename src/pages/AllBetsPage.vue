<template>
  <q-page class="vvflex vvflex-center">
    <!-- <h4 class="text-center">Mecze</h4> -->
    <!-- TODO: Add filtering for the round -->
    <game-all-bets-header class="q-mx-sm" />
    <game-all-bets
      class="q-mx-sm q-mb-sm"
      v-for="(game, index) in piniaStore.gamesWithBets"
      :key="game.id"
      :game="game"
      @click="openPopup(game)"
      :class="{
        lastInRound:
          piniaStore.gamesWithBets[index].round !=
          piniaStore?.gamesWithBets[index + 1]?.round,
      }"
    />
    <div class="full-width q-px-md">
      <q-btn
        to="/main"
        label="Powrót"
        glossy
        color="primary"
        class="full-width"
      />
    </div>
  </q-page>

  <q-dialog v-model="gameBetsPopup">
    <game-bet-details
      class="q-pa-md"
      :game="selGame"
      @closePopup="gameBetsPopup = false"
    />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GameResult from "src/components/GameResult.vue";
import GameAllBets from "src/components/GameAllBets.vue";
import GameAllBetsHeader from "src/components/GameAllBetsHeader.vue";
import GameBetDetails from "src/components/GameBetDetails.vue";
import AddScore from "src/components/AddScore.vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";
// import TeamSmall from "../components/TeamSmall.vue";

const piniaStore = usePiniaStore();
const gameBetsPopup = ref(false);

const selGame = ref(null);

function openPopup(game) {
  selGame.value = game;
  gameBetsPopup.value = true;
}
</script>

<style lang="scss" scoped>
.lastInRound {
  border-bottom: 3px solid black;
}
</style>
