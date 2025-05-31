import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as u,u as g,L as m}from"./components-kAvIA9Ge.js";const h=[{title:"Settings",link:"/settings"},{title:"Gallery",link:"/gallery"},{title:"Facilities",link:"/facilities"},{title:"Activate",link:"/activate"}],w=({title:l,guid:i,userGuid:a})=>{const[o,s]=u.useState(!1),r=()=>s(!0),c=g(),d=`/web/account/portfolio/${i}/${a}`,x=async()=>{await new Promise(t=>setTimeout(t,500)),s(!1)};return e.jsxs("div",{className:" flex place-content-between w-full  px-4 py-3 mt-1 z-[3000]",children:[e.jsx("div",{className:"  rounded-lg text-xl text-black font-normal",children:l}),e.jsxs("div",{className:`relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                z-[100]
                
                `,children:[e.jsx("button",{className:`rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1`,onMouseDown:()=>r(),onBlur:()=>x(),children:"Settings"}),e.jsx("div",{className:`${o?"block":"hidden"} absolute w-full top-8 rounded-lg 
                border-[1px] border-gray-100 bg-white shadow-lg  `,children:e.jsx("div",{className:"divide-y-[1px] divide-gray-500/20 ",children:h.map((t,p)=>{const n=d+t.link;return e.jsx("div",{className:`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold
                                     ${c.pathname===n&&"bg-gray-300/30"}
                                     `,children:e.jsx(m,{to:`${n}`,children:e.jsx("p",{children:t.title})})},p)})})})]})]})};export{w as B};
