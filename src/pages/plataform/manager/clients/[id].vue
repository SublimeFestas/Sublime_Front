<template>
  <plataform-layout>
    <div style="display: flex; height: 100%">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 32px; background: #fff; border-right: 1px solid #ddd; border-radius: 10px 0px 0px 10px;">
        <v-btn style="width: 100px; background-color: #c8e2cb; text-transform: capitalize;" class="ma-2" @click="$router.push('/plataform/manager/clients')">Voltar</v-btn>
        <div style="padding: 16px 0px">
          <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 24px; text-align: center;">
            <template v-if="loading">
              <v-skeleton-loader type="heading" />
            </template>
            <template v-else>
              {{ user?.name || "Nome não disponível" }}
            </template>
          </div>
          <div>
            <span style="font-size: 1rem; font-weight: bold; color: #888; border-bottom: 1px solid black;">Detalhes</span>
            <template v-if="loading">
              <v-skeleton-loader type="list-item-two-line" style="margin-top: 16px" />
            </template>
            <ul v-else style="list-style: none; padding: 0; margin-top: 16px">
              <li style="margin-bottom: 8px">Nome: <span style="font-weight: bold">{{ user?.name || "N/A" }}</span></li>
              <li style="margin-bottom: 8px">ID: <span style="font-weight: bold">{{ user?.id || "N/A" }}</span></li>
              <li style="margin-bottom: 8px">Email: <span style="font-weight: bold">{{ user?.email || "N/A" }}</span></li>
              <li style="margin-bottom: 8px">
                Telefone: 
                <span style="font-weight: bold">{{ 
                  user?.phone || 
                  (user?.telefones && user.telefones.length > 0 ? 
                    (user.telefones[0].numero || user.telefones[0].phone) : 
                    "N/A"
                  ) 
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 32px; display: flex; gap: 16px; justify-content: center;">
          <v-btn color="primary" :disabled="loading" @click="openEditModal">
            <v-icon left style="margin-right: 5px;">mdi-pencil</v-icon>
            Editar
          </v-btn>
          <v-btn color="error" :disabled="loading" @click="deleteUser">
            <v-icon left style="margin-right: 5px;">mdi-delete</v-icon>
            Deletar
          </v-btn>
        </div>
      </div>

      <div style="flex: 2; padding: 32px; background: #fff; border-radius: 00px 10px 10px 0px;">
        <div style="font-size: 1rem; font-weight: bold; color: #888; margin-bottom: 24px;">Últimas Locações</div>
        <v-table>
          <thead>
            <tr>
              <th style="color: #b0b0b0; font-weight: 600">Data</th>
              <th style="color: #b0b0b0; font-weight: 600">Nota</th>
              <th style="color: #b0b0b0; font-weight: 600">Alugou</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loadingLocations">
              <tr v-for="n in 3" :key="n" style="height: 80px">
                <td><v-skeleton-loader type="text" /></td>
                <td><v-skeleton-loader type="chip" /></td>
                <td><v-skeleton-loader type="chip" /></td>
                <td><v-skeleton-loader type="button" /></td>
              </tr>
            </template>
            <template v-else-if="userLocations.length > 0">
              <tr v-for="location in userLocations.slice(0, 10)" :key="location.id" style="height: 80px">
                <td>{{ formatDate(location.data_festa) }}</td>
                <td>
                  <v-chip size="small" color="#eee" style="color: #444">{{ location.nota_avaliacao || "N/A" }}</v-chip>
                </td>
                <td>
                  <v-chip size="small" color="#eee" style="color: #444">{{ location.tipo_locacao || "N/A" }}</v-chip>
                </td>
                <td>
                  <v-btn icon variant="text" color="primary" @click="$router.push(`/plataform/manager/locations/${location.id}`)">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr style="height: 80px">
                <td colspan="4" style="text-align: center; color: #888">Nenhuma locação encontrada para este cliente</td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </div>
    </div>

    <v-dialog v-model="editModalOpen" max-width="500px" persistent>
      <v-card>
        <v-card-title style="background-color: #f5f5f5; padding: 20px;">
          <span style="font-size: 1.2rem; font-weight: bold;">Editar Cliente</span>
        </v-card-title>
        <v-card-text style="padding: 20px;">
          <v-form ref="editForm" v-model="editFormValid" lazy-validation>
            <v-text-field v-model="editUserData.name" label="Nome" variant="outlined" :rules="[rules.required]" class="mb-3" />
            <v-text-field v-model="editUserData.id" label="Cod. Usuario" variant="outlined" readonly disabled class="mb-3" />
            <v-text-field v-model="editUserData.email" label="Email" variant="outlined" :rules="[rules.required, rules.email]" class="mb-3" />
            
            <div class="mb-3">
              <label class="text-body-2 font-weight-medium mb-2 d-block">Telefones</label>
              <div v-for="(phone, index) in editUserData.phones" :key="index" class="d-flex align-center mb-2">
                <v-text-field
                  v-model="editUserData.phones[index]"
                  :label="`Telefone ${index + 1}`"
                  variant="outlined"
                  class="mr-2"
                  density="compact"
                />
                <v-btn 
                  v-if="editUserData.phones.length > 1"
                  icon="mdi-delete" 
                  color="error" 
                  variant="text" 
                  size="small"
                  @click="removePhone(index)"
                />
              </div>
              <v-btn 
                variant="outlined" 
                prepend-icon="mdi-plus" 
                size="small"
                @click="addPhone"
              >
                Adicionar Telefone
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions style="padding: 20px; justify-content: flex-end; gap: 10px;">
          <v-btn color="grey" variant="outlined" @click="closeEditModal" :disabled="editLoading">Cancelar</v-btn>
          <v-btn color="primary" @click="updateUser" :loading="editLoading" :disabled="!editFormValid">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000" top>
      Usuário atualizado com sucesso!
      <template #actions>
        <v-btn color="white" variant="text" @click="showSuccessSnackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </plataform-layout>
</template>

<script setup>
import PlataformLayout from "@/components/layouts/PlataformLayout.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "@/stores/usersStore";
import { useLocationsStore } from "@/stores/locationsStore";
import { formatDate } from "@/utils/formatDate";

const route = useRoute();
const usersStore = useUsersStore();
const locationsStore = useLocationsStore();

const user = ref(null);
const loading = ref(false);
const loadingLocations = ref(false);
const userLocations = ref([]);
const userId = computed(() => route.params.id);

const editModalOpen = ref(false);
const editUserData = ref({});
const editFormValid = ref(true);
const editLoading = ref(false);
const showSuccessSnackbar = ref(false);

const rules = {
  required: (value) => !!value || "Campo obrigatório",
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "E-mail inválido";
  },
};

const fetchUserData = async () => {
  loading.value = true;
  try {
    user.value = await usersStore.getUserById(userId.value);
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    user.value = null;
  } finally {
    loading.value = false;
  }
};

const fetchUserLocations = async () => {
  loadingLocations.value = true;
  try {
    const allLocations = await locationsStore.getLocations();
    userLocations.value = allLocations.filter(loc => loc.cliente && (loc.cliente.toString() === userId.value || loc.cliente.id && loc.cliente.id.toString() === userId.value));
  } catch (error) {
    console.error("Erro ao buscar locações do usuário:", error);
    userLocations.value = [];
  } finally {
    loadingLocations.value = false;
  }
};

const openEditModal = () => {
  const existingPhones = [];
  
  if (user.value?.phone) {
    existingPhones.push(user.value.phone);
  } else if (user.value?.telefones && user.value.telefones.length > 0) {
    user.value.telefones.forEach(tel => {
      const phoneNumber = tel.numero || tel.phone;
      if (phoneNumber) existingPhones.push(phoneNumber);
    });
  }
  
  if (existingPhones.length === 0) {
    existingPhones.push('');
  }

  editUserData.value = {
    id: user.value?.id,
    name: user.value?.name,
    email: user.value?.email,
    phones: existingPhones,
  };
  editModalOpen.value = true;
};

const closeEditModal = () => {
  editModalOpen.value = false;
  editUserData.value = {};
};

const addPhone = () => {
  editUserData.value.phones.push('');
};

const removePhone = (index) => {
  editUserData.value.phones.splice(index, 1);
};

const updateUser = async () => {
  if (!editFormValid.value) return;
  
  editLoading.value = true;
  
  try {
    const validPhones = editUserData.value.phones.filter(phone => phone && phone.trim());
    
    const updateData = {
      name: editUserData.value.name,
      email: editUserData.value.email,
      phones: validPhones,
    };

    const result = await usersStore.updateUser(userId.value, updateData);

    if (result.success) {
      showSuccessSnackbar.value = true;
      closeEditModal();
      await fetchUserData();
    } else {
      alert(`Erro ao atualizar usuário: ${result.error}`);
    }
  } catch (error) {
    alert(`Erro ao atualizar usuário: ${error.message || error}`);
  } finally {
    editLoading.value = false;
  }
};

const deleteUser = async () => {
  const confirmed = confirm("Tem certeza que deseja deletar este usuário?");
  if (!confirmed) return;

  try {
    await usersStore.deleteUser(userId.value);
    alert("Usuário deletado com sucesso!");
    this.$router.push("/plataform/manager/clients");
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    alert("Erro ao deletar usuário. Tente novamente.");
  }
};

onMounted(() => {
  fetchUserData();
  fetchUserLocations();
});
</script>