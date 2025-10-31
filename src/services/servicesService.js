import api from '@/plugins/api'

class ServicessService {
    async getAllServices() {
        try {
            const { data } = await api.get('/servicos');
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar servicos: ' + error.message);
        }
    }

    async getFilteredServices(filterParams, page) {
        try {
            const { data } = await api.get(`/servicos?search=${filterParams}&page=${page}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar servicos filtrados: ' + error.message);
        }
    }

    async getService(id) {
        try {
            const { data } = await api.get(`/servicos/${id}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar serviço: ' + error.message);
        }
    }

    async updateService(id, ServicesData) {
        try {
            await api.put(`/servicos/${id}`, ServicesData);
            console.log('serviço atualizado com sucesso');
        } catch (error) {
            throw new Error('Falha ao atualizar serviço: ' + error.message);
        }
    }

    async deleteService(id) {
        try {
            await api.delete(`/servicos/${id}/`);
            console.log('serviço deletado com sucesso');
        } catch (error) {
            throw new Error('Falha ao deletar serviço: ' + error.message);
        }
    }
}

export default new ServicessService();