import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as t}from"./components-kAvIA9Ge.js";import{W as p,M as v}from"./MobileNav-BEnhwxkc.js";const f=({theme:o,openNav:i,navBg:n,setNavBg:c,setTheme:a,_theme:r})=>{const[s]=t.useState(1);return t.useEffect(()=>{const l=()=>{window.scrollY>=s&&a("dark"),window.scrollY<s&&a("light")};window.onscroll=()=>l()},[s]),e.jsx("div",{className:`${r==="dark"?"bg-gray-800":"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsx("div",{className:`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:e.jsx(p,{})})})},m=({theme:o})=>{const[i,n]=t.useState(!1),[c,a]=t.useState(!1),[r,s]=t.useState(o),l=()=>n(!0),x=()=>n(!1);return e.jsxs("div",{children:[e.jsx(f,{theme:o,openNav:l,navBg:c,setNavBg:a,setTheme:s,_theme:r}),e.jsx(v,{showNav:i,closeNav:x})]})};export{m as R};
