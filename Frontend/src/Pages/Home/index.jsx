
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import Product from './container/Product';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const token = localStorage.getItem("Car Token");
  const parsedToken = JSON.parse(token);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedMileage, setSelectedMileage] = useState(0);
  const [filter, setFilter] = useState({
    price: [],
    mileage: [],
    color: [],
  });
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');
  const [selectSearch, setSelectSearch] = useState('');
  const [selectSort, setSelectSort] = useState({ sort: '', order: '' });

  if (!token) {
    useEffect(() => {
      navigate('/');
      toast("Please Sign in");
    }, []);

    return null;
  }

  const fetchData = useCallback(async () => {
    try {
      const queryParams = [];

      if (selectedPrice !== 0) {
        queryParams.push(`price=${selectedPrice}`);
      }
      if (selectSort.sort !== '' && selectSort.order !== '') {
        queryParams.push(`sort=${selectSort.sort}&order=${selectSort.order}`);
      }
      if (selectSearch !== '') {
        queryParams.push(`search=${selectSearch}`);
      }
      if (selectedMileage !== 0) {
        queryParams.push(`mileage=${selectedMileage}`);
      }
      if (selectedColors.length !== 0) {
        queryParams.push(`color=${selectedColors.join(',')}`);
      }

      const api = `https://attryb.onrender.com/car?${queryParams.join('&')}`;
      const response = await fetch(api, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: parsedToken,
        },
      });

      const jsonData = await response.json();
      const colors = new Set();
      let minP = Infinity;
      let maxP = 0;
      let minM = Infinity;
      let maxM = 0;

      jsonData.forEach((item) => {
        colors.add(item.color);
        minP = Math.min(minP, item.price);
        maxP = Math.max(maxP, item.price);
        minM = Math.min(minM, item.mileage);
        maxM = Math.max(maxM, item.mileage);
      });

      const newFilter = { ...filter };
      if (filter.price.length === 0) {
        newFilter.price = [maxP, minP];
      }
      if (filter.mileage.length === 0) {
        newFilter.mileage = [maxM, minM];
      }
      if (filter.color.length === 0) {
        newFilter.color = Array.from(colors);
      }

      setFilter(newFilter);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [
    parsedToken,
    selectedPrice,
    selectSort,
    selectSearch,
    selectedMileage,
    selectedColors,
    filter,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePriceChange = (event) => {
    setSelectedPrice(parseInt(event.target.value));
  };

  const handleMileageChange = (event) => {
    setSelectedMileage(parseInt(event.target.value));
  };

  const handleCheckboxChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSearch = () => {
    setSelectSearch(search);
  };

  const handleFilterRemove = () => {
    setSelectedColors([]);
    setSelectedMileage(0);
    setSelectSearch('');
    setSelectedPrice(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectSort({ sort, order });
  };

  return (
    <div className="home">
      <div className="addCars">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search By Car Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button onClick={() => navigate("/add")}>Add More Cars</button>
      </div>

      <div className="car">
        <div className="filter">
          <div>
            <h3>Filter and Sort Cars :</h3>
            <form className="filter-form" onSubmit={handleSubmit}>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="price">Price</option>
                <option value="mileage">Mileage</option>
              </select>
              <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="">Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <button type="submit">Apply</button>
            </form>
          </div>

          <div className="range-decider">
            <h3>Price Range:</h3>
            <input
              type="range"
              min={filter.price[1]}
              max={filter.price[0]}
              step="1000"
              value={selectedPrice}
              onChange={handlePriceChange}
            />
            <span>{selectedPrice}</span>
          </div>

          <div className="range-decider">
            <h3>Mileage Range:</h3>
            <input
              type="range"
              min={filter.mileage[1]}
              max={filter.mileage[0]}
              step="1000"
              value={selectedMileage}
              onChange={handleMileageChange}
            />
            <span>{selectedMileage}</span>
          </div>

          <div className="checkbox">
            <h3>Colors:</h3>
            {filter.color.map((color) => (
              <label key={color}>
                <input
                  name="choose"
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleCheckboxChange(color)}
                />
                {color}
              </label>
            ))}
          </div>

          <div>
            <button onClick={handleFilterRemove}>Remove Filter</button>
          </div>
        </div>

        <div className="data">
          {data && data.map((el, i) => (
            <Product car={el} key={i} token={parsedToken} />
          ))}
          {data.length === 0 && <h2>Oops Data is not available</h2>}
        </div>
      </div>
    </div>
  );
}






