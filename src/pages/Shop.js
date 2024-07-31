import { useEffect } from 'react';
import useState from 'react-usestateref'
import { check, createbasketitem, deleteBasketItem, getBasketItemAll, getCategoriaAll, getCategoriaOne, get_any_Item, updateOneBasketItemMinus, updateOneBasketItemPlus } from '../https/Api';
import $ from 'jquery'
import { SHOPITEM_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Shop() {


    const [categoria_info,setcategoria_info,setcategoria_infoRef] = useState(null)
    const [categoria_info1,setcategoria_info1,setcategoria_info1Ref] = useState(null)


    const [categoria,setcategoria,setcategoriaRef] = useState(null)
    const [onecategoria,setonecategoria,setonecategoriaRef] = useState(null)
    const [basketItem,setbasketItem,setbasketItemRef] = useState(null)
    const [userId,setuserId,setuserIdRef] = useState()
    const [ItemsSkidka,setItemsSkidka,setItemsSkidkaRef] = useState(null)
    const [subtot,setsubtot,setsubtotRef] = useState()
    const navigate = useNavigate()
    useEffect(()=>{

      if(setcategoria_infoRef.current==null){
        setcategoria_info('ds')
          get_Categoria()
      }
      if(setcategoria_info1Ref.current==null){
        setcategoria_info1('ds')
        get_Items_skidka()
    }
 
    
 
    })

  const get_Items_skidka = async() => {
      const any_Item = await get_any_Item().then(function(response) {
        setItemsSkidka(response)
        change(response)
        console.log(response)
      })

  }
    const delete1 = async(is) => {
      await deleteBasketItem(is).then(
        setTimeout(() => {
          getBasketItem()
        }, 150)
      )
    }
    const closes = async() => {
      $('.aside').removeClass('aside_visible')
      $('body').removeClass('overflow-hidden')
      }
    useEffect(()=>{

      if(setbasketItemRef.current==null){
        getBasketItem()
    }
  })
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
    const get_Categoria = async() => {
           const categoria = await getCategoriaAll().then(function(response) {
            setcategoria(response)
            console.log(`.get${response[0].id}`)
            console.log(response)

           })

           
          //  setTimeout(() => {
          //   change(categoria[0])
          //  }, 100);
      

    }

    
    const change2 = async(id) => {
      setonecategoria(null)
      $('.menu-link_active').removeClass('menu-link_active')
      $(`.get${id}`).addClass('menu-link_active')
     
      console.log(id)
     const item =  await getCategoriaOne(id)
     setonecategoria(item)

    }
    const change = async(ite2m) => {
     
      if(ite2m.Item==undefined){
        let Item = ite2m

        // setonecategoria(sso)
        function rename() { 
          Item = Item.map(function (obj) {
      
              // Assign new key
              obj['ite2m'] = obj['Item']; 
      
              // Delete old key
              delete obj['ite2m']; 
      
              return obj;
          });
          let Item1 = {Item,'name':'New_Sale'}
          console.log(Item1);
          setonecategoria(Item1)
          $('.menu-link_active').removeClass('menu-link_active')
          $(`.getsale`).addClass('menu-link_active')
      }
     
      rename();
    
      }else{
        setonecategoria(ite2m)
        $('.menu-link_active').removeClass('menu-link_active')
        $(`.get${ite2m.id}`).addClass('menu-link_active')
        console.log(ite2m)
      }


   
    }

  return (
    <div className="App">


  <main>
    <section class="full-width_padding">
      <div class="full-width_border border-2" style={{borderColor: "#eeeeee"}}>
        <div class="shop-banner position-relative ">
          <div class="background-img" style={{backgroundColor: "#eeeeee;"}}>
            <img loading="lazy" src="../images/shop/shop_banner_character1.png" width="1759" height="420" alt="Pattern" class="slideshow-bg__img object-fit-cover"/>
          </div>

          <div class="shop-banner__content container position-absolute start-50 top-50 translate-middle">
            <h2 class="stroke-text h1 smooth-16 text-uppercase fw-bold mb-3 mb-xl-4 mb-xl-5">{setonecategoriaRef?.current?.name?setonecategoriaRef?.current?.name: 'We Lowe You'}</h2>
            <ul class="d-flex flex-wrap list-unstyled text-uppercase h6">
            <li class="me-3 me-xl-4 pe-1" onClick={()=>change(setItemsSkidkaRef.current)}><a  class={`menu-link menu-link_us-s getsale`} >NEW_SALE</a></li>
          
          
            {setcategoriaRef?.current?.map(item=>
       <li class="me-3 me-xl-4 pe-1" onClick={()=>change2(item.id)}><a  class={`menu-link menu-link_us-s get${item.id}`} >{item.name}</a></li>
      )}
            

            </ul>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-4 pb-lg-3"></div>

    <section class="shop-main container">
      <div class="d-flex justify-content-between mb-4 pb-md-2">
        <div class="breadcrumb mb-0 d-none d-md-block flex-grow-1">
          <a     class="menu-link menu-link_us-s text-uppercase fw-medium" >Home</a>
          <span class="breadcrumb-separator menu-link fw-medium ps-1 pe-1">/</span>
          <a     class="menu-link menu-link_us-s text-uppercase fw-medium" >The Shop</a>
        </div>

        <div class="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
          <div class="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0" aria-label="Sort Items" name="total-number">
          <div class="shop-filter d-flex align-items-center order-0 order-md-3">
            <button class="btn-link btn-link_f d-flex align-items-center ps-0 " >
              <svg class="d-inline-block align-middle me-2" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_filter" /></svg>
              <span class="text-uppercase fw-medium d-inline-block align-middle">Choose</span>
            </button>
          </div>

          </div>

          <div class="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

          <div class="col-size align-items-center order-1 d-none d-lg-flex">
            <span class="text-uppercase fw-medium me-2">View</span>
            <button class="btn-link fw-medium me-2 js-cols-size" data-target="products-grid" data-cols="2">2</button>
            <button class="btn-link fw-medium me-2 js-cols-size" data-target="products-grid" data-cols="3">3</button>
            <button class="btn-link fw-medium js-cols-size" data-target="products-grid"  data-cols="4">4</button>
          </div>

          <div class="shop-asc__seprator mx-3 bg-light d-none d-lg-block order-md-1"></div>

          <div class="shop-filter d-flex align-items-center order-0 order-md-3">
            <button class="btn-link btn-link_f d-flex align-items-center ps-0 " >
              <svg class="d-inline-block align-middle me-2" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_filter" /></svg>
              <span class="text-uppercase fw-medium d-inline-block align-middle">Now</span>
            </button>
          </div>
        </div>
      </div>

{
  setonecategoriaRef?.current==null ?
      <div class="products-grid row row-cols-2 row-cols-md-3 row-cols-lg-4" id="products-grid" >
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a  >
                    <div loading="lazy"  width="330" height="400" alt=" Cropped Faux leather Jacket" class="bgcolor pc__img">
                    <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                      
                    </div>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category"></p>
                  <h6 class="pc__title"></h6>
                  <div class="product-card__price d-flex">
               
                  </div>
                  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>

               
                </div>
              </div>
      </div> 
      </div> 

:

      <div class="products-grid row row-cols-2 row-cols-md-3 row-cols-lg-4" id="products-grid" >
      {setonecategoriaRef?.current?.Item.map(item=>
            <div class="col-6 col-md-4 col-lg-3" o>
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a onClick={()=>navigate(SHOPITEM_ROUTE+'/'+item.id)} >
                    <img loading="lazy" src={item.Item_photo[0]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                    <img loading="lazy" src={item.Item_photo[0]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img pc__img-second"/>
                  </a>
                  <button class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside" onClick={()=>check1(item.id)} data-aside="cartDrawer" title="Add To Cart">Add To Cart</button>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category">For You</p>
                  <h6 class="pc__title"><a >{item.name}</a></h6>
                  <div class="product-card__price d-flex">
                <span class="money price price-old">${(item.price/((100-item.skidka)/100)).toFixed(0)}</span>
                <span class="money price price-sale">${item.price}</span>
              </div>
                  <div class="product-card__review d-flex align-items-center">
                    <div class="reviews-group d-flex">
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                    </div>
                    <span class="reviews-note text-lowercase text-secondary ms-1">8k+ reviews</span>
                  </div>

                  <button class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist" title="Add To Wishlist">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use    ></use></svg>
                  </button>
                </div>
                <div class="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">

{ item.skidka!=0?
  <div class="pc-labels__right ms-auto">
                <span class="pc-label pc-label_sale d-block text-white">-{item.skidka}%</span>
              </div>:
              <div> </div>
}
              

            </div>
              </div>
            </div>      
           
            )}

      </div>}

      <p class="mb-1 text-center fw-medium">SHOWING {setonecategoriaRef?.current?.Item.length} of {setonecategoriaRef?.current?.Item.length} items</p>
      <div class="progress progress_uomo mb-3 ms-auto me-auto" style={{width: "300px;"}}>
        <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow={setonecategoriaRef?.current?.Item.length} aria-valuemin="0" aria-valuemax={setonecategoriaRef?.current?.Item.length}></div>
      </div>

      <div class="text-center">
        <a class="btn-link btn-link_lg text-uppercase fw-medium"    >These are all products of the category</a>
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
  <a href="https://it-basepoint.ru/cart" class="btn btn-light mt-3 d-block">View Cart</a>
  <a href="https://it-basepoint.ru/checkout" class="btn btn-primary mt-3 d-block">Checkout</a>
</div>
</div>
  <div class="mb-5 pb-xl-5"></div>


  

  



  <div id="scrollTop" class="visually-hidden end-0"></div>

  <div class="page-overlay"></div>
    </div>
  );
}

export default Shop;
