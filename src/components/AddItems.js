import React, { useState } from 'react';
import axios from 'axios';

import "./Additems.css";

const AddFoodItem = () => {
  const [foodItem, setFoodItem] = useState({
    categoryName: '',
    name: '',
    options: [],
    description: '',
    img: null
  });

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    let newOptions = [];
    if (selectedCategory === "starter" || selectedCategory === "biryani/rice") {
      newOptions = [
        { type: 'half', price: '', size: 'small' },
        { type: 'full', price: '', size: 'large' }
      ];
    } else if (selectedCategory === "pizza") {
      newOptions = [
        { type: 'regular', price: '', size: 'regular' },
        { type: 'medium', price: '', size: 'medium' },
        { type: 'large', price: '', size: 'large' }
      ];
    }
    setFoodItem({
      ...foodItem,
      categoryName: selectedCategory,
      options: newOptions,
    });
  };

  const handlePriceChange = (index, price) => {
    const updatedOptions = foodItem.options.map((option, i) =>
      i === index ? { ...option, price: price } : option
    );
    setFoodItem({ ...foodItem, options: updatedOptions });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({ ...foodItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setFoodItem({ ...foodItem, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('categoryName', foodItem.categoryName);
      formData.append('name', foodItem.name);
      formData.append('options', JSON.stringify(foodItem.options));  // Convert options to JSON string
      formData.append('description', foodItem.description);
      formData.append('img', foodItem.img);

      await axios.post('http://localhost:5000/api/foodItems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Food item added successfully!');
      setFoodItem({
        categoryName: '',
        name: '',
        options: [],
        description: '',
        img: null0
      });
    } catch (error) {
      console.error('Error adding food item:', error.response.data.error);
      alert('Failed to add food item. Please try again later.');
    }
  };

  return (
    <div className="add-food-item">
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category Name:</label>
          <select
            id="category"
            className="form-control"
            value={foodItem.categoryName}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="starter">Starter</option>
            <option value="biryani/rice">Biryani/Rice</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>
        {foodItem.options.map((option, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`price-${option.type}`}>{option.type.charAt(0).toUpperCase() + option.type.slice(1)} Price:</label>
            <input
              type="text"
              id={`price-${option.type}`}
              className="form-control"
              value={option.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="name">Food Item Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            name="description"
            value={foodItem.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="img">Upload Image:</label>
          <input
            type="file"
            id="img"
            className="form-control-file"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddFoodItem;
