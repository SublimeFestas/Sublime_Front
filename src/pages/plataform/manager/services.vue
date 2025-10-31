<template>
    <plataform-layout>
        <div style="max-height: 100%; overflow-y: scroll;">
            <v-card style="border-radius: 8px;" flat>
                <!-- Cabeçalho -->
                <v-card-title style="padding: 40px 24px 10px; display: flex;">
                    <div style="display: flex; align-items: center; width: 100%;">
                        <p style="font-size: 24px; font-weight: 400;"><span style="color: gray;"> Dashboard </span> >
                            Listagem de Serviços</p>
                    </div>
                    <div>
                        <v-btn color="black" variant="outlined" prepend-icon="mdi-plus" style="text-transform: none; font-weight: 500;"
                            @click="openCreateDialog" >
                            Novo Serviço
                        </v-btn>
                    </div>
                </v-card-title>

                <!-- Filtros -->
                <v-card-text style="padding: 24px;">
                    <v-row style="margin-bottom: 16px;">
                        <v-col cols="12" md="4">
                            <v-text-field v-model="filters.search" label="Buscar" @input="loadServices"
                                placeholder="Nome do serviço, descrição..." prepend-inner-icon="mdi-magnify"
                                variant="outlined" density="comfortable" clearable hide-details
                                style="background-color: white;"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="8"
                            style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                            <v-btn color="secondary" variant="outlined" style="text-transform: none; font-weight: 500;"
                                prepend-icon="mdi-filter-off" @click="clearFilters">
                                Limpar
                            </v-btn>
                        </v-col>
                    </v-row>

                    <!-- Grid de Serviços -->
                    <v-row style="margin-top: 24px;">
                        <v-col v-for="service in services" :key="service.id" cols="12" sm="6" md="4" lg="3">
                            <v-card
                                style="border-radius: 12px; height: 100%; display: flex; flex-direction: column; transition: all 0.3s ease;"
                                @mouseenter="hoveredCard = service.id" @mouseleave="hoveredCard = null">
                                <!-- Imagem do Serviço -->
                                <div
                                    style="position: relative; overflow: hidden; border-radius: 12px 12px 0 0; height: 200px; background-color: #f0f0f0;">
                                    <v-img :src="service.foto_servico.url" :alt="service.nome"
                                        style="width: 100%; height: 100%; object-fit: cover;" cover>
                                        <template v-slot:placeholder>
                                            <div
                                                style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #e0e0e0;">
                                                <v-icon size="64" style="color: #bdbdbd;">mdi-image-off</v-icon>
                                            </div>
                                        </template>
                                    </v-img>

                                    <!-- Overlay com Ações -->
                                    <div v-if="hoveredCard === service.id"
                                        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; gap: 12px; transition: all 0.3s ease;">
                                        <v-btn icon color="white" size="large"
                                            style="background-color: rgba(255,255,255,0.2);"
                                            @click="openEditDialog(service)">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon color="error" size="large"
                                            style="background-color: rgba(255,255,255,0.2);" @click="deleteService(service.id)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </div>

                                    <!-- Badge de Status -->
                                    <v-chip size="small"
                                        style="position: absolute; top: 12px; right: 12px; font-weight: 600; background-color: #4caf50; color: white;">
                                        Ativo</v-chip>
                                </div>

                                <!-- Conteúdo do Card -->
                                <v-card-text style="flex-grow: 1; padding: 16px;">
                                    <h3
                                        style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 8px; line-height: 1.3;">
                                        {{ service.nomeServico }}
                                    </h3>
                                    <p
                                        style="font-size: 13px; color: #757575; margin-bottom: 12px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        {{ service.descricao }}
                                    </p>

                                    <v-divider style="margin: 12px 0;"></v-divider>

                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p
                                                style="font-size: 12px; color: #9e9e9e; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                                Valor</p>
                                            <p
                                                style="font-size: 20px; font-weight: 700; color: #2e7d32; margin: 4px 0 0 0;">
                                                {{ formatCurrency(service.valor) }}
                                            </p>
                                        </div>
                                        <v-chip size="small" prepend-icon="mdi-check-circle"
                                            style="background-color: #e8f5e9; color: #2e7d32; font-weight: 600;">
                                            Disponível
                                        </v-chip>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <!-- Mensagem quando não há serviços -->
                        <v-col cols="12" v-if="services.length === 0">
                            <div style="text-align: center; padding: 64px 24px;">
                                <v-icon size="80"
                                    style="color: #bdbdbd; margin-bottom: 16px;">mdi-briefcase-off</v-icon>
                                <div style="font-size: 20px; color: #757575; font-weight: 500; margin-bottom: 8px;">
                                    Nenhum serviço encontrado
                                </div>
                                <div style="font-size: 14px; color: #9e9e9e;">
                                    Tente ajustar os filtros de busca ou crie um novo serviço
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </plataform-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServicesStore } from '@/stores/servicesStore.js'
import { formatCurrency } from '@/utils'

const loading = ref(true)
const hoveredCard = ref(null)
const currentPage = ref(1)

const filters = ref({
  search: ''
})

const servicesStore = useServicesStore()
const services = ref([])

async function loadServices(){
  loading.value = true
  try {
    const data = await servicesStore.getFilteredServices(filters.value.search, currentPage.value)
    services.value = data

  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    services.value = []
  } finally {
    loading.value = false
  }
}

function deleteService(id){
    const autorizeDelete = confirm(`Deseja teletar serviço #${id}? Esta ação é irreversível.`)
    if (autorizeDelete) { servicesStore.deleteService(id) }
}

onMounted(async () => {
    try {
        const data = await servicesStore.getServices()
        services.value = data
        console.log('Serviços carregados:', services.value)
    } catch (error) { 
        console.log('Erro ao carregar serviços:', error) 
    } finally { 
        loading.value = false 
  } 
})

function clearFilters() {
  filters.value = { search: '' }
  loadServices()
}
</script>

