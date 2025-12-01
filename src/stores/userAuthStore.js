import { defineStore } from "pinia";
import { reactive } from "vue";
import userService from "../services/userAuthService";

export const useUserAuth = defineStore("user", () => {
    const state = reactive({
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false
    });

    const login = async (email, password) => {
        state.loading = true;
        try {
            const loginResponse = await userService.login(email, password);
            state.token = loginResponse.access;
            state.isAuthenticated = true;
            return loginResponse;
        } catch (error) {
            throw error;
        } finally {
            state.loading = false;
        }
    };

    const getMe = async () => {
        state.loading = true;
        try {
            const me = await userService.getMe();
            state.user = me;
            return me;
        } catch (error) {
            throw error;
        } finally {
            state.loading = false;
        }
    };

    const logout = () => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        userService.logout();
    };

    return { state, login, getMe, logout };
});
