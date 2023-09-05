const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) { this.employees = data}
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    try {
        const newEmployee = {
            id: (data.employees.length > 0 ? data.employees[data.employees.length - 1].id + 1 : 1),
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };

        if (!newEmployee.firstname || !newEmployee.lastname) {
            return res.status(400).json({ "message": 'First and last names are required' });
        }

        data.setEmployees([...data.employees, newEmployee]);
        res.status(201)
        .json({ "message": 'Employee created successfully', employees: data.employees });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ "message": 'Internal server error' });
    }
};

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
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