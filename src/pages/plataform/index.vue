<template>
    <h1>Em devops</h1>
    <p>user: {{user}}</p>
</template>

<script setup>
import { userAuth } from '@/stores/userAuthStore.js';

const authStore = userAuth();
const user = authStore.state.user;
</script>