<template>
  <plataform-layout>
    <div style="max-height: 100%; overflow-y: scroll ;">
      <v-card style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 24px;">
        <!-- Cabeçalho -->
        <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <v-icon style="color: white;">mdi-account</v-icon>
            <span style="font-size: 24px; font-weight: 600;">Meu Perfil</span>
          </div>
        </v-card-title>

        <!-- Conteúdo do Perfil -->
        <v-card-text style="padding: 32px;">
          <v-row>
            <!-- Avatar e Informações Principais -->
            <v-col cols="12" style="display: flex; align-items: center; margin-bottom: 24px;">
              <v-avatar
                size="100"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 600; font-size: 40px; margin-right: 24px;"
              >
                {{ getInitials(clientData.name) }}
              </v-avatar>
              <div>
                <h2 style="font-size: 28px; font-weight: 600; color: #212121; margin-bottom: 4px;">
                  {{ clientData.name }}
                </h2>
                <v-chip
                  size="small"
                  style="font-weight: 600; background-color: #e3f2fd; color: #1976d2; margin-bottom: 8px;"
                >
                  ID: #{{ clientData.id }}
                </v-chip>
                <p style="font-size: 14px; color: #757575; margin: 0;">
                  Cliente desde {{ formatDate(clientData.dataCadastro) }}
                </p>
              </div>
            </v-col>
          </v-row>

          <v-divider style="margin-bottom: 24px;"></v-divider>

          <!-- Informações de Contato -->
          <v-row>
            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-email</v-icon>
                  <h3 style="font-size: 14px; font-weight: 600; color: #424242; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Email</h3>
                </div>
                <p style="font-size: 15px; color: #212121; margin: 0; margin-left: 36px;">
                  {{ clientData.email }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <v-icon style="color: #667eea; margin-right: 12px;">mdi-phone</v-icon>
                  <h3 style="font-size: 14px; font-weight: 600; color: #424242; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Telefones</h3>
                </div>
                <div v-if="clientData.telefones && clientData.telefones.length > 0" style="margin-left: 36px;">
                  <div 
                    v-for="(telefone, index) in clientData.telefones" 
                    :key="index"
                    style="margin-bottom: 8px;"
                  >
                    <v-chip
                      size="small"
                      prepend-icon="mdi-phone"
                      style="background-color: white; font-weight: 500;"
                    >
                      {{ telefone.numero }}
                    </v-chip>
                  </div>
                </div>
                <p v-else style="font-size: 14px; color: #757575; margin: 0; margin-left: 36px; font-style: italic;">
                  Nenhum telefone cadastrado
                </p>
              </div>
            </v-col>
          </v-row>

          <!-- Botão de Editar Perfil -->
          <v-row style="margin-top: 24px;">
            <v-col cols="12">
              <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                style="text-transform: none; font-weight: 500;"
                @click="editProfile"
              >
                Editar Perfil
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Seção de Locações -->
      <v-card style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <!-- Cabeçalho -->
        <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <v-icon style="color: white;">mdi-calendar-check</v-icon>
              <span style="font-size: 24px; font-weight: 600;">Minhas Locações</span>
            </div>
            <v-chip
              style="background-color: rgba(255,255,255,0.2); color: white; font-weight: 600;"
            >
              Total: {{ clientRentals.length }}
            </v-chip>
          </div>
        </v-card-title>

        <!-- Filtros -->
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
            <v-col cols="12" md="6" style="display: flex; align-items: center; justify-content: flex-end;">
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

          <!-- Tabela de Locações -->
          <v-data-table
            :headers="rentalHeaders"
            :items="filteredRentals"
            :items-per-page="10"
            class="elevation-1"
            style="border-radius: 4px;"
          >
            <!-- Slot customizado para Data -->
            <template v-slot:item.data="{ item }">
              <div style="display: flex; align-items: center;">
                <v-icon size="small" style="margin-right: 8px; color: #757575;">mdi-calendar</v-icon>
                <span style="font-weight: 500; color: #424242;">{{ formatDate(item.data) }}</span>
              </div>
            </template>

            <!-- Slot customizado para Valor -->
            <template v-slot:item.valor="{ item }">
              <div style="display: flex; align-items: center;">
                <v-icon size="small" style="margin-right: 8px; color: #4caf50;">mdi-currency-usd</v-icon>
                <span style="font-weight: 600; color: #2e7d32; font-size: 15px;">{{ formatCurrency(item.valor) }}</span>
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
              <div style="display: flex; gap: 8px;">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="primary"
                  @click="viewRental(item)"
                >
                  <v-icon size="small">mdi-eye</v-icon>
                  <v-tooltip activator="parent" location="top">Visualizar</v-tooltip>
                </v-btn>

                <v-btn
                  v-if="item.status === 'Pendente'"
                  icon
                  size="small"
                  variant="text"
                  color="success"
                  @click="payRental(item)"
                >
                  <v-icon size="small">mdi-credit-card</v-icon>
                  <v-tooltip activator="parent" location="top">Pagar</v-tooltip>
                </v-btn>

                <v-btn
                  v-if="item.status === 'Pendente'"
                  icon
                  size="small"
                  variant="text"
                  color="error"
                  @click="cancelRental(item)"
                >
                  <v-icon size="small">mdi-close</v-icon>
                  <v-tooltip activator="parent" location="top">Cancelar</v-tooltip>
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
                  Você ainda não possui locações. Crie uma nova locação para começar!
                </div>
                <v-btn
                  color="primary"
                  style="margin-top: 16px; text-transform: none; font-weight: 500;"
                  prepend-icon="mdi-plus"
                  @click="createNewRental"
                >
                  Criar Nova Locação
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <!-- Dialog de Confirmação de Pagamento -->
      <v-dialog
        v-model="paymentDialogOpen"
        max-width="500px"
        persistent
      >
        <v-card style="border-radius: 12px;">
          <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
            <span style="font-size: 20px; font-weight: 600;">Confirmar Pagamento</span>
          </v-card-title>

          <v-card-text style="padding: 24px;">
            <p style="font-size: 16px; color: #212121; margin-bottom: 16px;">
              Deseja confirmar o pagamento da locação?
            </p>

            <v-card style="background-color: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="font-size: 12px; color: #757575; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Data</p>
              <p style="font-size: 15px; font-weight: 600; color: #212121; margin: 0 0 12px 0;">
                {{ selectedRental ? formatDate(selectedRental.data) : '' }}
              </p>

              <p style="font-size: 12px; color: #757575; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Valor</p>
              <p style="font-size: 20px; font-weight: 700; color: #2e7d32; margin: 0;">
                {{ selectedRental ? formatCurrency(selectedRental.valor) : '' }}
              </p>
            </v-card>

            <p style="font-size: 13px; color: #9e9e9e; margin: 0; font-style: italic;">
              Você será redirecionado para o gateway de pagamento.
            </p>
          </v-card-text>

          <v-card-actions style="padding: 16px 24px; display: flex; gap: 12px; justify-content: flex-end;">
            <v-btn
              color="secondary"
              variant="outlined"
              style="text-transform: none; font-weight: 500;"
              @click="paymentDialogOpen = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="success"
              style="text-transform: none; font-weight: 500;"
              @click="confirmPayment"
              prepend-icon="mdi-check"
            >
              Confirmar Pagamento
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog de Confirmação de Cancelamento -->
      <v-dialog
        v-model="cancelDialogOpen"
        max-width="500px"
        persistent
      >
        <v-card style="border-radius: 12px;">
          <v-card-title style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px;">
            <span style="font-size: 20px; font-weight: 600;">Cancelar Locação</span>
          </v-card-title>

          <v-card-text style="padding: 24px;">
            <p style="font-size: 16px; color: #212121; margin-bottom: 16px;">
              Deseja realmente cancelar esta locação?
            </p>

            <v-card style="background-color: #fff3e0; border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #ff9800;">
              <p style="font-size: 12px; color: #e65100; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Aviso</p>
              <p style="font-size: 13px; color: #424242; margin: 0; line-height: 1.6;">
                O cancelamento é gratuito até 15 dias antes da data da festa. Após esse período, pode haver taxas de cancelamento.
              </p>
            </v-card>

            <v-card style="background-color: #f5f5f5; border-radius: 8px; padding: 16px;">
              <p style="font-size: 12px; color: #757575; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Data</p>
              <p style="font-size: 15px; font-weight: 600; color: #212121; margin: 0;">
                {{ selectedRental ? formatDate(selectedRental.data) : '' }}
              </p>
            </v-card>
          </v-card-text>

          <v-card-actions style="padding: 16px 24px; display: flex; gap: 12px; justify-content: flex-end;">
            <v-btn
              color="secondary"
              variant="outlined"
              style="text-transform: none; font-weight: 500;"
              @click="cancelDialogOpen = false"
            >
              Manter Locação
            </v-btn>
            <v-btn
              color="error"
              style="text-transform: none; font-weight: 500;"
              @click="confirmCancelation"
              prepend-icon="mdi-delete"
            >
              Cancelar Locação
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </plataform-layout>
</template>

<script>
export default {
  name: 'ClientDashboard',
  data() {
    return {
      paymentDialogOpen: false,
      cancelDialogOpen: false,
      selectedRental: null,
      filters: {
        status: null
      },
      appliedFilters: {
        status: null
      },
      statusOptions: [
        { title: 'Todos', value: null },
        { title: 'Pendente', value: 'Pendente' },
        { title: 'Pago', value: 'Pago' }
      ],
      rentalHeaders: [
        { title: 'Data', key: 'data', align: 'start', sortable: true, width: '150px' },
        { title: 'Valor', key: 'valor', align: 'start', sortable: true, width: '150px' },
        { title: 'Status', key: 'status', align: 'center', sortable: true, width: '130px' },
        { title: 'Ações', key: 'actions', align: 'center', sortable: false, width: '150px' }
      ],
      clientData: {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.com',
        dataCadastro: '2024-01-15',
        telefones: [
          { numero: '(11) 98765-4321' },
          { numero: '(11) 3456-7890' }
        ]
      },
      clientRentals: [
        { id: 1, data: '2025-10-01', valor: 1500.00, status: 'Pago' },
        { id: 2, data: '2025-10-15', valor: 2200.50, status: 'Pendente' },
        { id: 3, data: '2025-11-05', valor: 1800.00, status: 'Pendente' },
        { id: 4, data: '2025-11-20', valor: 3500.00, status: 'Pago' },
        { id: 5, data: '2025-12-10', valor: 1200.00, status: 'Pendente' }
      ]
    }
  },
  computed: {
    filteredRentals() {
      let rentals = this.clientRentals;
      
      if (this.appliedFilters.status) {
        rentals = rentals.filter(rental => rental.status === this.appliedFilters.status);
      }
      
      return rentals;
    }
  },
  methods: {
    getInitials(name) {
      if (!name) return '?';
      const names = name.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    },
    formatDate(dateString) {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    },
    getStatusColor(status) {
      return status === 'Pago' ? 'success' : 'warning';
    },
    getStatusIcon(status) {
      return status === 'Pago' ? 'mdi-check-circle' : 'mdi-clock-alert';
    },
    applyFilters() {
      this.appliedFilters = { ...this.filters };
    },
    clearFilters() {
      this.filters = { status: null };
      this.appliedFilters = { status: null };
    },
    viewRental(rental) {
      console.log('Visualizar locação:', rental);
      // Implemente a navegação para detalhes da locação aqui
    },
    payRental(rental) {
      this.selectedRental = rental;
      this.paymentDialogOpen = true;
    },
    confirmPayment() {
      if (this.selectedRental) {
        console.log('Pagamento confirmado para:', this.selectedRental);
        // Aqui você redirecionaria para o gateway de pagamento
        // Simulando a atualização do status
        const index = this.clientRentals.findIndex(r => r.id === this.selectedRental.id);
        if (index !== -1) {
          this.clientRentals[index].status = 'Pago';
        }
        this.paymentDialogOpen = false;
        this.selectedRental = null;
      }
    },
    cancelRental(rental) {
      this.selectedRental = rental;
      this.cancelDialogOpen = true;
    },
    confirmCancelation() {
      if (this.selectedRental) {
        console.log('Locação cancelada:', this.selectedRental);
        // Aqui você removeria a locação ou atualizaria o status
        const index = this.clientRentals.findIndex(r => r.id === this.selectedRental.id);
        if (index !== -1) {
          this.clientRentals.splice(index, 1);
        }
        this.cancelDialogOpen = false;
        this.selectedRental = null;
      }
    },
    editProfile() {
      console.log('Editar perfil');
      // Implemente a navegação para edição de perfil aqui
    },
    createNewRental() {
      console.log('Criar nova locação');
      // Implemente a navegação para criação de locação aqui
    }
  }
}
</script>
