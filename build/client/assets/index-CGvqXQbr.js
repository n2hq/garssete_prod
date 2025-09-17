import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{u as L,s as C}from"./zod-PtQGc9r6.js";import{r as m,a as $,L as b,u as A}from"./components-CCwaTRgT.js";import{w as O,W as D}from"./WhiteLogo-E4eqNMj1.js";import{u as F}from"./AuthContext-BLT8eIBS.js";import{u as T}from"./NotificationContext-u_i63fMA.js";import{m as V}from"./lib-CC-22j43.js";import{z as l}from"./index-C4bLmoCR.js";import{u as W}from"./OperationContext-CaoUEJma.js";const j=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/),z=l.object({password:l.string().min(1,{message:"Please enter new password."}).min(8,{message:"Password must be up to 8 characters."}).regex(j,{message:"Please enter a valid password"}),password2:l.string().min(1,{message:"Please enter new password."}).min(8,{message:"Password must be at least 8 characters."}).regex(j,{message:"Please enter a valid password"})}).superRefine((a,r)=>{a.password!==a.password2&&r.addIssue({code:l.ZodIssueCode.custom,path:["password2"],message:"Your new password don't match"})}),B=({guid:a})=>{var g,f;const[r,v]=m.useState(null);if(!F())return null;const[Z,n]=m.useState(!1);T(),$();const[x,_]=m.useState(!1),N="Please check email provided to continue.",{showOperation:y,showError:u,completeOperation:c,showSuccess:P}=W(),w=o=>{let i=o.target.value,d=o.target.name;v(p=>({...p,[d]:i}))},S=async o=>{n(!0),y("processing"),await new Promise(t=>setTimeout(t,1e3)),o.password;const i="https://edition.garssete.com",d=`/api/user/reset_password/${a}`,p=i+d;try{const t=await fetch(p,{method:"PUT",headers:V,body:JSON.stringify(o)});if(t.ok)k(),P("Success","Password changed."),c();else{let Y=t.json().then(E=>{u("Error",E.message),c()})}}catch(t){u("Error",t.message),c();return}finally{n(!1)}await new Promise(t=>setTimeout(t,1e3)),n(!1)},{register:h,handleSubmit:R,getValues:G,watch:H,setError:J,reset:k,formState:{errors:s,isSubmitting:M}}=L({defaultValues:{},resolver:C(z)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px]  `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{id:"rspw",onSubmit:R(S),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `,children:[e.jsx("div",{className:O,children:e.jsx(D,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Reset Password"}),e.jsx("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:"Enter new password below!"}),e.jsxs("section",{className:`w-full
                            ${x&&"hidden"}`,children:[e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...h("password",{onChange:w}),placeholder:"Enter new password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.password)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(g=s==null?void 0:s.password)==null?void 0:g.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[10px]`,children:[e.jsx("input",{...h("password2",{onChange:w}),placeholder:"Retype new password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.password2)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(f=s==null?void 0:s.password2)==null?void 0:f.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{type:"submit",className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Reset Password"})})]}),e.jsx("section",{className:`${x?"block":"hidden"}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`,children:N}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px] `,children:e.jsx(b,{className:"w-[85%]",to:"/web/signin",children:e.jsx("div",{className:`border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,children:"Already have and account? Sign in"})})}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px]`,children:e.jsx(b,{to:"/web/signup",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,children:["No account yet? ",e.jsx("span",{className:"text-black",children:"Create an account"})]})})})]})})})]})},I=({userGuid:a})=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(B,{guid:a})}),re=()=>{const r=A().guid;return e.jsx("div",{children:e.jsx(I,{userGuid:r})})};export{re as default};
