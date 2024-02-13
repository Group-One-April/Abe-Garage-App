// Import the employee service 
const employeeService = require('../services/employee.service');
// Create the add employee controller
async function createEmployee(req, res, next) {

  // console.log(req.headers); 

  // Check if employee email already exists in the database 
  const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!"
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!"
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
}

// Create the getAllEmployees controller 
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service 
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}
//create the getsingleemployee controller

async function getSingleEmployee(req, res, next) {
  try {
    let id = parseInt(req.params.id);
    
    // Check if id is a valid number
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid employee ID"
      });
    }
    
    let employee = await employeeService.getSingleEmployee(id);
    if (!employee) {
      return res.status(400).json({
        error: "No user with that ID"
      });
    } else {
      res.status(200).json({
        success: true,
        data: employee
      });
    }
  } catch (error) {
    console.error("Error fetching single employee:", error);
    res.status(500).json({
      error: "An error occurred while fetching the employee"
    });
  }
}

//create updateEmploee controller
// async function updateEmployee(req, res, next) {
//   try {
//     const newData = req.body;

//     console.log('Received newData:', newData); // Add this logging statement

//     if (!newData) {
//       throw new Error("newData is undefined");
//     }

//     // Check if all required properties are present
//     const requiredProperties = ['employee_id', 'employee_first_name', 'employee_last_name', 'employee_phone', 'company_role_id'];
//     const missingProperties = requiredProperties.filter(prop => !(prop in newData));

//     if (missingProperties.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required properties in newData',
//         missingProperties: missingProperties
//       });
//     }

//     let updatedEmployee = await employeeService.updateEmployee(newData);
  
//     res.status(200).json({
//       success: true,
//       message: 'Updated successfully',
//       data: updatedEmployee
//     });
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while updating the employee',
//       error: error.message
//     });
//   }
// }

async function updateEmployee(req, res, next) {
  const newData = req.body;

  try {
    let updatedEmployee = await employeeService.updateEmployee(newData);
  
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the employee',
      error: error.message
    });
  }
}



// //create deleteemployee controller
// async function deleteEmployee(req,res,next){
// let deleted = await employeeService.deleteEmployee(req.params.id);
// if (!deleted) {
// return res.status(400).json({
//   error: 'Employee not found'
//   });
// } else {
//   return res.status(200).json({
//     success: true,
//     data: deleted
//     });
//     }
//     };

// DELETE /employees/:employee_id
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.employee_id; // Assuming employee_id is passed as a URL parameter
  try {
    const result = await db.deleteEmployee(employeeId);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the createEmployee controller 
module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee

};