import React,{useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import './form.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update() {
  const location = useLocation();
  const navigate = useNavigate()
  const data = location.state.car
  const [formData, setFormData] = useState({
    image: data.image,
    title: data.title,
    brand: data.brand,
    year: data.year,
    price: data.price,
    mileage: data.mileage,
    color: data.color,
    accidents: data.accidents,
    previousBuyers: data.previousBuyers,
    registrationPlace: data.registrationPlace,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch(`http://localhost:8080/car/${data._id}`, {
        method: 'PATCH', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      toast.success(responseData.Message);
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>Car Information Update Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mileage">Mileage:</label>
          <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="accidents">Accidents:</label>
          <input type="number" id="accidents" name="accidents" value={formData.accidents} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="previousBuyers">Previous Buyers:</label>
          <input
            type="number"
            id="previousBuyers"
            name="previousBuyers"
            value={formData.previousBuyers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registrationPlace">Registration Place:</label>
          <input
            type="text"
            id="registrationPlace"
            name="registrationPlace"
            value={formData.registrationPlace}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
