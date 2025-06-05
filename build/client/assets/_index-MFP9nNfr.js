import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{H as N}from"./HomeNav-ByIN2RW5.js";import{r as t,L as w}from"./components-kAvIA9Ge.js";import{U as k,H as S}from"./Hamburger-D-zpFp8C.js";import{W as y,M as z,C as R}from"./MobileNav-DHe2i42A.js";import{B as v,a as j,b as T,c as C,F as B,d as E,M as H}from"./index-DzYaOoqq.js";import{S as G,G as D,R as M}from"./Recents-Di8sM8tX.js";import{R as q}from"./index-CZbjYKtb.js";import{F}from"./LatestStarRating-CDEld1DL.js";const L=()=>{const[n]=t.useState(1),[i,a]=t.useState(""),[o,r]=t.useState(!1),[c,u]=t.useState(!1),[m,p]=t.useState(!1),l=()=>u(!0),d=()=>u(!1);return t.useEffect(()=>{const h=()=>{window.scrollY>=n&&r(!0),window.scrollY<n&&r(!1)};window.onscroll=()=>h()},[n]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${o&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl`,children:e.jsx(y,{})}),e.jsx("div",{className:`hidden place-items-center
          w-full lg:flex`,children:e.jsx(w,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(k,{theme:"dark"}),e.jsx(S,{theme:"dark",openNav:l,navBg:m})]})})]})}),e.jsx(z,{showNav:c,closeNav:d})]})},X=[{img:"images/dubai7star.jpeg"},{img:"https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"},{img:"https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"}],$=()=>{const[n,i]=t.useState(0);t.useRef(0),t.useRef(0);const[a,o]=t.useState(null);let r=t.useRef(null);t.useEffect(()=>{o(X)},[]);const c=()=>{i(l=>l===0?a.length-1:l-1)},u=()=>{i(l=>l===a.length-1?0:l+1)},m=async()=>{r.current&&clearTimeout(r.current),u(),r.current=setTimeout(()=>{m()},15e3)},p=async()=>{r.current&&clearTimeout(r.current),c(),r.current=setTimeout(()=>{u()},15e3)};return t.useEffect(()=>{const l=async d=>{if(d!==null){const h=d.length;for(let s=0;s<h;s++)r=await new Promise(x=>setTimeout(x,15e3)),u(),s==d.length-1&&l(d)}};a&&l(a)},[a]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `,children:a==null?void 0:a.map((l,d)=>e.jsx("img",{src:l.img,alt:"",style:{transform:`translateX(-${n*100}%)`},className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`},d))}),e.jsx("div",{className:`w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:p,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`,children:e.jsx(v,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:m,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`,children:e.jsx(j,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:`z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`,children:e.jsx("div",{className:` 
          max-w-[800px] mx-auto w-full z-[300]`,children:e.jsx(G,{})})})]})})},A=[{title:"Restaurants",link:"/web/search?q=restaurants",icon:e.jsx(q,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(R,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(D,{})},{title:"Active Life",link:"/web/search?q=nightlife",icon:e.jsx(T,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(C,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(B,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(E,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(H,{})}],P=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:A.map((n,i)=>e.jsx("div",{children:e.jsx(w,{to:`${n.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:n.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:n.title})]})})},i))})]})}),f=[{img:"https://mediaoffice.ae/-/media/2025/february/09-02/04/9f895655-09cf-440c-ad2e-d0cd4f8542b0.jpg",title:"Discover Businesses Across the Globe",topTitle:"Discover. Connect. Grow"},{img:"https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg",title:"Connect with potential clients",topTitle:"Discover. Connect. Grow"},{img:"https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg",title:"Grow Your Business",topTitle:"Discover. Connect. Grow"}],I=()=>{const[n,i]=t.useState(0),a=t.useRef(0);t.useRef(0);const[o,r]=t.useState(null);let c=t.useRef(null);const u=s=>{a.current=s.touches[0].clientX},m=s=>{const x=s.changedTouches[0].clientX,b=a.current-x;b>50?i(g=>(g+1)%f.length):b<-50&&i(g=>(g-1+f.length)%f.length)};t.useEffect(()=>{r(f)},[]);const p=()=>{i(s=>s===0?o.length-1:s-1)},l=()=>{i(s=>s===o.length-1?0:s+1)},d=async()=>{c.current&&clearTimeout(c.current),l(),c.current=setTimeout(()=>{},15e3)},h=async()=>{c.current&&clearTimeout(c.current),p(),c.current=setTimeout(()=>{},15e3)};return t.useEffect(()=>{},[o]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{onClick:()=>{console.log("z")},className:` w-full h-[280px] md:h-[500px] flex 
          overflow-hidden z-[10]
          `,children:o==null?void 0:o.map((s,x)=>e.jsxs("div",{className:`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative
                                        duration-1000 `,onTouchStart:u,onTouchEnd:m,style:{transform:`translateX(-${n*100}%)`},children:[e.jsx("img",{src:s.img,alt:"",className:`object-cover w-full h-full 
                                            z-[20]
                                        `},x),e.jsx("div",{className:`z-100 absolute top-0 w-full 
                h-[280px] md:h-[500px] flex place-content-center
                place-items-center px-[15px] bg-black/20`}),e.jsx("div",{className:`z-[300] absolute 
                                         w-full text-center top-[43%]
                                          text-white  
                                          py-[10px] `,children:e.jsxs("div",{className:`max-w-[65%] mx-auto w-full
                                            `,children:[e.jsx("div",{className:"text-[13px]",children:s.topTitle}),e.jsx("div",{className:`text-[22px] mt-[0px]
                                            leading-[1.2em] font-bold`,children:e.jsx("div",{children:s.title})})]})})]}))}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:h,className:`block absolute top-0 bottom-0 
                        z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                            transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[40px] h-[40px] bg-white/60 
                        rounded-full place-content-center place-items-center 
                        group-hover:bg-white/30z-[300]
                        transition duration-500 ease-in-out relative `,children:e.jsx(v,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:d,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[40px] h-[40px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `,children:e.jsx(j,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]})]})})},Z=()=>[{title:"Grüthe | Business Directory, Travel, Real Estate, Hotels & Restaurants!"},{name:"Gr<i>ü</i>the",content:"Welcome to Grüthe!"}],ee=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(N,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(L,{})}),e.jsx("div",{className:"md:hidden",children:e.jsx(I,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx($,{})}),e.jsx(M,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx(P,{}),e.jsx(F,{})]});export{ee as default,Z as meta};
