import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import usersService from '../services/usersService';

export const useUsersStore = defineStore('users', () => {
  const loading = ref(false);
  const isLoading = computed(() => loading.value);
  const selectedUser = ref(null);
  const total_pages = ref(0)

  const getUsers = async (page) => {
    loading.value = true;
    try {
      const response = await usersService.getAllUsers(page);
      total_pages.value = response.total_pages
      console.log(total_pages.value)
      console.log('Usuarios carregados:', response);
      return response.results  ;
    } catch (error) {
      console.error('Erro ao realizar a requisicao dos usuarios:', error);
    } finally {
      loading.value = false;
    }
  };

  const getFilteredUsers = async (filterParams, page) => {
    loading.value = true;
    try {
      const response = await usersService.getFilteredUsers(filterParams, page);
      total_pages.value = response.total_pages
      console.log('Usuarios filtrados carregados:', response);
      return response.results;
    } catch (error) {
      console.error('Erro ao realizar a requisicao dos usuarios filtrados:', error);
    } finally {
      loading.value = false;
    }
  };

  const getUserById = async (id) => {
    loading.value = true;
    try {
      const response = await usersService.getUser(id);
      return response;
    } catch (error) {
      console.error('Erro ao realizar a requisicao do usuario por ID:', error);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (newUser) => {
    loading.value = true;
    try {
      await usersService.createUser(newUser);
      getUsers()
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (userID, user) => {
    loading.value = true;
    try {
      await usersService.updateUser(userID, user);
      getUsers()
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (userID) => {
    loading.value = true;
    try {
      await usersService.deleteUser(userID);
      getUsers()
    } catch (error) {
      console.error('Erro ao deletar usuario:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    isLoading,
    total_pages,
    getUsers,
    getFilteredUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    selectedUser,
  };
});
