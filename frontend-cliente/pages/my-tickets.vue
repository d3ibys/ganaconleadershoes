<template>
  <div>
    <div>
      <TicketCard
        :nombre="user.fullName"
        :cedula="user.nationalId"
        titulo="Ya estás participando en nuestro gran sorteo."
        tituloResaltado="4RUNNER 2022"
        detalle="Participa para ganar una 4Runner 2022 + una moto EK 150 0KM + $1,000 en efectivo"
        uuid="FTR567H76Y-KIJU789-0OLKJUII"
        numero="2345"
      />
    </div>
    <NavbarBottom />
  </div>
</template>

<script setup>
import HeaderTop from '~/components/HeaderTop.vue'
import MenuDrawer from '~/components/MenuDrawer.vue'
import NavbarBottom from '~/components/NavbarBottom.vue'
import { useAuth } from '~/composables/useAuth'

const drawer = ref(false)
const { isLoggedIn, user } = useAuth()

</script>

<style scoped>
.user-greeting {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 15px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary, #f3cc23);
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 8px #0001;
}
.section-title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.saludo-link {
  color: var(--color-primary, #f3cc23);
  font-weight: 600;
  margin: 0 0.1em;
  text-decoration: underline;
  transition: color 0.18s;
}
.saludo-link:hover {
  color: #ceb800;
}
</style>
