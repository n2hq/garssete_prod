import{j as t}from"./jsx-runtime-0DLF9kdB.js";import{r as u,u as g,L as m}from"./components-DN9bEK-g.js";const h=[{title:"Settings",link:"/settings"},{title:"Gallery",link:"/gallery"},{title:"Facilities",link:"/facilities"},{title:"Socials Media",link:"/social_media"},{title:"Activate",link:"/activate"}],w=({title:l,guid:n,userGuid:a})=>{const[o,s]=u.useState(!1),c=()=>s(!0),r=g(),d=`/web/account/portfolio/${n}/${a}`,x=async()=>{await new Promise(e=>setTimeout(e,500)),s(!1)};return t.jsxs("div",{className:" flex place-content-between w-full  px-4 py-3 mt-1 z-[1000]",children:[t.jsx("div",{className:"  rounded-lg text-xl text-black font-normal",children:l}),t.jsxs("div",{className:`relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                
                
                `,children:[t.jsx("button",{className:`rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1 `,onMouseDown:()=>c(),onBlur:()=>x(),children:"Settings"}),t.jsx("div",{className:`${o?"block":"hidden"} absolute w-full top-8 rounded-lg z-[10000]
                border-[1px] border-gray-100 bg-white shadow-lg  `,children:t.jsx("div",{className:"divide-y-[1px] divide-gray-500/20 ",children:h.map((e,p)=>{const i=d+e.link;return t.jsx("div",{className:`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold
                                     ${r.pathname===i&&"bg-gray-300/30"}
                                     `,children:t.jsx(m,{to:`${i}`,children:t.jsx("p",{className:"text-lg tracking-tight",children:e.title})})},p)})})})]})]})};export{w as B};
