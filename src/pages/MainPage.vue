<template>
  <q-page class="flex column flex-center q-px-xl">
    <q-btn
      label="Mecze"
      class="full-width"
      size="lg"
      glossy
      color="primary"
      @click.prevent="router.push('/games')"
    ></q-btn>
    <q-btn
      label="Typuj"
      class="full-width"
      size="lg"
      glossy
      color="primary"
      @click.prevent="router.push('/mybets')"
    ></q-btn>
    <q-btn
      label="Wszystkie typy"
      class="full-width"
      size="lg"
      glossy
      color="primary"
      @click.prevent="router.push('/allbets')"
    ></q-btn>
    <q-btn
      label="Tabela"
      class="full-width"
      size="lg"
      glossy
      color="primary"
      @click.prevent="router.push('/table')"
    ></q-btn>
    <!-- <q-btn
      label="Wpisz Wynik"
      class="full-width"
      size="lg"
      glossy
      color="secondary"
    ></q-btn> -->
    <q-btn
      label="Dodaj Mecze"
      class="full-width"
      size="lg"
      glossy
      color="secondary"
      @click.prevent="router.push('/add')"
    ></q-btn>
    <div class="text-h6 text-secondary q-mt-lg local-dimmed">
      obecna wersja: <span class="text-accent">{{ version }}</span>
    </div>
  </q-page>
</template>

<script setup>
import moment from "moment";
import { usePiniaStore } from "stores/pinia";

const piniaStore = usePiniaStore();
import { useRouter } from "vue-router";
const router = useRouter();

const version = process.env.APP_VERSION;
//TODO: check if there is a game that should be finished but have no score
const findGameNoScore = piniaStore.games
  .filter((g) => !g.result)
  .find((g) => moment(g.dateTime).add(3, "hours").isBefore(moment()));

if (findGameNoScore) {
  const addingScore = confirm(
    `Mecz pomiędzy ${piniaStore.team(findGameNoScore.teamHome).name} a ${
      piniaStore.team(findGameNoScore.teamAway).name
    } powinien się juz zakończyć. Czy chcesz dodać wynik?`
  );
  if (addingScore) {
    piniaStore.gameNoScore = findGameNoScore;
    router.push("/games");
  } else {
    piniaStore.gameNoScore = null;
  }
}
</script>

<style lang="scss" scoped>
.btn-round {
  font-size: 2em;
  aspect-ratio: 1;
  width: 40%;
  margin: 0.5em;
}

.flex-wrap {
  align-content: center;
}

.flex {
  gap: 10px;
}

.local-dimmed {
  opacity: 50%;
}
</style>
