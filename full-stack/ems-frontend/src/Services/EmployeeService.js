import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';
export const listEmployees = ()=>{
    return axios.get(REST_API_BASE_URL);
}

export const createEmployee = (employee)=> {
    return axios.post(REST_API_BASE_URL, employee);
}

export const getEmployee = (employeeId)=>{
    return axios.get(REST_API_BASE_URL + '/' + employeeId);
}

export const updateEmployee = (employeeId1,employee1)=>{
    return axios.put(REST_API_BASE_URL + '/' + employeeId1,employee1);
}

export const deleteEmployee=(employeeId2)=>{
    return axios.delete(REST_API_BASE_URL + '/' + employeeId2);
}