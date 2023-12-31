<template>
  <q-page class="vvflex vvflex-center">
    <q-form class="q-ma-md" @submit="onSubmit">
      <q-select
        v-model="round"
        :options="availableRounds"
        label="Kolejka"
      ></q-select>
      <game-bets
        v-for="game in games"
        :key="game.id"
        class="q-mx-sm q-mb-sm"
        :game="game"
        v-model="game.bet"
      />
      <q-btn
        class="q-mx-auto q-mt-sm full-width"
        label="Zapisz typowania"
        type="submit"
        color="accent"
      />
    </q-form>
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
import GameBets from "src/components/GameBets.vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";
import { useRouter } from "vue-router";
import { useQuasar, QSpinnerGears } from "quasar";
const $q = useQuasar();
const router = useRouter();

const piniaStore = usePiniaStore();

const availableRounds = ref();

const round = ref();

const games = ref([]);

onBeforeMount(() => {
  const arr = [];
  piniaStore.games.forEach((g) => {
    if (!arr.includes(g.round)) {
      arr.push(g.round);
    }
  });
  availableRounds.value = arr.map((el) => `Kolejka ${el}`);

  round.value = availableRounds.value[availableRounds.value.length - 1];
  console.log(+round.value.split(" ")[1]);
  games.value = piniaStore.games.filter(
    (g) => g.round === +round.value.split(" ")[1]
  );
  games.value.forEach((g, index) => {
    // g.bet = null;
    g.bet = piniaStore.activePlayerBet(g.id);
  });
});

watch(round, (nv, _) => {
  // console.log("watch fired");
  //after selecting the desired round, check which teams are still not assigned
  games.value = piniaStore.games.filter((g) => g.round === +nv.split(" ")[1]);
  //after changing the round all the bets will be reset
  games.value.forEach((g, index) => {
    // g.bet = null;
    g.bet = piniaStore.activePlayerBet(g.id);
  });
});

async function onSubmit() {
  //TODO: Spinner
  $q.loading.show({
    spinner: QSpinnerGears,
    spinnerSize: 40,
    message: "Ładowanie danych z bazy...",
    messageColor: "primary",
    boxClass: "bg-grey-2 text-grey-9",
    spinnerColor: "secondary",
    // delay: 500,
  });
  // Check if all games have bets
  // const nulls = games.value.reduce((p, a) => {
  //   if (!a.bet) {
  //     return p + 1;
  //   } else return p;
  // }, 0);

  // if (nulls != 0) {
  //   alert("Musisz wytypować wszystkie mecze kolejki");
  //   return;
  // }

  //filter for the games that have bets in the current page, but do not have in store (so new bets only)
  const { error } = await supabase.from("siatka-bets").insert(
    games.value
      .filter((g) => g.bet && !piniaStore.activePlayerBet(g.id))
      .map((g) => {
        return { userId: piniaStore.activePlayer.id, gameId: g.id, bet: g.bet };
      })
  );
  console.log("error :>> ", error);
  // TODO: Message success or failure
  if (error) {
    alert(`Wystąpił problem z zapisaniem typów do bazy: ${error.message}`);
  } else {
    alert("Typy zapisane poprawnie - Powodzenia!");
    router.push("/main");
  }

  //Refresh the bets list in the app
  try {
    // load bets from supabase
    const { data: bets, error: be_error } = await supabase
      .from("siatka-bets")
      .select();
    if (be_error) throw error;
    piniaStore.bets = bets;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  $q.loading.hide();
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
</style>
