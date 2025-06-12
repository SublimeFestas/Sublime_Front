<template>
  <v-navigation-drawer
    app
    permanent
    width="250"
    style="border-right: 1px solid #eee; background: #fff; height: 100vh; display: flex; flex-direction: column; padding: 0;">
    <!-- Topo: Logo fixa -->
    <div style="flex-shrink:0; padding:32px 0 24px 0; display:flex; justify-content:center; background:#fff; border-bottom:1px solid #f3f3f3;">
      <div style="height:120px; max-width:100%; display:block;">
      </div>
    </div>

    <!-- Centro: Menu com scroll -->
    <v-list nav dense style="flex:1 1 auto; padding-top:24px; background:#fff;">
      <v-list-subheader style="color:#b0b0b0; text-transform:uppercase; font-size:0.75rem; font-weight:bold; margin-left:16px; letter-spacing:1px;">
        Gerenciamento
      </v-list-subheader>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title + item.route"
        :value="item.title"
        :active="item.title === selectedItem"
        :to="item.route"
        style="border-radius:6px; margin:0 8px; gap: 5px;"
        :style="item.title === selectedItem ? 'background-color: #C8E2CB' : ''">
        <template #prepend>
          <img :src="`/src/assets/icons/${item.icon}`" alt="" style="width:22px; height:22px;" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Base: Botão de logout fixo -->
    <template #append>
      <div style="padding:24px 16px; background:#fff; border-top:1px solid #f3f3f3;">
        <v-btn
          color="error"
          block
          @click="logout"
          style="width:100%; padding:10px 0; font-size:1rem; font-weight:bold;">
          Sair
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

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

function logout() {
  alert('Logout!');
}
</script>
