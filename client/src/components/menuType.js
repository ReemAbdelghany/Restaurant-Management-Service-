import React, { useEffect, useState } from "react";
import axios from 'axios';

function MenuPage() {
    const [menus, setMenus] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        dish_type: '',
        meal_type: '',
        diet_type: ''
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/menutype');
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
                response = await axios.put(`http://localhost:8000/menutype/updateMenuType/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/menutype/createMenuType', formData);
            }
            console.log('Response:', response); // Log response
            if (response.status === 200) {
                console.log("Menu type added/updated successfully");
                window.alert("Menu type added/updated successfully");
                setFormData({
                    _id: '',
                    dish_type: '',
                    meal_type: '',
                    diet_type: ''
                });
                fetchMenus();
            }
        } catch (error) {
            console.error('Error adding/updating menu type:', error);
            window.alert("Error adding/updating menu type");
        }
    };

    const handleDelete = async (menuTypeId) => {
        try {
            await axios.delete(`http://localhost:8000/menutype/deleteMenuType/${menuTypeId}`);
            setMenus(prevMenus => prevMenus.filter(menu => menu._id !== menuTypeId));
            console.log("Menu type deleted successfully");
        } catch (error) {
            console.error('Error deleting menu type:', error);
        }
    };

    const handleEdit = (menuType) => {
        setFormData({
            _id: menuType._id,
            dish_type: menuType.dish_type,
            meal_type: menuType.meal_type,
            diet_type: menuType.diet_type
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Dish Type</label>
                    <input type="text" className="form-control" name="dish_type" value={formData.dish_type} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Meal Type</label>
                    <input type="text" className="form-control" name="meal_type" value={formData.meal_type} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Diet Type</label>
                    <input type="text" className="form-control" name="diet_type" value={formData.diet_type} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>Menu Types</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Dish Type</th>
                                <th>Meal Type</th>
                                <th>Diet Type</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, index) => (
                                <tr key={index}>
                                    <td>{menu.dish_type}</td>
                                    <td>{menu.meal_type}</td>
                                    <td>{menu.diet_type}</td>
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
