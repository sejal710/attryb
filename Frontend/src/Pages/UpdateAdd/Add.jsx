import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './form.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update() {
  const navigate = useNavigate()
  const token = localStorage.getItem("Car Token");
  const parsedToken = JSON.parse(token);
  if(!token){
    navigate("/")
  }
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    brand: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    accidents: "",
    previousBuyers: "",
    registrationPlace: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch('https://attryb.onrender.com/car', {
        method: 'POST', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parsedToken
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      toast.success(responseData.Message);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
    
  };

  const handleContinue = () => {
    setFormData({
        image: "",
        title: "",
        brand: "",
        year: "",
        price: "",
        mileage: "",
        color: "",
        accidents: "",
        previousBuyers: "",
        registrationPlace: "",
      })
    setShowModal(false);
  };

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <div className="form-container">
      <h2>Car Information Add Form</h2>
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

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h3>Data Added Successfully</h3>
            <p>Do you want to add more data?</p>
            <div className="modal-buttons">
              <button onClick={handleContinue}>Yes</button>
              <button onClick={handleFinish}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

