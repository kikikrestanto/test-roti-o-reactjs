import '../../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../config/routes';
import Login from '../pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      {AppRoutes.map((route) => (
        <Route key={route.id} element={route.component} {...route}/>
      ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
