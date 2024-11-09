import {getDOM} from "./getDOM.js";

const header_topo_painel = {
    navBar :getDOM('#navbar_painel'),
    btn_abrirNav : getDOM('#btn_abrirNav'),
    btn_fecharNav : getDOM('#btn_fecharNav')
}


header_topo_painel.btn_abrirNav.addEventListener('click', ()=>{
    header_topo_painel.navBar.style.left="0";
});

header_topo_painel.btn_fecharNav.addEventListener('click',()=>{
    header_topo_painel.navBar.style.left="-100%";
});