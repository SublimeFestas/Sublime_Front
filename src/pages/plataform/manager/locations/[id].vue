<template>
    <plataform-layout v-if="location">
        <div style="max-height: 100%; overflow-y: scroll ;">
            <!-- Card de Informações da Locação -->
            <v-card style="border-radius: 8px; margin-bottom: 24px;" flat>
                <!-- Cabeçalho -->
                <v-card-title style=" padding: 20px 40px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                        <div style="display: flex; align-items: center;">
                            <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Dashboard >
                                    Listagem de Locações </span> > Detalhes da Locação #{{ location.id }}</p>
                        </div>
                        <v-btn icon variant="text" color="primary" to="/plataform/manager/locations">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>

                <!-- Conteúdo das Informações -->
                <v-card-text style="padding: 32px;">
                    <!-- ID e Status -->
                    <v-row style="margin-bottom: 24px;">
                        <v-col cols="12" style="display: flex; align-items: center; gap: 16px;">
                            <v-chip size="large"
                                style="font-weight: 600; background-color: #e3f2fd; color: #1976d2; font-size: 14px;">
                                ID: #{{ location.id }}
                            </v-chip>
                            <v-chip :color="getStatusColor(location.status)"
                                :prepend-icon="getStatusIcon(location.status)" size="large"
                                style="font-weight: 600; font-size: 14px;">
                                {{ location.status }}
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-divider style="margin-bottom: 24px;"></v-divider>

                    <!-- Informações de Data -->
                    <v-row style="margin-bottom: 24px;">
                        <v-col>
                            <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <h3
                                        style="font-size: 14px; font-weight: 600; color: #757575; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Data da Locação</h3>
                                </div>
                                <p style="font-size: 18px; color: #212121; font-weight: 500;">
                                    {{ formatDate(location.data) }}
                                </p>
                            </div>
                        </v-col>
                        <v-col>
                            <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <h3
                                        style="font-size: 14px; font-weight: 600; color: #757575; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Data de Cadastro</h3>
                                </div>
                                <p style="font-size: 18px; color: #212121; font-weight: 500;">
                                    {{ formatDateTime(location.data_cadastro) }}
                                </p>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- Informações do Cliente -->
                    <h2
                        style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px; display: flex; align-items: center;">
                        Cliente</h2>
                    <v-card style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 24px;" flat>
                        <v-card-text style="padding: 20px;">
                            <v-row>
                                <v-col cols="12" style="display: flex; align-items: center; margin-bottom: 16px;">
                                    <v-avatar size="60"
                                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; font-size: 24px; margin-right: 16px;">
                                        {{ getInitials(location.user.name) }}
                                    </v-avatar>
                                    <div>
                                        <h3
                                            style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 4px;">
                                            {{ location.user.name }}
                                        </h3>
                                        <v-chip size="small"
                                            style="font-weight: 600; background-color: #e3f2fd; color: #1976d2;">
                                            ID: #{{ location.user.id }}
                                        </v-chip>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div style="display: flex; align-items: center;">
                                        <v-icon size="small"
                                            style="margin-right: 8px; color: #757575;">mdi-email</v-icon>
                                        <span style="color: #424242;">{{ location.user.email }}</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- Descrição da Festa -->
                    <h2
                        style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px; display: flex; align-items: center;">
                        Descrição da Festa
                    </h2>
                    <v-card style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 24px;" flat>
                        <v-card-text style="padding: 20px;">
                            <p style="color: #424242; line-height: 1.6; white-space: pre-wrap;">
                                {{ location.desc_festa || 'Nenhuma descrição fornecida' }}
                            </p>
                        </v-card-text>
                    </v-card>

                    <!-- Serviços -->
                    <h2
                        style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px; display: flex; align-items: center;">
                        Serviços
                    </h2>
                    <v-row style="margin-bottom: 24px;">
                        <v-col cols="12">
                            <div v-if="location.servico && location.servico.length > 0">
                                <v-card v-for="(servico, index) in location.servico" :key="index"
                                    style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 12px;" flat>
                                    <v-card-text style="padding: 16px;">
                                        <v-row align="center">
                                            <v-col cols="12" md="8">
                                                <div style="display: flex; align-items: center;">
                                                    <v-icon size="small"
                                                        style="margin-right: 12px; color: #667eea;">mdi-check-circle</v-icon>
                                                    <div>
                                                        <p
                                                            style="font-size: 16px; font-weight: 600; color: #212121; margin: 0;">
                                                            {{ servico.nomeServico }}
                                                        </p>
                                                        <p style="font-size: 12px; color: #757575; margin: 4px 0 0 0;">
                                                            ID: #{{ servico.id }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="4" style="text-align: right;">
                                                <div
                                                    style="display: flex; align-items: center; justify-content: flex-end;">
                                                    <v-icon size="small"
                                                        style="margin-right: 8px; color: #4caf50;">mdi-currency-usd</v-icon>
                                                    <span style="font-weight: 600; color: #2e7d32; font-size: 16px;">
                                                        {{ formatCurrency(servico.valor) }}
                                                    </span>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </div>
                            <div v-else style="text-align: center; padding: 32px;">
                                <v-icon size="48"
                                    style="color: #bdbdbd; margin-bottom: 12px;">mdi-briefcase-off</v-icon>
                                <p style="color: #757575; font-size: 16px;">Nenhum serviço adicionado</p>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- Resumo Financeiro -->
                    <h2
                        style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px; display: flex; align-items: center;">
                        Resumo Financeiro
                    </h2>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card style="border-radius: 8px;" flat>
                                <v-card-text style="padding: 24px;">
                                    <p
                                        style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">
                                        Valor da Festa
                                    </p>
                                    <p style="font-size: 32px; font-weight: 700; margin: 0;">
                                        {{ formatCurrency(location.valor_festa) }}
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card style="border-radius: 8px;" flat>
                                <v-card-text style="padding: 24px;">
                                    <p
                                        style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">
                                        Valor Total dos Serviços
                                    </p>
                                    <p style="font-size: 32px; font-weight: 700; margin: 0;">
                                        {{ formatCurrency(totalServicos) }}
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card
                                style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); border-radius: 8px; color: white;"
                                flat>
                                <v-card-text style="padding: 24px;">
                                    <p
                                        style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">
                                        Valor Total
                                    </p>
                                    <p style="font-size: 36px; font-weight: 700; margin: 0;">
                                        {{ formatCurrency(valorTotal) }}
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Botões de Ação -->
                    <v-row style="margin-top: 32px;">
                        <v-col cols="12" style="display: flex; gap: 12px;">
                            <v-btn color="primary" prepend-icon="mdi-pencil"
                                style="text-transform: none; font-weight: 500;" @click="editlocation">
                                Editar Locação
                            </v-btn>
                            <v-btn color="success" variant="outlined" prepend-icon="mdi-download"
                                style="text-transform: none; font-weight: 500;" @click="downloadInvoice">
                                Baixar Recibo
                            </v-btn>
                            <v-btn color="error" variant="outlined" prepend-icon="mdi-delete"
                                style="text-transform: none; font-weight: 500;" @click="deletelocation">
                                Excluir Locação
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </plataform-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate, formatCurrency, getInitials, formatDateTime } from '@/utils/index.js'
import { useLocationsStore } from '@/stores/locationsStore.js'

