<template>
  <div>
    <v-card flat>
      <v-card-title style="height: 15vh; display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; gap: 5px;">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; font-weight: 600;">Criar Nova Locação</span>
          </div>
          <v-chip style="background-color: rgba(255,255,255,1); color:gray; font-weight: 600;">
            Passo {{ currentStep }} de 4
          </v-chip>
        </div>
      </v-card-title>

      <v-stepper v-model="currentStep" non-linear style="padding: 0px 50px; height: 75vh; overflow-y: scroll;" flat>
        <v-stepper-header style="display: none;">
          <v-stepper-item title="Data e Hora" :value="1"></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item title="Serviços" :value="2"></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item title="Descrição" :value="3"></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item title="Confirmação" :value="4"></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item :value="1">
            <v-card-text style="padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px; text-align: center;">
                Selecione a Data e Hora da Locação
              </h3>

              <v-row style="display: flex; justify-content: center; padding-top: 30px;">
                <v-col cols="12" md="6" style="height: 100%;">
                  <div style="border-radius: 8px; height: 50vh; display: flex; justify-content: center;">
                    <date-picker :modelValue="formData.data"/>
                  </div>
                  {{ formData.data }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-window-item>

          <v-stepper-window-item :value="2">
            <v-card-text style="padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px;">
                Escolha os Serviços Adicionais
              </h3>

              <v-row>
                <v-col 
                  v-for="servico in availableServices" 
                  :key="servico.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                    :style="{
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: isServiceSelected(servico.id) ? '2px solid #667eea' : '1px solid #e0e0e0',
                      backgroundColor: isServiceSelected(servico.id) ? '#f3f0ff' : 'white'
                    }"
                    @click="toggleService(servico.id)"
                  >
                    <v-card-text style="padding: 16px;">
                      <div style="display: flex; align-items: flex-start; gap: 12px;">
                        <v-checkbox
                          :model-value="isServiceSelected(servico.id)"
                          @click.stop="toggleService(servico.id)"
                          style="margin: 0; padding: 0;"
                        ></v-checkbox>
                        <div style="flex: 1;">
                          <h4 style="font-size: 14px; font-weight: 600; color: #212121; margin: 0 0 4px 0;">
                            {{ servico.nome }}
                          </h4>
                          <p style="font-size: 12px; color: #757575; margin: 0 0 8px 0;">
                            {{ servico.descricao }}
                          </p>
                          <p style="font-size: 14px; font-weight: 700; color: #2e7d32; margin: 0;">
                            {{ formatCurrency(servico.valor) }}
                          </p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row style="margin-top: 24px;">
                <v-col cols="12">
                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Serviços Selecionados</p>
                    <div v-if="formData.servicos.length > 0">
                      <div 
                        v-for="servicoId in formData.servicos"
                        :key="servicoId"
                        style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e0e0e0;"
                      >
                        <span style="font-size: 13px; color: #424242;">
                          {{ getServiceName(servicoId) }}
                        </span>
                        <span style="font-size: 13px; font-weight: 600; color: #2e7d32;">
                          {{ formatCurrency(getServiceValue(servicoId)) }}
                        </span>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; margin-top: 8px;">
                        <span style="font-size: 14px; font-weight: 600; color: #212121;">Total Serviços</span>
                        <span style="font-size: 16px; font-weight: 700; color: #667eea;">
                          {{ formatCurrency(totalServicos) }}
                        </span>
                      </div>
                    </div>
                    <p v-else style="font-size: 13px; color: #9e9e9e; margin: 0; font-style: italic;">
                      Nenhum serviço selecionado
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-window-item>

          <v-stepper-window-item :value="3">
            <v-card-text style="padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 16px;">
                Descreva a Festa e Decoração
              </h3>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.descFesta"
                    label="Descrição da Festa"
                    placeholder="Descreva os detalhes da sua festa, tema, número de convidados, etc..."
                    variant="outlined"
                    rows="5"
                    hide-details
                    style="margin-bottom: 16px;"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.descDecoracao"
                    label="Descrição da Decoração"
                    placeholder="Descreva como deseja a decoração do local..."
                    variant="outlined"
                    rows="5"
                    hide-details
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row style="margin-top: 24px;">
                <v-col cols="12" md="6">
                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Festa</p>
                    <p style="font-size: 13px; color: #424242; line-height: 1.6; white-space: pre-wrap;">
                      {{ formData.descFesta || 'Nenhuma descrição fornecida' }}
                    </p>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Decoração</p>
                    <p style="font-size: 13px; color: #424242; line-height: 1.6; white-space: pre-wrap;">
                      {{ formData.descDecoracao || 'Nenhuma descrição fornecida' }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-window-item>

          <v-stepper-window-item :value="4">
            <v-card-text style="padding: 24px;">
              <h3 style="font-size: 18px; font-weight: 600; color: #212121; margin-bottom: 24px;">
                Resumo da Locação
              </h3>

              <v-row style="margin-bottom: 24px;">
                <v-col cols="12" md="6">
                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Data e Hora</p>
                    <p style="font-size: 16px; font-weight: 600; color: #212121; margin: 0;">
                      {{ formatDateTimeDisplay() }}
                    </p>
                  </div>

                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Serviços Selecionados</p>
                    <div v-if="formData.servicos.length > 0">
                      <div 
                        v-for="servicoId in formData.servicos"
                        :key="servicoId"
                        style="font-size: 13px; color: #424242; margin-bottom: 4px;"
                      >
                        • {{ getServiceName(servicoId) }} - {{ formatCurrency(getServiceValue(servicoId)) }}
                      </div>
                    </div>
                    <p v-else style="font-size: 13px; color: #9e9e9e; margin: 0; font-style: italic;">
                      Nenhum serviço selecionado
                    </p>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Descrição da Festa</p>
                    <p style="font-size: 13px; color: #424242; line-height: 1.6; white-space: pre-wrap; margin: 0;">
                      {{ formData.descFesta || 'Não informado' }}
                    </p>
                  </div>

                  <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
                    <p style="font-size: 12px; color: #757575; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Descrição da Decoração</p>
                    <p style="font-size: 13px; color: #424242; line-height: 1.6; white-space: pre-wrap; margin: 0;">
                      {{ formData.descDecoracao || 'Não informado' }}
                    </p>
                  </div>
                </v-col>
              </v-row>

              <v-row style="margin-bottom: 24px;">
                <v-col cols="12">
                  <h4 style="font-size: 16px; font-weight: 600; color: #212121; margin-bottom: 16px;">
                    Critérios de Locação
                  </h4>

                  <v-card style="border-radius: 8px; background-color: #f5f5f5; border-left: 4px solid #667eea;">
                    <v-card-text style="padding: 16px;">
                      <div style="margin-bottom: 16px;">
                        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                          <v-icon size="small" style="color: #667eea; margin-top: 2px;">mdi-check-circle</v-icon>
                          <div>
                            <p style="font-size: 13px; font-weight: 600; color: #212121; margin: 0 0 4px 0;">Duração da Festa</p>
                            <p style="font-size: 13px; color: #757575; margin: 0;">Máximo de 4 horas de locação</p>
                          </div>
                        </div>

                        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                          <v-icon size="small" style="color: #667eea; margin-top: 2px;">mdi-check-circle</v-icon>
                          <div>
                            <p style="font-size: 13px; font-weight: 600; color: #212121; margin: 0 0 4px 0;">Pagamento</p>
                            <p style="font-size: 13px; color: #757575; margin: 0;">50% na confirmação e 50% até 10 dias antes da festa</p>
                          </div>
                        </div>

                        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                          <v-icon size="small" style="color: #667eea; margin-top: 2px;">mdi-check-circle</v-icon>
                          <div>
                            <p style="font-size: 13px; font-weight: 600; color: #212121; margin: 0 0 4px 0;">Cancelamento</p>
                            <p style="font-size: 13px; color: #757575; margin: 0;">Cancelamento gratuito até 15 dias antes da data</p>
                          </div>
                        </div>

                        <div style="display: flex; align-items: flex-start; gap: 12px;">
                          <v-icon size="small" style="color: #667eea; margin-top: 2px;">mdi-check-circle</v-icon>
                          <div>
                            <p style="font-size: 13px; font-weight: 600; color: #212121; margin: 0 0 4px 0;">Confirmação</p>
                            <p style="font-size: 13px; color: #757575; margin: 0;">Confirmação obrigatória 5 dias antes do evento</p>
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-card style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
                    <v-card-text style="padding: 24px;">
                      <v-row>
                        <v-col cols="12" md="6">
                          <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">Valor Base da Locação</p>
                          <p style="font-size: 28px; font-weight: 700; margin: 0;">
                            {{ formatCurrency(valorBase) }}
                          </p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">Valor Total com Serviços</p>
                          <p style="font-size: 28px; font-weight: 700; margin: 0;">
                            {{ formatCurrency(valorTotal) }}
                          </p>
                        </v-col>
                        <v-col cols="12" style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 16px; margin-top: 16px;">
                          <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 8px;">Primeira Parcela (50%)</p>
                          <p style="font-size: 24px; font-weight: 700; margin: 0;">
                            {{ formatCurrency(valorTotal / 2) }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>

      <v-card-actions style="padding: 20px; display: flex; justify-content: space-between; height: 10vh; padding: 0px 100px 40px;">
        <v-btn @click="previousStep" :disabled="currentStep === 1">
          <v-icon start>mdi-arrow-left</v-icon> Anterior
        </v-btn>

        <div>
          <v-btn v-if="currentStep < 4" color="primary" @click="currentStep++">
            Próximo <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn v-else color="success" @click="confirmRental" prepend-icon="mdi-check">
            Confirmar Locação
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)

const formData = ref({
  data: '',
  servicos: [],
  descFesta: '',
  descDecoracao: ''
})

const availableServices = ref([
  { id: 1, nome: 'Louças', descricao: 'Aluguel de louças e utensílios', valor: 250.00 },
  { id: 2, nome: 'Copeira', descricao: 'Profissional para servir bebidas', valor: 350.00 },
  { id: 3, nome: 'Decoração', descricao: 'Decoração temática completa', valor: 800.00 },
  { id: 4, nome: 'Catering', descricao: 'Serviço de alimentação', valor: 1200.00 },
  { id: 5, nome: 'Fotografia', descricao: 'Fotógrafo profissional', valor: 600.00 },
  { id: 6, nome: 'DJ', descricao: 'DJ com equipamento de som', valor: 700.00 }
])

const valorBase = ref(1500.00)

const unavailableDates = ref([
  '2025-10-25',
  '2025-10-26',
  '2025-10-27',
  '2025-11-01',
  '2025-11-02'
])

const totalServicos = computed(() => {
  return formData.value.servicos.reduce((total, servicoId) => {
    const servico = availableServices.value.find(s => s.id === servicoId)
    return total + (servico ? servico.valor : 0)
  }, 0)
})

const valorTotal = computed(() => valorBase.value + totalServicos.value)

function allowedDates(date) {
  return !unavailableDates.value.includes(date)
}

function formatDateTimeDisplay() {
  if (!formData.value.data || !formData.value.hora) return 'Não selecionado'
  const date = new Date(formData.value.data + 'T' + formData.value.hora)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function isServiceSelected(servicoId) {
  return formData.value.servicos.includes(servicoId)
}

function toggleService(servicoId) {
  const index = formData.value.servicos.indexOf(servicoId)
  if (index > -1) {
    formData.value.servicos.splice(index, 1)
  } else {
    formData.value.servicos.push(servicoId)
  }
}

function getServiceName(servicoId) {
  const servico = availableServices.value.find(s => s.id === servicoId)
  return servico ? servico.nome : 'Desconhecido'
}

function getServiceValue(servicoId) {
  const servico = availableServices.value.find(s => s.id === servicoId)
  return servico ? servico.valor : 0
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function cancelCreation() {
  if (confirm('Deseja realmente cancelar a criação da locação?')) {
    console.log('Criação cancelada')
  }
}

function confirmRental() {
  console.log('Locação confirmada:', {
    data: formData.value.data,
    hora: formData.value.hora,
    servicos: formData.value.servicos,
    descFesta: formData.value.descFesta,
    descDecoracao: formData.value.descDecoracao,
    valorTotal: valorTotal.value
  })
  alert('Locação criada com sucesso!')
}
</script>
