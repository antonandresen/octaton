import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import passport from 'passport';
const twitchStrategy = require('@d-fischer/passport-twitch').Strategy;

import { connectBot } from './twitch';

dotenv.config();

connectBot(process.env.TWITCH_USERNAME!, process.env.TWITCH_TOKEN!);

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 1337;

const app: Application = express();

// Body parser
app.use(express.json());

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new twitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === 'development'
          ? `http://localhost:${PORT}/auth/twitch/callback`
          : 'https://octaton.herokuapp.com/auth/twitch/callback',
      scope: 'user_read',
      includeEmail: true,
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get('/auth/twitch', passport.authenticate('twitch'));
app.get(
  '/auth/twitch/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  function (req, res) {
    console.log('SUCCESS');
    // Successful authentication, redirect home.
    //res.redirect('/dashboard');
    res
      .status(200)
      .cookie('jwt', signToken(req.user))
      .redirect('http://localhost:3000');
  }
);

app.get('/', (req: Request, res: Response) => {
  res.json({ name: 'octaton' });
});

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
