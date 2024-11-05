
import {getDOM, getDomAll} from './getDOM.js'

const navLateral = {
    nav : getDOM('#nav_lateral'),
    btn_abrirMenu : getDOM('#btn_menu'),
    btn_fecharMenu : getDOM('#btn_fecharMenu'),
    links:getDomAll('.linksNav'),
    configuracoes:getDOM('#configuracoes'),
    btn_logout:getDOM("#btn_logout")

}
