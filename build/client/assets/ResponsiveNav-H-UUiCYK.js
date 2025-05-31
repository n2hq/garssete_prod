import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as t}from"./components-kAvIA9Ge.js";import{W as x}from"./WhiteLogo-JtHEfUzk.js";import{M as f}from"./MobileNav-Rbz9A8QY.js";const v=({theme:a,openNav:i,navBg:n,setNavBg:c,setTheme:o,_theme:r})=>{const[s]=t.useState(1);return t.useEffect(()=>{const l=()=>{window.scrollY>=s&&o("dark"),window.scrollY<s&&o("light")};window.onscroll=()=>l()},[s]),e.jsx("div",{className:`${r==="dark"?"bg-gray-800":"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:e.jsx("div",{className:`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:e.jsx(x,{})})})},w=({theme:a})=>{const[i,n]=t.useState(!1),[c,o]=t.useState(!1),[r,s]=t.useState(a),l=()=>n(!0),p=()=>n(!1);return e.jsxs("div",{children:[e.jsx(v,{theme:a,openNav:l,navBg:c,setNavBg:o,setTheme:s,_theme:r}),e.jsx(f,{showNav:i,closeNav:p})]})};export{w as R};
