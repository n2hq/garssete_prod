import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as u,a as m,L as g}from"./components-qdL6XBti.js";import{v as h}from"./lib-ClTvlenw.js";const f=[{title:"Business Hours",link:"/settings"},{title:"Gallery",link:"/gallery"},{title:"Videos",link:"/videos"},{title:"Products",link:"/products"},{title:"Facilities",link:"/facilities"},{title:"Socials Media",link:"/social_media"},{title:"Activate",link:"/activate"},{title:"Delete",link:"/delete"}],v=({title:l,guid:n,userGuid:a})=>{const[o,s]=u.useState(!1),c=()=>s(!0),r=m(),d=`/web/account/portfolio/${n}/${a}`,x=async()=>{await new Promise(t=>setTimeout(t,500)),s(!1)};return e.jsxs("div",{className:" flex place-content-between w-full  px-4 pt-3 mt-1 z-[1000]",children:[e.jsx("div",{className:"  rounded-lg text-xl text-black font-normal",children:l}),e.jsxs("div",{className:`relative flex flex-col place-items-center place-content-end 
                 w-[180px]  gap-3  text-gray-500 font-light font-sans
                
                
                `,children:[e.jsxs("button",{className:`rounded-full cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1 flex place-items-center`,onMouseDown:()=>c(),onBlur:()=>x(),children:[e.jsx(h,{size:30}),e.jsx("div",{className:"text-[17px]",children:"Settings"})]}),e.jsx("div",{className:`${o?"block":"hidden"} absolute w-full top-8 rounded-lg z-[10000]
                border-[1px] border-gray-100 bg-white shadow-lg  `,children:e.jsx("div",{className:"divide-y-[1px] divide-gray-500/20 ",children:f.map((t,p)=>{const i=d+t.link;return e.jsx("div",{className:`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold
                                     ${r.pathname===i&&"bg-gray-300/30"}
                                     `,children:e.jsx(g,{to:`${i}`,children:e.jsx("p",{className:"text-lg tracking-tight",children:t.title})})},p)})})})]})]})};export{v as B};
