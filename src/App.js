import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Blogs from './components/Blogs/Blogs';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from './components/RequireAuth/RequireAuth';
import ManageItems from './components/ManageInventories/ManageInventories';
import MyItems from './components/MyItems/MyItems';
import AddItem from './components/AddItem/AddItem';
import Inventory from './components/Inventory/Inventory';
import ResetPassword from './components/ResetPassword/ResetPassword';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route path='/' element={<Home></Home>} ></Route>
                <Route path='/blogs' element={<Blogs></Blogs>} ></Route>
                <Route path='/login' element={<Login></Login>} ></Route>
                <Route path='/register' element={<Register></Register>} ></Route>
                <Route path='/reset-password' element={<ResetPassword></ResetPassword>} ></Route>
                <Route path='/manage-items' element={<RequireAuth><ManageItems></ManageItems></RequireAuth>} ></Route>
                <Route path='/my-items' element={<RequireAuth><MyItems></MyItems></RequireAuth>} ></Route>
                <Route path='/add-item' element={<RequireAuth><AddItem></AddItem></RequireAuth>} ></Route>
                <Route path='/inventory/:id' element={<RequireAuth><Inventory></Inventory></RequireAuth>} ></Route>
                <Route path='*' element={<NotFound></NotFound>} ></Route>
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;
