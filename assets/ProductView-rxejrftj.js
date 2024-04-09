import{a as N}from"./axios-G2rPRu76.js";import{x as J,y as Q,u as Y,g as r,v as O,_ as F,o as p,c as h,a as e,z as R,A as q,B as D,F as j,n as B,C as Z,k as ee,l as te,h as se,r as $,b as T,w as S,t as y,D as oe,j as I,d as A,q as H,s as W}from"./index-ohqgGuf3.js";import{u as ne}from"./cartStore-YMo2lCEf.js";import{u as ie}from"./toastMessage-uDqwkeVl.js";import{_ as ae}from"./ToastMessages-QedIlyRF.js";import{P as le,N as re,S as ce,a as de}from"./pagination-xibOlTES.js";import{M as ue,K as me}from"./mousewheel-9fONNRjz.js";import{_ as pe}from"./loading-bneA9sLj.js";function _e(o){return J()?(Q(o),!0):!1}function z(o){return typeof o=="function"?o():Y(o)}const fe=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const ve=Object.prototype.toString,ge=o=>ve.call(o)==="[object Object]",he=()=>{};function G(o){var n;const v=z(o);return(n=v==null?void 0:v.$el)!=null?n:v}const U=fe?window:void 0;function V(...o){let n,v,t,u;if(typeof o[0]=="string"||Array.isArray(o[0])?([v,t,u]=o,n=U):[n,v,t,u]=o,!n)return he;Array.isArray(v)||(v=[v]),Array.isArray(t)||(t=[t]);const c=[],_=()=>{c.forEach(l=>l()),c.length=0},b=(l,i,s,f)=>(l.addEventListener(i,s,f),()=>l.removeEventListener(i,s,f)),m=O(()=>[G(n),z(u)],([l,i])=>{if(_(),!l)return;const s=ge(i)?{...i}:i;c.push(...v.flatMap(f=>t.map(w=>b(l,f,w,s))))},{immediate:!0,flush:"post"}),g=()=>{m(),_()};return _e(g),g}const be={page:o=>[o.pageX,o.pageY],client:o=>[o.clientX,o.clientY],screen:o=>[o.screenX,o.screenY],movement:o=>o instanceof Touch?null:[o.movementX,o.movementY]};function ye(o={}){const{type:n="page",touch:v=!0,resetOnTouchEnds:t=!1,initialValue:u={x:0,y:0},window:c=U,target:_=c,scroll:b=!0,eventFilter:m}=o;let g=null;const l=r(u.x),i=r(u.y),s=r(null),f=typeof n=="function"?n:be[n],w=a=>{const d=f(a);g=a,d&&([l.value,i.value]=d,s.value="mouse")},x=a=>{if(a.touches.length>0){const d=f(a.touches[0]);d&&([l.value,i.value]=d,s.value="touch")}},k=()=>{if(!g||!c)return;const a=f(g);g instanceof MouseEvent&&a&&(l.value=a[0]+c.scrollX,i.value=a[1]+c.scrollY)},P=()=>{l.value=u.x,i.value=u.y},L=m?a=>m(()=>w(a),{}):a=>w(a),E=m?a=>m(()=>x(a),{}):a=>x(a),C=m?()=>m(()=>k(),{}):()=>k();if(_){const a={passive:!0};V(_,["mousemove","dragover"],L,a),v&&n!=="movement"&&(V(_,["touchstart","touchmove"],E,a),t&&V(_,"touchend",P,a)),b&&n==="page"&&V(c,"scroll",C,{passive:!0})}return{x:l,y:i,sourceType:s}}function we(o,n={}){const{handleOutside:v=!0,window:t=U}=n,u=n.type||"page",{x:c,y:_,sourceType:b}=ye(n),m=r(o??(t==null?void 0:t.document.body)),g=r(0),l=r(0),i=r(0),s=r(0),f=r(0),w=r(0),x=r(!0);let k=()=>{};return t&&(k=O([m,c,_],()=>{const P=G(m);if(!P)return;const{left:L,top:E,width:C,height:a}=P.getBoundingClientRect();i.value=L+(u==="page"?t.pageXOffset:0),s.value=E+(u==="page"?t.pageYOffset:0),f.value=a,w.value=C;const d=c.value-i.value,M=_.value-s.value;x.value=C===0||a===0||d<0||M<0||d>C||M>a,(v||!x.value)&&(g.value=d,l.value=M)},{immediate:!0}),V(document,"mouseleave",()=>{x.value=!0})),{x:c,y:_,sourceType:b,elementX:g,elementY:l,elementPositionX:i,elementPositionY:s,elementHeight:f,elementWidth:w,isOutside:x,stop:k}}const xe={class:"goods-image flex-column d-flex p-0"},ke=["src"],Ce={class:"small d-flex px-0 m-0"},Te=["onMouseenter"],Se=["src"],Me={__name:"ImageComponentView",props:{imageList:{type:Array,default:()=>[]}},setup(o){const n=r(0),v=i=>{n.value=i},t=r(null),{elementX:u,elementY:c,isOutside:_}=we(t),b=r(0),m=r(0),g=r(0),l=r(0);return O([u,c,_],()=>{_.value||(u.value>125&&u.value<325&&(b.value=u.value-125),c.value>125&&c.value<325&&(m.value=c.value-125),u.value<125&&(b.value=0),u.value>325&&(b.value=225),c.value<125&&(m.value=0),c.value>325&&(m.value=225),g.value=-b.value*2,l.value=-m.value*2)}),(i,s)=>(p(),h("div",xe,[e("div",{class:"middle",ref_key:"target",ref:t},[e("img",{src:o.imageList[n.value],class:"img-fluid object-fit-cover w-100",alt:""},null,8,ke),R(e("div",{class:"layer",style:D({left:`${b.value}px`,top:`${m.value}px`})},null,4),[[q,!Y(_)]])],512),e("ul",Ce,[(p(!0),h(j,null,B(o.imageList,(f,w)=>(p(),h("li",{class:Z(["list-unstyled p-0 me-2",{active:w===n.value}]),key:w,onMouseenter:x=>v(w)},[e("img",{src:f,class:"img-fluid object-fit-cover w-100 h-100",alt:""},null,8,Se)],42,Te))),128))]),R(e("div",{class:"large",style:D([{backgroundImage:`url(${o.imageList[n.value]})`,backgroundPositionX:`${g.value}px`,backgroundPositionY:`${l.value}px`}])},null,4),[[q,!Y(_)]])]))}},Pe=F(Me,[["__scopeId","data-v-006988ee"]]);var $e={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"rubby-api",BASE_URL:"/week8/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const Le={setup(){const{VITE_APP_URL:o,VITE_APP_PATH:n}=$e,v=ee(),t=te(),u=ne(),{getCart:c}=u,_=ie(),{pushMessage:b}=_,m=r(t.params.productId),g=r([]),l=r({loadingItem:""}),i=r(!1),s=r({}),f=r([]),w=r(1),x=r(t.params),k=()=>{i.value=!0,N.get(`${o}/api/${n}/product/${x.value.id}`).then(d=>{s.value=d.data.product,f.value=d.data.product.imagesUrl,i.value=!1})},P=()=>{i.value=!0,N.get(`${o}/api/${n}/products`).then(d=>{g.value=d.data.products,i.value=!1}).catch(d=>{alert(d.response.data.message),i.value=!1})},L=d=>{x.value=d,v.push(`/product/${d.id}`).then(()=>{window.scrollTo(0,0)}),k()},E=r(["時尚配件","休閒娛樂","生活用品"]),C=()=>{const{category:d=""}=t.query,M=`${o}/api/${n}/products?category=${d}`;i.value=!0,N.get(M).then(X=>{s.value=X.data.products,i.value=!1})},a=d=>{l.value.loadingItem=d;const M={product_id:d,qty:w.value},X=`${o}/api/${n}/cart`;N.post(X,{data:M}).then(K=>{l.value.loadingItem="",b({style:"success",title:"加入購物車",content:K.data.message}),c(),window.scrollTo(0,0)})};return O(()=>t.query,()=>{C(),c()}),se(()=>{k(),c(),P()}),{modules:[le,re,ue,me],products:g,openModal:L,addToCart:a,product:s,imagesUrl:f,qty:w,categories:E,getProducts:C,gProduct:x,id:m,status:l,isLoading:i}},components:{Swiper:ce,SwiperSlide:de,ImageComponent:Pe,ToastMessages:ae}},Ee={id:"app"},Ie=e("img",{src:pe,width:"500",alt:"loading",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},null,-1),je={class:"container mt-7"},Ae={"aria-label":"breadcrumb"},Ve={class:"breadcrumb"},Ne={class:"breadcrumb-item",to:"/"},Be={class:"breadcrumb-item"},Oe={class:"breadcrumb-item active","aria-current":"page"},Xe={class:"row mt-5"},Ye={class:"col-lg-6 col-12"},Re={class:"col-lg-6 col-12 d-flex flex-column justify-content-between"},Ue={class:"fs-4 mb-4"},qe={class:"mb-4"},De={key:0,class:"text-gray2 fs-5"},He={key:1,class:"d-flex align-items-center"},We={class:"text-gray2 fs-5"},Fe={class:"text-brown fs-4 ms-3"},ze={class:"mb-5"},Ge=e("div",{class:"fs-6 mb-2"},"商品內容:",-1),Ke={class:"input-group mb-4 w-100"},Je=["disabled"],Qe={class:"d-flex mb-3 justify-content-between"},Ze={class:"d-flex justify-content-center text-brown"},et={class:"d-flex align-items-center justify-content-center btnHover",style:{width:"150px",height:"40px",background:"#ffffff",border:"1px solid #e8b887"}},tt={key:0,class:"spinner-border spinner-border-sm","aria-hidden":"true"},st={class:"d-flex justify-content-center text-brown"},ot={class:"d-flex align-items-center justify-content-center",style:{width:"150px",height:"40px",background:"#ffffff",border:"1px solid #a2672d"}},nt={class:"mt-8"},it=e("div",{class:"fs-6 mb-4"},"商品詳情:",-1),at={style:{"white-space":"pre-wrap"}},lt={class:"list-unstyled mb-3 col-12 col-md-7"},rt=["src"],ct={class:"container mt-8"},dt=e("h3",{class:"text-center text-brown"},[A(" 猜你喜歡 "),e("div",{class:"text-center text-brown m-0 p-0 fs-1"},"-")],-1),ut={id:"swiper"},mt=["onClick"],pt={key:0,class:"position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown rounded-top"},_t=["src"],ft={class:"card-body"},vt={class:"card-title"},gt={key:0,class:"text-gray2 fs-5 card-title text-center"},ht={key:1,class:"d-flex justify-content-center align-items-center card-title ms-2"},bt={class:"text-gray2 fs-5"},yt={class:"text-brown fs-5 ms-3"},wt=e("br",null,null,-1),xt=["onClick"],kt={key:0,class:"spinner-border spinner-border-sm","aria-hidden":"true"},Ct=e("i",{class:"bi bi-cart-plus"},null,-1),Tt=["onClick"],St={key:0,class:"position-absolute top-0 start-0 fw-bold text-white p-2 bg-brown rounded-top"},Mt=["src"],Pt={class:"card-body"},$t={class:"card-title"},Lt={key:0,class:"text-gray2 fs-5 card-title text-center"},Et={key:1,class:"d-flex justify-content-center align-items-center card-title ms-2"},It={class:"text-gray2 fs-5"},jt={class:"text-brown fs-5 ms-3"},At=e("br",null,null,-1),Vt=["onClick"],Nt={key:0,class:"spinner-border spinner-border-sm","aria-hidden":"true"},Bt=e("i",{class:"bi bi-cart-plus"},null,-1);function Ot(o,n,v,t,u,c){const _=$("VueLoading"),b=$("RouterLink"),m=$("ImageComponent"),g=$("swiper-slide"),l=$("swiper"),i=$("ToastMessages");return p(),h(j,null,[e("div",Ee,[T(_,{active:t.isLoading,"is-full-page":!0,"background-color":"#FFF8F1",opacity:1,"z-index":1060},{default:S(()=>[Ie]),_:1},8,["active"]),e("div",je,[e("nav",Ae,[e("ol",Ve,[e("li",Ne,[T(b,{class:"text-black text-decoration-none",to:"/"},{default:S(()=>[A("首頁")]),_:1})]),e("li",Be,[T(b,{class:"text-black text-decoration-none",to:"/products"},{default:S(()=>[A("產品")]),_:1})]),e("li",Oe,y(t.product.category),1)])]),e("div",Xe,[e("div",Ye,[T(m,{imageList:t.imagesUrl,class:"mb-8"},null,8,["imageList"])]),e("div",Re,[e("div",Ue,y(t.product.title),1),e("div",qe,[t.product.price===t.product.origin_price?(p(),h("div",De," $"+y(o.$filters.numberToCurrencyNo(t.product.origin_price)),1)):(p(),h("div",He,[e("del",We,"$"+y(o.$filters.numberToCurrencyNo(t.product.origin_price)),1),e("div",Fe," $"+y(o.$filters.numberToCurrencyNo(t.product.price)),1)]))]),e("div",ze,[Ge,e("div",null,y(t.product.content),1)]),e("div",Ke,[e("button",{type:"button",class:"btn btn-outline-lightBrown",disabled:t.qty===1,onClick:n[0]||(n[0]=s=>t.qty--)}," - ",8,Je),R(e("input",{"onUpdate:modelValue":n[1]||(n[1]=s=>t.qty=s),type:"number",min:"1",max:"20",class:"form-control text-center","aria-label":"Dollar amount (with dot and two decimal places)",readonly:""},null,512),[[oe,t.qty,void 0,{number:!0}]]),e("button",{type:"button",class:"btn btn-outline-lightBrown",onClick:n[2]||(n[2]=s=>t.qty++)}," + ")]),e("div",Qe,[e("div",Ze,[e("div",et,[e("div",{class:"text-center bg-lightBrown text-white m-1",style:{width:"140px",height:"30px","line-height":"30px"},onClick:n[3]||(n[3]=s=>t.addToCart(t.product.id))},[t.product.id===t.status.loadingItem?(p(),h("span",tt)):I("",!0),A(" 加入購物車 ")])])]),e("div",st,[e("div",ot,[T(b,{to:"/cart",class:"text-center bg-brown text-decoration-none text-white m-1",style:{width:"140px",height:"30px","line-height":"30px"},onClick:n[4]||(n[4]=s=>t.addToCart(t.product.id))},{default:S(()=>[A("立即購買 ")]),_:1})])])])])]),e("div",nt,[it,e("div",at,y(t.product.description),1)]),(p(!0),h(j,null,B(t.imagesUrl,s=>(p(),h("div",{class:"mt-5",key:s},[e("li",lt,[e("img",{src:s,class:"w-100",alt:""},null,8,rt)])]))),128))])]),e("div",ct,[dt,e("div",ut,[T(l,{slidesPerView:4,grabCursor:!0,spaceBetween:30,pagination:{clickable:!0},freeMode:!0,modules:t.modules,class:"mySwiper pSwiper",mousewheel:!0,keyboard:!0},{default:S(()=>[(p(!0),h(j,null,B(t.products,s=>(p(),H(g,{key:s.id},{default:S(()=>[e("div",{class:"card shadow-sm bg-body rounded-lg border-0 position-relative mb-5 col-md-12 col-12 p-0",onClick:f=>t.openModal(s)},[s.price!==s.origin_price?(p(),h("span",pt,"SALE")):I("",!0),e("img",{src:s.imageUrl,class:"card-img-top object-fit-cover w-100",style:{height:"300px"},alt:"productPicture"},null,8,_t),e("div",ft,[e("p",vt,y(s.title),1),s.price===s.origin_price?(p(),h("div",gt," $"+y(o.$filters.numberToCurrencyNo(s.origin_price)),1)):(p(),h("div",ht,[e("del",bt,"$"+y(o.$filters.numberToCurrencyNo(s.origin_price)),1),e("div",yt," $"+y(o.$filters.numberToCurrencyNo(s.price)),1)])),wt,e("button",{type:"button",class:"btn btn-outline-brown border-0 fs-5 m-2 position-absolute bottom-0 end-0",onClick:W(f=>t.addToCart(s.id,1),["stop"])},[s.id===t.status.loadingItem?(p(),h("span",kt)):I("",!0),Ct],8,xt)])],8,mt)]),_:2},1024))),128))]),_:1},8,["modules"]),T(l,{spaceBetween:30,pagination:{clickable:!0},modules:t.modules,class:"mySwiper mSwiper"},{default:S(()=>[(p(!0),h(j,null,B(t.products,s=>(p(),H(g,{key:s.id},{default:S(()=>[e("div",{class:"card shadow-sm bg-body rounded-lg border-0 position-relative mb-5 col-md-12 col-12 p-0",onClick:f=>t.openModal(s)},[s.price!==s.origin_price?(p(),h("span",St,"SALE")):I("",!0),e("img",{src:s.imageUrl,class:"card-img-top object-fit-cover w-100",style:{height:"300px"},alt:"productPicture"},null,8,Mt),e("div",Pt,[e("p",$t,y(s.title),1),s.price===s.origin_price?(p(),h("div",Lt," $"+y(o.$filters.numberToCurrencyNo(s.origin_price)),1)):(p(),h("div",Et,[e("del",It,"$"+y(o.$filters.numberToCurrencyNo(s.origin_price)),1),e("div",jt," $"+y(o.$filters.numberToCurrencyNo(s.price)),1)])),At,e("button",{type:"button",class:"btn btn-outline-brown border-0 fs-5 m-2 position-absolute bottom-0 end-0",onClick:W(f=>t.addToCart(s.id,1),["stop"])},[s.id===t.status.loadingItem?(p(),h("span",Nt)):I("",!0),Bt],8,Vt)])],8,Tt)]),_:2},1024))),128))]),_:1},8,["modules"])])]),T(i)],64)}const Ft=F(Le,[["render",Ot]]);export{Ft as default};
