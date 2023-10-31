<template>
  <q-card>
    <game-result :game="game" />
    <q-btn-group spread class="q-my-sm">
      <q-btn
        color="primary"
        label="3:2"
        glossy
        type="button"
        @click="score('3:2')"
      />
      <q-btn
        color="primary"
        label="3:1"
        glossy
        type="button"
        @click="score('3:1')"
      />
      <q-btn
        color="primary"
        label="3:0"
        glossy
        type="button"
        @click="score('3:0')"
      />
      <q-btn
        color="secondary"
        label="0:3"
        glossy
        type="button"
        @click="score('0:3')"
      />
      <q-btn
        color="secondary"
        label="1:3"
        glossy
        type="button"
        @click="score('1:3')"
      />
      <q-btn
        color="secondary"
        label="2:3"
        glossy
        type="button"
        @click="score('2:3')"
      />
    </q-btn-group>
    <q-btn
      class="q-mx-auto q-mt-sm full-width"
      label="Zapisz Wynik"
      glossy
      type="button"
      color="accent"
      @click="saveScore"
    />
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import GameResult from "./GameResult.vue";
import { usePiniaStore } from "src/stores/pinia";
import { supabase } from "boot/supabase";
import moment from "moment";

const piniaStore = usePiniaStore();

const props = defineProps({
  prGame: {
    required: true,
  },
});
const emit = defineEmits(["closePopup"]);

const game = ref({ ...props.prGame });

function score(score) {
  //   console.log("score :>> ", score);
  game.value.result = score;
}

async function saveScore() {
  console.log("game :>> ", game);
  //check if game alredy happened
  const now = moment();
  if (now.isBefore(moment(game.value.dateTime))) {
    alert("Mecz się jeszcze nie odbył");
    emit("closePopup");
    return;
  }
  //check if result selected
  if (game.value.result === null) {
    alert("Wybierz wynik");
    return;
  }
  //set the winner
  if (["3:0", "3:1", "3:2"].includes(game.value.result)) {
    game.value.winner = 1;
  } else if (["0:3", "1:3", "2:3"].includes(game.value.result)) {
    game.value.winner = 2;
  }
  //Set the score
  piniaStore.games.find((g) => g.id === game.value.id).result =
    game.value.result;
  piniaStore.games.find((g) => g.id === game.value.id).winner =
    game.value.winner;

  //Update at supabase level
  const { error } = await supabase
    .from("siatka-games")
    .update({ result: game.value.result, winner: game.value.winner })
    .eq("id", game.value.id);
  if (error) {
    console.log("error :>> ", error);
    alert(error);
  }
  emit("closePopup");
}
</script>

<style lang="scss" scoped></style>
