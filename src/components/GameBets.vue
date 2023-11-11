<template>
  <div>
    <p class="text-center q-my-none">
      {{ newDateTimeString }}
    </p>
    <div class="flex items-center justify-around">
      <team-small
        class="w40 pointer"
        :bet="bet == 1"
        :team="piniaStore.team(game.teamHome)"
        last5="true"
        @click="teamClick(1)"
      ></team-small>
      <p class="text-h4 text-bold q-my-auto">{{ game.result }}</p>
      <team-small
        class="w40 pointer"
        :bet="bet == 2"
        :team="piniaStore.team(game.teamAway)"
        last5="true"
        reverse="true"
        @click="teamClick(2)"
      ></team-small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TeamSmall from "./TeamSmall.vue";
import { usePiniaStore } from "src/stores/pinia";
import moment from "moment";

const piniaStore = usePiniaStore();

const props = defineProps({
  game: {
    required: true,
  },
  modelValue: null,
});
const emit = defineEmits(["update:modelValue"]);

const bet = ref(props.game.bet);

const newDateTimeString = computed(() => {
  const dt = moment(props.game.dateTime);
  // console.log("dt :>> ", dt);
  return dt.format("YYYY-MM-DD HH:mm");
});

function teamClick(winner) {
  //checking if the game already has a game in database?
  //check if the game is not started yet
  if (
    !piniaStore.activePlayerBet(props.game.id) &&
    moment(props.game.dateTime).isAfter(moment())
  ) {
    bet.value = winner;
    emit("update:modelValue", winner);
  }
}
</script>

<style lang="scss" scoped>
.w40 {
  width: 40%;
}

.pointer {
  cursor: pointer;
}
</style>
