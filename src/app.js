import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import * as router from './routes/index.routes.js';
import 'dotenv/config';
import { createRoles } from './libs/initialSetup.js';
import passport from 'passport';
import session from 'cookie-session';

const app = express();
app.use(helmet());
createRoles();

//swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from './docs/swagger.js';
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//settings
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

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api/products', router.productsRoutes);
app.use('/api/auth', router.authRoutes);
app.use('/api/users', router.usersRoutes);
app.use('/api/orders', router.ordersRoutes);
app.use('/api/payMeth', router.payRoutes);
app.use('/home', router.homeRoutes);

export default app;
