import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserTypePage() {
    const [userTypes, setUserTypes] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        type_name: ''
    });

    useEffect(() => {
        fetchUserTypes();
    }, []);

    const fetchUserTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/userTypes');
            setUserTypes(response.data);
        } catch (error) {
            console.error('Error fetching user types:', error);
        }
    };

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
                response = await axios.put(`http://localhost:8000/userTypes/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/userTypes', formData);
            }

            if (response.status === 201 || response.status === 200) {
                console.log("User type added/updated successfully");
                window.alert("User type added/updated successfully");
                setFormData({
                    _id: '',
                    type_name: ''
                });
                fetchUserTypes();
            }
        } catch (error) {
            console.error('Error adding/updating user type:', error);
            window.alert("Error adding/updating user type");
        }
    };

    const handleDelete = async (userTypeId) => {
        try {
            await axios.delete(`http://localhost:8000/userTypes/${userTypeId}`);
            setUserTypes(prevUserTypes => prevUserTypes.filter(userType => userType._id !== userTypeId));
            console.log("User type deleted successfully");
        } catch (error) {
            console.error('Error deleting user type:', error);
        }
    };

    const handleEdit = (userType) => {
        setFormData({
            _id: userType._id,
            type_name: userType.type_name
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User Type Name</label>
                    <input type="text" className="form-control" name="type_name" value={formData.type_name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>User Types</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>User Type Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTypes.map((userType, index) => (
                                <tr key={index}>
                                    <td>{userType.type_name}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleEdit(userType)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(userType._id)}>Delete</button>
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

export default UserTypePage;
