<template>
  <q-page class="flex column flex-center">
    <q-btn label="Mecze" @click.prevent="router.push('/games')"></q-btn>
    <q-btn label="Typuj" @click.prevent="router.push('/bets')"></q-btn>
    <q-btn label="Moje typy"></q-btn>
    <q-btn label="Tabela"></q-btn>
    <q-btn label="Wpisz Wynik"></q-btn>
    <q-btn label="Dodaj Mecze" @click.prevent="router.push('/add')"></q-btn>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "boot/supabase";
import { usePiniaStore } from "stores/pinia";

const piniaStore = usePiniaStore();
import { useRouter } from "vue-router";
const router = useRouter();
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
</style>
