import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { userAuth } from "./userAuthStore"
import user from "../services/userAuthService";

export const useAuth = defineStore("user", () => {
    const state = useState("user", () => ({
        user: null,
        email: null,
        password: false,
    }));

    const register = async (username, password, email) => {
        state.loading = true;
        try {
            const response = await user.register(username, password, email);
        } catch (error) {
            console.error("Falha no Registro:", error);
            throw error;
        } finally {
            state.loading = false;
        }
    };
    return { state, register };
});