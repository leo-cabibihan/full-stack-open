(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(14),r=n.n(c),l=n(4),u=n(2),i=n(3),m=n.n(i),s=function(e){var t=e.newName,n=e.newNumber,a=e.addContact,c=e.setNewName,r=e.setNewNumber;return o.a.createElement("form",{onSubmit:a},o.a.createElement("fieldset",null,o.a.createElement("legend",null,"Add Contact"),o.a.createElement("div",null,"Name"," ",o.a.createElement("input",{value:t,onChange:function(e){c(e.target.value)}})),o.a.createElement("div",null,"Number"," ",o.a.createElement("input",{value:n,onChange:function(e){r(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"}," Add "))))},d=function(e){var t=e.name,n=e.number,a=e.id,c=e.removeContact;return o.a.createElement("li",null,t," ",n," ",o.a.createElement("button",{onClick:function(){c(a,t)}}," ","Delete"," "))},f=function(e){var t=e.people,n=e.removeContact;return o.a.createElement("ul",null,t.map((function(e){return o.a.createElement(d,{key:e.id,name:e.name,number:e.number,id:e.id,removeContact:n})})))},b=function(e){var t=e.setFilterBy;return o.a.createElement("div",null,"Filter"," ",o.a.createElement("input",{onChange:function(e){t(e.target.value)}}))},h=function(e){var t=e.shouldShow,n=e.message;return t?o.a.createElement("div",{style:{color:"green",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}}," ",n," "):null},p=function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(""),d=Object(u.a)(i,2),p=d[0],v=d[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),g=w[0],j=w[1],N=Object(a.useState)(""),O=Object(u.a)(N,2),S=O[0],y=O[1],C=c.filter((function(e){return!!e.name&&e.name.includes(S)}));Object(a.useEffect)((function(){m.a.get("http://localhost:3001/persons").then((function(e){r(e.data)}))}),[]);var k=Object(a.useState)(""),B=Object(u.a)(k,2),A=B[0],F=B[1],D=Object(a.useState)(!1),J=Object(u.a)(D,2),W=J[0],x=J[1],z=function(e){F(e),x(!0),setTimeout((function(){x(!1),F("")}),3e3)};return o.a.createElement("div",null,o.a.createElement("h2",null," Phonebook "),o.a.createElement(h,{shouldShow:W,message:A}),o.a.createElement(b,{setFilterBy:y}),o.a.createElement(f,{people:C,removeContact:function(e,t){window.confirm("Are you sure you want to delete ".concat(t))&&m.a.delete("http://localhost:3001/persons/".concat(e)).then((function(t){r(c.filter((function(t){return t.id!==e})))}))}}),o.a.createElement(s,{newName:g,newNumber:p,addContact:function(e){if(e.preventDefault(),""===p||""===g)alert("something is missing");else if(c.map((function(e){return e.name})).includes(g))if(!0===window.confirm("".concat(g," already added, want to change the number?"))){var t=c.find((function(e){return e.name===g})),n={name:t.name,number:p};m.a.put("http://localhost:3001/persons/".concat(t.id),n).then((function(e){r(c.map((function(e){return t===e?Object(l.a)(Object(l.a)({},n),{},{id:t.id}):e}))),z("".concat(g," phone number updated to ").concat(p)),j(""),v("")}))}else j(""),v("");else{var a={number:p,name:g};m.a.post("http://localhost:3001/persons",a).then((function(e){r(c.concat(e.data)),z("".concat(g," added to contacts list")),v(""),j("")})).catch((function(e){z(e)}))}},setNewName:j,setNewNumber:v}))};var v=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(p,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.e0aae41b.chunk.js.map