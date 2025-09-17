import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{u as P,s as E}from"./zod-PtQGc9r6.js";import{r as c,a as R,L as u}from"./components-CCwaTRgT.js";import{w as C,W as L}from"./WhiteLogo-E4eqNMj1.js";import{u as O}from"./AuthContext-BLT8eIBS.js";import{u as F}from"./NotificationContext-u_i63fMA.js";import{V as p}from"./lib-CC-22j43.js";import{z as h}from"./index-C4bLmoCR.js";import{u as V}from"./OperationContext-CaoUEJma.js";const W=h.object({username:h.string({message:"Please enter an email"}).min(7,{message:"Email must be greater than 7 characters"}).email({message:"Please enter a valid email"})}),z=()=>{var x;const[T,f]=c.useState(null),o=O();if(!o)return null;const[$,l]=c.useState(!1);F(),R();const[i,g]=c.useState(!1),w="Please check email provided to continue.",{showOperation:b,showError:j,completeOperation:m,showSuccess:v}=V(),N=a=>{let d=a.target.value,n=a.target.name;f(s=>({...s,[n]:d}))},y=async a=>{l(!0),b("processing"),await new Promise(r=>setTimeout(r,1e3));const n={email:a.username},s=await o.resetpw(n);JSON.stringify(s).includes("Error")?(l(!1),j("Error",p(s)),m()):(v("Success",p(s)),await new Promise(r=>setTimeout(r,1e3)),m(),l(!1),g(!0))},{register:S,handleSubmit:k,getValues:B,watch:H,setError:J,formState:{errors:t,isSubmitting:M}}=P({defaultValues:{},resolver:E(W)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] z-[10] `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{onSubmit:k(y),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `,children:[e.jsx("div",{className:C,children:e.jsx(L,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Reset Password"}),e.jsx("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:"enter your email address below"}),e.jsxs("section",{className:`w-full
                            ${i&&"hidden"}`,children:[e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...S("username",{onChange:N}),placeholder:"Email address",type:"text",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(t==null?void 0:t.username)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(x=t==null?void 0:t.username)==null?void 0:x.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{type:"submit",className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Send recovery email"})})]}),e.jsx("section",{className:`${i?"block":"hidden"}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`,children:w}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px] `,children:e.jsx(u,{className:"w-[85%]",to:"/web/signin",children:e.jsx("div",{className:`border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,children:"Already have and account? Sign in"})})}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px]`,children:e.jsx(u,{to:"/web/signup",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,children:["No account yet? ",e.jsx("span",{className:"text-black",children:"Create an account"})]})})})]})})})]})},A=()=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('/images/drone.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center `,children:e.jsx(z,{})}),Z=()=>e.jsx("div",{children:e.jsx(A,{})});export{Z as default};
