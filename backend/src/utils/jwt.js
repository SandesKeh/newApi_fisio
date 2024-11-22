import jwt from 'jsonwebtoken';


const KEY = process.env.JWT_SECRET || '===!AutonomoAPI!==';



export function gerarToken(userInfo) {
    return jwt.sign(userInfo, KEY)
  }
  
  
  export function autenticar(req, resp, next) {
    return autenticacao(req, resp, next);
  }
  
  
  
  
  export function autenticacao(req, resp, next) {
    try {
      let token = req.headers['acesso-ao-token'];
  
      if (token === undefined)
        token = req.query['acesso-ao-token']
  
    //   let signd = jwt.verify(token, KEY);
  
    //   req.user = signd;
      
      next();
  
    } catch (e) {
      resp.status(401).end();
    }
  }