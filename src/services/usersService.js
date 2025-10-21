import api from '@/plugins/api'

class UsersService {
    async getAllUsers() {
        try {
            const { data } = await api.get('/usuarios');
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar usuarios: ' + error.message);
        }
    }

    async getFilteredUsers(filterParams, page) {
        try {
            const { data } = await api.get(`/usuarios?search=${filterParams}&page=${page}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar usuarios filtrados: ' + error.message);
        }
    }

    async getUser(id) {
        try {
            const { data } = await api.get(`/usuarios/${id}`);
            return data;
        } catch (error) {
            throw new Error('Falha ao buscar usuario: ' + error.message);
        }
    }

    async updateUser(id, userData) {
        try {
            await api.put(`/usuarios/${id}`, userData);
            console.log('Usuario atualizado com sucesso');
        } catch (error) {
            throw new Error('Falha ao atualizar usuario: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            await api.delete(`/usuarios/${id}/`);
            console.log('Usuario deletado com sucesso');
        } catch (error) {
            throw new Error('Falha ao deletar usuario: ' + error.message);
        }
    }
}

export default new UsersService();