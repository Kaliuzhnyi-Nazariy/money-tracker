import{a as x,v as R,u as V,h as C,m as S,o as t,b as n,g as p,w,W as v,e as r,f as s,y,R as f,U as b}from"./index-yOEL-65v.js";import{u as M,_ as c}from"./InputComp.vue_vue_type_script_setup_true_lang-UMu_cGNK.js";import{_ as k}from"./IForm.vue_vue_type_script_setup_true_lang-C7410rBL.js";const q={key:1,type:"submit",class:"mt-4"},B={key:1,type:"submit",class:"mt-4"},U=x({__name:"ForgotPassword",setup(E){const o=R({email:""}),a=V(),m=C(),l=S(),{mutation:i,errorMess:g}=M({mutationFn:d=>a.forgotPasswordReq(d),onSuccess:()=>{l.setSuccess("Request successfully processed!")},onError:()=>{l.setError(g)}});return(d,e)=>(t(),n(v,null,[p(k,{"screen-size-type":"mob",class:"border border-white rounded-2xl p-4 text-center"},{default:w(()=>[r("form",{onSubmit:e[2]||(e[2]=b(()=>{s(l).resMess(),s(i)(o.email)},["prevent"])),class:"h-full my-auto"},[e[6]||(e[6]=r("h2",null,"Renew password",-1)),e[7]||(e[7]=r("p",{class:"mt-2"},"If you forgot your password it is not a big problem, write your email",-1)),s(a).userRenewToken?f("",!0):(t(),y(c,{key:0,placeholder:"Write your email",class:"mt-4",modelValue:o.email,"onUpdate:modelValue":e[0]||(e[0]=u=>o.email=u)},null,8,["modelValue"])),s(a).userRenewToken?(t(),n("button",{key:2,type:"button",onClick:e[1]||(e[1]=()=>s(m).replace("/money-tracker/renew")),class:"mt-4 bg-white text-secondary px-2 rounded-lg hover:scale-110 transition-all"}," Change password ")):(t(),n("button",q,"Send email"))],32)]),_:1}),p(k,{"screen-size-type":"pc",class:"border border-white rounded-2xl p-4 text-center"},{default:w(()=>[r("form",{onSubmit:e[5]||(e[5]=b(()=>{s(l).resMess(),s(i)(o.email)},["prevent"])),class:"h-full my-auto flex flex-col justify-center w-[80%] items-center mx-auto"},[e[8]||(e[8]=r("h2",null,"Renew password",-1)),e[9]||(e[9]=r("p",{class:"mt-2"},"If you forgot your password it is not a big problem, write your email",-1)),s(a).userRenewToken?f("",!0):(t(),y(c,{key:0,placeholder:"Write your email",class:"mt-4",modelValue:o.email,"onUpdate:modelValue":e[3]||(e[3]=u=>o.email=u)},null,8,["modelValue"])),s(a).userRenewToken?(t(),n("button",{key:2,type:"button",onClick:e[4]||(e[4]=()=>s(m).replace("/money-tracker/renew")),class:"mt-4 bg-white text-secondary px-2 rounded-lg hover:scale-110 transition-all"}," Change password ")):(t(),n("button",B,"Send email"))],32)]),_:1})],64))}});export{U as default};
