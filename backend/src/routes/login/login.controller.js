const jwt = require('jsonwebtoken');
const adminModel = require('../../model/admin.model');
require('dotenv').config();

class LoginController {
  secret;

  jwtConfig;

  middleware;

  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.jwtConfig = {
      expiresIn: '8h',
      algorithm: 'HS256',
    };
    // eslint-disable-next-line consistent-return
    this.middleware = async (req, res, next) => {
      const token = req.headers.authorization;

      if (!token) { return res.status(401).json({ message: 'Error: Token not found.' }); }

      try {
        const decoded = jwt.verify(token, this.secret);
        const [admin] = await adminModel.getAdmin(decoded.data.email, decoded.data.password);
        if (!admin) {
          return res
            .status(401)
            .json({ message: 'Error: Failed to fetch admin from token.' });
        }
        req.admin = admin;
        next();
      } catch (err) {
        return res.status(401).json({ message: err.message });
      }
    };
  }

  getMiddleware() {
    return this.middleware;
  }

  postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (password === undefined) return res.status(400).json({ message: 'Error: Password is required.' });
    if (email === undefined) {
      return res.status(400)
        .json({ message: 'Error: It\'s required to provide email for logging in.' });
    }

    try {
      const foundAdmin = await adminModel.getAdmin(email, password);
      const [admin] = foundAdmin;

      const token = jwt.sign({ data: admin }, this.secret, this.jwtConfig);

      return res.status(200).json({
        admin: {
          email: admin.email,
        },
        token,
      });
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  };
}
module.exports = LoginController;
