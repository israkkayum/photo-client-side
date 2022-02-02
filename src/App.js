import './App.css';
import Login from './components/Login/Login/Login';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Login/Register/Register';
import Footer from './components/Footer/Footer';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import Header from './components/Header/Header';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';

function App() {

  render(

    <BrowserRouter>
      <AuthProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<PrivateRoute>
            <Home />
          </PrivateRoute>}>
          </Route>
          <Route path="/home" element={<PrivateRoute>
            <Home />
          </PrivateRoute>}>
          </Route>
          <Route path="/profile" element={<PrivateRoute>
            <Profile/>
          </PrivateRoute>}>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </BrowserRouter>,

    document.getElementById("root")
  );

}

export default App;
