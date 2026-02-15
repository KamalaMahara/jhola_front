import Categories from "../../globals/types/components/categories/categories"
import Navbar from "../../globals/types/components/Navbar/navbar"

import Feature from "./feature"

import ModernDarkHero from "./Hero"


const Home = () => {
  return (

    <>
      <Navbar />
      <ModernDarkHero />
      <Feature />
      <Categories />



    </>
  )
}

export default Home