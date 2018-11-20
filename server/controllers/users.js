
/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import db from '../models/db';

// Load Input validation
import usersValidation from '../validation/users';


class usersController {
  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/login
   * @description This function implements the logic to loggin a user.
   * @access Public
   */
  static login(req, res) {
    const { errors, isValid } = usersValidation.validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: 'error', data: errors });
    }
    const { email, password } = req.body;

    const userexist = queries.userExist;
    const userexistqueryvalue = [
      email,
    ];
    db.query(userexist, userexistqueryvalue).then((dbresponse) => {
      if (dbresponse.rowCount === 0) {
        const response = {
          email: 'User Not Found',
        };
        return res.status(404).json({ status: 'error', data: response });
      }

      const userData = dbresponse.rows[0];
      bcrypt.compare(password, userData.password)
        .then((isMatch) => {
          if (isMatch) {
            // User Matched
            const payload = {
              id: userData.id,
              // email: userData.email,
              // name: userData.name,
              userImage: userData.userimage,
              type: userData.type,
            };
            // Sign Token
            jwt.sign(payload, SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
              const data = {
                token: `Bearer ${token}`,
                type: userData.type,
              };
              res.json({ status: 'success', data });
            });
          } else {
            const incorrectPasswordResponse = {
              password: 'Incorrect Password',
            };
            return res.status(401).json({ status: 'error', data: incorrectPasswordResponse });
          }
        });
    }).catch(() => {
      return res.status(400).json({ status: 'error', message: 'Error Logging in user, Please try again' });
    });
  }
}

export default usersController;