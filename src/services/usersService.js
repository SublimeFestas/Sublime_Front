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
            const { phone, phones, ...userOnlyData } = userData;
            
            let phoneArray = [];
            if (phones && Array.isArray(phones)) {
                phoneArray = phones.filter(p => p && p.trim());
            } else if (phone && phone.trim()) {
                phoneArray = [phone.trim()];
            }
            
            const requestData = {
                ...userOnlyData,
                telefones_write: phoneArray
            };
            
            const response = await api.put(`/usuarios/${id}/`, requestData);
            return response.data;
            
        } catch (error) {
            throw new Error('Falha ao atualizar usuario: ' + (error.response?.data?.detail || error.message));
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