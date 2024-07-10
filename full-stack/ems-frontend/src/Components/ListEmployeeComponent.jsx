import React,{useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([])

   const navigator = useNavigate();

   useEffect(()=> {
    getAllEmployees();
   },[])


   function getAllEmployees(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
    }).catch(error =>{
        console.error(error);
    })
   }

   function addNewEmployee(){
    navigator('/add-employee')
   }

   function updateEmployee(Id){
    navigator(`/edit-employee/${Id}`)
   }

   function removeEmployee(Id1){
    console.log(Id1);

    deleteEmployee(Id1).then((response)=>{

        getAllEmployees();

    }).catch(error=>{
        console.error(error);
    })
   }
    

  return (
    <div className='container' style={{backgroundColor:'whitesmoke'}}>
        <h1 className='text-center' style={{fontFamily:'initial',position:'relative',top:'7px', border:'5px solid black',backgroundImage:'repeating-radial-gradient(gold,orange,yellow)'}}>List of Employees</h1>

        <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>

        <table className='table table-striped table-bordered' style={{position:'relative',top:"7px"}}>
            <thead>
                <tr>
                    <th><h3 style={{fontFamily:'initial'}} className='text-center'>Employee Id</h3></th>
                    <th><h3 style={{fontFamily:'initial'}} className='text-center'>Employee First Name</h3></th>
                    <th><h3 style={{fontFamily:'initial'}} className='text-center'>Employee Last Name</h3></th>
                    <th><h3 style={{fontFamily:'initial'}} className='text-center'>Employee EmailId</h3></th>
                    <th><h3 style={{fontFamily:'initial'}} className='text-center'>Actions</h3></th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id} className='text-center'>
                            <td style={{fontFamily:'sans-serif'}}>{employee.id}</td>
                            <td style={{fontFamily:'sans-serif'}}>{employee.firstName}</td>
                            <td style={{fontFamily:'sans-serif'}}>{employee.lastName}</td>
                            <td style={{fontFamily:'sans-serif'}}>{employee.email}</td>
                            <td><button className='btn btn-info' onClick={()=>{updateEmployee(employee.id)}}>Update</button>
                                <button className='btn btn-danger'onClick={()=>{removeEmployee(employee.id)}} style={{marginLeft:'10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent