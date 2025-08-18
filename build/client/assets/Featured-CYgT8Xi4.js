import{j as t}from"./jsx-runtime-0DLF9kdB.js";import{L as e,r as n}from"./components-DN9bEK-g.js";import{g as l}from"./lib-DGSJRfZx.js";const c=({feature:s})=>t.jsxs("div",{id:s.gid,className:"pb-4 pt-3",children:[t.jsx(e,{to:`/${s!=null&&s.username?s==null?void 0:s.username:s==null?void 0:s.gid}`,children:t.jsx("div",{className:`text-[15px] tracking-normal 
                text-blue-700 font-normal`,children:s.title})}),t.jsx("div",{className:`text-md font-semibold 
                tracking-tight mt-[2px]`,children:s.phone}),t.jsx("div",{className:`font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`,children:s.short_description.substring(0,80)}),t.jsx("div",{className:`text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`,children:s.address_one}),t.jsx("div",{className:` font-semibold  
                tracking-tight mt-[8px] text-blue-800`,children:t.jsx(e,{to:s.website?s.website:`#${s.gid}`,children:"Website"})})]}),p=()=>{const[s,o]=n.useState([]),[r,a]=n.useState(0);return n.useEffect(()=>{(async()=>{const i=await l();o(i)})()},[]),t.jsxs("div",{className:`border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`,children:[t.jsx("div",{className:"font-bold text-lg",children:"Featured"}),t.jsx("div",{className:"divide-y divide-gray-200",children:(s==null?void 0:s.length)>0?s==null?void 0:s.map((d,i)=>i>2?null:t.jsx(c,{feature:d},i)):t.jsx("div",{className:"text-[15px] mt-4",children:"Loading..."})})]})};export{p as F};
