import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{z as a,u as k,s as P}from"./index-CORT_df8.js";import{r,a as C,L as j}from"./components-DN9bEK-g.js";import{w as E,W as L}from"./WhiteLogo-D0_DZqmS.js";import{u as _}from"./NotificationContext-DQtpxZot.js";import{h as F}from"./lib-DkU1NRFm.js";const $=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,A=a.object({email:a.string({message:"Please enter an email"}).min(7,{message:"Email must be greater than 7 characters"}).email({message:"Please enter a valid email"}),password:a.string({message:"Please enter a password"}).min(8,"Password must be at least 8 characters").regex($,"Please enter a valid password"),first_name:a.string({message:"Please enter your first name"}).min(1,{message:"First name must be at least 1 character"}).max(50,{message:"First name must be at most 50 characters"}),lastname:a.string({message:"Please enter your last name"}).min(1,{message:"Last name must be at least 1 character"}).max(50,{message:"Last name must be at most 50 characters"})}),W=()=>{var p,u,h,g;const[R,v]=r.useState(null),[z,o]=r.useState(!1),i=_();C();const[x,N]=r.useState(!1),d="Signup is successful! Please check email provided to complete signup.",l=c=>{let f=c.target.value,w=c.target.name;v(m=>({...m,[w]:f}))},y=async c=>{o(!0),i.notify("",""),await new Promise(s=>setTimeout(s,1e3));const m="https://tynk.cc"+"/api/user";try{const s=await fetch(m,{method:"POST",headers:F,body:JSON.stringify(c)});if(s.ok)i.alertCancel("",d),N(!0);else{var b=await s.json();throw new Error(`Error Code: ${s.status} - ${b.message||b.error}`)}}catch(s){i.alertCancel("",s.message);return}finally{o(!1)}},{register:n,handleSubmit:S,getValues:G,watch:T,setError:U,formState:{errors:t,isSubmitting:V}}=k({defaultValues:{},resolver:P(A)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px] `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{onSubmit:S(y),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`,children:[e.jsx("div",{className:E,children:e.jsx(L,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Create an account"}),e.jsxs("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:["Get a ",e.jsxs("b",{className:"font-bold text-black",children:["Gr",e.jsx("i",{children:"u"}),"the"]})," account"]}),e.jsxs("section",{id:"signup-section",className:`w-full ${x&&"hidden"}`,children:[e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...n("first_name",{onChange:l}),placeholder:"First name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.first_name)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(p=t==null?void 0:t.first_name)==null?void 0:p.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("lastname",{onChange:l}),placeholder:"Last name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.lastname)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(u=t==null?void 0:t.lastname)==null?void 0:u.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("email",{onChange:l}),placeholder:"Email address",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.email)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(h=t==null?void 0:t.email)==null?void 0:h.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px] `,children:[e.jsx("input",{...n("password",{onChange:l}),placeholder:"Password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.password)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(g=t==null?void 0:t.password)==null?void 0:g.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Create an account"})})]}),e.jsx("section",{className:`${x?"block":"hidden"}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`,children:d}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px] `,children:e.jsx(j,{className:"w-[85%]",to:"/web/reset_password",children:e.jsx("div",{className:`border-b w-full
                                px-[0px] py-1 text-[14px]
                                outline-none hover:underline`,children:"Forgot Password?"})})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px]`,children:e.jsx(j,{to:"/web/signin",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                            py-[2px] text-[14px] rounded-full text-center
                            text-blue-700 hover:bg-gray-100`,children:["Alread have an account? ",e.jsx("span",{children:"Sign in"})]})})})]})})})]})},B=()=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(W,{})}),D=()=>e.jsx("div",{children:e.jsx(B,{})});export{D as default};
