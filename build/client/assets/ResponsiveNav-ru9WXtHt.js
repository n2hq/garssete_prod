import{j as s}from"./jsx-runtime-0DLF9kdB.js";import{r as t}from"./components-kAvIA9Ge.js";import{w as x,W as p,M as d}from"./MobileNav-DSoEjn7G.js";const h=({theme:a,openNav:c,navBg:l,setNavBg:w,setTheme:o,_theme:n})=>{const[e,r]=t.useState(1);return t.useEffect(()=>{const i=()=>{window.scrollY>=e&&o("dark"),window.scrollY<e&&o("light"),r(window.scrollY)};window.onscroll=()=>i()},[e]),s.jsx("div",{className:`${e>10?"shadow-md":""}
        ${n&&"bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`,children:s.jsx("div",{className:`max-w-[1100px] mx-auto w-full 
              h-full flex place-items-center place-content-between
              ${x}
              `,children:s.jsx(p,{})})})},m=({theme:a})=>{const[c,l]=t.useState(!1),[w,o]=t.useState(!1),[n,e]=t.useState(a),r=()=>l(!0),i=()=>l(!1);return s.jsxs("div",{children:[s.jsx(h,{theme:a,openNav:r,navBg:w,setNavBg:o,setTheme:e,_theme:n}),s.jsx(d,{showNav:c,closeNav:i})]})};export{m as R};
