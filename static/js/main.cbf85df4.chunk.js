(this["webpackJsonpto-do-list"]=this["webpackJsonpto-do-list"]||[]).push([[0],{52:function(e,t,i){},53:function(e,t,i){},55:function(e,t,i){},56:function(e,t,i){},71:function(e,t,i){"use strict";i.r(t);var n=i(17),c=i.n(n),d=i(39),o=i.n(d),a=(i(52),i(5)),r=i(6),l=i(15),s=i(44),u=(i(53),i(14));var j=function(e){var t=Object(u.jsxs)("div",{id:e.editable?"editableItems":"nonEditableItems",children:[Object(u.jsx)("input",{type:"checkbox",id:e.id,checked:e.checked,disabled:e.editable,onChange:function(t){e.editable||e.onItemChanged(e.id,"checked",!e.checked)}}),Object(u.jsx)("textarea",{id:e.id,className:"".concat(e.editable?"editableItem":"nonEditableItem"," ").concat(e.checked?"checked":"unchecked"),value:e.item,readOnly:!e.editable,onChange:function(t){e.editable&&e.onItemChanged(e.id,"item",t.target.value)},onClick:function(){e.editable||e.onItemChanged(e.id,"checked",!e.checked)}}),e.editable?Object(u.jsxs)("select",{id:"priorityDropDownEditable",onChange:function(t){return e.onItemChanged(e.id,"priority",JSON.parse(t.target.value))},children:[Object(u.jsx)("option",{value:"",children:e.priority.value}),"High"!==e.priority.value&&Object(u.jsx)("option",{value:' {"key": "c", "value": "High"}',children:"High"}),"Medium"!==e.priority.value&&Object(u.jsx)("option",{value:' {"key": "b", "value": "Medium"}',children:"Medium"}),"Low"!==e.priority.value&&Object(u.jsx)("option",{value:' {"key": "a", "value": "Low"}',children:"Low"})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"".concat(e.checked?"checked":"unchecked"),id:"priority",children:e.priority.value}),Object(u.jsx)("button",{id:"deleteItem",onClick:function(){return e.onItemsDeleted([e.id])},children:" x"})]})]});return Object(u.jsx)("div",{id:"listItem",children:t},e.id)};i(55);var b=function(e){return Object(u.jsx)("div",{className:"backdrop",children:Object(u.jsxs)("div",{id:"warning",children:[Object(u.jsx)("p",{children:"Are you sure you want to delete all completed items? This action is irreversible."}),Object(u.jsx)("button",{id:"cancel",onClick:e.onClose,children:"Cancel"}),Object(u.jsx)("button",{id:"confirm",onClick:function(t){e.onItemsDeleted(e.data.filter((function(e){return e.checked})).map((function(e){return e.id}))),e.onClose()},children:"Confirm"})]})})},h=(i(56),i(45));var m=function(e){var t=Object(n.useState)(!1),i=Object(l.a)(t,2),c=i[0],d=i[1],o=Object(n.useState)(!1),a=Object(l.a)(o,2),r=a[0],m=a[1],O=Object(n.useState)(!1),p=Object(l.a)(O,2),v=p[0],x=p[1],f=Object(n.useState)(""),k=Object(l.a)(f,2),g=k[0],y=k[1],I=Object(n.useState)({key:0,value:"--"}),C=Object(l.a)(I,2),S=C[0],D=C[1],w=e.data.map((function(t){return Object(u.jsx)(j,Object(s.a)({id:t.id,item:t.item,checked:t.checked,editable:r,onItemChanged:e.onItemChanged,created:t.created,priority:t.priority,onItemsDeleted:e.onItemsDeleted},t),t.id)})),B=w.filter((function(e){return!e.props.checked})),L={created:{name:"Creation Date",desc:"New \u2192 Old",asc:"Old \u2192 New"},item:{name:"Name",desc:"Z \u2192 A",asc:"A \u2192 Z"},priority:{name:"Priority",desc:"High \u2192 Low",asc:"Low \u2192 High"}},N=[];for(var E in L)if("order"!==E)for(var T=0,F=["desc","asc"];T<F.length;T++){var M=F[T];e.sortField===E&&e.sortDirection===M||N.push(Object(u.jsxs)("option",{value:"".concat(E," ").concat(M),children:["Sort by ",L[E].name,": ",L[E][M]]}))}return Object(u.jsxs)("div",{id:"list",children:[Object(u.jsx)("h1",{children:"To-Do List"}),0!==w.length&&Object(u.jsx)("div",{id:"sort",children:Object(u.jsxs)("select",{id:"priorityDropDown",onChange:function(t){return e.onSortItems(t.target.value)},disabled:r,children:[Object(u.jsxs)("option",{value:"",children:["Sort by ",L[e.sortField].name,": ",L[e.sortField][e.sortDirection]]}),N]})}),Object(u.jsxs)("div",{id:"inputBox_Button",children:[Object(u.jsx)("button",{id:"addItem",className:g?"enabled":"disabled",onClick:function(t){""!==g&&(e.onItemAdded(g,S),y(""))},children:"+"}),Object(u.jsx)("input",{id:"inputText",type:"text",placeholder:"Enter text here...",onChange:function(e){return y(e.target.value)},value:g,disabled:r}),Object(u.jsxs)("select",{id:"selectPriority",onChange:function(e){return D(JSON.parse(e.target.value))},disabled:r,children:[Object(u.jsx)("option",{value:'{"key": "0", "value": "--"}',children:"--Set Priority--"}),Object(u.jsx)("option",{value:'{"key": "c", "value": "High"}',children:"High"}),Object(u.jsx)("option",{value:'{"key": "b", "value": "Medium"}',children:"Medium"}),Object(u.jsx)("option",{value:'{"key": "a", "value": "Low"}',children:"Low"})]})]}),0!==w.length&&Object(u.jsx)("div",{id:"editButton",children:Object(u.jsxs)("button",{onClick:function(){return m(!r)},children:[" ",r?"Done":"Edit Items"," "]})}),Object(u.jsxs)("div",{id:"listItems",children:[0!==w.length&&Object(u.jsxs)("div",{id:"labels",children:[Object(u.jsx)("h2",{children:"Item"}),Object(u.jsx)("h2",{children:"Priority"})]}),Object(u.jsx)(h.CSSTransitionGroup,{transitionName:"fade",transitionEnter:300,transitionLeave:300,children:c?B:w})]}),v&&Object(u.jsx)(b,{data:e.data,onItemsDeleted:e.onItemsDeleted,onClose:function(){return x(!1)}}),B.length!==w.length&&Object(u.jsxs)("div",{className:"completedButtons",children:[c?Object(u.jsx)("button",{id:"showCompleted",onClick:function(){return d(!c)},children:"Show Completed Items"}):Object(u.jsx)("button",{id:"hideCompleted",onClick:function(){return d(!c)},children:"Hide Completed Items"}),!r&&!c&&Object(u.jsx)("button",{id:"deleteCompleted",onClick:function(){return x(!0)},children:"Delete Completed Items"})]})]})},O=i(46),p=i(35),v=i(47);p.a.initializeApp({apiKey:"AIzaSyB6K4Ycqr1bST4Zkkr_tTKRzEOQ5n9aY6o",authDomain:"cs124-lab3-33ef0.firebaseapp.com",projectId:"cs124-lab3-33ef0",storageBucket:"cs124-lab3-33ef0.appspot.com",messagingSenderId:"283056924726",appId:"1:283056924726:web:12cc1133aa2ec5ffba1097",measurementId:"G-E3QVKSNMGJ"});var x=p.a.firestore(),f="to-do-list";var k=function(e){var t=Object(n.useState)("created"),i=Object(l.a)(t,2),c=i[0],d=i[1],o=Object(n.useState)("desc"),s=Object(l.a)(o,2),j=s[0],b=s[1],h=x.collection(f).orderBy(c,j),k=x.collection(f),g=Object(v.a)(h),y=Object(l.a)(g,3),I=y[0],C=y[1];if(y[2],C)return Object(u.jsx)("div",{children:Object(u.jsx)("h1",{children:" Loading "})});var S=null;return I&&(S=I.docs.map((function(e){return e.data()}))),Object(u.jsx)(m,{data:S,onItemAdded:function(e,t){var i=Object(O.a)(),n={id:i,item:e,checked:!1,created:p.a.database.ServerValue.TIMESTAMP,priority:t};k.doc(i).set(n)},onItemsDeleted:function(e){var t,i=Object(r.a)(e);try{for(i.s();!(t=i.n()).done;){var n=t.value;k.doc(n).delete()}}catch(c){i.e(c)}finally{i.f()}},onItemChanged:function(e,t,i){k.doc(e).update(Object(a.a)({},t,i))},onSortItems:function(e){var t=e.split(" "),i=Object(l.a)(t,2),n=i[0],c=i[1];d(n),b(c)},sortDirection:j,sortField:c})},g=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,72)).then((function(t){var i=t.getCLS,n=t.getFID,c=t.getFCP,d=t.getLCP,o=t.getTTFB;i(e),n(e),c(e),d(e),o(e)}))};o.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(k,{initialData:[{id:0,item:"Buy new John Grisham Book",checked:!1},{id:1,item:"Buy newer John Grisham Book",checked:!0}]})}),document.getElementById("root")),g()}},[[71,1,2]]]);
//# sourceMappingURL=main.cbf85df4.chunk.js.map