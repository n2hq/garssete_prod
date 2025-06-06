import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{H as u}from"./HomeNav-DD5_BKUD.js";import{L as x,r as t}from"./components-kAvIA9Ge.js";import{h as f,B as g,a as j,E as v,c as w,F as b,d as N,M as k}from"./index-iHLp7q33.js";import{U as S,H as R}from"./Hamburger-DXum3QKC.js";import{M as B,C as z}from"./MobileNav-8pObxhVZ.js";import{S as H,G as y,R as C}from"./Recents-n8F0ICuq.js";import{R as E}from"./index-B2jeJuLl.js";import{F as M}from"./LatestStarRating-BDQ_ObnD.js";const _=()=>e.jsx(x,{to:"/",children:e.jsx("div",{className:`font-[900] text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] `,children:f()})}),q=()=>{const[s]=t.useState(1),[l,n]=t.useState(""),[c,a]=t.useState(!1),[d,i]=t.useState(!1),[o,h]=t.useState(!1),r=()=>i(!0),m=()=>i(!1);return t.useEffect(()=>{const p=()=>{window.scrollY>=s&&a(!0),window.scrollY<s&&a(!1)};window.onscroll=()=>p()},[s]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${c&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-3
        flex place-content-between h-full`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl w-[100px]
           `,children:e.jsx(_,{})}),e.jsx("div",{className:`hidden place-items-center
                     lg:flex  w-full`,children:e.jsx(x,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center ",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(S,{theme:"dark"}),e.jsx(R,{theme:"dark",openNav:r,navBg:o})]})})]})}),e.jsx(B,{showNav:d,closeNav:m})]})},F=[{img:"https://smartmag.theme-sphere.com/rtl/wp-content/uploads/sites/34/2022/11/Depositphotos_410258952_XL-1.jpg"},{img:"https://smartmag.theme-sphere.com/news/wp-content/uploads/sites/11/2021/02/daniel-korpai-seLBnDRB6_M-unsplash-1-scaled.jpg"},{img:"https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/3.jpg"},{img:"https://demo.tagdiv.com/newspaper_free_news_pro/wp-content/uploads/2023/12/2.jpg"}],L=()=>{const[s,l]=t.useState(0);t.useRef(0),t.useRef(0);const[n,c]=t.useState(null);let a=t.useRef(null);t.useEffect(()=>{c(F)},[]);const d=()=>{l(r=>r===0?n.length-1:r-1)},i=()=>{l(r=>r===n.length-1?0:r+1)},o=async()=>{a.current&&clearTimeout(a.current),i(),a.current=setTimeout(()=>{o()},15e3)},h=async()=>{a.current&&clearTimeout(a.current),d(),a.current=setTimeout(()=>{i()},15e3)};return t.useEffect(()=>{},[n]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-screen flex 
          overflow-hidden z-0
          `,children:n==null?void 0:n.map((r,m)=>e.jsx("img",{onClick:()=>{alert("here")},src:r.img,alt:"",style:{transform:`translateX(-${s*100}%)`},className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10]`},m))}),e.jsx("div",{className:`w-full h-[30%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:h,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `,children:e.jsx(g,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:o,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `,children:e.jsx(j,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:`z-[100] absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`,children:e.jsxs("div",{className:` 
          max-w-[800px] mx-auto w-full z-[300]`,children:[e.jsx("div",{className:`text-center text-5xl text-white
                            font-extralight mb-[0px]`,children:"Find The Best Businesses"}),e.jsx("div",{className:`text-center text-lg text-white
                            font-extralight mb-[20px]`,children:"Across Different Industries Around the World"}),e.jsx(H,{})]})})]})})},D=[{title:"Restaurants",link:"/web/search?q=restaurant",icon:e.jsx(E,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(z,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(y,{})},{title:"Entertainment",link:"/web/search?q=entertainment",icon:e.jsx(v,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(w,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(b,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(N,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(k,{})}],T=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:D.map((s,l)=>e.jsx("div",{children:e.jsx(x,{to:`${s.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:s.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:s.title})]})})},l))})]})}),J=()=>[{title:"Grüthe | Business Directory, Travel, Real Estate, Hotels & Restaurants!"},{name:"Gr<i>ü</i>the",content:"Welcome to Grüthe!"}],K=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(u,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(q,{})}),e.jsx("div",{className:"h-full",children:e.jsx(L,{})}),e.jsx(C,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx(T,{}),e.jsx(M,{})]});export{K as default,J as meta};
