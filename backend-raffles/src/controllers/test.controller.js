//import mailerService from '../services/mailersend.service.js';
import mailerService from '../services/mailer.service.js';


/**
 * Enviar correo de prueba para confirmar comportamiento del sistema de notificación
 */
export async function sendTestEmail(req, reply) {
  try {
    const { email, name } = req.body;

    // Datos de prueba
    const ticketNumbers = ["5323","5678","8473","7472","5323","8473","7472","1234","1253","5323","8473","7472"];
    const raffle = {
      title: "Gran Combo Leader Shoes",
      description: "Participa por un Yarsi 2008 + una moto BRF 150 0KM + $5,000 en efectivo",
      rewardedNumbers: ["5678", "2753", "3643"]
    };
    const uuid = "UUID-PRUEBA-1234567890";

    //const result = await mailerService.sendOrderConfirmation(email, name, {
     // ticketNumbers,
     // raffle,
     // uuid,
    //});
const result = await mailerService.sendOrderConfirmation({
  recipientEmail: 'aquilitoo12@gmail.com',
  recipientName: 'Aquiles Rodriguex',
  nationalId: '12345678',
  orderNumber: 'UUID1234',
  ticketNumbers: ['1234', '2678'],
  raffle: {
    title: 'Combo Leader Shoes',
    description: '',
    rewardedNumbers: ['5678', '9999']
  },
  uuid: 'UUID1234'
});


    reply.send({ success: true, result });
  } catch (err) {
    req.log.error(err);
    reply.status(500).send({ success: false, message: "Error enviando correo de prueba" });
  }
}

