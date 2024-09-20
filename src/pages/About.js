import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import useState from 'react-usestateref'
import photo8 from './images/11.jpeg';
import photo7 from './images/12.jpeg';
import NavBar from '../NavBar';
import { auth0, getBasketItemAll } from "../https/Api";


function FAQ() {

  const [skoka,setskoka,setskokaRef] = useState(null)
  const getBasketItem = async() => {
   
    const storedToken = localStorage.getItem('token2');
   
    if(storedToken==null || storedToken==undefined){
      await auth0()
      getBasketItem()
    }else{
      const userId = jwtDecode(storedToken)
      console.log(userId.id)
      const basketitem = await getBasketItemAll(userId.id)
  
      let skok = 0
      const skok1 = basketitem.map(item=> skok = Number(skok) + Number(item.qauantity))
      setskoka(skok)
    }

    }

  
  useEffect(()=>{
    if(setskokaRef?.current==null){
      getBasketItem()
    }
  })
  return (
    <div className="App">
<NavBar skoka={setskokaRef?.current}/>


<main>
    <div class="mb-4 pb-4"></div>
    <section class="about-us container">
      <div class="mw-930">
        <h2 class="page-title">ABOUT Kitchen-glow</h2>
      </div>
      <div class="about-us__content pb-5 mb-5">
        <p class="mb-5">
          <img loading="lazy" class="w-100 h-auto d-block" src='https://www.smeg.com/binaries/content/gallery/smeg/highlights/tsf02pguk.jpg/tsf02pguk.jpg/brx%3ApostcardDeskLarge' width="1410" height="550" alt=""/>
        </p>
        <div class="mw-930">
          <h3 class="mb-4">OUR STORY</h3>
          <p class="fs-6 fw-medium mb-4">We sell products from various companies and specialize in home appliances. Designer things for home and comfort. In our product catalog you can find products for cooking various dishes, coffee, drinks.

          </p>
          <p class="mb-4">Designed by the architect Guido Canali, the headquarters earned him the Honourable Mention in the “medaglia d’Oro all’Architettura Italiana” (Italian Architecture Gold Medal) Award at the Milan Triennale in 2006. The project was presented at the 13th International Architecture Exhibition - Venice Biennale in 2012 inside the Italian Pavilion, as an architectural example of excellence Made in Italy for a facility that heeds the poetry of its surroundings, people’s lives, and environmental sustainability.
          </p>
          {/* <div class="row mb-3">
            <div class="col-md-6">
              <h5 class="mb-3">Our Mission</h5>
              <p class="mb-3">Our mission is to please as many people as possible
              </p>
            </div>
            <div class="col-md-6">
              <h5 class="mb-3">Our Vision</h5>
              <p class="mb-3">We see the world of sex toys as a whole world for creativity and your pleasure
              </p>
            </div>
          </div> */}
        </div>
        <div class="mw-930 d-lg-flex align-items-lg-center">
          <div class="image-wrapper col-lg-6">
            <img class="h-auto" loading="lazy" src='https://images.unsplash.com/photo-1520930528075-4ea5ead759f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1600&q=50' width="450" height="500" alt=""/>
          </div>
          <div class="content-wrapper col-lg-6 px-lg-4">
            <h5 class="mb-3">A little bit about the products
            </h5>
            <p>Smeg has 5 production plants in Italy. Their certified laboratories, thanks to their in-depth knowledge of materials and to state-of-the-art technology, interpret the needs of contemporary living, expressing essential qualities in the products, including durability, safety, flexible use, energy efficiency and enjoyability.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="service-promotion horizontal container mw-930 pt-0 mb-md-4 pb-md-4 mb-xl-5">
      <div class="row">
        <div class="col-md-4 text-center mb-5 mb-md-0">
          <div class="service-promotion__icon mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use /></svg>
          </div>
          <h3 class="service-promotion__title fs-6 text-uppercase">Fast And Free Delivery (2-14 days)</h3>
          <p class="service-promotion__content text-secondary">Free delivery </p>
        </div>

        <div class="col-md-4 text-center mb-5 mb-md-0">
          <div class="service-promotion__icon mb-4">
            <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use /></svg>
          </div>
          <h3 class="service-promotion__title fs-6 text-uppercase">24/7 Customer Support</h3>
          <p class="service-promotion__content text-secondary">Friendly 24/7 customer support</p>
        </div>

        <div class="col-md-4 text-center mb-4 pb-1 mb-md-0">
          <div class="service-promotion__icon mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use /></svg>
          </div>
          <h3 class="service-promotion__title fs-6 text-uppercase">Money Back Guarantee</h3>
          <p class="service-promotion__content text-secondary">We return money within 60 days</p>
        </div>
      </div>
    </section>


  </main>

  <div class="mb-5 pb-xl-5"></div>


  

  



  <div id="scrollTop" class="visually-hidden end-0"></div>

  <div class="page-overlay"></div>
    </div>
  );
}

export default FAQ;
