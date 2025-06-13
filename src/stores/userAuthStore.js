import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import user from "../services/userAuthService";

export const userAuth = defineStore("user", () => {
    const state = reactive({
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false
    });

    const login = async (username, password) => {
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

    const logout = () => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
    };

    return { state, login, logout };
});
