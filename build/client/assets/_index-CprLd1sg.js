import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{H as b}from"./HomeNav-C8bxobNu.js";import{L as f,r as t}from"./components-DN9bEK-g.js";import{g as w,F as N}from"./lib-CrWdx4-L.js";import{U as k,H as S,M as R,C as T}from"./MobileNav-BGBO6qub.js";import{B as y,a as B,c as E,d as H}from"./index-D7B0-w69.js";import{S as z,G as _,R as C}from"./Recents-B39UbXri.js";import{c as M,M as q}from"./index-uVOpLC6a.js";import{R as F}from"./index-Bl4mO-vv.js";import{F as G}from"./LatestStarRating-BuMeg4OS.js";import{T as L}from"./TopAd-Cm4tYdQx.js";import"./WhiteLogo-S18VwSHg.js";import"./AuthContext-uf77I8ws.js";import"./index-CkgCbE6l.js";const A=()=>e.jsx(f,{to:"/",children:e.jsx("div",{className:` text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] font-poppins`,children:w()})}),D=()=>{const[r]=t.useState(1),[n,d]=t.useState(""),[a,l]=t.useState(!1),[i,o]=t.useState(!1),[x,j]=t.useState(!1),h=()=>o(!0),u=()=>o(!1);return t.useEffect(()=>{const p=()=>{window.scrollY>=r&&l(!0),window.scrollY<r&&l(!1)};window.onscroll=()=>p()},[r]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${a&&"bg-black/90"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-8
        flex place-content-between h-full`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl w-fit
           `,children:e.jsx(A,{})}),e.jsx("div",{className:`hidden place-items-center
                     lg:flex  w-full`,children:e.jsx(f,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center ",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(k,{theme:"dark"}),e.jsx(S,{theme:"dark",openNav:h,navBg:x})]})})]})}),e.jsx(R,{showNav:i,closeNav:u})]})},m=[{img:"/images/hero/man_with_reading_glasses.jpg"},{img:"/images/hero/mobile_device.jpg"},{img:"/images/hero/business_man.jpg"},{img:"/images/hero/realtor_in_dark.jpg"},{img:"/images/hero/lady_eating.jpg"},{img:"/images/hero/bedroom_furniture.jpg"},{img:"/images/hero/perfume.jpg"}],X=()=>{const[r,n]=t.useState(0),d=t.useRef(0);t.useRef(0);const[a,l]=t.useState(null);let i=t.useRef(null);const o=s=>{d.current=s.touches[0].clientX},x=s=>{const c=s.changedTouches[0].clientX,v=d.current-c;v>50?n(g=>(g+1)%m.length):v<-50&&n(g=>(g-1+m.length)%m.length)};t.useEffect(()=>{l(m)},[]);const j=()=>{n(s=>s===0?a.length-1:s-1)},h=()=>{n(s=>s===a.length-1?0:s+1)},u=async()=>{i.current&&clearTimeout(i.current),h(),i.current=setTimeout(()=>{},15e3)},p=async()=>{i.current&&clearTimeout(i.current),j(),i.current=setTimeout(()=>{},15e3)};return t.useEffect(()=>{},[a]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-screen flex 
          overflow-hidden  bg-black z-[20]
          `,children:a==null?void 0:a.map((s,c)=>e.jsx("div",{className:`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative z-[20]
                                        duration-1000 cursor-pointer`,onTouchStart:o,onTouchEnd:x,style:{transform:`translateX(-${r*100}%)`},children:e.jsx("img",{src:s.img,alt:"",className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `},c)},c))}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:p,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `,children:e.jsx(y,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:u,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `,children:e.jsx(B,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:` absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`,children:e.jsxs("div",{className:` 
          max-w-[800px] mx-auto w-full z-[100]`,children:[e.jsx("div",{className:`text-center text-5xl text-white
                            font-extralight mb-[0px] tracking-wide font-poppins`,children:"Find The Best Businesses"}),e.jsx("div",{className:`text-center text-lg text-white
                            font-extralight mb-[20px]`,children:"Across Different Industries Around the World"}),e.jsx(z,{})]})})]})})},I=[{title:"Restaurants",link:"/web/search?q=restaurant",icon:e.jsx(F,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(T,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(_,{})},{title:"Entertainment",link:"/web/search?q=entertainment",icon:e.jsx(M,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(E,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(N,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(H,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(q,{})}],$=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:I.map((r,n)=>e.jsx("div",{children:e.jsx(f,{to:`${r.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:r.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:r.title})]})})},n))})]})}),ae=()=>[{title:"Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!"},{name:"Garssete",content:"Welcome to Garssete!"}],ie=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(b,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(D,{})}),e.jsx("div",{className:"",children:e.jsx(X,{})}),e.jsx(C,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx("div",{className:"mt-[48px]"}),e.jsx(L,{}),e.jsx($,{}),e.jsx(G,{})]});export{ie as default,ae as meta};
