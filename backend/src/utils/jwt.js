import jwt from 'jsonwebtoken';
const KEY = '===!AutonomoAPI!==';



export function gerarToken(userInfo) {
    return jwt.sign(userInfo, KEY);
}


export function autenticar(req, resp, next) {
    return autenticacao(req, resp, next);
}


export function autenticacao(req, resp, next) {
    try {
        let chaveToken = req.headers['acesso-ao-token'] || req.query['acesso-ao-token'];

        if (!chaveToken) {
            return resp.status(401).send({ error: 'Token não fornecido.' });
        }

        
        let acesso = jwt.verify(chaveToken, KEY)
        req.user = acesso;
        next();

    } catch (e) {
        resp.status(401).send({ error: 'Acesso negado. Token inválido.' });
    }
}
