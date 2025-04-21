import { EmailClient } from "@azure/communication-email";
import 'dotenv/config';

const client = new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);

const defaultHtmlTemplate = `
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f7f9fc;
        padding: 20px;
        color: #333;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        padding: 30px;
      }

      .header {
        text-align: center;
        color: #2e7d32;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
      }

      .highlight {
        color: #388e3c;
        font-weight: bold;
      }

      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #2e7d32;
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
      }

      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>¡Bienvenido a <span class="highlight">Colab</span>!</h1>
      </div>
      <p>Hola <strong>{NOMBRE_USUARIO}</strong>,</p>
      <p>
        Nos alegra tenerte con nosotros. Colab es más que una plataforma de compra y venta — es una comunidad donde clientes, vendedores y proveedores colaboran para crecer juntos.
      </p>
      <p>
        Desde hoy, tenés acceso a una experiencia pensada para conectar, compartir y crear valor real.
      </p>
      <a href="https://colab.com/inicio" class="btn">Ir a la plataforma</a>
      <div class="footer">
        © 2025 Colab. Todos los derechos reservados.
      </div>
    </div>
  </body>
</html>
`;

export async function sendEmail(to, subject, plainText, nombreUsuario = "usuario", htmlContent = null) {
  const finalHtml = (htmlContent || defaultHtmlTemplate).replace("{NOMBRE_USUARIO}", nombreUsuario);

  const emailMessage = {
    senderAddress: process.env.AZURE_SENDER_ADDRESS,
    content: {
      subject: subject,
      plainText: plainText,
      html: finalHtml,
    },
    recipients: {
      to: [{ address: to }],
    },
  };

  const poller = await client.beginSend(emailMessage);
  const result = await poller.pollUntilDone();

  return result;
}
