!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){(function(e){const r="undefined"!=typeof window?window:e,i=r.XP||n(3),s=r.XPEmitter||n(4),o=r.XPRequest||n(5);t.exports=r.XPDocParser=new i.Class("XPDocParser",{extends:s,initialize:{promise:!0,value(t,e){i.attempt(e=>{s.call(this);i.isObject(t)||(t={url:t});this.options=t;this.url=this.options.url;this.request=new o({parser:"text",url:this.url});this.state=this.request.state;this.request.on("data",this._handleData.bind(this));this.request.on("error",t=>this.error=t);this.request.on("state",t=>this.state=t);this.on("data",t=>e(null,t));this.on("error",t=>e(t,null));this.request.submit()},e)}},parse(t){i.assertArgument(i.isVoid(t)||i.isString(t),1,"string");let e=t?new RegExp(`\\/\\*\\*([\\s\\S]*?)\\*\\/|\x3c!--([\\s\\S]*?)--\x3e`,`g`):null,n=t?i.match(t,e).map(t=>this.parseBlock(t)):[],r=t?n.find(t=>this.entities.indexOf(t.type)>=0):null;return r&&this._interpretEntity(r,i.pull(n,r)),r||{type:"Unknown",name:"Unknown",summary:"**Undocumented**"}},parseBlock(t){i.assertArgument(i.isVoid(t)||i.isString(t),1,"string"),t=t||"",t=t.replace(/\r\n/g,"\n"),t=t.replace(/^\s*\/\*\*|^\s*\*\/|^\s*\* ?|^\s*<!-\-|^s*\-\->/gm,"");let e=t.split("\n"),n={};return e=e.filter(t=>{let e=i.match(t,/^@(\w+)(.*)|^\s+\s+@(\w+)(.*)/);if(!e.length)return!0;n.pragma&&n.pragma.push({type:e[1]||e[3],value:i.clean(e[2]||e[4])||!0});n.pragma||(n.type=e[1]||e[3],n.name=i.clean(e[2]||e[4]),n.pragma=[])}),n.type=n.type||"",n.name=n.name||"",n.summary=e.join("\n").trim(),n},_computeInterpreter(t){let e=`_interpret${i.capitalize(t)}`;return i.isFunction(this[e])?e:void 0},_interpretAdapts(t,e){this._interpretDependency(t,e)},_interpretBehavior(t,e){this._interpretDependency(t,e)},_interpretDependency(t,e){let n=e.value.split(" ");e.value={name:i.trim(n[0]),url:i.trim(n[1]||"")},this._interpretPragma(t,e)},_interpretDevDependency(t,e){this._interpretDependency(t,e)},_interpretEntity(t,e){i.assertArgument(i.isObject(t),1,"Object"),i.assertArgument(i.isVoid(e)||i.isArray(e),2,"ArrayLike");let n=i.withdraw(t,"pragma");n&&n.forEach(e=>i.apply(this,this._computeInterpreter(e.type)||"_interpretPragma",[t,e])),e&&e.forEach(e=>i.apply(this,this._computeInterpreter(e.type)||"_interpretFeature",[t,e]))},_interpretExtends(t,e){this._interpretDependency(t,e)},_interpretFeature(t,e){i.assertArgument(i.isObject(t),1,"Object"),i.assertArgument(i.isObject(e),2,"Object");let n=(e.name||i.withdraw(e,"name"),i.withdraw(e,"pragma")),r=i.withdraw(e,"type"),s=this.plurals[r||""];r&&(n&&n.forEach(t=>i.apply(this,this._computeInterpreter(t.type)||"_interpretPragma",[e,t])),s?(t[s]=t[s]||[]).push(e):t[r]=e)},_interpretKeywords(t,e){e.value=i.split(e.value,",").map(t=>t.trim()),this._interpretPragma(t,e)},_interpretParam(t,e){let n=i.match(e.value,/\{(.+)\}\s+(\[.+\]|\w+\.\w+|\w+)\s*(.*)$/),r=i.split(i.trim(n[2],"[]"),"=",!0),s=i.split(i.trim(r[0]),".",!0);e.value={type:i.trim(n[1]),name:i.trim(s[s.length>1?1:0]),summary:i.trim(n[3]),optional:i.startsWith(n[2],"["),default:i.trim(r[1])},e.value.optional||delete e.value.optional,e.value.default||delete e.value.default,s.length>1&&(t=i.findLast(t.params||[],t=>t.name===s[0].trim())||{}),this._interpretPragma(t,e)},_interpretPragma(t,e){i.assertArgument(i.isObject(t),1,"Object"),i.assertArgument(i.isObject(e),2,"Object");let n=i.withdraw(e,"type"),r=this.plurals[n||""];r?(t[r]=t[r]||[],t[r].push(e.value)):t[n]=e.value},_interpretReturns(t,e){let n=e.value.match(/\{(.+)\}\s*(.*)$/)||[];e.value={type:i.trim(n[1]),summary:i.trim(n[2])},this._interpretPragma(t,e)},_mergeData(t,e){return i.assertArgument(i.isObject(t),1,"Object"),i.assertArgument(i.isArray(e),2,"Array"),e.reverse().forEach(e=>{this.inheritance.forEach(n=>e.data[n]&&e.data[n].forEach(e=>{if(Array.from(t[n]||[]).some(t=>t.name===e.name))return;t[n]=t[n]||[];t[n].push(Object.assign(e,{inherited:!0}))}))}),t},_sortData(t,e){return i.assertArgument(i.isObject(t),1,"Object"),e&&this.inherited?t:(this.inheritance.forEach(e=>t[e]&&t[e].sort((t,e)=>{if(!t.private&&e.private)return 1;if(t.private&&!e.private)return-1;if(t.name>e.name)return 1;if(t.name<e.name)return-1})),t)},data:{set(t){return i.isDefined(this.data)?this.data:t},then(t){return t&&this.emit("data",t)},validate(t){return!i.isNull(t)&&!i.isObject(t)&&"Object"}},empty:{get(){return!this.data}},entities:{frozen:!0,writable:!1,value:["behavior","class","element","function","module","object","stylesheet"]},error:{set(t){return i.isDefined(this.error)?this.error:t},then(t){return t&&this.emit("error",t)},validate(t){return!i.isNull(t)&&!i.isObject(t)&&"Object"}},host:{set(t){return this.host||t},validate(t){return!i.isString(t,!0)&&"string"}},inheritance:{frozen:!0,writable:!1,value:["attributes","events","methods","properties"]},inherited:{set(t){return i.isDefined(this.inherited)?this.inherited:!!t}},plurals:{frozen:!0,writable:!1,value:{attribute:"attributes",behavior:"behaviors",dependency:"dependencies",devDependency:"devDependencies",event:"events",method:"methods",param:"params",property:"properties"}},protocol:{set(t){return this.protocol||t},validate(t){return!i.isString(t,!0)&&"string"}},state:{set(t){return t},then(t){return"idle"!==t&&this.emit("state",t)},validate(t){return!i.isString(t,!0)&&"string"}},url:{set(t){return this.url||t},then(t){let e=i.parseURL(t);this.host=e.host,this.protocol=e.protocol},validate(t){return!i.isString(t,!0)&&"string"}},_handleData(e){let n=e?this.parse(e):null,r=null,s=[],o=0;if(n&&n.extends&&n.extends.url){let e=i.parseURL(n.extends.url);e.host=e.host||this.host,e.protocol=e.protocol||this.protocol,r=new t.exports({inherited:!0,url:i.toURL(e)}),r.on("data",()=>(o+=1)===s.length&&(this.data=this._sortData(this._mergeData(n,s),!0))),s.push(r)}n&&n.behaviors&&n.behaviors.forEach(e=>{if(!e.url)return;let a=i.parseURL(e.url);a.host=a.host||this.host;a.protocol=a.protocol||this.protocol;r=new t.exports({inherited:!0,url:i.toURL(a)});r.on("data",()=>(o+=1)===s.length&&(this.data=this._sortData(this._mergeData(n,s),!0)));s.push(r)}),s.length||(this.data=n&&this._sortData(n,!0))}})}).call(e,n(1))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){t.exports=n(0)},function(t,e){t.exports=XP},function(t,e){t.exports=XPEmitter},function(t,e){t.exports=XPRequest}]);