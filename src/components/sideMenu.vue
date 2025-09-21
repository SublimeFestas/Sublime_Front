<template>
  <div style="display: flex; flex-direction: column; width: 250px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <!-- Topo: Logo fixa -->
    <div style="flex-shrink:0; padding:62px 0 12px 0; display:flex; justify-content:center;">
      <div style="height:120px; max-width:100%; display:block;">
        <img src="..\assets\logoSublimeSimbolo.png" alt="">
      </div>
    </div>

    <!-- Centro: Menu com scroll -->
    <v-list style="flex:1 1 auto; padding-top:24px; background-color: transparent;">
      <v-list-subheader style="color:#b0b0b0; text-transform:uppercase; font-size:0.75rem; font-weight:bold; margin-left:16px; letter-spacing:1px;">
        Gerenciamento
      </v-list-subheader>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title + item.route"
        :value="item.title"
        :active="item.title === selectedItem"
        :to="item.route"
        style="border-radius:6px; margin:5px; gap: 5px;"
        :style="item.title === selectedItem ? 'background-color: #C8E2CB' : ''">
        <template #prepend>
          <img :src="`/src/assets/icons/${item.icon}`" alt="" style="width:22px; height:22px;" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Base: Botão de logout fixo -->
    <template>
      <div style="padding:24px 16px; border-top:1px solid #f3f3f3;">
        <v-btn
          color="error"
          block
          @click="Logout"
          style="width:100%; padding:10px 0; font-size:1rem; font-weight:bold;">
          Sair
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserLogin from "@/services/userAuthService.js";

const router = useRouter();
const route = useRoute();

const menuItems = [
  { title: "Locações", icon: "document_icon.svg", route:"/plataform/manager/locations"},
  { title: "Clientes", icon: "group_icon.svg", route: "/plataform/manager/clients"},
  { title: "Salão", icon: "house_icon.svg", route: "/plataform/manager/hall"},
  { title: "Decorações", icon: "ballon_icon.svg", route: "/plataform/manager/decorations"},
];

const selectedItem = computed(() => {
  const found = menuItems.find(item => route.path.startsWith(item.route));
  return found ? found.title : "";
});

async function Logout() {
  UserLogin.logout();

}
</script>
