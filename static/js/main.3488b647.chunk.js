(this["webpackJsonpto-do-list"]=this["webpackJsonpto-do-list"]||[]).push([[0],{17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),d=n(6),o=n.n(d),a=(n(17),n(2)),r=(n.p,n(18),n(12)),s=(n(19),n(0));var u=function(e){return Object(s.jsx)("div",{children:e.editable?Object(s.jsxs)("div",{id:"editableItems",children:[Object(s.jsx)("input",{type:"checkbox",id:e.id,checked:e.checked}),Object(s.jsx)("textarea",{id:e.id,value:e.item,onChange:function(t){return e.onItemChanged(e.id,"item",t.target.value)}})]}):Object(s.jsxs)("div",{id:"nonEditableItems",children:[Object(s.jsx)("input",{type:"checkbox",id:e.id,checked:e.checked,onChange:function(){return e.onItemChanged(e.id,"checked",!e.checked)}}),Object(s.jsx)("textarea",{className:"nonEditableItem",id:e.id,value:e.item,readOnly:!0,onClick:function(){return e.onItemChanged(e.id,"checked",!e.checked)}})]})},e.id)};n(21);var l=function(e){return Object(s.jsx)("div",{className:"backdrop",children:Object(s.jsxs)("div",{id:"warning",children:[Object(s.jsx)("p",{children:"Are you sure you want to delete all completed items? This action is irreversible."}),Object(s.jsx)("button",{id:"cancel",onClick:e.onClose,children:"Cancel"}),Object(s.jsx)("button",{id:"confirm",onClick:function(t){e.onItemsDeleted(e.data.filter((function(e){return e.checked})).map((function(e){return e.id}))),e.onClose()},children:"Confirm"})]})})},j=(n(22),n(10));var h=function(e){var t=Object(i.useState)(!1),n=Object(a.a)(t,2),c=n[0],d=n[1],o=Object(i.useState)(!1),h=Object(a.a)(o,2),b=h[0],m=h[1],O=Object(i.useState)(!1),x=Object(a.a)(O,2),f=x[0],C=x[1],p=Object(i.useState)(!1),I=Object(a.a)(p,2),k=I[0],v=I[1],g=e.data.map((function(t){return Object(s.jsx)(u,Object(r.a)({id:t.id,item:t.item,checked:t.checked,editable:b,onItemChanged:e.onItemChanged},t),t.id)})),B=g.filter((function(e){return!e.props.checked}));return Object(s.jsxs)("div",{id:"list",children:[Object(s.jsx)("h1",{children:"To-Do List"}),Object(s.jsxs)("div",{id:"inputBox_Button",children:[Object(s.jsx)("button",{id:"addItem",className:k?"enabled":"disabled",onClick:function(t){""!==document.getElementById("inputText").value&&(e.onItemAdded(document.getElementById("inputText").value),document.getElementById("inputText").value="",v(!1))},children:"+"}),Object(s.jsx)("input",{id:"inputText",type:"text",onChange:function(e){""!==e.target.value?v(!0):v(!1)}})]}),0!==g.length&&Object(s.jsx)("div",{id:"editButton",children:Object(s.jsxs)("button",{onClick:function(){return m(!b)},children:[" ",b?"Save Changes":"Edit Items"," "]})}),Object(s.jsx)("div",{id:"listItems",children:Object(s.jsx)(j.CSSTransitionGroup,{transitionName:"fade",transitionEnter:300,transitionLeave:300,children:c?B:g})}),f&&Object(s.jsx)(l,{data:e.data,onItemsDeleted:e.onItemsDeleted,onClose:function(){return C(!1)}}),B.length!==g.length&&Object(s.jsxs)("div",{className:"completedButtons",children:[c?Object(s.jsx)("button",{id:"showCompleted",onClick:function(){return d(!c)},children:"Show Completed Items"}):Object(s.jsx)("button",{id:"hideCompleted",onClick:function(){return d(!c)},children:"Hide Completed Items"}),Object(s.jsx)("button",{id:"deleteCompleted",onClick:function(){return C(!0)},children:"Delete Completed Items"})]})]})};var b=function(e){return Object(s.jsx)(h,{data:e.data,onItemAdded:e.onItemAdded,onItemsDeleted:e.onItemsDeleted,onItemChanged:e.onItemChanged})},m=n(11);var O=function(e){var t=Object(i.useState)(e.initialData),n=Object(a.a)(t,2),c=n[0],d=n[1];return Object(s.jsx)(b,{data:c,onItemAdded:function(e){var t=[{id:Object(m.a)(),item:e,checked:!1}];d(c.concat(t))},onItemsDeleted:function(e){d(c.filter((function(t){return!e.includes(t.id)})))},onItemChanged:function(e,t,n){d(c.map((function(i){return i.id===e&&(i[t]=n),i})))}})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,d=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),d(e),o(e)}))};o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(O,{initialData:[{id:0,item:"Buy new John Grisham Book",checked:!1},{id:1,item:"Buy newer John Grisham Book",checked:!0}]})}),document.getElementById("root")),x()}},[[35,1,2]]]);
//# sourceMappingURL=main.3488b647.chunk.js.map