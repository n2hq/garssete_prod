import{r as t,u as a,j as e,L as l}from"./components-UScJPEQZ.js";import{R as r}from"./ResponsiveNav-Crhzu24l.js";import{z as s,u as n,s as c}from"./index-DFVatVxl.js";import{L as o}from"./MobileNav-Dwu4z7_7.js";import{u as i}from"./AuthContext-BglKvpdT.js";import{u as x}from"./NotificationContext-0di_V1FR.js";import"./index-BFtw7xUU.js";const m=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,p=s.object({username:s.string({message:"Please enter an email"}).min(7,{message:"Email must be greater than 7 characters"}).email({message:"Please enter a valid email"}),password:s.string({message:"Please enter a password"}).min(8,"Password must be at least 8 characters").regex(m,"Please enter a valid password")}),d=()=>{const[g,h]=t.useState(null),{signin:f}=i(),[b,w]=t.useState(!1);x(),a();const{register:j,handleSubmit:v,getValues:N,watch:y,setError:S,formState:{errors:P,isSubmitting:k}}=n({defaultValues:{},resolver:c(p)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] shadow-lg shadow-gray-500`,children:[e.jsx("div",{className:"",children:e.jsx(o,{theme:"light"})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[50px] font-bold text-blue-800`,children:"Sign in to your account"}),e.jsx("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:"using your Comcerc account"}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[50px]`,children:e.jsx("input",{placeholder:"Email address",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[15px] `,children:e.jsx("input",{placeholder:"Password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`})}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Sign in"})}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px] `,children:e.jsx(l,{className:"w-[85%]",to:"/web/reset_password",children:e.jsx("div",{className:`border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,children:"Forgot Password?"})})}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px]`,children:e.jsx(l,{to:"/web/signup",className:"w-[85%]",children:e.jsx("button",{className:`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,children:"Not account yet? Create an account"})})})]})})})]})},u=()=>e.jsx("div",{className:`bg-black w-full 
        bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(d,{})}),C=()=>e.jsxs("div",{children:[e.jsx(r,{theme:"light"}),e.jsx(u,{})]});export{C as default};
