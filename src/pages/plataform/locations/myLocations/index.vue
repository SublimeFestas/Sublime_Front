<template>
  <plataform-layout>
    <div style="max-height: 100%; overflow-y: scroll;">
      <div style="border-radius: 8px; margin-bottom: 24px;" v-if="user">
        <v-card-title style="padding: 40px 24px 10px;">
          <div style="display: flex; align-items: center; width: 100%;">
            <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Usuário </span> > Perfil</p>
          </div>
        </v-card-title>

        <v-card-text style="padding: 32px;">
          <v-row>
            <v-col cols="12" style="display: flex; align-items: center; margin-bottom: 24px;">
              <v-avatar
                size="100"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; font-size: 40px; margin-right: 24px;"
              >
                {{ getInitials(user.name) }}
              </v-avatar>
              <div>
                <h2 style="font-size: 28px; font-weight: 600; color: #212121; margin-bottom: 4px;">
                  {{ user.name }}
                </h2>
                <v-chip
                  size="small"
                  style="font-weight: 600; background-color: #e3f2fd; color: #1976d2; margin-bottom: 8px;"
                >
                  ID: #{{ user.id }}
                </v-chip>
                <p style="font-size: 14px; color: #757575; margin: 0;">
                  Cliente desde {{ formatDate(user.dataCadastro) }}
                </p>
              </div>
            </v-col>
          </v-row>

          <v-divider style="margin-bottom: 24px;"></v-divider>

          <v-row>
            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-email</v-icon>
                  <h3 style="font-size: 14px; font-weight: 600; color: #424242; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Email</h3>
                </div>
                <p style="font-size: 15px; color: #212121; margin: 0; margin-left: 36px;">
                  {{ user.email }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-phone</v-icon>
                  <h3 style="font-size: 14px; font-weight: 600; color: #424242; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Telefones</h3>
                </div>
                <div v-if="user.telefones && user.telefones.length > 0" style="margin-left: 36px;">
                  <div v-for="(telefone, index) in user.telefones" :key="index" style="margin-bottom: 8px;">
                    <v-chip size="small" prepend-icon="mdi-phone" style="background-color: white; font-weight: 500;">
                      {{ telefone.numero }}
                    </v-chip>
                  </div>
                </div>
                <p v-else style="font-size: 14px; color: #757575; margin: 0; margin-left: 36px; font-style: italic;">
                  Nenhum telefone cadastrado
                </p>
              </div>
            </v-col>
            <v-col> 
              <v-btn style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">Editar Perfil</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <div style="border-radius: 8px;" v-if="!loading">
        <v-card-title style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 24px;">Minhas Locações</span>
          <v-chip style="background-color: rgba(255,255,255,0.2); color: white; font-weight: 600;" v-if="alugueis">
            Total: {{ alugueis.length }}
          </v-chip>
        </v-card-title>

        <v-card-text style="padding: 24px;">
          <v-row style="margin-bottom: 16px;">
            <v-col cols="12" md="6">
              <v-select
                v-model="filters.status"
                :items="statusOptions"
                label="Filtrar por Status"
                variant="outlined"
                density="comfortable"
                clearable
                hide-details
                style="background-color: white;"
                @update:model-value="applyFilters"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" style="display: flex; justify-content: flex-end;">
              <v-btn
                color="secondary"
                variant="outlined"
                style="text-transform: none; font-weight: 500;"
                prepend-icon="mdi-filter-off"
                @click="clearFilters"
              >
                Limpar Filtros
              </v-btn>
            </v-col>
          </v-row>

          <v-data-table
            :headers="rentalHeaders"
            :items="alugueis"
            :items-per-page="10"
            class="elevation-1"
            style="border-radius: 4px;"
            hide-default-footer
          >
            <template v-slot:item.data="{ item }">
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 500; color: #424242;">{{ formatDate(item.data) }}</span>
              </div>
            </template>

            <template v-slot:item.valor="{ item }">
              <div style="display: flex; align-items: center;">
                <v-icon size="small" style="margin-right: 8px; color: #4caf50;">mdi-currency-usd</v-icon>
                <span style="font-weight: 600; color: #2e7d32; font-size: 15px;">{{ formatCurrency(item.valor_festa) }}</span>
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip :color="getStatusColor(item.status)" :prepend-icon="getStatusIcon(item.status)" size="small" style="font-weight: 600;">
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                class="view-btn"
                icon
                size="small"
                variant="text"
                color="primary"
                @click="viewRental(item.id)"
              >
                <v-icon size="small">mdi-eye</v-icon>
                <v-tooltip activator="parent" location="top">Visualizar</v-tooltip>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </div>
    </div>
  </plataform-layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {  useUserAuth } from '@/stores/userAuthStore.js'
import { useLocationsStore } from '@/stores/locationsStore.js'
import { getInitials, formatDate, formatCurrency } from '@/utils/'

const route = useRouter()
const userStore = useUserAuth()
const locationsStore = useLocationsStore()

const loading = ref(true)
const user = ref({})
const alugueis = ref([])

const filters = reactive({ status: null })
const appliedFilters = reactive({ status: null })

const statusOptions = [
  { title: 'Todos', value: null },
  { title: 'PENDENTE', value: 'PENDENTE' },
  { title: 'PAGO', value: 'PAGO' }
]

const rentalHeaders = [
  { title: 'Data', key: 'data', align: 'start', sortable: true, width: '150px' },
  { title: 'Valor', key: 'valor', align: 'start', sortable: true, width: '150px' },
  { title: 'Status', key: 'status', align: 'center', sortable: true, width: '130px' },
  { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '120px' }
]

const getStatusColor = (status) => status === 'PAGO' ? 'success' : 'warning'
const getStatusIcon = (status) => status === 'PAGO' ? 'mdi-check-circle' : 'mdi-clock-alert'

onMounted(async () => {
  try {
    user.value = await userStore.getMe()
    alugueis.value = await locationsStore.getLocationsByUserId(user.value.id)
  } catch (err) {
    console.error('Erro ao carregar usuário ou locações:', err)
  } finally {
    loading.value = false
  }
})

const filteredAlugueis = computed(() => {
  let items = alugueis.value
  if (appliedFilters.status) items = items.filter(a => a.status === appliedFilters.status)
  return items
})

function applyFilters() {
  appliedFilters.status = filters.status
}

function clearFilters() {
  filters.status = null
  appliedFilters.status = null
}

function viewRental(rental) {
  route.push(`/plataform/locations/myLocations/${rental}`)
}
</script>

<style scoped>
.view-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
