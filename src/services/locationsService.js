import api from '@/plugins/api'

class LocationsService {

    async getAllLocations(page = 1) {
        try {
            const { data } = await api.get('/alugueis', {
                params: { page }
            });
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar alugueis: ' + error.message);
        }
    }

    async getFilteredLocations(filterParams, page, status) {
        try {
            const params = {
                page: page
            };
            
            if (filterParams) {
                params.search = filterParams;
            }
            
            if (status) {
                params.status = status;
            }
            
            const { data } = await api.get('/alugueis', { params });
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

    async createLocation(locationData) {
        try {
            await api.post('/alugueis/', locationData);
            console.log('Aluguel criado com sucesso');
        } catch (error) {
            throw new Error('Falha ao criar aluguel: ' + error.message);
        }
    }

    async pagarAluguel(aluguelId) {
        try {
            const { data } = await api.patch(`/alugueis/${aluguelId}/`, { status: 'PAGO' })
            return data
        } catch (error) {
            console.error('Erro ao pagar aluguel:', error)
            throw new Error('Erro ao pagar aluguel: ' + (error.message || error))
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