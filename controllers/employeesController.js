
 const Employee = require('../model/Employee');

 const getAllEmployees = async (req, res) => {
    // Use `find` to get all employees
         const employees = await Employee.find();
         if (!employees) return res.status(204)
         .json({ message: 'No employees found' });

         res.json(employees);
 };

 const createNewEmployee = async (req, res) => {
     if (!req.body.firstname || !req.body.lastname) {
         return res.status(400).json({ message: 'First and last names are required' });
     }

     try {
         const result = await Employee.create({
             firstname: req.body.firstname,
             lastname: req.body.lastname
         });
         res.status(201).json(result);
     } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error' });
     }
 };

 const updateEmployee = async (req, res) => {
     if (!req.body.id) {
         return res.status(400).json({ message: 'ID parameter id required' });
     }

     try {
         const employee = await Employee.findOne({ _id: req.body.id });
         if (!employee) {
             return res.status(204).json({ message: `No employee matches ${req.body.id}` });
         }

         if (req.body.firstname) employee.firstname = req.body.firstname;
         if (req.body.lastname) employee.lastname = req.body.lastname;
         const result = await employee.save();
         res.json(result);
     } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error' });
     }
 };

 const deleteEmployee = async (req, res) => {
     if (!req.body.id) {
         return res.status(400).json({ message: 'Employee Id required' });
     }

     try {
         const employee = await Employee.findOne({ _id: req.body.id });
         if (!employee) {
             return res.status(204).json({ message: `No employee matches ${req.body.id}` });
         }

         const result = await employee.deleteOne({ _id: req.body.id });
         res.json(result);
     } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error' });
     }
 };

 const getEmployee = async (req, res) => {
     if (!req.params.id) {
         return res.status(400).json({ message: 'Employee Id required' });
     }

     try {
         const employee = await Employee.findOne({ _id: req.params.id });
         if (!employee) {
             return res.status(204).json({ message: `No employee matches ${req.params.id}` });
         }

         res.json(employee);
     } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error' });
     }
 };

 module.exports = {
    getAllEmployees,
     createNewEmployee,
     updateEmployee,
     deleteEmployee,
     getEmployee
 };
