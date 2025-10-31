import api from '@/plugins/api'

class LocationsService {

    async getAllLocations() {
        try {
            const { data } = await api.get('/alugueis');
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar alugueis: ' + error.message);
        }
    }

    async getFilteredLocations(filterParams, page) {
        try {
            const { data } = await api.get(`/alugueis?search=${filterParams}&page=${page}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar alugueis filtrados: ' + error.message);
        }
    }

    async getLocationsByUserId(userId) {
        try {
            const { data } = await api.get(`/alugueis/por-usuario/${userId}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar alugueis por usuario: ' + error.message);
        }
    }
    
    async getLocation(id) {
        try {
            const { data } = await api.get(`/alugueis/${id}/`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar aluguel: ' + error.message);
        }
    }

    async updateLocation(id, locationData) {
        try {
            await api.put(`/alugueis/${id}`, locationData);
            console.log('Aluguel atualizado com sucesso');
        } catch (error) {
            throw new Error('Falha ao atualizar aluguel: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            await api.delete(`/alugueis/${id}`);
            console.log('Usuario deletado com sucesso');
        } catch (error) {
            throw new Error('Falha ao deletar usuario: ' + error.message);
        }
    }
}

export default new LocationsService();