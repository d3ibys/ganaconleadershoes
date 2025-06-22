// src/services/mailersend.service.js
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const logger = require('../utils/logger');
const fs = require('fs').promises;
const path = require('path');

class MailerSendService {
    constructor() {
        this.mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });
        this.defaultSender = new Sender(
            process.env.SENDER_EMAIL || "noreply@yourdomain.com", 
            process.env.SENDER_NAME || "Sistema de Órdenes"
        );
        this.emailTemplate = null;
    }

    /**
     * Carga el template HTML desde archivo
     */
    async loadEmailTemplate() {
        if (!this.emailTemplate) {
            try {
                const templatePath = path.join(__dirname, '../templates/email-template.html');
                this.emailTemplate = await fs.readFile(templatePath, 'utf8');
            } catch (error) {
                logger.error('Error cargando template de email:', error);
                // Usar template por defecto si no se puede cargar el archivo
                this.emailTemplate = this.getDefaultTemplate();
            }
        }
        return this.emailTemplate;
    }

    /**
     * Template por defecto (fallback)
     */
    getDefaultTemplate() {
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Orden</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
                .email-container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
                .content { padding: 30px; }
                .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>¡Orden Confirmada!</h1>
                </div>
                <div class="content">
                    <p>Hola <strong>{{RECIPIENT_NAME}}</strong>,</p>
                    <div class="order-info">
                        <h3>Orden: {{ORDER_NUMBER}}</h3>
                        <p>✅ Confirmada y en Proceso</p>
                        {{ORDER_DETAILS}}
                    </div>
                    <p>Tu orden ha sido confirmada exitosamente.</p>
                </div>
                <div class="footer">
                    <p>© 2025 Tu Empresa</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    /**
     * Reemplaza placeholders en el template
     */
    async generateOrderConfirmationHTML(orderNumber, recipientName, orderDetails = {}) {
        const template = await this.loadEmailTemplate();
        
        // Generar HTML para los detalles de la orden
        let orderDetailsHTML = '';
        if (orderDetails && Object.keys(orderDetails).length > 0) {
            orderDetailsHTML = Object.entries(orderDetails).map(([key, value]) => `
                <div class="detail-item">
                    <span class="detail-label">${key}:</span>
                    <span class="detail-value">${value}</span>
                </div>
            `).join('');
        } else {
            orderDetailsHTML = '<div class="detail-item"><span class="detail-label">Sin detalles adicionales</span></div>';
        }

        // Reemplazar placeholders
        return template
            .replace(/{{RECIPIENT_NAME}}/g, recipientName)
            .replace(/{{ORDER_NUMBER}}/g, orderNumber)
            .replace(/{{ORDER_DETAILS}}/g, orderDetailsHTML);
    }

    /**
     * Envía un email de confirmación de orden
     */
    async sendOrderConfirmation(recipientEmail, recipientName, orderNumber, orderDetails = {}) {
        try {
            const recipients = [new Recipient(recipientEmail, recipientName)];
            
            const htmlContent = await this.generateOrderConfirmationHTML(orderNumber, recipientName, orderDetails);
            const textContent = this.generateOrderConfirmationText(orderNumber, recipientName, orderDetails);

            const emailParams = new EmailParams()
                .setFrom(this.defaultSender)
                .setTo(recipients)
                .setReplyTo(this.defaultSender)
                .setSubject(`Confirmación de Orden - ${orderNumber}`)
                .setHtml(htmlContent)
                .setText(textContent);

            const response = await this.mailerSend.email.send(emailParams);
            logger.info(`Email de confirmación enviado exitosamente para orden ${orderNumber} a ${recipientEmail}`);
            return response;

        } catch (error) {
            logger.error(`Error enviando email de confirmación para orden ${orderNumber}:`, error);
            throw error;
        }
    }

    /**
     * Envía un email personalizado usando el template
     */
    async sendCustomEmail(recipientEmail, recipientName, subject, customData = {}) {
        try {
            const recipients = [new Recipient(recipientEmail, recipientName)];
            
            const htmlContent = await this.generateCustomHTML(recipientName, customData);
            const textContent = this.generateCustomText(recipientName, customData);

            const emailParams = new EmailParams()
                .setFrom(this.defaultSender)
                .setTo(recipients)
                .setReplyTo(this.defaultSender)
                .setSubject(subject)
                .setHtml(htmlContent)
                .setText(textContent);

            const response = await this.mailerSend.email.send(emailParams);
            logger.info(`Email personalizado enviado exitosamente a ${recipientEmail}`);
            return response;

        } catch (error) {
            logger.error(`Error enviando email personalizado a ${recipientEmail}:`, error);
            throw error;
        }
    }

    /**
     * Genera HTML personalizado
     */
    async generateCustomHTML(recipientName, customData) {
        const template = await this.loadEmailTemplate();
        
        // Reemplazar con datos personalizados
        return template
            .replace(/{{RECIPIENT_NAME}}/g, recipientName)
            .replace(/{{ORDER_NUMBER}}/g, customData.orderNumber || 'N/A')
            .replace(/{{ORDER_DETAILS}}/g, customData.details || '<div class="detail-item"><span class="detail-label">Sin detalles</span></div>');
    }

    /**
     * Genera el contenido en texto plano
     */
    generateOrderConfirmationText(orderNumber, recipientName, orderDetails) {
        let text = `¡Orden Confirmada!\n\n`;
        text += `Hola ${recipientName},\n\n`;
        text += `Tu orden ${orderNumber} ha sido confirmada exitosamente y ya está siendo procesada.\n\n`;
        
        if (orderDetails && Object.keys(orderDetails).length > 0) {
            text += `Detalles de la Orden:\n`;
            Object.entries(orderDetails).forEach(([key, value]) => {
                text += `${key}: ${value}\n`;
            });
            text += `\n`;
        }
        
        text += `Te mantendremos informado sobre el progreso de tu pedido.\n\n`;
        text += `Atención al Cliente:\n`;
        text += `WhatsApp: +1 (555) 123-4567\n`;
        text += `Email: soporte@tuempresa.com\n\n`;
        text += `© 2025 Tu Empresa. Todos los derechos reservados.`;
        
        return text;
    }

    /**
     * Genera texto personalizado
     */
    generateCustomText(recipientName, customData) {
        let text = `Hola ${recipientName},\n\n`;
        text += `${customData.message || 'Mensaje personalizado'}\n\n`;
        text += `© 2025 Tu Empresa. Todos los derechos reservados.`;
        return text;
    }

    /**
     * Elimina etiquetas HTML de un texto
     */
    stripHtml(html) {
        return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }
}

module.exports = new MailerSendService();
