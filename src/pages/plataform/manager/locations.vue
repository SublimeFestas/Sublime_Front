<template>
  <plataformLayout>
    <div style="padding: 32px;">
      <!-- Busca -->
      <v-text-field
        v-model="search"
        label="Buscar Locação"
        variant="outlined"
        style="max-width: 500px; margin-bottom: 32px;"
        clearable
      />

      <!-- Tabela -->
      <v-table>
        <thead>
          <tr>
            <th style="color:#b0b0b0; font-weight:600;">DATA</th>
            <th style="color:#b0b0b0; font-weight:600;">CLIENTE</th>
            <th style="color:#b0b0b0; font-weight:600;">LOCADO</th>
            <th style="color:#b0b0b0; font-weight:600;">VALOR</th>
            <th style="color:#b0b0b0; font-weight:600;">PAGAMENTO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginated" :key="item.id">
            <td>{{ item.date }}</td>
            <td>
              <div style="font-weight:600;">{{ item.client }}</div>
              <div style="font-size:0.9em; color:#888;">{{ item.phone }}</div>
            </td>
            <td>
              <v-chip size="small" color="#eee" style="color:#444;">{{ item.rented }}</v-chip>
            </td>
            <td>R$ {{ item.value.toLocaleString('pt-BR', {minimumFractionDigits: 2}) }}</td>
            <td>
              <v-chip size="small" color="#fdeaea" style="color:#e57373;">{{ item.payment }}</v-chip>
            </td>
            <td>
              <v-btn icon variant="text" color="primary">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- Paginação -->
      <div style="display:flex; justify-content:flex-end; margin-top:24px;">
        <v-pagination
          v-model="page"
          :length="pageCount"
          rounded="circle"
        />
      </div>
    </div>
  </plataformLayout>
</template>

<script setup>
import { ref, computed } from 'vue'

const allData = [
  {
    id: 1,
    date: '15 / 09 / 2026',
    client: 'Mirella A. Quintino',
    phone: '+55 47 9394-9481',
    rented: 'Decoração',
    value: 960.90,
    payment: 'Pendente'
  },
  {
    id: 2,
    date: '15 / 09 / 2026',
    client: 'Mirella A. Quintino',
    phone: '+55 47 9394-9481',
    rented: 'Espaço',
    value: 960.90,
    payment: 'Pendente'
  },
]

const search = ref('')
const page = ref(1)
const itemsPerPage = 8

const filtered = computed(() => {
  if (!search.value) return allData
  return allData.filter(item =>
    item.client.toLowerCase().includes(search.value.toLowerCase()) ||
    item.rented.toLowerCase().includes(search.value.toLowerCase()) ||
    item.date.includes(search.value)
  )
})

const pageCount = computed(() => Math.ceil(filtered.value.length / itemsPerPage))

const paginated = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return filtered.value.slice(start, start + itemsPerPage)
})
</script>