import api from '@/plugins/api'

class AuthService {
    async login(username, password) {
        try {
        const response = await api.post('/token', { username, password })
        return response.data
        } catch (error) {
        throw new Error('Falha na autenticacao: ' + error.message)
        }
    }

    async register(username, password, email) {
        try {
        const response = await api.post('/usuarios', { username, password, email })
        return response.data
        } catch (error) {
        throw new Error('Falha no registro: ' + error.message)
        }
    }
}

export default new AuthService()