import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{B as p,a as u}from"./index-zDc4iZ4F.js";import{B as f,a as g,M as j}from"./MobileNav-MwHINLMl.js";import{r as i,u as w,L as x}from"./components-kAvIA9Ge.js";import{U as N,H as v}from"./UserMenu-rqww_Ckd.js";const H=({rating:a=0,maxStars:l=5})=>{const t=[];for(let s=1;s<=l;s++)s<=a?t.push(e.jsx("span",{className:"text-yellow-500 text-lg",children:e.jsx(f,{})},s)):t.push(e.jsx("span",{className:"text-yellow-500 text-lg",children:e.jsx(g,{})},s));return e.jsxs("div",{className:" flex w-full place-items-center gap-2 mt-0",children:[e.jsx("div",{className:"flex  gap-x-[3px] -mt-[2px]",children:t}),e.jsx("div",{className:"text-gray-400",children:e.jsx(p,{className:"text-[15px] text-yellow-400"})}),e.jsxs("div",{className:" text-sm",children:["Rating: ",Number(a).toFixed(0)]})]})},b=[{title:"Search",lnk:"/web/search"},{title:"Hotels",lnk:"/web/search?q=hotels"},{title:"Travel",lnk:"/web/search?q=travel"}],M=()=>{const[a,l]=i.useState(!1),[t,s]=i.useState(!1),[S,y]=i.useState("light"),o=()=>l(!0),m=()=>l(!1),r=w(),d=new URLSearchParams(r.search).get("q")||"";return e.jsxs("div",{children:[e.jsx("div",{className:`px-[15px] z-[10] fixed w-full
        bg-white border-b-[5px] border-green-500`,children:e.jsx("div",{className:"max-w-[1100px] mx-auto w-full",children:e.jsxs("div",{className:`w-full flex place-content-between
                    h-[60px] gap-x-5`,children:[e.jsx("div",{className:`flex place-items-center
                        `,children:e.jsx(x,{to:"/",children:e.jsxs("div",{className:`font-black text-2xl
                                    tracking-tight`,children:["Gr",e.jsx("i",{children:"ü"}),"the"]})})}),e.jsxs("div",{className:`flex place-items-center
                        gap-5 grow`,children:[e.jsx("div",{className:"w-full",children:e.jsxs("form",{action:"/web/search",className:`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,children:[e.jsx("input",{name:"q",defaultValue:d,placeholder:"Business name, address, country, state...",type:"text",className:`h-[40px] w-full px-3
                                        grow outline-none`}),e.jsx("button",{type:"submit",className:`bg-red-600 min-w-[30px] w-[30px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,children:e.jsx(u,{})})]})}),e.jsx("div",{className:` hidden md:flex place-items-center
                                min-w-fit gap-1`,children:b.map((c,h)=>{const n=r.pathname+r.search;return console.log(n),e.jsx(x,{className:`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${c.lnk.toString()===n&&n.toString()!==""&&"bg-green-200"}
                                                    
                                                `,to:c.lnk,children:c.title},h)})})]}),e.jsxs("div",{className:`flex place-items-center
                        gap-4`,children:[e.jsx(N,{theme:"light"}),e.jsx(v,{theme:"light",openNav:o,navBg:t})]})]})})}),e.jsx(j,{showNav:a,closeNav:m}),e.jsx("div",{className:"h-[65px] "})]})};export{M as G,H as L};
