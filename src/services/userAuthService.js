import api from "@/plugins/api";

class UserLogin {
    async login(email, password) {
        try {
            const {data} = await api.post("token/", { email, password });

            const refreshToken = data.refresh;
            const accessToken = data.access;

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            console.log("Login bem-sucedido");
            return data;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }

    async register(email, password, name) {
        try {
            const data = await api.post('/usuarios/', { email, password, name })
            return data.data
        } catch (error) {
            throw new Error('Falha no registro: ' + error.message)
        }
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete api.defaults.headers.common["Authorization"];
        console.log("Logout efetuado");
        // Redirecione para a página de login
        window.location.href = "/plataform/auth/login";
    }
}

export default new UserLogin();