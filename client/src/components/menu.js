import React, { useEffect, useState } from "react";
import axios from 'axios';

function MenuPage() {
    const [menus, setMenus] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        dish_name: '',
        dish_description: '',
        dish_price: ''
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/menu');
            setMenus(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
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
                response = await axios.put(`http://localhost:8000/menu/updateMenu/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/menu/createMenu', formData);
            }
            console.log('Response:', response); // Log response
            if (response.status === 200) {
                console.log("Menu added/updated successfully");
                window.alert("Menu added/updated successfully");
                setFormData({
                    _id: '',
                    dish_name: '',
                    dish_description: '',
                    dish_price: ''
                });
                fetchMenus();
            }
        } catch (error) {
            console.error('Error adding/updating menu:', error);
            window.alert("Error adding/updating menu");
        }
    };
    

    const handleDelete = async (menuId) => {
        try {
            await axios.delete(`http://localhost:8000/menu/deleteMenu/${menuId}`);
            setMenus(prevMenus => prevMenus.filter(menu => menu._id !== menuId));
            console.log("Menu deleted successfully");
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };

    const handleEdit = (menu) => {
        setFormData({
            _id: menu._id,
            dish_name: menu.dish_name,
            dish_description: menu.dish_description,
            dish_price: menu.dish_price
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Dish Name</label>
                    <input type="text" className="form-control" name="dish_name" value={formData.dish_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dish Description</label>
                    <input type="text" className="form-control" name="dish_description" value={formData.dish_description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dish Price</label>
                    <input type="text" className="form-control" name="dish_price" value={formData.dish_price} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>Menu</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Dish Name</th>
                                <th>Dish Description</th>
                                <th>Dish Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, index) => (
                                <tr key={index}>
                                    <td>{menu.dish_name}</td>
                                    <td>{menu.dish_description}</td>
                                    <td>{menu.dish_price}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleEdit(menu)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(menu._id)}>Delete</button>
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

export default MenuPage;
