import{a as l}from"./axios-B6xwUs71.js";import{_ as c,l as p,m as u,r as w,n as m,c as _,a as e,w as a,e as i,q as h,f,o as g}from"./index-C6X_6u4j.js";import{P as b}from"./PasswordErrorBanner-BGHKtDgi.js";const v={components:{PasswordErrorBanner:b},data(){return{passwordError:!1,credentials:{newUsername:"",newPassword:""}}},methods:{changeCreds(){const n={username:this.credentials.newUsername,password:this.credentials.newPassword};l.patch(`http://localhost:3000/api/v1/users/${p(u()).userId}`,{username:n.username,password:n.password},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(s=>{this.passwordError=!1,w(),alert("Credenziali cambiate con successo. Effettua nuovamente il login."),this.$router.push("/login")},s=>{this.passwordError=!0}).catch(s=>{console.error("Axios Request failed",s)})}}},C={class:"login-container"},U=e("h2",null,"Cambio credenziali",-1),P={class:"input-group"},x=e("label",{for:"newUsername"},"New username",-1),E={class:"input-group"},k=e("label",{for:"newPassword"},"New password",-1),B=e("div",{class:"container_buttons_inside_form"},[e("button",{type:"submit",class:"button_inside_form"}," Change credentials "),e("button",{type:"reset",class:"button_inside_form"},"Reset")],-1);function V(n,s,q,y,r,t){const d=m("password-error-banner");return g(),_("div",C,[e("form",{onSubmit:s[2]||(s[2]=f((...o)=>t.changeCreds&&t.changeCreds(...o),["prevent"])),class:"login-form"},[U,e("div",P,[x,a(e("input",{type:"text",id:"newUsername","onUpdate:modelValue":s[0]||(s[0]=o=>r.credentials.newUsername=o),required:""},null,512),[[i,r.credentials.newUsername]])]),e("div",E,[k,a(e("input",{type:"password",id:"newPassword","onUpdate:modelValue":s[1]||(s[1]=o=>r.credentials.newPassword=o),required:""},null,512),[[i,r.credentials.newPassword]]),h(d,{show:r.passwordError},null,8,["show"])]),B],32)])}const A=c(v,[["render",V]]);export{A as default};