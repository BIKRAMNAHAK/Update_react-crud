
/*
   impliment reset button and store data in local storege 
*/

import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Header from './component/Header/Header'
import generateUniqueId from 'generate-unique-id';
import './App.css';
import { getData } from './component/Service/Service';


function App() {
  const [employee, setEmployee] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: ''
  });

  const [displayData, setDisplayData] = useState(getData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (employee.id) {
      // Update existing record
      const updatedData = displayData.map((rec) => {
        if (rec.id === employee.id) {
          return employee;
        }
        return rec;
      });
      setDisplayData(updatedData);
    } else {
  
      if (employee.firstName && employee.lastName && employee.email && employee.address && employee.phone) {
        const newData = {
          ...employee,
          id: generateUniqueId({length:4,useLetters: false})
        };
        setDisplayData([...displayData, newData]);
      }
    }

 
    setEmployee({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: ''
    });
  };

  const handleEdit = (id) => {
    const recordToEdit = displayData.find((rec) => rec.id === id);
    setEmployee(recordToEdit);
  };

  const handleDelete = (id) => {
    const updatedData = displayData.filter((rec) => rec.id !== id);
    setDisplayData(updatedData);
  };

  useEffect(()=>{
    localStorage.setItem("myEmployeeData",JSON.stringify(displayData))

    /*
    ଯତେ ବେଳେ ଆମେ ୱେବ ପେଜ କୁ relode କରିଥାଉ ସେତେବେଳେ ଆମ ଟେବଲ ରେ ଦେଖା ଯାଉଥିବା ସବୁ ଡେଟା remove ହେଇଯାଇଥାଏ 
    ଯେତେବେଳେ useEffect ଆମେ ବ୍ୟବହାର କରୁ ସେ ଜେତେବେଳେ ଆମେ ଡେଟା submit କରୁ ତା ସାଙ୍ଗେ ସାଙ୍ଗେ useEffect run ହେବ  
    ଏବ୐ ତାହା ସବୁ ଡେଟା କୁ textuly formet ରେ localstorege ରେ ସ୍ଟୋର କରିଦେବ 
    */
  })


  //work for Reset button
  const handleReset = () => {
    localStorage.removeItem("myEmployeeData")
    setDisplayData([]);
  }

  return (
    <div className="App">
      <Header />
      <Container>
        <Card className="my-4 shadow-sm card-container">
          <Card.Header as="h5" className="bg-dark text-white">
            <h2>Manage Employees</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="hidden"
                name="id"
                value={employee.id}
                onChange={handleChange}
                required
              />
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>First Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Last Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Address</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>Phone</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className='justify-content-center'>
                <Button variant="success" type="submit" className="mt-3">
                  {employee.id ? 'Update' : 'Submit'}
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <div className='border border-top'></div>
        <h3 style={{ backgroundColor: 'purple', color: 'white' }} className='p-3 d-flex justify-content-between'>
          Manage Employees

          <button type='button' className='btn btn-danger' onClick={()=>handleReset()}>Reset</button>
        </h3>
        <div className='px-5'>
          <Table striped bordered hover className="mt-4 text-center">
            <thead>
              <tr>
                <th>Employees Id</th>
                <th>Employees Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((emp) => (
                <tr>
                  <td>{emp.id}</td>
                  <td>{emp.firstName + emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.address}</td>
                  <td>{emp.phone}</td>
                  <td className='d-flex justify-content-evenly'>
                    <Button variant="info">
                      <FaEye />
                    </Button>
                    <Button variant="warning" onClick={() => handleEdit(emp.id)} className="mr-2">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(emp.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default App;
