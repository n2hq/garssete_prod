import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{u as d,L as p,r as c}from"./components-kAvIA9Ge.js";import{L as m}from"./Logo-Bqbb4Qu7.js";import{U as u,H as h}from"./Hamburger-1rpR6E2l.js";import{M as f}from"./MobileNav-WD4SLO32.js";import"./index-BKi4tw_A.js";import"./index-hJsRv-pT.js";const j=[{label:"Page Search",url:"/web/search"}],v=({theme:r,navBg:o})=>{const t=d();return e.jsx(e.Fragment,{children:e.jsx("div",{className:"hidden lg:flex place-items-center space-x-14 h-full ",children:j.map((a,l)=>e.jsx(p,{to:a.url,children:e.jsx("span",{className:`text-black
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40 bg-gray-50 px-3 
                                py-[5px] rounded-full border-[1px] border-blue-500/30
                               ${t.pathname===a.url&&"bg-blue-300"}
                                `,children:a.label})},l))})})},g=({theme:r,openNav:o,navBg:t,setNavBg:a,setTheme:l,_theme:s})=>{const[n]=c.useState(1);return c.useEffect(()=>{const i=()=>{window.scrollY>=n&&l("dark"),window.scrollY<n&&l("light")};window.onscroll=()=>i()},[n]),e.jsx("div",{className:`${s==="light"?"bg-transparent":"bg-[#001e5a]"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsxs("div",{className:`max-w-[1100px] mx-auto w-full gap-5
              h-full flex place-items-center place-content-between
              `,children:[e.jsx(m,{theme:s}),e.jsx("div",{className:" w-full",children:e.jsx(v,{theme:s,navBg:t})}),e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(u,{theme:s}),e.jsx(h,{theme:s,openNav:o,navBg:t})]})]})})},b=({theme:r})=>{const[o,t]=c.useState(!1),[a,l]=c.useState(!1),[s,n]=c.useState(r),i=()=>t(!0),x=()=>t(!1);return e.jsxs("div",{children:[e.jsx(g,{theme:r,openNav:i,navBg:a,setNavBg:l,setTheme:n,_theme:s}),e.jsx(f,{showNav:o,closeNav:x})]})};function E(){return e.jsxs("div",{children:[e.jsx(b,{theme:"dark"}),e.jsx("div",{className:`min-h-screen flex items-center justify-center 
        text-center px-4 text-black`,children:e.jsxs("div",{className:`flex place-content-center place-items-center gap-3
                h-[50px]`,children:[e.jsx("div",{className:`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`,children:"404"}),e.jsx("div",{className:"h-full w-[2px] border-r"}),e.jsx("div",{className:`text-black text-[14px]
                    h-full flex place-items-center`,children:"This page could not be found."})]})})]})}export{E as default};
