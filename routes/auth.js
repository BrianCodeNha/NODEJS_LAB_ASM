const path = require('path');
const authControllers = require('../controllers/auth')

const express = require('express');

const router = express.Router();

router.get('/manager', authControllers.getManager)

router.get('/manager/:id', authControllers.getManagerStaff)
router.post('/manager/:id', authControllers.postManagerStaff)

router.post('/delete', authControllers.postDeletHistory)


router.get('/topdf', authControllers.getToPdf)

router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);

router.post('/logout', authControllers.postLogout);

router.get('/signup', authControllers.getSignup);
router.post('/signup', authControllers.postSignup);












module.exports = router;