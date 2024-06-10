import{_,h as g,k as v,j as m,i as f,x as b,l as d,m as c,n as k,c as l,a as s,y as i,z as n,w as I,t as A,q as y,u as C,F as L,o as a}from"./index-C6X_6u4j.js";import{a as h}from"./axios-B6xwUs71.js";const P={data(){return{isVolunteer:g(),isCertifier:v(),isOperator118:m(),isLoggedIn:f(),isAvailable:b(),name:"",surname:"",username:"",email:"",latitude:"",longitude:"",isLoading:!0,showPopup:!1}},created(){h.get(`http://localhost:3000/api/v1/users/${d(c()).userId}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(t=>{this.isAvailable=t.data.volunteer.isAvailable,this.name=t.data.name,this.surname=t.data.surname,this.email=t.data.email,this.username=t.data.username,this.latitude=t.data.latitude,this.longitude=t.data.longitude,this.isLoading=!1})},methods:{updateAvailability(){const t={isAvailable:!this.isAvailable};h.patch(`http://localhost:3000/api/v1/users/${d(c()).userId}`,t,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(o=>{console.log("Availability modified:",o.data),this.isAvailable=t.isAvailable}).catch(o=>{o.response?this.errorMessage=o.response.data:this.errorMessage="Error fetching data"})},deleteProfile(){showPopup=!1,h.delete(`http://localhost:3000/api/v1/users/${d(c()).userId}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(t=>{alert("Profile deleted"),localStorage.removeItem("token"),this.$router.push("/")}).catch(t=>{t.response?this.errorMessage=t.response.data:this.errorMessage="Error fetching data"})}}},w={class:"profile-section"},E=s("h2",null,"PROFILE",-1),x={class:"profile-info"},N={class:"personal-info"},V={key:0},S={key:1},B={key:2},M={key:3},O={key:4},z={class:"personal-info"},D={key:0,class:"availability-container"},F=s("p",null,"Is Available:",-1),T={class:"switch"},Y=s("span",{class:"slider"},null,-1),R={class:"button_container_universal"},U=s("div",{class:"button_text_universal"},"CHANGE CREDENTIALS",-1),j=s("div",{class:"button_text_universal"},"DELETE PROFILE",-1),q=[j],G={key:0,class:"popup"},H=s("p",null,"Are you sure you want to delete your profile?",-1);function J(t,o,K,Q,e,u){const p=k("router-link");return a(),l(L,null,[s("div",w,[E,s("div",x,[s("div",N,[e.isLoggedIn?(a(),l("p",V," Name: "+i(e.name),1)):n("",!0),e.isLoggedIn?(a(),l("p",S," Surname: "+i(e.surname),1)):n("",!0),e.isLoggedIn?(a(),l("p",B," Username: "+i(e.username),1)):n("",!0),e.isLoggedIn?(a(),l("p",M," Mail: "+i(e.email),1)):n("",!0),e.isLoggedIn?(a(),l("p",O," Position: [ "+i(e.latitude)+" , "+i(e.longitude)+" ]",1)):n("",!0)]),s("div",z,[s("p",null,"Is Volunteer: "+i(e.isVolunteer?"Yes":"No"),1),s("p",null,"Is Certifier: "+i(e.isCertifier?"Yes":"No"),1),s("p",null,"Is Operator118: "+i(e.isOperator118?"Yes":"No"),1),s("p",null,"Is Logged In: "+i(e.isLoggedIn?"Yes":"No"),1),e.isVolunteer?(a(),l("div",D,[F,s("label",T,[I(s("input",{type:"checkbox","onUpdate:modelValue":o[0]||(o[0]=r=>e.isAvailable=r),onClick:o[1]||(o[1]=r=>u.updateAvailability())},null,512),[[A,e.isAvailable]]),Y])])):n("",!0)])])]),s("div",R,[y(p,{to:"/changeCredentials",class:"button_universal"},{default:C(()=>[U]),_:1}),s("button",{class:"button_universal",onClick:o[2]||(o[2]=r=>e.showPopup=!0)},q)]),e.showPopup?(a(),l("div",G,[H,s("button",{class:"button_popup",onClick:o[3]||(o[3]=(...r)=>u.deleteProfile&&u.deleteProfile(...r))},"Agree"),s("button",{class:"button_popup",onClick:o[4]||(o[4]=r=>e.showPopup=!1)},"Cancel")])):n("",!0)],64)}const Z=_(P,[["render",J]]);export{Z as default};
