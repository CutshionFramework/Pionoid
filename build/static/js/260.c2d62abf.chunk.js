"use strict";(self.webpackChunkpionoidapi=self.webpackChunkpionoidapi||[]).push([[260],{8260:(e,t,i)=>{i.r(t),i.d(t,{default:()=>J});var n=i(9367),o=i(8911),a=i(8977),r=i(9252),s=i(2075),l=i(5865),c=i(6916);const d=["Whiteboard Templates By Industry Leaders","Tesla Cybertruck-inspired camper trailer for Tesla fans who can\u2019t just wait for the truck!","Designify Agency Landing Page Design","\u2728What is Done is Done \u2728","Fresh Prince","Six Socks Studio","vincenzo de cotiis\u2019 crossing over showcases a research on contamination","Simple, Great Looking Animations in Your Project | Video Tutorial","40 Free Serif Fonts for Digital Designers","Examining the Evolution of the Typical Web Design Client","Katie Griffin loves making that homey art","The American Dream retold through mid-century railroad graphics","Illustration System Design","CarZio-Delivery Driver App SignIn/SignUp","How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna","Tylko Organise effortlessly -3D & Motion Design","RAYO ?? A expanded visual arts festival identity","Anthony Burrill and Wired mag\u2019s Andrew Diprose discuss how they made January\u2019s Change Everything cover","Inside the Mind of Samuel Day","Portfolio Review: Is This Portfolio Too Creative?","Akkers van Margraten","Gradient Ticket icon","Here\u2019s a Dyson motorcycle concept that doesn\u2019t \u2018suck\u2019!","How to Animate a SVG with border-image"],p=[...Array(23)].map(((e,t)=>({id:c.Jb.string.uuid(),cover:"/assets/images/covers/cover_".concat(t+1,".jpg"),title:d[t+1],createdAt:c.Jb.date.past(),view:c.Jb.number.int(99999),comment:c.Jb.number.int(99999),share:c.Jb.number.int(99999),favorite:c.Jb.number.int(99999),author:{name:c.Jb.person.fullName(),avatarUrl:"/assets/images/avatars/avatar_".concat(t+1,".jpg")}})));var h=i(7804),u=i(6446),m=i(8446),x=i(2110),g=i(1045),v=i(310),b=i(3786),f=i(4289),j=i(5559),A=i(579);function y(e){let{post:t,index:i}=e;const{cover:n,title:a,view:r,comment:c,share:d,author:p,createdAt:y}=t,w=0===i,k=1===i||2===i,D=(0,A.jsx)(g.A,{alt:p.name,src:p.avatarUrl,sx:{zIndex:9,width:32,height:32,position:"absolute",left:e=>e.spacing(3),bottom:e=>e.spacing(-2),...(w||k)&&{zIndex:9,top:24,left:24,width:40,height:40}}}),I=(0,A.jsx)(m.A,{color:"inherit",variant:"subtitle2",underline:"hover",sx:{height:44,overflow:"hidden",WebkitLineClamp:2,display:"-webkit-box",WebkitBoxOrient:"vertical",...w&&{typography:"h5",height:60},...(w||k)&&{color:"common.white"}},children:a}),C=(0,A.jsx)(o.A,{direction:"row",flexWrap:"wrap",spacing:1.5,justifyContent:"flex-end",sx:{mt:3,color:"text.disabled"},children:[{number:c,icon:"eva:message-circle-fill"},{number:r,icon:"eva:eye-fill"},{number:d,icon:"eva:share-fill"}].map(((e,t)=>(0,A.jsxs)(o.A,{direction:"row",sx:{...(w||k)&&{opacity:.48,color:"common.white"}},children:[(0,A.jsx)(h.A,{width:16,icon:e.icon,sx:{mr:.5}}),(0,A.jsx)(l.A,{variant:"caption",children:(0,f.Rn)(e.number)})]},t)))}),S=(0,A.jsx)(u.A,{component:"img",alt:a,src:n,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),T=(0,A.jsx)(l.A,{variant:"caption",component:"div",sx:{mb:2,color:"text.disabled",...(w||k)&&{opacity:.48,color:"common.white"}},children:(0,b.ts)(y)}),P=(0,A.jsx)(j.A,{color:"paper",src:"/assets/icons/shape-avatar.svg",sx:{width:80,height:36,zIndex:9,bottom:-15,position:"absolute",color:"background.paper",...(w||k)&&{display:"none"}}});return(0,A.jsx)(s.A,{xs:12,sm:w?12:6,md:w?6:3,children:(0,A.jsxs)(x.A,{children:[(0,A.jsxs)(u.A,{sx:{position:"relative",pt:"calc(100% * 3 / 4)",...(w||k)&&{pt:"calc(100% * 4 / 3)","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:e=>(0,v.X4)(e.palette.grey[900],.72)}},...w&&{pt:{xs:"calc(100% * 4 / 3)",sm:"calc(100% * 3 / 4.66)"}}},children:[P,D,S]}),(0,A.jsxs)(u.A,{sx:{p:e=>e.spacing(4,3,3,3),...(w||k)&&{width:1,bottom:0,position:"absolute"}},children:[T,I,C]})]})})}var w=i(1449),k=i(4600);function D(e){let{options:t,onSort:i}=e;return(0,A.jsx)(k.A,{select:!0,size:"small",value:"latest",onChange:i,children:t.map((e=>(0,A.jsx)(w.A,{value:e.value,children:e.label},e.value)))})}var I=i(1787),C=i(6077),S=i(668);function T(e){let{posts:t}=e;return(0,A.jsx)(C.A,{sx:{width:280},autoHighlight:!0,popupIcon:null,slotProps:{paper:{sx:{width:320,["& .".concat(S.A.option)]:{typography:"body2"}}}},options:t,getOptionLabel:e=>e.title,isOptionEqualToValue:(e,t)=>e.id===t.id,renderInput:e=>(0,A.jsx)(k.A,{...e,placeholder:"Search post...",InputProps:{...e.InputProps,startAdornment:(0,A.jsx)(I.A,{position:"start",children:(0,A.jsx)(h.A,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})}})})}function P(){return(0,A.jsxs)(r.A,{children:[(0,A.jsxs)(o.A,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[(0,A.jsx)(l.A,{variant:"h4",children:"Blog"}),(0,A.jsx)(a.A,{variant:"contained",color:"inherit",startIcon:(0,A.jsx)(h.A,{icon:"eva:plus-fill"}),children:"New Post"})]}),(0,A.jsxs)(o.A,{mb:5,direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,A.jsx)(T,{posts:p}),(0,A.jsx)(D,{options:[{value:"latest",label:"Latest"},{value:"popular",label:"Popular"},{value:"oldest",label:"Oldest"}]})]}),(0,A.jsx)(s.A,{container:!0,spacing:3,children:p.map(((e,t)=>(0,A.jsx)(y,{post:e,index:t},e.id)))})]})}function J(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(n.mg,{children:(0,A.jsx)("title",{children:" Blog | Minimal UI "})}),(0,A.jsx)(P,{})]})}},4289:(e,t,i)=>{i.d(t,{KZ:()=>a,Rn:()=>r});var n=i(9328),o=i.n(n);function a(e){return s(e?o()(e).format("$0,0.00"):"",".00")}function r(e){return s(e?o()(e).format("0.00a"):"",".00")}function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".00";return e.includes(t)?e.replace(t,""):e}}}]);
//# sourceMappingURL=260.c2d62abf.chunk.js.map