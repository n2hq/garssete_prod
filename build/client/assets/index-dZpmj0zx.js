import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{z as o,u as S,s as k}from"./index-CORT_df8.js";import{r as x,a as R,L as f,c as C}from"./components-DN9bEK-g.js";import{w as E,W as L}from"./WhiteLogo-CE_Ma9WS.js";import{u as $}from"./AuthContext-egtrwqF6.js";import{u as A}from"./NotificationContext-BES0JERW.js";import{h as W}from"./lib-CdsGGIGA.js";const b=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/),D=o.object({password:o.string().min(1,{message:"Please enter new password."}).min(8,{message:"Password must be up to 8 characters."}).regex(b,{message:"Please enter a valid password"}),password2:o.string().min(1,{message:"Please enter new password."}).min(8,{message:"Password must be at least 8 characters."}).regex(b,{message:"Please enter a valid password"})}).superRefine((t,n)=>{t.password!==t.password2&&n.addIssue({code:o.ZodIssueCode.custom,path:["password2"],message:"Your new password don't match"})}),F=({guid:t})=>{var h,g;const[n,j]=x.useState(null);if(!$())return null;const[V,r]=x.useState(!1),c=A();R();const[m,z]=x.useState(!1),v="Please check email provided to continue.",u=l=>{let i=l.target.value,d=l.target.name;j(p=>({...p,[d]:i}))},N=async l=>{r(!0),c.notify("","Working..."),await new Promise(a=>setTimeout(a,1e3)),l.password;const i="https://tynk.cc",d=`/api/user/reset_password/${t}`,p=i+d;try{const a=await fetch(p,{method:"PUT",headers:W,body:JSON.stringify(l)});if(a.ok)c.alertCancel("Success!","Password Successfully Changed! Use new password on next login");else{let G=a.json().then(P=>{c.alertCancel("Error!",P.message)})}}catch{return}finally{r(!1)}await new Promise(a=>setTimeout(a,1e3)),r(!1)},{register:w,handleSubmit:y,getValues:B,watch:I,setError:Z,formState:{errors:s,isSubmitting:_}}=S({defaultValues:{},resolver:k(D)});return e.jsxs("div",{className:`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px]  `,children:[e.jsx("div",{className:"hidden lg:block "}),e.jsx("div",{className:"place-content-center flex lg:place-content-end col-span-12 md:col-span-1",children:e.jsx("form",{onSubmit:y(N),children:e.jsxs("div",{className:`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `,children:[e.jsx("div",{className:E,children:e.jsx(L,{})}),e.jsx("div",{className:`text-[22px] text-center
                        mt-[30px] font-bold text-black`,children:"Reset Password"}),e.jsx("div",{className:`text-[15px] text-center
                        mt-[0px] font-light text-black`,children:"enter your email address below"}),e.jsxs("section",{className:`w-full
                            ${m&&"hidden"}`,children:[e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[30px]`,children:[e.jsx("input",{...w("password",{onChange:u}),placeholder:"Enter new password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.password)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(h=s==null?void 0:s.password)==null?void 0:h.message})]}),e.jsxs("div",{className:`w-full flex flex-col 
                        place-items-center mt-[10px]`,children:[e.jsx("input",{...w("password2",{onChange:u}),placeholder:"Retype new password",type:"password",className:`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}),(s==null?void 0:s.password2)&&e.jsx("div",{className:`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`,children:(g=s==null?void 0:s.password2)==null?void 0:g.message})]}),e.jsx("div",{className:`w-full flex flex-col 
                        place-items-center mt-[25px]`,children:e.jsx("button",{type:"submit",className:`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,children:"Reset Password"})})]}),e.jsx("section",{className:`${m?"block":"hidden"}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`,children:v}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px] `,children:e.jsx(f,{className:"w-[85%]",to:"/web/signin",children:e.jsx("div",{className:`border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,children:"Already have and account? Sign in"})})}),e.jsx("div",{className:`w-full flex flex-col 
                                            place-items-center mt-[20px]`,children:e.jsx(f,{to:"/web/signup",className:"w-[85%]",children:e.jsxs("button",{className:`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,children:["No account yet? ",e.jsx("span",{className:"text-black",children:"Create an account"})]})})})]})})})]})},T=({userGuid:t})=>e.jsx("div",{className:`bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`,children:e.jsx(F,{guid:t})}),Q=()=>{const n=C().guid;return e.jsx("div",{children:e.jsx(T,{userGuid:n})})};export{Q as default};
