import {getDOM} from "./getDOM.js";

// const header_topo = {
//     header:,
//     
// }




window.addEventListener('load', () => {
    const organizacao = localStorage.getItem('organizacao');
    
    if (organizacao) {
        const header = getDOM('#topo_home');
       
       header.innerHTML = `
        <header id="topo_home">
                <h1 id="logo_reciclaRecife">recicla recife</h1>

                <nav id="links_container">
                    <ul id="links_centro">
                        <li><a href="/">Home</a></li>
                        <li><a href="#secao_sobre">Sobre</a></li>
                        <li><a href="#">Eventos</a></li>
                        <li><a href="/painel">Painel</a></li>
                        
                    </ul>
                    <button id="btn_fecharNav">X</button>
                </nav>

                <button id="btn_nav"><i class="fa-solid fa-bars"></i></button>
        </header>
       
       `
       const navBar = getDOM('#links_container')
       const btn_openNav = getDOM('#btn_nav')
       const btn_closeNav = getDOM('#btn_fecharNav')
       btn_openNav.addEventListener('click', ()=>{
         navBar.style.left="0";
       });
    
       btn_closeNav.addEventListener('click',()=>{
         navBar.style.left="-100%";
       });
    }else{
       const navBar = getDOM('#links_container')
       const btn_openNav = getDOM('#btn_nav')
       const btn_closeNav = getDOM('#btn_fecharNav')
       btn_openNav.addEventListener('click', ()=>{
         navBar.style.left="0";
       });
    
       btn_closeNav.addEventListener('click',()=>{
         navBar.style.left="-100%";
       });
    }
});