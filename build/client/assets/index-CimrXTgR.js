import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{u as L,s as _}from"./zod-PtQGc9r6.js";import{r as m,a as C,L as j}from"./components-CCwaTRgT.js";import{w as F,W as A}from"./WhiteLogo-zPIAMy-v.js";import{u as O}from"./NotificationContext-BTIpeXPg.js";import{J as W,p as $}from"./lib-248wCR0N.js";import{z as a}from"./index-C4bLmoCR.js";import{u as B}from"./OperationContext-CaoUEJma.js";const R=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,T=a.object({email:a.string({message:"Please enter an email"}).min(7,{message:"Email must be greater than 7 characters"}).email({message:"Please enter a valid email"}),password:a.string({message:"Please enter a password"}).min(8,"Password must be at least 8 characters").regex(R,"Please enter a valid password"),first_name:a.string({message:"Please enter your first name"}).min(1,{message:"First name must be at least 1 character"}).max(50,{message:"First name must be at most 50 characters"}),lastname:a.string({message:"Please enter your last name"}).min(1,{message:"Last name must be at least 1 character"}).max(50,{message:"Last name must be at most 50 characters"})}),z=()=>{var p,u,g,h;const[M,v]=m.useState(null),[U,r]=m.useState(!1);O(),C();const[o,N]=m.useState(!1),x="Signup is successful! Please check email provided to complete signup.",{showOperation:y,showError:S,completeOperation:d,showSuccess:E}=B(),l=i=>{let f=i.target.value,w=i.target.name;v(c=>({...c,[w]:f}))},P=async i=>{r(!0),y("processing"),await new Promise(t=>setTimeout(t,1e3));const c="https://edition.garssete.com"+"/api/user";try{const t=await fetch(c,{method:"POST",headers:$,body:JSON.stringify(i)});if(t.ok)E("Success",x),d(),N(!0);else{var b=await t.json();throw new Error(`${b.message||b.error}`)}}catch(t){S("Error",t.message),d();return}finally{r(!1)}},{register:n,handleSubmit:k,getValues:V,watch:G,setError:H,formState:{errors:s,isSubmitting:I}}=L({defaultValues:{},resolver:_(T)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{onSubmit:k(P),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`,children:[e.jsx("div",{className:F,children:e.jsx(A,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Create an account"}),e.jsxs("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:["Get a ",e.jsx("b",{className:"font-bold text-black",children:W.SITENAME})," account"]}),e.jsxs("section",{id:"signup-section",className:`w-full ${o&&"hidden"}`,children:[e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...n("first_name",{onChange:l}),placeholder:"First name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.first_name)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(p=s==null?void 0:s.first_name)==null?void 0:p.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("lastname",{onChange:l}),placeholder:"Last name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.lastname)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(u=s==null?void 0:s.lastname)==null?void 0:u.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("email",{onChange:l}),placeholder:"Email address",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.email)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(g=s==null?void 0:s.email)==null?void 0:g.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px] `,children:[e.jsx("input",{...n("password",{onChange:l}),placeholder:"Password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.password)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(h=s==null?void 0:s.password)==null?void 0:h.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Create an account"})})]}),e.jsx("section",{className:`${o?"block":"hidden"}
                            text-black. w-[90%] text-[16px] text-center
                            mt-[50px] mb-[25px] leading-[1.4em]
                            bg-yellow-50 text-yellow-900 px-1.5 py-4
                            rounded`,children:x}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px] `,children:e.jsx(j,{className:"w-[85%]",to:"/web/reset_password",children:e.jsx("div",{className:`border-b w-full
                                px-[0px] py-1 text-[14px]
                                outline-none hover:underline`,children:"Forgot Password?"})})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px]`,children:e.jsx(j,{to:"/web/signin",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                            py-[2px] text-[14px] rounded-full text-center
                            text-blue-700 hover:bg-gray-100`,children:["Alread have an account? ",e.jsx("span",{children:"Sign in"})]})})})]})})})]})},J=()=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('/images/mobiletab.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(z,{})}),se=()=>e.jsx("div",{children:e.jsx(J,{})});export{se as default};
