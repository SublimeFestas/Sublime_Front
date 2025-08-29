import api from "@/plugins/api";

class UserLogin {
    async login(email, password) {
        try {
            const response = await api.post("token/", { email, password });

            const refreshToken = response.refresh;
            const accessToken = response.access;

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            console.log("Login bem-sucedido");
            return response;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
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

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete api.defaults.headers.common["Authorization"];
        console.log("Logout efetuado");
    }
}

export default new UserLogin();