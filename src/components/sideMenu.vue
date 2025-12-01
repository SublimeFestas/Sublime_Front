<template>
  <v-card style="display: flex; flex-direction: column; width: 250px; background-color:#fff; border-radius: 10px;">
    <!-- Topo: Logo fixa -->
    <div style="flex-shrink:0; padding:62px 0 12px 0; display:flex; justify-content:center;">
      <div style="height:120px; max-width:100%; display:block;">
        <img src="..\assets\logo.png" alt="">
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
        style="margin:5px 5px; gap: 5px;"
        :style="item.title === selectedItem ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 5px !important' : ''">
        <template #prepend>
          <img :style="item.title === selectedItem ? 'filter: invert(100%);' : ''" :src="getIconPath(item.icon)" alt="" style="width:22px; height:22px;" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

      <div style="padding:20px 5px;">
        <v-btn
          color="error"
          block
          @click="Logout"
          style="width:100%; padding:10px 0; font-size:1rem; font-weight:bold; background: linear-gradient(135deg, #d93025 100%); color: white; border-radius: 5px !important">
          Sair
        </v-btn>
      </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import UserLogin from "@/services/userAuthService.js";
import { useUserAuth } from "@/stores/userAuthStore.js";

const User = useUserAuth();
const route = useRoute();

// Função para obter o caminho correto do ícone
const getIconPath = (iconName) => {
  return `/icons/${iconName}`;
};

const menuClienteItens = [
  { title: "Locações", icon: "document_icon.svg", route: "/plataform/locations/myLocations" },
]

const menuAdminItems = [
  { title: "Locações", icon: "document_icon.svg", route:"/plataform/manager/locations" },
  { title: "Clientes", icon: "group_icon.svg", route: "/plataform/manager/clients" },
  { title: "Serviços", icon: "services.svg", route: "/plataform/manager/services" },
];

const menuItems = computed(() => 
  User?.state?.user?.is_staff ? menuAdminItems : menuClienteItens
);

const selectedItem = computed(() => {
  const found = menuItems.value.find(item => route.path.startsWith(item.route));
  return found ? found.title : "";
});

async function Logout() {
  UserLogin.logout();

}

onMounted(() => {
  User.getMe();
});

</script>
