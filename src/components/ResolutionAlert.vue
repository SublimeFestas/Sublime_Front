<template>
  <div v-if="!isCompatibleResolution" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; z-index: 9999;">
    <v-container style="max-width: 500px;">
      <v-card style="border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
        <v-card-text style="padding: 48px 32px; text-align: center;">
          <!-- Ícone -->
          <div style="margin-bottom: 24px;">
            <v-icon size="80" style="color: #667eea;">mdi-monitor-off</v-icon>
          </div>

          <!-- Título -->
          <h1 style="font-size: 28px; font-weight: 700; color: #212121; margin: 0 0 12px 0;">
            Resolução Incompatível
          </h1>

          <!-- Subtítulo -->
          <p style="font-size: 16px; color: #757575; margin: 0 0 24px 0; line-height: 1.6;">
            Desculpe, esta aplicação requer uma resolução mínima de <strong>1200px</strong> de largura.
          </p>

          <!-- Mensagem Descritiva -->
          <div style="background-color: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #424242; margin: 0; line-height: 1.6;">
              Para uma melhor experiência e acesso a todas as funcionalidades, por favor acesse através de um <strong>dispositivo desktop</strong> ou redimensione sua janela do navegador para uma largura maior.
            </p>
          </div>

          <!-- Informações Técnicas -->
          <div style="background-color: #e3f2fd; border-radius: 8px; padding: 12px; margin-bottom: 24px; border-left: 4px solid #1976d2;">
            <p style="font-size: 12px; color: #1565c0; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 4px;">
              Sua Resolução Atual
            </p>
            <p style="font-size: 16px; font-weight: 700; color: #0d47a1; margin: 0;">
              {{ windowWidth }}px
            </p>
          </div>

          <!-- Dicas -->
          <div style="background-color: #fff3e0; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #ff9800;">
            <p style="font-size: 12px; color: #e65100; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
              Dicas:
            </p>
            <ul style="font-size: 13px; color: #424242; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Maximize a janela do navegador</li>
              <li>Use um monitor com maior resolução</li>
              <li>Reduza o zoom do navegador (Ctrl + Menos)</li>
              <li>Acesse em um dispositivo desktop</li>
            </ul>
          </div>

          <!-- Botão de Tentar Novamente -->
          <v-btn
            color="primary"
            size="large"
            style="text-transform: none; font-weight: 600; width: 100%;"
            prepend-icon="mdi-refresh"
            @click="checkResolution"
          >
            Tentar Novamente
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ResolutionAlert',
  data() {
    return {
      windowWidth: 0,
      minResolution: 1200
    }
  },
  computed: {
    isCompatibleResolution() {
      return this.windowWidth >= this.minResolution;
    }
  },
  methods: {
    checkResolution() {
      this.windowWidth = window.innerWidth;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    // Verificar resolução inicial
    this.checkResolution();
    
    // Adicionar listener para redimensionamento da janela
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Remover listener ao desmontar o componente
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
