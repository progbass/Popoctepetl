!function(t,n,e,i){"function"==typeof define&&define.amd?define(function(){return i(t,n,e)}):"object"==typeof exports?module.exports=i:t.ssm=i(t,n,e)}(window,document,void 0,function(t,n,e){"use strict";var i=!1,r={},o=[],u=0,a=[],f=10,d=null,c=[],h=function(){return"function"==typeof t.matchMedia&&"undefined"!=typeof t.matchMedia("(width: 100px)").addListener?!0:!1}(),s=function(){clearTimeout(d),d=setTimeout(m,f)},m=function(){u=p(),l(u)},l=function(t){for(var n=o.length,e=c.length,i=[],u=[],f=[],d=[],h=!0,s=r,m=0;n>m;m++){h=!0,s.state=o[m],s.browserWidth=t;for(var l=0;e>l;l++)if("undefined"!=typeof s.state[c[l].name]&&(s.callback=c[l].test,s.callback()===!1)){h=!1;break}h?(d=d.concat(o[m].onFirstRun),o[m].onFirstRun=[],b(a,o[m])?u=u.concat(o[m].onResize):(a.push(o[m]),f=f.concat(o[m].onEnter))):b(a,o[m])&&(i=i.concat(o[m].onLeave),a=R(a,o[m]))}E(d),E(i),E(f),E(u)};r.browserResize=l,r.getBrowserWidth=function(){return u},r.addState=function(t){var n={id:v(),minWidth:0,maxWidth:999999,onEnter:[],onLeave:[],onResize:[],onFirstRun:[]};return t=g(n,t),"function"==typeof t.onEnter&&(t.onEnter=[t.onEnter]),"function"==typeof t.onLeave&&(t.onLeave=[t.onLeave]),"function"==typeof t.onResize&&(t.onResize=[t.onResize]),"function"==typeof t.onFirstRun&&(t.onFirstRun=[t.onFirstRun]),o.push(t),o=W(o,"minWidth"),this},r.updateState=function(t,n){for(var e=o.length-1;e>=0;e--)o[e].id===t&&(o[e]=g(o[e],n));return this},r.removeState=function(t){for(var n=o.length-1;n>=0;n--)o[n].id===t&&o.splice(n,1);return this},r.removeStates=function(t){for(var n=t.length-1;n>=0;n--)r.removeState(t[n]);return this},r.removeAllStates=function(){return o=a=[],this},r.addStates=function(t){for(var n=t.length-1;n>=0;n--)r.addState(t[n]);return this},r.getStates=function(t){var n=null,e=[];if("undefined"==typeof t)return o;n=t.length;for(var i=0;n>i;i++)e.push(y(t[i]));return e},r.addConfigOption=function(t){var n={name:"",test:null};t=g(n,t),""!==t.name&&null!==t.test&&c.push(t)},r.getConfigOption=function(t){if("string"!=typeof t)return c;for(var n=c.length-1;n>=0;n--)if(c[n].name===t)return c[n]},r.removeConfigOption=function(t){for(var n=c.length-1;n>=0;n--)c[n].name===t&&c.splice(n,1)},r.isActive=function(t){for(var n=0;n<a.length;n++)if(a[n].id===t)return!0;return!1},r.getCurrentStates=function(){return a},r.setResizeTimeout=function(t){f=t},r.getResizeTimeout=function(){return f},r.ready=function(){return u=p(),i===!1&&(t.attachEvent?t.attachEvent("onresize",s):t.addEventListener&&t.addEventListener("resize",s,!0),i=!0),l(u),this};var v=function(){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=0;10>e;e++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},p=function(){var e=0;return h?t.matchMedia("(width:"+t.innerWidth+"px)").matches?e=t.innerWidth:t.matchMedia("(width:"+t.outerWidth+"px)").matches?e=t.outerWidth:t.matchMedia("(width:"+n.body.clientWidth+"px)").matches&&(e=n.body.clientWidth):"number"==typeof n.body.clientWidth?e=n.body.clientWidth:"number"==typeof t.innerWidth?e=t.innerWidth:n.documentElement&&n.documentElement.clientWidth&&(e=n.documentElement.clientWidth),e},g=function(t,n){var e={};for(var i in t)e[i]=t[i];for(var r in n)e[r]=n[r];return e},W=function(t,n){return t.sort(function(t,e){var i=t[n],r=e[n];return r>i?-1:i>r?1:0})},y=function(t){for(var n=o.length-1;n>=0;n--)if(o[n].id===t)return o[n]},b=function(t,n){for(var e=0;e<t.length;e++)if(t[e]===n)return!0},R=function(t,n){for(var e=t.length,i=0;e>i;i++)t[i]===n&&t.splice(i,1);return t},E=function(t){for(var n=t.length,e=0;n>e;e++)t[e]()};return r.addConfigOption({name:"minWidth",test:function(){return"number"==typeof this.state.minWidth&&this.state.minWidth<=this.browserWidth?!0:!1}}),r.addConfigOption({name:"maxWidth",test:function(){return"number"==typeof this.state.maxWidth&&this.state.maxWidth>=this.browserWidth?!0:!1}}),r});