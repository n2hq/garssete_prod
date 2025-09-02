import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as h,a as g,L as r,N as m}from"./components-CooaLra5.js";import{C as b}from"./CardTitle-ii5rf5je.js";const f=[{title:"Business Hours",link:"/settings"},{title:"Gallery",link:"/gallery"},{title:"Videos",link:"/videos"},{title:"Products",link:"/products"},{title:"Facilities",link:"/facilities"},{title:"Socials Media",link:"/social_media"},{title:"Activate",link:"/activate"},{title:"Delete",link:"/delete"}],k=({title:n,guid:t,userGuid:l})=>{const[s,a]=h.useState(!1),c=()=>a(!0),d=g(),x=`/web/account/portfolio/${t}/${l}`,p=async()=>{await new Promise(i=>setTimeout(i,500)),a(!1)};return e.jsxs("div",{className:" flex place-content-between w-full  px-4 py-3 mt-1 z-[1000]",children:[e.jsx("div",{className:"  rounded-lg text-xl text-black font-normal",children:n}),e.jsxs("div",{className:`relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                
                
                `,children:[e.jsx("button",{className:`rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1 `,onMouseDown:()=>c(),onBlur:()=>p(),children:"Settings"}),e.jsx("div",{className:`${s?"block":"hidden"} absolute w-full top-8 rounded-lg z-[10000]
                border-[1px] border-gray-100 bg-white shadow-lg  `,children:e.jsx("div",{className:"divide-y-[1px] divide-gray-500/20 ",children:f.map((i,u)=>{const o=x+i.link;return e.jsx("div",{className:`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold
                                     ${d.pathname===o&&"bg-gray-300/30"}
                                     `,children:e.jsx(r,{to:`${o}`,children:e.jsx("p",{className:"text-lg tracking-tight",children:i.title})})},u)})})})]})]})},y=({businessGuid:n,data:t,businessProfile:l})=>{var s;return e.jsx("div",{children:e.jsxs("div",{className:`bg-blue-100 w-full px-3 
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-2 gap-[5px]
                            leading-[1.5em]`,children:[e.jsx("div",{className:"h-full",children:e.jsx(b,{baseUrl:"/web/account/portfolio/",guid:n,children:(s=t==null?void 0:t.businessProfile)==null?void 0:s.title})}),e.jsxs("div",{className:"space-x-2 ",children:[e.jsx(m,{to:"/web/account/portfolio",className:"border border-gray-600 py-2.5 px-3 rounded-full hover:bg-white",children:"Back to Portfolio"}),e.jsx(r,{to:`/${l==null?void 0:l.gid}`,children:e.jsx("button",{className:`px-3 border border-black
                                    py-2 rounded-full hover:bg-white`,children:"Preview"})})]})]})})};export{y as B,k as a};
