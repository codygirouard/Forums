(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var s=n(16),r=n.n(s),a=(n(21),n(22),n(2)),c=n(5),l=n(3),o=n(1),i=n(6),d=n(0),m=function(e){var t=e.scroll,n=e.login,s=Object(o.useState)(),r=Object(l.a)(s,2),a=r[0],c=r[1];Object(o.useEffect)((function(){c(!!localStorage.getItem("name"))}),[]);return n?Object(d.jsx)("nav",{children:Object(d.jsx)("ul",{children:Object(d.jsx)("li",{children:Object(d.jsx)(i.b,{to:"/",children:Object(d.jsx)("i",{className:"fas fa-home"})})})})}):Object(d.jsx)("header",{children:Object(d.jsx)("nav",{children:Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsx)(i.b,{to:"/",onClick:function(){t&&window.scrollTo(0,0)},children:Object(d.jsx)("i",{className:"fas fa-home"})})}),Object(d.jsxs)("li",{className:"dropdown",children:[Object(d.jsx)("button",{className:"dropdownBtn",children:"Account"}),Object(d.jsxs)("div",{className:"dropdownContent",children:[!a&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(i.b,{to:"/login",children:"Login"}),Object(d.jsx)(i.b,{to:"/register",children:"Register"})]}),a&&Object(d.jsx)("button",{onClick:function(){localStorage.removeItem("name"),window.location.reload()},children:"Logout"})]})]})]})})})},j=function(e,t){return e+" ".concat(t,1===e?" ago":"s ago")},u=function(e){if("A few seconds ago..."===e)return"A few seconds ago...";e=new Date(e);var t=function(e){var t,n,s,r,a;return a=Math.floor(e/1e3),r=Math.floor(a/60),a%=60,s=Math.floor(r/60),r%=60,n=Math.floor(s/24),s%=24,t=Math.floor(n/30),n%=30,{years:Math.floor(t/12),months:t%=12,days:n,hours:s,minutes:r,seconds:a}}(new Date-e),n=t.years,s=t.months,r=t.days,a=t.hours,c=t.minutes,l=t.seconds,o=j(l,"second");return n-1970>0?o=j(n-1970,"year"):s>0?o=j(s,"month"):r>0?o=j(r,"day"):a>0?o=j(a,"hour"):c>0&&(o=j(c,"minute")),o},b=function(e){var t=e.totalLikes,n=e.usersLiked,s=e.postId,r=Object(o.useState)(t),a=Object(l.a)(r,2),i=a[0],m=a[1],j=Object(o.useState)(!1),u=Object(l.a)(j,2),b=u[0],h=u[1],O=Object(o.useState)([]),x=Object(l.a)(O,2),p=x[0],g=x[1],f=localStorage.getItem("name");return Object(o.useEffect)((function(){n&&(g(n),h(n.indexOf(f)>=0))}),[n,f]),Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"postLikes",onClick:function(){var e={postId:s,username:f},t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};if(f)b?(m(i-1),g(p.filter((function(e){return e!==f}))),fetch("/be/unlikePost",t).then((function(e){return e.json()}))):(m(i+1),g((function(e){return[].concat(Object(c.a)(e),[f])})),fetch("/be/likePost",t).then((function(e){return e.json()}))),h(!b);else{var n=document.getElementById("alertModal");document.getElementById("alertText").innerHTML="You need to login to like posts!",n.style.display="block"}},children:Object(d.jsxs)("svg",{width:"50",height:"45",xmlns:"http://www.w3.org/2000/svg",children:[Object(d.jsxs)("g",{children:[Object(d.jsx)("title",{children:"Like"}),Object(d.jsx)("path",{className:b?"fullHeart":"emptyHeart",d:"m24.95551,11.32701c9.87674,-25.35266 48.57414,0 0,32.59628c-48.57414,-32.59628 -9.87674,-57.94894 0,-32.59628z"})]}),Object(d.jsx)("text",{x:"50%",y:"55%",textAnchor:"middle",dy:".3em",fill:b?"#fff":"#000",children:i})]})})})},h=function(){return Object(d.jsx)("div",{id:"alertModal",onClick:function(e){var t=document.getElementById("alertModal");e.target===t&&(t.style.display="none")},children:Object(d.jsxs)("div",{className:"alertContent",children:[Object(d.jsx)("span",{className:"close",onClick:function(){document.getElementById("alertModal").style.display="none"},children:"\xd7"}),Object(d.jsx)("p",{id:"alertText",children:"You need to login to like posts!"})]})})},O=function(){var e=Object(a.g)();return Object(d.jsx)("button",{className:"newPostButton",onClick:function(){if(localStorage.getItem("name"))e("/newPost");else{var t=document.getElementById("alertModal");document.getElementById("alertText").innerHTML="You need to login to make new posts!",t.style.display="block"}},children:"+"})},x=function(e){var t=e.id,n=e.author,s=e.title,r=e.commentCount,a=e.likes,c=e.usersLiked,l=e.date,o=u(l);return Object(d.jsxs)("div",{className:"post",children:[Object(d.jsx)(b,{totalLikes:a,usersLiked:c,postId:t}),Object(d.jsx)(i.b,{to:"post/".concat(t),className:"commentLink",children:Object(d.jsxs)("div",{className:"postContents",children:[Object(d.jsx)("h3",{className:"postTitle",children:s}),Object(d.jsx)("h4",{className:"postAuthor",children:"Posted by ".concat(n," ").concat(o)}),Object(d.jsx)("p",{className:"postComments",children:"".concat(r," comments")})]})})]})},p=function(e){var t=e.pageNum,n=Object(o.useState)(null),s=Object(l.a)(n,2),r=s[0],a=s[1];return Object(o.useEffect)((function(){fetch("/be/getPosts/".concat(t)).then((function(e){return e.json()})).then((function(e){e.err||a((function(t){return t?[].concat(Object(c.a)(t),Object(c.a)(e)):e}))}))}),[t]),r?r.map((function(e){var t=e._id,n=e.author,s=e.title,r=e.commentCount,a=e.likes,c=e.usersLiked,l=e.date;return Object(d.jsx)(x,{id:t,author:n,title:s,commentCount:r,likes:a,usersLiked:c,date:l},t)})):Object(d.jsx)("div",{className:"loader"})},g=function(){var e=Object(o.useState)(1),t=Object(l.a)(e,2),n=t[0],s=t[1],r=Object(o.useState)(!1),a=Object(l.a)(r,2),c=a[0],i=a[1],m=null,j=function(){window.innerHeight+window.pageYOffset>=document.body.offsetHeight-2&&!c&&(i(!0),s(n+1),m=setTimeout((function(){i(!1)}),500))};return Object(o.useEffect)((function(){return document.title="Home - Denton Forums",window.addEventListener("scroll",j),function(){clearTimeout(m),window.removeEventListener("scroll",j)}})),Object(d.jsx)("div",{className:"posts",children:Object(d.jsx)(p,{pageNum:n})})},f=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(m,{scroll:!0}),Object(d.jsx)(g,{}),Object(d.jsx)(O,{}),Object(d.jsx)(h,{})]})},y=function(e){var t=e.reply,n=t.author,s=t.body,r=t.date,a=u(r);return Object(d.jsxs)("div",{className:"reply",children:[Object(d.jsxs)("div",{className:"authorTime",children:[Object(d.jsx)("h5",{children:n}),Object(d.jsx)("p",{className:"time",children:a})]}),Object(d.jsx)("p",{className:"bodyText",children:s})]})},v=function(e){var t=e.replies;return Object(d.jsx)("div",{className:"replies",children:t.slice().reverse().map((function(e){return Object(d.jsx)(y,{reply:e},e._id)}))})},N=function(e){var t=e.postId,n=e.commentId,s=e.comment,r=s.author,a=s.body,i=s.date,m=Object(o.useState)(s.replies),j=Object(l.a)(m,2),b=j[0],h=j[1],O=u(i),x=Object(o.useState)("Type reply here..."),p=Object(l.a)(x,2),g=p[0],f=p[1],y=Object(o.useReducer)((function(e){return!e}),!0),N=Object(l.a)(y,2),w=N[0],L=N[1];return Object(d.jsxs)("div",{className:"comment",children:[Object(d.jsxs)("div",{className:"authorTime",children:[Object(d.jsx)("h5",{children:r}),Object(d.jsx)("p",{className:"time",children:O})]}),Object(d.jsx)("p",{className:"bodyText",children:a}),Object(d.jsx)("button",{className:"replyToggleBtn",onClick:function(){var e=localStorage.getItem("name"),t=document.getElementById("alertModal"),n=document.getElementById("alertText");e?L():(n.innerHTML="You need to login to reply!",t.style.display="block")},children:"Reply"}),Object(d.jsxs)("div",{className:"replyContainer",style:{display:w?"none":"block"},children:[Object(d.jsx)("textarea",{className:"commentBox","aria-label":"Reply Box",rows:"1",cols:"1",name:"Reply Box",value:g,maxLength:500,onFocus:function(e){var t=e.target;"Type reply here..."===t.value&&(t.value="")},onBlur:function(e){var t=e.target;""===t.value&&(t.value="Type reply here...")},onInput:function(e){var t=e.target;t.style.height="",t.style.height=t.scrollHeight+5+"px",f(t.value)}}),Object(d.jsxs)("button",{className:"commentBtn",onClick:function(e){var s=e.target,r=localStorage.getItem("name"),a=document.getElementById("alertModal"),l=document.getElementById("alertText");if(r)if("Type reply here..."===g)l.innerHTML="You need to enter text to post a reply!",a.style.display="block";else{var o={postId:t,commentId:n,author:r,body:g},i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)};fetch("/be/newReply",i),h((function(e){return[].concat(Object(c.a)(e),[{_id:Math.floor(1e5*Math.random()),date:"A few seconds ago...",author:r,body:g}])})),f("Type reply here...")}else l.innerHTML="You need to login to submit replies!",a.style.display="block";s.blur(),L()},children:[Object(d.jsxs)("svg",{width:"100px",height:"30px",viewBox:"0 0 100 30",className:"border",children:[Object(d.jsx)("polyline",{points:"99,1 99,29 1,29 1,1 99,1",className:"bg-line"}),Object(d.jsx)("polyline",{points:"99,1 99,29 1,29 1,1 99,1",className:"hl-line"})]}),Object(d.jsx)("span",{children:"Submit"})]})]}),Object(d.jsx)(v,{replies:b})]})},w=function(e){var t=e.id,n=e.comments;return Object(d.jsx)("div",{className:"comments",children:n.slice().reverse().map((function(e){return Object(d.jsx)(N,{postId:t,commentId:e._id,comment:e},e._id)}))})},L=function(e){var t=e.postId,n=e.likes,s=e.usersLiked,r=e.author,a=e.body,c=e.title,l=e.date,o=u(l);return Object(d.jsxs)("div",{className:"content",children:[Object(d.jsx)(b,{totalLikes:n,usersLiked:s,postId:t}),Object(d.jsxs)("div",{className:"contentPost",children:[Object(d.jsx)("h3",{children:c}),Object(d.jsxs)("div",{className:"authorTime",children:[Object(d.jsx)("h5",{children:r}),Object(d.jsx)("p",{className:"time",children:o})]}),Object(d.jsx)("p",{className:"bodyText",children:a})]})]})},S=function(){var e=Object(a.h)().id,t=Object(o.useState)(null),n=Object(l.a)(t,2),s=n[0],r=n[1],c=Object(o.useState)("Type comment here..."),i=Object(l.a)(c,2),j=i[0],u=i[1],b=Object(a.g)();Object(o.useEffect)((function(){fetch("/be/getPost/".concat(e)).then((function(e){return e.json()})).then((function(e){!e||e.err?b("/oops"):(r(e),document.title="".concat(e.title," - Denton Forums"))}))}),[b,e]);if(s){var O=s._id,x=s.likes,p=s.usersLiked,g=s.author,f=s.body,y=s.title,v=s.date,N=s.comments;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(m,{scroll:!0}),Object(d.jsxs)("div",{className:"postContainer",children:[Object(d.jsx)(L,{postId:O,likes:x,usersLiked:p,author:g,body:f,title:y,date:v}),Object(d.jsxs)("div",{className:"commentContainer",children:[Object(d.jsx)("textarea",{className:"commentBox","aria-label":"Comment Box",rows:"1",cols:"1",name:"Comment Box",value:j,maxLength:"500",onInput:function(e){var t=e.target;t.style.height="",t.style.height=t.scrollHeight+5+"px",u(t.value)},onFocus:function(e){var t=e.target;"Type comment here..."===t.value&&(t.value="")},onBlur:function(e){var t=e.target;""===t.value&&(t.value="Type comment here...")}}),Object(d.jsxs)("button",{className:"commentBtn",onClick:function(t){var n=t.target,s=localStorage.getItem("name"),a=document.getElementById("alertModal"),c=document.getElementById("alertText");if(s)if("Type comment here..."===j)c.innerHTML="You need to enter text to post a comment!",a.style.display="block";else{var l={postId:e,author:s,body:j},o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)};fetch("/be/newComment",o).then((function(e){return e.json()})).then((function(e){return r(e.result)})),u("Type comment here...")}else c.innerHTML="You need to login to submit comments!",a.style.display="block";n.blur()},children:[Object(d.jsxs)("svg",{width:"100px",height:"40px",viewBox:"0 0 100 40",className:"border",children:[Object(d.jsx)("polyline",{points:"99,1 99,39 1,39 1,1 99,1",className:"bg-line"}),Object(d.jsx)("polyline",{points:"99,1 99,39 1,39 1,1 99,1",className:"hl-line"})]}),Object(d.jsx)("span",{children:"Submit"})]})]}),N.length>0?Object(d.jsx)(w,{id:O,comments:N}):Object(d.jsx)("h1",{className:"noComments",children:"Be the first to comment!"})]}),Object(d.jsx)(h,{})]})}return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(m,{}),Object(d.jsx)("div",{className:"loader"})]})},k=n(9),T=n(4),I=n.n(T),E=n(7),F=n(13),B=function(){var e=Object(F.a)(),t=e.register,n=e.handleSubmit,s=e.formState.errors,r=Object(a.g)(),c=Object(o.useState)(null),j=Object(l.a)(c,2),u=j[0],b=j[1],h=Object(o.useState)(null),O=Object(l.a)(h,2),x=O[0],p=O[1];Object(o.useEffect)((function(){document.title="Login - Denton Forums",localStorage.getItem("name")&&r("/")}));var g=function(){var e=Object(E.a)(I.a.mark((function e(t){var n,s,a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(null),p(null),n={username:t.username,pwd:t.password},s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},e.next=6,fetch("/be/userLogin",s).then((function(e){return e.json()}));case 6:(a=e.sent).succ?(localStorage.setItem("name",a.succ),r("/")):"No user found!"===a.err?b("No user found!"):"Incorrect password!"===a.err?p("Incorrect password!"):(p("err"),b("err"));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"centerScreen",children:[Object(d.jsx)(m,{login:!0}),Object(d.jsxs)("div",{className:"loginContainer",children:[Object(d.jsx)("h2",{className:"formTitle",children:"Login"}),Object(d.jsxs)("form",{onSubmit:n(g,(function(e){b(e.username?e.username.type:null),p(e.password?e.password.type:null)})),children:[Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"username",className:"formField",autoFocus:!0,type:"text",placeholder:"Username","aria-invalid":s.username?"true":"false"},t("username",{required:!0,minLength:3,maxLength:30}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"username",children:"Username"})]}),u&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Username is required to login",minLength:"Username must be at least 3 characters long",maxLength:"Username must be 10 characters long maximum","No user found!":"No user found with that username",err:"Error trying to login, please try again later"}[u]}),Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"password",className:"formField",type:"password",placeholder:"Password","aria-invalid":s.password?"true":"false"},t("password",{required:!0,minLength:6,maxLength:24}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"password",children:"Password"})]}),x&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Password is required to login",minLength:"Password must be at least 6 characters long",maxLength:"Password must be 24 characters long maximum","Incorrect password!":"Incorrect password",err:"Error trying to login, please try again later"}[x]}),Object(d.jsx)("div",{className:"login",children:Object(d.jsxs)("button",{type:"submit",className:"btn",children:[Object(d.jsxs)("svg",{width:"180px",height:"60px",viewBox:"0 0 180 60",className:"border",children:[Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"bg-line"}),Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"hl-line"})]}),Object(d.jsx)("span",{children:"Login"})]})})]}),Object(d.jsx)("div",{className:"swapLogin",children:Object(d.jsxs)("p",{children:["Don't have an account? ",Object(d.jsx)(i.b,{to:"/register",children:"Sign up here!"})]})})]})]})},C=function(){var e=Object(F.a)(),t=e.register,n=e.handleSubmit,s=e.formState.errors,r=Object(o.useState)(null),c=Object(l.a)(r,2),j=c[0],u=c[1],b=Object(o.useState)(null),h=Object(l.a)(b,2),O=h[0],x=h[1],p=Object(o.useState)(null),g=Object(l.a)(p,2),f=g[0],y=g[1],v=Object(a.g)();Object(o.useEffect)((function(){document.title="Register - Denton Forums",localStorage.getItem("name")&&v("/")}));var N=function(){var e=Object(E.a)(I.a.mark((function e(t){var n,s,r;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(null),x(null),y(null),n={name:t.username,email:t.email,pwd:t.password},s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},e.next=7,fetch("/be/createAccount",s).then((function(e){return e.json()}));case 7:(r=e.sent).succ?(localStorage.setItem("name",r.succ),v("/")):"Username and email taken"===r.err?(u("username"),x("email")):"Username taken"===r.err?u("username"):"Email taken"===r.err?x("email"):(y("err"),x("err"),u("err"));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"centerScreen",children:[Object(d.jsx)(m,{login:!0}),Object(d.jsxs)("div",{className:"loginContainer",children:[Object(d.jsx)("h2",{className:"formTitle",children:"Create An Account"}),Object(d.jsxs)("form",{onSubmit:n(N,(function(e){u(e.username?e.username.type:null),x(e.email?e.email.type:null),y(e.password?e.password.type:null)})),children:[Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"username",className:"formField",autoFocus:!0,type:"text",placeholder:"Username","aria-invalid":s.username?"true":"false"},t("username",{required:!0,minLength:3,maxLength:10,pattern:/^[a-z0-9]+$/i}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"username",children:"Username"})]}),j&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Username is required to register",minLength:"Username must be at least 3 characters long",maxLength:"Username must be 10 characters long maximum",pattern:"Username must contain only letters and numbers",username:"Username is already taken",err:"Error trying to register, please try again later"}[j]}),Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"email",className:"formField",type:"email",placeholder:"Email","aria-invalid":s.email?"true":"false"},t("email",{required:!0,maxLength:30,pattern:/\S+@\S+\.\S+/}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"email",children:"Email"})]}),O&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Email is required to register",maxLength:"Email must be 30 characters long maximum",pattern:"Email must be in the correct format",email:"An account with this email already exists",err:"Error trying to register, please try again later"}[O]}),Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"password",className:"formField",type:"password",placeholder:"Password","aria-invalid":s.password?"true":"false"},t("password",{required:!0,minLength:6,maxLength:24}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"password",children:"Password"})]}),f&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Password is required to register",minLength:"Password must be at least 6 characters long",maxLength:"Password must be 24 characters long maximum",err:"Error trying to register, please try again later"}[f]}),Object(d.jsx)("div",{className:"register",children:Object(d.jsxs)("button",{type:"submit",className:"btn",children:[Object(d.jsxs)("svg",{width:"180px",height:"60px",viewBox:"0 0 180 60",className:"border",children:[Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"bg-line"}),Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"hl-line"})]}),Object(d.jsx)("span",{children:"Register"})]})})]}),Object(d.jsx)("div",{className:"swapLogin",children:Object(d.jsxs)("p",{children:["Already have an account? ",Object(d.jsx)(i.b,{to:"/login",children:"Sign in here!"})]})})]})]})},P=function(){var e=Object(F.a)(),t=e.register,n=e.handleSubmit,s=e.formState.errors,r=Object(o.useState)(null),c=Object(l.a)(r,2),i=c[0],j=c[1],u=Object(o.useState)(null),b=Object(l.a)(u,2),h=b[0],O=b[1],x=Object(a.g)();Object(o.useEffect)((function(){document.title="New Post - Denton Forums",localStorage.getItem("name")||x("/")}));var p=function(){var e=Object(E.a)(I.a.mark((function e(t){var n,s,r;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(null),O(null),n=localStorage.getItem("name"),s={author:n,title:t.title,body:t.body},r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)},e.next=7,fetch("/be/newPost",r).then((function(e){return e.json()}));case 7:e.sent.succ?x("/"):(j("err"),O("err"));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"centerScreen",children:[Object(d.jsx)(m,{}),Object(d.jsxs)("div",{className:"loginContainer",children:[Object(d.jsx)("h2",{className:"formTitle",children:"Make a Post"}),Object(d.jsxs)("form",{onSubmit:n(p,(function(e){j(e.title?e.title.type:null),O(e.body?e.body.type:null)})),children:[Object(d.jsxs)("div",{className:"formGroup",children:[Object(d.jsx)("input",Object(k.a)({id:"title",className:"formField",type:"text",placeholder:"Title","aria-invalid":s.title?"true":"false"},t("title",{required:!0,minLength:5,maxLength:40}))),Object(d.jsx)("label",{className:"formLabel",htmlFor:"title",children:"Title"})]}),i&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"A title is required to make a post",minLength:"Title must be at least 5 characters long",maxLength:"Title must be 40 characters long maximum",err:"Error trying to post, please try again later"}[i]}),Object(d.jsxs)("div",{className:"formGroup textField",children:[Object(d.jsx)("textarea",Object(k.a)({id:"body",className:"formField textField",type:"text",placeholder:"Body",maxLength:"500","aria-invalid":s.body?"true":"false",onInput:function(e){var t=e.target;t.style.height="",t.style.height=t.scrollHeight+6+"px"}},t("body",{required:!0,minLength:3,maxLength:500}))),Object(d.jsx)("label",{className:"formLabel textField",htmlFor:"body",children:"Body"})]}),h&&Object(d.jsx)("span",{role:"alert",className:"fieldError",children:{required:"Post body is required to make a post",minLength:"Post body must be at least 3 characters long",maxLength:"Post body must be 501 characters long maximum",err:"Error trying to post, please try again later"}[h]}),Object(d.jsx)("div",{className:"newPost",children:Object(d.jsxs)("button",{type:"submit",className:"btn",children:[Object(d.jsxs)("svg",{width:"180px",height:"60px",viewBox:"0 0 180 60",className:"border",children:[Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"bg-line"}),Object(d.jsx)("polyline",{points:"179,1 179,59 1,59 1,1 179,1",className:"hl-line"})]}),Object(d.jsx)("span",{children:"Post"})]})})]})]})]})},M=function(){return Object(o.useEffect)((function(){document.title="Oops! - Denton Forums"})),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(m,{}),Object(d.jsxs)("div",{className:"errorNotFound",children:[Object(d.jsx)("h1",{children:"404"}),Object(d.jsx)("p",{children:"Sorry, we couldn't find that page!"}),Object(d.jsx)(i.b,{to:"/",children:"Return Home"})]})]})},q=function(){return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)(a.c,{children:[Object(d.jsx)(a.a,{path:"/",element:Object(d.jsx)(f,{})}),Object(d.jsx)(a.a,{path:"/post/:id",element:Object(d.jsx)(S,{})}),Object(d.jsx)(a.a,{path:"/newpost",element:Object(d.jsx)(P,{})}),Object(d.jsx)(a.a,{path:"/login",element:Object(d.jsx)(B,{})}),Object(d.jsx)(a.a,{path:"/register",element:Object(d.jsx)(C,{})}),Object(d.jsx)(a.a,{path:"*",element:Object(d.jsx)(M,{})})]})})};r.a.render(Object(d.jsx)(i.a,{children:Object(d.jsx)(q,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.f40920f1.chunk.js.map