import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, phone, service, comment } = body as {
    name: string
    phone: string
    service: string
    comment: string
  }

  if (!name?.trim() || !phone?.trim()) {
    throw createError({ statusCode: 400, message: 'Имя и телефон обязательны' })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  const date = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

  await transporter.sendMail({
    from: `"Чистый Дом" <${config.smtpUser}>`,
    to: config.mailTo,
    subject: `Новая заявка от ${name}`,
    html: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8f4fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8f4fd;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Логотип -->
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0D2167;border-radius:12px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                  <span style="color:white;font-size:20px;line-height:40px;">🧹</span>
                </td>
                <td style="padding-left:10px;font-size:20px;font-weight:700;color:#0f172a;">
                  Чистый <span style="color:#0D2167;">Дом</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Карточка -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">

            <!-- Шапка карточки -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:linear-gradient(135deg,#0D2167 0%,#0284c7 100%);padding:24px 32px;">
                  <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;margin-bottom:4px;">Новая заявка</p>
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">${name}</h1>
                </td>
              </tr>
            </table>

            <!-- Поля заявки -->
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:8px 0;">

              <tr>
                <td style="padding:16px 32px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 3px;color:#94a3b8;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Телефон</p>
                  <a href="tel:${phone}" style="color:#0D2167;font-size:18px;font-weight:700;text-decoration:none;">${phone}</a>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 32px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 3px;color:#94a3b8;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Услуга</p>
                  <p style="margin:0;color:#0f172a;font-size:15px;font-weight:500;">${service
                    ? `<span style="display:inline-block;background:#e0f2fe;color:#0284c7;font-size:13px;font-weight:600;padding:4px 12px;border-radius:20px;">${service}</span>`
                    : '<span style="color:#94a3b8;">Не указана</span>'
                  }</p>
                </td>
              </tr>

              ${comment ? `
              <tr>
                <td style="padding:16px 32px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 3px;color:#94a3b8;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Комментарий</p>
                  <p style="margin:0;color:#0f172a;font-size:15px;line-height:1.6;">${comment}</p>
                </td>
              </tr>` : ''}

              <tr>
                <td style="padding:16px 32px;">
                  <p style="margin:0 0 3px;color:#94a3b8;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Дата и время</p>
                  <p style="margin:0;color:#64748b;font-size:14px;">${date} МСК</p>
                </td>
              </tr>

            </table>

            <!-- Кнопка позвонить -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:20px 32px 28px;">
                  <a href="tel:${phone}"
                     style="display:block;background:#0D2167;color:#ffffff;text-align:center;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">
                    Позвонить клиенту
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Футер -->
        <tr>
          <td align="center" style="padding-top:20px;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">Чистый Дом · Ростов-на-Дону · +7 928 196-45-95</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
  })

  return { ok: true }
})
