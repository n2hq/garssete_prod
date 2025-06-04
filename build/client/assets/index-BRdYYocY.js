import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{R as y}from"./ResponsiveNav-W8AhZ3L7.js";import{z as a,u as S,s as P}from"./index-CLh2UBG4.js";import{r,b as k,L as w}from"./components-kAvIA9Ge.js";import{W as C}from"./MobileNav-yHOKq_Ak.js";import{u as E}from"./NotificationContext-DPPa21Iw.js";import{w as L}from"./css-DPrdeFsB.js";import{i as _}from"./index-B9N273Tc.js";import"./index-CRnWyQgj.js";const F=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,R=a.object({email:a.string({message:"Please enter an email"}).min(7,{message:"Email must be greater than 7 characters"}).email({message:"Please enter a valid email"}),password:a.string({message:"Please enter a password"}).min(8,"Password must be at least 8 characters").regex(F,"Please enter a valid password"),first_name:a.string({message:"Please enter your first name"}).min(1,{message:"First name must be at least 1 character"}).max(50,{message:"First name must be at most 50 characters"}),lastname:a.string({message:"Please enter your last name"}).min(1,{message:"Last name must be at least 1 character"}).max(50,{message:"Last name must be at most 50 characters"})}),A=()=>{var x,d,p,u;const[B,b]=r.useState(null),[$,o]=r.useState(!1),c=E();k();const[z,j]=r.useState(!1),l=i=>{let h=i.target.value,g=i.target.name;b(m=>({...m,[g]:h}))},v=async i=>{o(!0),c.notify("",""),await new Promise(s=>setTimeout(s,1e3));const m="https://tynk.cc"+"/api/users";try{const s=await fetch(m,{method:"POST",headers:_,body:JSON.stringify(i)});if(s.ok)c.alertCancel("","Signup success. Please check your email to complete signup."),j(!0);else{var f=await s.json();throw new Error(`Error Code: ${s.status} - ${f.message||f.error}`)}}catch(s){c.alertCancel("",s.message);return}finally{o(!1)}},{register:n,handleSubmit:N,getValues:G,watch:T,setError:U,formState:{errors:t,isSubmitting:V}}=S({defaultValues:{},resolver:P(R)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px] `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{onSubmit:N(v),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`,children:[e.jsx("div",{className:L,children:e.jsx(C,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Create an account"}),e.jsxs("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:["Get a ",e.jsxs("b",{className:"font-bold text-black",children:["Gr",e.jsx("i",{children:"u"}),"the"]})," account"]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...n("first_name",{onChange:l}),placeholder:"First name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.first_name)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(x=t==null?void 0:t.first_name)==null?void 0:x.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("lastname",{onChange:l}),placeholder:"Last name",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.lastname)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(d=t==null?void 0:t.lastname)==null?void 0:d.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px]`,children:[e.jsx("input",{...n("email",{onChange:l}),placeholder:"Email address",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.email)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(p=t==null?void 0:t.email)==null?void 0:p.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px] `,children:[e.jsx("input",{...n("password",{onChange:l}),placeholder:"Password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.password)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(u=t==null?void 0:t.password)==null?void 0:u.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Create an account"})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px] `,children:e.jsx(w,{className:"w-[85%]",to:"/web/reset_password",children:e.jsx("div",{className:`border-b w-full
                                px-[0px] py-1 text-[14px]
                                outline-none hover:underline`,children:"Forgot Password?"})})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[20px]`,children:e.jsx(w,{to:"/web/signin",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                            py-[2px] text-[14px] rounded-full text-center
                            text-blue-700 hover:bg-gray-100`,children:["Alread have an account? ",e.jsx("span",{children:"Sign in"})]})})})]})})})]})},W=()=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(A,{})}),Q=()=>e.jsxs("div",{children:[e.jsx(y,{theme:"light"}),e.jsx(W,{})]});export{Q as default};
