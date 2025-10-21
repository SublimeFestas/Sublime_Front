<template>
  <plataform-layout>
  <div style="min-height: 100%; display: flex; width: 100%">
    <v-card style="border-radius: 8px; min-width: 100%;" flat>
      <!-- Cabeçalho -->
        <v-card-title style="padding: 40px 24px 10px;">
          <div style="display: flex; align-items: center; width: 100%;">
            <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Dashboard </span> > Listagem de Clientes</p>
          </div>
        </v-card-title>

      <!-- Filtros -->
      <v-card-text style="padding: 24px;">
        <v-row style="margin-bottom: 16px;">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters.search"
              label="Buscar"
              placeholder="Nome, email ou número..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              @input="loadUsers"
              hide-details
              style="background-color: white;"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          </v-col>
          <v-col cols="12" md="5" style="display: flex; align-items: center; justify-content: flex-end;">
            <v-btn
              color="secondary"
              variant="outlined"
              style="text-transform: none; font-weight: 500;"
              prepend-icon="mdi-filter-off"
              @click="clearFilters"
            >
              Limpar
            </v-btn>
          </v-col>
        </v-row>

        <!-- Tabela de Usuários -->
        <v-data-table
          :headers="headers"
          :items="allUsers"
          :items-per-page="itemsPerPage"
          :page="currentPage"
          :loading="loading"
          class="elevation-1"
          style="border-radius: 4px; margin-top: 16px;"
          @update:page="currentPage = $event"
          hide-default-footer
        >
          <!-- Slot customizado para ID -->
          <template v-slot:item.id="{ item }">
            <v-chip
              size="small"
              style="font-weight: 600; background-color: #e3f2fd; color: #1976d2;"
            >
              #{{ item.id }}
            </v-chip>
          </template>

          <!-- Slot customizado para Nome -->
          <template v-slot:item.name="{ item }">
            <div style="display: flex; align-items: center;">
                <v-avatar
                  size="32"
                  style="margin-right: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600;"
                >
                {{ getInitials(item.name || '') }}
                </v-avatar>
              <span style="font-weight: 500;">{{ item.name }}</span>
            </div>
          </template>

          <!-- Slot customizado para Email -->
          <template v-slot:item.email="{ item }">
            <div style="display: flex; align-items: center;">
              <v-icon size="small" style="margin-right: 8px; color: #757575;">mdi-email</v-icon>
              <span style="color: #424242;">{{ item.email }}</span>
            </div>
          </template>

          <!-- Slot customizado para Número -->
          <template v-slot:item.telefones="{ item }">
            <div style="display: flex; align-items: center;">
              <v-icon size="small" style="margin-right: 8px; color: #757575;">mdi-phone</v-icon>
              <span style="color: #424242;">{{ item.telefones[0]?.numero || 'N/A' }}</span>
            </div>
          </template>

          <!-- Slot customizado para Ações -->
          <template v-slot:item.actions="{ item }">
            <div style="display: flex; justify-content: center;">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="primary"
                  :to="`/plataform/manager/clients/${item.id}`"
                  @click="selecionarCliente(item.id)">
                  <v-icon size="small">mdi-eye</v-icon>
                </v-btn>
            </div>
          </template>

          <!-- Slot para loading -->
          <template v-slot:loading>
            <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
          </template>

          <!-- Slot para quando não há dados -->
          <template v-slot:no-data>
            <div style="padding: 48px; text-align: center;">
              <v-icon size="64" style="color: #bdbdbd; margin-bottom: 16px;">mdi-account-off</v-icon>
              <div style="font-size: 18px; color: #757575; font-weight: 500;">
                Nenhum usuário encontrado
              </div>
              <div style="font-size: 14px; color: #9e9e9e; margin-top: 8px;">
                Tente ajustar os filtros de busca
              </div>
            </div>
          </template>
        </v-data-table>

        <!-- Informações de Paginação -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 0 4px;">
          <div style="color: #757575; font-size: 14px;">
            Mostrando {{ startItem }} a {{ endItem }} de {{ allUsers.length }} usuários
          </div>
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            rounded="circle"
            style="margin: 0;"
          ></v-pagination>
        </div>
      </v-card-text>
    </v-card>
  </div>
  </plataform-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '@/stores/usersStore.js'
import { useRoute } from 'vue-router'

const headers = [
  { title: 'ID', key: 'id', align: 'start', sortable: true, width: '80px' },  
  { title: 'Nome', key: 'name', align: 'start', sortable: true, width: '200px' },
  { title: 'Email', key: 'email', align: 'start', sortable: true, width: '200px' },
  { title: 'Número', key: 'telefones', align: 'start', sortable: false, width: '130px' },
  { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '80px' }
]


const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filters = ref({
  search: ''
})

const usersStore = useUsersStore()
const allUsers = ref([])

async function loadUsers() {
  loading.value = true
  try {
    allUsers.value = await usersStore.getFilteredUsers(filters.value.search, currentPage.value)
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    allUsers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => { 
  loading.value = true 
  try { 
    allUsers.value = await usersStore.getUsers()
    console.log('Usuários carregados:', allUsers.value)
  } catch (error) { 
    console.log('Erro ao carregar usuários:', error) 
  } finally { 
    loading.value = false 
  } 
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return allUsers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(allUsers.value.length / itemsPerPage.value)
})

const startItem = computed(() => {
  return allUsers.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > allUsers.value.length ? allUsers.value.length : end
})

function clearFilters() {
  filters.value.search = ''
}

const router = useRoute()
function selecionarCliente(id) {
  usersStore.selectedUser = id;
}

function getInitials(name) {
  const names = name.split(' ')
  return names.length >= 2
    ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase()
}

</script>

