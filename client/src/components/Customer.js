import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    _id: '', // Add _id field for identifying the edited record
    customer_name: '',
    phone_number: '',
    email: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/customer')
      .then(res => {
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData._id) {
        // If _id exists in formData, it means we're updating an existing customer
        response = await axios.put(`http://localhost:8000/customer/updateCustomer/${formData._id}`, formData);
      } else {
        // Otherwise, we're creating a new customer
        response = await axios.post('http://localhost:8000/customer/createCustomer', formData);
      }
  
      if (response.status === 200) {
        console.log("Customer added/updated successfully");
        window.alert("Customer added/updated successfully");
  
        // Clear the form data
        setFormData({
          _id: '', // Reset _id field
          customer_name: '',
          phone_number: '',
          email: ''
        });
  
        // Optionally, you can update the state to reflect the newly added/updated customer
        if (formData._id) {
          const updatedRecords = records.map(record => {
            if (record._id === formData._id) {
              return formData; // Use the updated form data if it matches the edited record
            }
            return record;
          });
          setRecords(updatedRecords);
        } else {
          // If it's a new customer, you may want to refresh the list of customers
          // or retrieve the updated list from the server
        }
      }
    } catch (error) {
      console.error('Error adding/updating customer:', error);
      window.alert("Error adding/updating customer");
    }
  };
  

  const handleEdit = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/customer/${customerId}`);
      const { _id, customer_name, phone_number, email } = response.data;
      setFormData({
        _id, // Set the _id field for identifying the edited record
        customer_name,
        phone_number,
        email
      });
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8000/customer/deleteCustomer/${customerId}`);
      // Update the records state by filtering out the deleted record
      setRecords(prevRecords => prevRecords.filter(record => record._id !== customerId));
      console.log("Customer deleted successfully");
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input type="text" className="form-control" name="customer_name" value={formData.customer_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div className="mt-5">
        <h2>Customer Records</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>{record[column]}</td>
                  ))}
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(record._id)}>Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
