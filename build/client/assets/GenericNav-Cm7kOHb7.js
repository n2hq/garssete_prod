import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as a,u as p,L as h}from"./components-kAvIA9Ge.js";import{e as d}from"./index-BXHtOMuL.js";import{U as u,H as f}from"./Hamburger-D7h4OXGR.js";import{W as g,M as w}from"./MobileNav-DSoEjn7G.js";const v=[{title:"Search",lnk:"/web/search"},{title:"Hotels",lnk:"/web/search?q=hotels"},{title:"Travel",lnk:"/web/search?q=travel"}],H=()=>{const[n,l]=a.useState(!1),[c,j]=a.useState(!1),[N,b]=a.useState("light"),i=()=>l(!0),o=()=>l(!1),s=p(),x=new URLSearchParams(s.search).get("q")||"";return e.jsxs("div",{children:[e.jsx("div",{className:`px-[10px] z-[10] fixed w-full
        bg-white shadow-md `,children:e.jsx("div",{className:"max-w-[1100px] mx-auto w-full",children:e.jsxs("div",{className:`w-full flex place-content-between
                    h-[60px] gap-x-2`,children:[e.jsx("div",{className:`flex place-items-center text-black
                        `,children:e.jsx(g,{})}),e.jsxs("div",{className:`flex place-items-center
                        gap-1 grow`,children:[e.jsx("div",{className:"w-full",children:e.jsxs("form",{action:"/web/search",className:`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,children:[e.jsx("input",{name:"q",defaultValue:x,placeholder:"Business name, address, country, state...",type:"text",className:`h-[40px] w-full px-3
                                        grow outline-none`}),e.jsx("button",{type:"submit",className:`bg-blue-500 min-w-[30px] w-[60px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,children:e.jsx(d,{})})]})}),e.jsx("div",{className:` hidden md:flex place-items-center
                                min-w-fit gap-1`,children:v.map((t,m)=>{const r=s.pathname+s.search;return e.jsx(h,{className:`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded-full
                                                font-semibold
                                                ${t.lnk.toString()===r&&r.toString()!==""&&"bg-gray-700 text-white"}
                                                    
                                                `,to:t.lnk,children:t.title},m)})})]}),e.jsxs("div",{className:`flex place-items-center
                        gap-1 md:gap-4`,children:[e.jsx(u,{theme:"light"}),e.jsx(f,{theme:"light",openNav:i,navBg:c})]})]})})}),e.jsx(w,{showNav:n,closeNav:o}),e.jsx("div",{className:"h-[65px] "})]})};export{H as G};
