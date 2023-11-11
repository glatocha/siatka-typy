<template>
  <div>
    <div
      class="flex flex-center items-center no-wrap row teamSmall"
      :class="{ reverse: reverse, bet: bet }"
    >
      <q-avatar>
        <img :src="team.avatar_URL" />
      </q-avatar>
      <p
        class="team-name text-weight-bold q-my-auto q-ml-sm text-center q-mx-auto"
      >
        {{ team.name }}
      </p>
    </div>
    <div v-if="last5" class="flex row justify-between last5row">
      <div
        v-for="game in last5games"
        :key="game.id"
        class="last5"
        :class="{ winner: game.isWinning }"
      >
        {{ game.isHomeTeam ? "D" : "W" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { usePiniaStore } from "src/stores/pinia";

const piniaStore = usePiniaStore();

const props = defineProps({
  team: {
    required: true,
    default: {
      name: "-",
      avatar_URL:
        "https://xpwvrhcowujasahssfag.supabase.co/storage/v1/object/public/siatka-avatars/pilka.png?t=2023-10-31T17%3A51%3A32.712Z",
    },
  },
  reverse: {
    required: false,
    default: false,
  },
  bet: {
    required: false,
    default: false,
  },
  last5: {
    required: false,
    default: false,
  },
});

const last5games = computed(() => piniaStore.last5games(props.team.id));

// console.log("last5games :>> ", last5games.value);
</script>

<style lang="scss" scoped>
.team-name {
  font-size: 0.8em;
}

.teamSmall {
  border: 3px solid white;
  border-radius: 3px;
}

.teamSmall.bet {
  // background-color: $bet-highlight;
  border-color: $bet-highlight;
}
.last5row {
  margin-top: 2px;
}

.last5 {
  background-color: #df5252;
  // width: 20%;
  flex-grow: 1;
  text-align: center;
  font-size: 0.7em;
}

.last5.winner {
  background-color: #4ecf4e;
}
</style>
