import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{R as g,F as b,S as w}from"./Footer-DxnYGlO-.js";import{U as j,M as v,G as N}from"./UserMenu-nNvVXzjp.js";import{C as k,F as S}from"./lib-BG3QhE8T.js";import{B as R,a as y,b as B,c as z,d as C}from"./index-CZzcNMWS.js";import{M as q}from"./index-DnjbWNXW.js";import{r as t,L as h}from"./components-Bk2QJ2_x.js";import{R as H}from"./index-DjxDxbeq.js";import{H as E}from"./Hamburger-CAX_gFZ3.js";import{W as F}from"./WhiteLogo-CopYdH_8.js";import"./LatestStarRating-E2npc0jO.js";import"./AuthContext-Dy_OYH0z.js";const V=()=>[{title:"New Remix App"},{name:"description",content:"Welcome to Remix!"}];function Z(){return e.jsxs("div",{children:[e.jsx(M,{}),e.jsx(T,{}),e.jsx(g,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx(G,{}),e.jsx(b,{})]})}const M=()=>{const[r]=t.useState(1),[o,l]=t.useState(""),[m,a]=t.useState(!1),[x,n]=t.useState(!1),[c,u]=t.useState(!1),s=()=>n(!0),i=()=>n(!1);return t.useEffect(()=>{const d=()=>{window.scrollY>=r&&a(!0),window.scrollY<r&&a(!1)};window.onscroll=()=>d()},[r]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${m&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl`,children:e.jsx(F,{})}),e.jsx("div",{className:`hidden place-items-center
          w-full lg:flex`,children:e.jsx(h,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(j,{theme:"dark"}),e.jsx(E,{theme:"dark",openNav:s,navBg:c})]})})]})}),e.jsx(v,{showNav:x,closeNav:i})]})},L=[{img:"images/dubai7star.jpeg"},{img:"https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"},{img:"https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"}],T=()=>{const[r,o]=t.useState(0);t.useRef(0),t.useRef(0);const[l,m]=t.useState(null);let a=t.useRef(null);t.useEffect(()=>{m(L)},[]);const x=()=>{o(s=>s===0?l.length-1:s-1)},n=()=>{o(s=>s===l.length-1?0:s+1)},c=async()=>{a.current&&clearTimeout(a.current),n(),a.current=setTimeout(()=>{c()},15e3)},u=async()=>{a.current&&clearTimeout(a.current),x(),a.current=setTimeout(()=>{n()},15e3)};return t.useEffect(()=>{const s=async i=>{if(i!==null){const d=i.length;for(let p=0;p<d;p++)a=await new Promise(f=>setTimeout(f,15e3)),n(),p==i.length-1&&s(i)}};l&&s(l)},[l]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `,children:l==null?void 0:l.map((s,i)=>e.jsx("img",{src:s.img,alt:"",style:{transform:`translateX(-${r*100}%)`},className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`},i))}),e.jsx("div",{className:`w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:u,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`,children:e.jsx(R,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:c,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`,children:e.jsx(y,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:`z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`,children:e.jsx("div",{className:` 
          max-w-[800px] mx-auto w-full z-[300]`,children:e.jsx(w,{})})})]})})},A=[{title:"Restaurants",link:"/web/search?q=restaurants",icon:e.jsx(H,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(k,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(N,{})},{title:"Active Life",link:"/web/search?q=nightlife",icon:e.jsx(B,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(z,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(S,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(C,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(q,{})}],G=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:A.map((r,o)=>e.jsx("div",{children:e.jsx(h,{to:`${r.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:r.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:r.title})]})})},o))})]})});export{Z as default,V as meta};
