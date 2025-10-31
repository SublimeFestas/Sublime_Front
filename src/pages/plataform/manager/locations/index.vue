<template>
  <plataform-layout>
    <div style="min-height: 100%; display: flex; min-width: 100%;">
      <v-card style="border-radius: 8px; width: 100%;" flat>
        <!-- Cabeçalho -->
        <v-card-title style="padding: 40px 24px 10px;">
          <div style="display: flex; align-items: center; width: 100%;">
            <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Dashboard </span> > Listagem de Locações</p>
          </div>
        </v-card-title>

        <!-- Filtros -->
        <v-card-text style="padding: 24px;">
          <v-row style="margin-bottom: 16px;">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filters.search"
                label="Buscar"
                placeholder="Cliente, email, valor..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                clearable
                hide-details
                style="background-color: white;"
                @input="loadLocations"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="filters.status"
                :items="statusOptions"
                label="Status"
                variant="outlined"
                density="comfortable"
                clearable
                hide-details
                style="background-color: white;"
                @input="loadLocations"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
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

          <!-- Tabela de Locações -->
          <v-data-table
            :headers="headers"
            :items="allLocations"
            :items-per-page="itemsPerPage"
            :page="currentPage"
            :loading="loading"
            class="elevation-1"
            style="border-radius: 4px; margin-top: 16px; max-height: 100%;"
            @update:page="currentPage = $event"
            hide-default-footer
          >
            <!-- Slot customizado para Data -->
            <template v-slot:item.data="{ item }">
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 500; color: #424242;">{{ formatDate(item.data) }}</span>
              </div>
            </template>

            <!-- Slot customizado para Cliente -->
            <template v-slot:item.user="{ item }">
              <div style="display: flex; align-items: center;">
                <v-avatar
                  size="32"
                  style="margin-right: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600;"
                >
                {{ getInitials(item.user?.name || '') }}
                </v-avatar>
                <div style="display: flex; flex-direction: column;">
                  <span style="font-weight: 500; color: #212121;">{{ item.user?.name || 'N/A'}}</span>
                  <span style="font-size: 12px; color: #757575; display: flex; align-items: center;">
                    <v-icon size="12" style="margin-right: 4px;">mdi-email</v-icon>
                    {{ item.user?.email || '-' }}
                  </span>
                </div>
              </div>
            </template>

            <!-- Slot customizado para Valor -->
            <template v-slot:item.valor="{ item }">
              <div style="display: flex; align-items: center;">
                <v-icon size="small" style="margin-right: 8px; color: #4caf50;">mdi-currency-usd</v-icon>
                <span style="font-weight: 600; color: #2e7d32; font-size: 15px;">{{ formatCurrency(item.valor_festa) }}</span>
              </div>
            </template>

            <!-- Slot customizado para Status -->
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                :prepend-icon="getStatusIcon(item.status)"
                size="small"
                style="font-weight: 600;"
              >
                {{ item.status }}
              </v-chip>
            </template>

            <!-- Slot customizado para Ações -->
            <template v-slot:item.actions="{ item }">
              <div style="display: flex; justify-content: center;">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="primary"
                  :to="`/plataform/manager/locations/${item.id}`"
                >
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
                <v-icon size="64" style="color: #bdbdbd; margin-bottom: 16px;">mdi-calendar-remove</v-icon>
                <div style="font-size: 18px; color: #757575; font-weight: 500;">
                  Nenhuma locação encontrada
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
              Mostrando {{ startItem }} a {{ endItem }} de {{ allLocations.length }} locações
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
import { ref, computed, watch } from 'vue'
import { formatDate, formatCurrency, getInitials } from '@/utils'
import {useLocationsStore} from '@/stores/locationsStore.js'
const locationsStore = useLocationsStore()

const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const allLocations = ref([])

const filters = ref({
  search: '',
  status: null
})

const statusOptions = [
  { title: 'Todos', value: null },
  { title: 'Pendente', value: 'PENDENTE' },
  { title: 'Pago', value: 'PAGO' }
]

const headers = [
  { title: 'Data', key: 'data', align: 'start', sortable: true, width: '150px' },
  { title: 'Cliente', key: 'user', align: 'start', sortable: true },
  { title: 'Valor', key: 'valor', align: 'start', sortable: true, width: '150px' },
  { title: 'Status', key: 'status', align: 'center', sortable: true, width: '130px' },
  { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '150px' }
]

async function loadLocations(){
  loading.value = true
  try {
    allLocations.value = await locationsStore.getFilteredLocations(filters.value.search, currentPage.value)
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    allLocations.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => { 
  loading.value = true 
  try { 
    allLocations.value = await locationsStore.getLocations()
    console.log('Usuários carregados:', allLocations.value)
  } catch (error) { 
    console.log('Erro ao carregar usuários:', error) 
  } finally { 
    loading.value = false 
  } 
})

const totalPages = computed(() => {
  return Math.ceil(allLocations.value.length / itemsPerPage.value)
})

const startItem = computed(() => {
  return allLocations.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > allLocations.value.length ? allLocations.value.length : end
})

// Watchers
watch(itemsPerPage, () => {
  currentPage.value = 1
})

function getStatusColor(status) {
  return status === 'PAGO' ? 'success' : 'warning'
}

function getStatusIcon(status) {
  return status === 'PAGO' ? 'mdi-check-circle' : 'mdi-clock-alert'
}

function clearFilters() {
  filters.value = { search: '', status: null }
  loadLocations()
}
</script>


