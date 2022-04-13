(this.webpackJsonpTodolist_V2=this.webpackJsonpTodolist_V2||[]).push([[0],{101:function(t,e,n){t.exports={is_done:"Task_is_done__3JDJx"}},124:function(t,e,n){},125:function(t,e,n){},153:function(t,e,n){"use strict";n.r(e);var a,r,c=n(0),i=n.n(c),s=n(34),o=n.n(s),l=(n(124),n(125),n(67)),d=n.n(l),u=n(14),b=n(201),j=n(209),f=n(100),p=n.n(f),O=n(1),h=i.a.memo((function(t){var e=t.disabled,n=t.addItem,a=t.color,r=Object(c.useState)(""),i=Object(u.a)(r,2),s=i[0],o=i[1],l=Object(c.useState)(null),d=Object(u.a)(l,2),f=d[0],h=d[1],m=function(){""!==s.trim()?(n(s),o("")):h("Title is required")};return Object(O.jsxs)("div",{style:{display:"flex"},children:[Object(O.jsx)(b.a,{disabled:e,variant:"outlined",error:!!f,value:s,color:a,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==f&&h(null),"Enter"===t.key&&m()},label:"Title",helperText:f}),Object(O.jsx)(j.a,{color:"inherit",size:"large",onClick:m,disabled:e,children:Object(O.jsx)(p.a,{style:{width:"30px",height:"30px"},color:"inherit"})})]})})),m=i.a.memo((function(t){var e=t.value,n=t.onChange,a=t.disabled,r=Object(c.useState)(!1),i=Object(u.a)(r,2),s=i[0],o=i[1],l=Object(c.useState)(e),d=Object(u.a)(l,2),j=d[0],f=d[1],p=function(){o(!1),n(j)};return s?Object(O.jsx)(b.a,{disabled:a,onKeyPress:function(t){"Enter"===t.key&&p()},value:j,onChange:function(t){f(t.currentTarget.value)},autoFocus:!0,onBlur:p,variant:"standard"}):Object(O.jsx)("span",{onDoubleClick:function(){o(!0),f(e)},children:e})})),x=n(199),v=n(101),_=n.n(v),g=n(204),k=n(102),T=n.n(k).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"46d03c13-5122-4b12-95a1-e807d8a6bece"}}),S=function(){return T.get("todo-lists")},y=function(t){return T.post("todo-lists",{title:t})},I=function(t){return T.delete("todo-lists/".concat(t))},w=function(t,e){return T.put("todo-lists/".concat(t),{title:e})},C=function(t){return T.get("todo-lists/".concat(t,"/tasks"))},E=function(t,e){return T.delete("todo-lists/".concat(t,"/tasks/").concat(e))},A=function(t,e){return T.post("todo-lists/".concat(t,"/tasks"),{title:e})},N=function(t,e,n){return T.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},D=function(){return T.get("auth/me").then((function(t){return t.data}))},L=function(){return T.delete("auth/login/").then((function(t){return t.data}))},R=function(t,e,n,a){return T.post("auth/login/",{email:t,password:e,rememberMe:n,captcha:a}).then((function(t){return t.data}))};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}));var P=i.a.memo((function(t){var e=Object(c.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(c.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?a.Completed:a.New,t.todolistId)}),[t.task.id,t.todolistId]),r=Object(c.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);a.New;return Object(O.jsxs)("div",{className:t.task.status===a.Completed?_.a.is_done:"",children:[Object(O.jsx)(g.a,{checked:t.task.status===a.Completed,color:"secondary",onChange:n}),Object(O.jsx)(m,{disabled:"loading"===t.task.entityTaskStatus,value:t.task.title,onChange:r}),Object(O.jsx)(j.a,{onClick:e,disabled:"loading"===t.task.entityTaskStatus,children:Object(O.jsx)(x.a,{})})]},t.task.id)})),H=n(21),M=n(212),F=function(t){var e=t.title,n=t.onClickHandler,a=t.activeButton;return Object(O.jsx)(M.a,{color:"secondary",variant:a===e?"contained":"outlined",onClick:n,children:e})},U=n(15),K=n(13),G=[],z=function(t){return{type:"REMOVE-TODOLIST",id:t}},B=function(t,e){return{type:"ADD-TODOLIST",title:t,todolistId:e}},V=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}},Y=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:t,filter:e}},J=function(t,e){return{type:"CHANGE_TODOLIST_ENTITY_STATUS",id:t,entityStatus:e}},q=function(t){var e=t.filterBS,n=t.todolistId,a=Object(H.b)(),r=Object(c.useCallback)((function(){return a(Y(n,"All"))}),[a,n]),i=Object(c.useCallback)((function(){return a(Y(n,"Active"))}),[a,n]),s=Object(c.useCallback)((function(){return a(Y(n,"Completed"))}),[a,n]);return Object(O.jsxs)("div",{children:[Object(O.jsx)(F,{activeButton:e,onClickHandler:r,title:"All"}),Object(O.jsx)(F,{activeButton:e,onClickHandler:i,title:"Active"}),Object(O.jsx)(F,{activeButton:e,onClickHandler:s,title:"Completed"})]})},X=n(17),Z=n.n(X),$=n(26),Q="APP_SET_STATUS",W="SET_APP_ERROR",tt={status:"succeeded",error:null},et=function(t){return{type:Q,status:t}},nt=function(t){return{type:W,error:t}},at=function(t,e){t.messages.length?e(nt(t.messages[0])):e(nt("Some error occurred")),e(et("failed"))},rt=function(t,e){e(nt(t.message)),e(et("failed"))},ct=n(5),it={},st=function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}},ot=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}},lt=function(t,e,n){return{type:"UPDATE-TASK",todolistId:e,taskId:t,model:n}},dt=function(t,e,n){return{type:"CHANGE_TASK_ENTITY_STATUS",taskId:e,todolistId:t,entityStatus:n}},ut=function(t,e,n){return function(){var a=Object($.a)(Z.a.mark((function a(r,c){var i,s,o,l,d;return Z.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(r(dt(t,e,"loading")),r(et("loading")),i=c().tasks,s=i[t],!(o=s.find((function(t){return t.id===e})))){a.next=17;break}return l=Object(K.a)({title:o.title,startDate:o.startDate,priority:o.priority,description:o.description,deadline:o.deadline,status:o.status},n),a.prev=7,a.next=10,N(t,e,l);case 10:0===(d=a.sent).data.resultCode?(r(lt(e,t,d.data.data.item)),r(et("succeeded")),r(dt(t,e,"succeeded"))):(at(d.data,r),r(dt(t,e,"failed"))),a.next=17;break;case 14:a.prev=14,a.t0=a.catch(7),a.t0 instanceof Error&&(rt(a.t0,r),r(dt(t,e,"failed")));case 17:case"end":return a.stop()}}),a,null,[[7,14]])})));return function(t,e){return a.apply(this,arguments)}}()},bt=Object(c.memo)((function(t){var e=Object(H.b)();Object(c.useEffect)((function(){var n;e((n=t.id,function(){var t=Object($.a)(Z.a.mark((function t(e){var a,r;return Z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(et("loading")),t.prev=1,t.next=4,C(n);case 4:null===(a=t.sent).data.error&&(r=a.data.items.map((function(t){return Object(K.a)(Object(K.a)({},t),{},{entityTaskStatus:"idle"})})),e(st(r,n)),e(et("succeeded"))),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),t.t0 instanceof Error&&rt(t.t0,e);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);var n=t.tasks;"Active"===t.filter&&(n=t.tasks.filter((function(t){return t.status===a.New}))),"Completed"===t.filter&&(n=t.tasks.filter((function(t){return t.status===a.Completed})));var r=Object(c.useCallback)((function(){var n;e((n=t.id,function(){var t=Object($.a)(Z.a.mark((function t(e){var a;return Z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(J(n,"loading")),e(et("loading")),t.prev=2,t.next=5,I(n);case 5:0===(a=t.sent).data.resultCode?(e(z(n)),e(et("succeeded")),e(J(n,"succeeded"))):(at(a.data,e),e(J(n,"failed"))),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),t.t0 instanceof Error&&(rt(t.t0,e),e(J(n,"failed")));case 12:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}()))}),[e,t.id]),i=Object(c.useCallback)((function(n){e(function(t,e){return function(){var n=Object($.a)(Z.a.mark((function n(a){var r;return Z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(et("loading")),a(J(t,"loading")),n.prev=2,n.next=5,w(t,e);case 5:0===(r=n.sent).data.resultCode?(a(V(t,e)),a(et("succeeded")),a(J(t,"succeeded"))):(at(r.data,a),a(J(t,"failed"))),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(2),n.t0 instanceof Error&&(rt(n.t0,a),a(J(t,"failed")));case 12:case"end":return n.stop()}}),n,null,[[2,9]])})));return function(t){return n.apply(this,arguments)}}()}(t.id,n))}),[e,t.id]),s=Object(c.useCallback)((function(t,n){e(function(t,e){return function(){var n=Object($.a)(Z.a.mark((function n(a){var r;return Z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(et("loading")),a(dt(t,e,"loading")),n.prev=2,n.next=5,E(t,e);case 5:0===(r=n.sent).data.resultCode?(a(ot(e,t)),a(et("succeeded")),a(dt(t,e,"succeeded"))):(at(r.data,a),a(dt(t,e,"failed"))),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(2),n.t0 instanceof Error&&(rt(n.t0,a),a(dt(t,e,"failed")));case 12:case"end":return n.stop()}}),n,null,[[2,9]])})));return function(t){return n.apply(this,arguments)}}()}(n,t))}),[e]),o=Object(c.useCallback)((function(n){e(function(t,e){return function(){var n=Object($.a)(Z.a.mark((function n(a){var r,c;return Z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(J(t,"loading")),a(et("loading")),n.prev=2,n.next=5,A(t,e);case 5:0===(r=n.sent).data.resultCode?(c=Object(K.a)(Object(K.a)({},r.data.data.item),{},{entityTaskStatus:"idle"}),a({type:"ADD-TASK",task:c}),a(et("succeeded")),a(J(t,"succeeded"))):(at(r.data,a),a(J(t,"failed"))),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(2),n.t0 instanceof Error&&(rt(n.t0,a),a(J(t,"failed")));case 12:case"end":return n.stop()}}),n,null,[[2,9]])})));return function(t){return n.apply(this,arguments)}}()}(t.id,n))}),[e,t.id]),l=Object(c.useCallback)((function(t,n,a){e(ut(a,t,{status:n}))}),[e]),u=Object(c.useCallback)((function(t,n,a){e(ut(a,t,{title:n}))}),[e]);return Object(O.jsxs)("div",{className:d.a.main_paper_div,children:[Object(O.jsxs)("h3",{className:d.a.block_name_and_delete,children:[Object(O.jsx)(m,{disabled:"loading"===t.entityStatus,value:t.title,onChange:i}),Object(O.jsx)(j.a,{size:"large",onClick:r,disabled:"loading"===t.entityStatus,children:Object(O.jsx)(x.a,{})})]}),Object(O.jsx)("div",{className:d.a.add_item_form,children:Object(O.jsx)(h,{addItem:o,color:"secondary",disabled:"loading"===t.entityStatus})}),Object(O.jsx)("div",{children:n.map((function(e){return Object(O.jsx)(P,{task:e,todolistId:t.id,removeTask:s,changeTaskTitle:u,changeTaskStatus:l},e.id)}))}),Object(O.jsx)("div",{style:{paddingTop:"10px"},children:Object(O.jsx)(q,{todolistId:t.id,filterBS:t.filter})})]})})),jt=n(207),ft=n(208),pt="SET_USER_DATA",Ot={id:null,login:null,email:null,isFetching:!1,isAuth:!1},ht=function(t){return{type:pt,payload:t}},mt=n(29),xt=n.n(mt),vt=n(106),_t=function(t){var e=Object(H.b)(),n=Object(vt.a)({initialValues:{email:"",password:"",rememberMe:!1,captcha:!0},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Field is required",(!t.password||t.password.length<4)&&(e.password="Password is required"),e},onSubmit:function(t){e(function(t){return function(){var e=Object($.a)(Z.a.mark((function e(n){var a,r,c,i,s,o;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(t.email,t.password,t.rememberMe,t.captcha);case 2:return a=e.sent,e.next=5,D();case 5:r=e.sent,0===a.resultCode&&(console.log(a),c=r.data,i=c.login,s=c.email,o=c.id,n(ht({id:o,email:s,login:i,isAuth:!0})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(t)),n.resetForm()}}),a=n.values.password,r=[["\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0431\u0443\u043a\u0432\u0443",a.toLowerCase()!==a],["\u0441\u0442\u0440\u043e\u0447\u043d\u0443\u044e \u0431\u0443\u043a\u0432\u0443",a.toUpperCase()!==a],["\u0446\u0438\u0444\u0440\u0443",/\d/.test(a)],["5 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432",a.length>=4]];return Object(O.jsx)("div",{className:xt.a.main_login,children:Object(O.jsx)("div",{className:xt.a.modal_wrapper,children:Object(O.jsx)("div",{className:xt.a.modal_window,children:Object(O.jsxs)("form",{className:xt.a.form_3,onSubmit:n.handleSubmit,children:[Object(O.jsx)("h1",{style:{color:"white"},children:"Account login"}),Object(O.jsxs)("p",{className:xt.a.clearfix,children:[Object(O.jsx)("label",{htmlFor:"email",children:"Email"}),Object(O.jsx)("input",Object(K.a)({type:"text",id:"email",placeholder:"email"},n.getFieldProps("email"))),n.touched.email&&n.errors.email?Object(O.jsx)("div",{style:{color:"red",fontSize:"1.2rem"},children:n.errors.email}):null]}),Object(O.jsxs)("p",{className:xt.a.clearfix,children:[Object(O.jsx)("label",{htmlFor:"password",children:"Password"}),Object(O.jsx)("input",Object(K.a)({type:"password",id:"password",placeholder:"password"},n.getFieldProps("password"))),n.values.password?Object(O.jsxs)("div",{className:xt.a.text_helper,children:[Object(O.jsx)("div",{className:xt.a.angle}),Object(O.jsx)("span",{children:"\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043a\u0430\u043a \u043c\u0438\u043d\u0438\u043c\u0443\u043c:"}),Object(O.jsx)("div",{className:xt.a.text_helper_small_text,children:r.map((function(t){return Object(O.jsx)(gt,{data:t},t)}))})]}):null]}),Object(O.jsxs)("p",{className:xt.a.clearfix,children:[Object(O.jsx)("input",Object(K.a)({style:{width:"50px",height:"50px"},type:"checkbox",id:"remember"},n.getFieldProps("rememberMe"))),Object(O.jsx)("label",{htmlFor:"remember",className:xt.a.label_rememberMe_block,children:"Remember me"}),Object(O.jsx)("button",{className:xt.a.button,type:"submit",name:"submit",value:"Submit",disabled:!(n.isValid&&n.dirty),children:"Submit"})]})]})})})})},gt=function(t){var e=t.data,n=e[0],a=e[1];return Object(O.jsx)("span",{style:{fontSize:"1rem"},children:Object(O.jsxs)("div",{className:"validateChecklist",children:[Object(O.jsx)("span",{children:n}),Object(O.jsx)("div",{className:function(){var t=["invalidStyle"];return a&&t.push("validStyle"),t.join(" ")}()})]})})},kt=n(82),Tt=n.n(kt),St=n(205),yt=n(203),It=function(t){var e=t.typeError,n=Object(H.c)((function(t){return t.AppReducer})).error,a=Object(H.b)(),r=function(t,e){"clickaway"!==e&&a(nt(null))};return Object(O.jsx)(St.a,{open:null!==n,autoHideDuration:6e3,onClose:r,anchorOrigin:{vertical:"bottom",horizontal:"center"},children:Object(O.jsxs)(wt,{onClose:r,severity:e,sx:{width:"100%"},children:[n," \ud83d\ude20"]})})},wt=i.a.forwardRef((function(t,e){return Object(O.jsx)(yt.a,Object(K.a)({elevation:6,ref:e,variant:"filled"},t))})),Ct=function(){return Object(O.jsx)("div",{className:Tt.a.background_block_login_page,children:Object(O.jsxs)("div",{className:Tt.a.block_login_page,children:[Object(O.jsx)(It,{typeError:"error"}),Object(O.jsx)(_t,{})]})})},Et=n(211),At=n(213),Nt=n(210),Dt=function(t){var e=t.status,n=t.login,a=t.onClickHandler,r=t.addTodolist;return Object(O.jsx)(Nt.a,{position:"static",color:"secondary",style:{height:"100px"},children:Object(O.jsxs)(Et.a,{children:[Object(O.jsx)("div",{className:"AddItem",children:Object(O.jsx)(h,{addItem:r,color:"info",disabled:"loading"===e&&!0})}),Object(O.jsx)(At.a,{variant:"h6",component:"div",sx:{flexGrow:1},className:"global_todo_title",children:"Todolist for your business"}),Object(O.jsx)("h3",{className:"Login_name",children:n}),Object(O.jsx)(M.a,{onClick:a,color:"error",variant:"contained",children:"LogOut"})]})})},Lt=n(214),Rt=n(215),Pt=function(){return Object(O.jsx)(Lt.a,{sx:{width:"100%"},children:Object(O.jsx)(Rt.a,{color:"secondary"})})},Ht=function(){var t=Object(H.c)((function(t){return t.todolists})),e=Object(H.c)((function(t){return t.tasks})),n=Object(H.c)((function(t){return t.AuthorizationReducer})),a=n.login,r=n.isAuth,i=Object(H.c)((function(t){return t.AppReducer})).status,s=Object(H.b)();Object(c.useEffect)((function(){s(function(){var t=Object($.a)(Z.a.mark((function t(e){var n,a,r,c,i;return Z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D();case 2:0===(n=t.sent).resultCode&&(a=n.data,r=a.login,c=a.email,i=a.id,e(ht({id:i,email:c,login:r,isAuth:!0})));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),s(function(){var t=Object($.a)(Z.a.mark((function t(e){var n;return Z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(et("loading")),t.prev=1,t.next=4,S();case 4:200===(n=t.sent).status&&(e({type:"SET-TODOLISTS",todolists:n.data}),e(et("succeeded"))),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),t.t0 instanceof Error&&rt(t.t0,e);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}())}),[]);var o=Object(c.useCallback)((function(t){s(function(t){return function(){var e=Object($.a)(Z.a.mark((function e(n){var a;return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(et("loading")),e.prev=1,e.next=4,y(t);case 4:0===(a=e.sent).data.resultCode?(n(B(t,a.data.data.item.id)),n(et("succeeded"))):at(a.data,n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),e.t0 instanceof Error&&rt(e.t0,n);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()}(t))}),[s]);return r?Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(Dt,{login:a,addTodolist:o,onClickHandler:function(){return s(function(){var t=Object($.a)(Z.a.mark((function t(e){return Z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L();case 2:0===t.sent.resultCode&&e(ht({id:null,email:null,login:null,isAuth:!1}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},status:i}),Object(O.jsx)("div",{className:"progress_bar_padding",children:"loading"===i&&Object(O.jsx)(Pt,{})}),Object(O.jsx)(It,{typeError:"error"}),Object(O.jsx)("div",{className:"MainContainer",children:Object(O.jsx)(jt.a,{container:!0,style:{width:"100%",padding:"40px"},children:Object(O.jsx)(jt.a,{container:!0,spacing:7,children:t.map((function(t){var n=e[t.id];return Object(O.jsx)(jt.a,{item:!0,children:Object(O.jsx)(ft.a,{elevation:3,style:{padding:"20px",borderRadius:"10px",backgroundColor:"#ffffffa6"},children:Object(O.jsx)(bt,{id:t.id,title:t.title,tasks:n,filter:t.filter,entityStatus:t.entityStatus})})},t.id)}))})})})]}):Object(O.jsx)(Ct,{})},Mt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,216)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))},Ft=n(69),Ut=n(105),Kt=Object(Ft.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:it,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":var n=Object(K.a)({},t);return e.todolists.forEach((function(t){n[t.id]=[]})),n;case"ADD-TODOLIST":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.todolistId,[]));case"REMOVE-TODOLIST":var a=Object(K.a)({},t);return delete a[e.id],a;case"SET-TASKS":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.todolistId,e.tasks));case"REMOVE-TASK":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.task.todoListId,[e.task].concat(Object(U.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(K.a)(Object(K.a)({},t),e.model):t}))));case"CHANGE_TASK_ENTITY_STATUS":return Object(K.a)(Object(K.a)({},t),{},Object(ct.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(K.a)(Object(K.a)({},t),{},{entityTaskStatus:e.entityStatus}):t}))));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(K.a)(Object(K.a)({},t),{},{entityStatus:"idle",filter:"All"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[{id:e.todolistId,title:e.title,entityStatus:"idle",filter:"All",addedDate:"",order:0}].concat(Object(U.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(K.a)(Object(K.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(K.a)(Object(K.a)({},t),{},{filter:e.filter}):t}));case"CHANGE_TODOLIST_ENTITY_STATUS":return t.map((function(t){return t.id===e.id?Object(K.a)(Object(K.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},AuthorizationReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ot,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case pt:return Object(K.a)(Object(K.a)({},t),e.payload);default:return t}},AppReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case Q:return Object(K.a)(Object(K.a)({},t),{},{status:e.status});case W:return Object(K.a)(Object(K.a)({},t),{},{error:e.error});default:return t}}}),Gt=Object(Ft.c)(Kt,Object(Ft.a)(Ut.a));window.store=Gt,o.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(H.a,{store:Gt,children:Object(O.jsx)(Ht,{})})}),document.getElementById("root")),Mt()},29:function(t,e,n){t.exports={form_3:"SignIn_form_3__2SSkU",button:"SignIn_button__3DwEz",label_rememberMe_block:"SignIn_label_rememberMe_block__lLv1A",clearfix:"SignIn_clearfix__2yBzH",register:"SignIn_register__XS3YG",text_helper:"SignIn_text_helper__wRuGl",angle:"SignIn_angle__1tSts",text_helper_small_text:"SignIn_text_helper_small_text__31epX"}},67:function(t,e,n){t.exports={main_paper_div:"Todolist_main_paper_div__1EygI",block_name_and_delete:"Todolist_block_name_and_delete__a3zMX",add_item_form:"Todolist_add_item_form__kUhT1"}},82:function(t,e,n){t.exports={background_block_login_page:"LoginPage_background_block_login_page__39MEE",block_login_page:"LoginPage_block_login_page__1-jxa"}}},[[153,1,2]]]);
//# sourceMappingURL=main.788b5e9c.chunk.js.map