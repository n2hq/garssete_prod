import{r as t,j as e}from"./components-BAvBE3fA.js";import{L as p,a as v}from"./MobileNav-C2nYESeh.js";const u=({theme:n,openNav:c,navBg:l,setNavBg:i,setTheme:a,_theme:o})=>{const[s]=t.useState(1);return t.useEffect(()=>{const r=()=>{window.scrollY>=s&&a("dark"),window.scrollY<s&&a("light")};window.onscroll=()=>r()},[s]),e.jsx("div",{className:`${o==="dark"?"bg-gray-800":"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsx("div",{className:`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:e.jsx(p,{theme:o})})})},w=({theme:n})=>{const[c,l]=t.useState(!1),[i,a]=t.useState(!1),[o,s]=t.useState(n),r=()=>l(!0),x=()=>l(!1);return e.jsxs("div",{children:[e.jsx(u,{theme:n,openNav:r,navBg:i,setNavBg:a,setTheme:s,_theme:o}),e.jsx(v,{showNav:c,closeNav:x})]})};export{w as R};
