import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{u as d,L as p,r as c}from"./components-kAvIA9Ge.js";import{L as u,M as m}from"./MobileNav-BqivA74W.js";import{U as h,H as f}from"./UserMenu-DOzuAH8Q.js";import"./index-Dn2vcGOX.js";import"./index-BTxVYS91.js";const j=[{label:"Page Search",url:"/web/search"}],v=({theme:r,navBg:o})=>{const s=d();return e.jsx(e.Fragment,{children:e.jsx("div",{className:"hidden lg:flex place-items-center space-x-14 h-full ",children:j.map((a,l)=>e.jsx(p,{to:a.url,children:e.jsx("span",{className:`text-black
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40 bg-gray-50 px-3 
                                py-[5px] rounded-full border-[1px] border-blue-500/30
                               ${s.pathname===a.url&&"bg-blue-300"}
                                `,children:a.label})},l))})})},g=({theme:r,openNav:o,navBg:s,setNavBg:a,setTheme:l,_theme:t})=>{const[n]=c.useState(1);return c.useEffect(()=>{const i=()=>{window.scrollY>=n&&l("dark"),window.scrollY<n&&l("light")};window.onscroll=()=>i()},[n]),e.jsx("div",{className:`${t==="light"?"bg-transparent":"bg-[#001e5a]"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsxs("div",{className:`max-w-[1100px] mx-auto w-full gap-5
              h-full flex place-items-center place-content-between
              `,children:[e.jsx(u,{theme:t}),e.jsx("div",{className:" w-full",children:e.jsx(v,{theme:t,navBg:s})}),e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(h,{theme:t}),e.jsx(f,{theme:t,openNav:o,navBg:s})]})]})})},b=({theme:r})=>{const[o,s]=c.useState(!1),[a,l]=c.useState(!1),[t,n]=c.useState(r),i=()=>s(!0),x=()=>s(!1);return e.jsxs("div",{children:[e.jsx(g,{theme:r,openNav:i,navBg:a,setNavBg:l,setTheme:n,_theme:t}),e.jsx(m,{showNav:o,closeNav:x})]})};function B(){return e.jsxs("div",{children:[e.jsx(b,{theme:"dark"}),e.jsx("div",{className:`min-h-screen flex items-center justify-center 
        text-center px-4 text-black`,children:e.jsxs("div",{className:`flex place-content-center place-items-center gap-3
                h-[50px]`,children:[e.jsx("div",{className:`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`,children:"404"}),e.jsx("div",{className:"h-full w-[2px] border-r"}),e.jsx("div",{className:`text-black text-[14px]
                    h-full flex place-items-center`,children:"This page could not be found."})]})})]})}export{B as default};
