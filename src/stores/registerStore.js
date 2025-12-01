import user from "../services/userAuthService.js";

export const userRegister = defineStore("userRegister", () => {

    const state = reactive({
        user: null,
        email: null,
        password: false,
        loading: false,
    });

    const register = async (email, password, username) => {
        state.loading = true;
        try {
            const response = await user.register(email, password, username);
            return response;
        } catch (error) {
            console.error("Falha no Registro:", error);
            throw error;
        } finally {
            state.loading = false;
        }
    };

    return { state, register };
});

