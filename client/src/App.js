import './App.css';
import Navbar from "./components/Navbar";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/signUp/SignUp";
function App() {
  return (
    <div >
      <Navbar/>
      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
    </div>
  );
}

export default App;
