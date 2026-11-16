(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _o="170",Nu=0,Wo=1,Fu=2,Lc=1,Ou=2,Dn=3,ni=0,kt=1,en=2,jn=0,ji=1,Xo=2,Yo=3,qo=4,Dc=5,mi=100,ku=101,zu=102,Hu=103,Gu=104,Vu=200,Ic=201,Bu=202,Wu=203,Es=204,Ta=205,Xu=206,Yu=207,qu=208,$u=209,Zu=210,Ku=211,ju=212,Ju=213,Qu=214,Ra=0,Ca=1,Pa=2,rr=3,La=4,Da=5,Ia=6,Ua=7,Uc=0,eh=1,th=2,Jn=0,nh=1,ih=2,rh=3,sh=4,ah=5,oh=6,lh=7,Nc=300,sr=301,ar=302,Na=303,Fa=304,Ls=306,ws=1e3,vi=1001,Oa=1002,It=1003,ch=1004,Cr=1005,hn=1006,zs=1007,xi=1008,nn=1009,Fc=1010,Oc=1011,Ir=1012,mo=1013,bi=1014,In=1015,Fr=1016,go=1017,vo=1018,or=1020,kc=35902,zc=1021,Hc=1022,Ot=1023,Gc=1024,Vc=1025,Ji=1026,lr=1027,Bc=1028,xo=1029,Wc=1030,Mo=1031,bo=1033,ms=33776,gs=33777,vs=33778,xs=33779,ka=35840,za=35841,Ha=35842,Ga=35843,Va=36196,Ba=37492,Wa=37496,Xa=37808,Ya=37809,qa=37810,$a=37811,Za=37812,Ka=37813,ja=37814,Ja=37815,Qa=37816,eo=37817,to=37818,no=37819,io=37820,ro=37821,Ms=36492,so=36494,ao=36495,Xc=36283,oo=36284,lo=36285,co=36286,uh=3200,hh=3201,fh=0,dh=1,Zn="",Jt="srgb",Ai="srgb-linear",Ds="linear",rt="srgb",Pi=7680,$o=519,ph=512,_h=513,mh=514,Yc=515,gh=516,vh=517,xh=518,Mh=519,Zo=35044,Ko="300 es",Un=2e3,ys=2001;class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hs=Math.PI/180,uo=180/Math.PI;function Or(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function Bt(n,e,t){return Math.max(e,Math.min(t,n))}function bh(n,e){return(n%e+e)%e}function Gs(n,e,t){return(1-t)*n+t*e}function xr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class st{constructor(e=0,t=0){st.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,i,r,s,a,o,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],m=i[8],g=r[0],_=r[3],d=r[6],w=r[1],S=r[4],M=r[7],C=r[2],A=r[5],T=r[8];return s[0]=a*g+o*w+l*C,s[3]=a*_+o*S+l*A,s[6]=a*d+o*M+l*T,s[1]=c*g+u*w+h*C,s[4]=c*_+u*S+h*A,s[7]=c*d+u*M+h*T,s[2]=f*g+p*w+m*C,s[5]=f*_+p*S+m*A,s[8]=f*d+p*M+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,m=t*h+i*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return e[0]=h*g,e[1]=(r*c-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=f*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Vs.makeScale(e,t)),this}rotate(e){return this.premultiply(Vs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vs=new ke;function qc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function As(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sh(){const n=As("canvas");return n.style.display="block",n}const jo={};function Pr(n){n in jo||(jo[n]=!0,console.warn(n))}function Eh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function wh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:Ai,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===rt&&(n.r=Nn(n.r),n.g=Nn(n.g),n.b=Nn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===rt&&(n.r=Qi(n.r),n.g=Qi(n.g),n.b=Qi(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Zn?Ds:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Nn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Jo=[.64,.33,.3,.6,.15,.06],Qo=[.2126,.7152,.0722],el=[.3127,.329],tl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nl=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[Ai]:{primaries:Jo,whitePoint:el,transfer:Ds,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:Qo,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:Jo,whitePoint:el,transfer:rt,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:Qo,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}});let Li;class Ah{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=As("canvas")),Li.width=e.width,Li.height=e.height;const i=Li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Nn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Nn(t[i]/255)*255):t[i]=Nn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0;class $c{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Bs(r[a].image)):s.push(Bs(r[a]))}else s=Bs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Bs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ah.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rh=0;class zt extends Ti{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,i=vi,r=vi,s=hn,a=xi,o=Ot,l=nn,c=zt.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=Or(),this.name="",this.source=new $c(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ws:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case Oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ws:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case Oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Nc;zt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],m=l[9],g=l[2],_=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(m-_)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(m+_)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,M=(p+1)/2,C=(d+1)/2,A=(u+f)/4,T=(h+g)/4,P=(m+_)/4;return S>M&&S>C?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=A/i,s=T/i):M>C?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=A/r,s=P/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=T/s,r=P/s),this.set(i,r,s,t),this}let w=Math.sqrt((_-m)*(_-m)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(_-m)/w,this.y=(h-g)/w,this.z=(f-u)/w,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ch extends Ti{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new zt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $c(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends Ch{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class So extends zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ph extends zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[a+0],p=s[a+1],m=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=m,e[t+3]=g;return}if(h!==g||l!==f||c!==p||u!==m){let _=1-o;const d=l*f+c*p+u*m+h*g,w=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const C=Math.sqrt(S),A=Math.atan2(C,d*w);_=Math.sin(_*A)/C,o=Math.sin(o*A)/C}const M=o*w;if(l=l*_+f*M,c=c*_+p*M,u=u*_+m*M,h=h*_+g*M,_===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*p-c*f,e[t+1]=l*m+u*f+c*h-o*p,e[t+2]=c*m+u*p+o*f-l*h,e[t+3]=u*m-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),p=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*m,this._y=c*p*h-f*u*m,this._z=c*u*m+f*p*h,this._w=c*u*h-f*p*m;break;case"YXZ":this._x=f*u*h+c*p*m,this._y=c*p*h-f*u*m,this._z=c*u*m-f*p*h,this._w=c*u*h+f*p*m;break;case"ZXY":this._x=f*u*h-c*p*m,this._y=c*p*h+f*u*m,this._z=c*u*m+f*p*h,this._w=c*u*h-f*p*m;break;case"ZYX":this._x=f*u*h-c*p*m,this._y=c*p*h+f*u*m,this._z=c*u*m-f*p*h,this._w=c*u*h+f*p*m;break;case"YZX":this._x=f*u*h+c*p*m,this._y=c*p*h+f*u*m,this._z=c*u*m-f*p*h,this._w=c*u*h-f*p*m;break;case"XZY":this._x=f*u*h-c*p*m,this._y=c*p*h-f*u*m,this._z=c*u*m+f*p*h,this._w=c*u*h+f*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ws.copy(this).projectOnVector(e),this.sub(Ws)}reflect(e){return this.sub(Ws.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new F,il=new Ei;class dr{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,an):an.fromBufferAttribute(s,a),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vr.copy(i.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),Br.subVectors(this.max,Mr),Di.subVectors(e.a,Mr),Ii.subVectors(e.b,Mr),Ui.subVectors(e.c,Mr),Hn.subVectors(Ii,Di),Gn.subVectors(Ui,Ii),si.subVectors(Di,Ui);let t=[0,-Hn.z,Hn.y,0,-Gn.z,Gn.y,0,-si.z,si.y,Hn.z,0,-Hn.x,Gn.z,0,-Gn.x,si.z,0,-si.x,-Hn.y,Hn.x,0,-Gn.y,Gn.x,0,-si.y,si.x,0];return!Xs(t,Di,Ii,Ui,Br)||(t=[1,0,0,0,1,0,0,0,1],!Xs(t,Di,Ii,Ui,Br))?!1:(Wr.crossVectors(Hn,Gn),t=[Wr.x,Wr.y,Wr.z],Xs(t,Di,Ii,Ui,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const An=[new F,new F,new F,new F,new F,new F,new F,new F],an=new F,Vr=new dr,Di=new F,Ii=new F,Ui=new F,Hn=new F,Gn=new F,si=new F,Mr=new F,Br=new F,Wr=new F,ai=new F;function Xs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ai.fromArray(n,s);const o=r.x*Math.abs(ai.x)+r.y*Math.abs(ai.y)+r.z*Math.abs(ai.z),l=e.dot(ai),c=t.dot(ai),u=i.dot(ai);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Lh=new dr,br=new F,Ys=new F;class Is{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Lh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;br.subVectors(e,this.center);const t=br.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(br,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ys.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(br.copy(e.center).add(Ys)),this.expandByPoint(br.copy(e.center).sub(Ys))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new F,qs=new F,Xr=new F,Vn=new F,$s=new F,Yr=new F,Zs=new F;class Dh{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tn.copy(this.origin).addScaledVector(this.direction,t),Tn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){qs.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(qs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=Vn.dot(this.direction),l=-Vn.dot(Xr),c=Vn.lengthSq(),u=Math.abs(1-a*a);let h,f,p,m;if(u>0)if(h=a*l-o,f=a*o-l,m=s*u,h>=0)if(f>=-m)if(f<=m){const g=1/u;h*=g,f*=g,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-m?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=m?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(qs).addScaledVector(Xr,f),p}intersectSphere(e,t){Tn.subVectors(e.center,this.origin);const i=Tn.dot(this.direction),r=Tn.dot(Tn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Tn)!==null}intersectTriangle(e,t,i,r,s){$s.subVectors(t,e),Yr.subVectors(i,e),Zs.crossVectors($s,Yr);let a=this.direction.dot(Zs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,e);const l=o*this.direction.dot(Yr.crossVectors(Vn,Yr));if(l<0)return null;const c=o*this.direction.dot($s.cross(Vn));if(c<0||l+c>a)return null;const u=-o*Vn.dot(Zs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,i,r,s,a,o,l,c,u,h,f,p,m,g,_){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,f,p,m,g,_)}set(e,t,i,r,s,a,o,l,c,u,h,f,p,m,g,_){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=m,d[11]=g,d[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,p=a*h,m=o*u,g=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+m*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,m=c*u,g=c*h;t[0]=f+g*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-m,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,m=c*u,g=c*h;t[0]=f-g*o,t[4]=-a*h,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*u,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,m=o*u,g=o*h;t[0]=l*u,t[4]=m*c-p,t[8]=f*c+g,t[1]=l*h,t[5]=g*c+f,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,m=o*l,g=o*c;t[0]=l*u,t[4]=g-f*h,t[8]=m*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+m,t[10]=f-g*h}else if(e.order==="XZY"){const f=a*l,p=a*c,m=o*l,g=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+g,t[5]=a*u,t[9]=p*h-m,t[2]=m*h-p,t[6]=o*u,t[10]=g*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ih,e,Uh)}lookAt(e,t,i){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Bn.crossVectors(i,Yt),Bn.lengthSq()===0&&(Math.abs(i.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Bn.crossVectors(i,Yt)),Bn.normalize(),qr.crossVectors(Yt,Bn),r[0]=Bn.x,r[4]=qr.x,r[8]=Yt.x,r[1]=Bn.y,r[5]=qr.y,r[9]=Yt.y,r[2]=Bn.z,r[6]=qr.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],m=i[2],g=i[6],_=i[10],d=i[14],w=i[3],S=i[7],M=i[11],C=i[15],A=r[0],T=r[4],P=r[8],E=r[12],b=r[1],R=r[5],V=r[9],N=r[13],G=r[2],$=r[6],X=r[10],Q=r[14],B=r[3],ne=r[7],ce=r[11],Me=r[15];return s[0]=a*A+o*b+l*G+c*B,s[4]=a*T+o*R+l*$+c*ne,s[8]=a*P+o*V+l*X+c*ce,s[12]=a*E+o*N+l*Q+c*Me,s[1]=u*A+h*b+f*G+p*B,s[5]=u*T+h*R+f*$+p*ne,s[9]=u*P+h*V+f*X+p*ce,s[13]=u*E+h*N+f*Q+p*Me,s[2]=m*A+g*b+_*G+d*B,s[6]=m*T+g*R+_*$+d*ne,s[10]=m*P+g*V+_*X+d*ce,s[14]=m*E+g*N+_*Q+d*Me,s[3]=w*A+S*b+M*G+C*B,s[7]=w*T+S*R+M*$+C*ne,s[11]=w*P+S*V+M*X+C*ce,s[15]=w*E+S*N+M*Q+C*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],m=e[3],g=e[7],_=e[11],d=e[15];return m*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*p-i*l*p)+g*(+t*l*p-t*c*f+s*a*f-r*a*p+r*c*u-s*l*u)+_*(+t*c*h-t*o*p-s*a*h+i*a*p+s*o*u-i*c*u)+d*(-r*o*u-t*l*h+t*o*f+r*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],m=e[12],g=e[13],_=e[14],d=e[15],w=h*_*c-g*f*c+g*l*p-o*_*p-h*l*d+o*f*d,S=m*f*c-u*_*c-m*l*p+a*_*p+u*l*d-a*f*d,M=u*g*c-m*h*c+m*o*p-a*g*p-u*o*d+a*h*d,C=m*h*l-u*g*l-m*o*f+a*g*f+u*o*_-a*h*_,A=t*w+i*S+r*M+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=w*T,e[1]=(g*f*s-h*_*s-g*r*p+i*_*p+h*r*d-i*f*d)*T,e[2]=(o*_*s-g*l*s+g*r*c-i*_*c-o*r*d+i*l*d)*T,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*p-i*l*p)*T,e[4]=S*T,e[5]=(u*_*s-m*f*s+m*r*p-t*_*p-u*r*d+t*f*d)*T,e[6]=(m*l*s-a*_*s-m*r*c+t*_*c+a*r*d-t*l*d)*T,e[7]=(a*f*s-u*l*s+u*r*c-t*f*c-a*r*p+t*l*p)*T,e[8]=M*T,e[9]=(m*h*s-u*g*s-m*i*p+t*g*p+u*i*d-t*h*d)*T,e[10]=(a*g*s-m*o*s+m*i*c-t*g*c-a*i*d+t*o*d)*T,e[11]=(u*o*s-a*h*s-u*i*c+t*h*c+a*i*p-t*o*p)*T,e[12]=C*T,e[13]=(u*g*r-m*h*r+m*i*f-t*g*f-u*i*_+t*h*_)*T,e[14]=(m*o*r-a*g*r-m*i*l+t*g*l+a*i*_-t*o*_)*T,e[15]=(a*h*r-u*o*r+u*i*l-t*h*l-a*i*f+t*o*f)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,m=s*h,g=a*u,_=a*h,d=o*h,w=l*c,S=l*u,M=l*h,C=i.x,A=i.y,T=i.z;return r[0]=(1-(g+d))*C,r[1]=(p+M)*C,r[2]=(m-S)*C,r[3]=0,r[4]=(p-M)*A,r[5]=(1-(f+d))*A,r[6]=(_+w)*A,r[7]=0,r[8]=(m+S)*T,r[9]=(_-w)*T,r[10]=(1-(f+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ni.set(r[0],r[1],r[2]).length();const a=Ni.set(r[4],r[5],r[6]).length(),o=Ni.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],on.copy(this);const c=1/s,u=1/a,h=1/o;return on.elements[0]*=c,on.elements[1]*=c,on.elements[2]*=c,on.elements[4]*=u,on.elements[5]*=u,on.elements[6]*=u,on.elements[8]*=h,on.elements[9]*=h,on.elements[10]*=h,t.setFromRotationMatrix(on),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Un){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,m;if(o===Un)p=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===ys)p=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Un){const l=this.elements,c=1/(t-e),u=1/(i-r),h=1/(a-s),f=(t+e)*c,p=(i+r)*u;let m,g;if(o===Un)m=(a+s)*h,g=-2*h;else if(o===ys)m=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ni=new F,on=new xt,Ih=new F(0,0,0),Uh=new F(1,1,1),Bn=new F,qr=new F,Yt=new F,rl=new xt,sl=new Ei;class dn{constructor(e=0,t=0,i=0,r=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sl.setFromEuler(this),this.setFromQuaternion(sl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class Zc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nh=0;const al=new F,Fi=new Ei,Rn=new xt,$r=new F,Sr=new F,Fh=new F,Oh=new Ei,ol=new F(1,0,0),ll=new F(0,1,0),cl=new F(0,0,1),ul={type:"added"},kh={type:"removed"},Oi={type:"childadded",child:null},Ks={type:"childremoved",child:null};class Wt extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new F,t=new dn,i=new Ei,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new ke}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(ol,e)}rotateY(e){return this.rotateOnAxis(ll,e)}rotateZ(e){return this.rotateOnAxis(cl,e)}translateOnAxis(e,t){return al.copy(e).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ol,e)}translateY(e){return this.translateOnAxis(ll,e)}translateZ(e){return this.translateOnAxis(cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?$r.copy(e):$r.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Sr,$r,this.up):Rn.lookAt($r,Sr,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Fi.setFromRotationMatrix(Rn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ul),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kh),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ul),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,e,Fh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,Oh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Wt.DEFAULT_UP=new F(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new F,Cn=new F,js=new F,Pn=new F,ki=new F,zi=new F,hl=new F,Js=new F,Qs=new F,ea=new F,ta=new gt,na=new gt,ia=new gt;class cn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ln.subVectors(e,t),r.cross(ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){ln.subVectors(r,t),Cn.subVectors(i,t),js.subVectors(e,t);const a=ln.dot(ln),o=ln.dot(Cn),l=ln.dot(js),c=Cn.dot(Cn),u=Cn.dot(js),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,m=(a*u-o*l)*f;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ta.setScalar(0),na.setScalar(0),ia.setScalar(0),ta.fromBufferAttribute(e,t),na.fromBufferAttribute(e,i),ia.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ta,s.x),a.addScaledVector(na,s.y),a.addScaledVector(ia,s.z),a}static isFrontFacing(e,t,i,r){return ln.subVectors(i,t),Cn.subVectors(e,t),ln.cross(Cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),ln.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return cn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ki.subVectors(r,i),zi.subVectors(s,i),Js.subVectors(e,i);const l=ki.dot(Js),c=zi.dot(Js);if(l<=0&&c<=0)return t.copy(i);Qs.subVectors(e,r);const u=ki.dot(Qs),h=zi.dot(Qs);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(ki,a);ea.subVectors(e,s);const p=ki.dot(ea),m=zi.dot(ea);if(m>=0&&p<=m)return t.copy(s);const g=p*c-l*m;if(g<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(zi,o);const _=u*m-p*h;if(_<=0&&h-u>=0&&p-m>=0)return hl.subVectors(s,r),o=(h-u)/(h-u+(p-m)),t.copy(r).addScaledVector(hl,o);const d=1/(_+g+f);return a=g*d,o=f*d,t.copy(i).addScaledVector(ki,a).addScaledVector(zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function ra(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=$e.workingColorSpace){if(e=bh(e,1),t=Bt(t,0,1),i=Bt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ra(a,s,e+1/3),this.g=ra(a,s,e),this.b=ra(a,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,t=Jt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const i=Kc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return $e.fromWorkingColorSpace(Ct.copy(this),e),Math.round(Bt(Ct.r*255,0,255))*65536+Math.round(Bt(Ct.g*255,0,255))*256+Math.round(Bt(Ct.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Ct.copy(this),t);const i=Ct.r,r=Ct.g,s=Ct.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Jt){$e.fromWorkingColorSpace(Ct.copy(this),e);const t=Ct.r,i=Ct.g,r=Ct.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Zr);const i=Gs(Wn.h,Zr.h,t),r=Gs(Wn.s,Zr.s,t),s=Gs(Wn.l,Zr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new je;je.NAMES=Kc;let zh=0;class Us extends Ti{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=Or(),this.name="",this.blending=ji,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Es,this.blendDst=Ta,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(i.blending=this.blending),this.side!==ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Es&&(i.blendSrc=this.blendSrc),this.blendDst!==Ta&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$o&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ur extends Us{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new F,Kr=new st;class At{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zo,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix3(e),this.setXY(t,Kr.x,Kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=xr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zo&&(e.usage=this.usage),e}}class jc extends At{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jc extends At{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bn extends At{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Hh=0;const jt=new xt,sa=new Wt,Hi=new F,qt=new dr,Er=new dr,Et=new F;class pn extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qc(e)?Jc:jc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,i){return jt.makeTranslation(e,t,i),this.applyMatrix4(jt),this}scale(e,t,i){return jt.makeScale(e,t,i),this.applyMatrix4(jt),this}lookAt(e){return sa.lookAt(e),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bn(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(qt.min,Er.min),qt.expandByPoint(Et),Et.addVectors(qt.max,Er.max),qt.expandByPoint(Et)):(qt.expandByPoint(Er.min),qt.expandByPoint(Er.max))}qt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Et.fromBufferAttribute(o,c),l&&(Hi.fromBufferAttribute(e,c),Et.add(Hi)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new F,l[P]=new F;const c=new F,u=new F,h=new F,f=new st,p=new st,m=new st,g=new F,_=new F;function d(P,E,b){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,E),h.fromBufferAttribute(i,b),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,E),m.fromBufferAttribute(s,b),u.sub(c),h.sub(c),p.sub(f),m.sub(f);const R=1/(p.x*m.y-m.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(h,-p.y).multiplyScalar(R),_.copy(h).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(R),o[P].add(g),o[E].add(g),o[b].add(g),l[P].add(_),l[E].add(_),l[b].add(_))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let P=0,E=w.length;P<E;++P){const b=w[P],R=b.start,V=b.count;for(let N=R,G=R+V;N<G;N+=3)d(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const S=new F,M=new F,C=new F,A=new F;function T(P){C.fromBufferAttribute(r,P),A.copy(C);const E=o[P];S.copy(E),S.sub(C.multiplyScalar(C.dot(E))).normalize(),M.crossVectors(A,E);const R=M.dot(l[P])<0?-1:1;a.setXYZW(P,S.x,S.y,S.z,R)}for(let P=0,E=w.length;P<E;++P){const b=w[P],R=b.start,V=b.count;for(let N=R,G=R+V;N<G;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),g=e.getX(f+1),_=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,m=0;for(let g=0,_=l.length;g<_;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)f[m++]=c[p++]}return new At(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fl=new xt,oi=new Dh,jr=new Is,dl=new F,Jr=new F,Qr=new F,es=new F,aa=new F,ts=new F,pl=new F,ns=new F;class yt extends Wt{constructor(e=new pn,t=new Ur){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ts.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(aa.fromBufferAttribute(h,e),a?ts.addScaledVector(aa,u):ts.addScaledVector(aa.sub(t),u))}t.add(ts)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),jr.copy(i.boundingSphere),jr.applyMatrix4(s),oi.copy(e.ray).recast(e.near),!(jr.containsPoint(oi.origin)===!1&&(oi.intersectSphere(jr,dl)===null||oi.origin.distanceToSquared(dl)>(e.far-e.near)**2))&&(fl.copy(s).invert(),oi.copy(e.ray).applyMatrix4(fl),!(i.boundingBox!==null&&oi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,g=f.length;m<g;m++){const _=f[m],d=a[_.materialIndex],w=Math.max(_.start,p.start),S=Math.min(o.count,Math.min(_.start+_.count,p.start+p.count));for(let M=w,C=S;M<C;M+=3){const A=o.getX(M),T=o.getX(M+1),P=o.getX(M+2);r=is(this,d,e,i,c,u,h,A,T,P),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let _=m,d=g;_<d;_+=3){const w=o.getX(_),S=o.getX(_+1),M=o.getX(_+2);r=is(this,a,e,i,c,u,h,w,S,M),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,g=f.length;m<g;m++){const _=f[m],d=a[_.materialIndex],w=Math.max(_.start,p.start),S=Math.min(l.count,Math.min(_.start+_.count,p.start+p.count));for(let M=w,C=S;M<C;M+=3){const A=M,T=M+1,P=M+2;r=is(this,d,e,i,c,u,h,A,T,P),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let _=m,d=g;_<d;_+=3){const w=_,S=_+1,M=_+2;r=is(this,a,e,i,c,u,h,w,S,M),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function Gh(n,e,t,i,r,s,a,o){let l;if(e.side===kt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ni,o),l===null)return null;ns.copy(o),ns.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ns);return c<t.near||c>t.far?null:{distance:c,point:ns.clone(),object:n}}function is(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Jr),n.getVertexPosition(l,Qr),n.getVertexPosition(c,es);const u=Gh(n,e,t,i,Jr,Qr,es,pl);if(u){const h=new F;cn.getBarycoord(pl,Jr,Qr,es,h),r&&(u.uv=cn.getInterpolatedAttribute(r,o,l,c,h,new st)),s&&(u.uv1=cn.getInterpolatedAttribute(s,o,l,c,h,new st)),a&&(u.normal=cn.getInterpolatedAttribute(a,o,l,c,h,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new F,materialIndex:0};cn.getNormal(Jr,Qr,es,f.normal),u.face=f,u.barycoord=h}return u}class pr extends pn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(h,2));function m(g,_,d,w,S,M,C,A,T,P,E){const b=M/T,R=C/P,V=M/2,N=C/2,G=A/2,$=T+1,X=P+1;let Q=0,B=0;const ne=new F;for(let ce=0;ce<X;ce++){const Me=ce*R-N;for(let Ge=0;Ge<$;Ge++){const Ve=Ge*b-V;ne[g]=Ve*w,ne[_]=Me*S,ne[d]=G,c.push(ne.x,ne.y,ne.z),ne[g]=0,ne[_]=0,ne[d]=A>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(Ge/T),h.push(1-ce/P),Q+=1}}for(let ce=0;ce<P;ce++)for(let Me=0;Me<T;Me++){const Ge=f+Me+$*ce,Ve=f+Me+$*(ce+1),q=f+(Me+1)+$*(ce+1),te=f+(Me+1)+$*ce;l.push(Ge,Ve,te),l.push(Ve,q,te),B+=6}o.addGroup(p,B,E),p+=B,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const r in i)e[r]=i[r]}return e}function Vh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const eu={clone:cr,merge:Nt};var Bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends Us{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bh,this.fragmentShader=Wh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=Vh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class tu extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Un}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new F,_l=new st,ml=new st;class $t extends tu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=uo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return uo*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,_l,ml),t.subVectors(ml,_l)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Vi=1;class Xh extends Wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $t(Gi,Vi,e,t);r.layers=this.layers,this.add(r);const s=new $t(Gi,Vi,e,t);s.layers=this.layers,this.add(s);const a=new $t(Gi,Vi,e,t);a.layers=this.layers,this.add(a);const o=new $t(Gi,Vi,e,t);o.layers=this.layers,this.add(o);const l=new $t(Gi,Vi,e,t);l.layers=this.layers,this.add(l);const c=new $t(Gi,Vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Un)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ys)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class nu extends zt{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:sr,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yh extends Si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new nu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:hn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pr(5,5,5),s=new Sn({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:kt,blending:jn});s.uniforms.tEquirect.value=t;const a=new yt(r,s),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=hn),new Xh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const oa=new F,qh=new F,$h=new ke;class pi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=oa.subVectors(i,t).cross(qh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(oa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$h.getNormalMatrix(e),r=this.coplanarPoint(oa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new Is,rs=new F;class iu{constructor(e=new pi,t=new pi,i=new pi,r=new pi,s=new pi,a=new pi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Un){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],m=r[9],g=r[10],_=r[11],d=r[12],w=r[13],S=r[14],M=r[15];if(i[0].setComponents(l-s,f-c,_-p,M-d).normalize(),i[1].setComponents(l+s,f+c,_+p,M+d).normalize(),i[2].setComponents(l+a,f+u,_+m,M+w).normalize(),i[3].setComponents(l-a,f-u,_-m,M-w).normalize(),i[4].setComponents(l-o,f-h,_-g,M-S).normalize(),t===Un)i[5].setComponents(l+o,f+h,_+g,M+S).normalize();else if(t===ys)i[5].setComponents(o,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(e){return li.center.set(0,0,0),li.radius=.7071067811865476,li.applyMatrix4(e.matrixWorld),this.intersectsSphere(li)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(rs.x=r.normal.x>0?e.max.x:e.min.x,rs.y=r.normal.y>0?e.max.y:e.min.y,rs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ru(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Zh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<h.length;p++){const m=h[f],g=h[p];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++f,h[f]=g)}h.length=f+1;for(let p=0,m=h.length;p<m;p++){const g=h[p];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class ur extends pn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,p=[],m=[],g=[],_=[];for(let d=0;d<u;d++){const w=d*f-a;for(let S=0;S<c;S++){const M=S*h-s;m.push(M,-w,0),g.push(0,0,1),_.push(S/o),_.push(1-d/l)}}for(let d=0;d<l;d++)for(let w=0;w<o;w++){const S=w+c*d,M=w+c*(d+1),C=w+1+c*(d+1),A=w+1+c*d;p.push(S,M,A),p.push(M,C,A)}this.setIndex(p),this.setAttribute("position",new bn(m,3)),this.setAttribute("normal",new bn(g,3)),this.setAttribute("uv",new bn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jh=`#ifdef USE_ALPHAHASH
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
#endif`,Jh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nf=`#ifdef USE_AOMAP
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
#endif`,rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sf=`#ifdef USE_BATCHING
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
#endif`,af=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,of=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,hf=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Mf=`#define PI 3.141592653589793
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
} // validated`,bf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sf=`vec3 transformedNormal = objectNormal;
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
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cf=`#ifdef USE_ENVMAP
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
#endif`,Pf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,If=`#ifdef USE_ENVMAP
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
#endif`,Uf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kf=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vf=`uniform bool receiveShadow;
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
#endif`,Bf=`#ifdef USE_ENVMAP
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
#endif`,Wf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$f=`PhysicalMaterial material;
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
#endif`,Zf=`struct PhysicalMaterial {
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
}`,Kf=`
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
#endif`,jf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ed=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,td=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,id=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ad=`#if defined( USE_POINTS_UV )
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
#endif`,od=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ld=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ud=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fd=`#ifdef USE_MORPHTARGETS
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
#endif`,dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_d=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xd=`#ifdef USE_NORMALMAP
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
#endif`,Md=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ed=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ad=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Td=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ld=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Id=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ud=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nd=`float getShadowMask() {
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
}`,Fd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Od=`#ifdef USE_SKINNING
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
#endif`,kd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zd=`#ifdef USE_SKINNING
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
#endif`,Hd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wd=`#ifdef USE_TRANSMISSION
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
#endif`,Xd=`#ifdef USE_TRANSMISSION
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
#endif`,Yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jd=`uniform sampler2D t2D;
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
}`,Jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`#include <common>
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
}`,ip=`#if DEPTH_PACKING == 3200
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
}`,rp=`#define DISTANCE
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
}`,sp=`#define DISTANCE
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
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`uniform float scale;
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
}`,cp=`uniform vec3 diffuse;
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
}`,up=`#include <common>
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
}`,hp=`uniform vec3 diffuse;
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
}`,fp=`#define LAMBERT
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
}`,dp=`#define LAMBERT
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
}`,pp=`#define MATCAP
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
}`,_p=`#define MATCAP
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
}`,mp=`#define NORMAL
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
}`,gp=`#define NORMAL
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
}`,vp=`#define PHONG
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
}`,xp=`#define PHONG
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
}`,Mp=`#define STANDARD
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
}`,bp=`#define STANDARD
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
}`,Sp=`#define TOON
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
}`,Ep=`#define TOON
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
}`,wp=`uniform float size;
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
}`,yp=`uniform vec3 diffuse;
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
}`,Ap=`#include <common>
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
}`,Tp=`uniform vec3 color;
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
}`,Rp=`uniform float rotation;
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
}`,Cp=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Kh,alphahash_pars_fragment:jh,alphamap_fragment:Jh,alphamap_pars_fragment:Qh,alphatest_fragment:ef,alphatest_pars_fragment:tf,aomap_fragment:nf,aomap_pars_fragment:rf,batching_pars_vertex:sf,batching_vertex:af,begin_vertex:of,beginnormal_vertex:lf,bsdfs:cf,iridescence_fragment:uf,bumpmap_pars_fragment:hf,clipping_planes_fragment:ff,clipping_planes_pars_fragment:df,clipping_planes_pars_vertex:pf,clipping_planes_vertex:_f,color_fragment:mf,color_pars_fragment:gf,color_pars_vertex:vf,color_vertex:xf,common:Mf,cube_uv_reflection_fragment:bf,defaultnormal_vertex:Sf,displacementmap_pars_vertex:Ef,displacementmap_vertex:wf,emissivemap_fragment:yf,emissivemap_pars_fragment:Af,colorspace_fragment:Tf,colorspace_pars_fragment:Rf,envmap_fragment:Cf,envmap_common_pars_fragment:Pf,envmap_pars_fragment:Lf,envmap_pars_vertex:Df,envmap_physical_pars_fragment:Bf,envmap_vertex:If,fog_vertex:Uf,fog_pars_vertex:Nf,fog_fragment:Ff,fog_pars_fragment:Of,gradientmap_pars_fragment:kf,lightmap_pars_fragment:zf,lights_lambert_fragment:Hf,lights_lambert_pars_fragment:Gf,lights_pars_begin:Vf,lights_toon_fragment:Wf,lights_toon_pars_fragment:Xf,lights_phong_fragment:Yf,lights_phong_pars_fragment:qf,lights_physical_fragment:$f,lights_physical_pars_fragment:Zf,lights_fragment_begin:Kf,lights_fragment_maps:jf,lights_fragment_end:Jf,logdepthbuf_fragment:Qf,logdepthbuf_pars_fragment:ed,logdepthbuf_pars_vertex:td,logdepthbuf_vertex:nd,map_fragment:id,map_pars_fragment:rd,map_particle_fragment:sd,map_particle_pars_fragment:ad,metalnessmap_fragment:od,metalnessmap_pars_fragment:ld,morphinstance_vertex:cd,morphcolor_vertex:ud,morphnormal_vertex:hd,morphtarget_pars_vertex:fd,morphtarget_vertex:dd,normal_fragment_begin:pd,normal_fragment_maps:_d,normal_pars_fragment:md,normal_pars_vertex:gd,normal_vertex:vd,normalmap_pars_fragment:xd,clearcoat_normal_fragment_begin:Md,clearcoat_normal_fragment_maps:bd,clearcoat_pars_fragment:Sd,iridescence_pars_fragment:Ed,opaque_fragment:wd,packing:yd,premultiplied_alpha_fragment:Ad,project_vertex:Td,dithering_fragment:Rd,dithering_pars_fragment:Cd,roughnessmap_fragment:Pd,roughnessmap_pars_fragment:Ld,shadowmap_pars_fragment:Dd,shadowmap_pars_vertex:Id,shadowmap_vertex:Ud,shadowmask_pars_fragment:Nd,skinbase_vertex:Fd,skinning_pars_vertex:Od,skinning_vertex:kd,skinnormal_vertex:zd,specularmap_fragment:Hd,specularmap_pars_fragment:Gd,tonemapping_fragment:Vd,tonemapping_pars_fragment:Bd,transmission_fragment:Wd,transmission_pars_fragment:Xd,uv_pars_fragment:Yd,uv_pars_vertex:qd,uv_vertex:$d,worldpos_vertex:Zd,background_vert:Kd,background_frag:jd,backgroundCube_vert:Jd,backgroundCube_frag:Qd,cube_vert:ep,cube_frag:tp,depth_vert:np,depth_frag:ip,distanceRGBA_vert:rp,distanceRGBA_frag:sp,equirect_vert:ap,equirect_frag:op,linedashed_vert:lp,linedashed_frag:cp,meshbasic_vert:up,meshbasic_frag:hp,meshlambert_vert:fp,meshlambert_frag:dp,meshmatcap_vert:pp,meshmatcap_frag:_p,meshnormal_vert:mp,meshnormal_frag:gp,meshphong_vert:vp,meshphong_frag:xp,meshphysical_vert:Mp,meshphysical_frag:bp,meshtoon_vert:Sp,meshtoon_frag:Ep,points_vert:wp,points_frag:yp,shadow_vert:Ap,shadow_frag:Tp,sprite_vert:Rp,sprite_frag:Cp},le={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Mn={basic:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new je(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Nt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Nt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new je(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Nt([le.points,le.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Nt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Nt([le.common,le.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Nt([le.sprite,le.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Nt([le.common,le.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Nt([le.lights,le.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Mn.physical={uniforms:Nt([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const ss={r:0,b:0,g:0},ci=new dn,Pp=new xt;function Lp(n,e,t,i,r,s,a){const o=new je(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function m(w){let S=w.isScene===!0?w.background:null;return S&&S.isTexture&&(S=(w.backgroundBlurriness>0?t:e).get(S)),S}function g(w){let S=!1;const M=m(w);M===null?d(o,l):M&&M.isColor&&(d(M,1),S=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(w,S){const M=m(S);M&&(M.isCubeTexture||M.mapping===Ls)?(u===void 0&&(u=new yt(new pr(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:cr(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ci.copy(S.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Pp.makeRotationFromEuler(ci)),u.material.toneMapped=$e.getTransfer(M.colorSpace)!==rt,(h!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new yt(new ur(2,2),new Sn({name:"BackgroundMaterial",uniforms:cr(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=$e.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,S){w.getRGB(ss,Qc(n)),i.buffers.color.setClear(ss.r,ss.g,ss.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(w,S=1){o.set(w),l=S,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(o,l)},render:g,addToRenderList:_}}function Dp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(b,R,V,N,G){let $=!1;const X=h(N,V,R);s!==X&&(s=X,c(s.object)),$=p(b,N,V,G),$&&m(b,N,V,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,M(b,R,V,N),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function h(b,R,V){const N=V.wireframe===!0;let G=i[b.id];G===void 0&&(G={},i[b.id]=G);let $=G[R.id];$===void 0&&($={},G[R.id]=$);let X=$[N];return X===void 0&&(X=f(l()),$[N]=X),X}function f(b){const R=[],V=[],N=[];for(let G=0;G<t;G++)R[G]=0,V[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:V,attributeDivisors:N,object:b,attributes:{},index:null}}function p(b,R,V,N){const G=s.attributes,$=R.attributes;let X=0;const Q=V.getAttributes();for(const B in Q)if(Q[B].location>=0){const ce=G[B];let Me=$[B];if(Me===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(Me=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(Me=b.instanceColor)),ce===void 0||ce.attribute!==Me||Me&&ce.data!==Me.data)return!0;X++}return s.attributesNum!==X||s.index!==N}function m(b,R,V,N){const G={},$=R.attributes;let X=0;const Q=V.getAttributes();for(const B in Q)if(Q[B].location>=0){let ce=$[B];ce===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor));const Me={};Me.attribute=ce,ce&&ce.data&&(Me.data=ce.data),G[B]=Me,X++}s.attributes=G,s.attributesNum=X,s.index=N}function g(){const b=s.newAttributes;for(let R=0,V=b.length;R<V;R++)b[R]=0}function _(b){d(b,0)}function d(b,R){const V=s.newAttributes,N=s.enabledAttributes,G=s.attributeDivisors;V[b]=1,N[b]===0&&(n.enableVertexAttribArray(b),N[b]=1),G[b]!==R&&(n.vertexAttribDivisor(b,R),G[b]=R)}function w(){const b=s.newAttributes,R=s.enabledAttributes;for(let V=0,N=R.length;V<N;V++)R[V]!==b[V]&&(n.disableVertexAttribArray(V),R[V]=0)}function S(b,R,V,N,G,$,X){X===!0?n.vertexAttribIPointer(b,R,V,G,$):n.vertexAttribPointer(b,R,V,N,G,$)}function M(b,R,V,N){g();const G=N.attributes,$=V.getAttributes(),X=R.defaultAttributeValues;for(const Q in $){const B=$[Q];if(B.location>=0){let ne=G[Q];if(ne===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(ne=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(ne=b.instanceColor)),ne!==void 0){const ce=ne.normalized,Me=ne.itemSize,Ge=e.get(ne);if(Ge===void 0)continue;const Ve=Ge.buffer,q=Ge.type,te=Ge.bytesPerElement,be=q===n.INT||q===n.UNSIGNED_INT||ne.gpuType===mo;if(ne.isInterleavedBufferAttribute){const ue=ne.data,Re=ue.stride,Le=ne.offset;if(ue.isInstancedInterleavedBuffer){for(let Ue=0;Ue<B.locationSize;Ue++)d(B.location+Ue,ue.meshPerAttribute);b.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ue=0;Ue<B.locationSize;Ue++)_(B.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,Ve);for(let Ue=0;Ue<B.locationSize;Ue++)S(B.location+Ue,Me/B.locationSize,q,ce,Re*te,(Le+Me/B.locationSize*Ue)*te,be)}else{if(ne.isInstancedBufferAttribute){for(let ue=0;ue<B.locationSize;ue++)d(B.location+ue,ne.meshPerAttribute);b.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ue=0;ue<B.locationSize;ue++)_(B.location+ue);n.bindBuffer(n.ARRAY_BUFFER,Ve);for(let ue=0;ue<B.locationSize;ue++)S(B.location+ue,Me/B.locationSize,q,ce,Me*te,Me/B.locationSize*ue*te,be)}}else if(X!==void 0){const ce=X[Q];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(B.location,ce);break;case 3:n.vertexAttrib3fv(B.location,ce);break;case 4:n.vertexAttrib4fv(B.location,ce);break;default:n.vertexAttrib1fv(B.location,ce)}}}}w()}function C(){P();for(const b in i){const R=i[b];for(const V in R){const N=R[V];for(const G in N)u(N[G].object),delete N[G];delete R[V]}delete i[b]}}function A(b){if(i[b.id]===void 0)return;const R=i[b.id];for(const V in R){const N=R[V];for(const G in N)u(N[G].object),delete N[G];delete R[V]}delete i[b.id]}function T(b){for(const R in i){const V=i[R];if(V[b.id]===void 0)continue;const N=V[b.id];for(const G in N)u(N[G].object),delete N[G];delete V[b.id]}}function P(){E(),a=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:_,disableUnusedAttributes:w}}function Ip(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let m=0;m<h;m++)p+=u[m];t.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<c.length;m++)a(c[m],u[m],f[m]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let m=0;for(let g=0;g<h;g++)m+=u[g]*f[g];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Up(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Ot&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const P=T===Fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==nn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==In&&!P)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:d,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:M,vertexTextures:C,maxSamples:A}}function Np(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new pi,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const m=h.clippingPlanes,g=h.clipIntersection,_=h.clipShadows,d=n.get(h);if(!r||m===null||m.length===0||s&&!_)s?u(null):c();else{const w=s?0:i,S=w*4;let M=d.clippingState||null;l.value=M,M=u(m,f,S,p);for(let C=0;C!==S;++C)M[C]=t[C];d.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,m){const g=h!==null?h.length:0;let _=null;if(g!==0){if(_=l.value,m!==!0||_===null){const d=p+g*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(_===null||_.length<d)&&(_=new Float32Array(d));for(let S=0,M=p;S!==g;++S,M+=4)a.copy(h[S]).applyMatrix4(w,o),a.normal.toArray(_,M),_[M+3]=a.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,_}}function Fp(n){let e=new WeakMap;function t(a,o){return o===Na?a.mapping=sr:o===Fa&&(a.mapping=ar),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Na||o===Fa)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Yh(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Op extends tu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Zi=4,gl=[.125,.215,.35,.446,.526,.582],gi=20,la=new Op,vl=new je;let ca=null,ua=0,ha=0,fa=!1;const _i=(1+Math.sqrt(5))/2,Bi=1/_i,xl=[new F(-_i,Bi,0),new F(_i,Bi,0),new F(-Bi,0,_i),new F(Bi,0,_i),new F(0,_i,-Bi),new F(0,_i,Bi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Ml{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ca=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=El(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ca,ua,ha),this._renderer.xr.enabled=fa,e.scissorTest=!1,as(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ca=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:Fr,format:Ot,colorSpace:Ai,depthBuffer:!1},r=bl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kp(s)),this._blurMaterial=zp(s,e,t)}return r}_compileMaterial(e){const t=new yt(this._lodPlanes[0],e);this._renderer.compile(t,la)}_sceneToCubeUV(e,t,i,r){const o=new $t(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(vl),u.toneMapping=Jn,u.autoClear=!1;const p=new Ur({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),m=new yt(new pr,p);let g=!1;const _=e.background;_?_.isColor&&(p.color.copy(_),e.background=null,g=!0):(p.color.copy(vl),g=!0);for(let d=0;d<6;d++){const w=d%3;w===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):w===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const S=this._cubeSize;as(r,w*S,d>2?S:0,S,S),u.setRenderTarget(r),g&&u.render(m,o),u.render(e,o)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===sr||e.mapping===ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=El()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new yt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;as(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,la)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=xl[(r-s-1)%xl.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new yt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*gi-1),g=s/m,_=isFinite(s)?1+Math.floor(u*g):gi;_>gi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${gi}`);const d=[];let w=0;for(let T=0;T<gi;++T){const P=T/g,E=Math.exp(-P*P/2);d.push(E),T===0?w+=E:T<_&&(w+=2*E)}for(let T=0;T<d.length;T++)d[T]=d[T]/w;f.envMap.value=e.texture,f.samples.value=_,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=m,f.mipInt.value=S-i;const M=this._sizeLods[r],C=3*M*(r>S-Zi?r-S+Zi:0),A=4*(this._cubeSize-M);as(t,C,A,3*M,2*M),l.setRenderTarget(t),l.render(h,la)}}function kp(n){const e=[],t=[],i=[];let r=n;const s=n-Zi+1+gl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Zi?l=gl[a-n+Zi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,m=6,g=3,_=2,d=1,w=new Float32Array(g*m*p),S=new Float32Array(_*m*p),M=new Float32Array(d*m*p);for(let A=0;A<p;A++){const T=A%3*2/3-1,P=A>2?0:-1,E=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];w.set(E,g*m*A),S.set(f,_*m*A);const b=[A,A,A,A,A,A];M.set(b,d*m*A)}const C=new pn;C.setAttribute("position",new At(w,g)),C.setAttribute("uv",new At(S,_)),C.setAttribute("faceIndex",new At(M,d)),e.push(C),r>Zi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bl(n,e,t){const i=new Si(n,e,t);return i.texture.mapping=Ls,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function as(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function zp(n,e,t){const i=new Float32Array(gi),r=new F(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Eo(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Sl(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eo(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function El(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Eo(){return`

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
	`}function Hp(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Na||l===Fa,u=l===sr||l===ar;if(c||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Ml(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Ml(n)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Gp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Pr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Vp(n,e,t,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);for(const m in f.morphAttributes){const g=f.morphAttributes[m];for(let _=0,d=g.length;_<d;_++)e.remove(g[_])}f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const m in f)e.update(f[m],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const m in p){const g=p[m];for(let _=0,d=g.length;_<d;_++)e.update(g[_],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,m=h.attributes.position;let g=0;if(p!==null){const w=p.array;g=p.version;for(let S=0,M=w.length;S<M;S+=3){const C=w[S+0],A=w[S+1],T=w[S+2];f.push(C,A,A,T,T,C)}}else if(m!==void 0){const w=m.array;g=m.version;for(let S=0,M=w.length/3-1;S<M;S+=3){const C=S+0,A=S+1,T=S+2;f.push(C,A,A,T,T,C)}}else return;const _=new(qc(f)?Jc:jc)(f,1);_.version=g;const d=s.get(h);d&&e.remove(d),s.set(h,_)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Bp(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*a),t.update(p,i,1)}function c(f,p,m){m!==0&&(n.drawElementsInstanced(i,p,s,f*a,m),t.update(p,i,m))}function u(f,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,m);let _=0;for(let d=0;d<m;d++)_+=p[d];t.update(_,i,1)}function h(f,p,m,g){if(m===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],g[d]);else{_.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,g,0,m);let d=0;for(let w=0;w<m;w++)d+=p[w]*g[w];t.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Wp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Xp(n,e,t){const i=new WeakMap,r=new gt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let E=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),m===!0&&(S=2),g===!0&&(S=3);let M=o.attributes.position.count*S,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*C*4*h),T=new So(A,M,C,h);T.type=In,T.needsUpdate=!0;const P=S*4;for(let b=0;b<h;b++){const R=_[b],V=d[b],N=w[b],G=M*C*4*b;for(let $=0;$<R.count;$++){const X=$*P;p===!0&&(r.fromBufferAttribute(R,$),A[G+X+0]=r.x,A[G+X+1]=r.y,A[G+X+2]=r.z,A[G+X+3]=0),m===!0&&(r.fromBufferAttribute(V,$),A[G+X+4]=r.x,A[G+X+5]=r.y,A[G+X+6]=r.z,A[G+X+7]=0),g===!0&&(r.fromBufferAttribute(N,$),A[G+X+8]=r.x,A[G+X+9]=r.y,A[G+X+10]=r.z,A[G+X+11]=N.itemSize===4?r.w:1)}}f={count:h,texture:T,size:new st(M,C)},i.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const m=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Yp(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class su extends zt{constructor(e,t,i,r,s,a,o,l,c,u=Ji){if(u!==Ji&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ji&&(i=bi),i===void 0&&u===lr&&(i=or),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:It,this.minFilter=l!==void 0?l:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const au=new zt,wl=new su(1,1),ou=new So,lu=new Ph,cu=new nu,yl=[],Al=[],Tl=new Float32Array(16),Rl=new Float32Array(9),Cl=new Float32Array(4);function _r(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yl[r];if(s===void 0&&(s=new Float32Array(r),yl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ns(n,e){let t=Al[e];t===void 0&&(t=new Int32Array(e),Al[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $p(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function Zp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function Kp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function jp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;Cl.set(i),n.uniformMatrix2fv(this.addr,!1,Cl),bt(t,i)}}function Jp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;Rl.set(i),n.uniformMatrix3fv(this.addr,!1,Rl),bt(t,i)}}function Qp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),bt(t,i)}}function e_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function t_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),bt(t,e)}}function n_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),bt(t,e)}}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),bt(t,e)}}function r_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),bt(t,e)}}function a_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),bt(t,e)}}function o_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),bt(t,e)}}function l_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(wl.compareFunction=Yc,s=wl):s=au,t.setTexture2D(e||s,r)}function c_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||lu,r)}function u_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||cu,r)}function h_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||ou,r)}function f_(n){switch(n){case 5126:return qp;case 35664:return $p;case 35665:return Zp;case 35666:return Kp;case 35674:return jp;case 35675:return Jp;case 35676:return Qp;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return r_;case 36294:return s_;case 36295:return a_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return h_}}function d_(n,e){n.uniform1fv(this.addr,e)}function p_(n,e){const t=_r(e,this.size,2);n.uniform2fv(this.addr,t)}function __(n,e){const t=_r(e,this.size,3);n.uniform3fv(this.addr,t)}function m_(n,e){const t=_r(e,this.size,4);n.uniform4fv(this.addr,t)}function g_(n,e){const t=_r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function v_(n,e){const t=_r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function x_(n,e){const t=_r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function M_(n,e){n.uniform1iv(this.addr,e)}function b_(n,e){n.uniform2iv(this.addr,e)}function S_(n,e){n.uniform3iv(this.addr,e)}function E_(n,e){n.uniform4iv(this.addr,e)}function w_(n,e){n.uniform1uiv(this.addr,e)}function y_(n,e){n.uniform2uiv(this.addr,e)}function A_(n,e){n.uniform3uiv(this.addr,e)}function T_(n,e){n.uniform4uiv(this.addr,e)}function R_(n,e,t){const i=this.cache,r=e.length,s=Ns(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||au,s[a])}function C_(n,e,t){const i=this.cache,r=e.length,s=Ns(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||lu,s[a])}function P_(n,e,t){const i=this.cache,r=e.length,s=Ns(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||cu,s[a])}function L_(n,e,t){const i=this.cache,r=e.length,s=Ns(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ou,s[a])}function D_(n){switch(n){case 5126:return d_;case 35664:return p_;case 35665:return __;case 35666:return m_;case 35674:return g_;case 35675:return v_;case 35676:return x_;case 5124:case 35670:return M_;case 35667:case 35671:return b_;case 35668:case 35672:return S_;case 35669:case 35673:return E_;case 5125:return w_;case 36294:return y_;case 36295:return A_;case 36296:return T_;case 35678:case 36198:case 36298:case 36306:case 35682:return R_;case 35679:case 36299:case 36307:return C_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return L_}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=f_(t.type)}}class U_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=D_(t.type)}}class N_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const da=/(\w+)(\])?(\[|\.)?/g;function Pl(n,e){n.seq.push(e),n.map[e.id]=e}function F_(n,e,t){const i=n.name,r=i.length;for(da.lastIndex=0;;){const s=da.exec(i),a=da.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Pl(t,c===void 0?new I_(o,n,e):new U_(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new N_(o),Pl(t,h)),t=h}}}class bs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);F_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ll(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const O_=37297;let k_=0;function z_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Dl=new ke;function H_(n){$e._getMatrix(Dl,$e.workingColorSpace,n);const e=`mat3( ${Dl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Ds:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Il(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+z_(n.getShaderSource(e),a)}else return r}function G_(n,e){const t=H_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function V_(n,e){let t;switch(e){case nh:t="Linear";break;case ih:t="Reinhard";break;case rh:t="Cineon";break;case sh:t="ACESFilmic";break;case oh:t="AgX";break;case lh:t="Neutral";break;case ah:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const os=new F;function B_(){$e.getLuminanceCoefficients(os);const n=os.x.toFixed(4),e=os.y.toFixed(4),t=os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function X_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Y_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lr(n){return n!==""}function Ul(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ho(n){return n.replace(q_,Z_)}const $_=new Map;function Z_(n,e){let t=He[e];if(t===void 0){const i=$_.get(e);if(i!==void 0)t=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ho(t)}const K_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fl(n){return n.replace(K_,j_)}function j_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ol(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function J_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Lc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ou?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Dn&&(e="SHADOWMAP_TYPE_VSM"),e}function Q_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case sr:case ar:e="ENVMAP_TYPE_CUBE";break;case Ls:e="ENVMAP_TYPE_CUBE_UV";break}return e}function em(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ar:e="ENVMAP_MODE_REFRACTION";break}return e}function tm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Uc:e="ENVMAP_BLENDING_MULTIPLY";break;case eh:e="ENVMAP_BLENDING_MIX";break;case th:e="ENVMAP_BLENDING_ADD";break}return e}function nm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function im(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=J_(t),c=Q_(t),u=em(t),h=tm(t),f=nm(t),p=W_(t),m=X_(s),g=r.createProgram();let _,d,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Lr).join(`
`),_.length>0&&(_+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Lr).join(`
`),d.length>0&&(d+=`
`)):(_=[Ol(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),d=[Ol(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?He.tonemapping_pars_fragment:"",t.toneMapping!==Jn?V_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,G_("linearToOutputTexel",t.outputColorSpace),B_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),a=ho(a),a=Ul(a,t),a=Nl(a,t),o=ho(o),o=Ul(o,t),o=Nl(o,t),a=Fl(a),o=Fl(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,d=["#define varying in",t.glslVersion===Ko?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ko?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=w+_+a,M=w+d+o,C=Ll(r,r.VERTEX_SHADER,S),A=Ll(r,r.FRAGMENT_SHADER,M);r.attachShader(g,C),r.attachShader(g,A),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(R){if(n.debug.checkShaderErrors){const V=r.getProgramInfoLog(g).trim(),N=r.getShaderInfoLog(C).trim(),G=r.getShaderInfoLog(A).trim();let $=!0,X=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,C,A);else{const Q=Il(r,C,"vertex"),B=Il(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+Q+`
`+B)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(N===""||G==="")&&(X=!1);X&&(R.diagnostics={runnable:$,programLog:V,vertexShader:{log:N,prefix:_},fragmentShader:{log:G,prefix:d}})}r.deleteShader(C),r.deleteShader(A),P=new bs(r,g),E=Y_(r,g)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(g,O_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=k_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=A,this}let rm=0;class sm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new am(e),t.set(e,i)),i}}class am{constructor(e){this.id=rm++,this.code=e,this.usedTimes=0}}function om(n,e,t,i,r,s,a){const o=new Zc,l=new sm,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return c.add(E),E===0?"uv":`uv${E}`}function _(E,b,R,V,N){const G=V.fog,$=N.geometry,X=E.isMeshStandardMaterial?V.environment:null,Q=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),B=Q&&Q.mapping===Ls?Q.image.height:null,ne=m[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ce=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Me=ce!==void 0?ce.length:0;let Ge=0;$.morphAttributes.position!==void 0&&(Ge=1),$.morphAttributes.normal!==void 0&&(Ge=2),$.morphAttributes.color!==void 0&&(Ge=3);let Ve,q,te,be;if(ne){const tt=Mn[ne];Ve=tt.vertexShader,q=tt.fragmentShader}else Ve=E.vertexShader,q=E.fragmentShader,l.update(E),te=l.getVertexShaderID(E),be=l.getFragmentShaderID(E);const ue=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),Le=N.isInstancedMesh===!0,Ue=N.isBatchedMesh===!0,ut=!!E.map,Xe=!!E.matcap,at=!!Q,D=!!E.aoMap,Ht=!!E.lightMap,We=!!E.bumpMap,Be=!!E.normalMap,Te=!!E.displacementMap,it=!!E.emissiveMap,Ce=!!E.metalnessMap,y=!!E.roughnessMap,v=E.anisotropy>0,O=E.clearcoat>0,K=E.dispersion>0,J=E.iridescence>0,Z=E.sheen>0,ye=E.transmission>0,de=v&&!!E.anisotropyMap,ge=O&&!!E.clearcoatMap,Ze=O&&!!E.clearcoatNormalMap,re=O&&!!E.clearcoatRoughnessMap,ve=J&&!!E.iridescenceMap,Pe=J&&!!E.iridescenceThicknessMap,De=Z&&!!E.sheenColorMap,xe=Z&&!!E.sheenRoughnessMap,qe=!!E.specularMap,ze=!!E.specularColorMap,ot=!!E.specularIntensityMap,L=ye&&!!E.transmissionMap,he=ye&&!!E.thicknessMap,Y=!!E.gradientMap,j=!!E.alphaMap,me=E.alphaTest>0,pe=!!E.alphaHash,Ne=!!E.extensions;let mt=Jn;E.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(mt=n.toneMapping);const Tt={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:Ve,fragmentShader:q,defines:E.defines,customVertexShaderID:te,customFragmentShaderID:be,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ue,batchingColor:Ue&&N._colorsTexture!==null,instancing:Le,instancingColor:Le&&N.instanceColor!==null,instancingMorph:Le&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?n.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Ai,alphaToCoverage:!!E.alphaToCoverage,map:ut,matcap:Xe,envMap:at,envMapMode:at&&Q.mapping,envMapCubeUVHeight:B,aoMap:D,lightMap:Ht,bumpMap:We,normalMap:Be,displacementMap:f&&Te,emissiveMap:it,normalMapObjectSpace:Be&&E.normalMapType===dh,normalMapTangentSpace:Be&&E.normalMapType===fh,metalnessMap:Ce,roughnessMap:y,anisotropy:v,anisotropyMap:de,clearcoat:O,clearcoatMap:ge,clearcoatNormalMap:Ze,clearcoatRoughnessMap:re,dispersion:K,iridescence:J,iridescenceMap:ve,iridescenceThicknessMap:Pe,sheen:Z,sheenColorMap:De,sheenRoughnessMap:xe,specularMap:qe,specularColorMap:ze,specularIntensityMap:ot,transmission:ye,transmissionMap:L,thicknessMap:he,gradientMap:Y,opaque:E.transparent===!1&&E.blending===ji&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:me,alphaHash:pe,combine:E.combine,mapUv:ut&&g(E.map.channel),aoMapUv:D&&g(E.aoMap.channel),lightMapUv:Ht&&g(E.lightMap.channel),bumpMapUv:We&&g(E.bumpMap.channel),normalMapUv:Be&&g(E.normalMap.channel),displacementMapUv:Te&&g(E.displacementMap.channel),emissiveMapUv:it&&g(E.emissiveMap.channel),metalnessMapUv:Ce&&g(E.metalnessMap.channel),roughnessMapUv:y&&g(E.roughnessMap.channel),anisotropyMapUv:de&&g(E.anisotropyMap.channel),clearcoatMapUv:ge&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(E.sheenRoughnessMap.channel),specularMapUv:qe&&g(E.specularMap.channel),specularColorMapUv:ze&&g(E.specularColorMap.channel),specularIntensityMapUv:ot&&g(E.specularIntensityMap.channel),transmissionMapUv:L&&g(E.transmissionMap.channel),thicknessMapUv:he&&g(E.thicknessMap.channel),alphaMapUv:j&&g(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Be||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!$.attributes.uv&&(ut||j),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Re,skinning:N.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ge,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:mt,decodeVideoTexture:ut&&E.map.isVideoTexture===!0&&$e.getTransfer(E.map.colorSpace)===rt,decodeVideoTextureEmissive:it&&E.emissiveMap.isVideoTexture===!0&&$e.getTransfer(E.emissiveMap.colorSpace)===rt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===en,flipSided:E.side===kt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ne&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&E.extensions.multiDraw===!0||Ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function d(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)b.push(R),b.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(w(b,E),S(b,E),b.push(n.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function w(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function S(E,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),E.push(o.mask)}function M(E){const b=m[E.type];let R;if(b){const V=Mn[b];R=eu.clone(V.uniforms)}else R=E.uniforms;return R}function C(E,b){let R;for(let V=0,N=u.length;V<N;V++){const G=u[V];if(G.cacheKey===b){R=G,++R.usedTimes;break}}return R===void 0&&(R=new im(n,b,E,s),u.push(R)),R}function A(E){if(--E.usedTimes===0){const b=u.indexOf(E);u[b]=u[u.length-1],u.pop(),E.destroy()}}function T(E){l.remove(E)}function P(){l.dispose()}return{getParameters:_,getProgramCacheKey:d,getUniforms:M,acquireProgram:C,releaseProgram:A,releaseShaderCache:T,programs:u,dispose:P}}function lm(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function cm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function kl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function zl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,f,p,m,g,_){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:m,renderOrder:h.renderOrder,z:g,group:_},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=m,d.renderOrder=h.renderOrder,d.z=g,d.group=_),e++,d}function o(h,f,p,m,g,_){const d=a(h,f,p,m,g,_);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(h,f,p,m,g,_){const d=a(h,f,p,m,g,_);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||cm),i.length>1&&i.sort(f||kl),r.length>1&&r.sort(f||kl)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function um(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new zl,n.set(i,[a])):r>=s.length?(a=new zl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function hm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new je};break;case"SpotLight":t={position:new F,direction:new F,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function fm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let dm=0;function pm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function _m(n){const e=new hm,t=fm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new xt,a=new xt;function o(c){let u=0,h=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,m=0,g=0,_=0,d=0,w=0,S=0,M=0,C=0,A=0,T=0;c.sort(pm);for(let E=0,b=c.length;E<b;E++){const R=c[E],V=R.color,N=R.intensity,G=R.distance,$=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=V.r*N,h+=V.g*N,f+=V.b*N;else if(R.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(R.sh.coefficients[X],N);T++}else if(R.isDirectionalLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,B=t.get(R);B.shadowIntensity=Q.intensity,B.shadowBias=Q.bias,B.shadowNormalBias=Q.normalBias,B.shadowRadius=Q.radius,B.shadowMapSize=Q.mapSize,i.directionalShadow[p]=B,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=R.shadow.matrix,w++}i.directional[p]=X,p++}else if(R.isSpotLight){const X=e.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(V).multiplyScalar(N),X.distance=G,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,i.spot[g]=X;const Q=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,Q.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[g]=Q.matrix,R.castShadow){const B=t.get(R);B.shadowIntensity=Q.intensity,B.shadowBias=Q.bias,B.shadowNormalBias=Q.normalBias,B.shadowRadius=Q.radius,B.shadowMapSize=Q.mapSize,i.spotShadow[g]=B,i.spotShadowMap[g]=$,M++}g++}else if(R.isRectAreaLight){const X=e.get(R);X.color.copy(V).multiplyScalar(N),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),i.rectArea[_]=X,_++}else if(R.isPointLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){const Q=R.shadow,B=t.get(R);B.shadowIntensity=Q.intensity,B.shadowBias=Q.bias,B.shadowNormalBias=Q.normalBias,B.shadowRadius=Q.radius,B.shadowMapSize=Q.mapSize,B.shadowCameraNear=Q.camera.near,B.shadowCameraFar=Q.camera.far,i.pointShadow[m]=B,i.pointShadowMap[m]=$,i.pointShadowMatrix[m]=R.shadow.matrix,S++}i.point[m]=X,m++}else if(R.isHemisphereLight){const X=e.get(R);X.skyColor.copy(R.color).multiplyScalar(N),X.groundColor.copy(R.groundColor).multiplyScalar(N),i.hemi[d]=X,d++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==m||P.spotLength!==g||P.rectAreaLength!==_||P.hemiLength!==d||P.numDirectionalShadows!==w||P.numPointShadows!==S||P.numSpotShadows!==M||P.numSpotMaps!==C||P.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=_,i.point.length=m,i.hemi.length=d,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=M+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,P.directionalLength=p,P.pointLength=m,P.spotLength=g,P.rectAreaLength=_,P.hemiLength=d,P.numDirectionalShadows=w,P.numPointShadows=S,P.numSpotShadows=M,P.numSpotMaps=C,P.numLightProbes=T,i.version=dm++)}function l(c,u){let h=0,f=0,p=0,m=0,g=0;const _=u.matrixWorldInverse;for(let d=0,w=c.length;d<w;d++){const S=c[d];if(S.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(_),h++}else if(S.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(_),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(_),p++}else if(S.isRectAreaLight){const M=i.rectArea[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(_),a.identity(),s.copy(S.matrixWorld),s.premultiply(_),a.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(_),f++}else if(S.isHemisphereLight){const M=i.hemi[g];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(_),g++}}}return{setup:o,setupView:l,state:i}}function Hl(n){const e=new _m(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function mm(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Hl(n),e.set(r,[o])):s>=a.length?(o=new Hl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class gm extends Us{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vm extends Us{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mm=`uniform sampler2D shadow_pass;
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
}`;function bm(n,e,t){let i=new iu;const r=new st,s=new st,a=new gt,o=new gm({depthPacking:hh}),l=new vm,c={},u=t.maxTextureSize,h={[ni]:kt,[kt]:ni,[en]:en},f=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:xm,fragmentShader:Mm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new pn;m.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new yt(m,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lc;let d=this.type;this.render=function(A,T,P){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),b=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),V=n.state;V.setBlending(jn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const N=d!==Dn&&this.type===Dn,G=d===Dn&&this.type!==Dn;for(let $=0,X=A.length;$<X;$++){const Q=A[$],B=Q.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const ne=B.getFrameExtents();if(r.multiply(ne),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,B.mapSize.y=s.y)),B.map===null||N===!0||G===!0){const Me=this.type!==Dn?{minFilter:It,magFilter:It}:{};B.map!==null&&B.map.dispose(),B.map=new Si(r.x,r.y,Me),B.map.texture.name=Q.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const ce=B.getViewportCount();for(let Me=0;Me<ce;Me++){const Ge=B.getViewport(Me);a.set(s.x*Ge.x,s.y*Ge.y,s.x*Ge.z,s.y*Ge.w),V.viewport(a),B.updateMatrices(Q,Me),i=B.getFrustum(),M(T,P,B.camera,Q,this.type)}B.isPointLightShadow!==!0&&this.type===Dn&&w(B,P),B.needsUpdate=!1}d=this.type,_.needsUpdate=!1,n.setRenderTarget(E,b,R)};function w(A,T){const P=e.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Si(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(T,null,P,f,g,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(T,null,P,p,g,null)}function S(A,T,P,E){let b=null;const R=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)b=R;else if(b=P.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const V=b.uuid,N=T.uuid;let G=c[V];G===void 0&&(G={},c[V]=G);let $=G[N];$===void 0&&($=b.clone(),G[N]=$,T.addEventListener("dispose",C)),b=$}if(b.visible=T.visible,b.wireframe=T.wireframe,E===Dn?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:h[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const V=n.properties.get(b);V.light=P}return b}function M(A,T,P,E,b){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Dn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const N=e.update(A),G=A.material;if(Array.isArray(G)){const $=N.groups;for(let X=0,Q=$.length;X<Q;X++){const B=$[X],ne=G[B.materialIndex];if(ne&&ne.visible){const ce=S(A,ne,E,b);A.onBeforeShadow(n,A,T,P,N,ce,B),n.renderBufferDirect(P,null,N,ce,A,B),A.onAfterShadow(n,A,T,P,N,ce,B)}}}else if(G.visible){const $=S(A,G,E,b);A.onBeforeShadow(n,A,T,P,N,$,null),n.renderBufferDirect(P,null,N,$,A,null),A.onAfterShadow(n,A,T,P,N,$,null)}}const V=A.children;for(let N=0,G=V.length;N<G;N++)M(V[N],T,P,E,b)}function C(A){A.target.removeEventListener("dispose",C);for(const P in c){const E=c[P],b=A.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}const Sm={[Ra]:Ca,[Pa]:Ia,[La]:Ua,[rr]:Da,[Ca]:Ra,[Ia]:Pa,[Ua]:La,[Da]:rr};function Em(n,e){function t(){let L=!1;const he=new gt;let Y=null;const j=new gt(0,0,0,0);return{setMask:function(me){Y!==me&&!L&&(n.colorMask(me,me,me,me),Y=me)},setLocked:function(me){L=me},setClear:function(me,pe,Ne,mt,Tt){Tt===!0&&(me*=mt,pe*=mt,Ne*=mt),he.set(me,pe,Ne,mt),j.equals(he)===!1&&(n.clearColor(me,pe,Ne,mt),j.copy(he))},reset:function(){L=!1,Y=null,j.set(-1,0,0,0)}}}function i(){let L=!1,he=!1,Y=null,j=null,me=null;return{setReversed:function(pe){if(he!==pe){const Ne=e.get("EXT_clip_control");he?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT);const mt=me;me=null,this.setClear(mt)}he=pe},getReversed:function(){return he},setTest:function(pe){pe?ue(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(pe){Y!==pe&&!L&&(n.depthMask(pe),Y=pe)},setFunc:function(pe){if(he&&(pe=Sm[pe]),j!==pe){switch(pe){case Ra:n.depthFunc(n.NEVER);break;case Ca:n.depthFunc(n.ALWAYS);break;case Pa:n.depthFunc(n.LESS);break;case rr:n.depthFunc(n.LEQUAL);break;case La:n.depthFunc(n.EQUAL);break;case Da:n.depthFunc(n.GEQUAL);break;case Ia:n.depthFunc(n.GREATER);break;case Ua:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=pe}},setLocked:function(pe){L=pe},setClear:function(pe){me!==pe&&(he&&(pe=1-pe),n.clearDepth(pe),me=pe)},reset:function(){L=!1,Y=null,j=null,me=null,he=!1}}}function r(){let L=!1,he=null,Y=null,j=null,me=null,pe=null,Ne=null,mt=null,Tt=null;return{setTest:function(tt){L||(tt?ue(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(tt){he!==tt&&!L&&(n.stencilMask(tt),he=tt)},setFunc:function(tt,rn,wn){(Y!==tt||j!==rn||me!==wn)&&(n.stencilFunc(tt,rn,wn),Y=tt,j=rn,me=wn)},setOp:function(tt,rn,wn){(pe!==tt||Ne!==rn||mt!==wn)&&(n.stencilOp(tt,rn,wn),pe=tt,Ne=rn,mt=wn)},setLocked:function(tt){L=tt},setClear:function(tt){Tt!==tt&&(n.clearStencil(tt),Tt=tt)},reset:function(){L=!1,he=null,Y=null,j=null,me=null,pe=null,Ne=null,mt=null,Tt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],m=null,g=!1,_=null,d=null,w=null,S=null,M=null,C=null,A=null,T=new je(0,0,0),P=0,E=!1,b=null,R=null,V=null,N=null,G=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Q=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(B)[1]),X=Q>=1):B.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),X=Q>=2);let ne=null,ce={};const Me=n.getParameter(n.SCISSOR_BOX),Ge=n.getParameter(n.VIEWPORT),Ve=new gt().fromArray(Me),q=new gt().fromArray(Ge);function te(L,he,Y,j){const me=new Uint8Array(4),pe=n.createTexture();n.bindTexture(L,pe),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<Y;Ne++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(he,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(he+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return pe}const be={};be[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),be[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),be[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(n.DEPTH_TEST),a.setFunc(rr),We(!1),Be(Wo),ue(n.CULL_FACE),D(jn);function ue(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Re(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Le(L,he){return h[L]!==he?(n.bindFramebuffer(L,he),h[L]=he,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=he),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=he),!0):!1}function Ue(L,he){let Y=p,j=!1;if(L){Y=f.get(he),Y===void 0&&(Y=[],f.set(he,Y));const me=L.textures;if(Y.length!==me.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,Ne=me.length;pe<Ne;pe++)Y[pe]=n.COLOR_ATTACHMENT0+pe;Y.length=me.length,j=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,j=!0);j&&n.drawBuffers(Y)}function ut(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const Xe={[mi]:n.FUNC_ADD,[ku]:n.FUNC_SUBTRACT,[zu]:n.FUNC_REVERSE_SUBTRACT};Xe[Hu]=n.MIN,Xe[Gu]=n.MAX;const at={[Vu]:n.ZERO,[Ic]:n.ONE,[Bu]:n.SRC_COLOR,[Es]:n.SRC_ALPHA,[Zu]:n.SRC_ALPHA_SATURATE,[qu]:n.DST_COLOR,[Xu]:n.DST_ALPHA,[Wu]:n.ONE_MINUS_SRC_COLOR,[Ta]:n.ONE_MINUS_SRC_ALPHA,[$u]:n.ONE_MINUS_DST_COLOR,[Yu]:n.ONE_MINUS_DST_ALPHA,[Ku]:n.CONSTANT_COLOR,[ju]:n.ONE_MINUS_CONSTANT_COLOR,[Ju]:n.CONSTANT_ALPHA,[Qu]:n.ONE_MINUS_CONSTANT_ALPHA};function D(L,he,Y,j,me,pe,Ne,mt,Tt,tt){if(L===jn){g===!0&&(Re(n.BLEND),g=!1);return}if(g===!1&&(ue(n.BLEND),g=!0),L!==Dc){if(L!==_||tt!==E){if((d!==mi||M!==mi)&&(n.blendEquation(n.FUNC_ADD),d=mi,M=mi),tt)switch(L){case ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xo:n.blendFunc(n.ONE,n.ONE);break;case Yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,S=null,C=null,A=null,T.set(0,0,0),P=0,_=L,E=tt}return}me=me||he,pe=pe||Y,Ne=Ne||j,(he!==d||me!==M)&&(n.blendEquationSeparate(Xe[he],Xe[me]),d=he,M=me),(Y!==w||j!==S||pe!==C||Ne!==A)&&(n.blendFuncSeparate(at[Y],at[j],at[pe],at[Ne]),w=Y,S=j,C=pe,A=Ne),(mt.equals(T)===!1||Tt!==P)&&(n.blendColor(mt.r,mt.g,mt.b,Tt),T.copy(mt),P=Tt),_=L,E=!1}function Ht(L,he){L.side===en?Re(n.CULL_FACE):ue(n.CULL_FACE);let Y=L.side===kt;he&&(Y=!Y),We(Y),L.blending===ji&&L.transparent===!1?D(jn):D(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),it(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(L){b!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),b=L)}function Be(L){L!==Nu?(ue(n.CULL_FACE),L!==R&&(L===Wo?n.cullFace(n.BACK):L===Fu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),R=L}function Te(L){L!==V&&(X&&n.lineWidth(L),V=L)}function it(L,he,Y){L?(ue(n.POLYGON_OFFSET_FILL),(N!==he||G!==Y)&&(n.polygonOffset(he,Y),N=he,G=Y)):Re(n.POLYGON_OFFSET_FILL)}function Ce(L){L?ue(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function y(L){L===void 0&&(L=n.TEXTURE0+$-1),ne!==L&&(n.activeTexture(L),ne=L)}function v(L,he,Y){Y===void 0&&(ne===null?Y=n.TEXTURE0+$-1:Y=ne);let j=ce[Y];j===void 0&&(j={type:void 0,texture:void 0},ce[Y]=j),(j.type!==L||j.texture!==he)&&(ne!==Y&&(n.activeTexture(Y),ne=Y),n.bindTexture(L,he||be[L]),j.type=L,j.texture=he)}function O(){const L=ce[ne];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function K(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pe(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(L){Ve.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Ve.copy(L))}function xe(L){q.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function qe(L,he){let Y=c.get(he);Y===void 0&&(Y=new WeakMap,c.set(he,Y));let j=Y.get(L);j===void 0&&(j=n.getUniformBlockIndex(he,L.name),Y.set(L,j))}function ze(L,he){const j=c.get(he).get(L);l.get(he)!==j&&(n.uniformBlockBinding(he,j,L.__bindingPointIndex),l.set(he,j))}function ot(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ne=null,ce={},h={},f=new WeakMap,p=[],m=null,g=!1,_=null,d=null,w=null,S=null,M=null,C=null,A=null,T=new je(0,0,0),P=0,E=!1,b=null,R=null,V=null,N=null,G=null,Ve.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ue,disable:Re,bindFramebuffer:Le,drawBuffers:Ue,useProgram:ut,setBlending:D,setMaterial:Ht,setFlipSided:We,setCullFace:Be,setLineWidth:Te,setPolygonOffset:it,setScissorTest:Ce,activeTexture:y,bindTexture:v,unbindTexture:O,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:ve,texImage3D:Pe,updateUBOMapping:qe,uniformBlockBinding:ze,texStorage2D:Ze,texStorage3D:re,texSubImage2D:Z,texSubImage3D:ye,compressedTexSubImage2D:de,compressedTexSubImage3D:ge,scissor:De,viewport:xe,reset:ot}}function Gl(n,e,t,i){const r=wm(i);switch(t){case zc:return n*e;case Gc:return n*e;case Vc:return n*e*2;case Bc:return n*e/r.components*r.byteLength;case xo:return n*e/r.components*r.byteLength;case Wc:return n*e*2/r.components*r.byteLength;case Mo:return n*e*2/r.components*r.byteLength;case Hc:return n*e*3/r.components*r.byteLength;case Ot:return n*e*4/r.components*r.byteLength;case bo:return n*e*4/r.components*r.byteLength;case ms:case gs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vs:case xs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case za:case Ga:return Math.max(n,16)*Math.max(e,8)/4;case ka:case Ha:return Math.max(n,8)*Math.max(e,8)/2;case Va:case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case qa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case $a:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Za:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ja:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case eo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case to:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case no:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case io:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ro:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ms:case so:case ao:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Xc:case oo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case lo:case co:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wm(n){switch(n){case nn:case Fc:return{byteLength:1,components:1};case Ir:case Oc:case Fr:return{byteLength:2,components:1};case go:case vo:return{byteLength:2,components:4};case bi:case mo:case In:return{byteLength:4,components:1};case kc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function ym(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(y,v){return p?new OffscreenCanvas(y,v):As("canvas")}function g(y,v,O){let K=1;const J=Ce(y);if((J.width>O||J.height>O)&&(K=O/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const Z=Math.floor(K*J.width),ye=Math.floor(K*J.height);h===void 0&&(h=m(Z,ye));const de=v?m(Z,ye):h;return de.width=Z,de.height=ye,de.getContext("2d").drawImage(y,0,0,Z,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Z+"x"+ye+")."),de}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),y;return y}function _(y){return y.generateMipmaps}function d(y){n.generateMipmap(y)}function w(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(y,v,O,K,J=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let Z=v;if(v===n.RED&&(O===n.FLOAT&&(Z=n.R32F),O===n.HALF_FLOAT&&(Z=n.R16F),O===n.UNSIGNED_BYTE&&(Z=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.R8UI),O===n.UNSIGNED_SHORT&&(Z=n.R16UI),O===n.UNSIGNED_INT&&(Z=n.R32UI),O===n.BYTE&&(Z=n.R8I),O===n.SHORT&&(Z=n.R16I),O===n.INT&&(Z=n.R32I)),v===n.RG&&(O===n.FLOAT&&(Z=n.RG32F),O===n.HALF_FLOAT&&(Z=n.RG16F),O===n.UNSIGNED_BYTE&&(Z=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RG8UI),O===n.UNSIGNED_SHORT&&(Z=n.RG16UI),O===n.UNSIGNED_INT&&(Z=n.RG32UI),O===n.BYTE&&(Z=n.RG8I),O===n.SHORT&&(Z=n.RG16I),O===n.INT&&(Z=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),O===n.UNSIGNED_INT&&(Z=n.RGB32UI),O===n.BYTE&&(Z=n.RGB8I),O===n.SHORT&&(Z=n.RGB16I),O===n.INT&&(Z=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),O===n.UNSIGNED_INT&&(Z=n.RGBA32UI),O===n.BYTE&&(Z=n.RGBA8I),O===n.SHORT&&(Z=n.RGBA16I),O===n.INT&&(Z=n.RGBA32I)),v===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),v===n.RGBA){const ye=J?Ds:$e.getTransfer(K);O===n.FLOAT&&(Z=n.RGBA32F),O===n.HALF_FLOAT&&(Z=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Z=ye===rt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function M(y,v){let O;return y?v===null||v===bi||v===or?O=n.DEPTH24_STENCIL8:v===In?O=n.DEPTH32F_STENCIL8:v===Ir&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===bi||v===or?O=n.DEPTH_COMPONENT24:v===In?O=n.DEPTH_COMPONENT32F:v===Ir&&(O=n.DEPTH_COMPONENT16),O}function C(y,v){return _(y)===!0||y.isFramebufferTexture&&y.minFilter!==It&&y.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function A(y){const v=y.target;v.removeEventListener("dispose",A),P(v),v.isVideoTexture&&u.delete(v)}function T(y){const v=y.target;v.removeEventListener("dispose",T),b(v)}function P(y){const v=i.get(y);if(v.__webglInit===void 0)return;const O=y.source,K=f.get(O);if(K){const J=K[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(y),Object.keys(K).length===0&&f.delete(O)}i.remove(y)}function E(y){const v=i.get(y);n.deleteTexture(v.__webglTexture);const O=y.source,K=f.get(O);delete K[v.__cacheKey],a.memory.textures--}function b(y){const v=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let J=0;J<v.__webglFramebuffer[K].length;J++)n.deleteFramebuffer(v.__webglFramebuffer[K][J]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=y.textures;for(let K=0,J=O.length;K<J;K++){const Z=i.get(O[K]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),a.memory.textures--),i.remove(O[K])}i.remove(y)}let R=0;function V(){R=0}function N(){const y=R;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),R+=1,y}function G(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function $(y,v){const O=i.get(y);if(y.isVideoTexture&&Te(y),y.isRenderTargetTexture===!1&&y.version>0&&O.__version!==y.version){const K=y.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(O,y,v);return}}t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function X(y,v){const O=i.get(y);if(y.version>0&&O.__version!==y.version){q(O,y,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function Q(y,v){const O=i.get(y);if(y.version>0&&O.__version!==y.version){q(O,y,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function B(y,v){const O=i.get(y);if(y.version>0&&O.__version!==y.version){te(O,y,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const ne={[ws]:n.REPEAT,[vi]:n.CLAMP_TO_EDGE,[Oa]:n.MIRRORED_REPEAT},ce={[It]:n.NEAREST,[ch]:n.NEAREST_MIPMAP_NEAREST,[Cr]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[zs]:n.LINEAR_MIPMAP_NEAREST,[xi]:n.LINEAR_MIPMAP_LINEAR},Me={[ph]:n.NEVER,[Mh]:n.ALWAYS,[_h]:n.LESS,[Yc]:n.LEQUAL,[mh]:n.EQUAL,[xh]:n.GEQUAL,[gh]:n.GREATER,[vh]:n.NOTEQUAL};function Ge(y,v){if(v.type===In&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===zs||v.magFilter===Cr||v.magFilter===xi||v.minFilter===hn||v.minFilter===zs||v.minFilter===Cr||v.minFilter===xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,ne[v.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,ne[v.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,ne[v.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,ce[v.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===It||v.minFilter!==Cr&&v.minFilter!==xi||v.type===In&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ve(y,v){let O=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",A));const K=v.source;let J=f.get(K);J===void 0&&(J={},f.set(K,J));const Z=G(v);if(Z!==y.__cacheKey){J[Z]===void 0&&(J[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[Z].usedTimes++;const ye=J[y.__cacheKey];ye!==void 0&&(J[y.__cacheKey].usedTimes--,ye.usedTimes===0&&E(v)),y.__cacheKey=Z,y.__webglTexture=J[Z].texture}return O}function q(y,v,O){let K=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=n.TEXTURE_3D);const J=Ve(y,v),Z=v.source;t.bindTexture(K,y.__webglTexture,n.TEXTURE0+O);const ye=i.get(Z);if(Z.version!==ye.__version||J===!0){t.activeTexture(n.TEXTURE0+O);const de=$e.getPrimaries($e.workingColorSpace),ge=v.colorSpace===Zn?null:$e.getPrimaries(v.colorSpace),Ze=v.colorSpace===Zn||de===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let re=g(v.image,!1,r.maxTextureSize);re=it(v,re);const ve=s.convert(v.format,v.colorSpace),Pe=s.convert(v.type);let De=S(v.internalFormat,ve,Pe,v.colorSpace,v.isVideoTexture);Ge(K,v);let xe;const qe=v.mipmaps,ze=v.isVideoTexture!==!0,ot=ye.__version===void 0||J===!0,L=Z.dataReady,he=C(v,re);if(v.isDepthTexture)De=M(v.format===lr,v.type),ot&&(ze?t.texStorage2D(n.TEXTURE_2D,1,De,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,De,re.width,re.height,0,ve,Pe,null));else if(v.isDataTexture)if(qe.length>0){ze&&ot&&t.texStorage2D(n.TEXTURE_2D,he,De,qe[0].width,qe[0].height);for(let Y=0,j=qe.length;Y<j;Y++)xe=qe[Y],ze?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,xe.width,xe.height,ve,Pe,xe.data):t.texImage2D(n.TEXTURE_2D,Y,De,xe.width,xe.height,0,ve,Pe,xe.data);v.generateMipmaps=!1}else ze?(ot&&t.texStorage2D(n.TEXTURE_2D,he,De,re.width,re.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re.width,re.height,ve,Pe,re.data)):t.texImage2D(n.TEXTURE_2D,0,De,re.width,re.height,0,ve,Pe,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ze&&ot&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,De,qe[0].width,qe[0].height,re.depth);for(let Y=0,j=qe.length;Y<j;Y++)if(xe=qe[Y],v.format!==Ot)if(ve!==null)if(ze){if(L)if(v.layerUpdates.size>0){const me=Gl(xe.width,xe.height,v.format,v.type);for(const pe of v.layerUpdates){const Ne=xe.data.subarray(pe*me/xe.data.BYTES_PER_ELEMENT,(pe+1)*me/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,pe,xe.width,xe.height,1,ve,Ne)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,xe.width,xe.height,re.depth,ve,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,De,xe.width,xe.height,re.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,xe.width,xe.height,re.depth,ve,Pe,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Y,De,xe.width,xe.height,re.depth,0,ve,Pe,xe.data)}else{ze&&ot&&t.texStorage2D(n.TEXTURE_2D,he,De,qe[0].width,qe[0].height);for(let Y=0,j=qe.length;Y<j;Y++)xe=qe[Y],v.format!==Ot?ve!==null?ze?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,Y,De,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,xe.width,xe.height,ve,Pe,xe.data):t.texImage2D(n.TEXTURE_2D,Y,De,xe.width,xe.height,0,ve,Pe,xe.data)}else if(v.isDataArrayTexture)if(ze){if(ot&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,De,re.width,re.height,re.depth),L)if(v.layerUpdates.size>0){const Y=Gl(re.width,re.height,v.format,v.type);for(const j of v.layerUpdates){const me=re.data.subarray(j*Y/re.data.BYTES_PER_ELEMENT,(j+1)*Y/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,re.width,re.height,1,ve,Pe,me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ve,Pe,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,De,re.width,re.height,re.depth,0,ve,Pe,re.data);else if(v.isData3DTexture)ze?(ot&&t.texStorage3D(n.TEXTURE_3D,he,De,re.width,re.height,re.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ve,Pe,re.data)):t.texImage3D(n.TEXTURE_3D,0,De,re.width,re.height,re.depth,0,ve,Pe,re.data);else if(v.isFramebufferTexture){if(ot)if(ze)t.texStorage2D(n.TEXTURE_2D,he,De,re.width,re.height);else{let Y=re.width,j=re.height;for(let me=0;me<he;me++)t.texImage2D(n.TEXTURE_2D,me,De,Y,j,0,ve,Pe,null),Y>>=1,j>>=1}}else if(qe.length>0){if(ze&&ot){const Y=Ce(qe[0]);t.texStorage2D(n.TEXTURE_2D,he,De,Y.width,Y.height)}for(let Y=0,j=qe.length;Y<j;Y++)xe=qe[Y],ze?L&&t.texSubImage2D(n.TEXTURE_2D,Y,0,0,ve,Pe,xe):t.texImage2D(n.TEXTURE_2D,Y,De,ve,Pe,xe);v.generateMipmaps=!1}else if(ze){if(ot){const Y=Ce(re);t.texStorage2D(n.TEXTURE_2D,he,De,Y.width,Y.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Pe,re)}else t.texImage2D(n.TEXTURE_2D,0,De,ve,Pe,re);_(v)&&d(K),ye.__version=Z.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function te(y,v,O){if(v.image.length!==6)return;const K=Ve(y,v),J=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+O);const Z=i.get(J);if(J.version!==Z.__version||K===!0){t.activeTexture(n.TEXTURE0+O);const ye=$e.getPrimaries($e.workingColorSpace),de=v.colorSpace===Zn?null:$e.getPrimaries(v.colorSpace),ge=v.colorSpace===Zn||ye===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ze=v.isCompressedTexture||v.image[0].isCompressedTexture,re=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let j=0;j<6;j++)!Ze&&!re?ve[j]=g(v.image[j],!0,r.maxCubemapSize):ve[j]=re?v.image[j].image:v.image[j],ve[j]=it(v,ve[j]);const Pe=ve[0],De=s.convert(v.format,v.colorSpace),xe=s.convert(v.type),qe=S(v.internalFormat,De,xe,v.colorSpace),ze=v.isVideoTexture!==!0,ot=Z.__version===void 0||K===!0,L=J.dataReady;let he=C(v,Pe);Ge(n.TEXTURE_CUBE_MAP,v);let Y;if(Ze){ze&&ot&&t.texStorage2D(n.TEXTURE_CUBE_MAP,he,qe,Pe.width,Pe.height);for(let j=0;j<6;j++){Y=ve[j].mipmaps;for(let me=0;me<Y.length;me++){const pe=Y[me];v.format!==Ot?De!==null?ze?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,pe.width,pe.height,De,pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,qe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,pe.width,pe.height,De,xe,pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,qe,pe.width,pe.height,0,De,xe,pe.data)}}}else{if(Y=v.mipmaps,ze&&ot){Y.length>0&&he++;const j=Ce(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,he,qe,j.width,j.height)}for(let j=0;j<6;j++)if(re){ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ve[j].width,ve[j].height,De,xe,ve[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,ve[j].width,ve[j].height,0,De,xe,ve[j].data);for(let me=0;me<Y.length;me++){const Ne=Y[me].image[j].image;ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Ne.width,Ne.height,De,xe,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,qe,Ne.width,Ne.height,0,De,xe,Ne.data)}}else{ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,De,xe,ve[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,De,xe,ve[j]);for(let me=0;me<Y.length;me++){const pe=Y[me];ze?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,De,xe,pe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,qe,De,xe,pe.image[j])}}}_(v)&&d(n.TEXTURE_CUBE_MAP),Z.__version=J.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function be(y,v,O,K,J,Z){const ye=s.convert(O.format,O.colorSpace),de=s.convert(O.type),ge=S(O.internalFormat,ye,de,O.colorSpace),Ze=i.get(v),re=i.get(O);if(re.__renderTarget=v,!Ze.__hasExternalTextures){const ve=Math.max(1,v.width>>Z),Pe=Math.max(1,v.height>>Z);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,Z,ge,ve,Pe,v.depth,0,ye,de,null):t.texImage2D(J,Z,ge,ve,Pe,0,ye,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),Be(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,J,re.__webglTexture,0,We(v)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,J,re.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(y,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,y),v.depthBuffer){const K=v.depthTexture,J=K&&K.isDepthTexture?K.type:null,Z=M(v.stencilBuffer,J),ye=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=We(v);Be(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,Z,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,Z,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Z,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,y)}else{const K=v.textures;for(let J=0;J<K.length;J++){const Z=K[J],ye=s.convert(Z.format,Z.colorSpace),de=s.convert(Z.type),ge=S(Z.internalFormat,ye,de,Z.colorSpace),Ze=We(v);O&&Be(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,ge,v.width,v.height):Be(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze,ge,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ge,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(y,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);const J=K.__webglTexture,Z=We(v);if(v.depthTexture.format===Ji)Be(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(v.depthTexture.format===lr)Be(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Le(y){const v=i.get(y),O=y.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==y.depthTexture){const K=y.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=K}if(y.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Re(v.__webglFramebuffer,y)}else if(O){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=n.createRenderbuffer(),ue(v.__webglDepthbuffer[K],y,!1);else{const J=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ue(v.__webglDepthbuffer,y,!1);else{const K=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(y,v,O){const K=i.get(y);v!==void 0&&be(K.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Le(y)}function ut(y){const v=y.texture,O=i.get(y),K=i.get(v);y.addEventListener("dispose",T);const J=y.textures,Z=y.isWebGLCubeRenderTarget===!0,ye=J.length>1;if(ye||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=v.version,a.memory.textures++),Z){O.__webglFramebuffer=[];for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[de]=[];for(let ge=0;ge<v.mipmaps.length;ge++)O.__webglFramebuffer[de][ge]=n.createFramebuffer()}else O.__webglFramebuffer[de]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let de=0;de<v.mipmaps.length;de++)O.__webglFramebuffer[de]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ye)for(let de=0,ge=J.length;de<ge;de++){const Ze=i.get(J[de]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&Be(y)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let de=0;de<J.length;de++){const ge=J[de];O.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[de]);const Ze=s.convert(ge.format,ge.colorSpace),re=s.convert(ge.type),ve=S(ge.internalFormat,Ze,re,ge.colorSpace,y.isXRRenderTarget===!0),Pe=We(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,ve,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,O.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ue(O.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,v);for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)be(O.__webglFramebuffer[de][ge],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,ge);else be(O.__webglFramebuffer[de],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);_(v)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let de=0,ge=J.length;de<ge;de++){const Ze=J[de],re=i.get(Ze);t.bindTexture(n.TEXTURE_2D,re.__webglTexture),Ge(n.TEXTURE_2D,Ze),be(O.__webglFramebuffer,y,Ze,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),_(Ze)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(de=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),Ge(de,v),v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)be(O.__webglFramebuffer[ge],y,v,n.COLOR_ATTACHMENT0,de,ge);else be(O.__webglFramebuffer,y,v,n.COLOR_ATTACHMENT0,de,0);_(v)&&d(de),t.unbindTexture()}y.depthBuffer&&Le(y)}function Xe(y){const v=y.textures;for(let O=0,K=v.length;O<K;O++){const J=v[O];if(_(J)){const Z=w(y),ye=i.get(J).__webglTexture;t.bindTexture(Z,ye),d(Z),t.unbindTexture()}}}const at=[],D=[];function Ht(y){if(y.samples>0){if(Be(y)===!1){const v=y.textures,O=y.width,K=y.height;let J=n.COLOR_BUFFER_BIT;const Z=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(y),de=v.length>1;if(de)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[ge]);const Ze=i.get(v[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ze,0)}n.blitFramebuffer(0,0,O,K,0,0,O,K,J,n.NEAREST),l===!0&&(at.length=0,D.length=0,at.push(n.COLOR_ATTACHMENT0+ge),y.depthBuffer&&y.resolveDepthBuffer===!1&&(at.push(Z),D.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,ye.__webglColorRenderbuffer[ge]);const Ze=i.get(v[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const v=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function We(y){return Math.min(r.maxSamples,y.samples)}function Be(y){const v=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Te(y){const v=a.render.frame;u.get(y)!==v&&(u.set(y,v),y.update())}function it(y,v){const O=y.colorSpace,K=y.format,J=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||O!==Ai&&O!==Zn&&($e.getTransfer(O)===rt?(K!==Ot||J!==nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Ce(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=V,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=B,this.rebindTextures=Ue,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Be}function Am(n,e){function t(i,r=Zn){let s;const a=$e.getTransfer(r);if(i===nn)return n.UNSIGNED_BYTE;if(i===go)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===kc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fc)return n.BYTE;if(i===Oc)return n.SHORT;if(i===Ir)return n.UNSIGNED_SHORT;if(i===mo)return n.INT;if(i===bi)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===Fr)return n.HALF_FLOAT;if(i===zc)return n.ALPHA;if(i===Hc)return n.RGB;if(i===Ot)return n.RGBA;if(i===Gc)return n.LUMINANCE;if(i===Vc)return n.LUMINANCE_ALPHA;if(i===Ji)return n.DEPTH_COMPONENT;if(i===lr)return n.DEPTH_STENCIL;if(i===Bc)return n.RED;if(i===xo)return n.RED_INTEGER;if(i===Wc)return n.RG;if(i===Mo)return n.RG_INTEGER;if(i===bo)return n.RGBA_INTEGER;if(i===ms||i===gs||i===vs||i===xs)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ms)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ms)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===gs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ka||i===za||i===Ha||i===Ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===za)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ha)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Va||i===Ba||i===Wa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Va||i===Ba)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Wa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Xa||i===Ya||i===qa||i===$a||i===Za||i===Ka||i===ja||i===Ja||i===Qa||i===eo||i===to||i===no||i===io||i===ro)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Xa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ya)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$a)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Za)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ka)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ja)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ja)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===eo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===to)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===no)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===io)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ro)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ms||i===so||i===ao)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ms)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===so)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ao)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xc||i===oo||i===lo||i===co)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ms)return s.COMPRESSED_RED_RGTC1_EXT;if(i===oo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===co)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===or?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Tm extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ki extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Rm={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const _=t.getJointPose(g,i),d=this._getHandJoint(c,g);_!==null&&(d.matrix.fromArray(_.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=_.radius),d.visible=_!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,m=.005;c.inputState.pinching&&f>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Cm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pm=`
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

}`;class Lm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new zt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Sn({vertexShader:Cm,fragmentShader:Pm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new ur(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dm extends Ti{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,m=null;const g=new Lm,_=t.getContextAttributes();let d=null,w=null;const S=[],M=[],C=new st;let A=null;const T=new $t;T.viewport=new gt;const P=new $t;P.viewport=new gt;const E=[T,P],b=new Tm;let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let te=S[q];return te===void 0&&(te=new pa,S[q]=te),te.getTargetRaySpace()},this.getControllerGrip=function(q){let te=S[q];return te===void 0&&(te=new pa,S[q]=te),te.getGripSpace()},this.getHand=function(q){let te=S[q];return te===void 0&&(te=new pa,S[q]=te),te.getHandSpace()};function N(q){const te=M.indexOf(q.inputSource);if(te===-1)return;const be=S[te];be!==void 0&&(be.update(q.inputSource,q.frame,c||a),be.dispatchEvent({type:q.type,data:q.inputSource}))}function G(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",$);for(let q=0;q<S.length;q++){const te=M[q];te!==null&&(M[q]=null,S[q].disconnect(te))}R=null,V=null,g.reset(),e.setRenderTarget(d),p=null,f=null,h=null,r=null,w=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",G),r.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const te={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Si(p.framebufferWidth,p.framebufferHeight,{format:Ot,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let te=null,be=null,ue=null;_.depth&&(ue=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=_.stencil?lr:Ji,be=_.stencil?or:bi);const Re={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(Re),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),w=new Si(f.textureWidth,f.textureHeight,{format:Ot,type:nn,depthTexture:new su(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ve.setContext(r),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(q){for(let te=0;te<q.removed.length;te++){const be=q.removed[te],ue=M.indexOf(be);ue>=0&&(M[ue]=null,S[ue].disconnect(be))}for(let te=0;te<q.added.length;te++){const be=q.added[te];let ue=M.indexOf(be);if(ue===-1){for(let Le=0;Le<S.length;Le++)if(Le>=M.length){M.push(be),ue=Le;break}else if(M[Le]===null){M[Le]=be,ue=Le;break}if(ue===-1)break}const Re=S[ue];Re&&Re.connect(be)}}const X=new F,Q=new F;function B(q,te,be){X.setFromMatrixPosition(te.matrixWorld),Q.setFromMatrixPosition(be.matrixWorld);const ue=X.distanceTo(Q),Re=te.projectionMatrix.elements,Le=be.projectionMatrix.elements,Ue=Re[14]/(Re[10]-1),ut=Re[14]/(Re[10]+1),Xe=(Re[9]+1)/Re[5],at=(Re[9]-1)/Re[5],D=(Re[8]-1)/Re[0],Ht=(Le[8]+1)/Le[0],We=Ue*D,Be=Ue*Ht,Te=ue/(-D+Ht),it=Te*-D;if(te.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(it),q.translateZ(Te),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Re[10]===-1)q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Ce=Ue+Te,y=ut+Te,v=We-it,O=Be+(ue-it),K=Xe*ut/y*Ce,J=at*ut/y*Ce;q.projectionMatrix.makePerspective(v,O,K,J,Ce,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ne(q,te){te===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(te.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let te=q.near,be=q.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(be=g.depthFar)),b.near=P.near=T.near=te,b.far=P.far=T.far=be,(R!==b.near||V!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),R=b.near,V=b.far),T.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,b.layers.mask=T.layers.mask|P.layers.mask;const ue=q.parent,Re=b.cameras;ne(b,ue);for(let Le=0;Le<Re.length;Le++)ne(Re[Le],ue);Re.length===2?B(b,T,P):b.projectionMatrix.copy(T.projectionMatrix),ce(q,b,ue)};function ce(q,te,be){be===null?q.matrix.copy(te.matrixWorld):(q.matrix.copy(be.matrixWorld),q.matrix.invert(),q.matrix.multiply(te.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=uo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(b)};let Me=null;function Ge(q,te){if(u=te.getViewerPose(c||a),m=te,u!==null){const be=u.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let ue=!1;be.length!==b.cameras.length&&(b.cameras.length=0,ue=!0);for(let Le=0;Le<be.length;Le++){const Ue=be[Le];let ut=null;if(p!==null)ut=p.getViewport(Ue);else{const at=h.getViewSubImage(f,Ue);ut=at.viewport,Le===0&&(e.setRenderTargetTextures(w,at.colorTexture,f.ignoreDepthValues?void 0:at.depthStencilTexture),e.setRenderTarget(w))}let Xe=E[Le];Xe===void 0&&(Xe=new $t,Xe.layers.enable(Le),Xe.viewport=new gt,E[Le]=Xe),Xe.matrix.fromArray(Ue.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Ue.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(ut.x,ut.y,ut.width,ut.height),Le===0&&(b.matrix.copy(Xe.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ue===!0&&b.cameras.push(Xe)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Le=h.getDepthInformation(be[0]);Le&&Le.isValid&&Le.texture&&g.init(e,Le,r.renderState)}}for(let be=0;be<S.length;be++){const ue=M[be],Re=S[be];ue!==null&&Re!==void 0&&Re.update(ue,te,c||a)}Me&&Me(q,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),m=null}const Ve=new ru;Ve.setAnimationLoop(Ge),this.setAnimationLoop=function(q){Me=q},this.dispose=function(){}}}const ui=new dn,Im=new xt;function Um(n,e){function t(_,d){_.matrixAutoUpdate===!0&&_.updateMatrix(),d.value.copy(_.matrix)}function i(_,d){d.color.getRGB(_.fogColor.value,Qc(n)),d.isFog?(_.fogNear.value=d.near,_.fogFar.value=d.far):d.isFogExp2&&(_.fogDensity.value=d.density)}function r(_,d,w,S,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(_,d):d.isMeshToonMaterial?(s(_,d),h(_,d)):d.isMeshPhongMaterial?(s(_,d),u(_,d)):d.isMeshStandardMaterial?(s(_,d),f(_,d),d.isMeshPhysicalMaterial&&p(_,d,M)):d.isMeshMatcapMaterial?(s(_,d),m(_,d)):d.isMeshDepthMaterial?s(_,d):d.isMeshDistanceMaterial?(s(_,d),g(_,d)):d.isMeshNormalMaterial?s(_,d):d.isLineBasicMaterial?(a(_,d),d.isLineDashedMaterial&&o(_,d)):d.isPointsMaterial?l(_,d,w,S):d.isSpriteMaterial?c(_,d):d.isShadowMaterial?(_.color.value.copy(d.color),_.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(_,d){_.opacity.value=d.opacity,d.color&&_.diffuse.value.copy(d.color),d.emissive&&_.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(_.map.value=d.map,t(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,t(d.alphaMap,_.alphaMapTransform)),d.bumpMap&&(_.bumpMap.value=d.bumpMap,t(d.bumpMap,_.bumpMapTransform),_.bumpScale.value=d.bumpScale,d.side===kt&&(_.bumpScale.value*=-1)),d.normalMap&&(_.normalMap.value=d.normalMap,t(d.normalMap,_.normalMapTransform),_.normalScale.value.copy(d.normalScale),d.side===kt&&_.normalScale.value.negate()),d.displacementMap&&(_.displacementMap.value=d.displacementMap,t(d.displacementMap,_.displacementMapTransform),_.displacementScale.value=d.displacementScale,_.displacementBias.value=d.displacementBias),d.emissiveMap&&(_.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,_.emissiveMapTransform)),d.specularMap&&(_.specularMap.value=d.specularMap,t(d.specularMap,_.specularMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest);const w=e.get(d),S=w.envMap,M=w.envMapRotation;S&&(_.envMap.value=S,ui.copy(M),ui.x*=-1,ui.y*=-1,ui.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),_.envMapRotation.value.setFromMatrix4(Im.makeRotationFromEuler(ui)),_.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=d.reflectivity,_.ior.value=d.ior,_.refractionRatio.value=d.refractionRatio),d.lightMap&&(_.lightMap.value=d.lightMap,_.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,_.lightMapTransform)),d.aoMap&&(_.aoMap.value=d.aoMap,_.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,_.aoMapTransform))}function a(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,d.map&&(_.map.value=d.map,t(d.map,_.mapTransform))}function o(_,d){_.dashSize.value=d.dashSize,_.totalSize.value=d.dashSize+d.gapSize,_.scale.value=d.scale}function l(_,d,w,S){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.size.value=d.size*w,_.scale.value=S*.5,d.map&&(_.map.value=d.map,t(d.map,_.uvTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,t(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function c(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.rotation.value=d.rotation,d.map&&(_.map.value=d.map,t(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,t(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function u(_,d){_.specular.value.copy(d.specular),_.shininess.value=Math.max(d.shininess,1e-4)}function h(_,d){d.gradientMap&&(_.gradientMap.value=d.gradientMap)}function f(_,d){_.metalness.value=d.metalness,d.metalnessMap&&(_.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,_.metalnessMapTransform)),_.roughness.value=d.roughness,d.roughnessMap&&(_.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,_.roughnessMapTransform)),d.envMap&&(_.envMapIntensity.value=d.envMapIntensity)}function p(_,d,w){_.ior.value=d.ior,d.sheen>0&&(_.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),_.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(_.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,_.sheenColorMapTransform)),d.sheenRoughnessMap&&(_.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,_.sheenRoughnessMapTransform))),d.clearcoat>0&&(_.clearcoat.value=d.clearcoat,_.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(_.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,_.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(_.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===kt&&_.clearcoatNormalScale.value.negate())),d.dispersion>0&&(_.dispersion.value=d.dispersion),d.iridescence>0&&(_.iridescence.value=d.iridescence,_.iridescenceIOR.value=d.iridescenceIOR,_.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(_.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,_.iridescenceMapTransform)),d.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),d.transmission>0&&(_.transmission.value=d.transmission,_.transmissionSamplerMap.value=w.texture,_.transmissionSamplerSize.value.set(w.width,w.height),d.transmissionMap&&(_.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,_.transmissionMapTransform)),_.thickness.value=d.thickness,d.thicknessMap&&(_.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=d.attenuationDistance,_.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(_.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(_.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=d.specularIntensity,_.specularColor.value.copy(d.specularColor),d.specularColorMap&&(_.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,_.specularColorMapTransform)),d.specularIntensityMap&&(_.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,_.specularIntensityMapTransform))}function m(_,d){d.matcap&&(_.matcap.value=d.matcap)}function g(_,d){const w=e.get(d).light;_.referencePosition.value.setFromMatrixPosition(w.matrixWorld),_.nearDistance.value=w.shadow.camera.near,_.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Nm(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,S){const M=S.program;i.uniformBlockBinding(w,M)}function c(w,S){let M=r[w.id];M===void 0&&(m(w),M=u(w),r[w.id]=M,w.addEventListener("dispose",_));const C=S.program;i.updateUBOMapping(w,C);const A=e.render.frame;s[w.id]!==A&&(f(w),s[w.id]=A)}function u(w){const S=h();w.__bindingPointIndex=S;const M=n.createBuffer(),C=w.__size,A=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,M),M}function h(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const S=r[w.id],M=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,T=M.length;A<T;A++){const P=Array.isArray(M[A])?M[A]:[M[A]];for(let E=0,b=P.length;E<b;E++){const R=P[E];if(p(R,A,E,C)===!0){const V=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let G=0;for(let $=0;$<N.length;$++){const X=N[$],Q=g(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,V+G,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,G),G+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,S,M,C){const A=w.value,T=S+"_"+M;if(C[T]===void 0)return typeof A=="number"||typeof A=="boolean"?C[T]=A:C[T]=A.clone(),!0;{const P=C[T];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return C[T]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function m(w){const S=w.uniforms;let M=0;const C=16;for(let T=0,P=S.length;T<P;T++){const E=Array.isArray(S[T])?S[T]:[S[T]];for(let b=0,R=E.length;b<R;b++){const V=E[b],N=Array.isArray(V.value)?V.value:[V.value];for(let G=0,$=N.length;G<$;G++){const X=N[G],Q=g(X),B=M%C,ne=B%Q.boundary,ce=B+ne;M+=ne,ce!==0&&C-ce<Q.storage&&(M+=C-ce),V.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=Q.storage}}}const A=M%C;return A>0&&(M+=C-A),w.__size=M,w.__cache={},this}function g(w){const S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function _(w){const S=w.target;S.removeEventListener("dispose",_);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function d(){for(const w in r)n.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Fm{constructor(e={}){const{canvas:t=Sh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,d=null;const w=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Jt,this.toneMapping=Jn,this.toneMappingExposure=1;const M=this;let C=!1,A=0,T=0,P=null,E=-1,b=null;const R=new gt,V=new gt;let N=null;const G=new je(0);let $=0,X=t.width,Q=t.height,B=1,ne=null,ce=null;const Me=new gt(0,0,X,Q),Ge=new gt(0,0,X,Q);let Ve=!1;const q=new iu;let te=!1,be=!1;const ue=new xt,Re=new xt,Le=new F,Ue=new gt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function at(){return P===null?B:1}let D=i;function Ht(x,I){return t.getContext(x,I)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_o}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",pe,!1),D===null){const I="webgl2";if(D=Ht(I,x),D===null)throw Ht(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let We,Be,Te,it,Ce,y,v,O,K,J,Z,ye,de,ge,Ze,re,ve,Pe,De,xe,qe,ze,ot,L;function he(){We=new Gp(D),We.init(),ze=new Am(D,We),Be=new Up(D,We,e,ze),Te=new Em(D,We),Be.reverseDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),it=new Wp(D),Ce=new lm,y=new ym(D,We,Te,Ce,Be,ze,it),v=new Fp(M),O=new Hp(M),K=new Zh(D),ot=new Dp(D,K),J=new Vp(D,K,it,ot),Z=new Yp(D,J,K,it),De=new Xp(D,Be,y),re=new Np(Ce),ye=new om(M,v,O,We,Be,ot,re),de=new Um(M,Ce),ge=new um,Ze=new mm(We),Pe=new Lp(M,v,O,Te,Z,p,l),ve=new bm(M,Z,Be),L=new Nm(D,it,Be,Te),xe=new Ip(D,We,it),qe=new Bp(D,We,it),it.programs=ye.programs,M.capabilities=Be,M.extensions=We,M.properties=Ce,M.renderLists=ge,M.shadowMap=ve,M.state=Te,M.info=it}he();const Y=new Dm(M,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=We.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=We.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(x){x!==void 0&&(B=x,this.setSize(X,Q,!1))},this.getSize=function(x){return x.set(X,Q)},this.setSize=function(x,I,z=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,Q=I,t.width=Math.floor(x*B),t.height=Math.floor(I*B),z===!0&&(t.style.width=x+"px",t.style.height=I+"px"),this.setViewport(0,0,x,I)},this.getDrawingBufferSize=function(x){return x.set(X*B,Q*B).floor()},this.setDrawingBufferSize=function(x,I,z){X=x,Q=I,B=z,t.width=Math.floor(x*z),t.height=Math.floor(I*z),this.setViewport(0,0,x,I)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(Me)},this.setViewport=function(x,I,z,H){x.isVector4?Me.set(x.x,x.y,x.z,x.w):Me.set(x,I,z,H),Te.viewport(R.copy(Me).multiplyScalar(B).round())},this.getScissor=function(x){return x.copy(Ge)},this.setScissor=function(x,I,z,H){x.isVector4?Ge.set(x.x,x.y,x.z,x.w):Ge.set(x,I,z,H),Te.scissor(V.copy(Ge).multiplyScalar(B).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(x){Te.setScissorTest(Ve=x)},this.setOpaqueSort=function(x){ne=x},this.setTransparentSort=function(x){ce=x},this.getClearColor=function(x){return x.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(x=!0,I=!0,z=!0){let H=0;if(x){let U=!1;if(P!==null){const se=P.texture.format;U=se===bo||se===Mo||se===xo}if(U){const se=P.texture.type,_e=se===nn||se===bi||se===Ir||se===or||se===go||se===vo,Se=Pe.getClearColor(),Ee=Pe.getClearAlpha(),Ie=Se.r,Fe=Se.g,we=Se.b;_e?(m[0]=Ie,m[1]=Fe,m[2]=we,m[3]=Ee,D.clearBufferuiv(D.COLOR,0,m)):(g[0]=Ie,g[1]=Fe,g[2]=we,g[3]=Ee,D.clearBufferiv(D.COLOR,0,g))}else H|=D.COLOR_BUFFER_BIT}I&&(H|=D.DEPTH_BUFFER_BIT),z&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),ge.dispose(),Ze.dispose(),Ce.dispose(),v.dispose(),O.dispose(),Z.dispose(),ot.dispose(),L.dispose(),ye.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Fo),Y.removeEventListener("sessionend",Oo),ri.stop()};function j(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const x=it.autoReset,I=ve.enabled,z=ve.autoUpdate,H=ve.needsUpdate,U=ve.type;he(),it.autoReset=x,ve.enabled=I,ve.autoUpdate=z,ve.needsUpdate=H,ve.type=U}function pe(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ne(x){const I=x.target;I.removeEventListener("dispose",Ne),mt(I)}function mt(x){Tt(x),Ce.remove(x)}function Tt(x){const I=Ce.get(x).programs;I!==void 0&&(I.forEach(function(z){ye.releaseProgram(z)}),x.isShaderMaterial&&ye.releaseShaderCache(x))}this.renderBufferDirect=function(x,I,z,H,U,se){I===null&&(I=ut);const _e=U.isMesh&&U.matrixWorld.determinant()<0,Se=Du(x,I,z,H,U);Te.setMaterial(H,_e);let Ee=z.index,Ie=1;if(H.wireframe===!0){if(Ee=J.getWireframeAttribute(z),Ee===void 0)return;Ie=2}const Fe=z.drawRange,we=z.attributes.position;let Ke=Fe.start*Ie,lt=(Fe.start+Fe.count)*Ie;se!==null&&(Ke=Math.max(Ke,se.start*Ie),lt=Math.min(lt,(se.start+se.count)*Ie)),Ee!==null?(Ke=Math.max(Ke,0),lt=Math.min(lt,Ee.count)):we!=null&&(Ke=Math.max(Ke,0),lt=Math.min(lt,we.count));const ht=lt-Ke;if(ht<0||ht===1/0)return;ot.setup(U,H,Se,z,Ee);let Gt,Je=xe;if(Ee!==null&&(Gt=K.get(Ee),Je=qe,Je.setIndex(Gt)),U.isMesh)H.wireframe===!0?(Te.setLineWidth(H.wireframeLinewidth*at()),Je.setMode(D.LINES)):Je.setMode(D.TRIANGLES);else if(U.isLine){let Ae=H.linewidth;Ae===void 0&&(Ae=1),Te.setLineWidth(Ae*at()),U.isLineSegments?Je.setMode(D.LINES):U.isLineLoop?Je.setMode(D.LINE_LOOP):Je.setMode(D.LINE_STRIP)}else U.isPoints?Je.setMode(D.POINTS):U.isSprite&&Je.setMode(D.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))Je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ae=U._multiDrawStarts,yn=U._multiDrawCounts,Qe=U._multiDrawCount,sn=Ee?K.get(Ee).bytesPerElement:1,Ci=Ce.get(H).currentProgram.getUniforms();for(let Xt=0;Xt<Qe;Xt++)Ci.setValue(D,"_gl_DrawID",Xt),Je.render(Ae[Xt]/sn,yn[Xt])}else if(U.isInstancedMesh)Je.renderInstances(Ke,ht,U.count);else if(z.isInstancedBufferGeometry){const Ae=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,yn=Math.min(z.instanceCount,Ae);Je.renderInstances(Ke,ht,yn)}else Je.render(Ke,ht)};function tt(x,I,z){x.transparent===!0&&x.side===en&&x.forceSinglePass===!1?(x.side=kt,x.needsUpdate=!0,Gr(x,I,z),x.side=ni,x.needsUpdate=!0,Gr(x,I,z),x.side=en):Gr(x,I,z)}this.compile=function(x,I,z=null){z===null&&(z=x),d=Ze.get(z),d.init(I),S.push(d),z.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),x!==z&&x.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const H=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const se=U.material;if(se)if(Array.isArray(se))for(let _e=0;_e<se.length;_e++){const Se=se[_e];tt(Se,z,U),H.add(Se)}else tt(se,z,U),H.add(se)}),S.pop(),d=null,H},this.compileAsync=function(x,I,z=null){const H=this.compile(x,I,z);return new Promise(U=>{function se(){if(H.forEach(function(_e){Ce.get(_e).currentProgram.isReady()&&H.delete(_e)}),H.size===0){U(x);return}setTimeout(se,10)}We.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let rn=null;function wn(x){rn&&rn(x)}function Fo(){ri.stop()}function Oo(){ri.start()}const ri=new ru;ri.setAnimationLoop(wn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(x){rn=x,Y.setAnimationLoop(x),x===null?ri.stop():ri.start()},Y.addEventListener("sessionstart",Fo),Y.addEventListener("sessionend",Oo),this.render=function(x,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(I),I=Y.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,I,P),d=Ze.get(x,S.length),d.init(I),S.push(d),Re.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(Re),be=this.localClippingEnabled,te=re.init(this.clippingPlanes,be),_=ge.get(x,w.length),_.init(),w.push(_),Y.enabled===!0&&Y.isPresenting===!0){const se=M.xr.getDepthSensingMesh();se!==null&&ks(se,I,-1/0,M.sortObjects)}ks(x,I,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(ne,ce),Xe=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Xe&&Pe.addToRenderList(_,x),this.info.render.frame++,te===!0&&re.beginShadows();const z=d.state.shadowsArray;ve.render(z,x,I),te===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=_.opaque,U=_.transmissive;if(d.setupLights(),I.isArrayCamera){const se=I.cameras;if(U.length>0)for(let _e=0,Se=se.length;_e<Se;_e++){const Ee=se[_e];zo(H,U,x,Ee)}Xe&&Pe.render(x);for(let _e=0,Se=se.length;_e<Se;_e++){const Ee=se[_e];ko(_,x,Ee,Ee.viewport)}}else U.length>0&&zo(H,U,x,I),Xe&&Pe.render(x),ko(_,x,I);P!==null&&(y.updateMultisampleRenderTarget(P),y.updateRenderTargetMipmap(P)),x.isScene===!0&&x.onAfterRender(M,x,I),ot.resetDefaultState(),E=-1,b=null,S.pop(),S.length>0?(d=S[S.length-1],te===!0&&re.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,w.pop(),w.length>0?_=w[w.length-1]:_=null};function ks(x,I,z,H){if(x.visible===!1)return;if(x.layers.test(I.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(I);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||q.intersectsSprite(x)){H&&Ue.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Re);const _e=Z.update(x),Se=x.material;Se.visible&&_.push(x,_e,Se,z,Ue.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||q.intersectsObject(x))){const _e=Z.update(x),Se=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ue.copy(x.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ue.copy(_e.boundingSphere.center)),Ue.applyMatrix4(x.matrixWorld).applyMatrix4(Re)),Array.isArray(Se)){const Ee=_e.groups;for(let Ie=0,Fe=Ee.length;Ie<Fe;Ie++){const we=Ee[Ie],Ke=Se[we.materialIndex];Ke&&Ke.visible&&_.push(x,_e,Ke,z,Ue.z,we)}}else Se.visible&&_.push(x,_e,Se,z,Ue.z,null)}}const se=x.children;for(let _e=0,Se=se.length;_e<Se;_e++)ks(se[_e],I,z,H)}function ko(x,I,z,H){const U=x.opaque,se=x.transmissive,_e=x.transparent;d.setupLightsView(z),te===!0&&re.setGlobalState(M.clippingPlanes,z),H&&Te.viewport(R.copy(H)),U.length>0&&Hr(U,I,z),se.length>0&&Hr(se,I,z),_e.length>0&&Hr(_e,I,z),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function zo(x,I,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new Si(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?Fr:nn,minFilter:xi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const se=d.state.transmissionRenderTarget[H.id],_e=H.viewport||R;se.setSize(_e.z,_e.w);const Se=M.getRenderTarget();M.setRenderTarget(se),M.getClearColor(G),$=M.getClearAlpha(),$<1&&M.setClearColor(16777215,.5),M.clear(),Xe&&Pe.render(z);const Ee=M.toneMapping;M.toneMapping=Jn;const Ie=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),te===!0&&re.setGlobalState(M.clippingPlanes,H),Hr(x,z,H),y.updateMultisampleRenderTarget(se),y.updateRenderTargetMipmap(se),We.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let we=0,Ke=I.length;we<Ke;we++){const lt=I[we],ht=lt.object,Gt=lt.geometry,Je=lt.material,Ae=lt.group;if(Je.side===en&&ht.layers.test(H.layers)){const yn=Je.side;Je.side=kt,Je.needsUpdate=!0,Ho(ht,z,H,Gt,Je,Ae),Je.side=yn,Je.needsUpdate=!0,Fe=!0}}Fe===!0&&(y.updateMultisampleRenderTarget(se),y.updateRenderTargetMipmap(se))}M.setRenderTarget(Se),M.setClearColor(G,$),Ie!==void 0&&(H.viewport=Ie),M.toneMapping=Ee}function Hr(x,I,z){const H=I.isScene===!0?I.overrideMaterial:null;for(let U=0,se=x.length;U<se;U++){const _e=x[U],Se=_e.object,Ee=_e.geometry,Ie=H===null?_e.material:H,Fe=_e.group;Se.layers.test(z.layers)&&Ho(Se,I,z,Ee,Ie,Fe)}}function Ho(x,I,z,H,U,se){x.onBeforeRender(M,I,z,H,U,se),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(M,I,z,H,x,se),U.transparent===!0&&U.side===en&&U.forceSinglePass===!1?(U.side=kt,U.needsUpdate=!0,M.renderBufferDirect(z,I,H,U,x,se),U.side=ni,U.needsUpdate=!0,M.renderBufferDirect(z,I,H,U,x,se),U.side=en):M.renderBufferDirect(z,I,H,U,x,se),x.onAfterRender(M,I,z,H,U,se)}function Gr(x,I,z){I.isScene!==!0&&(I=ut);const H=Ce.get(x),U=d.state.lights,se=d.state.shadowsArray,_e=U.state.version,Se=ye.getParameters(x,U.state,se,I,z),Ee=ye.getProgramCacheKey(Se);let Ie=H.programs;H.environment=x.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(x.isMeshStandardMaterial?O:v).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?I.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",Ne),Ie=new Map,H.programs=Ie);let Fe=Ie.get(Ee);if(Fe!==void 0){if(H.currentProgram===Fe&&H.lightsStateVersion===_e)return Vo(x,Se),Fe}else Se.uniforms=ye.getUniforms(x),x.onBeforeCompile(Se,M),Fe=ye.acquireProgram(Se,Ee),Ie.set(Ee,Fe),H.uniforms=Se.uniforms;const we=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(we.clippingPlanes=re.uniform),Vo(x,Se),H.needsLights=Uu(x),H.lightsStateVersion=_e,H.needsLights&&(we.ambientLightColor.value=U.state.ambient,we.lightProbe.value=U.state.probe,we.directionalLights.value=U.state.directional,we.directionalLightShadows.value=U.state.directionalShadow,we.spotLights.value=U.state.spot,we.spotLightShadows.value=U.state.spotShadow,we.rectAreaLights.value=U.state.rectArea,we.ltc_1.value=U.state.rectAreaLTC1,we.ltc_2.value=U.state.rectAreaLTC2,we.pointLights.value=U.state.point,we.pointLightShadows.value=U.state.pointShadow,we.hemisphereLights.value=U.state.hemi,we.directionalShadowMap.value=U.state.directionalShadowMap,we.directionalShadowMatrix.value=U.state.directionalShadowMatrix,we.spotShadowMap.value=U.state.spotShadowMap,we.spotLightMatrix.value=U.state.spotLightMatrix,we.spotLightMap.value=U.state.spotLightMap,we.pointShadowMap.value=U.state.pointShadowMap,we.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=Fe,H.uniformsList=null,Fe}function Go(x){if(x.uniformsList===null){const I=x.currentProgram.getUniforms();x.uniformsList=bs.seqWithValue(I.seq,x.uniforms)}return x.uniformsList}function Vo(x,I){const z=Ce.get(x);z.outputColorSpace=I.outputColorSpace,z.batching=I.batching,z.batchingColor=I.batchingColor,z.instancing=I.instancing,z.instancingColor=I.instancingColor,z.instancingMorph=I.instancingMorph,z.skinning=I.skinning,z.morphTargets=I.morphTargets,z.morphNormals=I.morphNormals,z.morphColors=I.morphColors,z.morphTargetsCount=I.morphTargetsCount,z.numClippingPlanes=I.numClippingPlanes,z.numIntersection=I.numClipIntersection,z.vertexAlphas=I.vertexAlphas,z.vertexTangents=I.vertexTangents,z.toneMapping=I.toneMapping}function Du(x,I,z,H,U){I.isScene!==!0&&(I=ut),y.resetTextureUnits();const se=I.fog,_e=H.isMeshStandardMaterial?I.environment:null,Se=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ai,Ee=(H.isMeshStandardMaterial?O:v).get(H.envMap||_e),Ie=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Fe=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),we=!!z.morphAttributes.position,Ke=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let ht=Jn;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ht=M.toneMapping);const Gt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Je=Gt!==void 0?Gt.length:0,Ae=Ce.get(H),yn=d.state.lights;if(te===!0&&(be===!0||x!==b)){const Kt=x===b&&H.id===E;re.setState(H,x,Kt)}let Qe=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==yn.state.version||Ae.outputColorSpace!==Se||U.isBatchedMesh&&Ae.batching===!1||!U.isBatchedMesh&&Ae.batching===!0||U.isBatchedMesh&&Ae.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ae.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ae.instancing===!1||!U.isInstancedMesh&&Ae.instancing===!0||U.isSkinnedMesh&&Ae.skinning===!1||!U.isSkinnedMesh&&Ae.skinning===!0||U.isInstancedMesh&&Ae.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ae.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ae.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ae.instancingMorph===!1&&U.morphTexture!==null||Ae.envMap!==Ee||H.fog===!0&&Ae.fog!==se||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==re.numPlanes||Ae.numIntersection!==re.numIntersection)||Ae.vertexAlphas!==Ie||Ae.vertexTangents!==Fe||Ae.morphTargets!==we||Ae.morphNormals!==Ke||Ae.morphColors!==lt||Ae.toneMapping!==ht||Ae.morphTargetsCount!==Je)&&(Qe=!0):(Qe=!0,Ae.__version=H.version);let sn=Ae.currentProgram;Qe===!0&&(sn=Gr(H,I,U));let Ci=!1,Xt=!1,gr=!1;const ft=sn.getUniforms(),_n=Ae.uniforms;if(Te.useProgram(sn.program)&&(Ci=!0,Xt=!0,gr=!0),H.id!==E&&(E=H.id,Xt=!0),Ci||b!==x){Te.buffers.depth.getReversed()?(ue.copy(x.projectionMatrix),wh(ue),yh(ue),ft.setValue(D,"projectionMatrix",ue)):ft.setValue(D,"projectionMatrix",x.projectionMatrix),ft.setValue(D,"viewMatrix",x.matrixWorldInverse);const kn=ft.map.cameraPosition;kn!==void 0&&kn.setValue(D,Le.setFromMatrixPosition(x.matrixWorld)),Be.logarithmicDepthBuffer&&ft.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ft.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),b!==x&&(b=x,Xt=!0,gr=!0)}if(U.isSkinnedMesh){ft.setOptional(D,U,"bindMatrix"),ft.setOptional(D,U,"bindMatrixInverse");const Kt=U.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),ft.setValue(D,"boneTexture",Kt.boneTexture,y))}U.isBatchedMesh&&(ft.setOptional(D,U,"batchingTexture"),ft.setValue(D,"batchingTexture",U._matricesTexture,y),ft.setOptional(D,U,"batchingIdTexture"),ft.setValue(D,"batchingIdTexture",U._indirectTexture,y),ft.setOptional(D,U,"batchingColorTexture"),U._colorsTexture!==null&&ft.setValue(D,"batchingColorTexture",U._colorsTexture,y));const vr=z.morphAttributes;if((vr.position!==void 0||vr.normal!==void 0||vr.color!==void 0)&&De.update(U,z,sn),(Xt||Ae.receiveShadow!==U.receiveShadow)&&(Ae.receiveShadow=U.receiveShadow,ft.setValue(D,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(_n.envMap.value=Ee,_n.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&I.environment!==null&&(_n.envMapIntensity.value=I.environmentIntensity),Xt&&(ft.setValue(D,"toneMappingExposure",M.toneMappingExposure),Ae.needsLights&&Iu(_n,gr),se&&H.fog===!0&&de.refreshFogUniforms(_n,se),de.refreshMaterialUniforms(_n,H,B,Q,d.state.transmissionRenderTarget[x.id]),bs.upload(D,Go(Ae),_n,y)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(bs.upload(D,Go(Ae),_n,y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ft.setValue(D,"center",U.center),ft.setValue(D,"modelViewMatrix",U.modelViewMatrix),ft.setValue(D,"normalMatrix",U.normalMatrix),ft.setValue(D,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Kt=H.uniformsGroups;for(let kn=0,zn=Kt.length;kn<zn;kn++){const Bo=Kt[kn];L.update(Bo,sn),L.bind(Bo,sn)}}return sn}function Iu(x,I){x.ambientLightColor.needsUpdate=I,x.lightProbe.needsUpdate=I,x.directionalLights.needsUpdate=I,x.directionalLightShadows.needsUpdate=I,x.pointLights.needsUpdate=I,x.pointLightShadows.needsUpdate=I,x.spotLights.needsUpdate=I,x.spotLightShadows.needsUpdate=I,x.rectAreaLights.needsUpdate=I,x.hemisphereLights.needsUpdate=I}function Uu(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(x,I,z){Ce.get(x.texture).__webglTexture=I,Ce.get(x.depthTexture).__webglTexture=z;const H=Ce.get(x);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,I){const z=Ce.get(x);z.__webglFramebuffer=I,z.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(x,I=0,z=0){P=x,A=I,T=z;let H=!0,U=null,se=!1,_e=!1;if(x){const Ee=Ce.get(x);if(Ee.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(Ee.__webglFramebuffer===void 0)y.setupRenderTarget(x);else if(Ee.__hasExternalTextures)y.rebindTextures(x,Ce.get(x.texture).__webglTexture,Ce.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const we=x.depthTexture;if(Ee.__boundDepthTexture!==we){if(we!==null&&Ce.has(we)&&(x.width!==we.image.width||x.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(x)}}const Ie=x.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(_e=!0);const Fe=Ce.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Fe[I])?U=Fe[I][z]:U=Fe[I],se=!0):x.samples>0&&y.useMultisampledRTT(x)===!1?U=Ce.get(x).__webglMultisampledFramebuffer:Array.isArray(Fe)?U=Fe[z]:U=Fe,R.copy(x.viewport),V.copy(x.scissor),N=x.scissorTest}else R.copy(Me).multiplyScalar(B).floor(),V.copy(Ge).multiplyScalar(B).floor(),N=Ve;if(Te.bindFramebuffer(D.FRAMEBUFFER,U)&&H&&Te.drawBuffers(x,U),Te.viewport(R),Te.scissor(V),Te.setScissorTest(N),se){const Ee=Ce.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ee.__webglTexture,z)}else if(_e){const Ee=Ce.get(x.texture),Ie=I||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.__webglTexture,z||0,Ie)}E=-1},this.readRenderTargetPixels=function(x,I,z,H,U,se,_e){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ce.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){Te.bindFramebuffer(D.FRAMEBUFFER,Se);try{const Ee=x.texture,Ie=Ee.format,Fe=Ee.type;if(!Be.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=x.width-H&&z>=0&&z<=x.height-U&&D.readPixels(I,z,H,U,ze.convert(Ie),ze.convert(Fe),se)}finally{const Ee=P!==null?Ce.get(P).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(x,I,z,H,U,se,_e){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ce.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){const Ee=x.texture,Ie=Ee.format,Fe=Ee.type;if(!Be.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=x.width-H&&z>=0&&z<=x.height-U){Te.bindFramebuffer(D.FRAMEBUFFER,Se);const we=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.bufferData(D.PIXEL_PACK_BUFFER,se.byteLength,D.STREAM_READ),D.readPixels(I,z,H,U,ze.convert(Ie),ze.convert(Fe),0);const Ke=P!==null?Ce.get(P).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ke);const lt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Eh(D,lt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,se),D.deleteBuffer(we),D.deleteSync(lt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,I=null,z=0){x.isTexture!==!0&&(Pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,x=arguments[1]);const H=Math.pow(2,-z),U=Math.floor(x.image.width*H),se=Math.floor(x.image.height*H),_e=I!==null?I.x:0,Se=I!==null?I.y:0;y.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,_e,Se,U,se),Te.unbindTexture()},this.copyTextureToTexture=function(x,I,z=null,H=null,U=0){x.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,x=arguments[1],I=arguments[2],U=arguments[3]||0,z=null);let se,_e,Se,Ee,Ie,Fe,we,Ke,lt;const ht=x.isCompressedTexture?x.mipmaps[U]:x.image;z!==null?(se=z.max.x-z.min.x,_e=z.max.y-z.min.y,Se=z.isBox3?z.max.z-z.min.z:1,Ee=z.min.x,Ie=z.min.y,Fe=z.isBox3?z.min.z:0):(se=ht.width,_e=ht.height,Se=ht.depth||1,Ee=0,Ie=0,Fe=0),H!==null?(we=H.x,Ke=H.y,lt=H.z):(we=0,Ke=0,lt=0);const Gt=ze.convert(I.format),Je=ze.convert(I.type);let Ae;I.isData3DTexture?(y.setTexture3D(I,0),Ae=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(y.setTexture2DArray(I,0),Ae=D.TEXTURE_2D_ARRAY):(y.setTexture2D(I,0),Ae=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const yn=D.getParameter(D.UNPACK_ROW_LENGTH),Qe=D.getParameter(D.UNPACK_IMAGE_HEIGHT),sn=D.getParameter(D.UNPACK_SKIP_PIXELS),Ci=D.getParameter(D.UNPACK_SKIP_ROWS),Xt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ht.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ie),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe);const gr=x.isDataArrayTexture||x.isData3DTexture,ft=I.isDataArrayTexture||I.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const _n=Ce.get(x),vr=Ce.get(I),Kt=Ce.get(_n.__renderTarget),kn=Ce.get(vr.__renderTarget);Te.bindFramebuffer(D.READ_FRAMEBUFFER,Kt.__webglFramebuffer),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let zn=0;zn<Se;zn++)gr&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(x).__webglTexture,U,Fe+zn),x.isDepthTexture?(ft&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(I).__webglTexture,U,lt+zn),D.blitFramebuffer(Ee,Ie,se,_e,we,Ke,se,_e,D.DEPTH_BUFFER_BIT,D.NEAREST)):ft?D.copyTexSubImage3D(Ae,U,we,Ke,lt+zn,Ee,Ie,se,_e):D.copyTexSubImage2D(Ae,U,we,Ke,lt+zn,Ee,Ie,se,_e);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ft?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(Ae,U,we,Ke,lt,se,_e,Se,Gt,Je,ht.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(Ae,U,we,Ke,lt,se,_e,Se,Gt,ht.data):D.texSubImage3D(Ae,U,we,Ke,lt,se,_e,Se,Gt,Je,ht):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,U,we,Ke,se,_e,Gt,Je,ht.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,U,we,Ke,ht.width,ht.height,Gt,ht.data):D.texSubImage2D(D.TEXTURE_2D,U,we,Ke,se,_e,Gt,Je,ht);D.pixelStorei(D.UNPACK_ROW_LENGTH,yn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qe),D.pixelStorei(D.UNPACK_SKIP_PIXELS,sn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ci),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Xt),U===0&&I.generateMipmaps&&D.generateMipmap(Ae),Te.unbindTexture()},this.copyTextureToTexture3D=function(x,I,z=null,H=null,U=0){return x.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,x=arguments[2],I=arguments[3],U=arguments[4]||0),Pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,I,z,H,U)},this.initRenderTarget=function(x){Ce.get(x).__webglFramebuffer===void 0&&y.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?y.setTextureCube(x,0):x.isData3DTexture?y.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?y.setTexture2DArray(x,0):y.setTexture2D(x,0),Te.unbindTexture()},this.resetState=function(){A=0,T=0,P=null,Te.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class wo{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new je(e),this.near=t,this.far=i}clone(){return new wo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class uu extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class yo extends zt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=It,u=It,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ao extends pn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new F,f=new F,p=[],m=[],g=[],_=[];for(let d=0;d<=i;d++){const w=[],S=d/i;let M=0;d===0&&a===0?M=.5/t:d===i&&l===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){const A=C/t;h.x=-e*Math.cos(r+A*s)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(r+A*s)*Math.sin(a+S*o),m.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),_.push(A+M,1-S),w.push(c++)}u.push(w)}for(let d=0;d<i;d++)for(let w=0;w<t;w++){const S=u[d][w+1],M=u[d][w],C=u[d+1][w],A=u[d+1][w+1];(d!==0||a>0)&&p.push(S,M,A),(d!==i-1||l<Math.PI)&&p.push(M,C,A)}this.setIndex(p),this.setAttribute("position",new bn(m,3)),this.setAttribute("normal",new bn(g,3)),this.setAttribute("uv",new bn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ao(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Om{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Vl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Vl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Vl(){return performance.now()}class km extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_o}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_o);const Wi=new dn(0,0,0,"YXZ"),Xi=new F,zm={type:"change"},Hm={type:"lock"},Gm={type:"unlock"},Bl=Math.PI/2;class Vm extends km{constructor(e,t=null){super(e,t),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Bm.bind(this),this._onPointerlockChange=Wm.bind(this),this._onPointerlockError=Xm.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const t=this.object;Xi.setFromMatrixColumn(t.matrix,0),Xi.crossVectors(t.up,Xi),t.position.addScaledVector(Xi,e)}moveRight(e){if(this.enabled===!1)return;const t=this.object;Xi.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(Xi,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Bm(n){if(this.enabled===!1||this.isLocked===!1)return;const e=n.movementX||n.mozMovementX||n.webkitMovementX||0,t=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.object;Wi.setFromQuaternion(i.quaternion),Wi.y-=e*.002*this.pointerSpeed,Wi.x-=t*.002*this.pointerSpeed,Wi.x=Math.max(Bl-this.maxPolarAngle,Math.min(Bl-this.minPolarAngle,Wi.x)),i.quaternion.setFromEuler(Wi),this.dispatchEvent(zm)}function Wm(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Hm),this.isLocked=!0):(this.dispatchEvent(Gm),this.isLocked=!1)}function Xm(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const Oe={TICK:.05,WALK_SPEED:.1,SPRINT_MULTIPLIER:1.3,SNEAK_MULTIPLIER:.3,AIR_SPEED:.02,AIR_SPRINT_SPEED:.026,FLY_SPEED:.05,BLOCK_FRICTION:.6,AIR_FRICTION:.91,GRAVITY:.08,VERTICAL_DRAG:.98,FLY_VERTICAL_DRAG:.6,JUMP_POWER:.42,SPRINT_JUMP_BOOST:.2,JUMP_DELAY:10,WATER_SPEED:.02,WATER_DRAG:.8,WATER_SPRINT_DRAG:.9,WATER_JUMP:.04,WATER_JUMP_THRESHOLD:.4,STEP_HEIGHT:.6,MIN_VELOCITY:.003},hu={standing:{width:.6,height:1.8,eye:1.62},crouching:{width:.6,height:1.5,eye:1.27}};class Ym{pos={x:.5,y:120,z:.5};prevPos={x:.5,y:120,z:.5};velocity={x:0,y:0,z:0};onGround=!1;horizontalCollision=!1;flying=!1;sprinting=!1;pose="standing";noJumpDelay=0;waterHeight=0;lavaHeight=0;underWater=!1;underLava=!1;walkDist=0;prevWalkDist=0;bob=0;prevBob=0;get body(){return hu[this.pose]}get inWater(){return this.waterHeight>0}get inLava(){return this.lavaHeight>0}get speedAttribute(){return Oe.WALK_SPEED*(this.sprinting?Oe.SPRINT_MULTIPLIER:1)}get state(){if(this.flying)return this.sprinting?"飞行（疾跑）":"飞行";const e=[];return this.inWater&&e.push(this.underWater?"水下":"水中"),this.inLava&&e.push("岩浆中"),this.pose==="crouching"?e.push("潜行"):this.sprinting?e.push("疾跑"):e.push("行走"),e.join(" · ")}}const qm=["air","void_air","cave_air"],$m=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Zm=["sand","red_sand","suspicious_sand"],Km=["snow","snow_block","powder_snow"],jm=["ice","packed_ice","blue_ice","frosted_ice"],Jm=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves"],Qm=["dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],e0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","sunflower","lilac","peony","rose_bush","pitcher_plant","flowering_azalea_leaves","flowering_azalea","mangrove_propagule","cherry_leaves","pink_petals","chorus_flower","spore_blossom"],t0=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom"],n0=["stone","granite","diorite","andesite","tuff","deepslate"],i0=["netherrack","basalt","blackstone"],r0=["stone","granite","diorite","andesite"],s0=["deepslate","tuff"],a0=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault"],o0=["air","water","lava","short_grass","fern","dead_bush","seagrass","tall_seagrass","fire","soul_fire","snow","vine","glow_lichen","resin_clump","light","tall_grass","large_fern","structure_void","void_air","cave_air","bubble_column","warped_roots","nether_sprouts","crimson_roots","hanging_roots"],l0=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","pale_moss_carpet","short_grass","fern","dead_bush","vine","glow_lichen","sunflower","lilac","rose_bush","peony","tall_grass","large_fern","hanging_roots","pitcher_plant","water","seagrass","tall_seagrass","warped_roots","nether_sprouts","crimson_roots"],c0=["mud","muddy_mangrove_roots","mangrove_roots","mangrove_leaves","mangrove_log","mangrove_propagule","moss_carpet","vine"],u0=["mud","muddy_mangrove_roots","mangrove_roots","moss_carpet","vine","mangrove_propagule","snow"],h0=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","snow_block","powder_snow"],f0=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","red_sand","clay","gravel","sand","snow_block","powder_snow"],d0=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","clay","gravel","sand"],p0=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],_0=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_ore","deepslate_iron_ore","copper_ore","deepslate_copper_ore","snow","snow_block","powder_snow","water","gravel","suspicious_gravel","sandstone","red_sandstone","calcite","packed_ice","raw_iron_block","raw_copper_block"],m0=["ice","packed_ice","barrier"],g0=["honey_block","soul_sand","mud"],v0=["bedrock","water","lava","ice","packed_ice","blue_ice"],x0=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone"],M0=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone","deepslate_bricks","deepslate_tiles","cobbled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","polished_deepslate"],b0=["stone","granite","diorite","andesite","tuff","deepslate"],S0=["tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block"],E0=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral","tube_coral_fan","brain_coral_fan","bubble_coral_fan","fire_coral_fan","horn_coral_fan"],w0=["tube_coral_wall_fan","brain_coral_wall_fan","bubble_coral_wall_fan","fire_coral_wall_fan","horn_coral_wall_fan"],y0=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral"],A0=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault","jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],T0=["clay","moss_block"],R0=["clay","moss_block","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","pale_moss_block","mud","muddy_mangrove_roots","farmland"],C0=["sand","red_sand","suspicious_sand","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","bamboo","bamboo_sapling","gravel","suspicious_gravel"],P0=["sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],L0=["mycelium","podzol","crimson_nylium","warped_nylium"],D0=["terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta"],I0=["grass_block","mud","mangrove_roots","muddy_mangrove_roots"],U0=["stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks"],N0=["white_wool","orange_wool","magenta_wool","light_blue_wool","yellow_wool","lime_wool","pink_wool","gray_wool","light_gray_wool","cyan_wool","purple_wool","blue_wool","brown_wool","green_wool","red_wool","black_wool"],F0=["white_carpet","orange_carpet","magenta_carpet","light_blue_carpet","yellow_carpet","lime_carpet","pink_carpet","gray_carpet","light_gray_carpet","cyan_carpet","purple_carpet","blue_carpet","brown_carpet","green_carpet","red_carpet","black_carpet"],O0=["stone","granite","diorite","andesite","tuff","deepslate","netherrack","basalt","blackstone","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","crimson_nylium","warped_nylium","nether_wart_block","warped_wart_block","soul_sand","soul_soil"],k0=["crimson_nylium","warped_nylium"],z0=["nether_wart_block","warped_wart_block"],H0=["soul_sand","soul_soil"],G0=["netherrack","magma_block"],V0=["fire","soul_fire"],B0={air:qm,dirt:$m,sand:Zm,snow:Km,ice:jm,leaves:Jm,logs:Qm,flowers:e0,small_flowers:t0,base_stone_overworld:n0,base_stone_nether:i0,stone_ore_replaceables:r0,deepslate_ore_replaceables:s0,features_cannot_replace:a0,replaceable:o0,replaceable_by_trees:l0,mangrove_logs_can_grow_through:c0,mangrove_roots_can_grow_through:u0,azalea_grows_on:h0,azalea_root_replaceable:f0,lush_ground_replaceable:d0,moss_replaceable:p0,overworld_carver_replaceables:_0,snow_layer_cannot_survive_on:m0,snow_layer_can_survive_on:g0,geode_invalid_blocks:v0,sculk_replaceable:x0,sculk_replaceable_world_gen:M0,dripstone_replaceable_blocks:b0,coral_blocks:S0,corals:E0,wall_corals:w0,coral_plants:y0,lava_pool_stone_cannot_replace:A0,small_dripleaf_placeable:T0,big_dripleaf_placeable:R0,bamboo_plantable_on:C0,dead_bush_may_place_on:P0,mushroom_grow_block:L0,terracotta:D0,"mineable/pickaxe":["stone","granite","polished_granite","diorite","polished_diorite","andesite","polished_andesite","cobblestone","gold_ore","deepslate_gold_ore","iron_ore","deepslate_iron_ore","coal_ore","deepslate_coal_ore","nether_gold_ore","lapis_ore","deepslate_lapis_ore","lapis_block","dispenser","sandstone","chiseled_sandstone","cut_sandstone","gold_block","iron_block","bricks","mossy_cobblestone","obsidian","spawner","diamond_ore","deepslate_diamond_ore","diamond_block","furnace","cobblestone_stairs","stone_pressure_plate","iron_door","redstone_ore","deepslate_redstone_ore","netherrack","basalt","polished_basalt","stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks","iron_bars","chain","brick_stairs","stone_brick_stairs","nether_bricks","nether_brick_fence","nether_brick_stairs","enchanting_table","brewing_stand","end_stone","sandstone_stairs","emerald_ore","deepslate_emerald_ore","ender_chest","emerald_block","light_weighted_pressure_plate","heavy_weighted_pressure_plate","redstone_block","nether_quartz_ore","hopper","quartz_block","chiseled_quartz_block","quartz_pillar","quartz_stairs","dropper","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_trapdoor","prismarine","prismarine_bricks","dark_prismarine","prismarine_stairs","prismarine_brick_stairs","dark_prismarine_stairs","prismarine_slab","prismarine_brick_slab","dark_prismarine_slab","terracotta","coal_block","red_sandstone","chiseled_red_sandstone","cut_red_sandstone","red_sandstone_stairs","stone_slab","smooth_stone_slab","sandstone_slab","cut_sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","red_sandstone_slab","cut_red_sandstone_slab","purpur_slab","smooth_stone","smooth_sandstone","smooth_quartz","smooth_red_sandstone","purpur_block","purpur_pillar","purpur_stairs","end_stone_bricks","magma_block","red_nether_bricks","bone_block","observer","white_glazed_terracotta","orange_glazed_terracotta","magenta_glazed_terracotta","light_blue_glazed_terracotta","yellow_glazed_terracotta","lime_glazed_terracotta","pink_glazed_terracotta","gray_glazed_terracotta","light_gray_glazed_terracotta","cyan_glazed_terracotta","purple_glazed_terracotta","blue_glazed_terracotta","brown_glazed_terracotta","green_glazed_terracotta","red_glazed_terracotta","black_glazed_terracotta","white_concrete","orange_concrete","magenta_concrete","light_blue_concrete","yellow_concrete","lime_concrete","pink_concrete","gray_concrete","light_gray_concrete","cyan_concrete","purple_concrete","blue_concrete","brown_concrete","green_concrete","red_concrete","black_concrete","dead_tube_coral_block","dead_brain_coral_block","dead_bubble_coral_block","dead_fire_coral_block","dead_horn_coral_block","tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block","dead_tube_coral","dead_brain_coral","dead_bubble_coral","dead_fire_coral","dead_horn_coral","dead_tube_coral_fan","dead_brain_coral_fan","dead_bubble_coral_fan","dead_fire_coral_fan","dead_horn_coral_fan","dead_tube_coral_wall_fan","dead_brain_coral_wall_fan","dead_bubble_coral_wall_fan","dead_fire_coral_wall_fan","dead_horn_coral_wall_fan","polished_granite_stairs","smooth_red_sandstone_stairs","mossy_stone_brick_stairs","polished_diorite_stairs","mossy_cobblestone_stairs","end_stone_brick_stairs","stone_stairs","smooth_sandstone_stairs","smooth_quartz_stairs","granite_stairs","andesite_stairs","red_nether_brick_stairs","polished_andesite_stairs","diorite_stairs","polished_granite_slab","smooth_red_sandstone_slab","mossy_stone_brick_slab","polished_diorite_slab","mossy_cobblestone_slab","end_stone_brick_slab","smooth_sandstone_slab","smooth_quartz_slab","granite_slab","andesite_slab","red_nether_brick_slab","polished_andesite_slab","diorite_slab","smoker","blast_furnace","grindstone","stonecutter","bell","lantern","soul_lantern","warped_nylium","crimson_nylium","netherite_block","ancient_debris","crying_obsidian","respawn_anchor","lodestone","blackstone","blackstone_stairs","blackstone_slab","polished_blackstone","polished_blackstone_bricks","cracked_polished_blackstone_bricks","chiseled_polished_blackstone","polished_blackstone_brick_slab","polished_blackstone_brick_stairs","gilded_blackstone","polished_blackstone_stairs","polished_blackstone_slab","polished_blackstone_pressure_plate","chiseled_nether_bricks","cracked_nether_bricks","quartz_bricks","tuff","calcite","oxidized_copper","weathered_copper","exposed_copper","copper_block","copper_ore","deepslate_copper_ore","oxidized_cut_copper","weathered_cut_copper","exposed_cut_copper","cut_copper","oxidized_cut_copper_stairs","weathered_cut_copper_stairs","exposed_cut_copper_stairs","cut_copper_stairs","oxidized_cut_copper_slab","weathered_cut_copper_slab","exposed_cut_copper_slab","cut_copper_slab","waxed_copper_block","waxed_weathered_copper","waxed_exposed_copper","waxed_oxidized_copper","waxed_oxidized_cut_copper","waxed_weathered_cut_copper","waxed_exposed_cut_copper","waxed_cut_copper","waxed_oxidized_cut_copper_stairs","waxed_weathered_cut_copper_stairs","waxed_exposed_cut_copper_stairs","waxed_cut_copper_stairs","waxed_oxidized_cut_copper_slab","waxed_weathered_cut_copper_slab","waxed_exposed_cut_copper_slab","waxed_cut_copper_slab","lightning_rod","pointed_dripstone","dripstone_block","deepslate","cobbled_deepslate","cobbled_deepslate_stairs","cobbled_deepslate_slab","polished_deepslate","polished_deepslate_stairs","polished_deepslate_slab","deepslate_tiles","deepslate_tile_stairs","deepslate_tile_slab","deepslate_bricks","deepslate_brick_stairs","deepslate_brick_slab","chiseled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","smooth_basalt","raw_iron_block","raw_copper_block","raw_gold_block","ice","packed_ice","blue_ice","piston","sticky_piston","piston_head","amethyst_cluster","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_block","budding_amethyst","infested_cobblestone","infested_chiseled_stone_bricks","infested_cracked_stone_bricks","infested_deepslate","infested_stone","infested_mossy_stone_bricks","infested_stone_bricks","stone_button","polished_blackstone_button","cobblestone_wall","mossy_cobblestone_wall","brick_wall","prismarine_wall","red_sandstone_wall","mossy_stone_brick_wall","granite_wall","stone_brick_wall","nether_brick_wall","andesite_wall","red_nether_brick_wall","sandstone_wall","end_stone_brick_wall","diorite_wall","blackstone_wall","polished_blackstone_brick_wall","polished_blackstone_wall","cobbled_deepslate_wall","polished_deepslate_wall","deepslate_tile_wall","deepslate_brick_wall","mud_brick_wall","tuff_wall","polished_tuff_wall","tuff_brick_wall","resin_brick_wall","shulker_box","black_shulker_box","blue_shulker_box","brown_shulker_box","cyan_shulker_box","gray_shulker_box","green_shulker_box","light_blue_shulker_box","light_gray_shulker_box","lime_shulker_box","magenta_shulker_box","orange_shulker_box","pink_shulker_box","purple_shulker_box","red_shulker_box","white_shulker_box","yellow_shulker_box","anvil","chipped_anvil","damaged_anvil","cauldron","water_cauldron","lava_cauldron","powder_snow_cauldron","rail","powered_rail","detector_rail","activator_rail","conduit","mud_bricks","mud_brick_stairs","mud_brick_slab","packed_mud","crafter","tuff_slab","tuff_stairs","chiseled_tuff","polished_tuff","polished_tuff_slab","polished_tuff_stairs","tuff_bricks","tuff_brick_slab","tuff_brick_stairs","chiseled_tuff_bricks","chiseled_copper","exposed_chiseled_copper","weathered_chiseled_copper","oxidized_chiseled_copper","waxed_chiseled_copper","waxed_exposed_chiseled_copper","waxed_weathered_chiseled_copper","waxed_oxidized_chiseled_copper","copper_grate","exposed_copper_grate","weathered_copper_grate","oxidized_copper_grate","waxed_copper_grate","waxed_exposed_copper_grate","waxed_weathered_copper_grate","waxed_oxidized_copper_grate","copper_bulb","exposed_copper_bulb","weathered_copper_bulb","oxidized_copper_bulb","waxed_copper_bulb","waxed_exposed_copper_bulb","waxed_weathered_copper_bulb","waxed_oxidized_copper_bulb","copper_door","exposed_copper_door","weathered_copper_door","oxidized_copper_door","waxed_copper_door","waxed_exposed_copper_door","waxed_weathered_copper_door","waxed_oxidized_copper_door","copper_trapdoor","exposed_copper_trapdoor","weathered_copper_trapdoor","oxidized_copper_trapdoor","waxed_copper_trapdoor","waxed_exposed_copper_trapdoor","waxed_weathered_copper_trapdoor","waxed_oxidized_copper_trapdoor","heavy_core","resin_bricks","resin_brick_slab","resin_brick_stairs","chiseled_resin_bricks"],frogs_spawnable_on:I0,stone_bricks:U0,wool:N0,wool_carpets:F0,nether_carver_replaceables:O0,nylium:k0,wart_blocks:z0,soul_fire_base_blocks:H0,infiniburn_overworld:G0,fire:V0};Object.fromEntries(Object.entries(B0).map(([n,e])=>[`minecraft:${n}`,new Set(e.map(t=>`minecraft:${t}`))]));function W0(n,e,t){const i=BigInt(Math.imul(n|0,3129871)),r=BigInt.asIntN(64,BigInt(t|0)*116129781n);let s=BigInt.asIntN(64,i^r^BigInt(e|0));return s=BigInt.asIntN(64,s*s*42317861n+s*11n),s>>16n}function X0(n){let e=0;for(let t=0;t<n.length;t++)e=Math.imul(e,31)+n.charCodeAt(t)|0;return e}(()=>{const n=new Float32Array(65536);for(let e=0;e<65536;e++)n[e]=Math.sin(e*Math.PI*2/65536);return n})();class Y0{constructor(e){this.randomSource=e}nextNextGaussian=0;haveNextNextGaussian=!1;reset(){this.haveNextNextGaussian=!1}nextGaussian(){if(this.haveNextNextGaussian)return this.haveNextNextGaussian=!1,this.nextNextGaussian;let e,t,i;do e=2*this.randomSource.nextDouble()-1,t=2*this.randomSource.nextDouble()-1,i=e*e+t*t;while(i>=1||i===0);const r=Math.sqrt(-2*Math.log(i)/i);return this.nextNextGaussian=t*r,this.haveNextNextGaussian=!0,e*r}}const q0=n=>BigInt.asIntN(64,n),Wl=n=>Number(BigInt.asIntN(32,n)),Xl=(1n<<48n)-1n,Yl=25214903917n,$0=11n;class er{seed=0n;gaussianSource=new Y0(this);constructor(e){this.setSeed(e)}fork(){return new er(this.nextLong())}forkPositional(){return new Z0(this.nextLong())}setSeed(e){this.seed=(e^Yl)&Xl,this.gaussianSource.reset()}next(e){return this.seed=this.seed*Yl+$0&Xl,Wl(this.seed>>BigInt(48-e))}nextInt(e){if(e===void 0)return this.next(32);if(e<=0)throw new RangeError("Bound must be positive");if((e&e-1)===0)return Wl(BigInt(e)*BigInt(this.next(31))>>31n);let t,i;do t=this.next(31),i=t%e;while((t-i+(e-1)|0)<0);return i}nextIntBetweenInclusive(e,t){return this.nextInt(t-e+1)+e}nextLong(){const e=this.next(32),t=this.next(32);return q0((BigInt(e)<<32n)+BigInt(t))}nextBoolean(){return this.next(1)!==0}nextFloat(){return this.next(24)*5960464477539063e-23}nextDouble(){const e=this.next(26),t=this.next(27);return(e*134217728+t)*11102230246251565e-32}nextGaussian(){return this.gaussianSource.nextGaussian()}consumeCount(e){for(let t=0;t<e;t++)this.nextInt()}}class Z0{constructor(e){this.seed=e}at(e,t,i){return new er(W0(e,t,i)^this.seed)}fromHashOf(e){return new er(BigInt(X0(e))^this.seed)}fromSeed(e){return new er(e)}}new Set(["water","lava","short_grass","tall_grass","fern","large_fern","dead_bush","seagrass","tall_seagrass","vine","glow_lichen","moss_carpet","pale_moss_carpet","pale_hanging_moss","mangrove_propagule","cocoa","hanging_roots","cave_vines","cave_vines_plant","oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling","cherry_sapling","pale_oak_sapling","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","closed_eyeblossom","open_eyeblossom","sunflower","lilac","rose_bush","peony","brown_mushroom","red_mushroom","sugar_cane","kelp","kelp_plant","lily_pad","sweet_berry_bush","bamboo_sapling","pink_petals","sea_pickle","spore_blossom","small_dripleaf","big_dripleaf_stem","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_cluster","sculk_vein","fire","soul_fire","crimson_fungus","warped_fungus","crimson_roots","warped_roots","nether_sprouts","weeping_vines","weeping_vines_plant","twisting_vines","twisting_vines_plant","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["snow","cactus","chest","bamboo","pointed_dripstone","big_dripleaf","sculk_sensor","sculk_shrieker","sandstone_slab","azalea","flowering_azalea","dirt_path","farmland"].map(n=>`minecraft:${n}`));const K0=new Set(["seagrass","tall_seagrass","kelp","kelp_plant","sea_pickle","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["tall_grass","large_fern","sunflower","lilac","rose_bush","peony","small_dripleaf","tall_seagrass"].map(n=>`minecraft:${n}`));const j0={"minecraft:acacia_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:acacia_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:amethyst_cluster":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:bamboo":{props:[["age",["0","1"]],["leaves",["none","small","large"]],["stage",["0","1"]]],default:{age:"0",leaves:"none",stage:"0"}},"minecraft:basalt":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bee_nest":{props:[["facing",["north","south","west","east"]],["honey_level",["0","1","2","3","4","5"]]],default:{facing:"north",honey_level:"0"}},"minecraft:big_dripleaf":{props:[["facing",["north","south","west","east"]],["tilt",["none","unstable","partial","full"]],["waterlogged",["true","false"]]],default:{facing:"north",tilt:"none",waterlogged:"false"}},"minecraft:big_dripleaf_stem":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"false"}},"minecraft:birch_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:birch_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:bone_block":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:brain_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:brain_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:brown_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:bubble_column":{props:[["drag",["true","false"]]],default:{drag:"true"}},"minecraft:bubble_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:bubble_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:cactus":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:cave_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]],["berries",["true","false"]]],default:{age:"0",berries:"false"}},"minecraft:cave_vines_plant":{props:[["berries",["true","false"]]],default:{berries:"false"}},"minecraft:cherry_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:cherry_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:chest":{props:[["type",["single","left","right"]],["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{type:"single",facing:"north",waterlogged:"false"}},"minecraft:chorus_flower":{props:[["age",["0","1","2","3","4","5"]]],default:{age:"0"}},"minecraft:chorus_plant":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:cocoa":{props:[["age",["0","1","2"]],["facing",["north","south","west","east"]]],default:{age:"0",facing:"north"}},"minecraft:creaking_heart":{props:[["active",["true","false"]],["axis",["x","y","z"]],["natural",["true","false"]]],default:{active:"false",axis:"y",natural:"false"}},"minecraft:crimson_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:dark_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:dark_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:deepslate_redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:fire":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{age:"0",east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:fire_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:fire_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:flowering_azalea_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:glow_lichen":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:grass_block":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:hanging_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:horn_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:horn_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:infested_deepslate":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:iron_bars":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",waterlogged:"false",west:"false"}},"minecraft:jungle_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:jungle_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:kelp":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:large_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:large_fern":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:lava":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:lilac":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:mangrove_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:mangrove_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mangrove_propagule":{props:[["age",["0","1","2","3","4"]],["hanging",["true","false"]],["stage",["0","1"]],["waterlogged",["true","false"]]],default:{age:"0",hanging:"false",stage:"0",waterlogged:"false"}},"minecraft:mangrove_roots":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"false"}},"minecraft:medium_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:muddy_mangrove_roots":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:mushroom_stem":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:mycelium":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:pale_hanging_moss":{props:[["tip",["true","false"]]],default:{tip:"true"}},"minecraft:pale_moss_carpet":{props:[["bottom",["true","false"]],["east",["none","low","tall"]],["north",["none","low","tall"]],["south",["none","low","tall"]],["west",["none","low","tall"]]],default:{bottom:"true",east:"none",north:"none",south:"none",west:"none"}},"minecraft:pale_oak_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:pale_oak_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:peony":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:pink_petals":{props:[["facing",["north","south","west","east"]],["flower_amount",["1","2","3","4"]]],default:{facing:"north",flower_amount:"1"}},"minecraft:podzol":{props:[["snowy",["true","false"]]],default:{snowy:"false"}},"minecraft:pointed_dripstone":{props:[["thickness",["tip_merge","tip","frustum","middle","base"]],["vertical_direction",["up","down"]],["waterlogged",["true","false"]]],default:{thickness:"tip",vertical_direction:"up",waterlogged:"false"}},"minecraft:red_mushroom_block":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{down:"true",east:"true",north:"true",south:"true",up:"true",west:"true"}},"minecraft:redstone_ore":{props:[["lit",["true","false"]]],default:{lit:"false"}},"minecraft:rose_bush":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:sandstone_slab":{props:[["type",["top","bottom","double"]],["waterlogged",["true","false"]]],default:{type:"bottom",waterlogged:"false"}},"minecraft:sculk_catalyst":{props:[["bloom",["true","false"]]],default:{bloom:"false"}},"minecraft:sculk_sensor":{props:[["power",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]],["sculk_sensor_phase",["inactive","active","cooldown"]],["waterlogged",["true","false"]]],default:{power:"0",sculk_sensor_phase:"inactive",waterlogged:"false"}},"minecraft:sculk_shrieker":{props:[["can_summon",["true","false"]],["shrieking",["true","false"]],["waterlogged",["true","false"]]],default:{can_summon:"false",shrieking:"false",waterlogged:"false"}},"minecraft:sculk_vein":{props:[["down",["true","false"]],["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["waterlogged",["true","false"]],["west",["true","false"]]],default:{down:"false",east:"false",north:"false",south:"false",up:"false",waterlogged:"false",west:"false"}},"minecraft:sea_pickle":{props:[["pickles",["1","2","3","4"]],["waterlogged",["true","false"]]],default:{pickles:"1",waterlogged:"true"}},"minecraft:small_amethyst_bud":{props:[["facing",["north","east","south","west","up","down"]],["waterlogged",["true","false"]]],default:{facing:"up",waterlogged:"false"}},"minecraft:small_dripleaf":{props:[["facing",["north","south","west","east"]],["half",["upper","lower"]],["waterlogged",["true","false"]]],default:{facing:"north",half:"lower",waterlogged:"false"}},"minecraft:snow":{props:[["layers",["1","2","3","4","5","6","7","8"]]],default:{layers:"1"}},"minecraft:spruce_leaves":{props:[["distance",["1","2","3","4","5","6","7"]],["persistent",["true","false"]],["waterlogged",["true","false"]]],default:{distance:"7",persistent:"false",waterlogged:"false"}},"minecraft:spruce_log":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:sugar_cane":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{age:"0"}},"minecraft:sunflower":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:suspicious_gravel":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:suspicious_sand":{props:[["dusted",["0","1","2","3"]]],default:{dusted:"0"}},"minecraft:sweet_berry_bush":{props:[["age",["0","1","2","3"]]],default:{age:"0"}},"minecraft:tall_grass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tall_seagrass":{props:[["half",["upper","lower"]]],default:{half:"lower"}},"minecraft:tube_coral":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_fan":{props:[["waterlogged",["true","false"]]],default:{waterlogged:"true"}},"minecraft:tube_coral_wall_fan":{props:[["facing",["north","south","west","east"]],["waterlogged",["true","false"]]],default:{facing:"north",waterlogged:"true"}},"minecraft:twisting_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}},"minecraft:vine":{props:[["east",["true","false"]],["north",["true","false"]],["south",["true","false"]],["up",["true","false"]],["west",["true","false"]]],default:{east:"false",north:"false",south:"false",up:"false",west:"false"}},"minecraft:warped_stem":{props:[["axis",["x","y","z"]]],default:{axis:"y"}},"minecraft:water":{props:[["level",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]]],default:{level:"0"}},"minecraft:weeping_vines":{props:[["age",["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]]],default:{age:"0"}}},J0=j0;function Q0(n,e){const t=[];let i=n.length;for(let a=0;a<n.length;a++){const o=n[a]??"minecraft:air",l=J0[o],c=Object.fromEntries(Object.entries(e(a)).filter(([m])=>l?.props.some(([g])=>g===m))),u=(l?.props??[]).filter(([m])=>!(m in c)),h=[];let f=1;for(let m=u.length-1;m>=0;m--)h[m]=f,f*=u[m][1].length;let p=0;u.forEach(([m,g],_)=>p+=g.indexOf(l.default[m])*h[_]),t.push({name:o,props:u,stride:h,count:f,defaultIndex:p,base:i,fixed:c}),i+=f-1}const r=new Uint8Array(i),s=new Uint16Array(i);for(let a=0;a<t.length;a++){const o=t[a];for(let l=0;l<o.count;l++){const c=l===o.defaultIndex?a:o.base+(l<o.defaultIndex?l:l-1);r[c]=a,s[c]=l}}return{defs:t,count:i,blockOf:r,indexOf:s}}function eg(n,e,t){const i=n.defs[e];return t===i.defaultIndex?e:i.base+(t<i.defaultIndex?t:t-1)}function kr(n,e,t){const i=n.defs[n.blockOf[e]],r=i.props.findIndex(([s])=>s===t);return r<0?i.fixed[t]:i.props[r][1][Math.floor(n.indexOf[e]/i.stride[r])%i.props[r][1].length]}function tg(n,e,t){const i=n.blockOf[e],r=n.defs[i];let s=n.indexOf[e];for(const[a,o]of Object.entries(t)){const l=r.props.findIndex(([h])=>h===a);if(l<0)continue;const c=r.props[l][1].indexOf(String(o));if(c<0)continue;const u=Math.floor(s/r.stride[l])%r.props[l][1].length;s+=(c-u)*r.stride[l]}return eg(n,i,s)}function ng(n,e){const t=n.defs[n.blockOf[e]],i={...t.fixed};return t.props.forEach(([r,s],a)=>i[r]=s[Math.floor(n.indexOf[e]/t.stride[a])%s.length]),i}function ig(n,e){const t=n.defs[n.blockOf[e]],i=ng(n,e),r=Object.keys(i).sort();return r.length?`${t.name}[${r.map(s=>`${s}=${i[s]}`).join(",")}]`:t.name}const fe=16;class rg{data=new Uint8ClampedArray(fe*fe*4);set(e,t,[i,r,s],a=255){const o=((t&15)*fe+(e&15))*4|0;this.data[o]=i,this.data[o+1]=r,this.data[o+2]=s,this.data[o+3]=a}get(e,t){const i=((t&15)*fe+(e&15))*4;return[this.data[i],this.data[i+1],this.data[i+2]]}fill(e){for(let t=0;t<fe;t++)for(let i=0;i<fe;i++)this.set(i,t,e(i,t))}}function sg(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const k=n=>[n>>16&255,n>>8&255,n&255],ie=([n,e,t],i)=>[n*i,e*i,t*i],fu=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t];function ct(n,e,t,i){n.fill(()=>ie(e,1+(i()-.5)*2*t))}function Ye(n,e,t,i,r){for(let s=0;s<t;s++){let a=Math.floor(r()*fe),o=Math.floor(r()*fe);const l=e(),c=1+Math.floor(r()*i);for(let u=0;u<c;u++)n.set(a,o,l),r()<.5?a+=r()<.5?1:-1:o+=r()<.5?1:-1}}function On(n,e){const t=Array.from({length:n},()=>[e()*fe,e()*fe]),i=new Int32Array(fe*fe),r=new Float32Array(fe*fe);for(let s=0;s<fe;s++)for(let a=0;a<fe;a++){let o=1/0,l=1/0,c=0;t.forEach(([u,h],f)=>{let p=Math.abs(a+.5-u),m=Math.abs(s+.5-h);p=Math.min(p,fe-p),m=Math.min(m,fe-m);const g=Math.hypot(p,m);g<o?(l=o,o=g,c=f):g<l&&(l=g)}),i[s*fe+a]=c,r[s*fe+a]=l-o}return{owner:i,edge:r}}const _a=k(8806467),Ss=k(12105912),du=0;function pu(n,e){ct(n,k(8224125),.06,e),Ye(n,()=>ie(k(8224125),.82+e()*.06),10,4,e),Ye(n,()=>ie(k(8224125),1.1),6,2,e)}function _u(n,e){ct(n,k(5263448),.07,e);for(const t of[2,6,10,14]){const i=Math.floor(e()*fe);for(let r=0;r<11;r++)n.set(r+i,t+(r>6?1:0),ie(k(5263448),.72))}}function ag(n,e){ct(n,k(5658206),.06,e);const{edge:t}=On(5,e);n.fill((i,r)=>t[r*fe+i]<1?ie(k(5658206),.72):n.get(i,r))}function mr(n,e){ct(n,_a,.07,e),Ye(n,()=>ie(_a,.75),12,2,e),Ye(n,()=>ie(_a,1.18),8,2,e)}function Fs(n){for(let e=3;e<n.data.length;e+=4)n.data[e]=du}function og(n,e){ct(n,Ss,.1,e),Ye(n,()=>ie(Ss,.8),14,2,e),Ye(n,()=>ie(Ss,1.15),10,1,e),Fs(n)}function lg(n,e){mr(n,e);for(let t=0;t<fe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ie(Ss,.88+e()*.24),du)}}function cg(n,e){mr(n,e);for(let t=0;t<fe;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ie(k(15791864),.92+e()*.1))}}function ql(n,e){ct(n,k(14406560),.04,e),Ye(n,()=>ie(k(14406560),.88),10,1,e)}function $l(n,e){const{owner:t,edge:i}=On(14,e),r=Array.from({length:14},()=>ie(k(8814715),.75+e()*.45));n.fill((s,a)=>{const o=a*fe+s;return i[o]<.7?ie(k(8814715),.6):ie(r[t[o]],.96+e()*.08)})}function ug(n,e){const t=k(15790320);n.fill((i,r)=>{const s=Math.sin((i+r*2)/fe*Math.PI*2)+Math.sin((i*2-r)/fe*Math.PI*2);return ie(t,.92+s*.05+(e()-.5)*.04)}),Fs(n)}function hg(n,e){n.fill(()=>{const t=e();return t<.35?k(2763306):t<.7?k(5723991):t<.9?k(8026746):k(1710618)})}function fg(n,e){const t=k(10650447);for(let i=0;i<4;i++){const r=Math.floor(e()*fe),s=.94+e()*.12;for(let a=i*4;a<i*4+4;a++)for(let o=0;o<fe;o++){let l=ie(t,s*(1+(e()-.5)*.06));a===i*4+3?l=ie(t,.68):o===r&&(l=ie(t,.74)),n.set(o,a,l)}}}function mu(n,e){const{owner:t,edge:i}=On(9,e),r=Array.from({length:9},()=>.8+e()*.35);n.fill((s,a)=>{const o=a*fe+s;return i[o]<.9?ie(k(8026746),.55):ie(k(8026746),r[t[o]]*(1+(e()-.5)*.08))})}function dg(n,e){const t=k(7033138),i=Array.from({length:fe},()=>.8+e()*.35);n.fill(r=>ie(t,i[r]*(1+(e()-.5)*.12))),Ye(n,()=>ie(t,.6),5,3,e)}function pg(n,e){const t=k(11834207);n.fill((i,r)=>{const s=Math.max(Math.abs(i-7.5),Math.abs(r-7.5));if(s>7)return ie(k(7033138),.9+e()*.2);const a=Math.floor(s)%2===0?1:.86;return ie(t,a*(1+(e()-.5)*.05))})}function _g(n,e){const t=k(10132122);n.fill(()=>e()<.18?ie(t,.55):ie(t,.85+e()*.35)),Fs(n)}function mg(n,e){const{owner:t,edge:i}=On(7,e),r=Array.from({length:7},()=>fu(k(13146702),k(16771488),e()));n.fill((s,a)=>{const o=a*fe+s;return i[o]<.8?k(9071157):ie(r[t[o]],.95+e()*.1)})}function gg(n,e){n.fill((t,i)=>{const r=Math.sin((t+i)/fe*Math.PI*4)*.5+Math.sin((t*2-i)/fe*Math.PI*2)*.5,s=Math.max(0,Math.min(1,.5+r*.6+(e()-.5)*.25));return fu(k(13123599),k(16761402),s*s)}),Ye(n,()=>k(10103304),6,3,e)}function vg(n,e){ct(n,k(1774630),.12,e),Ye(n,()=>k(3877466),10,3,e),Ye(n,()=>k(788754),8,2,e)}const ma=n=>(e,t)=>{ct(e,k(n),.04,t);for(const i of[4,9,13])for(let r=0;r<fe;r++)t()<.8&&e.set(r,i,ie(k(n),.88));for(let i=0;i<fe;i++)e.set(i,0,ie(k(n),1.06))},Zl=n=>(e,t)=>{ct(e,k(n),.035,t),Ye(e,()=>ie(k(n),.93),8,2,t)},xg=n=>(e,t)=>{ct(e,k(n),.05,t),Ye(e,()=>ie(k(n),.86),10,1,t)};function Mg(n,e){ct(n,k(16055034),.025,e),Ye(n,()=>k(14674415),6,2,e)}function bg(n,e){ct(n,k(16251901),.02,e),Ye(n,()=>k(15200244),10,3,e)}function Sg(n,e){ct(n,k(9286906),.05,e);for(let t=0;t<3;t++){let i=Math.floor(e()*fe),r=Math.floor(e()*fe);for(let s=0;s<6;s++)n.set(i,r,k(14215423)),i+=1,r+=e()<.5?1:0}}function Eg(n,e){const{edge:t}=On(6,e);n.fill((i,r)=>t[r*fe+i]<.6?k(11127029):ie(k(9088744),.96+e()*.08))}function gu(n,e){ct(n,k(3947068),.08,e),Ye(n,()=>k(4932678),10,3,e)}function wg(n,e){ct(n,k(7299688),.1,e),Ye(n,()=>k(9273991),12,2,e),Ye(n,()=>k(5917781),8,2,e)}const Kl=n=>(e,t)=>{mr(e,t);for(let i=0;i<fe;i++){const r=2+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ie(k(n),.88+t()*.24))}};function yg(n,e){ct(n,k(5979933),.1,e),Ye(n,()=>k(8016936),14,3,e),Ye(n,()=>k(4074002),8,2,e)}function Ag(n,e){mr(n,e),Ye(n,()=>ie(k(7820603),.7),14,2,e),Ye(n,()=>k(9079434),6,1,e)}function Tg(n,e){ct(n,k(14672092),.03,e);const{edge:t}=On(5,e);n.fill((i,r)=>t[r*fe+i]<.5?k(13224646):n.get(i,r))}const hi=n=>(e,t)=>{ct(e,k(n),.03,t),Ye(e,()=>ie(k(n),.93),6,2,t)},dt=(n,e=.85,t=1.12)=>(i,r)=>{ct(i,k(n),.07,r),Ye(i,()=>ie(k(n),e+r()*.06),12,3,r),Ye(i,()=>ie(k(n),t),8,2,r)},Pt=(n,e,t=5)=>(i,r)=>{(n?_u:pu)(i,r);for(let s=0;s<t;s++){const a=2+Math.floor(r()*12),o=2+Math.floor(r()*12),l=2+Math.floor(r()*3);for(let c=0;c<l;c++){const u=a+Math.floor(r()*3)-1,h=o+Math.floor(r()*3)-1;i.set(u,h,ie(k(e),.8+r()*.4))}i.set(a,o,ie(k(e),1.15))}},jl=n=>(e,t)=>{const{owner:i,edge:r}=On(6,t),s=Array.from({length:6},()=>.8+t()*.35);e.fill((a,o)=>{const l=o*fe+a;return r[l]<.8?ie(k(n),.55):ie(k(n),s[i[l]]*(1+(t()-.5)*.08))})},xn=(n,e=.6)=>(t,i)=>{const r=k(n),s=Array.from({length:fe},()=>.8+i()*.35);t.fill(a=>ie(r,s[a]*(1+(i()-.5)*.12))),Ye(t,()=>ie(r,e),5,3,i)};function Rg(n,e){ct(n,k(14211026),.05,e);for(let t=0;t<7;t++){const i=Math.floor(e()*fe),r=Math.floor(e()*fe),s=2+Math.floor(e()*4);for(let a=0;a<s;a++)n.set(i+a,r,ie(k(3025704),.9+e()*.3))}}const mn=(n,e)=>(t,i)=>{t.fill((r,s)=>{const a=Math.max(Math.abs(r-7.5),Math.abs(s-7.5));if(a>7)return ie(k(e),.9+i()*.2);const o=Math.floor(a)%2===0?1:.86;return ie(k(n),o*(1+(i()-.5)*.05))})},gn=(n,e,t)=>(i,r)=>{const s=k(n);i.fill(()=>r()<.18?ie(s,.55):ie(s,.85+r()*.35)),t!==void 0&&Ye(i,()=>ie(k(t),.9+r()*.2),9,2,r),e&&Fs(i)},Jl=(n,e)=>(t,i)=>{ct(t,k(n),.06,i),e&&Ye(t,()=>k(15261904),6,4,i)};function Cg(n,e){ct(n,k(14272936),.05,e);for(let t=0;t<14;t++)n.set(Math.floor(e()*fe),Math.floor(e()*fe),k(12100227))}function Pg(n,e){const t=Array.from({length:fe},()=>.9+e()*.15);n.fill(i=>ie(k(13616821),t[i]*(1+(e()-.5)*.06)))}function Lg(n,e){Ig(n,e,12819020);for(let t=0;t<fe;t++)n.set(t,7,ie(k(8018474),.9))}function Dg(n,e){const{edge:t}=On(8,e);n.fill((i,r)=>t[r*fe+i]<.8?k(9071146):ie(k(13936192),.9+e()*.2))}function Ig(n,e,t){const i=k(t);for(let r=0;r<fe;r++)for(let s=0;s<fe;s++)n.set(s,r,ie(i,(r%4===3?.7:1)*(.94+e()*.1)))}function Ug(n,e){xn(5985100)(n,e);for(let t=5;t<11;t++)for(let i=5;i<11;i++)n.set(i,t,Math.abs(i-7.5)+Math.abs(t-7.5)<3?k(14711338):k(3813932))}function Ng(n,e){n.fill(()=>k(2894372));for(let t=0;t<6;t++){const i=e()<.5,r=Math.floor(e()*fe);for(let s=0;s<fe;s++)n.set(i?r:s,i?s:r,ie(k(4864810),.85+e()*.3))}}function Fg(n,e){gu(n,e);for(let t=0;t<4;t++){const i=Math.floor(e()*fe);for(let r=0;r<fe;r++)n.set(i,r,ie(k(4864810),.85+e()*.3))}}function Og(n,e){mr(n,e),Ye(n,()=>k(10978138),8,4,e)}const ls=n=>(e,t)=>{ct(e,k(n),.1,t),Ye(e,()=>ie(k(n),.8),10,2,t)},et=(n,e,t=!1)=>(i,r)=>{for(let s=3;s<i.data.length;s+=4)i.data[s]=0;if(e((s,a,o=1)=>i.set(s,a,ie(k(n),o*(.85+r()*.3)),255),r),t)for(let s=0;s<i.data.length;s+=4)i.data[s+3]===0&&(i.data[s]=i.data[s+1]=i.data[s+2]=0)},kg=et(10132122,(n,e)=>{for(let t=0;t<fe;t+=3){const i=6+Math.floor(e()*10);let r=t;for(let s=0;s<i;s++)n(r,s),e()<.4&&n(r+1,s,.8),e()<.2&&(r+=e()<.5?1:-1)}},!0),zg=et(12041648,(n,e)=>{for(let t=2;t<14;t+=2){const i=5+Math.floor(e()*10);for(let r=0;r<i;r++)n(t+(r%3===0?1:0),r)}}),Hg=et(6989903,n=>{for(let e=0;e<12;e++)n(7,e+2,.9);for(let e=5;e<10;e++)n(e,2);n(7,14,.6)}),Gg=et(11561518,n=>{for(let e=4;e<12;e++)for(let t=5;t<11;t++)(t-7.5)**2/9+(e-7.5)**2/16<1&&n(t,e,t===7?.7:1);n(7,2,.6),n(7,3,.6)}),wr=(n,e=12)=>(t,i)=>et(n,(r,s)=>{for(let a=1;a<15;a+=2){const o=Math.floor(e*(.45+s()*.55));let l=a;for(let c=15;c>15-o;c--)r(l,c,.8+(15-c)/40),s()<.15&&(l+=s()<.5?1:-1)}},!0)(t,i),Ql=(n,e=13)=>(t,i)=>et(n,r=>{for(let s=15;s>15-e;s--){r(7,s);const a=Math.floor((s-(15-e))/e*5);if(s%2===0)for(let o=1;o<=a;o++)r(7-o,s-(o>>1),.9),r(7+o,s-(o>>1),.9)}},!0)(t,i),Vg=et(9071162,(n,e)=>{for(let t=0;t<5;t++){let i=7;for(let r=15;r>4&&(n(i,r),e()<.4&&(i+=t%2?1:-1),!(i<1||i>14));r--);}}),wt=(n,e=0)=>(t,i)=>{for(let a=3;a<t.data.length;a+=4)t.data[a]=0;const r=e?2:6;for(let a=15;a>=r;a--)t.set(7,a,ie(k(4164138),.85+i()*.3),255);t.set(6,11,k(5216826),255),t.set(8,9,k(5216826),255);const s=e?4:5;for(let a=s-2;a<=s+2;a++)for(let o=5;o<=9;o++)Math.abs(o-7)+Math.abs(a-s)<=3&&t.set(o,a,ie(k(n),.8+i()*.35),255);t.set(7,s,ie(k(n),.6),255)},Bg=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<16;t++)n.set(7,t,ie(k(4164138),.85+e()*.3),255);for(const[t,i]of[[6,4],[5,5],[8,8],[9,9],[10,10],[6,12],[5,13]])n.set(t,i,ie(k(5216826),.85+e()*.3),255)},ec=n=>et(n,e=>{for(let t=9;t<15;t++)e(7,t,.7);for(let t=4;t<=10;t++)for(let i=5;i<=8;i++)Math.abs(t-7)<=3-Math.max(0,6-i)&&e(t,i)}),Wg=(n,e)=>{et(4155946,(t,i)=>{for(let r=0;r<70;r++)t(Math.floor(i()*14)+1,Math.floor(i()*10)+5)})(n,e);for(let t=0;t<5;t++)n.set(2+Math.floor(e()*12),6+Math.floor(e()*8),k(11542570),255)},Xg=et(10526880,n=>{for(const e of[3,7,11])for(let t=0;t<16;t++)n(e,t,t%5===0?.7:1)},!0),Yg=et(6134314,n=>{for(let e=0;e<16;e++)n(7,e,e%6===0?.6:1),n(8,e,e%6===0?.6:.9);for(let e=9;e<13;e++)n(e,3,1.1)}),tc=(n,e)=>(t,i)=>{if(et(n,(r,s)=>{for(let a=0;a<120;a++)r(Math.floor(s()*16),Math.floor(s()*12)+2)})(t,i),e!==void 0)for(let r=0;r<8;r++)t.set(Math.floor(i()*16),2+Math.floor(i()*10),k(e),255)},qg=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<14;t++){const i=Math.floor(e()*14)+1,r=Math.floor(e()*14)+1;n.set(i,r,k(15902920),255),n.set(i+1,r,k(15241400),255)}},$g=(n,e)=>{n.fill((t,i)=>(t-7.5)**2+(i-7.5)**2<49&&!(t>7&&Math.abs(i-7.5)<1)?ie(k(10132122),.85+e()*.3):[0,0,0]);for(let t=0;t<n.data.length;t+=4)n.data[t+3]=n.data[t]===0?0:255},Zg=(n,e)=>n.fill(t=>ie(k(14190890),(t%4===0?.75:1)*(.92+e()*.1))),Kg=(n,e)=>n.fill((t,i)=>Math.abs(t-7.5)<1.5&&Math.abs(i-7.5)<1.5?k(5929514):ie(k(13664808),.9+e()*.12)),jg=(n,e)=>n.fill(t=>ie(k(t%4<2?7315754:9156666),.92+e()*.1)),Jg=(n,e)=>n.fill((t,i)=>ie(k(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1.5?7315754:9156666),.92+e()*.1)),Qg=(n,e)=>n.fill((t,i)=>t===0||t===15?k(2906652):(t+i)%5===0?k(14211248):ie(k(5016108),.88+e()*.14)),ev=(n,e)=>n.fill((t,i)=>t===0||t===15||i===0||i===15?k(2906652):ie(k(6068796),.9+e()*.12)),nc=et(5933610,(n,e)=>{let t=7;for(let i=0;i<16;i++){if(n(t,i),n(t+1,i,.85),i%4===1)for(let r=1;r<4;r++)n(t+(i%8===1?r+1:-r),i+(r>>1),.9);e()<.2&&(t+=e()<.5?1:-1),t=Math.max(4,Math.min(10,t))}}),tv=et(6982186,n=>{for(const e of[4,9])for(let t=9;t<16;t++)for(let i=e;i<e+3;i++)n(i,t,t<11?1.2:1)}),vu=n=>et(n,(e,t)=>{for(let i=0;i<60;i++)e(Math.floor(t()*16),Math.floor(t()*16),.8+t()*.4)}),nv=vu(8034938),iv=et(10517082,(n,e)=>{for(let t=2;t<14;t+=2){const i=6+Math.floor(e()*9);for(let r=0;r<i;r++)n(t+(r%4===3?1:0),r)}}),rv=et(14181544,n=>{for(let e=3;e<13;e++)for(let t=0;t<3;t++)n(e,t,Math.abs(e-7.5)<2?.7:1);for(let e=5;e<11;e++)n(e,3,.8)}),cs=n=>(e,t)=>{if(et(4880938,i=>{for(const r of[5,10])for(let s=0;s<16;s++)i(r+(s%5===0?1:0),s)})(e,t),n)for(const[i,r]of[[4,6],[11,10],[6,13]])e.set(i,r,k(15900714),255)},ic=et(5937706,n=>{for(let e=6;e<16;e++)n(7,e,.8);for(let e=1;e<15;e++)for(let t=2;t<6;t++)Math.abs(e-7.5)<7-(5-t)&&n(e,t)}),sv=et(5937706,n=>{for(let e=0;e<16;e++)n(7,e,.85)}),av=et(8808538,n=>{for(let e=0;e<16;e++){const t=Math.max(0,3-Math.floor(e/5));for(let i=7-t;i<=8+t;i++)n(i,e)}}),us=n=>et(n,e=>{for(let t=4;t<16;t++)e(7,t,1.15),e(8,t,.95),t>8&&(e(5,t,.9),e(10,t,1))}),ga=(n,e)=>{n.fill(()=>ie(k(797754),.8+e()*.4)),Ye(n,()=>k(2803928),5,1,e)},ov=(n,e)=>{mu(n,e),Ye(n,()=>ie(k(5929516),.85+e()*.3),8,3,e)},lv=(n,e)=>{const{edge:t}=On(7,e);n.fill((i,r)=>t[r*fe+i]<.9?k(15235098):ie(k(6957586),.8+e()*.4))},rc=n=>n.fill((e,t)=>e%4===0||t%4===0?k(2767434):[12,16,22]),cv=(n,e)=>n.fill((t,i)=>i===5||t===0||t===15||i===0||i===15?k(4861972):t>=7&&t<=8&&i>=4&&i<=7?k(12105912):ie(k(11039786),.9+e()*.12)),uv=(n,e)=>n.fill(t=>ie(k(14867652),(t%5===0?.85:1)*(.94+e()*.08))),hv=(n,e)=>n.fill((t,i)=>Math.max(Math.abs(t-7.5),Math.abs(i-7.5))<3?k(12103834):ie(k(14867652),.94+e()*.08)),yr=n=>et(n,e=>{for(const[t,i]of[[4,10],[8,13],[11,8]])for(let r=15;r>15-i;r--)e(t+(r%4===0?1:0),r)}),vn=n=>et(n,e=>{for(let t=6;t<16;t++)for(let i=0;i<16;i++)Math.abs(i-7.5)<(16-t)*.75&&(i+t)%3!==0&&e(i,t)}),To=(n,e)=>{ct(n,k(7219754),.12,e),Ye(n,()=>ie(k(7219754),.7+e()*.1),14,2,e),Ye(n,()=>ie(k(9321014),1.05),8,2,e)},fv=(n,e)=>{ct(n,k(5390382),.1,e);for(let t=0;t<4;t++){const i=2+Math.floor(e()*11),r=2+Math.floor(e()*11);n.set(i,r,k(3023384),255),n.set(i+2,r,k(3023384),255),n.set(i+1,r+2,k(3023384),255)}},dv=(n,e)=>n.fill(t=>ie(k(4868688),(t%4===0?.75:1)*(.9+e()*.15))),pv=(n,e)=>n.fill((t,i)=>ie(k(5921376),(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1?.8:1)*(.92+e()*.1))),sc=n=>(e,t)=>{To(e,t);for(let i=0;i<6;i++){const r=2+Math.floor(t()*12),s=2+Math.floor(t()*12);e.set(r,s,ie(k(n),.9+t()*.3)),e.set(r+1,s,ie(k(n),.8))}},_v=(n,e)=>n.fill((t,i)=>ie(k(6177336),((t+i*3)%7<2?.7:1)*(.9+e()*.15))),mv=(n,e)=>n.fill((t,i)=>ie(k(6966336),(Math.hypot(t-7.5,i-7.5)%4<1.2?.75:1)*(.9+e()*.12))),ac=n=>(e,t)=>{ct(e,k(n),.12,t),Ye(e,()=>ie(k(n),1.2),6,2,t)},oc=n=>(e,t)=>{To(e,t);for(let i=0;i<16;i++){const r=3+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ie(k(n),.85+t()*.3))}},lc=(n,e)=>(t,i)=>{xn(n)(t,i);for(let r=0;r<10;r++)t.set(Math.floor(i()*16),Math.floor(i()*16),ie(k(e),.9+i()*.3))},cc=n=>et(n,e=>{for(let t=9;t<16;t++)e(7,t,.7);for(let t=3;t<=11;t++)for(let i=4;i<=8;i++)Math.abs(t-7)<=4-Math.max(0,6-i)&&e(t,i)}),uc=n=>et(n,(e,t)=>{for(let i=2;i<14;i+=2){const r=6+Math.floor(t()*8);for(let s=15;s>15-r;s--)e(i+(s%3===0?1:0),s)}}),hs=n=>et(n,e=>{for(const t of[5,9])for(let i=0;i<16;i++)e(t+(i%4<2?0:1),i)}),hc=n=>et(n,(e,t)=>{for(let i=1;i<15;i++){const r=6+Math.floor(t()*9);for(let s=15;s>15-r;s--)e(i,s,.75+(15-s)/30)}}),gv=et(10132122,n=>{for(const e of[1,6,9,14])for(let t=0;t<16;t++)n(e,t);for(const e of[0,15])for(let t=0;t<16;t++)n(t,e)}),vv=et(14215423,(n,e)=>{for(let t=0;t<8;t++)n(Math.floor(e()*16),Math.floor(e()*16))}),xu={stone:pu,deepslate:_u,deepslate_top:ag,dirt:mr,grass_top:og,grass_side:lg,sand:ql,gravel:$l,water:ug,bedrock:hg,planks:fg,cobblestone:mu,log:dg,log_top:pg,leaves:_g,glowstone:mg,lava:gg,obsidian:vg,sandstone:ma(14207899),sandstone_top:Zl(14471071),red_sand:xg(12477985),red_sandstone:ma(11887135),red_sandstone_top:Zl(12150058),snow:Mg,powder_snow:bg,ice:Sg,packed_ice:Eg,mud:gu,mycelium_top:wg,mycelium_side:Kl(7299688),podzol_top:yg,podzol_side:Kl(6965794),coarse_dirt:Ag,calcite:Tg,terracotta:hi(9985603),white_terracotta:hi(13742753),orange_terracotta:hi(10572581),yellow_terracotta:hi(12223779),brown_terracotta:hi(5059363),red_terracotta:hi(9387310),light_gray_terracotta:hi(8874593),granite:dt(10120024),diorite:dt(12434620,.8,1.06),andesite:dt(9079436),tuff:dt(7171429),clay:dt(10528435,.92,1.06),coal_ore:Pt(!1,2829099),deepslate_coal_ore:Pt(!0,2039583),iron_ore:Pt(!1,14200723),deepslate_iron_ore:Pt(!0,13213827),copper_ore:Pt(!1,12677451),deepslate_copper_ore:Pt(!0,11758148),gold_ore:Pt(!1,15980106),deepslate_gold_ore:Pt(!0,15255100),redstone_ore:Pt(!1,11801102),deepslate_redstone_ore:Pt(!0,11014156),emerald_ore:Pt(!1,1557828,3),deepslate_emerald_ore:Pt(!0,1356860,3),lapis_ore:Pt(!1,2312616),deepslate_lapis_ore:Pt(!0,2113696),diamond_ore:Pt(!1,6155486,4),deepslate_diamond_ore:Pt(!0,5233871,4),raw_iron_block:jl(10913643),raw_copper_block:jl(10115646),oak_log:xn(7033138),spruce_log:xn(3877401),spruce_log_top:mn(7558450,3877401),birch_log:Rg,birch_log_top:mn(12890235,14211026),jungle_log:xn(5653791,.5),jungle_log_top:mn(10975308,5653791),acacia_log:xn(6775127),acacia_log_top:mn(11690042,6775127),dark_oak_log:xn(3943962,.7),dark_oak_log_top:mn(5192482,3943962),mangrove_log:xn(5522223),mangrove_log_top:mn(7223858,5522223),cherry_log:xn(3612714),cherry_log_top:mn(13999e3,3612714),pale_oak_log:xn(5985100),pale_oak_log_top:mn(15129557,5985100),spruce_leaves:gn(6263903,!1),birch_leaves:gn(8233811,!1),jungle_leaves:gn(11053224,!0),acacia_leaves:gn(10132122,!0),dark_oak_leaves:gn(10132122,!0),mangrove_leaves:gn(10526880,!0),cherry_leaves:gn(15378888,!1),pale_oak_leaves:gn(10922654,!1),azalea_leaves:gn(6061100,!1),flowering_azalea_leaves:gn(6061100,!1,14122962),mushroom_stem:Pg,red_mushroom_block:Jl(12593702,!0),brown_mushroom_block:Jl(9793877,!1),mangrove_roots:Ng,muddy_mangrove_roots:Fg,rooted_dirt:Og,bee_nest:Lg,bee_nest_top:Dg,creaking_heart:Ug,moss_carpet:ls(5929516),pale_moss_carpet:ls(10331030),vine:kg,pale_hanging_moss:zg,mangrove_propagule:Hg,cocoa:Gg,short_grass:wr(10132122),fern:Ql(10132122),tall_grass:wr(10132122,16),large_fern:Ql(10132122,16),dead_bush:Vg,dandelion:wt(15980858),poppy:wt(14168618),blue_orchid:wt(3188966),allium:wt(11755488),azure_bluet:wt(15265010),red_tulip:wt(14694954),orange_tulip:wt(15764010),white_tulip:wt(15921902),pink_tulip:wt(15902920),oxeye_daisy:wt(16053482),cornflower:wt(4878056),lily_of_the_valley:wt(16777215),closed_eyeblossom:wt(9079434),open_eyeblossom:wt(15768122),sunflower:wt(16175646,16),lilac:wt(13803740,16),rose_bush:wt(13777466,16),peony:wt(15775448,16),brown_mushroom:ec(9793877),red_mushroom:ec(14168618),sweet_berry_bush:Wg,sugar_cane:Xg,bamboo:Yg,azalea:tc(6982188),flowering_azalea:tc(6982188,14122962),pink_petals:qg,lily_pad:$g,pumpkin:Zg,pumpkin_top:Kg,melon:jg,melon_top:Jg,cactus:Qg,cactus_top:ev,seagrass:wr(4164138),tall_seagrass:wr(4164138,16),kelp:nc,kelp_plant:nc,sea_pickle:tv,glow_lichen:nv,hanging_roots:iv,spore_blossom:rv,cave_vines:cs(!1),cave_vines_plant:cs(!1),cave_vines_lit:cs(!0),cave_vines_plant_lit:cs(!0),grass_snow_side:cg,mushroom_block_inside:Cg,tall_flower_bottom:Bg,small_dripleaf:ic,big_dripleaf:ic,big_dripleaf_stem:sv,moss_block:ls(5929516),pale_moss_block:ls(10331030),dripstone_block:dt(8808538),pointed_dripstone:av,smooth_basalt:dt(4737102,.9,1.05),amethyst_block:dt(9069512,.85,1.15),budding_amethyst:dt(8017336,.8,1.2),small_amethyst_bud:us(12094184),medium_amethyst_bud:us(12094184),large_amethyst_bud:us(12094184),amethyst_cluster:us(12094184),sculk:ga,sculk_vein:vu(801868),sculk_sensor:ga,sculk_shrieker:dt(13156520),sculk_catalyst:ga,blue_ice:dt(7645424,.92,1.06),mossy_cobblestone:ov,magma_block:lv,spawner:rc,chest:cv,bone_block:uv,bone_block_top:hv,suspicious_sand:ql,suspicious_gravel:$l,sandstone_slab:ma(14207899),tube_coral_block:dt(3364317,.85,1.12),tube_coral:yr(3364317),tube_coral_fan:vn(3364317),tube_coral_wall_fan:vn(3364317),brain_coral_block:dt(14178984,.85,1.12),brain_coral:yr(14178984),brain_coral_fan:vn(14178984),brain_coral_wall_fan:vn(14178984),bubble_coral_block:dt(11021008,.85,1.12),bubble_coral:yr(11021008),bubble_coral_fan:vn(11021008),bubble_coral_wall_fan:vn(11021008),fire_coral_block:dt(14168106,.85,1.12),fire_coral:yr(14168106),fire_coral_fan:vn(14168106),fire_coral_wall_fan:vn(14168106),horn_coral_block:dt(14731322,.85,1.12),horn_coral:yr(14731322),horn_coral_fan:vn(14731322),horn_coral_wall_fan:vn(14731322),netherrack:To,soul_sand:fv,soul_soil:dt(4864558,.85,1.1),basalt:dv,basalt_top:pv,blackstone:dt(2761768,.8,1.25),nether_gold_ore:sc(16175162),nether_quartz_ore:sc(15525084),ancient_debris:_v,ancient_debris_top:mv,crimson_nylium:oc(10102310),crimson_nylium_top:ac(10102310),warped_nylium:oc(2853500),warped_nylium_top:ac(2853500),crimson_stem:lc(6957626,13120058),crimson_stem_top:mn(9321034,6957626),warped_stem:lc(3816014,2803896),warped_stem_top:mn(3836544,3816014),nether_wart_block:dt(7998990,.8,1.2),warped_wart_block:dt(1473144,.8,1.2),shroomlight:dt(15768138,.85,1.2),crimson_fungus:cc(11545130),warped_fungus:cc(2797728),crimson_roots:uc(10100266),warped_roots:uc(2005642),nether_sprouts:wr(2005642,8),weeping_vines:hs(10495018),weeping_vines_plant:hs(10495018),twisting_vines:hs(2005642),twisting_vines_plant:hs(2005642),fire:hc(15763994),soul_fire:hc(3856616),end_stone:dt(14474400,.88,1.06),chorus_plant:dt(6965866,.8,1.25),chorus_flower:dt(10123930,.85,1.15),end_gateway:rc,iron_bars:gv,bubble_column:vv},Ro=Object.keys(xu),ee=Object.fromEntries(Ro.map((n,e)=>[n,e+1])),Co=Ro.length+1;function Mu(){const n=new Uint8Array(Co*fe*fe*4);return Ro.forEach((e,t)=>{const i=new rg;let r=0;for(const s of e)r=Math.imul(r,31)+s.charCodeAt(0);xu[e](i,sg(r)),n.set(i.data,(t+1)*fe*fe*4)}),n}const ae=4,bu=(()=>{const n=new Uint8Array(Co);n[ee.grass_top]=1,n[ee.grass_side]=1,n[ee.leaves]=2,n[ee.water]=3;for(const e of["jungle_leaves","acacia_leaves","dark_oak_leaves","mangrove_leaves"])n[ee[e]]=2;n[ee.vine]=2|ae;for(const e of["pale_hanging_moss","mangrove_propagule","cocoa"])n[ee[e]]=ae;for(const e of["cave_vines_lit","cave_vines_plant_lit","tall_flower_bottom"])n[ee[e]]=ae;return n[ee.short_grass]=1|ae,n[ee.fern]=1|ae,n[ee.tall_grass]=1|ae,n[ee.large_fern]=1|ae,n[ee.dead_bush]=ae,n[ee.dandelion]=ae,n[ee.poppy]=ae,n[ee.blue_orchid]=ae,n[ee.allium]=ae,n[ee.azure_bluet]=ae,n[ee.red_tulip]=ae,n[ee.orange_tulip]=ae,n[ee.white_tulip]=ae,n[ee.pink_tulip]=ae,n[ee.oxeye_daisy]=ae,n[ee.cornflower]=ae,n[ee.lily_of_the_valley]=ae,n[ee.closed_eyeblossom]=ae,n[ee.open_eyeblossom]=ae,n[ee.sunflower]=ae,n[ee.lilac]=ae,n[ee.rose_bush]=ae,n[ee.peony]=ae,n[ee.brown_mushroom]=ae,n[ee.red_mushroom]=ae,n[ee.sweet_berry_bush]=ae,n[ee.sugar_cane]=1|ae,n[ee.bamboo]=ae,n[ee.azalea]=ae,n[ee.flowering_azalea]=ae,n[ee.pink_petals]=ae,n[ee.lily_pad]=2|ae,n[ee.seagrass]=ae,n[ee.tall_seagrass]=ae,n[ee.kelp]=ae,n[ee.kelp_plant]=ae,n[ee.sea_pickle]=ae,n[ee.glow_lichen]=ae,n[ee.hanging_roots]=ae,n[ee.spore_blossom]=ae,n[ee.cave_vines]=ae,n[ee.cave_vines_plant]=ae,n[ee.small_dripleaf]=ae,n[ee.big_dripleaf]=ae,n[ee.big_dripleaf_stem]=ae,n[ee.pointed_dripstone]=ae,n[ee.small_amethyst_bud]=ae,n[ee.medium_amethyst_bud]=ae,n[ee.large_amethyst_bud]=ae,n[ee.amethyst_cluster]=ae,n[ee.sculk_vein]=ae,n[ee.tube_coral]=ae,n[ee.tube_coral_fan]=ae,n[ee.tube_coral_wall_fan]=ae,n[ee.brain_coral]=ae,n[ee.brain_coral_fan]=ae,n[ee.brain_coral_wall_fan]=ae,n[ee.bubble_coral]=ae,n[ee.bubble_coral_fan]=ae,n[ee.bubble_coral_wall_fan]=ae,n[ee.fire_coral]=ae,n[ee.fire_coral_fan]=ae,n[ee.fire_coral_wall_fan]=ae,n[ee.horn_coral]=ae,n[ee.horn_coral_fan]=ae,n[ee.horn_coral_wall_fan]=ae,n[ee.bubble_column]=ae,n[ee.crimson_fungus]=ae,n[ee.warped_fungus]=ae,n[ee.crimson_roots]=ae,n[ee.warped_roots]=ae,n[ee.nether_sprouts]=ae,n[ee.weeping_vines]=ae,n[ee.weeping_vines_plant]=ae,n[ee.twisting_vines]=ae,n[ee.twisting_vines_plant]=ae,n[ee.fire]=ae,n[ee.soul_fire]=ae,n[ee.iron_bars]=ae,n})();var pt=(n=>(n[n.air=0]="air",n[n.stone=1]="stone",n[n.deepslate=2]="deepslate",n[n.dirt=3]="dirt",n[n.grass=4]="grass",n[n.sand=5]="sand",n[n.gravel=6]="gravel",n[n.water=7]="water",n[n.bedrock=8]="bedrock",n[n.planks=9]="planks",n[n.cobblestone=10]="cobblestone",n[n.log=11]="log",n[n.leaves=12]="leaves",n[n.glowstone=13]="glowstone",n[n.obsidian=14]="obsidian",n[n.lava=15]="lava",n[n.sandstone=32]="sandstone",n[n.red_sand=33]="red_sand",n[n.red_sandstone=34]="red_sandstone",n[n.snow_block=35]="snow_block",n[n.powder_snow=36]="powder_snow",n[n.ice=37]="ice",n[n.packed_ice=38]="packed_ice",n[n.mud=39]="mud",n[n.mycelium=40]="mycelium",n[n.podzol=41]="podzol",n[n.coarse_dirt=42]="coarse_dirt",n[n.calcite=43]="calcite",n[n.terracotta=44]="terracotta",n[n.white_terracotta=45]="white_terracotta",n[n.orange_terracotta=46]="orange_terracotta",n[n.yellow_terracotta=47]="yellow_terracotta",n[n.brown_terracotta=48]="brown_terracotta",n[n.red_terracotta=49]="red_terracotta",n[n.light_gray_terracotta=50]="light_gray_terracotta",n[n.granite=51]="granite",n[n.diorite=52]="diorite",n[n.andesite=53]="andesite",n[n.tuff=54]="tuff",n[n.clay=55]="clay",n[n.infested_stone=56]="infested_stone",n[n.infested_deepslate=57]="infested_deepslate",n[n.coal_ore=58]="coal_ore",n[n.deepslate_coal_ore=59]="deepslate_coal_ore",n[n.iron_ore=60]="iron_ore",n[n.deepslate_iron_ore=61]="deepslate_iron_ore",n[n.copper_ore=62]="copper_ore",n[n.deepslate_copper_ore=63]="deepslate_copper_ore",n[n.gold_ore=64]="gold_ore",n[n.deepslate_gold_ore=65]="deepslate_gold_ore",n[n.redstone_ore=66]="redstone_ore",n[n.deepslate_redstone_ore=67]="deepslate_redstone_ore",n[n.emerald_ore=68]="emerald_ore",n[n.deepslate_emerald_ore=69]="deepslate_emerald_ore",n[n.lapis_ore=70]="lapis_ore",n[n.deepslate_lapis_ore=71]="deepslate_lapis_ore",n[n.diamond_ore=72]="diamond_ore",n[n.deepslate_diamond_ore=73]="deepslate_diamond_ore",n[n.raw_iron_block=74]="raw_iron_block",n[n.raw_copper_block=75]="raw_copper_block",n[n.spruce_log=76]="spruce_log",n[n.birch_log=77]="birch_log",n[n.jungle_log=78]="jungle_log",n[n.acacia_log=79]="acacia_log",n[n.dark_oak_log=80]="dark_oak_log",n[n.mangrove_log=81]="mangrove_log",n[n.cherry_log=82]="cherry_log",n[n.pale_oak_log=83]="pale_oak_log",n[n.spruce_leaves=84]="spruce_leaves",n[n.birch_leaves=85]="birch_leaves",n[n.jungle_leaves=86]="jungle_leaves",n[n.acacia_leaves=87]="acacia_leaves",n[n.dark_oak_leaves=88]="dark_oak_leaves",n[n.mangrove_leaves=89]="mangrove_leaves",n[n.cherry_leaves=90]="cherry_leaves",n[n.pale_oak_leaves=91]="pale_oak_leaves",n[n.azalea_leaves=92]="azalea_leaves",n[n.flowering_azalea_leaves=93]="flowering_azalea_leaves",n[n.mushroom_stem=94]="mushroom_stem",n[n.red_mushroom_block=95]="red_mushroom_block",n[n.brown_mushroom_block=96]="brown_mushroom_block",n[n.mangrove_roots=97]="mangrove_roots",n[n.muddy_mangrove_roots=98]="muddy_mangrove_roots",n[n.rooted_dirt=99]="rooted_dirt",n[n.bee_nest=100]="bee_nest",n[n.creaking_heart=101]="creaking_heart",n[n.snow=102]="snow",n[n.moss_carpet=103]="moss_carpet",n[n.pale_moss_carpet=104]="pale_moss_carpet",n[n.vine=105]="vine",n[n.cocoa=106]="cocoa",n[n.pale_hanging_moss=107]="pale_hanging_moss",n[n.mangrove_propagule=108]="mangrove_propagule",n[n.short_grass=109]="short_grass",n[n.fern=110]="fern",n[n.tall_grass=111]="tall_grass",n[n.large_fern=112]="large_fern",n[n.dead_bush=113]="dead_bush",n[n.dandelion=114]="dandelion",n[n.poppy=115]="poppy",n[n.blue_orchid=116]="blue_orchid",n[n.allium=117]="allium",n[n.azure_bluet=118]="azure_bluet",n[n.red_tulip=119]="red_tulip",n[n.orange_tulip=120]="orange_tulip",n[n.white_tulip=121]="white_tulip",n[n.pink_tulip=122]="pink_tulip",n[n.oxeye_daisy=123]="oxeye_daisy",n[n.cornflower=124]="cornflower",n[n.lily_of_the_valley=125]="lily_of_the_valley",n[n.closed_eyeblossom=126]="closed_eyeblossom",n[n.open_eyeblossom=127]="open_eyeblossom",n[n.sunflower=128]="sunflower",n[n.lilac=129]="lilac",n[n.rose_bush=130]="rose_bush",n[n.peony=131]="peony",n[n.brown_mushroom=132]="brown_mushroom",n[n.red_mushroom=133]="red_mushroom",n[n.sweet_berry_bush=134]="sweet_berry_bush",n[n.sugar_cane=135]="sugar_cane",n[n.bamboo=136]="bamboo",n[n.azalea=137]="azalea",n[n.flowering_azalea=138]="flowering_azalea",n[n.pink_petals=139]="pink_petals",n[n.lily_pad=140]="lily_pad",n[n.pumpkin=141]="pumpkin",n[n.melon=142]="melon",n[n.cactus=143]="cactus",n[n.seagrass=144]="seagrass",n[n.tall_seagrass=145]="tall_seagrass",n[n.kelp=146]="kelp",n[n.kelp_plant=147]="kelp_plant",n[n.sea_pickle=148]="sea_pickle",n[n.glow_lichen=149]="glow_lichen",n[n.hanging_roots=150]="hanging_roots",n[n.spore_blossom=151]="spore_blossom",n[n.cave_vines=152]="cave_vines",n[n.cave_vines_plant=153]="cave_vines_plant",n[n.small_dripleaf=154]="small_dripleaf",n[n.big_dripleaf=155]="big_dripleaf",n[n.big_dripleaf_stem=156]="big_dripleaf_stem",n[n.moss_block=157]="moss_block",n[n.pale_moss_block=158]="pale_moss_block",n[n.dripstone_block=159]="dripstone_block",n[n.pointed_dripstone=160]="pointed_dripstone",n[n.smooth_basalt=161]="smooth_basalt",n[n.amethyst_block=162]="amethyst_block",n[n.budding_amethyst=163]="budding_amethyst",n[n.small_amethyst_bud=164]="small_amethyst_bud",n[n.medium_amethyst_bud=165]="medium_amethyst_bud",n[n.large_amethyst_bud=166]="large_amethyst_bud",n[n.amethyst_cluster=167]="amethyst_cluster",n[n.sculk=168]="sculk",n[n.sculk_vein=169]="sculk_vein",n[n.sculk_sensor=170]="sculk_sensor",n[n.sculk_shrieker=171]="sculk_shrieker",n[n.sculk_catalyst=172]="sculk_catalyst",n[n.blue_ice=173]="blue_ice",n[n.mossy_cobblestone=174]="mossy_cobblestone",n[n.magma_block=175]="magma_block",n[n.spawner=176]="spawner",n[n.chest=177]="chest",n[n.bone_block=178]="bone_block",n[n.suspicious_sand=179]="suspicious_sand",n[n.suspicious_gravel=180]="suspicious_gravel",n[n.sandstone_slab=181]="sandstone_slab",n[n.tube_coral_block=182]="tube_coral_block",n[n.tube_coral=183]="tube_coral",n[n.tube_coral_fan=184]="tube_coral_fan",n[n.tube_coral_wall_fan=185]="tube_coral_wall_fan",n[n.brain_coral_block=186]="brain_coral_block",n[n.brain_coral=187]="brain_coral",n[n.brain_coral_fan=188]="brain_coral_fan",n[n.brain_coral_wall_fan=189]="brain_coral_wall_fan",n[n.bubble_coral_block=190]="bubble_coral_block",n[n.bubble_coral=191]="bubble_coral",n[n.bubble_coral_fan=192]="bubble_coral_fan",n[n.bubble_coral_wall_fan=193]="bubble_coral_wall_fan",n[n.fire_coral_block=194]="fire_coral_block",n[n.fire_coral=195]="fire_coral",n[n.fire_coral_fan=196]="fire_coral_fan",n[n.fire_coral_wall_fan=197]="fire_coral_wall_fan",n[n.horn_coral_block=198]="horn_coral_block",n[n.horn_coral=199]="horn_coral",n[n.horn_coral_fan=200]="horn_coral_fan",n[n.horn_coral_wall_fan=201]="horn_coral_wall_fan",n[n.netherrack=202]="netherrack",n[n.soul_sand=203]="soul_sand",n[n.soul_soil=204]="soul_soil",n[n.basalt=205]="basalt",n[n.blackstone=206]="blackstone",n[n.nether_gold_ore=207]="nether_gold_ore",n[n.nether_quartz_ore=208]="nether_quartz_ore",n[n.ancient_debris=209]="ancient_debris",n[n.crimson_nylium=210]="crimson_nylium",n[n.warped_nylium=211]="warped_nylium",n[n.crimson_stem=212]="crimson_stem",n[n.warped_stem=213]="warped_stem",n[n.nether_wart_block=214]="nether_wart_block",n[n.warped_wart_block=215]="warped_wart_block",n[n.shroomlight=216]="shroomlight",n[n.crimson_fungus=217]="crimson_fungus",n[n.warped_fungus=218]="warped_fungus",n[n.crimson_roots=219]="crimson_roots",n[n.warped_roots=220]="warped_roots",n[n.nether_sprouts=221]="nether_sprouts",n[n.weeping_vines=222]="weeping_vines",n[n.weeping_vines_plant=223]="weeping_vines_plant",n[n.twisting_vines=224]="twisting_vines",n[n.twisting_vines_plant=225]="twisting_vines_plant",n[n.fire=226]="fire",n[n.soul_fire=227]="soul_fire",n[n.end_stone=228]="end_stone",n[n.chorus_plant=229]="chorus_plant",n[n.chorus_flower=230]="chorus_flower",n[n.end_gateway=231]="end_gateway",n[n.iron_bars=232]="iron_bars",n[n.bubble_column=233]="bubble_column",n))(pt||{}),nt=(n=>(n[n.none=0]="none",n[n.water=1]="water",n[n.lava=2]="lava",n))(nt||{});const ii={1:16,2:24};function Ar(n,e,t=!1){return t?ii[n]+7:e>=8?n===1?7:15:ii[n]+e-1}const xv={kind:0,amount:0,source:!1,falling:!1},tr=Array.from({length:256},()=>xv),Su={kind:1,amount:8,source:!0,falling:!1};for(const n of[1,2]){tr[n===1?7:15]={kind:n,amount:8,source:!0,falling:!1};for(let e=1;e<=7;e++)tr[ii[n]+e-1]={kind:n,amount:e,source:!1,falling:!1};tr[ii[n]+7]={kind:n,amount:8,source:!1,falling:!0}}const Eu=[...K0].map(n=>pt[n.slice(10)]);for(const n of Eu)tr[n]=Su;const W=(n,e,t=e,i=e,r={})=>({name:n,textures:{top:e,side:t,bottom:i},solid:!0,breakable:!0,shape:"cube",height:16,...r}),Kn=(n,e,t)=>W(n,e,e,e,{solid:!1,shape:"slab",height:t}),oe=(n,e)=>W(n,e,e,e,{solid:!1,shape:"cross"}),hr=(n,e)=>W(n,e,e,e,{solid:!1,breakable:!1}),St=[W("空气","stone","stone","stone",{solid:!1,breakable:!1}),W("石头","stone"),W("深板岩","deepslate_top","deepslate"),W("泥土","dirt"),W("草方块","grass_top","grass_side","dirt"),W("沙子","sand"),W("沙砾","gravel"),hr("水","water"),W("基岩","bedrock","bedrock","bedrock",{breakable:!1}),W("木板","planks"),W("圆石","cobblestone"),W("原木","log_top","log"),W("树叶","leaves"),W("萤石","glowstone"),W("黑曜石","obsidian"),hr("岩浆","lava")];for(let n=1;n<=7;n++)St[ii[1]+n-1]=hr(`水（流动 ${n}）`,"water");St[ii[1]+7]=hr("水（下落）","water");for(let n=1;n<=7;n++)St[ii[2]+n-1]=hr(`岩浆（流动 ${n}）`,"lava");St[ii[2]+7]=hr("岩浆（下落）","lava");St.push(W("砂岩","sandstone_top","sandstone"),W("红沙","red_sand"),W("红砂岩","red_sandstone_top","red_sandstone"),W("雪块","snow"),W("细雪","powder_snow"),W("冰","ice"),W("浮冰","packed_ice"),W("泥巴","mud"),W("菌丝体","mycelium_top","mycelium_side","dirt"),W("灰化土","podzol_top","podzol_side","dirt"),W("砂土","coarse_dirt"),W("方解石","calcite"),W("陶瓦","terracotta"),W("白色陶瓦","white_terracotta"),W("橙色陶瓦","orange_terracotta"),W("黄色陶瓦","yellow_terracotta"),W("棕色陶瓦","brown_terracotta"),W("红色陶瓦","red_terracotta"),W("淡灰色陶瓦","light_gray_terracotta"));St.push(W("花岗岩","granite"),W("闪长岩","diorite"),W("安山岩","andesite"),W("凝灰岩","tuff"),W("黏土","clay"),W("被虫蚀的石头","stone"),W("被虫蚀的深板岩","deepslate_top","deepslate"),W("煤矿石","coal_ore"),W("深层煤矿石","deepslate_coal_ore"),W("铁矿石","iron_ore"),W("深层铁矿石","deepslate_iron_ore"),W("铜矿石","copper_ore"),W("深层铜矿石","deepslate_copper_ore"),W("金矿石","gold_ore"),W("深层金矿石","deepslate_gold_ore"),W("红石矿石","redstone_ore"),W("深层红石矿石","deepslate_redstone_ore"),W("绿宝石矿石","emerald_ore"),W("深层绿宝石矿石","deepslate_emerald_ore"),W("青金石矿石","lapis_ore"),W("深层青金石矿石","deepslate_lapis_ore"),W("钻石矿石","diamond_ore"),W("深层钻石矿石","deepslate_diamond_ore"),W("粗铁块","raw_iron_block"),W("粗铜块","raw_copper_block"),W("云杉原木","spruce_log_top","spruce_log"),W("白桦原木","birch_log_top","birch_log"),W("丛林原木","jungle_log_top","jungle_log"),W("金合欢原木","acacia_log_top","acacia_log"),W("深色橡木原木","dark_oak_log_top","dark_oak_log"),W("红树原木","mangrove_log_top","mangrove_log"),W("樱花原木","cherry_log_top","cherry_log"),W("苍白橡木原木","pale_oak_log_top","pale_oak_log"),W("云杉树叶","spruce_leaves"),W("白桦树叶","birch_leaves"),W("丛林树叶","jungle_leaves"),W("金合欢树叶","acacia_leaves"),W("深色橡木树叶","dark_oak_leaves"),W("红树树叶","mangrove_leaves"),W("樱花树叶","cherry_leaves"),W("苍白橡树树叶","pale_oak_leaves"),W("杜鹃树叶","azalea_leaves"),W("盛开的杜鹃树叶","flowering_azalea_leaves"),W("蘑菇柄","mushroom_stem"),W("红色蘑菇方块","red_mushroom_block"),W("棕色蘑菇方块","brown_mushroom_block"),W("红树根","mangrove_roots"),W("沾泥的红树根","muddy_mangrove_roots"),W("缠根泥土","rooted_dirt"),W("蜂巢","bee_nest_top","bee_nest"),W("嘎枝之心","pale_oak_log_top","creaking_heart"),Kn("雪","snow",2),Kn("苔藓地毯","moss_carpet",1),Kn("苍白苔藓地毯","pale_moss_carpet",1),oe("藤蔓","vine"),oe("可可果","cocoa"),oe("苍白垂须","pale_hanging_moss"),oe("红树胎生苗","mangrove_propagule"));St.push(oe("矮草丛","short_grass"),oe("蕨","fern"),oe("高草丛","tall_grass"),oe("大型蕨","large_fern"),oe("枯萎的灌木","dead_bush"),oe("蒲公英","dandelion"),oe("虞美人","poppy"),oe("兰花","blue_orchid"),oe("绒球葱","allium"),oe("蓝花美耳草","azure_bluet"),oe("红色郁金香","red_tulip"),oe("橙色郁金香","orange_tulip"),oe("白色郁金香","white_tulip"),oe("粉红色郁金香","pink_tulip"),oe("滨菊","oxeye_daisy"),oe("矢车菊","cornflower"),oe("铃兰","lily_of_the_valley"),oe("闭合的眼眸花","closed_eyeblossom"),oe("张开的眼眸花","open_eyeblossom"),oe("向日葵","sunflower"),oe("丁香","lilac"),oe("玫瑰丛","rose_bush"),oe("牡丹","peony"),oe("棕色蘑菇","brown_mushroom"),oe("红色蘑菇","red_mushroom"),oe("甜浆果丛","sweet_berry_bush"),oe("甘蔗","sugar_cane"),oe("竹子","bamboo"),oe("杜鹃花丛","azalea"),oe("盛开的杜鹃花丛","flowering_azalea"),Kn("粉红色花簇","pink_petals",1),Kn("睡莲","lily_pad",1),W("南瓜","pumpkin_top","pumpkin"),W("西瓜","melon_top","melon"),W("仙人掌","cactus_top","cactus"),oe("海草","seagrass"),oe("高海草","tall_seagrass"),oe("海带","kelp"),oe("海带茎","kelp_plant"),oe("海泡菜","sea_pickle"),oe("发光地衣","glow_lichen"),oe("垂根","hanging_roots"),oe("孢子花","spore_blossom"),oe("洞穴藤蔓","cave_vines"),oe("洞穴藤蔓（茎）","cave_vines_plant"),oe("小型垂滴叶","small_dripleaf"),oe("大型垂滴叶","big_dripleaf"),oe("大型垂滴叶茎","big_dripleaf_stem"),W("苔藓块","moss_block"),W("苍白苔藓块","pale_moss_block"),W("滴水石块","dripstone_block"),oe("滴水石锥","pointed_dripstone"),W("平滑玄武岩","smooth_basalt"),W("紫水晶块","amethyst_block"),W("紫水晶母岩","budding_amethyst"),oe("小型紫晶芽","small_amethyst_bud"),oe("中型紫晶芽","medium_amethyst_bud"),oe("大型紫晶芽","large_amethyst_bud"),oe("紫水晶簇","amethyst_cluster"),W("幽匿块","sculk"),oe("幽匿脉络","sculk_vein"),Kn("幽匿感测体","sculk_sensor",8),Kn("幽匿尖啸体","sculk_shrieker",8),W("幽匿催发体","sculk_catalyst"),W("蓝冰","blue_ice"),W("苔石","mossy_cobblestone"),W("岩浆块","magma_block"),W("刷怪笼","spawner"),W("箱子","chest"),W("骨块","bone_block_top","bone_block"),W("可疑的沙子","suspicious_sand"),W("可疑的沙砾","suspicious_gravel"),Kn("砂岩台阶","sandstone_slab",8),W("管珊瑚块","tube_coral_block"),oe("管珊瑚","tube_coral"),oe("管珊瑚扇","tube_coral_fan"),oe("管珊瑚壁扇","tube_coral_wall_fan"),W("脑纹珊瑚块","brain_coral_block"),oe("脑纹珊瑚","brain_coral"),oe("脑纹珊瑚扇","brain_coral_fan"),oe("脑纹珊瑚壁扇","brain_coral_wall_fan"),W("气泡珊瑚块","bubble_coral_block"),oe("气泡珊瑚","bubble_coral"),oe("气泡珊瑚扇","bubble_coral_fan"),oe("气泡珊瑚壁扇","bubble_coral_wall_fan"),W("火珊瑚块","fire_coral_block"),oe("火珊瑚","fire_coral"),oe("火珊瑚扇","fire_coral_fan"),oe("火珊瑚壁扇","fire_coral_wall_fan"),W("鹿角珊瑚块","horn_coral_block"),oe("鹿角珊瑚","horn_coral"),oe("鹿角珊瑚扇","horn_coral_fan"),oe("鹿角珊瑚壁扇","horn_coral_wall_fan"));St.push(W("下界岩","netherrack"),W("灵魂沙","soul_sand"),W("灵魂土","soul_soil"),W("玄武岩","basalt_top","basalt"),W("黑石","blackstone"),W("下界金矿石","nether_gold_ore"),W("下界石英矿石","nether_quartz_ore"),W("远古残骸","ancient_debris_top","ancient_debris"),W("绯红菌岩","crimson_nylium_top","crimson_nylium"),W("诡异菌岩","warped_nylium_top","warped_nylium"),W("绯红菌柄","crimson_stem_top","crimson_stem"),W("诡异菌柄","warped_stem_top","warped_stem"),W("下界疣块","nether_wart_block"),W("诡异疣块","warped_wart_block"),W("菌光体","shroomlight"),oe("绯红菌","crimson_fungus"),oe("诡异菌","warped_fungus"),oe("绯红菌索","crimson_roots"),oe("诡异菌索","warped_roots"),oe("下界苗","nether_sprouts"),oe("垂泪藤","weeping_vines"),oe("垂泪藤（茎）","weeping_vines_plant"),oe("缠怨藤","twisting_vines"),oe("缠怨藤（茎）","twisting_vines_plant"),oe("火","fire"),oe("灵魂火","soul_fire"),W("末地石","end_stone"),W("紫颂植物","chorus_plant"),W("紫颂花","chorus_flower"),W("末地折跃门","end_gateway"),oe("铁栏杆","iron_bars"),W("气泡柱","bubble_column","bubble_column","bubble_column",{solid:!1,shape:"none",breakable:!1}));const wu={"minecraft:air":0,"minecraft:stone":1,"minecraft:deepslate":2,"minecraft:dirt":3,"minecraft:grass_block":4,"minecraft:sand":5,"minecraft:gravel":6,"minecraft:water":7,"minecraft:lava":15,"minecraft:bedrock":8,"minecraft:obsidian":14,"minecraft:sandstone":32,"minecraft:red_sand":33,"minecraft:red_sandstone":34,"minecraft:snow_block":35,"minecraft:powder_snow":36,"minecraft:ice":37,"minecraft:packed_ice":38,"minecraft:mud":39,"minecraft:mycelium":40,"minecraft:podzol":41,"minecraft:coarse_dirt":42,"minecraft:calcite":43,"minecraft:terracotta":44,"minecraft:white_terracotta":45,"minecraft:orange_terracotta":46,"minecraft:yellow_terracotta":47,"minecraft:brown_terracotta":48,"minecraft:red_terracotta":49,"minecraft:light_gray_terracotta":50,"minecraft:oak_log":11,"minecraft:cobblestone":10,"minecraft:oak_planks":9,"minecraft:glowstone":13,"minecraft:cave_air":0,"minecraft:void_air":0,"minecraft:oak_leaves":12};for(const n of Object.keys(pt)){const e=pt[n];typeof e=="number"&&e>=51&&(wu[`minecraft:${n}`]=e)}const wi=[];for(const[n,e]of Object.entries(wu))wi[e]??=n;for(let n=16;n<=23;n++)wi[n]="minecraft:water";for(let n=24;n<=31;n++)wi[n]="minecraft:lava";const Mv=St.length;function bv(n){const e=tr[n];return n>=16&&n<=31||n===7||n===15?{level:String(e.source?0:e.falling?8:8-e.amount)}:Eu.includes(n)?{waterlogged:"true"}:{}}const En=Q0(Array.from({length:Mv},(n,e)=>wi[e]),bv),Zt=En.count,Qn=En.blockOf,fc=Math.ceil(Math.log2(Zt)),Sv=(n,e)=>e?tg(En,n,e):n,Ev=(n,e)=>kr(En,n,e),yu=n=>ig(En,n),wv=Array.from({length:Zt},(n,e)=>wi[Qn[e]]),yv=Uint8Array.from({length:Zt},(n,e)=>["west","east","down","up","north","south"].reduce((t,i,r)=>kr(En,e,i)==="true"?t|1<<r:t,0));function Po(n){return Uint8Array.from({length:Zt},(e,t)=>n[Qn[t]])}const tn=Array.from({length:Zt},(n,e)=>kr(En,e,"waterlogged")==="true"?Su:tr[Qn[e]]),Fn=Uint8Array.from(tn,n=>n.kind),dc=n=>Fn[n]!==0,Ts=(()=>{const n=new Uint8Array(Zt*6),e=["west","east","down","up","north","south"];for(let t=0;t<Zt;t++){const{top:i,side:r,bottom:s}=St[Qn[t]].textures;let a=[r,r,s,i,r,r];const o=c=>kr(En,t,c),l=o("axis");l==="x"?a=[i,i,r,r,r,r]:l==="z"&&(a=[r,r,r,r,i,i]),o("snowy")==="true"&&(a=[a[0],a[1],a[2],a[3],a[4],a[5]].map((c,u)=>u===2||u===3?c:"grass_snow_side")),/_mushroom_block$|mushroom_stem$/.test(wi[Qn[t]]??"")&&(a=a.map((c,u)=>o(e[u])==="false"?"mushroom_block_inside":c)),o("berries")==="true"&&(a=a.map(c=>c==="cave_vines"?"cave_vines_lit":c==="cave_vines_plant"?"cave_vines_plant_lit":c)),o("half")==="lower"&&/sunflower|lilac|rose_bush|peony/.test(wi[Qn[t]]??"")&&(a=a.map(()=>"tall_flower_bottom")),n.set(a.map(c=>ee[c]),t*6)}return n})(),fo=[4,3,1,10,9,11,13,7,15],Ft=Po(Uint8Array.from({length:256},(n,e)=>St[e]?.solid?1:0)),$i=n=>Ft[n]===1;for(const n of[105,149,169])St[n].shape="multiface";const Av=Po(Uint8Array.from({length:256},(n,e)=>{const t=St[e]?.shape;return t==="slab"?1:t==="cross"?2:t==="multiface"?3:t==="none"?4:0})),Tv=Uint8Array.from(Po(Uint8Array.from({length:256},(n,e)=>St[e]?.height??16)),(n,e)=>{const t=kr(En,e,"layers");return t?Number(t)*2:n});class fn{constructor(e,t,i,r,s,a){this.minX=e,this.minY=t,this.minZ=i,this.maxX=r,this.maxY=s,this.maxZ=a}static body(e,t,i){const r=t/2;return new fn(e.x-r,e.y,e.z-r,e.x+r,e.y+i,e.z+r)}move(e,t,i){return new fn(this.minX+e,this.minY+t,this.minZ+i,this.maxX+e,this.maxY+t,this.maxZ+i)}expandTowards(e,t,i){return new fn(e<0?this.minX+e:this.minX,t<0?this.minY+t:this.minY,i<0?this.minZ+i:this.minZ,e>0?this.maxX+e:this.maxX,t>0?this.maxY+t:this.maxY,i>0?this.maxZ+i:this.maxZ)}deflate(e){return new fn(this.minX+e,this.minY+e,this.minZ+e,this.maxX-e,this.maxY-e,this.maxZ-e)}intersects(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY&&this.minZ<e.maxZ&&this.maxZ>e.minZ}min(e){return e===0?this.minX:e===1?this.minY:this.minZ}max(e){return e===0?this.maxX:e===1?this.maxY:this.maxZ}}const _t=1e-7,pc=[new fn(0,0,0,1,1,1)],_c=[];function po(n,e){const t=[],i=Math.floor(n.minX-_t),r=Math.floor(n.maxX+_t),s=Math.floor(n.minY-_t)-1,a=Math.floor(n.maxY+_t),o=Math.floor(n.minZ-_t),l=Math.floor(n.maxZ+_t);for(let c=i;c<=r;c++)for(let u=s;u<=a;u++)for(let h=o;h<=l;h++)for(const f of e(c,u,h)){const p=f.move(c,u,h);p.intersects(n)&&t.push(p)}return t}function fs(n,e,t,i){if(Math.abs(i)<_t)return 0;const r=(n+1)%3,s=(n+2)%3;for(const a of t)a.max(r)-_t<=e.min(r)||a.min(r)+_t>=e.max(r)||a.max(s)-_t<=e.min(s)||a.min(s)+_t>=e.max(s)||(i>0&&a.min(n)>=e.max(n)-_t?i=Math.min(i,a.min(n)-e.max(n)):i<0&&a.max(n)<=e.min(n)+_t&&(i=Math.max(i,a.max(n)-e.min(n))));return Math.abs(i)<_t?0:i}function mc(n,e,t){let{x:i,y:r,z:s}=n;r!==0&&(r=fs(1,e,t,r),r!==0&&(e=e.move(0,r,0)));const a=Math.abs(i)<Math.abs(s);return a&&s!==0&&(s=fs(2,e,t,s),s!==0&&(e=e.move(0,0,s))),i!==0&&(i=fs(0,e,t,i),!a&&i!==0&&(e=e.move(i,0,0))),!a&&s!==0&&(s=fs(2,e,t,s)),{x:i,y:r,z:s}}function Rv(n,e,t,i,r){const s=po(n.expandTowards(e.x,e.y,e.z),t),a=mc(e,n,s),o=e.x!==a.x,l=e.z!==a.z,c=e.y!==a.y&&e.y<0;if(!(c||r)||!(o||l))return a;const u=c?n.move(0,a.y,0):n;let h=u.expandTowards(e.x,i,e.z);c||(h=h.expandTowards(0,-1e-5,0));const f=po(h,t),p=[];for(const g of f){const _=g.maxY-u.minY;_>a.y+_t&&_<=i+_t&&!p.includes(_)&&p.push(_)}p.sort((g,_)=>g-_);const m=a.x*a.x+a.z*a.z;for(const g of p){const _=mc({x:e.x,y:g,z:e.z},u,f);if(_.x*_.x+_.z*_.z>m+_t)return{x:_.x,y:_.y+(u.minY-n.minY),z:_.z}}return a}function Lo(n,e){return po(n,e).length===0}function Cv(n,e,t,i){if(e.y>0)return e;const r=(u,h)=>Lo(new fn(n.minX+_t+u,n.minY-i-_t,n.minZ+_t+h,n.maxX-_t+u,n.minY,n.maxZ-_t+h),t),s=.05;let{x:a,z:o}=e;const l=Math.sign(a)*s,c=Math.sign(o)*s;for(;a!==0&&r(a,0);){if(Math.abs(a)<=s){a=0;break}a-=l}for(;o!==0&&r(0,o);){if(Math.abs(o)<=s){o=0;break}o-=c}for(;a!==0&&o!==0&&r(a,o);)a=Math.abs(a)<=s?0:a-l,o=Math.abs(o)<=s?0:o-c;return{x:a,y:e.y,z:o}}function Au(n,e,t,i){return!Lo(fn.body(n,e,t).deflate(_t),i)}const fi=Math.fround;function Pv(n,e,t){if(n.prevPos={...n.pos},n.prevWalkDist=n.walkDist,n.prevBob=n.bob,Uv(n,t),e.sneak&&!n.flying)n.pose="crouching";else if(n.pose==="crouching"){const c=hu.standing;Au(n.pos,c.width,c.height,t.shape)||(n.pose="standing")}let r=e.forward,s=e.left;n.pose==="crouching"&&(r*=Oe.SNEAK_MULTIPLIER,s*=Oe.SNEAK_MULTIPLIER);const a=n.inWater&&!n.underWater;!n.sprinting&&e.sprint&&r>=.8&&!a&&!n.inWater&&(n.sprinting=!0),n.sprinting&&(r<=1e-5||n.horizontalCollision||a||n.pose==="crouching")&&(n.sprinting=!1);const o=n.velocity;if(n.flying){const c=(e.jump?1:0)-(e.sneak?1:0);c!==0&&(o.y+=c*Oe.FLY_SPEED*3)}if(n.noJumpDelay>0&&n.noJumpDelay--,Math.abs(o.x)<Oe.MIN_VELOCITY&&(o.x=0),Math.abs(o.y)<Oe.MIN_VELOCITY&&(o.y=0),Math.abs(o.z)<Oe.MIN_VELOCITY&&(o.z=0),e.jump&&!n.flying){const c=n.inLava?n.lavaHeight:n.waterHeight,u=n.inWater&&c>0,h=Oe.WATER_JUMP_THRESHOLD;(!u||n.onGround&&c<=h)&&(!n.inLava||n.onGround&&c<=h)?(n.onGround||u&&c<=h)&&n.noJumpDelay===0&&(Lv(n,e.yaw),n.noJumpDelay=Oe.JUMP_DELAY):o.y+=Oe.WATER_JUMP}else n.noJumpDelay=0;Dv(n,s*.98,r*.98,e,t),n.onGround&&n.flying&&(n.flying=!1);const l=n.onGround&&!n.flying?Math.min(.1,Math.hypot(o.x,o.z)):0;n.bob+=(l-n.bob)*.4}function gc(n,e,t){if(!n.horizontalCollision)return;const i=n.velocity,r=n.body,s=fn.body(n.pos,r.width,r.height).move(i.x,i.y+.6-n.pos.y+e,i.z);Lo(s,t.shape)&&(i.y=.3)}function Lv(n,e){n.velocity.y=Oe.JUMP_POWER,n.sprinting&&(n.velocity.x+=-Math.sin(e)*Oe.SPRINT_JUMP_BOOST,n.velocity.z+=-Math.cos(e)*Oe.SPRINT_JUMP_BOOST)}function va(n,e,t,i,r){const s=t*t+i*i;if(s<1e-7)return;const a=(s>1?1/Math.sqrt(s):1)*e,o=t*a,l=i*a,c=Math.sin(r),u=Math.cos(r);n.velocity.x+=-c*l-u*o,n.velocity.z+=-u*l+c*o}function Dv(n,e,t,i,r){const s=n.velocity;if(n.inWater&&!n.flying){const u=n.pos.y,h=n.sprinting?Oe.WATER_SPRINT_DRAG:Oe.WATER_DRAG;va(n,Oe.WATER_SPEED,e,t,i.yaw),xa(n,i,r),s.x*=h,s.y*=.8,s.z*=h,s.y-=Oe.GRAVITY/16,gc(n,u,r);return}if(n.inLava&&!n.flying){const u=n.pos.y;va(n,Oe.WATER_SPEED,e,t,i.yaw),xa(n,i,r),n.lavaHeight<=Oe.WATER_JUMP_THRESHOLD?(s.x*=.5,s.y*=.8,s.z*=.5,s.y-=Oe.GRAVITY/16):(s.x*=.5,s.y*=.5,s.z*=.5),s.y-=Oe.GRAVITY/4,gc(n,u,r);return}const a=s.y,o=fi(Oe.BLOCK_FRICTION),l=n.onGround?fi(o*fi(Oe.AIR_FRICTION)):fi(Oe.AIR_FRICTION),c=n.onGround?fi(n.speedAttribute*fi(.21600002/(o*o*o))):n.flying?Oe.FLY_SPEED*(n.sprinting?2:1):n.sprinting?Oe.AIR_SPRINT_SPEED:Oe.AIR_SPEED;va(n,c,e,t,i.yaw),xa(n,i,r),s.x*=l,s.z*=l,s.y=(s.y-Oe.GRAVITY)*fi(Oe.VERTICAL_DRAG),n.flying&&(s.y=a*Oe.FLY_VERTICAL_DRAG)}function xa(n,e,t){const i=n.body,r=fn.body(n.pos,i.width,i.height);let s={...n.velocity};e.sneak&&!n.flying&&n.onGround&&(s=Cv(r,s,t.shape,Oe.STEP_HEIGHT));const a=Rv(r,s,t.shape,Oe.STEP_HEIGHT,n.onGround);n.pos.x+=a.x,n.pos.y+=a.y,n.pos.z+=a.z;const o=Math.abs(s.x-a.x)>1e-5,l=Math.abs(s.z-a.z)>1e-5,c=s.y!==a.y,u=Math.hypot(s.x,s.z),h=Math.hypot(a.x,a.z),f=u>1e-5&&h>1e-5&&Math.acos(Math.min(1,(s.x*a.x+s.z*a.z)/(u*h)))<.13962634;n.horizontalCollision=(o||l)&&!f,n.onGround=c&&s.y<0,o&&(n.velocity.x=0),l&&(n.velocity.z=0),c&&(n.velocity.y=0),n.walkDist+=Math.hypot(a.x,a.z)*.6}function Ma(n,e,t,i,r){const s=tn[n.block(e,t,i)];return s.kind!==r?0:tn[n.block(e,t+1,i)].kind===r?1:s.amount/9}function Iv(n,e,t,i,r){const s=tn[n.block(e,t,i)],a=s.amount/9;let o=0,l=0;for(const[h,f]of[[0,-1],[0,1],[-1,0],[1,0]]){const p=n.block(e+h,t,i+f),m=tn[p];if(m.kind!==nt.none&&m.kind!==r)continue;let g=m.kind===r?m.amount/9:0,_=0;if(g===0){if(!Ft[p]){const d=tn[n.block(e+h,t-1,i+f)];(d.kind===r||d.kind===nt.none)&&(g=d.kind===r?d.amount/9:0,g>0&&(_=a-(g-.8888889)))}}else g>0&&(_=a-g);o+=h*_,l+=f*_}let c=0;if(s.falling){for(const[h,f]of[[0,-1],[0,1],[-1,0],[1,0]])if(Ft[n.block(e+h,t,i+f)]||Ft[n.block(e+h,t+1,i+f)]){const p=Math.hypot(o,l);p>0&&(o/=p,l/=p),c=-6;break}}const u=Math.hypot(o,c,l);return u<1e-4?{x:0,y:0,z:0}:{x:o/u,y:c/u,z:l/u}}function Uv(n,e){const t=n.body,i=fn.body(n.pos,t.width,t.height).deflate(.001),r=!n.flying;for(const[c,u]of[[nt.water,.014],[nt.lava,.0023333333333333335]]){let h=0,f=0,p=0,m=0,g=0;for(let _=Math.floor(i.minX);_<Math.ceil(i.maxX);_++)for(let d=Math.floor(i.minY);d<Math.ceil(i.maxY);d++)for(let w=Math.floor(i.minZ);w<Math.ceil(i.maxZ);w++){const S=Ma(e,_,d,w,c);if(S===0)continue;const M=d+S;if(!(M<i.minY)&&(h=Math.max(h,M-i.minY),r)){const C=Iv(e,_,d,w,c),A=h<.4?h:1;f+=C.x*A,p+=C.y*A,m+=C.z*A,g++}}if(g>0&&Math.hypot(f,p,m)>0){f=f/g*u,p=p/g*u,m=m/g*u;const _=n.velocity,d=Math.hypot(f,p,m);Math.abs(_.x)<.003&&Math.abs(_.z)<.003&&d<.0045&&(f=f/d*.0045,p=p/d*.0045,m=m/d*.0045),_.x+=f,_.y+=p,_.z+=m}c===nt.water?n.waterHeight=h:n.lavaHeight=h}const s=n.pos.y+t.eye,a=Math.floor(n.pos.x),o=Math.floor(s),l=Math.floor(n.pos.z);n.underWater=s<o+Ma(e,a,o,l,nt.water),n.underLava=s<o+Ma(e,a,o,l,nt.lava)}function Nv(n,e,t,i,r,s,a,o){let l=Math.floor(n),c=Math.floor(e),u=Math.floor(t);const h=Math.sign(i),f=Math.sign(r),p=Math.sign(s),m=h!==0?Math.abs(1/i):1/0,g=f!==0?Math.abs(1/r):1/0,_=p!==0?Math.abs(1/s):1/0,d=(E,b)=>b>0?Math.floor(E)+1-E:E-Math.floor(E);let w=h!==0?d(n,h)*m:1/0,S=f!==0?d(e,f)*g:1/0,M=p!==0?d(t,p)*_:1/0,C=0,A=0,T=0,P=0;for(;P<=a;){if(o(l,c,u))return{x:l,y:c,z:u,nx:C,ny:A,nz:T,distance:P};w<S&&w<M?(l+=h,P=w,w+=m,C=-h,A=T=0):S<M?(c+=f,P=S,S+=g,A=-f,C=T=0):(u+=p,P=M,M+=_,T=-p,C=A=0)}return null}const Fv=70;class Ov{scene;camera;player;terrain;control;head=new Wt;spawned=!1;slot=0;target=null;reach=5;bobbing=!0;acc=0;get partialTick(){return this.acc/Oe.TICK}eye=1.62;prevEye=1.62;fovMod=1;prevFovMod=1;keys=new Set;lastTap={};sprintByDoubleTap=!1;world;get medium(){return this.player.underLava?"lava":this.player.underWater?"water":"air"}constructor(e,t,i,r){this.scene=e,this.camera=t,this.player=i,this.terrain=r,this.head.rotation.order="YXZ",this.control=new Vm(this.head,document.body),this.world={shape:(s,a,o)=>{const l=r.getBlock(s,a,o);return l===null||$i(l)?pc:_c},block:(s,a,o)=>r.getBlock(s,a,o)??pt.bedrock},this.initKeyboard(),this.initMouse()}get feet(){return this.player.pos}set feet(e){this.teleport(e.x,e.y,e.z)}teleport(e,t,i){this.player.pos={x:e,y:t,z:i},this.player.prevPos={x:e,y:t,z:i},this.player.velocity={x:0,y:0,z:0}}get yaw(){return new dn().setFromQuaternion(this.head.quaternion,"YXZ").y}initKeyboard=()=>{document.addEventListener("keydown",e=>{if(!this.control.isLocked||((e.code==="F3"||e.code==="Tab")&&e.preventDefault(),e.repeat))return;this.keys.add(e.code);const t=performance.now(),i=t-(this.lastTap[e.code]??0)<350;if(this.lastTap[e.code]=t,e.code==="KeyW"&&i&&(this.sprintByDoubleTap=!0),(e.code==="Space"&&i||e.code==="KeyF")&&this.toggleFly(),e.code.startsWith("Digit")){const r=Number(e.code.slice(5));r>=1&&r<=9&&(this.slot=r-1)}}),document.addEventListener("keyup",e=>{this.keys.delete(e.code),e.code==="KeyW"&&(this.sprintByDoubleTap=!1)}),window.addEventListener("blur",()=>this.keys.clear()),this.control.addEventListener("unlock",()=>this.keys.clear())};initMouse=()=>{document.addEventListener("mousedown",e=>{!this.control.isLocked||!this.target||(e.button===0&&this.breakBlock(),e.button===2&&this.placeBlock())}),document.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("wheel",e=>{this.control.isLocked&&(this.slot=(this.slot+(e.deltaY>0?1:-1)+9)%9)},{passive:!0})};toggleFly=()=>{this.player.flying=!this.player.flying,this.player.velocity.y=0};readInput(){const e=this.keys,t=(i,r)=>(e.has(i)?1:0)-(e.has(r)?1:0);return{forward:t("KeyW","KeyS"),left:t("KeyA","KeyD"),jump:e.has("Space"),sneak:e.has("ShiftLeft")||e.has("ShiftRight"),sprint:e.has("KeyR")||this.sprintByDoubleTap,yaw:this.yaw}}breakBlock=()=>{const e=this.target,t=this.terrain.getBlock(e.x,e.y,e.z);t===null||!St[Qn[t]].breakable||this.terrain.setBlock(e.x,e.y,e.z,pt.air)};placeBlock=()=>{const e=this.target,t=e.x+e.nx,i=e.y+e.ny,r=e.z+e.nz,s=this.terrain.getBlock(t,i,r);if(s===null||s!==pt.air&&!dc(s))return;const a=this.player.body;if(Au(this.player.pos,a.width,a.height,(c,u,h)=>c===t&&u===i&&h===r?pc:_c))return;const o=fo[this.slot],l=e.nx!==0?"x":e.ny!==0?"y":"z";this.terrain.setBlock(t,i,r,Ev(o,"axis")!==void 0?Sv(o,{axis:l}):o)};trySpawn=()=>{const e=this.terrain.info;if(!e)return!1;for(let t=0;t<=48;t+=4)for(let i=0;i<Math.max(1,t*2);i++){const r=i/Math.max(1,t*2)*Math.PI*2,s=Math.floor(Math.cos(r)*t),a=Math.floor(Math.sin(r)*t),o=/nether/.test(e.settings)?this.terrain.floorBelow(s,a,120):this.terrain.topSolidY(s,a);if(o===null){if(!this.terrain.getChunk(s,a))return!1;continue}if(o>=e.seaLevel||/end/.test(e.settings))return this.teleport(s+.5,o+1,a+.5),!0}return this.teleport(.5,e.seaLevel+10,.5),this.player.flying=!0,!0};update=e=>{if(!this.spawned){this.spawned=this.trySpawn(),this.render(1);return}for(this.acc=Math.min(this.acc+e,Oe.TICK*5);this.acc>=Oe.TICK;)this.acc-=Oe.TICK,this.tick();this.render(this.acc/Oe.TICK),this.updateTarget()};tick(){const e=this.player;Pv(e,this.readInput(),this.world),this.terrain.tick(),e.sprinting||(this.sprintByDoubleTap=!1),this.prevEye=this.eye,this.eye+=(e.body.eye-this.eye)*.5;let t=e.flying?1.1:1;t*=(e.speedAttribute/Oe.WALK_SPEED+1)/2,this.prevFovMod=this.fovMod,this.fovMod+=(t-this.fovMod)*.5}render(e){const t=this.player,i=(a,o)=>a+(o-a)*e,r=i(this.prevEye,this.eye);if(this.camera.position.set(i(t.prevPos.x,t.pos.x),i(t.prevPos.y,t.pos.y)+r,i(t.prevPos.z,t.pos.z)),this.camera.quaternion.copy(this.head.quaternion),this.bobbing){const a=t.walkDist-t.prevWalkDist,o=-(t.walkDist+a*e)*Math.PI,l=i(t.prevBob,t.bob),c=Math.PI/180;this.camera.rotateX(-Math.abs(Math.cos(o-.2)*l)*5*c),this.camera.rotateZ(-Math.sin(o)*l*3*c),this.camera.translateX(-Math.sin(o)*l*.5),this.camera.translateY(Math.abs(Math.cos(o)*l))}let s=Fv*i(this.prevFovMod,this.fovMod);t.underWater&&(s*=6/7),Math.abs(this.camera.fov-s)>.001&&(this.camera.fov=s,this.camera.updateProjectionMatrix())}updateTarget(){const e=this.player,t=new F(0,0,-1).applyQuaternion(this.head.quaternion),i=this.acc/Oe.TICK,r=e.prevPos.x+(e.pos.x-e.prevPos.x)*i,s=e.prevPos.y+(e.pos.y-e.prevPos.y)*i+this.prevEye+(this.eye-this.prevEye)*i,a=e.prevPos.z+(e.pos.z-e.prevPos.z)*i;this.target=Nv(r,s,a,t.x,t.y,t.z,this.reach,(o,l,c)=>{const u=this.terrain.getBlock(o,l,c);return u!==null&&u!==pt.air&&!dc(u)}),this.target?this.terrain.highlight.show(this.target.x,this.target.y,this.target.z):this.terrain.highlight.hide()}get facing(){const e=new F(0,0,-1).applyQuaternion(this.head.quaternion);return Math.abs(e.x)>Math.abs(e.z)?e.x>0?"east (+X)":"west (-X)":e.z>0?"south (+Z)":"north (-Z)"}}$e.enabled=!1;class Rs{camera=new $t;scene=new uu;renderer=new Fm({antialias:!1});static SKY=10274047;constructor(){this.initScene(),this.initRenderer(),this.initCamera()}initCamera=()=>{this.camera.fov=70,this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.near=.05,this.camera.far=1e3,this.camera.updateProjectionMatrix(),this.camera.position.set(0,120,0),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()})};initScene=()=>{this.scene.fog=new wo(Rs.SKY,40,80)};initRenderer=()=>{this.renderer.autoClear=!1,this.renderer.outputColorSpace=Ai,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight)})};viewBlocks=96;air={color:new je(Rs.SKY),near:57.6,far:96};medium="air";setFogDistance=e=>{this.viewBlocks=e,this.camera.far=e+64,this.camera.updateProjectionMatrix(),this.applyFog()};setAirFog=(e,t,i)=>{this.air.color.setRGB(...e),this.air.near=t,this.air.far=i,this.applyFog()};setMedium=e=>{e!==this.medium&&(this.medium=e,this.applyFog())};get fogColor(){return this.scene.fog.color}applyFog(){const e=this.scene.fog;this.medium==="water"?(e.color.setHex(2047887),e.near=2,e.far=Math.min(48,this.viewBlocks)):this.medium==="lava"?(e.color.setHex(10033664),e.near=.25,e.far=1.5):(e.color.copy(this.air.color),e.near=this.air.near,e.far=this.air.far)}}const kv=Math.fround,zr=Math.PI*2;function zv(n){return/nether/.test(n)?18e3:/end/.test(n)?6e3:null}function Hv(n){const e=jv(n/24e3-.25),t=.5-Math.cos(e*Math.PI)/2;return kv((e*2+t)/3)}const Tu=n=>n*zr,Gv=n=>(Math.floor(n/24e3)%8+8)%8;function Vv(n){let e=1-(Math.cos(n*zr)*2+.2);return e=Mi(e,0,1),e=1-e,e*.8+.2}function Ru(n){return Mi(Math.cos(n*zr)*2+.5,0,1)}function Bv(n){const e=Mi(1-(Math.cos(n*zr)*2+.25),0,1);return e*e*.5}function Cu(n){const e=Math.cos(n*zr);if(e<-.4||e>.4)return null;const t=e/.4*.5+.5;let i=1-(1-Math.sin(t*Math.PI))*.99;return i*=i,[t*.3+.7,t*t*.7+.2,.2,i]}const vc=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Wv=n=>/nether/.test(n)?"nether":/end/.test(n)?"end":"overworld";function Xv(n,e){const t=Ru(e);return[n[0]*t,n[1]*t,n[2]*t]}function Yv(n,e,t,i,r,s,a,o){const l=Ru(i);let c;if(n==="overworld"?c=[e[0]*(l*.94+.06),e[1]*(l*.94+.06),e[2]*(l*.91+.09)]:n==="end"?c=[e[0]*.15,e[1]*.15,e[2]*.15]:c=[...e],s>=4&&n==="overworld"){const h=Math.sin(Tu(i))>0?-1:1;let f=r[0]*h;f<0&&(f=0);const p=Cu(i);if(f>0&&p){f*=p[3];for(let m=0;m<3;m++)c[m]=c[m]*(1-f)+p[m]*f}}if(n!=="nether"){let h=.25+.75*s/32;h=1-Math.pow(h,.25);for(let f=0;f<3;f++)c[f]+=(t[f]-c[f])*h}let u=(a-o)*(n==="overworld"?.03125:1);if(u<1){u<0&&(u=0),u*=u;for(let h=0;h<3;h++)c[h]*=u}return c}function qv(n,e=new Uint8Array(256*3)){const t=Vv(n.t),i=t*.95+.05,r=[di(.35,t,1),di(.35,t,1),1],s=n.flicker+1.5,a=n.dim==="nether"?.1:0,o=n.dim==="end",l=c=>{const u=c/(4-3*c);return di(a,u,1)};for(let c=0;c<16;c++)for(let u=0;u<16;u++){const h=l(u/15)*s,f=l(c/15)*i;let p=[h,h*((h*.6+.4)*.6+.4),h*(h*h*.6+.4)];o?p=p.map((g,_)=>Mi(di(.25,g,[.99,1.12,1][_]),0,1)):(p=p.map((g,_)=>di(.04,g+r[_]*f,.75)),p=p.map(g=>Mi(g,0,1))),p=p.map(g=>di(n.gamma,g,1-Math.pow(1-g,4))),p=p.map(g=>Mi(di(.04,g,.75),0,1));const m=(c*16+u)*3;e[m]=Math.round(p[0]*255),e[m+1]=Math.round(p[1]*255),e[m+2]=Math.round(p[2]*255)}return e}function $v(n,e=Math.random){return n+=(e()-e())*e()*e()*.1,n*.9}function Zv(n){const e=[];for(let t=0;t<1500;t++){const i=n.nextFloat()*2-1,r=n.nextFloat()*2-1,s=n.nextFloat()*2-1,a=.15+n.nextFloat()*.1,o=i*i+r*r+s*s;if(o<=.010000001||o>=1)continue;const l=Math.sqrt(o),c=[i/l*100,r/l*100,s/l*100],u=n.nextDouble()*Math.PI*2,h=xc([-c[0],-c[1],-c[2]]),f=xc(Mc([0,1,0],h)),p=Mc(h,f),m=Math.cos(-u),g=Math.sin(-u);for(const[_,d]of[[a,-a],[a,a],[-a,a],[-a,-a]]){const w=_*m-d*g,S=_*g+d*m;e.push(c[0]+f[0]*w+p[0]*S,c[1]+f[1]*w+p[1]*S,c[2]+f[2]*w+p[2]*S)}}return Float32Array.from(e)}function Kv(n,e){if(n==="nether")return{start:e*.05,end:Math.min(e,192)*.5};const t=Mi(e/10,4,64);return{start:e-t,end:e}}const jv=n=>n-Math.floor(n),Mi=(n,e,t)=>n<e?e:n>t?t:n,di=(n,e,t)=>e+n*(t-e),xc=n=>{const e=Math.hypot(n[0],n[1],n[2]);return[n[0]/e,n[1]/e,n[2]/e]},Mc=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]];class Jv{scene=new uu;camera=new $t(70,1,.1,1e3);fog=[.75,.85,1];biomeSky=vc(7907327);biomeFog=vc(12638463);gamma=.5;dim="overworld";flicker=0;dome;sunrise;celestial=new Ki;sun;moon;stars;lm=new Uint8Array(256*3);constructor(){this.dome=new yt(new Ao(500,32,16),new Sn({side:kt,depthWrite:!1,depthTest:!1,uniforms:{skyColor:{value:new je},fogColor:{value:new je},renderDistance:{value:96},belowHorizon:{value:!1},end:{value:!1}},vertexShader:`
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
          }`})),this.dome.renderOrder=0,this.scene.add(this.dome);const e=new pn;e.setAttribute("position",new At(new Float32Array(54),3)),e.setAttribute("color",new At(new Float32Array(72),4));const t=[];for(let o=0;o<16;o++)t.push(0,o+1,o+2);e.setIndex(t),this.sunrise=new yt(e,new Ur({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:en})),this.sunrise.renderOrder=1,this.scene.add(this.sunrise);const i=o=>new Ur({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:en,blending:Dc,blendSrc:Es,blendDst:Ic});this.sun=new yt(new ur(60,60),i(Qv())),this.sun.position.set(0,100,0),this.sun.rotation.x=Math.PI/2,this.moon=new yt(new ur(40,40),i(e1())),this.moon.position.set(0,-100,0),this.moon.rotation.x=-Math.PI/2;const r=new pn,s=Zv(new er(10842n));r.setAttribute("position",new At(s,3));const a=[];for(let o=0;o<s.length/12;o++)a.push(o*4,o*4+1,o*4+2,o*4+2,o*4+3,o*4);r.setIndex(a),this.stars=new yt(r,i(null));for(const o of[this.sun,this.moon,this.stars])o.renderOrder=2,this.celestial.add(o);this.scene.add(this.celestial)}update(e,t,i,r){const s=Hv(e),a=i*16;this.flicker=$v(this.flicker),qv({dim:this.dim,t:s,flicker:this.flicker,gamma:this.gamma},this.lm);const o=new F;t.getWorldDirection(o);const l=this.dim==="overworld"?Xv(this.biomeSky,s):[0,0,0];this.fog=Yv(this.dim,this.biomeFog,l,s,[o.x,o.y,o.z],i,t.position.y,r);const c=this.dome.material.uniforms;c.skyColor.value.setRGB(...l),c.fogColor.value.setRGB(...this.fog),c.renderDistance.value=a,c.belowHorizon.value=t.position.y<63,c.end.value=this.dim==="end";const u=this.dim==="overworld";this.dome.visible=this.dim!=="nether";const h=u?Cu(s):null;if(this.sunrise.visible=h!==null,h){const w=this.sunrise.geometry.attributes.position,S=this.sunrise.geometry.attributes.color;w.setXYZ(0,0,100,0),S.setXYZW(0,h[0],h[1],h[2],h[3]);for(let C=0;C<=16;C++){const A=C*Math.PI*2/16;w.setXYZ(C+1,Math.sin(A)*120,Math.cos(A)*120,-Math.cos(A)*40*h[3]),S.setXYZW(C+1,h[0],h[1],h[2],0)}w.needsUpdate=!0,S.needsUpdate=!0;const M=Math.sin(Tu(s))<0?Math.PI:0;this.sunrise.quaternion.setFromAxisAngle(new F(1,0,0),Math.PI/2).multiply(new Ei().setFromAxisAngle(new F(0,0,1),M)).multiply(new Ei().setFromAxisAngle(new F(0,0,1),Math.PI/2))}this.celestial.visible=u,this.celestial.rotation.set(s*Math.PI*2,-Math.PI/2,0,"YXZ");const f=Gv(Math.floor(e)),p=this.moon.geometry.attributes.uv,m=f%4/4,g=f<4?.5:0;p.setXY(0,m,g+.5),p.setXY(1,m+.25,g+.5),p.setXY(2,m,g),p.setXY(3,m+.25,g),p.needsUpdate=!0;const _=Bv(s);this.stars.visible=_>0,this.stars.material.color.setRGB(_,_,_),this.stars.material.opacity=_;const d=Kv(this.dim,a);return{color:this.fog,start:d.start,end:d.end,lightmap:this.lm}}render(e,t,i,r){e.setClearColor(i,1),e.clear(),r&&(this.camera.fov=t.fov,this.camera.aspect=t.aspect,this.camera.updateProjectionMatrix(),t.getWorldQuaternion(this.camera.quaternion),e.render(this.scene,this.camera))}setDimension(e){this.dim=Wv(e)}}function Qv(){const e=new Uint8Array(4096);for(let t=0;t<32;t++)for(let i=0;i<32;i++){const r=Math.max(Math.abs(i-15.5),Math.abs(t-15.5)),s=(t*32+i)*4;let a=0;r<4?a=1:r<8&&(a=.3*(1-(r-4)/4)),e[s]=255*a,e[s+1]=255*a,e[s+2]=200*a,e[s+3]=255}return Pu(e,32,32)}function e1(){const t=new Uint8Array(32768),i=[[12,12,2],[19,17,3],[13,20,1.5],[20,11,1.5]];for(let r=0;r<8;r++){const s=r%4*32,a=r<4?0:32,o=r<=4?1-r/4:(r-4)/4;for(let l=8;l<24;l++)for(let c=8;c<24;c++){const u=(c-8+.5)/16;if(!(r<=4?u>=1-o:u<=o))continue;let f=.85;for(const[m,g,_]of i)Math.hypot(c-m,l-g)<_&&(f=.6);const p=((a+l)*128+s+c)*4;t[p]=t[p+1]=255*f,t[p+2]=255*(f+.05>1?1:f+.05),t[p+3]=255}}return Pu(t,128,64)}function Pu(n,e,t){const i=new Uint8Array(n.length);for(let s=0;s<t;s++)i.set(n.subarray(s*e*4,(s+1)*e*4),(t-1-s)*e*4);const r=new yo(i,e,t,Ot);return r.magFilter=r.minFilter=It,r.needsUpdate=!0,r}class ba{constructor(e,t,i){if(this.bits=e,this.size=t,e<1||e>32)throw new Error(`bits 必须在 1..32 之间：${e}`);this.valuesPerWord=Math.floor(32/e),this.mask=e===32?4294967295:(1<<e)-1;const r=Math.ceil(t/this.valuesPerWord);if(i&&i.length!==r)throw new Error(`数据长度不对：需要 ${r}，实际 ${i.length}`);this.data=i??new Uint32Array(r)}data;valuesPerWord;mask;get(e){const t=e/this.valuesPerWord|0,i=(e-t*this.valuesPerWord)*this.bits;return this.data[t]>>>i&this.mask}set(e,t){const i=e/this.valuesPerWord|0,r=(e-i*this.valuesPerWord)*this.bits;this.data[i]=this.data[i]&~(this.mask<<r)|(t&this.mask)<<r}}const Ln=4096,bc=4,Yi=8;class Nr{constructor(e,t=0){this.globalBits=e,this.palette=[t],this.lookup.set(t,0)}bits=0;palette;lookup=new Map;storage=null;get(e){if(this.bits===0)return this.palette[0];const t=this.storage.get(e);return this.bits>Yi?t:this.palette[t]}set(e,t){const i=this.get(e);if(i===t)return i;const r=this.idFor(t);return this.storage.set(e,r),i}idFor(e){if(this.bits>Yi)return e;const t=this.lookup.get(e);if(t!==void 0&&this.bits>0)return t;const i=this.palette.length+(t===void 0?1:0),r=this.bits===0?1:1<<this.bits;return i>r&&this.resize(i),this.bits>Yi?e:t!==void 0?t:(this.palette.push(e),this.lookup.set(e,this.palette.length-1),this.palette.length-1)}resize(e){const t=new Array(Ln);for(let s=0;s<Ln;s++)t[s]=this.get(s);const i=Math.ceil(Math.log2(e)),r=i<=Yi?Math.max(bc,i):this.globalBits;if(this.bits=r,this.storage=new ba(r,Ln),r>Yi){this.palette=[],this.lookup.clear();for(let s=0;s<Ln;s++)this.storage.set(s,t[s])}else for(let s=0;s<Ln;s++)this.storage.set(s,this.lookup.get(t[s]))}static fromValues(e,t){const i=new Nr(t,e[0]),r=[],s=new Map;for(let l=0;l<Ln;l++)s.has(e[l])||(s.set(e[l],r.length),r.push(e[l]));if(r.length===1)return i;const a=Math.ceil(Math.log2(r.length)),o=a>Yi;i.bits=o?t:Math.max(bc,a),i.storage=new ba(i.bits,Ln),i.palette=o?[]:r,i.lookup=o?new Map:s;for(let l=0;l<Ln;l++)i.storage.set(l,o?e[l]:s.get(e[l]));return i}toData(){return{bits:this.bits,palette:this.palette.slice(),data:this.storage?.data??null}}static fromData(e,t){const i=new Nr(t,e.palette[0]??0);return i.bits=e.bits,i.palette=e.palette,i.lookup=new Map(e.palette.map((r,s)=>[r,s])),i.storage=e.bits===0?null:new ba(e.bits,Ln,e.data),i}get isSingle(){return this.bits===0}get byteSize(){return(this.storage?.data.byteLength??0)+this.palette.length}}class nr{constructor(e=new Nr(fc,pt.air)){this.blocks=e,this.recount()}nonAir=0;static index(e,t,i){return(t*16+i)*16+e}get(e,t,i){return this.blocks.get(nr.index(e,t,i))}set(e,t,i,r){const s=this.blocks.set(nr.index(e,t,i),r);s===pt.air&&r!==pt.air?this.nonAir++:s!==pt.air&&r===pt.air&&this.nonAir--}get isEmpty(){return this.nonAir===0}recount(){const e=this.blocks;if(e.isSingle){this.nonAir=e.palette[0]===pt.air?0:4096;return}let t=0;for(let i=0;i<4096;i++)e.get(i)!==pt.air&&t++;this.nonAir=t}static fromData(e){return new nr(Nr.fromData(e,fc))}}const Lt=16;class Sc{constructor(e,t,i,r,s,a){this.cx=e,this.cz=t,this.minY=i,this.height=r;const o=r>>4;this.sections=s??Array.from({length:o},()=>new nr),a?this.flat=a:(this.flat=new Uint16Array(r*256),this.sections.forEach((l,c)=>{for(let u=0;u<4096;u++)this.flat[c*4096+u]=l.blocks.get(u)})),this.meshes=new Array(o).fill(null),this.waterMeshes=new Array(o).fill(null)}sections;meshes;waterMeshes;staleSections=new Set;flat;light=null;lighting=!1;version=0;sectionIndex(e){return e-this.minY>>4}static index(e,t,i,r){return((t-r)*Lt+i)*Lt+e}get(e,t,i){return t<this.minY||t>=this.minY+this.height?pt.air:this.flat[((t-this.minY)*16+i)*16+e]}set(e,t,i,r){if(t<this.minY||t>=this.minY+this.height)return;const s=t-this.minY;this.sections[s>>4].set(e,s&15,i,r),this.flat[(s*16+i)*16+e]=r,this.version++}setRaw(e,t){this.flat[e]=t,this.sections[e>>12].blocks.set(e&4095,t)}lightIndex(e,t,i){return((t-this.minY)*18+i+1)*18+e+1}get byteSize(){let e=0;for(const t of this.sections)e+=t.blocks.byteSize;return e}disposeSection(e,t){for(const i of[this.meshes,this.waterMeshes]){const r=i[t];r&&(e.remove(r),r.geometry.dispose(),i[t]=null)}}dispose(e){for(let t=0;t<this.sections.length;t++)this.disposeSection(e,t)}}const Tr={[nt.water]:{tickDelay:5,dropOff:1,slopeFindDistance:4,convertToSource:!0},[nt.lava]:{tickDelay:30,dropOff:2,slopeFindDistance:2,convertToSource:!1}},Sa=tn[pt.air],ds=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];class t1{constructor(e){this.world=e}time=0;queue=new Map;pending=new Set;maxPerTick=4e3;lastProcessed=0;get queued(){return this.pending.size}clear(){this.queue.clear(),this.pending.clear()}fluidAt(e,t,i){const r=this.world.get(e,t,i);return r===null?Sa:tn[r]}blocked(e,t,i){const r=this.world.get(e,t,i);return r===null||Ft[r]===1}schedule(e,t,i,r,s=Tr[r].tickDelay){const a=`${e},${t},${i},${r}`;if(this.pending.has(a))return;this.pending.add(a);const o=this.time+Math.max(1,s);let l=this.queue.get(o);l||this.queue.set(o,l=[]),l.push({x:e,y:t,z:i,kind:r})}blockChanged(e,t,i){this.notify(e,t,i);for(const[r,s,a]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])this.notify(e+r,t+s,i+a)}notify(e,t,i){const r=this.fluidAt(e,t,i);r.kind!==nt.none&&(r.kind===nt.lava&&this.solidifyLava(e,t,i,r)||this.schedule(e,t,i,r.kind))}solidifyLava(e,t,i,r){for(const[s,a,o]of[[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]])if(this.fluidAt(e+s,t+a,i+o).kind===nt.water)return this.setAndUpdate(e,t,i,r.source?pt.obsidian:pt.cobblestone),!0;return!1}setAndUpdate(e,t,i,r){this.world.set(e,t,i,r),this.blockChanged(e,t,i)}tick(){this.time++;let e=0;for(const t of[...this.queue.keys()].sort((i,r)=>i-r)){if(t>this.time)break;const i=this.queue.get(t);for(;i.length>0&&e<this.maxPerTick;){const r=i.shift();this.pending.delete(`${r.x},${r.y},${r.z},${r.kind}`),e++,this.tickFluid(r)}if(i.length===0&&this.queue.delete(t),e>=this.maxPerTick)break}this.lastProcessed=e}tickFluid({x:e,y:t,z:i,kind:r}){if(this.world.get(e,t,i)===null)return;let s=this.fluidAt(e,t,i);if(s.kind===r){if(!s.source){const a=this.getNewLiquid(e,t,i,r),o=this.spreadDelay(e,t,i,s,a);a.kind===nt.none?(s=a,this.setAndUpdate(e,t,i,pt.air)):(a.amount!==s.amount||a.falling!==s.falling||a.source!==s.source)&&(s=a,this.world.set(e,t,i,Ar(r,a.amount,a.falling)),this.schedule(e,t,i,r,o),this.blockChanged(e,t,i))}this.spread(e,t,i,s)}}spreadDelay(e,t,i,r,s){const a=r.kind;let o=Tr[a].tickDelay;return a===nt.lava&&r.kind!==nt.none&&s.kind!==nt.none&&!r.falling&&!s.falling&&this.height(e,t,i,s)>this.height(e,t,i,r)&&Math.random()<.75&&(o*=4),o}height(e,t,i,r){return this.fluidAt(e,t+1,i).kind===r.kind?1:r.amount/9}getNewLiquid(e,t,i,r){if(this.blocked(e,t,i))return Sa;const s=Tr[r];let a=0,o=0;for(const[c,,u]of ds){if(this.blocked(e+c,t,i+u))continue;const h=this.fluidAt(e+c,t,i+u);h.kind===r&&(h.source&&o++,a=Math.max(a,h.amount))}if(s.convertToSource&&o>=2){const c=this.world.get(e,t-1,i),u=this.fluidAt(e,t-1,i);if(c!==null&&Ft[c]||u.kind===r&&u.source)return tn[Ar(r,8)]}if(this.fluidAt(e,t+1,i).kind===r&&!this.blocked(e,t+1,i))return tn[Ar(r,8,!0)];const l=a-s.dropOff;return l<=0?Sa:tn[Ar(r,l)]}spread(e,t,i,r){if(r.kind===nt.none)return;const s=r.kind,a=this.getNewLiquid(e,t-1,i,s);this.canSpreadTo(e,t-1,i,"down",a.kind)?(this.spreadTo(e,t-1,i,"down",a),this.sourceNeighborCount(e,t,i,s)>=3&&this.spreadToSides(e,t,i,r)):(r.source||!this.isHole(e,t,i))&&this.spreadToSides(e,t,i,r)}spreadToSides(e,t,i,r){const s=r.kind;let a=r.amount-Tr[s].dropOff;if(r.falling&&(a=7),!(a<=0))for(const[o,l,c]of this.getSpread(e,t,i,s))this.canSpreadTo(e+o,t,i+l,"side",c.kind)&&this.spreadTo(e+o,t,i+l,"side",c)}getSpread(e,t,i,r){let s=1e3,a=[];for(const[o,,l]of ds){const c=e+o,u=i+l,h=this.getNewLiquid(c,t,u,r);if(!this.canPassThrough(c,t,u,r))continue;const f=this.isHole(c,t,u)?0:this.slopeDistance(c,t,u,1,-o,-l,r);f<s&&(a=[]),f<=s&&(a.push([o,l,h]),s=f)}return a}slopeDistance(e,t,i,r,s,a,o){let l=1e3;for(const[c,,u]of ds){if(c===s&&u===a)continue;const h=e+c,f=i+u;if(this.canPassThrough(h,t,f,o)){if(this.isHole(h,t,f))return r;r<Tr[o].slopeFindDistance&&(l=Math.min(l,this.slopeDistance(h,t,f,r+1,-c,-u,o)))}}return l}isHole(e,t,i){return!this.blocked(e,t-1,i)}canPassThrough(e,t,i,r){if(this.blocked(e,t,i))return!1;const s=this.fluidAt(e,t,i);return!(s.kind===r&&s.source)}sourceNeighborCount(e,t,i,r){let s=0;for(const[a,,o]of ds){const l=this.fluidAt(e+a,t,i+o);l.kind===r&&l.source&&s++}return s}canSpreadTo(e,t,i,r,s){if(this.blocked(e,t,i)||s===nt.none)return!1;const a=this.fluidAt(e,t,i);return a.kind===nt.none?!0:a.kind===nt.water?r==="down"&&s===nt.lava:s===nt.water&&this.height(e,t,i,a)>=.44444445}spreadTo(e,t,i,r,s){if(r==="down"&&s.kind===nt.lava&&this.fluidAt(e,t,i).kind===nt.water){this.setAndUpdate(e,t,i,pt.stone);return}this.setAndUpdate(e,t,i,Ar(s.kind,s.amount,s.falling))}}const ps=.02,Ec=1.002;class n1{mesh=new Ki;constructor(e){const t=new Ur({color:0,transparent:!0,opacity:.55}),i=Ec/2;for(const r of[0,1,2]){const s=[ps,ps,ps];s[r]=Ec+ps;const a=new pr(s[0],s[1],s[2]);for(const o of[-i,i])for(const l of[-i,i]){const c=[o,l];c.splice(r,0,0);const u=new yt(a,t);u.position.set(c[0],c[1],c[2]),this.mesh.add(u)}}this.mesh.visible=!1,e.add(this.mesh)}show(e,t,i){this.mesh.position.set(e+.5,t+.5,i+.5),this.mesh.visible=!0}hide(){this.mesh.visible=!1}}function i1(){const n=new So(Mu(),fe,fe,Co);return n.format=Ot,n.type=nn,n.wrapS=n.wrapT=ws,n.magFilter=It,n.minFilter=Cr,n.generateMipmaps=!0,n.needsUpdate=!0,n}const r1={"minecraft:air":[0,0],"minecraft:stone":[15,0],"minecraft:deepslate":[15,0],"minecraft:dirt":[15,0],"minecraft:grass_block":[15,0],"minecraft:sand":[15,0],"minecraft:gravel":[15,0],"minecraft:water":[1,0],"minecraft:bedrock":[15,0],"minecraft:oak_planks":[15,0],"minecraft:cobblestone":[15,0],"minecraft:oak_log":[15,0],"minecraft:oak_leaves":[1,0],"minecraft:glowstone":[15,15],"minecraft:obsidian":[15,0],"minecraft:lava":[1,15],"minecraft:sandstone":[15,0],"minecraft:red_sand":[15,0],"minecraft:red_sandstone":[15,0],"minecraft:snow_block":[15,0],"minecraft:powder_snow":[1,0],"minecraft:ice":[1,0],"minecraft:packed_ice":[15,0],"minecraft:mud":[15,0],"minecraft:mycelium":[15,0],"minecraft:podzol":[15,0],"minecraft:coarse_dirt":[15,0],"minecraft:calcite":[15,0],"minecraft:terracotta":[15,0],"minecraft:white_terracotta":[15,0],"minecraft:orange_terracotta":[15,0],"minecraft:yellow_terracotta":[15,0],"minecraft:brown_terracotta":[15,0],"minecraft:red_terracotta":[15,0],"minecraft:light_gray_terracotta":[15,0],"minecraft:granite":[15,0],"minecraft:diorite":[15,0],"minecraft:andesite":[15,0],"minecraft:tuff":[15,0],"minecraft:clay":[15,0],"minecraft:infested_stone":[15,0],"minecraft:infested_deepslate":[15,0],"minecraft:coal_ore":[15,0],"minecraft:deepslate_coal_ore":[15,0],"minecraft:iron_ore":[15,0],"minecraft:deepslate_iron_ore":[15,0],"minecraft:copper_ore":[15,0],"minecraft:deepslate_copper_ore":[15,0],"minecraft:gold_ore":[15,0],"minecraft:deepslate_gold_ore":[15,0],"minecraft:redstone_ore":[[15,9],[15,0]],"minecraft:deepslate_redstone_ore":[[15,9],[15,0]],"minecraft:emerald_ore":[15,0],"minecraft:deepslate_emerald_ore":[15,0],"minecraft:lapis_ore":[15,0],"minecraft:deepslate_lapis_ore":[15,0],"minecraft:diamond_ore":[15,0],"minecraft:deepslate_diamond_ore":[15,0],"minecraft:raw_iron_block":[15,0],"minecraft:raw_copper_block":[15,0],"minecraft:spruce_log":[15,0],"minecraft:birch_log":[15,0],"minecraft:jungle_log":[15,0],"minecraft:acacia_log":[15,0],"minecraft:dark_oak_log":[15,0],"minecraft:mangrove_log":[15,0],"minecraft:cherry_log":[15,0],"minecraft:pale_oak_log":[15,0],"minecraft:spruce_leaves":[1,0],"minecraft:birch_leaves":[1,0],"minecraft:jungle_leaves":[1,0],"minecraft:acacia_leaves":[1,0],"minecraft:dark_oak_leaves":[1,0],"minecraft:mangrove_leaves":[1,0],"minecraft:cherry_leaves":[1,0],"minecraft:pale_oak_leaves":[1,0],"minecraft:azalea_leaves":[1,0],"minecraft:flowering_azalea_leaves":[1,0],"minecraft:mushroom_stem":[15,0],"minecraft:red_mushroom_block":[15,0],"minecraft:brown_mushroom_block":[15,0],"minecraft:mangrove_roots":[1,0],"minecraft:muddy_mangrove_roots":[15,0],"minecraft:rooted_dirt":[15,0],"minecraft:bee_nest":[15,0],"minecraft:creaking_heart":[15,0],"minecraft:snow":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[15,0]],"minecraft:moss_carpet":[0,0],"minecraft:pale_moss_carpet":[0,0],"minecraft:vine":[0,0],"minecraft:cocoa":[0,0],"minecraft:pale_hanging_moss":[0,0],"minecraft:mangrove_propagule":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:short_grass":[0,0],"minecraft:fern":[0,0],"minecraft:tall_grass":[0,0],"minecraft:large_fern":[0,0],"minecraft:dead_bush":[0,0],"minecraft:dandelion":[0,0],"minecraft:poppy":[0,0],"minecraft:blue_orchid":[0,0],"minecraft:allium":[0,0],"minecraft:azure_bluet":[0,0],"minecraft:red_tulip":[0,0],"minecraft:orange_tulip":[0,0],"minecraft:white_tulip":[0,0],"minecraft:pink_tulip":[0,0],"minecraft:oxeye_daisy":[0,0],"minecraft:cornflower":[0,0],"minecraft:lily_of_the_valley":[0,0],"minecraft:closed_eyeblossom":[0,0],"minecraft:open_eyeblossom":[0,0],"minecraft:sunflower":[0,0],"minecraft:lilac":[0,0],"minecraft:rose_bush":[0,0],"minecraft:peony":[0,0],"minecraft:brown_mushroom":[0,1],"minecraft:red_mushroom":[0,0],"minecraft:sweet_berry_bush":[0,0],"minecraft:sugar_cane":[0,0],"minecraft:bamboo":[0,0],"minecraft:azalea":[0,0],"minecraft:flowering_azalea":[0,0],"minecraft:pink_petals":[0,0],"minecraft:lily_pad":[0,0],"minecraft:pumpkin":[15,0],"minecraft:melon":[15,0],"minecraft:cactus":[0,0],"minecraft:seagrass":[1,0],"minecraft:tall_seagrass":[1,0],"minecraft:kelp":[1,0],"minecraft:kelp_plant":[1,0],"minecraft:sea_pickle":[[1,6],[1,9],[1,12],[1,15]],"minecraft:glow_lichen":[[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,7],[0,7],[0,7],[1,7],[1,0],[0,7],[0,0]],"minecraft:hanging_roots":[[1,0],[0,0]],"minecraft:spore_blossom":[0,0],"minecraft:cave_vines":[[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0],[0,14],[0,0]],"minecraft:cave_vines_plant":[[0,14],[0,0]],"minecraft:small_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:big_dripleaf_stem":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:moss_block":[15,0],"minecraft:pale_moss_block":[15,0],"minecraft:dripstone_block":[15,0],"minecraft:pointed_dripstone":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:smooth_basalt":[15,0],"minecraft:amethyst_block":[15,0],"minecraft:budding_amethyst":[15,0],"minecraft:small_amethyst_bud":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:medium_amethyst_bud":[[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2],[1,2],[0,2]],"minecraft:large_amethyst_bud":[[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4],[1,4],[0,4]],"minecraft:amethyst_cluster":[[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5],[1,5],[0,5]],"minecraft:sculk":[15,0],"minecraft:sculk_vein":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[1,0]],"minecraft:sculk_sensor":[[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]],"minecraft:sculk_shrieker":[1,0],"minecraft:sculk_catalyst":[15,6],"minecraft:blue_ice":[15,0],"minecraft:mossy_cobblestone":[15,0],"minecraft:magma_block":[15,3],"minecraft:spawner":[1,0],"minecraft:chest":[[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0],[1,0],[0,0]],"minecraft:bone_block":[15,0],"minecraft:suspicious_sand":[15,0],"minecraft:suspicious_gravel":[15,0],"minecraft:sandstone_slab":[[1,0],[0,0],[1,0],[0,0],[15,0],[15,0]],"minecraft:tube_coral_block":[15,0],"minecraft:tube_coral":[1,0],"minecraft:tube_coral_fan":[1,0],"minecraft:tube_coral_wall_fan":[1,0],"minecraft:brain_coral_block":[15,0],"minecraft:brain_coral":[1,0],"minecraft:brain_coral_fan":[1,0],"minecraft:brain_coral_wall_fan":[1,0],"minecraft:bubble_coral_block":[15,0],"minecraft:bubble_coral":[1,0],"minecraft:bubble_coral_fan":[1,0],"minecraft:bubble_coral_wall_fan":[1,0],"minecraft:fire_coral_block":[15,0],"minecraft:fire_coral":[1,0],"minecraft:fire_coral_fan":[1,0],"minecraft:fire_coral_wall_fan":[1,0],"minecraft:horn_coral_block":[15,0],"minecraft:horn_coral":[1,0],"minecraft:horn_coral_fan":[1,0],"minecraft:horn_coral_wall_fan":[1,0],"minecraft:netherrack":[15,0],"minecraft:soul_sand":[15,0],"minecraft:soul_soil":[15,0],"minecraft:basalt":[15,0],"minecraft:blackstone":[15,0],"minecraft:nether_gold_ore":[15,0],"minecraft:nether_quartz_ore":[15,0],"minecraft:ancient_debris":[15,0],"minecraft:crimson_nylium":[15,0],"minecraft:warped_nylium":[15,0],"minecraft:crimson_stem":[15,0],"minecraft:warped_stem":[15,0],"minecraft:nether_wart_block":[15,0],"minecraft:warped_wart_block":[15,0],"minecraft:shroomlight":[15,15],"minecraft:crimson_fungus":[0,0],"minecraft:warped_fungus":[0,0],"minecraft:crimson_roots":[0,0],"minecraft:warped_roots":[0,0],"minecraft:nether_sprouts":[0,0],"minecraft:weeping_vines":[0,0],"minecraft:weeping_vines_plant":[0,0],"minecraft:twisting_vines":[0,0],"minecraft:twisting_vines_plant":[0,0],"minecraft:fire":[0,15],"minecraft:soul_fire":[0,10],"minecraft:end_stone":[15,0],"minecraft:chorus_plant":[1,0],"minecraft:chorus_flower":[1,0],"minecraft:end_gateway":[1,15],"minecraft:iron_bars":[[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0],[1,0],[1,0],[0,0],[0,0]],"minecraft:bubble_column":[1,0]},yi=new Uint8Array(Zt).fill(15),Qt=new Uint8Array(Zt);for(let n=0;n<Zt;n++){const e=r1[wv[n]??""];if(!e)continue;const t=Array.isArray(e[0])?e[En.indexOf[n]]:e;yi[n]=t[0],Qt[n]=t[1]}const fr=new Uint8Array(Zt);for(let n=0;n<Zt;n++)/^minecraft:snow(\[layers=[1-7]\])?$|_slab\[type=bottom|^minecraft:(calibrated_)?sculk_sensor|^minecraft:sculk_shrieker/.test(yu(n))&&(fr[n]=1);function s1(n,e,t,i=yi,r=fr){let s=t-1;for(;s>=0&&i[n[e(s)]]===0&&(s===t-1||!r[n[e(s+1)]]);)s--;return s+1}const _s=18;function a1(n,e,t,i,r){for(let a=-1;a<=16;a++){const o=t*16+a,l=(a+1)*18*18;o<0?r.fill(0,l,l+324):o>=e?r.fill(i?15:0,l,l+324):r.set(n.subarray(o*_s*_s,(o+1)*_s*_s),l)}}const $n=18,Dt=(n,e,t)=>((e+1)*$n+(t+1))*$n+(n+1),Cs=4,Ri=256,Do=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],wc=65536,yc=1<<17,o1=[0,ee.water,ee.lava];class Ac{pos=new Uint16Array(4096*3);inf=new Uint8Array(4096*4);lig=new Uint8Array(4096*2);ind=new Uint16Array(4096*1.5);vertices=0;indexCount=0;grow(){const e=(t,i)=>{const r=new t.constructor(i);return r.set(t),r};this.pos=e(this.pos,this.pos.length*2),this.inf=e(this.inf,this.inf.length*2),this.lig=e(this.lig,this.lig.length*2),this.ind=e(this.ind,this.ind.length*2)}quad(e,t,i,r,s,a,o,l=0){((this.vertices+4)*4>this.inf.length||this.indexCount+6>this.ind.length)&&this.grow();const c=this.vertices;for(let h=0;h<4;h++)this.pos.set([e[h*3],e[h*3+1],e[h*3+2]],(c+h)*3),this.inf.set([t,i,r[h]|l,bu[i]],(c+h)*4),this.lig[(c+h)*2]=o[h*2],this.lig[(c+h)*2+1]=o[h*2+1];const u=a?[0,1,3,0,3,2]:[0,1,2,2,1,3];for(let h=0;h<6;h+=3){const f=u[h],p=s?u[h+1]:u[h+2],m=s?u[h+2]:u[h+1];this.ind[this.indexCount++]=c+f,this.ind[this.indexCount++]=c+p,this.ind[this.indexCount++]=c+m}this.vertices+=4}build(){return{positions:this.pos.slice(0,this.vertices*3),info:this.inf.slice(0,this.vertices*4),light:this.lig.slice(0,this.vertices*2),indices:this.ind.slice(0,this.indexCount)}}}const Dr=new Uint8Array(Zt);Dr[pt.magma_block]=1;function qn(n,e,t){const i=n[t];if(Dr[i])return 255;const r=e?e[t]:15,s=Qt[i];return r>>4>=s?r:r&15|s<<4}function l1(n,e={}){const t=e.greedy??!0,i=e.light,r=new Ac,s=new Ac,a=new Int32Array(256),o=new Float64Array(256),l=new Uint8Array(256*8),c=new Float64Array(256),u=new Float32Array(256*4),h=new Uint8Array(256),f=n,p=[0,0,0],m=[0,0,0];for(let g=0;g<6;g++){const _=Do[g],d=g>>1,w=(d+1)%3,S=(d+2)%3,M=(g&1)===1;for(let C=0;C<16;C++){let A=!1;for(let T=0;T<16;T++)for(let P=0;P<16;P++){p[d]=C,p[w]=P,p[S]=T;const E=n[Dt(p[0],p[1],p[2])],b=n[Dt(p[0]+_[0],p[1]+_[1],p[2]+_[2])],R=T*16+P;if(a[R]=0,c[R]=0,Ft[E]){if(Ft[b])continue;m[0]=p[0]+_[0],m[1]=p[1]+_[1],m[2]=p[2]+_[2];const V=Dt(m[0],m[1],m[2]),N=qn(n,i,V),G=Qt[E]>0||Dr[E]===1;let $=0,X=0;for(let Ve=0;Ve<4;Ve++){const q=Ve&1?1:-1,te=Ve&2?1:-1,be=Dt(m[0]+(w===0?q:0),m[1]+(w===1?q:0),m[2]+(w===2?q:0)),ue=Dt(m[0]+(S===0?te:0),m[1]+(S===1?te:0),m[2]+(S===2?te:0)),Re=Dt(m[0]+(w===0?q:0)+(S===0?te:0),m[1]+(w===1?q:0)+(S===1?te:0),m[2]+(w===2?q:0)+(S===2?te:0)),Le=Ft[n[be]],Ue=Ft[n[ue]],ut=Ft[n[Re]],Xe=G?3:Le&&Ue?0:3-(Le+Ue+ut);$|=Xe<<Ve*2;let at,D;if(G)at=Dr[E]?60:(N&15)*4,D=Math.max(N>>4,Qt[E],Dr[E]?15:0)*4;else{const Ht=!Le||yi[n[be]]===0,We=!Ue||yi[n[ue]]===0,Be=qn(n,i,be)||N,Te=qn(n,i,ue)||N,it=(Ht||We?qn(n,i,Re):qn(n,i,be))||N;at=(Be&15)+(Te&15)+(it&15)+(N&15),D=(Be>>4)+(Te>>4)+(it>>4)+(N>>4)}l[R*8+Ve*2]=at,l[R*8+Ve*2+1]=D,X=X*4096+at*64+D}const Q=$&3,B=$>>2&3,ne=$>>4&3,ce=$>>6&3,Me=Ve=>l[R*8+Ve*2]*64+l[R*8+Ve*2+1],Ge=(Q===B&&ne===ce&&Me(0)===Me(1)&&Me(2)===Me(3)?wc:0)|(Q===ne&&B===ce&&Me(0)===Me(2)&&Me(1)===Me(3)?yc:0);a[R]=Ts[E*6+g]|$<<8|Ge,o[R]=X,A=!0}else if(Fn[E]!==nt.none){const V=Fn[E];if(Fn[b]===V||g!==3&&Ft[b])continue;const N=d1(f,p[0],p[1],p[2],V);u.set(N,R*4);const G=qn(n,i,Dt(p[0],p[1],p[2])),$=qn(n,i,Dt(p[0],p[1]+1,p[2])),X=Math.max(G&15,$&15)|Math.max(G>>4,$>>4)<<4;h[R]=X;const Q=g===3?N:g===2?null:g===0?[N[0],N[2]]:g===1?[N[1],N[3]]:g===4?[N[0],N[1]]:[N[2],N[3]],B=!Q||Q.every(ce=>ce===Q[0]);let ne=V*256+X;for(const ce of Q??[])ne=ne*257+Math.round(ce*Ri);c[R]=ne*2+(B?1:0),A=!0}}if(A)for(const T of[a,c])for(let P=0;P<16;P++)for(let E=0;E<16;){const b=T[P*16+E];if(b===0){E++;continue}const R=T===c,V=t&&(R?b%2===1:(b&wc)!==0),N=t&&(R?b%2===1:(b&yc)!==0);let G=1,$=1;const X=R?0:o[P*16+E],Q=ne=>T[ne]===b&&(R||o[ne]===X);if(V)for(;E+G<16&&Q(P*16+E+G);)G++;if(N)e:for(;P+$<16;){for(let ne=0;ne<G;ne++)if(!Q((P+$)*16+E+ne))break e;$++}const B=P*16+E;R?f1(r,s,n,u.subarray(B*4,B*4+4),g,d,w,S,M,C,E,P,G,$,h[B]):h1(r,b,g,d,w,S,M,C,E,P,G,$,l.subarray(B*8,B*8+8));for(let ne=0;ne<$;ne++)for(let ce=0;ce<G;ce++)T[(P+ne)*16+E+ce]=0;E+=G}}}return c1(r,n,i),{opaque:r.build(),water:s.build()}}function c1(n,e,t){const i=Ri,r=s=>{const a=qn(e,t,s),o=(a&15)*4,l=(a>>4)*4;return[o,l,o,l,o,l,o,l]};for(let s=0;s<16;s++)for(let a=0;a<16;a++)for(let o=0;o<16;o++){const l=e[Dt(o,s,a)],c=Av[l];if(c===0||c===4)continue;const u=r(Dt(o,s,a));if(c===1){const h=Tv[l]/16;for(let f=0;f<6;f++){const p=Do[f],m=Dt(o+p[0],s+p[1],a+p[2]);if(f!==3&&Ft[e[m]])continue;const g=f>>1,_=(g+1)%3,d=(g+2)%3,w=(f&1)===1,S=Os(g,_,d,w,[o,s,a][g],[o,s,a][_],[o,s,a][d],1,1);for(let M=0;M<4;M++)S[M*3+1]>s*i&&(S[M*3+1]=Math.round((s+h)*i));n.quad(S,f,Ts[l*6+f],[3,3,3,3],w,!1,f===3?u:r(m))}}else{if(c===3&&u1(n,e,l,o,s,a,u))continue;{const h=Ts[l*6],f=o*i,p=(o+1)*i,m=a*i,g=(a+1)*i,_=s*i,d=(s+1)*i,w=[f,_,m,p,_,g,f,d,m,p,d,g],S=[f,_,g,p,_,m,f,d,g,p,d,m];for(const[M,C]of[[w,6],[S,7]])n.quad([...M],C,h,[3,3,3,3],!0,!1,u,Cs),n.quad([...M],C,h,[3,3,3,3],!1,!1,u,Cs)}}}}function u1(n,e,t,i,r,s,a){const o=Ri/64;let l=!1;const c=yv[t];for(let u=0;u<6;u++){const h=Do[u];if(c?!(c&1<<u):!Ft[e[Dt(i+h[0],r+h[1],s+h[2])]])continue;const f=u>>1,p=(f+1)%3,m=(f+2)%3,g=(u&1)===1,_=Os(f,p,m,g,[i,r,s][f],[i,r,s][p],[i,r,s][m],1,1);for(let w=0;w<4;w++)_[w*3+f]+=g?-o:o;const d=Ts[t*6+u];n.quad([..._],u,d,[3,3,3,3],!0,!1,a,Cs),n.quad([..._],u,d,[3,3,3,3],!1,!1,a,Cs),l=!0}return l}function Os(n,e,t,i,r,s,a,o,l){const c=Ri,u=[];for(let h=0;h<4;h++){const f=[0,0,0];f[n]=(r+(i?1:0))*c,f[e]=(s+(h&1?o:0))*c,f[t]=(a+(h&2?l:0))*c,u.push(f[0],f[1],f[2])}return u}function h1(n,e,t,i,r,s,a,o,l,c,u,h,f){const p=Os(i,r,s,a,o,l,c,u,h),m=e&255,g=[0,1,2,3].map(w=>e>>8+w*2&3),_=w=>g[w]*64+f[w*2]+f[w*2+1],d=_(0)+_(3)>_(1)+_(2);n.quad(p,t,m,g,a,d,f)}function f1(n,e,t,i,r,s,a,o,l,c,u,h,f,p,m){const g=Ri,_=[0,0,0];_[s]=c,_[a]=u,_[o]=h;const d=Fn[t[Dt(_[0],_[1],_[2])]],w=Os(s,a,o,l,c,u,h,f,p);if(r!==2){const A=Math.max(w[1],w[4],w[7],w[10]);for(let T=0;T<4;T++){if(w[T*3+1]!==A)continue;const P=w[T*3]>_[0]*g?1:0,E=w[T*3+2]>_[2]*g?2:0;w[T*3+1]-=Math.round((1-i[P+E])*g)}}const S=d===nt.water?e:n,M=(m&15)*4,C=(m>>4)*4;S.quad(w,r,o1[d],[3,3,3,3],l,!1,[M,C,M,C,M,C,M,C])}function d1(n,e,t,i,r){const s=(f,p,m)=>{const g=n[Dt(f,p,m)];return Fn[g]===r?Fn[n[Dt(f,p+1,m)]]===r?1:tn[g].amount/9:Ft[g]?-1:0},a=s(e,t,i);if(a>=1)return[1,1,1,1];const o=s(e,t,i-1),l=s(e,t,i+1),c=s(e+1,t,i),u=s(e-1,t,i),h=(f,p,m,g)=>{if(p>=1||f>=1)return 1;let _=0,d=0;const w=S=>{S>=.8?(_+=S*10,d+=10):S>=0&&(_+=S,d+=1)};if(p>0||f>0){const S=s(e+m,t,i+g);if(S>=1)return 1;w(S)}return w(a),w(p),w(f),_/d};return[h(o,u,-1,-1),h(o,c,1,-1),h(l,u,-1,1),h(l,c,1,1)]}const Io=512,p1=`
attribute vec4 info; // [面的方向, 纹理层, AO 等级（+4 不按方向变暗）, 染色种类]
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
const float AO_LEVEL[4] = float[4](0.4, 0.6, 0.8, 1.0);

void main() {
  vec3 p = position / ${Ri.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标：图片的第一行在上面，所以 v 取 -y
  if (face == 0)      vUv = vec2( p.z, -p.y); // -x 面
  else if (face == 1) vUv = vec2(-p.z, -p.y); // +x 面
  else if (face == 4) vUv = vec2(-p.x, -p.y); // -z 面
  else if (face == 5) vUv = vec2( p.x, -p.y); // +z 面
  else if (face >= 6) vUv = vec2( p.x, -p.y); // 十字形植物的两片斜面（v5）：沿对角线，x 每格正好走一格
  else                vUv = vec2( p.x,  p.z); // 顶面、底面

  vLayer = info.y;
  int ao = int(info.z + 0.5);
  float shade = (ao & 4) != 0 ? (constantAmbient ? 0.9 : 1.0) : constantAmbient && (face == 2 || face == 3) ? 0.9 : FACE_SHADE[face];
  // 原版 UV2 = 亮度 × 16，再除以 256：4 格之和 × 4 / 256
  vec2 uv = clamp(vec2(light.y, light.x) / 64.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0));
  vLight = texture(lightMap, uv).rgb * shade * AO_LEVEL[ao & 3];
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
`,_1=`
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
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
  int kind = int(vTint + 0.5);
  bool cutout = kind >= 4; // 镂空纹理（v5，十字形植物）：透明的像素丢掉，其余整张染色
  if (cutout) {
    if (c.a < 0.5) discard;
    kind -= 4;
  }
  if (kind > 0 && (cutout || c.a < 0.999)) {
    ivec2 col = ivec2(mod(floor(vColumn), ${Io}.0));
    vec3 tint = kind == 1 ? texelFetch(grassMap, col, 0).rgb : kind == 2 ? texelFetch(foliageMap, col, 0).rgb : texelFetch(waterMap, col, 0).rgb;
    c.rgb = cutout ? c.rgb * tint : mix(c.rgb, c.rgb * tint, 1.0 - c.a); // alpha 越小染得越多（mipmap 时会是中间值）
  }
  gl_FragColor = vec4(c.rgb * vLight, opacity);
#endif
  // 原版 linear_fog：fogNear 之前没有雾，fogFar 之后全是雾色
  float fog = clamp((vFogDist - fogNear) / (fogFar - fogNear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fog);
}
`;function Ea(n){return new Sn({vertexShader:p1,fragmentShader:_1,uniforms:eu.merge([le.fog,{map:{value:null},grassMap:{value:null},foliageMap:{value:null},waterMap:{value:null},lightMap:{value:null},constantAmbient:{value:!1},opacity:{value:n}}]),fog:!0})}class m1{textures=i1();opaque;water;wire;wireframe=!1;tintMaps=[9551193,7842607,4159204].map(e=>g1(e));tintsDirty=!1;lightMap=v1();constructor(){this.opaque=Ea(1),this.water=Ea(.7),this.water.transparent=!0,this.water.depthWrite=!1,this.water.side=en;for(const e of[this.opaque,this.water])e.uniforms.map.value=this.textures,e.uniforms.grassMap.value=this.tintMaps[0],e.uniforms.foliageMap.value=this.tintMaps[1],e.uniforms.waterMap.value=this.tintMaps[2],e.uniforms.lightMap.value=this.lightMap;this.wire=Ea(.6),this.wire.uniforms.lightMap.value=this.lightMap,this.wire.defines={WIRE:""},this.wire.wireframe=!0,this.wire.transparent=!0}writeTints(e,t,i){const r=Io;for(let s=0;s<16;s++)for(let a=0;a<16;a++){const o=((e*16+a)%r+r)%r,l=((t*16+s)%r+r)%r;for(let c=0;c<3;c++){const u=((s*16+a)*3+c)*3,h=(l*r+o)*4,f=this.tintMaps[c].image.data;f[h]=i[u],f[h+1]=i[u+1],f[h+2]=i[u+2]}}this.tintsDirty=!0}setLightmap(e,t){const i=this.lightMap.image.data;for(let r=0;r<256;r++)i[r*4]=e[r*3],i[r*4+1]=e[r*3+1],i[r*4+2]=e[r*3+2];this.lightMap.needsUpdate=!0;for(const r of[this.opaque,this.water,this.wire])r.uniforms.constantAmbient.value=t}flushTints(){if(this.tintsDirty){for(const e of this.tintMaps)e.needsUpdate=!0;this.tintsDirty=!1}}}function g1(n){const e=Io,t=new Uint8Array(e*e*4);for(let r=0;r<e*e;r++)t[r*4]=n>>16&255,t[r*4+1]=n>>8&255,t[r*4+2]=n&255,t[r*4+3]=255;const i=new yo(t,e,e,Ot,nn);return i.magFilter=i.minFilter=It,i.needsUpdate=!0,i}function v1(){const n=new Uint8Array(1024).fill(255),e=new yo(n,16,16,Ot,nn);return e.magFilter=e.minFilter=hn,e.generateMipmaps=!1,e.needsUpdate=!0,e}const wa=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]];function x1(n,e,t,i,r,s){yi[r]===yi[s]&&Qt[r]===Qt[s]&&fr[r]===fr[s]||n.get(e,t,i)<0||(Tc(n,e,t,i,r,!1),n.hasSky&&Tc(n,e,t,i,r,!0))}function Tc(n,e,t,i,r,s){const a=s?0:4,o=(S,M,C)=>{const A=n.get(S,M,C);return A<0?-1:A>>a&15},l=(S,M,C,A)=>{const T=n.get(S,M,C);T<0||n.set(S,M,C,s?T&240|A:T&15|A<<4)},c=n.maxY-n.minY,u=new Map,h=(S,M,C)=>{const A=`${S},${M}`;let T=C===void 0?u.get(A):void 0;if(T===void 0){const P=new Uint16Array(c);for(let E=0;E<c;E++)P[E]=n.minY+E===t&&S===f&&M===p&&C!==void 0?C:n.block(S,n.minY+E,M);T=n.minY+s1(P,E=>E,c),C===void 0&&u.set(A,T)}return T},f=e,p=i,m=(S,M,C)=>s?M>=h(S,C):Qt[n.block(S,M,C)]>0,g=(S,M,C)=>s?15:Qt[n.block(S,M,C)],_=[],d=[];if(s){const S=h(e,i,r),M=h(e,i);for(let C=S;C<M;C++){const A=o(e,C,i);A>0&&(l(e,C,i,0),_.push(e,C,i,A))}for(let C=M;C<S;C++)l(e,C,i,15),d.push(e,C,i)}const w=o(e,t,i);!(s&&t>=h(e,i))&&w>0&&(l(e,t,i,0),_.push(e,t,i,w)),!s&&Qt[n.block(e,t,i)]>0&&(l(e,t,i,Qt[n.block(e,t,i)]),d.push(e,t,i));for(let S=0;S<_.length;S+=4){const M=_[S],C=_[S+1],A=_[S+2],T=_[S+3];for(const[P,E,b]of wa){const R=M+P,V=C+E,N=A+b,G=o(R,V,N);if(!(G<=0)){if(m(R,V,N)&&G===g(R,V,N)){d.push(R,V,N);continue}G<T?(l(R,V,N,0),_.push(R,V,N,G),!s&&Qt[n.block(R,V,N)]>0&&(l(R,V,N,Qt[n.block(R,V,N)]),d.push(R,V,N))):d.push(R,V,N)}}}for(const[S,M,C]of wa)o(e+S,t+M,i+C)>0&&d.push(e+S,t+M,i+C);for(let S=0;S<d.length;S+=3){const M=d[S],C=d[S+1],A=d[S+2],T=o(M,C,A);if(T<=1)continue;const P=n.block(M,C,A);for(const[E,b,R]of wa){const V=M+E,N=C+b,G=A+R,$=o(V,N,G);if($<0||T-1<=$)continue;const X=n.block(V,N,G);if(b===-1&&fr[P]||b===1&&fr[X])continue;const Q=T-Math.max(1,yi[X]);Q>$&&(l(V,N,G,Q),d.push(V,N,G))}}}function M1(n){return new Worker(""+new URL("generate-DIYcwBSr.js",import.meta.url).href,{type:"module",name:n?.name})}class b1{slots=[];nextId=1;pending=new Map;constructor(e=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1))){for(let t=0;t<e;t++){const i={worker:new M1,busy:0};i.worker.onmessage=r=>this.onMessage(r.data),this.slots.push(i)}}get size(){return this.slots.length}get busy(){return this.slots.reduce((e,t)=>e+t.busy,0)}call(e,t,i){const r=i===void 0?this.slots.reduce((s,a)=>a.busy<s.busy?a:s):this.slots[(i%this.slots.length+this.slots.length)%this.slots.length];return this.send(r,e,t)}async broadcast(e,t){return(await Promise.all(this.slots.map(r=>this.send(r,e,t))))[0]}send(e,t,i){const r=this.nextId++;e.busy++;const s={id:r,method:t,params:i};return new Promise((a,o)=>{this.pending.set(r,{slot:e,resolve:a,reject:o}),e.worker.postMessage(s)})}onMessage(e){const t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t.slot.busy--,e.ok?t.resolve(e.result):t.reject(new Error(e.error)))}}class S1{scene;camera;pool=new b1;materials=new m1;highlight;distance=6;chunks=new Map;loading=new Set;generation=0;edits=new Map;greedy=!0;info=null;dayTime=0;daylightCycle=!0;fixedTime=null;lastChunkMs=0;lastRemeshMs=0;lastLightMs=0;dirty=new Set;fluids=new t1({get:(e,t,i)=>this.getBlock(e,t,i),set:(e,t,i,r)=>this.writeBlock(e,t,i,r)});constructor(e,t){this.scene=e,this.camera=t,this.highlight=new n1(e)}async init(e,t){return this.edits.clear(),this.fluids.clear(),this.reload(),this.info=await this.pool.broadcast("init",{seed:e,settings:t}),this.fixedTime=zv(this.info.settings),this.info}reload(){for(const e of this.chunks.values())e.dispose(this.scene);this.chunks.clear(),this.loading.clear(),this.generation++}setGreedy(e){this.greedy=e,this.reload()}setWireframe(e){this.materials.wireframe=e;for(const t of this.chunks.values())for(const i of[...t.meshes,...t.waterMeshes])i&&this.applyWire(i)}applyWire(e){const t=e.children.length>0;if(this.materials.wireframe&&!t){const i=new yt(e.geometry,this.materials.wire);i.renderOrder=2,e.add(i)}else!this.materials.wireframe&&t&&e.clear()}update=()=>{if(!this.info)return;this.flushRemesh(),this.materials.flushTints();const e=Math.floor(this.camera.position.x/Lt),t=Math.floor(this.camera.position.z/Lt),i=(l,c,u)=>(l-e)**2+(c-t)**2<=(this.distance+u+.5)**2;for(const[l,c]of this.chunks)Math.max(Math.abs(c.cx-e),Math.abs(c.cz-t))>this.distance+2&&(c.dispose(this.scene),this.chunks.delete(l));const r=this.pool.size*2;if(this.pool.busy>=r)return;const s=[];for(const l of this.chunks.values())l.light||l.lighting||!i(l.cx,l.cz,0)||this.neighbors(l).every(c=>c)&&s.push([(l.cx-e)**2+(l.cz-t)**2,l]);s.sort((l,c)=>l[0]-c[0]);for(const[,l]of s.slice(0,r-this.pool.busy))this.relight(l);if(this.pool.busy>=r)return;const a=[],o=this.distance+1;for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++){if(!i(e+l,t+c,1))continue;const u=`${e+l},${t+c}`;!this.chunks.has(u)&&!this.loading.has(u)&&a.push([l*l+c*c,e+l,t+c])}a.sort((l,c)=>l[0]-c[0]);for(const[,l,c]of a.slice(0,r-this.pool.busy))this.load(l,c)};neighbors(e){const t=[];for(let i=-1;i<=1;i++)for(let r=-1;r<=1;r++)(r||i)&&t.push(this.chunks.get(`${e.cx+r},${e.cz+i}`));return t}relight(e){const t=[];for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++)t.push(this.chunks.get(`${e.cx+a},${e.cz+s}`));const i=t.map(s=>s.version),r=this.generation;e.lighting=!0,this.pool.call("light",{chunks:t.map(s=>s.flat),greedy:this.greedy}).then(s=>{if(e.lighting=!1,!(r!==this.generation||this.chunks.get(`${e.cx},${e.cz}`)!==e)&&!t.some((a,o)=>a.version!==i[o])){e.light=s.light,this.lastLightMs=s.ms;for(let a=0;a<s.changes.length;a+=2)e.setRaw(s.changes[a],s.changes[a+1]);for(let a=0;a<s.meshes.length;a++)this.setSectionMesh(e,a,s.meshes[a]);this.syncBorders(e)}}).catch(s=>{e.lighting=!1,console.error(`区块 ${e.cx},${e.cz} 光照失败`,s)})}syncBorders(e){for(const t of this.neighbors(e)){if(!t?.light)continue;const i=e.cx-t.cx,r=e.cz-t.cz,s=new Set;for(let a=e.minY;a<e.minY+e.height;a++)for(let o=-1;o<=16;o++)for(let l=-1;l<=16;l++){const c=l-i*16,u=o-r*16;if(c<0||c>15||u<0||u>15)continue;const h=e.light[e.lightIndex(c,a,u)],f=t.lightIndex(l,a,o);t.light[f]!==h&&(t.light[f]=h,s.add(t.sectionIndex(a)))}for(const a of s)for(const o of[a-1,a,a+1])o>=0&&o<t.sections.length&&this.dirty.add(`${t.cx},${t.cz},${o}`)}}tick(){this.fluids.tick(),this.daylightCycle&&this.dayTime++}renderTime(e){return this.fixedTime??this.dayTime+(this.daylightCycle?e:0)}load(e,t){const i=`${e},${t}`,r=this.generation;this.loading.add(i),this.pool.call("chunk",{cx:e,cz:t},E1(e,t)).then(s=>{r===this.generation&&(this.loading.delete(i),this.onChunk(s))}).catch(s=>{r===this.generation&&this.loading.delete(i),console.error(`区块 ${i} 生成失败`,s)})}onChunk(e){const t=this.info,i=e.sections.map(o=>nr.fromData(o)),r=new Sc(e.cx,e.cz,t.minY,t.height,i,e.blocks),s=`${e.cx},${e.cz}`;this.chunks.set(s,r),this.lastChunkMs=e.ms,this.materials.writeTints(e.cx,e.cz,e.tints);const a=this.edits.get(s);if(a)for(const[o,l]of a){const c=o&15,u=o>>4&15,h=(o>>8)+r.minY;r.set(c,h,u,l)}for(const o of e.fluidUpdates){const l=e.cx*16+(o&15),c=e.cz*16+(o>>4&15),u=(o>>8)+r.minY,h=r.get(o&15,u,o>>4&15),f=Fn[h];f!==nt.none&&this.fluids.schedule(l,u,c,f,1)}}getChunk(e,t){return this.chunks.get(`${Math.floor(e/Lt)},${Math.floor(t/Lt)}`)}getBlock(e,t,i){const r=this.getChunk(e,i);return r?r.get(e-r.cx*Lt,t,i-r.cz*Lt):null}isSolidAt(e,t,i){const r=this.getBlock(e,t,i);return r===null?!0:$i(r)}setBlock(e,t,i,r){this.writeBlock(e,t,i,r)&&(this.fluids.blockChanged(e,t,i),this.flushRemesh())}writeBlock(e,t,i,r){const s=this.getChunk(e,i);if(!s||!this.info)return!1;const a=e-s.cx*Lt,o=i-s.cz*Lt;if(t<this.info.minY||t>=this.info.minY+this.info.height)return!1;const l=s.get(a,t,o);s.set(a,t,o,r),s.light&&l!==r&&x1(this.lightWorld,e,t,i,l,r);const c=`${s.cx},${s.cz}`;this.edits.has(c)||this.edits.set(c,new Map),this.edits.get(c).set(Sc.index(a,t,o,s.minY),r);for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){const p=t+h;if(p<this.info.minY||p>=this.info.minY+this.info.height)continue;const m=this.getChunk(e+u,i+f);m&&this.dirty.add(`${m.cx},${m.cz},${m.sectionIndex(p)}`)}return!0}flushRemesh(){if(this.dirty.size===0)return;const e=performance.now();for(const t of this.dirty){const[i,r,s]=t.split(",").map(Number),a=this.chunks.get(`${i},${r}`);a&&this.remeshSection(a,s)}this.dirty.clear(),this.lastRemeshMs=performance.now()-e}lightWorld=(()=>{let e;const t=(r,s)=>{const a=Math.floor(r/16),o=Math.floor(s/16);return e&&e.cx===a&&e.cz===o&&this.chunks.get(`${a},${o}`)===e?e:e=this.chunks.get(`${a},${o}`)},i=this;return{get minY(){return i.info.minY},get maxY(){return i.info.minY+i.info.height},get hasSky(){return i.info.hasSkyLight},block:(r,s,a)=>t(r,a)?.get(r&15,s,a&15)??pt.air,get:(r,s,a)=>{const o=t(r,a);return!o?.light||s<o.minY||s>=o.minY+o.height?-1:o.light[o.lightIndex(r&15,s,a&15)]},set:(r,s,a,o)=>{const l=t(r,a);if(!l?.light)return;const c=r&15,u=a&15;l.light[l.lightIndex(c,s,u)]=o;for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){if(f===0&&h===0)continue;const p=c-f*16,m=u-h*16;if(p<-1||p>16||m<-1||m>16)continue;const g=this.chunks.get(`${l.cx+f},${l.cz+h}`);g?.light&&(g.light[g.lightIndex(p,s,m)]=o)}for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++)for(let p=-1;p<=1;p++){const m=s+p;if(m<l.minY||m>=l.minY+l.height)continue;const g=t(r+f,a+h);g?.light&&this.dirty.add(`${g.cx},${g.cz},${g.sectionIndex(m)}`)}}}})();lightAt(e,t,i){const r=this.lightWorld.get(e,t,i);return r<0?t>=(this.info?.minY??0)+(this.info?.height??0)&&this.getChunk(e,i)?.light?{sky:this.info.hasSkyLight?15:0,block:0}:null:{sky:r&15,block:r>>4}}topSolidY(e,t){const i=this.getChunk(e,t);if(!i)return null;const r=e-i.cx*Lt,s=t-i.cz*Lt;for(let a=i.sections.length-1;a>=0;a--)if(!i.sections[a].isEmpty){for(let o=15;o>=0;o--)if($i(i.sections[a].get(r,o,s)))return i.minY+a*16+o}return i.minY}floorBelow(e,t,i){const r=this.getChunk(e,t);if(!r)return null;for(let s=i;s>r.minY+1;s--){const a=o=>this.getBlock(e,o,t)??0;if($i(a(s-1))&&!$i(a(s))&&!$i(a(s+1))&&Fn[a(s)]===nt.none)return s-1}return null}remeshSection(e,t){if(!e.light)return;const i=new Uint16Array($n*$n*$n);this.fillNeighborhood(e,t,i)?e.staleSections.delete(t):e.staleSections.add(t);const r=new Uint8Array($n*$n*$n);a1(e.light,e.height,t,this.info.hasSkyLight,r);const s=l1(i,{greedy:this.greedy,light:r});this.setSectionMesh(e,t,s.opaque.indices.length+s.water.indices.length>0?s:null)}fillNeighborhood(e,t,i){const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++)r.push(this.chunks.get(`${e.cx+o},${e.cz+a}`));const s=e.minY+t*16;for(let a=-1;a<=16;a++)for(let o=-1;o<=16;o++){const l=o<0?-1:o>15?1:0;for(let c=-1;c<=16;c++){const u=c<0?-1:c>15?1:0,h=r[(l+1)*3+(u+1)];i[Dt(c,a,o)]=h?h.get(c-u*16,s+a,o-l*16):pt.air}}return!r.includes(void 0)}setSectionMesh(e,t,i){e.disposeSection(this.scene,t),i&&(e.meshes[t]=this.toMesh(i.opaque,this.materials.opaque,e,t),e.waterMeshes[t]=this.toMesh(i.water,this.materials.water,e,t),e.waterMeshes[t]&&(e.waterMeshes[t].renderOrder=1))}toMesh(e,t,i,r){if(e.indices.length===0)return null;const s=new pn;s.setAttribute("position",new At(e.positions,3)),s.setAttribute("info",new At(e.info,4)),s.setAttribute("light",new At(e.light,2)),s.setIndex(new At(e.indices,1));const a=16*Ri;s.boundingBox=new dr(new F(0,0,0),new F(a,a,a)),s.boundingSphere=new Is(new F(8,8,8),8*Math.sqrt(3));const o=new yt(s,t);return o.position.set(i.cx*Lt,i.minY+r*16,i.cz*Lt),o.matrixAutoUpdate=!1,o.updateMatrix(),this.applyWire(o),this.scene.add(o),o}get stats(){let e=0,t=0,i=0,r=0,s=0;for(const l of this.chunks.values()){e+=l.byteSize;for(const c of[...l.meshes,...l.waterMeshes]){if(!c)continue;i++;const u=c.geometry;for(const h of[u.attributes.position,u.attributes.info,u.attributes.light,u.index])t+=h.array.byteLength;r+=u.attributes.position.count,s+=u.index.count/6}}const a=this.info?.height??0;let o=0;for(const l of this.chunks.values())l.light&&o++;return{loaded:this.chunks.size,lit:o,loading:this.loading.size,bytes:e,v0Bytes:this.chunks.size*16*16*a,meshBytes:t,fluidQueue:this.fluids.queued,sectionMeshes:i,vertices:r,quads:s}}}function E1(n,e){const t=Math.floor(n/4),i=Math.floor(e/4);return(Math.imul(t,73856093)^Math.imul(i,19349663))>>>0}const w1=[0,9551193,4764952,4159204];let Rr=null;function ya(n,e){Rr??=Mu();const t=document.createElement("canvas");t.width=t.height=fe;const i=new ImageData(fe,fe),r=n*fe*fe*4,s=w1[bu[n]&3],a=[s>>16&255,s>>8&255,s&255].map(o=>o/255);for(let o=0;o<fe*fe*4;o+=4){const l=s!==0&&Rr[r+o+3]<255;i.data[o]=Rr[r+o]*e*(l?a[0]:1),i.data[o+1]=Rr[r+o+1]*e*(l?a[1]:1),i.data[o+2]=Rr[r+o+2]*e*(l?a[2]:1),i.data[o+3]=255}return t.getContext("2d").putImageData(i,0,0),t}const Rc=new Map;function y1(n){const e=Rc.get(n);if(e)return e;const{top:t,side:i}=St[n].textures,r=64,s=document.createElement("canvas");s.width=s.height=r;const a=s.getContext("2d");a.imageSmoothingEnabled=!1;const o=r/2,l=o/fe,c=o/2;a.setTransform(l,l/2,-l,l/2,o,0),a.drawImage(ya(ee[t],1),0,0),a.setTransform(l,l/2,0,l,0,c),a.drawImage(ya(ee[i],.8),0,0),a.setTransform(l,-l/2,0,l,o,o),a.drawImage(ya(ee[i],.6),0,0);const u=s.toDataURL();return Rc.set(n,u),u}const A1=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),Ut=n=>document.getElementById(n),Cc=n=>new URLSearchParams(location.search).get(n);class T1{constructor(e,t,i){this.core=e,this.terrain=t,this.control=i,this.el=document.getElementById("f3"),document.addEventListener("keydown",r=>{r.code==="F3"?(r.preventDefault(),this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible)):r.code==="KeyG"?this.terrain.setGreedy(!this.terrain.greedy):r.code==="KeyK"&&this.terrain.setWireframe(!this.terrain.materials.wireframe)})}el;visible=!1;lightLine(e,t,i){const r=this.terrain.lightAt(e,t,i);return r?`Client Light: ${Math.max(r.sky,r.block)} (${r.sky} sky, ${r.block} block)`:"Client Light: （区块还没点亮）"}timeLine(){const e=this.terrain.dayTime,t=Math.floor(e/24e3),i=(e%24e3+24e3)%24e3,r=Math.floor((i/1e3+6)%24*60),s=String(Math.floor(r/60)).padStart(2,"0"),a=String(r%60).padStart(2,"0"),o=this.terrain.fixedTime!==null?`（这个维度的时间固定在 ${this.terrain.fixedTime}）`:this.terrain.daylightCycle?"":"（昼夜循环已关）";return`时间: 第 ${t} 天 ${s}:${a}  dayTime ${e}${o}`}biome="…";routerLine="";lastQuery=0;querying=!1;speed(){const e=this.control.player,t={x:e.pos.x-e.prevPos.x,y:e.pos.y-e.prevPos.y,z:e.pos.z-e.prevPos.z};return`水平 ${(Math.hypot(t.x,t.z)*20).toFixed(2)}  竖直 ${(t.y*20).toFixed(2)} 格/秒`}update(e){if(!this.visible)return;const t=performance.now(),i=this.control.feet,r=Math.floor(i.x),s=Math.floor(i.y),a=Math.floor(i.z);!this.querying&&t-this.lastQuery>250&&this.terrain.info&&(this.querying=!0,this.lastQuery=t,this.terrain.pool.call("f3",{x:r,y:s,z:a}).then(g=>{this.routerLine=g.line,this.biome=g.biome}).finally(()=>this.querying=!1));const o=this.terrain.info,l=this.control.target,c=l?this.terrain.getBlock(l.x,l.y,l.z)??0:0,u=l?`${St[Qn[c]].name} ${yu(c).replace("minecraft:","")}`:"—",h=this.terrain.stats,f=this.core.renderer.info.render,p=g=>(g/1048576).toFixed(1)+" MB",m=[`mc-replica v7 (${e} fps, 20 TPS)`,`种子: ${o?.seed??"…"}    noise_settings: ${o?.settings??"…"}`,`区块: ${h.loaded} 已加载（${h.lit} 已点亮）, ${h.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 光照+网格 ${this.terrain.lastLightMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,`方块数据: ${p(h.bytes)}（v0 的存法要 ${p(h.v0Bytes)}）`,`网格: ${this.terrain.greedy?"贪婪":"逐面"} [G]${this.terrain.materials.wireframe?" 线框":""} [K]  ${h.sectionMeshes} 个 section 网格, ${h.quads.toLocaleString()} 个四边形, ${p(h.meshBytes)}`,`本帧: ${f.calls} 次绘制, ${f.triangles.toLocaleString()} 个三角形`,`流体: ${h.fluidQueue} 个待更新, 上个 tick 处理 ${this.terrain.fluids.lastProcessed} 个`,"",`XYZ: ${i.x.toFixed(3)} / ${i.y.toFixed(5)} / ${i.z.toFixed(3)}`,`Block: ${r} ${s} ${a}`,`Chunk: ${Math.floor(r/Lt)} ${Math.floor(a/Lt)}  (区块内 ${r&15} ${a&15})`,`Facing: ${this.control.facing}`,`Biome: ${this.biome}`,this.lightLine(r,s,a),this.timeLine(),`状态: ${this.control.player.state}${this.control.player.onGround?"  落地":""}    速度: ${this.speed()}`,"",this.routerLine,"",`准星: ${u}${l?`  (${l.x}, ${l.y}, ${l.z})`:""}`];this.el.textContent=m.join(`
`)}}const Yn=160,R1=[33,82,160],qi=[242,240,232],C1=[176,92,34];class P1{constructor(e,t){this.terrain=e,this.control=t,this.el=document.getElementById("noiseMap"),this.canvas=this.el.querySelector("canvas"),this.select=this.el.querySelector("select.field"),this.scaleSelect=this.el.querySelector("select.scale"),this.legend=this.el.querySelector(".legend"),document.addEventListener("keydown",i=>{this.control.control.isLocked&&(i.code==="KeyM"&&this.toggle(),this.visible&&(i.code==="KeyN"&&this.cycle(this.select,1),i.code==="Equal"&&this.cycle(this.scaleSelect,-1),i.code==="Minus"&&this.cycle(this.scaleSelect,1)))}),this.select.addEventListener("change",()=>this.refresh(!0)),this.scaleSelect.addEventListener("change",()=>this.refresh(!0))}el;canvas;select;scaleSelect;legend;visible=!1;busy=!1;last={x:NaN,z:NaN,field:"",step:0};image=null;setFields(e){this.select.innerHTML=e.map(t=>`<option>${t}</option>`).join(""),this.select.value=e.includes("continents")?"continents":e[0]}cycle(e,t){const i=e.options.length;e.selectedIndex=(e.selectedIndex+t+i)%i,this.refresh(!0)}toggle(){this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible),this.visible&&this.refresh(!0)}update(){this.visible&&(this.refresh(!1),this.draw())}refresh(e){const t=this.control.feet,i=Number(this.scaleSelect.value),r=Math.max(Math.abs(t.x-this.last.x),Math.abs(t.z-this.last.z))>Yn*i/8;if(this.busy||!this.terrain.info||!(e||r||this.select.value!==this.last.field))return;this.busy=!0;const s={field:this.select.value,cx:Math.floor(t.x),cy:Math.floor(t.y),cz:Math.floor(t.z),size:Yn,step:i};this.last={x:s.cx,z:s.cz,field:s.field,step:i},this.terrain.pool.call("slice",s).then(a=>this.paint(a.values,a.min,a.max)).catch(a=>console.error(a)).finally(()=>this.busy=!1)}paint(e,t,i){const r=new ImageData(Yn,Yn),s=Math.max(Math.abs(t),Math.abs(i))||1;for(let a=0;a<e.length;a++){const o=Math.max(-1,Math.min(1,e[a]/s)),l=o<0?R1:C1,c=Math.abs(o);r.data[a*4]=qi[0]+(l[0]-qi[0])*c,r.data[a*4+1]=qi[1]+(l[1]-qi[1])*c,r.data[a*4+2]=qi[2]+(l[2]-qi[2])*c,r.data[a*4+3]=255}this.image=r,this.legend.textContent=`${(-s).toFixed(3)}  …  0  …  ${s.toFixed(3)}    每像素 ${this.last.step} 格`}draw(){if(!this.image)return;const e=this.canvas.getContext("2d");this.canvas.width=Yn,this.canvas.height=Yn,e.putImageData(this.image,0,0);const t=this.control.feet,i=Yn/2+(t.x-this.last.x)/this.last.step,r=Yn/2+(t.z-this.last.z)/this.last.step,s=this.control.camera.getWorldDirection(new F);e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(i-4,r),e.lineTo(i+4,r),e.moveTo(i,r-4),e.lineTo(i,r+4),e.moveTo(i,r),e.lineTo(i+s.x*12,r+s.z*12),e.stroke()}}class L1{constructor(e,t,i,r){this.core=e,this.terrain=t,this.control=i,this.sky=r,this.f3=new T1(e,t,i),this.noiseMap=new P1(t,i),this.initMenu(),this.initHotbar()}f3;noiseMap;menu=Ut("menu");playButton=Ut("play");status=Ut("loadingStatus");hotbar=Ut("hotbar");frames=0;fps=0;fpsTime=performance.now();lastSlot=-1;timeInput=null;initMenu=()=>{const e=Ut("seedInput"),t=Ut("distance"),i=new URLSearchParams(location.search);e.value=i.get("seed")??"42",t.value=String(this.terrain.distance),this.playButton.addEventListener("click",()=>{if(A1)return alert("暂不支持手机，请用电脑浏览器打开");this.control.control.lock()}),this.control.control.addEventListener("lock",()=>this.menu.classList.add("hidden")),this.control.control.addEventListener("unlock",()=>{this.menu.classList.remove("hidden"),this.playButton.textContent="继续游戏"}),Ut("regenerate").addEventListener("click",()=>{const l=new URLSearchParams({seed:e.value.trim()||"42",settings:Ut("settingsSelect").value,distance:t.value});location.search=l.toString()}),t.addEventListener("change",()=>this.setDistance(Number(t.value)));const r=Ut("bobbing");r.addEventListener("change",()=>this.control.bobbing=r.checked);const s=Ut("timeInput"),a=Ut("daylightCycle"),o=Ut("gamma");s.addEventListener("input",()=>this.terrain.dayTime=Number(s.value)),a.addEventListener("change",()=>this.terrain.daylightCycle=a.checked),o.addEventListener("change",()=>this.sky.gamma=Number(o.value)),i.get("time")&&(this.terrain.dayTime=Number(i.get("time"))),this.timeInput=s,i.get("distance")&&(t.value=i.get("distance"),this.setDistance(Number(t.value)))};setDistance(e){this.terrain.distance=e,this.core.setFogDistance(e*16)}onWorldReady(e){Ut("settingsSelect").innerHTML=e.allSettings.map(i=>`<option${i===e.settings?" selected":""}>${i}</option>`).join("");const t=e.packs.some(i=>i.name!=="builtin");Ut("worldInfo").textContent=`种子 ${e.seed} · ${e.settings}`+(t?"":" · 没有检测到原版数据包，正在使用 demo 简化地形（见 datapacks/README.md）"),this.noiseMap.setFields(e.routerFields),this.setDistance(this.terrain.distance)}initHotbar=()=>{this.hotbar.innerHTML=fo.map((e,t)=>`<div class="slot" title="${St[e].name}"><img src="${y1(e)}" alt=""><span>${t+1}</span></div>`).join("")};update=()=>{this.frames++;const e=performance.now();if(e-this.fpsTime>=1e3&&(this.fps=Math.round(this.frames*1e3/(e-this.fpsTime)),this.frames=0,this.fpsTime=e),this.control.slot!==this.lastSlot&&(this.lastSlot=this.control.slot,this.hotbar.querySelectorAll(".slot").forEach((t,i)=>t.classList.toggle("on",i===this.lastSlot)),Ut("slotName").textContent=St[fo[this.lastSlot]].name),this.control.spawned)this.playButton.disabled&&(this.status.textContent="准备好了",this.playButton.disabled=!1);else{const{loaded:t}=this.terrain.stats;this.status.textContent=this.terrain.info?`正在生成出生点附近的区块…（已完成 ${t} 个）`:"正在读取数据包…",this.playButton.disabled=!0}this.core.setMedium(this.control.medium),this.timeInput&&!this.menu.classList.contains("hidden")&&document.activeElement!==this.timeInput&&(this.timeInput.value=String((this.terrain.dayTime%24e3+24e3)%24e3)),this.f3.update(this.fps),this.noiseMap.update()}}const ei=new Rs,ir=ei.camera,Uo=ei.scene,Aa=ei.renderer,Lu=new Ym,un=new S1(Uo,ir),Ps=new Ov(Uo,ir,Lu,un),ti=new Jv,No=new L1(ei,un,Ps,ti);un.init(Cc("seed")??"42",Cc("settings")??"").then(n=>{ti.setDimension(n.settings),No.onWorldReady(n)});let Pc=0;function D1(n){if(!un.info||n-Pc<500)return;Pc=n;const e=ir.position;un.pool.call("skyColors",{x:Math.floor(e.x),y:Math.floor(e.y),z:Math.floor(e.z)}).then(t=>{ti.biomeSky=t.sky,ti.biomeFog=t.fog})}const I1=new Om;(function n(){requestAnimationFrame(n);const e=I1.getDelta();Ps.update(e),un.update(),No.update(),D1(performance.now());const t=ti.update(un.renderTime(Ps.partialTick),ir,un.distance,un.info?.minY??-64);ei.setAirFog(t.color,t.start,t.end),un.materials.setLightmap(t.lightmap,ti.dim==="nether"),ti.render(Aa,ir,ei.fogColor,ei.medium==="air"),Aa.clearDepth(),Aa.render(Uo,ir)})();Object.assign(window,{game:{core:ei,player:Lu,terrain:un,control:Ps,ui:No,sky:ti}});
//# sourceMappingURL=index-CTRMTZwn.js.map
