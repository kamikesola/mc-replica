(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="170",Ef=0,fl=1,Af=2,ru=1,Tf=2,On=3,oi=0,zt=1,tn=2,ni=0,rr=1,hl=2,dl=3,pl=4,su=5,Si=100,Rf=101,Cf=102,Pf=103,Lf=104,Df=200,au=201,If=202,Uf=203,Fs=204,Ba=205,Nf=206,Ff=207,Of=208,kf=209,zf=210,Hf=211,Gf=212,Vf=213,Bf=214,Wa=0,Xa=1,Ya=2,ur=3,qa=4,$a=5,Ka=6,Za=7,ou=0,Wf=1,Xf=2,ii=0,Yf=1,qf=2,$f=3,Kf=4,Zf=5,jf=6,Jf=7,lu=300,fr=301,hr=302,ja=303,Ja=304,Bs=306,Os=1e3,yi=1001,Qa=1002,Nt=1003,Qf=1004,Fr=1005,dn=1006,Qs=1007,Ei=1008,sn=1009,cu=1010,uu=1011,zr=1012,No=1013,Ri=1014,kn=1015,qr=1016,Fo=1017,Oo=1018,dr=1020,fu=35902,hu=1021,du=1022,kt=1023,pu=1024,mu=1025,sr=1026,pr=1027,_u=1028,ko=1029,gu=1030,zo=1031,Ho=1033,Ts=33776,Rs=33777,Cs=33778,Ps=33779,eo=35840,to=35841,no=35842,io=35843,ro=36196,so=37492,ao=37496,oo=37808,lo=37809,co=37810,uo=37811,fo=37812,ho=37813,po=37814,mo=37815,_o=37816,go=37817,vo=37818,xo=37819,Mo=37820,bo=37821,Ls=36492,So=36494,wo=36495,vu=36283,yo=36284,Eo=36285,Ao=36286,eh=3200,th=3201,nh=0,ih=1,Qn="",en="srgb",Ii="srgb-linear",Ws="linear",it="srgb",Fi=7680,ml=519,rh=512,sh=513,ah=514,xu=515,oh=516,lh=517,ch=518,uh=519,_l=35044,gl="300 es",zn=2e3,ks=2001;class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ea=Math.PI/180,To=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]).toLowerCase()}function Wt(n,e,t){return Math.max(e,Math.min(t,n))}function fh(n,e){return(n%e+e)%e}function ta(n,e,t){return(1-t)*n+t*e}function Er(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,t=0){rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,i,r,s,a,o,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],_=i[8],g=r[0],m=r[3],d=r[6],y=r[1],b=r[4],x=r[7],R=r[2],E=r[5],T=r[8];return s[0]=a*g+o*y+l*R,s[3]=a*m+o*b+l*E,s[6]=a*d+o*x+l*T,s[1]=c*g+u*y+f*R,s[4]=c*m+u*b+f*E,s[7]=c*d+u*x+f*T,s[2]=h*g+p*y+_*R,s[5]=h*m+p*b+_*E,s[8]=h*d+p*x+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,p=c*s-a*l,_=t*f+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*c-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=h*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new ze;function Mu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function hh(){const n=zs("canvas");return n.style.display="block",n}const vl={};function Or(n){n in vl||(vl[n]=!0,console.warn(n))}function dh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function ph(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function mh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===it&&(n.r=Hn(n.r),n.g=Hn(n.g),n.b=Hn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===it&&(n.r=ar(n.r),n.g=ar(n.g),n.b=ar(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Qn?Ws:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Hn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const xl=[.64,.33,.3,.6,.15,.06],Ml=[.2126,.7152,.0722],bl=[.3127,.329],Sl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[Ii]:{primaries:xl,whitePoint:bl,transfer:Ws,toXYZ:Sl,fromXYZ:wl,luminanceCoefficients:Ml,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:xl,whitePoint:bl,transfer:it,toXYZ:Sl,fromXYZ:wl,luminanceCoefficients:Ml,outputColorSpaceConfig:{drawingBufferColorSpace:en}}});let Oi;class _h{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Oi===void 0&&(Oi=zs("canvas")),Oi.width=e.width,Oi.height=e.height;const i=Oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Oi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hn(t[i]/255)*255):t[i]=Hn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gh=0;class bu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=$r(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ia(r[a].image)):s.push(ia(r[a]))}else s=ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?_h.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vh=0;class Ht extends Ui{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,i=yi,r=yi,s=dn,a=Ei,o=kt,l=sn,c=Ht.DEFAULT_ANISOTROPY,u=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=$r(),this.name="",this.source=new bu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case Qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case Qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=lu;Ht.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,i=0,r=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],_=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,x=(p+1)/2,R=(d+1)/2,E=(u+h)/4,T=(f+g)/4,P=(_+m)/4;return b>x&&b>R?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=E/i,s=T/i):x>R?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=T/s,r=P/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(f-g)*(f-g)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(f-g)/y,this.z=(h-u)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xh extends Ui{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Ht(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends xh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Go extends Ht{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mh extends Ht{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[a+0],p=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(f!==g||l!==h||c!==p||u!==_){let m=1-o;const d=l*h+c*p+u*_+f*g,y=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const R=Math.sqrt(b),E=Math.atan2(R,d*y);m=Math.sin(m*E)/R,o=Math.sin(o*E)/R}const x=o*y;if(l=l*m+h*x,c=c*m+p*x,u=u*m+_*x,f=f*m+g*x,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+u*f+l*p-c*h,e[t+1]=l*_+u*h+c*f-o*p,e[t+2]=c*_+u*p+o*h-l*f,e[t+3]=u*_-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"YZX":this._x=h*u*f+c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f-h*p*_;break;case"XZY":this._x=h*u*f-c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new F,yl=new Pi;class xr{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ar),es.subVectors(this.max,Ar),ki.subVectors(e.a,Ar),zi.subVectors(e.b,Ar),Hi.subVectors(e.c,Ar),Xn.subVectors(zi,ki),Yn.subVectors(Hi,zi),fi.subVectors(ki,Hi);let t=[0,-Xn.z,Xn.y,0,-Yn.z,Yn.y,0,-fi.z,fi.y,Xn.z,0,-Xn.x,Yn.z,0,-Yn.x,fi.z,0,-fi.x,-Xn.y,Xn.x,0,-Yn.y,Yn.x,0,-fi.y,fi.x,0];return!sa(t,ki,zi,Hi,es)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,ki,zi,Hi,es))?!1:(ts.crossVectors(Xn,Yn),t=[ts.x,ts.y,ts.z],sa(t,ki,zi,Hi,es))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ln=[new F,new F,new F,new F,new F,new F,new F,new F],ln=new F,Qr=new xr,ki=new F,zi=new F,Hi=new F,Xn=new F,Yn=new F,fi=new F,Ar=new F,es=new F,ts=new F,hi=new F;function sa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){hi.fromArray(n,s);const o=r.x*Math.abs(hi.x)+r.y*Math.abs(hi.y)+r.z*Math.abs(hi.z),l=e.dot(hi),c=t.dot(hi),u=i.dot(hi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const bh=new xr,Tr=new F,aa=new F;class Xs{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):bh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Tr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(aa)),this.expandByPoint(Tr.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Dn=new F,oa=new F,ns=new F,qn=new F,la=new F,is=new F,ca=new F;class Sh{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){oa.copy(e).add(t).multiplyScalar(.5),ns.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(oa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ns),o=qn.dot(this.direction),l=-qn.dot(ns),c=qn.lengthSq(),u=Math.abs(1-a*a);let f,h,p,_;if(u>0)if(f=a*l-o,h=a*o-l,_=s*u,f>=0)if(h>=-_)if(h<=_){const g=1/u;f*=g,h*=g,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(oa).addScaledVector(ns,h),p}intersectSphere(e,t){Dn.subVectors(e.center,this.origin);const i=Dn.dot(this.direction),r=Dn.dot(Dn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,i,r,s){la.subVectors(t,e),is.subVectors(i,e),ca.crossVectors(la,is);let a=this.direction.dot(ca),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qn.subVectors(this.origin,e);const l=o*this.direction.dot(is.crossVectors(qn,is));if(l<0)return null;const c=o*this.direction.dot(la.cross(qn));if(c<0||l+c>a)return null;const u=-o*qn.dot(ca);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt{constructor(e,t,i,r,s,a,o,l,c,u,f,h,p,_,g,m){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,p,_,g,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,p,_,g,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),s=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*f,_=o*u,g=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+_*c,t[5]=h-g*c,t[9]=-o*l,t[2]=g-h*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,_=c*u,g=c*f;t[0]=h+g*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=g+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,_=c*u,g=c*f;t[0]=h-g*o,t[4]=-a*f,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=g-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,_=o*u,g=o*f;t[0]=l*u,t[4]=_*c-p,t[8]=h*c+g,t[1]=l*f,t[5]=g*c+h,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-h*f,t[8]=_*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+_,t[10]=h-g*f}else if(e.order==="XZY"){const h=a*l,p=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+g,t[5]=a*u,t[9]=p*f-_,t[2]=_*f-p,t[6]=o*u,t[10]=g*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wh,e,yh)}lookAt(e,t,i){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),$n.crossVectors(i,$t),$n.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),$n.crossVectors(i,$t)),$n.normalize(),rs.crossVectors($t,$n),r[0]=$n.x,r[4]=rs.x,r[8]=$t.x,r[1]=$n.y,r[5]=rs.y,r[9]=$t.y,r[2]=$n.z,r[6]=rs.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],_=i[2],g=i[6],m=i[10],d=i[14],y=i[3],b=i[7],x=i[11],R=i[15],E=r[0],T=r[4],P=r[8],w=r[12],M=r[1],C=r[5],H=r[9],N=r[13],W=r[2],K=r[6],z=r[10],Q=r[14],G=r[3],le=r[7],de=r[11],ue=r[15];return s[0]=a*E+o*M+l*W+c*G,s[4]=a*T+o*C+l*K+c*le,s[8]=a*P+o*H+l*z+c*de,s[12]=a*w+o*N+l*Q+c*ue,s[1]=u*E+f*M+h*W+p*G,s[5]=u*T+f*C+h*K+p*le,s[9]=u*P+f*H+h*z+p*de,s[13]=u*w+f*N+h*Q+p*ue,s[2]=_*E+g*M+m*W+d*G,s[6]=_*T+g*C+m*K+d*le,s[10]=_*P+g*H+m*z+d*de,s[14]=_*w+g*N+m*Q+d*ue,s[3]=y*E+b*M+x*W+R*G,s[7]=y*T+b*C+x*K+R*le,s[11]=y*P+b*H+x*z+R*de,s[15]=y*w+b*N+x*Q+R*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],_=e[3],g=e[7],m=e[11],d=e[15];return _*(+s*l*f-r*c*f-s*o*h+i*c*h+r*o*p-i*l*p)+g*(+t*l*p-t*c*h+s*a*h-r*a*p+r*c*u-s*l*u)+m*(+t*c*f-t*o*p-s*a*f+i*a*p+s*o*u-i*c*u)+d*(-r*o*u-t*l*f+t*o*h+r*a*f-i*a*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],_=e[12],g=e[13],m=e[14],d=e[15],y=f*m*c-g*h*c+g*l*p-o*m*p-f*l*d+o*h*d,b=_*h*c-u*m*c-_*l*p+a*m*p+u*l*d-a*h*d,x=u*g*c-_*f*c+_*o*p-a*g*p-u*o*d+a*f*d,R=_*f*l-u*g*l-_*o*h+a*g*h+u*o*m-a*f*m,E=t*y+i*b+r*x+s*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=y*T,e[1]=(g*h*s-f*m*s-g*r*p+i*m*p+f*r*d-i*h*d)*T,e[2]=(o*m*s-g*l*s+g*r*c-i*m*c-o*r*d+i*l*d)*T,e[3]=(f*l*s-o*h*s-f*r*c+i*h*c+o*r*p-i*l*p)*T,e[4]=b*T,e[5]=(u*m*s-_*h*s+_*r*p-t*m*p-u*r*d+t*h*d)*T,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*d-t*l*d)*T,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*p+t*l*p)*T,e[8]=x*T,e[9]=(_*f*s-u*g*s-_*i*p+t*g*p+u*i*d-t*f*d)*T,e[10]=(a*g*s-_*o*s+_*i*c-t*g*c-a*i*d+t*o*d)*T,e[11]=(u*o*s-a*f*s-u*i*c+t*f*c+a*i*p-t*o*p)*T,e[12]=R*T,e[13]=(u*g*r-_*f*r+_*i*h-t*g*h-u*i*m+t*f*m)*T,e[14]=(_*o*r-a*g*r-_*i*l+t*g*l+a*i*m-t*o*m)*T,e[15]=(a*f*r-u*o*r+u*i*l-t*f*l-a*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,p=s*u,_=s*f,g=a*u,m=a*f,d=o*f,y=l*c,b=l*u,x=l*f,R=i.x,E=i.y,T=i.z;return r[0]=(1-(g+d))*R,r[1]=(p+x)*R,r[2]=(_-b)*R,r[3]=0,r[4]=(p-x)*E,r[5]=(1-(h+d))*E,r[6]=(m+y)*E,r[7]=0,r[8]=(_+b)*T,r[9]=(m-y)*T,r[10]=(1-(h+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Gi.set(r[0],r[1],r[2]).length();const a=Gi.set(r[4],r[5],r[6]).length(),o=Gi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],cn.copy(this);const c=1/s,u=1/a,f=1/o;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=f,cn.elements[9]*=f,cn.elements[10]*=f,t.setFromRotationMatrix(cn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=zn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let p,_;if(o===zn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ks)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=zn){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(a-s),h=(t+e)*c,p=(i+r)*u;let _,g;if(o===zn)_=(a+s)*f,g=-2*f;else if(o===ks)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Gi=new F,cn=new bt,wh=new F(0,0,0),yh=new F(1,1,1),$n=new F,rs=new F,$t=new F,El=new bt,Al=new Pi;class mn{constructor(e=0,t=0,i=0,r=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Wt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Al.setFromEuler(this),this.setFromQuaternion(Al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class Su{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Eh=0;const Tl=new F,Vi=new Pi,In=new bt,ss=new F,Rr=new F,Ah=new F,Th=new Pi,Rl=new F(1,0,0),Cl=new F(0,1,0),Pl=new F(0,0,1),Ll={type:"added"},Rh={type:"removed"},Bi={type:"childadded",child:null},ua={type:"childremoved",child:null};class Yt extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new F,t=new mn,i=new Pi,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new ze}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Su,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Rl,e)}rotateY(e){return this.rotateOnAxis(Cl,e)}rotateZ(e){return this.rotateOnAxis(Pl,e)}translateOnAxis(e,t){return Tl.copy(e).applyQuaternion(this.quaternion),this.position.add(Tl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rl,e)}translateY(e){return this.translateOnAxis(Cl,e)}translateZ(e){return this.translateOnAxis(Pl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ss.copy(e):ss.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Rr,ss,this.up):In.lookAt(ss,Rr,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(In),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ll),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rh),ua.child=e,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ll),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,e,Ah),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,Th,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Yt.DEFAULT_UP=new F(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new F,Un=new F,fa=new F,Nn=new F,Wi=new F,Xi=new F,Dl=new F,ha=new F,da=new F,pa=new F,ma=new vt,_a=new vt,ga=new vt;class fn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),un.subVectors(e,t),r.cross(un);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){un.subVectors(r,t),Un.subVectors(i,t),fa.subVectors(e,t);const a=un.dot(un),o=un.dot(Un),l=un.dot(fa),c=Un.dot(Un),u=Un.dot(fa),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Nn.x),l.addScaledVector(a,Nn.y),l.addScaledVector(o,Nn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ma.setScalar(0),_a.setScalar(0),ga.setScalar(0),ma.fromBufferAttribute(e,t),_a.fromBufferAttribute(e,i),ga.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ma,s.x),a.addScaledVector(_a,s.y),a.addScaledVector(ga,s.z),a}static isFrontFacing(e,t,i,r){return un.subVectors(i,t),Un.subVectors(e,t),un.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),un.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return fn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Wi.subVectors(r,i),Xi.subVectors(s,i),ha.subVectors(e,i);const l=Wi.dot(ha),c=Xi.dot(ha);if(l<=0&&c<=0)return t.copy(i);da.subVectors(e,r);const u=Wi.dot(da),f=Xi.dot(da);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Wi,a);pa.subVectors(e,s);const p=Wi.dot(pa),_=Xi.dot(pa);if(_>=0&&p<=_)return t.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Xi,o);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return Dl.subVectors(s,r),o=(f-u)/(f-u+(p-_)),t.copy(r).addScaledVector(Dl,o);const d=1/(m+g+h);return a=g*d,o=h*d,t.copy(i).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},as={h:0,s:0,l:0};function va(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=fh(e,1),t=Wt(t,0,1),i=Wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=va(a,s,e+1/3),this.g=va(a,s,e),this.b=va(a,s,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,t=en){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const i=wu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return qe.fromWorkingColorSpace(It.copy(this),e),Math.round(Wt(It.r*255,0,255))*65536+Math.round(Wt(It.g*255,0,255))*256+Math.round(Wt(It.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=en){qe.fromWorkingColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==en?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(as);const i=ta(Kn.h,as.h,t),r=ta(Kn.s,as.s,t),s=ta(Kn.l,as.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Je;Je.NAMES=wu;let Ch=0;class Ys extends Ui{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=$r(),this.name="",this.blending=rr,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fs,this.blendDst=Ba,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ml,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fs&&(i.blendSrc=this.blendSrc),this.blendDst!==Ba&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ur&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ml&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hr extends Ys{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new F,os=new rt;class Rt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=_l,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)os.fromBufferAttribute(this,t),os.applyMatrix3(e),this.setXY(t,os.x,os.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Er(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Er(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Er(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Er(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_l&&(e.usage=this.usage),e}}class yu extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Eu extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class An extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ph=0;const Qt=new bt,xa=new Yt,Yi=new F,Kt=new xr,Cr=new xr,Et=new F;class _n extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mu(e)?Eu:yu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new An(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Kt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Kt.min,Cr.min),Kt.expandByPoint(Et),Et.addVectors(Kt.max,Cr.max),Kt.expandByPoint(Et)):(Kt.expandByPoint(Cr.min),Kt.expandByPoint(Cr.max))}Kt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Et.fromBufferAttribute(o,c),l&&(Yi.fromBufferAttribute(e,c),Et.add(Yi)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new F,l[P]=new F;const c=new F,u=new F,f=new F,h=new rt,p=new rt,_=new rt,g=new F,m=new F;function d(P,w,M){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,w),f.fromBufferAttribute(i,M),h.fromBufferAttribute(s,P),p.fromBufferAttribute(s,w),_.fromBufferAttribute(s,M),u.sub(c),f.sub(c),p.sub(h),_.sub(h);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(C),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(C),o[P].add(g),o[w].add(g),o[M].add(g),l[P].add(m),l[w].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,w=y.length;P<w;++P){const M=y[P],C=M.start,H=M.count;for(let N=C,W=C+H;N<W;N+=3)d(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const b=new F,x=new F,R=new F,E=new F;function T(P){R.fromBufferAttribute(r,P),E.copy(R);const w=o[P];b.copy(w),b.sub(R.multiplyScalar(R.dot(w))).normalize(),x.crossVectors(E,w);const C=x.dot(l[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,C)}for(let P=0,w=y.length;P<w;++P){const M=y[P],C=M.start,H=M.count;for(let N=C,W=C+H;N<W;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,u=new F,f=new F;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)h[_++]=c[p++]}return new Rt(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _n,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Il=new bt,di=new Sh,ls=new Xs,Ul=new F,cs=new F,us=new F,fs=new F,Ma=new F,hs=new F,Nl=new F,ds=new F;class Ct extends Yt{constructor(e=new _n,t=new Hr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){hs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Ma.fromBufferAttribute(f,e),a?hs.addScaledVector(Ma,u):hs.addScaledVector(Ma.sub(t),u))}t.add(hs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ls.copy(i.boundingSphere),ls.applyMatrix4(s),di.copy(e.ray).recast(e.near),!(ls.containsPoint(di.origin)===!1&&(di.intersectSphere(ls,Ul)===null||di.origin.distanceToSquared(Ul)>(e.far-e.near)**2))&&(Il.copy(s).invert(),di.copy(e.ray).applyMatrix4(Il),!(i.boundingBox!==null&&di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const m=h[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,R=b;x<R;x+=3){const E=o.getX(x),T=o.getX(x+1),P=o.getX(x+2);r=ps(this,d,e,i,c,u,f,E,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const y=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);r=ps(this,a,e,i,c,u,f,y,b,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const m=h[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,R=b;x<R;x+=3){const E=x,T=x+1,P=x+2;r=ps(this,d,e,i,c,u,f,E,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const y=m,b=m+1,x=m+2;r=ps(this,a,e,i,c,u,f,y,b,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Lh(n,e,t,i,r,s,a,o){let l;if(e.side===zt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===oi,o),l===null)return null;ds.copy(o),ds.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ds);return c<t.near||c>t.far?null:{distance:c,point:ds.clone(),object:n}}function ps(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,cs),n.getVertexPosition(l,us),n.getVertexPosition(c,fs);const u=Lh(n,e,t,i,cs,us,fs,Nl);if(u){const f=new F;fn.getBarycoord(Nl,cs,us,fs,f),r&&(u.uv=fn.getInterpolatedAttribute(r,o,l,c,f,new rt)),s&&(u.uv1=fn.getInterpolatedAttribute(s,o,l,c,f,new rt)),a&&(u.normal=fn.getInterpolatedAttribute(a,o,l,c,f,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new F,materialIndex:0};fn.getNormal(cs,us,fs,h.normal),u.face=h,u.barycoord=f}return u}class Mr extends _n{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new An(c,3)),this.setAttribute("normal",new An(u,3)),this.setAttribute("uv",new An(f,2));function _(g,m,d,y,b,x,R,E,T,P,w){const M=x/T,C=R/P,H=x/2,N=R/2,W=E/2,K=T+1,z=P+1;let Q=0,G=0;const le=new F;for(let de=0;de<z;de++){const ue=de*C-N;for(let ce=0;ce<K;ce++){const Le=ce*M-H;le[g]=Le*y,le[m]=ue*b,le[d]=W,c.push(le.x,le.y,le.z),le[g]=0,le[m]=0,le[d]=E>0?1:-1,u.push(le.x,le.y,le.z),f.push(ce/T),f.push(1-de/P),Q+=1}}for(let de=0;de<P;de++)for(let ue=0;ue<T;ue++){const ce=h+ue+K*de,Le=h+ue+K*(de+1),Y=h+(ue+1)+K*(de+1),$=h+(ue+1)+K*de;l.push(ce,Le,$),l.push(Le,Y,$),G+=6}o.addGroup(p,G,w),p+=G,h+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=mr(n[t]);for(const r in i)e[r]=i[r]}return e}function Dh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Au(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Tu={clone:mr,merge:Ot};var Ih=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends Ys{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ih,this.fragmentShader=Uh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=Dh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ru extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new F,Fl=new rt,Ol=new rt;class Zt extends Ru{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=To*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ea*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return To*2*Math.atan(Math.tan(ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z)}getViewSize(e,t){return this.getViewBounds(e,Fl,Ol),t.subVectors(Ol,Fl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ea*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,$i=1;class Nh extends Yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Zt(qi,$i,e,t);r.layers=this.layers,this.add(r);const s=new Zt(qi,$i,e,t);s.layers=this.layers,this.add(s);const a=new Zt(qi,$i,e,t);a.layers=this.layers,this.add(a);const o=new Zt(qi,$i,e,t);o.layers=this.layers,this.add(o);const l=new Zt(qi,$i,e,t);l.layers=this.layers,this.add(l);const c=new Zt(qi,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Cu extends Ht{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:fr,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fh extends Ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Mr(5,5,5),s=new Tn({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:ni});s.uniforms.tEquirect.value=t;const a=new Ct(r,s),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=dn),new Nh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const ba=new F,Oh=new F,kh=new ze;class Mi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ba.subVectors(i,t).cross(Oh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ba),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||kh.getNormalMatrix(e),r=this.coplanarPoint(ba).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Xs,ms=new F;class Pu{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],_=r[9],g=r[10],m=r[11],d=r[12],y=r[13],b=r[14],x=r[15];if(i[0].setComponents(l-s,h-c,m-p,x-d).normalize(),i[1].setComponents(l+s,h+c,m+p,x+d).normalize(),i[2].setComponents(l+a,h+u,m+_,x+y).normalize(),i[3].setComponents(l-a,h-u,m-_,x-y).normalize(),i[4].setComponents(l-o,h-f,m-g,x-b).normalize(),t===zn)i[5].setComponents(l+o,h+f,m+g,x+b).normalize();else if(t===ks)i[5].setComponents(o,f,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ms.x=r.normal.x>0?e.max.x:e.min.x,ms.y=r.normal.y>0?e.max.y:e.min.y,ms.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ms)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function zh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){const _=f[h],g=f[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,f[h]=g)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){const g=f[p];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class _r extends _n{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,p=[],_=[],g=[],m=[];for(let d=0;d<u;d++){const y=d*h-a;for(let b=0;b<c;b++){const x=b*f-s;_.push(x,-y,0),g.push(0,0,1),m.push(b/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const b=y+c*d,x=y+c*(d+1),R=y+1+c*(d+1),E=y+1+c*d;p.push(b,x,E),p.push(x,R,E)}this.setIndex(p),this.setAttribute("position",new An(_,3)),this.setAttribute("normal",new An(g,3)),this.setAttribute("uv",new An(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.widthSegments,e.heightSegments)}}var Hh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$h=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ed=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",gd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Dd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ud=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$d=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Kd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,up=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ap=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ip=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Up=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$p=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,am=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,om=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,um=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Hh,alphahash_pars_fragment:Gh,alphamap_fragment:Vh,alphamap_pars_fragment:Bh,alphatest_fragment:Wh,alphatest_pars_fragment:Xh,aomap_fragment:Yh,aomap_pars_fragment:qh,batching_pars_vertex:$h,batching_vertex:Kh,begin_vertex:Zh,beginnormal_vertex:jh,bsdfs:Jh,iridescence_fragment:Qh,bumpmap_pars_fragment:ed,clipping_planes_fragment:td,clipping_planes_pars_fragment:nd,clipping_planes_pars_vertex:id,clipping_planes_vertex:rd,color_fragment:sd,color_pars_fragment:ad,color_pars_vertex:od,color_vertex:ld,common:cd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:fd,displacementmap_pars_vertex:hd,displacementmap_vertex:dd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:_d,colorspace_pars_fragment:gd,envmap_fragment:vd,envmap_common_pars_fragment:xd,envmap_pars_fragment:Md,envmap_pars_vertex:bd,envmap_physical_pars_fragment:Dd,envmap_vertex:Sd,fog_vertex:wd,fog_pars_vertex:yd,fog_fragment:Ed,fog_pars_fragment:Ad,gradientmap_pars_fragment:Td,lightmap_pars_fragment:Rd,lights_lambert_fragment:Cd,lights_lambert_pars_fragment:Pd,lights_pars_begin:Ld,lights_toon_fragment:Id,lights_toon_pars_fragment:Ud,lights_phong_fragment:Nd,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:kd,lights_fragment_begin:zd,lights_fragment_maps:Hd,lights_fragment_end:Gd,logdepthbuf_fragment:Vd,logdepthbuf_pars_fragment:Bd,logdepthbuf_pars_vertex:Wd,logdepthbuf_vertex:Xd,map_fragment:Yd,map_pars_fragment:qd,map_particle_fragment:$d,map_particle_pars_fragment:Kd,metalnessmap_fragment:Zd,metalnessmap_pars_fragment:jd,morphinstance_vertex:Jd,morphcolor_vertex:Qd,morphnormal_vertex:ep,morphtarget_pars_vertex:tp,morphtarget_vertex:np,normal_fragment_begin:ip,normal_fragment_maps:rp,normal_pars_fragment:sp,normal_pars_vertex:ap,normal_vertex:op,normalmap_pars_fragment:lp,clearcoat_normal_fragment_begin:cp,clearcoat_normal_fragment_maps:up,clearcoat_pars_fragment:fp,iridescence_pars_fragment:hp,opaque_fragment:dp,packing:pp,premultiplied_alpha_fragment:mp,project_vertex:_p,dithering_fragment:gp,dithering_pars_fragment:vp,roughnessmap_fragment:xp,roughnessmap_pars_fragment:Mp,shadowmap_pars_fragment:bp,shadowmap_pars_vertex:Sp,shadowmap_vertex:wp,shadowmask_pars_fragment:yp,skinbase_vertex:Ep,skinning_pars_vertex:Ap,skinning_vertex:Tp,skinnormal_vertex:Rp,specularmap_fragment:Cp,specularmap_pars_fragment:Pp,tonemapping_fragment:Lp,tonemapping_pars_fragment:Dp,transmission_fragment:Ip,transmission_pars_fragment:Up,uv_pars_fragment:Np,uv_pars_vertex:Fp,uv_vertex:Op,worldpos_vertex:kp,background_vert:zp,background_frag:Hp,backgroundCube_vert:Gp,backgroundCube_frag:Vp,cube_vert:Bp,cube_frag:Wp,depth_vert:Xp,depth_frag:Yp,distanceRGBA_vert:qp,distanceRGBA_frag:$p,equirect_vert:Kp,equirect_frag:Zp,linedashed_vert:jp,linedashed_frag:Jp,meshbasic_vert:Qp,meshbasic_frag:em,meshlambert_vert:tm,meshlambert_frag:nm,meshmatcap_vert:im,meshmatcap_frag:rm,meshnormal_vert:sm,meshnormal_frag:am,meshphong_vert:om,meshphong_frag:lm,meshphysical_vert:cm,meshphysical_frag:um,meshtoon_vert:fm,meshtoon_frag:hm,points_vert:dm,points_frag:pm,shadow_vert:mm,shadow_frag:_m,sprite_vert:gm,sprite_frag:vm},fe={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},wn={basic:{uniforms:Ot([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ot([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ot([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ot([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ot([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ot([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ot([fe.points,fe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ot([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ot([fe.common,fe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ot([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ot([fe.sprite,fe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Ot([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Ot([fe.lights,fe.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};wn.physical={uniforms:Ot([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const _s={r:0,b:0,g:0},mi=new mn,xm=new bt;function Mm(n,e,t,i,r,s,a){const o=new Je(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function _(y){let b=y.isScene===!0?y.background:null;return b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b}function g(y){let b=!1;const x=_(y);x===null?d(o,l):x&&x.isColor&&(d(x,1),b=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,b){const x=_(b);x&&(x.isCubeTexture||x.mapping===Bs)?(u===void 0&&(u=new Ct(new Mr(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:mr(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),mi.copy(b.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(xm.makeRotationFromEuler(mi)),u.material.toneMapped=qe.getTransfer(x.colorSpace)!==it,(f!==x||h!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=x,h=x.version,p=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ct(new _r(2,2),new Tn({name:"BackgroundMaterial",uniforms:mr(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=qe.getTransfer(x.colorSpace)!==it,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,p=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,b){y.getRGB(_s,Au(n)),i.buffers.color.setClear(_s.r,_s.g,_s.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),l=b,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(o,l)},render:g,addToRenderList:m}}function bm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(M,C,H,N,W){let K=!1;const z=f(N,H,C);s!==z&&(s=z,c(s.object)),K=p(M,N,H,W),K&&_(M,N,H,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(M,C,H,N),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function f(M,C,H){const N=H.wireframe===!0;let W=i[M.id];W===void 0&&(W={},i[M.id]=W);let K=W[C.id];K===void 0&&(K={},W[C.id]=K);let z=K[N];return z===void 0&&(z=h(l()),K[N]=z),z}function h(M){const C=[],H=[],N=[];for(let W=0;W<t;W++)C[W]=0,H[W]=0,N[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:N,object:M,attributes:{},index:null}}function p(M,C,H,N){const W=s.attributes,K=C.attributes;let z=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){const de=W[G];let ue=K[G];if(ue===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor)),de===void 0||de.attribute!==ue||ue&&de.data!==ue.data)return!0;z++}return s.attributesNum!==z||s.index!==N}function _(M,C,H,N){const W={},K=C.attributes;let z=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){let de=K[G];de===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(de=M.instanceColor));const ue={};ue.attribute=de,de&&de.data&&(ue.data=de.data),W[G]=ue,z++}s.attributes=W,s.attributesNum=z,s.index=N}function g(){const M=s.newAttributes;for(let C=0,H=M.length;C<H;C++)M[C]=0}function m(M){d(M,0)}function d(M,C){const H=s.newAttributes,N=s.enabledAttributes,W=s.attributeDivisors;H[M]=1,N[M]===0&&(n.enableVertexAttribArray(M),N[M]=1),W[M]!==C&&(n.vertexAttribDivisor(M,C),W[M]=C)}function y(){const M=s.newAttributes,C=s.enabledAttributes;for(let H=0,N=C.length;H<N;H++)C[H]!==M[H]&&(n.disableVertexAttribArray(H),C[H]=0)}function b(M,C,H,N,W,K,z){z===!0?n.vertexAttribIPointer(M,C,H,W,K):n.vertexAttribPointer(M,C,H,N,W,K)}function x(M,C,H,N){g();const W=N.attributes,K=H.getAttributes(),z=C.defaultAttributeValues;for(const Q in K){const G=K[Q];if(G.location>=0){let le=W[Q];if(le===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),le!==void 0){const de=le.normalized,ue=le.itemSize,ce=e.get(le);if(ce===void 0)continue;const Le=ce.buffer,Y=ce.type,$=ce.bytesPerElement,he=Y===n.INT||Y===n.UNSIGNED_INT||le.gpuType===No;if(le.isInterleavedBufferAttribute){const se=le.data,Me=se.stride,Ne=le.offset;if(se.isInstancedInterleavedBuffer){for(let Ve=0;Ve<G.locationSize;Ve++)d(G.location+Ve,se.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ve=0;Ve<G.locationSize;Ve++)m(G.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let Ve=0;Ve<G.locationSize;Ve++)b(G.location+Ve,ue/G.locationSize,Y,de,Me*$,(Ne+ue/G.locationSize*Ve)*$,he)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<G.locationSize;se++)d(G.location+se,le.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<G.locationSize;se++)m(G.location+se);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let se=0;se<G.locationSize;se++)b(G.location+se,ue/G.locationSize,Y,de,ue*$,ue/G.locationSize*se*$,he)}}else if(z!==void 0){const de=z[Q];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(G.location,de);break;case 3:n.vertexAttrib3fv(G.location,de);break;case 4:n.vertexAttrib4fv(G.location,de);break;default:n.vertexAttrib1fv(G.location,de)}}}}y()}function R(){P();for(const M in i){const C=i[M];for(const H in C){const N=C[H];for(const W in N)u(N[W].object),delete N[W];delete C[H]}delete i[M]}}function E(M){if(i[M.id]===void 0)return;const C=i[M.id];for(const H in C){const N=C[H];for(const W in N)u(N[W].object),delete N[W];delete C[H]}delete i[M.id]}function T(M){for(const C in i){const H=i[C];if(H[M.id]===void 0)continue;const N=H[M.id];for(const W in N)u(N[W].object),delete N[W];delete H[M.id]}}function P(){w(),a=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function Sm(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let _=0;_<f;_++)p+=u[_];t.update(p,i,1)}function l(c,u,f,h){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)a(c[_],u[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g]*h[g];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function wm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==kt&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const P=T===qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==sn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==kn&&!P)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:R,maxSamples:E}}function ym(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Mi,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,b=y*4;let x=d.clippingState||null;l.value=x,x=u(_,h,b,p);for(let R=0;R!==b;++R)x[R]=t[R];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,_){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const d=p+g*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,x=p;b!==g;++b,x+=4)a.copy(f[b]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Em(n){let e=new WeakMap;function t(a,o){return o===ja?a.mapping=fr:o===Ja&&(a.mapping=hr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ja||o===Ja)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Fh(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Am extends Ru{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const tr=4,kl=[.125,.215,.35,.446,.526,.582],wi=20,Sa=new Am,zl=new Je;let wa=null,ya=0,Ea=0,Aa=!1;const bi=(1+Math.sqrt(5))/2,Ki=1/bi,Hl=[new F(-bi,Ki,0),new F(bi,Ki,0),new F(-Ki,0,bi),new F(Ki,0,bi),new F(0,bi,-Ki),new F(0,bi,Ki),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Gl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){wa=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wa,ya,Ea),this._renderer.xr.enabled=Aa,e.scissorTest=!1,gs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wa=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:qr,format:kt,colorSpace:Ii,depthBuffer:!1},r=Vl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tm(s)),this._blurMaterial=Rm(s,e,t)}return r}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Sa)}_sceneToCubeUV(e,t,i,r){const o=new Zt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(zl),u.toneMapping=ii,u.autoClear=!1;const p=new Hr({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),_=new Ct(new Mr,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(zl),g=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):y===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const b=this._cubeSize;gs(r,y*b,d>2?b:0,b,b),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===fr||e.mapping===hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;gs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Sa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Hl[(r-s-1)%Hl.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Ct(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*wi-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):wi;m>wi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const d=[];let y=0;for(let T=0;T<wi;++T){const P=T/g,w=Math.exp(-P*P/2);d.push(w),T===0?y+=w:T<m&&(y+=2*w)}for(let T=0;T<d.length;T++)d[T]=d[T]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=_,h.mipInt.value=b-i;const x=this._sizeLods[r],R=3*x*(r>b-tr?r-b+tr:0),E=4*(this._cubeSize-x);gs(t,R,E,3*x,2*x),l.setRenderTarget(t),l.render(f,Sa)}}function Tm(n){const e=[],t=[],i=[];let r=n;const s=n-tr+1+kl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-tr?l=kl[a-n+tr-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,g=3,m=2,d=1,y=new Float32Array(g*_*p),b=new Float32Array(m*_*p),x=new Float32Array(d*_*p);for(let E=0;E<p;E++){const T=E%3*2/3-1,P=E>2?0:-1,w=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set(w,g*_*E),b.set(h,m*_*E);const M=[E,E,E,E,E,E];x.set(M,d*_*E)}const R=new _n;R.setAttribute("position",new Rt(y,g)),R.setAttribute("uv",new Rt(b,m)),R.setAttribute("faceIndex",new Rt(x,d)),e.push(R),r>tr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Vl(n,e,t){const i=new Ci(n,e,t);return i.texture.mapping=Bs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function gs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Rm(n,e,t){const i=new Float32Array(wi),r=new F(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Bl(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Wl(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Vo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cm(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ja||l===Ja,u=l===fr||l===hr;if(c||u){let f=e.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Gl(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Gl(n)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Pm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Or("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Lm(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const g=h.morphAttributes[_];for(let m=0,d=g.length;m<d;m++)e.remove(g[m])}h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const g=p[_];for(let m=0,d=g.length;m<d;m++)e.update(g[m],n.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,_=f.attributes.position;let g=0;if(p!==null){const y=p.array;g=p.version;for(let b=0,x=y.length;b<x;b+=3){const R=y[b+0],E=y[b+1],T=y[b+2];h.push(R,E,E,T,T,R)}}else if(_!==void 0){const y=_.array;g=_.version;for(let b=0,x=y.length/3-1;b<x;b+=3){const R=b+0,E=b+1,T=b+2;h.push(R,E,E,T,T,R)}}else return;const m=new(Mu(h)?Eu:yu)(h,1);m.version=g;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Dm(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*a),t.update(p,i,1)}function c(h,p,_){_!==0&&(n.drawElementsInstanced(i,p,s,h*a,_),t.update(p,i,_))}function u(h,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];t.update(m,i,1)}function f(h,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/a,p[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,g,0,_);let d=0;for(let y=0;y<_;y++)d+=p[y]*g[y];t.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Im(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Um(n,e,t){const i=new WeakMap,r=new vt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let w=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),_===!0&&(b=2),g===!0&&(b=3);let x=o.attributes.position.count*b,R=1;x>e.maxTextureSize&&(R=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*R*4*f),T=new Go(E,x,R,f);T.type=kn,T.needsUpdate=!0;const P=b*4;for(let M=0;M<f;M++){const C=m[M],H=d[M],N=y[M],W=x*R*4*M;for(let K=0;K<C.count;K++){const z=K*P;p===!0&&(r.fromBufferAttribute(C,K),E[W+z+0]=r.x,E[W+z+1]=r.y,E[W+z+2]=r.z,E[W+z+3]=0),_===!0&&(r.fromBufferAttribute(H,K),E[W+z+4]=r.x,E[W+z+5]=r.y,E[W+z+6]=r.z,E[W+z+7]=0),g===!0&&(r.fromBufferAttribute(N,K),E[W+z+8]=r.x,E[W+z+9]=r.y,E[W+z+10]=r.z,E[W+z+11]=N.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new rt(x,R)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Nm(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Du extends Ht{constructor(e,t,i,r,s,a,o,l,c,u=sr){if(u!==sr&&u!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===sr&&(i=Ri),i===void 0&&u===pr&&(i=dr),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Nt,this.minFilter=l!==void 0?l:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Iu=new Ht,Xl=new Du(1,1),Uu=new Go,Nu=new Mh,Fu=new Cu,Yl=[],ql=[],$l=new Float32Array(16),Kl=new Float32Array(9),Zl=new Float32Array(4);function br(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Yl[r];if(s===void 0&&(s=new Float32Array(r),Yl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qs(n,e){let t=ql[e];t===void 0&&(t=new Int32Array(e),ql[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Fm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function Hm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(St(t,i))return;Zl.set(i),n.uniformMatrix2fv(this.addr,!1,Zl),wt(t,i)}}function Gm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(St(t,i))return;Kl.set(i),n.uniformMatrix3fv(this.addr,!1,Kl),wt(t,i)}}function Vm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(St(t,i))return;$l.set(i),n.uniformMatrix4fv(this.addr,!1,$l),wt(t,i)}}function Bm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function Ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function qm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function jm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Xl.compareFunction=xu,s=Xl):s=Iu,t.setTexture2D(e||s,r)}function Jm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Nu,r)}function Qm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Fu,r)}function e_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Uu,r)}function t_(n){switch(n){case 5126:return Fm;case 35664:return Om;case 35665:return km;case 35666:return zm;case 35674:return Hm;case 35675:return Gm;case 35676:return Vm;case 5124:case 35670:return Bm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return Ym;case 5125:return qm;case 36294:return $m;case 36295:return Km;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(n,e){n.uniform1fv(this.addr,e)}function i_(n,e){const t=br(e,this.size,2);n.uniform2fv(this.addr,t)}function r_(n,e){const t=br(e,this.size,3);n.uniform3fv(this.addr,t)}function s_(n,e){const t=br(e,this.size,4);n.uniform4fv(this.addr,t)}function a_(n,e){const t=br(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function o_(n,e){const t=br(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function l_(n,e){const t=br(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function c_(n,e){n.uniform1iv(this.addr,e)}function u_(n,e){n.uniform2iv(this.addr,e)}function f_(n,e){n.uniform3iv(this.addr,e)}function h_(n,e){n.uniform4iv(this.addr,e)}function d_(n,e){n.uniform1uiv(this.addr,e)}function p_(n,e){n.uniform2uiv(this.addr,e)}function m_(n,e){n.uniform3uiv(this.addr,e)}function __(n,e){n.uniform4uiv(this.addr,e)}function g_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Iu,s[a])}function v_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Nu,s[a])}function x_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Fu,s[a])}function M_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Uu,s[a])}function b_(n){switch(n){case 5126:return n_;case 35664:return i_;case 35665:return r_;case 35666:return s_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return u_;case 35668:case 35672:return f_;case 35669:case 35673:return h_;case 5125:return d_;case 36294:return p_;case 36295:return m_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return M_}}class S_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}}class w_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b_(t.type)}}class y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function jl(n,e){n.seq.push(e),n.map[e.id]=e}function E_(n,e,t){const i=n.name,r=i.length;for(Ta.lastIndex=0;;){const s=Ta.exec(i),a=Ta.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){jl(t,c===void 0?new S_(o,n,e):new w_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new y_(o),jl(t,f)),t=f}}}class Ds{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);E_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Jl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const A_=37297;let T_=0;function R_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ql=new ze;function C_(n){qe._getMatrix(Ql,qe.workingColorSpace,n);const e=`mat3( ${Ql.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case Ws:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ec(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+R_(n.getShaderSource(e),a)}else return r}function P_(n,e){const t=C_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function L_(n,e){let t;switch(e){case Yf:t="Linear";break;case qf:t="Reinhard";break;case $f:t="Cineon";break;case Kf:t="ACESFilmic";break;case jf:t="AgX";break;case Jf:t="Neutral";break;case Zf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vs=new F;function D_(){qe.getLuminanceCoefficients(vs);const n=vs.x.toFixed(4),e=vs.y.toFixed(4),t=vs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function U_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function N_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function kr(n){return n!==""}function tc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const F_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ro(n){return n.replace(F_,k_)}const O_=new Map;function k_(n,e){let t=Ge[e];if(t===void 0){const i=O_.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ro(t)}const z_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(n){return n.replace(z_,H_)}function H_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function G_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ru?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function V_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case fr:case hr:e="ENVMAP_TYPE_CUBE";break;case Bs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function B_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hr:e="ENVMAP_MODE_REFRACTION";break}return e}function W_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ou:e="ENVMAP_BLENDING_MULTIPLY";break;case Wf:e="ENVMAP_BLENDING_MIX";break;case Xf:e="ENVMAP_BLENDING_ADD";break}return e}function X_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Y_(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=G_(t),c=V_(t),u=B_(t),f=W_(t),h=X_(t),p=I_(t),_=U_(s),g=r.createProgram();let m,d,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(kr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(kr).join(`
`),d.length>0&&(d+=`
`)):(m=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),d=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ii?L_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,P_("linearToOutputTexel",t.outputColorSpace),D_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),a=Ro(a),a=tc(a,t),a=nc(a,t),o=Ro(o),o=tc(o,t),o=nc(o,t),a=ic(a),o=ic(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=y+m+a,x=y+d+o,R=Jl(r,r.VERTEX_SHADER,b),E=Jl(r,r.FRAGMENT_SHADER,x);r.attachShader(g,R),r.attachShader(g,E),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(C){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(g).trim(),N=r.getShaderInfoLog(R).trim(),W=r.getShaderInfoLog(E).trim();let K=!0,z=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,R,E);else{const Q=ec(r,R,"vertex"),G=ec(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+Q+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(N===""||W==="")&&(z=!1);z&&(C.diagnostics={runnable:K,programLog:H,vertexShader:{log:N,prefix:m},fragmentShader:{log:W,prefix:d}})}r.deleteShader(R),r.deleteShader(E),P=new Ds(r,g),w=N_(r,g)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(g,A_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=T_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=E,this}let q_=0;class $_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new K_(e),t.set(e,i)),i}}class K_{constructor(e){this.id=q_++,this.code=e,this.usedTimes=0}}function Z_(n,e,t,i,r,s,a){const o=new Su,l=new $_,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,C,H,N){const W=H.fog,K=N.geometry,z=w.isMeshStandardMaterial?H.environment:null,Q=(w.isMeshStandardMaterial?t:e).get(w.envMap||z),G=Q&&Q.mapping===Bs?Q.image.height:null,le=_[w.type];w.precision!==null&&(p=r.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const de=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ue=de!==void 0?de.length:0;let ce=0;K.morphAttributes.position!==void 0&&(ce=1),K.morphAttributes.normal!==void 0&&(ce=2),K.morphAttributes.color!==void 0&&(ce=3);let Le,Y,$,he;if(le){const nt=wn[le];Le=nt.vertexShader,Y=nt.fragmentShader}else Le=w.vertexShader,Y=w.fragmentShader,l.update(w),$=l.getVertexShaderID(w),he=l.getFragmentShaderID(w);const se=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Ne=N.isInstancedMesh===!0,Ve=N.isBatchedMesh===!0,dt=!!w.map,$e=!!w.matcap,gt=!!Q,U=!!w.aoMap,jt=!!w.lightMap,We=!!w.bumpMap,Xe=!!w.normalMap,Pe=!!w.displacementMap,lt=!!w.emissiveMap,Ce=!!w.metalnessMap,A=!!w.roughnessMap,v=w.anisotropy>0,O=w.clearcoat>0,j=w.dispersion>0,ee=w.iridescence>0,Z=w.sheen>0,Te=w.transmission>0,_e=v&&!!w.anisotropyMap,be=O&&!!w.clearcoatMap,Ke=O&&!!w.clearcoatNormalMap,ie=O&&!!w.clearcoatRoughnessMap,Se=ee&&!!w.iridescenceMap,De=ee&&!!w.iridescenceThicknessMap,Ie=Z&&!!w.sheenColorMap,we=Z&&!!w.sheenRoughnessMap,Ye=!!w.specularMap,He=!!w.specularColorMap,st=!!w.specularIntensityMap,L=Te&&!!w.transmissionMap,me=Te&&!!w.thicknessMap,q=!!w.gradientMap,J=!!w.alphaMap,xe=w.alphaTest>0,ge=!!w.alphaHash,Fe=!!w.extensions;let mt=ii;w.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(mt=n.toneMapping);const Lt={shaderID:le,shaderType:w.type,shaderName:w.name,vertexShader:Le,fragmentShader:Y,defines:w.defines,customVertexShaderID:$,customFragmentShaderID:he,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Ve,batchingColor:Ve&&N._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,instancingMorph:Ne&&N.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ii,alphaToCoverage:!!w.alphaToCoverage,map:dt,matcap:$e,envMap:gt,envMapMode:gt&&Q.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:jt,bumpMap:We,normalMap:Xe,displacementMap:h&&Pe,emissiveMap:lt,normalMapObjectSpace:Xe&&w.normalMapType===ih,normalMapTangentSpace:Xe&&w.normalMapType===nh,metalnessMap:Ce,roughnessMap:A,anisotropy:v,anisotropyMap:_e,clearcoat:O,clearcoatMap:be,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ie,dispersion:j,iridescence:ee,iridescenceMap:Se,iridescenceThicknessMap:De,sheen:Z,sheenColorMap:Ie,sheenRoughnessMap:we,specularMap:Ye,specularColorMap:He,specularIntensityMap:st,transmission:Te,transmissionMap:L,thicknessMap:me,gradientMap:q,opaque:w.transparent===!1&&w.blending===rr&&w.alphaToCoverage===!1,alphaMap:J,alphaTest:xe,alphaHash:ge,combine:w.combine,mapUv:dt&&g(w.map.channel),aoMapUv:U&&g(w.aoMap.channel),lightMapUv:jt&&g(w.lightMap.channel),bumpMapUv:We&&g(w.bumpMap.channel),normalMapUv:Xe&&g(w.normalMap.channel),displacementMapUv:Pe&&g(w.displacementMap.channel),emissiveMapUv:lt&&g(w.emissiveMap.channel),metalnessMapUv:Ce&&g(w.metalnessMap.channel),roughnessMapUv:A&&g(w.roughnessMap.channel),anisotropyMapUv:_e&&g(w.anisotropyMap.channel),clearcoatMapUv:be&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:De&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(w.sheenRoughnessMap.channel),specularMapUv:Ye&&g(w.specularMap.channel),specularColorMapUv:He&&g(w.specularColorMap.channel),specularIntensityMapUv:st&&g(w.specularIntensityMap.channel),transmissionMapUv:L&&g(w.transmissionMap.channel),thicknessMapUv:me&&g(w.thicknessMap.channel),alphaMapUv:J&&g(w.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Xe||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!K.attributes.uv&&(dt||J),fog:!!W,useFog:w.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Me,skinning:N.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:mt,decodeVideoTexture:dt&&w.map.isVideoTexture===!0&&qe.getTransfer(w.map.colorSpace)===it,decodeVideoTextureEmissive:lt&&w.emissiveMap.isVideoTexture===!0&&qe.getTransfer(w.emissiveMap.colorSpace)===it,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===tn,flipSided:w.side===zt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Fe&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&w.extensions.multiDraw===!0||Ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const C in w.defines)M.push(C),M.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(y(M,w),b(M,w),M.push(n.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function y(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function b(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){const M=_[w.type];let C;if(M){const H=wn[M];C=Tu.clone(H.uniforms)}else C=w.uniforms;return C}function R(w,M){let C;for(let H=0,N=u.length;H<N;H++){const W=u[H];if(W.cacheKey===M){C=W,++C.usedTimes;break}}return C===void 0&&(C=new Y_(n,M,w,s),u.push(C)),C}function E(w){if(--w.usedTimes===0){const M=u.indexOf(w);u[M]=u[u.length-1],u.pop(),w.destroy()}}function T(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:R,releaseProgram:E,releaseShaderCache:T,programs:u,dispose:P}}function j_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function J_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function sc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ac(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,h,p,_,g,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:_,renderOrder:f.renderOrder,z:g,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=g,d.group=m),e++,d}function o(f,h,p,_,g,m){const d=a(f,h,p,_,g,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(f,h,p,_,g,m){const d=a(f,h,p,_,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(f,h){t.length>1&&t.sort(f||J_),i.length>1&&i.sort(h||sc),r.length>1&&r.sort(h||sc)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Q_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new ac,n.set(i,[a])):r>=s.length?(a=new ac,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function e0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Je};break;case"SpotLight":t={position:new F,direction:new F,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function t0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let n0=0;function i0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function r0(n){const e=new e0,t=t0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new bt,a=new bt;function o(c){let u=0,f=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,_=0,g=0,m=0,d=0,y=0,b=0,x=0,R=0,E=0,T=0;c.sort(i0);for(let w=0,M=c.length;w<M;w++){const C=c[w],H=C.color,N=C.intensity,W=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=H.r*N,f+=H.g*N,h+=H.b*N;else if(C.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(C.sh.coefficients[z],N);T++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=K,i.directionalShadowMatrix[p]=C.shadow.matrix,y++}i.directional[p]=z,p++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(H).multiplyScalar(N),z.distance=W,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,i.spot[g]=z;const Q=C.shadow;if(C.map&&(i.spotLightMap[R]=C.map,R++,Q.updateMatrices(C),C.castShadow&&E++),i.spotLightMatrix[g]=Q.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.spotShadow[g]=G,i.spotShadowMap[g]=K,x++}g++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(H).multiplyScalar(N),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=z,m++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const Q=C.shadow,G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,i.pointShadow[_]=G,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=C.shadow.matrix,b++}i.point[_]=z,_++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(N),z.groundColor.copy(C.groundColor).multiplyScalar(N),i.hemi[d]=z,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==p||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==y||P.numPointShadows!==b||P.numSpotShadows!==x||P.numSpotMaps!==R||P.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=x+R-E,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=T,P.directionalLength=p,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=y,P.numPointShadows=b,P.numSpotShadows=x,P.numSpotMaps=R,P.numLightProbes=T,i.version=n0++)}function l(c,u){let f=0,h=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const b=c[d];if(b.isDirectionalLight){const x=i.directional[f];x.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(b.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const x=i.rectArea[_];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const x=i.point[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function oc(n){const e=new r0(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function s0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new oc(n),e.set(r,[o])):s>=a.length?(o=new oc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class a0 extends Ys{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class o0 extends Ys{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const l0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function u0(n,e,t){let i=new Pu;const r=new rt,s=new rt,a=new vt,o=new a0({depthPacking:th}),l=new o0,c={},u=t.maxTextureSize,f={[oi]:zt,[zt]:oi,[tn]:tn},h=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:l0,fragmentShader:c0}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new _n;_.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ct(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ru;let d=this.type;this.render=function(E,T,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const w=n.getRenderTarget(),M=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),H=n.state;H.setBlending(ni),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const N=d!==On&&this.type===On,W=d===On&&this.type!==On;for(let K=0,z=E.length;K<z;K++){const Q=E[K],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const le=G.getFrameExtents();if(r.multiply(le),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/le.x),r.x=s.x*le.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/le.y),r.y=s.y*le.y,G.mapSize.y=s.y)),G.map===null||N===!0||W===!0){const ue=this.type!==On?{minFilter:Nt,magFilter:Nt}:{};G.map!==null&&G.map.dispose(),G.map=new Ci(r.x,r.y,ue),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const de=G.getViewportCount();for(let ue=0;ue<de;ue++){const ce=G.getViewport(ue);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),H.viewport(a),G.updateMatrices(Q,ue),i=G.getFrustum(),x(T,P,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===On&&y(G,P),G.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(w,M,C)};function y(E,T){const P=e.update(g);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ci(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(T,null,P,h,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(T,null,P,p,g,null)}function b(E,T,P,w){let M=null;const C=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)M=C;else if(M=P.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=M.uuid,N=T.uuid;let W=c[H];W===void 0&&(W={},c[H]=W);let K=W[N];K===void 0&&(K=M.clone(),W[N]=K,T.addEventListener("dispose",R)),M=K}if(M.visible=T.visible,M.wireframe=T.wireframe,w===On?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:f[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=n.properties.get(M);H.light=P}return M}function x(E,T,P,w,M){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===On)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const N=e.update(E),W=E.material;if(Array.isArray(W)){const K=N.groups;for(let z=0,Q=K.length;z<Q;z++){const G=K[z],le=W[G.materialIndex];if(le&&le.visible){const de=b(E,le,w,M);E.onBeforeShadow(n,E,T,P,N,de,G),n.renderBufferDirect(P,null,N,de,E,G),E.onAfterShadow(n,E,T,P,N,de,G)}}}else if(W.visible){const K=b(E,W,w,M);E.onBeforeShadow(n,E,T,P,N,K,null),n.renderBufferDirect(P,null,N,K,E,null),E.onAfterShadow(n,E,T,P,N,K,null)}}const H=E.children;for(let N=0,W=H.length;N<W;N++)x(H[N],T,P,w,M)}function R(E){E.target.removeEventListener("dispose",R);for(const P in c){const w=c[P],M=E.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const f0={[Wa]:Xa,[Ya]:Ka,[qa]:Za,[ur]:$a,[Xa]:Wa,[Ka]:Ya,[Za]:qa,[$a]:ur};function h0(n,e){function t(){let L=!1;const me=new vt;let q=null;const J=new vt(0,0,0,0);return{setMask:function(xe){q!==xe&&!L&&(n.colorMask(xe,xe,xe,xe),q=xe)},setLocked:function(xe){L=xe},setClear:function(xe,ge,Fe,mt,Lt){Lt===!0&&(xe*=mt,ge*=mt,Fe*=mt),me.set(xe,ge,Fe,mt),J.equals(me)===!1&&(n.clearColor(xe,ge,Fe,mt),J.copy(me))},reset:function(){L=!1,q=null,J.set(-1,0,0,0)}}}function i(){let L=!1,me=!1,q=null,J=null,xe=null;return{setReversed:function(ge){if(me!==ge){const Fe=e.get("EXT_clip_control");me?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);const mt=xe;xe=null,this.setClear(mt)}me=ge},getReversed:function(){return me},setTest:function(ge){ge?se(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(ge){q!==ge&&!L&&(n.depthMask(ge),q=ge)},setFunc:function(ge){if(me&&(ge=f0[ge]),J!==ge){switch(ge){case Wa:n.depthFunc(n.NEVER);break;case Xa:n.depthFunc(n.ALWAYS);break;case Ya:n.depthFunc(n.LESS);break;case ur:n.depthFunc(n.LEQUAL);break;case qa:n.depthFunc(n.EQUAL);break;case $a:n.depthFunc(n.GEQUAL);break;case Ka:n.depthFunc(n.GREATER);break;case Za:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=ge}},setLocked:function(ge){L=ge},setClear:function(ge){xe!==ge&&(me&&(ge=1-ge),n.clearDepth(ge),xe=ge)},reset:function(){L=!1,q=null,J=null,xe=null,me=!1}}}function r(){let L=!1,me=null,q=null,J=null,xe=null,ge=null,Fe=null,mt=null,Lt=null;return{setTest:function(nt){L||(nt?se(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(nt){me!==nt&&!L&&(n.stencilMask(nt),me=nt)},setFunc:function(nt,an,Cn){(q!==nt||J!==an||xe!==Cn)&&(n.stencilFunc(nt,an,Cn),q=nt,J=an,xe=Cn)},setOp:function(nt,an,Cn){(ge!==nt||Fe!==an||mt!==Cn)&&(n.stencilOp(nt,an,Cn),ge=nt,Fe=an,mt=Cn)},setLocked:function(nt){L=nt},setClear:function(nt){Lt!==nt&&(n.clearStencil(nt),Lt=nt)},reset:function(){L=!1,me=null,q=null,J=null,xe=null,ge=null,Fe=null,mt=null,Lt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,p=[],_=null,g=!1,m=null,d=null,y=null,b=null,x=null,R=null,E=null,T=new Je(0,0,0),P=0,w=!1,M=null,C=null,H=null,N=null,W=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=Q>=2);let le=null,de={};const ue=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Le=new vt().fromArray(ue),Y=new vt().fromArray(ce);function $(L,me,q,J){const xe=new Uint8Array(4),ge=n.createTexture();n.bindTexture(L,ge),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Fe=0;Fe<q;Fe++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(me+Fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return ge}const he={};he[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(n.DEPTH_TEST),a.setFunc(ur),We(!1),Xe(fl),se(n.CULL_FACE),U(ni);function se(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Me(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ne(L,me){return f[L]!==me?(n.bindFramebuffer(L,me),f[L]=me,L===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=me),L===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=me),!0):!1}function Ve(L,me){let q=p,J=!1;if(L){q=h.get(me),q===void 0&&(q=[],h.set(me,q));const xe=L.textures;if(q.length!==xe.length||q[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Fe=xe.length;ge<Fe;ge++)q[ge]=n.COLOR_ATTACHMENT0+ge;q.length=xe.length,J=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,J=!0);J&&n.drawBuffers(q)}function dt(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const $e={[Si]:n.FUNC_ADD,[Rf]:n.FUNC_SUBTRACT,[Cf]:n.FUNC_REVERSE_SUBTRACT};$e[Pf]=n.MIN,$e[Lf]=n.MAX;const gt={[Df]:n.ZERO,[au]:n.ONE,[If]:n.SRC_COLOR,[Fs]:n.SRC_ALPHA,[zf]:n.SRC_ALPHA_SATURATE,[Of]:n.DST_COLOR,[Nf]:n.DST_ALPHA,[Uf]:n.ONE_MINUS_SRC_COLOR,[Ba]:n.ONE_MINUS_SRC_ALPHA,[kf]:n.ONE_MINUS_DST_COLOR,[Ff]:n.ONE_MINUS_DST_ALPHA,[Hf]:n.CONSTANT_COLOR,[Gf]:n.ONE_MINUS_CONSTANT_COLOR,[Vf]:n.CONSTANT_ALPHA,[Bf]:n.ONE_MINUS_CONSTANT_ALPHA};function U(L,me,q,J,xe,ge,Fe,mt,Lt,nt){if(L===ni){g===!0&&(Me(n.BLEND),g=!1);return}if(g===!1&&(se(n.BLEND),g=!0),L!==su){if(L!==m||nt!==w){if((d!==Si||x!==Si)&&(n.blendEquation(n.FUNC_ADD),d=Si,x=Si),nt)switch(L){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.ONE,n.ONE);break;case dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,b=null,R=null,E=null,T.set(0,0,0),P=0,m=L,w=nt}return}xe=xe||me,ge=ge||q,Fe=Fe||J,(me!==d||xe!==x)&&(n.blendEquationSeparate($e[me],$e[xe]),d=me,x=xe),(q!==y||J!==b||ge!==R||Fe!==E)&&(n.blendFuncSeparate(gt[q],gt[J],gt[ge],gt[Fe]),y=q,b=J,R=ge,E=Fe),(mt.equals(T)===!1||Lt!==P)&&(n.blendColor(mt.r,mt.g,mt.b,Lt),T.copy(mt),P=Lt),m=L,w=!1}function jt(L,me){L.side===tn?Me(n.CULL_FACE):se(n.CULL_FACE);let q=L.side===zt;me&&(q=!q),We(q),L.blending===rr&&L.transparent===!1?U(ni):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const J=L.stencilWrite;o.setTest(J),J&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),lt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(L){M!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),M=L)}function Xe(L){L!==Ef?(se(n.CULL_FACE),L!==C&&(L===fl?n.cullFace(n.BACK):L===Af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),C=L}function Pe(L){L!==H&&(z&&n.lineWidth(L),H=L)}function lt(L,me,q){L?(se(n.POLYGON_OFFSET_FILL),(N!==me||W!==q)&&(n.polygonOffset(me,q),N=me,W=q)):Me(n.POLYGON_OFFSET_FILL)}function Ce(L){L?se(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function A(L){L===void 0&&(L=n.TEXTURE0+K-1),le!==L&&(n.activeTexture(L),le=L)}function v(L,me,q){q===void 0&&(le===null?q=n.TEXTURE0+K-1:q=le);let J=de[q];J===void 0&&(J={type:void 0,texture:void 0},de[q]=J),(J.type!==L||J.texture!==me)&&(le!==q&&(n.activeTexture(q),le=q),n.bindTexture(L,me||he[L]),J.type=L,J.texture=me)}function O(){const L=de[le];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){Le.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Le.copy(L))}function we(L){Y.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function Ye(L,me){let q=c.get(me);q===void 0&&(q=new WeakMap,c.set(me,q));let J=q.get(L);J===void 0&&(J=n.getUniformBlockIndex(me,L.name),q.set(L,J))}function He(L,me){const J=c.get(me).get(L);l.get(me)!==J&&(n.uniformBlockBinding(me,J,L.__bindingPointIndex),l.set(me,J))}function st(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},le=null,de={},f={},h=new WeakMap,p=[],_=null,g=!1,m=null,d=null,y=null,b=null,x=null,R=null,E=null,T=new Je(0,0,0),P=0,w=!1,M=null,C=null,H=null,N=null,W=null,Le.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:Me,bindFramebuffer:Ne,drawBuffers:Ve,useProgram:dt,setBlending:U,setMaterial:jt,setFlipSided:We,setCullFace:Xe,setLineWidth:Pe,setPolygonOffset:lt,setScissorTest:Ce,activeTexture:A,bindTexture:v,unbindTexture:O,compressedTexImage2D:j,compressedTexImage3D:ee,texImage2D:Se,texImage3D:De,updateUBOMapping:Ye,uniformBlockBinding:He,texStorage2D:Ke,texStorage3D:ie,texSubImage2D:Z,texSubImage3D:Te,compressedTexSubImage2D:_e,compressedTexSubImage3D:be,scissor:Ie,viewport:we,reset:st}}function lc(n,e,t,i){const r=d0(i);switch(t){case hu:return n*e;case pu:return n*e;case mu:return n*e*2;case _u:return n*e/r.components*r.byteLength;case ko:return n*e/r.components*r.byteLength;case gu:return n*e*2/r.components*r.byteLength;case zo:return n*e*2/r.components*r.byteLength;case du:return n*e*3/r.components*r.byteLength;case kt:return n*e*4/r.components*r.byteLength;case Ho:return n*e*4/r.components*r.byteLength;case Ts:case Rs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Cs:case Ps:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case to:case io:return Math.max(n,16)*Math.max(e,8)/4;case eo:case no:return Math.max(n,8)*Math.max(e,8)/2;case ro:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case co:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case fo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ho:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case po:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case mo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case go:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case bo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ls:case So:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case vu:case yo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Eo:case Ao:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function d0(n){switch(n){case sn:case cu:return{byteLength:1,components:1};case zr:case uu:case qr:return{byteLength:2,components:1};case Fo:case Oo:return{byteLength:2,components:4};case Ri:case No:case kn:return{byteLength:4,components:1};case fu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function p0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,v){return p?new OffscreenCanvas(A,v):zs("canvas")}function g(A,v,O){let j=1;const ee=Ce(A);if((ee.width>O||ee.height>O)&&(j=O/Math.max(ee.width,ee.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(j*ee.width),Te=Math.floor(j*ee.height);f===void 0&&(f=_(Z,Te));const _e=v?_(Z,Te):f;return _e.width=Z,_e.height=Te,_e.getContext("2d").drawImage(A,0,0,Z,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Te+")."),_e}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(A,v,O,j,ee=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=v;if(v===n.RED&&(O===n.FLOAT&&(Z=n.R32F),O===n.HALF_FLOAT&&(Z=n.R16F),O===n.UNSIGNED_BYTE&&(Z=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.R8UI),O===n.UNSIGNED_SHORT&&(Z=n.R16UI),O===n.UNSIGNED_INT&&(Z=n.R32UI),O===n.BYTE&&(Z=n.R8I),O===n.SHORT&&(Z=n.R16I),O===n.INT&&(Z=n.R32I)),v===n.RG&&(O===n.FLOAT&&(Z=n.RG32F),O===n.HALF_FLOAT&&(Z=n.RG16F),O===n.UNSIGNED_BYTE&&(Z=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RG8UI),O===n.UNSIGNED_SHORT&&(Z=n.RG16UI),O===n.UNSIGNED_INT&&(Z=n.RG32UI),O===n.BYTE&&(Z=n.RG8I),O===n.SHORT&&(Z=n.RG16I),O===n.INT&&(Z=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),O===n.UNSIGNED_INT&&(Z=n.RGB32UI),O===n.BYTE&&(Z=n.RGB8I),O===n.SHORT&&(Z=n.RGB16I),O===n.INT&&(Z=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),O===n.UNSIGNED_INT&&(Z=n.RGBA32UI),O===n.BYTE&&(Z=n.RGBA8I),O===n.SHORT&&(Z=n.RGBA16I),O===n.INT&&(Z=n.RGBA32I)),v===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),v===n.RGBA){const Te=ee?Ws:qe.getTransfer(j);O===n.FLOAT&&(Z=n.RGBA32F),O===n.HALF_FLOAT&&(Z=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Z=Te===it?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(A,v){let O;return A?v===null||v===Ri||v===dr?O=n.DEPTH24_STENCIL8:v===kn?O=n.DEPTH32F_STENCIL8:v===zr&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ri||v===dr?O=n.DEPTH_COMPONENT24:v===kn?O=n.DEPTH_COMPONENT32F:v===zr&&(O=n.DEPTH_COMPONENT16),O}function R(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Nt&&A.minFilter!==dn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function E(A){const v=A.target;v.removeEventListener("dispose",E),P(v),v.isVideoTexture&&u.delete(v)}function T(A){const v=A.target;v.removeEventListener("dispose",T),M(v)}function P(A){const v=i.get(A);if(v.__webglInit===void 0)return;const O=A.source,j=h.get(O);if(j){const ee=j[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(A),Object.keys(j).length===0&&h.delete(O)}i.remove(A)}function w(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const O=A.source,j=h.get(O);delete j[v.__cacheKey],a.memory.textures--}function M(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(v.__webglFramebuffer[j]))for(let ee=0;ee<v.__webglFramebuffer[j].length;ee++)n.deleteFramebuffer(v.__webglFramebuffer[j][ee]);else n.deleteFramebuffer(v.__webglFramebuffer[j]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[j])}else{if(Array.isArray(v.__webglFramebuffer))for(let j=0;j<v.__webglFramebuffer.length;j++)n.deleteFramebuffer(v.__webglFramebuffer[j]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let j=0;j<v.__webglColorRenderbuffer.length;j++)v.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let j=0,ee=O.length;j<ee;j++){const Z=i.get(O[j]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),a.memory.textures--),i.remove(O[j])}i.remove(A)}let C=0;function H(){C=0}function N(){const A=C;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),C+=1,A}function W(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function K(A,v){const O=i.get(A);if(A.isVideoTexture&&Pe(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){const j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,A,v);return}}t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function z(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){Y(O,A,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function Q(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){Y(O,A,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function G(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){$(O,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const le={[Os]:n.REPEAT,[yi]:n.CLAMP_TO_EDGE,[Qa]:n.MIRRORED_REPEAT},de={[Nt]:n.NEAREST,[Qf]:n.NEAREST_MIPMAP_NEAREST,[Fr]:n.NEAREST_MIPMAP_LINEAR,[dn]:n.LINEAR,[Qs]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},ue={[rh]:n.NEVER,[uh]:n.ALWAYS,[sh]:n.LESS,[xu]:n.LEQUAL,[ah]:n.EQUAL,[ch]:n.GEQUAL,[oh]:n.GREATER,[lh]:n.NOTEQUAL};function ce(A,v){if(v.type===kn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===dn||v.magFilter===Qs||v.magFilter===Fr||v.magFilter===Ei||v.minFilter===dn||v.minFilter===Qs||v.minFilter===Fr||v.minFilter===Ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,le[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,de[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Nt||v.minFilter!==Fr&&v.minFilter!==Ei||v.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Le(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",E));const j=v.source;let ee=h.get(j);ee===void 0&&(ee={},h.set(j,ee));const Z=W(v);if(Z!==A.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),ee[Z].usedTimes++;const Te=ee[A.__cacheKey];Te!==void 0&&(ee[A.__cacheKey].usedTimes--,Te.usedTimes===0&&w(v)),A.__cacheKey=Z,A.__webglTexture=ee[Z].texture}return O}function Y(A,v,O){let j=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(j=n.TEXTURE_3D);const ee=Le(A,v),Z=v.source;t.bindTexture(j,A.__webglTexture,n.TEXTURE0+O);const Te=i.get(Z);if(Z.version!==Te.__version||ee===!0){t.activeTexture(n.TEXTURE0+O);const _e=qe.getPrimaries(qe.workingColorSpace),be=v.colorSpace===Qn?null:qe.getPrimaries(v.colorSpace),Ke=v.colorSpace===Qn||_e===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let ie=g(v.image,!1,r.maxTextureSize);ie=lt(v,ie);const Se=s.convert(v.format,v.colorSpace),De=s.convert(v.type);let Ie=b(v.internalFormat,Se,De,v.colorSpace,v.isVideoTexture);ce(j,v);let we;const Ye=v.mipmaps,He=v.isVideoTexture!==!0,st=Te.__version===void 0||ee===!0,L=Z.dataReady,me=R(v,ie);if(v.isDepthTexture)Ie=x(v.format===pr,v.type),st&&(He?t.texStorage2D(n.TEXTURE_2D,1,Ie,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ie,ie.width,ie.height,0,Se,De,null));else if(v.isDataTexture)if(Ye.length>0){He&&st&&t.texStorage2D(n.TEXTURE_2D,me,Ie,Ye[0].width,Ye[0].height);for(let q=0,J=Ye.length;q<J;q++)we=Ye[q],He?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,we.width,we.height,Se,De,we.data):t.texImage2D(n.TEXTURE_2D,q,Ie,we.width,we.height,0,Se,De,we.data);v.generateMipmaps=!1}else He?(st&&t.texStorage2D(n.TEXTURE_2D,me,Ie,ie.width,ie.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,Se,De,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Ie,ie.width,ie.height,0,Se,De,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){He&&st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Ie,Ye[0].width,Ye[0].height,ie.depth);for(let q=0,J=Ye.length;q<J;q++)if(we=Ye[q],v.format!==kt)if(Se!==null)if(He){if(L)if(v.layerUpdates.size>0){const xe=lc(we.width,we.height,v.format,v.type);for(const ge of v.layerUpdates){const Fe=we.data.subarray(ge*xe/we.data.BYTES_PER_ELEMENT,(ge+1)*xe/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,ge,we.width,we.height,1,Se,Fe)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,we.width,we.height,ie.depth,Se,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,Ie,we.width,we.height,ie.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,we.width,we.height,ie.depth,Se,De,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,q,Ie,we.width,we.height,ie.depth,0,Se,De,we.data)}else{He&&st&&t.texStorage2D(n.TEXTURE_2D,me,Ie,Ye[0].width,Ye[0].height);for(let q=0,J=Ye.length;q<J;q++)we=Ye[q],v.format!==kt?Se!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,we.width,we.height,Se,we.data):t.compressedTexImage2D(n.TEXTURE_2D,q,Ie,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,we.width,we.height,Se,De,we.data):t.texImage2D(n.TEXTURE_2D,q,Ie,we.width,we.height,0,Se,De,we.data)}else if(v.isDataArrayTexture)if(He){if(st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Ie,ie.width,ie.height,ie.depth),L)if(v.layerUpdates.size>0){const q=lc(ie.width,ie.height,v.format,v.type);for(const J of v.layerUpdates){const xe=ie.data.subarray(J*q/ie.data.BYTES_PER_ELEMENT,(J+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,Se,De,xe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Se,De,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,ie.width,ie.height,ie.depth,0,Se,De,ie.data);else if(v.isData3DTexture)He?(st&&t.texStorage3D(n.TEXTURE_3D,me,Ie,ie.width,ie.height,ie.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Se,De,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,ie.width,ie.height,ie.depth,0,Se,De,ie.data);else if(v.isFramebufferTexture){if(st)if(He)t.texStorage2D(n.TEXTURE_2D,me,Ie,ie.width,ie.height);else{let q=ie.width,J=ie.height;for(let xe=0;xe<me;xe++)t.texImage2D(n.TEXTURE_2D,xe,Ie,q,J,0,Se,De,null),q>>=1,J>>=1}}else if(Ye.length>0){if(He&&st){const q=Ce(Ye[0]);t.texStorage2D(n.TEXTURE_2D,me,Ie,q.width,q.height)}for(let q=0,J=Ye.length;q<J;q++)we=Ye[q],He?L&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,Se,De,we):t.texImage2D(n.TEXTURE_2D,q,Ie,Se,De,we);v.generateMipmaps=!1}else if(He){if(st){const q=Ce(ie);t.texStorage2D(n.TEXTURE_2D,me,Ie,q.width,q.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Se,De,ie)}else t.texImage2D(n.TEXTURE_2D,0,Ie,Se,De,ie);m(v)&&d(j),Te.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function $(A,v,O){if(v.image.length!==6)return;const j=Le(A,v),ee=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);const Z=i.get(ee);if(ee.version!==Z.__version||j===!0){t.activeTexture(n.TEXTURE0+O);const Te=qe.getPrimaries(qe.workingColorSpace),_e=v.colorSpace===Qn?null:qe.getPrimaries(v.colorSpace),be=v.colorSpace===Qn||Te===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ke=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,Se=[];for(let J=0;J<6;J++)!Ke&&!ie?Se[J]=g(v.image[J],!0,r.maxCubemapSize):Se[J]=ie?v.image[J].image:v.image[J],Se[J]=lt(v,Se[J]);const De=Se[0],Ie=s.convert(v.format,v.colorSpace),we=s.convert(v.type),Ye=b(v.internalFormat,Ie,we,v.colorSpace),He=v.isVideoTexture!==!0,st=Z.__version===void 0||j===!0,L=ee.dataReady;let me=R(v,De);ce(n.TEXTURE_CUBE_MAP,v);let q;if(Ke){He&&st&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,De.width,De.height);for(let J=0;J<6;J++){q=Se[J].mipmaps;for(let xe=0;xe<q.length;xe++){const ge=q[xe];v.format!==kt?Ie!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,0,0,ge.width,ge.height,Ie,ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,Ye,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,0,0,ge.width,ge.height,Ie,we,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,Ye,ge.width,ge.height,0,Ie,we,ge.data)}}}else{if(q=v.mipmaps,He&&st){q.length>0&&me++;const J=Ce(Se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,J.width,J.height)}for(let J=0;J<6;J++)if(ie){He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Se[J].width,Se[J].height,Ie,we,Se[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ye,Se[J].width,Se[J].height,0,Ie,we,Se[J].data);for(let xe=0;xe<q.length;xe++){const Fe=q[xe].image[J].image;He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,0,0,Fe.width,Fe.height,Ie,we,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,Ye,Fe.width,Fe.height,0,Ie,we,Fe.data)}}else{He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ie,we,Se[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ye,Ie,we,Se[J]);for(let xe=0;xe<q.length;xe++){const ge=q[xe];He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,0,0,Ie,we,ge.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,Ye,Ie,we,ge.image[J])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),Z.__version=ee.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function he(A,v,O,j,ee,Z){const Te=s.convert(O.format,O.colorSpace),_e=s.convert(O.type),be=b(O.internalFormat,Te,_e,O.colorSpace),Ke=i.get(v),ie=i.get(O);if(ie.__renderTarget=v,!Ke.__hasExternalTextures){const Se=Math.max(1,v.width>>Z),De=Math.max(1,v.height>>Z);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,Z,be,Se,De,v.depth,0,Te,_e,null):t.texImage2D(ee,Z,be,Se,De,0,Te,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,ee,ie.__webglTexture,0,We(v)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,ee,ie.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const j=v.depthTexture,ee=j&&j.isDepthTexture?j.type:null,Z=x(v.stencilBuffer,ee),Te=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=We(v);Xe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,Z,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,Z,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Z,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,A)}else{const j=v.textures;for(let ee=0;ee<j.length;ee++){const Z=j[ee],Te=s.convert(Z.format,Z.colorSpace),_e=s.convert(Z.type),be=b(Z.internalFormat,Te,_e,Z.colorSpace),Ke=We(v);O&&Xe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke,be,v.width,v.height):Xe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke,be,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,be,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Me(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(v.depthTexture);j.__renderTarget=v,(!j.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const ee=j.__webglTexture,Z=We(v);if(v.depthTexture.format===sr)Xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(v.depthTexture.format===pr)Xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ne(A){const v=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const j=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),j){const ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,j.removeEventListener("dispose",ee)};j.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=j}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Me(v.__webglFramebuffer,A)}else if(O){v.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[j]),v.__webglDepthbuffer[j]===void 0)v.__webglDepthbuffer[j]=n.createRenderbuffer(),se(v.__webglDepthbuffer[j],A,!1);else{const ee=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),se(v.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,ee)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(A,v,O){const j=i.get(A);v!==void 0&&he(j.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ne(A)}function dt(A){const v=A.texture,O=i.get(A),j=i.get(v);A.addEventListener("dispose",T);const ee=A.textures,Z=A.isWebGLCubeRenderTarget===!0,Te=ee.length>1;if(Te||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=v.version,a.memory.textures++),Z){O.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[_e]=[];for(let be=0;be<v.mipmaps.length;be++)O.__webglFramebuffer[_e][be]=n.createFramebuffer()}else O.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let _e=0;_e<v.mipmaps.length;_e++)O.__webglFramebuffer[_e]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Te)for(let _e=0,be=ee.length;_e<be;_e++){const Ke=i.get(ee[_e]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Xe(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let _e=0;_e<ee.length;_e++){const be=ee[_e];O.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[_e]);const Ke=s.convert(be.format,be.colorSpace),ie=s.convert(be.type),Se=b(be.internalFormat,Ke,ie,be.colorSpace,A.isXRRenderTarget===!0),De=We(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Se,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,O.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),se(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),ce(n.TEXTURE_CUBE_MAP,v);for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)he(O.__webglFramebuffer[_e][be],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,be);else he(O.__webglFramebuffer[_e],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(v)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let _e=0,be=ee.length;_e<be;_e++){const Ke=ee[_e],ie=i.get(Ke);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),ce(n.TEXTURE_2D,Ke),he(O.__webglFramebuffer,A,Ke,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,0),m(Ke)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,j.__webglTexture),ce(_e,v),v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)he(O.__webglFramebuffer[be],A,v,n.COLOR_ATTACHMENT0,_e,be);else he(O.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,_e,0);m(v)&&d(_e),t.unbindTexture()}A.depthBuffer&&Ne(A)}function $e(A){const v=A.textures;for(let O=0,j=v.length;O<j;O++){const ee=v[O];if(m(ee)){const Z=y(A),Te=i.get(ee).__webglTexture;t.bindTexture(Z,Te),d(Z),t.unbindTexture()}}}const gt=[],U=[];function jt(A){if(A.samples>0){if(Xe(A)===!1){const v=A.textures,O=A.width,j=A.height;let ee=n.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(A),_e=v.length>1;if(_e)for(let be=0;be<v.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let be=0;be<v.length;be++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[be]);const Ke=i.get(v[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ke,0)}n.blitFramebuffer(0,0,O,j,0,0,O,j,ee,n.NEAREST),l===!0&&(gt.length=0,U.length=0,gt.push(n.COLOR_ATTACHMENT0+be),A.depthBuffer&&A.resolveDepthBuffer===!1&&(gt.push(Z),U.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let be=0;be<v.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Te.__webglColorRenderbuffer[be]);const Ke=i.get(v[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,Ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function We(A){return Math.min(r.maxSamples,A.samples)}function Xe(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Pe(A){const v=a.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function lt(A,v){const O=A.colorSpace,j=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Ii&&O!==Qn&&(qe.getTransfer(O)===it?(j!==kt||ee!==sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=H,this.setTexture2D=K,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=Ve,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Xe}function m0(n,e){function t(i,r=Qn){let s;const a=qe.getTransfer(r);if(i===sn)return n.UNSIGNED_BYTE;if(i===Fo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Oo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===cu)return n.BYTE;if(i===uu)return n.SHORT;if(i===zr)return n.UNSIGNED_SHORT;if(i===No)return n.INT;if(i===Ri)return n.UNSIGNED_INT;if(i===kn)return n.FLOAT;if(i===qr)return n.HALF_FLOAT;if(i===hu)return n.ALPHA;if(i===du)return n.RGB;if(i===kt)return n.RGBA;if(i===pu)return n.LUMINANCE;if(i===mu)return n.LUMINANCE_ALPHA;if(i===sr)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===_u)return n.RED;if(i===ko)return n.RED_INTEGER;if(i===gu)return n.RG;if(i===zo)return n.RG_INTEGER;if(i===Ho)return n.RGBA_INTEGER;if(i===Ts||i===Rs||i===Cs||i===Ps)if(a===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ts)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ts)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ps)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===eo||i===to||i===no||i===io)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===eo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===to)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===no)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===io)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ro||i===so||i===ao)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ro||i===so)return a===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ao)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===oo||i===lo||i===co||i===uo||i===fo||i===ho||i===po||i===mo||i===_o||i===go||i===vo||i===xo||i===Mo||i===bo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===oo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===co)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===uo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ho)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===po)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_o)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===go)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ls||i===So||i===wo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ls)return a===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===So)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vu||i===yo||i===Eo||i===Ao)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ls)return s.COMPRESSED_RED_RGTC1_EXT;if(i===yo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Eo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ao)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class _0 extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class nr extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g0={type:"move"};class Ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(g0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new nr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const v0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class M0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Ht,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Tn({vertexShader:v0,fragmentShader:x0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new _r(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b0 extends Ui{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,_=null;const g=new M0,m=t.getContextAttributes();let d=null,y=null;const b=[],x=[],R=new rt;let E=null;const T=new Zt;T.viewport=new vt;const P=new Zt;P.viewport=new vt;const w=[T,P],M=new _0;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=b[Y];return $===void 0&&($=new Ra,b[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=b[Y];return $===void 0&&($=new Ra,b[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=b[Y];return $===void 0&&($=new Ra,b[Y]=$),$.getHandSpace()};function N(Y){const $=x.indexOf(Y.inputSource);if($===-1)return;const he=b[$];he!==void 0&&(he.update(Y.inputSource,Y.frame,c||a),he.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",K);for(let Y=0;Y<b.length;Y++){const $=x[Y];$!==null&&(x[Y]=null,b[Y].disconnect($))}C=null,H=null,g.reset(),e.setRenderTarget(d),p=null,h=null,f=null,r=null,y=null,Le.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",W),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,$),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Ci(p.framebufferWidth,p.framebufferHeight,{format:kt,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,he=null,se=null;m.depth&&(se=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=m.stencil?pr:sr,he=m.stencil?dr:Ri);const Me={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(Me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new Ci(h.textureWidth,h.textureHeight,{format:kt,type:sn,depthTexture:new Du(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Le.setContext(r),Le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(Y){for(let $=0;$<Y.removed.length;$++){const he=Y.removed[$],se=x.indexOf(he);se>=0&&(x[se]=null,b[se].disconnect(he))}for(let $=0;$<Y.added.length;$++){const he=Y.added[$];let se=x.indexOf(he);if(se===-1){for(let Ne=0;Ne<b.length;Ne++)if(Ne>=x.length){x.push(he),se=Ne;break}else if(x[Ne]===null){x[Ne]=he,se=Ne;break}if(se===-1)break}const Me=b[se];Me&&Me.connect(he)}}const z=new F,Q=new F;function G(Y,$,he){z.setFromMatrixPosition($.matrixWorld),Q.setFromMatrixPosition(he.matrixWorld);const se=z.distanceTo(Q),Me=$.projectionMatrix.elements,Ne=he.projectionMatrix.elements,Ve=Me[14]/(Me[10]-1),dt=Me[14]/(Me[10]+1),$e=(Me[9]+1)/Me[5],gt=(Me[9]-1)/Me[5],U=(Me[8]-1)/Me[0],jt=(Ne[8]+1)/Ne[0],We=Ve*U,Xe=Ve*jt,Pe=se/(-U+jt),lt=Pe*-U;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(lt),Y.translateZ(Pe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Me[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Ce=Ve+Pe,A=dt+Pe,v=We-lt,O=Xe+(se-lt),j=$e*dt/A*Ce,ee=gt*dt/A*Ce;Y.projectionMatrix.makePerspective(v,O,j,ee,Ce,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function le(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let $=Y.near,he=Y.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(he=g.depthFar)),M.near=P.near=T.near=$,M.far=P.far=T.far=he,(C!==M.near||H!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,H=M.far),T.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,M.layers.mask=T.layers.mask|P.layers.mask;const se=Y.parent,Me=M.cameras;le(M,se);for(let Ne=0;Ne<Me.length;Ne++)le(Me[Ne],se);Me.length===2?G(M,T,P):M.projectionMatrix.copy(T.projectionMatrix),de(Y,M,se)};function de(Y,$,he){he===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(he.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=To*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let ue=null;function ce(Y,$){if(u=$.getViewerPose(c||a),_=$,u!==null){const he=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let se=!1;he.length!==M.cameras.length&&(M.cameras.length=0,se=!0);for(let Ne=0;Ne<he.length;Ne++){const Ve=he[Ne];let dt=null;if(p!==null)dt=p.getViewport(Ve);else{const gt=f.getViewSubImage(h,Ve);dt=gt.viewport,Ne===0&&(e.setRenderTargetTextures(y,gt.colorTexture,h.ignoreDepthValues?void 0:gt.depthStencilTexture),e.setRenderTarget(y))}let $e=w[Ne];$e===void 0&&($e=new Zt,$e.layers.enable(Ne),$e.viewport=new vt,w[Ne]=$e),$e.matrix.fromArray(Ve.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Ve.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(dt.x,dt.y,dt.width,dt.height),Ne===0&&(M.matrix.copy($e.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),se===!0&&M.cameras.push($e)}const Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")){const Ne=f.getDepthInformation(he[0]);Ne&&Ne.isValid&&Ne.texture&&g.init(e,Ne,r.renderState)}}for(let he=0;he<b.length;he++){const se=x[he],Me=b[he];se!==null&&Me!==void 0&&Me.update(se,$,c||a)}ue&&ue(Y,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),_=null}const Le=new Lu;Le.setAnimationLoop(ce),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}}const _i=new mn,S0=new bt;function w0(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Au(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,y,b,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),_(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),g(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,y,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===zt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===zt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=e.get(d),b=y.envMap,x=y.envMapRotation;b&&(m.envMap.value=b,_i.copy(x),_i.x*=-1,_i.y*=-1,_i.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),m.envMapRotation.value.setFromMatrix4(S0.makeRotationFromEuler(_i)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=b*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===zt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const y=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function y0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){const x=b.program;i.uniformBlockBinding(y,x)}function c(y,b){let x=r[y.id];x===void 0&&(_(y),x=u(y),r[y.id]=x,y.addEventListener("dispose",m));const R=b.program;i.updateUBOMapping(y,R);const E=e.render.frame;s[y.id]!==E&&(h(y),s[y.id]=E)}function u(y){const b=f();y.__bindingPointIndex=b;const x=n.createBuffer(),R=y.__size,E=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,R,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,x),x}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const b=r[y.id],x=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let E=0,T=x.length;E<T;E++){const P=Array.isArray(x[E])?x[E]:[x[E]];for(let w=0,M=P.length;w<M;w++){const C=P[w];if(p(C,E,w,R)===!0){const H=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let K=0;K<N.length;K++){const z=N[K],Q=g(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,H+W,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,b,x,R){const E=y.value,T=b+"_"+x;if(R[T]===void 0)return typeof E=="number"||typeof E=="boolean"?R[T]=E:R[T]=E.clone(),!0;{const P=R[T];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return R[T]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function _(y){const b=y.uniforms;let x=0;const R=16;for(let T=0,P=b.length;T<P;T++){const w=Array.isArray(b[T])?b[T]:[b[T]];for(let M=0,C=w.length;M<C;M++){const H=w[M],N=Array.isArray(H.value)?H.value:[H.value];for(let W=0,K=N.length;W<K;W++){const z=N[W],Q=g(z),G=x%R,le=G%Q.boundary,de=G+le;x+=le,de!==0&&R-de<Q.storage&&(x+=R-de),H.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=Q.storage}}}const E=x%R;return E>0&&(x+=R-E),y.__size=x,y.__cache={},this}function g(y){const b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),b}function m(y){const b=y.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function d(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class E0{constructor(e={}){const{canvas:t=hh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const y=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=en,this.toneMapping=ii,this.toneMappingExposure=1;const x=this;let R=!1,E=0,T=0,P=null,w=-1,M=null;const C=new vt,H=new vt;let N=null;const W=new Je(0);let K=0,z=t.width,Q=t.height,G=1,le=null,de=null;const ue=new vt(0,0,z,Q),ce=new vt(0,0,z,Q);let Le=!1;const Y=new Pu;let $=!1,he=!1;const se=new bt,Me=new bt,Ne=new F,Ve=new vt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function gt(){return P===null?G:1}let U=i;function jt(S,D){return t.getContext(S,D)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uo}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ge,!1),U===null){const D="webgl2";if(U=jt(D,S),U===null)throw jt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let We,Xe,Pe,lt,Ce,A,v,O,j,ee,Z,Te,_e,be,Ke,ie,Se,De,Ie,we,Ye,He,st,L;function me(){We=new Pm(U),We.init(),He=new m0(U,We),Xe=new wm(U,We,e,He),Pe=new h0(U,We),Xe.reverseDepthBuffer&&h&&Pe.buffers.depth.setReversed(!0),lt=new Im(U),Ce=new j_,A=new p0(U,We,Pe,Ce,Xe,He,lt),v=new Em(x),O=new Cm(x),j=new zh(U),st=new bm(U,j),ee=new Lm(U,j,lt,st),Z=new Nm(U,ee,j,lt),Ie=new Um(U,Xe,A),ie=new ym(Ce),Te=new Z_(x,v,O,We,Xe,st,ie),_e=new w0(x,Ce),be=new Q_,Ke=new s0(We),De=new Mm(x,v,O,Pe,Z,p,l),Se=new u0(x,Z,Xe),L=new y0(U,lt,Xe,Pe),we=new Sm(U,We,lt),Ye=new Dm(U,We,lt),lt.programs=Te.programs,x.capabilities=Xe,x.extensions=We,x.properties=Ce,x.renderLists=be,x.shadowMap=Se,x.state=Pe,x.info=lt}me();const q=new b0(x,U);this.xr=q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=We.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=We.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(z,Q,!1))},this.getSize=function(S){return S.set(z,Q)},this.setSize=function(S,D,V=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,Q=D,t.width=Math.floor(S*G),t.height=Math.floor(D*G),V===!0&&(t.style.width=S+"px",t.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(z*G,Q*G).floor()},this.setDrawingBufferSize=function(S,D,V){z=S,Q=D,G=V,t.width=Math.floor(S*V),t.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(ue)},this.setViewport=function(S,D,V,B){S.isVector4?ue.set(S.x,S.y,S.z,S.w):ue.set(S,D,V,B),Pe.viewport(C.copy(ue).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(ce)},this.setScissor=function(S,D,V,B){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,D,V,B),Pe.scissor(H.copy(ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(S){Pe.setScissorTest(Le=S)},this.setOpaqueSort=function(S){le=S},this.setTransparentSort=function(S){de=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(S=!0,D=!0,V=!0){let B=0;if(S){let I=!1;if(P!==null){const re=P.texture.format;I=re===Ho||re===zo||re===ko}if(I){const re=P.texture.type,ve=re===sn||re===Ri||re===zr||re===dr||re===Fo||re===Oo,ye=De.getClearColor(),Ee=De.getClearAlpha(),Ue=ye.r,Oe=ye.g,Ae=ye.b;ve?(_[0]=Ue,_[1]=Oe,_[2]=Ae,_[3]=Ee,U.clearBufferuiv(U.COLOR,0,_)):(g[0]=Ue,g[1]=Oe,g[2]=Ae,g[3]=Ee,U.clearBufferiv(U.COLOR,0,g))}else B|=U.COLOR_BUFFER_BIT}D&&(B|=U.DEPTH_BUFFER_BIT),V&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),be.dispose(),Ke.dispose(),Ce.dispose(),v.dispose(),O.dispose(),Z.dispose(),st.dispose(),L.dispose(),Te.dispose(),q.dispose(),q.removeEventListener("sessionstart",il),q.removeEventListener("sessionend",rl),ui.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const S=lt.autoReset,D=Se.enabled,V=Se.autoUpdate,B=Se.needsUpdate,I=Se.type;me(),lt.autoReset=S,Se.enabled=D,Se.autoUpdate=V,Se.needsUpdate=B,Se.type=I}function ge(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Fe(S){const D=S.target;D.removeEventListener("dispose",Fe),mt(D)}function mt(S){Lt(S),Ce.remove(S)}function Lt(S){const D=Ce.get(S).programs;D!==void 0&&(D.forEach(function(V){Te.releaseProgram(V)}),S.isShaderMaterial&&Te.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,B,I,re){D===null&&(D=dt);const ve=I.isMesh&&I.matrixWorld.determinant()<0,ye=Sf(S,D,V,B,I);Pe.setMaterial(B,ve);let Ee=V.index,Ue=1;if(B.wireframe===!0){if(Ee=ee.getWireframeAttribute(V),Ee===void 0)return;Ue=2}const Oe=V.drawRange,Ae=V.attributes.position;let je=Oe.start*Ue,at=(Oe.start+Oe.count)*Ue;re!==null&&(je=Math.max(je,re.start*Ue),at=Math.min(at,(re.start+re.count)*Ue)),Ee!==null?(je=Math.max(je,0),at=Math.min(at,Ee.count)):Ae!=null&&(je=Math.max(je,0),at=Math.min(at,Ae.count));const ct=at-je;if(ct<0||ct===1/0)return;st.setup(I,B,ye,V,Ee);let Gt,Qe=we;if(Ee!==null&&(Gt=j.get(Ee),Qe=Ye,Qe.setIndex(Gt)),I.isMesh)B.wireframe===!0?(Pe.setLineWidth(B.wireframeLinewidth*gt()),Qe.setMode(U.LINES)):Qe.setMode(U.TRIANGLES);else if(I.isLine){let Re=B.linewidth;Re===void 0&&(Re=1),Pe.setLineWidth(Re*gt()),I.isLineSegments?Qe.setMode(U.LINES):I.isLineLoop?Qe.setMode(U.LINE_LOOP):Qe.setMode(U.LINE_STRIP)}else I.isPoints?Qe.setMode(U.POINTS):I.isSprite&&Qe.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Qe.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))Qe.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Re=I._multiDrawStarts,Pn=I._multiDrawCounts,et=I._multiDrawCount,on=Ee?j.get(Ee).bytesPerElement:1,Ni=Ce.get(B).currentProgram.getUniforms();for(let qt=0;qt<et;qt++)Ni.setValue(U,"_gl_DrawID",qt),Qe.render(Re[qt]/on,Pn[qt])}else if(I.isInstancedMesh)Qe.renderInstances(je,ct,I.count);else if(V.isInstancedBufferGeometry){const Re=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Pn=Math.min(V.instanceCount,Re);Qe.renderInstances(je,ct,Pn)}else Qe.render(je,ct)};function nt(S,D,V){S.transparent===!0&&S.side===tn&&S.forceSinglePass===!1?(S.side=zt,S.needsUpdate=!0,Jr(S,D,V),S.side=oi,S.needsUpdate=!0,Jr(S,D,V),S.side=tn):Jr(S,D,V)}this.compile=function(S,D,V=null){V===null&&(V=S),d=Ke.get(V),d.init(D),b.push(d),V.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),S!==V&&S.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const B=new Set;return S.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const re=I.material;if(re)if(Array.isArray(re))for(let ve=0;ve<re.length;ve++){const ye=re[ve];nt(ye,V,I),B.add(ye)}else nt(re,V,I),B.add(re)}),b.pop(),d=null,B},this.compileAsync=function(S,D,V=null){const B=this.compile(S,D,V);return new Promise(I=>{function re(){if(B.forEach(function(ve){Ce.get(ve).currentProgram.isReady()&&B.delete(ve)}),B.size===0){I(S);return}setTimeout(re,10)}We.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let an=null;function Cn(S){an&&an(S)}function il(){ui.stop()}function rl(){ui.start()}const ui=new Lu;ui.setAnimationLoop(Cn),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(S){an=S,q.setAnimationLoop(S),S===null?ui.stop():ui.start()},q.addEventListener("sessionstart",il),q.addEventListener("sessionend",rl),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(D),D=q.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,D,P),d=Ke.get(S,b.length),d.init(D),b.push(d),Me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Y.setFromProjectionMatrix(Me),he=this.localClippingEnabled,$=ie.init(this.clippingPlanes,he),m=be.get(S,y.length),m.init(),y.push(m),q.enabled===!0&&q.isPresenting===!0){const re=x.xr.getDepthSensingMesh();re!==null&&Js(re,D,-1/0,x.sortObjects)}Js(S,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(le,de),$e=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,$e&&De.addToRenderList(m,S),this.info.render.frame++,$===!0&&ie.beginShadows();const V=d.state.shadowsArray;Se.render(V,S,D),$===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,I=m.transmissive;if(d.setupLights(),D.isArrayCamera){const re=D.cameras;if(I.length>0)for(let ve=0,ye=re.length;ve<ye;ve++){const Ee=re[ve];al(B,I,S,Ee)}$e&&De.render(S);for(let ve=0,ye=re.length;ve<ye;ve++){const Ee=re[ve];sl(m,S,Ee,Ee.viewport)}}else I.length>0&&al(B,I,S,D),$e&&De.render(S),sl(m,S,D);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,D),st.resetDefaultState(),w=-1,M=null,b.pop(),b.length>0?(d=b[b.length-1],$===!0&&ie.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Js(S,D,V,B){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){B&&Ve.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Me);const ve=Z.update(S),ye=S.material;ye.visible&&m.push(S,ve,ye,V,Ve.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const ve=Z.update(S),ye=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ve.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ve.copy(ve.boundingSphere.center)),Ve.applyMatrix4(S.matrixWorld).applyMatrix4(Me)),Array.isArray(ye)){const Ee=ve.groups;for(let Ue=0,Oe=Ee.length;Ue<Oe;Ue++){const Ae=Ee[Ue],je=ye[Ae.materialIndex];je&&je.visible&&m.push(S,ve,je,V,Ve.z,Ae)}}else ye.visible&&m.push(S,ve,ye,V,Ve.z,null)}}const re=S.children;for(let ve=0,ye=re.length;ve<ye;ve++)Js(re[ve],D,V,B)}function sl(S,D,V,B){const I=S.opaque,re=S.transmissive,ve=S.transparent;d.setupLightsView(V),$===!0&&ie.setGlobalState(x.clippingPlanes,V),B&&Pe.viewport(C.copy(B)),I.length>0&&jr(I,D,V),re.length>0&&jr(re,D,V),ve.length>0&&jr(ve,D,V),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function al(S,D,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Ci(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?qr:sn,minFilter:Ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const re=d.state.transmissionRenderTarget[B.id],ve=B.viewport||C;re.setSize(ve.z,ve.w);const ye=x.getRenderTarget();x.setRenderTarget(re),x.getClearColor(W),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),$e&&De.render(V);const Ee=x.toneMapping;x.toneMapping=ii;const Ue=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),$===!0&&ie.setGlobalState(x.clippingPlanes,B),jr(S,V,B),A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re),We.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Ae=0,je=D.length;Ae<je;Ae++){const at=D[Ae],ct=at.object,Gt=at.geometry,Qe=at.material,Re=at.group;if(Qe.side===tn&&ct.layers.test(B.layers)){const Pn=Qe.side;Qe.side=zt,Qe.needsUpdate=!0,ol(ct,V,B,Gt,Qe,Re),Qe.side=Pn,Qe.needsUpdate=!0,Oe=!0}}Oe===!0&&(A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re))}x.setRenderTarget(ye),x.setClearColor(W,K),Ue!==void 0&&(B.viewport=Ue),x.toneMapping=Ee}function jr(S,D,V){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,re=S.length;I<re;I++){const ve=S[I],ye=ve.object,Ee=ve.geometry,Ue=B===null?ve.material:B,Oe=ve.group;ye.layers.test(V.layers)&&ol(ye,D,V,Ee,Ue,Oe)}}function ol(S,D,V,B,I,re){S.onBeforeRender(x,D,V,B,I,re),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(x,D,V,B,S,re),I.transparent===!0&&I.side===tn&&I.forceSinglePass===!1?(I.side=zt,I.needsUpdate=!0,x.renderBufferDirect(V,D,B,I,S,re),I.side=oi,I.needsUpdate=!0,x.renderBufferDirect(V,D,B,I,S,re),I.side=tn):x.renderBufferDirect(V,D,B,I,S,re),S.onAfterRender(x,D,V,B,I,re)}function Jr(S,D,V){D.isScene!==!0&&(D=dt);const B=Ce.get(S),I=d.state.lights,re=d.state.shadowsArray,ve=I.state.version,ye=Te.getParameters(S,I.state,re,D,V),Ee=Te.getProgramCacheKey(ye);let Ue=B.programs;B.environment=S.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(S.isMeshStandardMaterial?O:v).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",Fe),Ue=new Map,B.programs=Ue);let Oe=Ue.get(Ee);if(Oe!==void 0){if(B.currentProgram===Oe&&B.lightsStateVersion===ve)return cl(S,ye),Oe}else ye.uniforms=Te.getUniforms(S),S.onBeforeCompile(ye,x),Oe=Te.acquireProgram(ye,Ee),Ue.set(Ee,Oe),B.uniforms=ye.uniforms;const Ae=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=ie.uniform),cl(S,ye),B.needsLights=yf(S),B.lightsStateVersion=ve,B.needsLights&&(Ae.ambientLightColor.value=I.state.ambient,Ae.lightProbe.value=I.state.probe,Ae.directionalLights.value=I.state.directional,Ae.directionalLightShadows.value=I.state.directionalShadow,Ae.spotLights.value=I.state.spot,Ae.spotLightShadows.value=I.state.spotShadow,Ae.rectAreaLights.value=I.state.rectArea,Ae.ltc_1.value=I.state.rectAreaLTC1,Ae.ltc_2.value=I.state.rectAreaLTC2,Ae.pointLights.value=I.state.point,Ae.pointLightShadows.value=I.state.pointShadow,Ae.hemisphereLights.value=I.state.hemi,Ae.directionalShadowMap.value=I.state.directionalShadowMap,Ae.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ae.spotShadowMap.value=I.state.spotShadowMap,Ae.spotLightMatrix.value=I.state.spotLightMatrix,Ae.spotLightMap.value=I.state.spotLightMap,Ae.pointShadowMap.value=I.state.pointShadowMap,Ae.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Oe,B.uniformsList=null,Oe}function ll(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=Ds.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function cl(S,D){const V=Ce.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Sf(S,D,V,B,I){D.isScene!==!0&&(D=dt),A.resetTextureUnits();const re=D.fog,ve=B.isMeshStandardMaterial?D.environment:null,ye=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ii,Ee=(B.isMeshStandardMaterial?O:v).get(B.envMap||ve),Ue=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Oe=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ae=!!V.morphAttributes.position,je=!!V.morphAttributes.normal,at=!!V.morphAttributes.color;let ct=ii;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ct=x.toneMapping);const Gt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qe=Gt!==void 0?Gt.length:0,Re=Ce.get(B),Pn=d.state.lights;if($===!0&&(he===!0||S!==M)){const Jt=S===M&&B.id===w;ie.setState(B,S,Jt)}let et=!1;B.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Pn.state.version||Re.outputColorSpace!==ye||I.isBatchedMesh&&Re.batching===!1||!I.isBatchedMesh&&Re.batching===!0||I.isBatchedMesh&&Re.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Re.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Re.instancing===!1||!I.isInstancedMesh&&Re.instancing===!0||I.isSkinnedMesh&&Re.skinning===!1||!I.isSkinnedMesh&&Re.skinning===!0||I.isInstancedMesh&&Re.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Re.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Re.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Re.instancingMorph===!1&&I.morphTexture!==null||Re.envMap!==Ee||B.fog===!0&&Re.fog!==re||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ie.numPlanes||Re.numIntersection!==ie.numIntersection)||Re.vertexAlphas!==Ue||Re.vertexTangents!==Oe||Re.morphTargets!==Ae||Re.morphNormals!==je||Re.morphColors!==at||Re.toneMapping!==ct||Re.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Re.__version=B.version);let on=Re.currentProgram;et===!0&&(on=Jr(B,D,I));let Ni=!1,qt=!1,wr=!1;const ut=on.getUniforms(),vn=Re.uniforms;if(Pe.useProgram(on.program)&&(Ni=!0,qt=!0,wr=!0),B.id!==w&&(w=B.id,qt=!0),Ni||M!==S){Pe.buffers.depth.getReversed()?(se.copy(S.projectionMatrix),ph(se),mh(se),ut.setValue(U,"projectionMatrix",se)):ut.setValue(U,"projectionMatrix",S.projectionMatrix),ut.setValue(U,"viewMatrix",S.matrixWorldInverse);const Bn=ut.map.cameraPosition;Bn!==void 0&&Bn.setValue(U,Ne.setFromMatrixPosition(S.matrixWorld)),Xe.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ut.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,qt=!0,wr=!0)}if(I.isSkinnedMesh){ut.setOptional(U,I,"bindMatrix"),ut.setOptional(U,I,"bindMatrixInverse");const Jt=I.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),ut.setValue(U,"boneTexture",Jt.boneTexture,A))}I.isBatchedMesh&&(ut.setOptional(U,I,"batchingTexture"),ut.setValue(U,"batchingTexture",I._matricesTexture,A),ut.setOptional(U,I,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",I._indirectTexture,A),ut.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",I._colorsTexture,A));const yr=V.morphAttributes;if((yr.position!==void 0||yr.normal!==void 0||yr.color!==void 0)&&Ie.update(I,V,on),(qt||Re.receiveShadow!==I.receiveShadow)&&(Re.receiveShadow=I.receiveShadow,ut.setValue(U,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(vn.envMap.value=Ee,vn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(vn.envMapIntensity.value=D.environmentIntensity),qt&&(ut.setValue(U,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&wf(vn,wr),re&&B.fog===!0&&_e.refreshFogUniforms(vn,re),_e.refreshMaterialUniforms(vn,B,G,Q,d.state.transmissionRenderTarget[S.id]),Ds.upload(U,ll(Re),vn,A)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ds.upload(U,ll(Re),vn,A),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ut.setValue(U,"center",I.center),ut.setValue(U,"modelViewMatrix",I.modelViewMatrix),ut.setValue(U,"normalMatrix",I.normalMatrix),ut.setValue(U,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Jt=B.uniformsGroups;for(let Bn=0,Wn=Jt.length;Bn<Wn;Bn++){const ul=Jt[Bn];L.update(ul,on),L.bind(ul,on)}}return on}function wf(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function yf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,D,V){Ce.get(S.texture).__webglTexture=D,Ce.get(S.depthTexture).__webglTexture=V;const B=Ce.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=V===void 0,B.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,D){const V=Ce.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){P=S,E=D,T=V;let B=!0,I=null,re=!1,ve=!1;if(S){const Ee=Ce.get(S);if(Ee.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(U.FRAMEBUFFER,null),B=!1;else if(Ee.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(Ee.__hasExternalTextures)A.rebindTextures(S,Ce.get(S.texture).__webglTexture,Ce.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ae=S.depthTexture;if(Ee.__boundDepthTexture!==Ae){if(Ae!==null&&Ce.has(Ae)&&(S.width!==Ae.image.width||S.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ve=!0);const Oe=Ce.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Oe[D])?I=Oe[D][V]:I=Oe[D],re=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?I=Ce.get(S).__webglMultisampledFramebuffer:Array.isArray(Oe)?I=Oe[V]:I=Oe,C.copy(S.viewport),H.copy(S.scissor),N=S.scissorTest}else C.copy(ue).multiplyScalar(G).floor(),H.copy(ce).multiplyScalar(G).floor(),N=Le;if(Pe.bindFramebuffer(U.FRAMEBUFFER,I)&&B&&Pe.drawBuffers(S,I),Pe.viewport(C),Pe.scissor(H),Pe.setScissorTest(N),re){const Ee=Ce.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ee.__webglTexture,V)}else if(ve){const Ee=Ce.get(S.texture),Ue=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.__webglTexture,V||0,Ue)}w=-1},this.readRenderTargetPixels=function(S,D,V,B,I,re,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){Pe.bindFramebuffer(U.FRAMEBUFFER,ye);try{const Ee=S.texture,Ue=Ee.format,Oe=Ee.type;if(!Xe.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-B&&V>=0&&V<=S.height-I&&U.readPixels(D,V,B,I,He.convert(Ue),He.convert(Oe),re)}finally{const Ee=P!==null?Ce.get(P).__webglFramebuffer:null;Pe.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,B,I,re,ve){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){const Ee=S.texture,Ue=Ee.format,Oe=Ee.type;if(!Xe.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=S.width-B&&V>=0&&V<=S.height-I){Pe.bindFramebuffer(U.FRAMEBUFFER,ye);const Ae=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ae),U.bufferData(U.PIXEL_PACK_BUFFER,re.byteLength,U.STREAM_READ),U.readPixels(D,V,B,I,He.convert(Ue),He.convert(Oe),0);const je=P!==null?Ce.get(P).__webglFramebuffer:null;Pe.bindFramebuffer(U.FRAMEBUFFER,je);const at=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await dh(U,at,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ae),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,re),U.deleteBuffer(Ae),U.deleteSync(at),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,D=null,V=0){S.isTexture!==!0&&(Or("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,S=arguments[1]);const B=Math.pow(2,-V),I=Math.floor(S.image.width*B),re=Math.floor(S.image.height*B),ve=D!==null?D.x:0,ye=D!==null?D.y:0;A.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,ve,ye,I,re),Pe.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,B=null,I=0){S.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],D=arguments[2],I=arguments[3]||0,V=null);let re,ve,ye,Ee,Ue,Oe,Ae,je,at;const ct=S.isCompressedTexture?S.mipmaps[I]:S.image;V!==null?(re=V.max.x-V.min.x,ve=V.max.y-V.min.y,ye=V.isBox3?V.max.z-V.min.z:1,Ee=V.min.x,Ue=V.min.y,Oe=V.isBox3?V.min.z:0):(re=ct.width,ve=ct.height,ye=ct.depth||1,Ee=0,Ue=0,Oe=0),B!==null?(Ae=B.x,je=B.y,at=B.z):(Ae=0,je=0,at=0);const Gt=He.convert(D.format),Qe=He.convert(D.type);let Re;D.isData3DTexture?(A.setTexture3D(D,0),Re=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(A.setTexture2DArray(D,0),Re=U.TEXTURE_2D_ARRAY):(A.setTexture2D(D,0),Re=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Pn=U.getParameter(U.UNPACK_ROW_LENGTH),et=U.getParameter(U.UNPACK_IMAGE_HEIGHT),on=U.getParameter(U.UNPACK_SKIP_PIXELS),Ni=U.getParameter(U.UNPACK_SKIP_ROWS),qt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ct.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ct.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ue),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Oe);const wr=S.isDataArrayTexture||S.isData3DTexture,ut=D.isDataArrayTexture||D.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const vn=Ce.get(S),yr=Ce.get(D),Jt=Ce.get(vn.__renderTarget),Bn=Ce.get(yr.__renderTarget);Pe.bindFramebuffer(U.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let Wn=0;Wn<ye;Wn++)wr&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ce.get(S).__webglTexture,I,Oe+Wn),S.isDepthTexture?(ut&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ce.get(D).__webglTexture,I,at+Wn),U.blitFramebuffer(Ee,Ue,re,ve,Ae,je,re,ve,U.DEPTH_BUFFER_BIT,U.NEAREST)):ut?U.copyTexSubImage3D(Re,I,Ae,je,at+Wn,Ee,Ue,re,ve):U.copyTexSubImage2D(Re,I,Ae,je,at+Wn,Ee,Ue,re,ve);Pe.bindFramebuffer(U.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ut?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Re,I,Ae,je,at,re,ve,ye,Gt,Qe,ct.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Re,I,Ae,je,at,re,ve,ye,Gt,ct.data):U.texSubImage3D(Re,I,Ae,je,at,re,ve,ye,Gt,Qe,ct):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,I,Ae,je,re,ve,Gt,Qe,ct.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,I,Ae,je,ct.width,ct.height,Gt,ct.data):U.texSubImage2D(U.TEXTURE_2D,I,Ae,je,re,ve,Gt,Qe,ct);U.pixelStorei(U.UNPACK_ROW_LENGTH,Pn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,et),U.pixelStorei(U.UNPACK_SKIP_PIXELS,on),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ni),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qt),I===0&&D.generateMipmaps&&U.generateMipmap(Re),Pe.unbindTexture()},this.copyTextureToTexture3D=function(S,D,V=null,B=null,I=0){return S.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,B=arguments[1]||null,S=arguments[2],D=arguments[3],I=arguments[4]||0),Or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,D,V,B,I)},this.initRenderTarget=function(S){Ce.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),Pe.unbindTexture()},this.resetState=function(){E=0,T=0,P=null,Pe.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class Bo{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=i}clone(){return new Bo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ou extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Wo extends Ht{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Nt,u=Nt,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xo extends _n{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new F,h=new F,p=[],_=[],g=[],m=[];for(let d=0;d<=i;d++){const y=[],b=d/i;let x=0;d===0&&a===0?x=.5/t:d===i&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const E=R/t;f.x=-e*Math.cos(r+E*s)*Math.sin(a+b*o),f.y=e*Math.cos(a+b*o),f.z=e*Math.sin(r+E*s)*Math.sin(a+b*o),_.push(f.x,f.y,f.z),h.copy(f).normalize(),g.push(h.x,h.y,h.z),m.push(E+x,1-b),y.push(c++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<t;y++){const b=u[d][y+1],x=u[d][y],R=u[d+1][y],E=u[d+1][y+1];(d!==0||a>0)&&p.push(b,x,E),(d!==i-1||l<Math.PI)&&p.push(x,R,E)}this.setIndex(p),this.setAttribute("position",new An(_,3)),this.setAttribute("normal",new An(g,3)),this.setAttribute("uv",new An(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class A0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=cc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=cc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function cc(){return performance.now()}class T0 extends Ui{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);const Zi=new mn(0,0,0,"YXZ"),ji=new F,R0={type:"change"},C0={type:"lock"},P0={type:"unlock"},uc=Math.PI/2;class L0 extends T0{constructor(e,t=null){super(e,t),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=D0.bind(this),this._onPointerlockChange=I0.bind(this),this._onPointerlockError=U0.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const t=this.object;ji.setFromMatrixColumn(t.matrix,0),ji.crossVectors(t.up,ji),t.position.addScaledVector(ji,e)}moveRight(e){if(this.enabled===!1)return;const t=this.object;ji.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(ji,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function D0(n){if(this.enabled===!1||this.isLocked===!1)return;const e=n.movementX||n.mozMovementX||n.webkitMovementX||0,t=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.object;Zi.setFromQuaternion(i.quaternion),Zi.y-=e*.002*this.pointerSpeed,Zi.x-=t*.002*this.pointerSpeed,Zi.x=Math.max(uc-this.maxPolarAngle,Math.min(uc-this.minPolarAngle,Zi.x)),i.quaternion.setFromEuler(Zi),this.dispatchEvent(R0)}function I0(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(C0),this.isLocked=!0):(this.dispatchEvent(P0),this.isLocked=!1)}function U0(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const ke={TICK:.05,WALK_SPEED:.1,SPRINT_MULTIPLIER:1.3,SNEAK_MULTIPLIER:.3,AIR_SPEED:.02,AIR_SPRINT_SPEED:.026,FLY_SPEED:.05,BLOCK_FRICTION:.6,AIR_FRICTION:.91,GRAVITY:.08,VERTICAL_DRAG:.98,FLY_VERTICAL_DRAG:.6,JUMP_POWER:.42,SPRINT_JUMP_BOOST:.2,JUMP_DELAY:10,WATER_SPEED:.02,WATER_DRAG:.8,WATER_SPRINT_DRAG:.9,WATER_JUMP:.04,WATER_JUMP_THRESHOLD:.4,STEP_HEIGHT:.6,MIN_VELOCITY:.003},ku={standing:{width:.6,height:1.8,eye:1.62},crouching:{width:.6,height:1.5,eye:1.27}};class N0{pos={x:.5,y:120,z:.5};prevPos={x:.5,y:120,z:.5};velocity={x:0,y:0,z:0};onGround=!1;horizontalCollision=!1;flying=!1;sprinting=!1;pose="standing";noJumpDelay=0;waterHeight=0;lavaHeight=0;underWater=!1;underLava=!1;walkDist=0;prevWalkDist=0;bob=0;prevBob=0;get body(){return ku[this.pose]}get inWater(){return this.waterHeight>0}get inLava(){return this.lavaHeight>0}get speedAttribute(){return ke.WALK_SPEED*(this.sprinting?ke.SPRINT_MULTIPLIER:1)}get state(){if(this.flying)return this.sprinting?"飞行（疾跑）":"飞行";const e=[];return this.inWater&&e.push(this.underWater?"水下":"水中"),this.inLava&&e.push("岩浆中"),this.pose==="crouching"?e.push("潜行"):this.sprinting?e.push("疾跑"):e.push("行走"),e.join(" · ")}}const F0=["air","void_air","cave_air"],O0=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],k0=["sand","red_sand","suspicious_sand"],z0=["snow","snow_block","powder_snow"],H0=["ice","packed_ice","blue_ice","frosted_ice"],G0=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves"],V0=["dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],B0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","sunflower","lilac","peony","rose_bush","pitcher_plant","flowering_azalea_leaves","flowering_azalea","mangrove_propagule","cherry_leaves","pink_petals","chorus_flower","spore_blossom"],W0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom"],X0=["stone","granite","diorite","andesite","tuff","deepslate"],Y0=["netherrack","basalt","blackstone"],q0=["stone","granite","diorite","andesite"],$0=["deepslate","tuff"],K0=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault"],Z0=["air","water","lava","short_grass","fern","dead_bush","seagrass","tall_seagrass","fire","soul_fire","snow","vine","glow_lichen","resin_clump","light","tall_grass","large_fern","structure_void","void_air","cave_air","bubble_column","warped_roots","nether_sprouts","crimson_roots","hanging_roots"],j0=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","pale_moss_carpet","short_grass","fern","dead_bush","vine","glow_lichen","sunflower","lilac","rose_bush","peony","tall_grass","large_fern","hanging_roots","pitcher_plant","water","seagrass","tall_seagrass","warped_roots","nether_sprouts","crimson_roots"],J0=["mud","muddy_mangrove_roots","mangrove_roots","mangrove_leaves","mangrove_log","mangrove_propagule","moss_carpet","vine"],Q0=["mud","muddy_mangrove_roots","mangrove_roots","moss_carpet","vine","mangrove_propagule","snow"],eg=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","snow_block","powder_snow"],tg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","red_sand","clay","gravel","sand","snow_block","powder_snow"],ng=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","clay","gravel","sand"],ig=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],rg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_ore","deepslate_iron_ore","copper_ore","deepslate_copper_ore","snow","snow_block","powder_snow","water","gravel","suspicious_gravel","sandstone","red_sandstone","calcite","packed_ice","raw_iron_block","raw_copper_block"],sg=["ice","packed_ice","barrier"],ag=["honey_block","soul_sand","mud"],og=["bedrock","water","lava","ice","packed_ice","blue_ice"],lg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone"],cg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone","deepslate_bricks","deepslate_tiles","cobbled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","polished_deepslate"],ug=["stone","granite","diorite","andesite","tuff","deepslate"],fg=["tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block"],hg=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral","tube_coral_fan","brain_coral_fan","bubble_coral_fan","fire_coral_fan","horn_coral_fan"],dg=["tube_coral_wall_fan","brain_coral_wall_fan","bubble_coral_wall_fan","fire_coral_wall_fan","horn_coral_wall_fan"],pg=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral"],mg=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault","jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],_g=["clay","moss_block"],gg=["clay","moss_block","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","pale_moss_block","mud","muddy_mangrove_roots","farmland"],vg=["sand","red_sand","suspicious_sand","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","bamboo","bamboo_sapling","gravel","suspicious_gravel"],xg=["sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Mg=["mycelium","podzol","crimson_nylium","warped_nylium"],bg=["terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta"],Sg=["grass_block","mud","mangrove_roots","muddy_mangrove_roots"],wg=["stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks"],yg=["white_wool","orange_wool","magenta_wool","light_blue_wool","yellow_wool","lime_wool","pink_wool","gray_wool","light_gray_wool","cyan_wool","purple_wool","blue_wool","brown_wool","green_wool","red_wool","black_wool"],Eg=["white_carpet","orange_carpet","magenta_carpet","light_blue_carpet","yellow_carpet","lime_carpet","pink_carpet","gray_carpet","light_gray_carpet","cyan_carpet","purple_carpet","blue_carpet","brown_carpet","green_carpet","red_carpet","black_carpet"],Ag=["stone","granite","diorite","andesite","tuff","deepslate","netherrack","basalt","blackstone","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","crimson_nylium","warped_nylium","nether_wart_block","warped_wart_block","soul_sand","soul_soil"],Tg=["crimson_nylium","warped_nylium"],Rg=["nether_wart_block","warped_wart_block"],Cg=["soul_sand","soul_soil"],Pg=["netherrack","magma_block"],Lg=["fire","soul_fire"],Dg={air:F0,dirt:O0,sand:k0,snow:z0,ice:H0,leaves:G0,logs:V0,flowers:B0,small_flowers:W0,base_stone_overworld:X0,base_stone_nether:Y0,stone_ore_replaceables:q0,deepslate_ore_replaceables:$0,features_cannot_replace:K0,replaceable:Z0,replaceable_by_trees:j0,mangrove_logs_can_grow_through:J0,mangrove_roots_can_grow_through:Q0,azalea_grows_on:eg,azalea_root_replaceable:tg,lush_ground_replaceable:ng,moss_replaceable:ig,overworld_carver_replaceables:rg,snow_layer_cannot_survive_on:sg,snow_layer_can_survive_on:ag,geode_invalid_blocks:og,sculk_replaceable:lg,sculk_replaceable_world_gen:cg,dripstone_replaceable_blocks:ug,coral_blocks:fg,corals:hg,wall_corals:dg,coral_plants:pg,lava_pool_stone_cannot_replace:mg,small_dripleaf_placeable:_g,big_dripleaf_placeable:gg,bamboo_plantable_on:vg,dead_bush_may_place_on:xg,mushroom_grow_block:Mg,terracotta:bg,"mineable/pickaxe":["stone","granite","polished_granite","diorite","polished_diorite","andesite","polished_andesite","cobblestone","gold_ore","deepslate_gold_ore","iron_ore","deepslate_iron_ore","coal_ore","deepslate_coal_ore","nether_gold_ore","lapis_ore","deepslate_lapis_ore","lapis_block","dispenser","sandstone","chiseled_sandstone","cut_sandstone","gold_block","iron_block","bricks","mossy_cobblestone","obsidian","spawner","diamond_ore","deepslate_diamond_ore","diamond_block","furnace","cobblestone_stairs","stone_pressure_plate","iron_door","redstone_ore","deepslate_redstone_ore","netherrack","basalt","polished_basalt","stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks","iron_bars","chain","brick_stairs","stone_brick_stairs","nether_bricks","nether_brick_fence","nether_brick_stairs","enchanting_table","brewing_stand","end_stone","sandstone_stairs","emerald_ore","deepslate_emerald_ore","ender_chest","emerald_block","light_weighted_pressure_plate","heavy_weighted_pressure_plate","redstone_block","nether_quartz_ore","hopper","quartz_block","chiseled_quartz_block","quartz_pillar","quartz_stairs","dropper","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_trapdoor","prismarine","prismarine_bricks","dark_prismarine","prismarine_stairs","prismarine_brick_stairs","dark_prismarine_stairs","prismarine_slab","prismarine_brick_slab","dark_prismarine_slab","terracotta","coal_block","red_sandstone","chiseled_red_sandstone","cut_red_sandstone","red_sandstone_stairs","stone_slab","smooth_stone_slab","sandstone_slab","cut_sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","red_sandstone_slab","cut_red_sandstone_slab","purpur_slab","smooth_stone","smooth_sandstone","smooth_quartz","smooth_red_sandstone","purpur_block","purpur_pillar","purpur_stairs","end_stone_bricks","magma_block","red_nether_bricks","bone_block","observer","white_glazed_terracotta","orange_glazed_terracotta","magenta_glazed_terracotta","light_blue_glazed_terracotta","yellow_glazed_terracotta","lime_glazed_terracotta","pink_glazed_terracotta","gray_glazed_terracotta","light_gray_glazed_terracotta","cyan_glazed_terracotta","purple_glazed_terracotta","blue_glazed_terracotta","brown_glazed_terracotta","green_glazed_terracotta","red_glazed_terracotta","black_glazed_terracotta","white_concrete","orange_concrete","magenta_concrete","light_blue_concrete","yellow_concrete","lime_concrete","pink_concrete","gray_concrete","light_gray_concrete","cyan_concrete","purple_concrete","blue_concrete","brown_concrete","green_concrete","red_concrete","black_concrete","dead_tube_coral_block","dead_brain_coral_block","dead_bubble_coral_block","dead_fire_coral_block","dead_horn_coral_block","tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block","dead_tube_coral","dead_brain_coral","dead_bubble_coral","dead_fire_coral","dead_horn_coral","dead_tube_coral_fan","dead_brain_coral_fan","dead_bubble_coral_fan","dead_fire_coral_fan","dead_horn_coral_fan","dead_tube_coral_wall_fan","dead_brain_coral_wall_fan","dead_bubble_coral_wall_fan","dead_fire_coral_wall_fan","dead_horn_coral_wall_fan","polished_granite_stairs","smooth_red_sandstone_stairs","mossy_stone_brick_stairs","polished_diorite_stairs","mossy_cobblestone_stairs","end_stone_brick_stairs","stone_stairs","smooth_sandstone_stairs","smooth_quartz_stairs","granite_stairs","andesite_stairs","red_nether_brick_stairs","polished_andesite_stairs","diorite_stairs","polished_granite_slab","smooth_red_sandstone_slab","mossy_stone_brick_slab","polished_diorite_slab","mossy_cobblestone_slab","end_stone_brick_slab","smooth_sandstone_slab","smooth_quartz_slab","granite_slab","andesite_slab","red_nether_brick_slab","polished_andesite_slab","diorite_slab","smoker","blast_furnace","grindstone","stonecutter","bell","lantern","soul_lantern","warped_nylium","crimson_nylium","netherite_block","ancient_debris","crying_obsidian","respawn_anchor","lodestone","blackstone","blackstone_stairs","blackstone_slab","polished_blackstone","polished_blackstone_bricks","cracked_polished_blackstone_bricks","chiseled_polished_blackstone","polished_blackstone_brick_slab","polished_blackstone_brick_stairs","gilded_blackstone","polished_blackstone_stairs","polished_blackstone_slab","polished_blackstone_pressure_plate","chiseled_nether_bricks","cracked_nether_bricks","quartz_bricks","tuff","calcite","oxidized_copper","weathered_copper","exposed_copper","copper_block","copper_ore","deepslate_copper_ore","oxidized_cut_copper","weathered_cut_copper","exposed_cut_copper","cut_copper","oxidized_cut_copper_stairs","weathered_cut_copper_stairs","exposed_cut_copper_stairs","cut_copper_stairs","oxidized_cut_copper_slab","weathered_cut_copper_slab","exposed_cut_copper_slab","cut_copper_slab","waxed_copper_block","waxed_weathered_copper","waxed_exposed_copper","waxed_oxidized_copper","waxed_oxidized_cut_copper","waxed_weathered_cut_copper","waxed_exposed_cut_copper","waxed_cut_copper","waxed_oxidized_cut_copper_stairs","waxed_weathered_cut_copper_stairs","waxed_exposed_cut_copper_stairs","waxed_cut_copper_stairs","waxed_oxidized_cut_copper_slab","waxed_weathered_cut_copper_slab","waxed_exposed_cut_copper_slab","waxed_cut_copper_slab","lightning_rod","pointed_dripstone","dripstone_block","deepslate","cobbled_deepslate","cobbled_deepslate_stairs","cobbled_deepslate_slab","polished_deepslate","polished_deepslate_stairs","polished_deepslate_slab","deepslate_tiles","deepslate_tile_stairs","deepslate_tile_slab","deepslate_bricks","deepslate_brick_stairs","deepslate_brick_slab","chiseled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","smooth_basalt","raw_iron_block","raw_copper_block","raw_gold_block","ice","packed_ice","blue_ice","piston","sticky_piston","piston_head","amethyst_cluster","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_block","budding_amethyst","infested_cobblestone","infested_chiseled_stone_bricks","infested_cracked_stone_bricks","infested_deepslate","infested_stone","infested_mossy_stone_bricks","infested_stone_bricks","stone_button","polished_blackstone_button","cobblestone_wall","mossy_cobblestone_wall","brick_wall","prismarine_wall","red_sandstone_wall","mossy_stone_brick_wall","granite_wall","stone_brick_wall","nether_brick_wall","andesite_wall","red_nether_brick_wall","sandstone_wall","end_stone_brick_wall","diorite_wall","blackstone_wall","polished_blackstone_brick_wall","polished_blackstone_wall","cobbled_deepslate_wall","polished_deepslate_wall","deepslate_tile_wall","deepslate_brick_wall","mud_brick_wall","tuff_wall","polished_tuff_wall","tuff_brick_wall","resin_brick_wall","shulker_box","black_shulker_box","blue_shulker_box","brown_shulker_box","cyan_shulker_box","gray_shulker_box","green_shulker_box","light_blue_shulker_box","light_gray_shulker_box","lime_shulker_box","magenta_shulker_box","orange_shulker_box","pink_shulker_box","purple_shulker_box","red_shulker_box","white_shulker_box","yellow_shulker_box","anvil","chipped_anvil","damaged_anvil","cauldron","water_cauldron","lava_cauldron","powder_snow_cauldron","rail","powered_rail","detector_rail","activator_rail","conduit","mud_bricks","mud_brick_stairs","mud_brick_slab","packed_mud","crafter","tuff_slab","tuff_stairs","chiseled_tuff","polished_tuff","polished_tuff_slab","polished_tuff_stairs","tuff_bricks","tuff_brick_slab","tuff_brick_stairs","chiseled_tuff_bricks","chiseled_copper","exposed_chiseled_copper","weathered_chiseled_copper","oxidized_chiseled_copper","waxed_chiseled_copper","waxed_exposed_chiseled_copper","waxed_weathered_chiseled_copper","waxed_oxidized_chiseled_copper","copper_grate","exposed_copper_grate","weathered_copper_grate","oxidized_copper_grate","waxed_copper_grate","waxed_exposed_copper_grate","waxed_weathered_copper_grate","waxed_oxidized_copper_grate","copper_bulb","exposed_copper_bulb","weathered_copper_bulb","oxidized_copper_bulb","waxed_copper_bulb","waxed_exposed_copper_bulb","waxed_weathered_copper_bulb","waxed_oxidized_copper_bulb","copper_door","exposed_copper_door","weathered_copper_door","oxidized_copper_door","waxed_copper_door","waxed_exposed_copper_door","waxed_weathered_copper_door","waxed_oxidized_copper_door","copper_trapdoor","exposed_copper_trapdoor","weathered_copper_trapdoor","oxidized_copper_trapdoor","waxed_copper_trapdoor","waxed_exposed_copper_trapdoor","waxed_weathered_copper_trapdoor","waxed_oxidized_copper_trapdoor","heavy_core","resin_bricks","resin_brick_slab","resin_brick_stairs","chiseled_resin_bricks"],frogs_spawnable_on:Sg,stone_bricks:wg,wool:yg,wool_carpets:Eg,nether_carver_replaceables:Ag,nylium:Tg,wart_blocks:Rg,soul_fire_base_blocks:Cg,infiniburn_overworld:Pg,fire:Lg};Object.fromEntries(Object.entries(Dg).map(([n,e])=>[`minecraft:${n}`,new Set(e.map(t=>`minecraft:${t}`))]));function Hs(n,e,t){const i=BigInt(Math.imul(n|0,3129871)),r=BigInt.asIntN(64,BigInt(t|0)*116129781n);let s=BigInt.asIntN(64,i^r^BigInt(e|0));return s=BigInt.asIntN(64,s*s*42317861n+s*11n),s>>16n}function Ig(n){let e=0;for(let t=0;t<n.length;t++)e=Math.imul(e,31)+n.charCodeAt(t)|0;return e}(()=>{const n=new Float32Array(65536);for(let e=0;e<65536;e++)n[e]=Math.sin(e*Math.PI*2/65536);return n})();class Ug{constructor(e){this.randomSource=e}nextNextGaussian=0;haveNextNextGaussian=!1;reset(){this.haveNextNextGaussian=!1}nextGaussian(){if(this.haveNextNextGaussian)return this.haveNextNextGaussian=!1,this.nextNextGaussian;let e,t,i;do e=2*this.randomSource.nextDouble()-1,t=2*this.randomSource.nextDouble()-1,i=e*e+t*t;while(i>=1||i===0);const r=Math.sqrt(-2*Math.log(i)/i);return this.nextNextGaussian=t*r,this.haveNextNextGaussian=!0,e*r}}const Ng=n=>BigInt.asIntN(64,n),fc=n=>Number(BigInt.asIntN(32,n)),hc=(1n<<48n)-1n,dc=25214903917n,Fg=11n;class Ai{seed=0n;gaussianSource=new Ug(this);constructor(e){this.setSeed(e)}fork(){return new Ai(this.nextLong())}forkPositional(){return new Og(this.nextLong())}setSeed(e){this.seed=(e^dc)&hc,this.gaussianSource.reset()}next(e){return this.seed=this.seed*dc+Fg&hc,fc(this.seed>>BigInt(48-e))}nextInt(e){if(e===void 0)return this.next(32);if(e<=0)throw new RangeError("Bound must be positive");if((e&e-1)===0)return fc(BigInt(e)*BigInt(this.next(31))>>31n);let t,i;do t=this.next(31),i=t%e;while((t-i+(e-1)|0)<0);return i}nextIntBetweenInclusive(e,t){return this.nextInt(t-e+1)+e}nextLong(){const e=this.next(32),t=this.next(32);return Ng((BigInt(e)<<32n)+BigInt(t))}nextBoolean(){return this.next(1)!==0}nextFloat(){return this.next(24)*5960464477539063e-23}nextDouble(){const e=this.next(26),t=this.next(27);return(e*134217728+t)*11102230246251565e-32}nextGaussian(){return this.gaussianSource.nextGaussian()}consumeCount(e){for(let t=0;t<e;t++)this.nextInt()}}class Og{constructor(e){this.seed=e}at(e,t,i){return new Ai(Hs(e,t,i)^this.seed)}fromHashOf(e){return new Ai(BigInt(Ig(e))^this.seed)}fromSeed(e){return new Ai(e)}}new Set(["water","lava","short_grass","tall_grass","fern","large_fern","dead_bush","seagrass","tall_seagrass","vine","glow_lichen","moss_carpet","pale_moss_carpet","pale_hanging_moss","mangrove_propagule","cocoa","hanging_roots","cave_vines","cave_vines_plant","oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling","cherry_sapling","pale_oak_sapling","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","closed_eyeblossom","open_eyeblossom","sunflower","lilac","rose_bush","peony","brown_mushroom","red_mushroom","sugar_cane","kelp","kelp_plant","lily_pad","sweet_berry_bush","bamboo_sapling","pink_petals","sea_pickle","spore_blossom","small_dripleaf","big_dripleaf_stem","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_cluster","sculk_vein","fire","soul_fire","crimson_fungus","warped_fungus","crimson_roots","warped_roots","nether_sprouts","weeping_vines","weeping_vines_plant","twisting_vines","twisting_vines_plant","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["snow","cactus","chest","bamboo","pointed_dripstone","big_dripleaf","sculk_sensor","sculk_shrieker","sandstone_slab","azalea","flowering_azalea","dirt_path","farmland"].map(n=>`minecraft:${n}`));const kg=new Set(["seagrass","tall_seagrass","kelp","kelp_plant","sea_pickle","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["tall_grass","large_fern","sunflower","lilac","rose_bush","peony","small_dripleaf","tall_seagrass"].map(n=>`minecraft:${n}`));const zg={"minecraft:acacia_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:acacia_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:amethyst_cluster":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:bamboo":{props:[["age",["0","1"]],["leaves",["none","small","large"]],["stage",["0","1"]]],default:{age:"0",leaves:"none",stage:"0"}},"minecraft:basalt":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bee_nest":{props:[["facing",["north","south","west","east"]],["honey_level",["0","1","2","3","4","5"]]],default:{facing:"north",honey_level:"0"}},"minecraft:big_dripleaf":{props:[["facing",["north","south","west","east"]],["tilt",["none","unstable","partial","full"]],["waterlogged",["true","false"]]],default:{facing:"north",tilt:"none",waterlogged:"false"}},"minecraft:big_dripleaf_stem":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"false"}},"minecraft:birch_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:birch_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bone_block":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:brain_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:brown_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:bubble_column":{props:[["drag",["true","false"]]],default:{drag:"true"}},"minecraft:bubble_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:cactus":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:cave_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]],["berries",["true","false"]]],default:{age:"0",berries:"false"}},"minecraft:cave_vines_plant":{props:[["berries",["true","false"]]],default:{berries:"false"}},"minecraft:cherry_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:cherry_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:chest":{props:[["type",["single","left","right"]],["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{type:"single",facing:"north",waterlogged:"false"}},"minecraft:chorus_flower":{props:[["age",["0","1","2","3","4","5"]]],default:{age:"0"}},"minecraft:chorus_plant":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:cocoa":{props:[["age",["0","1","2"]],["facing",["north","south","west","east"]]],default:{age:"0",facing:"north"}},"minecraft:creaking_heart":{props:[["active",["true","false"]],["axis",["x","y","z"]],["natural",["true","false"]]],default:{active:"false",axis:"y",natural:"false"}},"minecraft:crimson_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:dark_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:dark_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate_redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:fire":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{age:"0",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:fire_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:flowering_azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:glow_lichen":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:grass_block":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:hanging_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:horn_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:infested_deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:iron_bars":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",waterlogged:"false",west:"false"}},"minecraft:jungle_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:jungle_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:kelp":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:large_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:large_fern":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:lava":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:lilac":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:mangrove_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:mangrove_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mangrove_propagule":{props:[["age",["0","1","2","3","4"]],["hanging",["true","false"]],["stage",["0","1"]],["waterlogged",["true","false"]]],default:{age:"0",hanging:"false",stage:"0",waterlogged:"false"}},"minecraft:mangrove_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:medium_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:muddy_mangrove_roots":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mushroom_stem":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:mycelium":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:pale_hanging_moss":{props:[["tip",["true","false"]]],default:{tip:"true"}},"minecraft:pale_moss_carpet":{props:[["bottom",["true","false"]],["east",["none","low","tall"]],["north",["none","low","tall"]],["south",["none","low","tall"]],["west",["none","low","tall"]]],default:{bottom:"true",east:"none",north:"none",south:"none",west:"none"}},"minecraft:pale_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:pale_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:peony":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:pink_petals":{props:[["facing",["north","south","west","east"]],["flower_amount",["1","2","3","4"]]],default:{facing:"north",flower_amount:"1"}},"minecraft:podzol":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:pointed_dripstone":{props:[["thickness",["tip_merge","tip","frustum","middle","base"]],["vertical_direction",["up","down"]],["waterlogged",["true","false"]]],default:{thickness:"tip",vertical_direction:"up",waterlogged:"false"}},"minecraft:red_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:rose_bush":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:sandstone_slab":{props:[["type",["top","bottom","double"]],["waterlogged",["true","false"]]],default:{type:"bottom",waterlogged:"false"}},"minecraft:sculk_catalyst":{props:[["bloom",["true","false"]]],default:{bloom:"false"}},"minecraft:sculk_sensor":{props:[["power",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["sculk_sensor_phase",["inactive","active","cooldown"]],["waterlogged",["true","false"]]],default:{power:"0",sculk_sensor_phase:"inactive",waterlogged:"false"}},"minecraft:sculk_shrieker":{props:[["can_summon",["true","false"]],["shrieking",["true","false"]],["waterlogged",["true","false"]]],default:{can_summon:"false",shrieking:"false",waterlogged:"false"}},"minecraft:sculk_vein":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:sea_pickle":{props:[["pickles",["1","2","3","4"]],["waterlogged",["true","false"]]],default:{pickles:"1",waterlogged:"true"}},"minecraft:small_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:small_dripleaf":{props:[["facing",["north","south","west","east"]],["half",["upper","lower"]],["waterlogged",["true","false"]]],default:{facing:"north",half:"lower",waterlogged:"false"}},"minecraft:snow":{props:[["layers",["1","2","3","4","5","6","7","8"]]],default:{layers:"1"}},"minecraft:spruce_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:spruce_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:sugar_cane":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:sunflower":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:suspicious_gravel":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:suspicious_sand":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:sweet_berry_bush":{props:[["age",["0","1","2","3"]]],default:{age:"0"}},"minecraft:tall_grass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tall_seagrass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tube_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:twisting_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:vine":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:warped_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:water":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:weeping_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}}},Hg=zg;function Gg(n,e){const t=[];let i=n.length;for(let a=0;a<n.length;a++){const o=n[a]??"minecraft:air",l=Hg[o],c=Object.fromEntries(Object.entries(e(a)).filter(([_])=>l?.props.some(([g])=>g===_))),u=(l?.props??[]).filter(([_])=>!(_ in c)),f=[];let h=1;for(let _=u.length-1;_>=0;_--)f[_]=h,h*=u[_][1].length;let p=0;u.forEach(([_,g],m)=>p+=g.indexOf(l.default[_])*f[m]),t.push({name:o,props:u,stride:f,count:h,defaultIndex:p,base:i,fixed:c}),i+=h-1}const r=new Uint8Array(i),s=new Uint16Array(i);for(let a=0;a<t.length;a++){const o=t[a];for(let l=0;l<o.count;l++){const c=l===o.defaultIndex?a:o.base+(l<o.defaultIndex?l:l-1);r[c]=a,s[c]=l}}return{defs:t,count:i,blockOf:r,indexOf:s}}function Vg(n,e,t){const i=n.defs[e];return t===i.defaultIndex?e:i.base+(t<i.defaultIndex?t:t-1)}function Kr(n,e,t){const i=n.defs[n.blockOf[e]],r=i.props.findIndex(([s])=>s===t);return r<0?i.fixed[t]:i.props[r][1][Math.floor(n.indexOf[e]/i.stride[r])%i.props[r][1].length]}function Bg(n,e,t){const i=n.blockOf[e],r=n.defs[i];let s=n.indexOf[e];for(const[a,o]of Object.entries(t)){const l=r.props.findIndex(([f])=>f===a);if(l<0)continue;const c=r.props[l][1].indexOf(String(o));if(c<0)continue;const u=Math.floor(s/r.stride[l])%r.props[l][1].length;s+=(c-u)*r.stride[l]}return Vg(n,i,s)}function zu(n,e){const t=n.defs[n.blockOf[e]],i={...t.fixed};return t.props.forEach(([r,s],a)=>i[r]=s[Math.floor(n.indexOf[e]/t.stride[a])%s.length]),i}function Wg(n,e){const t=n.defs[n.blockOf[e]],i=zu(n,e),r=Object.keys(i).sort();return r.length?`${t.name}[${r.map(s=>`${s}=${i[s]}`).join(",")}]`:t.name}const pe=16;class Xg{data=new Uint8ClampedArray(pe*pe*4);set(e,t,[i,r,s],a=255){const o=((t&15)*pe+(e&15))*4|0;this.data[o]=i,this.data[o+1]=r,this.data[o+2]=s,this.data[o+3]=a}get(e,t){const i=((t&15)*pe+(e&15))*4;return[this.data[i],this.data[i+1],this.data[i+2]]}fill(e){for(let t=0;t<pe;t++)for(let i=0;i<pe;i++)this.set(i,t,e(i,t))}}function Yg(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const k=n=>[n>>16&255,n>>8&255,n&255],ne=([n,e,t],i)=>[n*i,e*i,t*i],Hu=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t];function ot(n,e,t,i){n.fill(()=>ne(e,1+(i()-.5)*2*t))}function Be(n,e,t,i,r){for(let s=0;s<t;s++){let a=Math.floor(r()*pe),o=Math.floor(r()*pe);const l=e(),c=1+Math.floor(r()*i);for(let u=0;u<c;u++)n.set(a,o,l),r()<.5?a+=r()<.5?1:-1:o+=r()<.5?1:-1}}function Gn(n,e){const t=Array.from({length:n},()=>[e()*pe,e()*pe]),i=new Int32Array(pe*pe),r=new Float32Array(pe*pe);for(let s=0;s<pe;s++)for(let a=0;a<pe;a++){let o=1/0,l=1/0,c=0;t.forEach(([u,f],h)=>{let p=Math.abs(a+.5-u),_=Math.abs(s+.5-f);p=Math.min(p,pe-p),_=Math.min(_,pe-_);const g=Math.hypot(p,_);g<o?(l=o,o=g,c=h):g<l&&(l=g)}),i[s*pe+a]=c,r[s*pe+a]=l-o}return{owner:i,edge:r}}const Ca=k(8806467),Is=k(12105912),Gu=0;function Vu(n,e){ot(n,k(8224125),.06,e),Be(n,()=>ne(k(8224125),.82+e()*.06),10,4,e),Be(n,()=>ne(k(8224125),1.1),6,2,e)}function Bu(n,e){ot(n,k(5263448),.07,e);for(const t of[2,6,10,14]){const i=Math.floor(e()*pe);for(let r=0;r<11;r++)n.set(r+i,t+(r>6?1:0),ne(k(5263448),.72))}}function qg(n,e){ot(n,k(5658206),.06,e);const{edge:t}=Gn(5,e);n.fill((i,r)=>t[r*pe+i]<1?ne(k(5658206),.72):n.get(i,r))}function Sr(n,e){ot(n,Ca,.07,e),Be(n,()=>ne(Ca,.75),12,2,e),Be(n,()=>ne(Ca,1.18),8,2,e)}function $s(n){for(let e=3;e<n.data.length;e+=4)n.data[e]=Gu}function $g(n,e){ot(n,Is,.1,e),Be(n,()=>ne(Is,.8),14,2,e),Be(n,()=>ne(Is,1.15),10,1,e),$s(n)}function Kg(n,e){Sr(n,e);for(let t=0;t<pe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ne(Is,.88+e()*.24),Gu)}}function Zg(n,e){Sr(n,e);for(let t=0;t<pe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ne(k(15791864),.92+e()*.1))}}function pc(n,e){ot(n,k(14406560),.04,e),Be(n,()=>ne(k(14406560),.88),10,1,e)}function mc(n,e){const{owner:t,edge:i}=Gn(14,e),r=Array.from({length:14},()=>ne(k(8814715),.75+e()*.45));n.fill((s,a)=>{const o=a*pe+s;return i[o]<.7?ne(k(8814715),.6):ne(r[t[o]],.96+e()*.08)})}function jg(n,e){const t=k(15790320);n.fill((i,r)=>{const s=Math.sin((i+r*2)/pe*Math.PI*2)+Math.sin((i*2-r)/pe*Math.PI*2);return ne(t,.92+s*.05+(e()-.5)*.04)}),$s(n)}function Jg(n,e){n.fill(()=>{const t=e();return t<.35?k(2763306):t<.7?k(5723991):t<.9?k(8026746):k(1710618)})}function Qg(n,e){const t=k(10650447);for(let i=0;i<4;i++){const r=Math.floor(e()*pe),s=.94+e()*.12;for(let a=i*4;a<i*4+4;a++)for(let o=0;o<pe;o++){let l=ne(t,s*(1+(e()-.5)*.06));a===i*4+3?l=ne(t,.68):o===r&&(l=ne(t,.74)),n.set(o,a,l)}}}function Wu(n,e){const{owner:t,edge:i}=Gn(9,e),r=Array.from({length:9},()=>.8+e()*.35);n.fill((s,a)=>{const o=a*pe+s;return i[o]<.9?ne(k(8026746),.55):ne(k(8026746),r[t[o]]*(1+(e()-.5)*.08))})}function ev(n,e){const t=k(7033138),i=Array.from({length:pe},()=>.8+e()*.35);n.fill(r=>ne(t,i[r]*(1+(e()-.5)*.12))),Be(n,()=>ne(t,.6),5,3,e)}function tv(n,e){const t=k(11834207);n.fill((i,r)=>{const s=Math.max(Math.abs(i-7.5),Math.abs(r-7.5));if(s>7)return ne(k(7033138),.9+e()*.2);const a=Math.floor(s)%2===0?1:.86;return ne(t,a*(1+(e()-.5)*.05))})}function nv(n,e){const t=k(10132122);n.fill(()=>e()<.18?ne(t,.55):ne(t,.85+e()*.35)),$s(n)}function iv(n,e){const{owner:t,edge:i}=Gn(7,e),r=Array.from({length:7},()=>Hu(k(13146702),k(16771488),e()));n.fill((s,a)=>{const o=a*pe+s;return i[o]<.8?k(9071157):ne(r[t[o]],.95+e()*.1)})}function rv(n,e){n.fill((t,i)=>{const r=Math.sin((t+i)/pe*Math.PI*4)*.5+Math.sin((t*2-i)/pe*Math.PI*2)*.5,s=Math.max(0,Math.min(1,.5+r*.6+(e()-.5)*.25));return Hu(k(13123599),k(16761402),s*s)}),Be(n,()=>k(10103304),6,3,e)}function sv(n,e){ot(n,k(1774630),.12,e),Be(n,()=>k(3877466),10,3,e),Be(n,()=>k(788754),8,2,e)}const Pa=n=>(e,t)=>{ot(e,k(n),.04,t);for(const i of[4,9,13])for(let r=0;r<pe;r++)t()<.8&&e.set(r,i,ne(k(n),.88));for(let i=0;i<pe;i++)e.set(i,0,ne(k(n),1.06))},_c=n=>(e,t)=>{ot(e,k(n),.035,t),Be(e,()=>ne(k(n),.93),8,2,t)},av=n=>(e,t)=>{ot(e,k(n),.05,t),Be(e,()=>ne(k(n),.86),10,1,t)};function ov(n,e){ot(n,k(16055034),.025,e),Be(n,()=>k(14674415),6,2,e)}function lv(n,e){ot(n,k(16251901),.02,e),Be(n,()=>k(15200244),10,3,e)}function cv(n,e){ot(n,k(9286906),.05,e);for(let t=0;t<3;t++){let i=Math.floor(e()*pe),r=Math.floor(e()*pe);for(let s=0;s<6;s++)n.set(i,r,k(14215423)),i+=1,r+=e()<.5?1:0}}function uv(n,e){const{edge:t}=Gn(6,e);n.fill((i,r)=>t[r*pe+i]<.6?k(11127029):ne(k(9088744),.96+e()*.08))}function Xu(n,e){ot(n,k(3947068),.08,e),Be(n,()=>k(4932678),10,3,e)}function fv(n,e){ot(n,k(7299688),.1,e),Be(n,()=>k(9273991),12,2,e),Be(n,()=>k(5917781),8,2,e)}const gc=n=>(e,t)=>{Sr(e,t);for(let i=0;i<pe;i++){const r=2+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ne(k(n),.88+t()*.24))}};function hv(n,e){ot(n,k(5979933),.1,e),Be(n,()=>k(8016936),14,3,e),Be(n,()=>k(4074002),8,2,e)}function dv(n,e){Sr(n,e),Be(n,()=>ne(k(7820603),.7),14,2,e),Be(n,()=>k(9079434),6,1,e)}function pv(n,e){ot(n,k(14672092),.03,e);const{edge:t}=Gn(5,e);n.fill((i,r)=>t[r*pe+i]<.5?k(13224646):n.get(i,r))}const gi=n=>(e,t)=>{ot(e,k(n),.03,t),Be(e,()=>ne(k(n),.93),6,2,t)},ht=(n,e=.85,t=1.12)=>(i,r)=>{ot(i,k(n),.07,r),Be(i,()=>ne(k(n),e+r()*.06),12,3,r),Be(i,()=>ne(k(n),t),8,2,r)},Ut=(n,e,t=5)=>(i,r)=>{(n?Bu:Vu)(i,r);for(let s=0;s<t;s++){const a=2+Math.floor(r()*12),o=2+Math.floor(r()*12),l=2+Math.floor(r()*3);for(let c=0;c<l;c++){const u=a+Math.floor(r()*3)-1,f=o+Math.floor(r()*3)-1;i.set(u,f,ne(k(e),.8+r()*.4))}i.set(a,o,ne(k(e),1.15))}},vc=n=>(e,t)=>{const{owner:i,edge:r}=Gn(6,t),s=Array.from({length:6},()=>.8+t()*.35);e.fill((a,o)=>{const l=o*pe+a;return r[l]<.8?ne(k(n),.55):ne(k(n),s[i[l]]*(1+(t()-.5)*.08))})},Sn=(n,e=.6)=>(t,i)=>{const r=k(n),s=Array.from({length:pe},()=>.8+i()*.35);t.fill(a=>ne(r,s[a]*(1+(i()-.5)*.12))),Be(t,()=>ne(r,e),5,3,i)};function mv(n,e){ot(n,k(14211026),.05,e);for(let t=0;t<7;t++){const i=Math.floor(e()*pe),r=Math.floor(e()*pe),s=2+Math.floor(e()*4);for(let a=0;a<s;a++)n.set(i+a,r,ne(k(3025704),.9+e()*.3))}}const xn=(n,e)=>(t,i)=>{t.fill((r,s)=>{const a=Math.max(Math.abs(r-7.5),Math.abs(s-7.5));if(a>7)return ne(k(e),.9+i()*.2);const o=Math.floor(a)%2===0?1:.86;return ne(k(n),o*(1+(i()-.5)*.05))})},Mn=(n,e,t)=>(i,r)=>{const s=k(n);i.fill(()=>r()<.18?ne(s,.55):ne(s,.85+r()*.35)),t!==void 0&&Be(i,()=>ne(k(t),.9+r()*.2),9,2,r),e&&$s(i)},xc=(n,e)=>(t,i)=>{ot(t,k(n),.06,i),e&&Be(t,()=>k(15261904),6,4,i)};function _v(n,e){ot(n,k(14272936),.05,e);for(let t=0;t<14;t++)n.set(Math.floor(e()*pe),Math.floor(e()*pe),k(12100227))}function gv(n,e){const t=Array.from({length:pe},()=>.9+e()*.15);n.fill(i=>ne(k(13616821),t[i]*(1+(e()-.5)*.06)))}function vv(n,e){Mv(n,e,12819020);for(let t=0;t<pe;t++)n.set(t,7,ne(k(8018474),.9))}function xv(n,e){const{edge:t}=Gn(8,e);n.fill((i,r)=>t[r*pe+i]<.8?k(9071146):ne(k(13936192),.9+e()*.2))}function Mv(n,e,t){const i=k(t);for(let r=0;r<pe;r++)for(let s=0;s<pe;s++)n.set(s,r,ne(i,(r%4===3?.7:1)*(.94+e()*.1)))}function bv(n,e){Sn(5985100)(n,e);for(let t=5;t<11;t++)for(let i=5;i<11;i++)n.set(i,t,Math.abs(i-7.5)+Math.abs(t-7.5)<3?k(14711338):k(3813932))}function Sv(n,e){n.fill(()=>k(2894372));for(let t=0;t<6;t++){const i=e()<.5,r=Math.floor(e()*pe);for(let s=0;s<pe;s++)n.set(i?r:s,i?s:r,ne(k(4864810),.85+e()*.3))}}function wv(n,e){Xu(n,e);for(let t=0;t<4;t++){const i=Math.floor(e()*pe);for(let r=0;r<pe;r++)n.set(i,r,ne(k(4864810),.85+e()*.3))}}function yv(n,e){Sr(n,e),Be(n,()=>k(10978138),8,4,e)}const xs=n=>(e,t)=>{ot(e,k(n),.1,t),Be(e,()=>ne(k(n),.8),10,2,t)},tt=(n,e,t=!1)=>(i,r)=>{for(let s=3;s<i.data.length;s+=4)i.data[s]=0;if(e((s,a,o=1)=>i.set(s,a,ne(k(n),o*(.85+r()*.3)),255),r),t)for(let s=0;s<i.data.length;s+=4)i.data[s+3]===0&&(i.data[s]=i.data[s+1]=i.data[s+2]=0)},Ev=tt(10132122,(n,e)=>{for(let t=0;t<pe;t+=3){const i=6+Math.floor(e()*10);let r=t;for(let s=0;s<i;s++)n(r,s),e()<.4&&n(r+1,s,.8),e()<.2&&(r+=e()<.5?1:-1)}},!0),Av=tt(12041648,(n,e)=>{for(let t=2;t<14;t+=2){const i=5+Math.floor(e()*10);for(let r=0;r<i;r++)n(t+(r%3===0?1:0),r)}}),Tv=tt(6989903,n=>{for(let e=0;e<12;e++)n(7,e+2,.9);for(let e=5;e<10;e++)n(e,2);n(7,14,.6)}),Rv=tt(11561518,n=>{for(let e=4;e<12;e++)for(let t=5;t<11;t++)(t-7.5)**2/9+(e-7.5)**2/16<1&&n(t,e,t===7?.7:1);n(7,2,.6),n(7,3,.6)}),Pr=(n,e=12)=>(t,i)=>tt(n,(r,s)=>{for(let a=1;a<15;a+=2){const o=Math.floor(e*(.45+s()*.55));let l=a;for(let c=15;c>15-o;c--)r(l,c,.8+(15-c)/40),s()<.15&&(l+=s()<.5?1:-1)}},!0)(t,i),Mc=(n,e=13)=>(t,i)=>tt(n,r=>{for(let s=15;s>15-e;s--){r(7,s);const a=Math.floor((s-(15-e))/e*5);if(s%2===0)for(let o=1;o<=a;o++)r(7-o,s-(o>>1),.9),r(7+o,s-(o>>1),.9)}},!0)(t,i),Cv=tt(9071162,(n,e)=>{for(let t=0;t<5;t++){let i=7;for(let r=15;r>4&&(n(i,r),e()<.4&&(i+=t%2?1:-1),!(i<1||i>14));r--);}}),At=(n,e=0)=>(t,i)=>{for(let a=3;a<t.data.length;a+=4)t.data[a]=0;const r=e?2:6;for(let a=15;a>=r;a--)t.set(7,a,ne(k(4164138),.85+i()*.3),255);t.set(6,11,k(5216826),255),t.set(8,9,k(5216826),255);const s=e?4:5;for(let a=s-2;a<=s+2;a++)for(let o=5;o<=9;o++)Math.abs(o-7)+Math.abs(a-s)<=3&&t.set(o,a,ne(k(n),.8+i()*.35),255);t.set(7,s,ne(k(n),.6),255)},Pv=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<16;t++)n.set(7,t,ne(k(4164138),.85+e()*.3),255);for(const[t,i]of[[6,4],[5,5],[8,8],[9,9],[10,10],[6,12],[5,13]])n.set(t,i,ne(k(5216826),.85+e()*.3),255)},bc=n=>tt(n,e=>{for(let t=9;t<15;t++)e(7,t,.7);for(let t=4;t<=10;t++)for(let i=5;i<=8;i++)Math.abs(t-7)<=3-Math.max(0,6-i)&&e(t,i)}),Lv=(n,e)=>{tt(4155946,(t,i)=>{for(let r=0;r<70;r++)t(Math.floor(i()*14)+1,Math.floor(i()*10)+5)})(n,e);for(let t=0;t<5;t++)n.set(2+Math.floor(e()*12),6+Math.floor(e()*8),k(11542570),255)},Dv=tt(10526880,n=>{for(const e of[3,7,11])for(let t=0;t<16;t++)n(e,t,t%5===0?.7:1)},!0),Iv=tt(6134314,n=>{for(let e=0;e<16;e++)n(7,e,e%6===0?.6:1),n(8,e,e%6===0?.6:.9);for(let e=9;e<13;e++)n(e,3,1.1)}),Sc=(n,e)=>(t,i)=>{if(tt(n,(r,s)=>{for(let a=0;a<120;a++)r(Math.floor(s()*16),Math.floor(s()*12)+2)})(t,i),e!==void 0)for(let r=0;r<8;r++)t.set(Math.floor(i()*16),2+Math.floor(i()*10),k(e),255)},Uv=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<14;t++){const i=Math.floor(e()*14)+1,r=Math.floor(e()*14)+1;n.set(i,r,k(15902920),255),n.set(i+1,r,k(15241400),255)}},Nv=(n,e)=>{n.fill((t,i)=>(t-7.5)**2+(i-7.5)**2<49&&!(t>7&&Math.abs(i-7.5)<1)?ne(k(10132122),.85+e()*.3):[0,0,0]);for(let t=0;t<n.data.length;t+=4)n.data[t+3]=n.data[t]===0?0:255},Fv=(n,e)=>n.fill(t=>ne(k(14190890),(t%4===0?.75:1)*(.92+e()*.1))),Ov=(n,e)=>n.fill((t,i)=>Math.abs(t-7.5)<1.5&&Math.abs(i-7.5)<1.5?k(5929514):ne(k(13664808),.9+e()*.12)),kv=(n,e)=>n.fill(t=>ne(k(t%4<2?7315754:9156666),.92+e()*.1)),zv=(n,e)=>n.fill((t,i)=>ne(k(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1.5?7315754:9156666),.92+e()*.1)),Hv=(n,e)=>n.fill((t,i)=>t===0||t===15?k(2906652):(t+i)%5===0?k(14211248):ne(k(5016108),.88+e()*.14)),Gv=(n,e)=>n.fill((t,i)=>t===0||t===15||i===0||i===15?k(2906652):ne(k(6068796),.9+e()*.12)),wc=tt(5933610,(n,e)=>{let t=7;for(let i=0;i<16;i++){if(n(t,i),n(t+1,i,.85),i%4===1)for(let r=1;r<4;r++)n(t+(i%8===1?r+1:-r),i+(r>>1),.9);e()<.2&&(t+=e()<.5?1:-1),t=Math.max(4,Math.min(10,t))}}),Vv=tt(6982186,n=>{for(const e of[4,9])for(let t=9;t<16;t++)for(let i=e;i<e+3;i++)n(i,t,t<11?1.2:1)}),Yu=n=>tt(n,(e,t)=>{for(let i=0;i<60;i++)e(Math.floor(t()*16),Math.floor(t()*16),.8+t()*.4)}),Bv=Yu(8034938),Wv=tt(10517082,(n,e)=>{for(let t=2;t<14;t+=2){const i=6+Math.floor(e()*9);for(let r=0;r<i;r++)n(t+(r%4===3?1:0),r)}}),Xv=tt(14181544,n=>{for(let e=3;e<13;e++)for(let t=0;t<3;t++)n(e,t,Math.abs(e-7.5)<2?.7:1);for(let e=5;e<11;e++)n(e,3,.8)}),Ms=n=>(e,t)=>{if(tt(4880938,i=>{for(const r of[5,10])for(let s=0;s<16;s++)i(r+(s%5===0?1:0),s)})(e,t),n)for(const[i,r]of[[4,6],[11,10],[6,13]])e.set(i,r,k(15900714),255)},yc=tt(5937706,n=>{for(let e=6;e<16;e++)n(7,e,.8);for(let e=1;e<15;e++)for(let t=2;t<6;t++)Math.abs(e-7.5)<7-(5-t)&&n(e,t)}),Yv=tt(5937706,n=>{for(let e=0;e<16;e++)n(7,e,.85)}),qv=tt(8808538,n=>{for(let e=0;e<16;e++){const t=Math.max(0,3-Math.floor(e/5));for(let i=7-t;i<=8+t;i++)n(i,e)}}),bs=n=>tt(n,e=>{for(let t=4;t<16;t++)e(7,t,1.15),e(8,t,.95),t>8&&(e(5,t,.9),e(10,t,1))}),La=(n,e)=>{n.fill(()=>ne(k(797754),.8+e()*.4)),Be(n,()=>k(2803928),5,1,e)},$v=(n,e)=>{Wu(n,e),Be(n,()=>ne(k(5929516),.85+e()*.3),8,3,e)},Kv=(n,e)=>{const{edge:t}=Gn(7,e);n.fill((i,r)=>t[r*pe+i]<.9?k(15235098):ne(k(6957586),.8+e()*.4))},Ec=n=>n.fill((e,t)=>e%4===0||t%4===0?k(2767434):[12,16,22]),Zv=(n,e)=>n.fill((t,i)=>i===5||t===0||t===15||i===0||i===15?k(4861972):t>=7&&t<=8&&i>=4&&i<=7?k(12105912):ne(k(11039786),.9+e()*.12)),jv=(n,e)=>n.fill(t=>ne(k(14867652),(t%5===0?.85:1)*(.94+e()*.08))),Jv=(n,e)=>n.fill((t,i)=>Math.max(Math.abs(t-7.5),Math.abs(i-7.5))<3?k(12103834):ne(k(14867652),.94+e()*.08)),Lr=n=>tt(n,e=>{for(const[t,i]of[[4,10],[8,13],[11,8]])for(let r=15;r>15-i;r--)e(t+(r%4===0?1:0),r)}),bn=n=>tt(n,e=>{for(let t=6;t<16;t++)for(let i=0;i<16;i++)Math.abs(i-7.5)<(16-t)*.75&&(i+t)%3!==0&&e(i,t)}),Yo=(n,e)=>{ot(n,k(7219754),.12,e),Be(n,()=>ne(k(7219754),.7+e()*.1),14,2,e),Be(n,()=>ne(k(9321014),1.05),8,2,e)},Qv=(n,e)=>{ot(n,k(5390382),.1,e);for(let t=0;t<4;t++){const i=2+Math.floor(e()*11),r=2+Math.floor(e()*11);n.set(i,r,k(3023384),255),n.set(i+2,r,k(3023384),255),n.set(i+1,r+2,k(3023384),255)}},e1=(n,e)=>n.fill(t=>ne(k(4868688),(t%4===0?.75:1)*(.9+e()*.15))),t1=(n,e)=>n.fill((t,i)=>ne(k(5921376),(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1?.8:1)*(.92+e()*.1))),Ac=n=>(e,t)=>{Yo(e,t);for(let i=0;i<6;i++){const r=2+Math.floor(t()*12),s=2+Math.floor(t()*12);e.set(r,s,ne(k(n),.9+t()*.3)),e.set(r+1,s,ne(k(n),.8))}},n1=(n,e)=>n.fill((t,i)=>ne(k(6177336),((t+i*3)%7<2?.7:1)*(.9+e()*.15))),i1=(n,e)=>n.fill((t,i)=>ne(k(6966336),(Math.hypot(t-7.5,i-7.5)%4<1.2?.75:1)*(.9+e()*.12))),Tc=n=>(e,t)=>{ot(e,k(n),.12,t),Be(e,()=>ne(k(n),1.2),6,2,t)},Rc=n=>(e,t)=>{Yo(e,t);for(let i=0;i<16;i++){const r=3+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ne(k(n),.85+t()*.3))}},Cc=(n,e)=>(t,i)=>{Sn(n)(t,i);for(let r=0;r<10;r++)t.set(Math.floor(i()*16),Math.floor(i()*16),ne(k(e),.9+i()*.3))},Pc=n=>tt(n,e=>{for(let t=9;t<16;t++)e(7,t,.7);for(let t=3;t<=11;t++)for(let i=4;i<=8;i++)Math.abs(t-7)<=4-Math.max(0,6-i)&&e(t,i)}),Lc=n=>tt(n,(e,t)=>{for(let i=2;i<14;i+=2){const r=6+Math.floor(t()*8);for(let s=15;s>15-r;s--)e(i+(s%3===0?1:0),s)}}),Ss=n=>tt(n,e=>{for(const t of[5,9])for(let i=0;i<16;i++)e(t+(i%4<2?0:1),i)}),Dc=n=>tt(n,(e,t)=>{for(let i=1;i<15;i++){const r=6+Math.floor(t()*9);for(let s=15;s>15-r;s--)e(i,s,.75+(15-s)/30)}}),r1=tt(10132122,n=>{for(const e of[1,6,9,14])for(let t=0;t<16;t++)n(e,t);for(const e of[0,15])for(let t=0;t<16;t++)n(t,e)}),s1=tt(14215423,(n,e)=>{for(let t=0;t<8;t++)n(Math.floor(e()*16),Math.floor(e()*16))}),qu={stone:Vu,deepslate:Bu,deepslate_top:qg,dirt:Sr,grass_top:$g,grass_side:Kg,sand:pc,gravel:mc,water:jg,bedrock:Jg,planks:Qg,cobblestone:Wu,log:ev,log_top:tv,leaves:nv,glowstone:iv,lava:rv,obsidian:sv,sandstone:Pa(14207899),sandstone_top:_c(14471071),red_sand:av(12477985),red_sandstone:Pa(11887135),red_sandstone_top:_c(12150058),snow:ov,powder_snow:lv,ice:cv,packed_ice:uv,mud:Xu,mycelium_top:fv,mycelium_side:gc(7299688),podzol_top:hv,podzol_side:gc(6965794),coarse_dirt:dv,calcite:pv,terracotta:gi(9985603),white_terracotta:gi(13742753),orange_terracotta:gi(10572581),yellow_terracotta:gi(12223779),brown_terracotta:gi(5059363),red_terracotta:gi(9387310),light_gray_terracotta:gi(8874593),granite:ht(10120024),diorite:ht(12434620,.8,1.06),andesite:ht(9079436),tuff:ht(7171429),clay:ht(10528435,.92,1.06),coal_ore:Ut(!1,2829099),deepslate_coal_ore:Ut(!0,2039583),iron_ore:Ut(!1,14200723),deepslate_iron_ore:Ut(!0,13213827),copper_ore:Ut(!1,12677451),deepslate_copper_ore:Ut(!0,11758148),gold_ore:Ut(!1,15980106),deepslate_gold_ore:Ut(!0,15255100),redstone_ore:Ut(!1,11801102),deepslate_redstone_ore:Ut(!0,11014156),emerald_ore:Ut(!1,1557828,3),deepslate_emerald_ore:Ut(!0,1356860,3),lapis_ore:Ut(!1,2312616),deepslate_lapis_ore:Ut(!0,2113696),diamond_ore:Ut(!1,6155486,4),deepslate_diamond_ore:Ut(!0,5233871,4),raw_iron_block:vc(10913643),raw_copper_block:vc(10115646),oak_log:Sn(7033138),spruce_log:Sn(3877401),spruce_log_top:xn(7558450,3877401),birch_log:mv,birch_log_top:xn(12890235,14211026),jungle_log:Sn(5653791,.5),jungle_log_top:xn(10975308,5653791),acacia_log:Sn(6775127),acacia_log_top:xn(11690042,6775127),dark_oak_log:Sn(3943962,.7),dark_oak_log_top:xn(5192482,3943962),mangrove_log:Sn(5522223),mangrove_log_top:xn(7223858,5522223),cherry_log:Sn(3612714),cherry_log_top:xn(13999e3,3612714),pale_oak_log:Sn(5985100),pale_oak_log_top:xn(15129557,5985100),spruce_leaves:Mn(6263903,!1),birch_leaves:Mn(8233811,!1),jungle_leaves:Mn(11053224,!0),acacia_leaves:Mn(10132122,!0),dark_oak_leaves:Mn(10132122,!0),mangrove_leaves:Mn(10526880,!0),cherry_leaves:Mn(15378888,!1),pale_oak_leaves:Mn(10922654,!1),azalea_leaves:Mn(6061100,!1),flowering_azalea_leaves:Mn(6061100,!1,14122962),mushroom_stem:gv,red_mushroom_block:xc(12593702,!0),brown_mushroom_block:xc(9793877,!1),mangrove_roots:Sv,muddy_mangrove_roots:wv,rooted_dirt:yv,bee_nest:vv,bee_nest_top:xv,creaking_heart:bv,moss_carpet:xs(5929516),pale_moss_carpet:xs(10331030),vine:Ev,pale_hanging_moss:Av,mangrove_propagule:Tv,cocoa:Rv,short_grass:Pr(10132122),fern:Mc(10132122),tall_grass:Pr(10132122,16),large_fern:Mc(10132122,16),dead_bush:Cv,dandelion:At(15980858),poppy:At(14168618),blue_orchid:At(3188966),allium:At(11755488),azure_bluet:At(15265010),red_tulip:At(14694954),orange_tulip:At(15764010),white_tulip:At(15921902),pink_tulip:At(15902920),oxeye_daisy:At(16053482),cornflower:At(4878056),lily_of_the_valley:At(16777215),closed_eyeblossom:At(9079434),open_eyeblossom:At(15768122),sunflower:At(16175646,16),lilac:At(13803740,16),rose_bush:At(13777466,16),peony:At(15775448,16),brown_mushroom:bc(9793877),red_mushroom:bc(14168618),sweet_berry_bush:Lv,sugar_cane:Dv,bamboo:Iv,azalea:Sc(6982188),flowering_azalea:Sc(6982188,14122962),pink_petals:Uv,lily_pad:Nv,pumpkin:Fv,pumpkin_top:Ov,melon:kv,melon_top:zv,cactus:Hv,cactus_top:Gv,seagrass:Pr(4164138),tall_seagrass:Pr(4164138,16),kelp:wc,kelp_plant:wc,sea_pickle:Vv,glow_lichen:Bv,hanging_roots:Wv,spore_blossom:Xv,cave_vines:Ms(!1),cave_vines_plant:Ms(!1),cave_vines_lit:Ms(!0),cave_vines_plant_lit:Ms(!0),grass_snow_side:Zg,mushroom_block_inside:_v,tall_flower_bottom:Pv,small_dripleaf:yc,big_dripleaf:yc,big_dripleaf_stem:Yv,moss_block:xs(5929516),pale_moss_block:xs(10331030),dripstone_block:ht(8808538),pointed_dripstone:qv,smooth_basalt:ht(4737102,.9,1.05),amethyst_block:ht(9069512,.85,1.15),budding_amethyst:ht(8017336,.8,1.2),small_amethyst_bud:bs(12094184),medium_amethyst_bud:bs(12094184),large_amethyst_bud:bs(12094184),amethyst_cluster:bs(12094184),sculk:La,sculk_vein:Yu(801868),sculk_sensor:La,sculk_shrieker:ht(13156520),sculk_catalyst:La,blue_ice:ht(7645424,.92,1.06),mossy_cobblestone:$v,magma_block:Kv,spawner:Ec,chest:Zv,bone_block:jv,bone_block_top:Jv,suspicious_sand:pc,suspicious_gravel:mc,sandstone_slab:Pa(14207899),tube_coral_block:ht(3364317,.85,1.12),tube_coral:Lr(3364317),tube_coral_fan:bn(3364317),tube_coral_wall_fan:bn(3364317),brain_coral_block:ht(14178984,.85,1.12),brain_coral:Lr(14178984),brain_coral_fan:bn(14178984),brain_coral_wall_fan:bn(14178984),bubble_coral_block:ht(11021008,.85,1.12),bubble_coral:Lr(11021008),bubble_coral_fan:bn(11021008),bubble_coral_wall_fan:bn(11021008),fire_coral_block:ht(14168106,.85,1.12),fire_coral:Lr(14168106),fire_coral_fan:bn(14168106),fire_coral_wall_fan:bn(14168106),horn_coral_block:ht(14731322,.85,1.12),horn_coral:Lr(14731322),horn_coral_fan:bn(14731322),horn_coral_wall_fan:bn(14731322),netherrack:Yo,soul_sand:Qv,soul_soil:ht(4864558,.85,1.1),basalt:e1,basalt_top:t1,blackstone:ht(2761768,.8,1.25),nether_gold_ore:Ac(16175162),nether_quartz_ore:Ac(15525084),ancient_debris:n1,ancient_debris_top:i1,crimson_nylium:Rc(10102310),crimson_nylium_top:Tc(10102310),warped_nylium:Rc(2853500),warped_nylium_top:Tc(2853500),crimson_stem:Cc(6957626,13120058),crimson_stem_top:xn(9321034,6957626),warped_stem:Cc(3816014,2803896),warped_stem_top:xn(3836544,3816014),nether_wart_block:ht(7998990,.8,1.2),warped_wart_block:ht(1473144,.8,1.2),shroomlight:ht(15768138,.85,1.2),crimson_fungus:Pc(11545130),warped_fungus:Pc(2797728),crimson_roots:Lc(10100266),warped_roots:Lc(2005642),nether_sprouts:Pr(2005642,8),weeping_vines:Ss(10495018),weeping_vines_plant:Ss(10495018),twisting_vines:Ss(2005642),twisting_vines_plant:Ss(2005642),fire:Dc(15763994),soul_fire:Dc(3856616),end_stone:ht(14474400,.88,1.06),chorus_plant:ht(6965866,.8,1.25),chorus_flower:ht(10123930,.85,1.15),end_gateway:Ec,iron_bars:r1,bubble_column:s1},qo=Object.keys(qu),te=Object.fromEntries(qo.map((n,e)=>[n,e+1])),Ks=qo.length+1;function $u(){const n=new Uint8Array(Ks*pe*pe*4);return qo.forEach((e,t)=>{const i=new Xg;let r=0;for(const s of e)r=Math.imul(r,31)+s.charCodeAt(0);qu[e](i,Yg(r)),n.set(i.data,(t+1)*pe*pe*4)}),n}const ae=4,Ku=(()=>{const n=new Uint8Array(Ks);n[te.grass_top]=1,n[te.grass_side]=1,n[te.leaves]=2,n[te.water]=3;for(const e of["jungle_leaves","acacia_leaves","dark_oak_leaves","mangrove_leaves"])n[te[e]]=2;n[te.vine]=2|ae;for(const e of["pale_hanging_moss","mangrove_propagule","cocoa"])n[te[e]]=ae;for(const e of["cave_vines_lit","cave_vines_plant_lit","tall_flower_bottom"])n[te[e]]=ae;return n[te.short_grass]=1|ae,n[te.fern]=1|ae,n[te.tall_grass]=1|ae,n[te.large_fern]=1|ae,n[te.dead_bush]=ae,n[te.dandelion]=ae,n[te.poppy]=ae,n[te.blue_orchid]=ae,n[te.allium]=ae,n[te.azure_bluet]=ae,n[te.red_tulip]=ae,n[te.orange_tulip]=ae,n[te.white_tulip]=ae,n[te.pink_tulip]=ae,n[te.oxeye_daisy]=ae,n[te.cornflower]=ae,n[te.lily_of_the_valley]=ae,n[te.closed_eyeblossom]=ae,n[te.open_eyeblossom]=ae,n[te.sunflower]=ae,n[te.lilac]=ae,n[te.rose_bush]=ae,n[te.peony]=ae,n[te.brown_mushroom]=ae,n[te.red_mushroom]=ae,n[te.sweet_berry_bush]=ae,n[te.sugar_cane]=1|ae,n[te.bamboo]=ae,n[te.azalea]=ae,n[te.flowering_azalea]=ae,n[te.pink_petals]=ae,n[te.lily_pad]=2|ae,n[te.seagrass]=ae,n[te.tall_seagrass]=ae,n[te.kelp]=ae,n[te.kelp_plant]=ae,n[te.sea_pickle]=ae,n[te.glow_lichen]=ae,n[te.hanging_roots]=ae,n[te.spore_blossom]=ae,n[te.cave_vines]=ae,n[te.cave_vines_plant]=ae,n[te.small_dripleaf]=ae,n[te.big_dripleaf]=ae,n[te.big_dripleaf_stem]=ae,n[te.pointed_dripstone]=ae,n[te.small_amethyst_bud]=ae,n[te.medium_amethyst_bud]=ae,n[te.large_amethyst_bud]=ae,n[te.amethyst_cluster]=ae,n[te.sculk_vein]=ae,n[te.tube_coral]=ae,n[te.tube_coral_fan]=ae,n[te.tube_coral_wall_fan]=ae,n[te.brain_coral]=ae,n[te.brain_coral_fan]=ae,n[te.brain_coral_wall_fan]=ae,n[te.bubble_coral]=ae,n[te.bubble_coral_fan]=ae,n[te.bubble_coral_wall_fan]=ae,n[te.fire_coral]=ae,n[te.fire_coral_fan]=ae,n[te.fire_coral_wall_fan]=ae,n[te.horn_coral]=ae,n[te.horn_coral_fan]=ae,n[te.horn_coral_wall_fan]=ae,n[te.bubble_column]=ae,n[te.crimson_fungus]=ae,n[te.warped_fungus]=ae,n[te.crimson_roots]=ae,n[te.warped_roots]=ae,n[te.nether_sprouts]=ae,n[te.weeping_vines]=ae,n[te.weeping_vines_plant]=ae,n[te.twisting_vines]=ae,n[te.twisting_vines_plant]=ae,n[te.fire]=ae,n[te.soul_fire]=ae,n[te.iron_bars]=ae,n})();var ft=(n=>(n[n.air=0]="air",n[n.stone=1]="stone",n[n.deepslate=2]="deepslate",n[n.dirt=3]="dirt",n[n.grass=4]="grass",n[n.sand=5]="sand",n[n.gravel=6]="gravel",n[n.water=7]="water",n[n.bedrock=8]="bedrock",n[n.planks=9]="planks",n[n.cobblestone=10]="cobblestone",n[n.log=11]="log",n[n.leaves=12]="leaves",n[n.glowstone=13]="glowstone",n[n.obsidian=14]="obsidian",n[n.lava=15]="lava",n[n.sandstone=32]="sandstone",n[n.red_sand=33]="red_sand",n[n.red_sandstone=34]="red_sandstone",n[n.snow_block=35]="snow_block",n[n.powder_snow=36]="powder_snow",n[n.ice=37]="ice",n[n.packed_ice=38]="packed_ice",n[n.mud=39]="mud",n[n.mycelium=40]="mycelium",n[n.podzol=41]="podzol",n[n.coarse_dirt=42]="coarse_dirt",n[n.calcite=43]="calcite",n[n.terracotta=44]="terracotta",n[n.white_terracotta=45]="white_terracotta",n[n.orange_terracotta=46]="orange_terracotta",n[n.yellow_terracotta=47]="yellow_terracotta",n[n.brown_terracotta=48]="brown_terracotta",n[n.red_terracotta=49]="red_terracotta",n[n.light_gray_terracotta=50]="light_gray_terracotta",n[n.granite=51]="granite",n[n.diorite=52]="diorite",n[n.andesite=53]="andesite",n[n.tuff=54]="tuff",n[n.clay=55]="clay",n[n.infested_stone=56]="infested_stone",n[n.infested_deepslate=57]="infested_deepslate",n[n.coal_ore=58]="coal_ore",n[n.deepslate_coal_ore=59]="deepslate_coal_ore",n[n.iron_ore=60]="iron_ore",n[n.deepslate_iron_ore=61]="deepslate_iron_ore",n[n.copper_ore=62]="copper_ore",n[n.deepslate_copper_ore=63]="deepslate_copper_ore",n[n.gold_ore=64]="gold_ore",n[n.deepslate_gold_ore=65]="deepslate_gold_ore",n[n.redstone_ore=66]="redstone_ore",n[n.deepslate_redstone_ore=67]="deepslate_redstone_ore",n[n.emerald_ore=68]="emerald_ore",n[n.deepslate_emerald_ore=69]="deepslate_emerald_ore",n[n.lapis_ore=70]="lapis_ore",n[n.deepslate_lapis_ore=71]="deepslate_lapis_ore",n[n.diamond_ore=72]="diamond_ore",n[n.deepslate_diamond_ore=73]="deepslate_diamond_ore",n[n.raw_iron_block=74]="raw_iron_block",n[n.raw_copper_block=75]="raw_copper_block",n[n.spruce_log=76]="spruce_log",n[n.birch_log=77]="birch_log",n[n.jungle_log=78]="jungle_log",n[n.acacia_log=79]="acacia_log",n[n.dark_oak_log=80]="dark_oak_log",n[n.mangrove_log=81]="mangrove_log",n[n.cherry_log=82]="cherry_log",n[n.pale_oak_log=83]="pale_oak_log",n[n.spruce_leaves=84]="spruce_leaves",n[n.birch_leaves=85]="birch_leaves",n[n.jungle_leaves=86]="jungle_leaves",n[n.acacia_leaves=87]="acacia_leaves",n[n.dark_oak_leaves=88]="dark_oak_leaves",n[n.mangrove_leaves=89]="mangrove_leaves",n[n.cherry_leaves=90]="cherry_leaves",n[n.pale_oak_leaves=91]="pale_oak_leaves",n[n.azalea_leaves=92]="azalea_leaves",n[n.flowering_azalea_leaves=93]="flowering_azalea_leaves",n[n.mushroom_stem=94]="mushroom_stem",n[n.red_mushroom_block=95]="red_mushroom_block",n[n.brown_mushroom_block=96]="brown_mushroom_block",n[n.mangrove_roots=97]="mangrove_roots",n[n.muddy_mangrove_roots=98]="muddy_mangrove_roots",n[n.rooted_dirt=99]="rooted_dirt",n[n.bee_nest=100]="bee_nest",n[n.creaking_heart=101]="creaking_heart",n[n.snow=102]="snow",n[n.moss_carpet=103]="moss_carpet",n[n.pale_moss_carpet=104]="pale_moss_carpet",n[n.vine=105]="vine",n[n.cocoa=106]="cocoa",n[n.pale_hanging_moss=107]="pale_hanging_moss",n[n.mangrove_propagule=108]="mangrove_propagule",n[n.short_grass=109]="short_grass",n[n.fern=110]="fern",n[n.tall_grass=111]="tall_grass",n[n.large_fern=112]="large_fern",n[n.dead_bush=113]="dead_bush",n[n.dandelion=114]="dandelion",n[n.poppy=115]="poppy",n[n.blue_orchid=116]="blue_orchid",n[n.allium=117]="allium",n[n.azure_bluet=118]="azure_bluet",n[n.red_tulip=119]="red_tulip",n[n.orange_tulip=120]="orange_tulip",n[n.white_tulip=121]="white_tulip",n[n.pink_tulip=122]="pink_tulip",n[n.oxeye_daisy=123]="oxeye_daisy",n[n.cornflower=124]="cornflower",n[n.lily_of_the_valley=125]="lily_of_the_valley",n[n.closed_eyeblossom=126]="closed_eyeblossom",n[n.open_eyeblossom=127]="open_eyeblossom",n[n.sunflower=128]="sunflower",n[n.lilac=129]="lilac",n[n.rose_bush=130]="rose_bush",n[n.peony=131]="peony",n[n.brown_mushroom=132]="brown_mushroom",n[n.red_mushroom=133]="red_mushroom",n[n.sweet_berry_bush=134]="sweet_berry_bush",n[n.sugar_cane=135]="sugar_cane",n[n.bamboo=136]="bamboo",n[n.azalea=137]="azalea",n[n.flowering_azalea=138]="flowering_azalea",n[n.pink_petals=139]="pink_petals",n[n.lily_pad=140]="lily_pad",n[n.pumpkin=141]="pumpkin",n[n.melon=142]="melon",n[n.cactus=143]="cactus",n[n.seagrass=144]="seagrass",n[n.tall_seagrass=145]="tall_seagrass",n[n.kelp=146]="kelp",n[n.kelp_plant=147]="kelp_plant",n[n.sea_pickle=148]="sea_pickle",n[n.glow_lichen=149]="glow_lichen",n[n.hanging_roots=150]="hanging_roots",n[n.spore_blossom=151]="spore_blossom",n[n.cave_vines=152]="cave_vines",n[n.cave_vines_plant=153]="cave_vines_plant",n[n.small_dripleaf=154]="small_dripleaf",n[n.big_dripleaf=155]="big_dripleaf",n[n.big_dripleaf_stem=156]="big_dripleaf_stem",n[n.moss_block=157]="moss_block",n[n.pale_moss_block=158]="pale_moss_block",n[n.dripstone_block=159]="dripstone_block",n[n.pointed_dripstone=160]="pointed_dripstone",n[n.smooth_basalt=161]="smooth_basalt",n[n.amethyst_block=162]="amethyst_block",n[n.budding_amethyst=163]="budding_amethyst",n[n.small_amethyst_bud=164]="small_amethyst_bud",n[n.medium_amethyst_bud=165]="medium_amethyst_bud",n[n.large_amethyst_bud=166]="large_amethyst_bud",n[n.amethyst_cluster=167]="amethyst_cluster",n[n.sculk=168]="sculk",n[n.sculk_vein=169]="sculk_vein",n[n.sculk_sensor=170]="sculk_sensor",n[n.sculk_shrieker=171]="sculk_shrieker",n[n.sculk_catalyst=172]="sculk_catalyst",n[n.blue_ice=173]="blue_ice",n[n.mossy_cobblestone=174]="mossy_cobblestone",n[n.magma_block=175]="magma_block",n[n.spawner=176]="spawner",n[n.chest=177]="chest",n[n.bone_block=178]="bone_block",n[n.suspicious_sand=179]="suspicious_sand",n[n.suspicious_gravel=180]="suspicious_gravel",n[n.sandstone_slab=181]="sandstone_slab",n[n.tube_coral_block=182]="tube_coral_block",n[n.tube_coral=183]="tube_coral",n[n.tube_coral_fan=184]="tube_coral_fan",n[n.tube_coral_wall_fan=185]="tube_coral_wall_fan",n[n.brain_coral_block=186]="brain_coral_block",n[n.brain_coral=187]="brain_coral",n[n.brain_coral_fan=188]="brain_coral_fan",n[n.brain_coral_wall_fan=189]="brain_coral_wall_fan",n[n.bubble_coral_block=190]="bubble_coral_block",n[n.bubble_coral=191]="bubble_coral",n[n.bubble_coral_fan=192]="bubble_coral_fan",n[n.bubble_coral_wall_fan=193]="bubble_coral_wall_fan",n[n.fire_coral_block=194]="fire_coral_block",n[n.fire_coral=195]="fire_coral",n[n.fire_coral_fan=196]="fire_coral_fan",n[n.fire_coral_wall_fan=197]="fire_coral_wall_fan",n[n.horn_coral_block=198]="horn_coral_block",n[n.horn_coral=199]="horn_coral",n[n.horn_coral_fan=200]="horn_coral_fan",n[n.horn_coral_wall_fan=201]="horn_coral_wall_fan",n[n.netherrack=202]="netherrack",n[n.soul_sand=203]="soul_sand",n[n.soul_soil=204]="soul_soil",n[n.basalt=205]="basalt",n[n.blackstone=206]="blackstone",n[n.nether_gold_ore=207]="nether_gold_ore",n[n.nether_quartz_ore=208]="nether_quartz_ore",n[n.ancient_debris=209]="ancient_debris",n[n.crimson_nylium=210]="crimson_nylium",n[n.warped_nylium=211]="warped_nylium",n[n.crimson_stem=212]="crimson_stem",n[n.warped_stem=213]="warped_stem",n[n.nether_wart_block=214]="nether_wart_block",n[n.warped_wart_block=215]="warped_wart_block",n[n.shroomlight=216]="shroomlight",n[n.crimson_fungus=217]="crimson_fungus",n[n.warped_fungus=218]="warped_fungus",n[n.crimson_roots=219]="crimson_roots",n[n.warped_roots=220]="warped_roots",n[n.nether_sprouts=221]="nether_sprouts",n[n.weeping_vines=222]="weeping_vines",n[n.weeping_vines_plant=223]="weeping_vines_plant",n[n.twisting_vines=224]="twisting_vines",n[n.twisting_vines_plant=225]="twisting_vines_plant",n[n.fire=226]="fire",n[n.soul_fire=227]="soul_fire",n[n.end_stone=228]="end_stone",n[n.chorus_plant=229]="chorus_plant",n[n.chorus_flower=230]="chorus_flower",n[n.end_gateway=231]="end_gateway",n[n.iron_bars=232]="iron_bars",n[n.bubble_column=233]="bubble_column",n))(ft||{}),Ze=(n=>(n[n.none=0]="none",n[n.water=1]="water",n[n.lava=2]="lava",n))(Ze||{});const li={1:16,2:24};function Dr(n,e,t=!1){return t?li[n]+7:e>=8?n===1?7:15:li[n]+e-1}const a1={kind:0,amount:0,source:!1,falling:!1},or=Array.from({length:256},()=>a1),Zu={kind:1,amount:8,source:!0,falling:!1};for(const n of[1,2]){or[n===1?7:15]={kind:n,amount:8,source:!0,falling:!1};for(let e=1;e<=7;e++)or[li[n]+e-1]={kind:n,amount:e,source:!1,falling:!1};or[li[n]+7]={kind:n,amount:8,source:!1,falling:!0}}const ju=[...kg].map(n=>ft[n.slice(10)]);for(const n of ju)or[n]=Zu;const X=(n,e,t=e,i=e,r={})=>({name:n,textures:{top:e,side:t,bottom:i},solid:!0,breakable:!0,shape:"cube",height:16,...r}),ei=(n,e,t)=>X(n,e,e,e,{solid:!1,shape:"slab",height:t}),oe=(n,e)=>X(n,e,e,e,{solid:!1,shape:"cross"}),gr=(n,e)=>X(n,e,e,e,{solid:!1,breakable:!1}),yt=[X("空气","stone","stone","stone",{solid:!1,breakable:!1}),X("石头","stone"),X("深板岩","deepslate_top","deepslate"),X("泥土","dirt"),X("草方块","grass_top","grass_side","dirt"),X("沙子","sand"),X("沙砾","gravel"),gr("水","water"),X("基岩","bedrock","bedrock","bedrock",{breakable:!1}),X("木板","planks"),X("圆石","cobblestone"),X("原木","log_top","log"),X("树叶","leaves"),X("萤石","glowstone"),X("黑曜石","obsidian"),gr("岩浆","lava")];for(let n=1;n<=7;n++)yt[li[1]+n-1]=gr(`水（流动 ${n}）`,"water");yt[li[1]+7]=gr("水（下落）","water");for(let n=1;n<=7;n++)yt[li[2]+n-1]=gr(`岩浆（流动 ${n}）`,"lava");yt[li[2]+7]=gr("岩浆（下落）","lava");yt.push(X("砂岩","sandstone_top","sandstone"),X("红沙","red_sand"),X("红砂岩","red_sandstone_top","red_sandstone"),X("雪块","snow"),X("细雪","powder_snow"),X("冰","ice"),X("浮冰","packed_ice"),X("泥巴","mud"),X("菌丝体","mycelium_top","mycelium_side","dirt"),X("灰化土","podzol_top","podzol_side","dirt"),X("砂土","coarse_dirt"),X("方解石","calcite"),X("陶瓦","terracotta"),X("白色陶瓦","white_terracotta"),X("橙色陶瓦","orange_terracotta"),X("黄色陶瓦","yellow_terracotta"),X("棕色陶瓦","brown_terracotta"),X("红色陶瓦","red_terracotta"),X("淡灰色陶瓦","light_gray_terracotta"));yt.push(X("花岗岩","granite"),X("闪长岩","diorite"),X("安山岩","andesite"),X("凝灰岩","tuff"),X("黏土","clay"),X("被虫蚀的石头","stone"),X("被虫蚀的深板岩","deepslate_top","deepslate"),X("煤矿石","coal_ore"),X("深层煤矿石","deepslate_coal_ore"),X("铁矿石","iron_ore"),X("深层铁矿石","deepslate_iron_ore"),X("铜矿石","copper_ore"),X("深层铜矿石","deepslate_copper_ore"),X("金矿石","gold_ore"),X("深层金矿石","deepslate_gold_ore"),X("红石矿石","redstone_ore"),X("深层红石矿石","deepslate_redstone_ore"),X("绿宝石矿石","emerald_ore"),X("深层绿宝石矿石","deepslate_emerald_ore"),X("青金石矿石","lapis_ore"),X("深层青金石矿石","deepslate_lapis_ore"),X("钻石矿石","diamond_ore"),X("深层钻石矿石","deepslate_diamond_ore"),X("粗铁块","raw_iron_block"),X("粗铜块","raw_copper_block"),X("云杉原木","spruce_log_top","spruce_log"),X("白桦原木","birch_log_top","birch_log"),X("丛林原木","jungle_log_top","jungle_log"),X("金合欢原木","acacia_log_top","acacia_log"),X("深色橡木原木","dark_oak_log_top","dark_oak_log"),X("红树原木","mangrove_log_top","mangrove_log"),X("樱花原木","cherry_log_top","cherry_log"),X("苍白橡木原木","pale_oak_log_top","pale_oak_log"),X("云杉树叶","spruce_leaves"),X("白桦树叶","birch_leaves"),X("丛林树叶","jungle_leaves"),X("金合欢树叶","acacia_leaves"),X("深色橡木树叶","dark_oak_leaves"),X("红树树叶","mangrove_leaves"),X("樱花树叶","cherry_leaves"),X("苍白橡树树叶","pale_oak_leaves"),X("杜鹃树叶","azalea_leaves"),X("盛开的杜鹃树叶","flowering_azalea_leaves"),X("蘑菇柄","mushroom_stem"),X("红色蘑菇方块","red_mushroom_block"),X("棕色蘑菇方块","brown_mushroom_block"),X("红树根","mangrove_roots"),X("沾泥的红树根","muddy_mangrove_roots"),X("缠根泥土","rooted_dirt"),X("蜂巢","bee_nest_top","bee_nest"),X("嘎枝之心","pale_oak_log_top","creaking_heart"),ei("雪","snow",2),ei("苔藓地毯","moss_carpet",1),ei("苍白苔藓地毯","pale_moss_carpet",1),oe("藤蔓","vine"),oe("可可果","cocoa"),oe("苍白垂须","pale_hanging_moss"),oe("红树胎生苗","mangrove_propagule"));yt.push(oe("矮草丛","short_grass"),oe("蕨","fern"),oe("高草丛","tall_grass"),oe("大型蕨","large_fern"),oe("枯萎的灌木","dead_bush"),oe("蒲公英","dandelion"),oe("虞美人","poppy"),oe("兰花","blue_orchid"),oe("绒球葱","allium"),oe("蓝花美耳草","azure_bluet"),oe("红色郁金香","red_tulip"),oe("橙色郁金香","orange_tulip"),oe("白色郁金香","white_tulip"),oe("粉红色郁金香","pink_tulip"),oe("滨菊","oxeye_daisy"),oe("矢车菊","cornflower"),oe("铃兰","lily_of_the_valley"),oe("闭合的眼眸花","closed_eyeblossom"),oe("张开的眼眸花","open_eyeblossom"),oe("向日葵","sunflower"),oe("丁香","lilac"),oe("玫瑰丛","rose_bush"),oe("牡丹","peony"),oe("棕色蘑菇","brown_mushroom"),oe("红色蘑菇","red_mushroom"),oe("甜浆果丛","sweet_berry_bush"),oe("甘蔗","sugar_cane"),oe("竹子","bamboo"),oe("杜鹃花丛","azalea"),oe("盛开的杜鹃花丛","flowering_azalea"),ei("粉红色花簇","pink_petals",1),ei("睡莲","lily_pad",1),X("南瓜","pumpkin_top","pumpkin"),X("西瓜","melon_top","melon"),X("仙人掌","cactus_top","cactus"),oe("海草","seagrass"),oe("高海草","tall_seagrass"),oe("海带","kelp"),oe("海带茎","kelp_plant"),oe("海泡菜","sea_pickle"),oe("发光地衣","glow_lichen"),oe("垂根","hanging_roots"),oe("孢子花","spore_blossom"),oe("洞穴藤蔓","cave_vines"),oe("洞穴藤蔓（茎）","cave_vines_plant"),oe("小型垂滴叶","small_dripleaf"),oe("大型垂滴叶","big_dripleaf"),oe("大型垂滴叶茎","big_dripleaf_stem"),X("苔藓块","moss_block"),X("苍白苔藓块","pale_moss_block"),X("滴水石块","dripstone_block"),oe("滴水石锥","pointed_dripstone"),X("平滑玄武岩","smooth_basalt"),X("紫水晶块","amethyst_block"),X("紫水晶母岩","budding_amethyst"),oe("小型紫晶芽","small_amethyst_bud"),oe("中型紫晶芽","medium_amethyst_bud"),oe("大型紫晶芽","large_amethyst_bud"),oe("紫水晶簇","amethyst_cluster"),X("幽匿块","sculk"),oe("幽匿脉络","sculk_vein"),ei("幽匿感测体","sculk_sensor",8),ei("幽匿尖啸体","sculk_shrieker",8),X("幽匿催发体","sculk_catalyst"),X("蓝冰","blue_ice"),X("苔石","mossy_cobblestone"),X("岩浆块","magma_block"),X("刷怪笼","spawner"),X("箱子","chest"),X("骨块","bone_block_top","bone_block"),X("可疑的沙子","suspicious_sand"),X("可疑的沙砾","suspicious_gravel"),ei("砂岩台阶","sandstone_slab",8),X("管珊瑚块","tube_coral_block"),oe("管珊瑚","tube_coral"),oe("管珊瑚扇","tube_coral_fan"),oe("管珊瑚壁扇","tube_coral_wall_fan"),X("脑纹珊瑚块","brain_coral_block"),oe("脑纹珊瑚","brain_coral"),oe("脑纹珊瑚扇","brain_coral_fan"),oe("脑纹珊瑚壁扇","brain_coral_wall_fan"),X("气泡珊瑚块","bubble_coral_block"),oe("气泡珊瑚","bubble_coral"),oe("气泡珊瑚扇","bubble_coral_fan"),oe("气泡珊瑚壁扇","bubble_coral_wall_fan"),X("火珊瑚块","fire_coral_block"),oe("火珊瑚","fire_coral"),oe("火珊瑚扇","fire_coral_fan"),oe("火珊瑚壁扇","fire_coral_wall_fan"),X("鹿角珊瑚块","horn_coral_block"),oe("鹿角珊瑚","horn_coral"),oe("鹿角珊瑚扇","horn_coral_fan"),oe("鹿角珊瑚壁扇","horn_coral_wall_fan"));yt.push(X("下界岩","netherrack"),X("灵魂沙","soul_sand"),X("灵魂土","soul_soil"),X("玄武岩","basalt_top","basalt"),X("黑石","blackstone"),X("下界金矿石","nether_gold_ore"),X("下界石英矿石","nether_quartz_ore"),X("远古残骸","ancient_debris_top","ancient_debris"),X("绯红菌岩","crimson_nylium_top","crimson_nylium"),X("诡异菌岩","warped_nylium_top","warped_nylium"),X("绯红菌柄","crimson_stem_top","crimson_stem"),X("诡异菌柄","warped_stem_top","warped_stem"),X("下界疣块","nether_wart_block"),X("诡异疣块","warped_wart_block"),X("菌光体","shroomlight"),oe("绯红菌","crimson_fungus"),oe("诡异菌","warped_fungus"),oe("绯红菌索","crimson_roots"),oe("诡异菌索","warped_roots"),oe("下界苗","nether_sprouts"),oe("垂泪藤","weeping_vines"),oe("垂泪藤（茎）","weeping_vines_plant"),oe("缠怨藤","twisting_vines"),oe("缠怨藤（茎）","twisting_vines_plant"),oe("火","fire"),oe("灵魂火","soul_fire"),X("末地石","end_stone"),X("紫颂植物","chorus_plant"),X("紫颂花","chorus_flower"),X("末地折跃门","end_gateway"),oe("铁栏杆","iron_bars"),X("气泡柱","bubble_column","bubble_column","bubble_column",{solid:!1,shape:"none",breakable:!1}));const Ju={"minecraft:air":0,"minecraft:stone":1,"minecraft:deepslate":2,"minecraft:dirt":3,"minecraft:grass_block":4,"minecraft:sand":5,"minecraft:gravel":6,"minecraft:water":7,"minecraft:lava":15,"minecraft:bedrock":8,"minecraft:obsidian":14,"minecraft:sandstone":32,"minecraft:red_sand":33,"minecraft:red_sandstone":34,"minecraft:snow_block":35,"minecraft:powder_snow":36,"minecraft:ice":37,"minecraft:packed_ice":38,"minecraft:mud":39,"minecraft:mycelium":40,"minecraft:podzol":41,"minecraft:coarse_dirt":42,"minecraft:calcite":43,"minecraft:terracotta":44,"minecraft:white_terracotta":45,"minecraft:orange_terracotta":46,"minecraft:yellow_terracotta":47,"minecraft:brown_terracotta":48,"minecraft:red_terracotta":49,"minecraft:light_gray_terracotta":50,"minecraft:oak_log":11,"minecraft:cobblestone":10,"minecraft:oak_planks":9,"minecraft:glowstone":13,"minecraft:cave_air":0,"minecraft:void_air":0,"minecraft:oak_leaves":12};for(const n of Object.keys(ft)){const e=ft[n];typeof e=="number"&&e>=51&&(Ju[`minecraft:${n}`]=e)}const Rn=[];for(const[n,e]of Object.entries(Ju))Rn[e]??=n;for(let n=16;n<=23;n++)Rn[n]="minecraft:water";for(let n=24;n<=31;n++)Rn[n]="minecraft:lava";const o1=yt.length;function l1(n){const e=or[n];return n>=16&&n<=31||n===7||n===15?{level:String(e.source?0:e.falling?8:8-e.amount)}:ju.includes(n)?{waterlogged:"true"}:{}}const gn=Gg(Array.from({length:o1},(n,e)=>Rn[e]),l1),_t=gn.count,rn=gn.blockOf,Ic=Math.ceil(Math.log2(_t)),c1=(n,e)=>e?Bg(gn,n,e):n,u1=(n,e)=>Kr(gn,n,e),Qu=n=>Wg(gn,n),f1=Array.from({length:_t},(n,e)=>Rn[rn[e]]),h1=Uint8Array.from({length:_t},(n,e)=>["west","east","down","up","north","south"].reduce((t,i,r)=>Kr(gn,e,i)==="true"?t|1<<r:t,0));function $o(n){return Uint8Array.from({length:_t},(e,t)=>n[rn[t]])}const nn=Array.from({length:_t},(n,e)=>Kr(gn,e,"waterlogged")==="true"?Zu:or[rn[e]]),En=Uint8Array.from(nn,n=>n.kind),Uc=n=>En[n]!==0,d1=(()=>{const n=new Uint8Array(_t*6),e=["west","east","down","up","north","south"];for(let t=0;t<_t;t++){const{top:i,side:r,bottom:s}=yt[rn[t]].textures;let a=[r,r,s,i,r,r];const o=c=>Kr(gn,t,c),l=o("axis");l==="x"?a=[i,i,r,r,r,r]:l==="z"&&(a=[r,r,r,r,i,i]),o("snowy")==="true"&&(a=[a[0],a[1],a[2],a[3],a[4],a[5]].map((c,u)=>u===2||u===3?c:"grass_snow_side")),/_mushroom_block$|mushroom_stem$/.test(Rn[rn[t]]??"")&&(a=a.map((c,u)=>o(e[u])==="false"?"mushroom_block_inside":c)),o("berries")==="true"&&(a=a.map(c=>c==="cave_vines"?"cave_vines_lit":c==="cave_vines_plant"?"cave_vines_plant_lit":c)),o("half")==="lower"&&/sunflower|lilac|rose_bush|peony/.test(Rn[rn[t]]??"")&&(a=a.map(()=>"tall_flower_bottom")),n.set(a.map(c=>te[c]),t*6)}return n})(),Co=[4,3,1,10,9,11,13,7,15],Pt=$o(Uint8Array.from({length:256},(n,e)=>yt[e]?.solid?1:0)),er=n=>Pt[n]===1;for(const n of[105,149,169])yt[n].shape="multiface";const p1=$o(Uint8Array.from({length:256},(n,e)=>{const t=yt[e]?.shape;return t==="slab"?1:t==="cross"?2:t==="multiface"?3:t==="none"?4:0})),m1=Uint8Array.from($o(Uint8Array.from({length:256},(n,e)=>yt[e]?.height??16)),(n,e)=>{const t=Kr(gn,e,"layers");return t?Number(t)*2:n});class pn{constructor(e,t,i,r,s,a){this.minX=e,this.minY=t,this.minZ=i,this.maxX=r,this.maxY=s,this.maxZ=a}static body(e,t,i){const r=t/2;return new pn(e.x-r,e.y,e.z-r,e.x+r,e.y+i,e.z+r)}move(e,t,i){return new pn(this.minX+e,this.minY+t,this.minZ+i,this.maxX+e,this.maxY+t,this.maxZ+i)}expandTowards(e,t,i){return new pn(e<0?this.minX+e:this.minX,t<0?this.minY+t:this.minY,i<0?this.minZ+i:this.minZ,e>0?this.maxX+e:this.maxX,t>0?this.maxY+t:this.maxY,i>0?this.maxZ+i:this.maxZ)}deflate(e){return new pn(this.minX+e,this.minY+e,this.minZ+e,this.maxX-e,this.maxY-e,this.maxZ-e)}intersects(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY&&this.minZ<e.maxZ&&this.maxZ>e.minZ}min(e){return e===0?this.minX:e===1?this.minY:this.minZ}max(e){return e===0?this.maxX:e===1?this.maxY:this.maxZ}}const pt=1e-7,Nc=[new pn(0,0,0,1,1,1)],Fc=[];function Po(n,e){const t=[],i=Math.floor(n.minX-pt),r=Math.floor(n.maxX+pt),s=Math.floor(n.minY-pt)-1,a=Math.floor(n.maxY+pt),o=Math.floor(n.minZ-pt),l=Math.floor(n.maxZ+pt);for(let c=i;c<=r;c++)for(let u=s;u<=a;u++)for(let f=o;f<=l;f++)for(const h of e(c,u,f)){const p=h.move(c,u,f);p.intersects(n)&&t.push(p)}return t}function ws(n,e,t,i){if(Math.abs(i)<pt)return 0;const r=(n+1)%3,s=(n+2)%3;for(const a of t)a.max(r)-pt<=e.min(r)||a.min(r)+pt>=e.max(r)||a.max(s)-pt<=e.min(s)||a.min(s)+pt>=e.max(s)||(i>0&&a.min(n)>=e.max(n)-pt?i=Math.min(i,a.min(n)-e.max(n)):i<0&&a.max(n)<=e.min(n)+pt&&(i=Math.max(i,a.max(n)-e.min(n))));return Math.abs(i)<pt?0:i}function Oc(n,e,t){let{x:i,y:r,z:s}=n;r!==0&&(r=ws(1,e,t,r),r!==0&&(e=e.move(0,r,0)));const a=Math.abs(i)<Math.abs(s);return a&&s!==0&&(s=ws(2,e,t,s),s!==0&&(e=e.move(0,0,s))),i!==0&&(i=ws(0,e,t,i),!a&&i!==0&&(e=e.move(i,0,0))),!a&&s!==0&&(s=ws(2,e,t,s)),{x:i,y:r,z:s}}function _1(n,e,t,i,r){const s=Po(n.expandTowards(e.x,e.y,e.z),t),a=Oc(e,n,s),o=e.x!==a.x,l=e.z!==a.z,c=e.y!==a.y&&e.y<0;if(!(c||r)||!(o||l))return a;const u=c?n.move(0,a.y,0):n;let f=u.expandTowards(e.x,i,e.z);c||(f=f.expandTowards(0,-1e-5,0));const h=Po(f,t),p=[];for(const g of h){const m=g.maxY-u.minY;m>a.y+pt&&m<=i+pt&&!p.includes(m)&&p.push(m)}p.sort((g,m)=>g-m);const _=a.x*a.x+a.z*a.z;for(const g of p){const m=Oc({x:e.x,y:g,z:e.z},u,h);if(m.x*m.x+m.z*m.z>_+pt)return{x:m.x,y:m.y+(u.minY-n.minY),z:m.z}}return a}function Ko(n,e){return Po(n,e).length===0}function g1(n,e,t,i){if(e.y>0)return e;const r=(u,f)=>Ko(new pn(n.minX+pt+u,n.minY-i-pt,n.minZ+pt+f,n.maxX-pt+u,n.minY,n.maxZ-pt+f),t),s=.05;let{x:a,z:o}=e;const l=Math.sign(a)*s,c=Math.sign(o)*s;for(;a!==0&&r(a,0);){if(Math.abs(a)<=s){a=0;break}a-=l}for(;o!==0&&r(0,o);){if(Math.abs(o)<=s){o=0;break}o-=c}for(;a!==0&&o!==0&&r(a,o);)a=Math.abs(a)<=s?0:a-l,o=Math.abs(o)<=s?0:o-c;return{x:a,y:e.y,z:o}}function ef(n,e,t,i){return!Ko(pn.body(n,e,t).deflate(pt),i)}const vi=Math.fround;function v1(n,e,t){if(n.prevPos={...n.pos},n.prevWalkDist=n.walkDist,n.prevBob=n.bob,S1(n,t),e.sneak&&!n.flying)n.pose="crouching";else if(n.pose==="crouching"){const c=ku.standing;ef(n.pos,c.width,c.height,t.shape)||(n.pose="standing")}let r=e.forward,s=e.left;n.pose==="crouching"&&(r*=ke.SNEAK_MULTIPLIER,s*=ke.SNEAK_MULTIPLIER);const a=n.inWater&&!n.underWater;!n.sprinting&&e.sprint&&r>=.8&&!a&&!n.inWater&&(n.sprinting=!0),n.sprinting&&(r<=1e-5||n.horizontalCollision||a||n.pose==="crouching")&&(n.sprinting=!1);const o=n.velocity;if(n.flying){const c=(e.jump?1:0)-(e.sneak?1:0);c!==0&&(o.y+=c*ke.FLY_SPEED*3)}if(n.noJumpDelay>0&&n.noJumpDelay--,Math.abs(o.x)<ke.MIN_VELOCITY&&(o.x=0),Math.abs(o.y)<ke.MIN_VELOCITY&&(o.y=0),Math.abs(o.z)<ke.MIN_VELOCITY&&(o.z=0),e.jump&&!n.flying){const c=n.inLava?n.lavaHeight:n.waterHeight,u=n.inWater&&c>0,f=ke.WATER_JUMP_THRESHOLD;(!u||n.onGround&&c<=f)&&(!n.inLava||n.onGround&&c<=f)?(n.onGround||u&&c<=f)&&n.noJumpDelay===0&&(x1(n,e.yaw),n.noJumpDelay=ke.JUMP_DELAY):o.y+=ke.WATER_JUMP}else n.noJumpDelay=0;M1(n,s*.98,r*.98,e,t),n.onGround&&n.flying&&(n.flying=!1);const l=n.onGround&&!n.flying?Math.min(.1,Math.hypot(o.x,o.z)):0;n.bob+=(l-n.bob)*.4}function kc(n,e,t){if(!n.horizontalCollision)return;const i=n.velocity,r=n.body,s=pn.body(n.pos,r.width,r.height).move(i.x,i.y+.6-n.pos.y+e,i.z);Ko(s,t.shape)&&(i.y=.3)}function x1(n,e){n.velocity.y=ke.JUMP_POWER,n.sprinting&&(n.velocity.x+=-Math.sin(e)*ke.SPRINT_JUMP_BOOST,n.velocity.z+=-Math.cos(e)*ke.SPRINT_JUMP_BOOST)}function Da(n,e,t,i,r){const s=t*t+i*i;if(s<1e-7)return;const a=(s>1?1/Math.sqrt(s):1)*e,o=t*a,l=i*a,c=Math.sin(r),u=Math.cos(r);n.velocity.x+=-c*l-u*o,n.velocity.z+=-u*l+c*o}function M1(n,e,t,i,r){const s=n.velocity;if(n.inWater&&!n.flying){const u=n.pos.y,f=n.sprinting?ke.WATER_SPRINT_DRAG:ke.WATER_DRAG;Da(n,ke.WATER_SPEED,e,t,i.yaw),Ia(n,i,r),s.x*=f,s.y*=.8,s.z*=f,s.y-=ke.GRAVITY/16,kc(n,u,r);return}if(n.inLava&&!n.flying){const u=n.pos.y;Da(n,ke.WATER_SPEED,e,t,i.yaw),Ia(n,i,r),n.lavaHeight<=ke.WATER_JUMP_THRESHOLD?(s.x*=.5,s.y*=.8,s.z*=.5,s.y-=ke.GRAVITY/16):(s.x*=.5,s.y*=.5,s.z*=.5),s.y-=ke.GRAVITY/4,kc(n,u,r);return}const a=s.y,o=vi(ke.BLOCK_FRICTION),l=n.onGround?vi(o*vi(ke.AIR_FRICTION)):vi(ke.AIR_FRICTION),c=n.onGround?vi(n.speedAttribute*vi(.21600002/(o*o*o))):n.flying?ke.FLY_SPEED*(n.sprinting?2:1):n.sprinting?ke.AIR_SPRINT_SPEED:ke.AIR_SPEED;Da(n,c,e,t,i.yaw),Ia(n,i,r),s.x*=l,s.z*=l,s.y=(s.y-ke.GRAVITY)*vi(ke.VERTICAL_DRAG),n.flying&&(s.y=a*ke.FLY_VERTICAL_DRAG)}function Ia(n,e,t){const i=n.body,r=pn.body(n.pos,i.width,i.height);let s={...n.velocity};e.sneak&&!n.flying&&n.onGround&&(s=g1(r,s,t.shape,ke.STEP_HEIGHT));const a=_1(r,s,t.shape,ke.STEP_HEIGHT,n.onGround);n.pos.x+=a.x,n.pos.y+=a.y,n.pos.z+=a.z;const o=Math.abs(s.x-a.x)>1e-5,l=Math.abs(s.z-a.z)>1e-5,c=s.y!==a.y,u=Math.hypot(s.x,s.z),f=Math.hypot(a.x,a.z),h=u>1e-5&&f>1e-5&&Math.acos(Math.min(1,(s.x*a.x+s.z*a.z)/(u*f)))<.13962634;n.horizontalCollision=(o||l)&&!h,n.onGround=c&&s.y<0,o&&(n.velocity.x=0),l&&(n.velocity.z=0),c&&(n.velocity.y=0),n.walkDist+=Math.hypot(a.x,a.z)*.6}function Ua(n,e,t,i,r){const s=nn[n.block(e,t,i)];return s.kind!==r?0:nn[n.block(e,t+1,i)].kind===r?1:s.amount/9}function b1(n,e,t,i,r){const s=nn[n.block(e,t,i)],a=s.amount/9;let o=0,l=0;for(const[f,h]of[[0,-1],[0,1],[-1,0],[1,0]]){const p=n.block(e+f,t,i+h),_=nn[p];if(_.kind!==Ze.none&&_.kind!==r)continue;let g=_.kind===r?_.amount/9:0,m=0;if(g===0){if(!Pt[p]){const d=nn[n.block(e+f,t-1,i+h)];(d.kind===r||d.kind===Ze.none)&&(g=d.kind===r?d.amount/9:0,g>0&&(m=a-(g-.8888889)))}}else g>0&&(m=a-g);o+=f*m,l+=h*m}let c=0;if(s.falling){for(const[f,h]of[[0,-1],[0,1],[-1,0],[1,0]])if(Pt[n.block(e+f,t,i+h)]||Pt[n.block(e+f,t+1,i+h)]){const p=Math.hypot(o,l);p>0&&(o/=p,l/=p),c=-6;break}}const u=Math.hypot(o,c,l);return u<1e-4?{x:0,y:0,z:0}:{x:o/u,y:c/u,z:l/u}}function S1(n,e){const t=n.body,i=pn.body(n.pos,t.width,t.height).deflate(.001),r=!n.flying;for(const[c,u]of[[Ze.water,.014],[Ze.lava,.0023333333333333335]]){let f=0,h=0,p=0,_=0,g=0;for(let m=Math.floor(i.minX);m<Math.ceil(i.maxX);m++)for(let d=Math.floor(i.minY);d<Math.ceil(i.maxY);d++)for(let y=Math.floor(i.minZ);y<Math.ceil(i.maxZ);y++){const b=Ua(e,m,d,y,c);if(b===0)continue;const x=d+b;if(!(x<i.minY)&&(f=Math.max(f,x-i.minY),r)){const R=b1(e,m,d,y,c),E=f<.4?f:1;h+=R.x*E,p+=R.y*E,_+=R.z*E,g++}}if(g>0&&Math.hypot(h,p,_)>0){h=h/g*u,p=p/g*u,_=_/g*u;const m=n.velocity,d=Math.hypot(h,p,_);Math.abs(m.x)<.003&&Math.abs(m.z)<.003&&d<.0045&&(h=h/d*.0045,p=p/d*.0045,_=_/d*.0045),m.x+=h,m.y+=p,m.z+=_}c===Ze.water?n.waterHeight=f:n.lavaHeight=f}const s=n.pos.y+t.eye,a=Math.floor(n.pos.x),o=Math.floor(s),l=Math.floor(n.pos.z);n.underWater=s<o+Ua(e,a,o,l,Ze.water),n.underLava=s<o+Ua(e,a,o,l,Ze.lava)}function w1(n,e,t,i,r,s,a,o){let l=Math.floor(n),c=Math.floor(e),u=Math.floor(t);const f=Math.sign(i),h=Math.sign(r),p=Math.sign(s),_=f!==0?Math.abs(1/i):1/0,g=h!==0?Math.abs(1/r):1/0,m=p!==0?Math.abs(1/s):1/0,d=(w,M)=>M>0?Math.floor(w)+1-w:w-Math.floor(w);let y=f!==0?d(n,f)*_:1/0,b=h!==0?d(e,h)*g:1/0,x=p!==0?d(t,p)*m:1/0,R=0,E=0,T=0,P=0;for(;P<=a;){if(o(l,c,u))return{x:l,y:c,z:u,nx:R,ny:E,nz:T,distance:P};y<b&&y<x?(l+=f,P=y,y+=_,R=-f,E=T=0):b<x?(c+=h,P=b,b+=g,E=-h,R=T=0):(u+=p,P=x,x+=m,T=-p,R=E=0)}return null}const y1=70;class E1{scene;camera;player;terrain;control;head=new Yt;spawned=!1;slot=0;target=null;reach=5;bobbing=!0;acc=0;get partialTick(){return this.acc/ke.TICK}eye=1.62;prevEye=1.62;fovMod=1;prevFovMod=1;keys=new Set;lastTap={};sprintByDoubleTap=!1;world;get medium(){return this.player.underLava?"lava":this.player.underWater?"water":"air"}constructor(e,t,i,r){this.scene=e,this.camera=t,this.player=i,this.terrain=r,this.head.rotation.order="YXZ",this.control=new L0(this.head,document.body),this.world={shape:(s,a,o)=>{const l=r.getBlock(s,a,o);return l===null||er(l)?Nc:Fc},block:(s,a,o)=>r.getBlock(s,a,o)??ft.bedrock},this.initKeyboard(),this.initMouse()}get feet(){return this.player.pos}set feet(e){this.teleport(e.x,e.y,e.z)}teleport(e,t,i){this.player.pos={x:e,y:t,z:i},this.player.prevPos={x:e,y:t,z:i},this.player.velocity={x:0,y:0,z:0}}get yaw(){return new mn().setFromQuaternion(this.head.quaternion,"YXZ").y}initKeyboard=()=>{document.addEventListener("keydown",e=>{if(!this.control.isLocked||((e.code==="F3"||e.code==="Tab")&&e.preventDefault(),e.repeat))return;this.keys.add(e.code);const t=performance.now(),i=t-(this.lastTap[e.code]??0)<350;if(this.lastTap[e.code]=t,e.code==="KeyW"&&i&&(this.sprintByDoubleTap=!0),(e.code==="Space"&&i||e.code==="KeyF")&&this.toggleFly(),e.code.startsWith("Digit")){const r=Number(e.code.slice(5));r>=1&&r<=9&&(this.slot=r-1)}}),document.addEventListener("keyup",e=>{this.keys.delete(e.code),e.code==="KeyW"&&(this.sprintByDoubleTap=!1)}),window.addEventListener("blur",()=>this.keys.clear()),this.control.addEventListener("unlock",()=>this.keys.clear())};initMouse=()=>{document.addEventListener("mousedown",e=>{!this.control.isLocked||!this.target||(e.button===0&&this.breakBlock(),e.button===2&&this.placeBlock())}),document.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("wheel",e=>{this.control.isLocked&&(this.slot=(this.slot+(e.deltaY>0?1:-1)+9)%9)},{passive:!0})};toggleFly=()=>{this.player.flying=!this.player.flying,this.player.velocity.y=0};readInput(){const e=this.keys,t=(i,r)=>(e.has(i)?1:0)-(e.has(r)?1:0);return{forward:t("KeyW","KeyS"),left:t("KeyA","KeyD"),jump:e.has("Space"),sneak:e.has("ShiftLeft")||e.has("ShiftRight"),sprint:e.has("KeyR")||this.sprintByDoubleTap,yaw:this.yaw}}breakBlock=()=>{const e=this.target,t=this.terrain.getBlock(e.x,e.y,e.z);t===null||!yt[rn[t]].breakable||this.terrain.setBlock(e.x,e.y,e.z,ft.air)};placeBlock=()=>{const e=this.target,t=e.x+e.nx,i=e.y+e.ny,r=e.z+e.nz,s=this.terrain.getBlock(t,i,r);if(s===null||s!==ft.air&&!Uc(s))return;const a=this.player.body;if(ef(this.player.pos,a.width,a.height,(c,u,f)=>c===t&&u===i&&f===r?Nc:Fc))return;const o=Co[this.slot],l=e.nx!==0?"x":e.ny!==0?"y":"z";this.terrain.setBlock(t,i,r,u1(o,"axis")!==void 0?c1(o,{axis:l}):o)};trySpawn=()=>{const e=this.terrain.info;if(!e)return!1;for(let t=0;t<=48;t+=4)for(let i=0;i<Math.max(1,t*2);i++){const r=i/Math.max(1,t*2)*Math.PI*2,s=Math.floor(Math.cos(r)*t),a=Math.floor(Math.sin(r)*t),o=/nether/.test(e.settings)?this.terrain.floorBelow(s,a,120):this.terrain.topSolidY(s,a);if(o===null){if(!this.terrain.getChunk(s,a))return!1;continue}if(o>=e.seaLevel||/end/.test(e.settings))return this.teleport(s+.5,o+1,a+.5),!0}return this.teleport(.5,e.seaLevel+10,.5),this.player.flying=!0,!0};update=e=>{if(!this.spawned){this.spawned=this.trySpawn(),this.render(1);return}for(this.acc=Math.min(this.acc+e,ke.TICK*5);this.acc>=ke.TICK;)this.acc-=ke.TICK,this.tick();this.render(this.acc/ke.TICK),this.updateTarget()};tick(){const e=this.player;v1(e,this.readInput(),this.world),this.terrain.tick(),e.sprinting||(this.sprintByDoubleTap=!1),this.prevEye=this.eye,this.eye+=(e.body.eye-this.eye)*.5;let t=e.flying?1.1:1;t*=(e.speedAttribute/ke.WALK_SPEED+1)/2,this.prevFovMod=this.fovMod,this.fovMod+=(t-this.fovMod)*.5}render(e){const t=this.player,i=(a,o)=>a+(o-a)*e,r=i(this.prevEye,this.eye);if(this.camera.position.set(i(t.prevPos.x,t.pos.x),i(t.prevPos.y,t.pos.y)+r,i(t.prevPos.z,t.pos.z)),this.camera.quaternion.copy(this.head.quaternion),this.bobbing){const a=t.walkDist-t.prevWalkDist,o=-(t.walkDist+a*e)*Math.PI,l=i(t.prevBob,t.bob),c=Math.PI/180;this.camera.rotateX(-Math.abs(Math.cos(o-.2)*l)*5*c),this.camera.rotateZ(-Math.sin(o)*l*3*c),this.camera.translateX(-Math.sin(o)*l*.5),this.camera.translateY(Math.abs(Math.cos(o)*l))}let s=y1*i(this.prevFovMod,this.fovMod);t.underWater&&(s*=6/7),Math.abs(this.camera.fov-s)>.001&&(this.camera.fov=s,this.camera.updateProjectionMatrix())}updateTarget(){const e=this.player,t=new F(0,0,-1).applyQuaternion(this.head.quaternion),i=this.acc/ke.TICK,r=e.prevPos.x+(e.pos.x-e.prevPos.x)*i,s=e.prevPos.y+(e.pos.y-e.prevPos.y)*i+this.prevEye+(this.eye-this.prevEye)*i,a=e.prevPos.z+(e.pos.z-e.prevPos.z)*i;this.target=w1(r,s,a,t.x,t.y,t.z,this.reach,(o,l,c)=>{const u=this.terrain.getBlock(o,l,c);return u!==null&&u!==ft.air&&!Uc(u)}),this.target?this.terrain.highlight.show(this.target.x,this.target.y,this.target.z):this.terrain.highlight.hide()}get facing(){const e=new F(0,0,-1).applyQuaternion(this.head.quaternion);return Math.abs(e.x)>Math.abs(e.z)?e.x>0?"east (+X)":"west (-X)":e.z>0?"south (+Z)":"north (-Z)"}}qe.enabled=!1;class Gs{camera=new Zt;scene=new Ou;renderer=new E0({antialias:!1});static SKY=10274047;constructor(){this.initScene(),this.initRenderer(),this.initCamera()}initCamera=()=>{this.camera.fov=70,this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.near=.05,this.camera.far=1e3,this.camera.updateProjectionMatrix(),this.camera.position.set(0,120,0),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()})};initScene=()=>{this.scene.fog=new Bo(Gs.SKY,40,80)};initRenderer=()=>{this.renderer.autoClear=!1,this.renderer.outputColorSpace=Ii,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight)})};viewBlocks=96;air={color:new Je(Gs.SKY),near:57.6,far:96};medium="air";setFogDistance=e=>{this.viewBlocks=e,this.camera.far=e+64,this.camera.updateProjectionMatrix(),this.applyFog()};setAirFog=(e,t,i)=>{this.air.color.setRGB(...e),this.air.near=t,this.air.far=i,this.applyFog()};setMedium=e=>{e!==this.medium&&(this.medium=e,this.applyFog())};get fogColor(){return this.scene.fog.color}applyFog(){const e=this.scene.fog;this.medium==="water"?(e.color.setHex(2047887),e.near=2,e.far=Math.min(48,this.viewBlocks)):this.medium==="lava"?(e.color.setHex(10033664),e.near=.25,e.far=1.5):(e.color.copy(this.air.color),e.near=this.air.near,e.far=this.air.far)}}const A1=Math.fround,Zr=Math.PI*2;function T1(n){return/nether/.test(n)?18e3:/end/.test(n)?6e3:null}function R1(n){const e=z1(n/24e3-.25),t=.5-Math.cos(e*Math.PI)/2;return A1((e*2+t)/3)}const tf=n=>n*Zr,C1=n=>(Math.floor(n/24e3)%8+8)%8;function P1(n){let e=1-(Math.cos(n*Zr)*2+.2);return e=Ti(e,0,1),e=1-e,e*.8+.2}function nf(n){return Ti(Math.cos(n*Zr)*2+.5,0,1)}function L1(n){const e=Ti(1-(Math.cos(n*Zr)*2+.25),0,1);return e*e*.5}function rf(n){const e=Math.cos(n*Zr);if(e<-.4||e>.4)return null;const t=e/.4*.5+.5;let i=1-(1-Math.sin(t*Math.PI))*.99;return i*=i,[t*.3+.7,t*t*.7+.2,.2,i]}const zc=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],D1=n=>/nether/.test(n)?"nether":/end/.test(n)?"end":"overworld";function I1(n,e){const t=nf(e);return[n[0]*t,n[1]*t,n[2]*t]}function U1(n,e,t,i,r,s,a,o){const l=nf(i);let c;if(n==="overworld"?c=[e[0]*(l*.94+.06),e[1]*(l*.94+.06),e[2]*(l*.91+.09)]:n==="end"?c=[e[0]*.15,e[1]*.15,e[2]*.15]:c=[...e],s>=4&&n==="overworld"){const f=Math.sin(tf(i))>0?-1:1;let h=r[0]*f;h<0&&(h=0);const p=rf(i);if(h>0&&p){h*=p[3];for(let _=0;_<3;_++)c[_]=c[_]*(1-h)+p[_]*h}}if(n!=="nether"){let f=.25+.75*s/32;f=1-Math.pow(f,.25);for(let h=0;h<3;h++)c[h]+=(t[h]-c[h])*f}let u=(a-o)*(n==="overworld"?.03125:1);if(u<1){u<0&&(u=0),u*=u;for(let f=0;f<3;f++)c[f]*=u}return c}function N1(n,e=new Uint8Array(256*3)){const t=P1(n.t),i=t*.95+.05,r=[xi(.35,t,1),xi(.35,t,1),1],s=n.flicker+1.5,a=n.dim==="nether"?.1:0,o=n.dim==="end",l=c=>{const u=c/(4-3*c);return xi(a,u,1)};for(let c=0;c<16;c++)for(let u=0;u<16;u++){const f=l(u/15)*s,h=l(c/15)*i;let p=[f,f*((f*.6+.4)*.6+.4),f*(f*f*.6+.4)];o?p=p.map((g,m)=>Ti(xi(.25,g,[.99,1.12,1][m]),0,1)):(p=p.map((g,m)=>xi(.04,g+r[m]*h,.75)),p=p.map(g=>Ti(g,0,1))),p=p.map(g=>xi(n.gamma,g,1-Math.pow(1-g,4))),p=p.map(g=>Ti(xi(.04,g,.75),0,1));const _=(c*16+u)*3;e[_]=Math.round(p[0]*255),e[_+1]=Math.round(p[1]*255),e[_+2]=Math.round(p[2]*255)}return e}function F1(n,e=Math.random){return n+=(e()-e())*e()*e()*.1,n*.9}function O1(n){const e=[];for(let t=0;t<1500;t++){const i=n.nextFloat()*2-1,r=n.nextFloat()*2-1,s=n.nextFloat()*2-1,a=.15+n.nextFloat()*.1,o=i*i+r*r+s*s;if(o<=.010000001||o>=1)continue;const l=Math.sqrt(o),c=[i/l*100,r/l*100,s/l*100],u=n.nextDouble()*Math.PI*2,f=Hc([-c[0],-c[1],-c[2]]),h=Hc(Gc([0,1,0],f)),p=Gc(f,h),_=Math.cos(-u),g=Math.sin(-u);for(const[m,d]of[[a,-a],[a,a],[-a,a],[-a,-a]]){const y=m*_-d*g,b=m*g+d*_;e.push(c[0]+h[0]*y+p[0]*b,c[1]+h[1]*y+p[1]*b,c[2]+h[2]*y+p[2]*b)}}return Float32Array.from(e)}function k1(n,e){if(n==="nether")return{start:e*.05,end:Math.min(e,192)*.5};const t=Ti(e/10,4,64);return{start:e-t,end:e}}const z1=n=>n-Math.floor(n),Ti=(n,e,t)=>n<e?e:n>t?t:n,xi=(n,e,t)=>e+n*(t-e),Hc=n=>{const e=Math.hypot(n[0],n[1],n[2]);return[n[0]/e,n[1]/e,n[2]/e]},Gc=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]];class H1{scene=new Ou;camera=new Zt(70,1,.1,1e3);fog=[.75,.85,1];biomeSky=zc(7907327);biomeFog=zc(12638463);gamma=.5;dim="overworld";flicker=0;dome;sunrise;celestial=new nr;sun;moon;stars;lm=new Uint8Array(256*3);constructor(){this.dome=new Ct(new Xo(500,32,16),new Tn({side:zt,depthWrite:!1,depthTest:!1,uniforms:{skyColor:{value:new Je},fogColor:{value:new Je},renderDistance:{value:96},belowHorizon:{value:!1},end:{value:!1}},vertexShader:`
          varying vec3 vDir;
          void main() {
            vDir = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,fragmentShader:`
          uniform vec3 skyColor;
          uniform vec3 fogColor;
          uniform float renderDistance;
          uniform bool belowHorizon;
          uniform bool end;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            vec3 c = fogColor;
            if (end) {
              c = vec3(40.0 / 255.0); // 原版末地天空：0x282828 的底色（贴图换成纯色）
            } else if (d.y > 0.0) {
              // 和 y = 16 的天空盘的交点：水平距离 r；盘外（r > 512）是清屏色
              float r = 16.0 * length(d.xz) / d.y;
              if (r < 512.0) {
                float dist = 16.0 + r * (496.0 / 512.0);
                c = mix(skyColor, fogColor, clamp(dist / renderDistance, 0.0, 1.0));
              }
            } else if (belowHorizon && d.y < 0.0) {
              float r = 16.0 * length(d.xz) / -d.y;
              if (r < 512.0) c = mix(vec3(0.0), fogColor, clamp((16.0 + r * (496.0 / 512.0)) / renderDistance, 0.0, 1.0));
            }
            gl_FragColor = vec4(c, 1.0);
          }`})),this.dome.renderOrder=0,this.scene.add(this.dome);const e=new _n;e.setAttribute("position",new Rt(new Float32Array(54),3)),e.setAttribute("color",new Rt(new Float32Array(72),4));const t=[];for(let o=0;o<16;o++)t.push(0,o+1,o+2);e.setIndex(t),this.sunrise=new Ct(e,new Hr({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:tn})),this.sunrise.renderOrder=1,this.scene.add(this.sunrise);const i=o=>new Hr({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:tn,blending:su,blendSrc:Fs,blendDst:au});this.sun=new Ct(new _r(60,60),i(G1())),this.sun.position.set(0,100,0),this.sun.rotation.x=Math.PI/2,this.moon=new Ct(new _r(40,40),i(V1())),this.moon.position.set(0,-100,0),this.moon.rotation.x=-Math.PI/2;const r=new _n,s=O1(new Ai(10842n));r.setAttribute("position",new Rt(s,3));const a=[];for(let o=0;o<s.length/12;o++)a.push(o*4,o*4+1,o*4+2,o*4+2,o*4+3,o*4);r.setIndex(a),this.stars=new Ct(r,i(null));for(const o of[this.sun,this.moon,this.stars])o.renderOrder=2,this.celestial.add(o);this.scene.add(this.celestial)}update(e,t,i,r){const s=R1(e),a=i*16;this.flicker=F1(this.flicker),N1({dim:this.dim,t:s,flicker:this.flicker,gamma:this.gamma},this.lm);const o=new F;t.getWorldDirection(o);const l=this.dim==="overworld"?I1(this.biomeSky,s):[0,0,0];this.fog=U1(this.dim,this.biomeFog,l,s,[o.x,o.y,o.z],i,t.position.y,r);const c=this.dome.material.uniforms;c.skyColor.value.setRGB(...l),c.fogColor.value.setRGB(...this.fog),c.renderDistance.value=a,c.belowHorizon.value=t.position.y<63,c.end.value=this.dim==="end";const u=this.dim==="overworld";this.dome.visible=this.dim!=="nether";const f=u?rf(s):null;if(this.sunrise.visible=f!==null,f){const y=this.sunrise.geometry.attributes.position,b=this.sunrise.geometry.attributes.color;y.setXYZ(0,0,100,0),b.setXYZW(0,f[0],f[1],f[2],f[3]);for(let R=0;R<=16;R++){const E=R*Math.PI*2/16;y.setXYZ(R+1,Math.sin(E)*120,Math.cos(E)*120,-Math.cos(E)*40*f[3]),b.setXYZW(R+1,f[0],f[1],f[2],0)}y.needsUpdate=!0,b.needsUpdate=!0;const x=Math.sin(tf(s))<0?Math.PI:0;this.sunrise.quaternion.setFromAxisAngle(new F(1,0,0),Math.PI/2).multiply(new Pi().setFromAxisAngle(new F(0,0,1),x)).multiply(new Pi().setFromAxisAngle(new F(0,0,1),Math.PI/2))}this.celestial.visible=u,this.celestial.rotation.set(s*Math.PI*2,-Math.PI/2,0,"YXZ");const h=C1(Math.floor(e)),p=this.moon.geometry.attributes.uv,_=h%4/4,g=h<4?.5:0;p.setXY(0,_,g+.5),p.setXY(1,_+.25,g+.5),p.setXY(2,_,g),p.setXY(3,_+.25,g),p.needsUpdate=!0;const m=L1(s);this.stars.visible=m>0,this.stars.material.color.setRGB(m,m,m),this.stars.material.opacity=m;const d=k1(this.dim,a);return{color:this.fog,start:d.start,end:d.end,lightmap:this.lm}}render(e,t,i,r){e.setClearColor(i,1),e.clear(),r&&(this.camera.fov=t.fov,this.camera.aspect=t.aspect,this.camera.updateProjectionMatrix(),t.getWorldQuaternion(this.camera.quaternion),e.render(this.scene,this.camera))}setDimension(e){this.dim=D1(e)}}function G1(){const e=new Uint8Array(4096);for(let t=0;t<32;t++)for(let i=0;i<32;i++){const r=Math.max(Math.abs(i-15.5),Math.abs(t-15.5)),s=(t*32+i)*4;let a=0;r<4?a=1:r<8&&(a=.3*(1-(r-4)/4)),e[s]=255*a,e[s+1]=255*a,e[s+2]=200*a,e[s+3]=255}return sf(e,32,32)}function V1(){const t=new Uint8Array(32768),i=[[12,12,2],[19,17,3],[13,20,1.5],[20,11,1.5]];for(let r=0;r<8;r++){const s=r%4*32,a=r<4?0:32,o=r<=4?1-r/4:(r-4)/4;for(let l=8;l<24;l++)for(let c=8;c<24;c++){const u=(c-8+.5)/16;if(!(r<=4?u>=1-o:u<=o))continue;let h=.85;for(const[_,g,m]of i)Math.hypot(c-_,l-g)<m&&(h=.6);const p=((a+l)*128+s+c)*4;t[p]=t[p+1]=255*h,t[p+2]=255*(h+.05>1?1:h+.05),t[p+3]=255}}return sf(t,128,64)}function sf(n,e,t){const i=new Uint8Array(n.length);for(let s=0;s<t;s++)i.set(n.subarray(s*e*4,(s+1)*e*4),(t-1-s)*e*4);const r=new Wo(i,e,t,kt);return r.magFilter=r.minFilter=Nt,r.needsUpdate=!0,r}class Na{constructor(e,t,i){if(this.bits=e,this.size=t,e<1||e>32)throw new Error(`bits 必须在 1..32 之间：${e}`);this.valuesPerWord=Math.floor(32/e),this.mask=e===32?4294967295:(1<<e)-1;const r=Math.ceil(t/this.valuesPerWord);if(i&&i.length!==r)throw new Error(`数据长度不对：需要 ${r}，实际 ${i.length}`);this.data=i??new Uint32Array(r)}data;valuesPerWord;mask;get(e){const t=e/this.valuesPerWord|0,i=(e-t*this.valuesPerWord)*this.bits;return this.data[t]>>>i&this.mask}set(e,t){const i=e/this.valuesPerWord|0,r=(e-i*this.valuesPerWord)*this.bits;this.data[i]=this.data[i]&~(this.mask<<r)|(t&this.mask)<<r}}const Fn=4096,Vc=4,Ji=8;class Gr{constructor(e,t=0){this.globalBits=e,this.palette=[t],this.lookup.set(t,0)}bits=0;palette;lookup=new Map;storage=null;get(e){if(this.bits===0)return this.palette[0];const t=this.storage.get(e);return this.bits>Ji?t:this.palette[t]}set(e,t){const i=this.get(e);if(i===t)return i;const r=this.idFor(t);return this.storage.set(e,r),i}idFor(e){if(this.bits>Ji)return e;const t=this.lookup.get(e);if(t!==void 0&&this.bits>0)return t;const i=this.palette.length+(t===void 0?1:0),r=this.bits===0?1:1<<this.bits;return i>r&&this.resize(i),this.bits>Ji?e:t!==void 0?t:(this.palette.push(e),this.lookup.set(e,this.palette.length-1),this.palette.length-1)}resize(e){const t=new Array(Fn);for(let s=0;s<Fn;s++)t[s]=this.get(s);const i=Math.ceil(Math.log2(e)),r=i<=Ji?Math.max(Vc,i):this.globalBits;if(this.bits=r,this.storage=new Na(r,Fn),r>Ji){this.palette=[],this.lookup.clear();for(let s=0;s<Fn;s++)this.storage.set(s,t[s])}else for(let s=0;s<Fn;s++)this.storage.set(s,this.lookup.get(t[s]))}static fromValues(e,t){const i=new Gr(t,e[0]),r=[],s=new Map;for(let l=0;l<Fn;l++)s.has(e[l])||(s.set(e[l],r.length),r.push(e[l]));if(r.length===1)return i;const a=Math.ceil(Math.log2(r.length)),o=a>Ji;i.bits=o?t:Math.max(Vc,a),i.storage=new Na(i.bits,Fn),i.palette=o?[]:r,i.lookup=o?new Map:s;for(let l=0;l<Fn;l++)i.storage.set(l,o?e[l]:s.get(e[l]));return i}toData(){return{bits:this.bits,palette:this.palette.slice(),data:this.storage?.data??null}}static fromData(e,t){const i=new Gr(t,e.palette[0]??0);return i.bits=e.bits,i.palette=e.palette,i.lookup=new Map(e.palette.map((r,s)=>[r,s])),i.storage=e.bits===0?null:new Na(e.bits,Fn,e.data),i}get isSingle(){return this.bits===0}get byteSize(){return(this.storage?.data.byteLength??0)+this.palette.length}}class lr{constructor(e=new Gr(Ic,ft.air)){this.blocks=e,this.recount()}nonAir=0;static index(e,t,i){return(t*16+i)*16+e}get(e,t,i){return this.blocks.get(lr.index(e,t,i))}set(e,t,i,r){const s=this.blocks.set(lr.index(e,t,i),r);s===ft.air&&r!==ft.air?this.nonAir++:s!==ft.air&&r===ft.air&&this.nonAir--}get isEmpty(){return this.nonAir===0}recount(){const e=this.blocks;if(e.isSingle){this.nonAir=e.palette[0]===ft.air?0:4096;return}let t=0;for(let i=0;i<4096;i++)e.get(i)!==ft.air&&t++;this.nonAir=t}static fromData(e){return new lr(Gr.fromData(e,Ic))}}const Tt=16;class Bc{constructor(e,t,i,r,s,a){this.cx=e,this.cz=t,this.minY=i,this.height=r;const o=r>>4;this.sections=s??Array.from({length:o},()=>new lr),a?this.flat=a:(this.flat=new Uint16Array(r*256),this.sections.forEach((l,c)=>{for(let u=0;u<4096;u++)this.flat[c*4096+u]=l.blocks.get(u)})),this.meshes=new Array(o).fill(null),this.waterMeshes=new Array(o).fill(null)}sections;meshes;waterMeshes;staleSections=new Set;flat;light=null;lighting=!1;version=0;sectionIndex(e){return e-this.minY>>4}static index(e,t,i,r){return((t-r)*Tt+i)*Tt+e}get(e,t,i){return t<this.minY||t>=this.minY+this.height?ft.air:this.flat[((t-this.minY)*16+i)*16+e]}set(e,t,i,r){if(t<this.minY||t>=this.minY+this.height)return;const s=t-this.minY;this.sections[s>>4].set(e,s&15,i,r),this.flat[(s*16+i)*16+e]=r,this.version++}setRaw(e,t){this.flat[e]=t,this.sections[e>>12].blocks.set(e&4095,t)}lightIndex(e,t,i){return((t-this.minY)*18+i+1)*18+e+1}get byteSize(){let e=0;for(const t of this.sections)e+=t.blocks.byteSize;return e}disposeSection(e,t){for(const i of[this.meshes,this.waterMeshes]){const r=i[t];r&&(e.remove(r),r.geometry.dispose(),i[t]=null)}}dispose(e){for(let t=0;t<this.sections.length;t++)this.disposeSection(e,t)}}const Ir={[Ze.water]:{tickDelay:5,dropOff:1,slopeFindDistance:4,convertToSource:!0},[Ze.lava]:{tickDelay:30,dropOff:2,slopeFindDistance:2,convertToSource:!1}},Fa=nn[ft.air],ys=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];class B1{constructor(e){this.world=e}time=0;queue=new Map;pending=new Set;maxPerTick=4e3;lastProcessed=0;get queued(){return this.pending.size}clear(){this.queue.clear(),this.pending.clear()}fluidAt(e,t,i){const r=this.world.get(e,t,i);return r===null?Fa:nn[r]}blocked(e,t,i){const r=this.world.get(e,t,i);return r===null||Pt[r]===1}schedule(e,t,i,r,s=Ir[r].tickDelay){const a=`${e},${t},${i},${r}`;if(this.pending.has(a))return;this.pending.add(a);const o=this.time+Math.max(1,s);let l=this.queue.get(o);l||this.queue.set(o,l=[]),l.push({x:e,y:t,z:i,kind:r})}blockChanged(e,t,i){this.notify(e,t,i);for(const[r,s,a]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])this.notify(e+r,t+s,i+a)}notify(e,t,i){const r=this.fluidAt(e,t,i);r.kind!==Ze.none&&(r.kind===Ze.lava&&this.solidifyLava(e,t,i,r)||this.schedule(e,t,i,r.kind))}solidifyLava(e,t,i,r){for(const[s,a,o]of[[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]])if(this.fluidAt(e+s,t+a,i+o).kind===Ze.water)return this.setAndUpdate(e,t,i,r.source?ft.obsidian:ft.cobblestone),!0;return!1}setAndUpdate(e,t,i,r){this.world.set(e,t,i,r),this.blockChanged(e,t,i)}tick(){this.time++;let e=0;for(const t of[...this.queue.keys()].sort((i,r)=>i-r)){if(t>this.time)break;const i=this.queue.get(t);for(;i.length>0&&e<this.maxPerTick;){const r=i.shift();this.pending.delete(`${r.x},${r.y},${r.z},${r.kind}`),e++,this.tickFluid(r)}if(i.length===0&&this.queue.delete(t),e>=this.maxPerTick)break}this.lastProcessed=e}tickFluid({x:e,y:t,z:i,kind:r}){if(this.world.get(e,t,i)===null)return;let s=this.fluidAt(e,t,i);if(s.kind===r){if(!s.source){const a=this.getNewLiquid(e,t,i,r),o=this.spreadDelay(e,t,i,s,a);a.kind===Ze.none?(s=a,this.setAndUpdate(e,t,i,ft.air)):(a.amount!==s.amount||a.falling!==s.falling||a.source!==s.source)&&(s=a,this.world.set(e,t,i,Dr(r,a.amount,a.falling)),this.schedule(e,t,i,r,o),this.blockChanged(e,t,i))}this.spread(e,t,i,s)}}spreadDelay(e,t,i,r,s){const a=r.kind;let o=Ir[a].tickDelay;return a===Ze.lava&&r.kind!==Ze.none&&s.kind!==Ze.none&&!r.falling&&!s.falling&&this.height(e,t,i,s)>this.height(e,t,i,r)&&Math.random()<.75&&(o*=4),o}height(e,t,i,r){return this.fluidAt(e,t+1,i).kind===r.kind?1:r.amount/9}getNewLiquid(e,t,i,r){if(this.blocked(e,t,i))return Fa;const s=Ir[r];let a=0,o=0;for(const[c,,u]of ys){if(this.blocked(e+c,t,i+u))continue;const f=this.fluidAt(e+c,t,i+u);f.kind===r&&(f.source&&o++,a=Math.max(a,f.amount))}if(s.convertToSource&&o>=2){const c=this.world.get(e,t-1,i),u=this.fluidAt(e,t-1,i);if(c!==null&&Pt[c]||u.kind===r&&u.source)return nn[Dr(r,8)]}if(this.fluidAt(e,t+1,i).kind===r&&!this.blocked(e,t+1,i))return nn[Dr(r,8,!0)];const l=a-s.dropOff;return l<=0?Fa:nn[Dr(r,l)]}spread(e,t,i,r){if(r.kind===Ze.none)return;const s=r.kind,a=this.getNewLiquid(e,t-1,i,s);this.canSpreadTo(e,t-1,i,"down",a.kind)?(this.spreadTo(e,t-1,i,"down",a),this.sourceNeighborCount(e,t,i,s)>=3&&this.spreadToSides(e,t,i,r)):(r.source||!this.isHole(e,t,i))&&this.spreadToSides(e,t,i,r)}spreadToSides(e,t,i,r){const s=r.kind;let a=r.amount-Ir[s].dropOff;if(r.falling&&(a=7),!(a<=0))for(const[o,l,c]of this.getSpread(e,t,i,s))this.canSpreadTo(e+o,t,i+l,"side",c.kind)&&this.spreadTo(e+o,t,i+l,"side",c)}getSpread(e,t,i,r){let s=1e3,a=[];for(const[o,,l]of ys){const c=e+o,u=i+l,f=this.getNewLiquid(c,t,u,r);if(!this.canPassThrough(c,t,u,r))continue;const h=this.isHole(c,t,u)?0:this.slopeDistance(c,t,u,1,-o,-l,r);h<s&&(a=[]),h<=s&&(a.push([o,l,f]),s=h)}return a}slopeDistance(e,t,i,r,s,a,o){let l=1e3;for(const[c,,u]of ys){if(c===s&&u===a)continue;const f=e+c,h=i+u;if(this.canPassThrough(f,t,h,o)){if(this.isHole(f,t,h))return r;r<Ir[o].slopeFindDistance&&(l=Math.min(l,this.slopeDistance(f,t,h,r+1,-c,-u,o)))}}return l}isHole(e,t,i){return!this.blocked(e,t-1,i)}canPassThrough(e,t,i,r){if(this.blocked(e,t,i))return!1;const s=this.fluidAt(e,t,i);return!(s.kind===r&&s.source)}sourceNeighborCount(e,t,i,r){let s=0;for(const[a,,o]of ys){const l=this.fluidAt(e+a,t,i+o);l.kind===r&&l.source&&s++}return s}canSpreadTo(e,t,i,r,s){if(this.blocked(e,t,i)||s===Ze.none)return!1;const a=this.fluidAt(e,t,i);return a.kind===Ze.none?!0:a.kind===Ze.water?r==="down"&&s===Ze.lava:s===Ze.water&&this.height(e,t,i,a)>=.44444445}spreadTo(e,t,i,r,s){if(r==="down"&&s.kind===Ze.lava&&this.fluidAt(e,t,i).kind===Ze.water){this.setAndUpdate(e,t,i,ft.stone);return}this.setAndUpdate(e,t,i,Dr(s.kind,s.amount,s.falling))}}const Es=.02,Wc=1.002;class W1{mesh=new nr;constructor(e){const t=new Hr({color:0,transparent:!0,opacity:.55}),i=Wc/2;for(const r of[0,1,2]){const s=[Es,Es,Es];s[r]=Wc+Es;const a=new Mr(s[0],s[1],s[2]);for(const o of[-i,i])for(const l of[-i,i]){const c=[o,l];c.splice(r,0,0);const u=new Ct(a,t);u.position.set(c[0],c[1],c[2]),this.mesh.add(u)}}this.mesh.visible=!1,e.add(this.mesh)}show(e,t,i){this.mesh.position.set(e+.5,t+.5,i+.5),this.mesh.visible=!0}hide(){this.mesh.visible=!1}}function Xc(n){const e=$u();let t=e,i=Ks;n&&(t=new Uint8Array(e.length+n.length),t.set(e),t.set(n,e.length),i+=n.length/(pe*pe*4));const r=new Go(t,pe,pe,i);return r.format=kt,r.type=sn,r.wrapS=r.wrapT=Os,r.magFilter=Nt,r.minFilter=Fr,r.generateMipmaps=!0,r.needsUpdate=!0,r}const X1={"minecraft:air":[0,0],"minecraft:stone":[15,0],"minecraft:deepslate":[15,0],"minecraft:dirt":[15,0],"minecraft:grass_block":[15,0],"minecraft:sand":[15,0],"minecraft:gravel":[15,0],"minecraft:water":[1,0],"minecraft:bedrock":[15,0],"minecraft:oak_planks":[15,0],"minecraft:cobblestone":[15,0],"minecraft:oak_log":[15,0],"minecraft:oak_leaves":[1,0],"minecraft:glowstone":[15,15],"minecraft:obsidian":[15,0],"minecraft:lava":[1,15],"minecraft:sandstone":[15,0],"minecraft:red_sand":[15,0],"minecraft:red_sandstone":[15,0],"minecraft:snow_block":[15,0],"minecraft:powder_snow":[1,0],"minecraft:ice":[1,0],"minecraft:packed_ice":[15,0],"minecraft:mud":[15,0],"minecraft:mycelium":[15,0],"minecraft:podzol":[15,0],"minecraft:coarse_dirt":[15,0],"minecraft:calcite":[15,0],"minecraft:terracotta":[15,0],"minecraft:white_terracotta":[15,0],"minecraft:orange_terracotta":[15,0],"minecraft:yellow_terracotta":[15,0],"minecraft:brown_terracotta":[15,0],"minecraft:red_terracotta":[15,0],"minecraft:light_gray_terracotta":[15,0],"minecraft:granite":[15,0],"minecraft:diorite":[15,0],"minecraft:andesite":[15,0],"minecraft:tuff":[15,0],"minecraft:clay":[15,0],"minecraft:infested_stone":[15,0],"minecraft:infested_deepslate":[15,0],"minecraft:coal_ore":[15,0],"minecraft:deepslate_coal_ore":[15,0],"minecraft:iron_ore":[15,0],"minecraft:deepslate_iron_ore":[15,0],"minecraft:copper_ore":[15,0],"minecraft:deepslate_copper_ore":[15,0],"minecraft:gold_ore":[15,0],"minecraft:deepslate_gold_ore":[15,0],"minecraft:redstone_ore":[[15,9],[15,0]],"minecraft:deepslate_redstone_ore":[[15,9],[15,0]],"minecraft:emerald_ore":[15,0],"minecraft:deepslate_emerald_ore":[15,0],"minecraft:lapis_ore":[15,0],"minecraft:deepslate_lapis_ore":[15,0],"minecraft:diamond_ore":[15,0],"minecraft:deepslate_diamond_ore":[15,0],"minecraft:raw_iron_block":[15,0],"minecraft:raw_copper_block":[15,0],"minecraft:spruce_log":[15,0],"minecraft:birch_log":[15,0],"minecraft:jungle_log":[15,0],"minecraft:acacia_log":[15,0],"minecraft:dark_oak_log":[15,0],"minecraft:mangrove_log":[15,0],"minecraft:cherry_log":[15,0],"minecraft:pale_oak_log":[15,0],"minecraft:spruce_leaves":[1,0],"minecraft:birch_leaves":[1,0],"minecraft:jungle_leaves":[1,0],"minecraft:acacia_leaves":[1,0],"minecraft:dark_oak_leaves":[1,0],"minecraft:mangrove_leaves":[1,0],"minecraft:cherry_leaves":[1,0],"minecraft:pale_oak_leaves":[1,0],"minecraft:azalea_leaves":[1,0],"minecraft:flowering_azalea_leaves":[1,0],"minecraft:mushroom_stem":[15,0],"minecraft:red_mushroom_block":[15,0],"minecraft:brown_mushroom_block":[15,0],"minecraft:mangrove_roots":[1,0],"minecraft:muddy_mangrove_roots":[15,0],"minecraft:rooted_dirt":[15,0],"minecraft:bee_nest":[15,0],"minecraft:creaking_heart":[15,0],"minecraft:snow":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[15,0]],"minecraft:moss_carpet":[0,0],"minecraft:pale_moss_carpet":[0,0],"minecraft:vine":[0,0],"minecraft:cocoa":[0,0],"minecraft:pale_hanging_moss":[0,0],"minecraft:mangrove_propagule":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:short_grass":[0,0],"minecraft:fern":[0,0],"minecraft:tall_grass":[0,0],"minecraft:large_fern":[0,0],"minecraft:dead_bush":[0,0],"minecraft:dandelion":[0,0],"minecraft:poppy":[0,0],"minecraft:blue_orchid":[0,0],"minecraft:allium":[0,0],"minecraft:azure_bluet":[0,0],"minecraft:red_tulip":[0,0],"minecraft:orange_tulip":[0,0],"minecraft:white_tulip":[0,0],"minecraft:pink_tulip":[0,0],"minecraft:oxeye_daisy":[0,0],"minecraft:cornflower":[0,0],"minecraft:lily_of_the_valley":[0,0],"minecraft:closed_eyeblossom":[0,0],"minecraft:open_eyeblossom":[0,0],"minecraft:sunflower":[0,0],"minecraft:lilac":[0,0],"minecraft:rose_bush":[0,0],"minecraft:peony":[0,0],"minecraft:brown_mushroom":[0,1],"minecraft:red_mushroom":[0,0],"minecraft:sweet_berry_bush":[0,0],"minecraft:sugar_cane":[0,0],"minecraft:bamboo":[0,0],"minecraft:azalea":[0,0],"minecraft:flowering_azalea":[0,0],"minecraft:pink_petals":[0,0],"minecraft:lily_pad":[0,0],"minecraft:pumpkin":[15,0],"minecraft:melon":[15,0],"minecraft:cactus":[0,0],"minecraft:seagrass":[1,0],"minecraft:tall_seagrass":[1,0],"minecraft:kelp":[1,0],"minecraft:kelp_plant":[1,0],"minecraft:sea_pickle":[[1,6],[1,9],[1,12],[1,15]],"minecraft:glow_lichen":[[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,0],[0,7],[0,0]],"minecraft:hanging_roots":[[1,0],[0,0]],"minecraft:spore_blossom":[0,0],"minecraft:cave_vines":[[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0]],"minecraft:cave_vines_plant":[[0,14],[0,0]],"minecraft:small_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf_stem":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:moss_block":[15,0],"minecraft:pale_moss_block":[15,0],"minecraft:dripstone_block":[15,0],"minecraft:pointed_dripstone":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:smooth_basalt":[15,0],"minecraft:amethyst_block":[15,0],"minecraft:budding_amethyst":[15,0],"minecraft:small_amethyst_bud":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:medium_amethyst_bud":[[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2]],"minecraft:large_amethyst_bud":[[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4]],"minecraft:amethyst_cluster":[[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5]],"minecraft:sculk":[15,0],"minecraft:sculk_vein":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[1,0]],"minecraft:sculk_sensor":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:sculk_shrieker":[1,0],"minecraft:sculk_catalyst":[15,6],"minecraft:blue_ice":[15,0],"minecraft:mossy_cobblestone":[15,0],"minecraft:magma_block":[15,3],"minecraft:spawner":[1,0],"minecraft:chest":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:bone_block":[15,0],"minecraft:suspicious_sand":[15,0],"minecraft:suspicious_gravel":[15,0],"minecraft:sandstone_slab":[[1,0],[0,0],[1,0],[0,0],[15,0],[15,0]],"minecraft:tube_coral_block":[15,0],"minecraft:tube_coral":[1,0],"minecraft:tube_coral_fan":[1,0],"minecraft:tube_coral_wall_fan":[1,0],"minecraft:brain_coral_block":[15,0],"minecraft:brain_coral":[1,0],"minecraft:brain_coral_fan":[1,0],"minecraft:brain_coral_wall_fan":[1,0],"minecraft:bubble_coral_block":[15,0],"minecraft:bubble_coral":[1,0],"minecraft:bubble_coral_fan":[1,0],"minecraft:bubble_coral_wall_fan":[1,0],"minecraft:fire_coral_block":[15,0],"minecraft:fire_coral":[1,0],"minecraft:fire_coral_fan":[1,0],"minecraft:fire_coral_wall_fan":[1,0],"minecraft:horn_coral_block":[15,0],"minecraft:horn_coral":[1,0],"minecraft:horn_coral_fan":[1,0],"minecraft:horn_coral_wall_fan":[1,0],"minecraft:netherrack":[15,0],"minecraft:soul_sand":[15,0],"minecraft:soul_soil":[15,0],"minecraft:basalt":[15,0],"minecraft:blackstone":[15,0],"minecraft:nether_gold_ore":[15,0],"minecraft:nether_quartz_ore":[15,0],"minecraft:ancient_debris":[15,0],"minecraft:crimson_nylium":[15,0],"minecraft:warped_nylium":[15,0],"minecraft:crimson_stem":[15,0],"minecraft:warped_stem":[15,0],"minecraft:nether_wart_block":[15,0],"minecraft:warped_wart_block":[15,0],"minecraft:shroomlight":[15,15],"minecraft:crimson_fungus":[0,0],"minecraft:warped_fungus":[0,0],"minecraft:crimson_roots":[0,0],"minecraft:warped_roots":[0,0],"minecraft:nether_sprouts":[0,0],"minecraft:weeping_vines":[0,0],"minecraft:weeping_vines_plant":[0,0],"minecraft:twisting_vines":[0,0],"minecraft:twisting_vines_plant":[0,0],"minecraft:fire":[0,15],"minecraft:soul_fire":[0,10],"minecraft:end_stone":[15,0],"minecraft:chorus_plant":[1,0],"minecraft:chorus_flower":[1,0],"minecraft:end_gateway":[1,15],"minecraft:iron_bars":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0]],"minecraft:bubble_column":[1,0]},Li=new Uint8Array(_t).fill(15),Xt=new Uint8Array(_t);for(let n=0;n<_t;n++){const e=X1[f1[n]??""];if(!e)continue;const t=Array.isArray(e[0])?e[gn.indexOf[n]]:e;Li[n]=t[0],Xt[n]=t[1]}const vr=new Uint8Array(_t);for(let n=0;n<_t;n++)/^minecraft:snow(\[layers=[1-7]\])?$|_slab\[type=bottom|^minecraft:(calibrated_)?sculk_sensor|^minecraft:sculk_shrieker/.test(Qu(n))&&(vr[n]=1);function Y1(n,e,t,i=Li,r=vr){let s=t-1;for(;s>=0&&i[n[e(s)]]===0&&(s===t-1||!r[n[e(s+1)]]);)s--;return s+1}const As=18;function q1(n,e,t,i,r){for(let a=-1;a<=16;a++){const o=t*16+a,l=(a+1)*18*18;o<0?r.fill(0,l,l+324):o>=e?r.fill(i?15:0,l,l+324):r.set(n.subarray(o*As*As,(o+1)*As*As),l)}}const af=["west","east","down","up","north","south"],Yc=Object.fromEntries(af.map((n,e)=>[n,e])),Us=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],ti=n=>n.includes(":")?n.slice(n.indexOf(":")+1):n;function $1(n,e,t){const i=ti(e);if(t.has(i))return t.get(i);t.set(i,null);const r=[];let s=i;for(;s&&r.length<32;){const u=n.model(s);if(!u)break;r.push(u),s=u.parent?ti(u.parent):void 0}if(r.length===0)return null;const a={};for(let u=r.length-1;u>=0;u--)Object.assign(a,r[u].textures);const o=r.find(u=>u.elements)?.elements??[],l=r.find(u=>u.ambientocclusion!==void 0)?.ambientocclusion??!0,c={elements:o,textures:a,ao:l};return t.set(i,c),c}function K1(n,e){let t=e;for(let i=0;i<16&&t.startsWith("#");i++){const r=n[t.slice(1)];if(r===void 0)return null;t=r}return t.startsWith("#")?null:ti(t)}const qc={down:[[0,0,1],[0,0,0],[1,0,0],[1,0,1]],up:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]],north:[[1,1,0],[1,0,0],[0,0,0],[0,1,0]],south:[[0,1,1],[0,0,1],[1,0,1],[1,1,1]],west:[[0,1,0],[0,0,0],[0,0,1],[0,1,1]],east:[[1,1,1],[1,0,1],[1,0,0],[1,1,0]]};function Oa(n,e){const[t,i,r]=e;switch(n){case"down":return[t,16-r];case"up":return[t,r];case"north":return[16-t,16-i];case"south":return[t,16-i];case"west":return[r,16-i];default:return[16-r,16-i]}}function Vr(n,e,t){const i=t*Math.PI/180,r=u=>Math.abs(u-Math.round(u))<1e-9?Math.round(u):u,s=r(Math.cos(i)),a=r(Math.sin(i)),[o,l,c]=n;return e==="x"?[o,l*s-c*a,l*a+c*s]:e==="y"?[o*s+c*a,l,-o*a+c*s]:[o*s-l*a,o*a+l*s,c]}function Z1(n,e,t){let i=[n[0]-.5,n[1]-.5,n[2]-.5];return e&&(i=Vr(i,"x",-e)),t&&(i=Vr(i,"y",-t)),[i[0]+.5,i[1]+.5,i[2]+.5]}function j1(n,e,t){let i=Us[n];return e&&(i=Vr(i,"x",-e)),t&&(i=Vr(i,"y",-t)),of(i)}function of(n){let e=0,t=-1/0;for(let i=0;i<6;i++){const r=n[0]*Us[i][0]+n[1]*Us[i][1]+n[2]*Us[i][2];r>t+1e-6&&(t=r,e=i)}return e}const J1=1/Math.cos(Math.PI/8)-1,Q1=1/Math.cos(Math.PI/4)-1;function ex(n,e,t,i){const r=$1(n,e.model,t);if(!r)return[];const s=e.x??0,a=e.y??0,o=[];for(const l of r.elements){const c=l.from,u=l.to;for(const[f,h]of Object.entries(l.faces)){const p=K1(r.textures,h.texture);if(!p||!qc[f])continue;const _=qc[f].map(R=>[R[0]?u[0]:c[0],R[1]?u[1]:c[1],R[2]?u[2]:c[2]]),g=h.uv??(()=>{const R=Oa(f,c),E=Oa(f,u);return[Math.min(R[0],E[0]),Math.min(R[1],E[1]),Math.max(R[0],E[0]),Math.max(R[1],E[1])]})(),m=(h.rotation??0)/90|0;let d=_.map((R,E)=>{const T=(E+m)%4;return[g[T===0||T===1?0:2],g[T===0||T===3?1:3]]}),y=_.map(R=>[R[0]/16,R[1]/16,R[2]/16]);if(l.rotation&&l.rotation.angle){const{origin:R,axis:E,angle:T,rescale:P}=l.rotation,w=[R[0]/16,R[1]/16,R[2]/16],M=P?(Math.abs(T)===22.5?J1:Q1)+1:1,C=[E==="x"?1:M,E==="y"?1:M,E==="z"?1:M];y=y.map(H=>{const N=Vr([H[0]-w[0],H[1]-w[1],H[2]-w[2]],E,T);return[N[0]*C[0]+w[0],N[1]*C[1]+w[1],N[2]*C[2]+w[2]]})}y=y.map(R=>Z1(R,s,a));const b=of(tx(y));if(e.uvlock&&(s||a)){const R=af[b];d=y.map(E=>Oa(R,[E[0]*16,E[1]*16,E[2]*16]));for(const E of[0,1]){const T=Math.floor(Math.min(...d.map(P=>P[E]))/16+1e-6)*16;for(const P of d)P[E]-=T}}const x=h.cullface&&Yc[h.cullface==="bottom"?"down":h.cullface]!==void 0?j1(Yc[h.cullface==="bottom"?"down":h.cullface],s,a):-1;o.push({pos:y.flatMap(R=>R.map(ka)),uv:d.flatMap(R=>[ka(R[0]/16),ka(R[1]/16)]),tex:i(p),face:b,cull:x,tint:h.tintindex??-1,shade:l.shade??!0,ao:r.ao})}}return o}const ka=n=>{const e=Math.round(n*4096)/4096;return Object.is(e,-0)?0:e};function tx(n){const e=[n[1][0]-n[0][0],n[1][1]-n[0][1],n[1][2]-n[0][2]],t=[n[2][0]-n[0][0],n[2][1]-n[0][1],n[2][2]-n[0][2]];let i=[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]];if(Math.hypot(...i)<1e-9){const r=[n[3][0]-n[0][0],n[3][1]-n[0][1],n[3][2]-n[0][2]];i=[t[1]*r[2]-t[2]*r[1],t[2]*r[0]-t[0]*r[2],t[0]*r[1]-t[1]*r[0]]}return i}function Lo(n,e){return n?"OR"in n?n.OR.some(t=>Lo(t,e)):"AND"in n?n.AND.every(t=>Lo(t,e)):Object.entries(n).every(([t,i])=>String(i).split("|").includes(e[t])):!0}function nx(n,e){return n===""||n==="normal"?!0:n.split(",").every(t=>{const[i,r]=t.split("=");return e[i]===r})}function ix(n,e){const t=Array.isArray(n)?n:[n];return{weights:t.map(i=>i.weight??1),choices:t.map(e)}}function rx(n,e){const t=[],i=new Map,r=f=>{let h=i.get(f);return h===void 0&&(h=t.length,t.push(f),i.set(f,h)),h},s=new Map,a=new Map,o=f=>{const h=`${ti(f.model)}|${f.x??0}|${f.y??0}|${f.uvlock?1:0}`;let p=a.get(h);return p||a.set(h,p=ex(n,f,s,r)),p},l=new Map,c=f=>{let h=l.get(f);return h||l.set(f,h=ix(f,o)),h},u=e.map(f=>{if(!f)return null;const h=n.blockstate(f.name);if(!h)return null;let p=[];if(h.variants){const _=Object.keys(h.variants).find(g=>nx(g,f.props));_!==void 0&&(p=[c(h.variants[_])])}else h.multipart&&(p=h.multipart.filter(_=>Lo(_.when,f.props)).map(_=>c(_.apply)));return p.some(_=>_.choices.some(g=>g.length>0))?p:null});return{textures:t,states:u}}let ci=null;const Zo=Ks,lf=32,sx=64,Zs=128,cf=[6396257,8431445,2129968],ax=/^(grass_block|short_grass|tall_grass|fern|large_fern|potted_fern|sugar_cane|pink_petals)$/,ox=/^(oak_leaves|jungle_leaves|acacia_leaves|dark_oak_leaves|mangrove_leaves|vine)$/,lx=/^(water|bubble_column|water_cauldron)$/,$c={spruce_leaves:4,birch_leaves:5,lily_pad:6},cx=/^(ice|frosted_ice|.*stained_glass(_pane)?|tinted_glass|slime_block|honey_block|nether_portal|water|bubble_column)$/,ux=/leaves$|glass|^ice$|frosted_ice|mangrove_roots|spawner|slime_block|honey_block|^chest$|end_gateway|cactus|chorus/,fx=/glass$|^ice$|frosted_ice|slime_block|honey_block/,Br=new Uint8Array(_t),Wr=new Uint8Array(_t),uf=new Uint8Array(_t),ff=new Uint8Array(_t),hf=new Float32Array(_t),Di=[],Do=new Map;function df(n){const e=n.join(",");let t=Do.get(e);return t===void 0&&(t=Di.length+1,Di.push(n),Do.set(e,t)),t}let ir=[];const Xr=new Int32Array(_t*6);function pf(n){const e=Ku[n],t=e&3,i=(e&4)!==0;return t|(i?lf:t?sx:0)}const mf=n=>(Rn[rn[n]]??"").replace(/^minecraft:/,"");function _f(n,e,t){const i=mf(n);let r=0;return e>=0&&(ax.test(i)?r=1:ox.test(i)?r=2:lx.test(i)?r=3:$c[i]&&(r=$c[i])),r|lf|(cx.test(i)||/water_(still|flow)/.test(t)?Zs:0)}const hx=/^(dandelion|poppy|blue_orchid|allium|azure_bluet|.*_tulip|oxeye_daisy|cornflower|lily_of_the_valley|wither_rose|torchflower|open_eyeblossom|closed_eyeblossom|sunflower|lilac|rose_bush|peony|tall_grass|large_fern|crimson_roots|warped_roots|nether_sprouts|mangrove_propagule|bamboo_sapling|bamboo|pointed_dripstone|hanging_roots)$/,dx=/^(short_grass|fern|small_dripleaf)$/;function gf(n){ci=n,Di.length=0,Do.clear(),ir=new Array(_t).fill(null);for(let e=0;e<_t;e++){const t=mf(e),i=n?.states[e]??null;Br[e]=i?1:0,uf[e]=n&&fx.test(t)?1:0,ff[e]=n?dx.test(t)?2:hx.test(t)?1:0:0,hf[e]=/^(pointed_dripstone|bamboo)$/.test(t)?.125:.25;for(let r=0;r<6;r++){const s=d1[e*6+r];Xr[e*6+r]=df([s,pf(s),1,0,0,1,0,0])}Wr[e]=Pt[e],Br[e]&&(i.length===1&&(ir[e]=i[0].choices.map(r=>px(e,r))),Wr[e]=Pt[e]&&!ux.test(t)&&ir[e]!==null&&ir[e].every(r=>r.faces.every(s=>s>0))?1:0)}}function px(n,e){const t=new Int32Array(6),i=new Int32Array(6);for(const s of e)i[s.face]++;const r=[];for(const s of e){const a=i[s.face]===1&&s.cull===s.face&&s.shade&&s.ao?mx(n,s):null;a?t[s.face]=df(a):r.push(s)}return{faces:t,rest:r}}function mx(n,e){const t=e.face>>1,i=e.face&1?1:0;for(let h=0;h<4;h++){if(e.pos[h*3+t]!==i)return null;for(let p=0;p<3;p++)if(p!==t&&e.pos[h*3+p]!==0&&e.pos[h*3+p]!==1)return null}const r=[0,1,2,3].map(h=>jo(e.face,e.pos[h*3],e.pos[h*3+1],e.pos[h*3+2])),s=[0,1,2,3].map(h=>[e.uv[h*2],e.uv[h*2+1]]),a=[r[1][0]-r[0][0],r[1][1]-r[0][1]],o=[r[3][0]-r[0][0],r[3][1]-r[0][1]],l=a[0]*o[1]-a[1]*o[0];if(Math.abs(l)<1e-9)return null;const c=[0,0,0,0];for(const h of[0,1]){const p=s[1][h]-s[0][h],_=s[3][h]-s[0][h];c[h*2]=(p*o[1]-_*a[1])/l,c[h*2+1]=(a[0]*_-o[0]*p)/l}if(!c.every(h=>h===0||h===1||h===-1))return null;const u=[s[0][0]-c[0]*r[0][0]-c[1]*r[0][1],s[0][1]-c[2]*r[0][0]-c[3]*r[0][1]];for(let h=0;h<4;h++)for(const p of[0,1])if(Math.abs(c[p*2]*r[h][0]+c[p*2+1]*r[h][1]+u[p]-s[h][p])>1e-6)return null;if(!u.every(h=>Math.abs(h-Math.round(h))<1e-6))return null;const f=ci.textures[e.tex];return[Zo+e.tex,_f(n,e.tint,f),c[0],c[1],c[2],c[3],Math.round(u[0]),Math.round(u[1])]}function jo(n,e,t,i){switch(n){case 0:return[i,-t];case 1:return[-i,-t];case 2:return[e,-i];case 3:return[e,i];case 4:return[-e,-t];default:return[e,-t]}}function _x(n){const e=n===Ze.water?"block/water_still":"block/lava_still",t=ci?ci.textures.indexOf(e):-1;if(t<0){const i=n===Ze.water?te.water:te.lava;return{layer:i,tint:pf(i)}}return{layer:Zo+t,tint:n===Ze.water?3|Zs:0}}function gx(n){const e=Array.from({length:_t},(i,r)=>{const s=rn[r],a=Rn[s];return s===ft.air||!a||a==="minecraft:water"||a==="minecraft:lava"?null:{name:a.replace(/^minecraft:/,""),props:zu(gn,r)}}),t=rx(n,e);for(const i of["block/water_still","block/lava_still"])t.textures.includes(i)||t.textures.push(i);return t}gf(null);const Jn=18,Mt=(n,e,t)=>((e+1)*Jn+(t+1))*Jn+(n+1),vx=256,Vn=256,Io=256,Jo=[102,153,204,255],Yr=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],Kc=1<<20,Zc=1<<21,xx=4095;class jc{pos=new Uint16Array(4096*3);uvs=new Int16Array(4096*2);inf=new Uint16Array(4096*4);lig=new Uint8Array(4096*2);ind=new Uint32Array(4096*1.5);vertices=0;indexCount=0;grow(){const e=t=>{const i=new t.constructor(t.length*2);return i.set(t),i};this.pos=e(this.pos),this.uvs=e(this.uvs),this.inf=e(this.inf),this.lig=e(this.lig),this.ind=e(this.ind)}put(e,t,i,r,s,a,o,l,c){((this.vertices+4)*4>this.inf.length||this.indexCount+6>this.ind.length)&&this.grow();const u=this.vertices;for(let f=0;f<4;f++){for(let h=0;h<3;h++)this.pos[(u+f)*3+h]=Math.min(65535,Math.max(0,Math.round(e[f*3+h])));this.uvs[(u+f)*2]=Math.round(t[f*2]*Io),this.uvs[(u+f)*2+1]=Math.round(t[f*2+1]*Io),this.inf[(u+f)*4]=i,this.inf[(u+f)*4+1]=r,this.inf[(u+f)*4+2]=a[f]|(l?vx:0),this.inf[(u+f)*4+3]=s,this.lig[(u+f)*2]=o[f*2],this.lig[(u+f)*2+1]=o[f*2+1]}for(const f of c)this.ind[this.indexCount++]=u+f;this.vertices+=4}rect(e,t,i,r,s,a,o,l,c,u=!1){const f=l?[0,1,3,0,3,2]:[0,1,2,2,1,3],h=o?f:[f[0],f[2],f[1],f[3],f[5],f[4]];this.put(e,t,i,r,s,a,c,u,h)}ccw(e,t,i,r,s,a,o,l){this.put(e,t,i,r,s,a,o,l,[0,1,2,0,2,3])}build(){return{positions:this.pos.slice(0,this.vertices*3),uv:this.uvs.slice(0,this.vertices*2),info:this.inf.slice(0,this.vertices*4),light:this.lig.slice(0,this.vertices*2),indices:this.vertices<=65536?Uint16Array.from(this.ind.subarray(0,this.indexCount)):this.ind.slice(0,this.indexCount)}}}const ri=new Uint8Array(_t);ri[ft.magma_block]=1;function yn(n,e,t){const i=n[t];if(ri[i])return 255;const r=e?e[t]:15,s=Xt[i];return r>>4>=s?r:r&15|s<<4}function vf(n,e,t,i,r,s,a){const o=s>>1,l=(o+1)%3,c=(o+2)%3,u=yn(n,e,Mt(t,i,r));for(let f=0;f<4;f++){const h=f&1?1:-1,p=f&2?1:-1,_=l===0?h:0,g=l===1?h:0,m=l===2?h:0,d=c===0?p:0,y=c===1?p:0,b=c===2?p:0,x=Mt(t+_,i+g,r+m),R=Mt(t+d,i+y,r+b),E=Mt(t+_+d,i+g+y,r+m+b),T=Pt[n[x]],P=Pt[n[R]],w=Pt[n[E]];a[f]=T&&P?0:3-(T+P+w);const M=!T||Li[n[x]]===0,C=!P||Li[n[R]]===0,H=yn(n,e,x)||u,N=yn(n,e,R)||u,W=(M||C?yn(n,e,E):yn(n,e,x))||u;a[4+f]=(H&15)+(N&15)+(W&15)+(u&15),a[8+f]=(H>>4)+(N>>4)+(W>>4)+(u>>4)}}const Ur=new Ai(0n);function xf(n,e,t,i,r){r.length=n.length;let s=null;for(let a=0;a<n.length;a++){const o=n[a];if(o.weights.length===1){r[a]=0;continue}s===null&&(Ur.setSeed(Hs(e,t,i)),s=n.length>1?Ur.nextLong():0n),n.length>1?Ur.setSeed(s):Ur.setSeed(Hs(e,t,i));const l=o.weights.reduce((f,h)=>f+h,0);let c=Ur.nextInt(l),u=0;for(;u<o.weights.length-1&&(c-=o.weights[u])>=0;)u++;r[a]=u}}function Mx(n,e,t,i){i[0]=i[1]=i[2]=0;const r=ff[n];if(!r)return;const s=Number(BigInt.asIntN(32,Hs(e,0,t))),a=hf[n],o=l=>Math.min(a,Math.max(-a,l));i[0]=o(((s&15)/15-.5)*.5),r===2&&(i[1]=((s>>4&15)/15-1)*.2),i[2]=o(((s>>8&15)/15-.5)*.5)}const Mf=(n,e)=>Wr[e]===1||uf[n]===1&&rn[e]===rn[n];function bx(n,e={}){const t=e.greedy??!0,i=e.light,[r,s,a]=e.origin??[0,0,0],o=new jc,l=new jc,c=new Int32Array(256),u=new Float64Array(256),f=new Uint8Array(256*8),h=new Float64Array(256),p=new Float32Array(256*4),_=new Uint8Array(256),g=new Int32Array(12),m=[0,0,0],d=[0,0,0],y=new Int16Array(4096).fill(-1),b=[],x=(E,T,P,w)=>{const M=(P*16+w)*16+T;if(y[M]<0){const C=ci.states[E];C[0].weights.length===1?y[M]=0:(xf(C,r+T,s+P,a+w,b),y[M]=b[0])}return y[M]},R=(E,T,P,w,M)=>{if(Br[E]){const C=ir[E];return C?C[C.length===1?0:x(E,P,w,M)].faces[T]:0}return Pt[E]?Xr[E*6+T]:0};for(let E=0;E<6;E++){const T=Yr[E],P=E>>1,w=(P+1)%3,M=(P+2)%3,C=(E&1)===1;for(let H=0;H<16;H++){let N=!1;for(let W=0;W<16;W++)for(let K=0;K<16;K++){m[P]=H,m[w]=K,m[M]=W;const z=n[Mt(m[0],m[1],m[2])],Q=n[Mt(m[0]+T[0],m[1]+T[1],m[2]+T[2])],G=W*16+K;if(c[G]=0,h[G]=0,Wr[Q]&&En[z]===Ze.none)continue;const le=R(z,E,m[0],m[1],m[2]);if(le){if(Mf(z,Q))continue;if(d[0]=m[0]+T[0],d[1]=m[1]+T[1],d[2]=m[2]+T[2],Xt[z]>0||ri[z]===1){const $=yn(n,i,Mt(d[0],d[1],d[2])),he=ri[z]?60:($&15)*4,se=Math.max($>>4,Xt[z],ri[z]?15:0)*4;for(let Me=0;Me<4;Me++)g[Me]=3,g[4+Me]=he,g[8+Me]=se}else vf(n,i,d[0],d[1],d[2],E,g);let ue=0,ce=0;for(let $=0;$<4;$++)ue|=g[$]<<$*2,f[G*8+$*2]=g[4+$],f[G*8+$*2+1]=g[8+$],ce=ce*4096+g[4+$]*64+g[8+$];const Le=$=>g[4+$]*64+g[8+$],Y=(g[0]===g[1]&&g[2]===g[3]&&Le(0)===Le(1)&&Le(2)===Le(3)?Kc:0)|(g[0]===g[2]&&g[1]===g[3]&&Le(0)===Le(2)&&Le(1)===Le(3)?Zc:0);c[G]=le|ue<<12|Y,u[G]=ce,N=!0}else if(En[z]!==Ze.none&&!Pt[z]){const de=En[z];if(En[Q]===de||E!==3&&Pt[Q])continue;const ue=Tx(n,m[0],m[1],m[2],de);p.set(ue,G*4);const ce=yn(n,i,Mt(m[0],m[1],m[2])),Le=yn(n,i,Mt(m[0],m[1]+1,m[2])),Y=Math.max(ce&15,Le&15)|Math.max(ce>>4,Le>>4)<<4;_[G]=Y;const $=E===3?ue:E===2?null:E===0?[ue[0],ue[2]]:E===1?[ue[1],ue[3]]:E===4?[ue[0],ue[1]]:[ue[2],ue[3]],he=!$||$.every(Me=>Me===$[0]);let se=de*256+Y;for(const Me of $??[])se=se*257+Math.round(Me*Vn);h[G]=se*2+(he?1:0),N=!0}}if(N)for(const W of[c,h])for(let K=0;K<16;K++)for(let z=0;z<16;){const Q=W[K*16+z];if(Q===0){z++;continue}const G=W===h,le=t&&(G?Q%2===1:(Q&Kc)!==0),de=t&&(G?Q%2===1:(Q&Zc)!==0);let ue=1,ce=1;const Le=G?0:u[K*16+z],Y=he=>W[he]===Q&&(G||u[he]===Le);if(le)for(;z+ue<16&&Y(K*16+z+ue);)ue++;if(de)e:for(;K+ce<16;){for(let he=0;he<ue;he++)if(!Y((K+ce)*16+z+he))break e;ce++}const $=K*16+z;G?Ax(o,l,n,p.subarray($*4,$*4+4),E,P,w,M,C,H,z,K,ue,ce,_[$]):Ex(o,l,Q,E,P,w,M,C,H,z,K,ue,ce,f.subarray($*8,$*8+8));for(let he=0;he<ce;he++)for(let se=0;se<ue;se++)W[(K+he)*16+z+se]=0;z+=ue}}}return ci&&Sx(o,l,n,i,r,s,a,x),wx(o,n,i),{opaque:o.build(),water:l.build()}}function Sx(n,e,t,i,r,s,a,o){const l=Vn,c=new Int32Array(12),u=new Float64Array(4),f=new Float64Array(12),h=[0,0,0,0],p=[0,0,0,0,0,0,0,0],_=[],g=[0,0,0];for(let m=0;m<16;m++)for(let d=0;d<16;d++)for(let y=0;y<16;y++){const b=t[Mt(y,m,d)];if(!Br[b])continue;const x=ci.states[b],R=ir[b];let E;if(R?E=R[R.length===1?0:o(b,y,m,d)].rest:(xf(x,r+y,s+m,a+d,_),E=x.flatMap((P,w)=>P.choices[_[w]])),E.length===0)continue;Mx(b,r+y,a+d,g);const T=Xt[b]>0||ri[b]===1;for(const P of E){if(P.cull>=0){const ce=Yr[P.cull];if(Mf(b,t[Mt(y+ce[0],m+ce[1],d+ce[2])]))continue}const w=P.face,M=w>>1,C=(M+1)%3,H=(M+2)%3,N=Yr[w],W=w&1?1:0;let K=!0;for(let ce=0;ce<4;ce++)Math.abs(P.pos[ce*3+M]-W)>1e-4&&(K=!1);const z=K||Pt[b]===1,Q=z?y+N[0]:y,G=z?m+N[1]:m,le=z?d+N[2]:d;if(P.ao&&!T){vf(t,i,Q,G,le,w,c);for(let ce=0;ce<4;ce++){const Le=Math.min(1,Math.max(0,P.pos[ce*3+C])),Y=Math.min(1,Math.max(0,P.pos[ce*3+H]));u[0]=(1-Le)*(1-Y),u[1]=Le*(1-Y),u[2]=(1-Le)*Y,u[3]=Le*Y;let $=0,he=0,se=0;for(let Me=0;Me<4;Me++)$+=u[Me]*Jo[c[Me]],he+=u[Me]*c[4+Me],se+=u[Me]*c[8+Me];h[ce]=Math.round($),p[ce*2]=Math.round(he),p[ce*2+1]=Math.round(se)}}else{const ce=yn(t,i,Mt(Q,G,le)),Le=ri[b]?60:(ce&15)*4,Y=Math.max(ce>>4,Xt[b],ri[b]?15:0)*4;for(let $=0;$<4;$++)h[$]=255,p[$*2]=Le,p[$*2+1]=Y}for(let ce=0;ce<4;ce++)f[ce*3]=(y+P.pos[ce*3]+g[0])*l,f[ce*3+1]=(m+P.pos[ce*3+1]+g[1])*l,f[ce*3+2]=(d+P.pos[ce*3+2]+g[2])*l;const de=_f(b,P.tint,ci.textures[P.tex]);(de&Zs?e:n).ccw(f,P.uv,w,Zo+P.tex,de,h,p,!P.shade)}}}function wx(n,e,t){const i=Vn,r=[3,3,3,3].map(a=>Jo[a]),s=a=>{const o=yn(e,t,a),l=(o&15)*4,c=(o>>4)*4;return[l,c,l,c,l,c,l,c]};for(let a=0;a<16;a++)for(let o=0;o<16;o++)for(let l=0;l<16;l++){const c=e[Mt(l,a,o)];if(Br[c])continue;const u=p1[c];if(u===0||u===4)continue;const f=s(Mt(l,a,o));if(u===1){const h=m1[c]/16;for(let p=0;p<6;p++){const _=Yr[p],g=Mt(l+_[0],a+_[1],o+_[2]);if(p!==3&&Wr[e[g]])continue;const m=p>>1,d=(m+1)%3,y=(m+2)%3,b=(p&1)===1,x=js(m,d,y,b,[l,a,o][m],[l,a,o][d],[l,a,o][y],1,1);for(let E=0;E<4;E++)x[E*3+1]>a*i&&(x[E*3+1]=Math.round((a+h)*i));const R=Di[Xr[c*6+p]-1];n.rect(x,Qo(R,p,x),p,R[0],R[1],r,b,!1,p===3?f:s(g))}}else{if(u===3&&yx(n,e,c,l,a,o,f))continue;{const h=Di[Xr[c*6]-1],p=l*i,_=(l+1)*i,g=o*i,m=(o+1)*i,d=a*i,y=(a+1)*i,b=[p,d,g,_,d,m,p,y,g,_,y,m],x=[p,d,m,_,d,g,p,y,m,_,y,g],R=[0,1,1,1,0,0,1,0];for(const[E,T]of[[b,6],[x,7]])n.rect(E,R,T,h[0],h[1],r,!0,!1,f,!0),n.rect(E,R,T,h[0],h[1],r,!1,!1,f,!0)}}}}function yx(n,e,t,i,r,s,a){const o=Vn/64,l=[255,255,255,255];let c=!1;const u=h1[t];for(let f=0;f<6;f++){const h=Yr[f];if(u?!(u&1<<f):!Pt[e[Mt(i+h[0],r+h[1],s+h[2])]])continue;const p=f>>1,_=(p+1)%3,g=(p+2)%3,m=(f&1)===1,d=js(p,_,g,m,[i,r,s][p],[i,r,s][_],[i,r,s][g],1,1);for(let x=0;x<4;x++)d[x*3+p]+=m?-o:o;const y=Di[Xr[t*6+f]-1],b=Qo(y,f,d);n.rect(d,b,f,y[0],y[1],l,!0,!1,a,!0),n.rect(d,b,f,y[0],y[1],l,!1,!1,a,!0),c=!0}return c}function js(n,e,t,i,r,s,a,o,l){const c=Vn,u=[];for(let f=0;f<4;f++){const h=[0,0,0];h[n]=(r+(i?1:0))*c,h[e]=(s+(f&1?o:0))*c,h[t]=(a+(f&2?l:0))*c,u.push(h[0],h[1],h[2])}return u}function Qo(n,e,t){const i=Vn,r=[];for(let s=0;s<4;s++){const[a,o]=jo(e,t[s*3]/i,t[s*3+1]/i,t[s*3+2]/i);r.push(n[2]*a+n[3]*o+n[6],n[4]*a+n[5]*o+n[7])}return r}function Ex(n,e,t,i,r,s,a,o,l,c,u,f,h,p){const _=js(r,s,a,o,l,c,u,f,h),g=Di[(t&xx)-1],m=[0,1,2,3].map(x=>t>>12+x*2&3),d=x=>m[x]*64+p[x*2]+p[x*2+1],y=d(0)+d(3)>d(1)+d(2);(g[1]&Zs?e:n).rect(_,Qo(g,i,_),i,g[0],g[1],m.map(x=>Jo[x]),o,y,p)}function Ax(n,e,t,i,r,s,a,o,l,c,u,f,h,p,_){const g=Vn,m=[0,0,0];m[s]=c,m[a]=u,m[o]=f;const d=En[t[Mt(m[0],m[1],m[2])]],y=js(s,a,o,l,c,u,f,h,p);if(r!==2){const w=Math.max(y[1],y[4],y[7],y[10]);for(let M=0;M<4;M++){if(y[M*3+1]!==w)continue;const C=y[M*3]>m[0]*g?1:0,H=y[M*3+2]>m[2]*g?2:0;y[M*3+1]-=Math.round((1-i[C+H])*g)}}const b=d===Ze.water?e:n,x=(_&15)*4,R=(_>>4)*4,{layer:E,tint:T}=_x(d),P=[];for(let w=0;w<4;w++)P.push(...jo(r,y[w*3]/g,y[w*3+1]/g,y[w*3+2]/g));b.rect(y,P,r,E,T,[255,255,255,255],l,!1,[x,R,x,R,x,R,x,R])}function Tx(n,e,t,i,r){const s=(h,p,_)=>{const g=n[Mt(h,p,_)];return En[g]===r?En[n[Mt(h,p+1,_)]]===r?1:nn[g].amount/9:Pt[g]?-1:0},a=s(e,t,i);if(a>=1)return[1,1,1,1];const o=s(e,t,i-1),l=s(e,t,i+1),c=s(e+1,t,i),u=s(e-1,t,i),f=(h,p,_,g)=>{if(p>=1||h>=1)return 1;let m=0,d=0;const y=b=>{b>=.8?(m+=b*10,d+=10):b>=0&&(m+=b,d+=1)};if(p>0||h>0){const b=s(e+_,t,i+g);if(b>=1)return 1;y(b)}return y(a),y(p),y(h),m/d};return[f(o,u,-1,-1),f(o,c,1,-1),f(l,u,-1,1),f(l,c,1,1)]}const el=512,Rx=`
attribute vec4 info; // [面的方向, 纹理层, AO（0..255，+256 不按方向变暗）, 染色字段]
attribute vec2 light; // [天空光之和, 方块光之和]，0..60

uniform sampler2D lightMap;
/** 原版 constantAmbientLight（下界）：上下两面都是 0.9 */
uniform bool constantAmbient;

varying vec2 vUv;
varying float vLayer;
varying vec3 vLight;
varying vec2 vColumn; // 世界坐标 (x, z)，取生物群系颜色用
varying float vTint;
varying float vFogDist;

const vec3 FACE_NORMAL[8] = vec3[8](vec3(-1, 0, 0), vec3(1, 0, 0), vec3(0, -1, 0), vec3(0, 1, 0), vec3(0, 0, -1), vec3(0, 0, 1), vec3(0), vec3(0));

// 原版 ClientLevel.getShade：西东 0.6、下 0.5、上 1.0、北南 0.8
const float FACE_SHADE[8] = float[8](0.6, 0.6, 0.5, 1.0, 0.8, 0.8, 1.0, 1.0);

void main() {
  vec3 p = position / ${Vn.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标（v7.1 起顶点里直接存，网格生成时按原版模型算好；大于 1 的部分靠 RepeatWrapping 重复）
  vUv = uv / ${Io.toFixed(1)};

  vLayer = info.y;
  int ao = int(info.z + 0.5);
  float shade = (ao & 256) != 0 ? (constantAmbient ? 0.9 : 1.0) : constantAmbient && (face == 2 || face == 3) ? 0.9 : FACE_SHADE[face];
  // 原版 UV2 = 亮度 × 16，再除以 256：4 格之和 × 4 / 256
  vec2 luv = clamp(vec2(light.y, light.x) / 64.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0));
  vLight = texture(lightMap, luv).rgb * shade * (float(ao & 255) / 255.0);
  vTint = info.w;
  // 往面的反方向挪一点点：侧面正好在两列的分界线上，要取“这个方块所在的那一列”的颜色
  vColumn = (modelMatrix * vec4(p - FACE_NORMAL[face] * 0.01, 1.0)).xz;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
#ifdef WIRE
  gl_Position.z -= 0.0004 * gl_Position.w; // 线框往相机方向挪一点点，避免和表面抢深度而闪烁
#endif
  // 原版 FogShape.CYLINDER：max(水平距离, 竖直距离)
  vec3 d = (modelMatrix * vec4(p, 1.0)).xyz - cameraPosition;
  vFogDist = max(length(d.xz), abs(d.y));
}
`,Cx=`
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
uniform vec3 tintColors[${cf.length}];
uniform float opacity;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying vec2 vUv;
varying float vLayer;
varying vec3 vLight;
varying vec2 vColumn;
varying float vTint;
varying float vFogDist;

void main() {
#ifdef WIRE
  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
#else
  vec4 c = texture(map, vec3(vUv, floor(vLayer + 0.5)));
  // 染色字段（见 models/index.ts）：低 5 位颜色，+32 镂空，+64 只染 alpha 标记的部分，+128 用纹理的 alpha
  int t = int(vTint + 0.5);
  int kind = t & 31;
  if ((t & 32) != 0 && c.a < 0.5) discard;
  if (kind > 0) {
    vec3 tint;
    if (kind <= 3) {
      ivec2 col = ivec2(mod(floor(vColumn), ${el}.0));
      tint = kind == 1 ? texelFetch(grassMap, col, 0).rgb : kind == 2 ? texelFetch(foliageMap, col, 0).rgb : texelFetch(waterMap, col, 0).rgb;
    } else tint = tintColors[kind - 4];
    c.rgb = (t & 64) != 0 ? mix(c.rgb, c.rgb * tint, 1.0 - c.a) : c.rgb * tint; // alpha 越小染得越多（mipmap 时会是中间值）
  }
  gl_FragColor = vec4(c.rgb * vLight, (t & 128) != 0 ? c.a : opacity);
#endif
  // 原版 linear_fog：fogNear 之前没有雾，fogFar 之后全是雾色
  float fog = clamp((vFogDist - fogNear) / (fogFar - fogNear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fog);
}
`;function za(n){return new Tn({vertexShader:Rx,fragmentShader:Cx,uniforms:Tu.merge([fe.fog,{map:{value:null},grassMap:{value:null},foliageMap:{value:null},waterMap:{value:null},lightMap:{value:null},constantAmbient:{value:!1},tintColors:{value:cf.map(e=>new F((e>>16&255)/255,(e>>8&255)/255,(e&255)/255))},opacity:{value:n}}]),fog:!0})}class Px{textures=Xc();opaque;water;wire;wireframe=!1;tintMaps=[9551193,7842607,4159204].map(e=>Lx(e));tintsDirty=!1;lightMap=Dx();constructor(){this.opaque=za(1),this.water=za(.7),this.water.transparent=!0,this.water.depthWrite=!1,this.water.side=tn;for(const e of[this.opaque,this.water])e.uniforms.map.value=this.textures,e.uniforms.grassMap.value=this.tintMaps[0],e.uniforms.foliageMap.value=this.tintMaps[1],e.uniforms.waterMap.value=this.tintMaps[2],e.uniforms.lightMap.value=this.lightMap;this.wire=za(.6),this.wire.uniforms.lightMap.value=this.lightMap,this.wire.defines={WIRE:""},this.wire.wireframe=!0,this.wire.transparent=!0}setPackTextures(e){this.textures.dispose(),this.textures=Xc(e);for(const t of[this.opaque,this.water])t.uniforms.map.value=this.textures}writeTints(e,t,i){const r=el;for(let s=0;s<16;s++)for(let a=0;a<16;a++){const o=((e*16+a)%r+r)%r,l=((t*16+s)%r+r)%r;for(let c=0;c<3;c++){const u=((s*16+a)*3+c)*3,f=(l*r+o)*4,h=this.tintMaps[c].image.data;h[f]=i[u],h[f+1]=i[u+1],h[f+2]=i[u+2]}}this.tintsDirty=!0}setLightmap(e,t){const i=this.lightMap.image.data;for(let r=0;r<256;r++)i[r*4]=e[r*3],i[r*4+1]=e[r*3+1],i[r*4+2]=e[r*3+2];this.lightMap.needsUpdate=!0;for(const r of[this.opaque,this.water,this.wire])r.uniforms.constantAmbient.value=t}flushTints(){if(this.tintsDirty){for(const e of this.tintMaps)e.needsUpdate=!0;this.tintsDirty=!1}}}function Lx(n){const e=el,t=new Uint8Array(e*e*4);for(let r=0;r<e*e;r++)t[r*4]=n>>16&255,t[r*4+1]=n>>8&255,t[r*4+2]=n&255,t[r*4+3]=255;const i=new Wo(t,e,e,kt,sn);return i.magFilter=i.minFilter=Nt,i.needsUpdate=!0,i}function Dx(){const n=new Uint8Array(1024).fill(255),e=new Wo(n,16,16,kt,sn);return e.magFilter=e.minFilter=dn,e.generateMipmaps=!1,e.needsUpdate=!0,e}const Ha=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]];function Ix(n,e,t,i,r,s){Li[r]===Li[s]&&Xt[r]===Xt[s]&&vr[r]===vr[s]||n.get(e,t,i)<0||(Jc(n,e,t,i,r,!1),n.hasSky&&Jc(n,e,t,i,r,!0))}function Jc(n,e,t,i,r,s){const a=s?0:4,o=(b,x,R)=>{const E=n.get(b,x,R);return E<0?-1:E>>a&15},l=(b,x,R,E)=>{const T=n.get(b,x,R);T<0||n.set(b,x,R,s?T&240|E:T&15|E<<4)},c=n.maxY-n.minY,u=new Map,f=(b,x,R)=>{const E=`${b},${x}`;let T=R===void 0?u.get(E):void 0;if(T===void 0){const P=new Uint16Array(c);for(let w=0;w<c;w++)P[w]=n.minY+w===t&&b===h&&x===p&&R!==void 0?R:n.block(b,n.minY+w,x);T=n.minY+Y1(P,w=>w,c),R===void 0&&u.set(E,T)}return T},h=e,p=i,_=(b,x,R)=>s?x>=f(b,R):Xt[n.block(b,x,R)]>0,g=(b,x,R)=>s?15:Xt[n.block(b,x,R)],m=[],d=[];if(s){const b=f(e,i,r),x=f(e,i);for(let R=b;R<x;R++){const E=o(e,R,i);E>0&&(l(e,R,i,0),m.push(e,R,i,E))}for(let R=x;R<b;R++)l(e,R,i,15),d.push(e,R,i)}const y=o(e,t,i);!(s&&t>=f(e,i))&&y>0&&(l(e,t,i,0),m.push(e,t,i,y)),!s&&Xt[n.block(e,t,i)]>0&&(l(e,t,i,Xt[n.block(e,t,i)]),d.push(e,t,i));for(let b=0;b<m.length;b+=4){const x=m[b],R=m[b+1],E=m[b+2],T=m[b+3];for(const[P,w,M]of Ha){const C=x+P,H=R+w,N=E+M,W=o(C,H,N);if(!(W<=0)){if(_(C,H,N)&&W===g(C,H,N)){d.push(C,H,N);continue}W<T?(l(C,H,N,0),m.push(C,H,N,W),!s&&Xt[n.block(C,H,N)]>0&&(l(C,H,N,Xt[n.block(C,H,N)]),d.push(C,H,N))):d.push(C,H,N)}}}for(const[b,x,R]of Ha)o(e+b,t+x,i+R)>0&&d.push(e+b,t+x,i+R);for(let b=0;b<d.length;b+=3){const x=d[b],R=d[b+1],E=d[b+2],T=o(x,R,E);if(T<=1)continue;const P=n.block(x,R,E);for(const[w,M,C]of Ha){const H=x+w,N=R+M,W=E+C,K=o(H,N,W);if(K<0||T-1<=K)continue;const z=n.block(H,N,W);if(M===-1&&vr[P]||M===1&&vr[z])continue;const Q=T-Math.max(1,Li[z]);Q>K&&(l(H,N,W,Q),d.push(H,N,W))}}}const Qc={},Ux={};function Ns(n){const e=/^\/resourcepacks\/([^/]+)\/assets\/minecraft\/(.+)\.(json|png)$/.exec(n);return[e[1],e[2]]}function eu(n,e=""){const t=new Map;for(const i of Object.keys(n).sort((r,s)=>Ns(r)[0].localeCompare(Ns(s)[0])))t.set(Ns(i)[1].slice(e.length),n[i]);return t}async function Nx(){const n=eu(Qc);if(n.size===0)return null;const e=[...new Set(Object.keys(Qc).map(o=>Ns(o)[0]))].sort(),t=new Map,i=new Map,r=[...new Set(Rn.filter(Boolean).map(o=>o.replace(/^minecraft:/,"")))];await Promise.all(r.map(async o=>{const l=n.get(`blockstates/${o}`);l&&t.set(o,await l())}));let s=new Set;const a=o=>{if(Array.isArray(o))o.forEach(a);else if(o&&typeof o=="object"){const l=o;typeof l.model=="string"&&s.add(ti(l.model));for(const c of Object.keys(l))c!=="model"&&a(l[c])}};for(t.forEach(a);s.size;){const o=[...s].filter(l=>!i.has(l));s=new Set,await Promise.all(o.map(async l=>{const c=n.get(`models/${l}`),u=c?await c():void 0;i.set(l,u),u?.parent&&!i.has(ti(u.parent))&&s.add(ti(u.parent))}))}return{name:e.join(" + "),source:{blockstate:o=>t.get(o),model:o=>i.get(ti(o))},textures:eu(Ux,"textures/")}}const Bt=16;async function Fx(n,e){const t=new Uint8Array(e.length*Bt*Bt*4),r=new OffscreenCanvas(Bt,Bt).getContext("2d",{willReadFrequently:!0});return(await Promise.all(e.map(async a=>{const o=n.textures.get(a);if(!o)return null;try{const l=await o();return await createImageBitmap(await(await fetch(l)).blob())}catch{return null}}))).forEach((a,o)=>{if(r.clearRect(0,0,Bt,Bt),a)r.imageSmoothingEnabled=!1,r.drawImage(a,0,0,a.width,a.width,0,0,Bt,Bt),a.close();else for(let l=0;l<Bt;l++)for(let c=0;c<Bt;c++)r.fillStyle=c<8!=l<8?"#f800f8":"#000000",r.fillRect(c,l,1,1);t.set(r.getImageData(0,0,Bt,Bt).data,o*Bt*Bt*4)}),t}function Ox(n){return new Worker(""+new URL("generate-B5BVbVp5.js",import.meta.url).href,{type:"module",name:n?.name})}class kx{slots=[];nextId=1;pending=new Map;constructor(e=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1))){for(let t=0;t<e;t++){const i={worker:new Ox,busy:0};i.worker.onmessage=r=>this.onMessage(r.data),this.slots.push(i)}}get size(){return this.slots.length}get busy(){return this.slots.reduce((e,t)=>e+t.busy,0)}call(e,t,i){const r=i===void 0?this.slots.reduce((s,a)=>a.busy<s.busy?a:s):this.slots[(i%this.slots.length+this.slots.length)%this.slots.length];return this.send(r,e,t)}async broadcast(e,t){return(await Promise.all(this.slots.map(r=>this.send(r,e,t))))[0]}send(e,t,i){const r=this.nextId++;e.busy++;const s={id:r,method:t,params:i};return new Promise((a,o)=>{this.pending.set(r,{slot:e,resolve:a,reject:o}),e.worker.postMessage(s)})}onMessage(e){const t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t.slot.busy--,e.ok?t.resolve(e.result):t.reject(new Error(e.error)))}}class zx{scene;camera;pool=new kx;materials=new Px;highlight;distance=6;chunks=new Map;loading=new Set;generation=0;edits=new Map;greedy=!0;info=null;dayTime=0;daylightCycle=!0;fixedTime=null;lastChunkMs=0;lastRemeshMs=0;lastLightMs=0;dirty=new Set;fluids=new B1({get:(e,t,i)=>this.getBlock(e,t,i),set:(e,t,i,r)=>this.writeBlock(e,t,i,r)});constructor(e,t){this.scene=e,this.camera=t,this.highlight=new W1(e)}async init(e,t){return await this.loadModels(),this.edits.clear(),this.fluids.clear(),this.reload(),this.info=await this.pool.broadcast("init",{seed:e,settings:t}),this.fixedTime=T1(this.info.settings),this.info}modelsReady=null;resourcePack=null;loadModels(){return this.modelsReady??=(async()=>{const e=await Nx(),t=e?gx(e.source):null;gf(t),e&&t&&(this.materials.setPackTextures(await Fx(e,t.textures)),this.resourcePack=e.name),await this.pool.broadcast("models",{models:t})})(),this.modelsReady}reload(){for(const e of this.chunks.values())e.dispose(this.scene);this.chunks.clear(),this.loading.clear(),this.generation++}setGreedy(e){this.greedy=e,this.reload()}setWireframe(e){this.materials.wireframe=e;for(const t of this.chunks.values())for(const i of[...t.meshes,...t.waterMeshes])i&&this.applyWire(i)}applyWire(e){const t=e.children.length>0;if(this.materials.wireframe&&!t){const i=new Ct(e.geometry,this.materials.wire);i.renderOrder=2,e.add(i)}else!this.materials.wireframe&&t&&e.clear()}update=()=>{if(!this.info)return;this.flushRemesh(),this.materials.flushTints();const e=Math.floor(this.camera.position.x/Tt),t=Math.floor(this.camera.position.z/Tt),i=(l,c,u)=>(l-e)**2+(c-t)**2<=(this.distance+u+.5)**2;for(const[l,c]of this.chunks)Math.max(Math.abs(c.cx-e),Math.abs(c.cz-t))>this.distance+2&&(c.dispose(this.scene),this.chunks.delete(l));const r=this.pool.size*2;if(this.pool.busy>=r)return;const s=[];for(const l of this.chunks.values())l.light||l.lighting||!i(l.cx,l.cz,0)||this.neighbors(l).every(c=>c)&&s.push([(l.cx-e)**2+(l.cz-t)**2,l]);s.sort((l,c)=>l[0]-c[0]);for(const[,l]of s.slice(0,r-this.pool.busy))this.relight(l);if(this.pool.busy>=r)return;const a=[],o=this.distance+1;for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++){if(!i(e+l,t+c,1))continue;const u=`${e+l},${t+c}`;!this.chunks.has(u)&&!this.loading.has(u)&&a.push([l*l+c*c,e+l,t+c])}a.sort((l,c)=>l[0]-c[0]);for(const[,l,c]of a.slice(0,r-this.pool.busy))this.load(l,c)};neighbors(e){const t=[];for(let i=-1;i<=1;i++)for(let r=-1;r<=1;r++)(r||i)&&t.push(this.chunks.get(`${e.cx+r},${e.cz+i}`));return t}relight(e){const t=[];for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++)t.push(this.chunks.get(`${e.cx+a},${e.cz+s}`));const i=t.map(s=>s.version),r=this.generation;e.lighting=!0,this.pool.call("light",{chunks:t.map(s=>s.flat),greedy:this.greedy,cx:e.cx,cz:e.cz}).then(s=>{if(e.lighting=!1,!(r!==this.generation||this.chunks.get(`${e.cx},${e.cz}`)!==e)&&!t.some((a,o)=>a.version!==i[o])){e.light=s.light,this.lastLightMs=s.ms;for(let a=0;a<s.changes.length;a+=2)e.setRaw(s.changes[a],s.changes[a+1]);for(let a=0;a<s.meshes.length;a++)this.setSectionMesh(e,a,s.meshes[a]);this.syncBorders(e)}}).catch(s=>{e.lighting=!1,console.error(`区块 ${e.cx},${e.cz} 光照失败`,s)})}syncBorders(e){for(const t of this.neighbors(e)){if(!t?.light)continue;const i=e.cx-t.cx,r=e.cz-t.cz,s=new Set;for(let a=e.minY;a<e.minY+e.height;a++)for(let o=-1;o<=16;o++)for(let l=-1;l<=16;l++){const c=l-i*16,u=o-r*16;if(c<0||c>15||u<0||u>15)continue;const f=e.light[e.lightIndex(c,a,u)],h=t.lightIndex(l,a,o);t.light[h]!==f&&(t.light[h]=f,s.add(t.sectionIndex(a)))}for(const a of s)for(const o of[a-1,a,a+1])o>=0&&o<t.sections.length&&this.dirty.add(`${t.cx},${t.cz},${o}`)}}tick(){this.fluids.tick(),this.daylightCycle&&this.dayTime++}renderTime(e){return this.fixedTime??this.dayTime+(this.daylightCycle?e:0)}load(e,t){const i=`${e},${t}`,r=this.generation;this.loading.add(i),this.pool.call("chunk",{cx:e,cz:t},Hx(e,t)).then(s=>{r===this.generation&&(this.loading.delete(i),this.onChunk(s))}).catch(s=>{r===this.generation&&this.loading.delete(i),console.error(`区块 ${i} 生成失败`,s)})}onChunk(e){const t=this.info,i=e.sections.map(o=>lr.fromData(o)),r=new Bc(e.cx,e.cz,t.minY,t.height,i,e.blocks),s=`${e.cx},${e.cz}`;this.chunks.set(s,r),this.lastChunkMs=e.ms,this.materials.writeTints(e.cx,e.cz,e.tints);const a=this.edits.get(s);if(a)for(const[o,l]of a){const c=o&15,u=o>>4&15,f=(o>>8)+r.minY;r.set(c,f,u,l)}for(const o of e.fluidUpdates){const l=e.cx*16+(o&15),c=e.cz*16+(o>>4&15),u=(o>>8)+r.minY,f=r.get(o&15,u,o>>4&15),h=En[f];h!==Ze.none&&this.fluids.schedule(l,u,c,h,1)}}getChunk(e,t){return this.chunks.get(`${Math.floor(e/Tt)},${Math.floor(t/Tt)}`)}getBlock(e,t,i){const r=this.getChunk(e,i);return r?r.get(e-r.cx*Tt,t,i-r.cz*Tt):null}isSolidAt(e,t,i){const r=this.getBlock(e,t,i);return r===null?!0:er(r)}setBlock(e,t,i,r){this.writeBlock(e,t,i,r)&&(this.fluids.blockChanged(e,t,i),this.flushRemesh())}writeBlock(e,t,i,r){const s=this.getChunk(e,i);if(!s||!this.info)return!1;const a=e-s.cx*Tt,o=i-s.cz*Tt;if(t<this.info.minY||t>=this.info.minY+this.info.height)return!1;const l=s.get(a,t,o);s.set(a,t,o,r),s.light&&l!==r&&Ix(this.lightWorld,e,t,i,l,r);const c=`${s.cx},${s.cz}`;this.edits.has(c)||this.edits.set(c,new Map),this.edits.get(c).set(Bc.index(a,t,o,s.minY),r);for(let u=-1;u<=1;u++)for(let f=-1;f<=1;f++)for(let h=-1;h<=1;h++){const p=t+f;if(p<this.info.minY||p>=this.info.minY+this.info.height)continue;const _=this.getChunk(e+u,i+h);_&&this.dirty.add(`${_.cx},${_.cz},${_.sectionIndex(p)}`)}return!0}flushRemesh(){if(this.dirty.size===0)return;const e=performance.now();for(const t of this.dirty){const[i,r,s]=t.split(",").map(Number),a=this.chunks.get(`${i},${r}`);a&&this.remeshSection(a,s)}this.dirty.clear(),this.lastRemeshMs=performance.now()-e}lightWorld=(()=>{let e;const t=(r,s)=>{const a=Math.floor(r/16),o=Math.floor(s/16);return e&&e.cx===a&&e.cz===o&&this.chunks.get(`${a},${o}`)===e?e:e=this.chunks.get(`${a},${o}`)},i=this;return{get minY(){return i.info.minY},get maxY(){return i.info.minY+i.info.height},get hasSky(){return i.info.hasSkyLight},block:(r,s,a)=>t(r,a)?.get(r&15,s,a&15)??ft.air,get:(r,s,a)=>{const o=t(r,a);return!o?.light||s<o.minY||s>=o.minY+o.height?-1:o.light[o.lightIndex(r&15,s,a&15)]},set:(r,s,a,o)=>{const l=t(r,a);if(!l?.light)return;const c=r&15,u=a&15;l.light[l.lightIndex(c,s,u)]=o;for(let f=-1;f<=1;f++)for(let h=-1;h<=1;h++){if(h===0&&f===0)continue;const p=c-h*16,_=u-f*16;if(p<-1||p>16||_<-1||_>16)continue;const g=this.chunks.get(`${l.cx+h},${l.cz+f}`);g?.light&&(g.light[g.lightIndex(p,s,_)]=o)}for(let f=-1;f<=1;f++)for(let h=-1;h<=1;h++)for(let p=-1;p<=1;p++){const _=s+p;if(_<l.minY||_>=l.minY+l.height)continue;const g=t(r+h,a+f);g?.light&&this.dirty.add(`${g.cx},${g.cz},${g.sectionIndex(_)}`)}}}})();lightAt(e,t,i){const r=this.lightWorld.get(e,t,i);return r<0?t>=(this.info?.minY??0)+(this.info?.height??0)&&this.getChunk(e,i)?.light?{sky:this.info.hasSkyLight?15:0,block:0}:null:{sky:r&15,block:r>>4}}topSolidY(e,t){const i=this.getChunk(e,t);if(!i)return null;const r=e-i.cx*Tt,s=t-i.cz*Tt;for(let a=i.sections.length-1;a>=0;a--)if(!i.sections[a].isEmpty){for(let o=15;o>=0;o--)if(er(i.sections[a].get(r,o,s)))return i.minY+a*16+o}return i.minY}floorBelow(e,t,i){const r=this.getChunk(e,t);if(!r)return null;for(let s=i;s>r.minY+1;s--){const a=o=>this.getBlock(e,o,t)??0;if(er(a(s-1))&&!er(a(s))&&!er(a(s+1))&&En[a(s)]===Ze.none)return s-1}return null}remeshSection(e,t){if(!e.light)return;const i=new Uint16Array(Jn*Jn*Jn);this.fillNeighborhood(e,t,i)?e.staleSections.delete(t):e.staleSections.add(t);const r=new Uint8Array(Jn*Jn*Jn);q1(e.light,e.height,t,this.info.hasSkyLight,r);const s=bx(i,{greedy:this.greedy,light:r,origin:[e.cx*Tt,e.minY+t*16,e.cz*Tt]});this.setSectionMesh(e,t,s.opaque.indices.length+s.water.indices.length>0?s:null)}fillNeighborhood(e,t,i){const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++)r.push(this.chunks.get(`${e.cx+o},${e.cz+a}`));const s=e.minY+t*16;for(let a=-1;a<=16;a++)for(let o=-1;o<=16;o++){const l=o<0?-1:o>15?1:0;for(let c=-1;c<=16;c++){const u=c<0?-1:c>15?1:0,f=r[(l+1)*3+(u+1)];i[Mt(c,a,o)]=f?f.get(c-u*16,s+a,o-l*16):ft.air}}return!r.includes(void 0)}setSectionMesh(e,t,i){e.disposeSection(this.scene,t),i&&(e.meshes[t]=this.toMesh(i.opaque,this.materials.opaque,e,t),e.waterMeshes[t]=this.toMesh(i.water,this.materials.water,e,t),e.waterMeshes[t]&&(e.waterMeshes[t].renderOrder=1))}toMesh(e,t,i,r){if(e.indices.length===0)return null;const s=new _n;s.setAttribute("position",new Rt(e.positions,3)),s.setAttribute("uv",new Rt(e.uv,2)),s.setAttribute("info",new Rt(e.info,4)),s.setAttribute("light",new Rt(e.light,2)),s.setIndex(new Rt(e.indices,1));const a=16*Vn;s.boundingBox=new xr(new F(0,0,0),new F(a,a,a)),s.boundingSphere=new Xs(new F(8,8,8),8*Math.sqrt(3));const o=new Ct(s,t);return o.position.set(i.cx*Tt,i.minY+r*16,i.cz*Tt),o.matrixAutoUpdate=!1,o.updateMatrix(),this.applyWire(o),this.scene.add(o),o}get stats(){let e=0,t=0,i=0,r=0,s=0;for(const l of this.chunks.values()){e+=l.byteSize;for(const c of[...l.meshes,...l.waterMeshes]){if(!c)continue;i++;const u=c.geometry;for(const f of[u.attributes.position,u.attributes.uv,u.attributes.info,u.attributes.light,u.index])t+=f.array.byteLength;r+=u.attributes.position.count,s+=u.index.count/6}}const a=this.info?.height??0;let o=0;for(const l of this.chunks.values())l.light&&o++;return{loaded:this.chunks.size,lit:o,loading:this.loading.size,bytes:e,v0Bytes:this.chunks.size*16*16*a,meshBytes:t,fluidQueue:this.fluids.queued,sectionMeshes:i,vertices:r,quads:s}}}function Hx(n,e){const t=Math.floor(n/4),i=Math.floor(e/4);return(Math.imul(t,73856093)^Math.imul(i,19349663))>>>0}const Gx=[0,9551193,4764952,4159204];let Nr=null;function Ga(n,e){Nr??=$u();const t=document.createElement("canvas");t.width=t.height=pe;const i=new ImageData(pe,pe),r=n*pe*pe*4,s=Gx[Ku[n]&3],a=[s>>16&255,s>>8&255,s&255].map(o=>o/255);for(let o=0;o<pe*pe*4;o+=4){const l=s!==0&&Nr[r+o+3]<255;i.data[o]=Nr[r+o]*e*(l?a[0]:1),i.data[o+1]=Nr[r+o+1]*e*(l?a[1]:1),i.data[o+2]=Nr[r+o+2]*e*(l?a[2]:1),i.data[o+3]=255}return t.getContext("2d").putImageData(i,0,0),t}const tu=new Map;function Vx(n){const e=tu.get(n);if(e)return e;const{top:t,side:i}=yt[n].textures,r=64,s=document.createElement("canvas");s.width=s.height=r;const a=s.getContext("2d");a.imageSmoothingEnabled=!1;const o=r/2,l=o/pe,c=o/2;a.setTransform(l,l/2,-l,l/2,o,0),a.drawImage(Ga(te[t],1),0,0),a.setTransform(l,l/2,0,l,0,c),a.drawImage(Ga(te[i],.8),0,0),a.setTransform(l,-l/2,0,l,o,o),a.drawImage(Ga(te[i],.6),0,0);const u=s.toDataURL();return tu.set(n,u),u}const Bx=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),Ft=n=>document.getElementById(n),nu=n=>new URLSearchParams(location.search).get(n);class Wx{constructor(e,t,i){this.core=e,this.terrain=t,this.control=i,this.el=document.getElementById("f3"),document.addEventListener("keydown",r=>{r.code==="F3"?(r.preventDefault(),this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible)):r.code==="KeyG"?this.terrain.setGreedy(!this.terrain.greedy):r.code==="KeyK"&&this.terrain.setWireframe(!this.terrain.materials.wireframe)})}el;visible=!1;lightLine(e,t,i){const r=this.terrain.lightAt(e,t,i);return r?`Client Light: ${Math.max(r.sky,r.block)} (${r.sky} sky, ${r.block} block)`:"Client Light: （区块还没点亮）"}timeLine(){const e=this.terrain.dayTime,t=Math.floor(e/24e3),i=(e%24e3+24e3)%24e3,r=Math.floor((i/1e3+6)%24*60),s=String(Math.floor(r/60)).padStart(2,"0"),a=String(r%60).padStart(2,"0"),o=this.terrain.fixedTime!==null?`（这个维度的时间固定在 ${this.terrain.fixedTime}）`:this.terrain.daylightCycle?"":"（昼夜循环已关）";return`时间: 第 ${t} 天 ${s}:${a}  dayTime ${e}${o}`}biome="…";routerLine="";lastQuery=0;querying=!1;speed(){const e=this.control.player,t={x:e.pos.x-e.prevPos.x,y:e.pos.y-e.prevPos.y,z:e.pos.z-e.prevPos.z};return`水平 ${(Math.hypot(t.x,t.z)*20).toFixed(2)}  竖直 ${(t.y*20).toFixed(2)} 格/秒`}update(e){if(!this.visible)return;const t=performance.now(),i=this.control.feet,r=Math.floor(i.x),s=Math.floor(i.y),a=Math.floor(i.z);!this.querying&&t-this.lastQuery>250&&this.terrain.info&&(this.querying=!0,this.lastQuery=t,this.terrain.pool.call("f3",{x:r,y:s,z:a}).then(g=>{this.routerLine=g.line,this.biome=g.biome}).finally(()=>this.querying=!1));const o=this.terrain.info,l=this.control.target,c=l?this.terrain.getBlock(l.x,l.y,l.z)??0:0,u=l?`${yt[rn[c]].name} ${Qu(c).replace("minecraft:","")}`:"—",f=this.terrain.stats,h=this.core.renderer.info.render,p=g=>(g/1048576).toFixed(1)+" MB",_=[`mc-replica v7.1 (${e} fps, 20 TPS)`,`种子: ${o?.seed??"…"}    noise_settings: ${o?.settings??"…"}`,`区块: ${f.loaded} 已加载（${f.lit} 已点亮）, ${f.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 光照+网格 ${this.terrain.lastLightMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,`方块数据: ${p(f.bytes)}（v0 的存法要 ${p(f.v0Bytes)}）`,`资源包: ${this.terrain.resourcePack??"没有（程序画的纹理，见 resourcepacks/README.md）"}`,`网格: ${this.terrain.greedy?"贪婪":"逐面"} [G]${this.terrain.materials.wireframe?" 线框":""} [K]  ${f.sectionMeshes} 个 section 网格, ${f.quads.toLocaleString()} 个四边形, ${p(f.meshBytes)}`,`本帧: ${h.calls} 次绘制, ${h.triangles.toLocaleString()} 个三角形`,`流体: ${f.fluidQueue} 个待更新, 上个 tick 处理 ${this.terrain.fluids.lastProcessed} 个`,"",`XYZ: ${i.x.toFixed(3)} / ${i.y.toFixed(5)} / ${i.z.toFixed(3)}`,`Block: ${r} ${s} ${a}`,`Chunk: ${Math.floor(r/Tt)} ${Math.floor(a/Tt)}  (区块内 ${r&15} ${a&15})`,`Facing: ${this.control.facing}`,`Biome: ${this.biome}`,this.lightLine(r,s,a),this.timeLine(),`状态: ${this.control.player.state}${this.control.player.onGround?"  落地":""}    速度: ${this.speed()}`,"",this.routerLine,"",`准星: ${u}${l?`  (${l.x}, ${l.y}, ${l.z})`:""}`];this.el.textContent=_.join(`
`)}}const jn=160,Xx=[33,82,160],Qi=[242,240,232],Yx=[176,92,34];class qx{constructor(e,t){this.terrain=e,this.control=t,this.el=document.getElementById("noiseMap"),this.canvas=this.el.querySelector("canvas"),this.select=this.el.querySelector("select.field"),this.scaleSelect=this.el.querySelector("select.scale"),this.legend=this.el.querySelector(".legend"),document.addEventListener("keydown",i=>{this.control.control.isLocked&&(i.code==="KeyM"&&this.toggle(),this.visible&&(i.code==="KeyN"&&this.cycle(this.select,1),i.code==="Equal"&&this.cycle(this.scaleSelect,-1),i.code==="Minus"&&this.cycle(this.scaleSelect,1)))}),this.select.addEventListener("change",()=>this.refresh(!0)),this.scaleSelect.addEventListener("change",()=>this.refresh(!0))}el;canvas;select;scaleSelect;legend;visible=!1;busy=!1;last={x:NaN,z:NaN,field:"",step:0};image=null;setFields(e){this.select.innerHTML=e.map(t=>`<option>${t}</option>`).join(""),this.select.value=e.includes("continents")?"continents":e[0]}cycle(e,t){const i=e.options.length;e.selectedIndex=(e.selectedIndex+t+i)%i,this.refresh(!0)}toggle(){this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible),this.visible&&this.refresh(!0)}update(){this.visible&&(this.refresh(!1),this.draw())}refresh(e){const t=this.control.feet,i=Number(this.scaleSelect.value),r=Math.max(Math.abs(t.x-this.last.x),Math.abs(t.z-this.last.z))>jn*i/8;if(this.busy||!this.terrain.info||!(e||r||this.select.value!==this.last.field))return;this.busy=!0;const s={field:this.select.value,cx:Math.floor(t.x),cy:Math.floor(t.y),cz:Math.floor(t.z),size:jn,step:i};this.last={x:s.cx,z:s.cz,field:s.field,step:i},this.terrain.pool.call("slice",s).then(a=>this.paint(a.values,a.min,a.max)).catch(a=>console.error(a)).finally(()=>this.busy=!1)}paint(e,t,i){const r=new ImageData(jn,jn),s=Math.max(Math.abs(t),Math.abs(i))||1;for(let a=0;a<e.length;a++){const o=Math.max(-1,Math.min(1,e[a]/s)),l=o<0?Xx:Yx,c=Math.abs(o);r.data[a*4]=Qi[0]+(l[0]-Qi[0])*c,r.data[a*4+1]=Qi[1]+(l[1]-Qi[1])*c,r.data[a*4+2]=Qi[2]+(l[2]-Qi[2])*c,r.data[a*4+3]=255}this.image=r,this.legend.textContent=`${(-s).toFixed(3)}  …  0  …  ${s.toFixed(3)}    每像素 ${this.last.step} 格`}draw(){if(!this.image)return;const e=this.canvas.getContext("2d");this.canvas.width=jn,this.canvas.height=jn,e.putImageData(this.image,0,0);const t=this.control.feet,i=jn/2+(t.x-this.last.x)/this.last.step,r=jn/2+(t.z-this.last.z)/this.last.step,s=this.control.camera.getWorldDirection(new F);e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(i-4,r),e.lineTo(i+4,r),e.moveTo(i,r-4),e.lineTo(i,r+4),e.moveTo(i,r),e.lineTo(i+s.x*12,r+s.z*12),e.stroke()}}class $x{constructor(e,t,i,r){this.core=e,this.terrain=t,this.control=i,this.sky=r,this.f3=new Wx(e,t,i),this.noiseMap=new qx(t,i),this.initMenu(),this.initHotbar()}f3;noiseMap;menu=Ft("menu");playButton=Ft("play");status=Ft("loadingStatus");hotbar=Ft("hotbar");frames=0;fps=0;fpsTime=performance.now();lastSlot=-1;timeInput=null;initMenu=()=>{const e=Ft("seedInput"),t=Ft("distance"),i=new URLSearchParams(location.search);e.value=i.get("seed")??"42",t.value=String(this.terrain.distance),this.playButton.addEventListener("click",()=>{if(Bx)return alert("暂不支持手机，请用电脑浏览器打开");this.control.control.lock()}),this.control.control.addEventListener("lock",()=>this.menu.classList.add("hidden")),this.control.control.addEventListener("unlock",()=>{this.menu.classList.remove("hidden"),this.playButton.textContent="继续游戏"}),Ft("regenerate").addEventListener("click",()=>{const l=new URLSearchParams({seed:e.value.trim()||"42",settings:Ft("settingsSelect").value,distance:t.value});location.search=l.toString()}),t.addEventListener("change",()=>this.setDistance(Number(t.value)));const r=Ft("bobbing");r.addEventListener("change",()=>this.control.bobbing=r.checked);const s=Ft("timeInput"),a=Ft("daylightCycle"),o=Ft("gamma");s.addEventListener("input",()=>this.terrain.dayTime=Number(s.value)),a.addEventListener("change",()=>this.terrain.daylightCycle=a.checked),o.addEventListener("change",()=>this.sky.gamma=Number(o.value)),i.get("time")&&(this.terrain.dayTime=Number(i.get("time"))),this.timeInput=s,i.get("distance")&&(t.value=i.get("distance"),this.setDistance(Number(t.value)))};setDistance(e){this.terrain.distance=e,this.core.setFogDistance(e*16)}onWorldReady(e){Ft("settingsSelect").innerHTML=e.allSettings.map(i=>`<option${i===e.settings?" selected":""}>${i}</option>`).join("");const t=e.packs.some(i=>i.name!=="builtin");Ft("worldInfo").textContent=`种子 ${e.seed} · ${e.settings}`+(t?"":" · 没有检测到原版数据包，正在使用 demo 简化地形（见 datapacks/README.md）"),this.noiseMap.setFields(e.routerFields),this.setDistance(this.terrain.distance)}initHotbar=()=>{this.hotbar.innerHTML=Co.map((e,t)=>`<div class="slot" title="${yt[e].name}"><img src="${Vx(e)}" alt=""><span>${t+1}</span></div>`).join("")};update=()=>{this.frames++;const e=performance.now();if(e-this.fpsTime>=1e3&&(this.fps=Math.round(this.frames*1e3/(e-this.fpsTime)),this.frames=0,this.fpsTime=e),this.control.slot!==this.lastSlot&&(this.lastSlot=this.control.slot,this.hotbar.querySelectorAll(".slot").forEach((t,i)=>t.classList.toggle("on",i===this.lastSlot)),Ft("slotName").textContent=yt[Co[this.lastSlot]].name),this.control.spawned)this.playButton.disabled&&(this.status.textContent="准备好了",this.playButton.disabled=!1);else{const{loaded:t}=this.terrain.stats;this.status.textContent=this.terrain.info?`正在生成出生点附近的区块…（已完成 ${t} 个）`:"正在读取数据包…",this.playButton.disabled=!0}this.core.setMedium(this.control.medium),this.timeInput&&!this.menu.classList.contains("hidden")&&document.activeElement!==this.timeInput&&(this.timeInput.value=String((this.terrain.dayTime%24e3+24e3)%24e3)),this.f3.update(this.fps),this.noiseMap.update()}}const si=new Gs,cr=si.camera,tl=si.scene,Va=si.renderer,bf=new N0,hn=new zx(tl,cr),Vs=new E1(tl,cr,bf,hn),ai=new H1,nl=new $x(si,hn,Vs,ai);hn.init(nu("seed")??"42",nu("settings")??"").then(n=>{ai.setDimension(n.settings),nl.onWorldReady(n)});let iu=0;function Kx(n){if(!hn.info||n-iu<500)return;iu=n;const e=cr.position;hn.pool.call("skyColors",{x:Math.floor(e.x),y:Math.floor(e.y),z:Math.floor(e.z)}).then(t=>{ai.biomeSky=t.sky,ai.biomeFog=t.fog})}const Zx=new A0;(function n(){requestAnimationFrame(n);const e=Zx.getDelta();Vs.update(e),hn.update(),nl.update(),Kx(performance.now());const t=ai.update(hn.renderTime(Vs.partialTick),cr,hn.distance,hn.info?.minY??-64);si.setAirFog(t.color,t.start,t.end),hn.materials.setLightmap(t.lightmap,ai.dim==="nether"),ai.render(Va,cr,si.fogColor,si.medium==="air"),Va.clearDepth(),Va.render(tl,cr)})();Object.assign(window,{game:{core:si,player:bf,terrain:hn,control:Vs,ui:nl,sky:ai}});
//# sourceMappingURL=index-OTMlo3Dz.js.map
