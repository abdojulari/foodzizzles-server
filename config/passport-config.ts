import passport from 'passport';   
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { UserService } from '../src/resources/user/user.service';
import bcrypt from 'bcrypt';

const userService = new UserService();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, 
async (email, password, done) => {
    try {
        
        const user = await userService.findByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }

}))

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await userService.findById(payload.sub);
  
        if (!user) {
          return done(null, false);
        }
  
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
);

export default passport;