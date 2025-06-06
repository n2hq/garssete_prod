import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{H as v}from"./HomeNav-pNK20H2x.js";import{L as f,r as t}from"./components-kAvIA9Ge.js";import{h as b,B as N,a as k,E as S,c as R,F as y,d as B,M as E}from"./index-DJALgUKR.js";import{U as T,H as _}from"./Hamburger-UUmUluoj.js";import{M as H,C as z}from"./MobileNav-B6yFQves.js";import{S as C,G as M,R as q}from"./Recents-BdKpmAEd.js";import{R as F}from"./index-BYowRYso.js";import{F as L}from"./LatestStarRating-CLZUNxkI.js";const D=()=>e.jsx(f,{to:"/",children:e.jsx("div",{className:`font-[900] text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] `,children:b()})}),G=()=>{const[a]=t.useState(1),[l,h]=t.useState(""),[n,i]=t.useState(!1),[r,o]=t.useState(!1),[m,j]=t.useState(!1),p=()=>o(!0),u=()=>o(!1);return t.useEffect(()=>{const x=()=>{window.scrollY>=a&&i(!0),window.scrollY<a&&i(!1)};window.onscroll=()=>x()},[a]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${n&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-3
        flex place-content-between h-full`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl w-[100px]
           `,children:e.jsx(D,{})}),e.jsx("div",{className:`hidden place-items-center
                     lg:flex  w-full`,children:e.jsx(f,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center ",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(T,{theme:"dark"}),e.jsx(_,{theme:"dark",openNav:p,navBg:m})]})})]})}),e.jsx(H,{showNav:r,closeNav:u})]})},d=[{img:"https://spotlightthe.me/supercharged/wp-content/uploads/sites/18/demo-image-00013.jpg"},{img:"https://smartmag.theme-sphere.com/rtl/wp-content/uploads/sites/34/2022/11/Depositphotos_410258952_XL-1.jpg"},{img:"https://smartmag.theme-sphere.com/news/wp-content/uploads/sites/11/2021/02/daniel-korpai-seLBnDRB6_M-unsplash-1-scaled.jpg"},{img:"https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/3.jpg"},{img:"https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/2.jpg"},{img:"https://smartmag.theme-sphere.com/trendy/wp-content/uploads/sites/5/2017/01/shutterstock_275843885.jpg"},{img:"https://smartmag.theme-sphere.com/trendy/wp-content/uploads/sites/5/2017/01/shutterstock_362198879.jpg"},{img:"https://smartmag.theme-sphere.com/social-life/wp-content/uploads/sites/17/2021/02/deanna-alys-xQwRvghauaU-unsplash-1.jpg"}],X=()=>{const[a,l]=t.useState(0),h=t.useRef(0);t.useRef(0);const[n,i]=t.useState(null);let r=t.useRef(null);const o=s=>{h.current=s.touches[0].clientX},m=s=>{const c=s.changedTouches[0].clientX,w=h.current-c;w>50?l(g=>(g+1)%d.length):w<-50&&l(g=>(g-1+d.length)%d.length)};t.useEffect(()=>{i(d)},[]);const j=()=>{l(s=>s===0?n.length-1:s-1)},p=()=>{l(s=>s===n.length-1?0:s+1)},u=async()=>{r.current&&clearTimeout(r.current),p(),r.current=setTimeout(()=>{},15e3)},x=async()=>{r.current&&clearTimeout(r.current),j(),r.current=setTimeout(()=>{},15e3)};return t.useEffect(()=>{},[n]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-screen flex 
          overflow-hidden  bg-black z-[20]
          `,children:n==null?void 0:n.map((s,c)=>e.jsx("div",{onClick:()=>{alert("hello")},className:`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative z-[20]
                                        duration-1000 cursor-pointer`,onTouchStart:o,onTouchEnd:m,style:{transform:`translateX(-${a*100}%)`},children:e.jsx("img",{src:s.img,alt:"",className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `},c)},c))}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:x,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `,children:e.jsx(N,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:u,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `,children:e.jsx(k,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:` absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`,children:e.jsxs("div",{className:` 
          max-w-[800px] mx-auto w-full z-[100]`,children:[e.jsx("div",{className:`text-center text-5xl text-white
                            font-extralight mb-[0px] tracking-wide`,children:"Find The Best Businesses"}),e.jsx("div",{className:`text-center text-lg text-white
                            font-extralight mb-[20px]`,children:"Across Different Industries Around the World"}),e.jsx(C,{})]})})]})})},A=[{title:"Restaurants",link:"/web/search?q=restaurant",icon:e.jsx(F,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(z,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(M,{})},{title:"Entertainment",link:"/web/search?q=entertainment",icon:e.jsx(S,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(R,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(y,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(B,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(E,{})}],I=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:A.map((a,l)=>e.jsx("div",{children:e.jsx(f,{to:`${a.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:a.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:a.title})]})})},l))})]})}),V=()=>[{title:"Grüthe | Business Directory, Travel, Real Estate, Hotels & Restaurants!"},{name:"Gr<i>ü</i>the",content:"Welcome to Grüthe!"}],Z=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(v,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(G,{})}),e.jsx("div",{className:"",children:e.jsx(X,{})}),e.jsx(q,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx(I,{}),e.jsx(L,{})]});export{Z as default,V as meta};
