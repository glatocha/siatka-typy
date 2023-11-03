<template>
  <q-layout view="lHh Lpr lFf" class="maxW">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ $route.name }} </q-toolbar-title>

        <div class="player-name">{{ piniaStore.activePlayer?.name }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Gdzie chcesz iść? </q-item-label>
        <div v-if="!piniaStore?.activePlayer">
          Musisz najierw wybrać zawodnika
          <EssentialLink v-bind="linkToIndex" />
        </div>
        <EssentialLink
          v-else
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { usePiniaStore } from "stores/pinia";
import { useRouter } from "vue-router";
const piniaStore = usePiniaStore();
const router = useRouter();
const linkToIndex = {
  title: "Zawodnicy",
  link: "/index",
};

const essentialLinks = [
  {
    title: "Zawodnicy",
    link: "/index",
  },
  {
    title: "Główna",
    link: "/main",
  },
  {
    title: "Mecze",
    link: "/games",
  },
  {
    title: "Typuj",
    link: "/mybets",
  },
  {
    title: "Wszystkie typy",
    link: "/allbets",
  },
  {
    title: "Tabela",
    link: "/table",
  },
];

const user = computed(() => piniaStore.activePlayer);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

watch(user, (nv, _) => {
  if (!nv) {
    console.log("lost user, redirecting to index screen");
    //redirect to user selection if lost the user (should be mostly case for development period)
    router.push("/index");
  }
});
</script>

<style lang="scss" scoped>
.player-name {
  font-size: 1.3rem;
  font-weight: bold;
}

.maxW {
  max-width: 800px;
  margin: 0 auto;
}
</style>
