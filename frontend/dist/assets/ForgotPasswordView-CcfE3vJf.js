import{a as i}from"./axios-B6xwUs71.js";import{_ as d,c as n,z as c,a as t,w as u,e as m,f as h,o as l}from"./index-C6X_6u4j.js";const p={data(){return{email:"",showError:!1}},methods:{checkEmail(){i.get(`http://localhost:3000/api/v1/users/email/${this.email}`).then(s=>{s.status===200?i.post("http://localhost:3000/api/v1/emails/reset-password",{email:this.email,frontendBaseUrl:window.location.origin}).then(e=>{e.status===200?alert("Email sent"):alert(`Error sending email
Please try again`)}).catch(e=>{console.error("Axios request failed:",e)}):alert(`Email not found
Please try again`)}).catch(s=>{s.response&&s.response.status===404&&(this.showError=!0,setTimeout(()=>{this.showError=!1},5e3)),console.error("Axios request failed:",s)})}}},f={class:"centered-square"},_=t("h1",null,"Forgot Password",-1),w=t("p",null," Enter your email address and we will send you a link to reset your password. ",-1),E={key:0,class:"error-banner"},g={class:"input-group"},k=t("button",{type:"submit",class:"send-reset-button"},"Send reset link",-1);function v(s,e,y,x,o,a){return l(),n("div",f,[_,w,o.showError?(l(),n("div",E,"User not found")):c("",!0),t("form",{onSubmit:e[1]||(e[1]=h((...r)=>a.checkEmail&&a.checkEmail(...r),["prevent"]))},[t("div",g,[u(t("input",{type:"email",id:"email",required:"","onUpdate:modelValue":e[0]||(e[0]=r=>o.email=r)},null,512),[[m,o.email]])]),k],32)])}const B=d(p,[["render",v]]);export{B as default};