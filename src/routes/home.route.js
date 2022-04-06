import { Router } from 'express';
const router = Router();
import passport from 'passport';
import {  checkAuth } from '../middlewares/index.js';

router.get('/', checkAuth, (req, res) => {
    // console.log(req.user)
    console.log("HEADERS", req.headers)
    res.json({"user is" : req.user})
} );

router.get('/prueba', [checkAuth], (req, res) => {
    // console.log(req.user)
    res.send("pruebaa");
} );

export default router;