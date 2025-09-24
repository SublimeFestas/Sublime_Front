<template>
  <v-main class="d-flex align-center justify-center" style="min-height: 100vh">
    <div
      style="
        background: #fff;
        border-radius: 8px;
        min-width: 400px;
        padding: 48px 32px 32px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: none;
      "
    >
      <img
        src="@/assets/logoSublimeSimbolo.png"
        alt="Logo"
        width="90"
        height="90"
        style="object-fit: contain; margin-bottom: 32px"
      />
      <v-form @submit.prevent="Login" style="width: 100%">
        <v-text-field
          label="Email"
          variant="outlined"
          density="comfortable"
          style="margin-bottom: 16px"
          :rules="[rules.email]"
          hide-details="auto"
          v-model="user.email"
        />
        <v-text-field
          v-model="user.senha"
          :type="mostrarSenha ? 'text' : 'password'"
          label="Senha"
          variant="outlined"
          density="comfortable"
          style="margin-bottom: 4px"
          :error="senhaIncorreta"
          :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="mostrarSenha = !mostrarSenha"
          hide-details="auto"
        />
        <div
          style="
            display: flex;
            justify-content: end;
            align-items: center;
            min-height: 24px;
            margin-bottom: 8px;
          "
        >
          <span
            v-if="senhaIncorreta"
            style="
              color: #ff8f8f;
              font-size: 12px;
              display: flex;
              align-items: center;
              gap: 4px;
            "
            ><img :src="alertIcon" alt="" />
            Senha Incorreta
          </span>
          <router-link
            to="#"
            style="font-size: 12px; text-decoration: none; color: black"
          >
            Esqueceu sua senha? <b style="color: #0099ff">Aqui</b>
          </router-link>
        </div>
        <v-btn
          type="submit"
          style="
            background: #cfe5d4;
            color: #fff;
            font-weight: bold;
            font-size: 20px;
            min-height: 56px;
            margin-bottom: 16px;
            box-shadow: none;
          "
          block
          :disabled="!valid"
        >
          Entrar
        </v-btn>
      </v-form>
      <div style="text-align: center; margin-top: 8px">
        <span style="font-size: 14px">Não Possui Conta?</span>
        <router-link
          to="/plataform/auth/register"
          style="
            color: #0099ff;
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;
          "
        >
          Registre-se
        </router-link>
      </div>
    </div>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue";
import UserLogin from "@/services/userAuthService.js";
import { useRouter } from "vue-router";

const alertIcon = '/icons/alert_icon.svg';

const router = useRouter();

const user = reactive({
  email: "",
  senha: "",
});

const mostrarSenha = ref(false);

const rules = {
  email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
};

const valid = computed(() => {
  return (
    user.email.length > 0 &&
    user.senha.length > 0 &&
    rules.email(user.email) === true
  );
});
  
async function Login() {
  try {
    console.log("Dados enviados:", user.email, user.senha);
    await UserLogin.login(user.email, user.senha);
    router.push("/plataform/manager/locations");
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Erro de autenticação: Usuário ou senha inválidos.");
    } else {
      console.error("Erro ao fazer login:", error);
    }
  }
}
</script>
