<template>
  <div
    class="flex flex-center items-center no-wrap row"
    :class="{ reverse: reverse }"
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
      avatar_URL: "", //TODO: default to some volleyball drawing
    },
  },
  reverse: {
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.team-name {
  font-size: 0.8em;
}
</style>
