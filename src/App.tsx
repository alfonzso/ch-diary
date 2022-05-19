import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Test from "./components/Test";
import { useAppSelector, useAppDispatch } from "./redux/hooks";

export const baseURL = 'http://localhost:7282'

function App() {
  const userData = useAppSelector(state => state.user.data)
  const dispatch = useAppDispatch()

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="test" element={<Test />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}