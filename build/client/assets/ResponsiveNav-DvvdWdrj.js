import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as t}from"./components-kAvIA9Ge.js";import{L as p,M as v}from"./MobileNav-MwHINLMl.js";const f=({theme:n,openNav:i,navBg:r,setNavBg:c,setTheme:a,_theme:o})=>{const[s]=t.useState(1);return t.useEffect(()=>{const l=()=>{window.scrollY>=s&&a("dark"),window.scrollY<s&&a("light")};window.onscroll=()=>l()},[s]),e.jsx("div",{className:`${o==="dark"?"bg-gray-800":"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsx("div",{className:`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:e.jsx(p,{theme:o})})})},w=({theme:n})=>{const[i,r]=t.useState(!1),[c,a]=t.useState(!1),[o,s]=t.useState(n),l=()=>r(!0),x=()=>r(!1);return e.jsxs("div",{children:[e.jsx(f,{theme:n,openNav:l,navBg:c,setNavBg:a,setTheme:s,_theme:o}),e.jsx(v,{showNav:i,closeNav:x})]})};export{w as R};
