import{u as f,i as x,r as S,g as C,c as v,a as p,o as c,b as d,d as e,t as l,G as k,s as b,e as E,F as D,h as I,k as A,w as j,v as P,C as T,D as V,p as L}from"./vendor.3f127ec5.js";import{_ as N,a as y,e as m,A as o,c as B,l as _,P as h}from"./index.1d4d7ddf.js";const F={name:"EventDetails",setup(){const s=f(),n=x(),r=S({editable:{}});return C(async()=>{await y.getAttendees(s.params.id),await m.getAllEvents(),await m.setActive(s.params.id)}),{state:r,canSee(t){return t.creatorId===o.account.id&&t.isCanceled!==!0},canSeeAttend(t){return t.isCanceled!==!0&&!o.attendees.find(u=>u.id!==o.account.id)},push(){n.push({name:"Home"})},async createComment(){try{r.editable.eventId=s.params.id,await B.createComment(r.editable),r.editable={}}catch(t){_.error(t),h.toast(t)}},async attendEvent(){try{await y.attendEvent({eventId:s.params.id,accountId:o.account.id})}catch(t){_.error(t),h.toast(t)}},async deleteEvent(){try{await m.removeEvent(s.params.id),n.push({name:"Home"})}catch(t){_.error(t),h.toast(t)}},events:v(()=>o.events),activeEvent:v(()=>o.activeEvent),account:v(()=>o.account),comments:v(()=>o.comments),attendees:v(()=>o.attendees)}}},i=s=>(T("data-v-e8dd04f0"),s=s(),V(),s),M={class:"EventDetails"},H={class:"card container bg-secondary mb-5"},R={class:"card-body row"},z={class:"col-md-4"},G=["src"],J=i(()=>e("div",{class:"col-md-1"},null,-1)),O={class:"col-md-7 mt-4 d-flex flex-column"},U={class:"row mb-3 text-dark"},W={class:"col-md-6"},q={class:"col-md-6 text-end"},K={class:"col-md-12"},Q={class:"col-md-12 align-items-end d-flex"},X={class:"row w-100"},Y={key:0,class:"col-md-6 d-flex align-items-end"},Z=i(()=>e("h6",{class:"mx-2"},"SPOTS LEFT",-1)),$={key:1,class:"bg-danger"},ee={class:"col-md-6 d-flex justify-content-end"},te=L(" Attend "),se=i(()=>e("i",{class:"mdi mdi-human"},null,-1)),ne=[te,se],ae={class:"row h-100"},oe={key:0,class:"col-md-12 d-flex align-items-end justify-content-end"},ce={class:"container mb-3"},de=i(()=>e("div",{class:"row mb-2"},[e("div",{class:"col-md-12 ps-0"},"See who's attending")],-1)),ie={class:"row bg-secondary"},le=["src","title"],re={class:"container"},ve=i(()=>e("div",{class:"row mb-2"},[e("div",{class:"col-md-12 text-secondary ps-0"},"What are people saying")],-1)),me={class:"row card bg-secondary"},_e=i(()=>e("div",{class:"col-md-12 card-body text-success text-end"}," Join the conversation ",-1)),he={class:"col-md-12 pb-3 d-flex justify-content-center"},ue=i(()=>e("div",{class:"col-md-12 text-end mb-3"},[e("button",{type:"submit",class:"btn btn-outline-success"}," post comment ")],-1));function pe(s,n,r,t,u,be){const g=p("EditEvent"),w=p("Comment");return c(),d("div",M,[e("div",H,[e("div",R,[e("div",z,[e("img",{src:t.activeEvent.coverImg,alt:"",class:"my-4 w-75"},null,8,G)]),J,e("div",O,[e("div",U,[e("div",W,[e("h4",null,l(t.activeEvent.name),1),e("h5",null,l(t.activeEvent.location),1)]),e("div",q,[e("h4",null,l(new Date(t.activeEvent.startDate).toLocaleString().split(",")[0]),1),e("h5",null," Starting at "+l(new Date(t.activeEvent.startDate).toLocaleString().split(",")[1]),1)]),e("p",K,l(t.activeEvent.description),1),e("div",Q,[e("div",X,[t.activeEvent.isCanceled?(c(),d("h1",$,"Event is cancelled")):(c(),d("div",Y,[e("h5",{class:k([t.activeEvent.capacity===0?"text-danger":"text-dark"])},l(t.activeEvent.capacity),3),Z])),e("div",ee,[t.canSeeAttend(t.activeEvent)?(c(),d("button",{key:0,class:"btn btn-outline-warning",onClick:n[0]||(n[0]=(...a)=>t.attendEvent&&t.attendEvent(...a))},ne)):b("",!0)])])])]),e("div",ae,[t.canSee(t.activeEvent)?(c(),d("div",oe,[E(g,{event:s.event},null,8,["event"]),e("button",{class:"btn btn-outline-danger ms-2",onClick:n[1]||(n[1]=(...a)=>t.deleteEvent&&t.deleteEvent(...a))}," Cancel Event ")])):b("",!0)])])])]),e("div",ce,[de,e("div",ie,[(c(!0),d(D,null,I(t.attendees,a=>(c(),d("div",{class:"col-md-12 d-flex w-25",key:a.accountId},[e("img",{src:a.account.picture,alt:"",class:"w-50 rounded-pill m-2",title:a.account.name},null,8,le)]))),128))])]),e("div",re,[ve,e("div",me,[_e,e("form",{onSubmit:n[3]||(n[3]=A((...a)=>t.createComment&&t.createComment(...a),["prevent"]))},[e("div",he,[j(e("input",{type:"text","onUpdate:modelValue":n[2]||(n[2]=a=>t.state.editable.body=a),class:"w-100 rounded border-0",placeholder:"Tell the people..."},null,512),[[P,t.state.editable.body]])]),ue],32),E(w)])])])}var ge=N(F,[["render",pe],["__scopeId","data-v-e8dd04f0"]]);export{ge as default};