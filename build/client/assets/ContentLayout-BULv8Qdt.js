import{j as e,L as d,r as o}from"./components-BAvBE3fA.js";import{n as u,L as h,a as m,C as f,d as p}from"./MobileNav-C2nYESeh.js";import{U as v,H as w}from"./UserMenu-CzhSTjVp.js";const j=({theme:a,navBg:s})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"hidden lg:flex place-items-center space-x-14 h-full ",children:u.map((t,n)=>e.jsx(d,{to:t.url,children:e.jsx("span",{className:`${a==="light"?"text-black":"text-white"}
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40`,children:t.label})},n))})}),g=({theme:a,openNav:s,navBg:t,setNavBg:n,setTheme:i,_theme:l})=>{const[r]=o.useState(1);return o.useEffect(()=>{const x=()=>{window.scrollY>=r&&i("dark"),window.scrollY<r&&i("light")};window.onscroll=()=>x()},[r]),e.jsx("div",{className:`${l==="dark"?"bg-blue-800":"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0
        shadow-sm  border-b`,children:e.jsxs("div",{className:` mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:[e.jsx(h,{theme:l}),e.jsx(j,{theme:l,navBg:t}),e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(v,{theme:l}),e.jsx(w,{theme:l,openNav:s,navBg:t})]})]})})},N=({theme:a})=>{const[s,t]=o.useState(!1),[n,i]=o.useState(!1),[l,r]=o.useState(a),x=()=>t(!0),c=()=>t(!1);return e.jsxs("div",{children:[e.jsx(g,{theme:a,openNav:x,navBg:n,setNavBg:i,setTheme:r,_theme:l}),e.jsx(m,{showNav:s,closeNav:c})]})},S=({children:a})=>{const[s,t]=o.useState(!0),n=()=>{t(s===!1)};return e.jsxs("div",{className:"h-screen flex flex-col relative",children:[e.jsx(N,{theme:"dark"}),e.jsx("button",{onClick:n,className:`text-xl text-white bg-blue-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${s?"left-[295px]":"left-[15px]"}
                focus:outline-none fixed z-50 top-[60px]
                transition-all duration-300 ease-in-out
                hidden md:block`,children:e.jsx(f,{className:`${s?"rotate-0 transition-all duration-300 ease-in-out":"rotate-90 transition-all duration-300 ease-in-out"}`})}),e.jsxs("div",{className:`flex flex-1 pt-[60px] h-full
                overflow-hidden`,children:[e.jsxs("aside",{className:`bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-300 ease-in-out border-r shadow-md
                        hidden md:block
                        ${s?"w-[350px] min-w-[350px]":"w-0 min-w-0 overflow-hidden"}`,children:[e.jsx("div",{className:"mt-[20px]"}),e.jsx(p,{}),e.jsx("div",{className:"h-[20px]"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto bg-gray-100 py-6 px-[15px]",children:e.jsx("div",{className:`max-w-[100%] md:max-w-[80%] mx-auto w-full  
                        `,children:a})})]})]})},L=({children:a,title:s})=>e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-lg",children:s}),e.jsx("div",{className:"mt-4 bg-white px-[15px] py-4 rounded-lg shadow-md ",children:a})]});export{S as A,L as C};
