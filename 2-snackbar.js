import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s}from"./assets/vendor-BbbuE1sJ.js";const n=document.querySelector('input[name="delay"]'),a=document.querySelector(".btn-snackbar"),f=document.querySelector(".fiedest-radio");let o=!1,i=!1;a.addEventListener("click",u);f.addEventListener("change",c);function c(t){t.target.value==="fulfilled"?(o=!0,i=!1):t.target.value==="rejected"&&(i=!0,o=!1)}function u(t){t.preventDefault();const r=parseInt(n.value)||0;new Promise((e,l)=>{setTimeout(()=>{o?e(`Fulfilled promise in ${r} ms`):i&&l(new Error("Rejected promise due to invalid operation"))},r)}).then(e=>{s.success({timeout:5e3,position:"topRight",title:"Success",titleColor:"#fff",titleSize:"16px",message:e,messageColor:"#fff",backgroundColor:"#59a10d"})}).catch(e=>{s.error({timeout:5e3,position:"topRight",title:"Error",titleColor:"#fff",titleSize:"16px",message:e.message,messageColor:"#fff",backgroundColor:"#ef4040"})}).finally(()=>{n.value=""})}
//# sourceMappingURL=2-snackbar.js.map
