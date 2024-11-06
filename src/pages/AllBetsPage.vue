<template>
  <q-page class="vvflex vvflex-center" style="padding-top: 55px">
    <!-- <h4 class="text-center">Mecze</h4> -->
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
    <div class="full-width q-px-md q-mb-md" id="lastEl">
      <q-btn
        to="/main"
        label="Powrót"
        glossy
        color="primary"
        class="full-width"
      />
    </div>

    <q-page-sticky expand position="top">
      <!-- put the top here -->
      <game-all-bets-header
        class="full-width q-px-sm q-pt-sm sticky-top maxW"
      />
    </q-page-sticky>
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
import GameAllBets from "src/components/GameAllBets.vue";
import GameAllBetsHeader from "src/components/GameAllBetsHeader.vue";
import GameBetDetails from "src/components/GameBetDetails.vue";
import { usePiniaStore } from "stores/pinia";
import { scroll } from "quasar";
// import TeamSmall from "../components/TeamSmall.vue";

const piniaStore = usePiniaStore();
const gameBetsPopup = ref(false);
const { getScrollTarget, setVerticalScrollPosition } = scroll;

const selGame = ref(null);

function openPopup(game) {
  selGame.value = game;
  gameBetsPopup.value = true;
}

onMounted(() => {
  const target = getScrollTarget(document.getElementById("lastEl"));
  const offset = document.getElementById("lastEl").offsetTop;
  const duration = 50;
  setVerticalScrollPosition(target, offset, duration);
});
</script>

<style lang="scss" scoped>
.maxW {
  max-width: 800px;
}

.lastInRound {
  border-bottom: 3px solid black;
}

.sticky-top {
  background: white;
}
</style>
