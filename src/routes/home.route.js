import { Router } from 'express';
const router = Router();
import passport from 'passport';
import {  authJwt } from '../middlewares/index.js';

const authCheck = (req, res, next)=> {
    if (req.isAuthenticated()){
        next()
        return
    }
    res.status(401).json("authenticated user")
}

router.get('/', authCheck, (req, res) => {
   // console.log(req.user)
    res.json({"user is" : req.user})
} );

export default router;