import api from '@/plugins/api'

class UsersService {
    async getUser(id) {
        try {
            const response = await api.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Falha ao buscar usuario: ' + error.message);
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await api.put(`/usuarios/${id}`, userData);
            return response.data;
        } catch (error) {
            throw new Error('Falha ao atualizar usuario: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            await api.delete(`/usuarios/${id}`);
        } catch (error) {
            throw new Error('Falha ao deletar usuario: ' + error.message);
        }
    }
}

export default new UsersService();