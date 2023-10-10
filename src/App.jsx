import './assets/styles/App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/header/Header';
import { HomePage } from './pages/Home/HomePage';
import Footer from './components/footer/Footer';
import AuthPage from './pages/Authentication/AuthPage';
import AdminPage from './pages/Admin/AdminPage';
import ContactPage from './pages/Contact/ContactPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/account' element={<AuthPage />} />
          <Route exact path='/admin-account' element={<AdminPage />} />
          <Route exact path='/contact' element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App


