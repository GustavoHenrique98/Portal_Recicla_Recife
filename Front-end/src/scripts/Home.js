import {getDOM} from "./getDOM.js";

const header_topo = {
    navBar :getDOM('#links_container'),
    btn_openNav : getDOM('#btn_nav'),
    btn_closeNav : getDOM('#btn_fecharNav')
}


header_topo.btn_openNav.addEventListener('click', ()=>{
    header_topo.navBar.style.left="0";
});

header_topo.btn_closeNav.addEventListener('click',()=>{
    header_topo.navBar.style.left="-100%";
});