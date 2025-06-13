import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { userAuth } from "./userAuthStore"
import user from "../services/userAuthService";

export const userRegister = defineStore("user", () => {
    const state = reactive({
        user: null,
        email: null,
        password: false,
    });

    const register = async (email, password, username) => {
        state.loading = true;
        try {
            const response = await user.register(email, password, username);
        } catch (error) {
            console.error("Falha no Registro:", error);
            throw error;
        } finally {
            state.loading = false;
        }
    };
    return { state, register };
});