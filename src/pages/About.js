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
   
    const storedToken = localStorage.getItem('token');
   
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
        <h2 class="page-title">ABOUT Wet-Love</h2>
      </div>
      <div class="about-us__content pb-5 mb-5">
        <p class="mb-5">
          <img loading="lazy" class="w-100 h-auto d-block" src={photo8} width="1410" height="550" alt=""/>
        </p>
        <div class="mw-930">
          <h3 class="mb-4">OUR STORY</h3>
          <p class="fs-6 fw-medium mb-4">We have been developing and producing wonderful sex toys that have been bringing people to a state of euphoria for 10 years. Once upon a time, on the outskirts of Hungary, a small sex toy store was very much liked by the locals and then we decided to expand, realizing the importance of our mission - to bring love into this world, strengthening your families.
          </p>
          <p class="mb-4">We love you and your partners, so we do our job efficiently, taking into account your taste preferences. Thank you for staying with us)
          </p>
          <div class="row mb-3">
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
          </div>
        </div>
        <div class="mw-930 d-lg-flex align-items-lg-center">
          <div class="image-wrapper col-lg-6">
            <img class="h-auto" loading="lazy" src={photo7} width="450" height="500" alt=""/>
          </div>
          <div class="content-wrapper col-lg-6 px-lg-4">
            <h5 class="mb-3">The Toys</h5>
            <p>Article 1301. Liability for violation of the exclusive right to the work. In cases of violation of the exclusive right to a work, the author or other rightholder, along with the use of other applicable methods of protection and liability measures established by the Civil Code of the Russian Federation (Articles 1250, 1252 and 1253), has the right, in accordance with paragraph 3 of Article 1252 of the Civil Code of the Russian Federation, to demand, at his choice, compensation from the violator instead of damages in the amount of ten thousand rubles to five million rubles.            .</p>
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
