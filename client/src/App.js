import './App.css';
import Landing from './components/landing';
import PathRoutes from './components/helpers.js'
import { Route, Routes, useLocation} from 'react-router-dom';
import NavBar from './components/navbar';
import Form from './components/form';
import Home from './components/home';
import Details from './components/details';

function App() {
  const location = useLocation()
  return (
    <div>
      <div className="App">
      {(location.pathname !== '/') && <NavBar/> }
        
          <Routes>
            <Route path= {PathRoutes.LANDING} element={<Landing />} />  
            <Route path= {PathRoutes.HOME} element={<Home />} />  
            <Route path= {PathRoutes.FORM} element={<Form />} /> 
            <Route path= {PathRoutes.DETAIL} element={<Details />} /> 
          </Routes>
      </div>
    </div>
  );
}

export default App;
