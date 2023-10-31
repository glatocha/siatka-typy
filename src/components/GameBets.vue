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
        @click="teamClick(1)"
      ></team-small>
      <p class="text-h4 text-bold q-my-auto">{{ game.result }}</p>
      <team-small
        class="w40 pointer"
        :bet="bet == 2"
        :team="piniaStore.team(game.teamAway)"
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

const bet = ref();

const newDateTimeString = computed(() => {
  const dt = moment(props.game.dateTime);
  // console.log("dt :>> ", dt);
  return dt.format("YYYY-MM-DD HH:mm");
});

function teamClick(winner) {
  bet.value = winner;
  emit("update:modelValue", winner);
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
