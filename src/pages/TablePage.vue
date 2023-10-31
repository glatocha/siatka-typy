<template>
  <q-page class="vvflex vvflex-center">
    <h6 class="text-center q-my-md">
      Tabela wyników po {{ gamesPlayed }} rozegranych meczach
    </h6>
    <ol class="q-mx-md q-pl-sm">
      <li
        v-for="(pl, index) in betsTable"
        :key="pl.id"
        class="flex justify-between score-line"
      >
        <div>{{ index + 1 }}</div>
        <div class="q-mr-auto q-ml-md">{{ pl.name }}</div>
        <div>{{ pl.score }}</div>
      </li>
    </ol>
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
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";

const piniaStore = usePiniaStore();

const betsTable = piniaStore.betsTable.sort((a, b) => {
  a.score - b.score;
});
const gamesPlayed = piniaStore.games.filter((g) => g.result).length;

console.log("scores :>> ", piniaStore.betsTable);
</script>

<style lang="scss" scoped>
.score-line {
  font-size: 2em;
  border-bottom: 1px solid black;
}

//:class="`bg-player${index + 1}`"
</style>
