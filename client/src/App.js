import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ImageInformation from './pages/ImageInformation';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
// import ImageUpload from './pages/ImageUpload';
import LikedImage from './pages/LikedImage';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import ReactUploadImage from './pages/test';
import ImageUpload from './pages/imTest2';
import UploadImage from './pages/imageUploadTest';
import ImageUploadPage from './pages/ImageUploadPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<ReactUploadImage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="image/:imageId" element={<ImageInformation />} />
            <Route path="liked" element={<LikedImage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            {/*<Route path="image/imageUpload" element={<ImageUpload />} />*/}
            {/*<Route path="image/imageUploadTest" element={<UploadImage />} />*/}
            {/*<Route path="imTest" element={<ImageUpload />} />*/}
            <Route path="imTest2" element={<ImageUpload />} />
            {/*<Route path="image/ImageUploadPage" element={<ImageUploadPage />} />*/}
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>
          <Route path="login" element={<Login />} />

          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
