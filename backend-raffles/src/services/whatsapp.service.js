import axios from 'axios';

/**
 * Función para enviar mensajes de WhatsApp usando la API externa de Consoltics
 * @param {string} phone - Número de teléfono del destinatario
 * @param {string} message - Mensaje a enviar
 * @returns {Object} - Resultado de la operación
 */
const sendWhatsappMessage = async (phone, message) => {
  try {
    // Validar parámetros requeridos
    if (!phone || !message) {
      throw new Error('Los parámetros phone y message son requeridos');
    }

    // Configurar la petición a la API externa
    const apiUrl = 'https://bot.consoltics.com/api/send-message';
    const payload = {
      phone: phone,
      message: message
    };

    const config = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload,
      timeout: 15000 // 15 segundos de timeout
    };

    // Realizar la petición a la API externa
    const response = await axios(config);

    // Retornar resultado exitoso
    return {
      success: true,
      data: response.data,
      status: response.status,
      message: 'Mensaje de WhatsApp enviado exitosamente'
    };

  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error.response) {
      // La API respondió con un código de error
      return {
        success: false,
        error: 'Error en la API de WhatsApp',
        status: error.response.status,
        details: error.response.data || error.message
      };
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      return {
        success: false,
        error: 'No se pudo conectar con la API de WhatsApp',
        details: 'Servicio no disponible o timeout'
      };
    } else {
      // Error en la configuración de la petición o validación
      return {
        success: false,
        error: 'Error al procesar la petición',
        details: error.message
      };
    }
  }
};
export { sendWhatsappMessage };
