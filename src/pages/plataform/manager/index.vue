<template>
  <plataform-layout>
    <div style="max-height: 100%; overflow-x: hidden;">
      
      <!-- Cabeçalho -->
      <v-card-title style="padding: 40px 24px 10px; margin-bottom: 50px;">
        <div style="display: flex; align-items: center; width: 100%;">
          <p style="font-size: 24px; font-weight: 400;">
            <span style="color: gray;"> Dashboard </span> > Resumo de dados
          </p>
        </div>
      </v-card-title>

      <!-- Cards -->
      <v-row style="margin-bottom: 32px;">
        
        <!-- Total Usuários -->
        <v-col cols="12" sm="6" md="3">
          <v-card>
            <div class="card-header blue-gradient">
              <div>
                <p class="card-label">Total de Usuários</p>
                <p class="card-value">{{ counts?.total_users ?? 0 }}</p>
              </div>
              <v-icon size="48" style="opacity: 0.3;">mdi-account-multiple</v-icon>
            </div>
          </v-card>
        </v-col>

        <!-- Total Aluguéis -->
        <v-col cols="12" sm="6" md="3">
          <v-card>
            <div class="card-header pink-gradient">
              <div>
                <p class="card-label">Total de Aluguéis</p>
                <p class="card-value">{{ counts?.total_alugueis ?? 0 }}</p>
              </div>
              <v-icon size="48" style="opacity: 0.3;">mdi-calendar-check</v-icon>
            </div>
          </v-card>
        </v-col>

        <!-- Total Serviços -->
        <v-col cols="12" sm="6" md="3">
          <v-card>
            <div class="card-header cyan-gradient">
              <div>
                <p class="card-label">Total de Serviços</p>
                <p class="card-value">{{ counts?.total_servicos ?? 0 }}</p>
              </div>
              <v-icon size="48" style="opacity: 0.3;">mdi-briefcase</v-icon>
            </div>
          </v-card>
        </v-col>

        <!-- Receita Total -->
        <v-col cols="12" sm="6" md="3">
          <v-card>
            <div class="card-header green-gradient">
              <div>
                <p class="card-label">Receita Total</p>
                <p class="card-value">{{ formatCurrency(totalRevenue) }}</p>
              </div>
              <v-icon size="48" style="opacity: 0.3;">mdi-currency-usd</v-icon>
            </div>
          </v-card>
        </v-col>

      </v-row>

        <v-row style="margin-bottom: 32px;">
      <!-- Gráfico de Status de Aluguéis -->
      <v-col cols="12" md="6">
        <v-card style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
            <span style="font-size: 18px; font-weight: 600;">Status dos Aluguéis</span>
          </v-card-title>
          <v-card-text style="padding: 24px;">
            <div style="display: flex; justify-content: center; align-items: center; height: 300px;">
              <svg viewBox="0 0 200 200" style="width: 100%; max-width: 250px; height: auto;">
                <!-- Círculo de fundo -->
                <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" stroke-width="20"></circle>
                
                <!-- Segmento Pago (60% - verde) -->
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#4caf50"
                  stroke-width="20"
                  stroke-dasharray="339.29 565.49"
                  stroke-dashoffset="0"
                  transform="rotate(-90 100 100)"
                  style="transition: stroke-dashoffset 0.3s ease;"
                ></circle>
                
                <!-- Segmento Pendente (40% - laranja) -->
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#ff9800"
                  stroke-width="20"
                  stroke-dasharray="226.19 565.49"
                  stroke-dashoffset="-339.29"
                  transform="rotate(-90 100 100)"
                  style="transition: stroke-dashoffset 0.3s ease;"
                ></circle>
                
                <!-- Texto do centro -->
                <text x="100" y="95" text-anchor="middle" font-size="24" font-weight="700" fill="#212121">
                  {{ counts?.total_alugueis }}
                </text>
                <text x="100" y="115" text-anchor="middle" font-size="12" fill="#757575">
                  Total
                </text>
              </svg>
            </div>

            <!-- Legenda -->
            <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 16px; height: 16px; background-color: #4caf50; border-radius: 4px;"></div>
                  <span style="font-size: 14px; color: #424242;">Pagos</span>
                </div>
                <span style="font-size: 16px; font-weight: 700; color: #4caf50;">{{ counts?.total_alugueis_pagos }}</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 16px; height: 16px; background-color: #ff9800; border-radius: 4px;"></div>
                  <span style="font-size: 14px; color: #424242;">Pendentes</span>
                </div>
                <span style="font-size: 16px; font-weight: 700; color: #ff9800;">{{ counts?.total_alugueis_pendentes }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gráfico de Distribuição -->
      <v-col cols="12" md="6">
        <v-card style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
            <span style="font-size: 18px; font-weight: 600;">Distribuição de Dados</span>
          </v-card-title>
          <v-card-text style="padding: 24px;">
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <!-- Usuários -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 14px; font-weight: 600; color: #424242;">Usuários</span>
                  <span style="font-size: 14px; font-weight: 700; color: #667eea;">{{ counts?.total_users }}</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);"></div>
                </div>
              </div>

              <!-- Aluguéis -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 14px; font-weight: 600; color: #424242;">Aluguéis</span>
                  <span style="font-size: 14px; font-weight: 700; color: #f5576c;">{{ counts?.total_alugueis }}</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: 85%; height: 100%; background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);"></div>
                </div>
              </div>

              <!-- Serviços -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 14px; font-weight: 600; color: #424242;">Serviços</span>
                  <span style="font-size: 14px; font-weight: 700; color: #00f2fe;">{{ counts?.total_servicos }}</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: 35%; height: 100%; background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);"></div>
                </div>
              </div>

              <!-- Aluguéis Pagos -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 14px; font-weight: 600; color: #424242;">Aluguéis Pagos</span>
                  <span style="font-size: 14px; font-weight: 700; color: #4caf50;">{{ counts?.total_alugueis_pagos }}</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);"></div>
                </div>
              </div>

              <!-- Aluguéis Pendentes -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 14px; font-weight: 600; color: #424242;">Aluguéis Pendentes</span>
                  <span style="font-size: 14px; font-weight: 700; color: #ff9800;">{{ counts?.total_alugueis_pendentes }}</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: 45%; height: 100%; background: linear-gradient(90deg, #ffa751 0%, #ffe259 100%);"></div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
      <!-- Restante dos gráficos (mantidos do original) -->
      <!-- Você pode deixar todo o restante igual, apenas trocando dashboardData para counts.value -->

    </div>
  </plataform-layout>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard.store'

const dashboardStore = useDashboardStore()

// vai receber os dados do backend:
const counts = computed(() => dashboardStore.data)

onMounted(async () => {
  await dashboardStore.fetchCounts()
})

const totalRevenue = computed(() => {
  if (!counts.value) return 0
  return counts.value.total_alugueis_pagos * 1500
})

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<style scoped>
.card-header {
  padding: 24px;
  color: white;
  display: flex;
  justify-content: space-between;
}
.card-label {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.9;
  text-transform: uppercase;
}
.card-value {
  font-size: 36px;
  font-weight: 700;
}

/* Gradientes */
.blue-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.pink-gradient { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.cyan-gradient { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.green-gradient { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
</style>
