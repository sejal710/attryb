import React,{useEffect,useState} from 'react'
import './style.css'
import Product from './container/Product';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const token = localStorage.getItem("Car Token");
  const parsedToken = JSON.parse(token);
  if(!token){
    navigate("/")
    toast("Please Sign in")
    return
  }
  const [data, setData] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectMilege,setSelectMilege] = useState(0)
  const [filter, setFilter] = useState({
    price: [],
    mileage: [],
    color: [],
  });
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const navigate = useNavigate("")
  const [search,setSearch] = useState("");
  const[selectSearch,setSelectSearch] = useState("")
  const [selectSort,setSelectSort] = useState({sort:"",order:""})


  useEffect(() => {
    fetchData();
  }, [selectedColors,selectMilege,selectedPrice,selectSearch,data,selectSort]);

 
  const fetchData = async () => {
    
    try {
      let api = `http://localhost:8080/car?`
      if(selectedPrice !== 0){
        api = `${api}&price=${selectedPrice}`
      }
      if(selectSort.sort !== "" && selectSort.order !== ""){
        api = `${api}&sort=${selectSort.sort}&order=${selectSort.order}`
      }
      if(selectSearch !== ""){
        
        api = `${api}&search=${selectSearch}`
      }
      if(selectMilege !== 0){
        api=`${api}&mileage=${selectMilege}`
      }
      if(selectedColors.length !== 0){
        api = `${api}&color=${selectedColors.join(",")}`
        
      }
      const response = await fetch(api,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parsedToken // Include the authentication token
        },
      }); 
      const jsonData = await response.json(); 
      let colors=[],minP=Infinity,maxP=0,minM=Infinity,maxM=0;
      for(let i=0;i<jsonData.length;i++){
        colors.push(jsonData[i].color)
        minP = Math.min(minP,jsonData[i].price)
        maxP = Math.max(maxP,jsonData[i].price)
        minM = Math.min(minM,jsonData[i].mileage);
        maxM = Math.max(maxM,jsonData[i].mileage)
      }
      let setColor = new Set(colors);
      let newFilter = { ...filter };
      if(filter.price.length === 0 ){
        newFilter.price = [maxP, minP];
      }
      if(filter.mileage.length === 0){
        newFilter.mileage = [maxM, minM];
      }
      if(filter.color.length === 0){
        newFilter.color = Array.from(setColor);
      }
      setFilter(newFilter)
      setData(jsonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handlePriceChange = (event) => {
    setSelectedPrice(parseInt(event.target.value));
  };

  const handleMileageChange = (event) => {
    setSelectMilege(parseInt(event.target.value));
  };

  const handleCheckboxChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSearch = () => {
    console.log(search)
    setSelectSearch(search)
    console.log(selectSearch);
  }

  const handleFilterRemove = () => {
    setSelectedColors([]);
    setSelectMilege(0);
    setSelectSearch("");
    setSelectedPrice(0)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSelectSort({sort:sort,order:order})
  };
  return  (
    <div className='home'>
        <div className='addCars'> 
            <div className="search-bar">
                <input
                type="text"
                className="search-input"
                placeholder="Search By Car Name..."
                onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-button" 
                onClick={handleSearch}
                >
                    Search
                </button>
             </div>
            <button onClick={() => navigate("/add")}>
              Add More Cars</button>
        </div>
        
        <div className='car'> 
          <div className='filter'>

          <div>
            <h3>Filter and Sort Cars :</h3>
            <form className="filter-form" 
            onSubmit={handleSubmit}
            >
        <select 
        value={sort} onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="mileage">Mileage</option>
        </select>
        <select 
        value={order} onChange={e => setOrder(e.target.value)}
        >
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
            min= {filter.price[1]}
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
            min= {filter.mileage[1]}
            max={filter.mileage[0]}
            step="1000"
            value={selectMilege}
            onChange={handleMileageChange}
          />
          <span>{selectMilege}</span>
            </div>

            <div className="checkbox">
            <h3>Colors:</h3>
          {
          filter.color.map((color) => (
            <label key={color}>
              <input
              name='choose'
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

        <div className='data'>
          {
            data.map((el,i) => {
              return(
                <Product car={el} key={i} />
              )
            })
          }
        </div>
        </div>
    </div>
  )
}

