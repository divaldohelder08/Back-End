const crypto = require('crypto');

// Informações do usuário (por exemplo, ID do usuário)
const userId = '12345';

// Chave secreta para hash (mantenha isso em segredo)
const secretKey = 'sua_chave_secreta';

// Crie um token exclusivo (incluindo o ID do usuário e um timestamp)
const timestamp = Date.now();
const tokenData = `${userId}:${timestamp}`;
const token = crypto.createHmac('sha256', secretKey).update(tokenData).digest('hex');

// Codifique o token para torná-lo seguro para URLs
const encodedToken = encodeURIComponent(token);

// URL da página de confirmação de email
const confirmationUrl = `https://seusite.com/confirmar-email?token=${encodedToken}`;

// Agora, `confirmationUrl` contém o link de confirmação que você pode enviar por email
console.log(confirmationUrl);
