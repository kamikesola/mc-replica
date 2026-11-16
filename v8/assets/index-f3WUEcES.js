(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Go="170",Dh=0,vl=1,Ih=2,hu=1,Uh=2,kn=3,li=0,Ht=1,rn=2,ii=0,or=1,xl=2,bl=3,Ml=4,fu=5,yi=100,Nh=101,Fh=102,Oh=103,kh=104,zh=200,du=201,Hh=202,Gh=203,Gs=204,Ka=205,Vh=206,Bh=207,Wh=208,Xh=209,Yh=210,$h=211,qh=212,jh=213,Kh=214,Za=0,Ja=1,Qa=2,pr=3,eo=4,to=5,no=6,io=7,pu=0,Zh=1,Jh=2,ri=0,Qh=1,ef=2,tf=3,nf=4,rf=5,sf=6,af=7,mu=300,mr=301,_r=302,ro=303,so=304,qs=306,Vs=1e3,Ti=1001,ao=1002,Ot=1003,of=1004,Hr=1005,mn=1006,sa=1007,Ri=1008,on=1009,_u=1010,gu=1011,Br=1012,Vo=1013,Li=1014,zn=1015,Jr=1016,Bo=1017,Wo=1018,gr=1020,vu=35902,xu=1021,bu=1022,zt=1023,Mu=1024,Su=1025,lr=1026,vr=1027,wu=1028,Xo=1029,yu=1030,Yo=1031,$o=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,oo=35840,lo=35841,co=35842,uo=35843,ho=36196,fo=37492,po=37496,mo=37808,_o=37809,go=37810,vo=37811,xo=37812,bo=37813,Mo=37814,So=37815,wo=37816,yo=37817,Eo=37818,Ao=37819,To=37820,Ro=37821,Fs=36492,Co=36494,Po=36495,Eu=36283,Lo=36284,Do=36285,Io=36286,lf=3200,cf=3201,uf=0,hf=1,ei="",nn="srgb",Fi="srgb-linear",js="linear",rt="srgb",zi=7680,Sl=519,ff=512,df=513,pf=514,Au=515,mf=516,_f=517,gf=518,vf=519,wl=35044,yl="300 es",Hn=2e3,Bs=2001;class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],aa=Math.PI/180,Uo=180/Math.PI;function Qr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function xf(n,e){return(n%e+e)%e}function oa(n,e,t){return(1-t)*n+t*e}function Pr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class st{constructor(e=0,t=0){st.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,i,r,s,a,o,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],_=i[8],g=r[0],m=r[3],d=r[6],y=r[1],M=r[4],x=r[7],R=r[2],E=r[5],T=r[8];return s[0]=a*g+o*y+l*R,s[3]=a*m+o*M+l*E,s[6]=a*d+o*x+l*T,s[1]=c*g+u*y+h*R,s[4]=c*m+u*M+h*E,s[7]=c*d+u*x+h*T,s[2]=f*g+p*y+_*R,s[5]=f*m+p*M+_*E,s[8]=f*d+p*x+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,_=t*h+i*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(r*c-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=f*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(la.makeScale(e,t)),this}rotate(e){return this.premultiply(la.makeRotation(-e)),this}translate(e,t){return this.premultiply(la.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const la=new ze;function Tu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ws(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function bf(){const n=Ws("canvas");return n.style.display="block",n}const El={};function Gr(n){n in El||(El[n]=!0,console.warn(n))}function Mf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Sf(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function wf(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:Fi,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===rt&&(n.r=Gn(n.r),n.g=Gn(n.g),n.b=Gn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===rt&&(n.r=cr(n.r),n.g=cr(n.g),n.b=cr(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ei?js:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Al=[.64,.33,.3,.6,.15,.06],Tl=[.2126,.7152,.0722],Rl=[.3127,.329],Cl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[Fi]:{primaries:Al,whitePoint:Rl,transfer:js,toXYZ:Cl,fromXYZ:Pl,luminanceCoefficients:Tl,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:Al,whitePoint:Rl,transfer:rt,toXYZ:Cl,fromXYZ:Pl,luminanceCoefficients:Tl,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}});let Hi;class yf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hi===void 0&&(Hi=Ws("canvas")),Hi.width=e.width,Hi.height=e.height;const i=Hi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Gn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gn(t[i]/255)*255):t[i]=Gn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ef=0;class Ru{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=Qr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ca(r[a].image)):s.push(ca(r[a]))}else s=ca(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ca(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?yf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Af=0;class Gt extends Oi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=Ti,r=Ti,s=mn,a=Ri,o=zt,l=on,c=Gt.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Qr(),this.name="",this.source=new Ru(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vs:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vs:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=mu;Gt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,i=0,r=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],_=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,x=(p+1)/2,R=(d+1)/2,E=(u+f)/4,T=(h+g)/4,P=(_+m)/4;return M>x&&M>R?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=E/i,s=T/i):x>R?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=T/s,r=P/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(h-g)/y,this.z=(f-u)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tf extends Oi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Gt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ru(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends Tf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class qo extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rf extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ii{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[a+0],p=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(h!==g||l!==f||c!==p||u!==_){let m=1-o;const d=l*f+c*p+u*_+h*g,y=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const R=Math.sqrt(M),E=Math.atan2(R,d*y);m=Math.sin(m*E)/R,o=Math.sin(o*E)/R}const x=o*y;if(l=l*m+f*x,c=c*m+p*x,u=u*m+_*x,h=h*m+g*x,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+u*h+l*p-c*f,e[t+1]=l*_+u*f+c*h-o*p,e[t+2]=c*_+u*p+o*f-l*h,e[t+3]=u*_-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"YXZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"ZXY":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"ZYX":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"YZX":this._x=f*u*h+c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h-f*p*_;break;case"XZY":this._x=f*u*h-c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ll.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ll.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ua.copy(this).projectOnVector(e),this.sub(ua)}reflect(e){return this.sub(ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ua=new F,Ll=new Ii;class yr{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hn):hn.fromBufferAttribute(s,a),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),rs.copy(i.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),ss.subVectors(this.max,Lr),Gi.subVectors(e.a,Lr),Vi.subVectors(e.b,Lr),Bi.subVectors(e.c,Lr),Yn.subVectors(Vi,Gi),$n.subVectors(Bi,Vi),di.subVectors(Gi,Bi);let t=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-di.z,di.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,di.z,0,-di.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-di.y,di.x,0];return!ha(t,Gi,Vi,Bi,ss)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Gi,Vi,Bi,ss))?!1:(as.crossVectors(Yn,$n),t=[as.x,as.y,as.z],ha(t,Gi,Vi,Bi,ss))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Dn=[new F,new F,new F,new F,new F,new F,new F,new F],hn=new F,rs=new yr,Gi=new F,Vi=new F,Bi=new F,Yn=new F,$n=new F,di=new F,Lr=new F,ss=new F,as=new F,pi=new F;function ha(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){pi.fromArray(n,s);const o=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),l=e.dot(pi),c=t.dot(pi),u=i.dot(pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Cf=new yr,Dr=new F,fa=new F;class Ks{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Cf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);const t=Dr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Dr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(fa)),this.expandByPoint(Dr.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new F,da=new F,os=new F,qn=new F,pa=new F,ls=new F,ma=new F;class Pf{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){da.copy(e).add(t).multiplyScalar(.5),os.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(da);const s=e.distanceTo(t)*.5,a=-this.direction.dot(os),o=qn.dot(this.direction),l=-qn.dot(os),c=qn.lengthSq(),u=Math.abs(1-a*a);let h,f,p,_;if(u>0)if(h=a*l-o,f=a*o-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(da).addScaledVector(os,f),p}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,r,s){pa.subVectors(t,e),ls.subVectors(i,e),ma.crossVectors(pa,ls);let a=this.direction.dot(ma),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qn.subVectors(this.origin,e);const l=o*this.direction.dot(ls.crossVectors(qn,ls));if(l<0)return null;const c=o*this.direction.dot(pa.cross(qn));if(c<0||l+c>a)return null;const u=-o*qn.dot(ma);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,i,r,s,a,o,l,c,u,h,f,p,_,g,m){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,f,p,_,g,m)}set(e,t,i,r,s,a,o,l,c,u,h,f,p,_,g,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=_,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Wi.setFromMatrixColumn(e,0).length(),s=1/Wi.setFromMatrixColumn(e,1).length(),a=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,p=a*h,_=o*u,g=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+_*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,_=c*u,g=c*h;t[0]=f+g*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,_=c*u,g=c*h;t[0]=f-g*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,_=o*u,g=o*h;t[0]=l*u,t[4]=_*c-p,t[8]=f*c+g,t[1]=l*h,t[5]=g*c+f,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-f*h,t[8]=_*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+_,t[10]=f-g*h}else if(e.order==="XZY"){const f=a*l,p=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+g,t[5]=a*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*u,t[10]=g*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lf,e,Df)}lookAt(e,t,i){const r=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),jn.crossVectors(i,jt),jn.lengthSq()===0&&(Math.abs(i.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),jn.crossVectors(i,jt)),jn.normalize(),cs.crossVectors(jt,jn),r[0]=jn.x,r[4]=cs.x,r[8]=jt.x,r[1]=jn.y,r[5]=cs.y,r[9]=jt.y,r[2]=jn.z,r[6]=cs.z,r[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],_=i[2],g=i[6],m=i[10],d=i[14],y=i[3],M=i[7],x=i[11],R=i[15],E=r[0],T=r[4],P=r[8],w=r[12],b=r[1],C=r[5],H=r[9],N=r[13],W=r[2],j=r[6],z=r[10],Q=r[14],G=r[3],le=r[7],de=r[11],ue=r[15];return s[0]=a*E+o*b+l*W+c*G,s[4]=a*T+o*C+l*j+c*le,s[8]=a*P+o*H+l*z+c*de,s[12]=a*w+o*N+l*Q+c*ue,s[1]=u*E+h*b+f*W+p*G,s[5]=u*T+h*C+f*j+p*le,s[9]=u*P+h*H+f*z+p*de,s[13]=u*w+h*N+f*Q+p*ue,s[2]=_*E+g*b+m*W+d*G,s[6]=_*T+g*C+m*j+d*le,s[10]=_*P+g*H+m*z+d*de,s[14]=_*w+g*N+m*Q+d*ue,s[3]=y*E+M*b+x*W+R*G,s[7]=y*T+M*C+x*j+R*le,s[11]=y*P+M*H+x*z+R*de,s[15]=y*w+M*N+x*Q+R*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],_=e[3],g=e[7],m=e[11],d=e[15];return _*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*p-i*l*p)+g*(+t*l*p-t*c*f+s*a*f-r*a*p+r*c*u-s*l*u)+m*(+t*c*h-t*o*p-s*a*h+i*a*p+s*o*u-i*c*u)+d*(-r*o*u-t*l*h+t*o*f+r*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],_=e[12],g=e[13],m=e[14],d=e[15],y=h*m*c-g*f*c+g*l*p-o*m*p-h*l*d+o*f*d,M=_*f*c-u*m*c-_*l*p+a*m*p+u*l*d-a*f*d,x=u*g*c-_*h*c+_*o*p-a*g*p-u*o*d+a*h*d,R=_*h*l-u*g*l-_*o*f+a*g*f+u*o*m-a*h*m,E=t*y+i*M+r*x+s*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=y*T,e[1]=(g*f*s-h*m*s-g*r*p+i*m*p+h*r*d-i*f*d)*T,e[2]=(o*m*s-g*l*s+g*r*c-i*m*c-o*r*d+i*l*d)*T,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*p-i*l*p)*T,e[4]=M*T,e[5]=(u*m*s-_*f*s+_*r*p-t*m*p-u*r*d+t*f*d)*T,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*d-t*l*d)*T,e[7]=(a*f*s-u*l*s+u*r*c-t*f*c-a*r*p+t*l*p)*T,e[8]=x*T,e[9]=(_*h*s-u*g*s-_*i*p+t*g*p+u*i*d-t*h*d)*T,e[10]=(a*g*s-_*o*s+_*i*c-t*g*c-a*i*d+t*o*d)*T,e[11]=(u*o*s-a*h*s-u*i*c+t*h*c+a*i*p-t*o*p)*T,e[12]=R*T,e[13]=(u*g*r-_*h*r+_*i*f-t*g*f-u*i*m+t*h*m)*T,e[14]=(_*o*r-a*g*r-_*i*l+t*g*l+a*i*m-t*o*m)*T,e[15]=(a*h*r-u*o*r+u*i*l-t*h*l-a*i*f+t*o*f)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,_=s*h,g=a*u,m=a*h,d=o*h,y=l*c,M=l*u,x=l*h,R=i.x,E=i.y,T=i.z;return r[0]=(1-(g+d))*R,r[1]=(p+x)*R,r[2]=(_-M)*R,r[3]=0,r[4]=(p-x)*E,r[5]=(1-(f+d))*E,r[6]=(m+y)*E,r[7]=0,r[8]=(_+M)*T,r[9]=(m-y)*T,r[10]=(1-(f+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Wi.set(r[0],r[1],r[2]).length();const a=Wi.set(r[4],r[5],r[6]).length(),o=Wi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],fn.copy(this);const c=1/s,u=1/a,h=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=u,fn.elements[5]*=u,fn.elements[6]*=u,fn.elements[8]*=h,fn.elements[9]*=h,fn.elements[10]*=h,t.setFromRotationMatrix(fn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Hn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,_;if(o===Hn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Bs)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Hn){const l=this.elements,c=1/(t-e),u=1/(i-r),h=1/(a-s),f=(t+e)*c,p=(i+r)*u;let _,g;if(o===Hn)_=(a+s)*h,g=-2*h;else if(o===Bs)_=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Wi=new F,fn=new St,Lf=new F(0,0,0),Df=new F(1,1,1),jn=new F,cs=new F,jt=new F,Dl=new St,Il=new Ii;class gn{constructor(e=0,t=0,i=0,r=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Dl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Il.setFromEuler(this),this.setFromQuaternion(Il,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class Cu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let If=0;const Ul=new F,Xi=new Ii,Un=new St,us=new F,Ir=new F,Uf=new F,Nf=new Ii,Nl=new F(1,0,0),Fl=new F(0,1,0),Ol=new F(0,0,1),kl={type:"added"},Ff={type:"removed"},Yi={type:"childadded",child:null},_a={type:"childremoved",child:null};class $t extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new F,t=new gn,i=new Ii,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new ze}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(Nl,e)}rotateY(e){return this.rotateOnAxis(Fl,e)}rotateZ(e){return this.rotateOnAxis(Ol,e)}translateOnAxis(e,t){return Ul.copy(e).applyQuaternion(this.quaternion),this.position.add(Ul.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nl,e)}translateY(e){return this.translateOnAxis(Fl,e)}translateZ(e){return this.translateOnAxis(Ol,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?us.copy(e):us.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Ir,us,this.up):Un.lookAt(us,Ir,this.up),this.quaternion.setFromRotationMatrix(Un),r&&(Un.extractRotation(r.matrixWorld),Xi.setFromRotationMatrix(Un),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kl),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ff),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kl),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,Uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,Nf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}$t.DEFAULT_UP=new F(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new F,Nn=new F,ga=new F,Fn=new F,$i=new F,qi=new F,zl=new F,va=new F,xa=new F,ba=new F,Ma=new xt,Sa=new xt,wa=new xt;class pn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),dn.subVectors(e,t),r.cross(dn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){dn.subVectors(r,t),Nn.subVectors(i,t),ga.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(Nn),l=dn.dot(ga),c=Nn.dot(Nn),u=Nn.dot(ga),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,_=(a*u-o*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ma.setScalar(0),Sa.setScalar(0),wa.setScalar(0),Ma.fromBufferAttribute(e,t),Sa.fromBufferAttribute(e,i),wa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ma,s.x),a.addScaledVector(Sa,s.y),a.addScaledVector(wa,s.z),a}static isFrontFacing(e,t,i,r){return dn.subVectors(i,t),Nn.subVectors(e,t),dn.cross(Nn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),dn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;$i.subVectors(r,i),qi.subVectors(s,i),va.subVectors(e,i);const l=$i.dot(va),c=qi.dot(va);if(l<=0&&c<=0)return t.copy(i);xa.subVectors(e,r);const u=$i.dot(xa),h=qi.dot(xa);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector($i,a);ba.subVectors(e,s);const p=$i.dot(ba),_=qi.dot(ba);if(_>=0&&p<=_)return t.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(qi,o);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return zl.subVectors(s,r),o=(h-u)/(h-u+(p-_)),t.copy(r).addScaledVector(zl,o);const d=1/(m+g+f);return a=g*d,o=f*d,t.copy(i).addScaledVector($i,a).addScaledVector(qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},hs={h:0,s:0,l:0};function ya(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=xf(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ya(a,s,e+1/3),this.g=ya(a,s,e),this.b=ya(a,s,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const i=Pu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gn(e.r),this.g=Gn(e.g),this.b=Gn(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return qe.fromWorkingColorSpace(Nt.copy(this),e),Math.round(Xt(Nt.r*255,0,255))*65536+Math.round(Xt(Nt.g*255,0,255))*256+Math.round(Xt(Nt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(Nt.copy(this),t);const i=Nt.r,r=Nt.g,s=Nt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=nn){qe.fromWorkingColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,r=Nt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(hs);const i=oa(Kn.h,hs.h,t),r=oa(Kn.s,hs.s,t),s=oa(Kn.l,hs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new Qe;Qe.NAMES=Pu;let Of=0;class Zs extends Oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Qr(),this.name="",this.blending=or,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gs,this.blendDst=Ka,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==or&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Gs&&(i.blendSrc=this.blendSrc),this.blendDst!==Ka&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wr extends Zs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=pu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new F,fs=new st;class Ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=wl,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Pr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}}class Lu extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Du extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tn extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}let kf=0;const tn=new St,Ea=new $t,ji=new F,Kt=new yr,Ur=new yr,At=new F;class vn extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tu(e)?Du:Lu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,i){return tn.makeTranslation(e,t,i),this.applyMatrix4(tn),this}scale(e,t,i){return tn.makeScale(e,t,i),this.applyMatrix4(tn),this}lookAt(e){return Ea.lookAt(e),Ea.updateMatrix(),this.applyMatrix4(Ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tn(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Kt.setFromBufferAttribute(s),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(Kt.min,Ur.min),Kt.expandByPoint(At),At.addVectors(Kt.max,Ur.max),Kt.expandByPoint(At)):(Kt.expandByPoint(Ur.min),Kt.expandByPoint(Ur.max))}Kt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)At.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(At));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)At.fromBufferAttribute(o,c),l&&(ji.fromBufferAttribute(e,c),At.add(ji)),r=Math.max(r,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new F,l[P]=new F;const c=new F,u=new F,h=new F,f=new st,p=new st,_=new st,g=new F,m=new F;function d(P,w,b){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,b),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,w),_.fromBufferAttribute(s,b),u.sub(c),h.sub(c),p.sub(f),_.sub(f);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(C),o[P].add(g),o[w].add(g),o[b].add(g),l[P].add(m),l[w].add(m),l[b].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,w=y.length;P<w;++P){const b=y[P],C=b.start,H=b.count;for(let N=C,W=C+H;N<W;N+=3)d(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const M=new F,x=new F,R=new F,E=new F;function T(P){R.fromBufferAttribute(r,P),E.copy(R);const w=o[P];M.copy(w),M.sub(R.multiplyScalar(R.dot(w))).normalize(),x.crossVectors(E,w);const C=x.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,C)}for(let P=0,w=y.length;P<w;++P){const b=y[P],C=b.start,H=b.count;for(let N=C,W=C+H;N<W;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)f[_++]=c[p++]}return new Ct(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hl=new St,mi=new Pf,ds=new Ks,Gl=new F,ps=new F,ms=new F,_s=new F,Aa=new F,gs=new F,Vl=new F,vs=new F;class Lt extends $t{constructor(e=new vn,t=new Wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){gs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Aa.fromBufferAttribute(h,e),a?gs.addScaledVector(Aa,u):gs.addScaledVector(Aa.sub(t),u))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ds.copy(i.boundingSphere),ds.applyMatrix4(s),mi.copy(e.ray).recast(e.near),!(ds.containsPoint(mi.origin)===!1&&(mi.intersectSphere(ds,Gl)===null||mi.origin.distanceToSquared(Gl)>(e.far-e.near)**2))&&(Hl.copy(s).invert(),mi.copy(e.ray).applyMatrix4(Hl),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,R=M;x<R;x+=3){const E=o.getX(x),T=o.getX(x+1),P=o.getX(x+2);r=xs(this,d,e,i,c,u,h,E,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const y=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);r=xs(this,a,e,i,c,u,h,y,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,R=M;x<R;x+=3){const E=x,T=x+1,P=x+2;r=xs(this,d,e,i,c,u,h,E,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const y=m,M=m+1,x=m+2;r=xs(this,a,e,i,c,u,h,y,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function zf(n,e,t,i,r,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===li,o),l===null)return null;vs.copy(o),vs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(vs);return c<t.near||c>t.far?null:{distance:c,point:vs.clone(),object:n}}function xs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ps),n.getVertexPosition(l,ms),n.getVertexPosition(c,_s);const u=zf(n,e,t,i,ps,ms,_s,Vl);if(u){const h=new F;pn.getBarycoord(Vl,ps,ms,_s,h),r&&(u.uv=pn.getInterpolatedAttribute(r,o,l,c,h,new st)),s&&(u.uv1=pn.getInterpolatedAttribute(s,o,l,c,h,new st)),a&&(u.normal=pn.getInterpolatedAttribute(a,o,l,c,h,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new F,materialIndex:0};pn.getNormal(ps,ms,_s,f.normal),u.face=f,u.barycoord=h}return u}class Er extends vn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Tn(c,3)),this.setAttribute("normal",new Tn(u,3)),this.setAttribute("uv",new Tn(h,2));function _(g,m,d,y,M,x,R,E,T,P,w){const b=x/T,C=R/P,H=x/2,N=R/2,W=E/2,j=T+1,z=P+1;let Q=0,G=0;const le=new F;for(let de=0;de<z;de++){const ue=de*C-N;for(let ce=0;ce<j;ce++){const Le=ce*b-H;le[g]=Le*y,le[m]=ue*M,le[d]=W,c.push(le.x,le.y,le.z),le[g]=0,le[m]=0,le[d]=E>0?1:-1,u.push(le.x,le.y,le.z),h.push(ce/T),h.push(1-de/P),Q+=1}}for(let de=0;de<P;de++)for(let ue=0;ue<T;ue++){const ce=f+ue+j*de,Le=f+ue+j*(de+1),Y=f+(ue+1)+j*(de+1),q=f+(ue+1)+j*de;l.push(ce,Le,q),l.push(Le,Y,q),G+=6}o.addGroup(p,G,w),p+=G,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Er(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=xr(n[t]);for(const r in i)e[r]=i[r]}return e}function Hf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Iu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Uu={clone:xr,merge:kt};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Zs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.uniformsGroups=Hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Nu extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new F,Bl=new st,Wl=new st;class Jt extends Nu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Uo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(aa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Uo*2*Math.atan(Math.tan(aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z)}getViewSize(e,t){return this.getViewBounds(e,Bl,Wl),t.subVectors(Wl,Bl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(aa*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ki=-90,Zi=1;class Bf extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jt(Ki,Zi,e,t);r.layers=this.layers,this.add(r);const s=new Jt(Ki,Zi,e,t);s.layers=this.layers,this.add(s);const a=new Jt(Ki,Zi,e,t);a.layers=this.layers,this.add(a);const o=new Jt(Ki,Zi,e,t);o.layers=this.layers,this.add(o);const l=new Jt(Ki,Zi,e,t);l.layers=this.layers,this.add(l);const c=new Jt(Ki,Zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Fu extends Gt{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:mr,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Wf extends Di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Fu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:mn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Er(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:ii});s.uniforms.tEquirect.value=t;const a=new Lt(r,s),o=t.minFilter;return t.minFilter===Ri&&(t.minFilter=mn),new Bf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Ta=new F,Xf=new F,Yf=new ze;class Si{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ta.subVectors(i,t).cross(Xf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ta),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Yf.getNormalMatrix(e),r=this.coplanarPoint(Ta).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new Ks,bs=new F;class Ou{constructor(e=new Si,t=new Si,i=new Si,r=new Si,s=new Si,a=new Si){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],d=r[12],y=r[13],M=r[14],x=r[15];if(i[0].setComponents(l-s,f-c,m-p,x-d).normalize(),i[1].setComponents(l+s,f+c,m+p,x+d).normalize(),i[2].setComponents(l+a,f+u,m+_,x+y).normalize(),i[3].setComponents(l-a,f-u,m-_,x-y).normalize(),i[4].setComponents(l-o,f-h,m-g,x-M).normalize(),t===Hn)i[5].setComponents(l+o,f+h,m+g,x+M).normalize();else if(t===Bs)i[5].setComponents(o,h,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(bs.x=r.normal.x>0?e.max.x:e.min.x,bs.y=r.normal.y>0?e.max.y:e.min.y,bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ku(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function $f(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<h.length;p++){const _=h[f],g=h[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let p=0,_=h.length;p<_;p++){const g=h[p];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class br extends vn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,p=[],_=[],g=[],m=[];for(let d=0;d<u;d++){const y=d*f-a;for(let M=0;M<c;M++){const x=M*h-s;_.push(x,-y,0),g.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const M=y+c*d,x=y+c*(d+1),R=y+1+c*(d+1),E=y+1+c*d;p.push(M,x,E),p.push(x,R,E)}this.setIndex(p),this.setAttribute("position",new Tn(_,3)),this.setAttribute("normal",new Tn(g,3)),this.setAttribute("uv",new Tn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new br(e.width,e.height,e.widthSegments,e.heightSegments)}}var qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jf=`#ifdef USE_ALPHAHASH
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
#endif`,Kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ed=`#ifdef USE_AOMAP
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
#endif`,td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nd=`#ifdef USE_BATCHING
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
#endif`,id=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ad=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,od=`#ifdef USE_IRIDESCENCE
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
#endif`,ld=`#ifdef USE_BUMPMAP
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
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_d=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gd=`#define PI 3.141592653589793
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
} // validated`,vd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xd=`vec3 transformedNormal = objectNormal;
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
#endif`,bd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ed=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ad=`#ifdef USE_ENVMAP
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
#endif`,Td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rd=`#ifdef USE_ENVMAP
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
#endif`,Cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pd=`#ifdef USE_ENVMAP
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
#endif`,Ld=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ud=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nd=`#ifdef USE_GRADIENTMAP
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
}`,Fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Od=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zd=`uniform bool receiveShadow;
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
#endif`,Hd=`#ifdef USE_ENVMAP
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
#endif`,Gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xd=`PhysicalMaterial material;
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
#endif`,Yd=`struct PhysicalMaterial {
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
}`,$d=`
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
#endif`,qd=`#if defined( RE_IndirectDiffuse )
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
#endif`,jd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ip=`#if defined( USE_POINTS_UV )
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
#endif`,rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cp=`#ifdef USE_MORPHTARGETS
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
#endif`,up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_p=`#ifdef USE_NORMALMAP
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
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dp=`float getShadowMask() {
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
}`,Ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Up=`#ifdef USE_SKINNING
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
#endif`,Np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fp=`#ifdef USE_SKINNING
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
#endif`,Op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gp=`#ifdef USE_TRANSMISSION
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
#endif`,Vp=`#ifdef USE_TRANSMISSION
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
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $p=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qp=`uniform sampler2D t2D;
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
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`#include <common>
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
}`,em=`#if DEPTH_PACKING == 3200
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
}`,tm=`#define DISTANCE
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
}`,nm=`#define DISTANCE
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
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
}`,am=`uniform vec3 diffuse;
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
}`,om=`#include <common>
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#define LAMBERT
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
}`,um=`#define LAMBERT
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
}`,hm=`#define MATCAP
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
}`,fm=`#define MATCAP
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
}`,dm=`#define NORMAL
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
}`,pm=`#define NORMAL
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
}`,mm=`#define PHONG
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
}`,_m=`#define PHONG
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
}`,gm=`#define STANDARD
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
}`,vm=`#define STANDARD
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
}`,xm=`#define TOON
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
}`,bm=`#define TOON
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
}`,Mm=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,wm=`#include <common>
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
}`,ym=`uniform vec3 color;
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
}`,Em=`uniform float rotation;
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
}`,Am=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:qf,alphahash_pars_fragment:jf,alphamap_fragment:Kf,alphamap_pars_fragment:Zf,alphatest_fragment:Jf,alphatest_pars_fragment:Qf,aomap_fragment:ed,aomap_pars_fragment:td,batching_pars_vertex:nd,batching_vertex:id,begin_vertex:rd,beginnormal_vertex:sd,bsdfs:ad,iridescence_fragment:od,bumpmap_pars_fragment:ld,clipping_planes_fragment:cd,clipping_planes_pars_fragment:ud,clipping_planes_pars_vertex:hd,clipping_planes_vertex:fd,color_fragment:dd,color_pars_fragment:pd,color_pars_vertex:md,color_vertex:_d,common:gd,cube_uv_reflection_fragment:vd,defaultnormal_vertex:xd,displacementmap_pars_vertex:bd,displacementmap_vertex:Md,emissivemap_fragment:Sd,emissivemap_pars_fragment:wd,colorspace_fragment:yd,colorspace_pars_fragment:Ed,envmap_fragment:Ad,envmap_common_pars_fragment:Td,envmap_pars_fragment:Rd,envmap_pars_vertex:Cd,envmap_physical_pars_fragment:Hd,envmap_vertex:Pd,fog_vertex:Ld,fog_pars_vertex:Dd,fog_fragment:Id,fog_pars_fragment:Ud,gradientmap_pars_fragment:Nd,lightmap_pars_fragment:Fd,lights_lambert_fragment:Od,lights_lambert_pars_fragment:kd,lights_pars_begin:zd,lights_toon_fragment:Gd,lights_toon_pars_fragment:Vd,lights_phong_fragment:Bd,lights_phong_pars_fragment:Wd,lights_physical_fragment:Xd,lights_physical_pars_fragment:Yd,lights_fragment_begin:$d,lights_fragment_maps:qd,lights_fragment_end:jd,logdepthbuf_fragment:Kd,logdepthbuf_pars_fragment:Zd,logdepthbuf_pars_vertex:Jd,logdepthbuf_vertex:Qd,map_fragment:ep,map_pars_fragment:tp,map_particle_fragment:np,map_particle_pars_fragment:ip,metalnessmap_fragment:rp,metalnessmap_pars_fragment:sp,morphinstance_vertex:ap,morphcolor_vertex:op,morphnormal_vertex:lp,morphtarget_pars_vertex:cp,morphtarget_vertex:up,normal_fragment_begin:hp,normal_fragment_maps:fp,normal_pars_fragment:dp,normal_pars_vertex:pp,normal_vertex:mp,normalmap_pars_fragment:_p,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:vp,clearcoat_pars_fragment:xp,iridescence_pars_fragment:bp,opaque_fragment:Mp,packing:Sp,premultiplied_alpha_fragment:wp,project_vertex:yp,dithering_fragment:Ep,dithering_pars_fragment:Ap,roughnessmap_fragment:Tp,roughnessmap_pars_fragment:Rp,shadowmap_pars_fragment:Cp,shadowmap_pars_vertex:Pp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Dp,skinbase_vertex:Ip,skinning_pars_vertex:Up,skinning_vertex:Np,skinnormal_vertex:Fp,specularmap_fragment:Op,specularmap_pars_fragment:kp,tonemapping_fragment:zp,tonemapping_pars_fragment:Hp,transmission_fragment:Gp,transmission_pars_fragment:Vp,uv_pars_fragment:Bp,uv_pars_vertex:Wp,uv_vertex:Xp,worldpos_vertex:Yp,background_vert:$p,background_frag:qp,backgroundCube_vert:jp,backgroundCube_frag:Kp,cube_vert:Zp,cube_frag:Jp,depth_vert:Qp,depth_frag:em,distanceRGBA_vert:tm,distanceRGBA_frag:nm,equirect_vert:im,equirect_frag:rm,linedashed_vert:sm,linedashed_frag:am,meshbasic_vert:om,meshbasic_frag:lm,meshlambert_vert:cm,meshlambert_frag:um,meshmatcap_vert:hm,meshmatcap_frag:fm,meshnormal_vert:dm,meshnormal_frag:pm,meshphong_vert:mm,meshphong_frag:_m,meshphysical_vert:gm,meshphysical_frag:vm,meshtoon_vert:xm,meshtoon_frag:bm,points_vert:Mm,points_frag:Sm,shadow_vert:wm,shadow_frag:ym,sprite_vert:Em,sprite_frag:Am},he={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},yn={basic:{uniforms:kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:kt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:kt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:kt([he.points,he.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:kt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:kt([he.common,he.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:kt([he.sprite,he.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:kt([he.common,he.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:kt([he.lights,he.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};yn.physical={uniforms:kt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Ms={r:0,b:0,g:0},gi=new gn,Tm=new St;function Rm(n,e,t,i,r,s,a){const o=new Qe(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function _(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function g(y){let M=!1;const x=_(y);x===null?d(o,l):x&&x.isColor&&(d(x,1),M=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,M){const x=_(M);x&&(x.isCubeTexture||x.mapping===qs)?(u===void 0&&(u=new Lt(new Er(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:xr(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),gi.copy(M.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(gi)),u.material.toneMapped=qe.getTransfer(x.colorSpace)!==rt,(h!==x||f!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Lt(new br(2,2),new Rn({name:"BackgroundMaterial",uniforms:xr(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qe.getTransfer(x.colorSpace)!==rt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,M){y.getRGB(Ms,Iu(n)),i.buffers.color.setClear(Ms.r,Ms.g,Ms.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),l=M,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(o,l)},render:g,addToRenderList:m}}function Cm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(b,C,H,N,W){let j=!1;const z=h(N,H,C);s!==z&&(s=z,c(s.object)),j=p(b,N,H,W),j&&_(b,N,H,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,x(b,C,H,N),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function h(b,C,H){const N=H.wireframe===!0;let W=i[b.id];W===void 0&&(W={},i[b.id]=W);let j=W[C.id];j===void 0&&(j={},W[C.id]=j);let z=j[N];return z===void 0&&(z=f(l()),j[N]=z),z}function f(b){const C=[],H=[],N=[];for(let W=0;W<t;W++)C[W]=0,H[W]=0,N[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:N,object:b,attributes:{},index:null}}function p(b,C,H,N){const W=s.attributes,j=C.attributes;let z=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){const de=W[G];let ue=j[G];if(ue===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(ue=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(ue=b.instanceColor)),de===void 0||de.attribute!==ue||ue&&de.data!==ue.data)return!0;z++}return s.attributesNum!==z||s.index!==N}function _(b,C,H,N){const W={},j=C.attributes;let z=0;const Q=H.getAttributes();for(const G in Q)if(Q[G].location>=0){let de=j[G];de===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(de=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(de=b.instanceColor));const ue={};ue.attribute=de,de&&de.data&&(ue.data=de.data),W[G]=ue,z++}s.attributes=W,s.attributesNum=z,s.index=N}function g(){const b=s.newAttributes;for(let C=0,H=b.length;C<H;C++)b[C]=0}function m(b){d(b,0)}function d(b,C){const H=s.newAttributes,N=s.enabledAttributes,W=s.attributeDivisors;H[b]=1,N[b]===0&&(n.enableVertexAttribArray(b),N[b]=1),W[b]!==C&&(n.vertexAttribDivisor(b,C),W[b]=C)}function y(){const b=s.newAttributes,C=s.enabledAttributes;for(let H=0,N=C.length;H<N;H++)C[H]!==b[H]&&(n.disableVertexAttribArray(H),C[H]=0)}function M(b,C,H,N,W,j,z){z===!0?n.vertexAttribIPointer(b,C,H,W,j):n.vertexAttribPointer(b,C,H,N,W,j)}function x(b,C,H,N){g();const W=N.attributes,j=H.getAttributes(),z=C.defaultAttributeValues;for(const Q in j){const G=j[Q];if(G.location>=0){let le=W[Q];if(le===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(le=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(le=b.instanceColor)),le!==void 0){const de=le.normalized,ue=le.itemSize,ce=e.get(le);if(ce===void 0)continue;const Le=ce.buffer,Y=ce.type,q=ce.bytesPerElement,fe=Y===n.INT||Y===n.UNSIGNED_INT||le.gpuType===Vo;if(le.isInterleavedBufferAttribute){const se=le.data,be=se.stride,Ne=le.offset;if(se.isInstancedInterleavedBuffer){for(let Be=0;Be<G.locationSize;Be++)d(G.location+Be,se.meshPerAttribute);b.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Be=0;Be<G.locationSize;Be++)m(G.location+Be);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let Be=0;Be<G.locationSize;Be++)M(G.location+Be,ue/G.locationSize,Y,de,be*q,(Ne+ue/G.locationSize*Be)*q,fe)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<G.locationSize;se++)d(G.location+se,le.meshPerAttribute);b.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<G.locationSize;se++)m(G.location+se);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let se=0;se<G.locationSize;se++)M(G.location+se,ue/G.locationSize,Y,de,ue*q,ue/G.locationSize*se*q,fe)}}else if(z!==void 0){const de=z[Q];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(G.location,de);break;case 3:n.vertexAttrib3fv(G.location,de);break;case 4:n.vertexAttrib4fv(G.location,de);break;default:n.vertexAttrib1fv(G.location,de)}}}}y()}function R(){P();for(const b in i){const C=i[b];for(const H in C){const N=C[H];for(const W in N)u(N[W].object),delete N[W];delete C[H]}delete i[b]}}function E(b){if(i[b.id]===void 0)return;const C=i[b.id];for(const H in C){const N=C[H];for(const W in N)u(N[W].object),delete N[W];delete C[H]}delete i[b.id]}function T(b){for(const C in i){const H=i[C];if(H[b.id]===void 0)continue;const N=H[b.id];for(const W in N)u(N[W].object),delete N[W];delete H[b.id]}}function P(){w(),a=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function Pm(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];t.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)a(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Lm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==zt&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const P=T===Jr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==on&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zn&&!P)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:R,maxSamples:E}}function Dm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Si,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,M=y*4;let x=d.clippingState||null;l.value=x,x=u(_,f,M,p);for(let R=0;R!==M;++R)x[R]=t[R];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const d=p+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,x=p;M!==g;++M,x+=4)a.copy(h[M]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Im(n){let e=new WeakMap;function t(a,o){return o===ro?a.mapping=mr:o===so&&(a.mapping=_r),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ro||o===so)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Wf(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Um extends Nu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const rr=4,Xl=[.125,.215,.35,.446,.526,.582],Ei=20,Ra=new Um,Yl=new Qe;let Ca=null,Pa=0,La=0,Da=!1;const wi=(1+Math.sqrt(5))/2,Ji=1/wi,$l=[new F(-wi,Ji,0),new F(wi,Ji,0),new F(-Ji,0,wi),new F(Ji,0,wi),new F(0,wi,-Ji),new F(0,wi,Ji),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class ql{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ca,Pa,La),this._renderer.xr.enabled=Da,e.scissorTest=!1,Ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===_r?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Jr,format:zt,colorSpace:Fi,depthBuffer:!1},r=jl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nm(s)),this._blurMaterial=Fm(s,e,t)}return r}_compileMaterial(e){const t=new Lt(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,i,r){const o=new Jt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Yl),u.toneMapping=ri,u.autoClear=!1;const p=new Wr({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),_=new Lt(new Er,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(Yl),g=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):y===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const M=this._cubeSize;Ss(r,y*M,d>2?M:0,M,M),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===mr||e.mapping===_r;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Lt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ss(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ra)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=$l[(r-s-1)%$l.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Lt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ei-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Ei;m>Ei&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ei}`);const d=[];let y=0;for(let T=0;T<Ei;++T){const P=T/g,w=Math.exp(-P*P/2);d.push(w),T===0?y+=w:T<m&&(y+=2*w)}for(let T=0;T<d.length;T++)d[T]=d[T]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=_,f.mipInt.value=M-i;const x=this._sizeLods[r],R=3*x*(r>M-rr?r-M+rr:0),E=4*(this._cubeSize-x);Ss(t,R,E,3*x,2*x),l.setRenderTarget(t),l.render(h,Ra)}}function Nm(n){const e=[],t=[],i=[];let r=n;const s=n-rr+1+Xl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-rr?l=Xl[a-n+rr-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,g=3,m=2,d=1,y=new Float32Array(g*_*p),M=new Float32Array(m*_*p),x=new Float32Array(d*_*p);for(let E=0;E<p;E++){const T=E%3*2/3-1,P=E>2?0:-1,w=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set(w,g*_*E),M.set(f,m*_*E);const b=[E,E,E,E,E,E];x.set(b,d*_*E)}const R=new vn;R.setAttribute("position",new Ct(y,g)),R.setAttribute("uv",new Ct(M,m)),R.setAttribute("faceIndex",new Ct(x,d)),e.push(R),r>rr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function jl(n,e,t){const i=new Di(n,e,t);return i.texture.mapping=qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ss(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Fm(n,e,t){const i=new Float32Array(Ei),r=new F(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:jo(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Kl(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jo(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Zl(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function jo(){return`

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
	`}function Om(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ro||l===so,u=l===mr||l===_r;if(c||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new ql(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new ql(n)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function km(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Gr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function zm(n,e,t,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let m=0,d=g.length;m<d;m++)e.remove(g[m])}f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)e.update(f[_],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const g=p[_];for(let m=0,d=g.length;m<d;m++)e.update(g[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let g=0;if(p!==null){const y=p.array;g=p.version;for(let M=0,x=y.length;M<x;M+=3){const R=y[M+0],E=y[M+1],T=y[M+2];f.push(R,E,E,T,T,R)}}else if(_!==void 0){const y=_.array;g=_.version;for(let M=0,x=y.length/3-1;M<x;M+=3){const R=M+0,E=M+1,T=M+2;f.push(R,E,E,T,T,R)}}else return;const m=new(Tu(f)?Du:Lu)(f,1);m.version=g;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Hm(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*a),t.update(p,i,1)}function c(f,p,_){_!==0&&(n.drawElementsInstanced(i,p,s,f*a,_),t.update(p,i,_))}function u(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];t.update(m,i,1)}function h(f,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,g,0,_);let d=0;for(let y=0;y<_;y++)d+=p[y]*g[y];t.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Gm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Vm(n,e,t){const i=new WeakMap,r=new xt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let w=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),_===!0&&(M=2),g===!0&&(M=3);let x=o.attributes.position.count*M,R=1;x>e.maxTextureSize&&(R=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*R*4*h),T=new qo(E,x,R,h);T.type=zn,T.needsUpdate=!0;const P=M*4;for(let b=0;b<h;b++){const C=m[b],H=d[b],N=y[b],W=x*R*4*b;for(let j=0;j<C.count;j++){const z=j*P;p===!0&&(r.fromBufferAttribute(C,j),E[W+z+0]=r.x,E[W+z+1]=r.y,E[W+z+2]=r.z,E[W+z+3]=0),_===!0&&(r.fromBufferAttribute(H,j),E[W+z+4]=r.x,E[W+z+5]=r.y,E[W+z+6]=r.z,E[W+z+7]=0),g===!0&&(r.fromBufferAttribute(N,j),E[W+z+8]=r.x,E[W+z+9]=r.y,E[W+z+10]=r.z,E[W+z+11]=N.itemSize===4?r.w:1)}}f={count:h,texture:T,size:new st(x,R)},i.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Bm(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class zu extends Gt{constructor(e,t,i,r,s,a,o,l,c,u=lr){if(u!==lr&&u!==vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===lr&&(i=Li),i===void 0&&u===vr&&(i=gr),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Hu=new Gt,Jl=new zu(1,1),Gu=new qo,Vu=new Rf,Bu=new Fu,Ql=[],ec=[],tc=new Float32Array(16),nc=new Float32Array(9),ic=new Float32Array(4);function Ar(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ql[r];if(s===void 0&&(s=new Float32Array(r),Ql[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Js(n,e){let t=ec[e];t===void 0&&(t=new Int32Array(e),ec[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Wm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function Ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function qm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(wt(t,i))return;ic.set(i),n.uniformMatrix2fv(this.addr,!1,ic),yt(t,i)}}function jm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(wt(t,i))return;nc.set(i),n.uniformMatrix3fv(this.addr,!1,nc),yt(t,i)}}function Km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(wt(t,i))return;tc.set(i),n.uniformMatrix4fv(this.addr,!1,tc),yt(t,i)}}function Zm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function e_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function t_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function n_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function s_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Jl.compareFunction=Au,s=Jl):s=Hu,t.setTexture2D(e||s,r)}function a_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Vu,r)}function o_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Bu,r)}function l_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Gu,r)}function c_(n){switch(n){case 5126:return Wm;case 35664:return Xm;case 35665:return Ym;case 35666:return $m;case 35674:return qm;case 35675:return jm;case 35676:return Km;case 5124:case 35670:return Zm;case 35667:case 35671:return Jm;case 35668:case 35672:return Qm;case 35669:case 35673:return e_;case 5125:return t_;case 36294:return n_;case 36295:return i_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return s_;case 35679:case 36299:case 36307:return a_;case 35680:case 36300:case 36308:case 36293:return o_;case 36289:case 36303:case 36311:case 36292:return l_}}function u_(n,e){n.uniform1fv(this.addr,e)}function h_(n,e){const t=Ar(e,this.size,2);n.uniform2fv(this.addr,t)}function f_(n,e){const t=Ar(e,this.size,3);n.uniform3fv(this.addr,t)}function d_(n,e){const t=Ar(e,this.size,4);n.uniform4fv(this.addr,t)}function p_(n,e){const t=Ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function m_(n,e){const t=Ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function __(n,e){const t=Ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function g_(n,e){n.uniform1iv(this.addr,e)}function v_(n,e){n.uniform2iv(this.addr,e)}function x_(n,e){n.uniform3iv(this.addr,e)}function b_(n,e){n.uniform4iv(this.addr,e)}function M_(n,e){n.uniform1uiv(this.addr,e)}function S_(n,e){n.uniform2uiv(this.addr,e)}function w_(n,e){n.uniform3uiv(this.addr,e)}function y_(n,e){n.uniform4uiv(this.addr,e)}function E_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Hu,s[a])}function A_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Vu,s[a])}function T_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Bu,s[a])}function R_(n,e,t){const i=this.cache,r=e.length,s=Js(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Gu,s[a])}function C_(n){switch(n){case 5126:return u_;case 35664:return h_;case 35665:return f_;case 35666:return d_;case 35674:return p_;case 35675:return m_;case 35676:return __;case 5124:case 35670:return g_;case 35667:case 35671:return v_;case 35668:case 35672:return x_;case 35669:case 35673:return b_;case 5125:return M_;case 36294:return S_;case 36295:return w_;case 36296:return y_;case 35678:case 36198:case 36298:case 36306:case 35682:return E_;case 35679:case 36299:case 36307:return A_;case 35680:case 36300:case 36308:case 36293:return T_;case 36289:case 36303:case 36311:case 36292:return R_}}class P_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=c_(t.type)}}class L_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=C_(t.type)}}class D_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ia=/(\w+)(\])?(\[|\.)?/g;function rc(n,e){n.seq.push(e),n.map[e.id]=e}function I_(n,e,t){const i=n.name,r=i.length;for(Ia.lastIndex=0;;){const s=Ia.exec(i),a=Ia.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){rc(t,c===void 0?new P_(o,n,e):new L_(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new D_(o),rc(t,h)),t=h}}}class Os{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);I_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const U_=37297;let N_=0;function F_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const ac=new ze;function O_(n){qe._getMatrix(ac,qe.workingColorSpace,n);const e=`mat3( ${ac.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case js:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function oc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+F_(n.getShaderSource(e),a)}else return r}function k_(n,e){const t=O_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function z_(n,e){let t;switch(e){case Qh:t="Linear";break;case ef:t="Reinhard";break;case tf:t="Cineon";break;case nf:t="ACESFilmic";break;case sf:t="AgX";break;case af:t="Neutral";break;case rf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ws=new F;function H_(){qe.getLuminanceCoefficients(ws);const n=ws.x.toFixed(4),e=ws.y.toFixed(4),t=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function G_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function V_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function B_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vr(n){return n!==""}function lc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const W_=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(n){return n.replace(W_,Y_)}const X_=new Map;function Y_(n,e){let t=Ge[e];if(t===void 0){const i=X_.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return No(t)}const $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(n){return n.replace($_,q_)}function q_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function j_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Uh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function K_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mr:case _r:e="ENVMAP_TYPE_CUBE";break;case qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Z_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _r:e="ENVMAP_MODE_REFRACTION";break}return e}function J_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case pu:e="ENVMAP_BLENDING_MULTIPLY";break;case Zh:e="ENVMAP_BLENDING_MIX";break;case Jh:e="ENVMAP_BLENDING_ADD";break}return e}function Q_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function e0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=j_(t),c=K_(t),u=Z_(t),h=J_(t),f=Q_(t),p=G_(t),_=V_(s),g=r.createProgram();let m,d,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Vr).join(`
`),d.length>0&&(d+=`
`)):(m=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),d=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ri?z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,k_("linearToOutputTexel",t.outputColorSpace),H_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=No(a),a=lc(a,t),a=cc(a,t),o=No(o),o=lc(o,t),o=cc(o,t),a=uc(a),o=uc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=y+m+a,x=y+d+o,R=sc(r,r.VERTEX_SHADER,M),E=sc(r,r.FRAGMENT_SHADER,x);r.attachShader(g,R),r.attachShader(g,E),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(C){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(g).trim(),N=r.getShaderInfoLog(R).trim(),W=r.getShaderInfoLog(E).trim();let j=!0,z=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,R,E);else{const Q=oc(r,R,"vertex"),G=oc(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+Q+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(N===""||W==="")&&(z=!1);z&&(C.diagnostics={runnable:j,programLog:H,vertexShader:{log:N,prefix:m},fragmentShader:{log:W,prefix:d}})}r.deleteShader(R),r.deleteShader(E),P=new Os(r,g),w=B_(r,g)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(g,U_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=N_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=E,this}let t0=0;class n0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new i0(e),t.set(e,i)),i}}class i0{constructor(e){this.id=t0++,this.code=e,this.usedTimes=0}}function r0(n,e,t,i,r,s,a){const o=new Cu,l=new n0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,b,C,H,N){const W=H.fog,j=N.geometry,z=w.isMeshStandardMaterial?H.environment:null,Q=(w.isMeshStandardMaterial?t:e).get(w.envMap||z),G=Q&&Q.mapping===qs?Q.image.height:null,le=_[w.type];w.precision!==null&&(p=r.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const de=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ue=de!==void 0?de.length:0;let ce=0;j.morphAttributes.position!==void 0&&(ce=1),j.morphAttributes.normal!==void 0&&(ce=2),j.morphAttributes.color!==void 0&&(ce=3);let Le,Y,q,fe;if(le){const it=yn[le];Le=it.vertexShader,Y=it.fragmentShader}else Le=w.vertexShader,Y=w.fragmentShader,l.update(w),q=l.getVertexShaderID(w),fe=l.getFragmentShaderID(w);const se=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ne=N.isInstancedMesh===!0,Be=N.isBatchedMesh===!0,dt=!!w.map,je=!!w.matcap,vt=!!Q,U=!!w.aoMap,Qt=!!w.lightMap,Xe=!!w.bumpMap,Ye=!!w.normalMap,Pe=!!w.displacementMap,ct=!!w.emissiveMap,Ce=!!w.metalnessMap,A=!!w.roughnessMap,v=w.anisotropy>0,O=w.clearcoat>0,Z=w.dispersion>0,ee=w.iridescence>0,K=w.sheen>0,Te=w.transmission>0,_e=v&&!!w.anisotropyMap,Me=O&&!!w.clearcoatMap,Ke=O&&!!w.clearcoatNormalMap,ie=O&&!!w.clearcoatRoughnessMap,Se=ee&&!!w.iridescenceMap,De=ee&&!!w.iridescenceThicknessMap,Ie=K&&!!w.sheenColorMap,we=K&&!!w.sheenRoughnessMap,$e=!!w.specularMap,He=!!w.specularColorMap,at=!!w.specularIntensityMap,L=Te&&!!w.transmissionMap,me=Te&&!!w.thicknessMap,$=!!w.gradientMap,J=!!w.alphaMap,xe=w.alphaTest>0,ge=!!w.alphaHash,Fe=!!w.extensions;let _t=ri;w.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(_t=n.toneMapping);const It={shaderID:le,shaderType:w.type,shaderName:w.name,vertexShader:Le,fragmentShader:Y,defines:w.defines,customVertexShaderID:q,customFragmentShaderID:fe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Be,batchingColor:Be&&N._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,instancingMorph:Ne&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Fi,alphaToCoverage:!!w.alphaToCoverage,map:dt,matcap:je,envMap:vt,envMapMode:vt&&Q.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:Qt,bumpMap:Xe,normalMap:Ye,displacementMap:f&&Pe,emissiveMap:ct,normalMapObjectSpace:Ye&&w.normalMapType===hf,normalMapTangentSpace:Ye&&w.normalMapType===uf,metalnessMap:Ce,roughnessMap:A,anisotropy:v,anisotropyMap:_e,clearcoat:O,clearcoatMap:Me,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ie,dispersion:Z,iridescence:ee,iridescenceMap:Se,iridescenceThicknessMap:De,sheen:K,sheenColorMap:Ie,sheenRoughnessMap:we,specularMap:$e,specularColorMap:He,specularIntensityMap:at,transmission:Te,transmissionMap:L,thicknessMap:me,gradientMap:$,opaque:w.transparent===!1&&w.blending===or&&w.alphaToCoverage===!1,alphaMap:J,alphaTest:xe,alphaHash:ge,combine:w.combine,mapUv:dt&&g(w.map.channel),aoMapUv:U&&g(w.aoMap.channel),lightMapUv:Qt&&g(w.lightMap.channel),bumpMapUv:Xe&&g(w.bumpMap.channel),normalMapUv:Ye&&g(w.normalMap.channel),displacementMapUv:Pe&&g(w.displacementMap.channel),emissiveMapUv:ct&&g(w.emissiveMap.channel),metalnessMapUv:Ce&&g(w.metalnessMap.channel),roughnessMapUv:A&&g(w.roughnessMap.channel),anisotropyMapUv:_e&&g(w.anisotropyMap.channel),clearcoatMapUv:Me&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:De&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(w.sheenRoughnessMap.channel),specularMapUv:$e&&g(w.specularMap.channel),specularColorMapUv:He&&g(w.specularColorMap.channel),specularIntensityMapUv:at&&g(w.specularIntensityMap.channel),transmissionMapUv:L&&g(w.transmissionMap.channel),thicknessMapUv:me&&g(w.thicknessMap.channel),alphaMapUv:J&&g(w.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ye||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!j.attributes.uv&&(dt||J),fog:!!W,useFog:w.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:be,skinning:N.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ce,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:_t,decodeVideoTexture:dt&&w.map.isVideoTexture===!0&&qe.getTransfer(w.map.colorSpace)===rt,decodeVideoTextureEmissive:ct&&w.emissiveMap.isVideoTexture===!0&&qe.getTransfer(w.emissiveMap.colorSpace)===rt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===rn,flipSided:w.side===Ht,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Fe&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&w.extensions.multiDraw===!0||Be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function d(w){const b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(const C in w.defines)b.push(C),b.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(y(b,w),M(b,w),b.push(n.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function y(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function M(w,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){const b=_[w.type];let C;if(b){const H=yn[b];C=Uu.clone(H.uniforms)}else C=w.uniforms;return C}function R(w,b){let C;for(let H=0,N=u.length;H<N;H++){const W=u[H];if(W.cacheKey===b){C=W,++C.usedTimes;break}}return C===void 0&&(C=new e0(n,b,w,s),u.push(C)),C}function E(w){if(--w.usedTimes===0){const b=u.indexOf(w);u[b]=u[u.length-1],u.pop(),w.destroy()}}function T(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:R,releaseProgram:E,releaseShaderCache:T,programs:u,dispose:P}}function s0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function a0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function fc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function dc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,f,p,_,g,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=_,d.renderOrder=h.renderOrder,d.z=g,d.group=m),e++,d}function o(h,f,p,_,g,m){const d=a(h,f,p,_,g,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(h,f,p,_,g,m){const d=a(h,f,p,_,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||a0),i.length>1&&i.sort(f||fc),r.length>1&&r.sort(f||fc)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function o0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new dc,n.set(i,[a])):r>=s.length?(a=new dc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function l0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Qe};break;case"SpotLight":t={position:new F,direction:new F,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function c0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let u0=0;function h0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function f0(n){const e=new l0,t=c0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new St,a=new St;function o(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,_=0,g=0,m=0,d=0,y=0,M=0,x=0,R=0,E=0,T=0;c.sort(h0);for(let w=0,b=c.length;w<b;w++){const C=c[w],H=C.color,N=C.intensity,W=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=H.r*N,h+=H.g*N,f+=H.b*N;else if(C.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(C.sh.coefficients[z],N);T++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=C.shadow.matrix,y++}i.directional[p]=z,p++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(H).multiplyScalar(N),z.distance=W,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,i.spot[g]=z;const Q=C.shadow;if(C.map&&(i.spotLightMap[R]=C.map,R++,Q.updateMatrices(C),C.castShadow&&E++),i.spotLightMatrix[g]=Q.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.spotShadow[g]=G,i.spotShadowMap[g]=j,x++}g++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(H).multiplyScalar(N),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=z,m++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const Q=C.shadow,G=t.get(C);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,i.pointShadow[_]=G,i.pointShadowMap[_]=j,i.pointShadowMatrix[_]=C.shadow.matrix,M++}i.point[_]=z,_++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(N),z.groundColor.copy(C.groundColor).multiplyScalar(N),i.hemi[d]=z,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==y||P.numPointShadows!==M||P.numSpotShadows!==x||P.numSpotMaps!==R||P.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=x+R-E,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=T,P.directionalLength=p,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=y,P.numPointShadows=M,P.numSpotShadows=x,P.numSpotMaps=R,P.numLightProbes=T,i.version=u0++)}function l(c,u){let h=0,f=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const M=c[d];if(M.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(M.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const x=i.rectArea[_];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function pc(n){const e=new f0(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function d0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new pc(n),e.set(r,[o])):s>=a.length?(o=new pc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class p0 extends Zs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class m0 extends Zs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g0=`uniform sampler2D shadow_pass;
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
}`;function v0(n,e,t){let i=new Ou;const r=new st,s=new st,a=new xt,o=new p0({depthPacking:cf}),l=new m0,c={},u=t.maxTextureSize,h={[li]:Ht,[Ht]:li,[rn]:rn},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:_0,fragmentShader:g0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new vn;_.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Lt(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hu;let d=this.type;this.render=function(E,T,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const w=n.getRenderTarget(),b=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),H=n.state;H.setBlending(ii),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const N=d!==kn&&this.type===kn,W=d===kn&&this.type!==kn;for(let j=0,z=E.length;j<z;j++){const Q=E[j],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const le=G.getFrameExtents();if(r.multiply(le),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/le.x),r.x=s.x*le.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/le.y),r.y=s.y*le.y,G.mapSize.y=s.y)),G.map===null||N===!0||W===!0){const ue=this.type!==kn?{minFilter:Ot,magFilter:Ot}:{};G.map!==null&&G.map.dispose(),G.map=new Di(r.x,r.y,ue),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const de=G.getViewportCount();for(let ue=0;ue<de;ue++){const ce=G.getViewport(ue);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),H.viewport(a),G.updateMatrices(Q,ue),i=G.getFrustum(),x(T,P,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===kn&&y(G,P),G.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(w,b,C)};function y(E,T){const P=e.update(g);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Di(r.x,r.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(T,null,P,f,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(T,null,P,p,g,null)}function M(E,T,P,w){let b=null;const C=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)b=C;else if(b=P.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=b.uuid,N=T.uuid;let W=c[H];W===void 0&&(W={},c[H]=W);let j=W[N];j===void 0&&(j=b.clone(),W[N]=j,T.addEventListener("dispose",R)),b=j}if(b.visible=T.visible,b.wireframe=T.wireframe,w===kn?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:h[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const H=n.properties.get(b);H.light=P}return b}function x(E,T,P,w,b){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===kn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const N=e.update(E),W=E.material;if(Array.isArray(W)){const j=N.groups;for(let z=0,Q=j.length;z<Q;z++){const G=j[z],le=W[G.materialIndex];if(le&&le.visible){const de=M(E,le,w,b);E.onBeforeShadow(n,E,T,P,N,de,G),n.renderBufferDirect(P,null,N,de,E,G),E.onAfterShadow(n,E,T,P,N,de,G)}}}else if(W.visible){const j=M(E,W,w,b);E.onBeforeShadow(n,E,T,P,N,j,null),n.renderBufferDirect(P,null,N,j,E,null),E.onAfterShadow(n,E,T,P,N,j,null)}}const H=E.children;for(let N=0,W=H.length;N<W;N++)x(H[N],T,P,w,b)}function R(E){E.target.removeEventListener("dispose",R);for(const P in c){const w=c[P],b=E.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}const x0={[Za]:Ja,[Qa]:no,[eo]:io,[pr]:to,[Ja]:Za,[no]:Qa,[io]:eo,[to]:pr};function b0(n,e){function t(){let L=!1;const me=new xt;let $=null;const J=new xt(0,0,0,0);return{setMask:function(xe){$!==xe&&!L&&(n.colorMask(xe,xe,xe,xe),$=xe)},setLocked:function(xe){L=xe},setClear:function(xe,ge,Fe,_t,It){It===!0&&(xe*=_t,ge*=_t,Fe*=_t),me.set(xe,ge,Fe,_t),J.equals(me)===!1&&(n.clearColor(xe,ge,Fe,_t),J.copy(me))},reset:function(){L=!1,$=null,J.set(-1,0,0,0)}}}function i(){let L=!1,me=!1,$=null,J=null,xe=null;return{setReversed:function(ge){if(me!==ge){const Fe=e.get("EXT_clip_control");me?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);const _t=xe;xe=null,this.setClear(_t)}me=ge},getReversed:function(){return me},setTest:function(ge){ge?se(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(ge){$!==ge&&!L&&(n.depthMask(ge),$=ge)},setFunc:function(ge){if(me&&(ge=x0[ge]),J!==ge){switch(ge){case Za:n.depthFunc(n.NEVER);break;case Ja:n.depthFunc(n.ALWAYS);break;case Qa:n.depthFunc(n.LESS);break;case pr:n.depthFunc(n.LEQUAL);break;case eo:n.depthFunc(n.EQUAL);break;case to:n.depthFunc(n.GEQUAL);break;case no:n.depthFunc(n.GREATER);break;case io:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=ge}},setLocked:function(ge){L=ge},setClear:function(ge){xe!==ge&&(me&&(ge=1-ge),n.clearDepth(ge),xe=ge)},reset:function(){L=!1,$=null,J=null,xe=null,me=!1}}}function r(){let L=!1,me=null,$=null,J=null,xe=null,ge=null,Fe=null,_t=null,It=null;return{setTest:function(it){L||(it?se(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(it){me!==it&&!L&&(n.stencilMask(it),me=it)},setFunc:function(it,cn,Pn){($!==it||J!==cn||xe!==Pn)&&(n.stencilFunc(it,cn,Pn),$=it,J=cn,xe=Pn)},setOp:function(it,cn,Pn){(ge!==it||Fe!==cn||_t!==Pn)&&(n.stencilOp(it,cn,Pn),ge=it,Fe=cn,_t=Pn)},setLocked:function(it){L=it},setClear:function(it){It!==it&&(n.clearStencil(it),It=it)},reset:function(){L=!1,me=null,$=null,J=null,xe=null,ge=null,Fe=null,_t=null,It=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,d=null,y=null,M=null,x=null,R=null,E=null,T=new Qe(0,0,0),P=0,w=!1,b=null,C=null,H=null,N=null,W=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=Q>=2);let le=null,de={};const ue=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Le=new xt().fromArray(ue),Y=new xt().fromArray(ce);function q(L,me,$,J){const xe=new Uint8Array(4),ge=n.createTexture();n.bindTexture(L,ge),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Fe=0;Fe<$;Fe++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(me+Fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return ge}const fe={};fe[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(n.DEPTH_TEST),a.setFunc(pr),Xe(!1),Ye(vl),se(n.CULL_FACE),U(ii);function se(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function be(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ne(L,me){return h[L]!==me?(n.bindFramebuffer(L,me),h[L]=me,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=me),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=me),!0):!1}function Be(L,me){let $=p,J=!1;if(L){$=f.get(me),$===void 0&&($=[],f.set(me,$));const xe=L.textures;if($.length!==xe.length||$[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Fe=xe.length;ge<Fe;ge++)$[ge]=n.COLOR_ATTACHMENT0+ge;$.length=xe.length,J=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,J=!0);J&&n.drawBuffers($)}function dt(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const je={[yi]:n.FUNC_ADD,[Nh]:n.FUNC_SUBTRACT,[Fh]:n.FUNC_REVERSE_SUBTRACT};je[Oh]=n.MIN,je[kh]=n.MAX;const vt={[zh]:n.ZERO,[du]:n.ONE,[Hh]:n.SRC_COLOR,[Gs]:n.SRC_ALPHA,[Yh]:n.SRC_ALPHA_SATURATE,[Wh]:n.DST_COLOR,[Vh]:n.DST_ALPHA,[Gh]:n.ONE_MINUS_SRC_COLOR,[Ka]:n.ONE_MINUS_SRC_ALPHA,[Xh]:n.ONE_MINUS_DST_COLOR,[Bh]:n.ONE_MINUS_DST_ALPHA,[$h]:n.CONSTANT_COLOR,[qh]:n.ONE_MINUS_CONSTANT_COLOR,[jh]:n.CONSTANT_ALPHA,[Kh]:n.ONE_MINUS_CONSTANT_ALPHA};function U(L,me,$,J,xe,ge,Fe,_t,It,it){if(L===ii){g===!0&&(be(n.BLEND),g=!1);return}if(g===!1&&(se(n.BLEND),g=!0),L!==fu){if(L!==m||it!==w){if((d!==yi||x!==yi)&&(n.blendEquation(n.FUNC_ADD),d=yi,x=yi),it)switch(L){case or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFunc(n.ONE,n.ONE);break;case bl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ml:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case bl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ml:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,M=null,R=null,E=null,T.set(0,0,0),P=0,m=L,w=it}return}xe=xe||me,ge=ge||$,Fe=Fe||J,(me!==d||xe!==x)&&(n.blendEquationSeparate(je[me],je[xe]),d=me,x=xe),($!==y||J!==M||ge!==R||Fe!==E)&&(n.blendFuncSeparate(vt[$],vt[J],vt[ge],vt[Fe]),y=$,M=J,R=ge,E=Fe),(_t.equals(T)===!1||It!==P)&&(n.blendColor(_t.r,_t.g,_t.b,It),T.copy(_t),P=It),m=L,w=!1}function Qt(L,me){L.side===rn?be(n.CULL_FACE):se(n.CULL_FACE);let $=L.side===Ht;me&&($=!$),Xe($),L.blending===or&&L.transparent===!1?U(ii):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const J=L.stencilWrite;o.setTest(J),J&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ct(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(L){b!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),b=L)}function Ye(L){L!==Dh?(se(n.CULL_FACE),L!==C&&(L===vl?n.cullFace(n.BACK):L===Ih?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),C=L}function Pe(L){L!==H&&(z&&n.lineWidth(L),H=L)}function ct(L,me,$){L?(se(n.POLYGON_OFFSET_FILL),(N!==me||W!==$)&&(n.polygonOffset(me,$),N=me,W=$)):be(n.POLYGON_OFFSET_FILL)}function Ce(L){L?se(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function A(L){L===void 0&&(L=n.TEXTURE0+j-1),le!==L&&(n.activeTexture(L),le=L)}function v(L,me,$){$===void 0&&(le===null?$=n.TEXTURE0+j-1:$=le);let J=de[$];J===void 0&&(J={type:void 0,texture:void 0},de[$]=J),(J.type!==L||J.texture!==me)&&(le!==$&&(n.activeTexture($),le=$),n.bindTexture(L,me||fe[L]),J.type=L,J.texture=me)}function O(){const L=de[le];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){Le.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Le.copy(L))}function we(L){Y.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function $e(L,me){let $=c.get(me);$===void 0&&($=new WeakMap,c.set(me,$));let J=$.get(L);J===void 0&&(J=n.getUniformBlockIndex(me,L.name),$.set(L,J))}function He(L,me){const J=c.get(me).get(L);l.get(me)!==J&&(n.uniformBlockBinding(me,J,L.__bindingPointIndex),l.set(me,J))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},le=null,de={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,d=null,y=null,M=null,x=null,R=null,E=null,T=new Qe(0,0,0),P=0,w=!1,b=null,C=null,H=null,N=null,W=null,Le.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:be,bindFramebuffer:Ne,drawBuffers:Be,useProgram:dt,setBlending:U,setMaterial:Qt,setFlipSided:Xe,setCullFace:Ye,setLineWidth:Pe,setPolygonOffset:ct,setScissorTest:Ce,activeTexture:A,bindTexture:v,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:ee,texImage2D:Se,texImage3D:De,updateUBOMapping:$e,uniformBlockBinding:He,texStorage2D:Ke,texStorage3D:ie,texSubImage2D:K,texSubImage3D:Te,compressedTexSubImage2D:_e,compressedTexSubImage3D:Me,scissor:Ie,viewport:we,reset:at}}function mc(n,e,t,i){const r=M0(i);switch(t){case xu:return n*e;case Mu:return n*e;case Su:return n*e*2;case wu:return n*e/r.components*r.byteLength;case Xo:return n*e/r.components*r.byteLength;case yu:return n*e*2/r.components*r.byteLength;case Yo:return n*e*2/r.components*r.byteLength;case bu:return n*e*3/r.components*r.byteLength;case zt:return n*e*4/r.components*r.byteLength;case $o:return n*e*4/r.components*r.byteLength;case Ds:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Us:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lo:case uo:return Math.max(n,16)*Math.max(e,8)/4;case oo:case co:return Math.max(n,8)*Math.max(e,8)/2;case ho:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case go:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case vo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case bo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case So:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case wo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case To:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ro:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Fs:case Co:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Eu:case Lo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Do:case Io:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function M0(n){switch(n){case on:case _u:return{byteLength:1,components:1};case Br:case gu:case Jr:return{byteLength:2,components:1};case Bo:case Wo:return{byteLength:2,components:4};case Li:case Vo:case zn:return{byteLength:4,components:1};case vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function S0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,v){return p?new OffscreenCanvas(A,v):Ws("canvas")}function g(A,v,O){let Z=1;const ee=Ce(A);if((ee.width>O||ee.height>O)&&(Z=O/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor(Z*ee.width),Te=Math.floor(Z*ee.height);h===void 0&&(h=_(K,Te));const _e=v?_(K,Te):h;return _e.width=K,_e.height=Te,_e.getContext("2d").drawImage(A,0,0,K,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+K+"x"+Te+")."),_e}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(A,v,O,Z,ee=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=v;if(v===n.RED&&(O===n.FLOAT&&(K=n.R32F),O===n.HALF_FLOAT&&(K=n.R16F),O===n.UNSIGNED_BYTE&&(K=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.R8UI),O===n.UNSIGNED_SHORT&&(K=n.R16UI),O===n.UNSIGNED_INT&&(K=n.R32UI),O===n.BYTE&&(K=n.R8I),O===n.SHORT&&(K=n.R16I),O===n.INT&&(K=n.R32I)),v===n.RG&&(O===n.FLOAT&&(K=n.RG32F),O===n.HALF_FLOAT&&(K=n.RG16F),O===n.UNSIGNED_BYTE&&(K=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RG8UI),O===n.UNSIGNED_SHORT&&(K=n.RG16UI),O===n.UNSIGNED_INT&&(K=n.RG32UI),O===n.BYTE&&(K=n.RG8I),O===n.SHORT&&(K=n.RG16I),O===n.INT&&(K=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RGB8UI),O===n.UNSIGNED_SHORT&&(K=n.RGB16UI),O===n.UNSIGNED_INT&&(K=n.RGB32UI),O===n.BYTE&&(K=n.RGB8I),O===n.SHORT&&(K=n.RGB16I),O===n.INT&&(K=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),O===n.UNSIGNED_INT&&(K=n.RGBA32UI),O===n.BYTE&&(K=n.RGBA8I),O===n.SHORT&&(K=n.RGBA16I),O===n.INT&&(K=n.RGBA32I)),v===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),v===n.RGBA){const Te=ee?js:qe.getTransfer(Z);O===n.FLOAT&&(K=n.RGBA32F),O===n.HALF_FLOAT&&(K=n.RGBA16F),O===n.UNSIGNED_BYTE&&(K=Te===rt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(A,v){let O;return A?v===null||v===Li||v===gr?O=n.DEPTH24_STENCIL8:v===zn?O=n.DEPTH32F_STENCIL8:v===Br&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Li||v===gr?O=n.DEPTH_COMPONENT24:v===zn?O=n.DEPTH_COMPONENT32F:v===Br&&(O=n.DEPTH_COMPONENT16),O}function R(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ot&&A.minFilter!==mn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function E(A){const v=A.target;v.removeEventListener("dispose",E),P(v),v.isVideoTexture&&u.delete(v)}function T(A){const v=A.target;v.removeEventListener("dispose",T),b(v)}function P(A){const v=i.get(A);if(v.__webglInit===void 0)return;const O=A.source,Z=f.get(O);if(Z){const ee=Z[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(A),Object.keys(Z).length===0&&f.delete(O)}i.remove(A)}function w(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const O=A.source,Z=f.get(O);delete Z[v.__cacheKey],a.memory.textures--}function b(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ee=0;ee<v.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(v.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[Z]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let Z=0,ee=O.length;Z<ee;Z++){const K=i.get(O[Z]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(O[Z])}i.remove(A)}let C=0;function H(){C=0}function N(){const A=C;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),C+=1,A}function W(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function j(A,v){const O=i.get(A);if(A.isVideoTexture&&Pe(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,A,v);return}}t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function z(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){Y(O,A,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function Q(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){Y(O,A,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function G(A,v){const O=i.get(A);if(A.version>0&&O.__version!==A.version){q(O,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const le={[Vs]:n.REPEAT,[Ti]:n.CLAMP_TO_EDGE,[ao]:n.MIRRORED_REPEAT},de={[Ot]:n.NEAREST,[of]:n.NEAREST_MIPMAP_NEAREST,[Hr]:n.NEAREST_MIPMAP_LINEAR,[mn]:n.LINEAR,[sa]:n.LINEAR_MIPMAP_NEAREST,[Ri]:n.LINEAR_MIPMAP_LINEAR},ue={[ff]:n.NEVER,[vf]:n.ALWAYS,[df]:n.LESS,[Au]:n.LEQUAL,[pf]:n.EQUAL,[gf]:n.GEQUAL,[mf]:n.GREATER,[_f]:n.NOTEQUAL};function ce(A,v){if(v.type===zn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===mn||v.magFilter===sa||v.magFilter===Hr||v.magFilter===Ri||v.minFilter===mn||v.minFilter===sa||v.minFilter===Hr||v.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,le[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,de[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==Hr&&v.minFilter!==Ri||v.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Le(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",E));const Z=v.source;let ee=f.get(Z);ee===void 0&&(ee={},f.set(Z,ee));const K=W(v);if(K!==A.__cacheKey){ee[K]===void 0&&(ee[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),ee[K].usedTimes++;const Te=ee[A.__cacheKey];Te!==void 0&&(ee[A.__cacheKey].usedTimes--,Te.usedTimes===0&&w(v)),A.__cacheKey=K,A.__webglTexture=ee[K].texture}return O}function Y(A,v,O){let Z=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=n.TEXTURE_3D);const ee=Le(A,v),K=v.source;t.bindTexture(Z,A.__webglTexture,n.TEXTURE0+O);const Te=i.get(K);if(K.version!==Te.__version||ee===!0){t.activeTexture(n.TEXTURE0+O);const _e=qe.getPrimaries(qe.workingColorSpace),Me=v.colorSpace===ei?null:qe.getPrimaries(v.colorSpace),Ke=v.colorSpace===ei||_e===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let ie=g(v.image,!1,r.maxTextureSize);ie=ct(v,ie);const Se=s.convert(v.format,v.colorSpace),De=s.convert(v.type);let Ie=M(v.internalFormat,Se,De,v.colorSpace,v.isVideoTexture);ce(Z,v);let we;const $e=v.mipmaps,He=v.isVideoTexture!==!0,at=Te.__version===void 0||ee===!0,L=K.dataReady,me=R(v,ie);if(v.isDepthTexture)Ie=x(v.format===vr,v.type),at&&(He?t.texStorage2D(n.TEXTURE_2D,1,Ie,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ie,ie.width,ie.height,0,Se,De,null));else if(v.isDataTexture)if($e.length>0){He&&at&&t.texStorage2D(n.TEXTURE_2D,me,Ie,$e[0].width,$e[0].height);for(let $=0,J=$e.length;$<J;$++)we=$e[$],He?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,we.width,we.height,Se,De,we.data):t.texImage2D(n.TEXTURE_2D,$,Ie,we.width,we.height,0,Se,De,we.data);v.generateMipmaps=!1}else He?(at&&t.texStorage2D(n.TEXTURE_2D,me,Ie,ie.width,ie.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,Se,De,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Ie,ie.width,ie.height,0,Se,De,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){He&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Ie,$e[0].width,$e[0].height,ie.depth);for(let $=0,J=$e.length;$<J;$++)if(we=$e[$],v.format!==zt)if(Se!==null)if(He){if(L)if(v.layerUpdates.size>0){const xe=mc(we.width,we.height,v.format,v.type);for(const ge of v.layerUpdates){const Fe=we.data.subarray(ge*xe/we.data.BYTES_PER_ELEMENT,(ge+1)*xe/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,ge,we.width,we.height,1,Se,Fe)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,we.width,we.height,ie.depth,Se,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Ie,we.width,we.height,ie.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,we.width,we.height,ie.depth,Se,De,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,Ie,we.width,we.height,ie.depth,0,Se,De,we.data)}else{He&&at&&t.texStorage2D(n.TEXTURE_2D,me,Ie,$e[0].width,$e[0].height);for(let $=0,J=$e.length;$<J;$++)we=$e[$],v.format!==zt?Se!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,we.width,we.height,Se,we.data):t.compressedTexImage2D(n.TEXTURE_2D,$,Ie,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,we.width,we.height,Se,De,we.data):t.texImage2D(n.TEXTURE_2D,$,Ie,we.width,we.height,0,Se,De,we.data)}else if(v.isDataArrayTexture)if(He){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Ie,ie.width,ie.height,ie.depth),L)if(v.layerUpdates.size>0){const $=mc(ie.width,ie.height,v.format,v.type);for(const J of v.layerUpdates){const xe=ie.data.subarray(J*$/ie.data.BYTES_PER_ELEMENT,(J+1)*$/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,Se,De,xe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Se,De,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,ie.width,ie.height,ie.depth,0,Se,De,ie.data);else if(v.isData3DTexture)He?(at&&t.texStorage3D(n.TEXTURE_3D,me,Ie,ie.width,ie.height,ie.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Se,De,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,ie.width,ie.height,ie.depth,0,Se,De,ie.data);else if(v.isFramebufferTexture){if(at)if(He)t.texStorage2D(n.TEXTURE_2D,me,Ie,ie.width,ie.height);else{let $=ie.width,J=ie.height;for(let xe=0;xe<me;xe++)t.texImage2D(n.TEXTURE_2D,xe,Ie,$,J,0,Se,De,null),$>>=1,J>>=1}}else if($e.length>0){if(He&&at){const $=Ce($e[0]);t.texStorage2D(n.TEXTURE_2D,me,Ie,$.width,$.height)}for(let $=0,J=$e.length;$<J;$++)we=$e[$],He?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,Se,De,we):t.texImage2D(n.TEXTURE_2D,$,Ie,Se,De,we);v.generateMipmaps=!1}else if(He){if(at){const $=Ce(ie);t.texStorage2D(n.TEXTURE_2D,me,Ie,$.width,$.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Se,De,ie)}else t.texImage2D(n.TEXTURE_2D,0,Ie,Se,De,ie);m(v)&&d(Z),Te.__version=K.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function q(A,v,O){if(v.image.length!==6)return;const Z=Le(A,v),ee=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);const K=i.get(ee);if(ee.version!==K.__version||Z===!0){t.activeTexture(n.TEXTURE0+O);const Te=qe.getPrimaries(qe.workingColorSpace),_e=v.colorSpace===ei?null:qe.getPrimaries(v.colorSpace),Me=v.colorSpace===ei||Te===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ke=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,Se=[];for(let J=0;J<6;J++)!Ke&&!ie?Se[J]=g(v.image[J],!0,r.maxCubemapSize):Se[J]=ie?v.image[J].image:v.image[J],Se[J]=ct(v,Se[J]);const De=Se[0],Ie=s.convert(v.format,v.colorSpace),we=s.convert(v.type),$e=M(v.internalFormat,Ie,we,v.colorSpace),He=v.isVideoTexture!==!0,at=K.__version===void 0||Z===!0,L=ee.dataReady;let me=R(v,De);ce(n.TEXTURE_CUBE_MAP,v);let $;if(Ke){He&&at&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,$e,De.width,De.height);for(let J=0;J<6;J++){$=Se[J].mipmaps;for(let xe=0;xe<$.length;xe++){const ge=$[xe];v.format!==zt?Ie!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,0,0,ge.width,ge.height,Ie,ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,$e,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,0,0,ge.width,ge.height,Ie,we,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe,$e,ge.width,ge.height,0,Ie,we,ge.data)}}}else{if($=v.mipmaps,He&&at){$.length>0&&me++;const J=Ce(Se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,$e,J.width,J.height)}for(let J=0;J<6;J++)if(ie){He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Se[J].width,Se[J].height,Ie,we,Se[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Se[J].width,Se[J].height,0,Ie,we,Se[J].data);for(let xe=0;xe<$.length;xe++){const Fe=$[xe].image[J].image;He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,0,0,Fe.width,Fe.height,Ie,we,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,$e,Fe.width,Fe.height,0,Ie,we,Fe.data)}}else{He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ie,we,Se[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Ie,we,Se[J]);for(let xe=0;xe<$.length;xe++){const ge=$[xe];He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,0,0,Ie,we,ge.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,xe+1,$e,Ie,we,ge.image[J])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),K.__version=ee.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function fe(A,v,O,Z,ee,K){const Te=s.convert(O.format,O.colorSpace),_e=s.convert(O.type),Me=M(O.internalFormat,Te,_e,O.colorSpace),Ke=i.get(v),ie=i.get(O);if(ie.__renderTarget=v,!Ke.__hasExternalTextures){const Se=Math.max(1,v.width>>K),De=Math.max(1,v.height>>K);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,K,Me,Se,De,v.depth,0,Te,_e,null):t.texImage2D(ee,K,Me,Se,De,0,Te,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ee,ie.__webglTexture,0,Xe(v)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ee,ie.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const Z=v.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,K=x(v.stencilBuffer,ee),Te=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=Xe(v);Ye(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,K,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,K,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,K,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,A)}else{const Z=v.textures;for(let ee=0;ee<Z.length;ee++){const K=Z[ee],Te=s.convert(K.format,K.colorSpace),_e=s.convert(K.type),Me=M(K.internalFormat,Te,_e,K.colorSpace),Ke=Xe(v);O&&Ye(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke,Me,v.width,v.height):Ye(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke,Me,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Me,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function be(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const ee=Z.__webglTexture,K=Xe(v);if(v.depthTexture.format===lr)Ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(v.depthTexture.format===vr)Ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ne(A){const v=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=Z}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");be(v.__webglFramebuffer,A)}else if(O){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=n.createRenderbuffer(),se(v.__webglDepthbuffer[Z],A,!1);else{const ee=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,K)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),se(v.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ee)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(A,v,O){const Z=i.get(A);v!==void 0&&fe(Z.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ne(A)}function dt(A){const v=A.texture,O=i.get(A),Z=i.get(v);A.addEventListener("dispose",T);const ee=A.textures,K=A.isWebGLCubeRenderTarget===!0,Te=ee.length>1;if(Te||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=v.version,a.memory.textures++),K){O.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[_e]=[];for(let Me=0;Me<v.mipmaps.length;Me++)O.__webglFramebuffer[_e][Me]=n.createFramebuffer()}else O.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let _e=0;_e<v.mipmaps.length;_e++)O.__webglFramebuffer[_e]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Te)for(let _e=0,Me=ee.length;_e<Me;_e++){const Ke=i.get(ee[_e]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ye(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let _e=0;_e<ee.length;_e++){const Me=ee[_e];O.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[_e]);const Ke=s.convert(Me.format,Me.colorSpace),ie=s.convert(Me.type),Se=M(Me.internalFormat,Ke,ie,Me.colorSpace,A.isXRRenderTarget===!0),De=Xe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Se,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,O.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),se(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ce(n.TEXTURE_CUBE_MAP,v);for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0)for(let Me=0;Me<v.mipmaps.length;Me++)fe(O.__webglFramebuffer[_e][Me],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Me);else fe(O.__webglFramebuffer[_e],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(v)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let _e=0,Me=ee.length;_e<Me;_e++){const Ke=ee[_e],ie=i.get(Ke);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),ce(n.TEXTURE_2D,Ke),fe(O.__webglFramebuffer,A,Ke,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,0),m(Ke)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,Z.__webglTexture),ce(_e,v),v.mipmaps&&v.mipmaps.length>0)for(let Me=0;Me<v.mipmaps.length;Me++)fe(O.__webglFramebuffer[Me],A,v,n.COLOR_ATTACHMENT0,_e,Me);else fe(O.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,_e,0);m(v)&&d(_e),t.unbindTexture()}A.depthBuffer&&Ne(A)}function je(A){const v=A.textures;for(let O=0,Z=v.length;O<Z;O++){const ee=v[O];if(m(ee)){const K=y(A),Te=i.get(ee).__webglTexture;t.bindTexture(K,Te),d(K),t.unbindTexture()}}}const vt=[],U=[];function Qt(A){if(A.samples>0){if(Ye(A)===!1){const v=A.textures,O=A.width,Z=A.height;let ee=n.COLOR_BUFFER_BIT;const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(A),_e=v.length>1;if(_e)for(let Me=0;Me<v.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Me=0;Me<v.length;Me++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);const Ke=i.get(v[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ke,0)}n.blitFramebuffer(0,0,O,Z,0,0,O,Z,ee,n.NEAREST),l===!0&&(vt.length=0,U.length=0,vt.push(n.COLOR_ATTACHMENT0+Me),A.depthBuffer&&A.resolveDepthBuffer===!1&&(vt.push(K),U.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let Me=0;Me<v.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);const Ke=i.get(v[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,Ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Xe(A){return Math.min(r.maxSamples,A.samples)}function Ye(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Pe(A){const v=a.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function ct(A,v){const O=A.colorSpace,Z=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Fi&&O!==ei&&(qe.getTransfer(O)===rt?(Z!==zt||ee!==on)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=H,this.setTexture2D=j,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=Be,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Ye}function w0(n,e){function t(i,r=ei){let s;const a=qe.getTransfer(r);if(i===on)return n.UNSIGNED_BYTE;if(i===Bo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===_u)return n.BYTE;if(i===gu)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Vo)return n.INT;if(i===Li)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===Jr)return n.HALF_FLOAT;if(i===xu)return n.ALPHA;if(i===bu)return n.RGB;if(i===zt)return n.RGBA;if(i===Mu)return n.LUMINANCE;if(i===Su)return n.LUMINANCE_ALPHA;if(i===lr)return n.DEPTH_COMPONENT;if(i===vr)return n.DEPTH_STENCIL;if(i===wu)return n.RED;if(i===Xo)return n.RED_INTEGER;if(i===yu)return n.RG;if(i===Yo)return n.RG_INTEGER;if(i===$o)return n.RGBA_INTEGER;if(i===Ds||i===Is||i===Us||i===Ns)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===oo||i===lo||i===co||i===uo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===oo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===lo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===co)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ho||i===fo||i===po)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ho||i===fo)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===po)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===mo||i===_o||i===go||i===vo||i===xo||i===bo||i===Mo||i===So||i===wo||i===yo||i===Eo||i===Ao||i===To||i===Ro)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===mo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_o)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===go)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===So)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Eo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ao)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===To)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ro)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fs||i===Co||i===Po)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Fs)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Co)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Po)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Eu||i===Lo||i===Do||i===Io)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Fs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Lo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Do)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Io)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===gr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class y0 extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class sr extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E0={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(E0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new sr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const A0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
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

}`;class R0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Gt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Rn({vertexShader:A0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Lt(new br(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C0 extends Oi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,_=null;const g=new R0,m=t.getContextAttributes();let d=null,y=null;const M=[],x=[],R=new st;let E=null;const T=new Jt;T.viewport=new xt;const P=new Jt;P.viewport=new xt;const w=[T,P],b=new y0;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let q=M[Y];return q===void 0&&(q=new Ua,M[Y]=q),q.getTargetRaySpace()},this.getControllerGrip=function(Y){let q=M[Y];return q===void 0&&(q=new Ua,M[Y]=q),q.getGripSpace()},this.getHand=function(Y){let q=M[Y];return q===void 0&&(q=new Ua,M[Y]=q),q.getHandSpace()};function N(Y){const q=x.indexOf(Y.inputSource);if(q===-1)return;const fe=M[q];fe!==void 0&&(fe.update(Y.inputSource,Y.frame,c||a),fe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",j);for(let Y=0;Y<M.length;Y++){const q=x[Y];q!==null&&(x[Y]=null,M[Y].disconnect(q))}C=null,H=null,g.reset(),e.setRenderTarget(d),p=null,f=null,h=null,r=null,y=null,Le.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",W),r.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Di(p.framebufferWidth,p.framebufferHeight,{format:zt,type:on,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let q=null,fe=null,se=null;m.depth&&(se=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=m.stencil?vr:lr,fe=m.stencil?gr:Li);const be={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(be),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Di(f.textureWidth,f.textureHeight,{format:zt,type:on,depthTexture:new zu(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Le.setContext(r),Le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(Y){for(let q=0;q<Y.removed.length;q++){const fe=Y.removed[q],se=x.indexOf(fe);se>=0&&(x[se]=null,M[se].disconnect(fe))}for(let q=0;q<Y.added.length;q++){const fe=Y.added[q];let se=x.indexOf(fe);if(se===-1){for(let Ne=0;Ne<M.length;Ne++)if(Ne>=x.length){x.push(fe),se=Ne;break}else if(x[Ne]===null){x[Ne]=fe,se=Ne;break}if(se===-1)break}const be=M[se];be&&be.connect(fe)}}const z=new F,Q=new F;function G(Y,q,fe){z.setFromMatrixPosition(q.matrixWorld),Q.setFromMatrixPosition(fe.matrixWorld);const se=z.distanceTo(Q),be=q.projectionMatrix.elements,Ne=fe.projectionMatrix.elements,Be=be[14]/(be[10]-1),dt=be[14]/(be[10]+1),je=(be[9]+1)/be[5],vt=(be[9]-1)/be[5],U=(be[8]-1)/be[0],Qt=(Ne[8]+1)/Ne[0],Xe=Be*U,Ye=Be*Qt,Pe=se/(-U+Qt),ct=Pe*-U;if(q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ct),Y.translateZ(Pe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),be[10]===-1)Y.projectionMatrix.copy(q.projectionMatrix),Y.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const Ce=Be+Pe,A=dt+Pe,v=Xe-ct,O=Ye+(se-ct),Z=je*dt/A*Ce,ee=vt*dt/A*Ce;Y.projectionMatrix.makePerspective(v,O,Z,ee,Ce,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function le(Y,q){q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let q=Y.near,fe=Y.far;g.texture!==null&&(g.depthNear>0&&(q=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),b.near=P.near=T.near=q,b.far=P.far=T.far=fe,(C!==b.near||H!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),C=b.near,H=b.far),T.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,b.layers.mask=T.layers.mask|P.layers.mask;const se=Y.parent,be=b.cameras;le(b,se);for(let Ne=0;Ne<be.length;Ne++)le(be[Ne],se);be.length===2?G(b,T,P):b.projectionMatrix.copy(T.projectionMatrix),de(Y,b,se)};function de(Y,q,fe){fe===null?Y.matrix.copy(q.matrixWorld):(Y.matrix.copy(fe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(q.projectionMatrix),Y.projectionMatrixInverse.copy(q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Uo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(b)};let ue=null;function ce(Y,q){if(u=q.getViewerPose(c||a),_=q,u!==null){const fe=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let se=!1;fe.length!==b.cameras.length&&(b.cameras.length=0,se=!0);for(let Ne=0;Ne<fe.length;Ne++){const Be=fe[Ne];let dt=null;if(p!==null)dt=p.getViewport(Be);else{const vt=h.getViewSubImage(f,Be);dt=vt.viewport,Ne===0&&(e.setRenderTargetTextures(y,vt.colorTexture,f.ignoreDepthValues?void 0:vt.depthStencilTexture),e.setRenderTarget(y))}let je=w[Ne];je===void 0&&(je=new Jt,je.layers.enable(Ne),je.viewport=new xt,w[Ne]=je),je.matrix.fromArray(Be.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(Be.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(dt.x,dt.y,dt.width,dt.height),Ne===0&&(b.matrix.copy(je.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),se===!0&&b.cameras.push(je)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")){const Ne=h.getDepthInformation(fe[0]);Ne&&Ne.isValid&&Ne.texture&&g.init(e,Ne,r.renderState)}}for(let fe=0;fe<M.length;fe++){const se=x[fe],be=M[fe];se!==null&&be!==void 0&&be.update(se,q,c||a)}ue&&ue(Y,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),_=null}const Le=new ku;Le.setAnimationLoop(ce),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}}const vi=new gn,P0=new St;function L0(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Iu(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,y,M,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),_(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),g(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,y,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ht&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ht&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=e.get(d),M=y.envMap,x=y.envMapRotation;M&&(m.envMap.value=M,vi.copy(x),vi.x*=-1,vi.y*=-1,vi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),m.envMapRotation.value.setFromMatrix4(P0.makeRotationFromEuler(vi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ht&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const y=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function D0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const x=M.program;i.uniformBlockBinding(y,x)}function c(y,M){let x=r[y.id];x===void 0&&(_(y),x=u(y),r[y.id]=x,y.addEventListener("dispose",m));const R=M.program;i.updateUBOMapping(y,R);const E=e.render.frame;s[y.id]!==E&&(f(y),s[y.id]=E)}function u(y){const M=h();y.__bindingPointIndex=M;const x=n.createBuffer(),R=y.__size,E=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,R,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,x),x}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const M=r[y.id],x=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let E=0,T=x.length;E<T;E++){const P=Array.isArray(x[E])?x[E]:[x[E]];for(let w=0,b=P.length;w<b;w++){const C=P[w];if(p(C,E,w,R)===!0){const H=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let j=0;j<N.length;j++){const z=N[j],Q=g(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,H+W,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,M,x,R){const E=y.value,T=M+"_"+x;if(R[T]===void 0)return typeof E=="number"||typeof E=="boolean"?R[T]=E:R[T]=E.clone(),!0;{const P=R[T];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return R[T]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function _(y){const M=y.uniforms;let x=0;const R=16;for(let T=0,P=M.length;T<P;T++){const w=Array.isArray(M[T])?M[T]:[M[T]];for(let b=0,C=w.length;b<C;b++){const H=w[b],N=Array.isArray(H.value)?H.value:[H.value];for(let W=0,j=N.length;W<j;W++){const z=N[W],Q=g(z),G=x%R,le=G%Q.boundary,de=G+le;x+=le,de!==0&&R-de<Q.storage&&(x+=R-de),H.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=Q.storage}}}const E=x%R;return E>0&&(x+=R-E),y.__size=x,y.__cache={},this}function g(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function d(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class I0{constructor(e={}){const{canvas:t=bf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const y=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this.toneMapping=ri,this.toneMappingExposure=1;const x=this;let R=!1,E=0,T=0,P=null,w=-1,b=null;const C=new xt,H=new xt;let N=null;const W=new Qe(0);let j=0,z=t.width,Q=t.height,G=1,le=null,de=null;const ue=new xt(0,0,z,Q),ce=new xt(0,0,z,Q);let Le=!1;const Y=new Ou;let q=!1,fe=!1;const se=new St,be=new St,Ne=new F,Be=new xt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function vt(){return P===null?G:1}let U=i;function Qt(S,D){return t.getContext(S,D)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Go}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ge,!1),U===null){const D="webgl2";if(U=Qt(D,S),U===null)throw Qt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Xe,Ye,Pe,ct,Ce,A,v,O,Z,ee,K,Te,_e,Me,Ke,ie,Se,De,Ie,we,$e,He,at,L;function me(){Xe=new km(U),Xe.init(),He=new w0(U,Xe),Ye=new Lm(U,Xe,e,He),Pe=new b0(U,Xe),Ye.reverseDepthBuffer&&f&&Pe.buffers.depth.setReversed(!0),ct=new Gm(U),Ce=new s0,A=new S0(U,Xe,Pe,Ce,Ye,He,ct),v=new Im(x),O=new Om(x),Z=new $f(U),at=new Cm(U,Z),ee=new zm(U,Z,ct,at),K=new Bm(U,ee,Z,ct),Ie=new Vm(U,Ye,A),ie=new Dm(Ce),Te=new r0(x,v,O,Xe,Ye,at,ie),_e=new L0(x,Ce),Me=new o0,Ke=new d0(Xe),De=new Rm(x,v,O,Pe,K,p,l),Se=new v0(x,K,Ye),L=new D0(U,ct,Ye,Pe),we=new Pm(U,Xe,ct),$e=new Hm(U,Xe,ct),ct.programs=Te.programs,x.capabilities=Ye,x.extensions=Xe,x.properties=Ce,x.renderLists=Me,x.shadowMap=Se,x.state=Pe,x.info=ct}me();const $=new C0(x,U);this.xr=$,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=Xe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Xe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(z,Q,!1))},this.getSize=function(S){return S.set(z,Q)},this.setSize=function(S,D,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,Q=D,t.width=Math.floor(S*G),t.height=Math.floor(D*G),V===!0&&(t.style.width=S+"px",t.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(z*G,Q*G).floor()},this.setDrawingBufferSize=function(S,D,V){z=S,Q=D,G=V,t.width=Math.floor(S*V),t.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(ue)},this.setViewport=function(S,D,V,B){S.isVector4?ue.set(S.x,S.y,S.z,S.w):ue.set(S,D,V,B),Pe.viewport(C.copy(ue).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(ce)},this.setScissor=function(S,D,V,B){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,D,V,B),Pe.scissor(H.copy(ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(S){Pe.setScissorTest(Le=S)},this.setOpaqueSort=function(S){le=S},this.setTransparentSort=function(S){de=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(S=!0,D=!0,V=!0){let B=0;if(S){let I=!1;if(P!==null){const re=P.texture.format;I=re===$o||re===Yo||re===Xo}if(I){const re=P.texture.type,ve=re===on||re===Li||re===Br||re===gr||re===Bo||re===Wo,ye=De.getClearColor(),Ee=De.getClearAlpha(),Ue=ye.r,Oe=ye.g,Ae=ye.b;ve?(_[0]=Ue,_[1]=Oe,_[2]=Ae,_[3]=Ee,U.clearBufferuiv(U.COLOR,0,_)):(g[0]=Ue,g[1]=Oe,g[2]=Ae,g[3]=Ee,U.clearBufferiv(U.COLOR,0,g))}else B|=U.COLOR_BUFFER_BIT}D&&(B|=U.DEPTH_BUFFER_BIT),V&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Me.dispose(),Ke.dispose(),Ce.dispose(),v.dispose(),O.dispose(),K.dispose(),at.dispose(),L.dispose(),Te.dispose(),$.dispose(),$.removeEventListener("sessionstart",ul),$.removeEventListener("sessionend",hl),fi.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const S=ct.autoReset,D=Se.enabled,V=Se.autoUpdate,B=Se.needsUpdate,I=Se.type;me(),ct.autoReset=S,Se.enabled=D,Se.autoUpdate=V,Se.needsUpdate=B,Se.type=I}function ge(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Fe(S){const D=S.target;D.removeEventListener("dispose",Fe),_t(D)}function _t(S){It(S),Ce.remove(S)}function It(S){const D=Ce.get(S).programs;D!==void 0&&(D.forEach(function(V){Te.releaseProgram(V)}),S.isShaderMaterial&&Te.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,B,I,re){D===null&&(D=dt);const ve=I.isMesh&&I.matrixWorld.determinant()<0,ye=Ch(S,D,V,B,I);Pe.setMaterial(B,ve);let Ee=V.index,Ue=1;if(B.wireframe===!0){if(Ee=ee.getWireframeAttribute(V),Ee===void 0)return;Ue=2}const Oe=V.drawRange,Ae=V.attributes.position;let Je=Oe.start*Ue,ot=(Oe.start+Oe.count)*Ue;re!==null&&(Je=Math.max(Je,re.start*Ue),ot=Math.min(ot,(re.start+re.count)*Ue)),Ee!==null?(Je=Math.max(Je,0),ot=Math.min(ot,Ee.count)):Ae!=null&&(Je=Math.max(Je,0),ot=Math.min(ot,Ae.count));const ut=ot-Je;if(ut<0||ut===1/0)return;at.setup(I,B,ye,V,Ee);let Vt,et=we;if(Ee!==null&&(Vt=Z.get(Ee),et=$e,et.setIndex(Vt)),I.isMesh)B.wireframe===!0?(Pe.setLineWidth(B.wireframeLinewidth*vt()),et.setMode(U.LINES)):et.setMode(U.TRIANGLES);else if(I.isLine){let Re=B.linewidth;Re===void 0&&(Re=1),Pe.setLineWidth(Re*vt()),I.isLineSegments?et.setMode(U.LINES):I.isLineLoop?et.setMode(U.LINE_LOOP):et.setMode(U.LINE_STRIP)}else I.isPoints?et.setMode(U.POINTS):I.isSprite&&et.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)et.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))et.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Re=I._multiDrawStarts,Ln=I._multiDrawCounts,tt=I._multiDrawCount,un=Ee?Z.get(Ee).bytesPerElement:1,ki=Ce.get(B).currentProgram.getUniforms();for(let qt=0;qt<tt;qt++)ki.setValue(U,"_gl_DrawID",qt),et.render(Re[qt]/un,Ln[qt])}else if(I.isInstancedMesh)et.renderInstances(Je,ut,I.count);else if(V.isInstancedBufferGeometry){const Re=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ln=Math.min(V.instanceCount,Re);et.renderInstances(Je,ut,Ln)}else et.render(Je,ut)};function it(S,D,V){S.transparent===!0&&S.side===rn&&S.forceSinglePass===!1?(S.side=Ht,S.needsUpdate=!0,is(S,D,V),S.side=li,S.needsUpdate=!0,is(S,D,V),S.side=rn):is(S,D,V)}this.compile=function(S,D,V=null){V===null&&(V=S),d=Ke.get(V),d.init(D),M.push(d),V.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),S!==V&&S.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const B=new Set;return S.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const re=I.material;if(re)if(Array.isArray(re))for(let ve=0;ve<re.length;ve++){const ye=re[ve];it(ye,V,I),B.add(ye)}else it(re,V,I),B.add(re)}),M.pop(),d=null,B},this.compileAsync=function(S,D,V=null){const B=this.compile(S,D,V);return new Promise(I=>{function re(){if(B.forEach(function(ve){Ce.get(ve).currentProgram.isReady()&&B.delete(ve)}),B.size===0){I(S);return}setTimeout(re,10)}Xe.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let cn=null;function Pn(S){cn&&cn(S)}function ul(){fi.stop()}function hl(){fi.start()}const fi=new ku;fi.setAnimationLoop(Pn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(S){cn=S,$.setAnimationLoop(S),S===null?fi.stop():fi.start()},$.addEventListener("sessionstart",ul),$.addEventListener("sessionend",hl),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(D),D=$.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,D,P),d=Ke.get(S,M.length),d.init(D),M.push(d),be.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Y.setFromProjectionMatrix(be),fe=this.localClippingEnabled,q=ie.init(this.clippingPlanes,fe),m=Me.get(S,y.length),m.init(),y.push(m),$.enabled===!0&&$.isPresenting===!0){const re=x.xr.getDepthSensingMesh();re!==null&&ra(re,D,-1/0,x.sortObjects)}ra(S,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(le,de),je=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,je&&De.addToRenderList(m,S),this.info.render.frame++,q===!0&&ie.beginShadows();const V=d.state.shadowsArray;Se.render(V,S,D),q===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,I=m.transmissive;if(d.setupLights(),D.isArrayCamera){const re=D.cameras;if(I.length>0)for(let ve=0,ye=re.length;ve<ye;ve++){const Ee=re[ve];dl(B,I,S,Ee)}je&&De.render(S);for(let ve=0,ye=re.length;ve<ye;ve++){const Ee=re[ve];fl(m,S,Ee,Ee.viewport)}}else I.length>0&&dl(B,I,S,D),je&&De.render(S),fl(m,S,D);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,D),at.resetDefaultState(),w=-1,b=null,M.pop(),M.length>0?(d=M[M.length-1],q===!0&&ie.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function ra(S,D,V,B){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){B&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(be);const ve=K.update(S),ye=S.material;ye.visible&&m.push(S,ve,ye,V,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const ve=K.update(S),ye=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(be)),Array.isArray(ye)){const Ee=ve.groups;for(let Ue=0,Oe=Ee.length;Ue<Oe;Ue++){const Ae=Ee[Ue],Je=ye[Ae.materialIndex];Je&&Je.visible&&m.push(S,ve,Je,V,Be.z,Ae)}}else ye.visible&&m.push(S,ve,ye,V,Be.z,null)}}const re=S.children;for(let ve=0,ye=re.length;ve<ye;ve++)ra(re[ve],D,V,B)}function fl(S,D,V,B){const I=S.opaque,re=S.transmissive,ve=S.transparent;d.setupLightsView(V),q===!0&&ie.setGlobalState(x.clippingPlanes,V),B&&Pe.viewport(C.copy(B)),I.length>0&&ns(I,D,V),re.length>0&&ns(re,D,V),ve.length>0&&ns(ve,D,V),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function dl(S,D,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Di(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?Jr:on,minFilter:Ri,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const re=d.state.transmissionRenderTarget[B.id],ve=B.viewport||C;re.setSize(ve.z,ve.w);const ye=x.getRenderTarget();x.setRenderTarget(re),x.getClearColor(W),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),je&&De.render(V);const Ee=x.toneMapping;x.toneMapping=ri;const Ue=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),q===!0&&ie.setGlobalState(x.clippingPlanes,B),ns(S,V,B),A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Ae=0,Je=D.length;Ae<Je;Ae++){const ot=D[Ae],ut=ot.object,Vt=ot.geometry,et=ot.material,Re=ot.group;if(et.side===rn&&ut.layers.test(B.layers)){const Ln=et.side;et.side=Ht,et.needsUpdate=!0,pl(ut,V,B,Vt,et,Re),et.side=Ln,et.needsUpdate=!0,Oe=!0}}Oe===!0&&(A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re))}x.setRenderTarget(ye),x.setClearColor(W,j),Ue!==void 0&&(B.viewport=Ue),x.toneMapping=Ee}function ns(S,D,V){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,re=S.length;I<re;I++){const ve=S[I],ye=ve.object,Ee=ve.geometry,Ue=B===null?ve.material:B,Oe=ve.group;ye.layers.test(V.layers)&&pl(ye,D,V,Ee,Ue,Oe)}}function pl(S,D,V,B,I,re){S.onBeforeRender(x,D,V,B,I,re),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(x,D,V,B,S,re),I.transparent===!0&&I.side===rn&&I.forceSinglePass===!1?(I.side=Ht,I.needsUpdate=!0,x.renderBufferDirect(V,D,B,I,S,re),I.side=li,I.needsUpdate=!0,x.renderBufferDirect(V,D,B,I,S,re),I.side=rn):x.renderBufferDirect(V,D,B,I,S,re),S.onAfterRender(x,D,V,B,I,re)}function is(S,D,V){D.isScene!==!0&&(D=dt);const B=Ce.get(S),I=d.state.lights,re=d.state.shadowsArray,ve=I.state.version,ye=Te.getParameters(S,I.state,re,D,V),Ee=Te.getProgramCacheKey(ye);let Ue=B.programs;B.environment=S.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(S.isMeshStandardMaterial?O:v).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",Fe),Ue=new Map,B.programs=Ue);let Oe=Ue.get(Ee);if(Oe!==void 0){if(B.currentProgram===Oe&&B.lightsStateVersion===ve)return _l(S,ye),Oe}else ye.uniforms=Te.getUniforms(S),S.onBeforeCompile(ye,x),Oe=Te.acquireProgram(ye,Ee),Ue.set(Ee,Oe),B.uniforms=ye.uniforms;const Ae=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=ie.uniform),_l(S,ye),B.needsLights=Lh(S),B.lightsStateVersion=ve,B.needsLights&&(Ae.ambientLightColor.value=I.state.ambient,Ae.lightProbe.value=I.state.probe,Ae.directionalLights.value=I.state.directional,Ae.directionalLightShadows.value=I.state.directionalShadow,Ae.spotLights.value=I.state.spot,Ae.spotLightShadows.value=I.state.spotShadow,Ae.rectAreaLights.value=I.state.rectArea,Ae.ltc_1.value=I.state.rectAreaLTC1,Ae.ltc_2.value=I.state.rectAreaLTC2,Ae.pointLights.value=I.state.point,Ae.pointLightShadows.value=I.state.pointShadow,Ae.hemisphereLights.value=I.state.hemi,Ae.directionalShadowMap.value=I.state.directionalShadowMap,Ae.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ae.spotShadowMap.value=I.state.spotShadowMap,Ae.spotLightMatrix.value=I.state.spotLightMatrix,Ae.spotLightMap.value=I.state.spotLightMap,Ae.pointShadowMap.value=I.state.pointShadowMap,Ae.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Oe,B.uniformsList=null,Oe}function ml(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=Os.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function _l(S,D){const V=Ce.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Ch(S,D,V,B,I){D.isScene!==!0&&(D=dt),A.resetTextureUnits();const re=D.fog,ve=B.isMeshStandardMaterial?D.environment:null,ye=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Fi,Ee=(B.isMeshStandardMaterial?O:v).get(B.envMap||ve),Ue=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Oe=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ae=!!V.morphAttributes.position,Je=!!V.morphAttributes.normal,ot=!!V.morphAttributes.color;let ut=ri;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ut=x.toneMapping);const Vt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,et=Vt!==void 0?Vt.length:0,Re=Ce.get(B),Ln=d.state.lights;if(q===!0&&(fe===!0||S!==b)){const en=S===b&&B.id===w;ie.setState(B,S,en)}let tt=!1;B.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Ln.state.version||Re.outputColorSpace!==ye||I.isBatchedMesh&&Re.batching===!1||!I.isBatchedMesh&&Re.batching===!0||I.isBatchedMesh&&Re.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Re.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Re.instancing===!1||!I.isInstancedMesh&&Re.instancing===!0||I.isSkinnedMesh&&Re.skinning===!1||!I.isSkinnedMesh&&Re.skinning===!0||I.isInstancedMesh&&Re.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Re.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Re.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Re.instancingMorph===!1&&I.morphTexture!==null||Re.envMap!==Ee||B.fog===!0&&Re.fog!==re||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ie.numPlanes||Re.numIntersection!==ie.numIntersection)||Re.vertexAlphas!==Ue||Re.vertexTangents!==Oe||Re.morphTargets!==Ae||Re.morphNormals!==Je||Re.morphColors!==ot||Re.toneMapping!==ut||Re.morphTargetsCount!==et)&&(tt=!0):(tt=!0,Re.__version=B.version);let un=Re.currentProgram;tt===!0&&(un=is(B,D,I));let ki=!1,qt=!1,Rr=!1;const ht=un.getUniforms(),xn=Re.uniforms;if(Pe.useProgram(un.program)&&(ki=!0,qt=!0,Rr=!0),B.id!==w&&(w=B.id,qt=!0),ki||b!==S){Pe.buffers.depth.getReversed()?(se.copy(S.projectionMatrix),Sf(se),wf(se),ht.setValue(U,"projectionMatrix",se)):ht.setValue(U,"projectionMatrix",S.projectionMatrix),ht.setValue(U,"viewMatrix",S.matrixWorldInverse);const Wn=ht.map.cameraPosition;Wn!==void 0&&Wn.setValue(U,Ne.setFromMatrixPosition(S.matrixWorld)),Ye.logarithmicDepthBuffer&&ht.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ht.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,qt=!0,Rr=!0)}if(I.isSkinnedMesh){ht.setOptional(U,I,"bindMatrix"),ht.setOptional(U,I,"bindMatrixInverse");const en=I.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),ht.setValue(U,"boneTexture",en.boneTexture,A))}I.isBatchedMesh&&(ht.setOptional(U,I,"batchingTexture"),ht.setValue(U,"batchingTexture",I._matricesTexture,A),ht.setOptional(U,I,"batchingIdTexture"),ht.setValue(U,"batchingIdTexture",I._indirectTexture,A),ht.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&ht.setValue(U,"batchingColorTexture",I._colorsTexture,A));const Cr=V.morphAttributes;if((Cr.position!==void 0||Cr.normal!==void 0||Cr.color!==void 0)&&Ie.update(I,V,un),(qt||Re.receiveShadow!==I.receiveShadow)&&(Re.receiveShadow=I.receiveShadow,ht.setValue(U,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(xn.envMap.value=Ee,xn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(xn.envMapIntensity.value=D.environmentIntensity),qt&&(ht.setValue(U,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&Ph(xn,Rr),re&&B.fog===!0&&_e.refreshFogUniforms(xn,re),_e.refreshMaterialUniforms(xn,B,G,Q,d.state.transmissionRenderTarget[S.id]),Os.upload(U,ml(Re),xn,A)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Os.upload(U,ml(Re),xn,A),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ht.setValue(U,"center",I.center),ht.setValue(U,"modelViewMatrix",I.modelViewMatrix),ht.setValue(U,"normalMatrix",I.normalMatrix),ht.setValue(U,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const en=B.uniformsGroups;for(let Wn=0,Xn=en.length;Wn<Xn;Wn++){const gl=en[Wn];L.update(gl,un),L.bind(gl,un)}}return un}function Ph(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Lh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,D,V){Ce.get(S.texture).__webglTexture=D,Ce.get(S.depthTexture).__webglTexture=V;const B=Ce.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=V===void 0,B.__autoAllocateDepthBuffer||Xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,D){const V=Ce.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){P=S,E=D,T=V;let B=!0,I=null,re=!1,ve=!1;if(S){const Ee=Ce.get(S);if(Ee.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(U.FRAMEBUFFER,null),B=!1;else if(Ee.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(Ee.__hasExternalTextures)A.rebindTextures(S,Ce.get(S.texture).__webglTexture,Ce.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ae=S.depthTexture;if(Ee.__boundDepthTexture!==Ae){if(Ae!==null&&Ce.has(Ae)&&(S.width!==Ae.image.width||S.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ve=!0);const Oe=Ce.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Oe[D])?I=Oe[D][V]:I=Oe[D],re=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?I=Ce.get(S).__webglMultisampledFramebuffer:Array.isArray(Oe)?I=Oe[V]:I=Oe,C.copy(S.viewport),H.copy(S.scissor),N=S.scissorTest}else C.copy(ue).multiplyScalar(G).floor(),H.copy(ce).multiplyScalar(G).floor(),N=Le;if(Pe.bindFramebuffer(U.FRAMEBUFFER,I)&&B&&Pe.drawBuffers(S,I),Pe.viewport(C),Pe.scissor(H),Pe.setScissorTest(N),re){const Ee=Ce.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ee.__webglTexture,V)}else if(ve){const Ee=Ce.get(S.texture),Ue=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.__webglTexture,V||0,Ue)}w=-1},this.readRenderTargetPixels=function(S,D,V,B,I,re,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){Pe.bindFramebuffer(U.FRAMEBUFFER,ye);try{const Ee=S.texture,Ue=Ee.format,Oe=Ee.type;if(!Ye.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-B&&V>=0&&V<=S.height-I&&U.readPixels(D,V,B,I,He.convert(Ue),He.convert(Oe),re)}finally{const Ee=P!==null?Ce.get(P).__webglFramebuffer:null;Pe.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,B,I,re,ve){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){const Ee=S.texture,Ue=Ee.format,Oe=Ee.type;if(!Ye.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=S.width-B&&V>=0&&V<=S.height-I){Pe.bindFramebuffer(U.FRAMEBUFFER,ye);const Ae=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ae),U.bufferData(U.PIXEL_PACK_BUFFER,re.byteLength,U.STREAM_READ),U.readPixels(D,V,B,I,He.convert(Ue),He.convert(Oe),0);const Je=P!==null?Ce.get(P).__webglFramebuffer:null;Pe.bindFramebuffer(U.FRAMEBUFFER,Je);const ot=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Mf(U,ot,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ae),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,re),U.deleteBuffer(Ae),U.deleteSync(ot),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,D=null,V=0){S.isTexture!==!0&&(Gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,S=arguments[1]);const B=Math.pow(2,-V),I=Math.floor(S.image.width*B),re=Math.floor(S.image.height*B),ve=D!==null?D.x:0,ye=D!==null?D.y:0;A.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,ve,ye,I,re),Pe.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,B=null,I=0){S.isTexture!==!0&&(Gr("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],D=arguments[2],I=arguments[3]||0,V=null);let re,ve,ye,Ee,Ue,Oe,Ae,Je,ot;const ut=S.isCompressedTexture?S.mipmaps[I]:S.image;V!==null?(re=V.max.x-V.min.x,ve=V.max.y-V.min.y,ye=V.isBox3?V.max.z-V.min.z:1,Ee=V.min.x,Ue=V.min.y,Oe=V.isBox3?V.min.z:0):(re=ut.width,ve=ut.height,ye=ut.depth||1,Ee=0,Ue=0,Oe=0),B!==null?(Ae=B.x,Je=B.y,ot=B.z):(Ae=0,Je=0,ot=0);const Vt=He.convert(D.format),et=He.convert(D.type);let Re;D.isData3DTexture?(A.setTexture3D(D,0),Re=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(A.setTexture2DArray(D,0),Re=U.TEXTURE_2D_ARRAY):(A.setTexture2D(D,0),Re=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Ln=U.getParameter(U.UNPACK_ROW_LENGTH),tt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),un=U.getParameter(U.UNPACK_SKIP_PIXELS),ki=U.getParameter(U.UNPACK_SKIP_ROWS),qt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ut.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ut.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ue),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Oe);const Rr=S.isDataArrayTexture||S.isData3DTexture,ht=D.isDataArrayTexture||D.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const xn=Ce.get(S),Cr=Ce.get(D),en=Ce.get(xn.__renderTarget),Wn=Ce.get(Cr.__renderTarget);Pe.bindFramebuffer(U.READ_FRAMEBUFFER,en.__webglFramebuffer),Pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let Xn=0;Xn<ye;Xn++)Rr&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ce.get(S).__webglTexture,I,Oe+Xn),S.isDepthTexture?(ht&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ce.get(D).__webglTexture,I,ot+Xn),U.blitFramebuffer(Ee,Ue,re,ve,Ae,Je,re,ve,U.DEPTH_BUFFER_BIT,U.NEAREST)):ht?U.copyTexSubImage3D(Re,I,Ae,Je,ot+Xn,Ee,Ue,re,ve):U.copyTexSubImage2D(Re,I,Ae,Je,ot+Xn,Ee,Ue,re,ve);Pe.bindFramebuffer(U.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ht?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Re,I,Ae,Je,ot,re,ve,ye,Vt,et,ut.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Re,I,Ae,Je,ot,re,ve,ye,Vt,ut.data):U.texSubImage3D(Re,I,Ae,Je,ot,re,ve,ye,Vt,et,ut):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,I,Ae,Je,re,ve,Vt,et,ut.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,I,Ae,Je,ut.width,ut.height,Vt,ut.data):U.texSubImage2D(U.TEXTURE_2D,I,Ae,Je,re,ve,Vt,et,ut);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ln),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,tt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,un),U.pixelStorei(U.UNPACK_SKIP_ROWS,ki),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qt),I===0&&D.generateMipmaps&&U.generateMipmap(Re),Pe.unbindTexture()},this.copyTextureToTexture3D=function(S,D,V=null,B=null,I=0){return S.isTexture!==!0&&(Gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,B=arguments[1]||null,S=arguments[2],D=arguments[3],I=arguments[4]||0),Gr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,D,V,B,I)},this.initRenderTarget=function(S){Ce.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),Pe.unbindTexture()},this.resetState=function(){E=0,T=0,P=null,Pe.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class Ko{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=i}clone(){return new Ko(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wu extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Zo extends Gt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Ot,u=Ot,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo extends vn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new F,f=new F,p=[],_=[],g=[],m=[];for(let d=0;d<=i;d++){const y=[],M=d/i;let x=0;d===0&&a===0?x=.5/t:d===i&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const E=R/t;h.x=-e*Math.cos(r+E*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(r+E*s)*Math.sin(a+M*o),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(E+x,1-M),y.push(c++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<t;y++){const M=u[d][y+1],x=u[d][y],R=u[d+1][y],E=u[d+1][y+1];(d!==0||a>0)&&p.push(M,x,E),(d!==i-1||l<Math.PI)&&p.push(x,R,E)}this.setIndex(p),this.setAttribute("position",new Tn(_,3)),this.setAttribute("normal",new Tn(g,3)),this.setAttribute("uv",new Tn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class U0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_c(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_c();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _c(){return performance.now()}class N0 extends Oi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Go}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Go);const Qi=new gn(0,0,0,"YXZ"),er=new F,F0={type:"change"},O0={type:"lock"},k0={type:"unlock"},gc=Math.PI/2;class z0 extends N0{constructor(e,t=null){super(e,t),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=H0.bind(this),this._onPointerlockChange=G0.bind(this),this._onPointerlockError=V0.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const t=this.object;er.setFromMatrixColumn(t.matrix,0),er.crossVectors(t.up,er),t.position.addScaledVector(er,e)}moveRight(e){if(this.enabled===!1)return;const t=this.object;er.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(er,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function H0(n){if(this.enabled===!1||this.isLocked===!1)return;const e=n.movementX||n.mozMovementX||n.webkitMovementX||0,t=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.object;Qi.setFromQuaternion(i.quaternion),Qi.y-=e*.002*this.pointerSpeed,Qi.x-=t*.002*this.pointerSpeed,Qi.x=Math.max(gc-this.maxPolarAngle,Math.min(gc-this.minPolarAngle,Qi.x)),i.quaternion.setFromEuler(Qi),this.dispatchEvent(F0)}function G0(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(O0),this.isLocked=!0):(this.dispatchEvent(k0),this.isLocked=!1)}function V0(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const ke={TICK:.05,WALK_SPEED:.1,SPRINT_MULTIPLIER:1.3,SNEAK_MULTIPLIER:.3,AIR_SPEED:.02,AIR_SPRINT_SPEED:.026,FLY_SPEED:.05,BLOCK_FRICTION:.6,AIR_FRICTION:.91,GRAVITY:.08,VERTICAL_DRAG:.98,FLY_VERTICAL_DRAG:.6,JUMP_POWER:.42,SPRINT_JUMP_BOOST:.2,JUMP_DELAY:10,WATER_SPEED:.02,WATER_DRAG:.8,WATER_SPRINT_DRAG:.9,WATER_JUMP:.04,WATER_JUMP_THRESHOLD:.4,STEP_HEIGHT:.6,MIN_VELOCITY:.003},Xu={standing:{width:.6,height:1.8,eye:1.62},crouching:{width:.6,height:1.5,eye:1.27}};class B0{pos={x:.5,y:120,z:.5};prevPos={x:.5,y:120,z:.5};velocity={x:0,y:0,z:0};onGround=!1;horizontalCollision=!1;flying=!1;sprinting=!1;pose="standing";noJumpDelay=0;waterHeight=0;lavaHeight=0;underWater=!1;underLava=!1;walkDist=0;prevWalkDist=0;bob=0;prevBob=0;get body(){return Xu[this.pose]}get inWater(){return this.waterHeight>0}get inLava(){return this.lavaHeight>0}get speedAttribute(){return ke.WALK_SPEED*(this.sprinting?ke.SPRINT_MULTIPLIER:1)}get state(){if(this.flying)return this.sprinting?"飞行（疾跑）":"飞行";const e=[];return this.inWater&&e.push(this.underWater?"水下":"水中"),this.inLava&&e.push("岩浆中"),this.pose==="crouching"?e.push("潜行"):this.sprinting?e.push("疾跑"):e.push("行走"),e.join(" · ")}}const W0=["air","void_air","cave_air"],X0=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Y0=["sand","red_sand","suspicious_sand"],$0=["snow","snow_block","powder_snow"],q0=["ice","packed_ice","blue_ice","frosted_ice"],j0=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves"],K0=["dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],Z0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","sunflower","lilac","peony","rose_bush","pitcher_plant","flowering_azalea_leaves","flowering_azalea","mangrove_propagule","cherry_leaves","pink_petals","chorus_flower","spore_blossom"],J0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom"],Q0=["stone","granite","diorite","andesite","tuff","deepslate"],eg=["netherrack","basalt","blackstone"],tg=["stone","granite","diorite","andesite"],ng=["deepslate","tuff"],ig=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault"],rg=["air","water","lava","short_grass","fern","dead_bush","seagrass","tall_seagrass","fire","soul_fire","snow","vine","glow_lichen","resin_clump","light","tall_grass","large_fern","structure_void","void_air","cave_air","bubble_column","warped_roots","nether_sprouts","crimson_roots","hanging_roots"],sg=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","pale_moss_carpet","short_grass","fern","dead_bush","vine","glow_lichen","sunflower","lilac","rose_bush","peony","tall_grass","large_fern","hanging_roots","pitcher_plant","water","seagrass","tall_seagrass","warped_roots","nether_sprouts","crimson_roots"],ag=["mud","muddy_mangrove_roots","mangrove_roots","mangrove_leaves","mangrove_log","mangrove_propagule","moss_carpet","vine"],og=["mud","muddy_mangrove_roots","mangrove_roots","moss_carpet","vine","mangrove_propagule","snow"],lg=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","snow_block","powder_snow"],cg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","red_sand","clay","gravel","sand","snow_block","powder_snow"],ug=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","clay","gravel","sand"],hg=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],fg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_ore","deepslate_iron_ore","copper_ore","deepslate_copper_ore","snow","snow_block","powder_snow","water","gravel","suspicious_gravel","sandstone","red_sandstone","calcite","packed_ice","raw_iron_block","raw_copper_block"],dg=["ice","packed_ice","barrier"],pg=["honey_block","soul_sand","mud"],mg=["bedrock","water","lava","ice","packed_ice","blue_ice"],_g=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone"],gg=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone","deepslate_bricks","deepslate_tiles","cobbled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","polished_deepslate"],vg=["stone","granite","diorite","andesite","tuff","deepslate"],xg=["tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block"],bg=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral","tube_coral_fan","brain_coral_fan","bubble_coral_fan","fire_coral_fan","horn_coral_fan"],Mg=["tube_coral_wall_fan","brain_coral_wall_fan","bubble_coral_wall_fan","fire_coral_wall_fan","horn_coral_wall_fan"],Sg=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral"],wg=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault","jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],yg=["clay","moss_block"],Eg=["clay","moss_block","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","pale_moss_block","mud","muddy_mangrove_roots","farmland"],Ag=["sand","red_sand","suspicious_sand","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","bamboo","bamboo_sapling","gravel","suspicious_gravel"],Tg=["sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Rg=["mycelium","podzol","crimson_nylium","warped_nylium"],Cg=["terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta"],Pg=["grass_block","mud","mangrove_roots","muddy_mangrove_roots"],Lg=["stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks"],Dg=["white_wool","orange_wool","magenta_wool","light_blue_wool","yellow_wool","lime_wool","pink_wool","gray_wool","light_gray_wool","cyan_wool","purple_wool","blue_wool","brown_wool","green_wool","red_wool","black_wool"],Ig=["white_carpet","orange_carpet","magenta_carpet","light_blue_carpet","yellow_carpet","lime_carpet","pink_carpet","gray_carpet","light_gray_carpet","cyan_carpet","purple_carpet","blue_carpet","brown_carpet","green_carpet","red_carpet","black_carpet"],Ug=["stone","granite","diorite","andesite","tuff","deepslate","netherrack","basalt","blackstone","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","crimson_nylium","warped_nylium","nether_wart_block","warped_wart_block","soul_sand","soul_soil"],Ng=["crimson_nylium","warped_nylium"],Fg=["nether_wart_block","warped_wart_block"],Og=["soul_sand","soul_soil"],kg=["netherrack","magma_block"],zg=["fire","soul_fire"],Hg={air:W0,dirt:X0,sand:Y0,snow:$0,ice:q0,leaves:j0,logs:K0,flowers:Z0,small_flowers:J0,base_stone_overworld:Q0,base_stone_nether:eg,stone_ore_replaceables:tg,deepslate_ore_replaceables:ng,features_cannot_replace:ig,replaceable:rg,replaceable_by_trees:sg,mangrove_logs_can_grow_through:ag,mangrove_roots_can_grow_through:og,azalea_grows_on:lg,azalea_root_replaceable:cg,lush_ground_replaceable:ug,moss_replaceable:hg,overworld_carver_replaceables:fg,snow_layer_cannot_survive_on:dg,snow_layer_can_survive_on:pg,geode_invalid_blocks:mg,sculk_replaceable:_g,sculk_replaceable_world_gen:gg,dripstone_replaceable_blocks:vg,coral_blocks:xg,corals:bg,wall_corals:Mg,coral_plants:Sg,lava_pool_stone_cannot_replace:wg,small_dripleaf_placeable:yg,big_dripleaf_placeable:Eg,bamboo_plantable_on:Ag,dead_bush_may_place_on:Tg,mushroom_grow_block:Rg,terracotta:Cg,"mineable/pickaxe":["stone","granite","polished_granite","diorite","polished_diorite","andesite","polished_andesite","cobblestone","gold_ore","deepslate_gold_ore","iron_ore","deepslate_iron_ore","coal_ore","deepslate_coal_ore","nether_gold_ore","lapis_ore","deepslate_lapis_ore","lapis_block","dispenser","sandstone","chiseled_sandstone","cut_sandstone","gold_block","iron_block","bricks","mossy_cobblestone","obsidian","spawner","diamond_ore","deepslate_diamond_ore","diamond_block","furnace","cobblestone_stairs","stone_pressure_plate","iron_door","redstone_ore","deepslate_redstone_ore","netherrack","basalt","polished_basalt","stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks","iron_bars","chain","brick_stairs","stone_brick_stairs","nether_bricks","nether_brick_fence","nether_brick_stairs","enchanting_table","brewing_stand","end_stone","sandstone_stairs","emerald_ore","deepslate_emerald_ore","ender_chest","emerald_block","light_weighted_pressure_plate","heavy_weighted_pressure_plate","redstone_block","nether_quartz_ore","hopper","quartz_block","chiseled_quartz_block","quartz_pillar","quartz_stairs","dropper","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_trapdoor","prismarine","prismarine_bricks","dark_prismarine","prismarine_stairs","prismarine_brick_stairs","dark_prismarine_stairs","prismarine_slab","prismarine_brick_slab","dark_prismarine_slab","terracotta","coal_block","red_sandstone","chiseled_red_sandstone","cut_red_sandstone","red_sandstone_stairs","stone_slab","smooth_stone_slab","sandstone_slab","cut_sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","red_sandstone_slab","cut_red_sandstone_slab","purpur_slab","smooth_stone","smooth_sandstone","smooth_quartz","smooth_red_sandstone","purpur_block","purpur_pillar","purpur_stairs","end_stone_bricks","magma_block","red_nether_bricks","bone_block","observer","white_glazed_terracotta","orange_glazed_terracotta","magenta_glazed_terracotta","light_blue_glazed_terracotta","yellow_glazed_terracotta","lime_glazed_terracotta","pink_glazed_terracotta","gray_glazed_terracotta","light_gray_glazed_terracotta","cyan_glazed_terracotta","purple_glazed_terracotta","blue_glazed_terracotta","brown_glazed_terracotta","green_glazed_terracotta","red_glazed_terracotta","black_glazed_terracotta","white_concrete","orange_concrete","magenta_concrete","light_blue_concrete","yellow_concrete","lime_concrete","pink_concrete","gray_concrete","light_gray_concrete","cyan_concrete","purple_concrete","blue_concrete","brown_concrete","green_concrete","red_concrete","black_concrete","dead_tube_coral_block","dead_brain_coral_block","dead_bubble_coral_block","dead_fire_coral_block","dead_horn_coral_block","tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block","dead_tube_coral","dead_brain_coral","dead_bubble_coral","dead_fire_coral","dead_horn_coral","dead_tube_coral_fan","dead_brain_coral_fan","dead_bubble_coral_fan","dead_fire_coral_fan","dead_horn_coral_fan","dead_tube_coral_wall_fan","dead_brain_coral_wall_fan","dead_bubble_coral_wall_fan","dead_fire_coral_wall_fan","dead_horn_coral_wall_fan","polished_granite_stairs","smooth_red_sandstone_stairs","mossy_stone_brick_stairs","polished_diorite_stairs","mossy_cobblestone_stairs","end_stone_brick_stairs","stone_stairs","smooth_sandstone_stairs","smooth_quartz_stairs","granite_stairs","andesite_stairs","red_nether_brick_stairs","polished_andesite_stairs","diorite_stairs","polished_granite_slab","smooth_red_sandstone_slab","mossy_stone_brick_slab","polished_diorite_slab","mossy_cobblestone_slab","end_stone_brick_slab","smooth_sandstone_slab","smooth_quartz_slab","granite_slab","andesite_slab","red_nether_brick_slab","polished_andesite_slab","diorite_slab","smoker","blast_furnace","grindstone","stonecutter","bell","lantern","soul_lantern","warped_nylium","crimson_nylium","netherite_block","ancient_debris","crying_obsidian","respawn_anchor","lodestone","blackstone","blackstone_stairs","blackstone_slab","polished_blackstone","polished_blackstone_bricks","cracked_polished_blackstone_bricks","chiseled_polished_blackstone","polished_blackstone_brick_slab","polished_blackstone_brick_stairs","gilded_blackstone","polished_blackstone_stairs","polished_blackstone_slab","polished_blackstone_pressure_plate","chiseled_nether_bricks","cracked_nether_bricks","quartz_bricks","tuff","calcite","oxidized_copper","weathered_copper","exposed_copper","copper_block","copper_ore","deepslate_copper_ore","oxidized_cut_copper","weathered_cut_copper","exposed_cut_copper","cut_copper","oxidized_cut_copper_stairs","weathered_cut_copper_stairs","exposed_cut_copper_stairs","cut_copper_stairs","oxidized_cut_copper_slab","weathered_cut_copper_slab","exposed_cut_copper_slab","cut_copper_slab","waxed_copper_block","waxed_weathered_copper","waxed_exposed_copper","waxed_oxidized_copper","waxed_oxidized_cut_copper","waxed_weathered_cut_copper","waxed_exposed_cut_copper","waxed_cut_copper","waxed_oxidized_cut_copper_stairs","waxed_weathered_cut_copper_stairs","waxed_exposed_cut_copper_stairs","waxed_cut_copper_stairs","waxed_oxidized_cut_copper_slab","waxed_weathered_cut_copper_slab","waxed_exposed_cut_copper_slab","waxed_cut_copper_slab","lightning_rod","pointed_dripstone","dripstone_block","deepslate","cobbled_deepslate","cobbled_deepslate_stairs","cobbled_deepslate_slab","polished_deepslate","polished_deepslate_stairs","polished_deepslate_slab","deepslate_tiles","deepslate_tile_stairs","deepslate_tile_slab","deepslate_bricks","deepslate_brick_stairs","deepslate_brick_slab","chiseled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","smooth_basalt","raw_iron_block","raw_copper_block","raw_gold_block","ice","packed_ice","blue_ice","piston","sticky_piston","piston_head","amethyst_cluster","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_block","budding_amethyst","infested_cobblestone","infested_chiseled_stone_bricks","infested_cracked_stone_bricks","infested_deepslate","infested_stone","infested_mossy_stone_bricks","infested_stone_bricks","stone_button","polished_blackstone_button","cobblestone_wall","mossy_cobblestone_wall","brick_wall","prismarine_wall","red_sandstone_wall","mossy_stone_brick_wall","granite_wall","stone_brick_wall","nether_brick_wall","andesite_wall","red_nether_brick_wall","sandstone_wall","end_stone_brick_wall","diorite_wall","blackstone_wall","polished_blackstone_brick_wall","polished_blackstone_wall","cobbled_deepslate_wall","polished_deepslate_wall","deepslate_tile_wall","deepslate_brick_wall","mud_brick_wall","tuff_wall","polished_tuff_wall","tuff_brick_wall","resin_brick_wall","shulker_box","black_shulker_box","blue_shulker_box","brown_shulker_box","cyan_shulker_box","gray_shulker_box","green_shulker_box","light_blue_shulker_box","light_gray_shulker_box","lime_shulker_box","magenta_shulker_box","orange_shulker_box","pink_shulker_box","purple_shulker_box","red_shulker_box","white_shulker_box","yellow_shulker_box","anvil","chipped_anvil","damaged_anvil","cauldron","water_cauldron","lava_cauldron","powder_snow_cauldron","rail","powered_rail","detector_rail","activator_rail","conduit","mud_bricks","mud_brick_stairs","mud_brick_slab","packed_mud","crafter","tuff_slab","tuff_stairs","chiseled_tuff","polished_tuff","polished_tuff_slab","polished_tuff_stairs","tuff_bricks","tuff_brick_slab","tuff_brick_stairs","chiseled_tuff_bricks","chiseled_copper","exposed_chiseled_copper","weathered_chiseled_copper","oxidized_chiseled_copper","waxed_chiseled_copper","waxed_exposed_chiseled_copper","waxed_weathered_chiseled_copper","waxed_oxidized_chiseled_copper","copper_grate","exposed_copper_grate","weathered_copper_grate","oxidized_copper_grate","waxed_copper_grate","waxed_exposed_copper_grate","waxed_weathered_copper_grate","waxed_oxidized_copper_grate","copper_bulb","exposed_copper_bulb","weathered_copper_bulb","oxidized_copper_bulb","waxed_copper_bulb","waxed_exposed_copper_bulb","waxed_weathered_copper_bulb","waxed_oxidized_copper_bulb","copper_door","exposed_copper_door","weathered_copper_door","oxidized_copper_door","waxed_copper_door","waxed_exposed_copper_door","waxed_weathered_copper_door","waxed_oxidized_copper_door","copper_trapdoor","exposed_copper_trapdoor","weathered_copper_trapdoor","oxidized_copper_trapdoor","waxed_copper_trapdoor","waxed_exposed_copper_trapdoor","waxed_weathered_copper_trapdoor","waxed_oxidized_copper_trapdoor","heavy_core","resin_bricks","resin_brick_slab","resin_brick_stairs","chiseled_resin_bricks"],frogs_spawnable_on:Pg,stone_bricks:Lg,wool:Dg,wool_carpets:Ig,nether_carver_replaceables:Ug,nylium:Ng,wart_blocks:Fg,soul_fire_base_blocks:Og,infiniburn_overworld:kg,fire:zg};Object.fromEntries(Object.entries(Hg).map(([n,e])=>[`minecraft:${n}`,new Set(e.map(t=>`minecraft:${t}`))]));function Xs(n,e,t){const i=BigInt(Math.imul(n|0,3129871)),r=BigInt.asIntN(64,BigInt(t|0)*116129781n);let s=BigInt.asIntN(64,i^r^BigInt(e|0));return s=BigInt.asIntN(64,s*s*42317861n+s*11n),s>>16n}function Gg(n){let e=0;for(let t=0;t<n.length;t++)e=Math.imul(e,31)+n.charCodeAt(t)|0;return e}(()=>{const n=new Float32Array(65536);for(let e=0;e<65536;e++)n[e]=Math.sin(e*Math.PI*2/65536);return n})();class Vg{constructor(e){this.randomSource=e}nextNextGaussian=0;haveNextNextGaussian=!1;reset(){this.haveNextNextGaussian=!1}nextGaussian(){if(this.haveNextNextGaussian)return this.haveNextNextGaussian=!1,this.nextNextGaussian;let e,t,i;do e=2*this.randomSource.nextDouble()-1,t=2*this.randomSource.nextDouble()-1,i=e*e+t*t;while(i>=1||i===0);const r=Math.sqrt(-2*Math.log(i)/i);return this.nextNextGaussian=t*r,this.haveNextNextGaussian=!0,e*r}}const Bg=n=>BigInt.asIntN(64,n),vc=n=>Number(BigInt.asIntN(32,n)),xc=(1n<<48n)-1n,bc=25214903917n,Wg=11n;class Ci{seed=0n;gaussianSource=new Vg(this);constructor(e){this.setSeed(e)}fork(){return new Ci(this.nextLong())}forkPositional(){return new Xg(this.nextLong())}setSeed(e){this.seed=(e^bc)&xc,this.gaussianSource.reset()}next(e){return this.seed=this.seed*bc+Wg&xc,vc(this.seed>>BigInt(48-e))}nextInt(e){if(e===void 0)return this.next(32);if(e<=0)throw new RangeError("Bound must be positive");if((e&e-1)===0)return vc(BigInt(e)*BigInt(this.next(31))>>31n);let t,i;do t=this.next(31),i=t%e;while((t-i+(e-1)|0)<0);return i}nextIntBetweenInclusive(e,t){return this.nextInt(t-e+1)+e}nextLong(){const e=this.next(32),t=this.next(32);return Bg((BigInt(e)<<32n)+BigInt(t))}nextBoolean(){return this.next(1)!==0}nextFloat(){return this.next(24)*5960464477539063e-23}nextDouble(){const e=this.next(26),t=this.next(27);return(e*134217728+t)*11102230246251565e-32}nextGaussian(){return this.gaussianSource.nextGaussian()}consumeCount(e){for(let t=0;t<e;t++)this.nextInt()}}class Xg{constructor(e){this.seed=e}at(e,t,i){return new Ci(Xs(e,t,i)^this.seed)}fromHashOf(e){return new Ci(BigInt(Gg(e))^this.seed)}fromSeed(e){return new Ci(e)}}new Set(["water","lava","short_grass","tall_grass","fern","large_fern","dead_bush","seagrass","tall_seagrass","vine","glow_lichen","moss_carpet","pale_moss_carpet","pale_hanging_moss","mangrove_propagule","cocoa","hanging_roots","cave_vines","cave_vines_plant","oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling","cherry_sapling","pale_oak_sapling","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","closed_eyeblossom","open_eyeblossom","sunflower","lilac","rose_bush","peony","brown_mushroom","red_mushroom","sugar_cane","kelp","kelp_plant","lily_pad","sweet_berry_bush","bamboo_sapling","pink_petals","sea_pickle","spore_blossom","small_dripleaf","big_dripleaf_stem","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_cluster","sculk_vein","fire","soul_fire","crimson_fungus","warped_fungus","crimson_roots","warped_roots","nether_sprouts","weeping_vines","weeping_vines_plant","twisting_vines","twisting_vines_plant","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["snow","cactus","chest","bamboo","pointed_dripstone","big_dripleaf","sculk_sensor","sculk_shrieker","sandstone_slab","azalea","flowering_azalea","dirt_path","farmland"].map(n=>`minecraft:${n}`));const Yg=new Set(["seagrass","tall_seagrass","kelp","kelp_plant","sea_pickle","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["tall_grass","large_fern","sunflower","lilac","rose_bush","peony","small_dripleaf","tall_seagrass"].map(n=>`minecraft:${n}`));const $g={"minecraft:acacia_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:acacia_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:amethyst_cluster":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:bamboo":{props:[["age",["0","1"]],["leaves",["none","small","large"]],["stage",["0","1"]]],default:{age:"0",leaves:"none",stage:"0"}},"minecraft:basalt":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bee_nest":{props:[["facing",["north","south","west","east"]],["honey_level",["0","1","2","3","4","5"]]],default:{facing:"north",honey_level:"0"}},"minecraft:big_dripleaf":{props:[["facing",["north","south","west","east"]],["tilt",["none","unstable","partial","full"]],["waterlogged",["true","false"]]],default:{facing:"north",tilt:"none",waterlogged:"false"}},"minecraft:big_dripleaf_stem":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"false"}},"minecraft:birch_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:birch_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bone_block":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:brain_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:brown_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:bubble_column":{props:[["drag",["true","false"]]],default:{drag:"true"}},"minecraft:bubble_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:cactus":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:cave_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]],["berries",["true","false"]]],default:{age:"0",berries:"false"}},"minecraft:cave_vines_plant":{props:[["berries",["true","false"]]],default:{berries:"false"}},"minecraft:cherry_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:cherry_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:chest":{props:[["type",["single","left","right"]],["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{type:"single",facing:"north",waterlogged:"false"}},"minecraft:chorus_flower":{props:[["age",["0","1","2","3","4","5"]]],default:{age:"0"}},"minecraft:chorus_plant":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:cocoa":{props:[["age",["0","1","2"]],["facing",["north","south","west","east"]]],default:{age:"0",facing:"north"}},"minecraft:creaking_heart":{props:[["active",["true","false"]],["axis",["x","y","z"]],["natural",["true","false"]]],default:{active:"false",axis:"y",natural:"false"}},"minecraft:crimson_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:dark_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:dark_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate_redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:fire":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{age:"0",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:fire_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:flowering_azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:glow_lichen":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:grass_block":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:hanging_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:horn_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:infested_deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:iron_bars":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",waterlogged:"false",west:"false"}},"minecraft:jungle_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:jungle_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:kelp":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:large_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:large_fern":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:lava":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:lilac":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:mangrove_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:mangrove_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mangrove_propagule":{props:[["age",["0","1","2","3","4"]],["hanging",["true","false"]],["stage",["0","1"]],["waterlogged",["true","false"]]],default:{age:"0",hanging:"false",stage:"0",waterlogged:"false"}},"minecraft:mangrove_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:medium_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:muddy_mangrove_roots":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mushroom_stem":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:mycelium":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:pale_hanging_moss":{props:[["tip",["true","false"]]],default:{tip:"true"}},"minecraft:pale_moss_carpet":{props:[["bottom",["true","false"]],["east",["none","low","tall"]],["north",["none","low","tall"]],["south",["none","low","tall"]],["west",["none","low","tall"]]],default:{bottom:"true",east:"none",north:"none",south:"none",west:"none"}},"minecraft:pale_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:pale_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:peony":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:pink_petals":{props:[["facing",["north","south","west","east"]],["flower_amount",["1","2","3","4"]]],default:{facing:"north",flower_amount:"1"}},"minecraft:podzol":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:pointed_dripstone":{props:[["thickness",["tip_merge","tip","frustum","middle","base"]],["vertical_direction",["up","down"]],["waterlogged",["true","false"]]],default:{thickness:"tip",vertical_direction:"up",waterlogged:"false"}},"minecraft:red_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:rose_bush":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:sandstone_slab":{props:[["type",["top","bottom","double"]],["waterlogged",["true","false"]]],default:{type:"bottom",waterlogged:"false"}},"minecraft:sculk_catalyst":{props:[["bloom",["true","false"]]],default:{bloom:"false"}},"minecraft:sculk_sensor":{props:[["power",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["sculk_sensor_phase",["inactive","active","cooldown"]],["waterlogged",["true","false"]]],default:{power:"0",sculk_sensor_phase:"inactive",waterlogged:"false"}},"minecraft:sculk_shrieker":{props:[["can_summon",["true","false"]],["shrieking",["true","false"]],["waterlogged",["true","false"]]],default:{can_summon:"false",shrieking:"false",waterlogged:"false"}},"minecraft:sculk_vein":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:sea_pickle":{props:[["pickles",["1","2","3","4"]],["waterlogged",["true","false"]]],default:{pickles:"1",waterlogged:"true"}},"minecraft:small_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:small_dripleaf":{props:[["facing",["north","south","west","east"]],["half",["upper","lower"]],["waterlogged",["true","false"]]],default:{facing:"north",half:"lower",waterlogged:"false"}},"minecraft:snow":{props:[["layers",["1","2","3","4","5","6","7","8"]]],default:{layers:"1"}},"minecraft:spruce_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:spruce_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:sugar_cane":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:sunflower":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:suspicious_gravel":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:suspicious_sand":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:sweet_berry_bush":{props:[["age",["0","1","2","3"]]],default:{age:"0"}},"minecraft:tall_grass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tall_seagrass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tube_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:twisting_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:vine":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:warped_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:water":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:weeping_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}}},qg=$g;function jg(n,e){const t=[];let i=n.length;for(let a=0;a<n.length;a++){const o=n[a]??"minecraft:air",l=qg[o],c=Object.fromEntries(Object.entries(e(a)).filter(([_])=>l?.props.some(([g])=>g===_))),u=(l?.props??[]).filter(([_])=>!(_ in c)),h=[];let f=1;for(let _=u.length-1;_>=0;_--)h[_]=f,f*=u[_][1].length;let p=0;u.forEach(([_,g],m)=>p+=g.indexOf(l.default[_])*h[m]),t.push({name:o,props:u,stride:h,count:f,defaultIndex:p,base:i,fixed:c}),i+=f-1}const r=new Uint8Array(i),s=new Uint16Array(i);for(let a=0;a<t.length;a++){const o=t[a];for(let l=0;l<o.count;l++){const c=l===o.defaultIndex?a:o.base+(l<o.defaultIndex?l:l-1);r[c]=a,s[c]=l}}return{defs:t,count:i,blockOf:r,indexOf:s}}function Kg(n,e,t){const i=n.defs[e];return t===i.defaultIndex?e:i.base+(t<i.defaultIndex?t:t-1)}function es(n,e,t){const i=n.defs[n.blockOf[e]],r=i.props.findIndex(([s])=>s===t);return r<0?i.fixed[t]:i.props[r][1][Math.floor(n.indexOf[e]/i.stride[r])%i.props[r][1].length]}function Yu(n,e,t){const i=n.blockOf[e],r=n.defs[i];let s=n.indexOf[e];for(const[a,o]of Object.entries(t)){const l=r.props.findIndex(([h])=>h===a);if(l<0)continue;const c=r.props[l][1].indexOf(String(o));if(c<0)continue;const u=Math.floor(s/r.stride[l])%r.props[l][1].length;s+=(c-u)*r.stride[l]}return Kg(n,i,s)}function $u(n,e){const t=n.defs[n.blockOf[e]],i={...t.fixed};return t.props.forEach(([r,s],a)=>i[r]=s[Math.floor(n.indexOf[e]/t.stride[a])%s.length]),i}function Zg(n,e){const t=n.defs[n.blockOf[e]],i=$u(n,e),r=Object.keys(i).sort();return r.length?`${t.name}[${r.map(s=>`${s}=${i[s]}`).join(",")}]`:t.name}const pe=16;class Jg{data=new Uint8ClampedArray(pe*pe*4);set(e,t,[i,r,s],a=255){const o=((t&15)*pe+(e&15))*4|0;this.data[o]=i,this.data[o+1]=r,this.data[o+2]=s,this.data[o+3]=a}get(e,t){const i=((t&15)*pe+(e&15))*4;return[this.data[i],this.data[i+1],this.data[i+2]]}fill(e){for(let t=0;t<pe;t++)for(let i=0;i<pe;i++)this.set(i,t,e(i,t))}}function Qg(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const k=n=>[n>>16&255,n>>8&255,n&255],ne=([n,e,t],i)=>[n*i,e*i,t*i],qu=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t];function lt(n,e,t,i){n.fill(()=>ne(e,1+(i()-.5)*2*t))}function We(n,e,t,i,r){for(let s=0;s<t;s++){let a=Math.floor(r()*pe),o=Math.floor(r()*pe);const l=e(),c=1+Math.floor(r()*i);for(let u=0;u<c;u++)n.set(a,o,l),r()<.5?a+=r()<.5?1:-1:o+=r()<.5?1:-1}}function Vn(n,e){const t=Array.from({length:n},()=>[e()*pe,e()*pe]),i=new Int32Array(pe*pe),r=new Float32Array(pe*pe);for(let s=0;s<pe;s++)for(let a=0;a<pe;a++){let o=1/0,l=1/0,c=0;t.forEach(([u,h],f)=>{let p=Math.abs(a+.5-u),_=Math.abs(s+.5-h);p=Math.min(p,pe-p),_=Math.min(_,pe-_);const g=Math.hypot(p,_);g<o?(l=o,o=g,c=f):g<l&&(l=g)}),i[s*pe+a]=c,r[s*pe+a]=l-o}return{owner:i,edge:r}}const Na=k(8806467),ks=k(12105912),ju=0;function Ku(n,e){lt(n,k(8224125),.06,e),We(n,()=>ne(k(8224125),.82+e()*.06),10,4,e),We(n,()=>ne(k(8224125),1.1),6,2,e)}function Zu(n,e){lt(n,k(5263448),.07,e);for(const t of[2,6,10,14]){const i=Math.floor(e()*pe);for(let r=0;r<11;r++)n.set(r+i,t+(r>6?1:0),ne(k(5263448),.72))}}function ev(n,e){lt(n,k(5658206),.06,e);const{edge:t}=Vn(5,e);n.fill((i,r)=>t[r*pe+i]<1?ne(k(5658206),.72):n.get(i,r))}function Tr(n,e){lt(n,Na,.07,e),We(n,()=>ne(Na,.75),12,2,e),We(n,()=>ne(Na,1.18),8,2,e)}function Qs(n){for(let e=3;e<n.data.length;e+=4)n.data[e]=ju}function tv(n,e){lt(n,ks,.1,e),We(n,()=>ne(ks,.8),14,2,e),We(n,()=>ne(ks,1.15),10,1,e),Qs(n)}function nv(n,e){Tr(n,e);for(let t=0;t<pe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ne(ks,.88+e()*.24),ju)}}function iv(n,e){Tr(n,e);for(let t=0;t<pe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ne(k(15791864),.92+e()*.1))}}function Mc(n,e){lt(n,k(14406560),.04,e),We(n,()=>ne(k(14406560),.88),10,1,e)}function Sc(n,e){const{owner:t,edge:i}=Vn(14,e),r=Array.from({length:14},()=>ne(k(8814715),.75+e()*.45));n.fill((s,a)=>{const o=a*pe+s;return i[o]<.7?ne(k(8814715),.6):ne(r[t[o]],.96+e()*.08)})}function rv(n,e){const t=k(15790320);n.fill((i,r)=>{const s=Math.sin((i+r*2)/pe*Math.PI*2)+Math.sin((i*2-r)/pe*Math.PI*2);return ne(t,.92+s*.05+(e()-.5)*.04)}),Qs(n)}function sv(n,e){n.fill(()=>{const t=e();return t<.35?k(2763306):t<.7?k(5723991):t<.9?k(8026746):k(1710618)})}function av(n,e){const t=k(10650447);for(let i=0;i<4;i++){const r=Math.floor(e()*pe),s=.94+e()*.12;for(let a=i*4;a<i*4+4;a++)for(let o=0;o<pe;o++){let l=ne(t,s*(1+(e()-.5)*.06));a===i*4+3?l=ne(t,.68):o===r&&(l=ne(t,.74)),n.set(o,a,l)}}}function Ju(n,e){const{owner:t,edge:i}=Vn(9,e),r=Array.from({length:9},()=>.8+e()*.35);n.fill((s,a)=>{const o=a*pe+s;return i[o]<.9?ne(k(8026746),.55):ne(k(8026746),r[t[o]]*(1+(e()-.5)*.08))})}function ov(n,e){const t=k(7033138),i=Array.from({length:pe},()=>.8+e()*.35);n.fill(r=>ne(t,i[r]*(1+(e()-.5)*.12))),We(n,()=>ne(t,.6),5,3,e)}function lv(n,e){const t=k(11834207);n.fill((i,r)=>{const s=Math.max(Math.abs(i-7.5),Math.abs(r-7.5));if(s>7)return ne(k(7033138),.9+e()*.2);const a=Math.floor(s)%2===0?1:.86;return ne(t,a*(1+(e()-.5)*.05))})}function cv(n,e){const t=k(10132122);n.fill(()=>e()<.18?ne(t,.55):ne(t,.85+e()*.35)),Qs(n)}function uv(n,e){const{owner:t,edge:i}=Vn(7,e),r=Array.from({length:7},()=>qu(k(13146702),k(16771488),e()));n.fill((s,a)=>{const o=a*pe+s;return i[o]<.8?k(9071157):ne(r[t[o]],.95+e()*.1)})}function hv(n,e){n.fill((t,i)=>{const r=Math.sin((t+i)/pe*Math.PI*4)*.5+Math.sin((t*2-i)/pe*Math.PI*2)*.5,s=Math.max(0,Math.min(1,.5+r*.6+(e()-.5)*.25));return qu(k(13123599),k(16761402),s*s)}),We(n,()=>k(10103304),6,3,e)}function fv(n,e){lt(n,k(1774630),.12,e),We(n,()=>k(3877466),10,3,e),We(n,()=>k(788754),8,2,e)}const Fa=n=>(e,t)=>{lt(e,k(n),.04,t);for(const i of[4,9,13])for(let r=0;r<pe;r++)t()<.8&&e.set(r,i,ne(k(n),.88));for(let i=0;i<pe;i++)e.set(i,0,ne(k(n),1.06))},wc=n=>(e,t)=>{lt(e,k(n),.035,t),We(e,()=>ne(k(n),.93),8,2,t)},dv=n=>(e,t)=>{lt(e,k(n),.05,t),We(e,()=>ne(k(n),.86),10,1,t)};function pv(n,e){lt(n,k(16055034),.025,e),We(n,()=>k(14674415),6,2,e)}function mv(n,e){lt(n,k(16251901),.02,e),We(n,()=>k(15200244),10,3,e)}function _v(n,e){lt(n,k(9286906),.05,e);for(let t=0;t<3;t++){let i=Math.floor(e()*pe),r=Math.floor(e()*pe);for(let s=0;s<6;s++)n.set(i,r,k(14215423)),i+=1,r+=e()<.5?1:0}}function gv(n,e){const{edge:t}=Vn(6,e);n.fill((i,r)=>t[r*pe+i]<.6?k(11127029):ne(k(9088744),.96+e()*.08))}function Qu(n,e){lt(n,k(3947068),.08,e),We(n,()=>k(4932678),10,3,e)}function vv(n,e){lt(n,k(7299688),.1,e),We(n,()=>k(9273991),12,2,e),We(n,()=>k(5917781),8,2,e)}const yc=n=>(e,t)=>{Tr(e,t);for(let i=0;i<pe;i++){const r=2+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ne(k(n),.88+t()*.24))}};function xv(n,e){lt(n,k(5979933),.1,e),We(n,()=>k(8016936),14,3,e),We(n,()=>k(4074002),8,2,e)}function bv(n,e){Tr(n,e),We(n,()=>ne(k(7820603),.7),14,2,e),We(n,()=>k(9079434),6,1,e)}function Mv(n,e){lt(n,k(14672092),.03,e);const{edge:t}=Vn(5,e);n.fill((i,r)=>t[r*pe+i]<.5?k(13224646):n.get(i,r))}const xi=n=>(e,t)=>{lt(e,k(n),.03,t),We(e,()=>ne(k(n),.93),6,2,t)},ft=(n,e=.85,t=1.12)=>(i,r)=>{lt(i,k(n),.07,r),We(i,()=>ne(k(n),e+r()*.06),12,3,r),We(i,()=>ne(k(n),t),8,2,r)},Ft=(n,e,t=5)=>(i,r)=>{(n?Zu:Ku)(i,r);for(let s=0;s<t;s++){const a=2+Math.floor(r()*12),o=2+Math.floor(r()*12),l=2+Math.floor(r()*3);for(let c=0;c<l;c++){const u=a+Math.floor(r()*3)-1,h=o+Math.floor(r()*3)-1;i.set(u,h,ne(k(e),.8+r()*.4))}i.set(a,o,ne(k(e),1.15))}},Ec=n=>(e,t)=>{const{owner:i,edge:r}=Vn(6,t),s=Array.from({length:6},()=>.8+t()*.35);e.fill((a,o)=>{const l=o*pe+a;return r[l]<.8?ne(k(n),.55):ne(k(n),s[i[l]]*(1+(t()-.5)*.08))})},wn=(n,e=.6)=>(t,i)=>{const r=k(n),s=Array.from({length:pe},()=>.8+i()*.35);t.fill(a=>ne(r,s[a]*(1+(i()-.5)*.12))),We(t,()=>ne(r,e),5,3,i)};function Sv(n,e){lt(n,k(14211026),.05,e);for(let t=0;t<7;t++){const i=Math.floor(e()*pe),r=Math.floor(e()*pe),s=2+Math.floor(e()*4);for(let a=0;a<s;a++)n.set(i+a,r,ne(k(3025704),.9+e()*.3))}}const bn=(n,e)=>(t,i)=>{t.fill((r,s)=>{const a=Math.max(Math.abs(r-7.5),Math.abs(s-7.5));if(a>7)return ne(k(e),.9+i()*.2);const o=Math.floor(a)%2===0?1:.86;return ne(k(n),o*(1+(i()-.5)*.05))})},Mn=(n,e,t)=>(i,r)=>{const s=k(n);i.fill(()=>r()<.18?ne(s,.55):ne(s,.85+r()*.35)),t!==void 0&&We(i,()=>ne(k(t),.9+r()*.2),9,2,r),e&&Qs(i)},Ac=(n,e)=>(t,i)=>{lt(t,k(n),.06,i),e&&We(t,()=>k(15261904),6,4,i)};function wv(n,e){lt(n,k(14272936),.05,e);for(let t=0;t<14;t++)n.set(Math.floor(e()*pe),Math.floor(e()*pe),k(12100227))}function yv(n,e){const t=Array.from({length:pe},()=>.9+e()*.15);n.fill(i=>ne(k(13616821),t[i]*(1+(e()-.5)*.06)))}function Ev(n,e){Tv(n,e,12819020);for(let t=0;t<pe;t++)n.set(t,7,ne(k(8018474),.9))}function Av(n,e){const{edge:t}=Vn(8,e);n.fill((i,r)=>t[r*pe+i]<.8?k(9071146):ne(k(13936192),.9+e()*.2))}function Tv(n,e,t){const i=k(t);for(let r=0;r<pe;r++)for(let s=0;s<pe;s++)n.set(s,r,ne(i,(r%4===3?.7:1)*(.94+e()*.1)))}function Rv(n,e){wn(5985100)(n,e);for(let t=5;t<11;t++)for(let i=5;i<11;i++)n.set(i,t,Math.abs(i-7.5)+Math.abs(t-7.5)<3?k(14711338):k(3813932))}function Cv(n,e){n.fill(()=>k(2894372));for(let t=0;t<6;t++){const i=e()<.5,r=Math.floor(e()*pe);for(let s=0;s<pe;s++)n.set(i?r:s,i?s:r,ne(k(4864810),.85+e()*.3))}}function Pv(n,e){Qu(n,e);for(let t=0;t<4;t++){const i=Math.floor(e()*pe);for(let r=0;r<pe;r++)n.set(i,r,ne(k(4864810),.85+e()*.3))}}function Lv(n,e){Tr(n,e),We(n,()=>k(10978138),8,4,e)}const ys=n=>(e,t)=>{lt(e,k(n),.1,t),We(e,()=>ne(k(n),.8),10,2,t)},nt=(n,e,t=!1)=>(i,r)=>{for(let s=3;s<i.data.length;s+=4)i.data[s]=0;if(e((s,a,o=1)=>i.set(s,a,ne(k(n),o*(.85+r()*.3)),255),r),t)for(let s=0;s<i.data.length;s+=4)i.data[s+3]===0&&(i.data[s]=i.data[s+1]=i.data[s+2]=0)},Dv=nt(10132122,(n,e)=>{for(let t=0;t<pe;t+=3){const i=6+Math.floor(e()*10);let r=t;for(let s=0;s<i;s++)n(r,s),e()<.4&&n(r+1,s,.8),e()<.2&&(r+=e()<.5?1:-1)}},!0),Iv=nt(12041648,(n,e)=>{for(let t=2;t<14;t+=2){const i=5+Math.floor(e()*10);for(let r=0;r<i;r++)n(t+(r%3===0?1:0),r)}}),Uv=nt(6989903,n=>{for(let e=0;e<12;e++)n(7,e+2,.9);for(let e=5;e<10;e++)n(e,2);n(7,14,.6)}),Nv=nt(11561518,n=>{for(let e=4;e<12;e++)for(let t=5;t<11;t++)(t-7.5)**2/9+(e-7.5)**2/16<1&&n(t,e,t===7?.7:1);n(7,2,.6),n(7,3,.6)}),Nr=(n,e=12)=>(t,i)=>nt(n,(r,s)=>{for(let a=1;a<15;a+=2){const o=Math.floor(e*(.45+s()*.55));let l=a;for(let c=15;c>15-o;c--)r(l,c,.8+(15-c)/40),s()<.15&&(l+=s()<.5?1:-1)}},!0)(t,i),Tc=(n,e=13)=>(t,i)=>nt(n,r=>{for(let s=15;s>15-e;s--){r(7,s);const a=Math.floor((s-(15-e))/e*5);if(s%2===0)for(let o=1;o<=a;o++)r(7-o,s-(o>>1),.9),r(7+o,s-(o>>1),.9)}},!0)(t,i),Fv=nt(9071162,(n,e)=>{for(let t=0;t<5;t++){let i=7;for(let r=15;r>4&&(n(i,r),e()<.4&&(i+=t%2?1:-1),!(i<1||i>14));r--);}}),Tt=(n,e=0)=>(t,i)=>{for(let a=3;a<t.data.length;a+=4)t.data[a]=0;const r=e?2:6;for(let a=15;a>=r;a--)t.set(7,a,ne(k(4164138),.85+i()*.3),255);t.set(6,11,k(5216826),255),t.set(8,9,k(5216826),255);const s=e?4:5;for(let a=s-2;a<=s+2;a++)for(let o=5;o<=9;o++)Math.abs(o-7)+Math.abs(a-s)<=3&&t.set(o,a,ne(k(n),.8+i()*.35),255);t.set(7,s,ne(k(n),.6),255)},Ov=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<16;t++)n.set(7,t,ne(k(4164138),.85+e()*.3),255);for(const[t,i]of[[6,4],[5,5],[8,8],[9,9],[10,10],[6,12],[5,13]])n.set(t,i,ne(k(5216826),.85+e()*.3),255)},Rc=n=>nt(n,e=>{for(let t=9;t<15;t++)e(7,t,.7);for(let t=4;t<=10;t++)for(let i=5;i<=8;i++)Math.abs(t-7)<=3-Math.max(0,6-i)&&e(t,i)}),kv=(n,e)=>{nt(4155946,(t,i)=>{for(let r=0;r<70;r++)t(Math.floor(i()*14)+1,Math.floor(i()*10)+5)})(n,e);for(let t=0;t<5;t++)n.set(2+Math.floor(e()*12),6+Math.floor(e()*8),k(11542570),255)},zv=nt(10526880,n=>{for(const e of[3,7,11])for(let t=0;t<16;t++)n(e,t,t%5===0?.7:1)},!0),Hv=nt(6134314,n=>{for(let e=0;e<16;e++)n(7,e,e%6===0?.6:1),n(8,e,e%6===0?.6:.9);for(let e=9;e<13;e++)n(e,3,1.1)}),Cc=(n,e)=>(t,i)=>{if(nt(n,(r,s)=>{for(let a=0;a<120;a++)r(Math.floor(s()*16),Math.floor(s()*12)+2)})(t,i),e!==void 0)for(let r=0;r<8;r++)t.set(Math.floor(i()*16),2+Math.floor(i()*10),k(e),255)},Gv=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<14;t++){const i=Math.floor(e()*14)+1,r=Math.floor(e()*14)+1;n.set(i,r,k(15902920),255),n.set(i+1,r,k(15241400),255)}},Vv=(n,e)=>{n.fill((t,i)=>(t-7.5)**2+(i-7.5)**2<49&&!(t>7&&Math.abs(i-7.5)<1)?ne(k(10132122),.85+e()*.3):[0,0,0]);for(let t=0;t<n.data.length;t+=4)n.data[t+3]=n.data[t]===0?0:255},Bv=(n,e)=>n.fill(t=>ne(k(14190890),(t%4===0?.75:1)*(.92+e()*.1))),Wv=(n,e)=>n.fill((t,i)=>Math.abs(t-7.5)<1.5&&Math.abs(i-7.5)<1.5?k(5929514):ne(k(13664808),.9+e()*.12)),Xv=(n,e)=>n.fill(t=>ne(k(t%4<2?7315754:9156666),.92+e()*.1)),Yv=(n,e)=>n.fill((t,i)=>ne(k(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1.5?7315754:9156666),.92+e()*.1)),$v=(n,e)=>n.fill((t,i)=>t===0||t===15?k(2906652):(t+i)%5===0?k(14211248):ne(k(5016108),.88+e()*.14)),qv=(n,e)=>n.fill((t,i)=>t===0||t===15||i===0||i===15?k(2906652):ne(k(6068796),.9+e()*.12)),Pc=nt(5933610,(n,e)=>{let t=7;for(let i=0;i<16;i++){if(n(t,i),n(t+1,i,.85),i%4===1)for(let r=1;r<4;r++)n(t+(i%8===1?r+1:-r),i+(r>>1),.9);e()<.2&&(t+=e()<.5?1:-1),t=Math.max(4,Math.min(10,t))}}),jv=nt(6982186,n=>{for(const e of[4,9])for(let t=9;t<16;t++)for(let i=e;i<e+3;i++)n(i,t,t<11?1.2:1)}),eh=n=>nt(n,(e,t)=>{for(let i=0;i<60;i++)e(Math.floor(t()*16),Math.floor(t()*16),.8+t()*.4)}),Kv=eh(8034938),Zv=nt(10517082,(n,e)=>{for(let t=2;t<14;t+=2){const i=6+Math.floor(e()*9);for(let r=0;r<i;r++)n(t+(r%4===3?1:0),r)}}),Jv=nt(14181544,n=>{for(let e=3;e<13;e++)for(let t=0;t<3;t++)n(e,t,Math.abs(e-7.5)<2?.7:1);for(let e=5;e<11;e++)n(e,3,.8)}),Es=n=>(e,t)=>{if(nt(4880938,i=>{for(const r of[5,10])for(let s=0;s<16;s++)i(r+(s%5===0?1:0),s)})(e,t),n)for(const[i,r]of[[4,6],[11,10],[6,13]])e.set(i,r,k(15900714),255)},Lc=nt(5937706,n=>{for(let e=6;e<16;e++)n(7,e,.8);for(let e=1;e<15;e++)for(let t=2;t<6;t++)Math.abs(e-7.5)<7-(5-t)&&n(e,t)}),Qv=nt(5937706,n=>{for(let e=0;e<16;e++)n(7,e,.85)}),e1=nt(8808538,n=>{for(let e=0;e<16;e++){const t=Math.max(0,3-Math.floor(e/5));for(let i=7-t;i<=8+t;i++)n(i,e)}}),As=n=>nt(n,e=>{for(let t=4;t<16;t++)e(7,t,1.15),e(8,t,.95),t>8&&(e(5,t,.9),e(10,t,1))}),Oa=(n,e)=>{n.fill(()=>ne(k(797754),.8+e()*.4)),We(n,()=>k(2803928),5,1,e)},t1=(n,e)=>{Ju(n,e),We(n,()=>ne(k(5929516),.85+e()*.3),8,3,e)},n1=(n,e)=>{const{edge:t}=Vn(7,e);n.fill((i,r)=>t[r*pe+i]<.9?k(15235098):ne(k(6957586),.8+e()*.4))},Dc=n=>n.fill((e,t)=>e%4===0||t%4===0?k(2767434):[12,16,22]),i1=(n,e)=>n.fill((t,i)=>i===5||t===0||t===15||i===0||i===15?k(4861972):t>=7&&t<=8&&i>=4&&i<=7?k(12105912):ne(k(11039786),.9+e()*.12)),r1=(n,e)=>n.fill(t=>ne(k(14867652),(t%5===0?.85:1)*(.94+e()*.08))),s1=(n,e)=>n.fill((t,i)=>Math.max(Math.abs(t-7.5),Math.abs(i-7.5))<3?k(12103834):ne(k(14867652),.94+e()*.08)),Fr=n=>nt(n,e=>{for(const[t,i]of[[4,10],[8,13],[11,8]])for(let r=15;r>15-i;r--)e(t+(r%4===0?1:0),r)}),Sn=n=>nt(n,e=>{for(let t=6;t<16;t++)for(let i=0;i<16;i++)Math.abs(i-7.5)<(16-t)*.75&&(i+t)%3!==0&&e(i,t)}),Qo=(n,e)=>{lt(n,k(7219754),.12,e),We(n,()=>ne(k(7219754),.7+e()*.1),14,2,e),We(n,()=>ne(k(9321014),1.05),8,2,e)},a1=(n,e)=>{lt(n,k(5390382),.1,e);for(let t=0;t<4;t++){const i=2+Math.floor(e()*11),r=2+Math.floor(e()*11);n.set(i,r,k(3023384),255),n.set(i+2,r,k(3023384),255),n.set(i+1,r+2,k(3023384),255)}},o1=(n,e)=>n.fill(t=>ne(k(4868688),(t%4===0?.75:1)*(.9+e()*.15))),l1=(n,e)=>n.fill((t,i)=>ne(k(5921376),(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1?.8:1)*(.92+e()*.1))),Ic=n=>(e,t)=>{Qo(e,t);for(let i=0;i<6;i++){const r=2+Math.floor(t()*12),s=2+Math.floor(t()*12);e.set(r,s,ne(k(n),.9+t()*.3)),e.set(r+1,s,ne(k(n),.8))}},c1=(n,e)=>n.fill((t,i)=>ne(k(6177336),((t+i*3)%7<2?.7:1)*(.9+e()*.15))),u1=(n,e)=>n.fill((t,i)=>ne(k(6966336),(Math.hypot(t-7.5,i-7.5)%4<1.2?.75:1)*(.9+e()*.12))),Uc=n=>(e,t)=>{lt(e,k(n),.12,t),We(e,()=>ne(k(n),1.2),6,2,t)},Nc=n=>(e,t)=>{Qo(e,t);for(let i=0;i<16;i++){const r=3+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ne(k(n),.85+t()*.3))}},Fc=(n,e)=>(t,i)=>{wn(n)(t,i);for(let r=0;r<10;r++)t.set(Math.floor(i()*16),Math.floor(i()*16),ne(k(e),.9+i()*.3))},Oc=n=>nt(n,e=>{for(let t=9;t<16;t++)e(7,t,.7);for(let t=3;t<=11;t++)for(let i=4;i<=8;i++)Math.abs(t-7)<=4-Math.max(0,6-i)&&e(t,i)}),kc=n=>nt(n,(e,t)=>{for(let i=2;i<14;i+=2){const r=6+Math.floor(t()*8);for(let s=15;s>15-r;s--)e(i+(s%3===0?1:0),s)}}),Ts=n=>nt(n,e=>{for(const t of[5,9])for(let i=0;i<16;i++)e(t+(i%4<2?0:1),i)}),zc=n=>nt(n,(e,t)=>{for(let i=1;i<15;i++){const r=6+Math.floor(t()*9);for(let s=15;s>15-r;s--)e(i,s,.75+(15-s)/30)}}),h1=nt(10132122,n=>{for(const e of[1,6,9,14])for(let t=0;t<16;t++)n(e,t);for(const e of[0,15])for(let t=0;t<16;t++)n(t,e)}),f1=nt(14215423,(n,e)=>{for(let t=0;t<8;t++)n(Math.floor(e()*16),Math.floor(e()*16))}),th={stone:Ku,deepslate:Zu,deepslate_top:ev,dirt:Tr,grass_top:tv,grass_side:nv,sand:Mc,gravel:Sc,water:rv,bedrock:sv,planks:av,cobblestone:Ju,log:ov,log_top:lv,leaves:cv,glowstone:uv,lava:hv,obsidian:fv,sandstone:Fa(14207899),sandstone_top:wc(14471071),red_sand:dv(12477985),red_sandstone:Fa(11887135),red_sandstone_top:wc(12150058),snow:pv,powder_snow:mv,ice:_v,packed_ice:gv,mud:Qu,mycelium_top:vv,mycelium_side:yc(7299688),podzol_top:xv,podzol_side:yc(6965794),coarse_dirt:bv,calcite:Mv,terracotta:xi(9985603),white_terracotta:xi(13742753),orange_terracotta:xi(10572581),yellow_terracotta:xi(12223779),brown_terracotta:xi(5059363),red_terracotta:xi(9387310),light_gray_terracotta:xi(8874593),granite:ft(10120024),diorite:ft(12434620,.8,1.06),andesite:ft(9079436),tuff:ft(7171429),clay:ft(10528435,.92,1.06),coal_ore:Ft(!1,2829099),deepslate_coal_ore:Ft(!0,2039583),iron_ore:Ft(!1,14200723),deepslate_iron_ore:Ft(!0,13213827),copper_ore:Ft(!1,12677451),deepslate_copper_ore:Ft(!0,11758148),gold_ore:Ft(!1,15980106),deepslate_gold_ore:Ft(!0,15255100),redstone_ore:Ft(!1,11801102),deepslate_redstone_ore:Ft(!0,11014156),emerald_ore:Ft(!1,1557828,3),deepslate_emerald_ore:Ft(!0,1356860,3),lapis_ore:Ft(!1,2312616),deepslate_lapis_ore:Ft(!0,2113696),diamond_ore:Ft(!1,6155486,4),deepslate_diamond_ore:Ft(!0,5233871,4),raw_iron_block:Ec(10913643),raw_copper_block:Ec(10115646),oak_log:wn(7033138),spruce_log:wn(3877401),spruce_log_top:bn(7558450,3877401),birch_log:Sv,birch_log_top:bn(12890235,14211026),jungle_log:wn(5653791,.5),jungle_log_top:bn(10975308,5653791),acacia_log:wn(6775127),acacia_log_top:bn(11690042,6775127),dark_oak_log:wn(3943962,.7),dark_oak_log_top:bn(5192482,3943962),mangrove_log:wn(5522223),mangrove_log_top:bn(7223858,5522223),cherry_log:wn(3612714),cherry_log_top:bn(13999e3,3612714),pale_oak_log:wn(5985100),pale_oak_log_top:bn(15129557,5985100),spruce_leaves:Mn(6263903,!1),birch_leaves:Mn(8233811,!1),jungle_leaves:Mn(11053224,!0),acacia_leaves:Mn(10132122,!0),dark_oak_leaves:Mn(10132122,!0),mangrove_leaves:Mn(10526880,!0),cherry_leaves:Mn(15378888,!1),pale_oak_leaves:Mn(10922654,!1),azalea_leaves:Mn(6061100,!1),flowering_azalea_leaves:Mn(6061100,!1,14122962),mushroom_stem:yv,red_mushroom_block:Ac(12593702,!0),brown_mushroom_block:Ac(9793877,!1),mangrove_roots:Cv,muddy_mangrove_roots:Pv,rooted_dirt:Lv,bee_nest:Ev,bee_nest_top:Av,creaking_heart:Rv,moss_carpet:ys(5929516),pale_moss_carpet:ys(10331030),vine:Dv,pale_hanging_moss:Iv,mangrove_propagule:Uv,cocoa:Nv,short_grass:Nr(10132122),fern:Tc(10132122),tall_grass:Nr(10132122,16),large_fern:Tc(10132122,16),dead_bush:Fv,dandelion:Tt(15980858),poppy:Tt(14168618),blue_orchid:Tt(3188966),allium:Tt(11755488),azure_bluet:Tt(15265010),red_tulip:Tt(14694954),orange_tulip:Tt(15764010),white_tulip:Tt(15921902),pink_tulip:Tt(15902920),oxeye_daisy:Tt(16053482),cornflower:Tt(4878056),lily_of_the_valley:Tt(16777215),closed_eyeblossom:Tt(9079434),open_eyeblossom:Tt(15768122),sunflower:Tt(16175646,16),lilac:Tt(13803740,16),rose_bush:Tt(13777466,16),peony:Tt(15775448,16),brown_mushroom:Rc(9793877),red_mushroom:Rc(14168618),sweet_berry_bush:kv,sugar_cane:zv,bamboo:Hv,azalea:Cc(6982188),flowering_azalea:Cc(6982188,14122962),pink_petals:Gv,lily_pad:Vv,pumpkin:Bv,pumpkin_top:Wv,melon:Xv,melon_top:Yv,cactus:$v,cactus_top:qv,seagrass:Nr(4164138),tall_seagrass:Nr(4164138,16),kelp:Pc,kelp_plant:Pc,sea_pickle:jv,glow_lichen:Kv,hanging_roots:Zv,spore_blossom:Jv,cave_vines:Es(!1),cave_vines_plant:Es(!1),cave_vines_lit:Es(!0),cave_vines_plant_lit:Es(!0),grass_snow_side:iv,mushroom_block_inside:wv,tall_flower_bottom:Ov,small_dripleaf:Lc,big_dripleaf:Lc,big_dripleaf_stem:Qv,moss_block:ys(5929516),pale_moss_block:ys(10331030),dripstone_block:ft(8808538),pointed_dripstone:e1,smooth_basalt:ft(4737102,.9,1.05),amethyst_block:ft(9069512,.85,1.15),budding_amethyst:ft(8017336,.8,1.2),small_amethyst_bud:As(12094184),medium_amethyst_bud:As(12094184),large_amethyst_bud:As(12094184),amethyst_cluster:As(12094184),sculk:Oa,sculk_vein:eh(801868),sculk_sensor:Oa,sculk_shrieker:ft(13156520),sculk_catalyst:Oa,blue_ice:ft(7645424,.92,1.06),mossy_cobblestone:t1,magma_block:n1,spawner:Dc,chest:i1,bone_block:r1,bone_block_top:s1,suspicious_sand:Mc,suspicious_gravel:Sc,sandstone_slab:Fa(14207899),tube_coral_block:ft(3364317,.85,1.12),tube_coral:Fr(3364317),tube_coral_fan:Sn(3364317),tube_coral_wall_fan:Sn(3364317),brain_coral_block:ft(14178984,.85,1.12),brain_coral:Fr(14178984),brain_coral_fan:Sn(14178984),brain_coral_wall_fan:Sn(14178984),bubble_coral_block:ft(11021008,.85,1.12),bubble_coral:Fr(11021008),bubble_coral_fan:Sn(11021008),bubble_coral_wall_fan:Sn(11021008),fire_coral_block:ft(14168106,.85,1.12),fire_coral:Fr(14168106),fire_coral_fan:Sn(14168106),fire_coral_wall_fan:Sn(14168106),horn_coral_block:ft(14731322,.85,1.12),horn_coral:Fr(14731322),horn_coral_fan:Sn(14731322),horn_coral_wall_fan:Sn(14731322),netherrack:Qo,soul_sand:a1,soul_soil:ft(4864558,.85,1.1),basalt:o1,basalt_top:l1,blackstone:ft(2761768,.8,1.25),nether_gold_ore:Ic(16175162),nether_quartz_ore:Ic(15525084),ancient_debris:c1,ancient_debris_top:u1,crimson_nylium:Nc(10102310),crimson_nylium_top:Uc(10102310),warped_nylium:Nc(2853500),warped_nylium_top:Uc(2853500),crimson_stem:Fc(6957626,13120058),crimson_stem_top:bn(9321034,6957626),warped_stem:Fc(3816014,2803896),warped_stem_top:bn(3836544,3816014),nether_wart_block:ft(7998990,.8,1.2),warped_wart_block:ft(1473144,.8,1.2),shroomlight:ft(15768138,.85,1.2),crimson_fungus:Oc(11545130),warped_fungus:Oc(2797728),crimson_roots:kc(10100266),warped_roots:kc(2005642),nether_sprouts:Nr(2005642,8),weeping_vines:Ts(10495018),weeping_vines_plant:Ts(10495018),twisting_vines:Ts(2005642),twisting_vines_plant:Ts(2005642),fire:zc(15763994),soul_fire:zc(3856616),end_stone:ft(14474400,.88,1.06),chorus_plant:ft(6965866,.8,1.25),chorus_flower:ft(10123930,.85,1.15),end_gateway:Dc,iron_bars:h1,bubble_column:f1},el=Object.keys(th),te=Object.fromEntries(el.map((n,e)=>[n,e+1])),ea=el.length+1;function nh(){const n=new Uint8Array(ea*pe*pe*4);return el.forEach((e,t)=>{const i=new Jg;let r=0;for(const s of e)r=Math.imul(r,31)+s.charCodeAt(0);th[e](i,Qg(r)),n.set(i.data,(t+1)*pe*pe*4)}),n}const ae=4,ih=(()=>{const n=new Uint8Array(ea);n[te.grass_top]=1,n[te.grass_side]=1,n[te.leaves]=2,n[te.water]=3;for(const e of["jungle_leaves","acacia_leaves","dark_oak_leaves","mangrove_leaves"])n[te[e]]=2;n[te.vine]=2|ae;for(const e of["pale_hanging_moss","mangrove_propagule","cocoa"])n[te[e]]=ae;for(const e of["cave_vines_lit","cave_vines_plant_lit","tall_flower_bottom"])n[te[e]]=ae;return n[te.short_grass]=1|ae,n[te.fern]=1|ae,n[te.tall_grass]=1|ae,n[te.large_fern]=1|ae,n[te.dead_bush]=ae,n[te.dandelion]=ae,n[te.poppy]=ae,n[te.blue_orchid]=ae,n[te.allium]=ae,n[te.azure_bluet]=ae,n[te.red_tulip]=ae,n[te.orange_tulip]=ae,n[te.white_tulip]=ae,n[te.pink_tulip]=ae,n[te.oxeye_daisy]=ae,n[te.cornflower]=ae,n[te.lily_of_the_valley]=ae,n[te.closed_eyeblossom]=ae,n[te.open_eyeblossom]=ae,n[te.sunflower]=ae,n[te.lilac]=ae,n[te.rose_bush]=ae,n[te.peony]=ae,n[te.brown_mushroom]=ae,n[te.red_mushroom]=ae,n[te.sweet_berry_bush]=ae,n[te.sugar_cane]=1|ae,n[te.bamboo]=ae,n[te.azalea]=ae,n[te.flowering_azalea]=ae,n[te.pink_petals]=ae,n[te.lily_pad]=2|ae,n[te.seagrass]=ae,n[te.tall_seagrass]=ae,n[te.kelp]=ae,n[te.kelp_plant]=ae,n[te.sea_pickle]=ae,n[te.glow_lichen]=ae,n[te.hanging_roots]=ae,n[te.spore_blossom]=ae,n[te.cave_vines]=ae,n[te.cave_vines_plant]=ae,n[te.small_dripleaf]=ae,n[te.big_dripleaf]=ae,n[te.big_dripleaf_stem]=ae,n[te.pointed_dripstone]=ae,n[te.small_amethyst_bud]=ae,n[te.medium_amethyst_bud]=ae,n[te.large_amethyst_bud]=ae,n[te.amethyst_cluster]=ae,n[te.sculk_vein]=ae,n[te.tube_coral]=ae,n[te.tube_coral_fan]=ae,n[te.tube_coral_wall_fan]=ae,n[te.brain_coral]=ae,n[te.brain_coral_fan]=ae,n[te.brain_coral_wall_fan]=ae,n[te.bubble_coral]=ae,n[te.bubble_coral_fan]=ae,n[te.bubble_coral_wall_fan]=ae,n[te.fire_coral]=ae,n[te.fire_coral_fan]=ae,n[te.fire_coral_wall_fan]=ae,n[te.horn_coral]=ae,n[te.horn_coral_fan]=ae,n[te.horn_coral_wall_fan]=ae,n[te.bubble_column]=ae,n[te.crimson_fungus]=ae,n[te.warped_fungus]=ae,n[te.crimson_roots]=ae,n[te.warped_roots]=ae,n[te.nether_sprouts]=ae,n[te.weeping_vines]=ae,n[te.weeping_vines_plant]=ae,n[te.twisting_vines]=ae,n[te.twisting_vines_plant]=ae,n[te.fire]=ae,n[te.soul_fire]=ae,n[te.iron_bars]=ae,n})();var Ve=(n=>(n[n.air=0]="air",n[n.stone=1]="stone",n[n.deepslate=2]="deepslate",n[n.dirt=3]="dirt",n[n.grass=4]="grass",n[n.sand=5]="sand",n[n.gravel=6]="gravel",n[n.water=7]="water",n[n.bedrock=8]="bedrock",n[n.planks=9]="planks",n[n.cobblestone=10]="cobblestone",n[n.log=11]="log",n[n.leaves=12]="leaves",n[n.glowstone=13]="glowstone",n[n.obsidian=14]="obsidian",n[n.lava=15]="lava",n[n.sandstone=32]="sandstone",n[n.red_sand=33]="red_sand",n[n.red_sandstone=34]="red_sandstone",n[n.snow_block=35]="snow_block",n[n.powder_snow=36]="powder_snow",n[n.ice=37]="ice",n[n.packed_ice=38]="packed_ice",n[n.mud=39]="mud",n[n.mycelium=40]="mycelium",n[n.podzol=41]="podzol",n[n.coarse_dirt=42]="coarse_dirt",n[n.calcite=43]="calcite",n[n.terracotta=44]="terracotta",n[n.white_terracotta=45]="white_terracotta",n[n.orange_terracotta=46]="orange_terracotta",n[n.yellow_terracotta=47]="yellow_terracotta",n[n.brown_terracotta=48]="brown_terracotta",n[n.red_terracotta=49]="red_terracotta",n[n.light_gray_terracotta=50]="light_gray_terracotta",n[n.granite=51]="granite",n[n.diorite=52]="diorite",n[n.andesite=53]="andesite",n[n.tuff=54]="tuff",n[n.clay=55]="clay",n[n.infested_stone=56]="infested_stone",n[n.infested_deepslate=57]="infested_deepslate",n[n.coal_ore=58]="coal_ore",n[n.deepslate_coal_ore=59]="deepslate_coal_ore",n[n.iron_ore=60]="iron_ore",n[n.deepslate_iron_ore=61]="deepslate_iron_ore",n[n.copper_ore=62]="copper_ore",n[n.deepslate_copper_ore=63]="deepslate_copper_ore",n[n.gold_ore=64]="gold_ore",n[n.deepslate_gold_ore=65]="deepslate_gold_ore",n[n.redstone_ore=66]="redstone_ore",n[n.deepslate_redstone_ore=67]="deepslate_redstone_ore",n[n.emerald_ore=68]="emerald_ore",n[n.deepslate_emerald_ore=69]="deepslate_emerald_ore",n[n.lapis_ore=70]="lapis_ore",n[n.deepslate_lapis_ore=71]="deepslate_lapis_ore",n[n.diamond_ore=72]="diamond_ore",n[n.deepslate_diamond_ore=73]="deepslate_diamond_ore",n[n.raw_iron_block=74]="raw_iron_block",n[n.raw_copper_block=75]="raw_copper_block",n[n.spruce_log=76]="spruce_log",n[n.birch_log=77]="birch_log",n[n.jungle_log=78]="jungle_log",n[n.acacia_log=79]="acacia_log",n[n.dark_oak_log=80]="dark_oak_log",n[n.mangrove_log=81]="mangrove_log",n[n.cherry_log=82]="cherry_log",n[n.pale_oak_log=83]="pale_oak_log",n[n.spruce_leaves=84]="spruce_leaves",n[n.birch_leaves=85]="birch_leaves",n[n.jungle_leaves=86]="jungle_leaves",n[n.acacia_leaves=87]="acacia_leaves",n[n.dark_oak_leaves=88]="dark_oak_leaves",n[n.mangrove_leaves=89]="mangrove_leaves",n[n.cherry_leaves=90]="cherry_leaves",n[n.pale_oak_leaves=91]="pale_oak_leaves",n[n.azalea_leaves=92]="azalea_leaves",n[n.flowering_azalea_leaves=93]="flowering_azalea_leaves",n[n.mushroom_stem=94]="mushroom_stem",n[n.red_mushroom_block=95]="red_mushroom_block",n[n.brown_mushroom_block=96]="brown_mushroom_block",n[n.mangrove_roots=97]="mangrove_roots",n[n.muddy_mangrove_roots=98]="muddy_mangrove_roots",n[n.rooted_dirt=99]="rooted_dirt",n[n.bee_nest=100]="bee_nest",n[n.creaking_heart=101]="creaking_heart",n[n.snow=102]="snow",n[n.moss_carpet=103]="moss_carpet",n[n.pale_moss_carpet=104]="pale_moss_carpet",n[n.vine=105]="vine",n[n.cocoa=106]="cocoa",n[n.pale_hanging_moss=107]="pale_hanging_moss",n[n.mangrove_propagule=108]="mangrove_propagule",n[n.short_grass=109]="short_grass",n[n.fern=110]="fern",n[n.tall_grass=111]="tall_grass",n[n.large_fern=112]="large_fern",n[n.dead_bush=113]="dead_bush",n[n.dandelion=114]="dandelion",n[n.poppy=115]="poppy",n[n.blue_orchid=116]="blue_orchid",n[n.allium=117]="allium",n[n.azure_bluet=118]="azure_bluet",n[n.red_tulip=119]="red_tulip",n[n.orange_tulip=120]="orange_tulip",n[n.white_tulip=121]="white_tulip",n[n.pink_tulip=122]="pink_tulip",n[n.oxeye_daisy=123]="oxeye_daisy",n[n.cornflower=124]="cornflower",n[n.lily_of_the_valley=125]="lily_of_the_valley",n[n.closed_eyeblossom=126]="closed_eyeblossom",n[n.open_eyeblossom=127]="open_eyeblossom",n[n.sunflower=128]="sunflower",n[n.lilac=129]="lilac",n[n.rose_bush=130]="rose_bush",n[n.peony=131]="peony",n[n.brown_mushroom=132]="brown_mushroom",n[n.red_mushroom=133]="red_mushroom",n[n.sweet_berry_bush=134]="sweet_berry_bush",n[n.sugar_cane=135]="sugar_cane",n[n.bamboo=136]="bamboo",n[n.azalea=137]="azalea",n[n.flowering_azalea=138]="flowering_azalea",n[n.pink_petals=139]="pink_petals",n[n.lily_pad=140]="lily_pad",n[n.pumpkin=141]="pumpkin",n[n.melon=142]="melon",n[n.cactus=143]="cactus",n[n.seagrass=144]="seagrass",n[n.tall_seagrass=145]="tall_seagrass",n[n.kelp=146]="kelp",n[n.kelp_plant=147]="kelp_plant",n[n.sea_pickle=148]="sea_pickle",n[n.glow_lichen=149]="glow_lichen",n[n.hanging_roots=150]="hanging_roots",n[n.spore_blossom=151]="spore_blossom",n[n.cave_vines=152]="cave_vines",n[n.cave_vines_plant=153]="cave_vines_plant",n[n.small_dripleaf=154]="small_dripleaf",n[n.big_dripleaf=155]="big_dripleaf",n[n.big_dripleaf_stem=156]="big_dripleaf_stem",n[n.moss_block=157]="moss_block",n[n.pale_moss_block=158]="pale_moss_block",n[n.dripstone_block=159]="dripstone_block",n[n.pointed_dripstone=160]="pointed_dripstone",n[n.smooth_basalt=161]="smooth_basalt",n[n.amethyst_block=162]="amethyst_block",n[n.budding_amethyst=163]="budding_amethyst",n[n.small_amethyst_bud=164]="small_amethyst_bud",n[n.medium_amethyst_bud=165]="medium_amethyst_bud",n[n.large_amethyst_bud=166]="large_amethyst_bud",n[n.amethyst_cluster=167]="amethyst_cluster",n[n.sculk=168]="sculk",n[n.sculk_vein=169]="sculk_vein",n[n.sculk_sensor=170]="sculk_sensor",n[n.sculk_shrieker=171]="sculk_shrieker",n[n.sculk_catalyst=172]="sculk_catalyst",n[n.blue_ice=173]="blue_ice",n[n.mossy_cobblestone=174]="mossy_cobblestone",n[n.magma_block=175]="magma_block",n[n.spawner=176]="spawner",n[n.chest=177]="chest",n[n.bone_block=178]="bone_block",n[n.suspicious_sand=179]="suspicious_sand",n[n.suspicious_gravel=180]="suspicious_gravel",n[n.sandstone_slab=181]="sandstone_slab",n[n.tube_coral_block=182]="tube_coral_block",n[n.tube_coral=183]="tube_coral",n[n.tube_coral_fan=184]="tube_coral_fan",n[n.tube_coral_wall_fan=185]="tube_coral_wall_fan",n[n.brain_coral_block=186]="brain_coral_block",n[n.brain_coral=187]="brain_coral",n[n.brain_coral_fan=188]="brain_coral_fan",n[n.brain_coral_wall_fan=189]="brain_coral_wall_fan",n[n.bubble_coral_block=190]="bubble_coral_block",n[n.bubble_coral=191]="bubble_coral",n[n.bubble_coral_fan=192]="bubble_coral_fan",n[n.bubble_coral_wall_fan=193]="bubble_coral_wall_fan",n[n.fire_coral_block=194]="fire_coral_block",n[n.fire_coral=195]="fire_coral",n[n.fire_coral_fan=196]="fire_coral_fan",n[n.fire_coral_wall_fan=197]="fire_coral_wall_fan",n[n.horn_coral_block=198]="horn_coral_block",n[n.horn_coral=199]="horn_coral",n[n.horn_coral_fan=200]="horn_coral_fan",n[n.horn_coral_wall_fan=201]="horn_coral_wall_fan",n[n.netherrack=202]="netherrack",n[n.soul_sand=203]="soul_sand",n[n.soul_soil=204]="soul_soil",n[n.basalt=205]="basalt",n[n.blackstone=206]="blackstone",n[n.nether_gold_ore=207]="nether_gold_ore",n[n.nether_quartz_ore=208]="nether_quartz_ore",n[n.ancient_debris=209]="ancient_debris",n[n.crimson_nylium=210]="crimson_nylium",n[n.warped_nylium=211]="warped_nylium",n[n.crimson_stem=212]="crimson_stem",n[n.warped_stem=213]="warped_stem",n[n.nether_wart_block=214]="nether_wart_block",n[n.warped_wart_block=215]="warped_wart_block",n[n.shroomlight=216]="shroomlight",n[n.crimson_fungus=217]="crimson_fungus",n[n.warped_fungus=218]="warped_fungus",n[n.crimson_roots=219]="crimson_roots",n[n.warped_roots=220]="warped_roots",n[n.nether_sprouts=221]="nether_sprouts",n[n.weeping_vines=222]="weeping_vines",n[n.weeping_vines_plant=223]="weeping_vines_plant",n[n.twisting_vines=224]="twisting_vines",n[n.twisting_vines_plant=225]="twisting_vines_plant",n[n.fire=226]="fire",n[n.soul_fire=227]="soul_fire",n[n.end_stone=228]="end_stone",n[n.chorus_plant=229]="chorus_plant",n[n.chorus_flower=230]="chorus_flower",n[n.end_gateway=231]="end_gateway",n[n.iron_bars=232]="iron_bars",n[n.bubble_column=233]="bubble_column",n))(Ve||{}),Ze=(n=>(n[n.none=0]="none",n[n.water=1]="water",n[n.lava=2]="lava",n))(Ze||{});const ci={1:16,2:24};function Ai(n,e,t=!1){return t?ci[n]+7:e>=8?n===1?7:15:ci[n]+e-1}const d1={kind:0,amount:0,source:!1,falling:!1},ur=Array.from({length:256},()=>d1),rh={kind:1,amount:8,source:!0,falling:!1};for(const n of[1,2]){ur[n===1?7:15]={kind:n,amount:8,source:!0,falling:!1};for(let e=1;e<=7;e++)ur[ci[n]+e-1]={kind:n,amount:e,source:!1,falling:!1};ur[ci[n]+7]={kind:n,amount:8,source:!1,falling:!0}}const sh=[...Yg].map(n=>Ve[n.slice(10)]);for(const n of sh)ur[n]=rh;const X=(n,e,t=e,i=e,r={})=>({name:n,textures:{top:e,side:t,bottom:i},solid:!0,breakable:!0,shape:"cube",height:16,...r}),ti=(n,e,t)=>X(n,e,e,e,{solid:!1,shape:"slab",height:t}),oe=(n,e)=>X(n,e,e,e,{solid:!1,shape:"cross"}),Mr=(n,e)=>X(n,e,e,e,{solid:!1,breakable:!1}),Et=[X("空气","stone","stone","stone",{solid:!1,breakable:!1}),X("石头","stone"),X("深板岩","deepslate_top","deepslate"),X("泥土","dirt"),X("草方块","grass_top","grass_side","dirt"),X("沙子","sand"),X("沙砾","gravel"),Mr("水","water"),X("基岩","bedrock","bedrock","bedrock",{breakable:!1}),X("木板","planks"),X("圆石","cobblestone"),X("原木","log_top","log"),X("树叶","leaves"),X("萤石","glowstone"),X("黑曜石","obsidian"),Mr("岩浆","lava")];for(let n=1;n<=7;n++)Et[ci[1]+n-1]=Mr(`水（流动 ${n}）`,"water");Et[ci[1]+7]=Mr("水（下落）","water");for(let n=1;n<=7;n++)Et[ci[2]+n-1]=Mr(`岩浆（流动 ${n}）`,"lava");Et[ci[2]+7]=Mr("岩浆（下落）","lava");Et.push(X("砂岩","sandstone_top","sandstone"),X("红沙","red_sand"),X("红砂岩","red_sandstone_top","red_sandstone"),X("雪块","snow"),X("细雪","powder_snow"),X("冰","ice"),X("浮冰","packed_ice"),X("泥巴","mud"),X("菌丝体","mycelium_top","mycelium_side","dirt"),X("灰化土","podzol_top","podzol_side","dirt"),X("砂土","coarse_dirt"),X("方解石","calcite"),X("陶瓦","terracotta"),X("白色陶瓦","white_terracotta"),X("橙色陶瓦","orange_terracotta"),X("黄色陶瓦","yellow_terracotta"),X("棕色陶瓦","brown_terracotta"),X("红色陶瓦","red_terracotta"),X("淡灰色陶瓦","light_gray_terracotta"));Et.push(X("花岗岩","granite"),X("闪长岩","diorite"),X("安山岩","andesite"),X("凝灰岩","tuff"),X("黏土","clay"),X("被虫蚀的石头","stone"),X("被虫蚀的深板岩","deepslate_top","deepslate"),X("煤矿石","coal_ore"),X("深层煤矿石","deepslate_coal_ore"),X("铁矿石","iron_ore"),X("深层铁矿石","deepslate_iron_ore"),X("铜矿石","copper_ore"),X("深层铜矿石","deepslate_copper_ore"),X("金矿石","gold_ore"),X("深层金矿石","deepslate_gold_ore"),X("红石矿石","redstone_ore"),X("深层红石矿石","deepslate_redstone_ore"),X("绿宝石矿石","emerald_ore"),X("深层绿宝石矿石","deepslate_emerald_ore"),X("青金石矿石","lapis_ore"),X("深层青金石矿石","deepslate_lapis_ore"),X("钻石矿石","diamond_ore"),X("深层钻石矿石","deepslate_diamond_ore"),X("粗铁块","raw_iron_block"),X("粗铜块","raw_copper_block"),X("云杉原木","spruce_log_top","spruce_log"),X("白桦原木","birch_log_top","birch_log"),X("丛林原木","jungle_log_top","jungle_log"),X("金合欢原木","acacia_log_top","acacia_log"),X("深色橡木原木","dark_oak_log_top","dark_oak_log"),X("红树原木","mangrove_log_top","mangrove_log"),X("樱花原木","cherry_log_top","cherry_log"),X("苍白橡木原木","pale_oak_log_top","pale_oak_log"),X("云杉树叶","spruce_leaves"),X("白桦树叶","birch_leaves"),X("丛林树叶","jungle_leaves"),X("金合欢树叶","acacia_leaves"),X("深色橡木树叶","dark_oak_leaves"),X("红树树叶","mangrove_leaves"),X("樱花树叶","cherry_leaves"),X("苍白橡树树叶","pale_oak_leaves"),X("杜鹃树叶","azalea_leaves"),X("盛开的杜鹃树叶","flowering_azalea_leaves"),X("蘑菇柄","mushroom_stem"),X("红色蘑菇方块","red_mushroom_block"),X("棕色蘑菇方块","brown_mushroom_block"),X("红树根","mangrove_roots"),X("沾泥的红树根","muddy_mangrove_roots"),X("缠根泥土","rooted_dirt"),X("蜂巢","bee_nest_top","bee_nest"),X("嘎枝之心","pale_oak_log_top","creaking_heart"),ti("雪","snow",2),ti("苔藓地毯","moss_carpet",1),ti("苍白苔藓地毯","pale_moss_carpet",1),oe("藤蔓","vine"),oe("可可果","cocoa"),oe("苍白垂须","pale_hanging_moss"),oe("红树胎生苗","mangrove_propagule"));Et.push(oe("矮草丛","short_grass"),oe("蕨","fern"),oe("高草丛","tall_grass"),oe("大型蕨","large_fern"),oe("枯萎的灌木","dead_bush"),oe("蒲公英","dandelion"),oe("虞美人","poppy"),oe("兰花","blue_orchid"),oe("绒球葱","allium"),oe("蓝花美耳草","azure_bluet"),oe("红色郁金香","red_tulip"),oe("橙色郁金香","orange_tulip"),oe("白色郁金香","white_tulip"),oe("粉红色郁金香","pink_tulip"),oe("滨菊","oxeye_daisy"),oe("矢车菊","cornflower"),oe("铃兰","lily_of_the_valley"),oe("闭合的眼眸花","closed_eyeblossom"),oe("张开的眼眸花","open_eyeblossom"),oe("向日葵","sunflower"),oe("丁香","lilac"),oe("玫瑰丛","rose_bush"),oe("牡丹","peony"),oe("棕色蘑菇","brown_mushroom"),oe("红色蘑菇","red_mushroom"),oe("甜浆果丛","sweet_berry_bush"),oe("甘蔗","sugar_cane"),oe("竹子","bamboo"),oe("杜鹃花丛","azalea"),oe("盛开的杜鹃花丛","flowering_azalea"),ti("粉红色花簇","pink_petals",1),ti("睡莲","lily_pad",1),X("南瓜","pumpkin_top","pumpkin"),X("西瓜","melon_top","melon"),X("仙人掌","cactus_top","cactus"),oe("海草","seagrass"),oe("高海草","tall_seagrass"),oe("海带","kelp"),oe("海带茎","kelp_plant"),oe("海泡菜","sea_pickle"),oe("发光地衣","glow_lichen"),oe("垂根","hanging_roots"),oe("孢子花","spore_blossom"),oe("洞穴藤蔓","cave_vines"),oe("洞穴藤蔓（茎）","cave_vines_plant"),oe("小型垂滴叶","small_dripleaf"),oe("大型垂滴叶","big_dripleaf"),oe("大型垂滴叶茎","big_dripleaf_stem"),X("苔藓块","moss_block"),X("苍白苔藓块","pale_moss_block"),X("滴水石块","dripstone_block"),oe("滴水石锥","pointed_dripstone"),X("平滑玄武岩","smooth_basalt"),X("紫水晶块","amethyst_block"),X("紫水晶母岩","budding_amethyst"),oe("小型紫晶芽","small_amethyst_bud"),oe("中型紫晶芽","medium_amethyst_bud"),oe("大型紫晶芽","large_amethyst_bud"),oe("紫水晶簇","amethyst_cluster"),X("幽匿块","sculk"),oe("幽匿脉络","sculk_vein"),ti("幽匿感测体","sculk_sensor",8),ti("幽匿尖啸体","sculk_shrieker",8),X("幽匿催发体","sculk_catalyst"),X("蓝冰","blue_ice"),X("苔石","mossy_cobblestone"),X("岩浆块","magma_block"),X("刷怪笼","spawner"),X("箱子","chest"),X("骨块","bone_block_top","bone_block"),X("可疑的沙子","suspicious_sand"),X("可疑的沙砾","suspicious_gravel"),ti("砂岩台阶","sandstone_slab",8),X("管珊瑚块","tube_coral_block"),oe("管珊瑚","tube_coral"),oe("管珊瑚扇","tube_coral_fan"),oe("管珊瑚壁扇","tube_coral_wall_fan"),X("脑纹珊瑚块","brain_coral_block"),oe("脑纹珊瑚","brain_coral"),oe("脑纹珊瑚扇","brain_coral_fan"),oe("脑纹珊瑚壁扇","brain_coral_wall_fan"),X("气泡珊瑚块","bubble_coral_block"),oe("气泡珊瑚","bubble_coral"),oe("气泡珊瑚扇","bubble_coral_fan"),oe("气泡珊瑚壁扇","bubble_coral_wall_fan"),X("火珊瑚块","fire_coral_block"),oe("火珊瑚","fire_coral"),oe("火珊瑚扇","fire_coral_fan"),oe("火珊瑚壁扇","fire_coral_wall_fan"),X("鹿角珊瑚块","horn_coral_block"),oe("鹿角珊瑚","horn_coral"),oe("鹿角珊瑚扇","horn_coral_fan"),oe("鹿角珊瑚壁扇","horn_coral_wall_fan"));Et.push(X("下界岩","netherrack"),X("灵魂沙","soul_sand"),X("灵魂土","soul_soil"),X("玄武岩","basalt_top","basalt"),X("黑石","blackstone"),X("下界金矿石","nether_gold_ore"),X("下界石英矿石","nether_quartz_ore"),X("远古残骸","ancient_debris_top","ancient_debris"),X("绯红菌岩","crimson_nylium_top","crimson_nylium"),X("诡异菌岩","warped_nylium_top","warped_nylium"),X("绯红菌柄","crimson_stem_top","crimson_stem"),X("诡异菌柄","warped_stem_top","warped_stem"),X("下界疣块","nether_wart_block"),X("诡异疣块","warped_wart_block"),X("菌光体","shroomlight"),oe("绯红菌","crimson_fungus"),oe("诡异菌","warped_fungus"),oe("绯红菌索","crimson_roots"),oe("诡异菌索","warped_roots"),oe("下界苗","nether_sprouts"),oe("垂泪藤","weeping_vines"),oe("垂泪藤（茎）","weeping_vines_plant"),oe("缠怨藤","twisting_vines"),oe("缠怨藤（茎）","twisting_vines_plant"),oe("火","fire"),oe("灵魂火","soul_fire"),X("末地石","end_stone"),X("紫颂植物","chorus_plant"),X("紫颂花","chorus_flower"),X("末地折跃门","end_gateway"),oe("铁栏杆","iron_bars"),X("气泡柱","bubble_column","bubble_column","bubble_column",{solid:!1,shape:"none",breakable:!1}));const Xr={"minecraft:air":0,"minecraft:stone":1,"minecraft:deepslate":2,"minecraft:dirt":3,"minecraft:grass_block":4,"minecraft:sand":5,"minecraft:gravel":6,"minecraft:water":7,"minecraft:lava":15,"minecraft:bedrock":8,"minecraft:obsidian":14,"minecraft:sandstone":32,"minecraft:red_sand":33,"minecraft:red_sandstone":34,"minecraft:snow_block":35,"minecraft:powder_snow":36,"minecraft:ice":37,"minecraft:packed_ice":38,"minecraft:mud":39,"minecraft:mycelium":40,"minecraft:podzol":41,"minecraft:coarse_dirt":42,"minecraft:calcite":43,"minecraft:terracotta":44,"minecraft:white_terracotta":45,"minecraft:orange_terracotta":46,"minecraft:yellow_terracotta":47,"minecraft:brown_terracotta":48,"minecraft:red_terracotta":49,"minecraft:light_gray_terracotta":50,"minecraft:oak_log":11,"minecraft:cobblestone":10,"minecraft:oak_planks":9,"minecraft:glowstone":13,"minecraft:cave_air":0,"minecraft:void_air":0,"minecraft:oak_leaves":12};for(const n of Object.keys(Ve)){const e=Ve[n];typeof e=="number"&&e>=51&&(Xr[`minecraft:${n}`]=e)}const Cn=[];for(const[n,e]of Object.entries(Xr))Cn[e]??=n;for(let n=16;n<=23;n++)Cn[n]="minecraft:water";for(let n=24;n<=31;n++)Cn[n]="minecraft:lava";const p1=Et.length;function m1(n){const e=ur[n];return n>=16&&n<=31||n===7||n===15?{level:String(e.source?0:e.falling?8:8-e.amount)}:sh.includes(n)?{waterlogged:"true"}:{}}const ln=jg(Array.from({length:p1},(n,e)=>Cn[e]),m1),gt=ln.count,an=ln.blockOf,Hc=Math.ceil(Math.log2(gt)),ah=(n,e)=>e?Yu(ln,n,e):n,_1=(n,e)=>es(ln,n,e),tl=n=>Zg(ln,n),g1=Array.from({length:gt},(n,e)=>Cn[an[e]]);function v1(n){const e=n.indexOf("["),t=Xr[e<0?n:n.slice(0,e)];if(t===void 0)return;if(e<0)return t;const i={};for(const r of n.slice(e+1,-1).split(",")){const[s,a]=r.split("=");s&&(i[s]=a)}if((t===7||t===15)&&i.level!==void 0){const r=Number(i.level),s=t===7?1:2;return r===0?t:r>=8?Ai(s,8,!0):Ai(s,8-r)}return Yu(ln,t,i)}const x1=Uint8Array.from({length:gt},(n,e)=>["west","east","down","up","north","south"].reduce((t,i,r)=>es(ln,e,i)==="true"?t|1<<r:t,0));function nl(n){return Uint8Array.from({length:gt},(e,t)=>n[an[t]])}const sn=Array.from({length:gt},(n,e)=>es(ln,e,"waterlogged")==="true"?rh:ur[an[e]]),An=Uint8Array.from(sn,n=>n.kind),Gc=n=>An[n]!==0,b1=(()=>{const n=new Uint8Array(gt*6),e=["west","east","down","up","north","south"];for(let t=0;t<gt;t++){const{top:i,side:r,bottom:s}=Et[an[t]].textures;let a=[r,r,s,i,r,r];const o=c=>es(ln,t,c),l=o("axis");l==="x"?a=[i,i,r,r,r,r]:l==="z"&&(a=[r,r,r,r,i,i]),o("snowy")==="true"&&(a=[a[0],a[1],a[2],a[3],a[4],a[5]].map((c,u)=>u===2||u===3?c:"grass_snow_side")),/_mushroom_block$|mushroom_stem$/.test(Cn[an[t]]??"")&&(a=a.map((c,u)=>o(e[u])==="false"?"mushroom_block_inside":c)),o("berries")==="true"&&(a=a.map(c=>c==="cave_vines"?"cave_vines_lit":c==="cave_vines_plant"?"cave_vines_plant_lit":c)),o("half")==="lower"&&/sunflower|lilac|rose_bush|peony/.test(Cn[an[t]]??"")&&(a=a.map(()=>"tall_flower_bottom")),n.set(a.map(c=>te[c]),t*6)}return n})(),Fo=[4,3,1,10,9,11,13,7,15],Dt=nl(Uint8Array.from({length:256},(n,e)=>Et[e]?.solid?1:0)),ir=n=>Dt[n]===1;for(const n of[105,149,169])Et[n].shape="multiface";const M1=nl(Uint8Array.from({length:256},(n,e)=>{const t=Et[e]?.shape;return t==="slab"?1:t==="cross"?2:t==="multiface"?3:t==="none"?4:0})),S1=Uint8Array.from(nl(Uint8Array.from({length:256},(n,e)=>Et[e]?.height??16)),(n,e)=>{const t=es(ln,e,"layers");return t?Number(t)*2:n});class _n{constructor(e,t,i,r,s,a){this.minX=e,this.minY=t,this.minZ=i,this.maxX=r,this.maxY=s,this.maxZ=a}static body(e,t,i){const r=t/2;return new _n(e.x-r,e.y,e.z-r,e.x+r,e.y+i,e.z+r)}move(e,t,i){return new _n(this.minX+e,this.minY+t,this.minZ+i,this.maxX+e,this.maxY+t,this.maxZ+i)}expandTowards(e,t,i){return new _n(e<0?this.minX+e:this.minX,t<0?this.minY+t:this.minY,i<0?this.minZ+i:this.minZ,e>0?this.maxX+e:this.maxX,t>0?this.maxY+t:this.maxY,i>0?this.maxZ+i:this.maxZ)}deflate(e){return new _n(this.minX+e,this.minY+e,this.minZ+e,this.maxX-e,this.maxY-e,this.maxZ-e)}intersects(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY&&this.minZ<e.maxZ&&this.maxZ>e.minZ}min(e){return e===0?this.minX:e===1?this.minY:this.minZ}max(e){return e===0?this.maxX:e===1?this.maxY:this.maxZ}}const mt=1e-7,Vc=[new _n(0,0,0,1,1,1)],Bc=[];function Oo(n,e){const t=[],i=Math.floor(n.minX-mt),r=Math.floor(n.maxX+mt),s=Math.floor(n.minY-mt)-1,a=Math.floor(n.maxY+mt),o=Math.floor(n.minZ-mt),l=Math.floor(n.maxZ+mt);for(let c=i;c<=r;c++)for(let u=s;u<=a;u++)for(let h=o;h<=l;h++)for(const f of e(c,u,h)){const p=f.move(c,u,h);p.intersects(n)&&t.push(p)}return t}function Rs(n,e,t,i){if(Math.abs(i)<mt)return 0;const r=(n+1)%3,s=(n+2)%3;for(const a of t)a.max(r)-mt<=e.min(r)||a.min(r)+mt>=e.max(r)||a.max(s)-mt<=e.min(s)||a.min(s)+mt>=e.max(s)||(i>0&&a.min(n)>=e.max(n)-mt?i=Math.min(i,a.min(n)-e.max(n)):i<0&&a.max(n)<=e.min(n)+mt&&(i=Math.max(i,a.max(n)-e.min(n))));return Math.abs(i)<mt?0:i}function Wc(n,e,t){let{x:i,y:r,z:s}=n;r!==0&&(r=Rs(1,e,t,r),r!==0&&(e=e.move(0,r,0)));const a=Math.abs(i)<Math.abs(s);return a&&s!==0&&(s=Rs(2,e,t,s),s!==0&&(e=e.move(0,0,s))),i!==0&&(i=Rs(0,e,t,i),!a&&i!==0&&(e=e.move(i,0,0))),!a&&s!==0&&(s=Rs(2,e,t,s)),{x:i,y:r,z:s}}function w1(n,e,t,i,r){const s=Oo(n.expandTowards(e.x,e.y,e.z),t),a=Wc(e,n,s),o=e.x!==a.x,l=e.z!==a.z,c=e.y!==a.y&&e.y<0;if(!(c||r)||!(o||l))return a;const u=c?n.move(0,a.y,0):n;let h=u.expandTowards(e.x,i,e.z);c||(h=h.expandTowards(0,-1e-5,0));const f=Oo(h,t),p=[];for(const g of f){const m=g.maxY-u.minY;m>a.y+mt&&m<=i+mt&&!p.includes(m)&&p.push(m)}p.sort((g,m)=>g-m);const _=a.x*a.x+a.z*a.z;for(const g of p){const m=Wc({x:e.x,y:g,z:e.z},u,f);if(m.x*m.x+m.z*m.z>_+mt)return{x:m.x,y:m.y+(u.minY-n.minY),z:m.z}}return a}function il(n,e){return Oo(n,e).length===0}function y1(n,e,t,i){if(e.y>0)return e;const r=(u,h)=>il(new _n(n.minX+mt+u,n.minY-i-mt,n.minZ+mt+h,n.maxX-mt+u,n.minY,n.maxZ-mt+h),t),s=.05;let{x:a,z:o}=e;const l=Math.sign(a)*s,c=Math.sign(o)*s;for(;a!==0&&r(a,0);){if(Math.abs(a)<=s){a=0;break}a-=l}for(;o!==0&&r(0,o);){if(Math.abs(o)<=s){o=0;break}o-=c}for(;a!==0&&o!==0&&r(a,o);)a=Math.abs(a)<=s?0:a-l,o=Math.abs(o)<=s?0:o-c;return{x:a,y:e.y,z:o}}function oh(n,e,t,i){return!il(_n.body(n,e,t).deflate(mt),i)}const bi=Math.fround;function E1(n,e,t){if(n.prevPos={...n.pos},n.prevWalkDist=n.walkDist,n.prevBob=n.bob,C1(n,t),e.sneak&&!n.flying)n.pose="crouching";else if(n.pose==="crouching"){const c=Xu.standing;oh(n.pos,c.width,c.height,t.shape)||(n.pose="standing")}let r=e.forward,s=e.left;n.pose==="crouching"&&(r*=ke.SNEAK_MULTIPLIER,s*=ke.SNEAK_MULTIPLIER);const a=n.inWater&&!n.underWater;!n.sprinting&&e.sprint&&r>=.8&&!a&&!n.inWater&&(n.sprinting=!0),n.sprinting&&(r<=1e-5||n.horizontalCollision||a||n.pose==="crouching")&&(n.sprinting=!1);const o=n.velocity;if(n.flying){const c=(e.jump?1:0)-(e.sneak?1:0);c!==0&&(o.y+=c*ke.FLY_SPEED*3)}if(n.noJumpDelay>0&&n.noJumpDelay--,Math.abs(o.x)<ke.MIN_VELOCITY&&(o.x=0),Math.abs(o.y)<ke.MIN_VELOCITY&&(o.y=0),Math.abs(o.z)<ke.MIN_VELOCITY&&(o.z=0),e.jump&&!n.flying){const c=n.inLava?n.lavaHeight:n.waterHeight,u=n.inWater&&c>0,h=ke.WATER_JUMP_THRESHOLD;(!u||n.onGround&&c<=h)&&(!n.inLava||n.onGround&&c<=h)?(n.onGround||u&&c<=h)&&n.noJumpDelay===0&&(A1(n,e.yaw),n.noJumpDelay=ke.JUMP_DELAY):o.y+=ke.WATER_JUMP}else n.noJumpDelay=0;T1(n,s*.98,r*.98,e,t),n.onGround&&n.flying&&(n.flying=!1);const l=n.onGround&&!n.flying?Math.min(.1,Math.hypot(o.x,o.z)):0;n.bob+=(l-n.bob)*.4}function Xc(n,e,t){if(!n.horizontalCollision)return;const i=n.velocity,r=n.body,s=_n.body(n.pos,r.width,r.height).move(i.x,i.y+.6-n.pos.y+e,i.z);il(s,t.shape)&&(i.y=.3)}function A1(n,e){n.velocity.y=ke.JUMP_POWER,n.sprinting&&(n.velocity.x+=-Math.sin(e)*ke.SPRINT_JUMP_BOOST,n.velocity.z+=-Math.cos(e)*ke.SPRINT_JUMP_BOOST)}function ka(n,e,t,i,r){const s=t*t+i*i;if(s<1e-7)return;const a=(s>1?1/Math.sqrt(s):1)*e,o=t*a,l=i*a,c=Math.sin(r),u=Math.cos(r);n.velocity.x+=-c*l-u*o,n.velocity.z+=-u*l+c*o}function T1(n,e,t,i,r){const s=n.velocity;if(n.inWater&&!n.flying){const u=n.pos.y,h=n.sprinting?ke.WATER_SPRINT_DRAG:ke.WATER_DRAG;ka(n,ke.WATER_SPEED,e,t,i.yaw),za(n,i,r),s.x*=h,s.y*=.8,s.z*=h,s.y-=ke.GRAVITY/16,Xc(n,u,r);return}if(n.inLava&&!n.flying){const u=n.pos.y;ka(n,ke.WATER_SPEED,e,t,i.yaw),za(n,i,r),n.lavaHeight<=ke.WATER_JUMP_THRESHOLD?(s.x*=.5,s.y*=.8,s.z*=.5,s.y-=ke.GRAVITY/16):(s.x*=.5,s.y*=.5,s.z*=.5),s.y-=ke.GRAVITY/4,Xc(n,u,r);return}const a=s.y,o=bi(ke.BLOCK_FRICTION),l=n.onGround?bi(o*bi(ke.AIR_FRICTION)):bi(ke.AIR_FRICTION),c=n.onGround?bi(n.speedAttribute*bi(.21600002/(o*o*o))):n.flying?ke.FLY_SPEED*(n.sprinting?2:1):n.sprinting?ke.AIR_SPRINT_SPEED:ke.AIR_SPEED;ka(n,c,e,t,i.yaw),za(n,i,r),s.x*=l,s.z*=l,s.y=(s.y-ke.GRAVITY)*bi(ke.VERTICAL_DRAG),n.flying&&(s.y=a*ke.FLY_VERTICAL_DRAG)}function za(n,e,t){const i=n.body,r=_n.body(n.pos,i.width,i.height);let s={...n.velocity};e.sneak&&!n.flying&&n.onGround&&(s=y1(r,s,t.shape,ke.STEP_HEIGHT));const a=w1(r,s,t.shape,ke.STEP_HEIGHT,n.onGround);n.pos.x+=a.x,n.pos.y+=a.y,n.pos.z+=a.z;const o=Math.abs(s.x-a.x)>1e-5,l=Math.abs(s.z-a.z)>1e-5,c=s.y!==a.y,u=Math.hypot(s.x,s.z),h=Math.hypot(a.x,a.z),f=u>1e-5&&h>1e-5&&Math.acos(Math.min(1,(s.x*a.x+s.z*a.z)/(u*h)))<.13962634;n.horizontalCollision=(o||l)&&!f,n.onGround=c&&s.y<0,o&&(n.velocity.x=0),l&&(n.velocity.z=0),c&&(n.velocity.y=0),n.walkDist+=Math.hypot(a.x,a.z)*.6}function Ha(n,e,t,i,r){const s=sn[n.block(e,t,i)];return s.kind!==r?0:sn[n.block(e,t+1,i)].kind===r?1:s.amount/9}function R1(n,e,t,i,r){const s=sn[n.block(e,t,i)],a=s.amount/9;let o=0,l=0;for(const[h,f]of[[0,-1],[0,1],[-1,0],[1,0]]){const p=n.block(e+h,t,i+f),_=sn[p];if(_.kind!==Ze.none&&_.kind!==r)continue;let g=_.kind===r?_.amount/9:0,m=0;if(g===0){if(!Dt[p]){const d=sn[n.block(e+h,t-1,i+f)];(d.kind===r||d.kind===Ze.none)&&(g=d.kind===r?d.amount/9:0,g>0&&(m=a-(g-.8888889)))}}else g>0&&(m=a-g);o+=h*m,l+=f*m}let c=0;if(s.falling){for(const[h,f]of[[0,-1],[0,1],[-1,0],[1,0]])if(Dt[n.block(e+h,t,i+f)]||Dt[n.block(e+h,t+1,i+f)]){const p=Math.hypot(o,l);p>0&&(o/=p,l/=p),c=-6;break}}const u=Math.hypot(o,c,l);return u<1e-4?{x:0,y:0,z:0}:{x:o/u,y:c/u,z:l/u}}function C1(n,e){const t=n.body,i=_n.body(n.pos,t.width,t.height).deflate(.001),r=!n.flying;for(const[c,u]of[[Ze.water,.014],[Ze.lava,.0023333333333333335]]){let h=0,f=0,p=0,_=0,g=0;for(let m=Math.floor(i.minX);m<Math.ceil(i.maxX);m++)for(let d=Math.floor(i.minY);d<Math.ceil(i.maxY);d++)for(let y=Math.floor(i.minZ);y<Math.ceil(i.maxZ);y++){const M=Ha(e,m,d,y,c);if(M===0)continue;const x=d+M;if(!(x<i.minY)&&(h=Math.max(h,x-i.minY),r)){const R=R1(e,m,d,y,c),E=h<.4?h:1;f+=R.x*E,p+=R.y*E,_+=R.z*E,g++}}if(g>0&&Math.hypot(f,p,_)>0){f=f/g*u,p=p/g*u,_=_/g*u;const m=n.velocity,d=Math.hypot(f,p,_);Math.abs(m.x)<.003&&Math.abs(m.z)<.003&&d<.0045&&(f=f/d*.0045,p=p/d*.0045,_=_/d*.0045),m.x+=f,m.y+=p,m.z+=_}c===Ze.water?n.waterHeight=h:n.lavaHeight=h}const s=n.pos.y+t.eye,a=Math.floor(n.pos.x),o=Math.floor(s),l=Math.floor(n.pos.z);n.underWater=s<o+Ha(e,a,o,l,Ze.water),n.underLava=s<o+Ha(e,a,o,l,Ze.lava)}function P1(n,e,t,i,r,s,a,o){let l=Math.floor(n),c=Math.floor(e),u=Math.floor(t);const h=Math.sign(i),f=Math.sign(r),p=Math.sign(s),_=h!==0?Math.abs(1/i):1/0,g=f!==0?Math.abs(1/r):1/0,m=p!==0?Math.abs(1/s):1/0,d=(w,b)=>b>0?Math.floor(w)+1-w:w-Math.floor(w);let y=h!==0?d(n,h)*_:1/0,M=f!==0?d(e,f)*g:1/0,x=p!==0?d(t,p)*m:1/0,R=0,E=0,T=0,P=0;for(;P<=a;){if(o(l,c,u))return{x:l,y:c,z:u,nx:R,ny:E,nz:T,distance:P};y<M&&y<x?(l+=h,P=y,y+=_,R=-h,E=T=0):M<x?(c+=f,P=M,M+=g,E=-f,R=T=0):(u+=p,P=x,x+=m,T=-p,R=E=0)}return null}const L1=70;class D1{scene;camera;player;terrain;control;head=new $t;spawned=!1;slot=0;target=null;reach=5;bobbing=!0;acc=0;get partialTick(){return this.acc/ke.TICK}eye=1.62;prevEye=1.62;fovMod=1;prevFovMod=1;keys=new Set;lastTap={};sprintByDoubleTap=!1;world;get medium(){return this.player.underLava?"lava":this.player.underWater?"water":"air"}constructor(e,t,i,r){this.scene=e,this.camera=t,this.player=i,this.terrain=r,this.head.rotation.order="YXZ",this.control=new z0(this.head,document.body),this.world={shape:(s,a,o)=>{const l=r.getBlock(s,a,o);return l===null||ir(l)?Vc:Bc},block:(s,a,o)=>r.getBlock(s,a,o)??Ve.bedrock},this.initKeyboard(),this.initMouse()}get feet(){return this.player.pos}set feet(e){this.teleport(e.x,e.y,e.z)}teleport(e,t,i){this.player.pos={x:e,y:t,z:i},this.player.prevPos={x:e,y:t,z:i},this.player.velocity={x:0,y:0,z:0}}get yaw(){return new gn().setFromQuaternion(this.head.quaternion,"YXZ").y}initKeyboard=()=>{document.addEventListener("keydown",e=>{if(!this.control.isLocked||((e.code==="F3"||e.code==="Tab")&&e.preventDefault(),e.repeat))return;this.keys.add(e.code);const t=performance.now(),i=t-(this.lastTap[e.code]??0)<350;if(this.lastTap[e.code]=t,e.code==="KeyW"&&i&&(this.sprintByDoubleTap=!0),(e.code==="Space"&&i||e.code==="KeyF")&&this.toggleFly(),e.code.startsWith("Digit")){const r=Number(e.code.slice(5));r>=1&&r<=9&&(this.slot=r-1)}}),document.addEventListener("keyup",e=>{this.keys.delete(e.code),e.code==="KeyW"&&(this.sprintByDoubleTap=!1)}),window.addEventListener("blur",()=>this.keys.clear()),this.control.addEventListener("unlock",()=>this.keys.clear())};initMouse=()=>{document.addEventListener("mousedown",e=>{!this.control.isLocked||!this.target||(e.button===0&&this.breakBlock(),e.button===2&&this.placeBlock())}),document.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("wheel",e=>{this.control.isLocked&&(this.slot=(this.slot+(e.deltaY>0?1:-1)+9)%9)},{passive:!0})};toggleFly=()=>{this.player.flying=!this.player.flying,this.player.velocity.y=0};readInput(){const e=this.keys,t=(i,r)=>(e.has(i)?1:0)-(e.has(r)?1:0);return{forward:t("KeyW","KeyS"),left:t("KeyA","KeyD"),jump:e.has("Space"),sneak:e.has("ShiftLeft")||e.has("ShiftRight"),sprint:e.has("KeyR")||this.sprintByDoubleTap,yaw:this.yaw}}breakBlock=()=>{const e=this.target,t=this.terrain.getBlock(e.x,e.y,e.z);t===null||!Et[an[t]].breakable||this.terrain.setBlock(e.x,e.y,e.z,Ve.air)};placeBlock=()=>{const e=this.target,t=e.x+e.nx,i=e.y+e.ny,r=e.z+e.nz,s=this.terrain.getBlock(t,i,r);if(s===null||s!==Ve.air&&!Gc(s))return;const a=this.player.body;if(oh(this.player.pos,a.width,a.height,(c,u,h)=>c===t&&u===i&&h===r?Vc:Bc))return;const o=Fo[this.slot],l=e.nx!==0?"x":e.ny!==0?"y":"z";this.terrain.setBlock(t,i,r,_1(o,"axis")!==void 0?ah(o,{axis:l}):o)};trySpawn=()=>{const e=this.terrain.info;if(!e)return!1;const t=this.resume;if(t)return this.teleport(t.x,t.y,t.z),this.head.rotation.set(t.pitch,t.yaw,0),this.player.flying=t.flying,!!this.terrain.getChunk(Math.floor(t.x),Math.floor(t.z))?.light;const{x:i,z:r}=this.spawnCenter;for(let s=0;s<=48;s+=4)for(let a=0;a<Math.max(1,s*2);a++){const o=a/Math.max(1,s*2)*Math.PI*2,l=i+Math.floor(Math.cos(o)*s),c=r+Math.floor(Math.sin(o)*s),u=/nether/.test(e.settings)?this.terrain.floorBelow(l,c,120):this.terrain.topSolidY(l,c);if(u===null){if(!this.terrain.getChunk(l,c))return!1;continue}if(u>=e.seaLevel||/end/.test(e.settings))return this.teleport(l+.5,u+1,c+.5),!0}return this.teleport(i+.5,e.seaLevel+10,r+.5),this.player.flying=!0,!0};resume=null;spawnCenter={x:0,z:0};get saveState(){const e=this.player.pos;return{x:e.x,y:e.y,z:e.z,yaw:this.head.rotation.y,pitch:this.head.rotation.x,flying:this.player.flying}}update=e=>{if(!this.spawned){this.spawned=this.trySpawn(),this.render(1);return}for(this.acc=Math.min(this.acc+e,ke.TICK*5);this.acc>=ke.TICK;)this.acc-=ke.TICK,this.tick();this.render(this.acc/ke.TICK),this.updateTarget()};tick(){const e=this.player;E1(e,this.readInput(),this.world),this.terrain.tick(),e.sprinting||(this.sprintByDoubleTap=!1),this.prevEye=this.eye,this.eye+=(e.body.eye-this.eye)*.5;let t=e.flying?1.1:1;t*=(e.speedAttribute/ke.WALK_SPEED+1)/2,this.prevFovMod=this.fovMod,this.fovMod+=(t-this.fovMod)*.5}render(e){const t=this.player,i=(a,o)=>a+(o-a)*e,r=i(this.prevEye,this.eye);if(this.camera.position.set(i(t.prevPos.x,t.pos.x),i(t.prevPos.y,t.pos.y)+r,i(t.prevPos.z,t.pos.z)),this.camera.quaternion.copy(this.head.quaternion),this.bobbing){const a=t.walkDist-t.prevWalkDist,o=-(t.walkDist+a*e)*Math.PI,l=i(t.prevBob,t.bob),c=Math.PI/180;this.camera.rotateX(-Math.abs(Math.cos(o-.2)*l)*5*c),this.camera.rotateZ(-Math.sin(o)*l*3*c),this.camera.translateX(-Math.sin(o)*l*.5),this.camera.translateY(Math.abs(Math.cos(o)*l))}let s=L1*i(this.prevFovMod,this.fovMod);t.underWater&&(s*=6/7),Math.abs(this.camera.fov-s)>.001&&(this.camera.fov=s,this.camera.updateProjectionMatrix())}updateTarget(){const e=this.player,t=new F(0,0,-1).applyQuaternion(this.head.quaternion),i=this.acc/ke.TICK,r=e.prevPos.x+(e.pos.x-e.prevPos.x)*i,s=e.prevPos.y+(e.pos.y-e.prevPos.y)*i+this.prevEye+(this.eye-this.prevEye)*i,a=e.prevPos.z+(e.pos.z-e.prevPos.z)*i;this.target=P1(r,s,a,t.x,t.y,t.z,this.reach,(o,l,c)=>{const u=this.terrain.getBlock(o,l,c);return u!==null&&u!==Ve.air&&!Gc(u)}),this.target?this.terrain.highlight.show(this.target.x,this.target.y,this.target.z):this.terrain.highlight.hide()}get facing(){const e=new F(0,0,-1).applyQuaternion(this.head.quaternion);return Math.abs(e.x)>Math.abs(e.z)?e.x>0?"east (+X)":"west (-X)":e.z>0?"south (+Z)":"north (-Z)"}}qe.enabled=!1;class Ys{camera=new Jt;scene=new Wu;renderer=new I0({antialias:!1});static SKY=10274047;constructor(){this.initScene(),this.initRenderer(),this.initCamera()}initCamera=()=>{this.camera.fov=70,this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.near=.05,this.camera.far=1e3,this.camera.updateProjectionMatrix(),this.camera.position.set(0,120,0),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()})};initScene=()=>{this.scene.fog=new Ko(Ys.SKY,40,80)};initRenderer=()=>{this.renderer.autoClear=!1,this.renderer.outputColorSpace=Fi,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight)})};viewBlocks=96;air={color:new Qe(Ys.SKY),near:57.6,far:96};medium="air";setFogDistance=e=>{this.viewBlocks=e,this.camera.far=e+64,this.camera.updateProjectionMatrix(),this.applyFog()};setAirFog=(e,t,i)=>{this.air.color.setRGB(...e),this.air.near=t,this.air.far=i,this.applyFog()};setMedium=e=>{e!==this.medium&&(this.medium=e,this.applyFog())};get fogColor(){return this.scene.fog.color}applyFog(){const e=this.scene.fog;this.medium==="water"?(e.color.setHex(2047887),e.near=2,e.far=Math.min(48,this.viewBlocks)):this.medium==="lava"?(e.color.setHex(10033664),e.near=.25,e.far=1.5):(e.color.copy(this.air.color),e.near=this.air.near,e.far=this.air.far)}}const I1=Math.fround,ts=Math.PI*2;function U1(n){return/nether/.test(n)?18e3:/end/.test(n)?6e3:null}function N1(n){const e=Y1(n/24e3-.25),t=.5-Math.cos(e*Math.PI)/2;return I1((e*2+t)/3)}const lh=n=>n*ts,F1=n=>(Math.floor(n/24e3)%8+8)%8;function O1(n){let e=1-(Math.cos(n*ts)*2+.2);return e=Pi(e,0,1),e=1-e,e*.8+.2}function ch(n){return Pi(Math.cos(n*ts)*2+.5,0,1)}function k1(n){const e=Pi(1-(Math.cos(n*ts)*2+.25),0,1);return e*e*.5}function uh(n){const e=Math.cos(n*ts);if(e<-.4||e>.4)return null;const t=e/.4*.5+.5;let i=1-(1-Math.sin(t*Math.PI))*.99;return i*=i,[t*.3+.7,t*t*.7+.2,.2,i]}const Yc=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],z1=n=>/nether/.test(n)?"nether":/end/.test(n)?"end":"overworld";function H1(n,e){const t=ch(e);return[n[0]*t,n[1]*t,n[2]*t]}function G1(n,e,t,i,r,s,a,o){const l=ch(i);let c;if(n==="overworld"?c=[e[0]*(l*.94+.06),e[1]*(l*.94+.06),e[2]*(l*.91+.09)]:n==="end"?c=[e[0]*.15,e[1]*.15,e[2]*.15]:c=[...e],s>=4&&n==="overworld"){const h=Math.sin(lh(i))>0?-1:1;let f=r[0]*h;f<0&&(f=0);const p=uh(i);if(f>0&&p){f*=p[3];for(let _=0;_<3;_++)c[_]=c[_]*(1-f)+p[_]*f}}if(n!=="nether"){let h=.25+.75*s/32;h=1-Math.pow(h,.25);for(let f=0;f<3;f++)c[f]+=(t[f]-c[f])*h}let u=(a-o)*(n==="overworld"?.03125:1);if(u<1){u<0&&(u=0),u*=u;for(let h=0;h<3;h++)c[h]*=u}return c}function V1(n,e=new Uint8Array(256*3)){const t=O1(n.t),i=t*.95+.05,r=[Mi(.35,t,1),Mi(.35,t,1),1],s=n.flicker+1.5,a=n.dim==="nether"?.1:0,o=n.dim==="end",l=c=>{const u=c/(4-3*c);return Mi(a,u,1)};for(let c=0;c<16;c++)for(let u=0;u<16;u++){const h=l(u/15)*s,f=l(c/15)*i;let p=[h,h*((h*.6+.4)*.6+.4),h*(h*h*.6+.4)];o?p=p.map((g,m)=>Pi(Mi(.25,g,[.99,1.12,1][m]),0,1)):(p=p.map((g,m)=>Mi(.04,g+r[m]*f,.75)),p=p.map(g=>Pi(g,0,1))),p=p.map(g=>Mi(n.gamma,g,1-Math.pow(1-g,4))),p=p.map(g=>Pi(Mi(.04,g,.75),0,1));const _=(c*16+u)*3;e[_]=Math.round(p[0]*255),e[_+1]=Math.round(p[1]*255),e[_+2]=Math.round(p[2]*255)}return e}function B1(n,e=Math.random){return n+=(e()-e())*e()*e()*.1,n*.9}function W1(n){const e=[];for(let t=0;t<1500;t++){const i=n.nextFloat()*2-1,r=n.nextFloat()*2-1,s=n.nextFloat()*2-1,a=.15+n.nextFloat()*.1,o=i*i+r*r+s*s;if(o<=.010000001||o>=1)continue;const l=Math.sqrt(o),c=[i/l*100,r/l*100,s/l*100],u=n.nextDouble()*Math.PI*2,h=$c([-c[0],-c[1],-c[2]]),f=$c(qc([0,1,0],h)),p=qc(h,f),_=Math.cos(-u),g=Math.sin(-u);for(const[m,d]of[[a,-a],[a,a],[-a,a],[-a,-a]]){const y=m*_-d*g,M=m*g+d*_;e.push(c[0]+f[0]*y+p[0]*M,c[1]+f[1]*y+p[1]*M,c[2]+f[2]*y+p[2]*M)}}return Float32Array.from(e)}function X1(n,e){if(n==="nether")return{start:e*.05,end:Math.min(e,192)*.5};const t=Pi(e/10,4,64);return{start:e-t,end:e}}const Y1=n=>n-Math.floor(n),Pi=(n,e,t)=>n<e?e:n>t?t:n,Mi=(n,e,t)=>e+n*(t-e),$c=n=>{const e=Math.hypot(n[0],n[1],n[2]);return[n[0]/e,n[1]/e,n[2]/e]},qc=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]];class $1{scene=new Wu;camera=new Jt(70,1,.1,1e3);fog=[.75,.85,1];biomeSky=Yc(7907327);biomeFog=Yc(12638463);gamma=.5;dim="overworld";flicker=0;dome;sunrise;celestial=new sr;sun;moon;stars;lm=new Uint8Array(256*3);constructor(){this.dome=new Lt(new Jo(500,32,16),new Rn({side:Ht,depthWrite:!1,depthTest:!1,uniforms:{skyColor:{value:new Qe},fogColor:{value:new Qe},renderDistance:{value:96},belowHorizon:{value:!1},end:{value:!1}},vertexShader:`
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
          }`})),this.dome.renderOrder=0,this.scene.add(this.dome);const e=new vn;e.setAttribute("position",new Ct(new Float32Array(54),3)),e.setAttribute("color",new Ct(new Float32Array(72),4));const t=[];for(let o=0;o<16;o++)t.push(0,o+1,o+2);e.setIndex(t),this.sunrise=new Lt(e,new Wr({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:rn})),this.sunrise.renderOrder=1,this.scene.add(this.sunrise);const i=o=>new Wr({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:rn,blending:fu,blendSrc:Gs,blendDst:du});this.sun=new Lt(new br(60,60),i(q1())),this.sun.position.set(0,100,0),this.sun.rotation.x=Math.PI/2,this.moon=new Lt(new br(40,40),i(j1())),this.moon.position.set(0,-100,0),this.moon.rotation.x=-Math.PI/2;const r=new vn,s=W1(new Ci(10842n));r.setAttribute("position",new Ct(s,3));const a=[];for(let o=0;o<s.length/12;o++)a.push(o*4,o*4+1,o*4+2,o*4+2,o*4+3,o*4);r.setIndex(a),this.stars=new Lt(r,i(null));for(const o of[this.sun,this.moon,this.stars])o.renderOrder=2,this.celestial.add(o);this.scene.add(this.celestial)}update(e,t,i,r){const s=N1(e),a=i*16;this.flicker=B1(this.flicker),V1({dim:this.dim,t:s,flicker:this.flicker,gamma:this.gamma},this.lm);const o=new F;t.getWorldDirection(o);const l=this.dim==="overworld"?H1(this.biomeSky,s):[0,0,0];this.fog=G1(this.dim,this.biomeFog,l,s,[o.x,o.y,o.z],i,t.position.y,r);const c=this.dome.material.uniforms;c.skyColor.value.setRGB(...l),c.fogColor.value.setRGB(...this.fog),c.renderDistance.value=a,c.belowHorizon.value=t.position.y<63,c.end.value=this.dim==="end";const u=this.dim==="overworld";this.dome.visible=this.dim!=="nether";const h=u?uh(s):null;if(this.sunrise.visible=h!==null,h){const y=this.sunrise.geometry.attributes.position,M=this.sunrise.geometry.attributes.color;y.setXYZ(0,0,100,0),M.setXYZW(0,h[0],h[1],h[2],h[3]);for(let R=0;R<=16;R++){const E=R*Math.PI*2/16;y.setXYZ(R+1,Math.sin(E)*120,Math.cos(E)*120,-Math.cos(E)*40*h[3]),M.setXYZW(R+1,h[0],h[1],h[2],0)}y.needsUpdate=!0,M.needsUpdate=!0;const x=Math.sin(lh(s))<0?Math.PI:0;this.sunrise.quaternion.setFromAxisAngle(new F(1,0,0),Math.PI/2).multiply(new Ii().setFromAxisAngle(new F(0,0,1),x)).multiply(new Ii().setFromAxisAngle(new F(0,0,1),Math.PI/2))}this.celestial.visible=u,this.celestial.rotation.set(s*Math.PI*2,-Math.PI/2,0,"YXZ");const f=F1(Math.floor(e)),p=this.moon.geometry.attributes.uv,_=f%4/4,g=f<4?.5:0;p.setXY(0,_,g+.5),p.setXY(1,_+.25,g+.5),p.setXY(2,_,g),p.setXY(3,_+.25,g),p.needsUpdate=!0;const m=k1(s);this.stars.visible=m>0,this.stars.material.color.setRGB(m,m,m),this.stars.material.opacity=m;const d=X1(this.dim,a);return{color:this.fog,start:d.start,end:d.end,lightmap:this.lm}}render(e,t,i,r){e.setClearColor(i,1),e.clear(),r&&(this.camera.fov=t.fov,this.camera.aspect=t.aspect,this.camera.updateProjectionMatrix(),t.getWorldQuaternion(this.camera.quaternion),e.render(this.scene,this.camera))}setDimension(e){this.dim=z1(e)}}function q1(){const e=new Uint8Array(4096);for(let t=0;t<32;t++)for(let i=0;i<32;i++){const r=Math.max(Math.abs(i-15.5),Math.abs(t-15.5)),s=(t*32+i)*4;let a=0;r<4?a=1:r<8&&(a=.3*(1-(r-4)/4)),e[s]=255*a,e[s+1]=255*a,e[s+2]=200*a,e[s+3]=255}return hh(e,32,32)}function j1(){const t=new Uint8Array(32768),i=[[12,12,2],[19,17,3],[13,20,1.5],[20,11,1.5]];for(let r=0;r<8;r++){const s=r%4*32,a=r<4?0:32,o=r<=4?1-r/4:(r-4)/4;for(let l=8;l<24;l++)for(let c=8;c<24;c++){const u=(c-8+.5)/16;if(!(r<=4?u>=1-o:u<=o))continue;let f=.85;for(const[_,g,m]of i)Math.hypot(c-_,l-g)<m&&(f=.6);const p=((a+l)*128+s+c)*4;t[p]=t[p+1]=255*f,t[p+2]=255*(f+.05>1?1:f+.05),t[p+3]=255}}return hh(t,128,64)}function hh(n,e,t){const i=new Uint8Array(n.length);for(let s=0;s<t;s++)i.set(n.subarray(s*e*4,(s+1)*e*4),(t-1-s)*e*4);const r=new Zo(i,e,t,zt);return r.magFilter=r.minFilter=Ot,r.needsUpdate=!0,r}class Ga{constructor(e,t,i){if(this.bits=e,this.size=t,e<1||e>32)throw new Error(`bits 必须在 1..32 之间：${e}`);this.valuesPerWord=Math.floor(32/e),this.mask=e===32?4294967295:(1<<e)-1;const r=Math.ceil(t/this.valuesPerWord);if(i&&i.length!==r)throw new Error(`数据长度不对：需要 ${r}，实际 ${i.length}`);this.data=i??new Uint32Array(r)}data;valuesPerWord;mask;get(e){const t=e/this.valuesPerWord|0,i=(e-t*this.valuesPerWord)*this.bits;return this.data[t]>>>i&this.mask}set(e,t){const i=e/this.valuesPerWord|0,r=(e-i*this.valuesPerWord)*this.bits;this.data[i]=this.data[i]&~(this.mask<<r)|(t&this.mask)<<r}}const On=4096,jc=4,tr=8;class Yr{constructor(e,t=0){this.globalBits=e,this.palette=[t],this.lookup.set(t,0)}bits=0;palette;lookup=new Map;storage=null;get(e){if(this.bits===0)return this.palette[0];const t=this.storage.get(e);return this.bits>tr?t:this.palette[t]}set(e,t){const i=this.get(e);if(i===t)return i;const r=this.idFor(t);return this.storage.set(e,r),i}idFor(e){if(this.bits>tr)return e;const t=this.lookup.get(e);if(t!==void 0&&this.bits>0)return t;const i=this.palette.length+(t===void 0?1:0),r=this.bits===0?1:1<<this.bits;return i>r&&this.resize(i),this.bits>tr?e:t!==void 0?t:(this.palette.push(e),this.lookup.set(e,this.palette.length-1),this.palette.length-1)}resize(e){const t=new Array(On);for(let s=0;s<On;s++)t[s]=this.get(s);const i=Math.ceil(Math.log2(e)),r=i<=tr?Math.max(jc,i):this.globalBits;if(this.bits=r,this.storage=new Ga(r,On),r>tr){this.palette=[],this.lookup.clear();for(let s=0;s<On;s++)this.storage.set(s,t[s])}else for(let s=0;s<On;s++)this.storage.set(s,this.lookup.get(t[s]))}static fromValues(e,t){const i=new Yr(t,e[0]),r=[],s=new Map;for(let l=0;l<On;l++)s.has(e[l])||(s.set(e[l],r.length),r.push(e[l]));if(r.length===1)return i;const a=Math.ceil(Math.log2(r.length)),o=a>tr;i.bits=o?t:Math.max(jc,a),i.storage=new Ga(i.bits,On),i.palette=o?[]:r,i.lookup=o?new Map:s;for(let l=0;l<On;l++)i.storage.set(l,o?e[l]:s.get(e[l]));return i}toData(){return{bits:this.bits,palette:this.palette.slice(),data:this.storage?.data??null}}static fromData(e,t){const i=new Yr(t,e.palette[0]??0);return i.bits=e.bits,i.palette=e.palette,i.lookup=new Map(e.palette.map((r,s)=>[r,s])),i.storage=e.bits===0?null:new Ga(e.bits,On,e.data),i}get isSingle(){return this.bits===0}get byteSize(){return(this.storage?.data.byteLength??0)+this.palette.length}}class hr{constructor(e=new Yr(Hc,Ve.air)){this.blocks=e,this.recount()}nonAir=0;static index(e,t,i){return(t*16+i)*16+e}get(e,t,i){return this.blocks.get(hr.index(e,t,i))}set(e,t,i,r){const s=this.blocks.set(hr.index(e,t,i),r);s===Ve.air&&r!==Ve.air?this.nonAir++:s!==Ve.air&&r===Ve.air&&this.nonAir--}get isEmpty(){return this.nonAir===0}recount(){const e=this.blocks;if(e.isSingle){this.nonAir=e.palette[0]===Ve.air?0:4096;return}let t=0;for(let i=0;i<4096;i++)e.get(i)!==Ve.air&&t++;this.nonAir=t}static fromData(e){return new hr(Yr.fromData(e,Hc))}}const Rt=16;class Kc{constructor(e,t,i,r,s,a){this.cx=e,this.cz=t,this.minY=i,this.height=r;const o=r>>4;this.sections=s??Array.from({length:o},()=>new hr),a?this.flat=a:(this.flat=new Uint16Array(r*256),this.sections.forEach((l,c)=>{for(let u=0;u<4096;u++)this.flat[c*4096+u]=l.blocks.get(u)})),this.meshes=new Array(o).fill(null),this.waterMeshes=new Array(o).fill(null)}sections;meshes;waterMeshes;staleSections=new Set;flat;light=null;lighting=!1;version=0;sectionIndex(e){return e-this.minY>>4}static index(e,t,i,r){return((t-r)*Rt+i)*Rt+e}get(e,t,i){return t<this.minY||t>=this.minY+this.height?Ve.air:this.flat[((t-this.minY)*16+i)*16+e]}set(e,t,i,r){if(t<this.minY||t>=this.minY+this.height)return;const s=t-this.minY;this.sections[s>>4].set(e,s&15,i,r),this.flat[(s*16+i)*16+e]=r,this.version++}setRaw(e,t){this.flat[e]=t,this.sections[e>>12].blocks.set(e&4095,t)}lightIndex(e,t,i){return((t-this.minY)*18+i+1)*18+e+1}get byteSize(){let e=0;for(const t of this.sections)e+=t.blocks.byteSize;return e}disposeSection(e,t){for(const i of[this.meshes,this.waterMeshes]){const r=i[t];r&&(e.remove(r),r.geometry.dispose(),i[t]=null)}}dispose(e){for(let t=0;t<this.sections.length;t++)this.disposeSection(e,t)}}const Or={[Ze.water]:{tickDelay:5,dropOff:1,slopeFindDistance:4,convertToSource:!0},[Ze.lava]:{tickDelay:30,dropOff:2,slopeFindDistance:2,convertToSource:!1}},Va=sn[Ve.air],Cs=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];class K1{constructor(e){this.world=e}time=0;queue=new Map;pending=new Set;maxPerTick=4e3;lastProcessed=0;get queued(){return this.pending.size}clear(){this.queue.clear(),this.pending.clear()}fluidAt(e,t,i){const r=this.world.get(e,t,i);return r===null?Va:sn[r]}blocked(e,t,i){const r=this.world.get(e,t,i);return r===null||Dt[r]===1}schedule(e,t,i,r,s=Or[r].tickDelay){const a=`${e},${t},${i},${r}`;if(this.pending.has(a))return;this.pending.add(a);const o=this.time+Math.max(1,s);let l=this.queue.get(o);l||this.queue.set(o,l=[]),l.push({x:e,y:t,z:i,kind:r})}blockChanged(e,t,i){this.notify(e,t,i);for(const[r,s,a]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])this.notify(e+r,t+s,i+a)}notify(e,t,i){const r=this.fluidAt(e,t,i);r.kind!==Ze.none&&(r.kind===Ze.lava&&this.solidifyLava(e,t,i,r)||this.schedule(e,t,i,r.kind))}solidifyLava(e,t,i,r){for(const[s,a,o]of[[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]])if(this.fluidAt(e+s,t+a,i+o).kind===Ze.water)return this.setAndUpdate(e,t,i,r.source?Ve.obsidian:Ve.cobblestone),!0;return!1}setAndUpdate(e,t,i,r){this.world.set(e,t,i,r),this.blockChanged(e,t,i)}tick(){this.time++;let e=0;for(const t of[...this.queue.keys()].sort((i,r)=>i-r)){if(t>this.time)break;const i=this.queue.get(t);for(;i.length>0&&e<this.maxPerTick;){const r=i.shift();this.pending.delete(`${r.x},${r.y},${r.z},${r.kind}`),e++,this.tickFluid(r)}if(i.length===0&&this.queue.delete(t),e>=this.maxPerTick)break}this.lastProcessed=e}tickFluid({x:e,y:t,z:i,kind:r}){if(this.world.get(e,t,i)===null)return;let s=this.fluidAt(e,t,i);if(s.kind===r){if(!s.source){const a=this.getNewLiquid(e,t,i,r),o=this.spreadDelay(e,t,i,s,a);a.kind===Ze.none?(s=a,this.setAndUpdate(e,t,i,Ve.air)):(a.amount!==s.amount||a.falling!==s.falling||a.source!==s.source)&&(s=a,this.world.set(e,t,i,Ai(r,a.amount,a.falling)),this.schedule(e,t,i,r,o),this.blockChanged(e,t,i))}this.spread(e,t,i,s)}}spreadDelay(e,t,i,r,s){const a=r.kind;let o=Or[a].tickDelay;return a===Ze.lava&&r.kind!==Ze.none&&s.kind!==Ze.none&&!r.falling&&!s.falling&&this.height(e,t,i,s)>this.height(e,t,i,r)&&Math.random()<.75&&(o*=4),o}height(e,t,i,r){return this.fluidAt(e,t+1,i).kind===r.kind?1:r.amount/9}getNewLiquid(e,t,i,r){if(this.blocked(e,t,i))return Va;const s=Or[r];let a=0,o=0;for(const[c,,u]of Cs){if(this.blocked(e+c,t,i+u))continue;const h=this.fluidAt(e+c,t,i+u);h.kind===r&&(h.source&&o++,a=Math.max(a,h.amount))}if(s.convertToSource&&o>=2){const c=this.world.get(e,t-1,i),u=this.fluidAt(e,t-1,i);if(c!==null&&Dt[c]||u.kind===r&&u.source)return sn[Ai(r,8)]}if(this.fluidAt(e,t+1,i).kind===r&&!this.blocked(e,t+1,i))return sn[Ai(r,8,!0)];const l=a-s.dropOff;return l<=0?Va:sn[Ai(r,l)]}spread(e,t,i,r){if(r.kind===Ze.none)return;const s=r.kind,a=this.getNewLiquid(e,t-1,i,s);this.canSpreadTo(e,t-1,i,"down",a.kind)?(this.spreadTo(e,t-1,i,"down",a),this.sourceNeighborCount(e,t,i,s)>=3&&this.spreadToSides(e,t,i,r)):(r.source||!this.isHole(e,t,i))&&this.spreadToSides(e,t,i,r)}spreadToSides(e,t,i,r){const s=r.kind;let a=r.amount-Or[s].dropOff;if(r.falling&&(a=7),!(a<=0))for(const[o,l,c]of this.getSpread(e,t,i,s))this.canSpreadTo(e+o,t,i+l,"side",c.kind)&&this.spreadTo(e+o,t,i+l,"side",c)}getSpread(e,t,i,r){let s=1e3,a=[];for(const[o,,l]of Cs){const c=e+o,u=i+l,h=this.getNewLiquid(c,t,u,r);if(!this.canPassThrough(c,t,u,r))continue;const f=this.isHole(c,t,u)?0:this.slopeDistance(c,t,u,1,-o,-l,r);f<s&&(a=[]),f<=s&&(a.push([o,l,h]),s=f)}return a}slopeDistance(e,t,i,r,s,a,o){let l=1e3;for(const[c,,u]of Cs){if(c===s&&u===a)continue;const h=e+c,f=i+u;if(this.canPassThrough(h,t,f,o)){if(this.isHole(h,t,f))return r;r<Or[o].slopeFindDistance&&(l=Math.min(l,this.slopeDistance(h,t,f,r+1,-c,-u,o)))}}return l}isHole(e,t,i){return!this.blocked(e,t-1,i)}canPassThrough(e,t,i,r){if(this.blocked(e,t,i))return!1;const s=this.fluidAt(e,t,i);return!(s.kind===r&&s.source)}sourceNeighborCount(e,t,i,r){let s=0;for(const[a,,o]of Cs){const l=this.fluidAt(e+a,t,i+o);l.kind===r&&l.source&&s++}return s}canSpreadTo(e,t,i,r,s){if(this.blocked(e,t,i)||s===Ze.none)return!1;const a=this.fluidAt(e,t,i);return a.kind===Ze.none?!0:a.kind===Ze.water?r==="down"&&s===Ze.lava:s===Ze.water&&this.height(e,t,i,a)>=.44444445}spreadTo(e,t,i,r,s){if(r==="down"&&s.kind===Ze.lava&&this.fluidAt(e,t,i).kind===Ze.water){this.setAndUpdate(e,t,i,Ve.stone);return}this.setAndUpdate(e,t,i,Ai(s.kind,s.amount,s.falling))}}const Ps=.02,Zc=1.002;class Z1{mesh=new sr;constructor(e){const t=new Wr({color:0,transparent:!0,opacity:.55}),i=Zc/2;for(const r of[0,1,2]){const s=[Ps,Ps,Ps];s[r]=Zc+Ps;const a=new Er(s[0],s[1],s[2]);for(const o of[-i,i])for(const l of[-i,i]){const c=[o,l];c.splice(r,0,0);const u=new Lt(a,t);u.position.set(c[0],c[1],c[2]),this.mesh.add(u)}}this.mesh.visible=!1,e.add(this.mesh)}show(e,t,i){this.mesh.position.set(e+.5,t+.5,i+.5),this.mesh.visible=!0}hide(){this.mesh.visible=!1}}function Jc(n){const e=nh();let t=e,i=ea;n&&(t=new Uint8Array(e.length+n.length),t.set(e),t.set(n,e.length),i+=n.length/(pe*pe*4));const r=new qo(t,pe,pe,i);return r.format=zt,r.type=on,r.wrapS=r.wrapT=Vs,r.magFilter=Ot,r.minFilter=Hr,r.generateMipmaps=!0,r.needsUpdate=!0,r}const J1={"minecraft:air":[0,0],"minecraft:stone":[15,0],"minecraft:deepslate":[15,0],"minecraft:dirt":[15,0],"minecraft:grass_block":[15,0],"minecraft:sand":[15,0],"minecraft:gravel":[15,0],"minecraft:water":[1,0],"minecraft:bedrock":[15,0],"minecraft:oak_planks":[15,0],"minecraft:cobblestone":[15,0],"minecraft:oak_log":[15,0],"minecraft:oak_leaves":[1,0],"minecraft:glowstone":[15,15],"minecraft:obsidian":[15,0],"minecraft:lava":[1,15],"minecraft:sandstone":[15,0],"minecraft:red_sand":[15,0],"minecraft:red_sandstone":[15,0],"minecraft:snow_block":[15,0],"minecraft:powder_snow":[1,0],"minecraft:ice":[1,0],"minecraft:packed_ice":[15,0],"minecraft:mud":[15,0],"minecraft:mycelium":[15,0],"minecraft:podzol":[15,0],"minecraft:coarse_dirt":[15,0],"minecraft:calcite":[15,0],"minecraft:terracotta":[15,0],"minecraft:white_terracotta":[15,0],"minecraft:orange_terracotta":[15,0],"minecraft:yellow_terracotta":[15,0],"minecraft:brown_terracotta":[15,0],"minecraft:red_terracotta":[15,0],"minecraft:light_gray_terracotta":[15,0],"minecraft:granite":[15,0],"minecraft:diorite":[15,0],"minecraft:andesite":[15,0],"minecraft:tuff":[15,0],"minecraft:clay":[15,0],"minecraft:infested_stone":[15,0],"minecraft:infested_deepslate":[15,0],"minecraft:coal_ore":[15,0],"minecraft:deepslate_coal_ore":[15,0],"minecraft:iron_ore":[15,0],"minecraft:deepslate_iron_ore":[15,0],"minecraft:copper_ore":[15,0],"minecraft:deepslate_copper_ore":[15,0],"minecraft:gold_ore":[15,0],"minecraft:deepslate_gold_ore":[15,0],"minecraft:redstone_ore":[[15,9],[15,0]],"minecraft:deepslate_redstone_ore":[[15,9],[15,0]],"minecraft:emerald_ore":[15,0],"minecraft:deepslate_emerald_ore":[15,0],"minecraft:lapis_ore":[15,0],"minecraft:deepslate_lapis_ore":[15,0],"minecraft:diamond_ore":[15,0],"minecraft:deepslate_diamond_ore":[15,0],"minecraft:raw_iron_block":[15,0],"minecraft:raw_copper_block":[15,0],"minecraft:spruce_log":[15,0],"minecraft:birch_log":[15,0],"minecraft:jungle_log":[15,0],"minecraft:acacia_log":[15,0],"minecraft:dark_oak_log":[15,0],"minecraft:mangrove_log":[15,0],"minecraft:cherry_log":[15,0],"minecraft:pale_oak_log":[15,0],"minecraft:spruce_leaves":[1,0],"minecraft:birch_leaves":[1,0],"minecraft:jungle_leaves":[1,0],"minecraft:acacia_leaves":[1,0],"minecraft:dark_oak_leaves":[1,0],"minecraft:mangrove_leaves":[1,0],"minecraft:cherry_leaves":[1,0],"minecraft:pale_oak_leaves":[1,0],"minecraft:azalea_leaves":[1,0],"minecraft:flowering_azalea_leaves":[1,0],"minecraft:mushroom_stem":[15,0],"minecraft:red_mushroom_block":[15,0],"minecraft:brown_mushroom_block":[15,0],"minecraft:mangrove_roots":[1,0],"minecraft:muddy_mangrove_roots":[15,0],"minecraft:rooted_dirt":[15,0],"minecraft:bee_nest":[15,0],"minecraft:creaking_heart":[15,0],"minecraft:snow":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[15,0]],"minecraft:moss_carpet":[0,0],"minecraft:pale_moss_carpet":[0,0],"minecraft:vine":[0,0],"minecraft:cocoa":[0,0],"minecraft:pale_hanging_moss":[0,0],"minecraft:mangrove_propagule":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:short_grass":[0,0],"minecraft:fern":[0,0],"minecraft:tall_grass":[0,0],"minecraft:large_fern":[0,0],"minecraft:dead_bush":[0,0],"minecraft:dandelion":[0,0],"minecraft:poppy":[0,0],"minecraft:blue_orchid":[0,0],"minecraft:allium":[0,0],"minecraft:azure_bluet":[0,0],"minecraft:red_tulip":[0,0],"minecraft:orange_tulip":[0,0],"minecraft:white_tulip":[0,0],"minecraft:pink_tulip":[0,0],"minecraft:oxeye_daisy":[0,0],"minecraft:cornflower":[0,0],"minecraft:lily_of_the_valley":[0,0],"minecraft:closed_eyeblossom":[0,0],"minecraft:open_eyeblossom":[0,0],"minecraft:sunflower":[0,0],"minecraft:lilac":[0,0],"minecraft:rose_bush":[0,0],"minecraft:peony":[0,0],"minecraft:brown_mushroom":[0,1],"minecraft:red_mushroom":[0,0],"minecraft:sweet_berry_bush":[0,0],"minecraft:sugar_cane":[0,0],"minecraft:bamboo":[0,0],"minecraft:azalea":[0,0],"minecraft:flowering_azalea":[0,0],"minecraft:pink_petals":[0,0],"minecraft:lily_pad":[0,0],"minecraft:pumpkin":[15,0],"minecraft:melon":[15,0],"minecraft:cactus":[0,0],"minecraft:seagrass":[1,0],"minecraft:tall_seagrass":[1,0],"minecraft:kelp":[1,0],"minecraft:kelp_plant":[1,0],"minecraft:sea_pickle":[[1,6],[1,9],[1,12],[1,15]],"minecraft:glow_lichen":[[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,0],[0,7],[0,0]],"minecraft:hanging_roots":[[1,0],[0,0]],"minecraft:spore_blossom":[0,0],"minecraft:cave_vines":[[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0]],"minecraft:cave_vines_plant":[[0,14],[0,0]],"minecraft:small_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf_stem":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:moss_block":[15,0],"minecraft:pale_moss_block":[15,0],"minecraft:dripstone_block":[15,0],"minecraft:pointed_dripstone":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:smooth_basalt":[15,0],"minecraft:amethyst_block":[15,0],"minecraft:budding_amethyst":[15,0],"minecraft:small_amethyst_bud":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:medium_amethyst_bud":[[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2]],"minecraft:large_amethyst_bud":[[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4]],"minecraft:amethyst_cluster":[[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5]],"minecraft:sculk":[15,0],"minecraft:sculk_vein":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[1,0]],"minecraft:sculk_sensor":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:sculk_shrieker":[1,0],"minecraft:sculk_catalyst":[15,6],"minecraft:blue_ice":[15,0],"minecraft:mossy_cobblestone":[15,0],"minecraft:magma_block":[15,3],"minecraft:spawner":[1,0],"minecraft:chest":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:bone_block":[15,0],"minecraft:suspicious_sand":[15,0],"minecraft:suspicious_gravel":[15,0],"minecraft:sandstone_slab":[[1,0],[0,0],[1,0],[0,0],[15,0],[15,0]],"minecraft:tube_coral_block":[15,0],"minecraft:tube_coral":[1,0],"minecraft:tube_coral_fan":[1,0],"minecraft:tube_coral_wall_fan":[1,0],"minecraft:brain_coral_block":[15,0],"minecraft:brain_coral":[1,0],"minecraft:brain_coral_fan":[1,0],"minecraft:brain_coral_wall_fan":[1,0],"minecraft:bubble_coral_block":[15,0],"minecraft:bubble_coral":[1,0],"minecraft:bubble_coral_fan":[1,0],"minecraft:bubble_coral_wall_fan":[1,0],"minecraft:fire_coral_block":[15,0],"minecraft:fire_coral":[1,0],"minecraft:fire_coral_fan":[1,0],"minecraft:fire_coral_wall_fan":[1,0],"minecraft:horn_coral_block":[15,0],"minecraft:horn_coral":[1,0],"minecraft:horn_coral_fan":[1,0],"minecraft:horn_coral_wall_fan":[1,0],"minecraft:netherrack":[15,0],"minecraft:soul_sand":[15,0],"minecraft:soul_soil":[15,0],"minecraft:basalt":[15,0],"minecraft:blackstone":[15,0],"minecraft:nether_gold_ore":[15,0],"minecraft:nether_quartz_ore":[15,0],"minecraft:ancient_debris":[15,0],"minecraft:crimson_nylium":[15,0],"minecraft:warped_nylium":[15,0],"minecraft:crimson_stem":[15,0],"minecraft:warped_stem":[15,0],"minecraft:nether_wart_block":[15,0],"minecraft:warped_wart_block":[15,0],"minecraft:shroomlight":[15,15],"minecraft:crimson_fungus":[0,0],"minecraft:warped_fungus":[0,0],"minecraft:crimson_roots":[0,0],"minecraft:warped_roots":[0,0],"minecraft:nether_sprouts":[0,0],"minecraft:weeping_vines":[0,0],"minecraft:weeping_vines_plant":[0,0],"minecraft:twisting_vines":[0,0],"minecraft:twisting_vines_plant":[0,0],"minecraft:fire":[0,15],"minecraft:soul_fire":[0,10],"minecraft:end_stone":[15,0],"minecraft:chorus_plant":[1,0],"minecraft:chorus_flower":[1,0],"minecraft:end_gateway":[1,15],"minecraft:iron_bars":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0]],"minecraft:bubble_column":[1,0]},Ui=new Uint8Array(gt).fill(15),Yt=new Uint8Array(gt);for(let n=0;n<gt;n++){const e=J1[g1[n]??""];if(!e)continue;const t=Array.isArray(e[0])?e[ln.indexOf[n]]:e;Ui[n]=t[0],Yt[n]=t[1]}const Sr=new Uint8Array(gt);for(let n=0;n<gt;n++)/^minecraft:snow(\[layers=[1-7]\])?$|_slab\[type=bottom|^minecraft:(calibrated_)?sculk_sensor|^minecraft:sculk_shrieker/.test(tl(n))&&(Sr[n]=1);function Q1(n,e,t,i=Ui,r=Sr){let s=t-1;for(;s>=0&&i[n[e(s)]]===0&&(s===t-1||!r[n[e(s+1)]]);)s--;return s+1}const Ls=18;function ex(n,e,t,i,r){for(let a=-1;a<=16;a++){const o=t*16+a,l=(a+1)*18*18;o<0?r.fill(0,l,l+324):o>=e?r.fill(i?15:0,l,l+324):r.set(n.subarray(o*Ls*Ls,(o+1)*Ls*Ls),l)}}const fh=["west","east","down","up","north","south"],Qc=Object.fromEntries(fh.map((n,e)=>[n,e])),zs=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],ni=n=>n.includes(":")?n.slice(n.indexOf(":")+1):n;function tx(n,e,t){const i=ni(e);if(t.has(i))return t.get(i);t.set(i,null);const r=[];let s=i;for(;s&&r.length<32;){const u=n.model(s);if(!u)break;r.push(u),s=u.parent?ni(u.parent):void 0}if(r.length===0)return null;const a={};for(let u=r.length-1;u>=0;u--)Object.assign(a,r[u].textures);const o=r.find(u=>u.elements)?.elements??[],l=r.find(u=>u.ambientocclusion!==void 0)?.ambientocclusion??!0,c={elements:o,textures:a,ao:l};return t.set(i,c),c}function nx(n,e){let t=e;for(let i=0;i<16&&t.startsWith("#");i++){const r=n[t.slice(1)];if(r===void 0)return null;t=r}return t.startsWith("#")?null:ni(t)}const eu={down:[[0,0,1],[0,0,0],[1,0,0],[1,0,1]],up:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]],north:[[1,1,0],[1,0,0],[0,0,0],[0,1,0]],south:[[0,1,1],[0,0,1],[1,0,1],[1,1,1]],west:[[0,1,0],[0,0,0],[0,0,1],[0,1,1]],east:[[1,1,1],[1,0,1],[1,0,0],[1,1,0]]};function Ba(n,e){const[t,i,r]=e;switch(n){case"down":return[t,16-r];case"up":return[t,r];case"north":return[16-t,16-i];case"south":return[t,16-i];case"west":return[r,16-i];default:return[16-r,16-i]}}function $r(n,e,t){const i=t*Math.PI/180,r=u=>Math.abs(u-Math.round(u))<1e-9?Math.round(u):u,s=r(Math.cos(i)),a=r(Math.sin(i)),[o,l,c]=n;return e==="x"?[o,l*s-c*a,l*a+c*s]:e==="y"?[o*s+c*a,l,-o*a+c*s]:[o*s-l*a,o*a+l*s,c]}function ix(n,e,t){let i=[n[0]-.5,n[1]-.5,n[2]-.5];return e&&(i=$r(i,"x",-e)),t&&(i=$r(i,"y",-t)),[i[0]+.5,i[1]+.5,i[2]+.5]}function rx(n,e,t){let i=zs[n];return e&&(i=$r(i,"x",-e)),t&&(i=$r(i,"y",-t)),dh(i)}function dh(n){let e=0,t=-1/0;for(let i=0;i<6;i++){const r=n[0]*zs[i][0]+n[1]*zs[i][1]+n[2]*zs[i][2];r>t+1e-6&&(t=r,e=i)}return e}const sx=1/Math.cos(Math.PI/8)-1,ax=1/Math.cos(Math.PI/4)-1;function ox(n,e,t,i){const r=tx(n,e.model,t);if(!r)return[];const s=e.x??0,a=e.y??0,o=[];for(const l of r.elements){const c=l.from,u=l.to;for(const[h,f]of Object.entries(l.faces)){const p=nx(r.textures,f.texture);if(!p||!eu[h])continue;const _=eu[h].map(R=>[R[0]?u[0]:c[0],R[1]?u[1]:c[1],R[2]?u[2]:c[2]]),g=f.uv??(()=>{const R=Ba(h,c),E=Ba(h,u);return[Math.min(R[0],E[0]),Math.min(R[1],E[1]),Math.max(R[0],E[0]),Math.max(R[1],E[1])]})(),m=(f.rotation??0)/90|0;let d=_.map((R,E)=>{const T=(E+m)%4;return[g[T===0||T===1?0:2],g[T===0||T===3?1:3]]}),y=_.map(R=>[R[0]/16,R[1]/16,R[2]/16]);if(l.rotation&&l.rotation.angle){const{origin:R,axis:E,angle:T,rescale:P}=l.rotation,w=[R[0]/16,R[1]/16,R[2]/16],b=P?(Math.abs(T)===22.5?sx:ax)+1:1,C=[E==="x"?1:b,E==="y"?1:b,E==="z"?1:b];y=y.map(H=>{const N=$r([H[0]-w[0],H[1]-w[1],H[2]-w[2]],E,T);return[N[0]*C[0]+w[0],N[1]*C[1]+w[1],N[2]*C[2]+w[2]]})}y=y.map(R=>ix(R,s,a));const M=dh(lx(y));if(e.uvlock&&(s||a)){const R=fh[M];d=y.map(E=>Ba(R,[E[0]*16,E[1]*16,E[2]*16]));for(const E of[0,1]){const T=Math.floor(Math.min(...d.map(P=>P[E]))/16+1e-6)*16;for(const P of d)P[E]-=T}}const x=f.cullface&&Qc[f.cullface==="bottom"?"down":f.cullface]!==void 0?rx(Qc[f.cullface==="bottom"?"down":f.cullface],s,a):-1;o.push({pos:y.flatMap(R=>R.map(Wa)),uv:d.flatMap(R=>[Wa(R[0]/16),Wa(R[1]/16)]),tex:i(p),face:M,cull:x,tint:f.tintindex??-1,shade:l.shade??!0,ao:r.ao})}}return o}const Wa=n=>{const e=Math.round(n*4096)/4096;return Object.is(e,-0)?0:e};function lx(n){const e=[n[1][0]-n[0][0],n[1][1]-n[0][1],n[1][2]-n[0][2]],t=[n[2][0]-n[0][0],n[2][1]-n[0][1],n[2][2]-n[0][2]];let i=[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]];if(Math.hypot(...i)<1e-9){const r=[n[3][0]-n[0][0],n[3][1]-n[0][1],n[3][2]-n[0][2]];i=[t[1]*r[2]-t[2]*r[1],t[2]*r[0]-t[0]*r[2],t[0]*r[1]-t[1]*r[0]]}return i}function ko(n,e){return n?"OR"in n?n.OR.some(t=>ko(t,e)):"AND"in n?n.AND.every(t=>ko(t,e)):Object.entries(n).every(([t,i])=>String(i).split("|").includes(e[t])):!0}function cx(n,e){return n===""||n==="normal"?!0:n.split(",").every(t=>{const[i,r]=t.split("=");return e[i]===r})}function ux(n,e){const t=Array.isArray(n)?n:[n];return{weights:t.map(i=>i.weight??1),choices:t.map(e)}}function hx(n,e){const t=[],i=new Map,r=h=>{let f=i.get(h);return f===void 0&&(f=t.length,t.push(h),i.set(h,f)),f},s=new Map,a=new Map,o=h=>{const f=`${ni(h.model)}|${h.x??0}|${h.y??0}|${h.uvlock?1:0}`;let p=a.get(f);return p||a.set(f,p=ox(n,h,s,r)),p},l=new Map,c=h=>{let f=l.get(h);return f||l.set(h,f=ux(h,o)),f},u=e.map(h=>{if(!h)return null;const f=n.blockstate(h.name);if(!f)return null;let p=[];if(f.variants){const _=Object.keys(f.variants).find(g=>cx(g,h.props));_!==void 0&&(p=[c(f.variants[_])])}else f.multipart&&(p=f.multipart.filter(_=>ko(_.when,h.props)).map(_=>c(_.apply)));return p.some(_=>_.choices.some(g=>g.length>0))?p:null});return{textures:t,states:u}}let ui=null;const rl=ea,ph=32,fx=64,ta=128,mh=[6396257,8431445,2129968],dx=/^(grass_block|short_grass|tall_grass|fern|large_fern|potted_fern|sugar_cane|pink_petals)$/,px=/^(oak_leaves|jungle_leaves|acacia_leaves|dark_oak_leaves|mangrove_leaves|vine)$/,mx=/^(water|bubble_column|water_cauldron)$/,tu={spruce_leaves:4,birch_leaves:5,lily_pad:6},_x=/^(ice|frosted_ice|.*stained_glass(_pane)?|tinted_glass|slime_block|honey_block|nether_portal|water|bubble_column)$/,gx=/leaves$|glass|^ice$|frosted_ice|mangrove_roots|spawner|slime_block|honey_block|^chest$|end_gateway|cactus|chorus/,vx=/glass$|^ice$|frosted_ice|slime_block|honey_block/,qr=new Uint8Array(gt),jr=new Uint8Array(gt),_h=new Uint8Array(gt),gh=new Uint8Array(gt),vh=new Float32Array(gt),Ni=[],zo=new Map;function xh(n){const e=n.join(",");let t=zo.get(e);return t===void 0&&(t=Ni.length+1,Ni.push(n),zo.set(e,t)),t}let ar=[];const Kr=new Int32Array(gt*6);function bh(n){const e=ih[n],t=e&3,i=(e&4)!==0;return t|(i?ph:t?fx:0)}const Mh=n=>(Cn[an[n]]??"").replace(/^minecraft:/,"");function Sh(n,e,t){const i=Mh(n);let r=0;return e>=0&&(dx.test(i)?r=1:px.test(i)?r=2:mx.test(i)?r=3:tu[i]&&(r=tu[i])),r|ph|(_x.test(i)||/water_(still|flow)/.test(t)?ta:0)}const xx=/^(dandelion|poppy|blue_orchid|allium|azure_bluet|.*_tulip|oxeye_daisy|cornflower|lily_of_the_valley|wither_rose|torchflower|open_eyeblossom|closed_eyeblossom|sunflower|lilac|rose_bush|peony|tall_grass|large_fern|crimson_roots|warped_roots|nether_sprouts|mangrove_propagule|bamboo_sapling|bamboo|pointed_dripstone|hanging_roots)$/,bx=/^(short_grass|fern|small_dripleaf)$/;function wh(n){ui=n,Ni.length=0,zo.clear(),ar=new Array(gt).fill(null);for(let e=0;e<gt;e++){const t=Mh(e),i=n?.states[e]??null;qr[e]=i?1:0,_h[e]=n&&vx.test(t)?1:0,gh[e]=n?bx.test(t)?2:xx.test(t)?1:0:0,vh[e]=/^(pointed_dripstone|bamboo)$/.test(t)?.125:.25;for(let r=0;r<6;r++){const s=b1[e*6+r];Kr[e*6+r]=xh([s,bh(s),1,0,0,1,0,0])}jr[e]=Dt[e],qr[e]&&(i.length===1&&(ar[e]=i[0].choices.map(r=>Mx(e,r))),jr[e]=Dt[e]&&!gx.test(t)&&ar[e]!==null&&ar[e].every(r=>r.faces.every(s=>s>0))?1:0)}}function Mx(n,e){const t=new Int32Array(6),i=new Int32Array(6);for(const s of e)i[s.face]++;const r=[];for(const s of e){const a=i[s.face]===1&&s.cull===s.face&&s.shade&&s.ao?Sx(n,s):null;a?t[s.face]=xh(a):r.push(s)}return{faces:t,rest:r}}function Sx(n,e){const t=e.face>>1,i=e.face&1?1:0;for(let f=0;f<4;f++){if(e.pos[f*3+t]!==i)return null;for(let p=0;p<3;p++)if(p!==t&&e.pos[f*3+p]!==0&&e.pos[f*3+p]!==1)return null}const r=[0,1,2,3].map(f=>sl(e.face,e.pos[f*3],e.pos[f*3+1],e.pos[f*3+2])),s=[0,1,2,3].map(f=>[e.uv[f*2],e.uv[f*2+1]]),a=[r[1][0]-r[0][0],r[1][1]-r[0][1]],o=[r[3][0]-r[0][0],r[3][1]-r[0][1]],l=a[0]*o[1]-a[1]*o[0];if(Math.abs(l)<1e-9)return null;const c=[0,0,0,0];for(const f of[0,1]){const p=s[1][f]-s[0][f],_=s[3][f]-s[0][f];c[f*2]=(p*o[1]-_*a[1])/l,c[f*2+1]=(a[0]*_-o[0]*p)/l}if(!c.every(f=>f===0||f===1||f===-1))return null;const u=[s[0][0]-c[0]*r[0][0]-c[1]*r[0][1],s[0][1]-c[2]*r[0][0]-c[3]*r[0][1]];for(let f=0;f<4;f++)for(const p of[0,1])if(Math.abs(c[p*2]*r[f][0]+c[p*2+1]*r[f][1]+u[p]-s[f][p])>1e-6)return null;if(!u.every(f=>Math.abs(f-Math.round(f))<1e-6))return null;const h=ui.textures[e.tex];return[rl+e.tex,Sh(n,e.tint,h),c[0],c[1],c[2],c[3],Math.round(u[0]),Math.round(u[1])]}function sl(n,e,t,i){switch(n){case 0:return[i,-t];case 1:return[-i,-t];case 2:return[e,-i];case 3:return[e,i];case 4:return[-e,-t];default:return[e,-t]}}function wx(n){const e=n===Ze.water?"block/water_still":"block/lava_still",t=ui?ui.textures.indexOf(e):-1;if(t<0){const i=n===Ze.water?te.water:te.lava;return{layer:i,tint:bh(i)}}return{layer:rl+t,tint:n===Ze.water?3|ta:0}}function yx(n){const e=Array.from({length:gt},(i,r)=>{const s=an[r],a=Cn[s];return s===Ve.air||!a||a==="minecraft:water"||a==="minecraft:lava"?null:{name:a.replace(/^minecraft:/,""),props:$u(ln,r)}}),t=hx(n,e);for(const i of["block/water_still","block/lava_still"])t.textures.includes(i)||t.textures.push(i);return t}wh(null);const Qn=18,Mt=(n,e,t)=>((e+1)*Qn+(t+1))*Qn+(n+1),Ex=256,Bn=256,Ho=256,al=[102,153,204,255],Zr=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],nu=1<<20,iu=1<<21,Ax=4095;class ru{pos=new Uint16Array(4096*3);uvs=new Int16Array(4096*2);inf=new Uint16Array(4096*4);lig=new Uint8Array(4096*2);ind=new Uint32Array(4096*1.5);vertices=0;indexCount=0;grow(){const e=t=>{const i=new t.constructor(t.length*2);return i.set(t),i};this.pos=e(this.pos),this.uvs=e(this.uvs),this.inf=e(this.inf),this.lig=e(this.lig),this.ind=e(this.ind)}put(e,t,i,r,s,a,o,l,c){((this.vertices+4)*4>this.inf.length||this.indexCount+6>this.ind.length)&&this.grow();const u=this.vertices;for(let h=0;h<4;h++){for(let f=0;f<3;f++)this.pos[(u+h)*3+f]=Math.min(65535,Math.max(0,Math.round(e[h*3+f])));this.uvs[(u+h)*2]=Math.round(t[h*2]*Ho),this.uvs[(u+h)*2+1]=Math.round(t[h*2+1]*Ho),this.inf[(u+h)*4]=i,this.inf[(u+h)*4+1]=r,this.inf[(u+h)*4+2]=a[h]|(l?Ex:0),this.inf[(u+h)*4+3]=s,this.lig[(u+h)*2]=o[h*2],this.lig[(u+h)*2+1]=o[h*2+1]}for(const h of c)this.ind[this.indexCount++]=u+h;this.vertices+=4}rect(e,t,i,r,s,a,o,l,c,u=!1){const h=l?[0,1,3,0,3,2]:[0,1,2,2,1,3],f=o?h:[h[0],h[2],h[1],h[3],h[5],h[4]];this.put(e,t,i,r,s,a,c,u,f)}ccw(e,t,i,r,s,a,o,l){this.put(e,t,i,r,s,a,o,l,[0,1,2,0,2,3])}build(){return{positions:this.pos.slice(0,this.vertices*3),uv:this.uvs.slice(0,this.vertices*2),info:this.inf.slice(0,this.vertices*4),light:this.lig.slice(0,this.vertices*2),indices:this.vertices<=65536?Uint16Array.from(this.ind.subarray(0,this.indexCount)):this.ind.slice(0,this.indexCount)}}}const si=new Uint8Array(gt);si[Ve.magma_block]=1;function En(n,e,t){const i=n[t];if(si[i])return 255;const r=e?e[t]:15,s=Yt[i];return r>>4>=s?r:r&15|s<<4}function yh(n,e,t,i,r,s,a){const o=s>>1,l=(o+1)%3,c=(o+2)%3,u=En(n,e,Mt(t,i,r));for(let h=0;h<4;h++){const f=h&1?1:-1,p=h&2?1:-1,_=l===0?f:0,g=l===1?f:0,m=l===2?f:0,d=c===0?p:0,y=c===1?p:0,M=c===2?p:0,x=Mt(t+_,i+g,r+m),R=Mt(t+d,i+y,r+M),E=Mt(t+_+d,i+g+y,r+m+M),T=Dt[n[x]],P=Dt[n[R]],w=Dt[n[E]];a[h]=T&&P?0:3-(T+P+w);const b=!T||Ui[n[x]]===0,C=!P||Ui[n[R]]===0,H=En(n,e,x)||u,N=En(n,e,R)||u,W=(b||C?En(n,e,E):En(n,e,x))||u;a[4+h]=(H&15)+(N&15)+(W&15)+(u&15),a[8+h]=(H>>4)+(N>>4)+(W>>4)+(u>>4)}}const kr=new Ci(0n);function Eh(n,e,t,i,r){r.length=n.length;let s=null;for(let a=0;a<n.length;a++){const o=n[a];if(o.weights.length===1){r[a]=0;continue}s===null&&(kr.setSeed(Xs(e,t,i)),s=n.length>1?kr.nextLong():0n),n.length>1?kr.setSeed(s):kr.setSeed(Xs(e,t,i));const l=o.weights.reduce((h,f)=>h+f,0);let c=kr.nextInt(l),u=0;for(;u<o.weights.length-1&&(c-=o.weights[u])>=0;)u++;r[a]=u}}function Tx(n,e,t,i){i[0]=i[1]=i[2]=0;const r=gh[n];if(!r)return;const s=Number(BigInt.asIntN(32,Xs(e,0,t))),a=vh[n],o=l=>Math.min(a,Math.max(-a,l));i[0]=o(((s&15)/15-.5)*.5),r===2&&(i[1]=((s>>4&15)/15-1)*.2),i[2]=o(((s>>8&15)/15-.5)*.5)}const Ah=(n,e)=>jr[e]===1||_h[n]===1&&an[e]===an[n];function Rx(n,e={}){const t=e.greedy??!0,i=e.light,[r,s,a]=e.origin??[0,0,0],o=new ru,l=new ru,c=new Int32Array(256),u=new Float64Array(256),h=new Uint8Array(256*8),f=new Float64Array(256),p=new Float32Array(256*4),_=new Uint8Array(256),g=new Int32Array(12),m=[0,0,0],d=[0,0,0],y=new Int16Array(4096).fill(-1),M=[],x=(E,T,P,w)=>{const b=(P*16+w)*16+T;if(y[b]<0){const C=ui.states[E];C[0].weights.length===1?y[b]=0:(Eh(C,r+T,s+P,a+w,M),y[b]=M[0])}return y[b]},R=(E,T,P,w,b)=>{if(qr[E]){const C=ar[E];return C?C[C.length===1?0:x(E,P,w,b)].faces[T]:0}return Dt[E]?Kr[E*6+T]:0};for(let E=0;E<6;E++){const T=Zr[E],P=E>>1,w=(P+1)%3,b=(P+2)%3,C=(E&1)===1;for(let H=0;H<16;H++){let N=!1;for(let W=0;W<16;W++)for(let j=0;j<16;j++){m[P]=H,m[w]=j,m[b]=W;const z=n[Mt(m[0],m[1],m[2])],Q=n[Mt(m[0]+T[0],m[1]+T[1],m[2]+T[2])],G=W*16+j;if(c[G]=0,f[G]=0,jr[Q]&&An[z]===Ze.none)continue;const le=R(z,E,m[0],m[1],m[2]);if(le){if(Ah(z,Q))continue;if(d[0]=m[0]+T[0],d[1]=m[1]+T[1],d[2]=m[2]+T[2],Yt[z]>0||si[z]===1){const q=En(n,i,Mt(d[0],d[1],d[2])),fe=si[z]?60:(q&15)*4,se=Math.max(q>>4,Yt[z],si[z]?15:0)*4;for(let be=0;be<4;be++)g[be]=3,g[4+be]=fe,g[8+be]=se}else yh(n,i,d[0],d[1],d[2],E,g);let ue=0,ce=0;for(let q=0;q<4;q++)ue|=g[q]<<q*2,h[G*8+q*2]=g[4+q],h[G*8+q*2+1]=g[8+q],ce=ce*4096+g[4+q]*64+g[8+q];const Le=q=>g[4+q]*64+g[8+q],Y=(g[0]===g[1]&&g[2]===g[3]&&Le(0)===Le(1)&&Le(2)===Le(3)?nu:0)|(g[0]===g[2]&&g[1]===g[3]&&Le(0)===Le(2)&&Le(1)===Le(3)?iu:0);c[G]=le|ue<<12|Y,u[G]=ce,N=!0}else if(An[z]!==Ze.none&&!Dt[z]){const de=An[z];if(An[Q]===de||E!==3&&Dt[Q])continue;const ue=Ux(n,m[0],m[1],m[2],de);p.set(ue,G*4);const ce=En(n,i,Mt(m[0],m[1],m[2])),Le=En(n,i,Mt(m[0],m[1]+1,m[2])),Y=Math.max(ce&15,Le&15)|Math.max(ce>>4,Le>>4)<<4;_[G]=Y;const q=E===3?ue:E===2?null:E===0?[ue[0],ue[2]]:E===1?[ue[1],ue[3]]:E===4?[ue[0],ue[1]]:[ue[2],ue[3]],fe=!q||q.every(be=>be===q[0]);let se=de*256+Y;for(const be of q??[])se=se*257+Math.round(be*Bn);f[G]=se*2+(fe?1:0),N=!0}}if(N)for(const W of[c,f])for(let j=0;j<16;j++)for(let z=0;z<16;){const Q=W[j*16+z];if(Q===0){z++;continue}const G=W===f,le=t&&(G?Q%2===1:(Q&nu)!==0),de=t&&(G?Q%2===1:(Q&iu)!==0);let ue=1,ce=1;const Le=G?0:u[j*16+z],Y=fe=>W[fe]===Q&&(G||u[fe]===Le);if(le)for(;z+ue<16&&Y(j*16+z+ue);)ue++;if(de)e:for(;j+ce<16;){for(let fe=0;fe<ue;fe++)if(!Y((j+ce)*16+z+fe))break e;ce++}const q=j*16+z;G?Ix(o,l,n,p.subarray(q*4,q*4+4),E,P,w,b,C,H,z,j,ue,ce,_[q]):Dx(o,l,Q,E,P,w,b,C,H,z,j,ue,ce,h.subarray(q*8,q*8+8));for(let fe=0;fe<ce;fe++)for(let se=0;se<ue;se++)W[(j+fe)*16+z+se]=0;z+=ue}}}return ui&&Cx(o,l,n,i,r,s,a,x),Px(o,n,i),{opaque:o.build(),water:l.build()}}function Cx(n,e,t,i,r,s,a,o){const l=Bn,c=new Int32Array(12),u=new Float64Array(4),h=new Float64Array(12),f=[0,0,0,0],p=[0,0,0,0,0,0,0,0],_=[],g=[0,0,0];for(let m=0;m<16;m++)for(let d=0;d<16;d++)for(let y=0;y<16;y++){const M=t[Mt(y,m,d)];if(!qr[M])continue;const x=ui.states[M],R=ar[M];let E;if(R?E=R[R.length===1?0:o(M,y,m,d)].rest:(Eh(x,r+y,s+m,a+d,_),E=x.flatMap((P,w)=>P.choices[_[w]])),E.length===0)continue;Tx(M,r+y,a+d,g);const T=Yt[M]>0||si[M]===1;for(const P of E){if(P.cull>=0){const ce=Zr[P.cull];if(Ah(M,t[Mt(y+ce[0],m+ce[1],d+ce[2])]))continue}const w=P.face,b=w>>1,C=(b+1)%3,H=(b+2)%3,N=Zr[w],W=w&1?1:0;let j=!0;for(let ce=0;ce<4;ce++)Math.abs(P.pos[ce*3+b]-W)>1e-4&&(j=!1);const z=j||Dt[M]===1,Q=z?y+N[0]:y,G=z?m+N[1]:m,le=z?d+N[2]:d;if(P.ao&&!T){yh(t,i,Q,G,le,w,c);for(let ce=0;ce<4;ce++){const Le=Math.min(1,Math.max(0,P.pos[ce*3+C])),Y=Math.min(1,Math.max(0,P.pos[ce*3+H]));u[0]=(1-Le)*(1-Y),u[1]=Le*(1-Y),u[2]=(1-Le)*Y,u[3]=Le*Y;let q=0,fe=0,se=0;for(let be=0;be<4;be++)q+=u[be]*al[c[be]],fe+=u[be]*c[4+be],se+=u[be]*c[8+be];f[ce]=Math.round(q),p[ce*2]=Math.round(fe),p[ce*2+1]=Math.round(se)}}else{const ce=En(t,i,Mt(Q,G,le)),Le=si[M]?60:(ce&15)*4,Y=Math.max(ce>>4,Yt[M],si[M]?15:0)*4;for(let q=0;q<4;q++)f[q]=255,p[q*2]=Le,p[q*2+1]=Y}for(let ce=0;ce<4;ce++)h[ce*3]=(y+P.pos[ce*3]+g[0])*l,h[ce*3+1]=(m+P.pos[ce*3+1]+g[1])*l,h[ce*3+2]=(d+P.pos[ce*3+2]+g[2])*l;const de=Sh(M,P.tint,ui.textures[P.tex]);(de&ta?e:n).ccw(h,P.uv,w,rl+P.tex,de,f,p,!P.shade)}}}function Px(n,e,t){const i=Bn,r=[3,3,3,3].map(a=>al[a]),s=a=>{const o=En(e,t,a),l=(o&15)*4,c=(o>>4)*4;return[l,c,l,c,l,c,l,c]};for(let a=0;a<16;a++)for(let o=0;o<16;o++)for(let l=0;l<16;l++){const c=e[Mt(l,a,o)];if(qr[c])continue;const u=M1[c];if(u===0||u===4)continue;const h=s(Mt(l,a,o));if(u===1){const f=S1[c]/16;for(let p=0;p<6;p++){const _=Zr[p],g=Mt(l+_[0],a+_[1],o+_[2]);if(p!==3&&jr[e[g]])continue;const m=p>>1,d=(m+1)%3,y=(m+2)%3,M=(p&1)===1,x=na(m,d,y,M,[l,a,o][m],[l,a,o][d],[l,a,o][y],1,1);for(let E=0;E<4;E++)x[E*3+1]>a*i&&(x[E*3+1]=Math.round((a+f)*i));const R=Ni[Kr[c*6+p]-1];n.rect(x,ol(R,p,x),p,R[0],R[1],r,M,!1,p===3?h:s(g))}}else{if(u===3&&Lx(n,e,c,l,a,o,h))continue;{const f=Ni[Kr[c*6]-1],p=l*i,_=(l+1)*i,g=o*i,m=(o+1)*i,d=a*i,y=(a+1)*i,M=[p,d,g,_,d,m,p,y,g,_,y,m],x=[p,d,m,_,d,g,p,y,m,_,y,g],R=[0,1,1,1,0,0,1,0];for(const[E,T]of[[M,6],[x,7]])n.rect(E,R,T,f[0],f[1],r,!0,!1,h,!0),n.rect(E,R,T,f[0],f[1],r,!1,!1,h,!0)}}}}function Lx(n,e,t,i,r,s,a){const o=Bn/64,l=[255,255,255,255];let c=!1;const u=x1[t];for(let h=0;h<6;h++){const f=Zr[h];if(u?!(u&1<<h):!Dt[e[Mt(i+f[0],r+f[1],s+f[2])]])continue;const p=h>>1,_=(p+1)%3,g=(p+2)%3,m=(h&1)===1,d=na(p,_,g,m,[i,r,s][p],[i,r,s][_],[i,r,s][g],1,1);for(let x=0;x<4;x++)d[x*3+p]+=m?-o:o;const y=Ni[Kr[t*6+h]-1],M=ol(y,h,d);n.rect(d,M,h,y[0],y[1],l,!0,!1,a,!0),n.rect(d,M,h,y[0],y[1],l,!1,!1,a,!0),c=!0}return c}function na(n,e,t,i,r,s,a,o,l){const c=Bn,u=[];for(let h=0;h<4;h++){const f=[0,0,0];f[n]=(r+(i?1:0))*c,f[e]=(s+(h&1?o:0))*c,f[t]=(a+(h&2?l:0))*c,u.push(f[0],f[1],f[2])}return u}function ol(n,e,t){const i=Bn,r=[];for(let s=0;s<4;s++){const[a,o]=sl(e,t[s*3]/i,t[s*3+1]/i,t[s*3+2]/i);r.push(n[2]*a+n[3]*o+n[6],n[4]*a+n[5]*o+n[7])}return r}function Dx(n,e,t,i,r,s,a,o,l,c,u,h,f,p){const _=na(r,s,a,o,l,c,u,h,f),g=Ni[(t&Ax)-1],m=[0,1,2,3].map(x=>t>>12+x*2&3),d=x=>m[x]*64+p[x*2]+p[x*2+1],y=d(0)+d(3)>d(1)+d(2);(g[1]&ta?e:n).rect(_,ol(g,i,_),i,g[0],g[1],m.map(x=>al[x]),o,y,p)}function Ix(n,e,t,i,r,s,a,o,l,c,u,h,f,p,_){const g=Bn,m=[0,0,0];m[s]=c,m[a]=u,m[o]=h;const d=An[t[Mt(m[0],m[1],m[2])]],y=na(s,a,o,l,c,u,h,f,p);if(r!==2){const w=Math.max(y[1],y[4],y[7],y[10]);for(let b=0;b<4;b++){if(y[b*3+1]!==w)continue;const C=y[b*3]>m[0]*g?1:0,H=y[b*3+2]>m[2]*g?2:0;y[b*3+1]-=Math.round((1-i[C+H])*g)}}const M=d===Ze.water?e:n,x=(_&15)*4,R=(_>>4)*4,{layer:E,tint:T}=wx(d),P=[];for(let w=0;w<4;w++)P.push(...sl(r,y[w*3]/g,y[w*3+1]/g,y[w*3+2]/g));M.rect(y,P,r,E,T,[255,255,255,255],l,!1,[x,R,x,R,x,R,x,R])}function Ux(n,e,t,i,r){const s=(f,p,_)=>{const g=n[Mt(f,p,_)];return An[g]===r?An[n[Mt(f,p+1,_)]]===r?1:sn[g].amount/9:Dt[g]?-1:0},a=s(e,t,i);if(a>=1)return[1,1,1,1];const o=s(e,t,i-1),l=s(e,t,i+1),c=s(e+1,t,i),u=s(e-1,t,i),h=(f,p,_,g)=>{if(p>=1||f>=1)return 1;let m=0,d=0;const y=M=>{M>=.8?(m+=M*10,d+=10):M>=0&&(m+=M,d+=1)};if(p>0||f>0){const M=s(e+_,t,i+g);if(M>=1)return 1;y(M)}return y(a),y(p),y(f),m/d};return[h(o,u,-1,-1),h(o,c,1,-1),h(l,u,-1,1),h(l,c,1,1)]}const ll=512,Nx=`
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
  vec3 p = position / ${Bn.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标（v7.1 起顶点里直接存，网格生成时按原版模型算好；大于 1 的部分靠 RepeatWrapping 重复）
  vUv = uv / ${Ho.toFixed(1)};

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
`,Fx=`
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
uniform vec3 tintColors[${mh.length}];
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
      ivec2 col = ivec2(mod(floor(vColumn), ${ll}.0));
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
`;function Xa(n){return new Rn({vertexShader:Nx,fragmentShader:Fx,uniforms:Uu.merge([he.fog,{map:{value:null},grassMap:{value:null},foliageMap:{value:null},waterMap:{value:null},lightMap:{value:null},constantAmbient:{value:!1},tintColors:{value:mh.map(e=>new F((e>>16&255)/255,(e>>8&255)/255,(e&255)/255))},opacity:{value:n}}]),fog:!0})}class Ox{textures=Jc();opaque;water;wire;wireframe=!1;tintMaps=[9551193,7842607,4159204].map(e=>kx(e));tintsDirty=!1;lightMap=zx();constructor(){this.opaque=Xa(1),this.water=Xa(.7),this.water.transparent=!0,this.water.depthWrite=!1,this.water.side=rn;for(const e of[this.opaque,this.water])e.uniforms.map.value=this.textures,e.uniforms.grassMap.value=this.tintMaps[0],e.uniforms.foliageMap.value=this.tintMaps[1],e.uniforms.waterMap.value=this.tintMaps[2],e.uniforms.lightMap.value=this.lightMap;this.wire=Xa(.6),this.wire.uniforms.lightMap.value=this.lightMap,this.wire.defines={WIRE:""},this.wire.wireframe=!0,this.wire.transparent=!0}setPackTextures(e){this.textures.dispose(),this.textures=Jc(e);for(const t of[this.opaque,this.water])t.uniforms.map.value=this.textures}writeTints(e,t,i){const r=ll;for(let s=0;s<16;s++)for(let a=0;a<16;a++){const o=((e*16+a)%r+r)%r,l=((t*16+s)%r+r)%r;for(let c=0;c<3;c++){const u=((s*16+a)*3+c)*3,h=(l*r+o)*4,f=this.tintMaps[c].image.data;f[h]=i[u],f[h+1]=i[u+1],f[h+2]=i[u+2]}}this.tintsDirty=!0}setLightmap(e,t){const i=this.lightMap.image.data;for(let r=0;r<256;r++)i[r*4]=e[r*3],i[r*4+1]=e[r*3+1],i[r*4+2]=e[r*3+2];this.lightMap.needsUpdate=!0;for(const r of[this.opaque,this.water,this.wire])r.uniforms.constantAmbient.value=t}flushTints(){if(this.tintsDirty){for(const e of this.tintMaps)e.needsUpdate=!0;this.tintsDirty=!1}}}function kx(n){const e=ll,t=new Uint8Array(e*e*4);for(let r=0;r<e*e;r++)t[r*4]=n>>16&255,t[r*4+1]=n>>8&255,t[r*4+2]=n&255,t[r*4+3]=255;const i=new Zo(t,e,e,zt,on);return i.magFilter=i.minFilter=Ot,i.needsUpdate=!0,i}function zx(){const n=new Uint8Array(1024).fill(255),e=new Zo(n,16,16,zt,on);return e.magFilter=e.minFilter=mn,e.generateMipmaps=!1,e.needsUpdate=!0,e}const Ya=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]];function Hx(n,e,t,i,r,s){Ui[r]===Ui[s]&&Yt[r]===Yt[s]&&Sr[r]===Sr[s]||n.get(e,t,i)<0||(su(n,e,t,i,r,!1),n.hasSky&&su(n,e,t,i,r,!0))}function su(n,e,t,i,r,s){const a=s?0:4,o=(M,x,R)=>{const E=n.get(M,x,R);return E<0?-1:E>>a&15},l=(M,x,R,E)=>{const T=n.get(M,x,R);T<0||n.set(M,x,R,s?T&240|E:T&15|E<<4)},c=n.maxY-n.minY,u=new Map,h=(M,x,R)=>{const E=`${M},${x}`;let T=R===void 0?u.get(E):void 0;if(T===void 0){const P=new Uint16Array(c);for(let w=0;w<c;w++)P[w]=n.minY+w===t&&M===f&&x===p&&R!==void 0?R:n.block(M,n.minY+w,x);T=n.minY+Q1(P,w=>w,c),R===void 0&&u.set(E,T)}return T},f=e,p=i,_=(M,x,R)=>s?x>=h(M,R):Yt[n.block(M,x,R)]>0,g=(M,x,R)=>s?15:Yt[n.block(M,x,R)],m=[],d=[];if(s){const M=h(e,i,r),x=h(e,i);for(let R=M;R<x;R++){const E=o(e,R,i);E>0&&(l(e,R,i,0),m.push(e,R,i,E))}for(let R=x;R<M;R++)l(e,R,i,15),d.push(e,R,i)}const y=o(e,t,i);!(s&&t>=h(e,i))&&y>0&&(l(e,t,i,0),m.push(e,t,i,y)),!s&&Yt[n.block(e,t,i)]>0&&(l(e,t,i,Yt[n.block(e,t,i)]),d.push(e,t,i));for(let M=0;M<m.length;M+=4){const x=m[M],R=m[M+1],E=m[M+2],T=m[M+3];for(const[P,w,b]of Ya){const C=x+P,H=R+w,N=E+b,W=o(C,H,N);if(!(W<=0)){if(_(C,H,N)&&W===g(C,H,N)){d.push(C,H,N);continue}W<T?(l(C,H,N,0),m.push(C,H,N,W),!s&&Yt[n.block(C,H,N)]>0&&(l(C,H,N,Yt[n.block(C,H,N)]),d.push(C,H,N))):d.push(C,H,N)}}}for(const[M,x,R]of Ya)o(e+M,t+x,i+R)>0&&d.push(e+M,t+x,i+R);for(let M=0;M<d.length;M+=3){const x=d[M],R=d[M+1],E=d[M+2],T=o(x,R,E);if(T<=1)continue;const P=n.block(x,R,E);for(const[w,b,C]of Ya){const H=x+w,N=R+b,W=E+C,j=o(H,N,W);if(j<0||T-1<=j)continue;const z=n.block(H,N,W);if(b===-1&&Sr[P]||b===1&&Sr[z])continue;const Q=T-Math.max(1,Ui[z]);Q>j&&(l(H,N,W,Q),d.push(H,N,W))}}}const au={},Gx={};function Hs(n){const e=/^\/resourcepacks\/([^/]+)\/assets\/minecraft\/(.+)\.(json|png)$/.exec(n);return[e[1],e[2]]}function ou(n,e=""){const t=new Map;for(const i of Object.keys(n).sort((r,s)=>Hs(r)[0].localeCompare(Hs(s)[0])))t.set(Hs(i)[1].slice(e.length),n[i]);return t}async function Vx(){const n=ou(au);if(n.size===0)return null;const e=[...new Set(Object.keys(au).map(o=>Hs(o)[0]))].sort(),t=new Map,i=new Map,r=[...new Set(Cn.filter(Boolean).map(o=>o.replace(/^minecraft:/,"")))];await Promise.all(r.map(async o=>{const l=n.get(`blockstates/${o}`);l&&t.set(o,await l())}));let s=new Set;const a=o=>{if(Array.isArray(o))o.forEach(a);else if(o&&typeof o=="object"){const l=o;typeof l.model=="string"&&s.add(ni(l.model));for(const c of Object.keys(l))c!=="model"&&a(l[c])}};for(t.forEach(a);s.size;){const o=[...s].filter(l=>!i.has(l));s=new Set,await Promise.all(o.map(async l=>{const c=n.get(`models/${l}`),u=c?await c():void 0;i.set(l,u),u?.parent&&!i.has(ni(u.parent))&&s.add(ni(u.parent))}))}return{name:e.join(" + "),source:{blockstate:o=>t.get(o),model:o=>i.get(ni(o))},textures:ou(Gx,"textures/")}}const Wt=16;async function Bx(n,e){const t=new Uint8Array(e.length*Wt*Wt*4),r=new OffscreenCanvas(Wt,Wt).getContext("2d",{willReadFrequently:!0});return(await Promise.all(e.map(async a=>{const o=n.textures.get(a);if(!o)return null;try{const l=await o();return await createImageBitmap(await(await fetch(l)).blob())}catch{return null}}))).forEach((a,o)=>{if(r.clearRect(0,0,Wt,Wt),a)r.imageSmoothingEnabled=!1,r.drawImage(a,0,0,a.width,a.width,0,0,Wt,Wt),a.close();else for(let l=0;l<Wt;l++)for(let c=0;c<Wt;c++)r.fillStyle=c<8!=l<8?"#f800f8":"#000000",r.fillRect(c,l,1,1);t.set(r.getImageData(0,0,Wt,Wt).data,o*Wt*Wt*4)}),t}const Wx=new TextDecoder;function Xx(n){const e=new DataView(n.buffer,n.byteOffset,n.byteLength);let t=0;const i=()=>e.getUint8(t++),r=()=>(t+=4,e.getInt32(t-4)),s=()=>{const o=e.getUint16(t);t+=2;const l=Wx.decode(n.subarray(t,t+o));return t+=o,l},a=o=>{switch(o){case 1:return e.getInt8(t++);case 2:return t+=2,e.getInt16(t-2);case 3:return r();case 4:return t+=8,e.getBigInt64(t-8);case 5:return t+=4,e.getFloat32(t-4);case 6:return t+=8,e.getFloat64(t-8);case 7:{const l=r(),c=new Int8Array(n.slice(t,t+l).buffer);return t+=l,c}case 8:return s();case 9:{const l=i(),c=r(),u=[];for(let h=0;h<c;h++)u.push(a(l));return u}case 10:{const l={};for(;;){const c=i();if(c===0)return l;const u=s();l[u]=a(c)}}case 11:{const l=r(),c=new Int32Array(l);for(let u=0;u<l;u++)c[u]=r();return c}case 12:{const l=r(),c=new BigInt64Array(l);for(let u=0;u<l;u++)c[u]=(t+=8,e.getBigInt64(t-8));return c}default:throw new Error(`NBT：不认识的类型 ${o}（位置 ${t}）`)}};if(i()!==10)throw new Error("NBT：根标签不是 compound");return s(),a(10)}async function Yx(n,e){const t=new Blob([n]).stream().pipeThrough(new DecompressionStream(e));return new Uint8Array(await new Response(t).arrayBuffer())}function $x(n,e,t){if(n.length<8192)return null;const i=4*((e&31)+(t&31)*32),r=n[i]<<16|n[i+1]<<8|n[i+2];if(r===0)return null;const s=r*4096;if(s+5>n.length)return null;const a=new DataView(n.buffer,n.byteOffset+s,5),o=a.getUint32(0),l=a.getUint8(4);return l&128?null:{compression:l,data:n.slice(s+5,s+4+o)}}async function qx(n){const t=Xx(await Yx(n,"gzip")).Data,i=t.WorldGenSettings,r=o=>Number(o??0),s=t.Player;let a=null;if(s){const o=s.Pos,l=s.Rotation,c=s.abilities;a={x:o[0],y:o[1],z:o[2],yaw:l[0],pitch:l[1],dimension:String(s.Dimension??"minecraft:overworld"),flying:r(c?.flying)===1}}return{name:String(t.LevelName??""),seed:BigInt(i?.seed??t.RandomSeed??0n),dayTime:Number(t.DayTime??0n),spawn:{x:r(t.SpawnX),y:r(t.SpawnY),z:r(t.SpawnZ)},player:a,dataVersion:r(t.DataVersion)}}function jx(n){return/nether/.test(n)?"DIM-1/region":/end/.test(n)?"DIM1/region":"region"}function Kx(n){return new Worker(""+new URL("generate-2rLXehWp.js",import.meta.url).href,{type:"module",name:n?.name})}class Zx{slots=[];nextId=1;pending=new Map;constructor(e=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1))){for(let t=0;t<e;t++){const i={worker:new Kx,busy:0};i.worker.onmessage=r=>this.onMessage(r.data),this.slots.push(i)}}get size(){return this.slots.length}get busy(){return this.slots.reduce((e,t)=>e+t.busy,0)}call(e,t,i){const r=i===void 0?this.slots.reduce((s,a)=>a.busy<s.busy?a:s):this.slots[(i%this.slots.length+this.slots.length)%this.slots.length];return this.send(r,e,t)}async broadcast(e,t){return(await Promise.all(this.slots.map(r=>this.send(r,e,t))))[0]}send(e,t,i){const r=this.nextId++;e.busy++;const s={id:r,method:t,params:i};return new Promise((a,o)=>{this.pending.set(r,{slot:e,resolve:a,reject:o}),e.worker.postMessage(s)})}onMessage(e){const t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t.slot.busy--,e.ok?t.resolve(e.result):t.reject(new Error(e.error)))}}class Jx{scene;camera;pool=new Zx;materials=new Ox;highlight;distance=6;chunks=new Map;loading=new Set;generation=0;edits=new Map;world=null;vanillaStats={chunks:0,substituted:new Map,unknown:new Map};greedy=!0;info=null;dayTime=0;daylightCycle=!0;fixedTime=null;lastChunkMs=0;lastRemeshMs=0;lastLightMs=0;dirty=new Set;fluids=new K1({get:(e,t,i)=>this.getBlock(e,t,i),set:(e,t,i,r)=>this.writeBlock(e,t,i,r)});constructor(e,t){this.scene=e,this.camera=t,this.highlight=new Z1(e)}async init(e,t,i){return await this.loadModels(),this.edits=i??new Map,this.fluids.clear(),this.reload(),this.info=await this.pool.broadcast("init",{seed:e,settings:t}),this.fixedTime=U1(this.info.settings),this.info}modelsReady=null;resourcePack=null;loadModels(){return this.modelsReady??=(async()=>{const e=await Vx(),t=e?yx(e.source):null;wh(t),e&&t&&(this.materials.setPackTextures(await Bx(e,t.textures)),this.resourcePack=e.name),await this.pool.broadcast("models",{models:t})})(),this.modelsReady}reload(){for(const e of this.chunks.values())e.dispose(this.scene);this.chunks.clear(),this.loading.clear(),this.generation++}setGreedy(e){this.greedy=e,this.reload()}setWireframe(e){this.materials.wireframe=e;for(const t of this.chunks.values())for(const i of[...t.meshes,...t.waterMeshes])i&&this.applyWire(i)}applyWire(e){const t=e.children.length>0;if(this.materials.wireframe&&!t){const i=new Lt(e.geometry,this.materials.wire);i.renderOrder=2,e.add(i)}else!this.materials.wireframe&&t&&e.clear()}update=()=>{if(!this.info)return;this.flushRemesh(),this.materials.flushTints();const e=Math.floor(this.camera.position.x/Rt),t=Math.floor(this.camera.position.z/Rt),i=(l,c,u)=>(l-e)**2+(c-t)**2<=(this.distance+u+.5)**2;for(const[l,c]of this.chunks)Math.max(Math.abs(c.cx-e),Math.abs(c.cz-t))>this.distance+2&&(c.dispose(this.scene),this.chunks.delete(l));const r=this.pool.size*2;if(this.pool.busy>=r)return;const s=[];for(const l of this.chunks.values())l.light||l.lighting||!i(l.cx,l.cz,0)||this.neighbors(l).every(c=>c)&&s.push([(l.cx-e)**2+(l.cz-t)**2,l]);s.sort((l,c)=>l[0]-c[0]);for(const[,l]of s.slice(0,r-this.pool.busy))this.relight(l);if(this.pool.busy>=r)return;const a=[],o=this.distance+1;for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++){if(!i(e+l,t+c,1))continue;const u=`${e+l},${t+c}`;!this.chunks.has(u)&&!this.loading.has(u)&&a.push([l*l+c*c,e+l,t+c])}a.sort((l,c)=>l[0]-c[0]);for(const[,l,c]of a.slice(0,r-this.pool.busy))this.load(l,c)};neighbors(e){const t=[];for(let i=-1;i<=1;i++)for(let r=-1;r<=1;r++)(r||i)&&t.push(this.chunks.get(`${e.cx+r},${e.cz+i}`));return t}relight(e){const t=[];for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++)t.push(this.chunks.get(`${e.cx+a},${e.cz+s}`));const i=t.map(s=>s.version),r=this.generation;e.lighting=!0,this.pool.call("light",{chunks:t.map(s=>s.flat),greedy:this.greedy,cx:e.cx,cz:e.cz}).then(s=>{if(e.lighting=!1,!(r!==this.generation||this.chunks.get(`${e.cx},${e.cz}`)!==e)&&!t.some((a,o)=>a.version!==i[o])){e.light=s.light,this.lastLightMs=s.ms;for(let a=0;a<s.changes.length;a+=2)e.setRaw(s.changes[a],s.changes[a+1]);for(let a=0;a<s.meshes.length;a++)this.setSectionMesh(e,a,s.meshes[a]);this.syncBorders(e)}}).catch(s=>{e.lighting=!1,console.error(`区块 ${e.cx},${e.cz} 光照失败`,s)})}syncBorders(e){for(const t of this.neighbors(e)){if(!t?.light)continue;const i=e.cx-t.cx,r=e.cz-t.cz,s=new Set;for(let a=e.minY;a<e.minY+e.height;a++)for(let o=-1;o<=16;o++)for(let l=-1;l<=16;l++){const c=l-i*16,u=o-r*16;if(c<0||c>15||u<0||u>15)continue;const h=e.light[e.lightIndex(c,a,u)],f=t.lightIndex(l,a,o);t.light[f]!==h&&(t.light[f]=h,s.add(t.sectionIndex(a)))}for(const a of s)for(const o of[a-1,a,a+1])o>=0&&o<t.sections.length&&this.dirty.add(`${t.cx},${t.cz},${o}`)}}tick(){this.fluids.tick(),this.daylightCycle&&this.dayTime++}renderTime(e){return this.fixedTime??this.dayTime+(this.daylightCycle?e:0)}async loadVanilla(e,t){const i=await this.world.region(e,t),r=i&&$x(i,e,t);if(r){const s=await this.pool.call("vanillaChunk",{cx:e,cz:t,compression:r.compression,data:r.data},$a(e,t));for(const[a,o]of[[this.vanillaStats.substituted,s.substituted],[this.vanillaStats.unknown,s.unknown]])for(const[l,c]of Object.entries(o))a.set(l,(a.get(l)??0)+c);if(s.chunk)return this.vanillaStats.chunks++,s.chunk}return this.pool.call("chunk",{cx:e,cz:t},$a(e,t))}load(e,t){const i=`${e},${t}`,r=this.generation;this.loading.add(i),(this.world?.meta.source==="vanilla"?this.loadVanilla(e,t):this.pool.call("chunk",{cx:e,cz:t},$a(e,t))).then(s=>{r===this.generation&&(this.loading.delete(i),this.onChunk(s))}).catch(s=>{r===this.generation&&this.loading.delete(i),console.error(`区块 ${i} 生成失败`,s)})}onChunk(e){const t=this.info,i=e.sections.map(o=>hr.fromData(o)),r=new Kc(e.cx,e.cz,t.minY,t.height,i,e.blocks),s=`${e.cx},${e.cz}`;this.chunks.set(s,r),this.lastChunkMs=e.ms,this.materials.writeTints(e.cx,e.cz,e.tints);const a=this.edits.get(s);if(a)for(const[o,l]of a){const c=o&15,u=o>>4&15,h=(o>>8)+r.minY;r.set(c,h,u,l)}for(const o of e.fluidUpdates){const l=e.cx*16+(o&15),c=e.cz*16+(o>>4&15),u=(o>>8)+r.minY,h=r.get(o&15,u,o>>4&15),f=An[h];f!==Ze.none&&this.fluids.schedule(l,u,c,f,1)}}getChunk(e,t){return this.chunks.get(`${Math.floor(e/Rt)},${Math.floor(t/Rt)}`)}getBlock(e,t,i){const r=this.getChunk(e,i);return r?r.get(e-r.cx*Rt,t,i-r.cz*Rt):null}isSolidAt(e,t,i){const r=this.getBlock(e,t,i);return r===null?!0:ir(r)}setBlock(e,t,i,r){this.writeBlock(e,t,i,r)&&(this.fluids.blockChanged(e,t,i),this.flushRemesh())}writeBlock(e,t,i,r){const s=this.getChunk(e,i);if(!s||!this.info)return!1;const a=e-s.cx*Rt,o=i-s.cz*Rt;if(t<this.info.minY||t>=this.info.minY+this.info.height)return!1;const l=s.get(a,t,o);s.set(a,t,o,r),s.light&&l!==r&&Hx(this.lightWorld,e,t,i,l,r);const c=`${s.cx},${s.cz}`;this.world?.dirty.add(c),this.edits.has(c)||this.edits.set(c,new Map),this.edits.get(c).set(Kc.index(a,t,o,s.minY),r);for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){const p=t+h;if(p<this.info.minY||p>=this.info.minY+this.info.height)continue;const _=this.getChunk(e+u,i+f);_&&this.dirty.add(`${_.cx},${_.cz},${_.sectionIndex(p)}`)}return!0}flushRemesh(){if(this.dirty.size===0)return;const e=performance.now();for(const t of this.dirty){const[i,r,s]=t.split(",").map(Number),a=this.chunks.get(`${i},${r}`);a&&this.remeshSection(a,s)}this.dirty.clear(),this.lastRemeshMs=performance.now()-e}lightWorld=(()=>{let e;const t=(r,s)=>{const a=Math.floor(r/16),o=Math.floor(s/16);return e&&e.cx===a&&e.cz===o&&this.chunks.get(`${a},${o}`)===e?e:e=this.chunks.get(`${a},${o}`)},i=this;return{get minY(){return i.info.minY},get maxY(){return i.info.minY+i.info.height},get hasSky(){return i.info.hasSkyLight},block:(r,s,a)=>t(r,a)?.get(r&15,s,a&15)??Ve.air,get:(r,s,a)=>{const o=t(r,a);return!o?.light||s<o.minY||s>=o.minY+o.height?-1:o.light[o.lightIndex(r&15,s,a&15)]},set:(r,s,a,o)=>{const l=t(r,a);if(!l?.light)return;const c=r&15,u=a&15;l.light[l.lightIndex(c,s,u)]=o;for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){if(f===0&&h===0)continue;const p=c-f*16,_=u-h*16;if(p<-1||p>16||_<-1||_>16)continue;const g=this.chunks.get(`${l.cx+f},${l.cz+h}`);g?.light&&(g.light[g.lightIndex(p,s,_)]=o)}for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++)for(let p=-1;p<=1;p++){const _=s+p;if(_<l.minY||_>=l.minY+l.height)continue;const g=t(r+f,a+h);g?.light&&this.dirty.add(`${g.cx},${g.cz},${g.sectionIndex(_)}`)}}}})();lightAt(e,t,i){const r=this.lightWorld.get(e,t,i);return r<0?t>=(this.info?.minY??0)+(this.info?.height??0)&&this.getChunk(e,i)?.light?{sky:this.info.hasSkyLight?15:0,block:0}:null:{sky:r&15,block:r>>4}}topSolidY(e,t){const i=this.getChunk(e,t);if(!i)return null;const r=e-i.cx*Rt,s=t-i.cz*Rt;for(let a=i.sections.length-1;a>=0;a--)if(!i.sections[a].isEmpty){for(let o=15;o>=0;o--)if(ir(i.sections[a].get(r,o,s)))return i.minY+a*16+o}return i.minY}floorBelow(e,t,i){const r=this.getChunk(e,t);if(!r)return null;for(let s=i;s>r.minY+1;s--){const a=o=>this.getBlock(e,o,t)??0;if(ir(a(s-1))&&!ir(a(s))&&!ir(a(s+1))&&An[a(s)]===Ze.none)return s-1}return null}remeshSection(e,t){if(!e.light)return;const i=new Uint16Array(Qn*Qn*Qn);this.fillNeighborhood(e,t,i)?e.staleSections.delete(t):e.staleSections.add(t);const r=new Uint8Array(Qn*Qn*Qn);ex(e.light,e.height,t,this.info.hasSkyLight,r);const s=Rx(i,{greedy:this.greedy,light:r,origin:[e.cx*Rt,e.minY+t*16,e.cz*Rt]});this.setSectionMesh(e,t,s.opaque.indices.length+s.water.indices.length>0?s:null)}fillNeighborhood(e,t,i){const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++)r.push(this.chunks.get(`${e.cx+o},${e.cz+a}`));const s=e.minY+t*16;for(let a=-1;a<=16;a++)for(let o=-1;o<=16;o++){const l=o<0?-1:o>15?1:0;for(let c=-1;c<=16;c++){const u=c<0?-1:c>15?1:0,h=r[(l+1)*3+(u+1)];i[Mt(c,a,o)]=h?h.get(c-u*16,s+a,o-l*16):Ve.air}}return!r.includes(void 0)}setSectionMesh(e,t,i){e.disposeSection(this.scene,t),i&&(e.meshes[t]=this.toMesh(i.opaque,this.materials.opaque,e,t),e.waterMeshes[t]=this.toMesh(i.water,this.materials.water,e,t),e.waterMeshes[t]&&(e.waterMeshes[t].renderOrder=1))}toMesh(e,t,i,r){if(e.indices.length===0)return null;const s=new vn;s.setAttribute("position",new Ct(e.positions,3)),s.setAttribute("uv",new Ct(e.uv,2)),s.setAttribute("info",new Ct(e.info,4)),s.setAttribute("light",new Ct(e.light,2)),s.setIndex(new Ct(e.indices,1));const a=16*Bn;s.boundingBox=new yr(new F(0,0,0),new F(a,a,a)),s.boundingSphere=new Ks(new F(8,8,8),8*Math.sqrt(3));const o=new Lt(s,t);return o.position.set(i.cx*Rt,i.minY+r*16,i.cz*Rt),o.matrixAutoUpdate=!1,o.updateMatrix(),this.applyWire(o),this.scene.add(o),o}get stats(){let e=0,t=0,i=0,r=0,s=0;for(const l of this.chunks.values()){e+=l.byteSize;for(const c of[...l.meshes,...l.waterMeshes]){if(!c)continue;i++;const u=c.geometry;for(const h of[u.attributes.position,u.attributes.uv,u.attributes.info,u.attributes.light,u.index])t+=h.array.byteLength;r+=u.attributes.position.count,s+=u.index.count/6}}const a=this.info?.height??0;let o=0;for(const l of this.chunks.values())l.light&&o++;return{loaded:this.chunks.size,lit:o,loading:this.loading.size,bytes:e,v0Bytes:this.chunks.size*16*16*a,meshBytes:t,fluidQueue:this.fluids.queued,sectionMeshes:i,vertices:r,quads:s}}}function $a(n,e){const t=Math.floor(n/4),i=Math.floor(e/4);return(Math.imul(t,73856093)^Math.imul(i,19349663))>>>0}const Qx=[0,9551193,4764952,4159204];let zr=null;function qa(n,e){zr??=nh();const t=document.createElement("canvas");t.width=t.height=pe;const i=new ImageData(pe,pe),r=n*pe*pe*4,s=Qx[ih[n]&3],a=[s>>16&255,s>>8&255,s&255].map(o=>o/255);for(let o=0;o<pe*pe*4;o+=4){const l=s!==0&&zr[r+o+3]<255;i.data[o]=zr[r+o]*e*(l?a[0]:1),i.data[o+1]=zr[r+o+1]*e*(l?a[1]:1),i.data[o+2]=zr[r+o+2]*e*(l?a[2]:1),i.data[o+3]=255}return t.getContext("2d").putImageData(i,0,0),t}const lu=new Map;function eb(n){const e=lu.get(n);if(e)return e;const{top:t,side:i}=Et[n].textures,r=64,s=document.createElement("canvas");s.width=s.height=r;const a=s.getContext("2d");a.imageSmoothingEnabled=!1;const o=r/2,l=o/pe,c=o/2;a.setTransform(l,l/2,-l,l/2,o,0),a.drawImage(qa(te[t],1),0,0),a.setTransform(l,l/2,0,l,0,c),a.drawImage(qa(te[i],.8),0,0),a.setTransform(l,-l/2,0,l,o,o),a.drawImage(qa(te[i],.6),0,0);const u=s.toDataURL();return lu.set(n,u),u}const tb=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),pt=n=>document.getElementById(n);class nb{constructor(e,t,i){this.core=e,this.terrain=t,this.control=i,this.el=document.getElementById("f3"),document.addEventListener("keydown",r=>{r.code==="F3"?(r.preventDefault(),this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible)):r.code==="KeyG"?this.terrain.setGreedy(!this.terrain.greedy):r.code==="KeyK"&&this.terrain.setWireframe(!this.terrain.materials.wireframe)})}el;visible=!1;lightLine(e,t,i){const r=this.terrain.lightAt(e,t,i);return r?`Client Light: ${Math.max(r.sky,r.block)} (${r.sky} sky, ${r.block} block)`:"Client Light: （区块还没点亮）"}timeLine(){const e=this.terrain.dayTime,t=Math.floor(e/24e3),i=(e%24e3+24e3)%24e3,r=Math.floor((i/1e3+6)%24*60),s=String(Math.floor(r/60)).padStart(2,"0"),a=String(r%60).padStart(2,"0"),o=this.terrain.fixedTime!==null?`（这个维度的时间固定在 ${this.terrain.fixedTime}）`:this.terrain.daylightCycle?"":"（昼夜循环已关）";return`时间: 第 ${t} 天 ${s}:${a}  dayTime ${e}${o}`}biome="…";routerLine="";lastQuery=0;querying=!1;speed(){const e=this.control.player,t={x:e.pos.x-e.prevPos.x,y:e.pos.y-e.prevPos.y,z:e.pos.z-e.prevPos.z};return`水平 ${(Math.hypot(t.x,t.z)*20).toFixed(2)}  竖直 ${(t.y*20).toFixed(2)} 格/秒`}update(e){if(!this.visible)return;const t=performance.now(),i=this.control.feet,r=Math.floor(i.x),s=Math.floor(i.y),a=Math.floor(i.z);!this.querying&&t-this.lastQuery>250&&this.terrain.info&&(this.querying=!0,this.lastQuery=t,this.terrain.pool.call("f3",{x:r,y:s,z:a}).then(g=>{this.routerLine=g.line,this.biome=g.biome}).finally(()=>this.querying=!1));const o=this.terrain.info,l=this.control.target,c=l?this.terrain.getBlock(l.x,l.y,l.z)??0:0,u=l?`${Et[an[c]].name} ${tl(c).replace("minecraft:","")}`:"—",h=this.terrain.stats,f=this.core.renderer.info.render,p=g=>(g/1048576).toFixed(1)+" MB",_=[`mc-replica v8 (${e} fps, 20 TPS)`,`种子: ${o?.seed??"…"}    noise_settings: ${o?.settings??"…"}`,`区块: ${h.loaded} 已加载（${h.lit} 已点亮）, ${h.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 光照+网格 ${this.terrain.lastLightMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,`方块数据: ${p(h.bytes)}（v0 的存法要 ${p(h.v0Bytes)}）`,`资源包: ${this.terrain.resourcePack??"没有（程序画的纹理，见 resourcepacks/README.md）"}`,this.saveLine(),`网格: ${this.terrain.greedy?"贪婪":"逐面"} [G]${this.terrain.materials.wireframe?" 线框":""} [K]  ${h.sectionMeshes} 个 section 网格, ${h.quads.toLocaleString()} 个四边形, ${p(h.meshBytes)}`,`本帧: ${f.calls} 次绘制, ${f.triangles.toLocaleString()} 个三角形`,`流体: ${h.fluidQueue} 个待更新, 上个 tick 处理 ${this.terrain.fluids.lastProcessed} 个`,"",`XYZ: ${i.x.toFixed(3)} / ${i.y.toFixed(5)} / ${i.z.toFixed(3)}`,`Block: ${r} ${s} ${a}`,`Chunk: ${Math.floor(r/Rt)} ${Math.floor(a/Rt)}  (区块内 ${r&15} ${a&15})`,`Facing: ${this.control.facing}`,`Biome: ${this.biome}`,this.lightLine(r,s,a),this.timeLine(),`状态: ${this.control.player.state}${this.control.player.onGround?"  落地":""}    速度: ${this.speed()}`,"",this.routerLine,"",`准星: ${u}${l?`  (${l.x}, ${l.y}, ${l.z})`:""}`];this.el.textContent=_.join(`
`)}saveLine(){const e=this.terrain.world;if(!e)return"存档: 不保存";const t=this.terrain.vanillaStats,i=s=>[...s].sort((a,o)=>o[1]-a[1]).slice(0,3).map(([a])=>a.replace("minecraft:","")).join(", ");let r=`存档: ${e.meta.name}（${e.meta.source==="vanilla"?"原版存档":"生成"}）, ${this.terrain.edits.size} 个区块有改动`;return e.meta.source==="vanilla"&&(r+=`
原版区块: ${t.chunks} 个, 代替 ${t.substituted.size} 种${t.substituted.size?`（${i(t.substituted)}…）`:""}, 不认识 ${t.unknown.size} 种${t.unknown.size?`（${i(t.unknown)}…）`:""}`),r}}const Jn=160,ib=[33,82,160],nr=[242,240,232],rb=[176,92,34];class sb{constructor(e,t){this.terrain=e,this.control=t,this.el=document.getElementById("noiseMap"),this.canvas=this.el.querySelector("canvas"),this.select=this.el.querySelector("select.field"),this.scaleSelect=this.el.querySelector("select.scale"),this.legend=this.el.querySelector(".legend"),document.addEventListener("keydown",i=>{this.control.control.isLocked&&(i.code==="KeyM"&&this.toggle(),this.visible&&(i.code==="KeyN"&&this.cycle(this.select,1),i.code==="Equal"&&this.cycle(this.scaleSelect,-1),i.code==="Minus"&&this.cycle(this.scaleSelect,1)))}),this.select.addEventListener("change",()=>this.refresh(!0)),this.scaleSelect.addEventListener("change",()=>this.refresh(!0))}el;canvas;select;scaleSelect;legend;visible=!1;busy=!1;last={x:NaN,z:NaN,field:"",step:0};image=null;setFields(e){this.select.innerHTML=e.map(t=>`<option>${t}</option>`).join(""),this.select.value=e.includes("continents")?"continents":e[0]}cycle(e,t){const i=e.options.length;e.selectedIndex=(e.selectedIndex+t+i)%i,this.refresh(!0)}toggle(){this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible),this.visible&&this.refresh(!0)}update(){this.visible&&(this.refresh(!1),this.draw())}refresh(e){const t=this.control.feet,i=Number(this.scaleSelect.value),r=Math.max(Math.abs(t.x-this.last.x),Math.abs(t.z-this.last.z))>Jn*i/8;if(this.busy||!this.terrain.info||!(e||r||this.select.value!==this.last.field))return;this.busy=!0;const s={field:this.select.value,cx:Math.floor(t.x),cy:Math.floor(t.y),cz:Math.floor(t.z),size:Jn,step:i};this.last={x:s.cx,z:s.cz,field:s.field,step:i},this.terrain.pool.call("slice",s).then(a=>this.paint(a.values,a.min,a.max)).catch(a=>console.error(a)).finally(()=>this.busy=!1)}paint(e,t,i){const r=new ImageData(Jn,Jn),s=Math.max(Math.abs(t),Math.abs(i))||1;for(let a=0;a<e.length;a++){const o=Math.max(-1,Math.min(1,e[a]/s)),l=o<0?ib:rb,c=Math.abs(o);r.data[a*4]=nr[0]+(l[0]-nr[0])*c,r.data[a*4+1]=nr[1]+(l[1]-nr[1])*c,r.data[a*4+2]=nr[2]+(l[2]-nr[2])*c,r.data[a*4+3]=255}this.image=r,this.legend.textContent=`${(-s).toFixed(3)}  …  0  …  ${s.toFixed(3)}    每像素 ${this.last.step} 格`}draw(){if(!this.image)return;const e=this.canvas.getContext("2d");this.canvas.width=Jn,this.canvas.height=Jn,e.putImageData(this.image,0,0);const t=this.control.feet,i=Jn/2+(t.x-this.last.x)/this.last.step,r=Jn/2+(t.z-this.last.z)/this.last.step,s=this.control.camera.getWorldDirection(new F);e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(i-4,r),e.lineTo(i+4,r),e.moveTo(i,r-4),e.lineTo(i,r+4),e.moveTo(i,r),e.lineTo(i+s.x*12,r+s.z*12),e.stroke()}}const ab=[[/(_|^)(log|wood|stem|hyphae)$/,Ve.log],[/_leaves$/,Ve.leaves],[/planks|_slab$|_stairs$|_fence|_door$|_trapdoor$|crafting_table|bookshelf|barrel|chest|_sign$|_hanging_sign$|lectern|loom|composter|beehive|scaffolding|ladder|cartography|fletching|smithing/,Ve.planks],[/glass/,Ve.ice],[/wool$|carpet$|_bed$|concrete|glazed_terracotta|_terracotta$|shulker_box/,Ve.white_terracotta],[/sandstone/,Ve.sandstone],[/snow/,Ve.snow_block],[/ore$/,Ve.iron_ore],[/brick|cobble|stone|deepslate|andesite|diorite|granite|tuff|blackstone|basalt|quartz|prismarine|purpur|furnace|smoker|dispenser|dropper|observer|piston|anvil|cauldron|grindstone|stonecutter|lodestone|_wall$|polished|chiseled|cut_|smooth_|block$/,Ve.cobblestone],[/dirt|farmland|path|mud/,Ve.dirt],[/lantern|lamp|torch|campfire|candle|end_rod|sea_lantern|froglight/,Ve.glowstone],[/grass|fern|bush|sapling|flower|tulip|orchid|rose|lily|mushroom$|crop|wheat|carrots|potatoes|beetroots|melon_stem|pumpkin_stem|cocoa/,Ve.short_grass]];class Th{cache=new Map;substituted=new Map;unknown=new Map;map(e,t=1){let i=this.cache.get(e);if(i===void 0&&(i=this.lookup(e),this.cache.set(e,i)),i<0){const r=cu(e),s=i===-1?this.unknown:this.substituted;return s.set(r,(s.get(r)??0)+t),i===-1?Ve.air:this.substituteOf(e)}return i}subs=new Map;substituteOf(e){return this.subs.get(e)}lookup(e){try{const r=v1(e);if(r!==void 0)return r}catch{}const t=cu(e);if(Xr[t]!==void 0)return Xr[t];const i=t.replace(/^minecraft:/,"");for(const[r,s]of ab){if(!r.test(i))continue;const a=/axis=([xyz])/.exec(e)?.[1];return this.subs.set(e,s===Ve.log&&a?ah(s,{axis:a}):s),-2}return-1}}const cu=n=>n.includes("[")?n.slice(0,n.indexOf("[")):n;class wr{constructor(e,t){this.store=e,this.meta=t}dirty=new Set;regions=new Map;saving=null;static async open(e,t){const i=await e.getWorld(t);if(!i)return null;const r=await e.getChunks(t),s=new Th,a=new Map;for(const[o,l]of r)a.set(o,lb(l,s));return i.lastPlayed=Date.now(),await e.putWorld(i),{world:new wr(e,i),edits:a}}static async ensure(e,t){const i=await e.getWorld(t.id);if(i)return i;const r=Date.now(),s={...t,created:r,lastPlayed:r,source:"generated",player:null,dayTime:0,daylightCycle:!0};return await e.putWorld(s),s}static async importVanilla(e,t,i="minecraft:overworld"){const r=t.find(h=>h.path==="level.dat");if(!r)throw new Error("没有找到 level.dat：请选择存档目录（里面有 level.dat 和 region 文件夹的那一层）");const s=await qx(new Uint8Array(r.data)),a=`vanilla-${Date.now().toString(36)}`,o=t.filter(h=>/^(region|DIM-1\/region|DIM1\/region)\/r\.-?\d+\.-?\d+\.mca$/.test(h.path));if(o.length===0)throw new Error("存档里没有区域文件（region/*.mca）");for(const h of o)await e.putFile(a,h.path,h.data);const l=s.player,c=Date.now(),u={id:a,name:s.name||"原版存档",seed:s.seed.toString(),settings:l&&/nether/.test(l.dimension)?"minecraft:nether":l&&/end/.test(l.dimension)?"minecraft:end":i,created:c,lastPlayed:c,source:"vanilla",player:l?cb(l):null,dayTime:s.dayTime%24e3,daylightCycle:!0,vanilla:{spawn:s.spawn,dataVersion:s.dataVersion,substituted:{},unknown:{}}};return await e.putWorld(u),u}region(e,t){const i=`${jx(this.meta.settings)}/r.${e>>5}.${t>>5}.mca`;let r=this.regions.get(i);return r||(r=this.store.getFile(this.meta.id,i).then(s=>s?new Uint8Array(s):null),this.regions.set(i,r)),r}async save(e,t){if(this.saving)return this.saving;const i=[...this.dirty];this.dirty.clear();const r=new Map;for(const s of i){const a=e.get(s);a&&r.set(s,ob(a))}return this.meta={...this.meta,...t,lastPlayed:Date.now()},this.saving=(async()=>{try{r.size&&await this.store.putChunks(this.meta.id,r),await this.store.putWorld(this.meta)}catch(s){for(const a of i)this.dirty.add(a);throw s}finally{this.saving=null}})(),this.saving}}function ob(n){const e=[],t=new Map,i=new Int32Array(n.size*2);let r=0;for(const[s,a]of n){let o=t.get(a);o===void 0&&(o=e.length,e.push(tl(a)),t.set(a,o)),i[r++]=s,i[r++]=o}return{palette:e,entries:i}}function lb(n,e=new Th){const t=n.palette.map(r=>e.map(r)),i=new Map;for(let r=0;r<n.entries.length;r+=2)i.set(n.entries[r],t[n.entries[r+1]]);return i}function cb(n){return{x:n.x,y:n.y,z:n.z,yaw:Math.PI-n.yaw*Math.PI/180,pitch:-n.pitch*Math.PI/180,flying:n.flying}}class ub{constructor(e,t){this.store=e,this.terrain=t,pt("newWorld").addEventListener("click",()=>this.create()),pt("importWorld").addEventListener("change",i=>this.importFolder(i.target.files)),this.list.addEventListener("click",i=>{const r=i.target.closest("button");r&&(r.dataset.open?this.go(r.dataset.open):r.dataset.del&&this.remove(r.dataset.del))}),this.refresh()}status=pt("saveStatus");list=pt("worldList");warn(e){this.status.textContent=e,this.status.classList.add("warn")}saved(){const e=this.terrain.world;e&&(this.status.textContent=`当前存档：${e.meta.name} · 已自动保存 ${new Date().toLocaleTimeString()}`)}async refresh(){let e;try{e=await this.store.listWorlds()}catch{return}const t=this.terrain.world?.meta.id;e.sort((r,s)=>s.lastPlayed-r.lastPlayed);const i=r=>r.replace(/[&<>"]/g,s=>`&#${s.charCodeAt(0)};`);this.list.innerHTML=e.map(r=>`<div class="world${r.id===t?" current":""}">
          <div><b>${i(r.name)}</b>${r.source==="vanilla"?' <span class="tag">原版存档</span>':""}<br>
          <small>种子 ${i(r.seed)} · ${i(r.settings.replace("minecraft:","")||"overworld")} · ${new Date(r.lastPlayed).toLocaleString()}</small></div>
          ${r.id===t?"<small>正在玩</small>":`<button data-open="${i(r.id)}">进入</button><button data-del="${i(r.id)}">删除</button>`}
        </div>`).join("")}go(e){location.search=new URLSearchParams({world:e,distance:String(this.terrain.distance)}).toString()}async create(){const e=pt("newWorldName").value.trim()||"新的世界",t=pt("seedInput").value.trim()||String(Math.floor(Math.random()*2**31)),i=pt("settingsSelect").value,r=`w-${Date.now().toString(36)}`;await wr.ensure(this.store,{id:r,name:e,seed:t,settings:i}),this.go(r)}async remove(e){const t=await this.store.getWorld(e);!t||!confirm(`删除存档“${t.name}”？删除后不能恢复。`)||(await this.store.deleteWorld(e),this.refresh())}async importFolder(e){if(!e?.length)return;const t=[...e].map(i=>({f:i,path:i.webkitRelativePath.split("/").slice(1).join("/")})).filter(({path:i})=>i==="level.dat"||/^(region|DIM-1\/region|DIM1\/region)\/r\.-?\d+\.-?\d+\.mca$/.test(i));this.status.classList.remove("warn");try{const i=[];for(const[s,{f:a,path:o}]of t.entries())this.status.textContent=`正在读取 ${o}（${s+1} / ${t.length}）`,i.push({path:o,data:await a.arrayBuffer()});this.status.textContent="正在存进浏览器…";const r=await wr.importVanilla(this.store,i);this.go(r.id)}catch(i){this.warn(`导入失败：${i.message}`)}}}class hb{constructor(e,t,i,r,s){this.core=e,this.terrain=t,this.control=i,this.sky=r,this.f3=new nb(e,t,i),this.saves=new ub(s,t),this.noiseMap=new sb(t,i),this.initMenu(),this.initHotbar()}f3;noiseMap;saves;menu=pt("menu");playButton=pt("play");status=pt("loadingStatus");hotbar=pt("hotbar");frames=0;fps=0;fpsTime=performance.now();lastSlot=-1;timeInput=null;initMenu=()=>{const e=pt("seedInput"),t=pt("distance"),i=new URLSearchParams(location.search);e.value=i.get("seed")??"42",t.value=String(this.terrain.distance),this.playButton.addEventListener("click",()=>{if(tb)return alert("暂不支持手机，请用电脑浏览器打开");this.control.control.lock()}),this.control.control.addEventListener("lock",()=>this.menu.classList.add("hidden")),this.control.control.addEventListener("unlock",()=>{this.menu.classList.remove("hidden"),this.playButton.textContent="继续游戏"}),pt("regenerate").addEventListener("click",()=>{const l=new URLSearchParams({seed:e.value.trim()||"42",settings:pt("settingsSelect").value,distance:t.value});location.search=l.toString()}),t.addEventListener("change",()=>this.setDistance(Number(t.value)));const r=pt("bobbing");r.addEventListener("change",()=>this.control.bobbing=r.checked);const s=pt("timeInput"),a=pt("daylightCycle"),o=pt("gamma");s.addEventListener("input",()=>this.terrain.dayTime=Number(s.value)),a.addEventListener("change",()=>this.terrain.daylightCycle=a.checked),o.addEventListener("change",()=>this.sky.gamma=Number(o.value)),i.get("time")&&(this.terrain.dayTime=Number(i.get("time"))),this.timeInput=s,i.get("distance")&&(t.value=i.get("distance"),this.setDistance(Number(t.value)))};setDistance(e){this.terrain.distance=e,this.core.setFogDistance(e*16)}onWorldReady(e){pt("settingsSelect").innerHTML=e.allSettings.map(r=>`<option${r===e.settings?" selected":""}>${r}</option>`).join("");const t=e.packs.some(r=>r.name!=="builtin");pt("worldInfo").textContent=`种子 ${e.seed} · ${e.settings}`+(t?"":" · 没有检测到原版数据包，正在使用 demo 简化地形（见 datapacks/README.md）"),this.noiseMap.setFields(e.routerFields),this.setDistance(this.terrain.distance),this.saves.refresh();const i=this.terrain.world;i&&(pt("saveStatus").textContent=`当前存档：${i.meta.name}`)}initHotbar=()=>{this.hotbar.innerHTML=Fo.map((e,t)=>`<div class="slot" title="${Et[e].name}"><img src="${eb(e)}" alt=""><span>${t+1}</span></div>`).join("")};update=()=>{this.frames++;const e=performance.now();if(e-this.fpsTime>=1e3&&(this.fps=Math.round(this.frames*1e3/(e-this.fpsTime)),this.frames=0,this.fpsTime=e),this.control.slot!==this.lastSlot&&(this.lastSlot=this.control.slot,this.hotbar.querySelectorAll(".slot").forEach((t,i)=>t.classList.toggle("on",i===this.lastSlot)),pt("slotName").textContent=Et[Fo[this.lastSlot]].name),this.control.spawned)this.playButton.disabled&&(this.status.textContent="准备好了",this.playButton.disabled=!1);else{const{loaded:t}=this.terrain.stats;this.status.textContent=this.terrain.info?`正在生成出生点附近的区块…（已完成 ${t} 个）`:"正在读取数据包…",this.playButton.disabled=!0}this.core.setMedium(this.control.medium),this.timeInput&&!this.menu.classList.contains("hidden")&&document.activeElement!==this.timeInput&&(this.timeInput.value=String((this.terrain.dayTime%24e3+24e3)%24e3)),this.f3.update(this.fps),this.noiseMap.update()}}class Zt{db;constructor(e="mc-replica"){this.db=new Promise((t,i)=>{const r=indexedDB.open(e,1);r.onupgradeneeded=()=>{const s=r.result;s.createObjectStore("worlds",{keyPath:"id"}),s.createObjectStore("chunks"),s.createObjectStore("files")},r.onsuccess=()=>t(r.result),r.onerror=()=>i(r.error)})}async tx(e,t,i){const s=(await this.db).transaction(e,t),a=new Promise((l,c)=>{s.oncomplete=()=>l(),s.onerror=()=>c(s.error),s.onabort=()=>c(s.error)}),o=await i(s);return await a,o}static req(e){return new Promise((t,i)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>i(e.error)})}static range(e){return IDBKeyRange.bound(e+"|",e+"|￿")}listWorlds(){return this.tx(["worlds"],"readonly",e=>Zt.req(e.objectStore("worlds").getAll()))}getWorld(e){return this.tx(["worlds"],"readonly",t=>Zt.req(t.objectStore("worlds").get(e)))}putWorld(e){return this.tx(["worlds"],"readwrite",t=>void t.objectStore("worlds").put(e))}deleteWorld(e){return this.tx(["worlds","chunks","files"],"readwrite",t=>{t.objectStore("worlds").delete(e),t.objectStore("chunks").delete(Zt.range(e)),t.objectStore("files").delete(Zt.range(e))})}getChunks(e){return this.tx(["chunks"],"readonly",async t=>{const i=t.objectStore("chunks"),[r,s]=await Promise.all([Zt.req(i.getAllKeys(Zt.range(e))),Zt.req(i.getAll(Zt.range(e)))]),a=new Map;return r.forEach((o,l)=>a.set(String(o).slice(e.length+1),s[l])),a})}putChunks(e,t){return this.tx(["chunks"],"readwrite",i=>{const r=i.objectStore("chunks");for(const[s,a]of t)r.put(a,`${e}|${s}`)})}getFile(e,t){return this.tx(["files"],"readonly",i=>Zt.req(i.objectStore("files").get(`${e}|${t}`)))}putFile(e,t,i){return this.tx(["files"],"readwrite",r=>void r.objectStore("files").put(i,`${e}|${t}`))}listFiles(e){return this.tx(["files"],"readonly",async t=>(await Zt.req(t.objectStore("files").getAllKeys(Zt.range(e)))).map(i=>String(i).slice(e.length+1)))}}const ai=new Ys,fr=ai.camera,cl=ai.scene,ja=ai.renderer,Rh=new B0,Pt=new Jx(cl,fr),hi=new D1(cl,fr,Rh,Pt),oi=new $1,$s=new Zt,dr=new hb(ai,Pt,hi,oi,$s);async function fb(){const n=new URLSearchParams(location.search);let e=null;try{let r=n.get("world");if(!r){const s=n.get("seed")??"42",a=n.get("settings")??"";r=`default:${s}:${a}`,await wr.ensure($s,{id:r,name:`种子 ${s}${a?" · "+a.replace("minecraft:",""):""}`,seed:s,settings:a})}e=await wr.open($s,r),e||dr.saves.warn(`没有找到存档 ${r}，这次不会保存`)}catch(r){console.error(r),dr.saves.warn("浏览器不让用 IndexedDB，这次不会保存")}const t=e?.world.meta;e&&(Pt.world=e.world,hi.resume=t.player,t.vanilla&&!t.player&&(hi.spawnCenter={x:t.vanilla.spawn.x,z:t.vanilla.spawn.z}),Pt.dayTime=t.dayTime,Pt.daylightCycle=t.daylightCycle);const i=await Pt.init(t?.seed??n.get("seed")??"42",t?.settings??n.get("settings")??"",e?.edits);oi.setDimension(i.settings),dr.onWorldReady(i)}fb();function ia(){const n=Pt.world;!n||!hi.spawned||n.save(Pt.edits,{player:hi.saveState,dayTime:Pt.dayTime,daylightCycle:Pt.daylightCycle}).then(()=>dr.saves.saved()).catch(e=>console.error("保存失败",e))}setInterval(ia,1e4);document.addEventListener("visibilitychange",()=>document.visibilityState==="hidden"&&ia());window.addEventListener("pagehide",ia);let uu=0;function db(n){if(!Pt.info||n-uu<500)return;uu=n;const e=fr.position;Pt.pool.call("skyColors",{x:Math.floor(e.x),y:Math.floor(e.y),z:Math.floor(e.z)}).then(t=>{oi.biomeSky=t.sky,oi.biomeFog=t.fog})}const pb=new U0;(function n(){requestAnimationFrame(n);const e=pb.getDelta();hi.update(e),Pt.update(),dr.update(),db(performance.now());const t=oi.update(Pt.renderTime(hi.partialTick),fr,Pt.distance,Pt.info?.minY??-64);ai.setAirFog(t.color,t.start,t.end),Pt.materials.setLightmap(t.lightmap,oi.dim==="nether"),oi.render(ja,fr,ai.fogColor,ai.medium==="air"),ja.clearDepth(),ja.render(cl,fr)})();Object.assign(window,{game:{core:ai,player:Rh,terrain:Pt,control:hi,ui:dr,sky:oi,store:$s,save:ia}});
//# sourceMappingURL=index-f3WUEcES.js.map
