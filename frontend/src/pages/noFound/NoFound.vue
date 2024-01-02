<script setup lang="ts"></script>
<template>
  <main _h="screen" _flex="col center">
    <div _text="20xl">404</div>
    <q-btn @click="$router.push('/')">{{ $t('home') }}</q-btn>
  </main>
</template>

