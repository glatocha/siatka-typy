<template>
  <q-page class="vvflex vvflex-center">
    <h1 class="text-center">Witaj</h1>
    <div class="flex flex-center flex-wrqp">
      <q-btn
        v-for="(player, index) in piniaStore.players"
        :key="player.id"
        round
        class="glossy btn-round"
        :color="`player${index + 1}`"
        :label="player.name"
        @click.prevent="selectPlayer(player)"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";
const piniaStore = usePiniaStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useQuasar, QSpinnerGears } from "quasar";
const $q = useQuasar();

//download supabase data
onMounted(async () => {
  //TODO: prepare the loading spinner - with volleyball icon
  $q.loading.show({
    spinner: QSpinnerGears,
    spinnerSize: 40,
    message: "Ładowanie danych z bazy...",
    messageColor: "primary",
    boxClass: "bg-grey-2 text-grey-9",
    spinnerColor: "secondary",
    // delay: 500,
  });

  try {
    // load players from supabase
    const { data: players, error: pl_error } = await supabase
      .from("siatka-players")
      .select();
    if (pl_error) throw error;
    console.log("get players done");
    // console.log("data :>> ", players);
    piniaStore.players = players;

    // load teams from supabase
    const { data: teams, error: te_error } = await supabase
      .from("siatka-teams")
      .select()
      .order("name", { ascending: true });
    if (te_error) throw error;
    console.log("get teams done");
    // console.log("data :>> ", teams);
    piniaStore.teams = teams;

    // load games from supabase
    const { data: games, error: ga_error } = await supabase
      .from("siatka-games")
      .select()
      .order("gameNo", { ascending: true });
    if (ga_error) throw error;
    console.log("get games done");
    // console.log("data :>> ", games);
    piniaStore.games = games;

    // load bets from supabase
    const { data: bets, error: be_error } = await supabase
      .from("siatka-bets")
      .select();
    if (be_error) throw error;
    console.log("get bets done");
    // console.log("bets :>> ", bets);
    piniaStore.bets = bets;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  $q.loading.hide();
}); //onMounted

function selectPlayer(player) {
  piniaStore.activePlayer = player;
  router.push("/main");
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
