import{r as t,j as e}from"./components-RujwakfW.js";import{F as P,G as M}from"./index-DJx9Xc4x.js";import{B as R,a as D}from"./index-DBwm6Css.js";const C=t.createContext(null);function q(){const s=t.useContext(C);if(!s)throw new Error("useNotification must be used within a NotificationProvider");return s}const H=({children:s})=>{const[l,o]=t.useState(!1),[n,r]=t.useState(0),[a,x]=t.useState(""),[h,p]=t.useState(""),[f,w]=t.useState(""),[b,N]=t.useState(!1),[g,y]=t.useState(!1),[i,v]=t.useState(),j=()=>{o(!1)},u=()=>{o(!1),r(0),x("")};t.useEffect(()=>{u()},[]);let S={notify:async(c="Working...")=>{u(),w(c),await new Promise(d=>setTimeout(d,100)),o(!0),r(1)},cancel:u,alert:async(c,d)=>{u(),x(d||"Completed!"),p(c||"Alert"),await new Promise(m=>setTimeout(m,100)),o(!0),r(2)},alertReload:async(c,d)=>{u(),x(d||"Completed!"),p(c||"Alert"),await new Promise(m=>setTimeout(m,100)),o(!0),r(3)},confirm:async(c="Do you wish to continue?",d)=>{u(),x(c),await new Promise(m=>setTimeout(m,100)),o(!0),r(4),v(()=>d)},confirmCancel:b,confirmOk:g,alertCancel:async(c,d)=>{u(),x(d||"Completed!"),p(c||"Alert"),await new Promise(m=>setTimeout(m,100)),o(!0),r(5)}};return e.jsxs(C.Provider,{value:S,children:[l&&n===1&&e.jsx(A,{working:l,notifyMessage:f}),l&&n===2&&e.jsx(E,{handleClose:j,working:l,message:a,title:h}),l&&n===3&&e.jsx(T,{handleClose:j,working:l,title:h,message:a}),l&&n===4&&e.jsx(z,{onClose:i,working:l,message:a}),l&&n===5&&e.jsx(B,{handleClose:j,working:l,message:a,title:h}),s]})},z=({handleClose:s,working:l,message:o,handleConfirmCancel:n,setConfirmOk:r,onClose:a})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:"Confirm"}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:o})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onClick:()=>a(!1),className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Cancel"}),e.jsx("button",{onClick:()=>a(!0),className:`px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,children:"Continue"})]})]})}),A=({working:s,notifyMessage:l})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:"Processing..."}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsxs("div",{className:` px-3 py-3 h-fit
                        flex place-items-center gap-2`,children:[e.jsx(P,{className:`text-3xl text-blue-500 ${s?"animate-spin":""}`}),l]})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:" "})]})}),E=({handleClose:s,working:l,message:o,title:n})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:n}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:o})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onMouseDown:s,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"}),e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})]})]})}),T=({handleClose:s,working:l,message:o,title:n})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:n}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:o})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})})]})}),B=({handleClose:s,working:l,message:o,title:n})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`,children:n}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:o})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:s,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"})})]})});function G(s){return M({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"},child:[]}]})(s)}const k=t.createContext(null);function J(){const s=t.useContext(k);if(!s)throw new Error("useSliderContext must be used within a SliderProvider");return s}const I="https://oxbyt.com",K=({children:s})=>{const[l,o]=t.useState(!1),[n,r]=t.useState(null),[a,x]=t.useState(!1),[h,p]=t.useState(0),[f,w]=t.useState(null);t.useRef(0),t.useRef(0);const b=()=>{o(!1)},N=()=>{p(i=>i===0?a.length-1:i-1)},g=()=>{p(i=>i===a.length-1?0:i+1)};t.useEffect(()=>{n!==null&&p(n-1)},[n]);let y={dialog:l,setDialog:o,selectedSlide:n,setSelectedSlide:r,slides:a,setGallery:x,setListing:w};return e.jsxs(k.Provider,{value:y,children:[l&&e.jsx("div",{className:`flex w-screen h-screen bg-white z-[5000] 
                fixed top-0 left-0 right-0 bottom-0 `,children:e.jsxs("div",{className:"grid grid-cols-12 gap-0 ",children:[e.jsxs("div",{className:"col-span-12 md:col-span-9 w-full h-full relative bg-black flex",children:[e.jsx("div",{className:" w-auto h-screen flex overflow-hidden",children:a&&n&&a.map((i,v)=>e.jsx("img",{src:I+i.image_url,alt:"",style:{transform:`translateX(-${h*100}%)`},className:`object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`},v))}),e.jsx("button",{onMouseDown:N,className:`block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`,children:e.jsx(R,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:g,className:`block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer right-0 group 
                                                     transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`,children:e.jsx(D,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("div",{onMouseDown:()=>b(),className:`w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,children:e.jsx(G,{className:"text-[30px]"})})]}),e.jsxs("div",{className:"hidden md:block md:col-span-3 px-5",children:[e.jsxs("h1",{className:" text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]",children:["Photos for ",f&&f.title]}),e.jsxs("div",{className:" my-4 ",children:[h+1," / ",a.length]}),e.jsx("hr",{}),e.jsx("div",{className:" my-4",children:a[h].image_title})]})]})}),s]})};export{G as I,H as N,K as S,q as a,J as u};
