<template>
  <plataform-layout>
    <div style="display: flex; height: 100%;">
      <!-- Coluna da esquerda -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 32px; background: #fff; border-right: 1px solid #ddd; border-radius: 10px 0px 0px 10px;">
        <div style="padding: 16px 0px;">
          <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 24px; text-align: center;">
            Mirella A. Quintino
          </div>
          <div>
            <span style="font-size: 1rem; font-weight: bold; color: #888; border-bottom: 1px solid black">Detalhes</span>
            <ul style="list-style: none; padding: 0; margin-top: 16px;">
              <li style="margin-bottom: 8px;">
                Nome: <span style="font-weight: bold;">Mirella Alves Quintino</span>
              </li>
              <li style="margin-bottom: 8px;">
                Cod. Usuário: <span style="font-weight: bold;">19385-192</span>
              </li>
              <li style="margin-bottom: 8px;">
                Email: <span style="font-weight: bold;">mirella.quintino@gmail.com</span>
              </li>
              <li style="margin-bottom: 8px;">
                Telefone: <span style="font-weight: bold;">+55 47 99394-9481</span>
              </li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 32px; display: flex; gap: 16px; justify-content: center;">
          <v-btn color="primary">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn>
          <v-btn color="error">
            <v-icon left>mdi-delete</v-icon>
            Deletar
          </v-btn>
        </div>
      </div>

      <!-- Coluna da direita -->
      <div style="flex: 2; padding: 32px; background: #fff; border-radius: 00px 10px 10px 0px;">
        <div style="font-size: 1rem; font-weight: bold; color: #888; margin-bottom: 24px;">
          Últimas Locações
        </div>
        <v-table>
          <thead>
            <tr>
              <th style="color: #b0b0b0; font-weight: 600;">Data</th>
              <th style="color: #b0b0b0; font-weight: 600;">Nota</th>
              <th style="color: #b0b0b0; font-weight: 600;">Alugou</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 80px;">
              <td>11/08/2025</td>
              <td>
                <v-chip size="small" color="#eee" style="color: #444;">7.8</v-chip>
              </td>
              <td>
                <v-chip size="small" color="#eee" style="color: #444;">Decoração</v-chip>
              </td>
              <td>
                <v-btn icon variant="text" color="primary">
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr style="height: 80px;">
              <td>23/07/2025</td>
              <td>
                <v-chip size="small" color="#eee" style="color: #444;">8.1</v-chip>
              </td>
              <td>
                <v-chip size="small" color="#eee" style="color: #444;">Decoração</v-chip>
              </td>
              <td>
                <v-btn icon variant="text" color="primary">
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </plataform-layout>
</template>

<script setup>
import { ref } from "vue";
</script>