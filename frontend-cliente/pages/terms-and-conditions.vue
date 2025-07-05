<template>
  <section class="terms-container">
    <h2 class="terms-title">Términos y Condiciones</h2>
    <div class="terms-content">
      <p>
        Bienvenido a Juega y Gana con <b>Leader Shoes</b>. Al participar en cualquiera de nuestras rifas, usted acepta los siguientes términos y condiciones. Por favor, lea cuidadosamente antes de continuar.
      </p>

      <h3>1. Participación</h3>
      <p>
        La participación en nuestras rifas está abierta a todas las personas mayores de edad que completen correctamente el proceso de registro y pago.
      </p>

      <h3>2. Asignación de Números</h3>
      <p>
        Los números son asignados aleatoriamente al momento de la compra. No se permite la selección manual.
      </p>

      <h3>3. Premios</h3>
      <p>
        El premio será entregado al número que resulte ganador durante el sorteo. No se permiten cambios ni devoluciones del premio.
      </p>

      <h3>4. Fecha del Sorteo</h3>
      <div class="contenedor-premios">

      <p>
        El sorteo se realizará únicamente cuando se haya vendido el 100% de los números disponibles, siguiendo como referencia la lotería Super Gana, de la familia del tachira en sus tres (3) sorteos. 
		<ul class="lista-premios">
		   <li>1:00pm - 3er premio una moto BRF 0KM</li>
		   <li>4:00pm - 2do premio una moto BRF 0KM</li>
		   <li>10:00pm - 1er premio nuestro gran combo <b>Leader Shoes</b></li>
		</ul>
      </p>
      </div>
      <h3>5. Notificación al Ganador</h3>
      <p>
        El ganador será anunciado públicamente en nuestra plataforma y será contactado vía correo electrónico.
      </p>

      <h3>6. Modificaciones</h3>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento, con o sin previo aviso.
      </p>

      <p class="terms-final">
        Al usar esta plataforma, usted confirma que ha leído y aceptado estos términos.
      </p>
    </div>
  </section>
</template>

<style scoped>
.terms-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px 25px;
  background: #111;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(211, 196, 35, 0.3);
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.7;
}

.terms-title {
  text-align: center;
  font-size: 2rem;
  color: #d3c423;
  margin-bottom: 30px;
}

.terms-content h3 {
  font-size: 1.2rem;
  color: #d3c423;
  margin-top: 25px;
}

.terms-content p {
  font-size: 1rem;
  color: #eee;
  margin-top: 10px;
}

.terms-final {
  margin-top: 40px;
  font-weight: bold;
  text-align: center;
  color: #d3c423;
}
.lista-premios {
    width: fit-content; /* El ancho se ajusta al contenido */
    /* O puedes dar un ancho fijo, por ejemplo: width: 400px; */
    margin: 0 auto; /* Esto lo centra horizontalmente */
    list-style-position: inside; /* Opcional: para que las viñetas se centren con el texto si el ul es estrecho */
}

</style>

