<template>
  <q-page class="vvflex vvflex-center">
    <q-form class="q-ma-md" @submit="onSubmit">
      <q-select
        v-model="round"
        :options="availableRounds"
        label="Kolejka"
      ></q-select>
      <date-time-picker v-model="dateTime" />
      <q-btn-group spread>
        <q-btn
          color="primary"
          label="Dz-"
          type="button"
          glossy
          @click="subDay"
        />
        <q-btn
          color="primary"
          label="Dz+"
          type="button"
          glossy
          @click="addDay"
        />
        <q-btn
          color="secondary"
          label="14:45"
          type="button"
          glossy
          @click="time1"
        />
        <q-btn
          color="secondary"
          label="17:30"
          type="button"
          glossy
          @click="time2"
        />
        <q-btn
          color="secondary"
          label="20:30"
          type="button"
          glossy
          @click="time3"
        />
      </q-btn-group>

      <q-select
        v-model="teamHome"
        :options="availableTeams"
        label="Gospodarze"
      ></q-select>
      <q-select
        v-model="teamAway"
        :options="availableTeams"
        label="Goście"
      ></q-select>
      <game-result class="q-mx-sm q-my-md" :game="game" />
      <q-btn
        class="q-mx-auto q-mt-sm full-width"
        label="Dadaj mecz"
        glossy
        type="submit"
        color="accent"
      />
    </q-form>
    <q-space></q-space>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import DateTimePicker from "src/components/DateTimePicker.vue";
import GameResult from "src/components/GameResult.vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";
import moment from "moment";
const piniaStore = usePiniaStore();

const availableRounds = computed(() =>
  [...Array(29).keys()].map((i) => `kolejka ${i + 1}`)
);
const round = ref("kolejka 4"); //TODO: Select by def next not finished round
const dateTime = ref(moment().format("YYYY-MM-DD HH:mm"));
const availableTeams = ref(getAvailableTeams(round.value).map((t) => t.name));
// console.log("availableTeams :>> ", availableTeams);
const teamHome = ref("");
const teamAway = ref("");
// const teamHome = ref(availableTeams?.value[0] ?? "");
// const teamAway = ref(availableTeams?.value[1] ?? "");

watch(round, (nv, _) => {
  // console.log("watch fired");
  //after selecting the desired round, check which teams are still not assigned
  availableTeams.value = getAvailableTeams(nv).map((t) => t.name);
  updateGame();
});

watch(teamAway, (_1, _2) => {
  updateGame();
});
watch(teamHome, (_1, _2) => {
  updateGame();
});
watch(dateTime, (_1, _2) => {
  updateGame();
});

function subDay() {
  dateTime.value = moment(dateTime.value)
    .subtract(1, "days")
    .format("YYYY-MM-DD HH:mm");
}
function addDay() {
  dateTime.value = moment(dateTime.value)
    .add(1, "days")
    .format("YYYY-MM-DD HH:mm");
}
function time1() {
  dateTime.value = moment(dateTime.value)
    .set({ hour: 14, minute: 45 })
    .format("YYYY-MM-DD HH:mm");
}
function time2() {
  dateTime.value = moment(dateTime.value)
    .set({ hour: 17, minute: 30 })
    .format("YYYY-MM-DD HH:mm");
}
function time3() {
  dateTime.value = moment(dateTime.value)
    .set({ hour: 20, minute: 30 })
    .format("YYYY-MM-DD HH:mm");
}

function getAvailableTeams(round) {
  // console.log("get Teams function");
  const r = +round.split(" ")[1];
  const teamsInRound = [];
  piniaStore.games
    .filter((el) => el.round === r)
    .forEach((g) => {
      teamsInRound.push(g.teamHome);
      teamsInRound.push(g.teamAway);
    }); //create a list of already used teams for that round
  console.log("teamsInRound :>> ", teamsInRound);
  return piniaStore.teams.filter((t) => !teamsInRound.includes(t.id)); //subtract the used teams from the teams list
}

const game = ref({
  round: null,
  dateTime: null,
  teamHome: null, //id of the team
  teamAway: null, //id of the team
});

function updateGame() {
  game.value.round = +round.value.split(" ")[1];
  game.value.dateTime = dateTime.value;
  game.value.teamHome = piniaStore.teamId(teamHome.value) ?? "";
  game.value.teamAway = piniaStore.teamId(teamAway.value) ?? "";
}

async function onSubmit() {
  updateGame();
  //console.log("game :>> ", game.value);

  //TODO: Spinner
  const { error } = await supabase.from("siatka-games").insert(game.value);
  console.log("error :>> ", error);
  // TODO: Message success or failure

  //Refresh the games list in the app
  try {
    // load games from supabase
    const { data: games, error: ga_error } = await supabase
      .from("siatka-games")
      .select();
    if (ga_error) throw error;
    piniaStore.games = games;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  //Refresh available teams
  availableTeams.value = getAvailableTeams(round.value).map((t) => t.name);
  teamAway.value = "";
  teamHome.value = "";
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
