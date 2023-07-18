import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import TopNavigation from './components/TopNavigation';
import SignOut from './components/SignOut';
import EditDetails from './components/EditDetails';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}> </Route>
          <Route path="/signup" element={<SignUp />}> </Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/topnav" element={<TopNavigation />}></Route>
          <Route path="/signout" element={<SignOut />}></Route>
          <Route path="/edit" element={<EditDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
