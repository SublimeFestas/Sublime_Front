import { defineStore } from "pinia";
import { ref, computed } from "vue";
import user from "../services/userAuthService";

export const useAuth = defineStore("user", () => {
    const state = useState("user", () => ({
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false
    }));

    const Login = async (username, password) => {
        state.loading = true;
        try {
            const response = await user.login(username, password);
            state.user = response.user;
            state.token = response.token;
            state.isAuthenticated = true;
        } catch (error) {
            console.error("Falha no Login:", error);
            throw error;
        } finally {
            state.loading = false;
        }
    };

    const Logout = () => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
    };

    return { state, Login, Logout };
});