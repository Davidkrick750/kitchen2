import { jwtDecode } from "jwt-decode";
import { auth0, createOrder, getBasketItemAll } from "../https/Api";
import useState from 'react-usestateref'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SHOPOrder_Complete_ROUTE, SHOPShop_cart_ROUTE } from "../utils/consts";
import $ from 'jquery'
import NavBar from '../NavBar';

function Shop_checkout() {
  const [basketItem,setbasketItem,setbasketItemRef] = useState(null)
  const [skidka,setskidka,setskidkaRef] = useState(0)
  const [subtot,setsubtot,setsubtotRef] = useState()
  const [subtot1,setsubtot1,setsubtot1Ref] = useState()

  const [adres,setadres,setadresRef] = useState()
  const [text,settext,settextRef] = useState()

  const [skoka,setskoka,setskokaRef] = useState(0)

  const navigate = useNavigate()
  const getBasketItem = async() => {
   
    const storedToken = localStorage.getItem('token');
    if(storedToken==null || storedToken==undefined){
      await auth0()
      getBasketItem()
    }else{
      const userId = jwtDecode(storedToken)
      console.log(userId.id)
      const basketitem = await getBasketItemAll(userId.id)
      let subt = 0
      let subt1 = 0
  
      const subtotal = basketitem.map(item=> subt = subt + (item.price*item.qauantity*((100-item.skidka)/100)))
      const subtotal1 = basketitem.map(item=> subt1 = subt1 + (item.price*item.qauantity*((100-item.skidka)/100))/((100-item.skidka)/100))
      let skok = 0
      const skok1 = basketitem.map(item=> skok = Number(skok) + Number(item.qauantity))
      setskoka(skok)
      subt = subt.toFixed(2)
      subt1 = subt1.toFixed(2)
      setsubtot(subt)
      setsubtot1(subt1)
  
      setbasketItem(basketitem)
      console.log(basketitem)
    }
 
  }
  useEffect(()=>{

    if(setbasketItemRef.current==null){
      getBasketItem()
  }

})
const createOrder1 = async() => {
  const storedToken = localStorage.getItem('token');
  const userId = jwtDecode(storedToken)



 const Name =  document.getElementsByClassName('Name')[0].value
 const Familia =  document.getElementsByClassName('Familia')[0].value

 const Region =  document.getElementsByClassName('Region')[0].value
 const Street1 = document.getElementsByClassName('Street1')[0].value
 const Street2 = document.getElementsByClassName('Street2')[0].value
 const City =  document.getElementsByClassName('City')[0].value
 const ZIP =  document.getElementsByClassName('ZIP')[0].value
 const Province =  document.getElementsByClassName('Province')[0].value

 const adr = `${Region} ${Street1} ${Street2} ${City} ${ZIP} ${Province}`
 const Phone =  document.getElementsByClassName('Phone')[0].value
 const Mail =  document.getElementsByClassName('Mail')[0].value
 $('.bcred').removeClass('bcred')
 if(Name=='' ){
  $('.Name').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Familia=='' ){
  $('.Familia').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Region=='' ){
  $('.Region').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Street1=='' ){
  $('.Street1').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Street2=='' ){
  $('.Street2').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(City=='' ){
  $('.City').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(ZIP=='' ){
  $('.ZIP').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Province=='' ){
  $('.Province').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Phone=='' ){
  $('.Phone').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
if(Mail=='' ){
  $('.Mail').addClass('bcred')
  settext('Please fill in all the fields above, it is important for your order')
}
// navigate(SHOPOrder_Complete_ROUTE)
if(Name!=''|| Familia!=''|| Region!=''|| Street1!=''|| Street2!=''|| City!=''|| ZIP!=''|| Province!=''|| Phone!=''|| Mail!=''){
  await createOrder(userId.id,adr,setsubtotRef?.current,Name,Familia,Phone,Mail)
}

}
  return (
    <div className="App">
          <NavBar skoka={setskokaRef?.current}/>

<main>
    <div class="mb-4 pb-4"></div>
    <section class="shop-checkout container">
      <h2 class="page-title">Shipping and Checkout</h2>
      <div class="checkout-steps">
        <a  href='https://wet-love.com:3000/cart'  class="checkout-steps__item active">
          <span class="checkout-steps__item-number">01</span>
          <span class="checkout-steps__item-title">
            <span>Shopping Bag</span>
            <em>Manage Your Items List</em>
          </span>
        </a>
        <a  class="checkout-steps__item active">
          <span class="checkout-steps__item-number">02</span>
          <span class="checkout-steps__item-title">
            <span>Shipping and Checkout</span>
            <em>Checkout Your Items List</em>
          </span>
        </a>
        <a  class="checkout-steps__item">
          <span class="checkout-steps__item-number">03</span>
          <span class="checkout-steps__item-title">
            <span>Confirmation</span>
            <em>Review And Submit Your Order</em>
          </span>
        </a>
      </div>
      <form name="checkout-form" action="shop_order_complete.html">
        <div class="checkout-form">
          <div class="billing-info__wrapper">
            <h4>BILLING DETAILS</h4>
            <div class="row">
              <div class="col-md-6">
                <div class="form-floating my-3">
                  <input type="text" class="Name form-control" id="checkout_first_name" placeholder="First Name"/>
                  <label for="checkout_first_name">First Name</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating my-3">
                  <input type="text" class="Familia form-control" id="checkout_last_name" placeholder="Last Name"/>
                  <label for="checkout_last_name">Last Name</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="text" class="form-control" id="checkout_company_name" placeholder="Company Name (optional)"/>
                  <label for="checkout_company_name">Company Name (optional)</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="search-field my-3">
                  <div class="form-label-fixed hover-container">
                    <label for="search-dropdown" class="form-label">Country / Region*</label>
                    <div class="js-hover__open">
                      <input type="text" class="Region form-control form-control-lg search-field__actor search-field__arrow-down" id="search-dropdown" name="search-keyword" readonly placeholder="Choose a location..."/>
                    </div>
             
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating mt-3 mb-3">
                  <input type="text" class="Street1 form-control" id="checkout_street_address" placeholder="Street Address *"/>
                  <label for="checkout_company_name">Street Address *</label>
                </div>
                <div class="form-floating mt-3 mb-3">
                  <input type="text" class="Street2 form-control" id="checkout_street_address_2"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="text" class="City form-control" id="checkout_city" placeholder="Town / City *"/>
                  <label for="checkout_city">Town / City *</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="text" class="ZIP form-control" id="checkout_zipcode" placeholder="Postcode / ZIP *"/>
                  <label for="checkout_zipcode">Postcode / ZIP *</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="text" class="Province form-control" id="checkout_province" placeholder="Province *"/>
                  <label for="checkout_province">Province *</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="text" class="Phone form-control" id="checkout_phone" placeholder="Phone *"/>
                  <label for="checkout_phone">Phone *</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating my-3">
                  <input type="email" class="Mail form-control" id="checkout_email" placeholder="Your Mail *"/>
                  <label for="checkout_email">Your Mail *</label>
                </div>
              </div>
              <div class="col-md-12">
               
              </div>
            </div>
            <div class="col-md-12">
              <div class="mt-3">
                <textarea class="form-control form-control_gray" placeholder="Order Notes (optional)" cols="30" rows="8"></textarea>
              </div>
            </div>
          </div>
          <div class="checkout__totals-wrapper">
            <div class="sticky-content">
              <div class="checkout__totals">
                <h3>Your Order</h3>
                <table class="checkout-cart-items">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
{setbasketItemRef?.current?.map(item=>
   <tr>
   <td>
     {item.name} x {item.qauantity}
   </td>
   <td>
     ${item.price*item.qauantity}
   </td>
 </tr>
  )}
                   
                  </tbody>
                </table>
                <table class="checkout-totals">
                  <tbody>
                    <tr>
                      <th>SUBTOTAL</th>
                      <td class='padd'>${setsubtot1Ref?.current}</td>
                    </tr>
                    <tr>
                      <th>SHIPPING</th>
                      <td>Free shipping</td>
                    </tr>
                    <tr>
                      <th>DISCOUNT</th>
                      <td>-${(setsubtot1Ref.current-setsubtotRef.current).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>TOTAL</th>
                      <td>${setsubtotRef?.current}</td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
              <div class="checkout__payment-methods">
         
                  <label class="form-check-label" for="checkout_payment_method_4">
                    DELIVERY 14 DAYS
                    <span class="option-detail d-block">
                      Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.
                    </span>
                  </label>
            
              </div>
              <div class="checkout__payment-methods">
                <div class="form-check">
                  <input class="form-check-input form-check-input_fill" type="radio" name="checkout_payment_method" id="checkout_payment_method_1" checked/>
                  <label class="form-check-label" for="checkout_payment_method_1">
                    Visa / MasterCard / Credit Card
                    <span class="option-detail d-block">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference.Your order will not be shipped until the funds have cleared in our account.
                    </span>
                  </label>
                </div>
                {/* <div class="form-check">
                  <input class="form-check-input form-check-input_fill" type="radio" name="checkout_payment_method" id="checkout_payment_method_2"/>
                  <label class="form-check-label" for="checkout_payment_method_2">
                    Check payments
                    <span class="option-detail d-block">
                      Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.
                    </span>
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input form-check-input_fill" type="radio" name="checkout_payment_method" id="checkout_payment_method_3"/>
                  <label class="form-check-label" for="checkout_payment_method_3">
                    Cash on delivery
                    <span class="option-detail d-block">
                      Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.
                    </span>
                  </label>
                </div> */}
            
              </div>
              <div class='text_red'>{settextRef?.current}</div>
              <div onClick={createOrder1} class="btn btn-primary btn-checkout">PLACE ORDER</div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </main>
    </div>
  );
}

export default Shop_checkout;
