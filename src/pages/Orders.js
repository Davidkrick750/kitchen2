
import $ from 'jquery'
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import useState from 'react-usestateref'
import { auth0, deleteLove, getBasketItemAll, getLove, getOrder } from '../https/Api';
import NavBar from '../NavBar';

function Orders() {
    const [userId,setuserId,setuserIdRef] = useState(null)
    const [love,setlove,setloveRef] = useState(null)

    useEffect(()=>{

if(setloveRef.current==null){
    gel()
}
if(setskokaRef?.current==null){
  getBasketItem()
}
    })
    const getBasketItem = async() => {
   
      const storedToken = localStorage.getItem('token');
      if(storedToken==null || storedToken==undefined){
        await auth0()
        gel()
      }else{
        const userId = jwtDecode(storedToken)
        const basketitem = await getBasketItemAll(userId.id)
        let skok = 0
        const skok1 = basketitem.map(item=> skok = Number(skok) + Number(item.qauantity))
        setskoka(skok)
      }
  
    }
    const [skoka,setskoka,setskokaRef] = useState(null)


    const gel = async() => {

        const storedToken = localStorage.getItem('token');
        if(storedToken==null || storedToken==undefined){
          await auth0()
          getBasketItem()
        }else{
          const userId = jwtDecode(storedToken)
          setuserId(userId.id)
          const lov=  await getOrder(userId.id)
          setlove(lov)
          console.log(lov)
        }
   
        }



    return (
      <div className="App">


<NavBar skoka={setskokaRef?.current}/>


  <main>
    <div class="mb-4 pb-4"></div>
    <section class="my-account container">
      <h2 class="page-title">You Orders</h2>
      <div class="row">
        <div class="col-lg-3">
          <ul class="account-nav">
            <li><a href="https://wet-love.com:3000/order" class="menu-link menu-link_us-s menu-link_active">Orders</a></li>
            <li><a href="https://wet-love.com:3000/account" class="menu-link menu-link_us-s">Wishlist</a></li>
            <li><a href="https://wet-love.com:3000/store/New_Sale" class="menu-link menu-link_us-s">Shop</a></li>
          </ul>
        </div>
        <div class="col-lg-9">
          <div class="page-content my-account__wishlist">
            {/* <div class="products-grid row row-cols-2 row-cols-lg-3" id="products-grid" >
              <div class="product-card-wrapper">


                <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                {setloveRef?.current?.map(item=>
<div>
                  <div class="pc__img-wrapper">
                    <div class="swiper-container background-img js-swiper-slider" data-settings='{"resizeObserver": true}'>

    
    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <img loading="lazy" src={item.Item.Item_photo[0].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                        </div>
                        <div class="swiper-slide">
                          <img loading="lazy" src={item.Item.Item_photo[1].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                        </div>

                      </div>

                      

                    </div>
                    <button class="btn-remove-from-wishlist">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_close" /></svg>
                    </button>
                  </div>
      
                  <div class="pc__info position-relative">
                    <p class="pc__category">Dresses</p>
                    <h6 class="pc__title">{item.Item.name}</h6>
                   {
                      item.skidka!=0?
                      <div class="product-card__price d-flex">
                      <span class="money price price-old">${item.price}</span>
                      <span class="money price price-sale">${(item.price*((100-item.skidka)/100)).toFixed(2)}</span>
                    </div>
                    :
                    <div class="product-card__price d-flex">
                    <span class="money price ">${item.price}</span>
                  </div>
                    }
      
                    <button class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist" title="Add To Wishlist">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_heart" /></svg>
                    </button>
                  </div>
                  </div>
                  )}
                </div>

              

              </div>
      
            
            </div> */}
    
      <div class="page-content my-account__orders-list">
            <table class="orders-table">
            <div class='d_clex bt_d'>

                  <div class='d_clex_tr'>Order</div>
                  <div class='d_clex_tr'>Date</div>
                  <div class='d_clex_tr'>Status</div>
                  <div class='d_clex_tr'>Total</div>
                  <div class='d_clex_tr'>Actions</div>
                  </div>

              {setloveRef?.current?.map(item=>
              <>
              <div class='d_clex '>
                  
                  <div class='d_clex_tr'>#245{item.id}</div>
                  <div class='d_clex_tr'>24.04.2024</div>
                  <div class='d_clex_tr'>{'in delivery'}</div>
                  <div class='d_clex_tr'>{(item.price*1).toFixed(2)}</div>

                  <a href='mailto:david.krick750@gmail.com'class='d_clex_tr'> <button class="btn btn-primary">Help</button></a>

                  
               </div>
               <div class='d_clex_1 cfd'>
               {item.Order_Item.map(item=>
                <div class='img_dd'>

<img src={item.photo}/>
<div class='text_f'>
  {item.name}
  </div>
</div>
               )}
               </div>
 <div class='d_clex_1'>
 <div class='d_clex_text'>
Phone: {item.Phone}
</div>
<div class='d_clex_text'>
Mail: {item.Mail}
</div>
<div class='d_clex_text'>
Recipient: {`${item.Name} ${item.Familia}`}
</div>

<div class='d_clex_text'>
Adress: {item.adres}
</div>
<div class='d_clex_text'>
Delivery: 14 days
</div>

 </div>
 </>
                )}
             
              
               
            </table>
          </div>
          </div>
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
  
  export default Orders;
  