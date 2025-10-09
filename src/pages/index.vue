<template>
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 35px 60px;">
    <div><img src="@/assets/logo.png" style="height: 60px;" alt="Logo"></div>
    <div>
      <nav>
        <ul style="display: flex; gap: 100px; list-style: none;">
          <li>Estrutura</li>
          <li>Quem somos?</li>
          <li>Localização</li>
          <li>Horários</li>
          <li>Informações adicionais</li>
        </ul>
      </nav>
    </div>
    <div></div>
  </header>
  <main style="padding: 0px, 60px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <div style="position: relative;"> 
      <img src="@/assets/banner.png" alt="">
      <img style="position: absolute; bottom: -30px; left: calc(50% - 90px);" src="@/assets/logoCompleta.png" alt="">
    </div>
    <div style="display: flex; gap: 300px; width: 100%; margin-top: 100px; justify-content: center;">
      <div style="display: flex; flex-direction: column; justify-content: space-around;">
        <h2 style="font-size: 24px; font-weight: 400; width: 600px;">A <span style="color: #847339;">Sublime Festas & Eventos</span> tem o que você precisa!</h2>
        <ul style="list-style: none; display: flex; gap: 35px;">
          <li style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;"><img src="@/assets/icons/Who.svg" alt=""></li>
          <li style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;"><img src="@/assets/icons/Destination.svg" alt=""></li>
          <li style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;"><img src="@/assets/icons/Clock.svg" alt=""></li>
          <li style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;"><img src="@/assets/icons/Party.svg" alt=""></li>
        </ul>
        <v-btn width="200px" rounded="md" style="background-color: #A5B293; color: white; font-weight: 700;" size="large" >Locar</v-btn>
      </div>
      <div>
        <img src="@/assets/cardBolinhas.png" alt="">
      </div>
    </div>
    <div>
      <div style="display: flex; border: 5px solid #A5B293; border-radius: 20px; margin-top: 150px;">
        <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
          <img src="@/assets/icons/arCondicionado.svg" alt="">
          <p>Ambiente <br>climatizado</p>
        </div>
        <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
          <img src="@/assets/icons/escorrega.svg" alt="">
          <p>Area infantil com <br> brinquedos</p>         
        </div>
        <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px; background-color: #A5B293; transform: scale(1.2); border-radius: 15px; color: white;">
          <img src="@/assets/icons/geladeira.svg" alt="">
          <p>Cozinha <br> equipada</p>
        </div>
        <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
          <img src="@/assets/icons/cadeiraRodas.svg" alt="">
          <p>Banheiros <br> acessíveis</p>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 150px; margin-top: 150px;">
      <div>
        <h2 style="font-size: 40px; font-weight: 400;">Quem somos?</h2>
        <img src="@/assets/quemSomos.jpg" alt="" style="width: 500px; margin-top: 40px;">
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/hands.svg" alt=""></div>
          <div style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">Somos uma empresa focada em festas infantis com o objetivo de agregar no seu evento, tornando-o mais agadável.</div>
        </div>
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/ballons.svg" alt=""></div>
          <div style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">Nós fornecemos cozinha equipada, banheiros acessíveis para deficientes, espaço kids e ambiente climatizado com capacidade de 60 pessoas.</div>
        </div>
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/eat.svg" alt=""></div>
          <div style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">Temos serviços adicionais como louças de luxo, copeira, monitor, arcos de balões e decorações</div>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 150px; margin-top: 150px;">
      
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <h2 style="font-size: 40px; font-weight: 400;">Onde estamos localizados?</h2>
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/hands.svg" alt=""></div>
          <div>O nosso salão de festas fica localizado no bairro Ulysses Guimarâes em Joinville, na rua Antenor Douat Baptista.</div>
        </div>
        <div style="display: flex; align-items: center; gap: 30px; width: 550px; height: 150px; border: ;">
          <div><img src="@/assets/icons/ballons.svg" alt=""></div>
          <div>Fornecemos estacionamento com capacidade para 5 carros.</div>
        </div>
      </div>
      <div>
        <img src="@/assets/quemSomos.jpg" alt="" style="width: 500px; margin-top: 40px;">
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
  //
</script>
