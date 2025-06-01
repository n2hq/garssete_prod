import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as t,L as u}from"./components-kAvIA9Ge.js";import{U as f,H as j}from"./Hamburger-SH_wVbdQ.js";import{H as v,W as g,M as b,C as N}from"./MobileNav-D9wqDv2m.js";import{e as S,B as k,a as y,b as B,c as R,d as H,M as z}from"./index-a6STByh9.js";import{S as C,G as q,R as E}from"./Recents-CEhOoLZM.js";import{F}from"./index-CCxZ9t8L.js";import{R as M}from"./index-CYPLIe53.js";import{F as L}from"./LatestStarRating-BP_gHaVh.js";const T=({theme:s,openNav:i,navBg:n})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex items-center space-x-0",children:e.jsx(v,{onClick:i,className:`${s==="light"?"text-black":"text-white"} w-8 h-8 cursor-pointer`})})}),Y=()=>{const[s]=t.useState(1),[i,n]=t.useState(""),[x,l]=t.useState(!1),[d,c]=t.useState(!1),[o,m]=t.useState(!1),a=()=>c(!0);return t.useEffect(()=>{const r=()=>{window.scrollY>=s&&l(!0),window.scrollY<s&&l(!1)};window.onscroll=()=>r()},[s]),e.jsxs("div",{className:"shadow-md pb-3",children:[e.jsxs("div",{className:`flex place-content-between
                 fixed w-full mx-auto bg-white
                 px-[12px] h-[50px] z-[600]`,children:[e.jsx("div",{className:`h-full w-[150px]   
                    flex place-items-center`,children:e.jsx(T,{theme:"light",openNav:a,navBg:o})}),e.jsx("div",{className:`h-full flex w-full
                    place-content-center place-items-center`,children:e.jsx(g,{})}),e.jsx("div",{className:`h-full w-[150px] 
                    flex place-items-center place-content-end`,children:e.jsx(f,{theme:"light"})})]}),e.jsx("div",{className:"h-[50px]"}),e.jsx("div",{className:"px-[12px]",children:e.jsx("form",{action:"/web/search",children:e.jsxs("div",{className:`bg-gray-100 w-full rounded-full h-[40px]
                    flex place-items-center px-2 gap-2`,children:[e.jsx(S,{className:"h-[20px] w-[20px]"}),e.jsx("input",{type:"text",name:"q",className:`bg-transparent w-full outline-none
                            h-full flex place-content-center`})]})})})]})},$=()=>{const[s]=t.useState(1),[i,n]=t.useState(""),[x,l]=t.useState(!1),[d,c]=t.useState(!1),[o,m]=t.useState(!1),a=()=>c(!0),r=()=>c(!1);return t.useEffect(()=>{const h=()=>{window.scrollY>=s&&l(!0),window.scrollY<s&&l(!1)};window.onscroll=()=>h()},[s]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${x&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl`,children:e.jsx(g,{})}),e.jsx("div",{className:`hidden place-items-center
          w-full lg:flex`,children:e.jsx(u,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(f,{theme:"dark"}),e.jsx(j,{theme:"dark",openNav:a,navBg:o})]})})]})}),e.jsx(b,{showNav:d,closeNav:r})]})},A=[{img:"images/dubai7star.jpeg"},{img:"https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"},{img:"https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"}],G=()=>{const[s,i]=t.useState(0);t.useRef(0),t.useRef(0);const[n,x]=t.useState(null);let l=t.useRef(null);t.useEffect(()=>{x(A)},[]);const d=()=>{i(a=>a===0?n.length-1:a-1)},c=()=>{i(a=>a===n.length-1?0:a+1)},o=async()=>{l.current&&clearTimeout(l.current),c(),l.current=setTimeout(()=>{o()},15e3)},m=async()=>{l.current&&clearTimeout(l.current),d(),l.current=setTimeout(()=>{c()},15e3)};return t.useEffect(()=>{const a=async r=>{if(r!==null){const h=r.length;for(let p=0;p<h;p++)l=await new Promise(w=>setTimeout(w,15e3)),c(),p==r.length-1&&a(r)}};n&&a(n)},[n]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `,children:n==null?void 0:n.map((a,r)=>e.jsx("img",{src:a.img,alt:"",style:{transform:`translateX(-${s*100}%)`},className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`},r))}),e.jsx("div",{className:`w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:m,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`,children:e.jsx(k,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:o,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`,children:e.jsx(y,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:`z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`,children:e.jsx("div",{className:` 
          max-w-[800px] mx-auto w-full z-[300]`,children:e.jsx(C,{})})})]})})},I=[{title:"Restaurants",link:"/web/search?q=restaurants",icon:e.jsx(M,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(N,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(q,{})},{title:"Active Life",link:"/web/search?q=nightlife",icon:e.jsx(B,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(R,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(F,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(H,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(z,{})}],P=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:I.map((s,i)=>e.jsx("div",{children:e.jsx(u,{to:`${s.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:s.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:s.title})]})})},i))})]})}),V=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(Y,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx($,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(G,{})}),e.jsx(E,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx(P,{}),e.jsx(L,{})]});export{V as default};
