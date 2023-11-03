<template>
  <q-page class="vvflex vvflex-center">
    <q-select
      class="q-mx-md"
      v-model="round"
      :options="availableRounds"
      label="Kolejka"
    ></q-select>
    <game-result
      class="q-mx-sm q-mb-sm"
      v-for="(game, index) in piniaStore.gamesWithBets.filter((g) => {
        return !roundNo || g.round == roundNo;
      })"
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

  <q-dialog v-model="addScorePopup">
    <add-score
      class="q-pa-md"
      :prGame="selGame"
      @closePopup="addScorePopup = false"
    ></add-score>
  </q-dialog>
  <q-dialog v-model="gameBetsPopup">
    <game-bet-details
      class="q-pa-md"
      :game="selGame"
      @closePopup="gameBetsPopup = false"
    />
  </q-dialog>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import GameResult from "src/components/GameResult.vue";
import AddScore from "src/components/AddScore.vue";
import GameBetDetails from "src/components/GameBetDetails.vue";
import { usePiniaStore } from "stores/pinia";
import moment from "moment";
// import TeamSmall from "../components/TeamSmall.vue";

const piniaStore = usePiniaStore();
const addScorePopup = ref(false);
const gameBetsPopup = ref(false);

const availableRounds = ref();
const round = ref();
const roundNo = ref(null);

onBeforeMount(() => {
  const arr = [];
  piniaStore.games.forEach((g) => {
    if (!arr.includes(g.round)) {
      arr.push(g.round);
    }
  });
  availableRounds.value = arr.map((el) => `Kolejka ${el}`);
  availableRounds.value.unshift("Wszystkie");

  round.value = availableRounds.value[0];
  roundNo.value = null;
});

watch(round, (nv, _) => {
  if (nv === "Wszystkie") {
    roundNo.value = null;
  } else {
    roundNo.value = +nv.split(" ")[1];
  }
});

const selGame = ref(null);

function openPopup(game) {
  selGame.value = game;
  if (game.result) {
    gameBetsPopup.value = true;
  } else {
    if (moment(game.dateTime).isAfter(moment())) {
      gameBetsPopup.value = true;
    } else {
      addScorePopup.value = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.lastInRound {
  border-bottom: 3px solid black;
  padding-bottom: 3px;
}
</style>
