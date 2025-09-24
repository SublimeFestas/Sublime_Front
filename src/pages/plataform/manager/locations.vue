<template>
  <plataformLayout>
    <div style="padding: 32px; background-color: #fff; height: 100%; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
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
          <tr v-for="location in locationsList.results" :key="location.id" style="height:80px;">
            <td>{{ formatDate(location.data_festa) }}</td>
            <td>
              <div style="font-weight:600;">{{ location.user?.name || 'N/A' }}</div>
              <div style="font-size:0.9em; color:#888;">{{ location.user?.phone || 'N/A' }}</div>
            </td>
            <td>
              <v-chip size="small" color="#eee" style="color:#444;">{{ location.tipo_locacao }}</v-chip>
            </td>
            <td>R$ {{ location.valor_festa }}</td>
            <td>
              <v-chip size="small" color="#fdeaea" style="color:#e57373;">Pendente</v-chip>
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
import { useLocationsStore } from '@/stores/locationsStore'
import {formatDate} from '@/utils/formatDate'

const locationsStore = useLocationsStore()
const locationsList = ref([])

const getLocations = async () => {
  locationsList.value = await locationsStore.getLocations(1)
  console.log('dados recebidos:', locationsList.value)
}

onMounted(() => {
  getLocations()
})
</script>