import { Router } from 'express';
const router = Router();
import passport from 'passport';
import {  checkAuth } from '../middlewares/index.js';

router.get('/', (req, res, next) => {
    // console.log(req.user)
    res.render('index')
} );

router.get('/profile', (req, res, next) => {
    // console.log(req.user)
    res.render('profile')
} );




export default router;