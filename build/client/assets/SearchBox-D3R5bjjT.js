import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as n}from"./components-kAvIA9Ge.js";import{B as l}from"./index-wRf14-2l.js";const i=({query:t})=>{const[o,a]=n.useState(""),s=r=>{a(r.target.value)};return n.useEffect(()=>{t!=null&&a(t)},[t]),e.jsx(e.Fragment,{children:e.jsx("form",{action:"/web/search",method:"get",children:e.jsx("div",{className:"mx-[15px]",children:e.jsxs("div",{className:`max-w-[800px] mx-auto w-full
                        bg-white rounded-full flex overflow-hidden
                        p-[5px] gap-x-1`,children:[e.jsx("input",{name:"q",value:o,onChange:r=>s(r),type:"text",className:`w-full p-3 outline-none
                                bg-blue-100 rounded-full`,placeholder:"Enter an address, city, state or country"}),e.jsx("button",{type:"submit",className:`text-black bg-blue-500 rounded-full
                                border-none font-bold overflow-hidden min-w-[50px] w-[50px]
                                h-[50px] flex justify-center items-center`,children:e.jsx(l,{})})]})})})})};export{i as S};
