<template>
  <v-navigation-drawer app permanent color="white" width="250">
    <!-- Título do Grupo -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle class="text-grey text-uppercase text-caption font-weight-bold">
          Gerenciamento
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- Itens do Menu -->
    <v-list dense nav>
      <v-list-item
        style=""
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        :active="item.title === selectedItem"
        @click="selectedItem = item.title"
        active-class="bg-gray-color">
        <v-list-item-title class="d-flex" style="align-items: center; gap: 10px; font-size: 1rem;"><img :src="`/src/assets/icons/${item.icon}`" alt="" /> {{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const selectedItem = ref("Locações");

const menuItems = [
  { title: "Locações", icon: "document_icon.svg", route: "/locacoes" },
  { title: "Clientes", icon: "group_icon.svg", route: "/clientes" },
  { title: "Salão", icon: "house_icon.svg", route: "/salao" },
  { title: "Decorações", icon: "ballon_icon.svg", route: "/decoracoes" },
];
</script>
