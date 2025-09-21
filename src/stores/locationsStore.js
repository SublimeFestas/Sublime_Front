import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import LocationsService from '../services/locationsService';

export const useLocationsStore = defineStore('locations', () => {
  const loading = ref(false);
  const isLoading = computed(() => loading.value);

  const getLocations = async (page) => {
    loading.value = true;
    try {
      const response = await LocationsService.getAllLocations(page);
      console.log('Alugueis carregados:', response);
      return response;
    } catch (error) {
      console.error('Erro ao realizar a requisicao dos alugueis:', error);
    } finally {
      loading.value = false;
    }
  };

  const getLocationById = async (id) => {
    loading.value = true;
    try {
      const response = await LocationsService.getLocation(id);
      return response;
    } catch (error) {
      console.error('Erro ao realizar a requisicao do aluguel por ID:', error);
    } finally {
      loading.value = false;
    }
  };

  const createLocation = async (newLocation) => {
    loading.value = true;
    try {
      await LocationsService.createLocation(newLocation);
      getLocations()
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
    } finally {
      loading.value = false;
    }
  };

  const updateLocation = async (locationID, location) => {
    loading.value = true;
    try {
      await LocationsService.updateLocation(locationID, location);
      getLocations()
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
    } finally {
      loading.value = false;
    }
  };

  const deleteLocation = async (locationID) => {
    loading.value = true;
    try {
      await LocationsService.deleteLocation(userID);
      getLocations()
    } catch (error) {
      console.error('Erro ao deletar usuario:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    isLoading,
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
  };
});
