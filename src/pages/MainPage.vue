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
