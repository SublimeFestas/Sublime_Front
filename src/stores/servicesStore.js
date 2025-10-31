import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import ServicesService from '../services/servicesService.js';

export const useServicesStore = defineStore('Services', () => {
  const loading = ref(false);
  const isLoading = computed(() => loading.value);
  const selectedService = ref(null);

  const getServices = async (page) => {
    loading.value = true;
    try {
      const response = await ServicesService.getAllServices(page);
      console.log('Serviços carregados:', response);
      return response.results  ;
    } catch (error) {
      console.error('Erro ao realizar a requisicao dos serviços:', error);
    } finally {
      loading.value = false;
    }
  };

  const getFilteredServices = async (filterParams, page) => {
    loading.value = true;
    try {
      const response = await ServicesService.getFilteredServices(filterParams, page);
      console.log('Serviços filtrados carregados:', response);
      return response.results;
    } catch (error) {
      console.error('Erro ao realizar a requisicao dos serviços filtrados:', error);
    } finally {
      loading.value = false;
    }
  };

  const getServiceById = async (id) => {
    loading.value = true;
    try {
      const response = await ServicesService.getService(id);
      return response;
    } catch (error) {
      console.error('Erro ao realizar a requisicao do serviço por ID:', error);
    } finally {
      loading.value = false;
    }
  };

  const createService = async (newService) => {
    loading.value = true;
    try {
      await ServicesService.createService(newService);
      getServices()
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
    } finally {
      loading.value = false;
    }
  };

  const updateService = async (ServiceID, Service) => {
    loading.value = true;
    try {
      await ServicesService.updateService(ServiceID, Service);
      getServices()
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
    } finally {
      loading.value = false;
    }
  };

  const deleteService = async (ServiceID) => {
    loading.value = true;
    try {
      await ServicesService.deleteService(ServiceID);
      getServices()
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    isLoading,
    getServices,
    getFilteredServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    selectedService,
  };
});
