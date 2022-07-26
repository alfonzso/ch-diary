import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Home, Login, Header, Register, Test, Today } from "..";
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../Layout/Footer";
import { Outlet } from 'react-router-dom'

export const baseURL = (window as any)._env_.REACT_APP_BE_URL as string || 'http://localhost:8080'
export const appVersion = (window as any)._env_.REACT_APP_GIT_VERSION as string || 'fafa'


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

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="today" element={<Today />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
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