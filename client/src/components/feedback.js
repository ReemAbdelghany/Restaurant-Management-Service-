import React, { useEffect, useState } from "react";
import axios from 'axios';

function FeedbackPage() {
    const [feedback, setFeedback] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        customer_id: '',
        rating: '',
        feedback: '' 
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get('http://localhost:8000/feedback');
            setFeedback(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rating') {
            // Ensure rating stays within 1 to 5 range
            const ratingValue = Math.min(5, Math.max(1, parseInt(value)));
            setFormData({
                ...formData,
                [name]: ratingValue
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (formData._id) {
                response = await axios.put(`http://localhost:8000/feedback/${formData._id}`, formData);
            } else {
                response = await axios.post('http://localhost:8000/feedback', formData);
            }

            if (response.status === 200) {
                console.log("Feedback added/updated successfully");
                window.alert("Feedback added/updated successfully");

                setFormData({
                    _id: '',
                    customer_id: '',
                    rating: '',
                    feedback: '' // Updated key name to match the schema
                });

                fetchFeedback(); // Refresh the list of feedback
            }
        } catch (error) {
            console.error('Error adding/updating feedback:', error);
            window.alert("Error adding/updating feedback");
        }
    };

    const handleEdit = (feedbackItem) => {
        setFormData({
            _id: feedbackItem._id,
            customer_id: feedbackItem.customer_id,
            rating: feedbackItem.rating,
            feedback: feedbackItem.feedback // Updated key name to match the schema
        });
    };

    const handleDelete = async (feedbackId) => {
        try {
            await axios.delete(`http://localhost:8000/feedback/${feedbackId}`);
            setFeedback(prevFeedback => prevFeedback.filter(item => item._id !== feedbackId));
            console.log("Feedback deleted successfully");
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    // Define the labels for each level of rating
    const ratingLabels = ["Bad", "Poor", "Average", "Good", "Excellent"];

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input type="text" className="form-control" name="customer_id" value={formData.customer_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Feedback</label>
                    <textarea className="form-control" name="feedback" value={formData.feedback} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="mt-5">
                <h2>Feedback Records</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Rating</th>
                                <th>Feedback</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.customer_id}</td>
                                    <td>
                                        <div>
                                            <span>{ratingLabels[Math.min(5, Math.max(1, item.rating)) - 1]}</span>
                                            <span className="ms-2">({item.rating})</span>
                                        </div>
                                    </td>
                                    <td>{item.feedback}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
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

export default FeedbackPage;
