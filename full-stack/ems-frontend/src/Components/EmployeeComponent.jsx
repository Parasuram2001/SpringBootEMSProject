import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [id,setId] = useState(0)
    const [firstName,setFirstName] =useState('')
    const [lastName,setLastName] =useState('')
    const [email,setEmail] =useState('')

    const {id1} = useParams();

    const [errors,setErrors]= useState({
        firstName:'',
        lastName:'',
        email:''
    })
    

    const navigator = useNavigate();

    useEffect(()=>{
        if(id1){
            getEmployee(id1).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error =>{
                console.error(error);
            })
        }
    },[id1])

    function handleId(e){
        setId(e.target.value);
    }

    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {id,firstName,lastName,email}
            console.log(employee);

            if(id1){
                updateEmployee(id1,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName='';
        }
        else{
            errorsCopy.firstName = "First name is required";
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName='';
        }
        else{
            errorsCopy.lastName = "Last name is required";
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }
        else{
            errorsCopy.email = "Email is required";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id1){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container' style={{position:'relative',top:'20px'}}>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                    
                    {
                        pageTitle()
                    }

                    <div className='card-body' style={{backgroundImage:'repeating-conic-gradient(red,gold,green)'}}>
                        <form action="">

                            <div className='form-group mb-2'>
                                {/* <label className='form-label'>Id</label> */}
                                <input type='number' placeholder='System generated values no need to fill' name='Id' value={id} className='form-control'
                                onChange={handleId} style={{display:'none'}} >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input type='text' placeholder='Employee First Name' name='FirstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                                onChange={handleFirstName}>
                                </input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input type='text' placeholder='Employee Last Name' name='LastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                                onChange={handleLastName}>
                                </input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input type='email' placeholder='Employee Email' name='Email' value={email} className={`form-control ${errors.email ? 'is-invalid':''}`}
                                onChange={handleEmail}>
                                </input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee} style={{position:'relative',left:'43.5%'}}>Submit</button>


                        </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent