import Auth from './Pages/Auth/Index';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Update from './Pages/UpdateAdd/Update'
import Add from './Pages/UpdateAdd/Add';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div >
      <ToastContainer />
      <Routes >
        <Route path="/" element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/update' element={<Update />} />
        <Route path='/add' element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
