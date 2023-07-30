import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from "./components/Headers/Headers"
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Headers />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/edit/:id' element={<Edit />} />
				<Route path='/userprofile/:id' element={<Profile />} />
				<Route path='*' element={<h1 style={{ fontSize: "90px", background: "black", color: "white" }}>STOP NO SITE FOUND ON THIS URL</h1>} />
			</Routes>
		</>
	)
}

export default App
