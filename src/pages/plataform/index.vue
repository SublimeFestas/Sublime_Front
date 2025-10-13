<template>
    <h1>Está pagina não existe</h1>
    <v-btn to="/">Voltar</v-btn>
</template>

<script setup>
import { userAuth } from '@/stores/userAuthStore.js';

const authStore = userAuth();
const user = authStore.state.user;
</script>