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
      <v-form @submit.prevent="Register" style="width: 100%">
        <v-text-field
          label="Nome"
          variant="outlined"
          density="comfortable"
          style="margin-bottom: 16px"
          :rules="[rules.nome]"
          hide-details="auto"
          v-model="user.nome"
        />
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
          style="margin-bottom: 8px"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :error="senhaDivergente"
          hide-details="auto"
        />
        <v-text-field
          v-model="user.confirmarSenha"
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Confirme Sua Senha"
          variant="outlined"
          density="comfortable"
          style="margin-bottom: 4px"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
          :error="senhaDivergente"
          hide-details="auto"
        />
        <div
          style="
            display: flex;
            align-items: center;
            min-height: 24px;
            margin-bottom: 8px;
          "
        >
          <span
            v-if="senhaDivergente"
            style="
              color: #ff8f8f;
              font-size: 12px;
              display: flex;
              align-items: center;
              gap: 4px;
            "
            ><img :src="alertIcon" alt="" />
            Senhas Divergentes
          </span>
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
          Cadastrar
        </v-btn>
      </v-form>
      <div style="text-align: center; margin-top: 8px">
        <span style="font-size: 14px">Já Possui Conta? Basta</span>
        <router-link
          to="/plataform/auth/login"
          style="
            color: #0099ff;
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;
          "
        >
          Entrar
        </router-link>
      </div>
    </div>
  </v-main>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { userRegister } from "@/stores/registerStore";

const alertIcon = '/icons/alert_icon.svg';
const router = useRouter();
const registerStore = userRegister();

const user = reactive({
  nome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const rules = {
  nome: (v) => !!v || "Nome obrigatório",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
};

const senhaDivergente = computed(() => {
  return (
    user.senha && user.confirmarSenha && user.senha !== user.confirmarSenha
  );
});

const valid = computed(() => {
  return (
    user.nome.length > 0 &&
    user.email.length > 0 &&
    user.senha.length > 0 &&
    user.confirmarSenha.length > 0 &&
    rules.email(user.email) === true &&
    rules.nome(user.nome) === true &&
    !senhaDivergente.value
  );
});

function Register() {
  registerStore
    .register(user.email, user.senha, user.nome)
    .then(() => router.push("/plataform/auth/login"))
}
</script>
