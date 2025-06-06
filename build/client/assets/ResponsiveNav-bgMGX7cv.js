import{j as s}from"./jsx-runtime-0DLF9kdB.js";import{r as t}from"./components-kAvIA9Ge.js";import{W as w,M as x}from"./MobileNav-3AC4s-2C.js";import{w as d}from"./css-DPrdeFsB.js";const f=({theme:a,openNav:c,navBg:l,setNavBg:p,setTheme:o,_theme:n})=>{const[e,r]=t.useState(1);return t.useEffect(()=>{const i=()=>{window.scrollY>=e&&o("dark"),window.scrollY<e&&o("light"),r(window.scrollY)};window.onscroll=()=>i()},[e]),s.jsx("div",{className:`${e>10?"shadow-md":""}
        ${n&&"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:s.jsx("div",{className:`max-w-[1100px] mx-auto w-full 
              h-full flex place-items-center place-content-between ${d}
              `,children:s.jsx(w,{})})})},N=({theme:a})=>{const[c,l]=t.useState(!1),[p,o]=t.useState(!1),[n,e]=t.useState(a),r=()=>l(!0),i=()=>l(!1);return s.jsxs("div",{children:[s.jsx(f,{theme:a,openNav:r,navBg:p,setNavBg:o,setTheme:e,_theme:n}),s.jsx(x,{showNav:c,closeNav:i})]})};export{N as R};
