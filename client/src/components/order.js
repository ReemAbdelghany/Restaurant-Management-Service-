import React, { useEffect, useState } from "react";
import axios from 'axios';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        user_id: '',
        menu_id: '',
        total_amount: '',
        orderType: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/order');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
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
                response = await axios.put(`http://localhost:8000/order/updateOrder/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/order/createOrder', formData);
            }

            if (response.status === 200) {
                console.log("Order added/updated successfully");
                window.alert("Order added/updated successfully");
                setFormData({
                    customer_id: '',
                    user_id: '',
                    menu_id: '',
                    total_amount: '',
                    orderType: ''
                });
                fetchOrders();
            }
        } catch (error) {
            console.error('Error adding/updating order:', error);
            window.alert("Error adding/updating order");
        }
    };

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8000/order/deleteOrder/${orderId}`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            console.log("Order deleted successfully");
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleEdit = (order) => {
        setFormData({
            _id: order._id,
            customer_id: order.customer_id,
            user_id: order.user_id,
            menu_id: order.menu_id,
            total_amount: order.total_amount,
            orderType: order.orderType
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input type="text" className="form-control" name="customer_id" value={formData.customer_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input type="text" className="form-control" name="user_id" value={formData.user_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Menu ID</label>
                    <input type="text" className="form-control" name="menu_id" value={formData.menu_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input type="text" className="form-control" name="total_amount" value={formData.total_amount} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Order Type</label>
                    <select className="form-control" name="orderType" value={formData.orderType} onChange={handleChange} required>
                        <option value="">Select order type</option>
                        <option value="Dine in">Dine in</option>
                        <option value="Delivery">Delivery</option>
                        <option value="PickUp">PickUp</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>Orders</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>User ID</th>
                                <th>Menu ID</th>
                                <th>Order Date</th>
                                <th>Total Amount</th>
                                <th>Order Type</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
    {orders.map((order, index) => (
        <tr key={index}>
            <td>{order.customer_id}</td>
            <td>{order.user_id}</td>
            <td>{order.menu_id}</td>
            <td>{order.order_date}</td>
            <td>{order.total_amount}</td>
            <td>{order.orderType}</td> {/* Added orderType field */}
            <td>
                <button className="btn btn-primary" onClick={() => handleEdit(order)}>Edit</button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
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

export default OrderPage;