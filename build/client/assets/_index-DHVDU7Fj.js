import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as t,L as j}from"./components-kAvIA9Ge.js";import{U as p,H as g}from"./Hamburger-J4jB7Ggx.js";import{H as v,W as f,M as b}from"./MobileNav-1MM-OJCr.js";import{B as N,b as S,c as k}from"./index-BxK7zvFJ.js";import{S as y,R as B}from"./Recents-Bpxg4Z37.js";import"./index-DTO0etKg.js";import"./LatestStarRating-BsOKUHbM.js";const H=({theme:a,openNav:i,navBg:n})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex items-center space-x-0",children:e.jsx(v,{onClick:i,className:`${a==="light"?"text-black":"text-white"} w-8 h-8 cursor-pointer`})})}),z=()=>{const[a]=t.useState(1),[i,n]=t.useState(""),[x,l]=t.useState(!1),[d,c]=t.useState(!1),[o,m]=t.useState(!1),s=()=>c(!0);return t.useEffect(()=>{const r=()=>{window.scrollY>=a&&l(!0),window.scrollY<a&&l(!1)};window.onscroll=()=>r()},[a]),e.jsxs("div",{className:"shadow-md pb-3",children:[e.jsxs("div",{className:`flex place-content-between
                 fixed w-full mx-auto
                 px-[12px] h-[50px]`,children:[e.jsx("div",{className:`h-full w-[150px]   
                    flex place-items-center`,children:e.jsx(H,{theme:"light",openNav:s,navBg:o})}),e.jsx("div",{className:`h-full flex w-full
                    place-content-center place-items-center`,children:e.jsx(f,{})}),e.jsx("div",{className:`h-full w-[150px] 
                    flex place-items-center place-content-end`,children:e.jsx(p,{theme:"light"})})]}),e.jsx("div",{className:"h-[50px]"}),e.jsx("div",{className:"px-[12px]",children:e.jsx("form",{action:"/web/search",children:e.jsxs("div",{className:`bg-gray-100 w-full rounded-full h-[40px]
                    flex place-items-center px-2 gap-2`,children:[e.jsx(N,{className:"h-[20px] w-[20px]"}),e.jsx("input",{type:"text",name:"q",className:`bg-transparent w-full outline-none
                            h-full flex place-content-center`})]})})})]})},R=()=>{const[a]=t.useState(1),[i,n]=t.useState(""),[x,l]=t.useState(!1),[d,c]=t.useState(!1),[o,m]=t.useState(!1),s=()=>c(!0),r=()=>c(!1);return t.useEffect(()=>{const u=()=>{window.scrollY>=a&&l(!0),window.scrollY<a&&l(!1)};window.onscroll=()=>u()},[a]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${x&&"bg-black/50"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl`,children:e.jsx(f,{})}),e.jsx("div",{className:`hidden place-items-center
          w-full lg:flex`,children:e.jsx(j,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(p,{theme:"dark"}),e.jsx(g,{theme:"dark",openNav:s,navBg:o})]})})]})}),e.jsx(b,{showNav:d,closeNav:r})]})},T=[{img:"images/dubai7star.jpeg"},{img:"https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"},{img:"https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"}],E=()=>{const[a,i]=t.useState(0);t.useRef(0),t.useRef(0);const[n,x]=t.useState(null);let l=t.useRef(null);t.useEffect(()=>{x(T)},[]);const d=()=>{i(s=>s===0?n.length-1:s-1)},c=()=>{i(s=>s===n.length-1?0:s+1)},o=async()=>{l.current&&clearTimeout(l.current),c(),l.current=setTimeout(()=>{o()},15e3)},m=async()=>{l.current&&clearTimeout(l.current),d(),l.current=setTimeout(()=>{c()},15e3)};return t.useEffect(()=>{const s=async r=>{if(r!==null){const u=r.length;for(let h=0;h<u;h++)l=await new Promise(w=>setTimeout(w,15e3)),c(),h==r.length-1&&s(r)}};n&&s(n)},[n]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `,children:n==null?void 0:n.map((s,r)=>e.jsx("img",{src:s.img,alt:"",style:{transform:`translateX(-${a*100}%)`},className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`},r))}),e.jsx("div",{className:`w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent`}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:m,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`,children:e.jsx(S,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:o,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`,children:e.jsx(k,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:`z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`,children:e.jsx("div",{className:` 
          max-w-[800px] mx-auto w-full z-[300]`,children:e.jsx(y,{})})})]})})},P=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(z,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(R,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(E,{})}),e.jsx(B,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."})]});export{P as default};
