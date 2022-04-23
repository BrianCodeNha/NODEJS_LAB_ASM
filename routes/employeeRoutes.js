const path = require('path');
const employeeControllers = require('../controllers/employeeControllers')

const express = require('express');

const router = express.Router();

router.get('/',employeeControllers.getControlView)

router.get('/diemdanh',employeeControllers.getDiemDanhDetails)
router.post('/diemdanh',employeeControllers.postDiemDanhDetails)

router.get('/kethuc',employeeControllers.getKetThuc)

router.get('/nghiphep',employeeControllers.getNghiPhep)
router.post('/nghiphep',employeeControllers.postNghiPhep)

router.post('/dangkyngaynghi',employeeControllers.postDangKyNghiPhep)

router.get('/ResetRegisterData',employeeControllers.getResetRegisterData)


module.exports = router;
