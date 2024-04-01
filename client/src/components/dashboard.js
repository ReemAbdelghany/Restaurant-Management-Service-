import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [editOrderData, setEditOrderData] = useState({});
    const [editOrderTypeData, setEditOrderTypeData] = useState({});
    const [editedOrder, setEditedOrder] = useState({});
    const [editedOrderType, setEditedOrderType] = useState({});
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const [showEditOrderModal, setShowEditOrderModal] = useState(false); // Add state for showing edit order modal
    const [showEditOrderTypeModal, setShowEditOrderTypeModal] = useState(false); // Add state for showing edit order type modal

    useEffect(() => {
        fetchOrders();
        fetchOrderTypes();
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:8000/order')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

    const fetchOrderTypes = () => {
        axios.get('http://localhost:8000/ordertype')
            .then(response => {
                setOrderTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching order types:', error);
            });
    };

    const openEditOrderModal = (order) => {
        setEditOrderData(order);
        setEditedOrder(order); // Populate editedOrder with the current order data
        setShowEditOrderModal(true);
    };

    const openEditOrderTypeModal = (orderType) => {
        setEditOrderTypeData(orderType);
        setEditedOrderType(orderType); // Populate editedOrderType with the current order type data
        setShowEditOrderTypeModal(true);
    };

    const handleSaveOrder = () => {
        axios.post(`http://localhost:8000/order/updateOrder/${editOrderData._id}`, editedOrder)
            .then(response => {
                console.log('Order updated successfully:', response.data);
                fetchOrders();
            })
            .catch(error => {
                console.error('Error updating order:', error);
            });
    };

    const handleSaveOrderType = () => {
        axios.post(`http://localhost:8000/ordertype/updateOrderType/${editOrderTypeData._id}`, editedOrderType)
            .then(response => {
                console.log('Order type updated successfully:', response.data);
                fetchOrderTypes();
            })
            .catch(error => {
                console.error('Error updating order type:', error);
            });
    };

    const handleDeleteOrder = (orderId) => {
        axios.delete(`http://localhost:8000/order/deleteOrder/${orderId}`)
            .then(response => {
                console.log('Order deleted successfully:', response.data);
                setOrders(orders.filter(order => order._id !== orderId));
            })
            .catch(error => {
                console.error('Error deleting order:', error);
            });
    };

    const handleDeleteOrderType = (orderTypeId) => {
        axios.delete(`http://localhost:8000/ordertype/deleteOrderType/${orderTypeId}`)
            .then(response => {
                console.log('Order type deleted successfully:', response.data);
                setOrderTypes(orderTypes.filter(orderType => orderType._id !== orderTypeId));
            })
            .catch(error => {
                console.error('Error deleting order type:', error);
            });
    };

    const handleCreateOrder = () => {
        axios.post(`http://localhost:8000/order/createOrder`, editedOrder)
            .then(response => {
                console.log('Order created successfully:', response.data);
                fetchOrders();
                setShowCreateOrderModal(false);
            })
            .catch(error => {
                console.error('Error creating order:', error);
            });
    };

    const openCreateOrderModal = () => {
        setShowCreateOrderModal(true);
    };

    const closeCreateOrderModal = () => {
        setShowCreateOrderModal(false);
    };

    
  return (
    <div>
      {/* Top bar */}
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand*/}
          <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
          {/* Sidebar Toggle*/}
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
          {/* Navbar Search*/}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group">
                  <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                  <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
              </div>
          </form>
          {/* Navbar*/}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#!">Settings</a></li>
                      <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#!">Logout</a></li>
                  </ul>
              </li>
          </ul>
      </nav>
      
      {/* Sidebar */}
      <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                  {/* Sidebar content goes here */}
              </nav>
          </div>
      
{/* Main content */}
<div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="container-fluid">
                        <div className="col-xl-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-table me-1"></i>
                                    Orders
                                </div>
                                <div className="card-body">
                                    <table id="ordersTable" className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Customer ID</th>
                                                <th>User ID</th>
                                                <th>Menu ID</th>
                                                <th>Order Date</th>
                                                <th>Total Amount</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order.customer_id}</td>
                                                    <td>{order.user_id}</td>
                                                    <td>{order.menu_id}</td>
                                                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                                    <td>{order.total_amount}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => openEditOrderModal(order)}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="col-xl-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-table me-1"></i>
                                    Order Types
                                </div>
                                <div className="card-body">
                                    <table id="orderTypesTable" className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Type Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderTypes.map(orderType => (
                                                <tr key={orderType._id}>
                                                    <td>{orderType.type_name}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => openEditOrderTypeModal(orderType)}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteOrderType(orderType._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modals for editing orders and order types */}
                {/* Example modal for editing an order */}
                <div className="modal fade" id="editOrderModal" tabIndex="-1" aria-labelledby="editOrderModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editOrderModalLabel">Edit Order</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Add form fields here to edit the order */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveOrder}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Example modal for editing an order type */}
                <div className="modal fade" id="editOrderTypeModal" tabIndex="-1" aria-labelledby="editOrderTypeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editOrderTypeModalLabel">Edit Order Type</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="orderTypeName" className="form-label">Order Type Name</label>
                                        <input type="text" className="form-control" id="orderTypeName" value={editedOrderType.type_name} onChange={(e) => setEditedOrderType({ ...editedOrderType, type_name: e.target.value })} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveOrderType}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Create new order modal */}
                <div className="modal fade" id="createOrderModal" tabIndex="-1" aria-labelledby="createOrderModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createOrderModalLabel">Create New Order</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeCreateOrderModal}></button>
                            </div>
                            <div className="modal-body">
                                {/* Add form fields here to create a new order */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeCreateOrderModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateOrder}>Create Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
