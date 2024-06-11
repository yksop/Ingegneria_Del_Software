import{L as a}from"./leaflet-src-DJNHV9I0.js";import{a as h}from"./axios-B6xwUs71.js";import{c as k}from"./_commonjsHelpers-Cpj98o6Y.js";import{_ as y,i as v,g as M,c as C,w as A,v as _,a as u,o as I,p as T,b as S}from"./index-C6X_6u4j.js";(function(l,s,m){L.AwesomeMarkers={},L.AwesomeMarkers.version="2.0.1",L.AwesomeMarkers.Icon=L.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"awesome-marker",prefix:"glyphicon",spinClass:"fa-spin",extraClasses:"",icon:"home",markerColor:"blue",iconColor:"white"},initialize:function(i){i=L.Util.setOptions(this,i)},createIcon:function(){var i=s.createElement("div"),t=this.options;return t.icon&&(i.innerHTML=this._createInner()),t.bgPos&&(i.style.backgroundPosition=-t.bgPos.x+"px "+-t.bgPos.y+"px"),this._setIconStyles(i,"icon-"+t.markerColor),i},_createInner:function(){var i,t="",n="",e="",o=this.options;return o.icon.slice(0,o.prefix.length+1)===o.prefix+"-"?i=o.icon:i=o.prefix+"-"+o.icon,o.spin&&typeof o.spinClass=="string"&&(t=o.spinClass),o.iconColor&&(o.iconColor==="white"||o.iconColor==="black"?n="icon-"+o.iconColor:e="style='color: "+o.iconColor+"' "),"<i "+e+"class='"+o.extraClasses+" "+o.prefix+" "+i+" "+t+" "+n+"'></i>"},_setIconStyles:function(i,t){var n=this.options,e=L.point(n[t==="shadow"?"shadowSize":"iconSize"]),o;t==="shadow"?o=L.point(n.shadowAnchor||n.iconAnchor):o=L.point(n.iconAnchor),!o&&e&&(o=e.divideBy(2,!0)),i.className="awesome-marker-"+t+" "+n.className,o&&(i.style.marginLeft=-o.x+"px",i.style.marginTop=-o.y+"px"),e&&(i.style.width=e.x+"px",i.style.height=e.y+"px")},createShadow:function(){var i=s.createElement("div");return this._setIconStyles(i,"shadow"),i}}),L.AwesomeMarkers.icon=function(i){return new L.AwesomeMarkers.Icon(i)}})(k,document);const E={name:"HomePageView",data(){return{selectedMap:"osm",map:null,markers:[],tileLayer:null}},mounted(){this.map=a.map("map").setView([46.065,11.124],14),this.changeMap();const l=a.AwesomeMarkers.icon({icon:"info-sign",markerColor:"green",prefix:"glyphicon"}),s=a.AwesomeMarkers.icon({icon:"info-sign",markerColor:"purple",prefix:"glyphicon"}),m=a.AwesomeMarkers.icon({icon:"info-sign",markerColor:"orange",prefix:"glyphicon"}),i=a.AwesomeMarkers.icon({icon:"info-sign",markerColor:"red",prefix:"glyphicon"}),t=a.AwesomeMarkers.icon({icon:"info-sign",markerColor:"blue",prefix:"glyphicon"});if(h.get("http://localhost:3000/api/v1/daes").then(e=>{e.data.forEach(r=>{var p="<b>"+r.fumetto+"</b><br><a href='https://www.google.com/maps/dir//"+r.latitudine+","+r.longitudine+"'>Navigate with Google Maps</a>";const d=a.marker([r.latitudine,r.longitudine],{icon:l}).addTo(this.map).bindPopup(p);this.markers.push(d)})}).catch(e=>{console.error("Errore nel recupero dei punti:",e),alert("Errore nel recupero dei defibrillatori")}),h.get("http://localhost:3000/api/v1/clinics").then(e=>{e.data.forEach(r=>{var p="<b>"+r.fumetto+"</b><br><a href='https://www.google.com/maps/dir//"+r.latitudine+","+r.longitudine+"'>Navigate with Google Maps</a>";const d=a.marker([r.latitudine,r.longitudine],{icon:s}).addTo(this.map).bindPopup(p);this.markers.push(d)})}).catch(e=>{console.error("Errore nel recupero dei punti:",e),alert("Errore nel recupero degli ambulatori")}),h.get("http://localhost:3000/api/v1/hospitals").then(e=>{e.data.forEach(r=>{var p="<b>"+r.nome+"</b><br><a href='https://www.google.com/maps/dir//"+r.latitudine+","+r.longitudine+"'>Navigate with Google Maps</a>";const d=a.marker([r.latitudine,r.longitudine],{icon:m}).addTo(this.map).bindPopup(p);this.markers.push(d)})}).catch(e=>{console.error("Errore nel recupero dei punti:",e),alert("Errore nel recupero degli ospedali")}),v()){const e=M();h.get(`http://localhost:3000/api/v1/users/${e}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(o=>{const r=o.data;console.log(r);const p="<a href='https://www.google.com/maps/dir//"+r.latitude+","+r.longitude+"'>"+r.name+" "+r.surname+"</a>",d=a.marker([r.latitude,r.longitude],{icon:t}).addTo(this.map).bindPopup(p);this.markers.push(d);const w=r.volunteer.acceptedAlert;w!=null&&h.get(`http://localhost:3000/api/v1/alerts/${w}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(f=>{const c=f.data;console.log(c);const b="<b>"+c.description+"</b><br><a href='https://www.google.com/maps/dir//"+c.latitude+","+c.longitude+"'>Navigate with Google Maps</a>",x=a.marker([c.latitude,c.longitude],{icon:i}).addTo(this.map).bindPopup(b);this.markers.push(x),this.createGradientCircle([c.latitude,c.longitude],c.radius*1e3,1)}).catch(f=>{console.error("Errore nel recupero dei punti:",f),alert("Errore nel recupero dell'alert")})}).catch(o=>{console.error("Errore nel recupero dei punti:",o),alert("Errore nel recupero dell'utente")})}const n=a.control({position:"topright"});n.onAdd=function(){const e=a.DomUtil.create("div","legend");return e.innerHTML+="<h4>Legenda</h4>",e.innerHTML+='<div><i style="background: green; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> DAE  </div>',e.innerHTML+='<div><i style="background: purple; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Ambulatori</div>',e.innerHTML+='<div><i style="background: orange; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Ospedali</div>',e.innerHTML+='<div><i style="background: red; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Alert</div>',e.innerHTML+='<div><i style="background: blue; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Utente</div>',e.style.backgroundColor="white",e.style.padding="10px",e.style.borderRadius="10px",e.style.boxShadow="0 2px 5px rgba(0,0,0,0.1)",e.style.textAlign="left",e},n.addTo(this.map)},methods:{changeMap(){this.tileLayer&&this.map.removeLayer(this.tileLayer),this.selectedMap==="osm"?this.tileLayer=a.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}):this.selectedMap==="otm"&&(this.tileLayer=a.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})),this.tileLayer.addTo(this.map)},createGradientCircle(l,s){a.circle(l,{color:"red",fillColor:"black",fillOpacity:.1,radius:s}).addTo(this.map)}}},g=l=>(T("data-v-9f65356d"),l=l(),S(),l),P={class:"map-section"},z=g(()=>u("h2",null,"MAPPA",-1)),H=g(()=>u("div",{id:"map"},null,-1)),G=g(()=>u("option",{value:"osm"},"OpenStreetMap",-1)),N=g(()=>u("option",{value:"otm"},"OpenTopoMap",-1)),O=[G,N];function B(l,s,m,i,t,n){return I(),C("section",P,[z,H,A(u("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>t.selectedMap=e),onChange:s[1]||(s[1]=(...e)=>n.changeMap&&n.changeMap(...e)),class:"selector"},O,544),[[_,t.selectedMap]])])}const j=y(E,[["render",B],["__scopeId","data-v-9f65356d"]]);export{j as default};