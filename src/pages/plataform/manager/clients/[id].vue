<template>
    <plataform-layout>
    <div style="max-height: 100%; overflow-y: scroll ;">
      <!-- Card de Informações do Usuário -->
      <v-card style="border-radius: 8px; margin-bottom: 24px;" flat>
        <!-- Cabeçalho -->
        <v-card-title style=" padding: 20px 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <div style="display: flex; align-items: center;">
              <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Dashboard > Listagem de Clientes </span> > Detalhes do Cliente #{{ user.id }}</p>
            </div>
            <v-btn
              icon
              variant="text"
              color="primary"
              to="/plataform/manager/clients"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <!-- Conteúdo das Informações -->
        <v-card-text style="padding: 32px;">
          <v-row>
            <!-- Avatar e Nome -->
            <v-col cols="12" style="display: flex; align-items: center; margin-bottom: 24px;">
              <v-avatar
                size="80"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; font-size: 32px; margin-right: 24px;"
              >
                {{ getInitials(user.name) }}
              </v-avatar>
              <div>
                <h2 style="font-size: 28px; font-weight: 600; color: #212121; margin-bottom: 4px;">
                  {{ user.name }}
                </h2>
                <v-chip
                  size="small"
                  style="font-weight: 600; background-color: #e3f2fd; color: #1976d2;"
                >
                  ID: #{{ user.id }}
                </v-chip>
              </div>
            </v-col>
          </v-row>

          <v-divider style="margin-bottom: 24px;"></v-divider>

          <!-- Informações de Contato -->
          <v-row>
            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px; height: 100%;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-email</v-icon>
                  <h3 style="font-size: 16px; font-weight: 600; color: #424242;">Email</h3>
                </div>
                <p style="font-size: 15px; color: #212121; margin-left: 36px;">
                  {{ user.email }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px; height: 100%;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-phone</v-icon>
                  <h3 style="font-size: 16px; font-weight: 600; color: #424242;">Telefones</h3>
                </div>
                <div v-if="user.telefones && user.telefones.length > 0" style="margin-left: 36px;">
                  <div 
                    v-for="(telefone, index) in user.telefones" 
                    :key="index"
                    style="margin-bottom: 8px;"
                  >
                    <v-chip
                      size="small"
                      prepend-icon="mdi-phone"
                      style="background-color: white; font-weight: 500;"
                      v-for="(numero, index) in user.telefones" :key="index"
                    >
                      {{ numero.numero }}
                    </v-chip>
                  </div>
                </div>
                <p v-else style="font-size: 14px; color: #757575; margin-left: 36px; font-style: italic;">
                  Nenhum telefone cadastrado
                </p>
              </div>
            </v-col>
          </v-row>

          <!-- Botões de Ação -->
          <v-row style="margin-top: 24px;">
            <v-col cols="12" style="display: flex; gap: 12px;">
              <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                style="text-transform: none; font-weight: 500;"
                @click="editUser"
              >
                Editar Usuário
              </v-btn>
              <v-btn
                color="error"
                variant="outlined"
                prepend-icon="mdi-delete"
                style="text-transform: none; font-weight: 500;"
                @click="deleteUser"
              >
                Excluir Usuário
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Card de Locações do Usuário -->
      <v-card style="border-radius: 8px;" flat>
        <!-- Cabeçalho das Locações -->
        <v-card-title style="padding: 20px 30px">
          <div style="display: flex; align-items: center; width: 100%; gap: 20px;">
            <div style="display: flex; align-items: center;">
              <span style="font-size: 24px; font-weight: 400;">Locações do Usuário</span>
            </div>
            <v-chip style="background-color: rgba(255,255,255,0.2); color: gray; font-weight: 600;">
              Total: {{ alugueis.length }}
            </v-chip>
          </div>
        </v-card-title>

        <!-- Conteúdo das Locações -->
        <v-card-text style="padding: 24px;">

          <!-- Tabela de Locações -->
          <v-data-table
            :headers="rentalHeaders"
            :items="alugueis"
            :items-per-page="10"
            :loading="loadingRentals"
            class="elevation-1"
            style="border-radius: 4px;"
            hide-default-footer
          >
            <!-- Slot customizado para Data -->
            <template v-slot:item.data="{ item }">
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 500; color: #424242;">{{ formatDate(item.data) }}</span>
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
                  :to="`/plataform/manager/locations/${ item.id }`"
                >
                  <v-icon size="small">mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>

            <!-- Slot para loading -->
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@3"></v-skeleton-loader>
            </template>

            <!-- Slot para quando não há dados -->
            <template v-slot:no-data>
              <div style="padding: 48px; text-align: center;">
                <v-icon size="64" style="color: #bdbdbd; margin-bottom: 16px;">mdi-calendar-remove</v-icon>
                <div style="font-size: 18px; color: #757575; font-weight: 500;">
                  Nenhuma locação encontrada
                </div>
                <div style="font-size: 14px; color: #9e9e9e; margin-top: 8px;">
                  Este usuário ainda não possui locações
                </div>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </plataform-layout>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore.js'
import { useLocationsStore } from '@/stores/locationsStore.js'
import { getInitials, formatDate, formatCurrency } from '@/utils/'

const loading = ref(true)
const userStore = useUsersStore()
const locationsStore = useLocationsStore()
const route = useRouter()

// Estado
const currentPage = ref(1)

const userID = route.currentRoute.value.path.split('/')[4]
const user = ref([])

const rentalHeaders = [
  { title: 'Data', key: 'data', align: 'start', sortable: true, width: '150px' },
  { title: 'Valor', key: 'valor', align: 'start', sortable: true, width: '150px' },
  { title: 'Status', key: 'status', align: 'center', sortable: true, width: '130px' },
  { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '120px' }
]

const alugueis = ref([])

const getStatusColor = (status) => {
  return status === 'PAGO' ? 'success' : 'warning'
}

const getStatusIcon = (status) => {
  return status === 'PAGO' ? 'mdi-check-circle' : 'mdi-clock-alert'
}

const deleteUser = () => {
  const autorizeDelete = confirm(`Deseja teletar usuario #${userID} Nome:${user.value.name}? Esta ação é irreversível.`)
  if (autorizeDelete){
    userStore.deleteUser(userID)
    route.push('/plataform/manager/clients')
  }
}

onMounted( async () =>{
  try{
    user.value = await userStore.getUserById(userID)
    alugueis.value = await locationsStore.getLocationsByUserId(userID)
  } catch (error){
    console.error('Erro ao carregar usuário ou suas locações:', error)
  } finally {
    loading.value = false
  }
})

</script>

