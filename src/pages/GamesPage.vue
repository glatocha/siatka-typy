<template>
  <q-page class="vvflex vvflex-center" style="padding-top: 55px">
    <!-- <q-page-sticky position="top">
      <q-select
        class="q-mx-md"
        v-model="round"
        :options="availableRounds"
        label="Kolejka"
      ></q-select>
    </q-page-sticky> -->
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
      <q-select
        class="full-width q-px-md round-selector"
        v-model="round"
        :options="availableRounds"
        label="Kolejka"
      ></q-select>
    </q-page-sticky>
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
import { ref, onBeforeMount, onMounted, watch } from "vue";
import GameResult from "src/components/GameResult.vue";
import AddScore from "src/components/AddScore.vue";
import GameBetDetails from "src/components/GameBetDetails.vue";
import { usePiniaStore } from "stores/pinia";
import moment from "moment";
import { scroll } from "quasar";
// import TeamSmall from "../components/TeamSmall.vue";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

const piniaStore = usePiniaStore();
const addScorePopup = ref(false);
const gameBetsPopup = ref(false);

const availableRounds = ref();
const round = ref();
const roundNo = ref(null);

const selGame = ref(null);

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

onMounted(() => {
  const target = getScrollTarget(document.getElementById("lastEl"));
  const offset = document.getElementById("lastEl").offsetTop;
  const duration = 50;
  setVerticalScrollPosition(target, offset, duration);

  if (piniaStore.gameNoScore) {
    //adding the timeout that the scroll have time to fire
    setTimeout(() => {
      openPopup(piniaStore.gameNoScore);
    }, 300);
  }
});

watch(round, (nv, _) => {
  if (nv === "Wszystkie") {
    roundNo.value = null;
  } else {
    roundNo.value = +nv.split(" ")[1];
  }
});

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

.round-selector {
  width: 90%;
  background: white;
}
</style>
