import './App.css'
import EmployeeComponent from './Components/EmployeeComponent'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import { BrowserRouter,Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent></HeaderComponent>

      <Routes>
        {/*  http://localhost:3000  */}
        <Route path='/' element= { <ListEmployeeComponent></ListEmployeeComponent> }></Route>

        {/* http://localhost:3000/employees */}
        <Route path='/employees' element={ <ListEmployeeComponent></ListEmployeeComponent> }></Route>

      {/* http://localhost:3000/add-employee */}
        <Route path='/add-employee' element={<EmployeeComponent></EmployeeComponent>}></Route>

       {/* http://localhost:3000/edit-employee/1 */}
       <Route path='/edit-employee/:id1' element={<EmployeeComponent></EmployeeComponent>}></Route>

      </Routes>

      {/* <FooterComponent></FooterComponent> */}
    </BrowserRouter>
    </>
  )
}

export default App
