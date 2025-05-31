import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as l,u as f,L as x}from"./components-kAvIA9Ge.js";import{M as g,C as w,b as v}from"./MobileNav-CH-uPZo-.js";import{B as j,u as b}from"./index-Dn2vcGOX.js";import{U as N,H as y}from"./UserMenu-DtOcBLhr.js";const S=[{title:"Search",lnk:"/web/search"},{title:"Hotels",lnk:"/web/search?q=hotels"},{title:"Travel",lnk:"/web/search?q=travel"}],k=()=>{const[a,t]=l.useState(!1),[n,s]=l.useState(!1),[c,d]=l.useState("light"),i=()=>t(!0),h=()=>t(!1),m=f();return e.jsxs("div",{children:[e.jsx("div",{className:`px-[15px] z-[10] fixed w-full
        bg-white border-b-[5px] border-green-500`,children:e.jsx("div",{className:"w-full mx-auto",children:e.jsxs("div",{className:`w-full flex place-content-between
                    h-[60px] gap-x-5`,children:[e.jsx("div",{className:`flex place-items-center
                        `,children:e.jsx(x,{to:"/",children:e.jsxs("div",{className:`font-black text-2xl
                                    tracking-tight`,children:["Gr",e.jsx("i",{children:"ü"}),"the"]})})}),e.jsxs("div",{className:`flex place-items-center
                        gap-5 grow`,children:[e.jsx("div",{className:"w-full",children:e.jsxs("form",{action:"/web/search",className:`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,children:[e.jsx("input",{name:"q",placeholder:"Business name, address, country, state...",type:"text",className:`h-[40px] w-full px-3
                                        grow outline-none`}),e.jsx("button",{type:"submit",className:`bg-red-600 min-w-[30px] w-[30px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,children:e.jsx(j,{})})]})}),e.jsx("div",{className:` hidden md:flex place-items-center
                                min-w-fit gap-1`,children:S.map((o,u)=>{const p=m.search,r=decodeURI(p);return console.log(r),e.jsx(x,{className:`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${o.lnk.toString().includes(r)&&r.toString()!==""&&"bg-green-200"}`,to:o.lnk,children:o.title},u)})})]}),e.jsxs("div",{className:`flex place-items-center
                        gap-4`,children:[e.jsx(N,{theme:"light"}),e.jsx(y,{theme:"light",openNav:i,navBg:n})]})]})})}),e.jsx(g,{showNav:a,closeNav:h})]})},$=({children:a})=>{const[t,n]=l.useState(!0),{user:s}=b(),[c,d]=l.useState(!0),i=()=>{n(t===!1)};return l.useEffect(()=>{(s==null?void 0:s.guid)!==null&&(s==null?void 0:s.guid)!==void 0&&(s==null?void 0:s.guid)!==""?d(!1):window.location.href="/web/signin"},[s]),c?e.jsx("div",{className:"flex justify-center items-center h-screen",children:e.jsx("div",{className:"text-lg",children:"Loadings..."})}):e.jsxs("div",{className:"h-screen flex flex-col relative",children:[e.jsx(k,{}),e.jsx("button",{onClick:i,className:`text-xl text-white bg-blue-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${t?"left-[295px]":"left-[15px]"}
                focus:outline-none fixed z-50 top-[60px]
                transition-all duration-300 ease-in-out
                hidden md:block`,children:e.jsx(w,{className:`${t?"rotate-0 transition-all duration-300 ease-in-out":"rotate-90 transition-all duration-300 ease-in-out"}`})}),e.jsxs("div",{className:`flex flex-1 pt-[65px] h-full
                overflow-hidden`,children:[e.jsxs("aside",{className:`bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-300 ease-in-out border-r shadow-md
                        hidden md:block
                        ${t?"w-[350px] min-w-[350px]":"w-0 min-w-0 overflow-hidden"}`,children:[e.jsx("div",{className:"mt-[20px]"}),e.jsx(v,{}),e.jsx("div",{className:"h-[20px]"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto bg-gray-100 py-6 px-[15px]",children:e.jsx("div",{className:`max-w-[100%] md:max-w-[80%] mx-auto w-full  
                        `,children:a})})]})]})},q=({children:a,title:t})=>e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-lg",children:t}),e.jsx("div",{className:`mt-4 bg-white px-[15px] pt-4 
                rounded-lg shadow-md pb-8 `,children:a})]});export{$ as A,q as C};
