const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWT');

// Employees Collection Routes
router.route('/')
    .get(verifyJWT, employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// Single Employee Route
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
