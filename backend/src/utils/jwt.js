import jwt from 'jsonwebtoken';

// Usar variáveis de ambiente para a chave secreta
const KEY = process.env.JWT_SECRET || '===!AutonomoAPI!==';

export function gerarToken(userInfo) {
    return jwt.sign(userInfo, KEY, { expiresIn: '1h' });  // Adicionar expiração do token
}

export function autenticar(req, resp, next) {
    return autenticacao(req, resp, next);
}

export function autenticacao(req, resp, next) {
    try {
        // Recupera o token do cabeçalho Authorization, no formato "Bearer <token>"
        let chaveToken = req.headers['authorization'];
        if (chaveToken) {
            chaveToken = chaveToken.split(' ')[1];  // Remove o prefixo 'Bearer'
        }

        if (!chaveToken) {
            return resp.status(401).send({ error: 'Token não fornecido.' });
        }

        // Verifica a validade do token
        let acesso = jwt.verify(chaveToken, KEY);
        req.user = acesso;  // Armazena as informações do usuário no req.user
        next();

    } catch (e) {
        resp.status(401).send({ error: 'Acesso negado. Token inválido ou expirado.' });
    }
}
