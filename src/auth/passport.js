import LocalStrategy from 'passport-local';
import userModule from '../modules/user.js';
import {createHash} from 'crypto'

async function signin(email, password, cb) {
  try {
    const user = await userModule.findByEmail(email);

    if (!user) {
      return cb(null, false);
    }
    const passwordHash = createHash('md5').update(password).digest('hex');
    if (passwordHash !== user.passwordHash) {
      return cb(null, false);
    }

    return cb(null, user);
  } catch (error) {
    return cb(error, false);
  }
}

export function initPassport(passport) {
  passport.serializeUser((user, cb) => {
    return cb(null, user._id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await userModule.findById(id)
      return cb(null, user._id);
    } catch (error) {
      return cb(error, null);
    }
  });

  passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, signin));
}
