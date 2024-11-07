import {getDOM} from './getDOM.js';

const btn_logout = getDOM('#btn_logout');

btn_logout.addEventListener('click', ()=>{
    localStorage.removeItem('organizacao')
});