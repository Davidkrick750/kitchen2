import { useEffect } from 'react';
import useState from 'react-usestateref'
import { auth0, deleteBasketItem, getBasketItemAll, getCategoriaAll, get_any_Item, updateOneBasketItemMinus, updateOneBasketItemPlus } from '../https/Api';
import { SHOPITEM_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import photo1 from './images/1.jpeg';
import photo2 from './images/2.jpeg';
import photo3 from './images/3.jpeg';
import photo4 from './images/4.jpeg';
import photo5 from './images/5.jpeg';
import photo6 from './images/9.jpeg';
import photo7 from './images/10.jpeg';
import photo8 from './images/7.jpeg';
import NavBar from '../NavBar';


import $ from 'jquery'
function GlavPages() {

  const [categoria1,setcategoria1,setcategoria1Ref] = useState(null)

  const [categoria2,setcategoria2,setcategoria2Ref] = useState(null)

  const [categoria3,setcategoria3,setcategoria3Ref] = useState(null)
  const [skoka,setskoka,setskokaRef] = useState(0)




    const [categoria,setcategoria,setcategoriaRef] = useState(null)
    const [ItemsSkidka,setItemsSkidka,setItemsSkidkaRef] = useState(null)

    const [onecategoria,setonecategoria,setonecategoriaRef] = useState(null)
    const [onecategoria1,setonecategoria1,setonecategoria1Ref] = useState(null)

    
    const [basketItem,setbasketItem,setbasketItemRef] = useState(null)
    const [subtot,setsubtot,setsubtotRef] = useState()
    useEffect(()=>{
        if(setcategoria1Ref.current==null){
          setcategoria1('sd')
            get_Categoria()
        }
        if(setcategoria2Ref.current==null){
          setcategoria2('asd')
            get_Items_skidka()
        }
    })
    const delete1 = async(is) => {
        await deleteBasketItem(is).then(
          setTimeout(() => {
            getBasketItem()
          }, 150)
        )
      }
    useEffect(()=>{

        if(setcategoria3Ref.current==null){
          setcategoria3('dasa')
            getBasketItem()
        }
    
    })


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
          const subtotal = basketitem.map(item=> subt = subt + (item.price*item.qauantity*((100-item.skidka)/100)))
          let skok = 0
          const skok1 = basketitem.map(item=> skok = Number(skok) + Number(item.qauantity))
          setskoka(skok)
  
          setsubtot(subt)
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
    const navigate = useNavigate()

    const get_Categoria = async() => {
           const categoria = await getCategoriaAll()
           setcategoria(categoria)
           const any_Item = await get_any_Item()
           setonecategoria(any_Item)
           const any_Item1 = await get_any_Item()
           setonecategoria1(any_Item1)
           console.log(categoria[0].Item)
           console.log(categoria)
    }
    const get_Items_skidka = async() => {
        const any_Item = await get_any_Item()
        setItemsSkidka(any_Item)
        console.log(any_Item)
    }

    const closes = async() => {
        $('.aside').removeClass('aside_visible')
        $('body').removeClass('overflow-hidden')
        }

  return (
    <div className="App">

<NavBar skoka={setskokaRef?.current}/>


  <main>
  {/* <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={photo6} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={photo6} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={photo6} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Предыдущий</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Следующий</span>
  </button>
</div> */}
    <section class="swiper-container js-swiper-slider slideshow full-width_padding-20 slideshow-md"
      data-settings='{
        "autoplay": {
          "delay": 5000
        },
        "slidesPerView": 1,
        "effect": "fade",
        "loop": true,
        "pagination": {
          "el": ".slideshow-pagination",
          "type": "bullets",
          "clickable": true
        }
      }'>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="overflow-hidden position-relative h-100">
            <div class="slideshow-bg">
              <img class='h100_' loading="lazy" src={photo5}/>
            </div>
            <div class="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6 class="text_dash text-uppercase fs-base fw-medium animate animate_fade animate_btt animate_delay-3">TRENDING 2024</h6>
              <h2 class="text-uppercase h1 fw-normal mb-0 animate animate_fade animate_btt animate_delay-5">Sex toys for you</h2>
              <p class="animate animate_fade animate_btt animate_delay-6">We have a sale of toys to strengthen the family<br/>Love each other
</p>
              <a href="http://localhost:3000/store/New_Sale" class="btn-link btn-link_sm default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-7">Buy Now</a>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="overflow-hidden position-relative h-100">
            <div class="slideshow-bg">
            <img class='h100_' loading="lazy" src={photo6}/>
            </div>
            <div class="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6 class="text_dash text-uppercase fs-base fw-medium animate animate_fade animate_btt animate_delay-3">TRENDING 2024</h6>
              <h2 class="text-uppercase h1 fw-normal mb-0 animate animate_fade animate_btt animate_delay-5">Bondage </h2>
              <p class="animate animate_fade animate_btt animate_delay-6">Discover tie-and-tease play with our huge range of bondage gear. Whether you're a bondage beginner or a Shibari expert, we have a full range of <br/>BDSM toys and accessories, from handcuffs and restraints, to spankers, ticklers and floggers.</p>
              <a href="http://localhost:3000/store/Bondage" class="btn-link btn-link_sm default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-7">Buy Now</a>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="overflow-hidden position-relative h-100">
            <div class="slideshow-bg">
            <img class='h100_' loading="lazy" src={photo7}/>
            </div>
            <div class="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6 class="text_dash text-uppercase fs-base fw-medium animate animate_fade animate_btt animate_delay-3">TRENDING 2024</h6>
              <h2 class="text-uppercase h1 fw-normal mb-0 animate animate_fade animate_btt animate_delay-5">Vibrators</h2>
              <p class="animate animate_fade animate_btt animate_delay-6">On your own or with a partner, a vibrator makes it so much easier to reach orgasm. 
<br/>Browse our collection of best-selling sex toys for women and read customer reviews to help you pick the best women's vibrator.</p>
              <a href="http://localhost:3000/store/Vibrators" class="btn-link btn-link_sm default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-7">Buy Now</a>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="overflow-hidden position-relative h-100">
            <div class="slideshow-bg">
            <img class='h100_' loading="lazy" src={photo8}/>
            </div>
            <div class="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6 class="text_dash text-uppercase fs-base fw-medium animate animate_fade animate_btt animate_delay-3">TRENDING 2023</h6>
              <h2 class="text-uppercase h1 fw-normal mb-0 animate animate_fade animate_btt animate_delay-5">Discounts up to 50%</h2>
              <p class="animate animate_fade animate_btt animate_delay-6">Discounts of up to 50% on vibrators, dildos and sex toys<br/></p>
              <a href="http://localhost:3000/store/New_Sale" class="btn-link btn-link_sm default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-7">Buy Now</a>
            </div>
          </div>
        </div>
      </div>

      <div class="slideshow-pagination position-left-center"></div>
      
    </section>

    <div class="mb-3 pb-1"></div>


    {/* <section class="collections-grid collections-grid_masonry gutters-20">
      <div class="h-md-100 full-width_padding-20">
        <div class="row h-md-100">
          <div class="col-lg-5 h-md-100">
            <div class="collection-grid__item position-relative h-md-100">
              <div class="background-img bg_image bg_image"></div>
              <div class="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                <h3 class="text-uppercase mb-0">Furniture</h3>
                <p class="mb-3">954 Products</p>
                <a    class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
              </div>
            </div>
          </div>

          <div class="col-lg-7 d-flex flex-column">
            <div class="position-relative flex-grow-1">
              <div class="row h-md-100">
                <div class="col-md-6 h-md-100">
                  <div class="collection-grid__item h-md-100 position-relative">
                    <div class="background-img bg_image" ></div>
                    <div class="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                      <h3 class="text-uppercase mb-0">Clocks</h3>
                      <p class="mb-3">710 Products</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 h-md-100">
                  <div class="collection-grid__item h-md-100 position-relative">
                    <div class="background-img"></div>
                    <div class="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                      <h3 class="text-uppercase mb-0">Accessories</h3>
                      <p class="mb-3">954 Products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="position-relative flex-grow-1 mt-lg-3 pt-lg-1">
              <div class="row h-md-100">
                <div class="col-md-6 h-md-100">
                  <div class="collection-grid__item h-md-100 position-relative">
                    <div class="background-img"></div>
                    <div class="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                      <h3 class="text-uppercase mb-0">Lighting</h3>
                      <p class="mb-3">184 Products</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 h-md-100">
                  <div class="collection-grid__item h-md-100 position-relative">
                    <div class="background-img" ></div>
                    <div class="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                      <h3 class="text-uppercase mb-0">Toys</h3>
                      <p class="mb-3">245 Products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
{/* <div class='mers'>
  
</div> */}

    <div class="mb-1 pb-4 mb-xl-5 pb-xl-5"></div>
  
      <section class="category-banner container">
      <h2 class="section-title text-center mb-3 pb-xl-3 mb-xl-4">Category</h2>



  {      setcategoriaRef?.current==null?
        <div class="row">
        <div class="col-md-4">
                <div class="category-banner__item border-radius-10 mb-5">
                  <div loading="lazy"  class="bgcolor he515 of_cover"  width="680" height="515" alt="">
                  <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                  </div>
                  <div class="category-banner__item-mark">
                    Starting at 
                  </div>
                  <div class="category-banner__item-content">
                    <h3 class="mb-0"></h3>
                    <a class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
                  </div>
                </div>
                <div class="pb-2"></div>
              </div>
              <div class="col-md-4">
                <div class="category-banner__item border-radius-10 mb-5">
                  <div loading="lazy"  class="bgcolor he515 of_cover"  width="680" height="515" alt="">
                  <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                  </div>
                  <div class="category-banner__item-mark">
                    Starting at 
                  </div>
                  <div class="category-banner__item-content">
                    <h3 class="mb-0"></h3>
                    <a class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
                  </div>
                </div>
                <div class="pb-2"></div>
              </div>
              <div class="col-md-4">
                <div class="category-banner__item border-radius-10 mb-5">
                  <div loading="lazy"  class="bgcolor he515 of_cover"  width="680" height="515" alt="">
                  <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                  </div>
                  <div class="category-banner__item-mark">
                    Starting at 
                  </div>
                  <div class="category-banner__item-content">
                    <h3 class="mb-0"></h3>
                    <a class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
                  </div>
                </div>
                <div class="pb-2"></div>
              </div>
              <div class="col-md-4">
                <div class="category-banner__item border-radius-10 mb-5">
                  <div loading="lazy"  class="bgcolor he515 of_cover"  width="680" height="515" alt="">
                  <div class="cube">
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
<div class="side"></div>
</div>
                  </div>
                  <div class="category-banner__item-mark">
                    Starting at 
                  </div>
                  <div class="category-banner__item-content">
                    <h3 class="mb-0"></h3>
                    <a class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
                  </div>
                </div>
                <div class="pb-2"></div>
              </div>
        </div>
:
<div class="row">


            {setcategoriaRef?.current?.map(item=>
                
                <div class="col-md-4">
                <div class="category-banner__item border-radius-10 mb-5">
                  <a href={`http://localhost:3000/store/${item.name}`}>
                  <img loading="lazy"  class="of_cover" src={item?.photo} width="680" height="515" alt={item.name} title={item.name}/>
                  </a>
                  <div class="category-banner__item-mark">
                    Starting at {item.nach_price}
                  </div>
                  <div class="category-banner__item-content">
                    <h3 class="mb-0">{item.name}</h3>
                    <a href={`http://localhost:3000/store/${item.name}`} class="btn-link default-underline text-uppercase fw-medium">Shop Now</a>
                  </div>
                </div>
                <div class="pb-2"></div>
              </div>

                )}

</div>

}

  
      
      </section>
      <section class="hot-deals container margin-bottom">
        <h2 class="section-title text-center mb-3 pb-xl-3 mb-xl-4">Hot Deals</h2>
        <div class="row">
          <div class="col-md-6 col-lg-4 col-xl-20per d-flex align-items-center flex-column justify-content-center py-4 align-items-md-start">
            <h2>Summer Sale</h2>
            <h2 class="fw-bold">Up to 50% Off</h2>

       

            <a href="http://localhost:3000/store/New_Sale" class="btn-link default-underline text-uppercase fw-medium mt-3">View All</a>
          </div>
          <div class="col-md-6 col-lg-8 col-xl-80per">
            <div class="position-relative">
              <div 
               >
              
                  {
setItemsSkidkaRef?.current==null?
<div class="d_f scrollbar">
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a >
    <div loading="lazy" width="258" height="313" alt="Cropped Faux leather Jacket" class="bgcolor pc__img">
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
</div>

<div class="pc__info position-relative pc__infocorrect">


  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
</div>
</div>
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a >
    <div loading="lazy" width="258" height="313" alt="Cropped Faux leather Jacket" class="bgcolor pc__img">
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
</div>

<div class="pc__info position-relative pc__infocorrect">


  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
</div>
</div>
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a >
    <div loading="lazy" width="258" height="313" alt="Cropped Faux leather Jacket" class="bgcolor pc__img">
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
</div>

<div class="pc__info position-relative pc__infocorrect">


  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
</div>
</div>
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a >
    <div loading="lazy" width="258" height="313" alt="Cropped Faux leather Jacket" class="bgcolor pc__img">
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
</div>

<div class="pc__info position-relative pc__infocorrect">


  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
</div>
</div>
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a >
    <div loading="lazy" width="258" height="313" alt="Cropped Faux leather Jacket" class="bgcolor pc__img">
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
</div>

<div class="pc__info position-relative pc__infocorrect">


  <div class="product-card__price d-flex align-items-center w80p ">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
 <div class="product-card__price d-flex align-items-center w60p mt10px">
   
   <span class="money price text-secondary bgcolor width20"></span>
 </div>
</div>
</div>
</div>
:
<div class="d_f scrollbar">
{setItemsSkidkaRef?.current?.map(item=>
<div class="mr_15 swiper-slide product-card product-card_style3">
<div class="pc__img-wrapper">
  <a   href={`http://localhost:3000/item/${item.id}`}  >
    <img loading="lazy" title={item.name} alt={item.name}src={item.Item_photo[0]?.photo} width="258" height="313" class="pc__img"/>
    <img loading="lazy" title={item.name} alt={item.name} src={item.Item_photo[1]?.photo} width="258" height="313"  class="pc__img pc__img-second"/>
  </a>
</div>

<div class="pc__info position-relative">
  <h6 class="pc__title"><a  >{item.name}</a></h6>
  <div class="product-card__price d-flex align-items-center">
    <span class="money price-old">${item.price}</span>
    <span class="money price text-secondary">${(item.price*((100-item.skidka)/100)).toFixed(2)}</span>
  </div>

  {/* <div class="anim_appear-bottom position-absolute bottom-0 start-25 d-none d-sm-flex align-items-center bg-body">
    <a href={`http://localhost:3000/${item.id}`} class="btn-link btn-link_lg  text-uppercase fw-medium  " title="Go To Cart">Go To Cart</a>


  </div> */}
</div>
</div>

)}
</div>         }
             


                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="image-banner mt_50px">
      <div class="background-img img_back_" ></div>
      
      <div class="image-banner__content container py-3">
        <h2 class="text-white fw-bold">Male Toys</h2>
        <p class="text-white mb-4">New Collection Male Toys</p>
        <a href='http://localhost:3000/store/Male_Toys' class="btn btn-outline-primary border-0 fs-base text-uppercase fw-medium btn-55 d-inline-flex align-items-center">
          <span class="text_dash_half">Shop Now</span>
        </a>
      </div>
    </section>
    <section class="products-carousel container mt_50px">
      <h2 class="section-title text-center fw-normal text-uppercase mb-1 mb-md-3 pb-xl-3">Best Selling Products</h2>

 

      <div class="tab-content pt-2" id="collections-tab-content">
        <div class="tab-pane fade show active" id="collections-tab-1" role="tabpanel" aria-labelledby="collections-tab-1-trigger">
{
setonecategoriaRef?.current==null?
        <div class="row">
 

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
              

               
                </div>
              </div>
            </div> 


        </div>

:

          <div class="row">
          {setonecategoriaRef?.current?.map(item=>
            <div class="col-6 col-md-4 col-lg-3">
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div class="pc__img-wrapper">
                  <a href={`http://localhost:3000/item/${item.id}`} >
                    <img loading="lazy"alt={item.name} title={item.name} src={item.Item_photo[0]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                    <img loading="lazy" alt={item.name} title={item.name} src={item.Item_photo[1]?.photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img pc__img-second"/>
                  </a>
                  <a  href={`http://localhost:3000/item/${item.id}`} class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium" title="Add To Cart">Go To Cart</a>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category">{item.id%2? 'For you':'New' }</p>
                  <h6 class="pc__title"><a  >{item.name}</a></h6>
                  <div class="product-card__price d-flex">
                  <span class="money price-old">${item.price}</span>
    <span class="money price text-secondary">${(item.price*((100-item.skidka)/100)).toFixed(2)}</span>
                  </div>
                  {/* <div class="product-card__review d-flex align-items-center">
                    <div class="reviews-group d-flex">
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                      <svg class="review-star" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><use href="#icon_star"></use></svg>
                    </div>
                    <span class="reviews-note text-lowercase text-secondary ms-1">8k+ reviews</span>
                  </div> */}

                  <button class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist" title="Add To Wishlist">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use    ></use></svg>
                  </button>
                </div>
              </div>
            </div>      
           
            )}

            </div>
           
           }
          <div class="text-center mt-2">
            <a class="btn-link btn-link_lg default-underline text-uppercase fw-medium"   >See All Products</a>
          </div>
        </div>  
      </div>
    </section>

    {/* <div class="mb-5 pb-4"></div> */}
    
      

    {/* <section class="lookbook-products position-relative d-none d-md-block">
      <img class="w-100 h-auto" loading="lazy" src="./images/home/demo9/lookbook-bg.jpg" width="1903" height="709" alt=""/>
      <h2 class="section-title position-absolute position-top-center fw-normal text-center" style={{top: "13.3%"}}>LIVING ROOM FURNITURE<br/><span class="h2 fw-normal">Discount 50%</span></h2>
      <button class="popover-point type2 position-absolute" style={{left: "11%", top: "10%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "11%", top: "55%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left:"8%", top: "75%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left:"49%", top: "66%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="top" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "67%", top: "50%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "88%", top: "79%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
    </section> */}

    <section class="lookbook-products position-relative d-block d-md-none">
      <img class="w-100 h-auto" loading="lazy" src="./images/home/demo9/lookbook-bg-mobile.jpg" width="575" height="390" alt=""/>
      <h2 class="section-title position-absolute position-top-center fw-normal text-center" style={{top: "13.3%"}}>LIVING ROOM FURNITURE<br/><span class="h2 fw-normal">Discount 50%</span></h2>
      <button class="popover-point type2 position-absolute" style={{left: "7%", top: "35%;"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "7%" ,top: "65%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "7%", top: "75%;"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "49%", top: "74%;"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="top" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "69%", top: "59%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
      <button class="popover-point type2 position-absolute" style={{left: "92%", top: "78%"}} data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left" data-bs-content='
        <div class="popover-product">
          <a  >
            <img loading="lazy" class="mb-3" src="./images/home/demo9/product-10.jpg" alt=""/>
          </a>
          <p class="fw-medium mb-0"><a  >Cableknit Shawl</a></p>
          <p class="mb-0">$129</p>
        </div>
      '><span>+</span></button>
    </section>

    <div class="pt-1 pb-5 mt-4 mt-xl-5"></div>

 


    {/* <section class="brands-carousel container">
      <h2 class="d-none">Brands</h2>
      <div class="position-relative">
        <div class="swiper-container js-swiper-slider"
          data-settings='{
            "autoplay": {
              "delay": 5000
            },
            "slidesPerView": 7,
            "slidesPerGroup": 7,
            "effect": "none",
            "loop": true,
            "breakpoints": {
              "320": {
                "slidesPerView": 2,
                "slidesPerGroup": 2,
                "spaceBetween": 14
              },
              "768": {
                "slidesPerView": 4,
                "slidesPerGroup": 4,
                "spaceBetween": 24
              },
              "992": {
                "slidesPerView": 7,
                "slidesPerGroup": 1,
                "spaceBetween": 30,
                "pagination": false
              }
            }
          }'>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand1.png" width="120" height="20" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand2.png" width="87" height="20" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand3.png" width="132" height="22" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand4.png" width="72" height="21" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand5.png" width="123" height="31" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand6.png" width="137" height="22" alt=""/>
            </div>
            <div class="swiper-slide">
              <img loading="lazy" src="./images/brands/brand7.png" width="94" height="21" alt=""/>
            </div>
          </div>
        </div>
      </div>

    </section> */}

    
    <section class="instagram px-1 position-relative full-width_padding-20">
    <h2 class="section-title text-center fw-normal text-uppercase mb-1 mb-md-3 pb-xl-3">Love is our style</h2>

      <h2 class="d-none">Instagram</h2>
      <div class="row row-cols-2 row-cols-md-4 row-cols-xl-6">

{
  setonecategoria1Ref?.current?.map(item=>

    <div class="instagram__tile">
          <a href={`http://localhost:3000/item/${item.id}`} target="_blank" class="position-relative overflow-hidden d-block effect overlay-plus">
            <img loading="lazy" class="instagram__img" src={item.Item_photo[0]?.photo} width="232" height="232" alt="Insta image 20"/>
          </a>
    </div>
    
  )
}
     

        
      </div>

    </section>

    <div class="mb-4 mb-xl-5"></div>

    <div class="service-promotion horizontal container">
      <div class="row">
        <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-center justify-content-center gap-3">
          <div class="service-promotion__icon">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use /></svg>
          </div>
          <div class="service-promotion__content-wrap">
            <h3 class="service-promotion__title h6 text-uppercase mb-1">Fast And Free Delivery</h3>
            <p class="service-promotion__content text-secondary mb-0">Free delivery for all orders over $140</p>
          </div>
        </div>

        <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-center justify-content-center gap-3">
          <div class="service-promotion__icon">
            <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use  /></svg>
          </div>
          <div class="service-promotion__content-wrap">
            <h3 class="service-promotion__title h6 text-uppercase mb-1">24/7 Customer Support</h3>
            <p class="service-promotion__content text-secondary mb-0">Friendly 24/7 customer support</p>
          </div>
        </div>

        <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-center justify-content-center gap-3">
          <div class="service-promotion__icon">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><use  /></svg>
          </div>
          <div class="service-promotion__content-wrap">
            <h3 class="service-promotion__title h6 text-uppercase mb-1">Money Back Guarantee</h3>
            <p class="service-promotion__content text-secondary mb-0">We return money within 30 days</p>
          </div>
        </div>
      </div>  
    </div>

    <div class="mb-3 mb-xl-5"></div>
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
        <span class="money price price-old">${item.price*item.qauantity}</span><span class="cart-drawer-item__price money price">${ (item.price*item.qauantity*((100-item.skidka)/100)).toFixed(2)}</span>
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
    <span class="cart-subtotal fw-medium">${(setsubtotRef?.current*1).toFixed(2)}</span>
  </div>
  <a href="http://localhost:3000/cart" class="btn btn-light mt-3 d-block">View Cart</a>
  <a href="http://localhost:3000/checkout" class="btn btn-primary mt-3 d-block">Checkout</a>
</div>
</div>

    </div>
  );
}

export default GlavPages;
