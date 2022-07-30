import { useEffect } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Home, Login, Logout, Register, Today } from "../../Pages";
import { Footer, Header } from "../../Layout";
import { chAppconfig } from "../../config";
import Test from "../Test";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function Layout() {
  return (
    <div className="AppContainer" >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = chAppconfig.title
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="today" element={<Today />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="register" element={<Register />} />
            <Route path="test" element={<Test />} />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>

      </div>
    </>
  );
}

export default App;

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