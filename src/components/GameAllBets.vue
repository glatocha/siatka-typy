<template>
  <div class="row">
    <!-- <div class="col">K {{ game.round }}</div> -->
    <div class="col">
      {{ game.round < 100 ? `K ${game.round}` : `PO ${game.round - 100}` }}
    </div>
    <div class="col-3 text-center" :class="{ winner: game.winner == 1 }">
      {{ piniaStore.team(game.teamHome).shortName }}
    </div>
    <div class="col text-center">{{ game.result }}</div>
    <div class="col-3 text-center" :class="{ winner: game.winner == 2 }">
      {{ piniaStore.team(game.teamAway).shortName }}
    </div>
    <!-- <div class="col"></div> -->
    <div
      class="col text-center q-ml-sm"
      :class="{ betOK: game.winner && game.winner == game.player1Bet }"
    >
      {{ game.player1Bet }}
    </div>
    <div
      class="col text-center"
      :class="{ betOK: game.winner && game.winner == game.player2Bet }"
    >
      {{ game.player2Bet }}
    </div>
    <div
      class="col text-center"
      :class="{ betOK: game.winner && game.winner == game.player3Bet }"
    >
      {{ game.player3Bet }}
    </div>
    <div
      class="col text-center"
      :class="{ betOK: game.winner && game.winner == game.player4Bet }"
    >
      {{ game.player4Bet }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TeamSmall from "./TeamSmall.vue";
import { usePiniaStore } from "src/stores/pinia";
import moment from "moment";

const piniaStore = usePiniaStore();

const props = defineProps({
  game: {
    required: true,
  },
});
const newDateTimeString = computed(() => {
  const dt = moment(props.game.dateTime);
  // console.log("dt :>> ", dt);
  return dt.format("YYYY-MM-DD HH:mm");
});
</script>

<style lang="scss" scoped>
.w40 {
  width: 40%;
}

.row {
  border-bottom: solid 1px black;
  padding: 1px;
}

.betOK {
  background-color: $bet-highlight;
}

.winner {
  border: 1px solid $bet-highlight;
  border-radius: 3px;
  font-weight: bold;
}
</style>
