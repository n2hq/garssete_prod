import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as l,u as p,L as d}from"./components-kAvIA9Ge.js";import{e as h}from"./index-B9N273Tc.js";import{U as u,H as f}from"./Hamburger-hmQTJRQN.js";import{W as g,M as w}from"./MobileNav-yHOKq_Ak.js";const v=[{title:"Search",lnk:"/web/search"},{title:"Hotels",lnk:"/web/search?q=hotels"},{title:"Travel",lnk:"/web/search?q=travel"}],H=()=>{const[n,r]=l.useState(!1),[c,b]=l.useState(!1),[j,N]=l.useState("light"),o=()=>r(!0),i=()=>r(!1),s=p(),x=new URLSearchParams(s.search).get("q")||"";return e.jsxs("div",{children:[e.jsx("div",{className:`px-[10px] z-[10] fixed w-full
        bg-white border-b-[5px] border-blue-500`,children:e.jsx("div",{className:"max-w-[1100px] mx-auto w-full",children:e.jsxs("div",{className:`w-full flex place-content-between
                    h-[60px] gap-x-2`,children:[e.jsx("div",{className:`flex place-items-center text-[#6001d2]
                        `,children:e.jsx(g,{})}),e.jsxs("div",{className:`flex place-items-center
                        gap-1 grow`,children:[e.jsx("div",{className:"w-full",children:e.jsxs("form",{action:"/web/search",className:`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,children:[e.jsx("input",{name:"q",defaultValue:x,placeholder:"Business name, address, country, state...",type:"text",className:`h-[40px] w-full px-3
                                        grow outline-none`}),e.jsx("button",{type:"submit",className:`bg-red-600 min-w-[30px] w-[30px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,children:e.jsx(h,{})})]})}),e.jsx("div",{className:` hidden md:flex place-items-center
                                min-w-fit gap-1`,children:v.map((t,m)=>{const a=s.pathname+s.search;return console.log(a),e.jsx(d,{className:`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${t.lnk.toString()===a&&a.toString()!==""&&"bg-green-200"}
                                                    
                                                `,to:t.lnk,children:t.title},m)})})]}),e.jsxs("div",{className:`flex place-items-center
                        gap-1 md:gap-4`,children:[e.jsx(u,{theme:"light"}),e.jsx(f,{theme:"light",openNav:o,navBg:c})]})]})})}),e.jsx(w,{showNav:n,closeNav:i}),e.jsx("div",{className:"h-[65px] "})]})};export{H as G};
