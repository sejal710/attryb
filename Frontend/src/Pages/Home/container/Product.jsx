import React from 'react';
import './style.css';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ car}) => {
  const navigate = useNavigate()
  const handleDelete = async() => {
    // Handle delete functionality here
    try {
      const response = await fetch(`http://localhost:8080/car/${car._id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        toast.success("Data Deleted Successfully")
      } else {
        toast.error('Failed to delete data')
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data')
    }
  };

  const handleUpdate = () => {
    toast("Please Change What you want to update")
    navigate("/update",{state:{car}})
  };

 

  return (
    <>
     <div className="car-item">
      <div className="car-image">
        <img src={car.image} alt={car.title} />
      </div>
      <div className="car-details">
        <h3>{car.title}</h3>
        <p>Brand: {car.brand}</p>
        <p>Color: {car.color}</p>
        <p>Mileage: {car.mileage}</p>
        <p>Price: {car.price}</p>
        <p>Registration Place: {car.registrationPlace}</p>
        <p>Accidents: {car.accidents}</p>
        <p>Previous Buyers: {car.previousBuyers}</p>
        <p>Year: {car.year}</p>
      </div>
      <div className="buttons">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
     </div>
    
    </>
  );
};

export default Product;
