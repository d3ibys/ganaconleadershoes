import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import logger from "../utils/logger.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Utilidades para obtener __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MailerSendService {
  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: 'mlsn.19068c9c4d71351b7c443764acfcef2bd9fcc976f986b0a845ed34bc14161c06', //process.env.MAILERSEND_API_KEY,
    });
    this.defaultSender = new Sender(
      process.env.SENDER_EMAIL || "noreply@test-pzkmgq7zd51l059v.mlsender.net", //"noreply@ganaconleadershoes.com",
      process.env.SENDER_NAME || "Sistema de Órdenes"
    );
    this.emailTemplate = null;
  }

  async loadEmailTemplate() {
    if (!this.emailTemplate) {
      try {
        const templatePath = path.join(__dirname, "../templates/email-template.html");
        this.emailTemplate = await fs.readFile(templatePath, "utf8");
      } catch (error) {
        logger.error("Error cargando template de email:", error);
        this.emailTemplate = this.getFallbackTemplate();
      }
    }
    return this.emailTemplate;
  }

  getFallbackTemplate() {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <body>
        <h1>Hola {{RECIPIENT_NAME}}</h1>
        <p>UUID: {{UUID}}</p>
      </body>
      </html>
    `;
  }






async generateOrderConfirmationHTML({
  recipientName,
  ticketNumbers = [],
  raffle = {},
  uuid = '',
}) {
  const template = await this.loadEmailTemplate();

  // Buscar si hay un número premiado
  const rewardedSet = new Set((raffle.rewardedNumbers || []).map(String));
  const winningTicket = ticketNumbers.find(num => rewardedSet.has(String(num)));
  const hasWinner = !!winningTicket;

  // Generar sección superior con el número premiado (si aplica)
  const winningSection = hasWinner
    ? `
      <div style="background-color:#fff; color:#000; border-radius:8px; padding:10px 20px; font-size:30px; font-weight:bold;">${winningTicket}</div>
      <p style="color:#fff; font-size:20px; margin:10px 0 0;"><b>¡Felicidades!</b></p>
      <p style="color:#facc15; font-size:14px;">Te ha salido un número premiado. Ya nos pondremos en contacto contigo.</p>
    `
    : '';

  // Agrupar los tickets en bloques de 5 y completar con espacios vacíos si falta
  function chunkArrayWithPadding(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      while (chunk.length < size) {
        chunk.push(null); // rellenar con espacios vacíos
      }
      chunks.push(chunk);
    }
    return chunks;
  }

  const chunkedRows = chunkArrayWithPadding(ticketNumbers, 5);
  const numbersHTML = chunkedRows
    .map(row => `
      <tr>
        ${row.map(num => {
          if (num === null) {
            return `<td align="center" style="background-color:#1f2937;">&nbsp;</td>`;
          }
          return `<td align="center" style="background-color:#fff; color:#000; border-radius:4px; font-weight:bold;">${num}</td>`;
        }).join('')}
      </tr>
    `).join('');

  // Reemplazar en plantilla
  return template
    .replace(/{{RECIPIENT_NAME}}/g, recipientName || "Participante")
    .replace(/{{RAFFLE_TITLE}}/g, raffle.title || "Sorteo Especial")
    .replace(/{{RAFFLE_DESCRIPTION}}/g, raffle.description || "")
    .replace(/{{TICKET_NUMBERS}}/g, numbersHTML)
    .replace(/{{UUID}}/g, uuid || "UUID-NO-DISPONIBLE")
    .replace(/{{WINNING_SECTION}}/g, winningSection);
}



  generateOrderConfirmationText({
    recipientName,
    ticketNumbers = [],
    raffle = {},
    uuid = '',
  }) {
    const rewardedSet = new Set((raffle.rewardedNumbers || []).map(String));
    const matched = ticketNumbers.find(num => rewardedSet.has(String(num)));
    let text = `Hola ${recipientName},\n\n`;

    if (matched) {
      text += `🎉 ¡Felicidades! Uno de tus números está premiado: ${matched}\n\n`;
    }

    text += `Tus números: ${ticketNumbers.join(", ")}\n`;
    text += `Sorteo: ${raffle.title || "Sorteo Especial"}\n`;
    text += `UUID: ${uuid}\n\n`;
    text += `Gracias por participar.`;
    return text;
  }

  async sendOrderConfirmation(recipientEmail, recipientName, { ticketNumbers, raffle, uuid }) {
    try {
      const recipients = [new Recipient(recipientEmail, recipientName)];

      const htmlContent = await this.generateOrderConfirmationHTML({
        recipientName,
        ticketNumbers,
        raffle,
        uuid,
      });

      const textContent = this.generateOrderConfirmationText({
        recipientName,
        ticketNumbers,
        raffle,
        uuid,
      });

      const emailParams = new EmailParams()
        .setFrom(this.defaultSender)
        .setTo(recipients)
        .setReplyTo(this.defaultSender)
        .setSubject(`🎟️ Confirmación de participación: ${raffle.title || 'Sorteo'}`)
        .setHtml(htmlContent)
        .setText(textContent);

      const response = await this.mailerSend.email.send(emailParams);
      logger.info(`Email enviado a ${recipientEmail} con UUID ${uuid}`);
      return response;
    } catch (error) {
      logger.error("Error enviando correo:", error);
      throw error;
    }
  }
}

// Export como instancia en ESModules
const mailerSendService = new MailerSendService();
export default mailerSendService;

