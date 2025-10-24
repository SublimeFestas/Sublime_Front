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
  <main
    style="padding: 0px, 60px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <div style="position: relative;">
      <img src="@/assets/banner.png" alt="">
      <img style="position: absolute; bottom: -30px; left: calc(50% - 90px);" src="@/assets/logoCompleta.png" alt="">
    </div>
    <div style="display: flex; gap: 300px; width: 100%; margin-top: 100px; justify-content: center;">
      <div style="display: flex; flex-direction: column; justify-content: space-around;">
        <h2 style="font-size: 24px; font-weight: 400; width: 600px;">A <span style="color: #847339;">Sublime Festas &
            Eventos</span> tem o que você precisa!</h2>
        <ul style="list-style: none; display: flex; gap: 35px;">
          <li
            style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;">
            <img src="@/assets/icons/Who.svg" alt=""></li>
          <li
            style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;">
            <img src="@/assets/icons/Destination.svg" alt=""></li>
          <li
            style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;">
            <img src="@/assets/icons/Clock.svg" alt=""></li>
          <li
            style="display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; box-shadow: 0px 2px 5px 2px rgba(172, 172, 172, 0.50); border-radius: 8px;">
            <img src="@/assets/icons/Party.svg" alt=""></li>
        </ul>
        <v-btn width="200px" rounded="md" style="background-color: #A5B293; color: white; font-weight: 700;"
          size="large">Locar</v-btn>
      </div>
      <div>
        <img src="@/assets/cardBolinhas.png" alt="">
      </div>
    </div>
    <div>
      <div style="display: flex; border: 5px solid #A5B293; border-radius: 20px; margin-top: 150px;">
        <div
          style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
          <img src="@/assets/icons/arCondicionado.svg" alt="">
          <p>Ambiente <br>climatizado</p>
        </div>
        <div
          style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
          <img src="@/assets/icons/escorrega.svg" alt="">
          <p>Area infantil com <br> brinquedos</p>
        </div>
        <div
          style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px; background-color: #A5B293; transform: scale(1.2); border-radius: 15px; color: white;">
          <img src="@/assets/icons/geladeira.svg" alt="">
          <p>Cozinha <br> equipada</p>
        </div>
        <div
          style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 10px; padding: 50px 60px;">
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
          <div
            style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">
            Somos uma empresa focada em festas infantis com o objetivo de agregar no seu evento, tornando-o mais
            agadável.</div>
        </div>
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/ballons.svg" alt=""></div>
          <div
            style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">
            Nós fornecemos cozinha equipada, banheiros acessíveis para deficientes, espaço kids e ambiente climatizado
            com capacidade de 60 pessoas.</div>
        </div>
        <div style="display: flex; align-items: center; gap: 30px;">
          <div><img src="@/assets/icons/eat.svg" alt=""></div>
          <div
            style="width: 600px; height: 200px; box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.25); border-radius: 15px; display: flex; align-items: center; padding: 0px 40px;">
            Temos serviços adicionais como louças de luxo, copeira, monitor, arcos de balões e decorações</div>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 150px; margin-top: 150px;">
      <div style="display: flex; flex-direction: column; justify-content: space-around;">
        <h2 style="font-size: 40px; font-weight: 400;">Onde estamos localizados?</h2>
        <div
          style="display: flex; align-items: center; gap: 30px; width: 550px; height: 150px; border: 5px solid #A5B293; padding: 0px 40px; border-radius: 15px;">
          <div><img src="@/assets/icons/googleMaps.svg" alt=""></div>
          <div>O nosso salão de festas fica localizado no bairro Ulysses Guimarâes em Joinville, na rua Antenor Douat
            Baptista.</div>
        </div>
        <div
          style="display: flex; align-items: center; gap: 30px; width: 550px; height: 150px; border: 5px solid #A5B293; padding: 0px 40px; border-radius: 15px;">
          <div><img src="@/assets/icons/parking.svg" alt=""></div>
          <div>Fornecemos estacionamento com capacidade para 5 carros.</div>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1788.038195182706!2d-48.79903296265829!3d-26.32402579340067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb34a17e8eed7%3A0x4dd6d74a2c751523!2sSublime%20Festas%20%26%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1760112777894!5m2!1spt-BR!2sbr"
          width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <div style="margin-top: 150px;">
      <div style="text-align: center;"><h2 style="font-weight: 400; font-size: 40px;">Horário de Funcionamento</h2></div>
      <div style="display: flex; gap: 30px; justify-content: center; font-size: 20px;">
        <div style="width: 300px; display: flex; flex-direction: column; align-items: end; justify-content: center;">
          <h3 style="font-weight: 400;">Todos os dias</h3>
          <h3>Segunda - Domingo</h3>
        </div>
        <img src="@/assets/icons/clockBig.svg" alt="" style="width: 250px;">
        <div style="width: 300px; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="font-weight: 400;">Horario dás</h3>
          <h3>8h - 20h</h3>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; gap: 50px; margin-top: 150px; margin-bottom: 200px;">
      <div><img src="@/assets/salaoInterior.jpg" alt="" style="height: 350px;"></div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 550px;">
        <h2 style="font-size: 40px; font-weight: 400;">Tempo de festa</h2>
        <p>São 4 horas de festa, as horas adicionais custam uma taxa. O valor da locação do lugar não inclui serviços adicionais.</p>
        <p>O valor da locação varia nos valores de acordo com o dia da semana escolhido, sendo nos finais de semana um valor mais alto.</p>
        <v-btn width="200px" rounded="md" style="background-color: #A5B293; color: white; font-weight: 700;" size="large">Locar</v-btn>
      </div>
    </div>
  </main>
  <footer>
    <div style="border-top: 1px solid #444711; padding: 50px 50px; display: flex; justify-content: space-between; margin: 0px 50px;">
      <div>
        <img src="@/assets/logoCompleta.png" style="height:105px;">
        <div style="display: flex; align-items: center; gap: 5px; padding-top: 20px;">
          <img src="@/assets/icons/location.svg">
          <p style="">Rua Antenor Douat Baptista, Ulysses Guimarâes, Joinville, Santa Catarina, Brasil.</p>
        </div>
      </div>
      <div style="display: flex; gap: 75px;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <p style="font-weight: 600;">Navegação</p>
          <p>Minha conta</p>
          <p>Minhas locações</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <p style="font-weight: 600;">Precisa de ajuda?</p>
          <p>Entre em contato.</p>
          <p>55 47 98765-6789</p>
          <div style="display: flex; justify-content: space-between;">
            <img src="@/assets/icons/ic_baseline-whatsapp.svg">
            <img src="@/assets/icons/mdi_instagram.svg">
            <img src="@/assets/icons/ic_baseline-facebook.svg">
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 30px; margin: 30px 290px 60px; border-top: 1px solid #444711">
      <p style="padding-top: 50px;">&copy; 2025 Sublime Festas & Eventos.  Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
</script>
