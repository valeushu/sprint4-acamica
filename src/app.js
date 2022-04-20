import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import engine from 'ejs-mate';
import path from 'path';
import flash from 'connect-flash';
import paypal from 'paypal-rest-sdk';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename)

import * as router from './routes/index.routes.js';
import 'dotenv/config';

import passport from './services/auth/passport.js';

import session from 'cookie-session';

const app = express();
app.use(helmet());

//createRoles();

//swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from './docs/swagger.js';
import { fileURLToPath } from 'url';
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);
app.set('json spaces', 2);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//ver swagger en localhost:3000/api-docs

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        //secret: process.env.APP_SESSION_SECRET,}
        keys: [process.env.SESSION_KEY],
        resave: false,
        saveUninitialized: true,
        maxAge: 24 * 60 * 60 * 1000,
    })
);
app.use(express.static(path.join(__dirname, 'public')));


// Initializes passport and passport sessions
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.user = req.user;
    next();
});

//routes
app.use('/api/products', router.productsRoutes);
app.use('/api/auth', router.authRoutes);
app.use('/api/users', router.usersRoutes);
app.use('/api/orders', router.ordersRoutes);
app.use('/api/payment', router.payRoutes);
app.use('/', router.homeRoutes);

export default app;
