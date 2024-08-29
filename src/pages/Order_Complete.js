

import $ from 'jquery'
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import useState from 'react-usestateref'
import { auth0, deleteLove, getBasketItemAll, getLove, getOrder } from '../https/Api';
import NavBar from '../NavBar';

function Order_Complete() {
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
   
      const storedToken = localStorage.getItem('token1');
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

        const storedToken = localStorage.getItem('token1');
        if(storedToken==null || storedToken==undefined){
          await auth0()
          getBasketItem()
        }else{
          const userId = jwtDecode(storedToken)
          setuserId(userId.id)
          const lov=  await getOrder(userId.id)
          setlove(lov[lov.length-1])
          console.log(lov.length)
          console.log(lov)

        }
   
        }



  return (
    <div className="App">


<main>
    <div class="mb-4 pb-4"></div>
    <section class="shop-checkout container">
      <h2 class="page-title">Order Received</h2>
      <div class="checkout-steps">
        <a href='https://kitchen-glow.com/cart'cursor='pointer' class="checkout-steps__item active">
          <span class="checkout-steps__item-number">01</span>
          <span class="checkout-steps__item-title">
            <span>Shopping Bag</span>
            <em>Manage Your Items List</em>
          </span>
        </a>
        <a href='https://kitchen-glow.com/cart'cursor='pointer' class="checkout-steps__item active">
          <span class="checkout-steps__item-number">02</span>
          <span class="checkout-steps__item-title">
            <span>Shipping and Checkout</span>
            <em>Checkout Your Items List</em>
          </span>
        </a>
        <a href='https://kitchen-glow.com/cart' cursor='pointer' class="checkout-steps__item active">
          <span class="checkout-steps__item-number">03</span>
          <span class="checkout-steps__item-title">
            <span>Confirmation</span>
            <em>Review And Submit Your Order</em>
          </span>
        </a>
      </div>
      <div class="order-complete">
        <div class="order-complete__message">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#B9A16B"/>
            <path d="M52.9743 35.7612C52.9743 35.3426 52.8069 34.9241 52.5056 34.6228L50.2288 32.346C49.9275 32.0446 49.5089 31.8772 49.0904 31.8772C48.6719 31.8772 48.2533 32.0446 47.952 32.346L36.9699 43.3449L32.048 38.4062C31.7467 38.1049 31.3281 37.9375 30.9096 37.9375C30.4911 37.9375 30.0725 38.1049 29.7712 38.4062L27.4944 40.683C27.1931 40.9844 27.0257 41.4029 27.0257 41.8214C27.0257 42.24 27.1931 42.6585 27.4944 42.9598L33.5547 49.0201L35.8315 51.2969C36.1328 51.5982 36.5513 51.7656 36.9699 51.7656C37.3884 51.7656 37.8069 51.5982 38.1083 51.2969L40.385 49.0201L52.5056 36.8996C52.8069 36.5982 52.9743 36.1797 52.9743 35.7612Z" fill="white"/>
          </svg>
          <h3>Your order is completed!</h3>
          <p>Thank you. Your order has been received.</p>
        </div>
        <div class="order-info">
          <div class="order-info__item">
            <label>Order Number</label>
            <span>#245{setloveRef?.current?.id}</span>
          </div>
        
          <div class="order-info__item">
            <label>Total</label>
            <span>${setloveRef?.current?.price}</span>
          </div>

        </div>
        <div class="checkout__totals-wrapper">
          <div class="checkout__totals">
            <h3>Order Details</h3>
            <table class="checkout-cart-items">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                </tr>
              </thead>
              {setloveRef?.current?.Order_Item?.map(
                item=>
                  <tbody>
                <tr>
                  <td>
                    {item.name} x {item.qauantity}
                  </td>

                </tr>

              </tbody>
              )}

            </table>
            <table class="checkout-totals">
              <tbody>

                <tr>
                  <th>SHIPPING</th>
                  <td>Free shipping</td>
                </tr>

                <tr>
                  <th>TOTAL</th>
                  <td>${setloveRef?.current?.price}</td>
                </tr>
              </tbody>
            </table>
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

export default Order_Complete;
