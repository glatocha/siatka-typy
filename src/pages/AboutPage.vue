<template>
  <q-page
    class="text-primary text-center q-pa-md flex column flex-center justify-around"
  >
    <div style="font-size: 6vh">O aplikacji</div>

    <div class="text-h6 text-secondary">
      Aplikacja Fani siatki została napisana na potrzeby rodzinnej zabawy w
      zgadywanie wyników. Dostęp do tej zabawy jest zamknięty jeśli jednak
      jesteś zainteresowany kodem źródłowym, to znajduje się on na stronie
      GitHub autora.
    </div>
    <a class="block" href="https://github.com/glatocha/siatka-typy"
      >GitHub page</a
    >
    <div>
      <div class="text-h6 text-secondary">
        Autor: <span class="text-accent">{{ author }}</span>
      </div>
      <div class="text-h6 text-secondary">
        obecna wersja: <span class="text-accent">{{ version }}</span>
      </div>
      <div class="text-h6 text-secondary">
        data wersji: <span class="text-accent">{{ date }}</span>
      </div>
    </div>
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
const author = "Grzegorz Latocha";
const version = process.env.APP_VERSION;
// const version = "0.2.0";
const date = "2023-11-11";
</script>

<style lang="scss" scoped>
.block {
  display: block;
}

a {
  font-size: 1.5em;
}
</style>
