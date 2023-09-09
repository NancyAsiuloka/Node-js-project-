const Employee = require('../model/Employee');

const getAllEmployees = async(req, res) => {
    const employees = await Employee.findOne();
    if(!employees) return res.status(204)
    .json({ message: 'No employees found'});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
        if(!req?.body?.firstname || !req?.body?.lastname){
            return res.status(400)
            .json({ message: 'First and last names are required' });
        }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
};

const updateEmployee =  async (req, res) => {
    if(!req?.body?.id){
        return res.status(400)
        .json({ message: 'ID parameter id required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204)
        .json({"message": `No employee matches ${req.body.id}` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
};



const deleteEmployee = (req, res) => {
    // Check if req.body.id is a valid integer
    const employeeId = parseInt(req.body.id);
    if (isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }

    // Find the employee to delete
    const employee = data.employees.find(emp => emp.id === employeeId);
    if (!employee) {
        return res.status(400).json({ message: `Employee ID ${employeeId} not found` });
    }

    // Filter out the employee from the data.employees array
    const filteredArray = data.employees.filter(emp => emp.id !== employeeId);

    // Update the data
    data.setEmployees([...filteredArray]);

    // Respond with the updated employee list
    res.json(data.employees);
};


const getEmployee = (req, res) => {
    // Check if req.params.id is a valid integer
    const employeeId = parseInt(req.params.id);
    if (Number.isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }

    // Find the employee by ID
    const employee = data.employees.find(emp => emp.id === employeeId);
    if (!employee) {
        return res.status(400).json({ message: `Employee ID ${employeeId} not found` });
    }

    // Respond with the employee data
    res.json(employee);
};


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}