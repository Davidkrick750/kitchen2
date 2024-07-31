import { useEffect } from 'react';
import useState from 'react-usestateref'
import { check, createbasketitem, deleteBasketItem, getBasketItemAll, getCategoriaAll, getItemOne, get_any_Item, updateOneBasketItemMinus, updateOneBasketItemPlus } from '../https/Api';
import $ from 'jquery'
import { useNavigate, useParams } from 'react-router-dom';
import './css/style.css'
import Swiper from 'swiper/bundle';
import { jwtDecode } from "jwt-decode";
// import styles bundle
import 'swiper/css/bundle';
import './css/App.css'
import { GLAV_ROUTE, SHOPITEM_ROUTE, SHOPShop_cart_ROUTE } from '../utils/consts';
function Shop_item() {
  const navigate = useNavigate()

  const [categoria1,setcategoria1,setcategoria1Ref] = useState(null)
  const [categoria2,setcategoria2,setcategoria2Ref] = useState(null)
  const [categoria3,setcategoria3,setcategoria3Ref] = useState(null)


    const [categoria,setcategoria,setcategoriaRef] = useState(null)
    const [onecategoria,setonecategoria,setonecategoriaRef] = useState(null)
    const [subtot,setsubtot,setsubtotRef] = useState()
    const [ItemsSkidka,setItemsSkidka,setItemsSkidkaRef] = useState()
    const [ItemsSkidka1,setItemsSkidka1,setItemsSkidka1Ref] = useState(null)
    const [userId,setuserId,setuserIdRef] = useState()
    const [basketItem,setbasketItem,setbasketItemRef] = useState(null)
    const {id} = useParams()
    useEffect(()=>{

      if(setcategoria1Ref.current==null){
        setcategoria1('asdsa')
        getBasketItem()
    }

        if(setcategoria2Ref.current==null){
          setcategoria2('asd')
            get_Categoria()
        }
        if(setcategoria3Ref.current==null){
          setcategoria3('dsa')
          get_Items_skidka()

      }
    })
    const closes = async() => {
      $('.aside').removeClass('aside_visible')
      $('body').removeClass('overflow-hidden')
      }

      const getBasketItem = async() => {
   
        const storedToken = localStorage.getItem('token');
        const userId = jwtDecode(storedToken)
        console.log(userId.id)
        const basketitem = await getBasketItemAll(userId.id)
        let subt = 0
        const subtotal = basketitem.map(item=> subt = subt + (item.price*item.qauantity))
        setsubtot(subt)
        setbasketItem(basketitem)
        console.log(basketitem)
      }
    const check1 = async(id2) => {
      const storedToken = localStorage.getItem('token');
      const userId = jwtDecode(storedToken)
      setuserId(userId.id)
      console.log(userId.id)
      console.log(id2)
      const info = await check(userId.id,id2)
      if(info==null){
       await createbasketitem(userId.id,id2).then(
        setTimeout(() => {
          getBasketItem()
        }, 150)
       )
       
      }else{
        await updateOneBasketItemPlus(info.id).then(
          setTimeout(() => {
            getBasketItem()
          }, 150)
        )
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

        const get_Items_skidka = async() => {
          const any_Item = await get_any_Item()
          setItemsSkidka(any_Item)
          setItemsSkidka1('ss')
          console.log(any_Item)
          
      }
        const get_Categoria = async() => {
          const categoria = await getItemOne(id)
          setcategoria(categoria)
  
   }
      const delete1 = async(is) => {
        await deleteBasketItem(is).then(
          setTimeout(() => {
            getBasketItem()
          }, 150)
        )
      }
 
 

  return (
    <div className="App">


  
  <main class='pdat center'>
    <section class="product-single product-single__type-6 container">
      <div class="row">
        <div class="col-lg-7">
          <div class="mb-md-1 pb-md-3"></div>
          <div class="product-single__media" data-media-type="list-image">
          <div class="product-single__image d-flex flex-row gap-2 w100b paddi bobo">
       
       {    
       setcategoriaRef?.current==null?
      
              
       <div class="product-single__image-item w100b">
                
       <div loading="lazy" class="h700 w500 w100b bgcolor h-auto"  alt="">
       <div class="cube">
 <div class="side"></div>
 <div class="side"></div>
 <div class="side"></div>
 <div class="side"></div>
 <div class="side"></div>
 <div class="side"></div>
 </div>
       </div>
     </div>
          

:

                
     
    
              setcategoriaRef?.current?.Item_photo.map(item=>
                
              
              <img loading="lazy" class="h-auto w500" src={item.photo}  alt=""/>
            
              )
              
              }
            </div>
            
            


            
          </div>
        </div>
        <div class="col-lg-5">
          <div class="sticky-content">
            <div class="mb-md-1 pb-md-3"></div>
            <div class="d-flex justify-content-between mb-4 pb-md-2">
              <div class=" text_al_s breadcrumb mb-0 d-none d-md-block flex-grow-1">
                <a     class="menu-link menu-link_us-s text-uppercase fw-medium">Home</a>
                <span class="breadcrumb-separator menu-link fw-medium ps-1 pe-1">/</span>
                <a     class="menu-link menu-link_us-s text-uppercase fw-medium">The Shop</a>
              </div>
              <div class="product-single__prev-next d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                <a href='http://5.35.94.133:3000/' class="text-uppercase fw-medium"><svg class="mb-1px" width="10" height="10" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg"><use     /></svg><span class="menu-link menu-link_us-s">HOME</span></a>
                <a href='http://5.35.94.133:3000/cart'  class="text-uppercase fw-medium"><span class="menu-link menu-link_us-s">BASKET</span><svg class="mb-1px" width="10" height="10" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg"><use /></svg></a>
              </div>
            </div>
            <h1 class="product-single__name text_al_s" >{setcategoriaRef?.current?.name}</h1>
               
  
{ 
setcategoriaRef?.current==null?
<div class="product-card__price d-flex align-items-center  mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

:

<></> 
}
{ 
setcategoriaRef?.current==null?
<div class="product-card__price d-flex align-items-center  mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

:

<></> 
}
{ 
setcategoriaRef?.current==null?
<div class="product-card__price d-flex align-items-center  mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

:

<></> 
}
            <div class="product-single__rating">

              
            </div>
            <div class="product-single__price text_al_s">
    

              {setcategoriaRef?.current?.skidka==0?
              
              <span class="current-price">${setcategoriaRef?.current?.price}</span>
              :
              <div class="product-single__price">
                
              <span class="old-price">${(setcategoriaRef?.current?.price/((100-setcategoriaRef?.current?.skidka)/100)).toFixed(0)}</span>
              <span class="special-price">${setcategoriaRef?.current?.price}</span>
            </div>
              }
            
            
            </div>
  
            <div class="product-single__short-desc text_al_s">
            <a  class="menu-link menu-link_us-s add-to-wishlist"><span>SHORT INFO </span></a>
            { 
setcategoriaRef?.current==null?
<div class="product-card__price d-flex align-items-center w60p  mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

:

<></> 
}
              <p>{setcategoriaRef?.current?.description0}</p>
            </div>
            <form name="addtocart-form" method="post">
              {/* <div class="product-single__swatches">
                <div class="product-swatch text-swatches">
                  <label>Sizes</label>
                  <div class="swatch-list">
                    <input type="radio" name="size" id="swatch-1"/>
                    <label class="swatch js-swatch" for="swatch-1" aria-label="Extra Small" data-bs-toggle="tooltip" data-bs-placement="top" title="Extra Small">XS</label>
                    <input type="radio" name="size" id="swatch-2" checked/>
                    <label class="swatch js-swatch" for="swatch-2" aria-label="Small" data-bs-toggle="tooltip" data-bs-placement="top" title="Small">S</label>
                    <input type="radio" name="size" id="swatch-3"/>
                    <label class="swatch js-swatch" for="swatch-3" aria-label="Middle" data-bs-toggle="tooltip" data-bs-placement="top" title="Middle">M</label>
                    <input type="radio" name="size" id="swatch-4"/>
                    <label class="swatch js-swatch" for="swatch-4" aria-label="Large" data-bs-toggle="tooltip" data-bs-placement="top" title="Large">L</label>
                    <input type="radio" name="size" id="swatch-5"/>
                    <label class="swatch js-swatch" for="swatch-5" aria-label="Extra Large" data-bs-toggle="tooltip" data-bs-placement="top" title="Extra Large">XL</label>
                  </div>
                  <a     class="sizeguide-link" data-bs-toggle="modal" data-bs-target="#sizeGuide">Size Guide</a>
                </div>
                <div class="product-swatch color-swatches">
                  <label>Color</label>
                  <div class="swatch-list">
                    <input type="radio" name="color" id="swatch-11"/>
                    <label class="swatch swatch-color js-swatch" for="swatch-11" aria-label="Black" data-bs-toggle="tooltip" data-bs-placement="top" title="Black" style={{color: "#222"}}></label>
                    <input type="radio" name="color" id="swatch-12" checked/>
                    <label class="swatch swatch-color js-swatch" for="swatch-12" aria-label="Red" data-bs-toggle="tooltip" data-bs-placement="top" title="Red" style={{color: "#C93A3E"}}></label>
                    <input type="radio" name="color" id="swatch-13"/>
                    <label class="swatch swatch-color js-swatch" for="swatch-13" aria-label="Grey" data-bs-toggle="tooltip" data-bs-placement="top" title="Grey" style={{color: "#E4E4E4"}}></label>
                  </div>
                </div>
              </div> */}
              <div class="product-single__addtocart">
                {/* <div class="qty-control position-relative">
                  <input type="number" name="quantity" value="1" min="1" class="qty-control__number text-center"/>
                  <div class="qty-control__reduce">-</div>
                  <div class="qty-control__increase">+</div>
                </div> */}
                <button type="submit" class="btn btn-primary btn-addtocart js-open-aside" onClick={()=>check1(id)} data-aside="cartDrawer">Add to Cart</button>
              </div>
            </form>
            <div class="product-single__addtolinks">
              <a     class="menu-link menu-link_us-s add-to-wishlist"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use     /></svg><span>Add to Wishlist</span></a>
              <share-button class="share-button d-flex">
                <button class="menu-link menu-link_us-s to-share border-0 bg-transparent d-flex align-items-center">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg"><use /></svg>
                  <span>Share</span>
                </button>
                <details id="Details-share-template__main" class="m-1 xl:m-1.5" hidden="">
                  <summary class="btn-solid m-1 xl:m-1.5 pt-3.5 pb-3 px-5">+</summary>
                  <div id="Article-share-template__main" class="share-button__fallback flex items-center absolute top-full left-0 w-full px-2 py-4 bg-container shadow-theme border-t z-10">
                    <div class="field grow mr-4">
                      <label class="field__label sr-only" for="url">Link</label>
                      <input type="text" class="field__input w-full" id="url" value="https://uomo-crystal.myshopify.com/blogs/news/go-to-wellness-tips-for-mental-health" placeholder="Link" onclick="this.select();" readonly=""/>
                    </div>
                    <button class="share-button__copy no-js-hidden">
                      <svg class="icon icon-clipboard inline-block mr-1" width="11" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 11 13">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1a1 1 0 011-1h7a1 1 0 011 1v9a1 1 0 01-1 1V1H2zM1 2a1 1 0 00-1 1v9a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1H1zm0 10V3h7v9H1z" fill="currentColor"></path>
                      </svg>
                      <span class="sr-only">Copy link</span>
                    </button>
                  </div>
                </details>
              </share-button>
              <script src="js/details-disclosure.js" defer="defer"></script>
              <script src="js/share.js" defer="defer"></script>
            </div>
            {/* <div class="product-single__meta-info text_al_s">
              <div class="meta-item">
                <label>SKU:</label>
                <span>N/A</span>
              </div>
              <div class="meta-item">
                <label>Categories:</label>
                <span>Casual & Urban Wear, Jackets, Men</span>
              </div>
              <div class="meta-item">
                <label>Tags:</label>
                <span>biker, black, bomber, leather</span>
              </div>
            </div> */}
            <div id="product_single_details_accordion" class="product-single__details-accordion accordion">
              <div class="accordion-item">
                <h5 class="accordion-header" id="accordion-heading-11">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-1" aria-expanded="true" aria-controls="accordion-collapse-1">
                    Description
                    <svg class="accordion-button__icon" viewBox="0 0 14 14"><g aria-hidden="true" stroke="none" fill-rule="evenodd"><path class="svg-path-vertical" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path><path class="svg-path-horizontal" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path></g></svg>
                  </button>
                </h5>
                <div id="accordion-collapse-1" class="accordion-collapse collapse show" aria-labelledby="accordion-heading-11" data-bs-parent="#product_single_details_accordion">
                  <div class="accordion-body">
                    <div class="product-single__description">
                      <h3 class="block-title mb-4">{setcategoriaRef?.current?.description_title}</h3>
                      <p class="content">{setcategoriaRef?.current?.description_value}</p>
                      {/* <div class="row">
                        <div class="col-lg-6">
                          <h3 class="block-title">Why choose product?</h3>
                          <ul class="list text-list">
                            <li>Creat by cotton fibric with soft and smooth</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ul>
                        </div>
                        <div class="col-lg-6">
                          <h3 class="block-title">Sample Number List</h3>
                          <ol class="list text-list">
                            <li>Create Store-specific attrittbutes on the fly</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ol>
                        </div>
                      </div> */}
                      <h3 class="block-title mb-0">Our company
</h3>
                      <p class="content">We give care to you and your loved ones

 </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h5 class="accordion-header" id="accordion-heading-2">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-2" aria-expanded="false" aria-controls="accordion-collapse-2">
                    Additional Information
                    <svg class="accordion-button__icon" viewBox="0 0 14 14"><g aria-hidden="true" stroke="none" fill-rule="evenodd"><path class="svg-path-vertical" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path><path class="svg-path-horizontal" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path></g></svg>
                  </button>
                </h5>
                <div id="accordion-collapse-2" class="accordion-collapse collapse" aria-labelledby="accordion-heading-2" data-bs-parent="#product_single_details_accordion">
                <div class="accordion-body">
                    <div class="product-single__description">
                      <h3 class="block-title mb-4">{setcategoriaRef?.current?.description_title}</h3>
                      <p class="content">{setcategoriaRef?.current?.dop_info}</p>
                      {/* <div class="row">
                        <div class="col-lg-6">
                          <h3 class="block-title">Why choose product?</h3>
                          <ul class="list text-list">
                            <li>Creat by cotton fibric with soft and smooth</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ul>
                        </div>
                        <div class="col-lg-6">
                          <h3 class="block-title">Sample Number List</h3>
                          <ol class="list text-list">
                            <li>Create Store-specific attrittbutes on the fly</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ol>
                        </div>
                      </div> */}
                      <h3 class="block-title mb-0">Our company
</h3>
                      <p class="content">We give care to you and your loved ones

 </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h5 class="accordion-header" id="accordion-heading-3">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-3" aria-expanded="false" aria-controls="accordion-collapse-3">
 Delivery
                     <svg class="accordion-button__icon" viewBox="0 0 14 14"><g aria-hidden="true" stroke="none" fill-rule="evenodd"><path class="svg-path-vertical" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path><path class="svg-path-horizontal" d="M14,6 L14,8 L0,8 L0,6 L14,6"></path></g></svg>
                  </button>
                </h5>
                <div id="accordion-collapse-3" class="accordion-collapse collapse" aria-labelledby="accordion-heading-3" data-bs-parent="#product_single_details_accordion">
                  {/* <div class="accordion-body">
                    <h2 class="product-single__reviews-title">Reviews</h2>
                    <div class="product-single__reviews-list">
                      <div class="product-single__reviews-item">
                        <div class="customer-avatar">
                          <img loading="lazy" src="../images/avatar.jpg" alt=""/>
                        </div>
                        <div class="customer-review">
                          <div class="customer-name">
                            <h6>Janice Miller</h6>
                            <div class="reviews-group d-flex">
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                            </div>
                          </div>
                          <div class="review-date">April 06, 2023</div>
                          <div class="review-text">
                            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est…</p>
                          </div>
                        </div>
                      </div>
                      <div class="product-single__reviews-item">
                        <div class="customer-avatar">
                          <img loading="lazy" src="../images/avatar.jpg" alt=""/>
                        </div>
                        <div class="customer-review">
                          <div class="customer-name">
                            <h6>Benjam Porter</h6>
                            <div class="reviews-group d-flex">
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                              <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star" /></svg>
                            </div>
                          </div>
                          <div class="review-date">April 06, 2023</div>
                          <div class="review-text">
                            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est…</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-single__review-form">
                      <form name="customer-review-form">
                        <h5>Be the first to review “Message Cotton T-Shirt”</h5>
                        <p>Your email address will not be published. Required fields are marked *</p>
                        <div class="select-star-rating">
                          <label>Your rating *</label>
                          <span class="star-rating">
                            <svg class="star-rating__star-icon" width="12" height="12" fill="#ccc" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z"/>
                            </svg>
                            <svg class="star-rating__star-icon" width="12" height="12" fill="#ccc" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z"/>
                            </svg>
                            <svg class="star-rating__star-icon" width="12" height="12" fill="#ccc" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z"/>
                            </svg>
                            <svg class="star-rating__star-icon" width="12" height="12" fill="#ccc" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z"/>
                            </svg>
                            <svg class="star-rating__star-icon" width="12" height="12" fill="#ccc" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z"/>
                            </svg>
                          </span>
                          <input type="hidden" id="form-input-rating" value=""/>
                        </div>
                        <div class="mb-4">
                          <textarea id="form-input-review" class="form-control form-control_gray" placeholder="Your Review" cols="30" rows="8"></textarea>
                        </div>
                        <div class="form-label-fixed mb-4">
                          <label for="form-input-name" class="form-label">Name *</label>
                          <input id="form-input-name" class="form-control form-control-md form-control_gray"/>
                        </div>
                        <div class="form-label-fixed mb-4">
                          <label for="form-input-email" class="form-label">Email address *</label>
                          <input id="form-input-email" class="form-control form-control-md form-control_gray"/>
                        </div>
                        <div class="form-check mb-4">
                          <input class="form-check-input form-check-input_fill" type="checkbox" value="" id="remember_checkbox"/>
                          <label class="form-check-label" for="remember_checkbox">
                            Save my name, email, and website in this browser for the next time I comment.
                          </label>
                        </div>
                        <div class="form-action">
                          <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div> */}
                                    <div class="accordion-body">
                    <div class="product-single__description">
                      <h3 class="block-title mb-4">{setcategoriaRef?.current?.description_title}</h3>
                      <p class="content">{setcategoriaRef?.current?.description_value}</p>
                      {/* <div class="row">
                        <div class="col-lg-6">
                          <h3 class="block-title">Why choose product?</h3>
                          <ul class="list text-list">
                            <li>Creat by cotton fibric with soft and smooth</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ul>
                        </div>
                        <div class="col-lg-6">
                          <h3 class="block-title">Sample Number List</h3>
                          <ol class="list text-list">
                            <li>Create Store-specific attrittbutes on the fly</li>
                            <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                            <li>Downloadable/Digital Products, Virtual Products</li>
                          </ol>
                        </div>
                      </div> */}
                      <h3 class="block-title mb-0">Our company
</h3>
                      <p class="content">We give care to you and your loved ones

 </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-single__additional-info">
              <a     data-bs-toggle="modal" data-bs-target="#deliveryModal">Composition and Care</a>
              <a     data-bs-toggle="modal" data-bs-target="#deliveryModal">In-Store Availability</a>
              <a     data-bs-toggle="modal" data-bs-target="#deliveryModal">Delivery and Return</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products-carousel container">
      <h2 class="h3 text-uppercase mb-4 pb-xl-2 mb-xl-4">Related <strong>Products</strong></h2>

      <div id="related_products" class="position-relative">
      <div class=" d_f_w">
        {setItemsSkidkaRef?.current?.map(item=>
          
          <div  class="swiper-slide pd_10 product-card">
            <div class="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
           { item.skidka!=0?
  <div class="pc-labels__right ms-auto">
                <span class="pc-label pc-label_sale d-block text-white">-{item.skidka}%</span>
              </div>:
              <div> </div>
}</div>
           <div class="pc__img-wrapper">
            
             <a href={`http://5.35.94.133:3000/item/${item.id}`}  >
              
               <img loading="lazy" src={item.Item_photo[0]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
               <img loading="lazy" src={item.Item_photo[0]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img pc__img-second"/>
             </a>
             
             <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" onClick={()=>check1(item.id)} title="Add To Cart">Add To Cart</button>
           </div>

           <div class="pc__info position-relative">
             <p class="pc__category">For you</p>
             <h6 class="pc__title"><a >{item.name}</a></h6>
             <div class="product-card__price d-flex">
               <span class="money price">${item.price}</span>
               
             </div>

             <button class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist" title="Add To Wishlist">
               <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use     /></svg>
             </button>
           </div>
         </div>     


          )}
          


          </div>



        <div class="products-pagination mt-4 mb-5 d-flex align-items-center justify-content-center"></div>
  
      </div>

    </section>




  </main>
  <div class="aside aside_right overflow-hidden cart-drawer" id="cartDrawer">
<div class="aside-header d-flex align-items-center">
  <h3 class="text-uppercase fs-6 mb-0">SHOPPING BAG ( <span class="cart-amount js-cart-items-count">1</span> ) </h3>
  <button onClick={closes} class="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
</div>

<div class="aside-content cart-drawer-items-list">


 
{setbasketItemRef?.current?.map(item=>
  <div >
      <div class="cart-drawer-item d-flex position-relative">
    <div class="position-relative">
      <a >
        <img loading="lazy" class="cart-drawer-item__img" src={item.photo} alt=""/>
      </a>
    </div>
    <div class="cart-drawer-item__info flex-grow-1">
      <h6 class="cart-drawer-item__title fw-normal"><a >{item.name}</a></h6>
      <p class="cart-drawer-item__option text-secondary">New Product</p>
      <p class="cart-drawer-item__option text-secondary">{item.description}</p>
   
      <div class="d-flex align-items-center justify-content-between mt-1">
        <div class="qty-control position-relative">
          <input type="number" name="quantity" value={item.qauantity} min="1" class="qty-control__number border-0 text-center"/>
          <div onClick={()=>minus(item)} class="qty-control__reduce text-start">-</div>
          <div onClick={()=>plus(item)} class="qty-control__increase text-end">+</div>
        </div>
        <span class="cart-drawer-item__price money price">${item.price*item.qauantity}</span>
      </div>
    </div>

    <button onClick={()=>delete1(item.id)} class="btn-close-xs position-absolute top-0 end-0 js-cart-item-remove"></button>
  </div>

  <hr class="cart-drawer-divider"/>
 </div>
  )}


</div>

<div class="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
  <hr class="cart-drawer-divider"/>
  <div class="d-flex justify-content-between">
    <h6 class="fs-base fw-medium">SUBTOTAL:</h6>
    <span class="cart-subtotal fw-medium">${setsubtotRef?.current}</span>
  </div>
  <a href="http://5.35.94.133:3000/cart" class="btn btn-light mt-3 d-block">View Cart</a>
  <a href="http://5.35.94.133:3000/checkout" class="btn btn-primary mt-3 d-block">Checkout</a>
</div>
</div>
  <div class="mb-5 pb-xl-5"></div>
  


 
  <div class="page-overlay"></div>

    </div>
  );
}

export default Shop_item;
