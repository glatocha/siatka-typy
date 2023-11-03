<template>
  <div
    class="flex flex-center items-center no-wrap row"
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
</template>

<script setup>
const props = defineProps({
  team: {
    required: true,
    default: {
      name: "-",
      avatar_URL:
        "https://xpwvrhcowujasahssfag.supabase.co/storage/v1/object/public/siatka-avatars/pilka.png?t=2023-10-31T17%3A51%3A32.712Z", //TODO: default to some volleyball drawing
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
});
</script>

<style lang="scss" scoped>
.team-name {
  font-size: 0.8em;
}

.bet {
  // background-color: $bet-highlight;
  border: 3px solid $bet-highlight;
  border-radius: 3px;
}
</style>
