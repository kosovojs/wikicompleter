!function(e){function t(t){for(var n,i,l=t[0],c=t[1],s=t[2],p=0,m=[];p<l.length;p++)i=l[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&m.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(u&&u(t);m.length;)m.shift()();return o.push.apply(o,s||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,l=1;l<a.length;l++){var c=a[l];0!==r[c]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},r={0:0},o=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=c;o.push([124,1]),a()}({124:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),i=a.n(o),l=a(27),c=a(163),s=a(92),u=Object(s.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:"#DC143C"},success:{main:c.a.A200},background:{default:"#fff"},status:{danger:"#DC143C"}}}),p=a(180),m=a(32),d=a(69),g=a.n(d),f=a(28),h=a.n(f),b=a(43),v=a.n(b),y=a(44),E=a.n(y),O=a(45),w=a.n(O),j=a(16),C=a.n(j),k=a(46),S=a.n(k),P=a(6),D=a.n(P),x=a(5),F=a(184),L=a(170),N=a(87),T=a.n(N),I=a(86),R=a.n(I),q=a(186),A=a(185),W=a(187),M=a(168),_=a(181),U=a(169),z=a(171),B=a(12),H=a(35),J=a(2),Q=a.n(J),G=a(67),V=a.n(G);var Y=function(e,t,a){var n=null,r=!1;try{n=JSON.parse(t),r=!0}catch(e){n=t}this.response=n,this.message=e,this.status=a,B.b.error("Server returned error: ".concat(this.toString()),{autoClose:1e4}),this.toString=function(){return"".concat(this.message,"\nResponse:\n").concat(r?JSON.stringify(this.response,null,2):this.response)}},K="//tools.wmflabs.org/edgarsdev/";var X=function(e,t){var a="";"http"==e.substr(0,4)?a=e:K!==e.substr(0,K.length)&&(a=K+e);var n,r=void 0===t?"":(n=t,"?"+Object.keys(n).reduce((function(e,t){return e.push(t+"="+encodeURIComponent(n[t])),e}),[]).join("&"));return"".concat(a).concat(r)};function Z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function $(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(a),!0).forEach((function(t){D()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Z(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ee=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a={},n={},r=["post","put","patch"],o=$({},a,{},t,{headers:$({},n,{},t.headers)});o.method=o.method.toLowerCase();var i=o.body instanceof File;o.body&&"object"===V()(o.body)&&!i&&r.indexOf(o.method)>-1&&(o.headers={Accept:"application/json","Content-Type":"application/json"},o.body=JSON.stringify(o.body));var l=X(e,o.params),c=null;return fetch(l,o).then((function(e){return(c=e).status<200||c.status>=300?c.text():c.json()})).then((function(e){if(c.status<200||c.status>=300)throw e;return e})).catch((function(e){throw c?new Y("Request failed with status ".concat(c.status,"."),e,c.status):new Y(e.toString(),null,"REQUEST_FAILED")}))},te={tool:{submit:function(e){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return ee(e,{body:t,method:"post"})}("data",{info:e})},reqData:function(e){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return ee(e,{params:t,method:"get"})}("req_data/".concat(e))}}};function ae(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var ne=Object(m.b)({name:"main",initialState:{from:null,to:null,filters:null},reducers:{setData:{reducer:function(e,t){var a=t.payload;return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ae(Object(a),!0).forEach((function(t){D()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ae(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{from:a.from,to:a.to,filters:a.filters})},prepare:function(e,t,a){return{payload:{from:e,to:t,filters:a}}}}}}),re=ne.actions.setData,oe=ne.reducer;function ie(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function le(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ie(Object(a),!0).forEach((function(t){D()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ie(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ce={error:!1,errorMessage:null,loading:!1,hasRequested:!1,list:[],completionTime:null,reqID:null,isCached:!1,cacheAge:null},se=Object(m.b)({name:"data",initialState:ce,reducers:{setData:{reducer:function(e,t){return console.log(t.payload),le({},e,{},t.payload)},prepare:function(e){return{payload:e}}},setLoading:{reducer:function(e,t){return le({},e,{loading:t.payload.value})},prepare:function(e){return{payload:{value:e}}}},setInit:{reducer:function(e){return le({},ce,{loading:e.loading})}}}}),ue=se.actions,pe=ue.setData,me=ue.setLoading,de=ue.setInit,ge=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(t,a){var n=a().main,r=n.from,o=n.to,i=n.filters;t(me(!0)),t(de());var l={from:r,to:o,filters:i,ignoreCache:e};te.tool.submit(l).then((function(e){var a=e.data,n=e.success,r=e.meta;t(pe(!0===n?{hasRequested:!0,list:a,completionTime:r.time,reqID:r.id,isCached:r.cached,error:!1,cacheAge:r.cache_age}:{hasRequested:!0,error:!0,errorMessage:r.message}))})).catch((function(e){t(pe({hasRequested:!0,error:!0}))})).finally((function(){t(me(!1))}))}},fe=se.reducer,he=function e(){h()(this,e),D()(this,"getSettings",(function(){var e=localStorage.getItem("completer-tool");return null==e?{filter:"",from:"",to:""}:JSON.parse(e)})),D()(this,"saveSettings",(function(e){return localStorage.setItem("completer-tool",JSON.stringify(e)),!0}))};function be(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ve(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?be(Object(a),!0).forEach((function(t){D()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):be(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ye={category:{title:"",depth:0,talk:!1},template:{title:"",talk:!1},petscan:{id:""}},Ee={type:"category",specific:{title:"",depth:0,talk:!1}},Oe=function(e){function t(){var e,a;h()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=E()(this,(e=w()(t)).call.apply(e,[this].concat(r))),D()(C()(a),"settingsHandler",null),D()(C()(a),"state",{filterChanged:!1,inputLanguage:"",project:"wikipedia",targetLanguage:"",titleLanguage:"",output:"list",outputOptions:["list","json","table"],onlyArticles:!0,filters:[Ee]}),D()(C()(a),"handleChange",(function(e){var t=e.target,n=t.name,r=t.value,o=t.checked,i=t.type;a.setState(D()({},n,"checkbox"===i?o:r))})),D()(C()(a),"handleFilterChange",(function(e){return function(t){var n=t.target,r=n.name,o=n.value,i=n.checked,l="checkbox"===n.type?i:o,c=g()(a.state.filters);if("type"===r)return c[e]=D()({specific:ye[l]},r,l),void a.setState({filters:c,filterChanged:!0});if(l.length>0&&"depth"===r){var s=parseInt(l);if(s>10||s<0)return}var u=c[e];u=ve({},u,{specific:ve({},u.specific,D()({},r,l))}),c[e]=u,a.setState({filters:c,filterChanged:!0})}})),D()(C()(a),"removeFilter",(function(e){a.setState({filters:a.state.filters.filter((function(t,a){return a!==e})),filterChanged:!0})})),D()(C()(a),"addFilter",(function(e){a.setState({filters:[].concat(g()(a.state.filters),[{type:"category",specific:ye.category}]),filterChanged:!0})})),D()(C()(a),"submit",(function(){var e=a.state,t=e.inputLanguage,n=e.targetLanguage,r=(e.titleLanguage,e.filters);if(e.filterChanged&&(a.props.history.push("/"),a.setState({filterChanged:!1})),""!=t)if(""!=n)if(t!==n)if(0!==r.length){var o=!1;r.forEach((function(e,t){if(!o){var a=e.type,n=e.specific;if("category"===a){if(""===n.title)return B.b.warn("Please fill filter nr. ".concat(t+1),{autoClose:7500}),void(o=!0)}else if("template"===a){if(""===n.title)return B.b.warn("Please fill filter nr. ".concat(t+1),{autoClose:7500}),void(o=!0)}else if("petscan"===a&&""===n.id)return B.b.warn("Please fill filter nr. ".concat(t+1),{autoClose:7500}),void(o=!0)}})),o||(a.props.setRequestData(t,n,r),a.props.getData())}else B.b.warn("Add at least one filter",{autoClose:7500});else B.b.warn("Input and target languages are the same!",{autoClose:7500});else B.b.warn("Please add target language",{autoClose:7500});else B.b.warn("Please add input language",{autoClose:7500})})),D()(C()(a),"handleURLParams",(function(){var e=a.props.match.params,t=e.id,n=e.auto;if(t)te.tool.reqData(t).then((function(e){if("error"in e)return B.b.error("No such request ID",{autoClose:1e4}),void a.setState({filters:[Ee],inputLanguage:"",targetLanguage:""});var t=e.filters,r=e.from,o=e.to;a.setState({filters:t,inputLanguage:r,targetLanguage:o},(function(){"auto"===n&&a.submit()}))}));else{var r=a.settingsHandler.getSettings(),o=r.from,i=r.to,l=r.filter,c=""===l?[Ee]:[{specific:ye[l],type:l}];a.setState({targetLanguage:i,inputLanguage:o,filters:c})}})),a}return S()(t,e),v()(t,[{key:"componentDidMount",value:function(){this.settingsHandler=new he,this.handleURLParams()}},{key:"componentDidUpdate",value:function(e){this.props.match.params.id===e.match.params.id&&this.props.match.params.auto===e.match.params.auto||this.handleURLParams()}},{key:"render",value:function(){var e=this,t=this.state,a=t.inputLanguage,n=t.targetLanguage,o=(t.onlyArticles,t.filters),i=this.props,l=i.classes,c=i.dataLoading;return r.a.createElement("div",{className:l.root},r.a.createElement(F.a,{label:"Input language",name:"inputLanguage",onChange:this.handleChange,value:a,size:"small",variant:"outlined",margin:"dense"}),r.a.createElement(F.a,{label:"Without interwiki to",name:"targetLanguage",onChange:this.handleChange,value:n,size:"small",variant:"outlined",margin:"dense"}),r.a.createElement("br",null),o.map((function(t,a){var n=t.type,i=t.specific;return r.a.createElement("div",{key:a},r.a.createElement(U.a,{light:!0}),r.a.createElement(L.a,{"aria-label":"delete",className:l.margin,onClick:function(){return e.addFilter(a)}},r.a.createElement(R.a,{fontSize:"small"})),o.length>1&&r.a.createElement(L.a,{"aria-label":"delete",className:l.margin,onClick:function(){return e.removeFilter(a)}},r.a.createElement(T.a,{fontSize:"small"})),r.a.createElement(M.a,{variant:"outlined",className:l.formControl},r.a.createElement(A.a,{htmlFor:"outlined-age-simple"},"Filter type"),r.a.createElement(_.a,{margin:"dense",value:n,name:"type",onChange:e.handleFilterChange(a),input:r.a.createElement(q.a,{name:"age",id:"outlined-age-simple"})},r.a.createElement(W.a,{value:"category"},"Category"),r.a.createElement(W.a,{value:"petscan"},"Petscan"),r.a.createElement(W.a,{value:"template"},"Template"))),"category"===n&&r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{label:"Category title",name:"title",onChange:e.handleFilterChange(a),value:i.title,variant:"outlined",margin:"dense",style:{margin:8,width:"300px"},fullWidth:!0}),r.a.createElement(F.a,{label:"Depth",name:"depth",type:"number",inputProps:{min:"0",max:"10",step:"1"},onChange:e.handleFilterChange(a),value:i.depth,size:"small",variant:"outlined",margin:"dense"})),"template"===n&&r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{label:"Template title",name:"title",onChange:e.handleFilterChange(a),value:i.title,size:"small",variant:"outlined",margin:"dense",style:{margin:8,width:"300px"},fullWidth:!0})),"pagelinks"===n&&r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{label:"Article title",name:"title",onChange:e.handleFilterChange(a),value:i.title,size:"small",variant:"outlined",margin:"dense"}),r.a.createElement(M.a,{variant:"outlined",className:l.formControl},r.a.createElement(A.a,{htmlFor:"outlined-age-simple"},"Mode"),r.a.createElement(_.a,{margin:"dense",value:i.mode,name:"mode",onChange:e.handleFilterChange(a),input:r.a.createElement(q.a,{name:"age",id:"outlined-age-simple"})},r.a.createElement(W.a,{value:"linksto"},"WhatLinksHere"),r.a.createElement(W.a,{value:"linksfrom"},"Links on page")))),"petscan"===n&&r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{label:"Petscan ID",name:"id",onChange:e.handleFilterChange(a),value:i.id,size:"small",variant:"outlined",margin:"dense",style:{margin:8,width:"300px"},fullWidth:!0})))})),r.a.createElement(z.a,{disabled:c,variant:"contained",color:"primary",disableelevation:"true",onClick:this.submit},"Submit"),r.a.createElement("div",{style:{marginBottom:"15px"}}))}}]),t}(n.Component);Oe.propTypes={classes:Q.a.object};var we={setRequestData:function(e,t,a){return function(n){n(re(e,t,a))}},getData:ge},je=Object(l.b)((function(e){return{dataLoading:e.data.loading}}),we)(Object(x.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}},formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},margin:{margin:e.spacing(1)}}}),{withTheme:!0})(Object(H.f)(Oe))),Ce=a(22),ke=a.n(Ce),Se=a(94),Pe=a(172),De=a(4),xe=a(89),Fe=Object(xe.a)((function(e){var t;return{col3:(t={columnCount:1},D()(t,e.breakpoints.up("sm"),{columnCount:2}),D()(t,e.breakpoints.up("md"),{columnCount:3}),t),col2:{columnCount:2},removedUnderline:{textDecoration:"none"}}})),Le=function(e){var t=e.list,a=e.language,n=Fe();return r.a.createElement("div",{className:n.col3},r.a.createElement("ul",null,t.map((function(e){var t=ke()(e,2),o=t[0],i=t[1];return r.a.createElement("li",{key:o},r.a.createElement("a",{className:n.removedUnderline,href:"https://".concat(a,".wikipedia.org/wiki/").concat(o),target:"_blank"},o.replace(/_/g," ")),": ",i)}))))},Ne=function(e){var t=e.list,a=e.language,n=Fe();return r.a.createElement("div",{className:n.col3},t.map((function(e){var t=ke()(e,2),o=t[0],i=t[1],l=o.replace(/_/g," ");return r.a.createElement("div",{key:o},"* ","[[",r.a.createElement("a",{className:n.removedUnderline,href:"https://".concat(a,".wikipedia.org/wiki/").concat(o),target:"_blank"},l),"]]",": ",i)})))},Te=a(30),Ie=function(e,t){var a=[];return t.forEach((function(t){var n=ke()(t,2),r=n[0],o=n[1],i=r.replace(/_/g," ");a.push("* [[:".concat(e,":").concat(i,"|").concat(i,"]]: ").concat(o))})),a.join("\n")},Re=function(e){function t(){var e,a;h()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=E()(this,(e=w()(t)).call.apply(e,[this].concat(r))),D()(C()(a),"state",{anchorEl:null,resultFormat:"list"}),D()(C()(a),"reloadWithoutCache",(function(){a.props.getData(!0)})),D()(C()(a),"setFormat",(function(e){a.setState({resultFormat:e})})),D()(C()(a),"copyDataToClipboard",(function(){var e=a.props,t=e.language,n=e.articles,r=Ie(t,n);navigator.clipboard.writeText(r).then((function(){B.b.success("Copied to clipboard!")}),(function(e){B.b.success("Could not copy to clipboard!")}))})),a}return S()(t,e),v()(t,[{key:"render",value:function(){var e=this.state,t=e.anchorEl,a=e.resultFormat,n=this.props,o=n.classes,i=n.errorMessage,l=n.loading,c=n.error,s=n.articles,u=n.time,p=n.isCached,m=n.cacheAge,d=n.language,g=n.reqID,f=n.hasRequested;Boolean(t);return l?r.a.createElement("div",{className:o.loadingPageWrapper},r.a.createElement(Pe.a,{className:o.loadingPage})):f?c&&i?r.a.createElement(Se.a,{component:"div",variant:"body1"},"Error occurred: ".concat(i)):r.a.createElement("div",{className:o.root},r.a.createElement(U.a,null),r.a.createElement("div",{style:{marginTop:"10px"}}),r.a.createElement(Se.a,{component:"div",variant:"body1"},g&&r.a.createElement("div",{className:Object(De.a)(o.floatRight,o.flexContainer)},r.a.createElement("div",{className:o.reqLinks},"Request ",g,": ",r.a.createElement(Te.b,{to:"/".concat(g,"/auto")},"with autoload"),","," ",r.a.createElement(Te.b,{to:"/".concat(g)},"without autoload")),s.length>0&&r.a.createElement("div",{className:o.clipboardButton},r.a.createElement(z.a,{variant:"outlined",color:"primary",onClick:this.copyDataToClipboard},"Copy list to clipboard"))),s.length>0?r.a.createElement(r.a.Fragment,null,p&&r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:o.infoText},"Showing ",m," seconds old cached version of list."," ",r.a.createElement("span",{className:o.loadWithoutCache,onClick:this.reloadWithoutCache},"Load live data!"))),"list"===a&&r.a.createElement(Le,{list:s,language:d}),"wikilist"===a&&r.a.createElement(Ne,{list:s,language:d}),r.a.createElement("span",{className:o.infoText},"Query took ",u," seconds to complete")):"No data")):""}}]),t}(n.Component);Re.propTypes={classes:Q.a.object};var qe={getData:ge},Ae=Object(l.b)((function(e){var t=e.data,a=e.main;return{loading:t.loading,errorMessage:t.errorMessage,error:t.error,articles:t.list,time:t.completionTime,isCached:t.isCached,cacheAge:t.cacheAge,reqID:t.reqID,hasRequested:t.hasRequested,language:a.from}}),qe)(Object(x.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}},loadingPage:{display:"flex",margin:"0 auto"},loadingPageWrapper:{position:"fixed",width:"100%",height:"100%",display:"flex",alignItems:"center",top:"0"},infoText:{fontSize:"0.8rem"},loadWithoutCache:{cursor:"pointer"},floatRight:{float:"right"},flexContainer:{display:"flex",flexDirection:"column",alignItems:"end"},clipboardButton:{marginTop:"7px"},formatButtons:{marginTop:"7px"}}}),{withTheme:!0})(Re)),We=function(){return r.a.createElement("div",{style:{margin:"2vw"}},r.a.createElement(Se.a,{variant:"h4"},"Missing articles"),r.a.createElement(Se.a,{style:{marginBottom:"10px"},component:"div",variant:"body1"},"List articles from one Wikipedia containing the most interwikis without article in target Wikipedia"),r.a.createElement(je,null),r.a.createElement(Ae,null))},Me=a(14),_e=a(177),Ue=a(178),ze=a(90),Be=a.n(ze),He=a(91),Je=a.n(He),Qe=a(183),Ge=a(176),Ve=a(174),Ye=a(173),Ke=a(175),Xe=Object(xe.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}}}}));var Ze=function(e){var t=e.modalOpenHandle,a=e.isOpen,o=Xe(),i=r.a.useState(""),l=ke()(i,2),c=l[0],s=l[1],u=r.a.useState(""),p=ke()(u,2),m=p[0],d=p[1],g=r.a.useState(""),f=ke()(g,2),h=f[0],b=f[1],v=new he;return Object(n.useEffect)((function(){var e=v.getSettings();s(e.from),d(e.to),b(e.filter)}),[]),r.a.createElement("div",{className:o.root},r.a.createElement(Qe.a,{fullWidth:!0,disableEnforceFocus:!1,open:a,"aria-labelledby":"form-dialog-title",maxWidth:"sm"},r.a.createElement(Ye.a,{id:"form-dialog-title"},"Settings"),r.a.createElement(Ve.a,null,r.a.createElement(Ke.a,null,"Your settings will be remembered on the same browser and computer."),r.a.createElement("div",{className:o.root},r.a.createElement(F.a,{margin:"dense",id:"name",label:"Default input language",type:"text",onChange:function(e){return s(e.target.value)},value:c}),r.a.createElement(F.a,{margin:"dense",id:"name",label:"Default target language",type:"text",onChange:function(e){return d(e.target.value)},value:m}),r.a.createElement(F.a,{margin:"dense",select:!0,label:"Default filter",value:h,onChange:function(e){return b(e.target.value)}},["","category","petscan","template"].map((function(e){return r.a.createElement(W.a,{key:e,value:e},e)}))))),r.a.createElement(Ge.a,null,r.a.createElement(z.a,{onClick:function(){v.saveSettings({from:c,to:m,filter:h})&&B.b.success("Saved settings!")},color:"secondary"},"Save"),r.a.createElement(z.a,{onClick:function(){t(!1)},color:"primary"},"Cancel"))))},$e=Object(xe.a)((function(e){return{grow:{flexGrow:1},removedShadow:{boxShadow:"0px 1px 1px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)"},menuButton:{marginRight:e.spacing(2)},title:D()({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:D()({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(Me.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(Me.b)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:D()({padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:200}),sectionDesktop:D()({display:"none"},e.breakpoints.up("md"),{display:"flex"}),sectionMobile:D()({display:"flex"},e.breakpoints.up("md"),{display:"none"})}}));var et=function(){var e=$e(),t=Object(n.useState)(!1),a=ke()(t,2),o=a[0],i=a[1];return Object(n.useEffect)((function(){i(o)}),[o]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.grow},r.a.createElement(_e.a,{position:"sticky",className:e.removedShadow},r.a.createElement(Ue.a,null,r.a.createElement(Te.c,{to:"/",style:{textDecoration:"none",color:"unset"}},r.a.createElement(Se.a,{className:e.title,variant:"h6",noWrap:!0},"WikiCompleter")),r.a.createElement("div",{className:e.grow}),r.a.createElement(W.a,{onClick:function(){return i(!0)}},"Settings"),r.a.createElement(W.a,{onClick:function(){return window.open("https://github.com/kosovojs/missing-tool")}},r.a.createElement(Be.a,null)),r.a.createElement(W.a,{onClick:function(){return window.open("https://github.com/kosovojs/missing-tool/issues")}},r.a.createElement(Je.a,null))))),o&&r.a.createElement(Ze,{isOpen:o,modalOpenHandle:function(e){i(e)}}))},tt=a(179);function at(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function nt(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?at(Object(a),!0).forEach((function(t){D()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):at(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var rt=Object(m.b)({name:"app",initialState:{isAuth:!1,user:null,articles:null,lastArticleDate:null},reducers:{setOverview:{reducer:function(e,t){var a=t.payload;return nt({},e,{articles:a.count,lastArticleDate:a.date})},prepare:function(e,t){return{payload:{count:e,date:t}}}},setAuthUser:{reducer:function(e,t){return nt({},e,{user:t.payload.user,isAuth:!0})},prepare:function(e){return{payload:{user:e}}}},logout:{reducer:function(e){return nt({},e,{user:null,isAuth:!1})}}}}),ot=rt.actions,it=(ot.setOverview,ot.setAuthUser,ot.logout,rt.reducer),lt=function(e){function t(e){var a;return h()(this,t),(a=E()(this,w()(t).call(this,e))).state={error:null,errorInfo:null},a}return S()(t,e),v()(t,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.errorInfo?r.a.createElement("div",{className:"bodyWrapper"},r.a.createElement("h2",null,"Error"),r.a.createElement("details",{style:{whiteSpace:"pre-wrap"}},this.state.error&&this.state.error.toString(),r.a.createElement("br",null),this.state.errorInfo.componentStack)):this.props.children}}]),t}(r.a.Component);lt.propTypes={children:Q.a.node};a(123);var ct=function(e){var t=e.location;return r.a.createElement("div",null,r.a.createElement("h3",null,"Did not found page ",r.a.createElement("code",null,t.pathname)))};ct.propTypes={location:Q.a.object};var st=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Te.a,null,r.a.createElement(lt,null,r.a.createElement(tt.a,null),r.a.createElement(et,null),r.a.createElement(H.c,null,r.a.createElement(H.a,{exact:!0,path:"/:id?/:auto?",component:We}),r.a.createElement(H.a,{component:ct}))),r.a.createElement(B.a,{position:"bottom-right",autoClose:2500,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnVisibilityChange:!0,draggable:!1,pauseOnHover:!0})))},ut=a(19),pt=Object(ut.combineReducers)({app:it,main:oe,data:fe}),mt=Object(m.a)({reducer:pt});i.a.render(r.a.createElement(l.a,{store:mt},r.a.createElement(p.a,{theme:u},r.a.createElement(st,null))),document.getElementById("app"))}});
//# sourceMappingURL=main.82e34be75ec15c51832c.js.map