const locationsStore = useLocationsStore()

const route = useRoute()
const locationID = route.params.id || route.path.split('/')[4]

const loading = ref(true)
const location = ref(null)

const totalServicos = computed(() => {
    if (!location.value?.servico || location.value.servico.length === 0) return 0
    return location.value.servico.reduce((total, servico) => total + parseFloat(servico.valor || 0), 0)
})

const valorTotal = computed(() => {
    return parseFloat(location.value?.valor_festa || 0) + totalServicos.value
})

const getStatusColor = (status) => (status === 'PAGO' ? 'success' : 'warning')
const getStatusIcon = (status) => (status === 'PAGO' ? 'mdi-check-circle' : 'mdi-clock-alert')

const editlocation = () => {
    console.log('Editar locação:', location.value)
}

const downloadInvoice = () => {
    console.log('Baixar recibo da locação:', location.value)
}

const deletelocation = async () => {
    const autorizeDelete = confirm(`Deseja teletar usuario #${locationID} de:${location.value.user.name}? Esta ação é irreversível.`)
    if (autorizeDelete) {
        locationsStore.deleteLocation(locationID)
        route.push('/plataform/manager/locations')
    }
}

onMounted(async () => {
    try {
        location.value = await locationsStore.getLocationById(locationID)
        console.log(location.value + 'nada')
    } catch (error) {
        console.error('Erro ao carregar locação:', error)
    } finally {
        loading.value = false
    }
})

</script>
