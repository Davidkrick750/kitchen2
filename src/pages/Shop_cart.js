import { jwtDecode } from "jwt-decode"
import { check, createbasketitem,getBasketItemAll, deleteBasketItem, updateOneBasketItemMinus, updateOneBasketItemPlus, auth0 } from "../https/Api"
import useState from 'react-usestateref'
import { useEffect } from "react"
import $ from 'jquery'
import { SHOPITEM_ROUTE, SHOPShop_checkout_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"
import NavBar from '../NavBar';


function Shop_cart() {

  const [basketItem,setbasketItem,setbasketItemRef] = useState(null)
  const [skidka,setskidka,setskidkaRef] = useState(0)
  const [subtot,setsubtot,setsubtotRef] = useState()
  const [itemdel,setitemdel,setitemdelRef] = useState()

  const [subtot1,setsubtot1,setsubtot1Ref] = useState()

  const [skoka,setskoka,setskokaRef] = useState(0)


  const navigate = useNavigate()
  useEffect(()=>{

    if(setbasketItemRef.current==null){
      getBasketItem()
    }
  })
  const closes = async() => {
    $('.aside').removeClass('aside_visible')
    $('body').removeClass('overflow-hidden')
    }
    const delete1 = async(is) => {
      try{
        if(is!=setitemdelRef.current){
          setitemdel(is)
          await deleteBasketItem(is).then(
            setTimeout(() => {
              getBasketItem()
            }, 150)
          )
        }
      
      }catch{
console.log('sda')
      }
      
      }
  const getBasketItem = async() => {
   
    const storedToken = localStorage.getItem('token2');
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
  
      subt1 = subt1.toFixed(2)
      subt = subt.toFixed(2)
      setsubtot(subt1)
      setsubtot1(subt)
      setbasketItem(basketitem)
      console.log(basketitem)
    }

  }

  const plus = async(is) => {
await updateOneBasketItemPlus(is.id).then(
setTimeout(() => {
  getBasketItem()
}, 150)
)

    }
    const minus = async(is) => {
      console.log(is.qauantity==1)
      if(is.qauantity==1){
        await deleteBasketItem(is.id).then(
          setTimeout(() => {
            getBasketItem()
          }, 150)
        )
       
      }else{
        await updateOneBasketItemMinus(is.id).then(
          setTimeout(() => {
            getBasketItem()
          }, 150)
        )
      
      }
     
    
      }
  return (
    <div className="App">
          <NavBar skoka={setskokaRef?.current}/>


<main>
    <div class="mb-4 pb-4"></div>
    <section class="shop-checkout container">
      <h2 class="page-title">Cart</h2>
      <div class="checkout-steps">
        <a class="checkout-steps__item active">
          <span class="checkout-steps__item-number">01</span>
          <span class="checkout-steps__item-title">
            <span>Shopping Bag</span>
            <em>Manage Your Items List</em>
          </span>
        </a>
        <a  href='https://kitchen-glow.com/checkout'  class="checkout-steps__item">
          <span class="checkout-steps__item-number">02</span>
          <span class="checkout-steps__item-title">
            <span>Shipping and Checkout</span>
            <em>Checkout Your Items List</em>
          </span>
        </a>
        <a  href='https://kitchen-glow.com/checkout'    class="checkout-steps__item">
          <span class="checkout-steps__item-number">03</span>
          <span class="checkout-steps__item-title">
            <span>Confirmation</span>
            <em>Review And Submit Your Order</em>
          </span>
        </a>
      </div>
      <div class="shopping-cart">
        <div class="cart-table__wrapper">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
{setbasketItemRef?.current?.map(item=>
  <tr>
  <td>
    <div class="shopping-cart__product-item">
      <a href={`https://kitchen-glow.com/item/${item.ItemId}`} >
        <img loading="lazy" class='img_cs' src={item.photo} width="120" height="200" alt=""/>
      </a>
    </div>
  </td>

  <td>
    <div class="shopping-cart__product-item__detail">
      <h4><a  >{item.name}</a></h4>
      <ul class="shopping-cart__product-item__options">
      {/* <li>New Product</li> */}
        {/* <li>{item.description}</li> */}
        
      </ul>
    </div>
  </td>

  <td>
  <div class="product-single__price mb_0">


    {item.skidka==0?
              
              <span class="current-price">${item.price}</span>
              :
              <div class="product-single__price">
                
              <span class="old-price">${item.price}</span>
              <span class="old-price_1 padd1"> ${(item.price*((100-item.skidka)/100)).toFixed(2)}</span>
            </div>
              }


    </div>

  </td>
  <td>
    <div class="qty-control position-relative">
      <input type="number" name="quantity" value={item.qauantity} min="1" class="qty-control__number text-center"/>
      <div onClick={()=>minus(item)} class="qty-control__reduce">-</div>
      <div onClick={()=>plus(item)} class="qty-control__increase">+</div>
    </div> 
  </td>
  <td>
    <span class="shopping-cart__subtotal padd1">${((item.price*((100-item.skidka)/100))*item.qauantity).toFixed(2)}</span>
  </td>
  <td>
    {/* <a onClick={()=>delete1(item.id)} class="remove-cart">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="#767676" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z"/>
        <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z"/>
      </svg>                  
    </a> */}
  </td>
</tr>
  
  )}
            
            </tbody>
          </table>
          <div class="cart-table-footer">
            <form  class="position-relative bg-body">
              <input class="form-control" type="text" name="coupon_code" placeholder="Coupon Code"/>
              <input class="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4" type="submit" value="APPLY COUPON"/>
            </form>
            <button class="btn btn-light">UPDATE CART</button>
          </div>
        </div>
        <div class="shopping-cart__totals-wrapper">
          <div class="sticky-content">
            <div class="shopping-cart__totals">
              <h3>Cart Totals</h3>
              <table class="cart-totals">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>${setsubtotRef?.current}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>
                      <div class="form-check">
                        <input class="form-check-input form-check-input_fill" type="checkbox" value="" id="free_shipping"/>
                        <label class="form-check-label" for="free_shipping">Free shipping</label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label color_inac" for="flat_rate">14 Days</label>
                      </div>
                      <div class="form-check">
                        
                        <label class="form-check-label color_inac" for="local_pickup">All Europ</label>
                      </div>
                      <div>We have a large network of <br/> partners for free shipping</div>
                      {/* <div>
                        <a href="shop_cart.html#" class="menu-link menu-link_us-s">CHANGE ADDRESS</a>
                      </div> */}
                    </td>
                  </tr>
                  <tr>
                    <th>DISCOUNT</th>
                    <td>-${(setsubtotRef?.current-setsubtot1Ref?.current).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>${setsubtot1Ref?.current}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mobile_fixed-btn_wrapper">
              <div class="button-wrapper container">
                <a href='https://kitchen-glow.com/checkout'  class="btn btn-primary btn-checkout">PROCEED TO CHECKOUT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div class="aside aside_right overflow-hidden cart-drawer" id="cartDrawer">
<div class="aside-header d-flex align-items-center">
  <h3 class="text-uppercase fs-6 mb-0">SHOPPING BAG ( <span class="cart-amount js-cart-items-count">1</span> ) </h3>
  <button onClick={closes} class="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
</div>

<div class=" cart-drawer-items-list" style={{maxHeight:'auto'}}>


 
{setbasketItemRef?.current?.map(item=>
  <div class='cart-drawer-item '>
      <div class="cart-drawer-item d-flex position-relative">
    <div class="position-relative">
      <a >
        <img loading="lazy" class="cart-drawer-item__img" src={item.photo} alt=""/>
      </a>
    </div>
    <div class="cart-drawer-item__info flex-grow-1" style={{maxHeight:'auto'}}>
      <h6 class="cart-drawer-item__title fw-normal"><a >{item.name}</a></h6>
      {/* <p class="cart-drawer-item__option text-secondary">New Product</p> */}
      {/* <p class="cart-drawer-item__option text-secondary">{item.description}</p> */}
   
      <div class="d-flex align-items-center justify-content-between mt-1">
        <div class="qty-control position-relative">
          <input type="number" name="quantity" value={item.qauantity} min="1" class="qty-control__number border-0 text-center"/>
          <div onClick={()=>minus(item)} class="qty-control__reduce text-start">-</div>
          <div onClick={()=>plus(item)} class="qty-control__increase text-end">+</div>
        </div>
        {item.skidka==0?
              
              <span class="current-price">${item.price*item.qauantity}</span>
              :
              <div class="product-single__price">
                
              <span class="old-price">${item.price*item.qauantity}</span>
              <span class="old-price_1 padd1"> ${((item.price*((100-item.skidka)/100))*item.qauantity).toFixed(2)}</span>
            </div>
              }
      </div>
    </div>

    <div onClick={()=>delete1(item.id)} class="dpfd" style={{cursor:'pointer',fontSize:'17px'}}>x</div>
  </div>

  <hr class="cart-drawer-divider"/>
 </div>
  )}


</div>

<div class="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
  
  <hr class="cart-drawer-divider"/>
  <div class="d-flex justify-content-between">
    <h6 class="fs-base fw-medium">SUBTOTAL:</h6>
    <span class="cart-subtotal fw-medium">${(setsubtotRef?.current*1).toFixed(2)}</span>
  </div>
  <a href="https://kitchen-glow.com/cart" class="btn btn-light mt-3 d-block">View Cart</a>
  <a href="https://kitchen-glow.com/checkout" class="btn btn-primary mt-3 d-block">Checkout</a>
</div>
</div>
  <div class="mb-5 pb-xl-5"></div>
  




  <div id="scrollTop" class="visually-hidden end-0"></div>

  <div class="page-overlay"></div>
    </div>
  );
}

export default Shop_cart;
