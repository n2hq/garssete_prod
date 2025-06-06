import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as a,L as x,u as h}from"./components-kAvIA9Ge.js";import{U as m,H as u}from"./Hamburger-De3YMqj-.js";import{M as p}from"./MobileNav-3AC4s-2C.js";import"./index-Bk8KN62v.js";const f=({theme:t})=>{const[c,s]=a.useState("light");return a.useEffect(()=>{s(t)},[t,c]),e.jsxs("div",{className:"flex place-items-center space-x-1",children:[e.jsx(x,{to:"/",children:e.jsx("div",{className:`${t==="light"?"bg-black text-white":"bg-white/90 text-black"}
                relative w-8 h-8 rounded-full overflow-hidden
                `,children:e.jsx("img",{src:`${t==="dark"?"/images/comcerc-logo-light.png":"/images/comcerc-logo.png"}`,alt:"comcerc",className:"object-cover w-full hfull"})})}),e.jsx(x,{to:"/",children:e.jsx("span",{className:`${t==="light"?"text-blue-900":"text-white/90"}
                font-[700] text-2xl tracking-tight relative
                `,children:"comcerc"})})]})},g=[{label:"Page Search",url:"/web/search"}],v=({theme:t,navBg:c})=>{const s=h();return e.jsx(e.Fragment,{children:e.jsx("div",{className:"hidden lg:flex place-items-center space-x-14 h-full ",children:g.map((r,n)=>e.jsx(x,{to:r.url,children:e.jsx("span",{className:`text-black
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40 bg-gray-50 px-3 
                                py-[5px] rounded-full border-[1px] border-blue-500/30
                               ${s.pathname===r.url&&"bg-blue-300"}
                                `,children:r.label})},n))})})},j=({theme:t,openNav:c,navBg:s,setNavBg:r,setTheme:n,_theme:l})=>{const[i]=a.useState(1);return a.useEffect(()=>{const o=()=>{window.scrollY>=i&&n("dark"),window.scrollY<i&&n("light")};window.onscroll=()=>o()},[i]),e.jsx("div",{className:`${l==="light"?"bg-transparent":"bg-[#001e5a]"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsxs("div",{className:`max-w-[1100px] mx-auto w-full gap-5
              h-full flex place-items-center place-content-between
              `,children:[e.jsx(f,{theme:l}),e.jsx("div",{className:" w-full",children:e.jsx(v,{theme:l,navBg:s})}),e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(m,{theme:l}),e.jsx(u,{theme:l,openNav:c,navBg:s})]})]})})},b=({theme:t})=>{const[c,s]=a.useState(!1),[r,n]=a.useState(!1),[l,i]=a.useState(t),o=()=>s(!0),d=()=>s(!1);return e.jsxs("div",{children:[e.jsx(j,{theme:t,openNav:o,navBg:r,setNavBg:n,setTheme:i,_theme:l}),e.jsx(p,{showNav:c,closeNav:d})]})};function L(){return e.jsxs("div",{children:[e.jsx(b,{theme:"dark"}),e.jsx("div",{className:`min-h-screen flex items-center justify-center 
        text-center px-4 text-black`,children:e.jsxs("div",{className:`flex place-content-center place-items-center gap-3
                h-[50px]`,children:[e.jsx("div",{className:`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`,children:"404"}),e.jsx("div",{className:"h-full w-[2px] border-r"}),e.jsx("div",{className:`text-black text-[14px]
                    h-full flex place-items-center`,children:"This page could not be found."})]})})]})}export{L as default};
