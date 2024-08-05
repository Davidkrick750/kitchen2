import { useLocation, useNavigate } from 'react-router-dom';
import { GLAV_ROUTE, SHOPShop_cart_ROUTE, SHOP_ROUTE } from './utils/consts';
import { useEffect } from 'react';
import { auth0 } from './https/Api';
import useState from 'react-usestateref'
import { jwtDecode } from "jwt-decode"
import $ from 'jquery';
function Nav() {
    
const [user,setuser,setuserRef] = useState(null)

const location = useLocation();

const [what,setwhat,setwhatRef] = useState(location)
console.log(location.pathname)

useEffect(()=>{
    if(setuserRef.current==null){
        get()
    }

})



    const get = async() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken){
          console.log('storedToken')
        }else{
          console.log(storedToken)

        }
        if(storedToken==null || storedToken==undefined){
            await auth0()
            
        }else{
          const user = jwtDecode(storedToken)
          setuser(user)
        }
    }
   

        



    const navigate = useNavigate()
        return (
    <div></div>
    );
  }
  
  export default Nav;
  