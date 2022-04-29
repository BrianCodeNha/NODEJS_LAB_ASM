const path = require('path');
const employeeControllers = require('../controllers/employeeControllers')
const isAuthen = require('../middleware/is-authen')
const isConfirm = require('../middleware/is-confirm')

const express = require('express');

const router = express.Router();

router.get('/', isAuthen, employeeControllers.getControlView)

router.get('/diemdanh', isAuthen, employeeControllers.getDiemDanhDetails)
router.post('/diemdanh', isAuthen, isConfirm, employeeControllers.postDiemDanhDetails)

router.get('/kethuc', isAuthen, isConfirm, employeeControllers.getKetThuc)

router.get('/nghiphep', isAuthen, employeeControllers.getNghiPhep)
router.post('/nghiphep', isAuthen, employeeControllers.postNghiPhep)
router.post('/dangkyngaynghi', isAuthen, isConfirm, employeeControllers.postDangKyNghiPhep)
router.get('/ResetRegisterData', isAuthen, employeeControllers.getResetRegisterData)

router.get('/profile', isAuthen, employeeControllers.getProfile)
router.post('/profile', isAuthen, employeeControllers.postProfile)

router.get('/thongtingiolam', isAuthen, employeeControllers.getThongTinGioLam)
router.post('/thongtingiolam', isAuthen, employeeControllers.postThongTinGioLam)

router.get('/covidcanhan', isAuthen, employeeControllers.getCovidProfile)
router.post('/covidcanhan', isAuthen, employeeControllers.postCovidProfile)


module.exports = router;
