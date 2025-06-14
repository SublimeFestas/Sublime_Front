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
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          variant="outlined"
          density="comfortable"
          style="margin-bottom: 4px"
          :error="senhaIncorreta"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
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
            ><img src="@/assets/icons/alert_icon.svg" alt="" />
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
import { userAuth } from "@/stores/userAuthStore.js";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = userAuth();

const user = reactive({
  email: "",
  senha: "",
});

const showPassword = ref(false);

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

function Login() {
  userStore
    .login(user.email, user.senha)
    .then(() => {
      router.push("/plataform/manager/locations");
    })
}
</script>
