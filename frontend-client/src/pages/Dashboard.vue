<template>
  <div class="dashboard">
    <div class="user-greeting">
      <div class="avatar">LS</div>
      <div>
        <div class="username">Hola, Deibys</div>
        <div class="subtitle">Panel de cliente</div>
      </div>
    </div>
    <div class="dashboard-content">
      <div class="dash-card">
        <i class="fas fa-ticket-alt"></i>
        <div>
          <div class="dash-card-title">Total de Tickets</div>
          <div class="dash-card-value">15</div>
        </div>
      </div>
      <div class="dash-card">
        <i class="fas fa-star"></i>
        <div>
          <div class="dash-card-title">Rifas ganadas</div>
          <div class="dash-card-value">2</div>
        </div>
      </div>
      <div class="dash-card">
        <i class="fas fa-wallet"></i>
        <div>
          <div class="dash-card-title">Premios</div>
          <div class="dash-card-value">$1,250</div>
        </div>
      </div>
      <div class="dash-card">
        <i class="fas fa-user"></i>
        <div>
          <div class="dash-card-title">Mi perfil</div>
          <div class="dash-card-value">Editar</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}
.user-greeting {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1.3rem;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #d3c423;
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.7rem;
  font-size: 1.3rem;
}
.username {
  font-weight: bold;
  font-size: 1.07rem;
}
.subtitle {
  font-size: 0.92rem;
  color: #ccc;
}
.dashboard-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.dash-card {
  background: #111;
  border: 2px solid #d3c423;
  border-radius: 16px;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 180px;
  box-shadow: 0 4px 10px rgba(212, 255, 0, 0.07);
  margin-bottom: 0.7rem;
}
.dash-card i {
  font-size: 2rem;
  color: #d3c423;
}
.dash-card-title {
  font-size: 1rem;
  color: #ccc;
}
.dash-card-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}
</style>
