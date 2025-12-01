import api from '@/plugins/api'

class CountsService {

    async getCounts() {
        try {
            const { data } = await api.get('/allcounts/');
            return data;
        } catch (error) {
            console.error('Falha ao buscar valores:', error);
            throw error;
        }
    }
}

export default new CountsService();