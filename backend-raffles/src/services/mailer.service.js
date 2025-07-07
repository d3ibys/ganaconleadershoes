// src/services/mailer.service.js

import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import logger from '../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class MailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
      }
    });

    this.defaultSender = process.env.SENDER_EMAIL || 'soporte@ganaconleadershoes.com';
    this.senderName = process.env.SENDER_NAME || 'Soporte Leader Shoes';
    this.emailTemplate = null;
  }

  async loadEmailTemplate() {
    if (!this.emailTemplate) {
      try {
        const templatePath = path.join(__dirname, '../templates/email-template.html');
        this.emailTemplate = await fs.readFile(templatePath, 'utf8');
      } catch (error) {
        logger.error('Error cargando template de email:', error);
        this.emailTemplate = this.getDefaultTemplate();
      }
    }
    return this.emailTemplate;
  }

  getDefaultTemplate() {
    return `<!DOCTYPE html><html><body><p>Plantilla no disponible.</p></body></html>`;
  }

  async generateOrderConfirmationHTML({
    recipientName,
    nationalId,
    ticketNumbers = [],
    raffle = {},
    uuid = '',
  }) {
    const template = await this.loadEmailTemplate();

    const rewardedSet = new Set((raffle.rewardedNumbers || []).map(String));
    const winningTicket = ticketNumbers.find(num => rewardedSet.has(String(num)));
    const hasWinner = !!winningTicket;

    const winningSection = hasWinner
      ? `
        <div style="background-color:#fff; color:#000; border-radius:8px; padding:10px 20px; font-size:30px; font-weight:bold;">${winningTicket}</div>
        <p style="color:#fff; font-size:20px; margin:10px 0 0;"><b>¡Felicidades!</b></p>
        <p style="color:#facc15; font-size:14px;">Te ha salido un número premiado. Ya nos pondremos en contacto contigo.</p>
      `
      : '';

    function chunkArrayWithPadding(array, size) {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        while (chunk.length < size) chunk.push(null);
        chunks.push(chunk);
      }
      return chunks;
    }

    const chunkedRows = chunkArrayWithPadding(ticketNumbers, 5);
    const numbersHTML = chunkedRows
      .map(row => `
        <tr>
          ${row.map(num => num === null
            ? `<td align="center" style="background-color:#1f2937;">&nbsp;</td>`
            : `<td align="center" style="background-color:#fff; color:#000; border-radius:4px; font-weight:bold;">${num}</td>`
          ).join('')}
        </tr>
      `).join('');
console.log('Aqui desde el servicio de envio de correo. C.I: ',nationalId)
    return template
      .replace(/{{RECIPIENT_NAME}}/g, recipientName || 'Participante')
      .replace(/{{NATIONALID}}/g, nationalId || '00000000')
      .replace(/{{RAFFLE_TITLE}}/g, raffle.title || 'Sorteo Especial')
      .replace(/{{RAFFLE_DESCRIPTION}}/g, raffle.description || '')
      .replace(/{{TICKET_NUMBERS}}/g, numbersHTML)
      .replace(/{{UUID}}/g, uuid || 'UUID-NO-DISPONIBLE')
      .replace(/{{WINNING_SECTION}}/g, winningSection);
  }

  generateOrderConfirmationText(orderNumber, recipientName, ticketNumbers, raffle = {}) {
    let text = `¡Orden Confirmada!\n\n`;
    text += `Hola ${recipientName},\n\n`;
    text += `Tus números para la rifa "${raffle.title || 'Sorteo'}" son:\n`;
    ticketNumbers.forEach(num => text += `• ${num}\n`);

    const rewardedSet = new Set((raffle.rewardedNumbers || []).map(String));
    const winningTicket = ticketNumbers.find(num => rewardedSet.has(String(num)));
    if (winningTicket) {
      text += `\n🎉 ¡Felicitaciones! El número ${winningTicket} ha sido premiado.\n`;
    }

    text += `\nUUID: ${orderNumber || 'N/A'}\n`;
    text += `\nAtención al Cliente:\nWhatsApp: +58 (412) 836-2674\nEmail: soporte@ganaconleadershoes.com\n`;
    text += `\n© 2025 Juega y Gana con Leader Shoes. Todos los derechos reservados.`;

    return text;
  }

  async sendOrderConfirmation({
    recipientEmail,
    recipientName,
    nationalId,
    orderNumber,
    ticketNumbers,
    raffle,
    uuid
  }) {
    try {
      const html = await this.generateOrderConfirmationHTML({ recipientName, nationalId, ticketNumbers, raffle, uuid });
      const text = this.generateOrderConfirmationText(orderNumber, recipientName, ticketNumbers, raffle);

      const mailOptions = {
        from: `${this.senderName} <${this.defaultSender}>`,
        to: recipientEmail,
        subject: `Confirmación de participación - ${raffle.title || 'Sorteo'}`,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Correo enviado a ${recipientEmail}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Error enviando correo:', error);
      throw error;
    }
  }
}

export default new MailerService();

