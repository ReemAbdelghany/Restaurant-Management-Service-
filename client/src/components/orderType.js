import React, { useEffect, useState } from "react";
import axios from 'axios';

function OrderTypePage() {
    const [orderTypes, setOrderTypes] = useState([]);
    const [formData, setFormData] = useState({
        type_name: ''
    });
    const [editingOrderTypeId, setEditingOrderTypeId] = useState(null); // Track which order type is being edited

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/ordertype');
            setOrderTypes(response.data);
        } catch (error) {
            console.error('Error fetching order types:', error);
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
            const response = await axios.post('http://localhost:8000/ordertype/createOrderType', formData);
            if (response.status === 200) {
                console.log("Order type added successfully");
                window.alert("Order type added successfully");
                setFormData({
                    type_name: ''
                });
                fetchData(); // Refresh order types after adding
            }
        } catch (error) {
            console.error('Error adding order type:', error);
            window.alert("Error adding order type");
        }
    };

    const handleDelete = async (orderTypeId) => {
        try {
            await axios.delete(`http://localhost:8000/ordertype/deleteOrderType/${orderTypeId}`);
            setOrderTypes(prevOrderTypes => prevOrderTypes.filter(orderType => orderType._id !== orderTypeId));
            console.log("Order type deleted successfully");
        } catch (error) {
            console.error('Error deleting order type:', error);
        }
    };

    const handleEdit = (orderTypeId) => {
        setEditingOrderTypeId(orderTypeId);
        const orderTypeToEdit = orderTypes.find(orderType => orderType._id === orderTypeId);
        setFormData({
            type_name: orderTypeToEdit.type_name
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/ordertype/updateOrderType/${editingOrderTypeId}`, formData);
            if (response.status === 200) {
                console.log("Order type updated successfully");
                window.alert("Order type updated successfully");
                setEditingOrderTypeId(null);
                setFormData({
                    type_name: ''
                });
                fetchData(); // Refresh order types after updating
            }
        } catch (error) {
            console.error('Error updating order type:', error);
            window.alert("Error updating order type");
        }
    };

    const cancelEdit = () => {
        setEditingOrderTypeId(null);
        setFormData({
            type_name: ''
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Order Type Name</label>
                    <input type="text" className="form-control" name="type_name" value={formData.type_name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Order Type</button>
            </form>

            <div className="mt-5">
                <h2>Order Types</h2>
                <ul className="list-group">
                    {orderTypes.map(orderType => (
                        <li key={orderType._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingOrderTypeId === orderType._id ? (
                                <>
                                    <input type="text" className="form-control me-2" name="type_name" value={formData.type_name} onChange={handleChange} />
                                    <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
                                    <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {orderType.type_name}
                                    <div>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(orderType._id)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(orderType._id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrderTypePage;
