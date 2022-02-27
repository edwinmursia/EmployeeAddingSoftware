import { useState } from "react"
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [education, setEducation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const [allEmployees, setAllEmployees] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3000/posts', {
      name: name,
      age: age,
      nationality: nationality,
      nativeLanguage: nativeLanguage,
      education: education,
      jobTitle: jobTitle,
      salary: salary
    }).then(() => {
      console.log("Success!");
    })
  };

  const getAllEmployees = () => {
    Axios.get('http://localhost:3000/posts').then((response) => {
      setAllEmployees(response.data)
    });
  };

  const updateEmployeeSalary = (_id) => {
    Axios.put(`http://localhost:3000/posts/${_id}`, {salary: newSalary, _id: _id}).then((response) => {
      setAllEmployees(allEmployees.map((val) => {
        return val._id === _id ? {_id: val._id, name: val.name, age: val.age, nationality: val.nationality, nativeLanguage: val.nativeLanguage, education: val.education, jobTitle: val.jobTitle, salary: val.salary} : val
      }))
    });
  };

  const deleteEmployee = (_id) => {
    Axios.delete(`http://localhost:3000/posts/${_id}`).then((response) => {
      setAllEmployees(allEmployees.filter((val) => {
        return val._id !== _id
      }))
    })
  };

  return (
    <div className="App">
      <div className="box">
        <h1 className="header" >Employee registration</h1>
      </div>
      <div className="information" >
        <label id="firstLabel" >Name of the new employee:</label>
        <input type="text" onChange={(event) => (setName(event.target.value))} />
        <label>Age:</label>
        <input type="number" onChange={(event) => (setAge(event.target.value))} />
        <label>Nationality:</label>
        <input type="text" onChange={(event) => (setNationality(event.target.value))} />
        <label>Native language:</label>
        <input type="text" onChange={(event) => (setNativeLanguage(event.target.value))} />
        <label>Education:</label>
        <input type="text" onChange={(event) => (setEducation(event.target.value))} />
        <label>Job title:</label>
        <input type="text" onChange={(event) => (setJobTitle(event.target.value))} />
        <label>Salary in Euros (€) per year:</label>
        <input type="number" onChange={(event) => (setSalary(event.target.value))} />
        <button onClick={addEmployee} >Add new employee</button>
      </div>
      <div className="box">
        <h1 className="header" >All employees</h1>
      </div>
      <div className="allEmployees">
        <button onClick={getAllEmployees} >All employees</button>

        {allEmployees.map((val, key) => {
          return (
            <div className="employee" >
              <h4>{val.name + ' | ' + val.jobTitle + ' | ' + val.salary + '€'}</h4>
              <input type="text" placeholder="New salary" onChange={(event) => (setNewSalary(event.target.value))} />
              <button onClick={() => {updateEmployeeSalary(val._id)}}>Update</button>
              <button id="deleteButton" onClick={() => {deleteEmployee(val._id)}} >Delete user</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
