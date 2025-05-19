import{j as e,L as o,r as l}from"./components-RujwakfW.js";import{n as i,L as c,H as x,M as d}from"./MobileNav-CrAPO416.js";import{S as m}from"./SearchBox-CqR54RXy.js";import"./index-DJx9Xc4x.js";const h=({navBg:a})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"hidden lg:flex place-items-center space-x-14 h-full ",children:i.map((t,s)=>e.jsx(o,{to:t.url,children:e.jsx("span",{className:`text-white
                                font-light tracking-normal text-[13px] font-sans
                                hover:text-white/40`,children:t.label})},s))})}),f=({openNav:a})=>{const[t,s]=l.useState(!1),[n]=l.useState(1);return l.useEffect(()=>{const r=()=>{window.scrollY>=n&&s(!0),window.scrollY<n&&s(!1)};window.onscroll=()=>r()},[n]),e.jsx("div",{className:`${t?"bg-gray-800":"bg-black/30"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition-all ease-in-out duration-0`,children:e.jsxs("div",{className:`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `,children:[e.jsx(c,{theme:"dark"}),e.jsx(h,{navBg:t}),e.jsx("div",{children:e.jsx(x,{openNav:a,navBg:t})})]})})},p=()=>{const[a,t]=l.useState(!1),[s]=l.useState(!1),n=()=>t(!0),r=()=>t(!1);return e.jsxs("div",{children:[e.jsx(f,{openNav:n,navBg:s}),e.jsx(d,{showNav:a,closeNav:r})]})},u=()=>e.jsxs("div",{className:`w-full h-screen bg-[#0f0715] overflow-hidden
        relative bg-[url('/images/hero.jpg')] bg-cover bg-center`,children:[e.jsx("div",{className:" absolute inset-0 bg-black opacity-50"}),e.jsxs("div",{className:`flex justify-center items-center flex-col
                max-w-[1100px] w-full mx-auto relative h-full
                `,children:[e.jsx("h1",{className:`text-white text-center
                    text-[13px] sm:text-[15px] uppercase font-light
                    font-sans`,children:"The Best Way To"}),e.jsx("h1",{className:`text-center font-sans font-[800]
                    text-2xl sm:text-4xl text-white mt-4
                    tracking-wide`,children:"Discover. Connect. Grow"}),e.jsx("p",{className:`mt-4 text-center text-[12px] sm:text-[15px] 
                    text-gray-200 font-sans font-light`,children:"More than 745,000 businesses, places & people."}),e.jsx("div",{className:"mt-6 w-full",children:e.jsx(m,{})}),e.jsx("div",{className:`text-white mt-[10px] text-[12px] text-center
                      max-w-[800px] w-full px-[50px]`,children:"Get to know and visit the best of local businesses across the globe. Smartest way to find and be found."})]})]}),v=()=>e.jsx("div",{className:"overflow-hidden",children:e.jsx(u,{})}),b=()=>[{title:"New Remix App"},{name:"description",content:"Welcome to Remix!"}];function S(){return e.jsxs("div",{children:[e.jsx(p,{}),e.jsx(v,{})]})}export{S as default,b as meta};
