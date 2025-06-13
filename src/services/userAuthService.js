import api from '@/plugins/api'

class AuthService {
    async login(email, password) {
        try {
        const response = await api.post('/token/', { email, password })
        return response.data
        } catch (error) {
        throw new Error('Falha na autenticacao: ' + error.message)
        }
    }

    async register(email, password, name) {
        try {
        const response = await api.post('/usuarios/', { email, password, name })
        return response.data
        } catch (error) {
        throw new Error('Falha no registro: ' + error.message)
        }
    }
}

export default new AuthService()