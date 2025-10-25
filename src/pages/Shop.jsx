import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import AllProducts from '../components/AllProducts/AllProducts'


const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      {/* <Offers/> */}
      <NewCollections/>
      <NewsLetter/>
      <AllProducts/>
      
    </div>
  )
}

export default Shop