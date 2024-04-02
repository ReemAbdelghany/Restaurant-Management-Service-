import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserPage() {
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        user_type: '',
        national_id: '',
        phone_no: ''
    });

    useEffect(() => {
        fetchUsers();
        fetchUserTypes();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            const usersData = response.data;
            
            // Fetch user types to associate with users
            const userTypesResponse = await axios.get('http://localhost:8000/userTypes');
            const userTypes = userTypesResponse.data.reduce((acc, userType) => {
                acc[userType._id] = userType;
                return acc;
            }, {});
    
            // Map user data to include user type
            const usersWithUserType = usersData.map(user => ({
                ...user,
                user_type: userTypes[user.user_type] || { type_name: 'N/A' } // Fallback to 'N/A' if user type not found
            }));
            
            setUsers(usersWithUserType);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    
    

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
                response = await axios.put(`http://localhost:8000/users/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/users', formData);
            }

            if (response.status === 200) {
                console.log("User added/updated successfully");
                window.alert("User added/updated successfully");
                setFormData({
                    username: '',
                    password: '',
                    user_type: '', // Reset user_type after form submission
                    national_id: '',
                    phone_no: ''
                });
                fetchUsers();
            }
        } catch (error) {
            console.error('Error adding/updating user:', error);
            window.alert("Error adding/updating user");
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/users/${userId}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            console.log("User deleted successfully");
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            _id: user._id,
            username: user.username,
            password: user.password,
            user_type: user.user_type._id, // Set ObjectId of user type
            national_id: user.national_id,
            phone_no: user.phone_no
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Type</label>
                    <select className="form-control" name="user_type" value={formData.user_type} onChange={handleChange} required>
                        <option value="">Select user type</option>
                        {userTypes.map((type) => (
                            <option key={type._id} value={type._id}>{type.type_name}</option> // Store ObjectId as value
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">National ID</label>
                    <input type="text" className="form-control" name="national_id" value={formData.national_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phone_no" value={formData.phone_no} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>Users</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>User Type</th>
                                <th>National ID</th>
                                <th>Phone Number</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.user_type ? user.user_type.type_name : 'N/A'}</td>
                                    <td>{user.national_id}</td>
                                    <td>{user.phone_no}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default UserPage;
