import React from 'react'
import Navbar from './components/Navbars/Navbar'
import { Route, Routes } from 'react-router-dom'
import Shop from './pages/Shop'    
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Footer from './components/Footer/Footer'
import SearchResults from './components/SearchResults/SearchResults.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.js'

// import men_banner from './components/assets/banner_mens.png'
// import women_banner from './components/assets/banner_women.png'
// import kid_banner from './components/assets/banner_kids.png'


const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category="men"/>}/>
        <Route path='/womens' element={<ShopCategory category="women"/>}/>
        <Route path='/kids' element={<ShopCategory category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/search' element={<SearchResults/>}/> 
        <Route path='/about' element={<About/>}/> 
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App