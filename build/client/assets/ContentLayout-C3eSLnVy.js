import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as a,u as p,L as f}from"./components-DN9bEK-g.js";import{U as g,H as v,M as w,c as j,L as N}from"./MobileNav-D7FcM9wJ.js";import{e as b}from"./index-BuMB8ucW.js";import{W as y}from"./WhiteLogo-D0_DZqmS.js";import{H as S}from"./HomeNav-sGChEP8Q.js";import{u as L}from"./AuthContext-Bd05mLB0.js";const k=[{title:"Search",lnk:"/web/search"},{title:"Hotels",lnk:"/web/search?q=hotels"},{title:"Travel",lnk:"/web/search?q=travel"}],H=()=>{const[n,t]=a.useState(!1),[i,s]=a.useState(!1),[d,x]=a.useState("light"),c=()=>t(!0),o=()=>t(!1),r=p();return e.jsxs("div",{children:[e.jsx("div",{className:`px-[15px] z-[1000] fixed w-full
        bg-white shadow-md`,children:e.jsx("div",{className:"w-full mx-auto",children:e.jsxs("div",{className:`w-full flex place-content-between
                    h-[60px] gap-x-5`,children:[e.jsx("div",{className:`flex place-items-center
                        `,children:e.jsx(y,{})}),e.jsxs("div",{className:`flex place-items-center
                        gap-5 grow`,children:[e.jsx("div",{className:"w-full",children:e.jsxs("form",{action:"/web/search",className:`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,children:[e.jsx("input",{name:"q",placeholder:"Business name, address, country, state...",type:"text",className:`h-[40px] w-full px-3
                                        grow outline-none`}),e.jsx("button",{type:"submit",className:`bg-blue-600 min-w-[60px] w-[60px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,children:e.jsx(b,{})})]})}),e.jsx("div",{className:` hidden md:flex place-items-center
                                min-w-fit gap-1`,children:k.map((l,u)=>{const h=r.search,m=decodeURI(h);return e.jsx("div",{children:e.jsx(f,{className:`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${l.lnk.toString().includes(m)&&m.toString()!==""&&"bg-green-200"}`,to:l.lnk,children:l.title})},u)})})]}),e.jsxs("div",{className:`flex place-items-center
                        gap-4`,children:[e.jsx(g,{theme:"light"}),e.jsx(v,{theme:"light",openNav:c,navBg:i})]})]})})}),e.jsx(w,{showNav:n,closeNav:o})]})},E=({children:n})=>{const[t,i]=a.useState(!0),s=L(),[d,x]=a.useState(!0),c=()=>{i(t===!1)};return a.useEffect(()=>{var o,r,l;((o=s==null?void 0:s.user)==null?void 0:o.guid)!==null&&((r=s==null?void 0:s.user)==null?void 0:r.guid)!==void 0&&((l=s==null?void 0:s.user)==null?void 0:l.guid)!==""?x(!1):window.location.href="/web/signin"},[s==null?void 0:s.user]),d?e.jsx("div",{className:"flex justify-center items-center h-screen",children:e.jsx("div",{className:"text-lg",children:"Loading..."})}):e.jsxs("div",{className:"h-screen flex flex-col relative",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(S,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(H,{})}),e.jsx("button",{onClick:c,className:`text-xl text-white bg-blue-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${t?"left-[295px]":"left-[15px]"}
                focus:outline-none fixed z-50 top-[60px]
                transition-all duration-300 ease-in-out
                hidden md:block`,children:e.jsx(j,{className:`${t?"rotate-0 transition-all duration-300 ease-in-out":"rotate-90 transition-all duration-300 ease-in-out"}`})}),e.jsxs("div",{className:`flex flex-1 md:mt-[60px] h-full
                overflow-hidden`,children:[e.jsxs("aside",{className:`bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-300 ease-in-out border-r shadow-md
                        hidden md:block
                        ${t?"w-[350px] min-w-[350px]":"w-0 min-w-0 overflow-hidden"}`,children:[e.jsx("div",{className:"mt-[20px]"}),e.jsx(N,{}),e.jsx("div",{className:"h-[20px]"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto bg-gray-100 py-6 px-[15px]",children:e.jsx("div",{className:`max-w-[100%] md:max-w-[80%] mx-auto w-full  
                        `,children:n})})]})]})},U=({children:n,title:t})=>e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-lg",children:t}),e.jsx("div",{className:`mt-4 bg-white px-[15px] pt-4 
                rounded-lg shadow-md pb-8 `,children:n})]});export{E as A,U as C};
