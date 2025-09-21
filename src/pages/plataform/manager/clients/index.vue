<template>
  <plataformLayout>
    <div style="padding: 32px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); height: 100%;">
      <!-- Busca -->
      <v-text-field
        v-model="search"
        label="Buscar Cliente"
        variant="outlined"
        style="max-width: 500px; margin-bottom: 32px;"
        clearable
      />

      <!-- Tabela -->
      <v-table>
        <thead>
          <tr>
            <th style="color:#b0b0b0; font-weight:600;">NOME</th>
            <th style="color:#b0b0b0; font-weight:600;">EMAIL</th>
            <th style="color:#b0b0b0; font-weight:600;">NÚMERO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList.results" :key="user.id" style="height:80px;">
            <td style="font-weight:600;">{{ user.name }}</td>
            <td><div>{{ user.email }}</div></td>
            <td><div>{{ user.phone }}</div></td>
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
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
const userList = ref([])

const getUsers = async () => {
  userList.value = await usersStore.getUsers(1)
  console.log('dados recebidos:', userList.value)
}

onMounted(() => {
  getUsers()
})

</script>