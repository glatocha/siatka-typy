<template>
  <div>
    <p class="text-center q-my-none">
      {{ newDateTimeString }}
    </p>
    <div class="flex items-center justify-around">
      <team-small
        class="w40"
        :team="piniaStore.team(game.teamHome)"
      ></team-small>
      <p class="text-h4 text-bold q-my-auto">{{ game.result }}</p>
      <team-small
        class="w40"
        :team="piniaStore.team(game.teamAway)"
        reverse="true"
      ></team-small>
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
</style>
