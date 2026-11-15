(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xa="170",Zc=0,So=1,jc=2,nc=1,Jc=2,wn=3,Xn=0,Ot=1,pn=2,Bn=0,Fi=1,Eo=2,yo=3,wo=4,Qc=5,si=100,eh=101,th=102,nh=103,ih=104,rh=200,sh=201,ah=202,oh=203,na=204,ia=205,lh=206,ch=207,hh=208,uh=209,dh=210,fh=211,ph=212,_h=213,mh=214,ra=0,sa=1,aa=2,Hi=3,oa=4,la=5,ca=6,ha=7,ic=0,gh=1,vh=2,Wn=0,xh=1,Mh=2,bh=3,Sh=4,Eh=5,yh=6,wh=7,rc=300,Gi=301,Vi=302,ua=303,da=304,os=306,is=1e3,oi=1001,fa=1002,Dt=1003,Ah=1004,lr=1005,_n=1006,ms=1007,li=1008,an=1009,sc=1010,ac=1011,pr=1012,Ya=1013,hi=1014,An=1015,mr=1016,qa=1017,$a=1018,Bi=1020,oc=35902,lc=1021,cc=1022,Vt=1023,hc=1024,uc=1025,Oi=1026,Wi=1027,dc=1028,Ka=1029,fc=1030,Za=1031,ja=1033,Zr=33776,jr=33777,Jr=33778,Qr=33779,pa=35840,_a=35841,ma=35842,ga=35843,va=36196,xa=37492,Ma=37496,ba=37808,Sa=37809,Ea=37810,ya=37811,wa=37812,Aa=37813,Ta=37814,Ra=37815,Ca=37816,Pa=37817,La=37818,Da=37819,Ia=37820,Ua=37821,es=36492,Na=36494,Fa=36495,pc=36283,Oa=36284,za=36285,ka=36286,Th=3200,Rh=3201,Ch=0,Ph=1,Gn="",Kt="srgb",di="srgb-linear",ls="linear",nt="srgb",mi=7680,Ao=519,Lh=512,Dh=513,Ih=514,_c=515,Uh=516,Nh=517,Fh=518,Oh=519,To=35044,Ro="300 es",Tn=2e3,rs=2001;class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gs=Math.PI/180,Ha=180/Math.PI;function gr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]).toLowerCase()}function Ft(n,e,t){return Math.max(e,Math.min(t,n))}function zh(n,e){return(n%e+e)%e}function vs(n,e,t){return(1-t)*n+t*e}function Ji(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,t=0){rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,i,r,s,a,o,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],_=i[5],m=i[8],g=r[0],p=r[3],f=r[6],w=r[1],y=r[4],b=r[7],U=r[2],A=r[5],T=r[8];return s[0]=a*g+o*w+l*U,s[3]=a*p+o*y+l*A,s[6]=a*f+o*b+l*T,s[1]=c*g+h*w+u*U,s[4]=c*p+h*y+u*A,s[7]=c*f+h*b+u*T,s[2]=d*g+_*w+m*U,s[5]=d*p+_*y+m*A,s[8]=d*f+_*b+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,_=c*s-a*l,m=t*u+i*d+r*_;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return e[0]=u*g,e[1]=(r*c-h*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(h*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=_*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(xs.makeScale(e,t)),this}rotate(e){return this.premultiply(xs.makeRotation(-e)),this}translate(e,t){return this.premultiply(xs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xs=new Fe;function mc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kh(){const n=ss("canvas");return n.style.display="block",n}const Co={};function cr(n){n in Co||(Co[n]=!0,console.warn(n))}function Hh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Gh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Vh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ye={enabled:!0,workingColorSpace:di,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===nt&&(n.r=Rn(n.r),n.g=Rn(n.g),n.b=Rn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===nt&&(n.r=zi(n.r),n.g=zi(n.g),n.b=zi(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Gn?ls:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Rn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Po=[.64,.33,.3,.6,.15,.06],Lo=[.2126,.7152,.0722],Do=[.3127,.329],Io=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uo=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ye.define({[di]:{primaries:Po,whitePoint:Do,transfer:ls,toXYZ:Io,fromXYZ:Uo,luminanceCoefficients:Lo,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:Po,whitePoint:Do,transfer:nt,toXYZ:Io,fromXYZ:Uo,luminanceCoefficients:Lo,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}});let gi;class Bh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=ss("canvas")),gi.width=e.width,gi.height=e.height;const i=gi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ss("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Rn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Rn(t[i]/255)*255):t[i]=Rn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wh=0;class gc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ms(r[a].image)):s.push(Ms(r[a]))}else s=Ms(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ms(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Bh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;class It extends fi{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,i=oi,r=oi,s=_n,a=li,o=Vt,l=an,c=It.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=gr(),this.name="",this.source=new gc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case is:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case is:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=rc;It.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],_=l[5],m=l[9],g=l[2],p=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(m+p)<.1&&Math.abs(c+_+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,b=(_+1)/2,U=(f+1)/2,A=(h+d)/4,T=(u+g)/4,I=(m+p)/4;return y>b&&y>U?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=T/i):b>U?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=A/r,s=I/r):U<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(U),i=T/s,r=I/s),this.set(i,r,s,t),this}let w=Math.sqrt((p-m)*(p-m)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(p-m)/w,this.y=(u-g)/w,this.z=(d-h)/w,this.w=Math.acos((c+_+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yh extends fi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new It(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new gc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends Yh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ja extends It{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qh extends It{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const d=s[a+0],_=s[a+1],m=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=_,e[t+2]=m,e[t+3]=g;return}if(u!==g||l!==d||c!==_||h!==m){let p=1-o;const f=l*d+c*_+h*m+u*g,w=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const U=Math.sqrt(y),A=Math.atan2(U,f*w);p=Math.sin(p*A)/U,o=Math.sin(o*A)/U}const b=o*w;if(l=l*p+d*b,c=c*p+_*b,h=h*p+m*b,u=u*p+g*b,p===1-o){const U=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=U,c*=U,h*=U,u*=U}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[a],d=s[a+1],_=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*_-c*d,e[t+1]=l*m+h*d+c*u-o*_,e[t+2]=c*m+h*_+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),u=o(s/2),d=l(i/2),_=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*_*m,this._y=c*_*u-d*h*m,this._z=c*h*m+d*_*u,this._w=c*h*u-d*_*m;break;case"YXZ":this._x=d*h*u+c*_*m,this._y=c*_*u-d*h*m,this._z=c*h*m-d*_*u,this._w=c*h*u+d*_*m;break;case"ZXY":this._x=d*h*u-c*_*m,this._y=c*_*u+d*h*m,this._z=c*h*m+d*_*u,this._w=c*h*u-d*_*m;break;case"ZYX":this._x=d*h*u-c*_*m,this._y=c*_*u+d*h*m,this._z=c*h*m-d*_*u,this._w=c*h*u+d*_*m;break;case"YZX":this._x=d*h*u+c*_*m,this._y=c*_*u+d*h*m,this._z=c*h*m-d*_*u,this._w=c*h*u-d*_*m;break;case"XZY":this._x=d*h*u-c*_*m,this._y=c*_*u-d*h*m,this._z=c*h*m+d*_*u,this._w=c*h*u+d*_*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const _=.5/Math.sqrt(d+1);this._w=.25/_,this._x=(h-l)*_,this._y=(s-c)*_,this._z=(a-r)*_}else if(i>o&&i>u){const _=2*Math.sqrt(1+i-o-u);this._w=(h-l)/_,this._x=.25*_,this._y=(r+a)/_,this._z=(s+c)/_}else if(o>u){const _=2*Math.sqrt(1+o-i-u);this._w=(s-c)/_,this._x=(r+a)/_,this._y=.25*_,this._z=(l+h)/_}else{const _=2*Math.sqrt(1+u-i-o);this._w=(a-r)/_,this._x=(s+c)/_,this._y=(l+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const _=1-t;return this._w=_*a+t*this._w,this._x=_*i+t*this._x,this._y=_*r+t*this._y,this._z=_*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(No.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(No.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),u=2*(s*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bs.copy(this).projectOnVector(e),this.sub(bs)}reflect(e){return this.sub(bs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bs=new O,No=new vr;class qi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(s,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yr.copy(i.boundingBox)),yr.applyMatrix4(e.matrixWorld),this.union(yr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),wr.subVectors(this.max,Qi),vi.subVectors(e.a,Qi),xi.subVectors(e.b,Qi),Mi.subVectors(e.c,Qi),Un.subVectors(xi,vi),Nn.subVectors(Mi,xi),Kn.subVectors(vi,Mi);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Kn.z,Kn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Kn.z,0,-Kn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Kn.y,Kn.x,0];return!Ss(t,vi,xi,Mi,wr)||(t=[1,0,0,0,1,0,0,0,1],!Ss(t,vi,xi,Mi,wr))?!1:(Ar.crossVectors(Un,Nn),t=[Ar.x,Ar.y,Ar.z],Ss(t,vi,xi,Mi,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new O,new O,new O,new O,new O,new O,new O,new O],en=new O,yr=new qi,vi=new O,xi=new O,Mi=new O,Un=new O,Nn=new O,Kn=new O,Qi=new O,wr=new O,Ar=new O,Zn=new O;function Ss(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Zn.fromArray(n,s);const o=r.x*Math.abs(Zn.x)+r.y*Math.abs(Zn.y)+r.z*Math.abs(Zn.z),l=e.dot(Zn),c=t.dot(Zn),h=i.dot(Zn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const $h=new qi,er=new O,Es=new O;class cs{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):$h.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(er,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Es.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(Es)),this.expandByPoint(er.copy(e.center).sub(Es))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new O,ys=new O,Tr=new O,Fn=new O,ws=new O,Rr=new O,As=new O;class Kh{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ys.copy(e).add(t).multiplyScalar(.5),Tr.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(ys);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Tr),o=Fn.dot(this.direction),l=-Fn.dot(Tr),c=Fn.lengthSq(),h=Math.abs(1-a*a);let u,d,_,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const g=1/h;u*=g,d*=g,_=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),_=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),_=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),_=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),_=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),_=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),_=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ys).addScaledVector(Tr,d),_}intersectSphere(e,t){Mn.subVectors(e.center,this.origin);const i=Mn.dot(this.direction),r=Mn.dot(Mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,i,r,s){ws.subVectors(t,e),Rr.subVectors(i,e),As.crossVectors(ws,Rr);let a=this.direction.dot(As),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,e);const l=o*this.direction.dot(Rr.crossVectors(Fn,Rr));if(l<0)return null;const c=o*this.direction.dot(ws.cross(Fn));if(c<0||l+c>a)return null;const h=-o*Fn.dot(As);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,i,r,s,a,o,l,c,h,u,d,_,m,g,p){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,u,d,_,m,g,p)}set(e,t,i,r,s,a,o,l,c,h,u,d,_,m,g,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=_,f[7]=m,f[11]=g,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/bi.setFromMatrixColumn(e,0).length(),s=1/bi.setFromMatrixColumn(e,1).length(),a=1/bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,_=a*u,m=o*h,g=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=_+m*c,t[5]=d-g*c,t[9]=-o*l,t[2]=g-d*c,t[6]=m+_*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,_=l*u,m=c*h,g=c*u;t[0]=d+g*o,t[4]=m*o-_,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=_*o-m,t[6]=g+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,_=l*u,m=c*h,g=c*u;t[0]=d-g*o,t[4]=-a*u,t[8]=m+_*o,t[1]=_+m*o,t[5]=a*h,t[9]=g-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,_=a*u,m=o*h,g=o*u;t[0]=l*h,t[4]=m*c-_,t[8]=d*c+g,t[1]=l*u,t[5]=g*c+d,t[9]=_*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,_=a*c,m=o*l,g=o*c;t[0]=l*h,t[4]=g-d*u,t[8]=m*u+_,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=_*u+m,t[10]=d-g*u}else if(e.order==="XZY"){const d=a*l,_=a*c,m=o*l,g=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+g,t[5]=a*h,t[9]=_*u-m,t[2]=m*u-_,t[6]=o*h,t[10]=g*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zh,e,jh)}lookAt(e,t,i){const r=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),On.crossVectors(i,Ht),On.lengthSq()===0&&(Math.abs(i.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),On.crossVectors(i,Ht)),On.normalize(),Cr.crossVectors(Ht,On),r[0]=On.x,r[4]=Cr.x,r[8]=Ht.x,r[1]=On.y,r[5]=Cr.y,r[9]=Ht.y,r[2]=On.z,r[6]=Cr.z,r[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],_=i[13],m=i[2],g=i[6],p=i[10],f=i[14],w=i[3],y=i[7],b=i[11],U=i[15],A=r[0],T=r[4],I=r[8],S=r[12],M=r[1],R=r[5],W=r[9],F=r[13],X=r[2],j=r[6],Y=r[10],ee=r[14],V=r[3],le=r[7],me=r[11],Ae=r[15];return s[0]=a*A+o*M+l*X+c*V,s[4]=a*T+o*R+l*j+c*le,s[8]=a*I+o*W+l*Y+c*me,s[12]=a*S+o*F+l*ee+c*Ae,s[1]=h*A+u*M+d*X+_*V,s[5]=h*T+u*R+d*j+_*le,s[9]=h*I+u*W+d*Y+_*me,s[13]=h*S+u*F+d*ee+_*Ae,s[2]=m*A+g*M+p*X+f*V,s[6]=m*T+g*R+p*j+f*le,s[10]=m*I+g*W+p*Y+f*me,s[14]=m*S+g*F+p*ee+f*Ae,s[3]=w*A+y*M+b*X+U*V,s[7]=w*T+y*R+b*j+U*le,s[11]=w*I+y*W+b*Y+U*me,s[15]=w*S+y*F+b*ee+U*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],_=e[14],m=e[3],g=e[7],p=e[11],f=e[15];return m*(+s*l*u-r*c*u-s*o*d+i*c*d+r*o*_-i*l*_)+g*(+t*l*_-t*c*d+s*a*d-r*a*_+r*c*h-s*l*h)+p*(+t*c*u-t*o*_-s*a*u+i*a*_+s*o*h-i*c*h)+f*(-r*o*h-t*l*u+t*o*d+r*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],_=e[11],m=e[12],g=e[13],p=e[14],f=e[15],w=u*p*c-g*d*c+g*l*_-o*p*_-u*l*f+o*d*f,y=m*d*c-h*p*c-m*l*_+a*p*_+h*l*f-a*d*f,b=h*g*c-m*u*c+m*o*_-a*g*_-h*o*f+a*u*f,U=m*u*l-h*g*l-m*o*d+a*g*d+h*o*p-a*u*p,A=t*w+i*y+r*b+s*U;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=w*T,e[1]=(g*d*s-u*p*s-g*r*_+i*p*_+u*r*f-i*d*f)*T,e[2]=(o*p*s-g*l*s+g*r*c-i*p*c-o*r*f+i*l*f)*T,e[3]=(u*l*s-o*d*s-u*r*c+i*d*c+o*r*_-i*l*_)*T,e[4]=y*T,e[5]=(h*p*s-m*d*s+m*r*_-t*p*_-h*r*f+t*d*f)*T,e[6]=(m*l*s-a*p*s-m*r*c+t*p*c+a*r*f-t*l*f)*T,e[7]=(a*d*s-h*l*s+h*r*c-t*d*c-a*r*_+t*l*_)*T,e[8]=b*T,e[9]=(m*u*s-h*g*s-m*i*_+t*g*_+h*i*f-t*u*f)*T,e[10]=(a*g*s-m*o*s+m*i*c-t*g*c-a*i*f+t*o*f)*T,e[11]=(h*o*s-a*u*s-h*i*c+t*u*c+a*i*_-t*o*_)*T,e[12]=U*T,e[13]=(h*g*r-m*u*r+m*i*d-t*g*d-h*i*p+t*u*p)*T,e[14]=(m*o*r-a*g*r-m*i*l+t*g*l+a*i*p-t*o*p)*T,e[15]=(a*u*r-h*o*r+h*i*l-t*u*l-a*i*d+t*o*d)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,_=s*h,m=s*u,g=a*h,p=a*u,f=o*u,w=l*c,y=l*h,b=l*u,U=i.x,A=i.y,T=i.z;return r[0]=(1-(g+f))*U,r[1]=(_+b)*U,r[2]=(m-y)*U,r[3]=0,r[4]=(_-b)*A,r[5]=(1-(d+f))*A,r[6]=(p+w)*A,r[7]=0,r[8]=(m+y)*T,r[9]=(p-w)*T,r[10]=(1-(d+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=bi.set(r[0],r[1],r[2]).length();const a=bi.set(r[4],r[5],r[6]).length(),o=bi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],tn.copy(this);const c=1/s,h=1/a,u=1/o;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Tn){const l=this.elements,c=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),d=(i+r)/(i-r);let _,m;if(o===Tn)_=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===rs)_=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Tn){const l=this.elements,c=1/(t-e),h=1/(i-r),u=1/(a-s),d=(t+e)*c,_=(i+r)*h;let m,g;if(o===Tn)m=(a+s)*u,g=-2*u;else if(o===rs)m=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-_,l[2]=0,l[6]=0,l[10]=g,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const bi=new O,tn=new xt,Zh=new O(0,0,0),jh=new O(1,1,1),On=new O,Cr=new O,Ht=new O,Fo=new xt,Oo=new vr;class on{constructor(e=0,t=0,i=0,r=on.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],_=r[10];switch(t){case"XYZ":this._y=Math.asin(Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,_),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,_),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,_));break;case"XZY":this._z=Math.asin(-Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Fo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class vc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jh=0;const zo=new O,Si=new vr,bn=new xt,Pr=new O,tr=new O,Qh=new O,eu=new vr,ko=new O(1,0,0),Ho=new O(0,1,0),Go=new O(0,0,1),Vo={type:"added"},tu={type:"removed"},Ei={type:"childadded",child:null},Ts={type:"childremoved",child:null};class zt extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new O,t=new on,i=new vr,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new Fe}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(ko,e)}rotateY(e){return this.rotateOnAxis(Ho,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return zo.copy(e).applyQuaternion(this.quaternion),this.position.add(zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ko,e)}translateY(e){return this.translateOnAxis(Ho,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pr.copy(e):Pr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(tr,Pr,this.up):bn.lookAt(Pr,tr,this.up),this.quaternion.setFromRotationMatrix(bn),r&&(bn.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(bn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vo),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tu),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vo),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Qh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,eu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),_=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),_.length>0&&(i.animations=_),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}zt.DEFAULT_UP=new O(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new O,Sn=new O,Rs=new O,En=new O,yi=new O,wi=new O,Bo=new O,Cs=new O,Ps=new O,Ls=new O,Ds=new gt,Is=new gt,Us=new gt;class rn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),nn.subVectors(e,t),r.cross(nn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){nn.subVectors(r,t),Sn.subVectors(i,t),Rs.subVectors(e,t);const a=nn.dot(nn),o=nn.dot(Sn),l=nn.dot(Rs),c=Sn.dot(Sn),h=Sn.dot(Rs),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,_=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-_-m,m,_)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ds.setScalar(0),Is.setScalar(0),Us.setScalar(0),Ds.fromBufferAttribute(e,t),Is.fromBufferAttribute(e,i),Us.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ds,s.x),a.addScaledVector(Is,s.y),a.addScaledVector(Us,s.z),a}static isFrontFacing(e,t,i,r){return nn.subVectors(i,t),Sn.subVectors(e,t),nn.cross(Sn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),nn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return rn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;yi.subVectors(r,i),wi.subVectors(s,i),Cs.subVectors(e,i);const l=yi.dot(Cs),c=wi.dot(Cs);if(l<=0&&c<=0)return t.copy(i);Ps.subVectors(e,r);const h=yi.dot(Ps),u=wi.dot(Ps);if(h>=0&&u<=h)return t.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(yi,a);Ls.subVectors(e,s);const _=yi.dot(Ls),m=wi.dot(Ls);if(m>=0&&_<=m)return t.copy(s);const g=_*c-l*m;if(g<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(wi,o);const p=h*m-_*u;if(p<=0&&u-h>=0&&_-m>=0)return Bo.subVectors(s,r),o=(u-h)/(u-h+(_-m)),t.copy(r).addScaledVector(Bo,o);const f=1/(p+g+d);return a=g*f,o=d*f,t.copy(i).addScaledVector(yi,a).addScaledVector(wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function Ns(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Ye.workingColorSpace){if(e=zh(e,1),t=Ft(t,0,1),i=Ft(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ns(a,s,e+1/3),this.g=Ns(a,s,e),this.b=Ns(a,s,e-1/3)}return Ye.toWorkingColorSpace(this,r),this}setStyle(e,t=Kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const i=xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return Ye.fromWorkingColorSpace(Tt.copy(this),e),Math.round(Ft(Tt.r*255,0,255))*65536+Math.round(Ft(Tt.g*255,0,255))*256+Math.round(Ft(Tt.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(Tt.copy(this),t);const i=Tt.r,r=Tt.g,s=Tt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=Kt){Ye.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,i=Tt.g,r=Tt.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Lr);const i=vs(zn.h,Lr.h,t),r=vs(zn.s,Lr.s,t),s=vs(zn.l,Lr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Je;Je.NAMES=xc;let nu=0;class hs extends fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=gr(),this.name="",this.blending=Fi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ao,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(i.blending=this.blending),this.side!==Xn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==na&&(i.blendSrc=this.blendSrc),this.blendDst!==ia&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ao&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qa extends hs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new O,Dr=new rt;class Wt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=To,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ji(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),r=Nt(r,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==To&&(e.usage=this.usage),e}}class Mc extends Wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class bc extends Wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ci extends Wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let iu=0;const qt=new xt,Fs=new zt,Ai=new O,Gt=new qi,nr=new qi,Et=new O;class qn extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mc(e)?bc:Mc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return Fs.lookAt(e),Fs.updateMatrix(),this.applyMatrix4(Fs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ci(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Gt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Gt.min,nr.min),Gt.expandByPoint(Et),Et.addVectors(Gt.max,nr.max),Gt.expandByPoint(Et)):(Gt.expandByPoint(nr.min),Gt.expandByPoint(nr.max))}Gt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(Ai.fromBufferAttribute(e,c),Et.add(Ai)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<i.count;I++)o[I]=new O,l[I]=new O;const c=new O,h=new O,u=new O,d=new rt,_=new rt,m=new rt,g=new O,p=new O;function f(I,S,M){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(s,I),_.fromBufferAttribute(s,S),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),_.sub(d),m.sub(d);const R=1/(_.x*m.y-m.x*_.y);isFinite(R)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-_.y).multiplyScalar(R),p.copy(u).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar(R),o[I].add(g),o[S].add(g),o[M].add(g),l[I].add(p),l[S].add(p),l[M].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let I=0,S=w.length;I<S;++I){const M=w[I],R=M.start,W=M.count;for(let F=R,X=R+W;F<X;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const y=new O,b=new O,U=new O,A=new O;function T(I){U.fromBufferAttribute(r,I),A.copy(U);const S=o[I];y.copy(S),y.sub(U.multiplyScalar(U.dot(S))).normalize(),b.crossVectors(A,S);const R=b.dot(l[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,R)}for(let I=0,S=w.length;I<S;++I){const M=w[I],R=M.start,W=M.count;for(let F=R,X=R+W;F<X;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,_=i.count;d<_;d++)i.setXYZ(d,0,0,0);const r=new O,s=new O,a=new O,o=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let d=0,_=e.count;d<_;d+=3){const m=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,_=t.count;d<_;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let _=0,m=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?_=l[g]*o.data.stride+o.offset:_=l[g]*h;for(let f=0;f<h;f++)d[m++]=c[_++]}return new Wt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],_=e(d,i);l.push(_)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const _=c[u];h.push(_.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,_=u.length;d<_;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new xt,jn=new Kh,Ir=new cs,Xo=new O,Ur=new O,Nr=new O,Fr=new O,Os=new O,Or=new O,Yo=new O,zr=new O;class jt extends zt{constructor(e=new qn,t=new Qa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Or.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Os.fromBufferAttribute(u,e),a?Or.addScaledVector(Os,h):Or.addScaledVector(Os.sub(t),h))}t.add(Or)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(s),jn.copy(e.ray).recast(e.near),!(Ir.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Ir,Xo)===null||jn.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(s).invert(),jn.copy(e.ray).applyMatrix4(Wo),!(i.boundingBox!==null&&jn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,_=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,g=d.length;m<g;m++){const p=d[m],f=a[p.materialIndex],w=Math.max(p.start,_.start),y=Math.min(o.count,Math.min(p.start+p.count,_.start+_.count));for(let b=w,U=y;b<U;b+=3){const A=o.getX(b),T=o.getX(b+1),I=o.getX(b+2);r=kr(this,f,e,i,c,h,u,A,T,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,_.start),g=Math.min(o.count,_.start+_.count);for(let p=m,f=g;p<f;p+=3){const w=o.getX(p),y=o.getX(p+1),b=o.getX(p+2);r=kr(this,a,e,i,c,h,u,w,y,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,g=d.length;m<g;m++){const p=d[m],f=a[p.materialIndex],w=Math.max(p.start,_.start),y=Math.min(l.count,Math.min(p.start+p.count,_.start+_.count));for(let b=w,U=y;b<U;b+=3){const A=b,T=b+1,I=b+2;r=kr(this,f,e,i,c,h,u,A,T,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,_.start),g=Math.min(l.count,_.start+_.count);for(let p=m,f=g;p<f;p+=3){const w=p,y=p+1,b=p+2;r=kr(this,a,e,i,c,h,u,w,y,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function ru(n,e,t,i,r,s,a,o){let l;if(e.side===Ot?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xn,o),l===null)return null;zr.copy(o),zr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(zr);return c<t.near||c>t.far?null:{distance:c,point:zr.clone(),object:n}}function kr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Ur),n.getVertexPosition(l,Nr),n.getVertexPosition(c,Fr);const h=ru(n,e,t,i,Ur,Nr,Fr,Yo);if(h){const u=new O;rn.getBarycoord(Yo,Ur,Nr,Fr,u),r&&(h.uv=rn.getInterpolatedAttribute(r,o,l,c,u,new rt)),s&&(h.uv1=rn.getInterpolatedAttribute(s,o,l,c,u,new rt)),a&&(h.normal=rn.getInterpolatedAttribute(a,o,l,c,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new O,materialIndex:0};rn.getNormal(Ur,Nr,Fr,d.normal),h.face=d,h.barycoord=u}return h}class $i extends qn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,_=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ci(c,3)),this.setAttribute("normal",new ci(h,3)),this.setAttribute("uv",new ci(u,2));function m(g,p,f,w,y,b,U,A,T,I,S){const M=b/T,R=U/I,W=b/2,F=U/2,X=A/2,j=T+1,Y=I+1;let ee=0,V=0;const le=new O;for(let me=0;me<Y;me++){const Ae=me*R-F;for(let He=0;He<j;He++){const it=He*M-W;le[g]=it*w,le[p]=Ae*y,le[f]=X,c.push(le.x,le.y,le.z),le[g]=0,le[p]=0,le[f]=A>0?1:-1,h.push(le.x,le.y,le.z),u.push(He/T),u.push(1-me/I),ee+=1}}for(let me=0;me<I;me++)for(let Ae=0;Ae<T;Ae++){const He=d+Ae+j*me,it=d+Ae+j*(me+1),$=d+(Ae+1)+j*(me+1),re=d+(Ae+1)+j*me;l.push(He,it,re),l.push(it,$,re),V+=6}o.addGroup(_,V,S),_+=V,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Lt(n){const e={};for(let t=0;t<n.length;t++){const i=Xi(n[t]);for(const r in i)e[r]=i[r]}return e}function su(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Ec={clone:Xi,merge:Lt};var au=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ou=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends hs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=au,this.fragmentShader=ou,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xi(e.uniforms),this.uniformsGroups=su(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class yc extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new O,qo=new rt,$o=new rt;class Zt extends yc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,qo,$o),t.subVectors($o,qo)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ti=-90,Ri=1;class lu extends zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Zt(Ti,Ri,e,t);r.layers=this.layers,this.add(r);const s=new Zt(Ti,Ri,e,t);s.layers=this.layers,this.add(s);const a=new Zt(Ti,Ri,e,t);a.layers=this.layers,this.add(a);const o=new Zt(Ti,Ri,e,t);o.layers=this.layers,this.add(o);const l=new Zt(Ti,Ri,e,t);l.layers=this.layers,this.add(l);const c=new Zt(Ti,Ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,d,_),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class wc extends It{constructor(e,t,i,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Gi,super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cu extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new wc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $i(5,5,5),s=new Pn({name:"CubemapFromEquirect",uniforms:Xi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ot,blending:Bn});s.uniforms.tEquirect.value=t;const a=new jt(r,s),o=t.minFilter;return t.minFilter===li&&(t.minFilter=_n),new lu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const zs=new O,hu=new O,uu=new Fe;class ii{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=zs.subVectors(i,t).cross(hu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(zs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||uu.getNormalMatrix(e),r=this.coplanarPoint(zs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new cs,Hr=new O;class Ac{constructor(e=new ii,t=new ii,i=new ii,r=new ii,s=new ii,a=new ii){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],_=r[8],m=r[9],g=r[10],p=r[11],f=r[12],w=r[13],y=r[14],b=r[15];if(i[0].setComponents(l-s,d-c,p-_,b-f).normalize(),i[1].setComponents(l+s,d+c,p+_,b+f).normalize(),i[2].setComponents(l+a,d+h,p+m,b+w).normalize(),i[3].setComponents(l-a,d-h,p-m,b-w).normalize(),i[4].setComponents(l-o,d-u,p-g,b-y).normalize(),t===Tn)i[5].setComponents(l+o,d+u,p+g,b+y).normalize();else if(t===rs)i[5].setComponents(o,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Hr.x=r.normal.x>0?e.max.x:e.min.x,Hr.y=r.normal.y>0?e.max.y:e.min.y,Hr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Tc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function du(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let _;if(c instanceof Float32Array)_=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?_=n.HALF_FLOAT:_=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)_=n.SHORT;else if(c instanceof Uint32Array)_=n.UNSIGNED_INT;else if(c instanceof Int32Array)_=n.INT;else if(c instanceof Int8Array)_=n.BYTE;else if(c instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:_,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((_,m)=>_.start-m.start);let d=0;for(let _=1;_<u.length;_++){const m=u[d],g=u[_];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++d,u[d]=g)}u.length=d+1;for(let _=0,m=u.length;_<m;_++){const g=u[_];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class us extends qn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,u=e/o,d=t/l,_=[],m=[],g=[],p=[];for(let f=0;f<h;f++){const w=f*d-a;for(let y=0;y<c;y++){const b=y*u-s;m.push(b,-w,0),g.push(0,0,1),p.push(y/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const y=w+c*f,b=w+c*(f+1),U=w+1+c*(f+1),A=w+1+c*f;_.push(y,b,A),_.push(b,U,A)}this.setIndex(_),this.setAttribute("position",new ci(m,3)),this.setAttribute("normal",new ci(g,3)),this.setAttribute("uv",new ci(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.widthSegments,e.heightSegments)}}var fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pu=`#ifdef USE_ALPHAHASH
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
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
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
#endif`,Mu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bu=`#ifdef USE_BATCHING
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
#endif`,Su=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Au=`#ifdef USE_IRIDESCENCE
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
#endif`,Tu=`#ifdef USE_BUMPMAP
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
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fu=`#define PI 3.141592653589793
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
} // validated`,Ou=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zu=`vec3 transformedNormal = objectNormal;
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
#endif`,ku=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xu=`#ifdef USE_ENVMAP
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
#endif`,Yu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qu=`#ifdef USE_ENVMAP
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
#endif`,$u=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
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
#endif`,Zu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ju=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ed=`#ifdef USE_GRADIENTMAP
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
}`,td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rd=`uniform bool receiveShadow;
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
#endif`,sd=`#ifdef USE_ENVMAP
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
#endif`,ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
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
#endif`,ud=`struct PhysicalMaterial {
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
}`,dd=`
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
#endif`,fd=`#if defined( RE_IndirectDiffuse )
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
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_d=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sd=`#if defined( USE_POINTS_UV )
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
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ad=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
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
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
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
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jd=`float getShadowMask() {
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
}`,Jd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qd=`#ifdef USE_SKINNING
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
#endif`,ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tf=`#ifdef USE_SKINNING
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
#endif`,nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,af=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,of=`#ifdef USE_TRANSMISSION
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
#endif`,lf=`#ifdef USE_TRANSMISSION
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
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pf=`uniform sampler2D t2D;
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
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`#include <common>
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
}`,Mf=`#if DEPTH_PACKING == 3200
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
}`,bf=`#define DISTANCE
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
}`,Sf=`#define DISTANCE
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`uniform float scale;
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
}`,Af=`uniform vec3 diffuse;
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
}`,Tf=`#include <common>
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Cf=`#define LAMBERT
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
}`,Pf=`#define LAMBERT
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
}`,Lf=`#define MATCAP
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
}`,Df=`#define MATCAP
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
}`,If=`#define NORMAL
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
}`,Uf=`#define NORMAL
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
}`,Nf=`#define PHONG
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
}`,Ff=`#define PHONG
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
}`,Of=`#define STANDARD
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
}`,zf=`#define STANDARD
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
}`,kf=`#define TOON
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
}`,Hf=`#define TOON
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
}`,Gf=`uniform float size;
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
}`,Vf=`uniform vec3 diffuse;
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
}`,Bf=`#include <common>
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
}`,Wf=`uniform vec3 color;
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
}`,Xf=`uniform float rotation;
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
}`,Yf=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:fu,alphahash_pars_fragment:pu,alphamap_fragment:_u,alphamap_pars_fragment:mu,alphatest_fragment:gu,alphatest_pars_fragment:vu,aomap_fragment:xu,aomap_pars_fragment:Mu,batching_pars_vertex:bu,batching_vertex:Su,begin_vertex:Eu,beginnormal_vertex:yu,bsdfs:wu,iridescence_fragment:Au,bumpmap_pars_fragment:Tu,clipping_planes_fragment:Ru,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Pu,clipping_planes_vertex:Lu,color_fragment:Du,color_pars_fragment:Iu,color_pars_vertex:Uu,color_vertex:Nu,common:Fu,cube_uv_reflection_fragment:Ou,defaultnormal_vertex:zu,displacementmap_pars_vertex:ku,displacementmap_vertex:Hu,emissivemap_fragment:Gu,emissivemap_pars_fragment:Vu,colorspace_fragment:Bu,colorspace_pars_fragment:Wu,envmap_fragment:Xu,envmap_common_pars_fragment:Yu,envmap_pars_fragment:qu,envmap_pars_vertex:$u,envmap_physical_pars_fragment:sd,envmap_vertex:Ku,fog_vertex:Zu,fog_pars_vertex:ju,fog_fragment:Ju,fog_pars_fragment:Qu,gradientmap_pars_fragment:ed,lightmap_pars_fragment:td,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:rd,lights_toon_fragment:ad,lights_toon_pars_fragment:od,lights_phong_fragment:ld,lights_phong_pars_fragment:cd,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:dd,lights_fragment_maps:fd,lights_fragment_end:pd,logdepthbuf_fragment:_d,logdepthbuf_pars_fragment:md,logdepthbuf_pars_vertex:gd,logdepthbuf_vertex:vd,map_fragment:xd,map_pars_fragment:Md,map_particle_fragment:bd,map_particle_pars_fragment:Sd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:yd,morphinstance_vertex:wd,morphcolor_vertex:Ad,morphnormal_vertex:Td,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Dd,normal_pars_vertex:Id,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:zd,iridescence_pars_fragment:kd,opaque_fragment:Hd,packing:Gd,premultiplied_alpha_fragment:Vd,project_vertex:Bd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:Yd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:$d,shadowmap_pars_vertex:Kd,shadowmap_vertex:Zd,shadowmask_pars_fragment:jd,skinbase_vertex:Jd,skinning_pars_vertex:Qd,skinning_vertex:ef,skinnormal_vertex:tf,specularmap_fragment:nf,specularmap_pars_fragment:rf,tonemapping_fragment:sf,tonemapping_pars_fragment:af,transmission_fragment:of,transmission_pars_fragment:lf,uv_pars_fragment:cf,uv_pars_vertex:hf,uv_vertex:uf,worldpos_vertex:df,background_vert:ff,background_frag:pf,backgroundCube_vert:_f,backgroundCube_frag:mf,cube_vert:gf,cube_frag:vf,depth_vert:xf,depth_frag:Mf,distanceRGBA_vert:bf,distanceRGBA_frag:Sf,equirect_vert:Ef,equirect_frag:yf,linedashed_vert:wf,linedashed_frag:Af,meshbasic_vert:Tf,meshbasic_frag:Rf,meshlambert_vert:Cf,meshlambert_frag:Pf,meshmatcap_vert:Lf,meshmatcap_frag:Df,meshnormal_vert:If,meshnormal_frag:Uf,meshphong_vert:Nf,meshphong_frag:Ff,meshphysical_vert:Of,meshphysical_frag:zf,meshtoon_vert:kf,meshtoon_frag:Hf,points_vert:Gf,points_frag:Vf,shadow_vert:Bf,shadow_frag:Wf,sprite_vert:Xf,sprite_frag:Yf},oe={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},fn={basic:{uniforms:Lt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Lt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Je(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Lt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Lt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Lt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Je(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Lt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Lt([oe.points,oe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Lt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Lt([oe.common,oe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Lt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Lt([oe.sprite,oe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Lt([oe.common,oe.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Lt([oe.lights,oe.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};fn.physical={uniforms:Lt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Gr={r:0,b:0,g:0},Qn=new on,qf=new xt;function $f(n,e,t,i,r,s,a){const o=new Je(0);let l=s===!0?0:1,c,h,u=null,d=0,_=null;function m(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?t:e).get(y)),y}function g(w){let y=!1;const b=m(w);b===null?f(o,l):b&&b.isColor&&(f(b,1),y=!0);const U=n.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(w,y){const b=m(y);b&&(b.isCubeTexture||b.mapping===os)?(h===void 0&&(h=new jt(new $i(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Xi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Qn.copy(y.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qf.makeRotationFromEuler(Qn)),h.material.toneMapped=Ye.getTransfer(b.colorSpace)!==nt,(u!==b||d!==b.version||_!==n.toneMapping)&&(h.material.needsUpdate=!0,u=b,d=b.version,_=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new jt(new us(2,2),new Pn({name:"BackgroundMaterial",uniforms:Xi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(b.colorSpace)!==nt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||_!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,_=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,y){w.getRGB(Gr,Sc(n)),i.buffers.color.setClear(Gr.r,Gr.g,Gr.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(w,y=1){o.set(w),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:g,addToRenderList:p}}function Kf(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(M,R,W,F,X){let j=!1;const Y=u(F,W,R);s!==Y&&(s=Y,c(s.object)),j=_(M,F,W,X),j&&m(M,F,W,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,b(M,R,W,F),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,R,W){const F=W.wireframe===!0;let X=i[M.id];X===void 0&&(X={},i[M.id]=X);let j=X[R.id];j===void 0&&(j={},X[R.id]=j);let Y=j[F];return Y===void 0&&(Y=d(l()),j[F]=Y),Y}function d(M){const R=[],W=[],F=[];for(let X=0;X<t;X++)R[X]=0,W[X]=0,F[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:W,attributeDivisors:F,object:M,attributes:{},index:null}}function _(M,R,W,F){const X=s.attributes,j=R.attributes;let Y=0;const ee=W.getAttributes();for(const V in ee)if(ee[V].location>=0){const me=X[V];let Ae=j[V];if(Ae===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(Ae=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(Ae=M.instanceColor)),me===void 0||me.attribute!==Ae||Ae&&me.data!==Ae.data)return!0;Y++}return s.attributesNum!==Y||s.index!==F}function m(M,R,W,F){const X={},j=R.attributes;let Y=0;const ee=W.getAttributes();for(const V in ee)if(ee[V].location>=0){let me=j[V];me===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(me=M.instanceColor));const Ae={};Ae.attribute=me,me&&me.data&&(Ae.data=me.data),X[V]=Ae,Y++}s.attributes=X,s.attributesNum=Y,s.index=F}function g(){const M=s.newAttributes;for(let R=0,W=M.length;R<W;R++)M[R]=0}function p(M){f(M,0)}function f(M,R){const W=s.newAttributes,F=s.enabledAttributes,X=s.attributeDivisors;W[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),X[M]!==R&&(n.vertexAttribDivisor(M,R),X[M]=R)}function w(){const M=s.newAttributes,R=s.enabledAttributes;for(let W=0,F=R.length;W<F;W++)R[W]!==M[W]&&(n.disableVertexAttribArray(W),R[W]=0)}function y(M,R,W,F,X,j,Y){Y===!0?n.vertexAttribIPointer(M,R,W,X,j):n.vertexAttribPointer(M,R,W,F,X,j)}function b(M,R,W,F){g();const X=F.attributes,j=W.getAttributes(),Y=R.defaultAttributeValues;for(const ee in j){const V=j[ee];if(V.location>=0){let le=X[ee];if(le===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),le!==void 0){const me=le.normalized,Ae=le.itemSize,He=e.get(le);if(He===void 0)continue;const it=He.buffer,$=He.type,re=He.bytesPerElement,Ee=$===n.INT||$===n.UNSIGNED_INT||le.gpuType===Ya;if(le.isInterleavedBufferAttribute){const he=le.data,Pe=he.stride,Ie=le.offset;if(he.isInstancedInterleavedBuffer){for(let Ge=0;Ge<V.locationSize;Ge++)f(V.location+Ge,he.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ge=0;Ge<V.locationSize;Ge++)p(V.location+Ge);n.bindBuffer(n.ARRAY_BUFFER,it);for(let Ge=0;Ge<V.locationSize;Ge++)y(V.location+Ge,Ae/V.locationSize,$,me,Pe*re,(Ie+Ae/V.locationSize*Ge)*re,Ee)}else{if(le.isInstancedBufferAttribute){for(let he=0;he<V.locationSize;he++)f(V.location+he,le.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let he=0;he<V.locationSize;he++)p(V.location+he);n.bindBuffer(n.ARRAY_BUFFER,it);for(let he=0;he<V.locationSize;he++)y(V.location+he,Ae/V.locationSize,$,me,Ae*re,Ae/V.locationSize*he*re,Ee)}}else if(Y!==void 0){const me=Y[ee];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(V.location,me);break;case 3:n.vertexAttrib3fv(V.location,me);break;case 4:n.vertexAttrib4fv(V.location,me);break;default:n.vertexAttrib1fv(V.location,me)}}}}w()}function U(){I();for(const M in i){const R=i[M];for(const W in R){const F=R[W];for(const X in F)h(F[X].object),delete F[X];delete R[W]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const R=i[M.id];for(const W in R){const F=R[W];for(const X in F)h(F[X].object),delete F[X];delete R[W]}delete i[M.id]}function T(M){for(const R in i){const W=i[R];if(W[M.id]===void 0)continue;const F=W[M.id];for(const X in F)h(F[X].object),delete F[X];delete W[M.id]}}function I(){S(),a=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:U,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:p,disableUnusedAttributes:w}}function Zf(n,e,t){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let _=0;for(let m=0;m<u;m++)_+=h[m];t.update(_,i,1)}function l(c,h,u,d){if(u===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{_.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g]*d[g];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function jf(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Vt&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const I=T===mr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==an&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==An&&!I)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),_=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),U=m>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:_,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:w,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:U,maxSamples:A}}function Jf(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ii,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const _=u.length!==0||d||i!==0||r;return r=d,i=u.length,_},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,_){const m=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,f=n.get(u);if(!r||m===null||m.length===0||s&&!p)s?h(null):c();else{const w=s?0:i,y=w*4;let b=f.clippingState||null;l.value=b,b=h(m,d,y,_);for(let U=0;U!==y;++U)b[U]=t[U];f.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,_,m){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,m!==!0||p===null){const f=_+g*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(p===null||p.length<f)&&(p=new Float32Array(f));for(let y=0,b=_;y!==g;++y,b+=4)a.copy(u[y]).applyMatrix4(w,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Qf(n){let e=new WeakMap;function t(a,o){return o===ua?a.mapping=Gi:o===da&&(a.mapping=Vi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ua||o===da)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new cu(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class ep extends yc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,Ko=[.125,.215,.35,.446,.526,.582],ai=20,ks=new ep,Zo=new Je;let Hs=null,Gs=0,Vs=0,Bs=!1;const ri=(1+Math.sqrt(5))/2,Ci=1/ri,jo=[new O(-ri,Ci,0),new O(ri,Ci,0),new O(-Ci,0,ri),new O(Ci,0,ri),new O(0,ri,-Ci),new O(0,ri,Ci),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class Jo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Hs=this._renderer.getRenderTarget(),Gs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hs,Gs,Vs),this._renderer.xr.enabled=Bs,e.scissorTest=!1,Vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hs=this._renderer.getRenderTarget(),Gs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:mr,format:Vt,colorSpace:di,depthBuffer:!1},r=Qo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tp(s)),this._blurMaterial=np(s,e,t)}return r}_compileMaterial(e){const t=new jt(this._lodPlanes[0],e);this._renderer.compile(t,ks)}_sceneToCubeUV(e,t,i,r){const o=new Zt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Zo),h.toneMapping=Wn,h.autoClear=!1;const _=new Qa({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),m=new jt(new $i,_);let g=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,g=!0):(_.color.copy(Zo),g=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):w===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const y=this._cubeSize;Vr(r,w*y,f>2?y:0,y,y),h.setRenderTarget(r),g&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Gi||e.mapping===Vi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=el());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new jt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Vr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ks)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=jo[(r-s-1)%jo.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new jt(this._lodPlanes[r],c),d=c.uniforms,_=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*ai-1),g=s/m,p=isFinite(s)?1+Math.floor(h*g):ai;p>ai&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ai}`);const f=[];let w=0;for(let T=0;T<ai;++T){const I=T/g,S=Math.exp(-I*I/2);f.push(S),T===0?w+=S:T<p&&(w+=2*S)}for(let T=0;T<f.length;T++)f[T]=f[T]/w;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-i;const b=this._sizeLods[r],U=3*b*(r>y-Ni?r-y+Ni:0),A=4*(this._cubeSize-b);Vr(t,U,A,3*b,2*b),l.setRenderTarget(t),l.render(u,ks)}}function tp(n){const e=[],t=[],i=[];let r=n;const s=n-Ni+1+Ko.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Ni?l=Ko[a-n+Ni-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],_=6,m=6,g=3,p=2,f=1,w=new Float32Array(g*m*_),y=new Float32Array(p*m*_),b=new Float32Array(f*m*_);for(let A=0;A<_;A++){const T=A%3*2/3-1,I=A>2?0:-1,S=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];w.set(S,g*m*A),y.set(d,p*m*A);const M=[A,A,A,A,A,A];b.set(M,f*m*A)}const U=new qn;U.setAttribute("position",new Wt(w,g)),U.setAttribute("uv",new Wt(y,p)),U.setAttribute("faceIndex",new Wt(b,f)),e.push(U),r>Ni&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Qo(n,e,t){const i=new ui(n,e,t);return i.texture.mapping=os,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function np(n,e,t){const i=new Float32Array(ai),r=new O(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:eo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function el(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function tl(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function eo(){return`

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
	`}function ip(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ua||l===da,h=l===Gi||l===Vi;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Jo(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const _=o.image;return c&&_&&_.height>0||h&&_&&r(_)?(t===null&&(t=new Jo(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function rp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&cr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function sp(n,e,t,i){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const g=d.morphAttributes[m];for(let p=0,f=g.length;p<f;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const _=s.get(d);_&&(e.remove(_),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)e.update(d[m],n.ARRAY_BUFFER);const _=u.morphAttributes;for(const m in _){const g=_[m];for(let p=0,f=g.length;p<f;p++)e.update(g[p],n.ARRAY_BUFFER)}}function c(u){const d=[],_=u.index,m=u.attributes.position;let g=0;if(_!==null){const w=_.array;g=_.version;for(let y=0,b=w.length;y<b;y+=3){const U=w[y+0],A=w[y+1],T=w[y+2];d.push(U,A,A,T,T,U)}}else if(m!==void 0){const w=m.array;g=m.version;for(let y=0,b=w.length/3-1;y<b;y+=3){const U=y+0,A=y+1,T=y+2;d.push(U,A,A,T,T,U)}}else return;const p=new(mc(d)?bc:Mc)(d,1);p.version=g;const f=s.get(u);f&&e.remove(f),s.set(u,p)}function h(u){const d=s.get(u);if(d){const _=u.index;_!==null&&d.version<_.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function ap(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,_){n.drawElements(i,_,s,d*a),t.update(_,i,1)}function c(d,_,m){m!==0&&(n.drawElementsInstanced(i,_,s,d*a,m),t.update(_,i,m))}function h(d,_,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,_,0,s,d,0,m);let p=0;for(let f=0;f<m;f++)p+=_[f];t.update(p,i,1)}function u(d,_,m,g){if(m===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)c(d[f]/a,_[f],g[f]);else{p.multiDrawElementsInstancedWEBGL(i,_,0,s,d,0,g,0,m);let f=0;for(let w=0;w<m;w++)f+=_[w]*g[w];t.update(f,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function op(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function lp(n,e,t){const i=new WeakMap,r=new gt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),m===!0&&(y=2),g===!0&&(y=3);let b=o.attributes.position.count*y,U=1;b>e.maxTextureSize&&(U=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*U*4*u),T=new Ja(A,b,U,u);T.type=An,T.needsUpdate=!0;const I=y*4;for(let M=0;M<u;M++){const R=p[M],W=f[M],F=w[M],X=b*U*4*M;for(let j=0;j<R.count;j++){const Y=j*I;_===!0&&(r.fromBufferAttribute(R,j),A[X+Y+0]=r.x,A[X+Y+1]=r.y,A[X+Y+2]=r.z,A[X+Y+3]=0),m===!0&&(r.fromBufferAttribute(W,j),A[X+Y+4]=r.x,A[X+Y+5]=r.y,A[X+Y+6]=r.z,A[X+Y+7]=0),g===!0&&(r.fromBufferAttribute(F,j),A[X+Y+8]=r.x,A[X+Y+9]=r.y,A[X+Y+10]=r.z,A[X+Y+11]=F.itemSize===4?r.w:1)}}d={count:u,texture:T,size:new rt(b,U)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let _=0;for(let g=0;g<c.length;g++)_+=c[g];const m=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function cp(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Rc extends It{constructor(e,t,i,r,s,a,o,l,c,h=Oi){if(h!==Oi&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Oi&&(i=hi),i===void 0&&h===Wi&&(i=Bi),super(null,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=l!==void 0?l:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Cc=new It,nl=new Rc(1,1),Pc=new Ja,Lc=new qh,Dc=new wc,il=[],rl=[],sl=new Float32Array(16),al=new Float32Array(9),ol=new Float32Array(4);function Ki(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=il[r];if(s===void 0&&(s=new Float32Array(r),il[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ds(n,e){let t=rl[e];t===void 0&&(t=new Int32Array(e),rl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function hp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function fp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function pp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;ol.set(i),n.uniformMatrix2fv(this.addr,!1,ol),bt(t,i)}}function _p(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;al.set(i),n.uniformMatrix3fv(this.addr,!1,al),bt(t,i)}}function mp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;sl.set(i),n.uniformMatrix4fv(this.addr,!1,sl),bt(t,i)}}function gp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function vp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),bt(t,e)}}function xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),bt(t,e)}}function Mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),bt(t,e)}}function bp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),bt(t,e)}}function Ep(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),bt(t,e)}}function yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),bt(t,e)}}function wp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(nl.compareFunction=_c,s=nl):s=Cc,t.setTexture2D(e||s,r)}function Ap(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Lc,r)}function Tp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Dc,r)}function Rp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Pc,r)}function Cp(n){switch(n){case 5126:return hp;case 35664:return up;case 35665:return dp;case 35666:return fp;case 35674:return pp;case 35675:return _p;case 35676:return mp;case 5124:case 35670:return gp;case 35667:case 35671:return vp;case 35668:case 35672:return xp;case 35669:case 35673:return Mp;case 5125:return bp;case 36294:return Sp;case 36295:return Ep;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return wp;case 35679:case 36299:case 36307:return Ap;case 35680:case 36300:case 36308:case 36293:return Tp;case 36289:case 36303:case 36311:case 36292:return Rp}}function Pp(n,e){n.uniform1fv(this.addr,e)}function Lp(n,e){const t=Ki(e,this.size,2);n.uniform2fv(this.addr,t)}function Dp(n,e){const t=Ki(e,this.size,3);n.uniform3fv(this.addr,t)}function Ip(n,e){const t=Ki(e,this.size,4);n.uniform4fv(this.addr,t)}function Up(n,e){const t=Ki(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Np(n,e){const t=Ki(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Fp(n,e){const t=Ki(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Op(n,e){n.uniform1iv(this.addr,e)}function zp(n,e){n.uniform2iv(this.addr,e)}function kp(n,e){n.uniform3iv(this.addr,e)}function Hp(n,e){n.uniform4iv(this.addr,e)}function Gp(n,e){n.uniform1uiv(this.addr,e)}function Vp(n,e){n.uniform2uiv(this.addr,e)}function Bp(n,e){n.uniform3uiv(this.addr,e)}function Wp(n,e){n.uniform4uiv(this.addr,e)}function Xp(n,e,t){const i=this.cache,r=e.length,s=ds(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Cc,s[a])}function Yp(n,e,t){const i=this.cache,r=e.length,s=ds(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Lc,s[a])}function qp(n,e,t){const i=this.cache,r=e.length,s=ds(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Dc,s[a])}function $p(n,e,t){const i=this.cache,r=e.length,s=ds(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Pc,s[a])}function Kp(n){switch(n){case 5126:return Pp;case 35664:return Lp;case 35665:return Dp;case 35666:return Ip;case 35674:return Up;case 35675:return Np;case 35676:return Fp;case 5124:case 35670:return Op;case 35667:case 35671:return zp;case 35668:case 35672:return kp;case 35669:case 35673:return Hp;case 5125:return Gp;case 36294:return Vp;case 36295:return Bp;case 36296:return Wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Xp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return qp;case 36289:case 36303:case 36311:case 36292:return $p}}class Zp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Cp(t.type)}}class jp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kp(t.type)}}class Jp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ws=/(\w+)(\])?(\[|\.)?/g;function ll(n,e){n.seq.push(e),n.map[e.id]=e}function Qp(n,e,t){const i=n.name,r=i.length;for(Ws.lastIndex=0;;){const s=Ws.exec(i),a=Ws.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ll(t,c===void 0?new Zp(o,n,e):new jp(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Jp(o),ll(t,u)),t=u}}}class ts{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Qp(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const e_=37297;let t_=0;function n_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const hl=new Fe;function i_(n){Ye._getMatrix(hl,Ye.workingColorSpace,n);const e=`mat3( ${hl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case ls:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ul(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+n_(n.getShaderSource(e),a)}else return r}function r_(n,e){const t=i_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function s_(n,e){let t;switch(e){case xh:t="Linear";break;case Mh:t="Reinhard";break;case bh:t="Cineon";break;case Sh:t="ACESFilmic";break;case yh:t="AgX";break;case wh:t="Neutral";break;case Eh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Br=new O;function a_(){Ye.getLuminanceCoefficients(Br);const n=Br.x.toFixed(4),e=Br.y.toFixed(4),t=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function l_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function c_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function hr(n){return n!==""}function dl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const h_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ga(n){return n.replace(h_,d_)}const u_=new Map;function d_(n,e){let t=ze[e];if(t===void 0){const i=u_.get(e);if(i!==void 0)t=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ga(t)}const f_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pl(n){return n.replace(f_,p_)}function p_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _l(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function __(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===nc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function m_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Gi:case Vi:e="ENVMAP_TYPE_CUBE";break;case os:e="ENVMAP_TYPE_CUBE_UV";break}return e}function g_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function v_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ic:e="ENVMAP_BLENDING_MULTIPLY";break;case gh:e="ENVMAP_BLENDING_MIX";break;case vh:e="ENVMAP_BLENDING_ADD";break}return e}function x_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function M_(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=__(t),c=m_(t),h=g_(t),u=v_(t),d=x_(t),_=o_(t),m=l_(s),g=r.createProgram();let p,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(hr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(hr).join(`
`),f.length>0&&(f+=`
`)):(p=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),f=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Wn?s_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,r_("linearToOutputTexel",t.outputColorSpace),a_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hr).join(`
`)),a=Ga(a),a=dl(a,t),a=fl(a,t),o=Ga(o),o=dl(o,t),o=fl(o,t),a=pl(a),o=pl(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=w+p+a,b=w+f+o,U=cl(r,r.VERTEX_SHADER,y),A=cl(r,r.FRAGMENT_SHADER,b);r.attachShader(g,U),r.attachShader(g,A),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(R){if(n.debug.checkShaderErrors){const W=r.getProgramInfoLog(g).trim(),F=r.getShaderInfoLog(U).trim(),X=r.getShaderInfoLog(A).trim();let j=!0,Y=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,U,A);else{const ee=ul(r,U,"vertex"),V=ul(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+ee+`
`+V)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(F===""||X==="")&&(Y=!1);Y&&(R.diagnostics={runnable:j,programLog:W,vertexShader:{log:F,prefix:p},fragmentShader:{log:X,prefix:f}})}r.deleteShader(U),r.deleteShader(A),I=new ts(r,g),S=c_(r,g)}let I;this.getUniforms=function(){return I===void 0&&T(this),I};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(g,e_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=U,this.fragmentShader=A,this}let b_=0;class S_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new E_(e),t.set(e,i)),i}}class E_{constructor(e){this.id=b_++,this.code=e,this.usedTimes=0}}function y_(n,e,t,i,r,s,a){const o=new vc,l=new S_,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let _=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,M,R,W,F){const X=W.fog,j=F.geometry,Y=S.isMeshStandardMaterial?W.environment:null,ee=(S.isMeshStandardMaterial?t:e).get(S.envMap||Y),V=ee&&ee.mapping===os?ee.image.height:null,le=m[S.type];S.precision!==null&&(_=r.getMaxPrecision(S.precision),_!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",_,"instead."));const me=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ae=me!==void 0?me.length:0;let He=0;j.morphAttributes.position!==void 0&&(He=1),j.morphAttributes.normal!==void 0&&(He=2),j.morphAttributes.color!==void 0&&(He=3);let it,$,re,Ee;if(le){const et=fn[le];it=et.vertexShader,$=et.fragmentShader}else it=S.vertexShader,$=S.fragmentShader,l.update(S),re=l.getVertexShaderID(S),Ee=l.getFragmentShaderID(S);const he=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Ie=F.isInstancedMesh===!0,Ge=F.isBatchedMesh===!0,dt=!!S.map,qe=!!S.matcap,mt=!!ee,D=!!S.aoMap,Xt=!!S.lightMap,Be=!!S.bumpMap,We=!!S.normalMap,Re=!!S.displacementMap,ot=!!S.emissiveMap,Te=!!S.metalnessMap,E=!!S.roughnessMap,v=S.anisotropy>0,N=S.clearcoat>0,K=S.dispersion>0,J=S.iridescence>0,q=S.sheen>0,ye=S.transmission>0,ue=v&&!!S.anisotropyMap,ge=N&&!!S.clearcoatMap,$e=N&&!!S.clearcoatNormalMap,te=N&&!!S.clearcoatRoughnessMap,ve=J&&!!S.iridescenceMap,Ce=J&&!!S.iridescenceThicknessMap,Le=q&&!!S.sheenColorMap,xe=q&&!!S.sheenRoughnessMap,Xe=!!S.specularMap,Oe=!!S.specularColorMap,st=!!S.specularIntensityMap,C=ye&&!!S.transmissionMap,ce=ye&&!!S.thicknessMap,B=!!S.gradientMap,Z=!!S.alphaMap,pe=S.alphaTest>0,de=!!S.alphaHash,Ue=!!S.extensions;let pt=Wn;S.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(pt=n.toneMapping);const wt={shaderID:le,shaderType:S.type,shaderName:S.name,vertexShader:it,fragmentShader:$,defines:S.defines,customVertexShaderID:re,customFragmentShaderID:Ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:_,batching:Ge,batchingColor:Ge&&F._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&F.instanceColor!==null,instancingMorph:Ie&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?n.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:di,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:qe,envMap:mt,envMapMode:mt&&ee.mapping,envMapCubeUVHeight:V,aoMap:D,lightMap:Xt,bumpMap:Be,normalMap:We,displacementMap:d&&Re,emissiveMap:ot,normalMapObjectSpace:We&&S.normalMapType===Ph,normalMapTangentSpace:We&&S.normalMapType===Ch,metalnessMap:Te,roughnessMap:E,anisotropy:v,anisotropyMap:ue,clearcoat:N,clearcoatMap:ge,clearcoatNormalMap:$e,clearcoatRoughnessMap:te,dispersion:K,iridescence:J,iridescenceMap:ve,iridescenceThicknessMap:Ce,sheen:q,sheenColorMap:Le,sheenRoughnessMap:xe,specularMap:Xe,specularColorMap:Oe,specularIntensityMap:st,transmission:ye,transmissionMap:C,thicknessMap:ce,gradientMap:B,opaque:S.transparent===!1&&S.blending===Fi&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:pe,alphaHash:de,combine:S.combine,mapUv:dt&&g(S.map.channel),aoMapUv:D&&g(S.aoMap.channel),lightMapUv:Xt&&g(S.lightMap.channel),bumpMapUv:Be&&g(S.bumpMap.channel),normalMapUv:We&&g(S.normalMap.channel),displacementMapUv:Re&&g(S.displacementMap.channel),emissiveMapUv:ot&&g(S.emissiveMap.channel),metalnessMapUv:Te&&g(S.metalnessMap.channel),roughnessMapUv:E&&g(S.roughnessMap.channel),anisotropyMapUv:ue&&g(S.anisotropyMap.channel),clearcoatMapUv:ge&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:$e&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(S.sheenRoughnessMap.channel),specularMapUv:Xe&&g(S.specularMap.channel),specularColorMapUv:Oe&&g(S.specularColorMap.channel),specularIntensityMapUv:st&&g(S.specularIntensityMap.channel),transmissionMapUv:C&&g(S.transmissionMap.channel),thicknessMapUv:ce&&g(S.thicknessMap.channel),alphaMapUv:Z&&g(S.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(We||v),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!j.attributes.uv&&(dt||Z),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Pe,skinning:F.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:He,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:pt,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===nt,decodeVideoTextureEmissive:ot&&S.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(S.emissiveMap.colorSpace)===nt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===pn,flipSided:S.side===Ot,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ue&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&S.extensions.multiDraw===!0||Ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)M.push(R),M.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(w(M,S),y(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function w(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function b(S){const M=m[S.type];let R;if(M){const W=fn[M];R=Ec.clone(W.uniforms)}else R=S.uniforms;return R}function U(S,M){let R;for(let W=0,F=h.length;W<F;W++){const X=h[W];if(X.cacheKey===M){R=X,++R.usedTimes;break}}return R===void 0&&(R=new M_(n,M,S,s),h.push(R)),R}function A(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function T(S){l.remove(S)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:b,acquireProgram:U,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:I}}function w_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function A_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ml(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u,d,_,m,g,p){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:_,groupOrder:m,renderOrder:u.renderOrder,z:g,group:p},n[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=_,f.groupOrder=m,f.renderOrder=u.renderOrder,f.z=g,f.group=p),e++,f}function o(u,d,_,m,g,p){const f=a(u,d,_,m,g,p);_.transmission>0?i.push(f):_.transparent===!0?r.push(f):t.push(f)}function l(u,d,_,m,g,p){const f=a(u,d,_,m,g,p);_.transmission>0?i.unshift(f):_.transparent===!0?r.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||A_),i.length>1&&i.sort(d||ml),r.length>1&&r.sort(d||ml)}function h(){for(let u=e,d=n.length;u<d;u++){const _=n[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function T_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new gl,n.set(i,[a])):r>=s.length?(a=new gl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function R_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Je};break;case"SpotLight":t={position:new O,direction:new O,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function C_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let P_=0;function L_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function D_(n){const e=new R_,t=C_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new xt,a=new xt;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let _=0,m=0,g=0,p=0,f=0,w=0,y=0,b=0,U=0,A=0,T=0;c.sort(L_);for(let S=0,M=c.length;S<M;S++){const R=c[S],W=R.color,F=R.intensity,X=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=W.r*F,u+=W.g*F,d+=W.b*F;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(R.sh.coefficients[Y],F);T++}else if(R.isDirectionalLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const ee=R.shadow,V=t.get(R);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,i.directionalShadow[_]=V,i.directionalShadowMap[_]=j,i.directionalShadowMatrix[_]=R.shadow.matrix,w++}i.directional[_]=Y,_++}else if(R.isSpotLight){const Y=e.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(W).multiplyScalar(F),Y.distance=X,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,i.spot[g]=Y;const ee=R.shadow;if(R.map&&(i.spotLightMap[U]=R.map,U++,ee.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[g]=ee.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=j,b++}g++}else if(R.isRectAreaLight){const Y=e.get(R);Y.color.copy(W).multiplyScalar(F),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=Y,p++}else if(R.isPointLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const ee=R.shadow,V=t.get(R);V.shadowIntensity=ee.intensity,V.shadowBias=ee.bias,V.shadowNormalBias=ee.normalBias,V.shadowRadius=ee.radius,V.shadowMapSize=ee.mapSize,V.shadowCameraNear=ee.camera.near,V.shadowCameraFar=ee.camera.far,i.pointShadow[m]=V,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=R.shadow.matrix,y++}i.point[m]=Y,m++}else if(R.isHemisphereLight){const Y=e.get(R);Y.skyColor.copy(R.color).multiplyScalar(F),Y.groundColor.copy(R.groundColor).multiplyScalar(F),i.hemi[f]=Y,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==_||I.pointLength!==m||I.spotLength!==g||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==w||I.numPointShadows!==y||I.numSpotShadows!==b||I.numSpotMaps!==U||I.numLightProbes!==T)&&(i.directional.length=_,i.spot.length=g,i.rectArea.length=p,i.point.length=m,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=b+U-A,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,I.directionalLength=_,I.pointLength=m,I.spotLength=g,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=w,I.numPointShadows=y,I.numSpotShadows=b,I.numSpotMaps=U,I.numLightProbes=T,i.version=P_++)}function l(c,h){let u=0,d=0,_=0,m=0,g=0;const p=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){const y=c[f];if(y.isDirectionalLight){const b=i.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),u++}else if(y.isSpotLight){const b=i.spot[_];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),_++}else if(y.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){const b=i.hemi[g];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function vl(n){const e=new D_(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function I_(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new vl(n),e.set(r,[o])):s>=a.length?(o=new vl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class U_ extends hs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class N_ extends hs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const F_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O_=`uniform sampler2D shadow_pass;
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
}`;function z_(n,e,t){let i=new Ac;const r=new rt,s=new rt,a=new gt,o=new U_({depthPacking:Rh}),l=new N_,c={},h=t.maxTextureSize,u={[Xn]:Ot,[Ot]:Xn,[pn]:pn},d=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:F_,fragmentShader:O_}),_=d.clone();_.defines.HORIZONTAL_PASS=1;const m=new qn;m.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new jt(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let f=this.type;this.render=function(A,T,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=n.getRenderTarget(),M=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Bn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const F=f!==wn&&this.type===wn,X=f===wn&&this.type!==wn;for(let j=0,Y=A.length;j<Y;j++){const ee=A[j],V=ee.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const le=V.getFrameExtents();if(r.multiply(le),s.copy(V.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/le.x),r.x=s.x*le.x,V.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/le.y),r.y=s.y*le.y,V.mapSize.y=s.y)),V.map===null||F===!0||X===!0){const Ae=this.type!==wn?{minFilter:Dt,magFilter:Dt}:{};V.map!==null&&V.map.dispose(),V.map=new ui(r.x,r.y,Ae),V.map.texture.name=ee.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const me=V.getViewportCount();for(let Ae=0;Ae<me;Ae++){const He=V.getViewport(Ae);a.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),W.viewport(a),V.updateMatrices(ee,Ae),i=V.getFrustum(),b(T,I,V.camera,ee,this.type)}V.isPointLightShadow!==!0&&this.type===wn&&w(V,I),V.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,M,R)};function w(A,T){const I=e.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,_.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,_.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ui(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(T,null,I,d,g,null),_.uniforms.shadow_pass.value=A.mapPass.texture,_.uniforms.resolution.value=A.mapSize,_.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(T,null,I,_,g,null)}function y(A,T,I,S){let M=null;const R=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)M=R;else if(M=I.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const W=M.uuid,F=T.uuid;let X=c[W];X===void 0&&(X={},c[W]=X);let j=X[F];j===void 0&&(j=M.clone(),X[F]=j,T.addEventListener("dispose",U)),M=j}if(M.visible=T.visible,M.wireframe=T.wireframe,S===wn?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const W=n.properties.get(M);W.light=I}return M}function b(A,T,I,S,M){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===wn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const F=e.update(A),X=A.material;if(Array.isArray(X)){const j=F.groups;for(let Y=0,ee=j.length;Y<ee;Y++){const V=j[Y],le=X[V.materialIndex];if(le&&le.visible){const me=y(A,le,S,M);A.onBeforeShadow(n,A,T,I,F,me,V),n.renderBufferDirect(I,null,F,me,A,V),A.onAfterShadow(n,A,T,I,F,me,V)}}}else if(X.visible){const j=y(A,X,S,M);A.onBeforeShadow(n,A,T,I,F,j,null),n.renderBufferDirect(I,null,F,j,A,null),A.onAfterShadow(n,A,T,I,F,j,null)}}const W=A.children;for(let F=0,X=W.length;F<X;F++)b(W[F],T,I,S,M)}function U(A){A.target.removeEventListener("dispose",U);for(const I in c){const S=c[I],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const k_={[ra]:sa,[aa]:ca,[oa]:ha,[Hi]:la,[sa]:ra,[ca]:aa,[ha]:oa,[la]:Hi};function H_(n,e){function t(){let C=!1;const ce=new gt;let B=null;const Z=new gt(0,0,0,0);return{setMask:function(pe){B!==pe&&!C&&(n.colorMask(pe,pe,pe,pe),B=pe)},setLocked:function(pe){C=pe},setClear:function(pe,de,Ue,pt,wt){wt===!0&&(pe*=pt,de*=pt,Ue*=pt),ce.set(pe,de,Ue,pt),Z.equals(ce)===!1&&(n.clearColor(pe,de,Ue,pt),Z.copy(ce))},reset:function(){C=!1,B=null,Z.set(-1,0,0,0)}}}function i(){let C=!1,ce=!1,B=null,Z=null,pe=null;return{setReversed:function(de){if(ce!==de){const Ue=e.get("EXT_clip_control");ce?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT);const pt=pe;pe=null,this.setClear(pt)}ce=de},getReversed:function(){return ce},setTest:function(de){de?he(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(de){B!==de&&!C&&(n.depthMask(de),B=de)},setFunc:function(de){if(ce&&(de=k_[de]),Z!==de){switch(de){case ra:n.depthFunc(n.NEVER);break;case sa:n.depthFunc(n.ALWAYS);break;case aa:n.depthFunc(n.LESS);break;case Hi:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case la:n.depthFunc(n.GEQUAL);break;case ca:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=de}},setLocked:function(de){C=de},setClear:function(de){pe!==de&&(ce&&(de=1-de),n.clearDepth(de),pe=de)},reset:function(){C=!1,B=null,Z=null,pe=null,ce=!1}}}function r(){let C=!1,ce=null,B=null,Z=null,pe=null,de=null,Ue=null,pt=null,wt=null;return{setTest:function(et){C||(et?he(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(et){ce!==et&&!C&&(n.stencilMask(et),ce=et)},setFunc:function(et,Jt,gn){(B!==et||Z!==Jt||pe!==gn)&&(n.stencilFunc(et,Jt,gn),B=et,Z=Jt,pe=gn)},setOp:function(et,Jt,gn){(de!==et||Ue!==Jt||pt!==gn)&&(n.stencilOp(et,Jt,gn),de=et,Ue=Jt,pt=gn)},setLocked:function(et){C=et},setClear:function(et){wt!==et&&(n.clearStencil(et),wt=et)},reset:function(){C=!1,ce=null,B=null,Z=null,pe=null,de=null,Ue=null,pt=null,wt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,_=[],m=null,g=!1,p=null,f=null,w=null,y=null,b=null,U=null,A=null,T=new Je(0,0,0),I=0,S=!1,M=null,R=null,W=null,F=null,X=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ee=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(V)[1]),Y=ee>=1):V.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),Y=ee>=2);let le=null,me={};const Ae=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),it=new gt().fromArray(Ae),$=new gt().fromArray(He);function re(C,ce,B,Z){const pe=new Uint8Array(4),de=n.createTexture();n.bindTexture(C,de),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ue=0;Ue<B;Ue++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,pe):n.texImage2D(ce+Ue,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pe);return de}const Ee={};Ee[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),he(n.DEPTH_TEST),a.setFunc(Hi),Be(!1),We(So),he(n.CULL_FACE),D(Bn);function he(C){h[C]!==!0&&(n.enable(C),h[C]=!0)}function Pe(C){h[C]!==!1&&(n.disable(C),h[C]=!1)}function Ie(C,ce){return u[C]!==ce?(n.bindFramebuffer(C,ce),u[C]=ce,C===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ce),C===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function Ge(C,ce){let B=_,Z=!1;if(C){B=d.get(ce),B===void 0&&(B=[],d.set(ce,B));const pe=C.textures;if(B.length!==pe.length||B[0]!==n.COLOR_ATTACHMENT0){for(let de=0,Ue=pe.length;de<Ue;de++)B[de]=n.COLOR_ATTACHMENT0+de;B.length=pe.length,Z=!0}}else B[0]!==n.BACK&&(B[0]=n.BACK,Z=!0);Z&&n.drawBuffers(B)}function dt(C){return m!==C?(n.useProgram(C),m=C,!0):!1}const qe={[si]:n.FUNC_ADD,[eh]:n.FUNC_SUBTRACT,[th]:n.FUNC_REVERSE_SUBTRACT};qe[nh]=n.MIN,qe[ih]=n.MAX;const mt={[rh]:n.ZERO,[sh]:n.ONE,[ah]:n.SRC_COLOR,[na]:n.SRC_ALPHA,[dh]:n.SRC_ALPHA_SATURATE,[hh]:n.DST_COLOR,[lh]:n.DST_ALPHA,[oh]:n.ONE_MINUS_SRC_COLOR,[ia]:n.ONE_MINUS_SRC_ALPHA,[uh]:n.ONE_MINUS_DST_COLOR,[ch]:n.ONE_MINUS_DST_ALPHA,[fh]:n.CONSTANT_COLOR,[ph]:n.ONE_MINUS_CONSTANT_COLOR,[_h]:n.CONSTANT_ALPHA,[mh]:n.ONE_MINUS_CONSTANT_ALPHA};function D(C,ce,B,Z,pe,de,Ue,pt,wt,et){if(C===Bn){g===!0&&(Pe(n.BLEND),g=!1);return}if(g===!1&&(he(n.BLEND),g=!0),C!==Qc){if(C!==p||et!==S){if((f!==si||b!==si)&&(n.blendEquation(n.FUNC_ADD),f=si,b=si),et)switch(C){case Fi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Eo:n.blendFunc(n.ONE,n.ONE);break;case yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Fi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Eo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}w=null,y=null,U=null,A=null,T.set(0,0,0),I=0,p=C,S=et}return}pe=pe||ce,de=de||B,Ue=Ue||Z,(ce!==f||pe!==b)&&(n.blendEquationSeparate(qe[ce],qe[pe]),f=ce,b=pe),(B!==w||Z!==y||de!==U||Ue!==A)&&(n.blendFuncSeparate(mt[B],mt[Z],mt[de],mt[Ue]),w=B,y=Z,U=de,A=Ue),(pt.equals(T)===!1||wt!==I)&&(n.blendColor(pt.r,pt.g,pt.b,wt),T.copy(pt),I=wt),p=C,S=!1}function Xt(C,ce){C.side===pn?Pe(n.CULL_FACE):he(n.CULL_FACE);let B=C.side===Ot;ce&&(B=!B),Be(B),C.blending===Fi&&C.transparent===!1?D(Bn):D(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),s.setMask(C.colorWrite);const Z=C.stencilWrite;o.setTest(Z),Z&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ot(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?he(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(C){M!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),M=C)}function We(C){C!==Zc?(he(n.CULL_FACE),C!==R&&(C===So?n.cullFace(n.BACK):C===jc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),R=C}function Re(C){C!==W&&(Y&&n.lineWidth(C),W=C)}function ot(C,ce,B){C?(he(n.POLYGON_OFFSET_FILL),(F!==ce||X!==B)&&(n.polygonOffset(ce,B),F=ce,X=B)):Pe(n.POLYGON_OFFSET_FILL)}function Te(C){C?he(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function E(C){C===void 0&&(C=n.TEXTURE0+j-1),le!==C&&(n.activeTexture(C),le=C)}function v(C,ce,B){B===void 0&&(le===null?B=n.TEXTURE0+j-1:B=le);let Z=me[B];Z===void 0&&(Z={type:void 0,texture:void 0},me[B]=Z),(Z.type!==C||Z.texture!==ce)&&(le!==B&&(n.activeTexture(B),le=B),n.bindTexture(C,ce||Ee[C]),Z.type=C,Z.texture=ce)}function N(){const C=me[le];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function K(){try{n.compressedTexImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ge(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function te(){try{n.texStorage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ce(){try{n.texImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Le(C){it.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),it.copy(C))}function xe(C){$.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),$.copy(C))}function Xe(C,ce){let B=c.get(ce);B===void 0&&(B=new WeakMap,c.set(ce,B));let Z=B.get(C);Z===void 0&&(Z=n.getUniformBlockIndex(ce,C.name),B.set(C,Z))}function Oe(C,ce){const Z=c.get(ce).get(C);l.get(ce)!==Z&&(n.uniformBlockBinding(ce,Z,C.__bindingPointIndex),l.set(ce,Z))}function st(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},le=null,me={},u={},d=new WeakMap,_=[],m=null,g=!1,p=null,f=null,w=null,y=null,b=null,U=null,A=null,T=new Je(0,0,0),I=0,S=!1,M=null,R=null,W=null,F=null,X=null,it.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:he,disable:Pe,bindFramebuffer:Ie,drawBuffers:Ge,useProgram:dt,setBlending:D,setMaterial:Xt,setFlipSided:Be,setCullFace:We,setLineWidth:Re,setPolygonOffset:ot,setScissorTest:Te,activeTexture:E,bindTexture:v,unbindTexture:N,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:ve,texImage3D:Ce,updateUBOMapping:Xe,uniformBlockBinding:Oe,texStorage2D:$e,texStorage3D:te,texSubImage2D:q,texSubImage3D:ye,compressedTexSubImage2D:ue,compressedTexSubImage3D:ge,scissor:Le,viewport:xe,reset:st}}function xl(n,e,t,i){const r=G_(i);switch(t){case lc:return n*e;case hc:return n*e;case uc:return n*e*2;case dc:return n*e/r.components*r.byteLength;case Ka:return n*e/r.components*r.byteLength;case fc:return n*e*2/r.components*r.byteLength;case Za:return n*e*2/r.components*r.byteLength;case cc:return n*e*3/r.components*r.byteLength;case Vt:return n*e*4/r.components*r.byteLength;case ja:return n*e*4/r.components*r.byteLength;case Zr:case jr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Qr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _a:case ga:return Math.max(n,16)*Math.max(e,8)/4;case pa:case ma:return Math.max(n,8)*Math.max(e,8)/2;case va:case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ya:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case wa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case es:case Na:case Fa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case pc:case Oa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case za:case ka:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function G_(n){switch(n){case an:case sc:return{byteLength:1,components:1};case pr:case ac:case mr:return{byteLength:2,components:1};case qa:case $a:return{byteLength:2,components:4};case hi:case Ya:case An:return{byteLength:4,components:1};case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function V_(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap;let u;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,v){return _?new OffscreenCanvas(E,v):ss("canvas")}function g(E,v,N){let K=1;const J=Te(E);if((J.width>N||J.height>N)&&(K=N/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const q=Math.floor(K*J.width),ye=Math.floor(K*J.height);u===void 0&&(u=m(q,ye));const ue=v?m(q,ye):u;return ue.width=q,ue.height=ye,ue.getContext("2d").drawImage(E,0,0,q,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+ye+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),E;return E}function p(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(E,v,N,K,J=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=v;if(v===n.RED&&(N===n.FLOAT&&(q=n.R32F),N===n.HALF_FLOAT&&(q=n.R16F),N===n.UNSIGNED_BYTE&&(q=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.R8UI),N===n.UNSIGNED_SHORT&&(q=n.R16UI),N===n.UNSIGNED_INT&&(q=n.R32UI),N===n.BYTE&&(q=n.R8I),N===n.SHORT&&(q=n.R16I),N===n.INT&&(q=n.R32I)),v===n.RG&&(N===n.FLOAT&&(q=n.RG32F),N===n.HALF_FLOAT&&(q=n.RG16F),N===n.UNSIGNED_BYTE&&(q=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RG8UI),N===n.UNSIGNED_SHORT&&(q=n.RG16UI),N===n.UNSIGNED_INT&&(q=n.RG32UI),N===n.BYTE&&(q=n.RG8I),N===n.SHORT&&(q=n.RG16I),N===n.INT&&(q=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGB8UI),N===n.UNSIGNED_SHORT&&(q=n.RGB16UI),N===n.UNSIGNED_INT&&(q=n.RGB32UI),N===n.BYTE&&(q=n.RGB8I),N===n.SHORT&&(q=n.RGB16I),N===n.INT&&(q=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),N===n.UNSIGNED_INT&&(q=n.RGBA32UI),N===n.BYTE&&(q=n.RGBA8I),N===n.SHORT&&(q=n.RGBA16I),N===n.INT&&(q=n.RGBA32I)),v===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),v===n.RGBA){const ye=J?ls:Ye.getTransfer(K);N===n.FLOAT&&(q=n.RGBA32F),N===n.HALF_FLOAT&&(q=n.RGBA16F),N===n.UNSIGNED_BYTE&&(q=ye===nt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function b(E,v){let N;return E?v===null||v===hi||v===Bi?N=n.DEPTH24_STENCIL8:v===An?N=n.DEPTH32F_STENCIL8:v===pr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===hi||v===Bi?N=n.DEPTH_COMPONENT24:v===An?N=n.DEPTH_COMPONENT32F:v===pr&&(N=n.DEPTH_COMPONENT16),N}function U(E,v){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Dt&&E.minFilter!==_n?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){const v=E.target;v.removeEventListener("dispose",A),I(v),v.isVideoTexture&&h.delete(v)}function T(E){const v=E.target;v.removeEventListener("dispose",T),M(v)}function I(E){const v=i.get(E);if(v.__webglInit===void 0)return;const N=E.source,K=d.get(N);if(K){const J=K[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(E),Object.keys(K).length===0&&d.delete(N)}i.remove(E)}function S(E){const v=i.get(E);n.deleteTexture(v.__webglTexture);const N=E.source,K=d.get(N);delete K[v.__cacheKey],a.memory.textures--}function M(E){const v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let J=0;J<v.__webglFramebuffer[K].length;J++)n.deleteFramebuffer(v.__webglFramebuffer[K][J]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=E.textures;for(let K=0,J=N.length;K<J;K++){const q=i.get(N[K]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),i.remove(N[K])}i.remove(E)}let R=0;function W(){R=0}function F(){const E=R;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),R+=1,E}function X(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function j(E,v){const N=i.get(E);if(E.isVideoTexture&&Re(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(N,E,v);return}}t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function Y(E,v){const N=i.get(E);if(E.version>0&&N.__version!==E.version){$(N,E,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function ee(E,v){const N=i.get(E);if(E.version>0&&N.__version!==E.version){$(N,E,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function V(E,v){const N=i.get(E);if(E.version>0&&N.__version!==E.version){re(N,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}const le={[is]:n.REPEAT,[oi]:n.CLAMP_TO_EDGE,[fa]:n.MIRRORED_REPEAT},me={[Dt]:n.NEAREST,[Ah]:n.NEAREST_MIPMAP_NEAREST,[lr]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[ms]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},Ae={[Lh]:n.NEVER,[Oh]:n.ALWAYS,[Dh]:n.LESS,[_c]:n.LEQUAL,[Ih]:n.EQUAL,[Fh]:n.GEQUAL,[Uh]:n.GREATER,[Nh]:n.NOTEQUAL};function He(E,v){if(v.type===An&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===_n||v.magFilter===ms||v.magFilter===lr||v.magFilter===li||v.minFilter===_n||v.minFilter===ms||v.minFilter===lr||v.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,le[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,me[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,me[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Ae[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Dt||v.minFilter!==lr&&v.minFilter!==li||v.type===An&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function it(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const K=v.source;let J=d.get(K);J===void 0&&(J={},d.set(K,J));const q=X(v);if(q!==E.__cacheKey){J[q]===void 0&&(J[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),J[q].usedTimes++;const ye=J[E.__cacheKey];ye!==void 0&&(J[E.__cacheKey].usedTimes--,ye.usedTimes===0&&S(v)),E.__cacheKey=q,E.__webglTexture=J[q].texture}return N}function $(E,v,N){let K=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=n.TEXTURE_3D);const J=it(E,v),q=v.source;t.bindTexture(K,E.__webglTexture,n.TEXTURE0+N);const ye=i.get(q);if(q.version!==ye.__version||J===!0){t.activeTexture(n.TEXTURE0+N);const ue=Ye.getPrimaries(Ye.workingColorSpace),ge=v.colorSpace===Gn?null:Ye.getPrimaries(v.colorSpace),$e=v.colorSpace===Gn||ue===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let te=g(v.image,!1,r.maxTextureSize);te=ot(v,te);const ve=s.convert(v.format,v.colorSpace),Ce=s.convert(v.type);let Le=y(v.internalFormat,ve,Ce,v.colorSpace,v.isVideoTexture);He(K,v);let xe;const Xe=v.mipmaps,Oe=v.isVideoTexture!==!0,st=ye.__version===void 0||J===!0,C=q.dataReady,ce=U(v,te);if(v.isDepthTexture)Le=b(v.format===Wi,v.type),st&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,Le,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Le,te.width,te.height,0,ve,Ce,null));else if(v.isDataTexture)if(Xe.length>0){Oe&&st&&t.texStorage2D(n.TEXTURE_2D,ce,Le,Xe[0].width,Xe[0].height);for(let B=0,Z=Xe.length;B<Z;B++)xe=Xe[B],Oe?C&&t.texSubImage2D(n.TEXTURE_2D,B,0,0,xe.width,xe.height,ve,Ce,xe.data):t.texImage2D(n.TEXTURE_2D,B,Le,xe.width,xe.height,0,ve,Ce,xe.data);v.generateMipmaps=!1}else Oe?(st&&t.texStorage2D(n.TEXTURE_2D,ce,Le,te.width,te.height),C&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te.width,te.height,ve,Ce,te.data)):t.texImage2D(n.TEXTURE_2D,0,Le,te.width,te.height,0,ve,Ce,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Le,Xe[0].width,Xe[0].height,te.depth);for(let B=0,Z=Xe.length;B<Z;B++)if(xe=Xe[B],v.format!==Vt)if(ve!==null)if(Oe){if(C)if(v.layerUpdates.size>0){const pe=xl(xe.width,xe.height,v.format,v.type);for(const de of v.layerUpdates){const Ue=xe.data.subarray(de*pe/xe.data.BYTES_PER_ELEMENT,(de+1)*pe/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,B,0,0,de,xe.width,xe.height,1,ve,Ue)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,B,0,0,0,xe.width,xe.height,te.depth,ve,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,B,Le,xe.width,xe.height,te.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?C&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,B,0,0,0,xe.width,xe.height,te.depth,ve,Ce,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,B,Le,xe.width,xe.height,te.depth,0,ve,Ce,xe.data)}else{Oe&&st&&t.texStorage2D(n.TEXTURE_2D,ce,Le,Xe[0].width,Xe[0].height);for(let B=0,Z=Xe.length;B<Z;B++)xe=Xe[B],v.format!==Vt?ve!==null?Oe?C&&t.compressedTexSubImage2D(n.TEXTURE_2D,B,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,B,Le,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?C&&t.texSubImage2D(n.TEXTURE_2D,B,0,0,xe.width,xe.height,ve,Ce,xe.data):t.texImage2D(n.TEXTURE_2D,B,Le,xe.width,xe.height,0,ve,Ce,xe.data)}else if(v.isDataArrayTexture)if(Oe){if(st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Le,te.width,te.height,te.depth),C)if(v.layerUpdates.size>0){const B=xl(te.width,te.height,v.format,v.type);for(const Z of v.layerUpdates){const pe=te.data.subarray(Z*B/te.data.BYTES_PER_ELEMENT,(Z+1)*B/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,ve,Ce,pe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(v.isData3DTexture)Oe?(st&&t.texStorage3D(n.TEXTURE_3D,ce,Le,te.width,te.height,te.depth),C&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)):t.texImage3D(n.TEXTURE_3D,0,Le,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(v.isFramebufferTexture){if(st)if(Oe)t.texStorage2D(n.TEXTURE_2D,ce,Le,te.width,te.height);else{let B=te.width,Z=te.height;for(let pe=0;pe<ce;pe++)t.texImage2D(n.TEXTURE_2D,pe,Le,B,Z,0,ve,Ce,null),B>>=1,Z>>=1}}else if(Xe.length>0){if(Oe&&st){const B=Te(Xe[0]);t.texStorage2D(n.TEXTURE_2D,ce,Le,B.width,B.height)}for(let B=0,Z=Xe.length;B<Z;B++)xe=Xe[B],Oe?C&&t.texSubImage2D(n.TEXTURE_2D,B,0,0,ve,Ce,xe):t.texImage2D(n.TEXTURE_2D,B,Le,ve,Ce,xe);v.generateMipmaps=!1}else if(Oe){if(st){const B=Te(te);t.texStorage2D(n.TEXTURE_2D,ce,Le,B.width,B.height)}C&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Ce,te)}else t.texImage2D(n.TEXTURE_2D,0,Le,ve,Ce,te);p(v)&&f(K),ye.__version=q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function re(E,v,N){if(v.image.length!==6)return;const K=it(E,v),J=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+N);const q=i.get(J);if(J.version!==q.__version||K===!0){t.activeTexture(n.TEXTURE0+N);const ye=Ye.getPrimaries(Ye.workingColorSpace),ue=v.colorSpace===Gn?null:Ye.getPrimaries(v.colorSpace),ge=v.colorSpace===Gn||ye===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const $e=v.isCompressedTexture||v.image[0].isCompressedTexture,te=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let Z=0;Z<6;Z++)!$e&&!te?ve[Z]=g(v.image[Z],!0,r.maxCubemapSize):ve[Z]=te?v.image[Z].image:v.image[Z],ve[Z]=ot(v,ve[Z]);const Ce=ve[0],Le=s.convert(v.format,v.colorSpace),xe=s.convert(v.type),Xe=y(v.internalFormat,Le,xe,v.colorSpace),Oe=v.isVideoTexture!==!0,st=q.__version===void 0||K===!0,C=J.dataReady;let ce=U(v,Ce);He(n.TEXTURE_CUBE_MAP,v);let B;if($e){Oe&&st&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Xe,Ce.width,Ce.height);for(let Z=0;Z<6;Z++){B=ve[Z].mipmaps;for(let pe=0;pe<B.length;pe++){const de=B[pe];v.format!==Vt?Le!==null?Oe?C&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe,0,0,de.width,de.height,Le,de.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe,Xe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe,0,0,de.width,de.height,Le,xe,de.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe,Xe,de.width,de.height,0,Le,xe,de.data)}}}else{if(B=v.mipmaps,Oe&&st){B.length>0&&ce++;const Z=Te(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Xe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){Oe?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ve[Z].width,ve[Z].height,Le,xe,ve[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,ve[Z].width,ve[Z].height,0,Le,xe,ve[Z].data);for(let pe=0;pe<B.length;pe++){const Ue=B[pe].image[Z].image;Oe?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe+1,0,0,Ue.width,Ue.height,Le,xe,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe+1,Xe,Ue.width,Ue.height,0,Le,xe,Ue.data)}}else{Oe?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Le,xe,ve[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,Le,xe,ve[Z]);for(let pe=0;pe<B.length;pe++){const de=B[pe];Oe?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe+1,0,0,Le,xe,de.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pe+1,Xe,Le,xe,de.image[Z])}}}p(v)&&f(n.TEXTURE_CUBE_MAP),q.__version=J.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Ee(E,v,N,K,J,q){const ye=s.convert(N.format,N.colorSpace),ue=s.convert(N.type),ge=y(N.internalFormat,ye,ue,N.colorSpace),$e=i.get(v),te=i.get(N);if(te.__renderTarget=v,!$e.__hasExternalTextures){const ve=Math.max(1,v.width>>q),Ce=Math.max(1,v.height>>q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,q,ge,ve,Ce,v.depth,0,ye,ue,null):t.texImage2D(J,q,ge,ve,Ce,0,ye,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),We(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,J,te.__webglTexture,0,Be(v)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,J,te.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(E,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){const K=v.depthTexture,J=K&&K.isDepthTexture?K.type:null,q=b(v.stencilBuffer,J),ye=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=Be(v);We(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,q,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,q,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,E)}else{const K=v.textures;for(let J=0;J<K.length;J++){const q=K[J],ye=s.convert(q.format,q.colorSpace),ue=s.convert(q.type),ge=y(q.internalFormat,ye,ue,q.colorSpace),$e=Be(v);N&&We(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,ge,v.width,v.height):We(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$e,ge,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ge,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const J=K.__webglTexture,q=Be(v);if(v.depthTexture.format===Oi)We(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(v.depthTexture.format===Wi)We(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ie(E){const v=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=K}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Pe(v.__webglFramebuffer,E)}else if(N){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=n.createRenderbuffer(),he(v.__webglDepthbuffer[K],E,!1);else{const J=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),he(v.__webglDepthbuffer,E,!1);else{const K=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ge(E,v,N){const K=i.get(E);v!==void 0&&Ee(K.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Ie(E)}function dt(E){const v=E.texture,N=i.get(E),K=i.get(v);E.addEventListener("dispose",T);const J=E.textures,q=E.isWebGLCubeRenderTarget===!0,ye=J.length>1;if(ye||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=v.version,a.memory.textures++),q){N.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[ue]=[];for(let ge=0;ge<v.mipmaps.length;ge++)N.__webglFramebuffer[ue][ge]=n.createFramebuffer()}else N.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let ue=0;ue<v.mipmaps.length;ue++)N.__webglFramebuffer[ue]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ye)for(let ue=0,ge=J.length;ue<ge;ue++){const $e=i.get(J[ue]);$e.__webglTexture===void 0&&($e.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&We(E)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ue=0;ue<J.length;ue++){const ge=J[ue];N.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[ue]);const $e=s.convert(ge.format,ge.colorSpace),te=s.convert(ge.type),ve=y(ge.internalFormat,$e,te,ge.colorSpace,E.isXRRenderTarget===!0),Ce=Be(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,ve,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,N.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),he(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),He(n.TEXTURE_CUBE_MAP,v);for(let ue=0;ue<6;ue++)if(v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)Ee(N.__webglFramebuffer[ue][ge],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ge);else Ee(N.__webglFramebuffer[ue],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(v)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ue=0,ge=J.length;ue<ge;ue++){const $e=J[ue],te=i.get($e);t.bindTexture(n.TEXTURE_2D,te.__webglTexture),He(n.TEXTURE_2D,$e),Ee(N.__webglFramebuffer,E,$e,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),p($e)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ue=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,K.__webglTexture),He(ue,v),v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)Ee(N.__webglFramebuffer[ge],E,v,n.COLOR_ATTACHMENT0,ue,ge);else Ee(N.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,ue,0);p(v)&&f(ue),t.unbindTexture()}E.depthBuffer&&Ie(E)}function qe(E){const v=E.textures;for(let N=0,K=v.length;N<K;N++){const J=v[N];if(p(J)){const q=w(E),ye=i.get(J).__webglTexture;t.bindTexture(q,ye),f(q),t.unbindTexture()}}}const mt=[],D=[];function Xt(E){if(E.samples>0){if(We(E)===!1){const v=E.textures,N=E.width,K=E.height;let J=n.COLOR_BUFFER_BIT;const q=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(E),ue=v.length>1;if(ue)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[ge]);const $e=i.get(v[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$e,0)}n.blitFramebuffer(0,0,N,K,0,0,N,K,J,n.NEAREST),l===!0&&(mt.length=0,D.length=0,mt.push(n.COLOR_ATTACHMENT0+ge),E.depthBuffer&&E.resolveDepthBuffer===!1&&(mt.push(q),D.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,ye.__webglColorRenderbuffer[ge]);const $e=i.get(v[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,$e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Be(E){return Math.min(r.maxSamples,E.samples)}function We(E){const v=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Re(E){const v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function ot(E,v){const N=E.colorSpace,K=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==di&&N!==Gn&&(Ye.getTransfer(N)===nt?(K!==Vt||J!==an)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function Te(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=W,this.setTexture2D=j,this.setTexture2DArray=Y,this.setTexture3D=ee,this.setTextureCube=V,this.rebindTextures=Ge,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=Xt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=We}function B_(n,e){function t(i,r=Gn){let s;const a=Ye.getTransfer(r);if(i===an)return n.UNSIGNED_BYTE;if(i===qa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$a)return n.UNSIGNED_SHORT_5_5_5_1;if(i===oc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===sc)return n.BYTE;if(i===ac)return n.SHORT;if(i===pr)return n.UNSIGNED_SHORT;if(i===Ya)return n.INT;if(i===hi)return n.UNSIGNED_INT;if(i===An)return n.FLOAT;if(i===mr)return n.HALF_FLOAT;if(i===lc)return n.ALPHA;if(i===cc)return n.RGB;if(i===Vt)return n.RGBA;if(i===hc)return n.LUMINANCE;if(i===uc)return n.LUMINANCE_ALPHA;if(i===Oi)return n.DEPTH_COMPONENT;if(i===Wi)return n.DEPTH_STENCIL;if(i===dc)return n.RED;if(i===Ka)return n.RED_INTEGER;if(i===fc)return n.RG;if(i===Za)return n.RG_INTEGER;if(i===ja)return n.RGBA_INTEGER;if(i===Zr||i===jr||i===Jr||i===Qr)if(a===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Zr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Zr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===pa||i===_a||i===ma||i===ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===pa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_a)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ma)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===va||i===xa||i===Ma)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===va||i===xa)return a===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ma)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ba||i===Sa||i===Ea||i===ya||i===wa||i===Aa||i===Ta||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia||i===Ua)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ba)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Sa)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ea)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ya)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wa)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Aa)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ta)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ra)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ca)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pa)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===La)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Da)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ia)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ua)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===es||i===Na||i===Fa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===es)return a===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Na)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pc||i===Oa||i===za||i===ka)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===es)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Oa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===za)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ka)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class W_ extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ur extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const X_={type:"move"};class Xs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),f=this._getHandJoint(c,g);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),_=.02,m=.005;c.inputState.pinching&&d>_+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=_-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(X_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ur;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Y_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q_=`
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

}`;class $_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new It,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Pn({vertexShader:Y_,fragmentShader:q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new us(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class K_ extends fi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,_=null,m=null;const g=new $_,p=t.getContextAttributes();let f=null,w=null;const y=[],b=[],U=new rt;let A=null;const T=new Zt;T.viewport=new gt;const I=new Zt;I.viewport=new gt;const S=[T,I],M=new W_;let R=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let re=y[$];return re===void 0&&(re=new Xs,y[$]=re),re.getTargetRaySpace()},this.getControllerGrip=function($){let re=y[$];return re===void 0&&(re=new Xs,y[$]=re),re.getGripSpace()},this.getHand=function($){let re=y[$];return re===void 0&&(re=new Xs,y[$]=re),re.getHandSpace()};function F($){const re=b.indexOf($.inputSource);if(re===-1)return;const Ee=y[re];Ee!==void 0&&(Ee.update($.inputSource,$.frame,c||a),Ee.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let $=0;$<y.length;$++){const re=b[$];re!==null&&(b[$]=null,y[$].disconnect(re))}R=null,W=null,g.reset(),e.setRenderTarget(f),_=null,d=null,u=null,r=null,w=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:_},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(U),r.renderState.layers===void 0){const re={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),w=new ui(_.framebufferWidth,_.framebufferHeight,{format:Vt,type:an,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let re=null,Ee=null,he=null;p.depth&&(he=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=p.stencil?Wi:Oi,Ee=p.stencil?Bi:hi);const Pe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new ui(d.textureWidth,d.textureHeight,{format:Vt,type:an,depthTexture:new Rc(d.textureWidth,d.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),it.setContext(r),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j($){for(let re=0;re<$.removed.length;re++){const Ee=$.removed[re],he=b.indexOf(Ee);he>=0&&(b[he]=null,y[he].disconnect(Ee))}for(let re=0;re<$.added.length;re++){const Ee=$.added[re];let he=b.indexOf(Ee);if(he===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=b.length){b.push(Ee),he=Ie;break}else if(b[Ie]===null){b[Ie]=Ee,he=Ie;break}if(he===-1)break}const Pe=y[he];Pe&&Pe.connect(Ee)}}const Y=new O,ee=new O;function V($,re,Ee){Y.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(Ee.matrixWorld);const he=Y.distanceTo(ee),Pe=re.projectionMatrix.elements,Ie=Ee.projectionMatrix.elements,Ge=Pe[14]/(Pe[10]-1),dt=Pe[14]/(Pe[10]+1),qe=(Pe[9]+1)/Pe[5],mt=(Pe[9]-1)/Pe[5],D=(Pe[8]-1)/Pe[0],Xt=(Ie[8]+1)/Ie[0],Be=Ge*D,We=Ge*Xt,Re=he/(-D+Xt),ot=Re*-D;if(re.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ot),$.translateZ(Re),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pe[10]===-1)$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Te=Ge+Re,E=dt+Re,v=Be-ot,N=We+(he-ot),K=qe*dt/E*Te,J=mt*dt/E*Te;$.projectionMatrix.makePerspective(v,N,K,J,Te,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,re){re===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(re.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let re=$.near,Ee=$.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(Ee=g.depthFar)),M.near=I.near=T.near=re,M.far=I.far=T.far=Ee,(R!==M.near||W!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,W=M.far),T.layers.mask=$.layers.mask|2,I.layers.mask=$.layers.mask|4,M.layers.mask=T.layers.mask|I.layers.mask;const he=$.parent,Pe=M.cameras;le(M,he);for(let Ie=0;Ie<Pe.length;Ie++)le(Pe[Ie],he);Pe.length===2?V(M,T,I):M.projectionMatrix.copy(T.projectionMatrix),me($,M,he)};function me($,re,Ee){Ee===null?$.matrix.copy(re.matrixWorld):($.matrix.copy(Ee.matrixWorld),$.matrix.invert(),$.matrix.multiply(re.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ha*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&_===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let Ae=null;function He($,re){if(h=re.getViewerPose(c||a),m=re,h!==null){const Ee=h.views;_!==null&&(e.setRenderTargetFramebuffer(w,_.framebuffer),e.setRenderTarget(w));let he=!1;Ee.length!==M.cameras.length&&(M.cameras.length=0,he=!0);for(let Ie=0;Ie<Ee.length;Ie++){const Ge=Ee[Ie];let dt=null;if(_!==null)dt=_.getViewport(Ge);else{const mt=u.getViewSubImage(d,Ge);dt=mt.viewport,Ie===0&&(e.setRenderTargetTextures(w,mt.colorTexture,d.ignoreDepthValues?void 0:mt.depthStencilTexture),e.setRenderTarget(w))}let qe=S[Ie];qe===void 0&&(qe=new Zt,qe.layers.enable(Ie),qe.viewport=new gt,S[Ie]=qe),qe.matrix.fromArray(Ge.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(Ge.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(dt.x,dt.y,dt.width,dt.height),Ie===0&&(M.matrix.copy(qe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),he===!0&&M.cameras.push(qe)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){const Ie=u.getDepthInformation(Ee[0]);Ie&&Ie.isValid&&Ie.texture&&g.init(e,Ie,r.renderState)}}for(let Ee=0;Ee<y.length;Ee++){const he=b[Ee],Pe=y[Ee];he!==null&&Pe!==void 0&&Pe.update(he,re,c||a)}Ae&&Ae($,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),m=null}const it=new Tc;it.setAnimationLoop(He),this.setAnimationLoop=function($){Ae=$},this.dispose=function(){}}}const ei=new on,Z_=new xt;function j_(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Sc(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,w,y,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&_(p,f,b)):f.isMeshMatcapMaterial?(s(p,f),m(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),g(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,w,y):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ot&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ot&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const w=e.get(f),y=w.envMap,b=w.envMapRotation;y&&(p.envMap.value=y,ei.copy(b),ei.x*=-1,ei.y*=-1,ei.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),p.envMapRotation.value.setFromMatrix4(Z_.makeRotationFromEuler(ei)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,w,y){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*w,p.scale.value=y*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function _(p,f,w){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ot&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function g(p,f){const w=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function J_(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,y){const b=y.program;i.uniformBlockBinding(w,b)}function c(w,y){let b=r[w.id];b===void 0&&(m(w),b=h(w),r[w.id]=b,w.addEventListener("dispose",p));const U=y.program;i.updateUBOMapping(w,U);const A=e.render.frame;s[w.id]!==A&&(d(w),s[w.id]=A)}function h(w){const y=u();w.__bindingPointIndex=y;const b=n.createBuffer(),U=w.__size,A=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,U,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const y=r[w.id],b=w.uniforms,U=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,T=b.length;A<T;A++){const I=Array.isArray(b[A])?b[A]:[b[A]];for(let S=0,M=I.length;S<M;S++){const R=I[S];if(_(R,A,S,U)===!0){const W=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let j=0;j<F.length;j++){const Y=F[j],ee=g(Y);typeof Y=="number"||typeof Y=="boolean"?(R.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,W+X,R.__data)):Y.isMatrix3?(R.__data[0]=Y.elements[0],R.__data[1]=Y.elements[1],R.__data[2]=Y.elements[2],R.__data[3]=0,R.__data[4]=Y.elements[3],R.__data[5]=Y.elements[4],R.__data[6]=Y.elements[5],R.__data[7]=0,R.__data[8]=Y.elements[6],R.__data[9]=Y.elements[7],R.__data[10]=Y.elements[8],R.__data[11]=0):(Y.toArray(R.__data,X),X+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function _(w,y,b,U){const A=w.value,T=y+"_"+b;if(U[T]===void 0)return typeof A=="number"||typeof A=="boolean"?U[T]=A:U[T]=A.clone(),!0;{const I=U[T];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return U[T]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function m(w){const y=w.uniforms;let b=0;const U=16;for(let T=0,I=y.length;T<I;T++){const S=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,R=S.length;M<R;M++){const W=S[M],F=Array.isArray(W.value)?W.value:[W.value];for(let X=0,j=F.length;X<j;X++){const Y=F[X],ee=g(Y),V=b%U,le=V%ee.boundary,me=V+le;b+=le,me!==0&&U-me<ee.storage&&(b+=U-me),W.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=ee.storage}}}const A=b%U;return A>0&&(b+=U-A),w.__size=b,w.__cache={},this}function g(w){const y={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(y.boundary=4,y.storage=4):w.isVector2?(y.boundary=8,y.storage=8):w.isVector3||w.isColor?(y.boundary=16,y.storage=12):w.isVector4?(y.boundary=16,y.storage=16):w.isMatrix3?(y.boundary=48,y.storage=48):w.isMatrix4?(y.boundary=64,y.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),y}function p(w){const y=w.target;y.removeEventListener("dispose",p);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function f(){for(const w in r)n.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Q_{constructor(e={}){const{canvas:t=kh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const m=new Uint32Array(4),g=new Int32Array(4);let p=null,f=null;const w=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kt,this.toneMapping=Wn,this.toneMappingExposure=1;const b=this;let U=!1,A=0,T=0,I=null,S=-1,M=null;const R=new gt,W=new gt;let F=null;const X=new Je(0);let j=0,Y=t.width,ee=t.height,V=1,le=null,me=null;const Ae=new gt(0,0,Y,ee),He=new gt(0,0,Y,ee);let it=!1;const $=new Ac;let re=!1,Ee=!1;const he=new xt,Pe=new xt,Ie=new O,Ge=new gt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function mt(){return I===null?V:1}let D=i;function Xt(x,P){return t.getContext(x,P)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xa}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",de,!1),D===null){const P="webgl2";if(D=Xt(P,x),D===null)throw Xt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Be,We,Re,ot,Te,E,v,N,K,J,q,ye,ue,ge,$e,te,ve,Ce,Le,xe,Xe,Oe,st,C;function ce(){Be=new rp(D),Be.init(),Oe=new B_(D,Be),We=new jf(D,Be,e,Oe),Re=new H_(D,Be),We.reverseDepthBuffer&&d&&Re.buffers.depth.setReversed(!0),ot=new op(D),Te=new w_,E=new V_(D,Be,Re,Te,We,Oe,ot),v=new Qf(b),N=new ip(b),K=new du(D),st=new Kf(D,K),J=new sp(D,K,ot,st),q=new cp(D,J,K,ot),Le=new lp(D,We,E),te=new Jf(Te),ye=new y_(b,v,N,Be,We,st,te),ue=new j_(b,Te),ge=new T_,$e=new I_(Be),Ce=new $f(b,v,N,Re,q,_,l),ve=new z_(b,q,We),C=new J_(D,ot,We,Re),xe=new Zf(D,Be,ot),Xe=new ap(D,Be,ot),ot.programs=ye.programs,b.capabilities=We,b.extensions=Be,b.properties=Te,b.renderLists=ge,b.shadowMap=ve,b.state=Re,b.info=ot}ce();const B=new K_(b,D);this.xr=B,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=Be.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Be.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(x){x!==void 0&&(V=x,this.setSize(Y,ee,!1))},this.getSize=function(x){return x.set(Y,ee)},this.setSize=function(x,P,k=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=x,ee=P,t.width=Math.floor(x*V),t.height=Math.floor(P*V),k===!0&&(t.style.width=x+"px",t.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(Y*V,ee*V).floor()},this.setDrawingBufferSize=function(x,P,k){Y=x,ee=P,V=k,t.width=Math.floor(x*k),t.height=Math.floor(P*k),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(Ae)},this.setViewport=function(x,P,k,H){x.isVector4?Ae.set(x.x,x.y,x.z,x.w):Ae.set(x,P,k,H),Re.viewport(R.copy(Ae).multiplyScalar(V).round())},this.getScissor=function(x){return x.copy(He)},this.setScissor=function(x,P,k,H){x.isVector4?He.set(x.x,x.y,x.z,x.w):He.set(x,P,k,H),Re.scissor(W.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(x){Re.setScissorTest(it=x)},this.setOpaqueSort=function(x){le=x},this.setTransparentSort=function(x){me=x},this.getClearColor=function(x){return x.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(x=!0,P=!0,k=!0){let H=0;if(x){let L=!1;if(I!==null){const ne=I.texture.format;L=ne===ja||ne===Za||ne===Ka}if(L){const ne=I.texture.type,fe=ne===an||ne===hi||ne===pr||ne===Bi||ne===qa||ne===$a,Me=Ce.getClearColor(),be=Ce.getClearAlpha(),De=Me.r,Ne=Me.g,Se=Me.b;fe?(m[0]=De,m[1]=Ne,m[2]=Se,m[3]=be,D.clearBufferuiv(D.COLOR,0,m)):(g[0]=De,g[1]=Ne,g[2]=Se,g[3]=be,D.clearBufferiv(D.COLOR,0,g))}else H|=D.COLOR_BUFFER_BIT}P&&(H|=D.DEPTH_BUFFER_BIT),k&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",de,!1),ge.dispose(),$e.dispose(),Te.dispose(),v.dispose(),N.dispose(),q.dispose(),st.dispose(),C.dispose(),ye.dispose(),B.dispose(),B.removeEventListener("sessionstart",po),B.removeEventListener("sessionend",_o),$n.stop()};function Z(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const x=ot.autoReset,P=ve.enabled,k=ve.autoUpdate,H=ve.needsUpdate,L=ve.type;ce(),ot.autoReset=x,ve.enabled=P,ve.autoUpdate=k,ve.needsUpdate=H,ve.type=L}function de(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ue(x){const P=x.target;P.removeEventListener("dispose",Ue),pt(P)}function pt(x){wt(x),Te.remove(x)}function wt(x){const P=Te.get(x).programs;P!==void 0&&(P.forEach(function(k){ye.releaseProgram(k)}),x.isShaderMaterial&&ye.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,k,H,L,ne){P===null&&(P=dt);const fe=L.isMesh&&L.matrixWorld.determinant()<0,Me=qc(x,P,k,H,L);Re.setMaterial(H,fe);let be=k.index,De=1;if(H.wireframe===!0){if(be=J.getWireframeAttribute(k),be===void 0)return;De=2}const Ne=k.drawRange,Se=k.attributes.position;let Ke=Ne.start*De,at=(Ne.start+Ne.count)*De;ne!==null&&(Ke=Math.max(Ke,ne.start*De),at=Math.min(at,(ne.start+ne.count)*De)),be!==null?(Ke=Math.max(Ke,0),at=Math.min(at,be.count)):Se!=null&&(Ke=Math.max(Ke,0),at=Math.min(at,Se.count));const lt=at-Ke;if(lt<0||lt===1/0)return;st.setup(L,H,Me,k,be);let Ut,Ze=xe;if(be!==null&&(Ut=K.get(be),Ze=Xe,Ze.setIndex(Ut)),L.isMesh)H.wireframe===!0?(Re.setLineWidth(H.wireframeLinewidth*mt()),Ze.setMode(D.LINES)):Ze.setMode(D.TRIANGLES);else if(L.isLine){let we=H.linewidth;we===void 0&&(we=1),Re.setLineWidth(we*mt()),L.isLineSegments?Ze.setMode(D.LINES):L.isLineLoop?Ze.setMode(D.LINE_LOOP):Ze.setMode(D.LINE_STRIP)}else L.isPoints?Ze.setMode(D.POINTS):L.isSprite&&Ze.setMode(D.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Ze.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))Ze.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const we=L._multiDrawStarts,vn=L._multiDrawCounts,je=L._multiDrawCount,Qt=be?K.get(be).bytesPerElement:1,_i=Te.get(H).currentProgram.getUniforms();for(let kt=0;kt<je;kt++)_i.setValue(D,"_gl_DrawID",kt),Ze.render(we[kt]/Qt,vn[kt])}else if(L.isInstancedMesh)Ze.renderInstances(Ke,lt,L.count);else if(k.isInstancedBufferGeometry){const we=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,vn=Math.min(k.instanceCount,we);Ze.renderInstances(Ke,lt,vn)}else Ze.render(Ke,lt)};function et(x,P,k){x.transparent===!0&&x.side===pn&&x.forceSinglePass===!1?(x.side=Ot,x.needsUpdate=!0,Er(x,P,k),x.side=Xn,x.needsUpdate=!0,Er(x,P,k),x.side=pn):Er(x,P,k)}this.compile=function(x,P,k=null){k===null&&(k=x),f=$e.get(k),f.init(P),y.push(f),k.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),x!==k&&x.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();const H=new Set;return x.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const ne=L.material;if(ne)if(Array.isArray(ne))for(let fe=0;fe<ne.length;fe++){const Me=ne[fe];et(Me,k,L),H.add(Me)}else et(ne,k,L),H.add(ne)}),y.pop(),f=null,H},this.compileAsync=function(x,P,k=null){const H=this.compile(x,P,k);return new Promise(L=>{function ne(){if(H.forEach(function(fe){Te.get(fe).currentProgram.isReady()&&H.delete(fe)}),H.size===0){L(x);return}setTimeout(ne,10)}Be.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Jt=null;function gn(x){Jt&&Jt(x)}function po(){$n.stop()}function _o(){$n.start()}const $n=new Tc;$n.setAnimationLoop(gn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(x){Jt=x,B.setAnimationLoop(x),x===null?$n.stop():$n.start()},B.addEventListener("sessionstart",po),B.addEventListener("sessionend",_o),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(P),P=B.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,P,I),f=$e.get(x,y.length),f.init(P),y.push(f),Pe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),$.setFromProjectionMatrix(Pe),Ee=this.localClippingEnabled,re=te.init(this.clippingPlanes,Ee),p=ge.get(x,w.length),p.init(),w.push(p),B.enabled===!0&&B.isPresenting===!0){const ne=b.xr.getDepthSensingMesh();ne!==null&&_s(ne,P,-1/0,b.sortObjects)}_s(x,P,0,b.sortObjects),p.finish(),b.sortObjects===!0&&p.sort(le,me),qe=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,qe&&Ce.addToRenderList(p,x),this.info.render.frame++,re===!0&&te.beginShadows();const k=f.state.shadowsArray;ve.render(k,x,P),re===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=p.opaque,L=p.transmissive;if(f.setupLights(),P.isArrayCamera){const ne=P.cameras;if(L.length>0)for(let fe=0,Me=ne.length;fe<Me;fe++){const be=ne[fe];go(H,L,x,be)}qe&&Ce.render(x);for(let fe=0,Me=ne.length;fe<Me;fe++){const be=ne[fe];mo(p,x,be,be.viewport)}}else L.length>0&&go(H,L,x,P),qe&&Ce.render(x),mo(p,x,P);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(b,x,P),st.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(f=y[y.length-1],re===!0&&te.setGlobalState(b.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?p=w[w.length-1]:p=null};function _s(x,P,k,H){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)k=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$.intersectsSprite(x)){H&&Ge.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Pe);const fe=q.update(x),Me=x.material;Me.visible&&p.push(x,fe,Me,k,Ge.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||$.intersectsObject(x))){const fe=q.update(x),Me=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ge.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ge.copy(fe.boundingSphere.center)),Ge.applyMatrix4(x.matrixWorld).applyMatrix4(Pe)),Array.isArray(Me)){const be=fe.groups;for(let De=0,Ne=be.length;De<Ne;De++){const Se=be[De],Ke=Me[Se.materialIndex];Ke&&Ke.visible&&p.push(x,fe,Ke,k,Ge.z,Se)}}else Me.visible&&p.push(x,fe,Me,k,Ge.z,null)}}const ne=x.children;for(let fe=0,Me=ne.length;fe<Me;fe++)_s(ne[fe],P,k,H)}function mo(x,P,k,H){const L=x.opaque,ne=x.transmissive,fe=x.transparent;f.setupLightsView(k),re===!0&&te.setGlobalState(b.clippingPlanes,k),H&&Re.viewport(R.copy(H)),L.length>0&&Sr(L,P,k),ne.length>0&&Sr(ne,P,k),fe.length>0&&Sr(fe,P,k),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function go(x,P,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new ui(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?mr:an,minFilter:li,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const ne=f.state.transmissionRenderTarget[H.id],fe=H.viewport||R;ne.setSize(fe.z,fe.w);const Me=b.getRenderTarget();b.setRenderTarget(ne),b.getClearColor(X),j=b.getClearAlpha(),j<1&&b.setClearColor(16777215,.5),b.clear(),qe&&Ce.render(k);const be=b.toneMapping;b.toneMapping=Wn;const De=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),re===!0&&te.setGlobalState(b.clippingPlanes,H),Sr(x,k,H),E.updateMultisampleRenderTarget(ne),E.updateRenderTargetMipmap(ne),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Se=0,Ke=P.length;Se<Ke;Se++){const at=P[Se],lt=at.object,Ut=at.geometry,Ze=at.material,we=at.group;if(Ze.side===pn&&lt.layers.test(H.layers)){const vn=Ze.side;Ze.side=Ot,Ze.needsUpdate=!0,vo(lt,k,H,Ut,Ze,we),Ze.side=vn,Ze.needsUpdate=!0,Ne=!0}}Ne===!0&&(E.updateMultisampleRenderTarget(ne),E.updateRenderTargetMipmap(ne))}b.setRenderTarget(Me),b.setClearColor(X,j),De!==void 0&&(H.viewport=De),b.toneMapping=be}function Sr(x,P,k){const H=P.isScene===!0?P.overrideMaterial:null;for(let L=0,ne=x.length;L<ne;L++){const fe=x[L],Me=fe.object,be=fe.geometry,De=H===null?fe.material:H,Ne=fe.group;Me.layers.test(k.layers)&&vo(Me,P,k,be,De,Ne)}}function vo(x,P,k,H,L,ne){x.onBeforeRender(b,P,k,H,L,ne),x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),L.onBeforeRender(b,P,k,H,x,ne),L.transparent===!0&&L.side===pn&&L.forceSinglePass===!1?(L.side=Ot,L.needsUpdate=!0,b.renderBufferDirect(k,P,H,L,x,ne),L.side=Xn,L.needsUpdate=!0,b.renderBufferDirect(k,P,H,L,x,ne),L.side=pn):b.renderBufferDirect(k,P,H,L,x,ne),x.onAfterRender(b,P,k,H,L,ne)}function Er(x,P,k){P.isScene!==!0&&(P=dt);const H=Te.get(x),L=f.state.lights,ne=f.state.shadowsArray,fe=L.state.version,Me=ye.getParameters(x,L.state,ne,P,k),be=ye.getProgramCacheKey(Me);let De=H.programs;H.environment=x.isMeshStandardMaterial?P.environment:null,H.fog=P.fog,H.envMap=(x.isMeshStandardMaterial?N:v).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,De===void 0&&(x.addEventListener("dispose",Ue),De=new Map,H.programs=De);let Ne=De.get(be);if(Ne!==void 0){if(H.currentProgram===Ne&&H.lightsStateVersion===fe)return Mo(x,Me),Ne}else Me.uniforms=ye.getUniforms(x),x.onBeforeCompile(Me,b),Ne=ye.acquireProgram(Me,be),De.set(be,Ne),H.uniforms=Me.uniforms;const Se=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Se.clippingPlanes=te.uniform),Mo(x,Me),H.needsLights=Kc(x),H.lightsStateVersion=fe,H.needsLights&&(Se.ambientLightColor.value=L.state.ambient,Se.lightProbe.value=L.state.probe,Se.directionalLights.value=L.state.directional,Se.directionalLightShadows.value=L.state.directionalShadow,Se.spotLights.value=L.state.spot,Se.spotLightShadows.value=L.state.spotShadow,Se.rectAreaLights.value=L.state.rectArea,Se.ltc_1.value=L.state.rectAreaLTC1,Se.ltc_2.value=L.state.rectAreaLTC2,Se.pointLights.value=L.state.point,Se.pointLightShadows.value=L.state.pointShadow,Se.hemisphereLights.value=L.state.hemi,Se.directionalShadowMap.value=L.state.directionalShadowMap,Se.directionalShadowMatrix.value=L.state.directionalShadowMatrix,Se.spotShadowMap.value=L.state.spotShadowMap,Se.spotLightMatrix.value=L.state.spotLightMatrix,Se.spotLightMap.value=L.state.spotLightMap,Se.pointShadowMap.value=L.state.pointShadowMap,Se.pointShadowMatrix.value=L.state.pointShadowMatrix),H.currentProgram=Ne,H.uniformsList=null,Ne}function xo(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=ts.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function Mo(x,P){const k=Te.get(x);k.outputColorSpace=P.outputColorSpace,k.batching=P.batching,k.batchingColor=P.batchingColor,k.instancing=P.instancing,k.instancingColor=P.instancingColor,k.instancingMorph=P.instancingMorph,k.skinning=P.skinning,k.morphTargets=P.morphTargets,k.morphNormals=P.morphNormals,k.morphColors=P.morphColors,k.morphTargetsCount=P.morphTargetsCount,k.numClippingPlanes=P.numClippingPlanes,k.numIntersection=P.numClipIntersection,k.vertexAlphas=P.vertexAlphas,k.vertexTangents=P.vertexTangents,k.toneMapping=P.toneMapping}function qc(x,P,k,H,L){P.isScene!==!0&&(P=dt),E.resetTextureUnits();const ne=P.fog,fe=H.isMeshStandardMaterial?P.environment:null,Me=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:di,be=(H.isMeshStandardMaterial?N:v).get(H.envMap||fe),De=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ne=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Se=!!k.morphAttributes.position,Ke=!!k.morphAttributes.normal,at=!!k.morphAttributes.color;let lt=Wn;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(lt=b.toneMapping);const Ut=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ze=Ut!==void 0?Ut.length:0,we=Te.get(H),vn=f.state.lights;if(re===!0&&(Ee===!0||x!==M)){const Yt=x===M&&H.id===S;te.setState(H,x,Yt)}let je=!1;H.version===we.__version?(we.needsLights&&we.lightsStateVersion!==vn.state.version||we.outputColorSpace!==Me||L.isBatchedMesh&&we.batching===!1||!L.isBatchedMesh&&we.batching===!0||L.isBatchedMesh&&we.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&we.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&we.instancing===!1||!L.isInstancedMesh&&we.instancing===!0||L.isSkinnedMesh&&we.skinning===!1||!L.isSkinnedMesh&&we.skinning===!0||L.isInstancedMesh&&we.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&we.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&we.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&we.instancingMorph===!1&&L.morphTexture!==null||we.envMap!==be||H.fog===!0&&we.fog!==ne||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==te.numPlanes||we.numIntersection!==te.numIntersection)||we.vertexAlphas!==De||we.vertexTangents!==Ne||we.morphTargets!==Se||we.morphNormals!==Ke||we.morphColors!==at||we.toneMapping!==lt||we.morphTargetsCount!==Ze)&&(je=!0):(je=!0,we.__version=H.version);let Qt=we.currentProgram;je===!0&&(Qt=Er(H,P,L));let _i=!1,kt=!1,Zi=!1;const ct=Qt.getUniforms(),ln=we.uniforms;if(Re.useProgram(Qt.program)&&(_i=!0,kt=!0,Zi=!0),H.id!==S&&(S=H.id,kt=!0),_i||M!==x){Re.buffers.depth.getReversed()?(he.copy(x.projectionMatrix),Gh(he),Vh(he),ct.setValue(D,"projectionMatrix",he)):ct.setValue(D,"projectionMatrix",x.projectionMatrix),ct.setValue(D,"viewMatrix",x.matrixWorldInverse);const Dn=ct.map.cameraPosition;Dn!==void 0&&Dn.setValue(D,Ie.setFromMatrixPosition(x.matrixWorld)),We.logarithmicDepthBuffer&&ct.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ct.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,kt=!0,Zi=!0)}if(L.isSkinnedMesh){ct.setOptional(D,L,"bindMatrix"),ct.setOptional(D,L,"bindMatrixInverse");const Yt=L.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),ct.setValue(D,"boneTexture",Yt.boneTexture,E))}L.isBatchedMesh&&(ct.setOptional(D,L,"batchingTexture"),ct.setValue(D,"batchingTexture",L._matricesTexture,E),ct.setOptional(D,L,"batchingIdTexture"),ct.setValue(D,"batchingIdTexture",L._indirectTexture,E),ct.setOptional(D,L,"batchingColorTexture"),L._colorsTexture!==null&&ct.setValue(D,"batchingColorTexture",L._colorsTexture,E));const ji=k.morphAttributes;if((ji.position!==void 0||ji.normal!==void 0||ji.color!==void 0)&&Le.update(L,k,Qt),(kt||we.receiveShadow!==L.receiveShadow)&&(we.receiveShadow=L.receiveShadow,ct.setValue(D,"receiveShadow",L.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ln.envMap.value=be,ln.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&P.environment!==null&&(ln.envMapIntensity.value=P.environmentIntensity),kt&&(ct.setValue(D,"toneMappingExposure",b.toneMappingExposure),we.needsLights&&$c(ln,Zi),ne&&H.fog===!0&&ue.refreshFogUniforms(ln,ne),ue.refreshMaterialUniforms(ln,H,V,ee,f.state.transmissionRenderTarget[x.id]),ts.upload(D,xo(we),ln,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ts.upload(D,xo(we),ln,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ct.setValue(D,"center",L.center),ct.setValue(D,"modelViewMatrix",L.modelViewMatrix),ct.setValue(D,"normalMatrix",L.normalMatrix),ct.setValue(D,"modelMatrix",L.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Yt=H.uniformsGroups;for(let Dn=0,In=Yt.length;Dn<In;Dn++){const bo=Yt[Dn];C.update(bo,Qt),C.bind(bo,Qt)}}return Qt}function $c(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Kc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,P,k){Te.get(x.texture).__webglTexture=P,Te.get(x.depthTexture).__webglTexture=k;const H=Te.get(x);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,P){const k=Te.get(x);k.__webglFramebuffer=P,k.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,k=0){I=x,A=P,T=k;let H=!0,L=null,ne=!1,fe=!1;if(x){const be=Te.get(x);if(be.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(be.__webglFramebuffer===void 0)E.setupRenderTarget(x);else if(be.__hasExternalTextures)E.rebindTextures(x,Te.get(x.texture).__webglTexture,Te.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Se=x.depthTexture;if(be.__boundDepthTexture!==Se){if(Se!==null&&Te.has(Se)&&(x.width!==Se.image.width||x.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(x)}}const De=x.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(fe=!0);const Ne=Te.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ne[P])?L=Ne[P][k]:L=Ne[P],ne=!0):x.samples>0&&E.useMultisampledRTT(x)===!1?L=Te.get(x).__webglMultisampledFramebuffer:Array.isArray(Ne)?L=Ne[k]:L=Ne,R.copy(x.viewport),W.copy(x.scissor),F=x.scissorTest}else R.copy(Ae).multiplyScalar(V).floor(),W.copy(He).multiplyScalar(V).floor(),F=it;if(Re.bindFramebuffer(D.FRAMEBUFFER,L)&&H&&Re.drawBuffers(x,L),Re.viewport(R),Re.scissor(W),Re.setScissorTest(F),ne){const be=Te.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,be.__webglTexture,k)}else if(fe){const be=Te.get(x.texture),De=P||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.__webglTexture,k||0,De)}S=-1},this.readRenderTargetPixels=function(x,P,k,H,L,ne,fe){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Te.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){Re.bindFramebuffer(D.FRAMEBUFFER,Me);try{const be=x.texture,De=be.format,Ne=be.type;if(!We.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-H&&k>=0&&k<=x.height-L&&D.readPixels(P,k,H,L,Oe.convert(De),Oe.convert(Ne),ne)}finally{const be=I!==null?Te.get(I).__webglFramebuffer:null;Re.bindFramebuffer(D.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(x,P,k,H,L,ne,fe){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Te.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){const be=x.texture,De=be.format,Ne=be.type;if(!We.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=x.width-H&&k>=0&&k<=x.height-L){Re.bindFramebuffer(D.FRAMEBUFFER,Me);const Se=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Se),D.bufferData(D.PIXEL_PACK_BUFFER,ne.byteLength,D.STREAM_READ),D.readPixels(P,k,H,L,Oe.convert(De),Oe.convert(Ne),0);const Ke=I!==null?Te.get(I).__webglFramebuffer:null;Re.bindFramebuffer(D.FRAMEBUFFER,Ke);const at=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Hh(D,at,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Se),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ne),D.deleteBuffer(Se),D.deleteSync(at),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,P=null,k=0){x.isTexture!==!0&&(cr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,x=arguments[1]);const H=Math.pow(2,-k),L=Math.floor(x.image.width*H),ne=Math.floor(x.image.height*H),fe=P!==null?P.x:0,Me=P!==null?P.y:0;E.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,fe,Me,L,ne),Re.unbindTexture()},this.copyTextureToTexture=function(x,P,k=null,H=null,L=0){x.isTexture!==!0&&(cr("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,x=arguments[1],P=arguments[2],L=arguments[3]||0,k=null);let ne,fe,Me,be,De,Ne,Se,Ke,at;const lt=x.isCompressedTexture?x.mipmaps[L]:x.image;k!==null?(ne=k.max.x-k.min.x,fe=k.max.y-k.min.y,Me=k.isBox3?k.max.z-k.min.z:1,be=k.min.x,De=k.min.y,Ne=k.isBox3?k.min.z:0):(ne=lt.width,fe=lt.height,Me=lt.depth||1,be=0,De=0,Ne=0),H!==null?(Se=H.x,Ke=H.y,at=H.z):(Se=0,Ke=0,at=0);const Ut=Oe.convert(P.format),Ze=Oe.convert(P.type);let we;P.isData3DTexture?(E.setTexture3D(P,0),we=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(E.setTexture2DArray(P,0),we=D.TEXTURE_2D_ARRAY):(E.setTexture2D(P,0),we=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const vn=D.getParameter(D.UNPACK_ROW_LENGTH),je=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Qt=D.getParameter(D.UNPACK_SKIP_PIXELS),_i=D.getParameter(D.UNPACK_SKIP_ROWS),kt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,lt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,be),D.pixelStorei(D.UNPACK_SKIP_ROWS,De),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ne);const Zi=x.isDataArrayTexture||x.isData3DTexture,ct=P.isDataArrayTexture||P.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const ln=Te.get(x),ji=Te.get(P),Yt=Te.get(ln.__renderTarget),Dn=Te.get(ji.__renderTarget);Re.bindFramebuffer(D.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Re.bindFramebuffer(D.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let In=0;In<Me;In++)Zi&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.get(x).__webglTexture,L,Ne+In),x.isDepthTexture?(ct&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.get(P).__webglTexture,L,at+In),D.blitFramebuffer(be,De,ne,fe,Se,Ke,ne,fe,D.DEPTH_BUFFER_BIT,D.NEAREST)):ct?D.copyTexSubImage3D(we,L,Se,Ke,at+In,be,De,ne,fe):D.copyTexSubImage2D(we,L,Se,Ke,at+In,be,De,ne,fe);Re.bindFramebuffer(D.READ_FRAMEBUFFER,null),Re.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ct?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(we,L,Se,Ke,at,ne,fe,Me,Ut,Ze,lt.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(we,L,Se,Ke,at,ne,fe,Me,Ut,lt.data):D.texSubImage3D(we,L,Se,Ke,at,ne,fe,Me,Ut,Ze,lt):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,L,Se,Ke,ne,fe,Ut,Ze,lt.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,L,Se,Ke,lt.width,lt.height,Ut,lt.data):D.texSubImage2D(D.TEXTURE_2D,L,Se,Ke,ne,fe,Ut,Ze,lt);D.pixelStorei(D.UNPACK_ROW_LENGTH,vn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,je),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Qt),D.pixelStorei(D.UNPACK_SKIP_ROWS,_i),D.pixelStorei(D.UNPACK_SKIP_IMAGES,kt),L===0&&P.generateMipmaps&&D.generateMipmap(we),Re.unbindTexture()},this.copyTextureToTexture3D=function(x,P,k=null,H=null,L=0){return x.isTexture!==!0&&(cr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,x=arguments[2],P=arguments[3],L=arguments[4]||0),cr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,P,k,H,L)},this.initRenderTarget=function(x){Te.get(x).__webglFramebuffer===void 0&&E.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?E.setTextureCube(x,0):x.isData3DTexture?E.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?E.setTexture2DArray(x,0):E.setTexture2D(x,0),Re.unbindTexture()},this.resetState=function(){A=0,T=0,I=null,Re.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}class to{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=i}clone(){return new to(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class em extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tm extends It{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Dt,h=Dt,u,d){super(null,a,o,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nm{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ml(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Ml();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Ml(){return performance.now()}class im extends fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xa);const Pi=new on(0,0,0,"YXZ"),Li=new O,rm={type:"change"},sm={type:"lock"},am={type:"unlock"},bl=Math.PI/2;class om extends im{constructor(e,t=null){super(e,t),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=lm.bind(this),this._onPointerlockChange=cm.bind(this),this._onPointerlockError=hm.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const t=this.object;Li.setFromMatrixColumn(t.matrix,0),Li.crossVectors(t.up,Li),t.position.addScaledVector(Li,e)}moveRight(e){if(this.enabled===!1)return;const t=this.object;Li.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(Li,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function lm(n){if(this.enabled===!1||this.isLocked===!1)return;const e=n.movementX||n.mozMovementX||n.webkitMovementX||0,t=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.object;Pi.setFromQuaternion(i.quaternion),Pi.y-=e*.002*this.pointerSpeed,Pi.x-=t*.002*this.pointerSpeed,Pi.x=Math.max(bl-this.maxPolarAngle,Math.min(bl-this.minPolarAngle,Pi.x)),i.quaternion.setFromEuler(Pi),this.dispatchEvent(rm)}function cm(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(sm),this.isLocked=!0):(this.dispatchEvent(am),this.isLocked=!1)}function hm(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const ke={TICK:.05,WALK_SPEED:.1,SPRINT_MULTIPLIER:1.3,SNEAK_MULTIPLIER:.3,AIR_SPEED:.02,AIR_SPRINT_SPEED:.026,FLY_SPEED:.05,BLOCK_FRICTION:.6,AIR_FRICTION:.91,GRAVITY:.08,VERTICAL_DRAG:.98,FLY_VERTICAL_DRAG:.6,JUMP_POWER:.42,SPRINT_JUMP_BOOST:.2,JUMP_DELAY:10,WATER_SPEED:.02,WATER_DRAG:.8,WATER_SPRINT_DRAG:.9,WATER_JUMP:.04,WATER_JUMP_THRESHOLD:.4,STEP_HEIGHT:.6,MIN_VELOCITY:.003},Ic={standing:{width:.6,height:1.8,eye:1.62},crouching:{width:.6,height:1.5,eye:1.27}};class um{pos={x:.5,y:120,z:.5};prevPos={x:.5,y:120,z:.5};velocity={x:0,y:0,z:0};onGround=!1;horizontalCollision=!1;flying=!1;sprinting=!1;pose="standing";noJumpDelay=0;waterHeight=0;lavaHeight=0;underWater=!1;underLava=!1;walkDist=0;prevWalkDist=0;bob=0;prevBob=0;get body(){return Ic[this.pose]}get inWater(){return this.waterHeight>0}get inLava(){return this.lavaHeight>0}get speedAttribute(){return ke.WALK_SPEED*(this.sprinting?ke.SPRINT_MULTIPLIER:1)}get state(){if(this.flying)return this.sprinting?"飞行（疾跑）":"飞行";const e=[];return this.inWater&&e.push(this.underWater?"水下":"水中"),this.inLava&&e.push("岩浆中"),this.pose==="crouching"?e.push("潜行"):this.sprinting?e.push("疾跑"):e.push("行走"),e.join(" · ")}}const dm=["air","void_air","cave_air"],fm=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],pm=["sand","red_sand","suspicious_sand"],_m=["snow","snow_block","powder_snow"],mm=["ice","packed_ice","blue_ice","frosted_ice"],gm=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves"],vm=["dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],xm=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","sunflower","lilac","peony","rose_bush","pitcher_plant","flowering_azalea_leaves","flowering_azalea","mangrove_propagule","cherry_leaves","pink_petals","chorus_flower","spore_blossom"],Mm=["dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom"],bm=["stone","granite","diorite","andesite","tuff","deepslate"],Sm=["netherrack","basalt","blackstone"],Em=["stone","granite","diorite","andesite"],ym=["deepslate","tuff"],wm=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault"],Am=["air","water","lava","short_grass","fern","dead_bush","seagrass","tall_seagrass","fire","soul_fire","snow","vine","glow_lichen","resin_clump","light","tall_grass","large_fern","structure_void","void_air","cave_air","bubble_column","warped_roots","nether_sprouts","crimson_roots","hanging_roots"],Tm=["jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dandelion","open_eyeblossom","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","wither_rose","torchflower","closed_eyeblossom","pale_moss_carpet","short_grass","fern","dead_bush","vine","glow_lichen","sunflower","lilac","rose_bush","peony","tall_grass","large_fern","hanging_roots","pitcher_plant","water","seagrass","tall_seagrass","warped_roots","nether_sprouts","crimson_roots"],Rm=["mud","muddy_mangrove_roots","mangrove_roots","mangrove_leaves","mangrove_log","mangrove_propagule","moss_carpet","vine"],Cm=["mud","muddy_mangrove_roots","mangrove_roots","moss_carpet","vine","mangrove_propagule","snow"],Pm=["dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","snow_block","powder_snow"],Lm=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","red_sand","clay","gravel","sand","snow_block","powder_snow"],Dm=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","clay","gravel","sand"],Im=["stone","granite","diorite","andesite","tuff","deepslate","cave_vines_plant","cave_vines","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Um=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_ore","deepslate_iron_ore","copper_ore","deepslate_copper_ore","snow","snow_block","powder_snow","water","gravel","suspicious_gravel","sandstone","red_sandstone","calcite","packed_ice","raw_iron_block","raw_copper_block"],Nm=["ice","packed_ice","barrier"],Fm=["honey_block","soul_sand","mud"],Om=["bedrock","water","lava","ice","packed_ice","blue_ice"],zm=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone"],km=["stone","granite","diorite","andesite","tuff","deepslate","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","crimson_nylium","warped_nylium","netherrack","basalt","blackstone","sand","red_sand","gravel","soul_sand","soul_soil","calcite","smooth_basalt","clay","dripstone_block","end_stone","red_sandstone","sandstone","deepslate_bricks","deepslate_tiles","cobbled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","polished_deepslate"],Hm=["stone","granite","diorite","andesite","tuff","deepslate"],Gm=["tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block"],Vm=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral","tube_coral_fan","brain_coral_fan","bubble_coral_fan","fire_coral_fan","horn_coral_fan"],Bm=["tube_coral_wall_fan","brain_coral_wall_fan","bubble_coral_wall_fan","fire_coral_wall_fan","horn_coral_wall_fan"],Wm=["tube_coral","brain_coral","bubble_coral","fire_coral","horn_coral"],Xm=["bedrock","spawner","chest","end_portal_frame","reinforced_deepslate","trial_spawner","vault","jungle_leaves","oak_leaves","spruce_leaves","pale_oak_leaves","dark_oak_leaves","acacia_leaves","birch_leaves","azalea_leaves","flowering_azalea_leaves","mangrove_leaves","cherry_leaves","dark_oak_log","dark_oak_wood","stripped_dark_oak_log","stripped_dark_oak_wood","pale_oak_log","pale_oak_wood","stripped_pale_oak_log","stripped_pale_oak_wood","oak_log","oak_wood","stripped_oak_log","stripped_oak_wood","acacia_log","acacia_wood","stripped_acacia_log","stripped_acacia_wood","birch_log","birch_wood","stripped_birch_log","stripped_birch_wood","jungle_log","jungle_wood","stripped_jungle_log","stripped_jungle_wood","spruce_log","spruce_wood","stripped_spruce_log","stripped_spruce_wood","mangrove_log","mangrove_wood","stripped_mangrove_log","stripped_mangrove_wood","cherry_log","cherry_wood","stripped_cherry_log","stripped_cherry_wood","crimson_stem","stripped_crimson_stem","crimson_hyphae","stripped_crimson_hyphae","warped_stem","stripped_warped_stem","warped_hyphae","stripped_warped_hyphae"],Ym=["clay","moss_block"],qm=["clay","moss_block","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","pale_moss_block","mud","muddy_mangrove_roots","farmland"],$m=["sand","red_sand","suspicious_sand","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","bamboo","bamboo_sapling","gravel","suspicious_gravel"],Km=["sand","red_sand","suspicious_sand","terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots"],Zm=["mycelium","podzol","crimson_nylium","warped_nylium"],jm=["terracotta","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta"],Jm=["grass_block","mud","mangrove_roots","muddy_mangrove_roots"],Qm=["stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks"],eg=["white_wool","orange_wool","magenta_wool","light_blue_wool","yellow_wool","lime_wool","pink_wool","gray_wool","light_gray_wool","cyan_wool","purple_wool","blue_wool","brown_wool","green_wool","red_wool","black_wool"],tg=["white_carpet","orange_carpet","magenta_carpet","light_blue_carpet","yellow_carpet","lime_carpet","pink_carpet","gray_carpet","light_gray_carpet","cyan_carpet","purple_carpet","blue_carpet","brown_carpet","green_carpet","red_carpet","black_carpet"],ng=["stone","granite","diorite","andesite","tuff","deepslate","netherrack","basalt","blackstone","dirt","grass_block","podzol","coarse_dirt","mycelium","rooted_dirt","moss_block","pale_moss_block","mud","muddy_mangrove_roots","crimson_nylium","warped_nylium","nether_wart_block","warped_wart_block","soul_sand","soul_soil"],ig=["crimson_nylium","warped_nylium"],rg=["nether_wart_block","warped_wart_block"],sg=["soul_sand","soul_soil"],ag=["netherrack","magma_block"],og=["fire","soul_fire"],lg={air:dm,dirt:fm,sand:pm,snow:_m,ice:mm,leaves:gm,logs:vm,flowers:xm,small_flowers:Mm,base_stone_overworld:bm,base_stone_nether:Sm,stone_ore_replaceables:Em,deepslate_ore_replaceables:ym,features_cannot_replace:wm,replaceable:Am,replaceable_by_trees:Tm,mangrove_logs_can_grow_through:Rm,mangrove_roots_can_grow_through:Cm,azalea_grows_on:Pm,azalea_root_replaceable:Lm,lush_ground_replaceable:Dm,moss_replaceable:Im,overworld_carver_replaceables:Um,snow_layer_cannot_survive_on:Nm,snow_layer_can_survive_on:Fm,geode_invalid_blocks:Om,sculk_replaceable:zm,sculk_replaceable_world_gen:km,dripstone_replaceable_blocks:Hm,coral_blocks:Gm,corals:Vm,wall_corals:Bm,coral_plants:Wm,lava_pool_stone_cannot_replace:Xm,small_dripleaf_placeable:Ym,big_dripleaf_placeable:qm,bamboo_plantable_on:$m,dead_bush_may_place_on:Km,mushroom_grow_block:Zm,terracotta:jm,"mineable/pickaxe":["stone","granite","polished_granite","diorite","polished_diorite","andesite","polished_andesite","cobblestone","gold_ore","deepslate_gold_ore","iron_ore","deepslate_iron_ore","coal_ore","deepslate_coal_ore","nether_gold_ore","lapis_ore","deepslate_lapis_ore","lapis_block","dispenser","sandstone","chiseled_sandstone","cut_sandstone","gold_block","iron_block","bricks","mossy_cobblestone","obsidian","spawner","diamond_ore","deepslate_diamond_ore","diamond_block","furnace","cobblestone_stairs","stone_pressure_plate","iron_door","redstone_ore","deepslate_redstone_ore","netherrack","basalt","polished_basalt","stone_bricks","mossy_stone_bricks","cracked_stone_bricks","chiseled_stone_bricks","iron_bars","chain","brick_stairs","stone_brick_stairs","nether_bricks","nether_brick_fence","nether_brick_stairs","enchanting_table","brewing_stand","end_stone","sandstone_stairs","emerald_ore","deepslate_emerald_ore","ender_chest","emerald_block","light_weighted_pressure_plate","heavy_weighted_pressure_plate","redstone_block","nether_quartz_ore","hopper","quartz_block","chiseled_quartz_block","quartz_pillar","quartz_stairs","dropper","white_terracotta","orange_terracotta","magenta_terracotta","light_blue_terracotta","yellow_terracotta","lime_terracotta","pink_terracotta","gray_terracotta","light_gray_terracotta","cyan_terracotta","purple_terracotta","blue_terracotta","brown_terracotta","green_terracotta","red_terracotta","black_terracotta","iron_trapdoor","prismarine","prismarine_bricks","dark_prismarine","prismarine_stairs","prismarine_brick_stairs","dark_prismarine_stairs","prismarine_slab","prismarine_brick_slab","dark_prismarine_slab","terracotta","coal_block","red_sandstone","chiseled_red_sandstone","cut_red_sandstone","red_sandstone_stairs","stone_slab","smooth_stone_slab","sandstone_slab","cut_sandstone_slab","petrified_oak_slab","cobblestone_slab","brick_slab","stone_brick_slab","nether_brick_slab","quartz_slab","red_sandstone_slab","cut_red_sandstone_slab","purpur_slab","smooth_stone","smooth_sandstone","smooth_quartz","smooth_red_sandstone","purpur_block","purpur_pillar","purpur_stairs","end_stone_bricks","magma_block","red_nether_bricks","bone_block","observer","white_glazed_terracotta","orange_glazed_terracotta","magenta_glazed_terracotta","light_blue_glazed_terracotta","yellow_glazed_terracotta","lime_glazed_terracotta","pink_glazed_terracotta","gray_glazed_terracotta","light_gray_glazed_terracotta","cyan_glazed_terracotta","purple_glazed_terracotta","blue_glazed_terracotta","brown_glazed_terracotta","green_glazed_terracotta","red_glazed_terracotta","black_glazed_terracotta","white_concrete","orange_concrete","magenta_concrete","light_blue_concrete","yellow_concrete","lime_concrete","pink_concrete","gray_concrete","light_gray_concrete","cyan_concrete","purple_concrete","blue_concrete","brown_concrete","green_concrete","red_concrete","black_concrete","dead_tube_coral_block","dead_brain_coral_block","dead_bubble_coral_block","dead_fire_coral_block","dead_horn_coral_block","tube_coral_block","brain_coral_block","bubble_coral_block","fire_coral_block","horn_coral_block","dead_tube_coral","dead_brain_coral","dead_bubble_coral","dead_fire_coral","dead_horn_coral","dead_tube_coral_fan","dead_brain_coral_fan","dead_bubble_coral_fan","dead_fire_coral_fan","dead_horn_coral_fan","dead_tube_coral_wall_fan","dead_brain_coral_wall_fan","dead_bubble_coral_wall_fan","dead_fire_coral_wall_fan","dead_horn_coral_wall_fan","polished_granite_stairs","smooth_red_sandstone_stairs","mossy_stone_brick_stairs","polished_diorite_stairs","mossy_cobblestone_stairs","end_stone_brick_stairs","stone_stairs","smooth_sandstone_stairs","smooth_quartz_stairs","granite_stairs","andesite_stairs","red_nether_brick_stairs","polished_andesite_stairs","diorite_stairs","polished_granite_slab","smooth_red_sandstone_slab","mossy_stone_brick_slab","polished_diorite_slab","mossy_cobblestone_slab","end_stone_brick_slab","smooth_sandstone_slab","smooth_quartz_slab","granite_slab","andesite_slab","red_nether_brick_slab","polished_andesite_slab","diorite_slab","smoker","blast_furnace","grindstone","stonecutter","bell","lantern","soul_lantern","warped_nylium","crimson_nylium","netherite_block","ancient_debris","crying_obsidian","respawn_anchor","lodestone","blackstone","blackstone_stairs","blackstone_slab","polished_blackstone","polished_blackstone_bricks","cracked_polished_blackstone_bricks","chiseled_polished_blackstone","polished_blackstone_brick_slab","polished_blackstone_brick_stairs","gilded_blackstone","polished_blackstone_stairs","polished_blackstone_slab","polished_blackstone_pressure_plate","chiseled_nether_bricks","cracked_nether_bricks","quartz_bricks","tuff","calcite","oxidized_copper","weathered_copper","exposed_copper","copper_block","copper_ore","deepslate_copper_ore","oxidized_cut_copper","weathered_cut_copper","exposed_cut_copper","cut_copper","oxidized_cut_copper_stairs","weathered_cut_copper_stairs","exposed_cut_copper_stairs","cut_copper_stairs","oxidized_cut_copper_slab","weathered_cut_copper_slab","exposed_cut_copper_slab","cut_copper_slab","waxed_copper_block","waxed_weathered_copper","waxed_exposed_copper","waxed_oxidized_copper","waxed_oxidized_cut_copper","waxed_weathered_cut_copper","waxed_exposed_cut_copper","waxed_cut_copper","waxed_oxidized_cut_copper_stairs","waxed_weathered_cut_copper_stairs","waxed_exposed_cut_copper_stairs","waxed_cut_copper_stairs","waxed_oxidized_cut_copper_slab","waxed_weathered_cut_copper_slab","waxed_exposed_cut_copper_slab","waxed_cut_copper_slab","lightning_rod","pointed_dripstone","dripstone_block","deepslate","cobbled_deepslate","cobbled_deepslate_stairs","cobbled_deepslate_slab","polished_deepslate","polished_deepslate_stairs","polished_deepslate_slab","deepslate_tiles","deepslate_tile_stairs","deepslate_tile_slab","deepslate_bricks","deepslate_brick_stairs","deepslate_brick_slab","chiseled_deepslate","cracked_deepslate_bricks","cracked_deepslate_tiles","smooth_basalt","raw_iron_block","raw_copper_block","raw_gold_block","ice","packed_ice","blue_ice","piston","sticky_piston","piston_head","amethyst_cluster","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_block","budding_amethyst","infested_cobblestone","infested_chiseled_stone_bricks","infested_cracked_stone_bricks","infested_deepslate","infested_stone","infested_mossy_stone_bricks","infested_stone_bricks","stone_button","polished_blackstone_button","cobblestone_wall","mossy_cobblestone_wall","brick_wall","prismarine_wall","red_sandstone_wall","mossy_stone_brick_wall","granite_wall","stone_brick_wall","nether_brick_wall","andesite_wall","red_nether_brick_wall","sandstone_wall","end_stone_brick_wall","diorite_wall","blackstone_wall","polished_blackstone_brick_wall","polished_blackstone_wall","cobbled_deepslate_wall","polished_deepslate_wall","deepslate_tile_wall","deepslate_brick_wall","mud_brick_wall","tuff_wall","polished_tuff_wall","tuff_brick_wall","resin_brick_wall","shulker_box","black_shulker_box","blue_shulker_box","brown_shulker_box","cyan_shulker_box","gray_shulker_box","green_shulker_box","light_blue_shulker_box","light_gray_shulker_box","lime_shulker_box","magenta_shulker_box","orange_shulker_box","pink_shulker_box","purple_shulker_box","red_shulker_box","white_shulker_box","yellow_shulker_box","anvil","chipped_anvil","damaged_anvil","cauldron","water_cauldron","lava_cauldron","powder_snow_cauldron","rail","powered_rail","detector_rail","activator_rail","conduit","mud_bricks","mud_brick_stairs","mud_brick_slab","packed_mud","crafter","tuff_slab","tuff_stairs","chiseled_tuff","polished_tuff","polished_tuff_slab","polished_tuff_stairs","tuff_bricks","tuff_brick_slab","tuff_brick_stairs","chiseled_tuff_bricks","chiseled_copper","exposed_chiseled_copper","weathered_chiseled_copper","oxidized_chiseled_copper","waxed_chiseled_copper","waxed_exposed_chiseled_copper","waxed_weathered_chiseled_copper","waxed_oxidized_chiseled_copper","copper_grate","exposed_copper_grate","weathered_copper_grate","oxidized_copper_grate","waxed_copper_grate","waxed_exposed_copper_grate","waxed_weathered_copper_grate","waxed_oxidized_copper_grate","copper_bulb","exposed_copper_bulb","weathered_copper_bulb","oxidized_copper_bulb","waxed_copper_bulb","waxed_exposed_copper_bulb","waxed_weathered_copper_bulb","waxed_oxidized_copper_bulb","copper_door","exposed_copper_door","weathered_copper_door","oxidized_copper_door","waxed_copper_door","waxed_exposed_copper_door","waxed_weathered_copper_door","waxed_oxidized_copper_door","copper_trapdoor","exposed_copper_trapdoor","weathered_copper_trapdoor","oxidized_copper_trapdoor","waxed_copper_trapdoor","waxed_exposed_copper_trapdoor","waxed_weathered_copper_trapdoor","waxed_oxidized_copper_trapdoor","heavy_core","resin_bricks","resin_brick_slab","resin_brick_stairs","chiseled_resin_bricks"],frogs_spawnable_on:Jm,stone_bricks:Qm,wool:eg,wool_carpets:tg,nether_carver_replaceables:ng,nylium:ig,wart_blocks:rg,soul_fire_base_blocks:sg,infiniburn_overworld:ag,fire:og};Object.fromEntries(Object.entries(lg).map(([n,e])=>[`minecraft:${n}`,new Set(e.map(t=>`minecraft:${t}`))]));(()=>{const n=new Float32Array(65536);for(let e=0;e<65536;e++)n[e]=Math.sin(e*Math.PI*2/65536);return n})();new Set(["water","lava","short_grass","tall_grass","fern","large_fern","dead_bush","seagrass","tall_seagrass","vine","glow_lichen","moss_carpet","pale_moss_carpet","pale_hanging_moss","mangrove_propagule","cocoa","hanging_roots","cave_vines","cave_vines_plant","oak_sapling","spruce_sapling","birch_sapling","jungle_sapling","acacia_sapling","dark_oak_sapling","cherry_sapling","pale_oak_sapling","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","closed_eyeblossom","open_eyeblossom","sunflower","lilac","rose_bush","peony","brown_mushroom","red_mushroom","sugar_cane","kelp","kelp_plant","lily_pad","sweet_berry_bush","bamboo_sapling","pink_petals","sea_pickle","spore_blossom","small_dripleaf","big_dripleaf_stem","small_amethyst_bud","medium_amethyst_bud","large_amethyst_bud","amethyst_cluster","sculk_vein","fire","soul_fire","crimson_fungus","warped_fungus","crimson_roots","warped_roots","nether_sprouts","weeping_vines","weeping_vines_plant","twisting_vines","twisting_vines_plant","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["snow","cactus","chest","bamboo","pointed_dripstone","big_dripleaf","sculk_sensor","sculk_shrieker","sandstone_slab","azalea","flowering_azalea","dirt_path","farmland"].map(n=>`minecraft:${n}`));const cg=new Set(["seagrass","tall_seagrass","kelp","kelp_plant","sea_pickle","bubble_column",...["tube","brain","bubble","fire","horn"].flatMap(n=>[`${n}_coral`,`${n}_coral_fan`,`${n}_coral_wall_fan`])].map(n=>`minecraft:${n}`));new Set(["tall_grass","large_fern","sunflower","lilac","rose_bush","peony","small_dripleaf","tall_seagrass"].map(n=>`minecraft:${n}`));const _e=16;class hg{data=new Uint8ClampedArray(_e*_e*4);set(e,t,[i,r,s],a=255){const o=((t&15)*_e+(e&15))*4|0;this.data[o]=i,this.data[o+1]=r,this.data[o+2]=s,this.data[o+3]=a}get(e,t){const i=((t&15)*_e+(e&15))*4;return[this.data[i],this.data[i+1],this.data[i+2]]}fill(e){for(let t=0;t<_e;t++)for(let i=0;i<_e;i++)this.set(i,t,e(i,t))}}function ug(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const z=n=>[n>>16&255,n>>8&255,n&255],ie=([n,e,t],i)=>[n*i,e*i,t*i],Uc=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t];function ht(n,e,t,i){n.fill(()=>ie(e,1+(i()-.5)*2*t))}function Ve(n,e,t,i,r){for(let s=0;s<t;s++){let a=Math.floor(r()*_e),o=Math.floor(r()*_e);const l=e(),c=1+Math.floor(r()*i);for(let h=0;h<c;h++)n.set(a,o,l),r()<.5?a+=r()<.5?1:-1:o+=r()<.5?1:-1}}function Ln(n,e){const t=Array.from({length:n},()=>[e()*_e,e()*_e]),i=new Int32Array(_e*_e),r=new Float32Array(_e*_e);for(let s=0;s<_e;s++)for(let a=0;a<_e;a++){let o=1/0,l=1/0,c=0;t.forEach(([h,u],d)=>{let _=Math.abs(a+.5-h),m=Math.abs(s+.5-u);_=Math.min(_,_e-_),m=Math.min(m,_e-m);const g=Math.hypot(_,m);g<o?(l=o,o=g,c=d):g<l&&(l=g)}),i[s*_e+a]=c,r[s*_e+a]=l-o}return{owner:i,edge:r}}const Ys=z(8806467),ns=z(12105912),Nc=0;function Fc(n,e){ht(n,z(8224125),.06,e),Ve(n,()=>ie(z(8224125),.82+e()*.06),10,4,e),Ve(n,()=>ie(z(8224125),1.1),6,2,e)}function Oc(n,e){ht(n,z(5263448),.07,e);for(const t of[2,6,10,14]){const i=Math.floor(e()*_e);for(let r=0;r<11;r++)n.set(r+i,t+(r>6?1:0),ie(z(5263448),.72))}}function dg(n,e){ht(n,z(5658206),.06,e);const{edge:t}=Ln(5,e);n.fill((i,r)=>t[r*_e+i]<1?ie(z(5658206),.72):n.get(i,r))}function xr(n,e){ht(n,Ys,.07,e),Ve(n,()=>ie(Ys,.75),12,2,e),Ve(n,()=>ie(Ys,1.18),8,2,e)}function fs(n){for(let e=3;e<n.data.length;e+=4)n.data[e]=Nc}function fg(n,e){ht(n,ns,.1,e),Ve(n,()=>ie(ns,.8),14,2,e),Ve(n,()=>ie(ns,1.15),10,1,e),fs(n)}function pg(n,e){xr(n,e);for(let t=0;t<_e;t++){const i=2+Math.floor(e()*3)+(e()<.2?1:0);for(let r=0;r<i;r++)n.set(t,r,ie(ns,.88+e()*.24),Nc)}}function Sl(n,e){ht(n,z(14406560),.04,e),Ve(n,()=>ie(z(14406560),.88),10,1,e)}function El(n,e){const{owner:t,edge:i}=Ln(14,e),r=Array.from({length:14},()=>ie(z(8814715),.75+e()*.45));n.fill((s,a)=>{const o=a*_e+s;return i[o]<.7?ie(z(8814715),.6):ie(r[t[o]],.96+e()*.08)})}function _g(n,e){const t=z(15790320);n.fill((i,r)=>{const s=Math.sin((i+r*2)/_e*Math.PI*2)+Math.sin((i*2-r)/_e*Math.PI*2);return ie(t,.92+s*.05+(e()-.5)*.04)}),fs(n)}function mg(n,e){n.fill(()=>{const t=e();return t<.35?z(2763306):t<.7?z(5723991):t<.9?z(8026746):z(1710618)})}function gg(n,e){const t=z(10650447);for(let i=0;i<4;i++){const r=Math.floor(e()*_e),s=.94+e()*.12;for(let a=i*4;a<i*4+4;a++)for(let o=0;o<_e;o++){let l=ie(t,s*(1+(e()-.5)*.06));a===i*4+3?l=ie(t,.68):o===r&&(l=ie(t,.74)),n.set(o,a,l)}}}function zc(n,e){const{owner:t,edge:i}=Ln(9,e),r=Array.from({length:9},()=>.8+e()*.35);n.fill((s,a)=>{const o=a*_e+s;return i[o]<.9?ie(z(8026746),.55):ie(z(8026746),r[t[o]]*(1+(e()-.5)*.08))})}function vg(n,e){const t=z(7033138),i=Array.from({length:_e},()=>.8+e()*.35);n.fill(r=>ie(t,i[r]*(1+(e()-.5)*.12))),Ve(n,()=>ie(t,.6),5,3,e)}function xg(n,e){const t=z(11834207);n.fill((i,r)=>{const s=Math.max(Math.abs(i-7.5),Math.abs(r-7.5));if(s>7)return ie(z(7033138),.9+e()*.2);const a=Math.floor(s)%2===0?1:.86;return ie(t,a*(1+(e()-.5)*.05))})}function Mg(n,e){const t=z(10132122);n.fill(()=>e()<.18?ie(t,.55):ie(t,.85+e()*.35)),fs(n)}function bg(n,e){const{owner:t,edge:i}=Ln(7,e),r=Array.from({length:7},()=>Uc(z(13146702),z(16771488),e()));n.fill((s,a)=>{const o=a*_e+s;return i[o]<.8?z(9071157):ie(r[t[o]],.95+e()*.1)})}function Sg(n,e){n.fill((t,i)=>{const r=Math.sin((t+i)/_e*Math.PI*4)*.5+Math.sin((t*2-i)/_e*Math.PI*2)*.5,s=Math.max(0,Math.min(1,.5+r*.6+(e()-.5)*.25));return Uc(z(13123599),z(16761402),s*s)}),Ve(n,()=>z(10103304),6,3,e)}function Eg(n,e){ht(n,z(1774630),.12,e),Ve(n,()=>z(3877466),10,3,e),Ve(n,()=>z(788754),8,2,e)}const qs=n=>(e,t)=>{ht(e,z(n),.04,t);for(const i of[4,9,13])for(let r=0;r<_e;r++)t()<.8&&e.set(r,i,ie(z(n),.88));for(let i=0;i<_e;i++)e.set(i,0,ie(z(n),1.06))},yl=n=>(e,t)=>{ht(e,z(n),.035,t),Ve(e,()=>ie(z(n),.93),8,2,t)},yg=n=>(e,t)=>{ht(e,z(n),.05,t),Ve(e,()=>ie(z(n),.86),10,1,t)};function wg(n,e){ht(n,z(16055034),.025,e),Ve(n,()=>z(14674415),6,2,e)}function Ag(n,e){ht(n,z(16251901),.02,e),Ve(n,()=>z(15200244),10,3,e)}function Tg(n,e){ht(n,z(9286906),.05,e);for(let t=0;t<3;t++){let i=Math.floor(e()*_e),r=Math.floor(e()*_e);for(let s=0;s<6;s++)n.set(i,r,z(14215423)),i+=1,r+=e()<.5?1:0}}function Rg(n,e){const{edge:t}=Ln(6,e);n.fill((i,r)=>t[r*_e+i]<.6?z(11127029):ie(z(9088744),.96+e()*.08))}function kc(n,e){ht(n,z(3947068),.08,e),Ve(n,()=>z(4932678),10,3,e)}function Cg(n,e){ht(n,z(7299688),.1,e),Ve(n,()=>z(9273991),12,2,e),Ve(n,()=>z(5917781),8,2,e)}const wl=n=>(e,t)=>{xr(e,t);for(let i=0;i<_e;i++){const r=2+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ie(z(n),.88+t()*.24))}};function Pg(n,e){ht(n,z(5979933),.1,e),Ve(n,()=>z(8016936),14,3,e),Ve(n,()=>z(4074002),8,2,e)}function Lg(n,e){xr(n,e),Ve(n,()=>ie(z(7820603),.7),14,2,e),Ve(n,()=>z(9079434),6,1,e)}function Dg(n,e){ht(n,z(14672092),.03,e);const{edge:t}=Ln(5,e);n.fill((i,r)=>t[r*_e+i]<.5?z(13224646):n.get(i,r))}const ti=n=>(e,t)=>{ht(e,z(n),.03,t),Ve(e,()=>ie(z(n),.93),6,2,t)},ut=(n,e=.85,t=1.12)=>(i,r)=>{ht(i,z(n),.07,r),Ve(i,()=>ie(z(n),e+r()*.06),12,3,r),Ve(i,()=>ie(z(n),t),8,2,r)},Rt=(n,e,t=5)=>(i,r)=>{(n?Oc:Fc)(i,r);for(let s=0;s<t;s++){const a=2+Math.floor(r()*12),o=2+Math.floor(r()*12),l=2+Math.floor(r()*3);for(let c=0;c<l;c++){const h=a+Math.floor(r()*3)-1,u=o+Math.floor(r()*3)-1;i.set(h,u,ie(z(e),.8+r()*.4))}i.set(a,o,ie(z(e),1.15))}},Al=n=>(e,t)=>{const{owner:i,edge:r}=Ln(6,t),s=Array.from({length:6},()=>.8+t()*.35);e.fill((a,o)=>{const l=o*_e+a;return r[l]<.8?ie(z(n),.55):ie(z(n),s[i[l]]*(1+(t()-.5)*.08))})},dn=(n,e=.6)=>(t,i)=>{const r=z(n),s=Array.from({length:_e},()=>.8+i()*.35);t.fill(a=>ie(r,s[a]*(1+(i()-.5)*.12))),Ve(t,()=>ie(r,e),5,3,i)};function Ig(n,e){ht(n,z(14211026),.05,e);for(let t=0;t<7;t++){const i=Math.floor(e()*_e),r=Math.floor(e()*_e),s=2+Math.floor(e()*4);for(let a=0;a<s;a++)n.set(i+a,r,ie(z(3025704),.9+e()*.3))}}const cn=(n,e)=>(t,i)=>{t.fill((r,s)=>{const a=Math.max(Math.abs(r-7.5),Math.abs(s-7.5));if(a>7)return ie(z(e),.9+i()*.2);const o=Math.floor(a)%2===0?1:.86;return ie(z(n),o*(1+(i()-.5)*.05))})},hn=(n,e,t)=>(i,r)=>{const s=z(n);i.fill(()=>r()<.18?ie(s,.55):ie(s,.85+r()*.35)),t!==void 0&&Ve(i,()=>ie(z(t),.9+r()*.2),9,2,r),e&&fs(i)},Tl=(n,e)=>(t,i)=>{ht(t,z(n),.06,i),e&&Ve(t,()=>z(15261904),6,4,i)};function Ug(n,e){const t=Array.from({length:_e},()=>.9+e()*.15);n.fill(i=>ie(z(13616821),t[i]*(1+(e()-.5)*.06)))}function Ng(n,e){Og(n,e,12819020);for(let t=0;t<_e;t++)n.set(t,7,ie(z(8018474),.9))}function Fg(n,e){const{edge:t}=Ln(8,e);n.fill((i,r)=>t[r*_e+i]<.8?z(9071146):ie(z(13936192),.9+e()*.2))}function Og(n,e,t){const i=z(t);for(let r=0;r<_e;r++)for(let s=0;s<_e;s++)n.set(s,r,ie(i,(r%4===3?.7:1)*(.94+e()*.1)))}function zg(n,e){dn(5985100)(n,e);for(let t=5;t<11;t++)for(let i=5;i<11;i++)n.set(i,t,Math.abs(i-7.5)+Math.abs(t-7.5)<3?z(14711338):z(3813932))}function kg(n,e){n.fill(()=>z(2894372));for(let t=0;t<6;t++){const i=e()<.5,r=Math.floor(e()*_e);for(let s=0;s<_e;s++)n.set(i?r:s,i?s:r,ie(z(4864810),.85+e()*.3))}}function Hg(n,e){kc(n,e);for(let t=0;t<4;t++){const i=Math.floor(e()*_e);for(let r=0;r<_e;r++)n.set(i,r,ie(z(4864810),.85+e()*.3))}}function Gg(n,e){xr(n,e),Ve(n,()=>z(10978138),8,4,e)}const Wr=n=>(e,t)=>{ht(e,z(n),.1,t),Ve(e,()=>ie(z(n),.8),10,2,t)},Qe=(n,e,t=!1)=>(i,r)=>{for(let s=3;s<i.data.length;s+=4)i.data[s]=0;if(e((s,a,o=1)=>i.set(s,a,ie(z(n),o*(.85+r()*.3)),255),r),t)for(let s=0;s<i.data.length;s+=4)i.data[s+3]===0&&(i.data[s]=i.data[s+1]=i.data[s+2]=0)},Vg=Qe(10132122,(n,e)=>{for(let t=0;t<_e;t+=3){const i=6+Math.floor(e()*10);let r=t;for(let s=0;s<i;s++)n(r,s),e()<.4&&n(r+1,s,.8),e()<.2&&(r+=e()<.5?1:-1)}},!0),Bg=Qe(12041648,(n,e)=>{for(let t=2;t<14;t+=2){const i=5+Math.floor(e()*10);for(let r=0;r<i;r++)n(t+(r%3===0?1:0),r)}}),Wg=Qe(6989903,n=>{for(let e=0;e<12;e++)n(7,e+2,.9);for(let e=5;e<10;e++)n(e,2);n(7,14,.6)}),Xg=Qe(11561518,n=>{for(let e=4;e<12;e++)for(let t=5;t<11;t++)(t-7.5)**2/9+(e-7.5)**2/16<1&&n(t,e,t===7?.7:1);n(7,2,.6),n(7,3,.6)}),ir=(n,e=12)=>(t,i)=>Qe(n,(r,s)=>{for(let a=1;a<15;a+=2){const o=Math.floor(e*(.45+s()*.55));let l=a;for(let c=15;c>15-o;c--)r(l,c,.8+(15-c)/40),s()<.15&&(l+=s()<.5?1:-1)}},!0)(t,i),Rl=(n,e=13)=>(t,i)=>Qe(n,r=>{for(let s=15;s>15-e;s--){r(7,s);const a=Math.floor((s-(15-e))/e*5);if(s%2===0)for(let o=1;o<=a;o++)r(7-o,s-(o>>1),.9),r(7+o,s-(o>>1),.9)}},!0)(t,i),Yg=Qe(9071162,(n,e)=>{for(let t=0;t<5;t++){let i=7;for(let r=15;r>4&&(n(i,r),e()<.4&&(i+=t%2?1:-1),!(i<1||i>14));r--);}}),yt=(n,e=0)=>(t,i)=>{for(let a=3;a<t.data.length;a+=4)t.data[a]=0;const r=e?2:6;for(let a=15;a>=r;a--)t.set(7,a,ie(z(4164138),.85+i()*.3),255);t.set(6,11,z(5216826),255),t.set(8,9,z(5216826),255);const s=e?4:5;for(let a=s-2;a<=s+2;a++)for(let o=5;o<=9;o++)Math.abs(o-7)+Math.abs(a-s)<=3&&t.set(o,a,ie(z(n),.8+i()*.35),255);t.set(7,s,ie(z(n),.6),255)},Cl=n=>Qe(n,e=>{for(let t=9;t<15;t++)e(7,t,.7);for(let t=4;t<=10;t++)for(let i=5;i<=8;i++)Math.abs(t-7)<=3-Math.max(0,6-i)&&e(t,i)}),qg=(n,e)=>{Qe(4155946,(t,i)=>{for(let r=0;r<70;r++)t(Math.floor(i()*14)+1,Math.floor(i()*10)+5)})(n,e);for(let t=0;t<5;t++)n.set(2+Math.floor(e()*12),6+Math.floor(e()*8),z(11542570),255)},$g=Qe(10526880,n=>{for(const e of[3,7,11])for(let t=0;t<16;t++)n(e,t,t%5===0?.7:1)},!0),Kg=Qe(6134314,n=>{for(let e=0;e<16;e++)n(7,e,e%6===0?.6:1),n(8,e,e%6===0?.6:.9);for(let e=9;e<13;e++)n(e,3,1.1)}),Pl=(n,e)=>(t,i)=>{if(Qe(n,(r,s)=>{for(let a=0;a<120;a++)r(Math.floor(s()*16),Math.floor(s()*12)+2)})(t,i),e!==void 0)for(let r=0;r<8;r++)t.set(Math.floor(i()*16),2+Math.floor(i()*10),z(e),255)},Zg=(n,e)=>{for(let t=3;t<n.data.length;t+=4)n.data[t]=0;for(let t=0;t<14;t++){const i=Math.floor(e()*14)+1,r=Math.floor(e()*14)+1;n.set(i,r,z(15902920),255),n.set(i+1,r,z(15241400),255)}},jg=(n,e)=>{n.fill((t,i)=>(t-7.5)**2+(i-7.5)**2<49&&!(t>7&&Math.abs(i-7.5)<1)?ie(z(10132122),.85+e()*.3):[0,0,0]);for(let t=0;t<n.data.length;t+=4)n.data[t+3]=n.data[t]===0?0:255},Jg=(n,e)=>n.fill(t=>ie(z(14190890),(t%4===0?.75:1)*(.92+e()*.1))),Qg=(n,e)=>n.fill((t,i)=>Math.abs(t-7.5)<1.5&&Math.abs(i-7.5)<1.5?z(5929514):ie(z(13664808),.9+e()*.12)),e0=(n,e)=>n.fill(t=>ie(z(t%4<2?7315754:9156666),.92+e()*.1)),t0=(n,e)=>n.fill((t,i)=>ie(z(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1.5?7315754:9156666),.92+e()*.1)),n0=(n,e)=>n.fill((t,i)=>t===0||t===15?z(2906652):(t+i)%5===0?z(14211248):ie(z(5016108),.88+e()*.14)),i0=(n,e)=>n.fill((t,i)=>t===0||t===15||i===0||i===15?z(2906652):ie(z(6068796),.9+e()*.12)),Ll=Qe(5933610,(n,e)=>{let t=7;for(let i=0;i<16;i++){if(n(t,i),n(t+1,i,.85),i%4===1)for(let r=1;r<4;r++)n(t+(i%8===1?r+1:-r),i+(r>>1),.9);e()<.2&&(t+=e()<.5?1:-1),t=Math.max(4,Math.min(10,t))}}),r0=Qe(6982186,n=>{for(const e of[4,9])for(let t=9;t<16;t++)for(let i=e;i<e+3;i++)n(i,t,t<11?1.2:1)}),Hc=n=>Qe(n,(e,t)=>{for(let i=0;i<60;i++)e(Math.floor(t()*16),Math.floor(t()*16),.8+t()*.4)}),s0=Hc(8034938),a0=Qe(10517082,(n,e)=>{for(let t=2;t<14;t+=2){const i=6+Math.floor(e()*9);for(let r=0;r<i;r++)n(t+(r%4===3?1:0),r)}}),o0=Qe(14181544,n=>{for(let e=3;e<13;e++)for(let t=0;t<3;t++)n(e,t,Math.abs(e-7.5)<2?.7:1);for(let e=5;e<11;e++)n(e,3,.8)}),Dl=n=>(e,t)=>{if(Qe(4880938,i=>{for(const r of[5,10])for(let s=0;s<16;s++)i(r+(s%5===0?1:0),s)})(e,t),n)for(const[i,r]of[[4,6],[11,10],[6,13]])e.set(i,r,z(15900714),255)},Il=Qe(5937706,n=>{for(let e=6;e<16;e++)n(7,e,.8);for(let e=1;e<15;e++)for(let t=2;t<6;t++)Math.abs(e-7.5)<7-(5-t)&&n(e,t)}),l0=Qe(5937706,n=>{for(let e=0;e<16;e++)n(7,e,.85)}),c0=Qe(8808538,n=>{for(let e=0;e<16;e++){const t=Math.max(0,3-Math.floor(e/5));for(let i=7-t;i<=8+t;i++)n(i,e)}}),Xr=n=>Qe(n,e=>{for(let t=4;t<16;t++)e(7,t,1.15),e(8,t,.95),t>8&&(e(5,t,.9),e(10,t,1))}),$s=(n,e)=>{n.fill(()=>ie(z(797754),.8+e()*.4)),Ve(n,()=>z(2803928),5,1,e)},h0=(n,e)=>{zc(n,e),Ve(n,()=>ie(z(5929516),.85+e()*.3),8,3,e)},u0=(n,e)=>{const{edge:t}=Ln(7,e);n.fill((i,r)=>t[r*_e+i]<.9?z(15235098):ie(z(6957586),.8+e()*.4))},Ul=n=>n.fill((e,t)=>e%4===0||t%4===0?z(2767434):[12,16,22]),d0=(n,e)=>n.fill((t,i)=>i===5||t===0||t===15||i===0||i===15?z(4861972):t>=7&&t<=8&&i>=4&&i<=7?z(12105912):ie(z(11039786),.9+e()*.12)),f0=(n,e)=>n.fill(t=>ie(z(14867652),(t%5===0?.85:1)*(.94+e()*.08))),p0=(n,e)=>n.fill((t,i)=>Math.max(Math.abs(t-7.5),Math.abs(i-7.5))<3?z(12103834):ie(z(14867652),.94+e()*.08)),rr=n=>Qe(n,e=>{for(const[t,i]of[[4,10],[8,13],[11,8]])for(let r=15;r>15-i;r--)e(t+(r%4===0?1:0),r)}),un=n=>Qe(n,e=>{for(let t=6;t<16;t++)for(let i=0;i<16;i++)Math.abs(i-7.5)<(16-t)*.75&&(i+t)%3!==0&&e(i,t)}),no=(n,e)=>{ht(n,z(7219754),.12,e),Ve(n,()=>ie(z(7219754),.7+e()*.1),14,2,e),Ve(n,()=>ie(z(9321014),1.05),8,2,e)},_0=(n,e)=>{ht(n,z(5390382),.1,e);for(let t=0;t<4;t++){const i=2+Math.floor(e()*11),r=2+Math.floor(e()*11);n.set(i,r,z(3023384),255),n.set(i+2,r,z(3023384),255),n.set(i+1,r+2,z(3023384),255)}},m0=(n,e)=>n.fill(t=>ie(z(4868688),(t%4===0?.75:1)*(.9+e()*.15))),g0=(n,e)=>n.fill((t,i)=>ie(z(5921376),(Math.max(Math.abs(t-7.5),Math.abs(i-7.5))%3<1?.8:1)*(.92+e()*.1))),Nl=n=>(e,t)=>{no(e,t);for(let i=0;i<6;i++){const r=2+Math.floor(t()*12),s=2+Math.floor(t()*12);e.set(r,s,ie(z(n),.9+t()*.3)),e.set(r+1,s,ie(z(n),.8))}},v0=(n,e)=>n.fill((t,i)=>ie(z(6177336),((t+i*3)%7<2?.7:1)*(.9+e()*.15))),x0=(n,e)=>n.fill((t,i)=>ie(z(6966336),(Math.hypot(t-7.5,i-7.5)%4<1.2?.75:1)*(.9+e()*.12))),Fl=n=>(e,t)=>{ht(e,z(n),.12,t),Ve(e,()=>ie(z(n),1.2),6,2,t)},Ol=n=>(e,t)=>{no(e,t);for(let i=0;i<16;i++){const r=3+Math.floor(t()*3);for(let s=0;s<r;s++)e.set(i,s,ie(z(n),.85+t()*.3))}},zl=(n,e)=>(t,i)=>{dn(n)(t,i);for(let r=0;r<10;r++)t.set(Math.floor(i()*16),Math.floor(i()*16),ie(z(e),.9+i()*.3))},kl=n=>Qe(n,e=>{for(let t=9;t<16;t++)e(7,t,.7);for(let t=3;t<=11;t++)for(let i=4;i<=8;i++)Math.abs(t-7)<=4-Math.max(0,6-i)&&e(t,i)}),Hl=n=>Qe(n,(e,t)=>{for(let i=2;i<14;i+=2){const r=6+Math.floor(t()*8);for(let s=15;s>15-r;s--)e(i+(s%3===0?1:0),s)}}),Yr=n=>Qe(n,e=>{for(const t of[5,9])for(let i=0;i<16;i++)e(t+(i%4<2?0:1),i)}),Gl=n=>Qe(n,(e,t)=>{for(let i=1;i<15;i++){const r=6+Math.floor(t()*9);for(let s=15;s>15-r;s--)e(i,s,.75+(15-s)/30)}}),M0=Qe(10132122,n=>{for(const e of[1,6,9,14])for(let t=0;t<16;t++)n(e,t);for(const e of[0,15])for(let t=0;t<16;t++)n(t,e)}),b0=Qe(14215423,(n,e)=>{for(let t=0;t<8;t++)n(Math.floor(e()*16),Math.floor(e()*16))}),Gc={stone:Fc,deepslate:Oc,deepslate_top:dg,dirt:xr,grass_top:fg,grass_side:pg,sand:Sl,gravel:El,water:_g,bedrock:mg,planks:gg,cobblestone:zc,log:vg,log_top:xg,leaves:Mg,glowstone:bg,lava:Sg,obsidian:Eg,sandstone:qs(14207899),sandstone_top:yl(14471071),red_sand:yg(12477985),red_sandstone:qs(11887135),red_sandstone_top:yl(12150058),snow:wg,powder_snow:Ag,ice:Tg,packed_ice:Rg,mud:kc,mycelium_top:Cg,mycelium_side:wl(7299688),podzol_top:Pg,podzol_side:wl(6965794),coarse_dirt:Lg,calcite:Dg,terracotta:ti(9985603),white_terracotta:ti(13742753),orange_terracotta:ti(10572581),yellow_terracotta:ti(12223779),brown_terracotta:ti(5059363),red_terracotta:ti(9387310),light_gray_terracotta:ti(8874593),granite:ut(10120024),diorite:ut(12434620,.8,1.06),andesite:ut(9079436),tuff:ut(7171429),clay:ut(10528435,.92,1.06),coal_ore:Rt(!1,2829099),deepslate_coal_ore:Rt(!0,2039583),iron_ore:Rt(!1,14200723),deepslate_iron_ore:Rt(!0,13213827),copper_ore:Rt(!1,12677451),deepslate_copper_ore:Rt(!0,11758148),gold_ore:Rt(!1,15980106),deepslate_gold_ore:Rt(!0,15255100),redstone_ore:Rt(!1,11801102),deepslate_redstone_ore:Rt(!0,11014156),emerald_ore:Rt(!1,1557828,3),deepslate_emerald_ore:Rt(!0,1356860,3),lapis_ore:Rt(!1,2312616),deepslate_lapis_ore:Rt(!0,2113696),diamond_ore:Rt(!1,6155486,4),deepslate_diamond_ore:Rt(!0,5233871,4),raw_iron_block:Al(10913643),raw_copper_block:Al(10115646),oak_log:dn(7033138),spruce_log:dn(3877401),spruce_log_top:cn(7558450,3877401),birch_log:Ig,birch_log_top:cn(12890235,14211026),jungle_log:dn(5653791,.5),jungle_log_top:cn(10975308,5653791),acacia_log:dn(6775127),acacia_log_top:cn(11690042,6775127),dark_oak_log:dn(3943962,.7),dark_oak_log_top:cn(5192482,3943962),mangrove_log:dn(5522223),mangrove_log_top:cn(7223858,5522223),cherry_log:dn(3612714),cherry_log_top:cn(13999e3,3612714),pale_oak_log:dn(5985100),pale_oak_log_top:cn(15129557,5985100),spruce_leaves:hn(6263903,!1),birch_leaves:hn(8233811,!1),jungle_leaves:hn(11053224,!0),acacia_leaves:hn(10132122,!0),dark_oak_leaves:hn(10132122,!0),mangrove_leaves:hn(10526880,!0),cherry_leaves:hn(15378888,!1),pale_oak_leaves:hn(10922654,!1),azalea_leaves:hn(6061100,!1),flowering_azalea_leaves:hn(6061100,!1,14122962),mushroom_stem:Ug,red_mushroom_block:Tl(12593702,!0),brown_mushroom_block:Tl(9793877,!1),mangrove_roots:kg,muddy_mangrove_roots:Hg,rooted_dirt:Gg,bee_nest:Ng,bee_nest_top:Fg,creaking_heart:zg,moss_carpet:Wr(5929516),pale_moss_carpet:Wr(10331030),vine:Vg,pale_hanging_moss:Bg,mangrove_propagule:Wg,cocoa:Xg,short_grass:ir(10132122),fern:Rl(10132122),tall_grass:ir(10132122,16),large_fern:Rl(10132122,16),dead_bush:Yg,dandelion:yt(15980858),poppy:yt(14168618),blue_orchid:yt(3188966),allium:yt(11755488),azure_bluet:yt(15265010),red_tulip:yt(14694954),orange_tulip:yt(15764010),white_tulip:yt(15921902),pink_tulip:yt(15902920),oxeye_daisy:yt(16053482),cornflower:yt(4878056),lily_of_the_valley:yt(16777215),closed_eyeblossom:yt(9079434),open_eyeblossom:yt(15768122),sunflower:yt(16175646,16),lilac:yt(13803740,16),rose_bush:yt(13777466,16),peony:yt(15775448,16),brown_mushroom:Cl(9793877),red_mushroom:Cl(14168618),sweet_berry_bush:qg,sugar_cane:$g,bamboo:Kg,azalea:Pl(6982188),flowering_azalea:Pl(6982188,14122962),pink_petals:Zg,lily_pad:jg,pumpkin:Jg,pumpkin_top:Qg,melon:e0,melon_top:t0,cactus:n0,cactus_top:i0,seagrass:ir(4164138),tall_seagrass:ir(4164138,16),kelp:Ll,kelp_plant:Ll,sea_pickle:r0,glow_lichen:s0,hanging_roots:a0,spore_blossom:o0,cave_vines:Dl(!0),cave_vines_plant:Dl(!1),small_dripleaf:Il,big_dripleaf:Il,big_dripleaf_stem:l0,moss_block:Wr(5929516),pale_moss_block:Wr(10331030),dripstone_block:ut(8808538),pointed_dripstone:c0,smooth_basalt:ut(4737102,.9,1.05),amethyst_block:ut(9069512,.85,1.15),budding_amethyst:ut(8017336,.8,1.2),small_amethyst_bud:Xr(12094184),medium_amethyst_bud:Xr(12094184),large_amethyst_bud:Xr(12094184),amethyst_cluster:Xr(12094184),sculk:$s,sculk_vein:Hc(801868),sculk_sensor:$s,sculk_shrieker:ut(13156520),sculk_catalyst:$s,blue_ice:ut(7645424,.92,1.06),mossy_cobblestone:h0,magma_block:u0,spawner:Ul,chest:d0,bone_block:f0,bone_block_top:p0,suspicious_sand:Sl,suspicious_gravel:El,sandstone_slab:qs(14207899),tube_coral_block:ut(3364317,.85,1.12),tube_coral:rr(3364317),tube_coral_fan:un(3364317),tube_coral_wall_fan:un(3364317),brain_coral_block:ut(14178984,.85,1.12),brain_coral:rr(14178984),brain_coral_fan:un(14178984),brain_coral_wall_fan:un(14178984),bubble_coral_block:ut(11021008,.85,1.12),bubble_coral:rr(11021008),bubble_coral_fan:un(11021008),bubble_coral_wall_fan:un(11021008),fire_coral_block:ut(14168106,.85,1.12),fire_coral:rr(14168106),fire_coral_fan:un(14168106),fire_coral_wall_fan:un(14168106),horn_coral_block:ut(14731322,.85,1.12),horn_coral:rr(14731322),horn_coral_fan:un(14731322),horn_coral_wall_fan:un(14731322),netherrack:no,soul_sand:_0,soul_soil:ut(4864558,.85,1.1),basalt:m0,basalt_top:g0,blackstone:ut(2761768,.8,1.25),nether_gold_ore:Nl(16175162),nether_quartz_ore:Nl(15525084),ancient_debris:v0,ancient_debris_top:x0,crimson_nylium:Ol(10102310),crimson_nylium_top:Fl(10102310),warped_nylium:Ol(2853500),warped_nylium_top:Fl(2853500),crimson_stem:zl(6957626,13120058),crimson_stem_top:cn(9321034,6957626),warped_stem:zl(3816014,2803896),warped_stem_top:cn(3836544,3816014),nether_wart_block:ut(7998990,.8,1.2),warped_wart_block:ut(1473144,.8,1.2),shroomlight:ut(15768138,.85,1.2),crimson_fungus:kl(11545130),warped_fungus:kl(2797728),crimson_roots:Hl(10100266),warped_roots:Hl(2005642),nether_sprouts:ir(2005642,8),weeping_vines:Yr(10495018),weeping_vines_plant:Yr(10495018),twisting_vines:Yr(2005642),twisting_vines_plant:Yr(2005642),fire:Gl(15763994),soul_fire:Gl(3856616),end_stone:ut(14474400,.88,1.06),chorus_plant:ut(6965866,.8,1.25),chorus_flower:ut(10123930,.85,1.15),end_gateway:Ul,iron_bars:M0,bubble_column:b0},io=Object.keys(Gc),Q=Object.fromEntries(io.map((n,e)=>[n,e+1])),ro=io.length+1;function Vc(){const n=new Uint8Array(ro*_e*_e*4);return io.forEach((e,t)=>{const i=new hg;let r=0;for(const s of e)r=Math.imul(r,31)+s.charCodeAt(0);Gc[e](i,ug(r)),n.set(i.data,(t+1)*_e*_e*4)}),n}const se=4,Bc=(()=>{const n=new Uint8Array(ro);n[Q.grass_top]=1,n[Q.grass_side]=1,n[Q.leaves]=2,n[Q.water]=3;for(const e of["jungle_leaves","acacia_leaves","dark_oak_leaves","mangrove_leaves"])n[Q[e]]=2;n[Q.vine]=2|se;for(const e of["pale_hanging_moss","mangrove_propagule","cocoa"])n[Q[e]]=se;return n[Q.short_grass]=1|se,n[Q.fern]=1|se,n[Q.tall_grass]=1|se,n[Q.large_fern]=1|se,n[Q.dead_bush]=se,n[Q.dandelion]=se,n[Q.poppy]=se,n[Q.blue_orchid]=se,n[Q.allium]=se,n[Q.azure_bluet]=se,n[Q.red_tulip]=se,n[Q.orange_tulip]=se,n[Q.white_tulip]=se,n[Q.pink_tulip]=se,n[Q.oxeye_daisy]=se,n[Q.cornflower]=se,n[Q.lily_of_the_valley]=se,n[Q.closed_eyeblossom]=se,n[Q.open_eyeblossom]=se,n[Q.sunflower]=se,n[Q.lilac]=se,n[Q.rose_bush]=se,n[Q.peony]=se,n[Q.brown_mushroom]=se,n[Q.red_mushroom]=se,n[Q.sweet_berry_bush]=se,n[Q.sugar_cane]=1|se,n[Q.bamboo]=se,n[Q.azalea]=se,n[Q.flowering_azalea]=se,n[Q.pink_petals]=se,n[Q.lily_pad]=2|se,n[Q.seagrass]=se,n[Q.tall_seagrass]=se,n[Q.kelp]=se,n[Q.kelp_plant]=se,n[Q.sea_pickle]=se,n[Q.glow_lichen]=se,n[Q.hanging_roots]=se,n[Q.spore_blossom]=se,n[Q.cave_vines]=se,n[Q.cave_vines_plant]=se,n[Q.small_dripleaf]=se,n[Q.big_dripleaf]=se,n[Q.big_dripleaf_stem]=se,n[Q.pointed_dripstone]=se,n[Q.small_amethyst_bud]=se,n[Q.medium_amethyst_bud]=se,n[Q.large_amethyst_bud]=se,n[Q.amethyst_cluster]=se,n[Q.sculk_vein]=se,n[Q.tube_coral]=se,n[Q.tube_coral_fan]=se,n[Q.tube_coral_wall_fan]=se,n[Q.brain_coral]=se,n[Q.brain_coral_fan]=se,n[Q.brain_coral_wall_fan]=se,n[Q.bubble_coral]=se,n[Q.bubble_coral_fan]=se,n[Q.bubble_coral_wall_fan]=se,n[Q.fire_coral]=se,n[Q.fire_coral_fan]=se,n[Q.fire_coral_wall_fan]=se,n[Q.horn_coral]=se,n[Q.horn_coral_fan]=se,n[Q.horn_coral_wall_fan]=se,n[Q.bubble_column]=se,n[Q.crimson_fungus]=se,n[Q.warped_fungus]=se,n[Q.crimson_roots]=se,n[Q.warped_roots]=se,n[Q.nether_sprouts]=se,n[Q.weeping_vines]=se,n[Q.weeping_vines_plant]=se,n[Q.twisting_vines]=se,n[Q.twisting_vines_plant]=se,n[Q.fire]=se,n[Q.soul_fire]=se,n[Q.iron_bars]=se,n})();var _t=(n=>(n[n.air=0]="air",n[n.stone=1]="stone",n[n.deepslate=2]="deepslate",n[n.dirt=3]="dirt",n[n.grass=4]="grass",n[n.sand=5]="sand",n[n.gravel=6]="gravel",n[n.water=7]="water",n[n.bedrock=8]="bedrock",n[n.planks=9]="planks",n[n.cobblestone=10]="cobblestone",n[n.log=11]="log",n[n.leaves=12]="leaves",n[n.glowstone=13]="glowstone",n[n.obsidian=14]="obsidian",n[n.lava=15]="lava",n[n.sandstone=32]="sandstone",n[n.red_sand=33]="red_sand",n[n.red_sandstone=34]="red_sandstone",n[n.snow_block=35]="snow_block",n[n.powder_snow=36]="powder_snow",n[n.ice=37]="ice",n[n.packed_ice=38]="packed_ice",n[n.mud=39]="mud",n[n.mycelium=40]="mycelium",n[n.podzol=41]="podzol",n[n.coarse_dirt=42]="coarse_dirt",n[n.calcite=43]="calcite",n[n.terracotta=44]="terracotta",n[n.white_terracotta=45]="white_terracotta",n[n.orange_terracotta=46]="orange_terracotta",n[n.yellow_terracotta=47]="yellow_terracotta",n[n.brown_terracotta=48]="brown_terracotta",n[n.red_terracotta=49]="red_terracotta",n[n.light_gray_terracotta=50]="light_gray_terracotta",n[n.granite=51]="granite",n[n.diorite=52]="diorite",n[n.andesite=53]="andesite",n[n.tuff=54]="tuff",n[n.clay=55]="clay",n[n.infested_stone=56]="infested_stone",n[n.infested_deepslate=57]="infested_deepslate",n[n.coal_ore=58]="coal_ore",n[n.deepslate_coal_ore=59]="deepslate_coal_ore",n[n.iron_ore=60]="iron_ore",n[n.deepslate_iron_ore=61]="deepslate_iron_ore",n[n.copper_ore=62]="copper_ore",n[n.deepslate_copper_ore=63]="deepslate_copper_ore",n[n.gold_ore=64]="gold_ore",n[n.deepslate_gold_ore=65]="deepslate_gold_ore",n[n.redstone_ore=66]="redstone_ore",n[n.deepslate_redstone_ore=67]="deepslate_redstone_ore",n[n.emerald_ore=68]="emerald_ore",n[n.deepslate_emerald_ore=69]="deepslate_emerald_ore",n[n.lapis_ore=70]="lapis_ore",n[n.deepslate_lapis_ore=71]="deepslate_lapis_ore",n[n.diamond_ore=72]="diamond_ore",n[n.deepslate_diamond_ore=73]="deepslate_diamond_ore",n[n.raw_iron_block=74]="raw_iron_block",n[n.raw_copper_block=75]="raw_copper_block",n[n.spruce_log=76]="spruce_log",n[n.birch_log=77]="birch_log",n[n.jungle_log=78]="jungle_log",n[n.acacia_log=79]="acacia_log",n[n.dark_oak_log=80]="dark_oak_log",n[n.mangrove_log=81]="mangrove_log",n[n.cherry_log=82]="cherry_log",n[n.pale_oak_log=83]="pale_oak_log",n[n.spruce_leaves=84]="spruce_leaves",n[n.birch_leaves=85]="birch_leaves",n[n.jungle_leaves=86]="jungle_leaves",n[n.acacia_leaves=87]="acacia_leaves",n[n.dark_oak_leaves=88]="dark_oak_leaves",n[n.mangrove_leaves=89]="mangrove_leaves",n[n.cherry_leaves=90]="cherry_leaves",n[n.pale_oak_leaves=91]="pale_oak_leaves",n[n.azalea_leaves=92]="azalea_leaves",n[n.flowering_azalea_leaves=93]="flowering_azalea_leaves",n[n.mushroom_stem=94]="mushroom_stem",n[n.red_mushroom_block=95]="red_mushroom_block",n[n.brown_mushroom_block=96]="brown_mushroom_block",n[n.mangrove_roots=97]="mangrove_roots",n[n.muddy_mangrove_roots=98]="muddy_mangrove_roots",n[n.rooted_dirt=99]="rooted_dirt",n[n.bee_nest=100]="bee_nest",n[n.creaking_heart=101]="creaking_heart",n[n.snow=102]="snow",n[n.moss_carpet=103]="moss_carpet",n[n.pale_moss_carpet=104]="pale_moss_carpet",n[n.vine=105]="vine",n[n.cocoa=106]="cocoa",n[n.pale_hanging_moss=107]="pale_hanging_moss",n[n.mangrove_propagule=108]="mangrove_propagule",n[n.short_grass=109]="short_grass",n[n.fern=110]="fern",n[n.tall_grass=111]="tall_grass",n[n.large_fern=112]="large_fern",n[n.dead_bush=113]="dead_bush",n[n.dandelion=114]="dandelion",n[n.poppy=115]="poppy",n[n.blue_orchid=116]="blue_orchid",n[n.allium=117]="allium",n[n.azure_bluet=118]="azure_bluet",n[n.red_tulip=119]="red_tulip",n[n.orange_tulip=120]="orange_tulip",n[n.white_tulip=121]="white_tulip",n[n.pink_tulip=122]="pink_tulip",n[n.oxeye_daisy=123]="oxeye_daisy",n[n.cornflower=124]="cornflower",n[n.lily_of_the_valley=125]="lily_of_the_valley",n[n.closed_eyeblossom=126]="closed_eyeblossom",n[n.open_eyeblossom=127]="open_eyeblossom",n[n.sunflower=128]="sunflower",n[n.lilac=129]="lilac",n[n.rose_bush=130]="rose_bush",n[n.peony=131]="peony",n[n.brown_mushroom=132]="brown_mushroom",n[n.red_mushroom=133]="red_mushroom",n[n.sweet_berry_bush=134]="sweet_berry_bush",n[n.sugar_cane=135]="sugar_cane",n[n.bamboo=136]="bamboo",n[n.azalea=137]="azalea",n[n.flowering_azalea=138]="flowering_azalea",n[n.pink_petals=139]="pink_petals",n[n.lily_pad=140]="lily_pad",n[n.pumpkin=141]="pumpkin",n[n.melon=142]="melon",n[n.cactus=143]="cactus",n[n.seagrass=144]="seagrass",n[n.tall_seagrass=145]="tall_seagrass",n[n.kelp=146]="kelp",n[n.kelp_plant=147]="kelp_plant",n[n.sea_pickle=148]="sea_pickle",n[n.glow_lichen=149]="glow_lichen",n[n.hanging_roots=150]="hanging_roots",n[n.spore_blossom=151]="spore_blossom",n[n.cave_vines=152]="cave_vines",n[n.cave_vines_plant=153]="cave_vines_plant",n[n.small_dripleaf=154]="small_dripleaf",n[n.big_dripleaf=155]="big_dripleaf",n[n.big_dripleaf_stem=156]="big_dripleaf_stem",n[n.moss_block=157]="moss_block",n[n.pale_moss_block=158]="pale_moss_block",n[n.dripstone_block=159]="dripstone_block",n[n.pointed_dripstone=160]="pointed_dripstone",n[n.smooth_basalt=161]="smooth_basalt",n[n.amethyst_block=162]="amethyst_block",n[n.budding_amethyst=163]="budding_amethyst",n[n.small_amethyst_bud=164]="small_amethyst_bud",n[n.medium_amethyst_bud=165]="medium_amethyst_bud",n[n.large_amethyst_bud=166]="large_amethyst_bud",n[n.amethyst_cluster=167]="amethyst_cluster",n[n.sculk=168]="sculk",n[n.sculk_vein=169]="sculk_vein",n[n.sculk_sensor=170]="sculk_sensor",n[n.sculk_shrieker=171]="sculk_shrieker",n[n.sculk_catalyst=172]="sculk_catalyst",n[n.blue_ice=173]="blue_ice",n[n.mossy_cobblestone=174]="mossy_cobblestone",n[n.magma_block=175]="magma_block",n[n.spawner=176]="spawner",n[n.chest=177]="chest",n[n.bone_block=178]="bone_block",n[n.suspicious_sand=179]="suspicious_sand",n[n.suspicious_gravel=180]="suspicious_gravel",n[n.sandstone_slab=181]="sandstone_slab",n[n.tube_coral_block=182]="tube_coral_block",n[n.tube_coral=183]="tube_coral",n[n.tube_coral_fan=184]="tube_coral_fan",n[n.tube_coral_wall_fan=185]="tube_coral_wall_fan",n[n.brain_coral_block=186]="brain_coral_block",n[n.brain_coral=187]="brain_coral",n[n.brain_coral_fan=188]="brain_coral_fan",n[n.brain_coral_wall_fan=189]="brain_coral_wall_fan",n[n.bubble_coral_block=190]="bubble_coral_block",n[n.bubble_coral=191]="bubble_coral",n[n.bubble_coral_fan=192]="bubble_coral_fan",n[n.bubble_coral_wall_fan=193]="bubble_coral_wall_fan",n[n.fire_coral_block=194]="fire_coral_block",n[n.fire_coral=195]="fire_coral",n[n.fire_coral_fan=196]="fire_coral_fan",n[n.fire_coral_wall_fan=197]="fire_coral_wall_fan",n[n.horn_coral_block=198]="horn_coral_block",n[n.horn_coral=199]="horn_coral",n[n.horn_coral_fan=200]="horn_coral_fan",n[n.horn_coral_wall_fan=201]="horn_coral_wall_fan",n[n.netherrack=202]="netherrack",n[n.soul_sand=203]="soul_sand",n[n.soul_soil=204]="soul_soil",n[n.basalt=205]="basalt",n[n.blackstone=206]="blackstone",n[n.nether_gold_ore=207]="nether_gold_ore",n[n.nether_quartz_ore=208]="nether_quartz_ore",n[n.ancient_debris=209]="ancient_debris",n[n.crimson_nylium=210]="crimson_nylium",n[n.warped_nylium=211]="warped_nylium",n[n.crimson_stem=212]="crimson_stem",n[n.warped_stem=213]="warped_stem",n[n.nether_wart_block=214]="nether_wart_block",n[n.warped_wart_block=215]="warped_wart_block",n[n.shroomlight=216]="shroomlight",n[n.crimson_fungus=217]="crimson_fungus",n[n.warped_fungus=218]="warped_fungus",n[n.crimson_roots=219]="crimson_roots",n[n.warped_roots=220]="warped_roots",n[n.nether_sprouts=221]="nether_sprouts",n[n.weeping_vines=222]="weeping_vines",n[n.weeping_vines_plant=223]="weeping_vines_plant",n[n.twisting_vines=224]="twisting_vines",n[n.twisting_vines_plant=225]="twisting_vines_plant",n[n.fire=226]="fire",n[n.soul_fire=227]="soul_fire",n[n.end_stone=228]="end_stone",n[n.chorus_plant=229]="chorus_plant",n[n.chorus_flower=230]="chorus_flower",n[n.end_gateway=231]="end_gateway",n[n.iron_bars=232]="iron_bars",n[n.bubble_column=233]="bubble_column",n))(_t||{}),tt=(n=>(n[n.none=0]="none",n[n.water=1]="water",n[n.lava=2]="lava",n))(tt||{});const Yn={1:16,2:24};function sr(n,e,t=!1){return t?Yn[n]+7:e>=8?n===1?7:15:Yn[n]+e-1}const S0={kind:0,amount:0,source:!1,falling:!1},Pt=Array.from({length:256},()=>S0);for(const n of[1,2]){Pt[n===1?7:15]={kind:n,amount:8,source:!0,falling:!1};for(let e=1;e<=7;e++)Pt[Yn[n]+e-1]={kind:n,amount:e,source:!1,falling:!1};Pt[Yn[n]+7]={kind:n,amount:8,source:!1,falling:!0}}const E0=[...cg].map(n=>_t[n.slice(10)]);for(const n of E0)Pt[n]={kind:1,amount:8,source:!0,falling:!1};const Cn=Uint8Array.from(Pt,n=>n.kind),Vl=n=>Cn[n]!==0,G=(n,e,t=e,i=e,r={})=>({name:n,textures:{top:e,side:t,bottom:i},solid:!0,breakable:!0,shape:"cube",height:16,...r}),Vn=(n,e,t)=>G(n,e,e,e,{solid:!1,shape:"slab",height:t}),ae=(n,e)=>G(n,e,e,e,{solid:!1,shape:"cross"}),Yi=(n,e)=>G(n,e,e,e,{solid:!1,breakable:!1}),St=[G("空气","stone","stone","stone",{solid:!1,breakable:!1}),G("石头","stone"),G("深板岩","deepslate_top","deepslate"),G("泥土","dirt"),G("草方块","grass_top","grass_side","dirt"),G("沙子","sand"),G("沙砾","gravel"),Yi("水","water"),G("基岩","bedrock","bedrock","bedrock",{breakable:!1}),G("木板","planks"),G("圆石","cobblestone"),G("原木","log_top","log"),G("树叶","leaves"),G("萤石","glowstone"),G("黑曜石","obsidian"),Yi("岩浆","lava")];for(let n=1;n<=7;n++)St[Yn[1]+n-1]=Yi(`水（流动 ${n}）`,"water");St[Yn[1]+7]=Yi("水（下落）","water");for(let n=1;n<=7;n++)St[Yn[2]+n-1]=Yi(`岩浆（流动 ${n}）`,"lava");St[Yn[2]+7]=Yi("岩浆（下落）","lava");St.push(G("砂岩","sandstone_top","sandstone"),G("红沙","red_sand"),G("红砂岩","red_sandstone_top","red_sandstone"),G("雪块","snow"),G("细雪","powder_snow"),G("冰","ice"),G("浮冰","packed_ice"),G("泥巴","mud"),G("菌丝体","mycelium_top","mycelium_side","dirt"),G("灰化土","podzol_top","podzol_side","dirt"),G("砂土","coarse_dirt"),G("方解石","calcite"),G("陶瓦","terracotta"),G("白色陶瓦","white_terracotta"),G("橙色陶瓦","orange_terracotta"),G("黄色陶瓦","yellow_terracotta"),G("棕色陶瓦","brown_terracotta"),G("红色陶瓦","red_terracotta"),G("淡灰色陶瓦","light_gray_terracotta"));St.push(G("花岗岩","granite"),G("闪长岩","diorite"),G("安山岩","andesite"),G("凝灰岩","tuff"),G("黏土","clay"),G("被虫蚀的石头","stone"),G("被虫蚀的深板岩","deepslate_top","deepslate"),G("煤矿石","coal_ore"),G("深层煤矿石","deepslate_coal_ore"),G("铁矿石","iron_ore"),G("深层铁矿石","deepslate_iron_ore"),G("铜矿石","copper_ore"),G("深层铜矿石","deepslate_copper_ore"),G("金矿石","gold_ore"),G("深层金矿石","deepslate_gold_ore"),G("红石矿石","redstone_ore"),G("深层红石矿石","deepslate_redstone_ore"),G("绿宝石矿石","emerald_ore"),G("深层绿宝石矿石","deepslate_emerald_ore"),G("青金石矿石","lapis_ore"),G("深层青金石矿石","deepslate_lapis_ore"),G("钻石矿石","diamond_ore"),G("深层钻石矿石","deepslate_diamond_ore"),G("粗铁块","raw_iron_block"),G("粗铜块","raw_copper_block"),G("云杉原木","spruce_log_top","spruce_log"),G("白桦原木","birch_log_top","birch_log"),G("丛林原木","jungle_log_top","jungle_log"),G("金合欢原木","acacia_log_top","acacia_log"),G("深色橡木原木","dark_oak_log_top","dark_oak_log"),G("红树原木","mangrove_log_top","mangrove_log"),G("樱花原木","cherry_log_top","cherry_log"),G("苍白橡木原木","pale_oak_log_top","pale_oak_log"),G("云杉树叶","spruce_leaves"),G("白桦树叶","birch_leaves"),G("丛林树叶","jungle_leaves"),G("金合欢树叶","acacia_leaves"),G("深色橡木树叶","dark_oak_leaves"),G("红树树叶","mangrove_leaves"),G("樱花树叶","cherry_leaves"),G("苍白橡树树叶","pale_oak_leaves"),G("杜鹃树叶","azalea_leaves"),G("盛开的杜鹃树叶","flowering_azalea_leaves"),G("蘑菇柄","mushroom_stem"),G("红色蘑菇方块","red_mushroom_block"),G("棕色蘑菇方块","brown_mushroom_block"),G("红树根","mangrove_roots"),G("沾泥的红树根","muddy_mangrove_roots"),G("缠根泥土","rooted_dirt"),G("蜂巢","bee_nest_top","bee_nest"),G("嘎枝之心","pale_oak_log_top","creaking_heart"),Vn("雪","snow",2),Vn("苔藓地毯","moss_carpet",1),Vn("苍白苔藓地毯","pale_moss_carpet",1),ae("藤蔓","vine"),ae("可可果","cocoa"),ae("苍白垂须","pale_hanging_moss"),ae("红树胎生苗","mangrove_propagule"));St.push(ae("矮草丛","short_grass"),ae("蕨","fern"),ae("高草丛","tall_grass"),ae("大型蕨","large_fern"),ae("枯萎的灌木","dead_bush"),ae("蒲公英","dandelion"),ae("虞美人","poppy"),ae("兰花","blue_orchid"),ae("绒球葱","allium"),ae("蓝花美耳草","azure_bluet"),ae("红色郁金香","red_tulip"),ae("橙色郁金香","orange_tulip"),ae("白色郁金香","white_tulip"),ae("粉红色郁金香","pink_tulip"),ae("滨菊","oxeye_daisy"),ae("矢车菊","cornflower"),ae("铃兰","lily_of_the_valley"),ae("闭合的眼眸花","closed_eyeblossom"),ae("张开的眼眸花","open_eyeblossom"),ae("向日葵","sunflower"),ae("丁香","lilac"),ae("玫瑰丛","rose_bush"),ae("牡丹","peony"),ae("棕色蘑菇","brown_mushroom"),ae("红色蘑菇","red_mushroom"),ae("甜浆果丛","sweet_berry_bush"),ae("甘蔗","sugar_cane"),ae("竹子","bamboo"),ae("杜鹃花丛","azalea"),ae("盛开的杜鹃花丛","flowering_azalea"),Vn("粉红色花簇","pink_petals",1),Vn("睡莲","lily_pad",1),G("南瓜","pumpkin_top","pumpkin"),G("西瓜","melon_top","melon"),G("仙人掌","cactus_top","cactus"),ae("海草","seagrass"),ae("高海草","tall_seagrass"),ae("海带","kelp"),ae("海带茎","kelp_plant"),ae("海泡菜","sea_pickle"),ae("发光地衣","glow_lichen"),ae("垂根","hanging_roots"),ae("孢子花","spore_blossom"),ae("洞穴藤蔓","cave_vines"),ae("洞穴藤蔓（茎）","cave_vines_plant"),ae("小型垂滴叶","small_dripleaf"),ae("大型垂滴叶","big_dripleaf"),ae("大型垂滴叶茎","big_dripleaf_stem"),G("苔藓块","moss_block"),G("苍白苔藓块","pale_moss_block"),G("滴水石块","dripstone_block"),ae("滴水石锥","pointed_dripstone"),G("平滑玄武岩","smooth_basalt"),G("紫水晶块","amethyst_block"),G("紫水晶母岩","budding_amethyst"),ae("小型紫晶芽","small_amethyst_bud"),ae("中型紫晶芽","medium_amethyst_bud"),ae("大型紫晶芽","large_amethyst_bud"),ae("紫水晶簇","amethyst_cluster"),G("幽匿块","sculk"),ae("幽匿脉络","sculk_vein"),Vn("幽匿感测体","sculk_sensor",8),Vn("幽匿尖啸体","sculk_shrieker",8),G("幽匿催发体","sculk_catalyst"),G("蓝冰","blue_ice"),G("苔石","mossy_cobblestone"),G("岩浆块","magma_block"),G("刷怪笼","spawner"),G("箱子","chest"),G("骨块","bone_block_top","bone_block"),G("可疑的沙子","suspicious_sand"),G("可疑的沙砾","suspicious_gravel"),Vn("砂岩台阶","sandstone_slab",8),G("管珊瑚块","tube_coral_block"),ae("管珊瑚","tube_coral"),ae("管珊瑚扇","tube_coral_fan"),ae("管珊瑚壁扇","tube_coral_wall_fan"),G("脑纹珊瑚块","brain_coral_block"),ae("脑纹珊瑚","brain_coral"),ae("脑纹珊瑚扇","brain_coral_fan"),ae("脑纹珊瑚壁扇","brain_coral_wall_fan"),G("气泡珊瑚块","bubble_coral_block"),ae("气泡珊瑚","bubble_coral"),ae("气泡珊瑚扇","bubble_coral_fan"),ae("气泡珊瑚壁扇","bubble_coral_wall_fan"),G("火珊瑚块","fire_coral_block"),ae("火珊瑚","fire_coral"),ae("火珊瑚扇","fire_coral_fan"),ae("火珊瑚壁扇","fire_coral_wall_fan"),G("鹿角珊瑚块","horn_coral_block"),ae("鹿角珊瑚","horn_coral"),ae("鹿角珊瑚扇","horn_coral_fan"),ae("鹿角珊瑚壁扇","horn_coral_wall_fan"));St.push(G("下界岩","netherrack"),G("灵魂沙","soul_sand"),G("灵魂土","soul_soil"),G("玄武岩","basalt_top","basalt"),G("黑石","blackstone"),G("下界金矿石","nether_gold_ore"),G("下界石英矿石","nether_quartz_ore"),G("远古残骸","ancient_debris_top","ancient_debris"),G("绯红菌岩","crimson_nylium_top","crimson_nylium"),G("诡异菌岩","warped_nylium_top","warped_nylium"),G("绯红菌柄","crimson_stem_top","crimson_stem"),G("诡异菌柄","warped_stem_top","warped_stem"),G("下界疣块","nether_wart_block"),G("诡异疣块","warped_wart_block"),G("菌光体","shroomlight"),ae("绯红菌","crimson_fungus"),ae("诡异菌","warped_fungus"),ae("绯红菌索","crimson_roots"),ae("诡异菌索","warped_roots"),ae("下界苗","nether_sprouts"),ae("垂泪藤","weeping_vines"),ae("垂泪藤（茎）","weeping_vines_plant"),ae("缠怨藤","twisting_vines"),ae("缠怨藤（茎）","twisting_vines_plant"),ae("火","fire"),ae("灵魂火","soul_fire"),G("末地石","end_stone"),G("紫颂植物","chorus_plant"),G("紫颂花","chorus_flower"),G("末地折跃门","end_gateway"),ae("铁栏杆","iron_bars"),G("气泡柱","bubble_column","bubble_column","bubble_column",{solid:!1,shape:"none",breakable:!1}));const Wc={"minecraft:air":0,"minecraft:stone":1,"minecraft:deepslate":2,"minecraft:dirt":3,"minecraft:grass_block":4,"minecraft:sand":5,"minecraft:gravel":6,"minecraft:water":7,"minecraft:lava":15,"minecraft:bedrock":8,"minecraft:obsidian":14,"minecraft:sandstone":32,"minecraft:red_sand":33,"minecraft:red_sandstone":34,"minecraft:snow_block":35,"minecraft:powder_snow":36,"minecraft:ice":37,"minecraft:packed_ice":38,"minecraft:mud":39,"minecraft:mycelium":40,"minecraft:podzol":41,"minecraft:coarse_dirt":42,"minecraft:calcite":43,"minecraft:terracotta":44,"minecraft:white_terracotta":45,"minecraft:orange_terracotta":46,"minecraft:yellow_terracotta":47,"minecraft:brown_terracotta":48,"minecraft:red_terracotta":49,"minecraft:light_gray_terracotta":50,"minecraft:oak_log":11,"minecraft:cobblestone":10,"minecraft:oak_planks":9,"minecraft:glowstone":13,"minecraft:cave_air":0,"minecraft:void_air":0,"minecraft:oak_leaves":12};for(const n of Object.keys(_t)){const e=_t[n];typeof e=="number"&&e>=51&&(Wc[`minecraft:${n}`]=e)}const so=[];for(const[n,e]of Object.entries(Wc))so[e]??=n;for(let n=16;n<=23;n++)so[n]="minecraft:water";for(let n=24;n<=31;n++)so[n]="minecraft:lava";const Va=St.length,Bl=Math.ceil(Math.log2(Va)),as=(()=>{const n=new Uint8Array(Va*6);for(let e=0;e<Va;e++){const{top:t,side:i,bottom:r}=St[e].textures,s=[i,i,r,t,i,i].map(a=>Q[a]);n.set(s,e*6)}return n})(),Ba=[4,3,1,10,9,11,13,7,15],Bt=Uint8Array.from({length:256},(n,e)=>St[e]?.solid?1:0),Ui=n=>Bt[n]===1;for(const n of[105,149,169])St[n].shape="multiface";const y0=Uint8Array.from({length:256},(n,e)=>{const t=St[e]?.shape;return t==="slab"?1:t==="cross"?2:t==="multiface"?3:t==="none"?4:0}),w0=Uint8Array.from({length:256},(n,e)=>St[e]?.height??16);class sn{constructor(e,t,i,r,s,a){this.minX=e,this.minY=t,this.minZ=i,this.maxX=r,this.maxY=s,this.maxZ=a}static body(e,t,i){const r=t/2;return new sn(e.x-r,e.y,e.z-r,e.x+r,e.y+i,e.z+r)}move(e,t,i){return new sn(this.minX+e,this.minY+t,this.minZ+i,this.maxX+e,this.maxY+t,this.maxZ+i)}expandTowards(e,t,i){return new sn(e<0?this.minX+e:this.minX,t<0?this.minY+t:this.minY,i<0?this.minZ+i:this.minZ,e>0?this.maxX+e:this.maxX,t>0?this.maxY+t:this.maxY,i>0?this.maxZ+i:this.maxZ)}deflate(e){return new sn(this.minX+e,this.minY+e,this.minZ+e,this.maxX-e,this.maxY-e,this.maxZ-e)}intersects(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY&&this.minZ<e.maxZ&&this.maxZ>e.minZ}min(e){return e===0?this.minX:e===1?this.minY:this.minZ}max(e){return e===0?this.maxX:e===1?this.maxY:this.maxZ}}const ft=1e-7,Wl=[new sn(0,0,0,1,1,1)],Xl=[];function Wa(n,e){const t=[],i=Math.floor(n.minX-ft),r=Math.floor(n.maxX+ft),s=Math.floor(n.minY-ft)-1,a=Math.floor(n.maxY+ft),o=Math.floor(n.minZ-ft),l=Math.floor(n.maxZ+ft);for(let c=i;c<=r;c++)for(let h=s;h<=a;h++)for(let u=o;u<=l;u++)for(const d of e(c,h,u)){const _=d.move(c,h,u);_.intersects(n)&&t.push(_)}return t}function qr(n,e,t,i){if(Math.abs(i)<ft)return 0;const r=(n+1)%3,s=(n+2)%3;for(const a of t)a.max(r)-ft<=e.min(r)||a.min(r)+ft>=e.max(r)||a.max(s)-ft<=e.min(s)||a.min(s)+ft>=e.max(s)||(i>0&&a.min(n)>=e.max(n)-ft?i=Math.min(i,a.min(n)-e.max(n)):i<0&&a.max(n)<=e.min(n)+ft&&(i=Math.max(i,a.max(n)-e.min(n))));return Math.abs(i)<ft?0:i}function Yl(n,e,t){let{x:i,y:r,z:s}=n;r!==0&&(r=qr(1,e,t,r),r!==0&&(e=e.move(0,r,0)));const a=Math.abs(i)<Math.abs(s);return a&&s!==0&&(s=qr(2,e,t,s),s!==0&&(e=e.move(0,0,s))),i!==0&&(i=qr(0,e,t,i),!a&&i!==0&&(e=e.move(i,0,0))),!a&&s!==0&&(s=qr(2,e,t,s)),{x:i,y:r,z:s}}function A0(n,e,t,i,r){const s=Wa(n.expandTowards(e.x,e.y,e.z),t),a=Yl(e,n,s),o=e.x!==a.x,l=e.z!==a.z,c=e.y!==a.y&&e.y<0;if(!(c||r)||!(o||l))return a;const h=c?n.move(0,a.y,0):n;let u=h.expandTowards(e.x,i,e.z);c||(u=u.expandTowards(0,-1e-5,0));const d=Wa(u,t),_=[];for(const g of d){const p=g.maxY-h.minY;p>a.y+ft&&p<=i+ft&&!_.includes(p)&&_.push(p)}_.sort((g,p)=>g-p);const m=a.x*a.x+a.z*a.z;for(const g of _){const p=Yl({x:e.x,y:g,z:e.z},h,d);if(p.x*p.x+p.z*p.z>m+ft)return{x:p.x,y:p.y+(h.minY-n.minY),z:p.z}}return a}function ao(n,e){return Wa(n,e).length===0}function T0(n,e,t,i){if(e.y>0)return e;const r=(h,u)=>ao(new sn(n.minX+ft+h,n.minY-i-ft,n.minZ+ft+u,n.maxX-ft+h,n.minY,n.maxZ-ft+u),t),s=.05;let{x:a,z:o}=e;const l=Math.sign(a)*s,c=Math.sign(o)*s;for(;a!==0&&r(a,0);){if(Math.abs(a)<=s){a=0;break}a-=l}for(;o!==0&&r(0,o);){if(Math.abs(o)<=s){o=0;break}o-=c}for(;a!==0&&o!==0&&r(a,o);)a=Math.abs(a)<=s?0:a-l,o=Math.abs(o)<=s?0:o-c;return{x:a,y:e.y,z:o}}function Xc(n,e,t,i){return!ao(sn.body(n,e,t).deflate(ft),i)}const ni=Math.fround;function R0(n,e,t){if(n.prevPos={...n.pos},n.prevWalkDist=n.walkDist,n.prevBob=n.bob,D0(n,t),e.sneak&&!n.flying)n.pose="crouching";else if(n.pose==="crouching"){const c=Ic.standing;Xc(n.pos,c.width,c.height,t.shape)||(n.pose="standing")}let r=e.forward,s=e.left;n.pose==="crouching"&&(r*=ke.SNEAK_MULTIPLIER,s*=ke.SNEAK_MULTIPLIER);const a=n.inWater&&!n.underWater;!n.sprinting&&e.sprint&&r>=.8&&!a&&!n.inWater&&(n.sprinting=!0),n.sprinting&&(r<=1e-5||n.horizontalCollision||a||n.pose==="crouching")&&(n.sprinting=!1);const o=n.velocity;if(n.flying){const c=(e.jump?1:0)-(e.sneak?1:0);c!==0&&(o.y+=c*ke.FLY_SPEED*3)}if(n.noJumpDelay>0&&n.noJumpDelay--,Math.abs(o.x)<ke.MIN_VELOCITY&&(o.x=0),Math.abs(o.y)<ke.MIN_VELOCITY&&(o.y=0),Math.abs(o.z)<ke.MIN_VELOCITY&&(o.z=0),e.jump&&!n.flying){const c=n.inLava?n.lavaHeight:n.waterHeight,h=n.inWater&&c>0,u=ke.WATER_JUMP_THRESHOLD;(!h||n.onGround&&c<=u)&&(!n.inLava||n.onGround&&c<=u)?(n.onGround||h&&c<=u)&&n.noJumpDelay===0&&(C0(n,e.yaw),n.noJumpDelay=ke.JUMP_DELAY):o.y+=ke.WATER_JUMP}else n.noJumpDelay=0;P0(n,s*.98,r*.98,e,t),n.onGround&&n.flying&&(n.flying=!1);const l=n.onGround&&!n.flying?Math.min(.1,Math.hypot(o.x,o.z)):0;n.bob+=(l-n.bob)*.4}function ql(n,e,t){if(!n.horizontalCollision)return;const i=n.velocity,r=n.body,s=sn.body(n.pos,r.width,r.height).move(i.x,i.y+.6-n.pos.y+e,i.z);ao(s,t.shape)&&(i.y=.3)}function C0(n,e){n.velocity.y=ke.JUMP_POWER,n.sprinting&&(n.velocity.x+=-Math.sin(e)*ke.SPRINT_JUMP_BOOST,n.velocity.z+=-Math.cos(e)*ke.SPRINT_JUMP_BOOST)}function Ks(n,e,t,i,r){const s=t*t+i*i;if(s<1e-7)return;const a=(s>1?1/Math.sqrt(s):1)*e,o=t*a,l=i*a,c=Math.sin(r),h=Math.cos(r);n.velocity.x+=-c*l-h*o,n.velocity.z+=-h*l+c*o}function P0(n,e,t,i,r){const s=n.velocity;if(n.inWater&&!n.flying){const h=n.pos.y,u=n.sprinting?ke.WATER_SPRINT_DRAG:ke.WATER_DRAG;Ks(n,ke.WATER_SPEED,e,t,i.yaw),Zs(n,i,r),s.x*=u,s.y*=.8,s.z*=u,s.y-=ke.GRAVITY/16,ql(n,h,r);return}if(n.inLava&&!n.flying){const h=n.pos.y;Ks(n,ke.WATER_SPEED,e,t,i.yaw),Zs(n,i,r),n.lavaHeight<=ke.WATER_JUMP_THRESHOLD?(s.x*=.5,s.y*=.8,s.z*=.5,s.y-=ke.GRAVITY/16):(s.x*=.5,s.y*=.5,s.z*=.5),s.y-=ke.GRAVITY/4,ql(n,h,r);return}const a=s.y,o=ni(ke.BLOCK_FRICTION),l=n.onGround?ni(o*ni(ke.AIR_FRICTION)):ni(ke.AIR_FRICTION),c=n.onGround?ni(n.speedAttribute*ni(.21600002/(o*o*o))):n.flying?ke.FLY_SPEED*(n.sprinting?2:1):n.sprinting?ke.AIR_SPRINT_SPEED:ke.AIR_SPEED;Ks(n,c,e,t,i.yaw),Zs(n,i,r),s.x*=l,s.z*=l,s.y=(s.y-ke.GRAVITY)*ni(ke.VERTICAL_DRAG),n.flying&&(s.y=a*ke.FLY_VERTICAL_DRAG)}function Zs(n,e,t){const i=n.body,r=sn.body(n.pos,i.width,i.height);let s={...n.velocity};e.sneak&&!n.flying&&n.onGround&&(s=T0(r,s,t.shape,ke.STEP_HEIGHT));const a=A0(r,s,t.shape,ke.STEP_HEIGHT,n.onGround);n.pos.x+=a.x,n.pos.y+=a.y,n.pos.z+=a.z;const o=Math.abs(s.x-a.x)>1e-5,l=Math.abs(s.z-a.z)>1e-5,c=s.y!==a.y,h=Math.hypot(s.x,s.z),u=Math.hypot(a.x,a.z),d=h>1e-5&&u>1e-5&&Math.acos(Math.min(1,(s.x*a.x+s.z*a.z)/(h*u)))<.13962634;n.horizontalCollision=(o||l)&&!d,n.onGround=c&&s.y<0,o&&(n.velocity.x=0),l&&(n.velocity.z=0),c&&(n.velocity.y=0),n.walkDist+=Math.hypot(a.x,a.z)*.6}function js(n,e,t,i,r){const s=Pt[n.block(e,t,i)];return s.kind!==r?0:Pt[n.block(e,t+1,i)].kind===r?1:s.amount/9}function L0(n,e,t,i,r){const s=Pt[n.block(e,t,i)],a=s.amount/9;let o=0,l=0;for(const[u,d]of[[0,-1],[0,1],[-1,0],[1,0]]){const _=n.block(e+u,t,i+d),m=Pt[_];if(m.kind!==tt.none&&m.kind!==r)continue;let g=m.kind===r?m.amount/9:0,p=0;if(g===0){if(!Bt[_]){const f=Pt[n.block(e+u,t-1,i+d)];(f.kind===r||f.kind===tt.none)&&(g=f.kind===r?f.amount/9:0,g>0&&(p=a-(g-.8888889)))}}else g>0&&(p=a-g);o+=u*p,l+=d*p}let c=0;if(s.falling){for(const[u,d]of[[0,-1],[0,1],[-1,0],[1,0]])if(Bt[n.block(e+u,t,i+d)]||Bt[n.block(e+u,t+1,i+d)]){const _=Math.hypot(o,l);_>0&&(o/=_,l/=_),c=-6;break}}const h=Math.hypot(o,c,l);return h<1e-4?{x:0,y:0,z:0}:{x:o/h,y:c/h,z:l/h}}function D0(n,e){const t=n.body,i=sn.body(n.pos,t.width,t.height).deflate(.001),r=!n.flying;for(const[c,h]of[[tt.water,.014],[tt.lava,.0023333333333333335]]){let u=0,d=0,_=0,m=0,g=0;for(let p=Math.floor(i.minX);p<Math.ceil(i.maxX);p++)for(let f=Math.floor(i.minY);f<Math.ceil(i.maxY);f++)for(let w=Math.floor(i.minZ);w<Math.ceil(i.maxZ);w++){const y=js(e,p,f,w,c);if(y===0)continue;const b=f+y;if(!(b<i.minY)&&(u=Math.max(u,b-i.minY),r)){const U=L0(e,p,f,w,c),A=u<.4?u:1;d+=U.x*A,_+=U.y*A,m+=U.z*A,g++}}if(g>0&&Math.hypot(d,_,m)>0){d=d/g*h,_=_/g*h,m=m/g*h;const p=n.velocity,f=Math.hypot(d,_,m);Math.abs(p.x)<.003&&Math.abs(p.z)<.003&&f<.0045&&(d=d/f*.0045,_=_/f*.0045,m=m/f*.0045),p.x+=d,p.y+=_,p.z+=m}c===tt.water?n.waterHeight=u:n.lavaHeight=u}const s=n.pos.y+t.eye,a=Math.floor(n.pos.x),o=Math.floor(s),l=Math.floor(n.pos.z);n.underWater=s<o+js(e,a,o,l,tt.water),n.underLava=s<o+js(e,a,o,l,tt.lava)}function I0(n,e,t,i,r,s,a,o){let l=Math.floor(n),c=Math.floor(e),h=Math.floor(t);const u=Math.sign(i),d=Math.sign(r),_=Math.sign(s),m=u!==0?Math.abs(1/i):1/0,g=d!==0?Math.abs(1/r):1/0,p=_!==0?Math.abs(1/s):1/0,f=(S,M)=>M>0?Math.floor(S)+1-S:S-Math.floor(S);let w=u!==0?f(n,u)*m:1/0,y=d!==0?f(e,d)*g:1/0,b=_!==0?f(t,_)*p:1/0,U=0,A=0,T=0,I=0;for(;I<=a;){if(o(l,c,h))return{x:l,y:c,z:h,nx:U,ny:A,nz:T,distance:I};w<y&&w<b?(l+=u,I=w,w+=m,U=-u,A=T=0):y<b?(c+=d,I=y,y+=g,A=-d,U=T=0):(h+=_,I=b,b+=p,T=-_,U=A=0)}return null}const U0=70;class N0{scene;camera;player;terrain;control;head=new zt;spawned=!1;slot=0;target=null;reach=5;bobbing=!0;acc=0;eye=1.62;prevEye=1.62;fovMod=1;prevFovMod=1;keys=new Set;lastTap={};sprintByDoubleTap=!1;world;get medium(){return this.player.underLava?"lava":this.player.underWater?"water":"air"}constructor(e,t,i,r){this.scene=e,this.camera=t,this.player=i,this.terrain=r,this.head.rotation.order="YXZ",this.control=new om(this.head,document.body),this.world={shape:(s,a,o)=>{const l=r.getBlock(s,a,o);return l===null||Ui(l)?Wl:Xl},block:(s,a,o)=>r.getBlock(s,a,o)??_t.bedrock},this.initKeyboard(),this.initMouse()}get feet(){return this.player.pos}set feet(e){this.teleport(e.x,e.y,e.z)}teleport(e,t,i){this.player.pos={x:e,y:t,z:i},this.player.prevPos={x:e,y:t,z:i},this.player.velocity={x:0,y:0,z:0}}get yaw(){return new on().setFromQuaternion(this.head.quaternion,"YXZ").y}initKeyboard=()=>{document.addEventListener("keydown",e=>{if(!this.control.isLocked||((e.code==="F3"||e.code==="Tab")&&e.preventDefault(),e.repeat))return;this.keys.add(e.code);const t=performance.now(),i=t-(this.lastTap[e.code]??0)<350;if(this.lastTap[e.code]=t,e.code==="KeyW"&&i&&(this.sprintByDoubleTap=!0),(e.code==="Space"&&i||e.code==="KeyF")&&this.toggleFly(),e.code.startsWith("Digit")){const r=Number(e.code.slice(5));r>=1&&r<=9&&(this.slot=r-1)}}),document.addEventListener("keyup",e=>{this.keys.delete(e.code),e.code==="KeyW"&&(this.sprintByDoubleTap=!1)}),window.addEventListener("blur",()=>this.keys.clear()),this.control.addEventListener("unlock",()=>this.keys.clear())};initMouse=()=>{document.addEventListener("mousedown",e=>{!this.control.isLocked||!this.target||(e.button===0&&this.breakBlock(),e.button===2&&this.placeBlock())}),document.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("wheel",e=>{this.control.isLocked&&(this.slot=(this.slot+(e.deltaY>0?1:-1)+9)%9)},{passive:!0})};toggleFly=()=>{this.player.flying=!this.player.flying,this.player.velocity.y=0};readInput(){const e=this.keys,t=(i,r)=>(e.has(i)?1:0)-(e.has(r)?1:0);return{forward:t("KeyW","KeyS"),left:t("KeyA","KeyD"),jump:e.has("Space"),sneak:e.has("ShiftLeft")||e.has("ShiftRight"),sprint:e.has("KeyR")||this.sprintByDoubleTap,yaw:this.yaw}}breakBlock=()=>{const e=this.target,t=this.terrain.getBlock(e.x,e.y,e.z);t===null||!St[t].breakable||this.terrain.setBlock(e.x,e.y,e.z,_t.air)};placeBlock=()=>{const e=this.target,t=e.x+e.nx,i=e.y+e.ny,r=e.z+e.nz,s=this.terrain.getBlock(t,i,r);if(s===null||s!==_t.air&&!Vl(s))return;const a=this.player.body;Xc(this.player.pos,a.width,a.height,(o,l,c)=>o===t&&l===i&&c===r?Wl:Xl)||this.terrain.setBlock(t,i,r,Ba[this.slot])};trySpawn=()=>{const e=this.terrain.info;if(!e)return!1;for(let t=0;t<=48;t+=4)for(let i=0;i<Math.max(1,t*2);i++){const r=i/Math.max(1,t*2)*Math.PI*2,s=Math.floor(Math.cos(r)*t),a=Math.floor(Math.sin(r)*t),o=/nether/.test(e.settings)?this.terrain.floorBelow(s,a,120):this.terrain.topSolidY(s,a);if(o===null){if(!this.terrain.getChunk(s,a))return!1;continue}if(o>=e.seaLevel||/end/.test(e.settings))return this.teleport(s+.5,o+1,a+.5),!0}return this.teleport(.5,e.seaLevel+10,.5),this.player.flying=!0,!0};update=e=>{if(!this.spawned){this.spawned=this.trySpawn(),this.render(1);return}for(this.acc=Math.min(this.acc+e,ke.TICK*5);this.acc>=ke.TICK;)this.acc-=ke.TICK,this.tick();this.render(this.acc/ke.TICK),this.updateTarget()};tick(){const e=this.player;R0(e,this.readInput(),this.world),this.terrain.tick(),e.sprinting||(this.sprintByDoubleTap=!1),this.prevEye=this.eye,this.eye+=(e.body.eye-this.eye)*.5;let t=e.flying?1.1:1;t*=(e.speedAttribute/ke.WALK_SPEED+1)/2,this.prevFovMod=this.fovMod,this.fovMod+=(t-this.fovMod)*.5}render(e){const t=this.player,i=(a,o)=>a+(o-a)*e,r=i(this.prevEye,this.eye);if(this.camera.position.set(i(t.prevPos.x,t.pos.x),i(t.prevPos.y,t.pos.y)+r,i(t.prevPos.z,t.pos.z)),this.camera.quaternion.copy(this.head.quaternion),this.bobbing){const a=t.walkDist-t.prevWalkDist,o=-(t.walkDist+a*e)*Math.PI,l=i(t.prevBob,t.bob),c=Math.PI/180;this.camera.rotateX(-Math.abs(Math.cos(o-.2)*l)*5*c),this.camera.rotateZ(-Math.sin(o)*l*3*c),this.camera.translateX(-Math.sin(o)*l*.5),this.camera.translateY(Math.abs(Math.cos(o)*l))}let s=U0*i(this.prevFovMod,this.fovMod);t.underWater&&(s*=6/7),Math.abs(this.camera.fov-s)>.001&&(this.camera.fov=s,this.camera.updateProjectionMatrix())}updateTarget(){const e=this.player,t=new O(0,0,-1).applyQuaternion(this.head.quaternion),i=this.acc/ke.TICK,r=e.prevPos.x+(e.pos.x-e.prevPos.x)*i,s=e.prevPos.y+(e.pos.y-e.prevPos.y)*i+this.prevEye+(this.eye-this.prevEye)*i,a=e.prevPos.z+(e.pos.z-e.prevPos.z)*i;this.target=I0(r,s,a,t.x,t.y,t.z,this.reach,(o,l,c)=>{const h=this.terrain.getBlock(o,l,c);return h!==null&&h!==_t.air&&!Vl(h)}),this.target?this.terrain.highlight.show(this.target.x,this.target.y,this.target.z):this.terrain.highlight.hide()}get facing(){const e=new O(0,0,-1).applyQuaternion(this.head.quaternion);return Math.abs(e.x)>Math.abs(e.z)?e.x>0?"east (+X)":"west (-X)":e.z>0?"south (+Z)":"north (-Z)"}}Ye.enabled=!1;class dr{camera=new Zt;scene=new em;renderer=new Q_({antialias:!1});static SKY=10274047;constructor(){this.initScene(),this.initRenderer(),this.initCamera()}initCamera=()=>{this.camera.fov=70,this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.near=.05,this.camera.far=1e3,this.camera.updateProjectionMatrix(),this.camera.position.set(0,120,0),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()})};initScene=()=>{this.scene.background=new Je(dr.SKY),this.scene.fog=new to(dr.SKY,40,80)};initRenderer=()=>{this.renderer.outputColorSpace=di,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight)})};viewBlocks=96;sky=dr.SKY;setSky=e=>{this.sky=e,this.applyFog()};medium="air";setFogDistance=e=>{this.viewBlocks=e,this.camera.far=e+64,this.camera.updateProjectionMatrix(),this.applyFog()};setMedium=e=>{e!==this.medium&&(this.medium=e,this.applyFog())};applyFog(){const e=this.scene.fog,t=this.scene.background;this.medium==="water"?(e.color.setHex(2047887),e.near=2,e.far=Math.min(48,this.viewBlocks)):this.medium==="lava"?(e.color.setHex(10033664),e.near=.25,e.far=1.5):(e.color.setHex(this.sky),e.near=this.viewBlocks*.6,e.far=this.viewBlocks),t.copy(e.color)}}class Js{constructor(e,t,i){if(this.bits=e,this.size=t,e<1||e>32)throw new Error(`bits 必须在 1..32 之间：${e}`);this.valuesPerWord=Math.floor(32/e),this.mask=e===32?4294967295:(1<<e)-1;const r=Math.ceil(t/this.valuesPerWord);if(i&&i.length!==r)throw new Error(`数据长度不对：需要 ${r}，实际 ${i.length}`);this.data=i??new Uint32Array(r)}data;valuesPerWord;mask;get(e){const t=e/this.valuesPerWord|0,i=(e-t*this.valuesPerWord)*this.bits;return this.data[t]>>>i&this.mask}set(e,t){const i=e/this.valuesPerWord|0,r=(e-i*this.valuesPerWord)*this.bits;this.data[i]=this.data[i]&~(this.mask<<r)|(t&this.mask)<<r}}const yn=4096,$l=4,Di=8;class _r{constructor(e,t=0){this.globalBits=e,this.palette=[t],this.lookup.set(t,0)}bits=0;palette;lookup=new Map;storage=null;get(e){if(this.bits===0)return this.palette[0];const t=this.storage.get(e);return this.bits>Di?t:this.palette[t]}set(e,t){const i=this.get(e);if(i===t)return i;const r=this.idFor(t);return this.storage.set(e,r),i}idFor(e){if(this.bits>Di)return e;const t=this.lookup.get(e);if(t!==void 0&&this.bits>0)return t;const i=this.palette.length+(t===void 0?1:0),r=this.bits===0?1:1<<this.bits;return i>r&&this.resize(i),this.bits>Di?e:t!==void 0?t:(this.palette.push(e),this.lookup.set(e,this.palette.length-1),this.palette.length-1)}resize(e){const t=new Array(yn);for(let s=0;s<yn;s++)t[s]=this.get(s);const i=Math.ceil(Math.log2(e)),r=i<=Di?Math.max($l,i):this.globalBits;if(this.bits=r,this.storage=new Js(r,yn),r>Di){this.palette=[],this.lookup.clear();for(let s=0;s<yn;s++)this.storage.set(s,t[s])}else for(let s=0;s<yn;s++)this.storage.set(s,this.lookup.get(t[s]))}static fromValues(e,t){const i=new _r(t,e[0]),r=[],s=new Map;for(let l=0;l<yn;l++)s.has(e[l])||(s.set(e[l],r.length),r.push(e[l]));if(r.length===1)return i;const a=Math.ceil(Math.log2(r.length)),o=a>Di;i.bits=o?t:Math.max($l,a),i.storage=new Js(i.bits,yn),i.palette=o?[]:r,i.lookup=o?new Map:s;for(let l=0;l<yn;l++)i.storage.set(l,o?e[l]:s.get(e[l]));return i}toData(){return{bits:this.bits,palette:this.palette.slice(),data:this.storage?.data??null}}static fromData(e,t){const i=new _r(t,e.palette[0]??0);return i.bits=e.bits,i.palette=e.palette,i.lookup=new Map(e.palette.map((r,s)=>[r,s])),i.storage=e.bits===0?null:new Js(e.bits,yn,e.data),i}get isSingle(){return this.bits===0}get byteSize(){return(this.storage?.data.byteLength??0)+this.palette.length}}class ki{constructor(e=new _r(Bl,_t.air)){this.blocks=e,this.recount()}nonAir=0;static index(e,t,i){return(t*16+i)*16+e}get(e,t,i){return this.blocks.get(ki.index(e,t,i))}set(e,t,i,r){const s=this.blocks.set(ki.index(e,t,i),r);s===_t.air&&r!==_t.air?this.nonAir++:s!==_t.air&&r===_t.air&&this.nonAir--}get isEmpty(){return this.nonAir===0}recount(){const e=this.blocks;if(e.isSingle){this.nonAir=e.palette[0]===_t.air?0:4096;return}let t=0;for(let i=0;i<4096;i++)e.get(i)!==_t.air&&t++;this.nonAir=t}static fromData(e){return new ki(_r.fromData(e,Bl))}}const Ct=16;class Kl{constructor(e,t,i,r,s){this.cx=e,this.cz=t,this.minY=i,this.height=r;const a=r>>4;this.sections=s??Array.from({length:a},()=>new ki),this.meshes=new Array(a).fill(null),this.waterMeshes=new Array(a).fill(null)}sections;meshes;waterMeshes;staleSections=new Set;sectionIndex(e){return e-this.minY>>4}static index(e,t,i,r){return((t-r)*Ct+i)*Ct+e}get(e,t,i){if(t<this.minY||t>=this.minY+this.height)return _t.air;const r=t-this.minY;return this.sections[r>>4].get(e,r&15,i)}set(e,t,i,r){if(t<this.minY||t>=this.minY+this.height)return;const s=t-this.minY;this.sections[s>>4].set(e,s&15,i,r)}get byteSize(){let e=0;for(const t of this.sections)e+=t.blocks.byteSize;return e}disposeSection(e,t){for(const i of[this.meshes,this.waterMeshes]){const r=i[t];r&&(e.remove(r),r.geometry.dispose(),i[t]=null)}}dispose(e){for(let t=0;t<this.sections.length;t++)this.disposeSection(e,t)}}const ar={[tt.water]:{tickDelay:5,dropOff:1,slopeFindDistance:4,convertToSource:!0},[tt.lava]:{tickDelay:30,dropOff:2,slopeFindDistance:2,convertToSource:!1}},Qs=Pt[_t.air],$r=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];class F0{constructor(e){this.world=e}time=0;queue=new Map;pending=new Set;maxPerTick=4e3;lastProcessed=0;get queued(){return this.pending.size}clear(){this.queue.clear(),this.pending.clear()}fluidAt(e,t,i){const r=this.world.get(e,t,i);return r===null?Qs:Pt[r]}blocked(e,t,i){const r=this.world.get(e,t,i);return r===null||Bt[r]===1}schedule(e,t,i,r,s=ar[r].tickDelay){const a=`${e},${t},${i},${r}`;if(this.pending.has(a))return;this.pending.add(a);const o=this.time+Math.max(1,s);let l=this.queue.get(o);l||this.queue.set(o,l=[]),l.push({x:e,y:t,z:i,kind:r})}blockChanged(e,t,i){this.notify(e,t,i);for(const[r,s,a]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])this.notify(e+r,t+s,i+a)}notify(e,t,i){const r=this.fluidAt(e,t,i);r.kind!==tt.none&&(r.kind===tt.lava&&this.solidifyLava(e,t,i,r)||this.schedule(e,t,i,r.kind))}solidifyLava(e,t,i,r){for(const[s,a,o]of[[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]])if(this.fluidAt(e+s,t+a,i+o).kind===tt.water)return this.setAndUpdate(e,t,i,r.source?_t.obsidian:_t.cobblestone),!0;return!1}setAndUpdate(e,t,i,r){this.world.set(e,t,i,r),this.blockChanged(e,t,i)}tick(){this.time++;let e=0;for(const t of[...this.queue.keys()].sort((i,r)=>i-r)){if(t>this.time)break;const i=this.queue.get(t);for(;i.length>0&&e<this.maxPerTick;){const r=i.shift();this.pending.delete(`${r.x},${r.y},${r.z},${r.kind}`),e++,this.tickFluid(r)}if(i.length===0&&this.queue.delete(t),e>=this.maxPerTick)break}this.lastProcessed=e}tickFluid({x:e,y:t,z:i,kind:r}){if(this.world.get(e,t,i)===null)return;let s=this.fluidAt(e,t,i);if(s.kind===r){if(!s.source){const a=this.getNewLiquid(e,t,i,r),o=this.spreadDelay(e,t,i,s,a);a.kind===tt.none?(s=a,this.setAndUpdate(e,t,i,_t.air)):(a.amount!==s.amount||a.falling!==s.falling||a.source!==s.source)&&(s=a,this.world.set(e,t,i,sr(r,a.amount,a.falling)),this.schedule(e,t,i,r,o),this.blockChanged(e,t,i))}this.spread(e,t,i,s)}}spreadDelay(e,t,i,r,s){const a=r.kind;let o=ar[a].tickDelay;return a===tt.lava&&r.kind!==tt.none&&s.kind!==tt.none&&!r.falling&&!s.falling&&this.height(e,t,i,s)>this.height(e,t,i,r)&&Math.random()<.75&&(o*=4),o}height(e,t,i,r){return this.fluidAt(e,t+1,i).kind===r.kind?1:r.amount/9}getNewLiquid(e,t,i,r){if(this.blocked(e,t,i))return Qs;const s=ar[r];let a=0,o=0;for(const[c,,h]of $r){if(this.blocked(e+c,t,i+h))continue;const u=this.fluidAt(e+c,t,i+h);u.kind===r&&(u.source&&o++,a=Math.max(a,u.amount))}if(s.convertToSource&&o>=2){const c=this.world.get(e,t-1,i),h=this.fluidAt(e,t-1,i);if(c!==null&&Bt[c]||h.kind===r&&h.source)return Pt[sr(r,8)]}if(this.fluidAt(e,t+1,i).kind===r&&!this.blocked(e,t+1,i))return Pt[sr(r,8,!0)];const l=a-s.dropOff;return l<=0?Qs:Pt[sr(r,l)]}spread(e,t,i,r){if(r.kind===tt.none)return;const s=r.kind,a=this.getNewLiquid(e,t-1,i,s);this.canSpreadTo(e,t-1,i,"down",a.kind)?(this.spreadTo(e,t-1,i,"down",a),this.sourceNeighborCount(e,t,i,s)>=3&&this.spreadToSides(e,t,i,r)):(r.source||!this.isHole(e,t,i))&&this.spreadToSides(e,t,i,r)}spreadToSides(e,t,i,r){const s=r.kind;let a=r.amount-ar[s].dropOff;if(r.falling&&(a=7),!(a<=0))for(const[o,l,c]of this.getSpread(e,t,i,s))this.canSpreadTo(e+o,t,i+l,"side",c.kind)&&this.spreadTo(e+o,t,i+l,"side",c)}getSpread(e,t,i,r){let s=1e3,a=[];for(const[o,,l]of $r){const c=e+o,h=i+l,u=this.getNewLiquid(c,t,h,r);if(!this.canPassThrough(c,t,h,r))continue;const d=this.isHole(c,t,h)?0:this.slopeDistance(c,t,h,1,-o,-l,r);d<s&&(a=[]),d<=s&&(a.push([o,l,u]),s=d)}return a}slopeDistance(e,t,i,r,s,a,o){let l=1e3;for(const[c,,h]of $r){if(c===s&&h===a)continue;const u=e+c,d=i+h;if(this.canPassThrough(u,t,d,o)){if(this.isHole(u,t,d))return r;r<ar[o].slopeFindDistance&&(l=Math.min(l,this.slopeDistance(u,t,d,r+1,-c,-h,o)))}}return l}isHole(e,t,i){return!this.blocked(e,t-1,i)}canPassThrough(e,t,i,r){if(this.blocked(e,t,i))return!1;const s=this.fluidAt(e,t,i);return!(s.kind===r&&s.source)}sourceNeighborCount(e,t,i,r){let s=0;for(const[a,,o]of $r){const l=this.fluidAt(e+a,t,i+o);l.kind===r&&l.source&&s++}return s}canSpreadTo(e,t,i,r,s){if(this.blocked(e,t,i)||s===tt.none)return!1;const a=this.fluidAt(e,t,i);return a.kind===tt.none?!0:a.kind===tt.water?r==="down"&&s===tt.lava:s===tt.water&&this.height(e,t,i,a)>=.44444445}spreadTo(e,t,i,r,s){if(r==="down"&&s.kind===tt.lava&&this.fluidAt(e,t,i).kind===tt.water){this.setAndUpdate(e,t,i,_t.stone);return}this.setAndUpdate(e,t,i,sr(s.kind,s.amount,s.falling))}}const Kr=.02,Zl=1.002;class O0{mesh=new ur;constructor(e){const t=new Qa({color:0,transparent:!0,opacity:.55}),i=Zl/2;for(const r of[0,1,2]){const s=[Kr,Kr,Kr];s[r]=Zl+Kr;const a=new $i(s[0],s[1],s[2]);for(const o of[-i,i])for(const l of[-i,i]){const c=[o,l];c.splice(r,0,0);const h=new jt(a,t);h.position.set(c[0],c[1],c[2]),this.mesh.add(h)}}this.mesh.visible=!1,e.add(this.mesh)}show(e,t,i){this.mesh.position.set(e+.5,t+.5,i+.5),this.mesh.visible=!0}hide(){this.mesh.visible=!1}}function z0(){const n=new Ja(Vc(),_e,_e,ro);return n.format=Vt,n.type=an,n.wrapS=n.wrapT=is,n.magFilter=Dt,n.minFilter=lr,n.generateMipmaps=!0,n.needsUpdate=!0,n}const fr=18,mn=(n,e,t)=>((e+1)*fr+(t+1))*fr+(n+1),pi=256,oo=[[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]],jl=65536,Jl=1<<17,k0=[0,Q.water,Q.lava];class Ql{pos=new Uint16Array(4096*3);inf=new Uint8Array(4096*4);ind=new Uint16Array(4096*1.5);vertices=0;indexCount=0;grow(){const e=(t,i)=>{const r=new t.constructor(i);return r.set(t),r};this.pos=e(this.pos,this.pos.length*2),this.inf=e(this.inf,this.inf.length*2),this.ind=e(this.ind,this.ind.length*2)}quad(e,t,i,r,s,a){((this.vertices+4)*4>this.inf.length||this.indexCount+6>this.ind.length)&&this.grow();const o=this.vertices;for(let c=0;c<4;c++)this.pos.set([e[c*3],e[c*3+1],e[c*3+2]],(o+c)*3),this.inf.set([t,i,r[c],Bc[i]],(o+c)*4);const l=a?[0,1,3,0,3,2]:[0,1,2,2,1,3];for(let c=0;c<6;c+=3){const h=l[c],u=s?l[c+1]:l[c+2],d=s?l[c+2]:l[c+1];this.ind[this.indexCount++]=o+h,this.ind[this.indexCount++]=o+u,this.ind[this.indexCount++]=o+d}this.vertices+=4}build(){return{positions:this.pos.slice(0,this.vertices*3),info:this.inf.slice(0,this.vertices*4),indices:this.ind.slice(0,this.indexCount)}}}function H0(n,e={}){const t=e.greedy??!0,i=new Ql,r=new Ql,s=new Int32Array(256),a=new Float64Array(256),o=new Float32Array(256*4),l=n,c=(d,_,m)=>Bt[n[mn(d,_,m)]],h=[0,0,0],u=[0,0,0];for(let d=0;d<6;d++){const _=oo[d],m=d>>1,g=(m+1)%3,p=(m+2)%3,f=(d&1)===1;for(let w=0;w<16;w++){let y=!1;for(let b=0;b<16;b++)for(let U=0;U<16;U++){h[m]=w,h[g]=U,h[p]=b;const A=n[mn(h[0],h[1],h[2])],T=n[mn(h[0]+_[0],h[1]+_[1],h[2]+_[2])],I=b*16+U;if(s[I]=0,a[I]=0,Bt[A]){if(Bt[T])continue;u[0]=h[0]+_[0],u[1]=h[1]+_[1],u[2]=h[2]+_[2];let S=0;for(let j=0;j<4;j++){const Y=j&1?1:-1,ee=j&2?1:-1,V=c(u[0]+(g===0?Y:0),u[1]+(g===1?Y:0),u[2]+(g===2?Y:0)),le=c(u[0]+(p===0?ee:0),u[1]+(p===1?ee:0),u[2]+(p===2?ee:0)),me=c(u[0]+(g===0?Y:0)+(p===0?ee:0),u[1]+(g===1?Y:0)+(p===1?ee:0),u[2]+(g===2?Y:0)+(p===2?ee:0)),Ae=V&&le?0:3-(V+le+me);S|=Ae<<j*2}const M=S&3,R=S>>2&3,W=S>>4&3,F=S>>6&3,X=(M===R&&W===F?jl:0)|(M===W&&R===F?Jl:0);s[I]=as[A*6+d]|S<<8|X,y=!0}else if(Cn[A]!==tt.none){const S=Cn[A];if(Cn[T]===S||d!==3&&Bt[T])continue;const M=X0(l,h[0],h[1],h[2],S);o.set(M,I*4);const R=d===3?M:d===2?null:d===0?[M[0],M[2]]:d===1?[M[1],M[3]]:d===4?[M[0],M[1]]:[M[2],M[3]],W=!R||R.every(X=>X===R[0]);let F=S;for(const X of R??[])F=F*257+Math.round(X*pi);a[I]=F*2+(W?1:0),y=!0}}if(y)for(const b of[s,a])for(let U=0;U<16;U++)for(let A=0;A<16;){const T=b[U*16+A];if(T===0){A++;continue}const I=b===a,S=t&&(I?T%2===1:(T&jl)!==0),M=t&&(I?T%2===1:(T&Jl)!==0);let R=1,W=1;if(S)for(;A+R<16&&b[U*16+A+R]===T;)R++;if(M)e:for(;U+W<16;){for(let F=0;F<R;F++)if(b[(U+W)*16+A+F]!==T)break e;W++}I?W0(i,r,n,o.subarray((U*16+A)*4,(U*16+A)*4+4),d,m,g,p,f,w,A,U,R,W):B0(i,T,d,m,g,p,f,w,A,U,R,W);for(let F=0;F<W;F++)for(let X=0;X<R;X++)b[(U+F)*16+A+X]=0;A+=R}}}return G0(i,n),{opaque:i.build(),water:r.build()}}function G0(n,e){const t=pi;for(let i=0;i<16;i++)for(let r=0;r<16;r++)for(let s=0;s<16;s++){const a=e[mn(s,i,r)],o=y0[a];if(!(o===0||o===4))if(o===1){const l=w0[a]/16;for(let c=0;c<6;c++){const h=oo[c];if(c!==3&&Bt[e[mn(s+h[0],i+h[1],r+h[2])]])continue;const u=c>>1,d=(u+1)%3,_=(u+2)%3,m=(c&1)===1,g=ps(u,d,_,m,[s,i,r][u],[s,i,r][d],[s,i,r][_],1,1);for(let p=0;p<4;p++)g[p*3+1]>i*t&&(g[p*3+1]=Math.round((i+l)*t));n.quad(g,c,as[a*6+c],[3,3,3,3],m,!1)}}else{if(o===3&&V0(n,e,a,s,i,r))continue;{const l=as[a*6],c=s*t,h=(s+1)*t,u=r*t,d=(r+1)*t,_=i*t,m=(i+1)*t,g=[c,_,u,h,_,d,c,m,u,h,m,d],p=[c,_,d,h,_,u,c,m,d,h,m,u];for(const[f,w]of[[g,6],[p,7]])n.quad([...f],w,l,[3,3,3,3],!0,!1),n.quad([...f],w,l,[3,3,3,3],!1,!1)}}}}function V0(n,e,t,i,r,s){const a=pi/64;let o=!1;for(let l=0;l<6;l++){const c=oo[l];if(!Bt[e[mn(i+c[0],r+c[1],s+c[2])]])continue;const h=l>>1,u=(h+1)%3,d=(h+2)%3,_=(l&1)===1,m=ps(h,u,d,_,[i,r,s][h],[i,r,s][u],[i,r,s][d],1,1);for(let p=0;p<4;p++)m[p*3+h]+=_?-a:a;const g=as[t*6+l];n.quad([...m],l,g,[3,3,3,3],!0,!1),n.quad([...m],l,g,[3,3,3,3],!1,!1),o=!0}return o}function ps(n,e,t,i,r,s,a,o,l){const c=pi,h=[];for(let u=0;u<4;u++){const d=[0,0,0];d[n]=(r+(i?1:0))*c,d[e]=(s+(u&1?o:0))*c,d[t]=(a+(u&2?l:0))*c,h.push(d[0],d[1],d[2])}return h}function B0(n,e,t,i,r,s,a,o,l,c,h,u){const d=ps(i,r,s,a,o,l,c,h,u),_=e&255,m=[0,1,2,3].map(p=>e>>8+p*2&3),g=m[0]+m[3]>m[1]+m[2];n.quad(d,t,_,m,a,g)}function W0(n,e,t,i,r,s,a,o,l,c,h,u,d,_){const m=pi,g=[0,0,0];g[s]=c,g[a]=h,g[o]=u;const p=Cn[t[mn(g[0],g[1],g[2])]],f=ps(s,a,o,l,c,h,u,d,_);if(r!==2){const y=Math.max(f[1],f[4],f[7],f[10]);for(let b=0;b<4;b++){if(f[b*3+1]!==y)continue;const U=f[b*3]>g[0]*m?1:0,A=f[b*3+2]>g[2]*m?2:0;f[b*3+1]-=Math.round((1-i[U+A])*m)}}(p===tt.water?e:n).quad(f,r,k0[p],[3,3,3,3],l,!1)}function X0(n,e,t,i,r){const s=(d,_,m)=>{const g=n[mn(d,_,m)];return Cn[g]===r?Cn[n[mn(d,_+1,m)]]===r?1:Pt[g].amount/9:Bt[g]?-1:0},a=s(e,t,i);if(a>=1)return[1,1,1,1];const o=s(e,t,i-1),l=s(e,t,i+1),c=s(e+1,t,i),h=s(e-1,t,i),u=(d,_,m,g)=>{if(_>=1||d>=1)return 1;let p=0,f=0;const w=y=>{y>=.8?(p+=y*10,f+=10):y>=0&&(p+=y,f+=1)};if(_>0||d>0){const y=s(e+m,t,i+g);if(y>=1)return 1;w(y)}return w(a),w(_),w(d),p/f};return[u(o,h,-1,-1),u(o,c,1,-1),u(l,h,-1,1),u(l,c,1,1)]}const lo=512,Y0=`
attribute vec4 info; // [面的方向, 纹理层, AO 等级, 染色种类]

varying vec2 vUv;
varying float vLayer;
varying float vLight;
varying vec2 vColumn; // 世界坐标 (x, z)，取生物群系颜色用
varying float vTint;

const vec3 FACE_NORMAL[8] = vec3[8](vec3(-1, 0, 0), vec3(1, 0, 0), vec3(0, -1, 0), vec3(0, 1, 0), vec3(0, 0, -1), vec3(0, 0, 1), vec3(0), vec3(0));

#include <fog_pars_vertex>

const float FACE_SHADE[8] = float[8](0.6, 0.6, 0.5, 1.0, 0.8, 0.8, 0.85, 0.85);
const float AO_LEVEL[4] = float[4](0.5, 0.68, 0.84, 1.0);

void main() {
  vec3 p = position / ${pi.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标：图片的第一行在上面，所以 v 取 -y
  if (face == 0)      vUv = vec2( p.z, -p.y); // -x 面
  else if (face == 1) vUv = vec2(-p.z, -p.y); // +x 面
  else if (face == 4) vUv = vec2(-p.x, -p.y); // -z 面
  else if (face == 5) vUv = vec2( p.x, -p.y); // +z 面
  else if (face >= 6) vUv = vec2( p.x, -p.y); // 十字形植物的两片斜面（v5）：沿对角线，x 每格正好走一格
  else                vUv = vec2( p.x,  p.z); // 顶面、底面

  vLayer = info.y;
  vLight = FACE_SHADE[face] * AO_LEVEL[int(info.z + 0.5)];
  vTint = info.w;
  // 往面的反方向挪一点点：侧面正好在两列的分界线上，要取“这个方块所在的那一列”的颜色
  vColumn = (modelMatrix * vec4(p - FACE_NORMAL[face] * 0.01, 1.0)).xz;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
#ifdef WIRE
  gl_Position.z -= 0.0004 * gl_Position.w; // 线框往相机方向挪一点点，避免和表面抢深度而闪烁
#endif
  #include <fog_vertex>
}
`,q0=`
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
uniform float opacity;

varying vec2 vUv;
varying float vLayer;
varying float vLight;
varying vec2 vColumn;
varying float vTint;

#include <fog_pars_fragment>

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
    ivec2 col = ivec2(mod(floor(vColumn), ${lo}.0));
    vec3 tint = kind == 1 ? texelFetch(grassMap, col, 0).rgb : kind == 2 ? texelFetch(foliageMap, col, 0).rgb : texelFetch(waterMap, col, 0).rgb;
    c.rgb = cutout ? c.rgb * tint : mix(c.rgb, c.rgb * tint, 1.0 - c.a); // alpha 越小染得越多（mipmap 时会是中间值）
  }
  gl_FragColor = vec4(c.rgb * vLight, opacity);
#endif
  #include <fog_fragment>
}
`;function ea(n){return new Pn({vertexShader:Y0,fragmentShader:q0,uniforms:Ec.merge([oe.fog,{map:{value:null},grassMap:{value:null},foliageMap:{value:null},waterMap:{value:null},opacity:{value:n}}]),fog:!0})}class $0{textures=z0();opaque;water;wire;wireframe=!1;tintMaps=[9551193,7842607,4159204].map(e=>K0(e));tintsDirty=!1;constructor(){this.opaque=ea(1),this.water=ea(.7),this.water.transparent=!0,this.water.depthWrite=!1,this.water.side=pn;for(const e of[this.opaque,this.water])e.uniforms.map.value=this.textures,e.uniforms.grassMap.value=this.tintMaps[0],e.uniforms.foliageMap.value=this.tintMaps[1],e.uniforms.waterMap.value=this.tintMaps[2];this.wire=ea(.6),this.wire.defines={WIRE:""},this.wire.wireframe=!0,this.wire.transparent=!0}writeTints(e,t,i){const r=lo;for(let s=0;s<16;s++)for(let a=0;a<16;a++){const o=((e*16+a)%r+r)%r,l=((t*16+s)%r+r)%r;for(let c=0;c<3;c++){const h=((s*16+a)*3+c)*3,u=(l*r+o)*4,d=this.tintMaps[c].image.data;d[u]=i[h],d[u+1]=i[h+1],d[u+2]=i[h+2]}}this.tintsDirty=!0}flushTints(){if(this.tintsDirty){for(const e of this.tintMaps)e.needsUpdate=!0;this.tintsDirty=!1}}}function K0(n){const e=lo,t=new Uint8Array(e*e*4);for(let r=0;r<e*e;r++)t[r*4]=n>>16&255,t[r*4+1]=n>>8&255,t[r*4+2]=n&255,t[r*4+3]=255;const i=new tm(t,e,e,Vt,an);return i.magFilter=i.minFilter=Dt,i.needsUpdate=!0,i}function Z0(n){return new Worker(""+new URL("generate-DrkbEGxO.js",import.meta.url).href,{type:"module",name:n?.name})}class j0{slots=[];nextId=1;pending=new Map;constructor(e=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1))){for(let t=0;t<e;t++){const i={worker:new Z0,busy:0};i.worker.onmessage=r=>this.onMessage(r.data),this.slots.push(i)}}get size(){return this.slots.length}get busy(){return this.slots.reduce((e,t)=>e+t.busy,0)}call(e,t,i){const r=i===void 0?this.slots.reduce((s,a)=>a.busy<s.busy?a:s):this.slots[(i%this.slots.length+this.slots.length)%this.slots.length];return this.send(r,e,t)}async broadcast(e,t){return(await Promise.all(this.slots.map(r=>this.send(r,e,t))))[0]}send(e,t,i){const r=this.nextId++;e.busy++;const s={id:r,method:t,params:i};return new Promise((a,o)=>{this.pending.set(r,{slot:e,resolve:a,reject:o}),e.worker.postMessage(s)})}onMessage(e){const t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t.slot.busy--,e.ok?t.resolve(e.result):t.reject(new Error(e.error)))}}class J0{scene;camera;pool=new j0;materials=new $0;highlight;distance=6;chunks=new Map;loading=new Set;generation=0;edits=new Map;greedy=!0;info=null;lastChunkMs=0;lastRemeshMs=0;dirty=new Set;fluids=new F0({get:(e,t,i)=>this.getBlock(e,t,i),set:(e,t,i,r)=>this.writeBlock(e,t,i,r)});constructor(e,t){this.scene=e,this.camera=t,this.highlight=new O0(e)}async init(e,t){return this.edits.clear(),this.fluids.clear(),this.reload(),this.info=await this.pool.broadcast("init",{seed:e,settings:t}),this.info}reload(){for(const e of this.chunks.values())e.dispose(this.scene);this.chunks.clear(),this.loading.clear(),this.generation++}setGreedy(e){this.greedy=e,this.reload()}setWireframe(e){this.materials.wireframe=e;for(const t of this.chunks.values())for(const i of[...t.meshes,...t.waterMeshes])i&&this.applyWire(i)}applyWire(e){const t=e.children.length>0;if(this.materials.wireframe&&!t){const i=new jt(e.geometry,this.materials.wire);i.renderOrder=2,e.add(i)}else!this.materials.wireframe&&t&&e.clear()}update=()=>{if(!this.info)return;this.flushRemesh(),this.materials.flushTints();const e=Math.floor(this.camera.position.x/Ct),t=Math.floor(this.camera.position.z/Ct);for(const[s,a]of this.chunks)Math.max(Math.abs(a.cx-e),Math.abs(a.cz-t))>this.distance+1&&(a.dispose(this.scene),this.chunks.delete(s));const i=this.pool.size*2;if(this.pool.busy>=i)return;const r=[];for(let s=-this.distance;s<=this.distance;s++)for(let a=-this.distance;a<=this.distance;a++){if(s*s+a*a>(this.distance+.5)**2)continue;const o=`${e+s},${t+a}`;!this.chunks.has(o)&&!this.loading.has(o)&&r.push([s*s+a*a,e+s,t+a])}r.sort((s,a)=>s[0]-a[0]);for(const[,s,a]of r.slice(0,i-this.pool.busy))this.load(s,a)};tick(){this.fluids.tick()}load(e,t){const i=`${e},${t}`,r=this.generation;this.loading.add(i),this.pool.call("chunk",{cx:e,cz:t,greedy:this.greedy},Q0(e,t)).then(s=>{r===this.generation&&(this.loading.delete(i),this.onChunk(s))}).catch(s=>{r===this.generation&&this.loading.delete(i),console.error(`区块 ${i} 生成失败`,s)})}onChunk(e){const t=this.info,i=e.sections.map(o=>ki.fromData(o)),r=new Kl(e.cx,e.cz,t.minY,t.height,i),s=`${e.cx},${e.cz}`;this.chunks.set(s,r),this.lastChunkMs=e.ms,this.materials.writeTints(e.cx,e.cz,e.tints);const a=this.edits.get(s);if(a&&a.size>0){const o=new Set;for(const[l,c]of a){const h=l&15,u=l>>4&15,d=(l>>8)+r.minY;r.set(h,d,u,c),o.add(r.sectionIndex(d))}for(let l=0;l<i.length;l++)o.has(l)||o.has(l-1)||o.has(l+1)?this.remeshSection(r,l):this.setSectionMesh(r,l,e.meshes[l])}else for(let o=0;o<i.length;o++)this.setSectionMesh(r,o,e.meshes[o]);for(const[o,l]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const c=this.chunks.get(`${e.cx+o},${e.cz+l}`);if(c)for(const h of c.staleSections)this.dirty.add(`${c.cx},${c.cz},${h}`)}for(const o of e.fluidUpdates){const l=e.cx*16+(o&15),c=e.cz*16+(o>>4&15),h=(o>>8)+r.minY,u=r.get(o&15,h,o>>4&15),d=Cn[u];d!==tt.none&&this.fluids.schedule(l,h,c,d,1)}}getChunk(e,t){return this.chunks.get(`${Math.floor(e/Ct)},${Math.floor(t/Ct)}`)}getBlock(e,t,i){const r=this.getChunk(e,i);return r?r.get(e-r.cx*Ct,t,i-r.cz*Ct):null}isSolidAt(e,t,i){const r=this.getBlock(e,t,i);return r===null?!0:Ui(r)}setBlock(e,t,i,r){this.writeBlock(e,t,i,r)&&(this.fluids.blockChanged(e,t,i),this.flushRemesh())}writeBlock(e,t,i,r){const s=this.getChunk(e,i);if(!s||!this.info)return!1;const a=e-s.cx*Ct,o=i-s.cz*Ct;if(t<this.info.minY||t>=this.info.minY+this.info.height)return!1;s.set(a,t,o,r);const l=`${s.cx},${s.cz}`;this.edits.has(l)||this.edits.set(l,new Map),this.edits.get(l).set(Kl.index(a,t,o,s.minY),r);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){const d=t+h;if(d<this.info.minY||d>=this.info.minY+this.info.height)continue;const _=this.getChunk(e+c,i+u);_&&this.dirty.add(`${_.cx},${_.cz},${_.sectionIndex(d)}`)}return!0}flushRemesh(){if(this.dirty.size===0)return;const e=performance.now();for(const t of this.dirty){const[i,r,s]=t.split(",").map(Number),a=this.chunks.get(`${i},${r}`);a&&this.remeshSection(a,s)}this.dirty.clear(),this.lastRemeshMs=performance.now()-e}topSolidY(e,t){const i=this.getChunk(e,t);if(!i)return null;const r=e-i.cx*Ct,s=t-i.cz*Ct;for(let a=i.sections.length-1;a>=0;a--)if(!i.sections[a].isEmpty){for(let o=15;o>=0;o--)if(Ui(i.sections[a].get(r,o,s)))return i.minY+a*16+o}return i.minY}floorBelow(e,t,i){const r=this.getChunk(e,t);if(!r)return null;for(let s=i;s>r.minY+1;s--){const a=o=>this.getBlock(e,o,t)??0;if(Ui(a(s-1))&&!Ui(a(s))&&!Ui(a(s+1))&&Cn[a(s)]===tt.none)return s-1}return null}remeshSection(e,t){const i=new Uint8Array(fr*fr*fr);this.fillNeighborhood(e,t,i)?e.staleSections.delete(t):e.staleSections.add(t);const r=H0(i,{greedy:this.greedy});this.setSectionMesh(e,t,r.opaque.indices.length+r.water.indices.length>0?r:null)}fillNeighborhood(e,t,i){const r=[];for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++)r.push(this.chunks.get(`${e.cx+o},${e.cz+a}`));const s=e.minY+t*16;for(let a=-1;a<=16;a++)for(let o=-1;o<=16;o++){const l=o<0?-1:o>15?1:0;for(let c=-1;c<=16;c++){const h=c<0?-1:c>15?1:0,u=r[(l+1)*3+(h+1)];i[mn(c,a,o)]=u?u.get(c-h*16,s+a,o-l*16):_t.air}}return!r.includes(void 0)}setSectionMesh(e,t,i){e.disposeSection(this.scene,t),i&&(e.meshes[t]=this.toMesh(i.opaque,this.materials.opaque,e,t),e.waterMeshes[t]=this.toMesh(i.water,this.materials.water,e,t),e.waterMeshes[t]&&(e.waterMeshes[t].renderOrder=1))}toMesh(e,t,i,r){if(e.indices.length===0)return null;const s=new qn;s.setAttribute("position",new Wt(e.positions,3)),s.setAttribute("info",new Wt(e.info,4)),s.setIndex(new Wt(e.indices,1));const a=16*pi;s.boundingBox=new qi(new O(0,0,0),new O(a,a,a)),s.boundingSphere=new cs(new O(8,8,8),8*Math.sqrt(3));const o=new jt(s,t);return o.position.set(i.cx*Ct,i.minY+r*16,i.cz*Ct),o.matrixAutoUpdate=!1,o.updateMatrix(),this.applyWire(o),this.scene.add(o),o}get stats(){let e=0,t=0,i=0,r=0,s=0;for(const o of this.chunks.values()){e+=o.byteSize;for(const l of[...o.meshes,...o.waterMeshes]){if(!l)continue;i++;const c=l.geometry;for(const h of[c.attributes.position,c.attributes.info,c.index])t+=h.array.byteLength;r+=c.attributes.position.count,s+=c.index.count/6}}const a=this.info?.height??0;return{loaded:this.chunks.size,loading:this.loading.size,bytes:e,v0Bytes:this.chunks.size*16*16*a,meshBytes:t,fluidQueue:this.fluids.queued,sectionMeshes:i,vertices:r,quads:s}}}function Q0(n,e){const t=Math.floor(n/4),i=Math.floor(e/4);return(Math.imul(t,73856093)^Math.imul(i,19349663))>>>0}const ev=[0,9551193,4764952,4159204];let or=null;function ta(n,e){or??=Vc();const t=document.createElement("canvas");t.width=t.height=_e;const i=new ImageData(_e,_e),r=n*_e*_e*4,s=ev[Bc[n]&3],a=[s>>16&255,s>>8&255,s&255].map(o=>o/255);for(let o=0;o<_e*_e*4;o+=4){const l=s!==0&&or[r+o+3]<255;i.data[o]=or[r+o]*e*(l?a[0]:1),i.data[o+1]=or[r+o+1]*e*(l?a[1]:1),i.data[o+2]=or[r+o+2]*e*(l?a[2]:1),i.data[o+3]=255}return t.getContext("2d").putImageData(i,0,0),t}const ec=new Map;function tv(n){const e=ec.get(n);if(e)return e;const{top:t,side:i}=St[n].textures,r=64,s=document.createElement("canvas");s.width=s.height=r;const a=s.getContext("2d");a.imageSmoothingEnabled=!1;const o=r/2,l=o/_e,c=o/2;a.setTransform(l,l/2,-l,l/2,o,0),a.drawImage(ta(Q[t],1),0,0),a.setTransform(l,l/2,0,l,0,c),a.drawImage(ta(Q[i],.8),0,0),a.setTransform(l,-l/2,0,l,o,o),a.drawImage(ta(Q[i],.6),0,0);const h=s.toDataURL();return ec.set(n,h),h}const nv=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),$t=n=>document.getElementById(n),tc=n=>new URLSearchParams(location.search).get(n);class iv{constructor(e,t,i){this.core=e,this.terrain=t,this.control=i,this.el=document.getElementById("f3"),document.addEventListener("keydown",r=>{r.code==="F3"?(r.preventDefault(),this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible)):r.code==="KeyG"?this.terrain.setGreedy(!this.terrain.greedy):r.code==="KeyK"&&this.terrain.setWireframe(!this.terrain.materials.wireframe)})}el;visible=!1;biome="…";routerLine="";lastQuery=0;querying=!1;speed(){const e=this.control.player,t={x:e.pos.x-e.prevPos.x,y:e.pos.y-e.prevPos.y,z:e.pos.z-e.prevPos.z};return`水平 ${(Math.hypot(t.x,t.z)*20).toFixed(2)}  竖直 ${(t.y*20).toFixed(2)} 格/秒`}update(e){if(!this.visible)return;const t=performance.now(),i=this.control.feet,r=Math.floor(i.x),s=Math.floor(i.y),a=Math.floor(i.z);!this.querying&&t-this.lastQuery>250&&this.terrain.info&&(this.querying=!0,this.lastQuery=t,this.terrain.pool.call("f3",{x:r,y:s,z:a}).then(m=>{this.routerLine=m.line,this.biome=m.biome}).finally(()=>this.querying=!1));const o=this.terrain.info,l=this.control.target,c=l?St[this.terrain.getBlock(l.x,l.y,l.z)??0].name:"—",h=this.terrain.stats,u=this.core.renderer.info.render,d=m=>(m/1048576).toFixed(1)+" MB",_=[`mc-replica v5.2 (${e} fps, 20 TPS)`,`种子: ${o?.seed??"…"}    noise_settings: ${o?.settings??"…"}`,`区块: ${h.loaded} 已加载, ${h.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,`方块数据: ${d(h.bytes)}（v0 的存法要 ${d(h.v0Bytes)}）`,`网格: ${this.terrain.greedy?"贪婪":"逐面"} [G]${this.terrain.materials.wireframe?" 线框":""} [K]  ${h.sectionMeshes} 个 section 网格, ${h.quads.toLocaleString()} 个四边形, ${d(h.meshBytes)}`,`本帧: ${u.calls} 次绘制, ${u.triangles.toLocaleString()} 个三角形`,`流体: ${h.fluidQueue} 个待更新, 上个 tick 处理 ${this.terrain.fluids.lastProcessed} 个`,"",`XYZ: ${i.x.toFixed(3)} / ${i.y.toFixed(5)} / ${i.z.toFixed(3)}`,`Block: ${r} ${s} ${a}`,`Chunk: ${Math.floor(r/Ct)} ${Math.floor(a/Ct)}  (区块内 ${r&15} ${a&15})`,`Facing: ${this.control.facing}`,`Biome: ${this.biome}`,`状态: ${this.control.player.state}${this.control.player.onGround?"  落地":""}    速度: ${this.speed()}`,"",this.routerLine,"",`准星: ${c}${l?`  (${l.x}, ${l.y}, ${l.z})`:""}`];this.el.textContent=_.join(`
`)}}const Hn=160,rv=[33,82,160],Ii=[242,240,232],sv=[176,92,34];class av{constructor(e,t){this.terrain=e,this.control=t,this.el=document.getElementById("noiseMap"),this.canvas=this.el.querySelector("canvas"),this.select=this.el.querySelector("select.field"),this.scaleSelect=this.el.querySelector("select.scale"),this.legend=this.el.querySelector(".legend"),document.addEventListener("keydown",i=>{this.control.control.isLocked&&(i.code==="KeyM"&&this.toggle(),this.visible&&(i.code==="KeyN"&&this.cycle(this.select,1),i.code==="Equal"&&this.cycle(this.scaleSelect,-1),i.code==="Minus"&&this.cycle(this.scaleSelect,1)))}),this.select.addEventListener("change",()=>this.refresh(!0)),this.scaleSelect.addEventListener("change",()=>this.refresh(!0))}el;canvas;select;scaleSelect;legend;visible=!1;busy=!1;last={x:NaN,z:NaN,field:"",step:0};image=null;setFields(e){this.select.innerHTML=e.map(t=>`<option>${t}</option>`).join(""),this.select.value=e.includes("continents")?"continents":e[0]}cycle(e,t){const i=e.options.length;e.selectedIndex=(e.selectedIndex+t+i)%i,this.refresh(!0)}toggle(){this.visible=!this.visible,this.el.classList.toggle("hidden",!this.visible),this.visible&&this.refresh(!0)}update(){this.visible&&(this.refresh(!1),this.draw())}refresh(e){const t=this.control.feet,i=Number(this.scaleSelect.value),r=Math.max(Math.abs(t.x-this.last.x),Math.abs(t.z-this.last.z))>Hn*i/8;if(this.busy||!this.terrain.info||!(e||r||this.select.value!==this.last.field))return;this.busy=!0;const s={field:this.select.value,cx:Math.floor(t.x),cy:Math.floor(t.y),cz:Math.floor(t.z),size:Hn,step:i};this.last={x:s.cx,z:s.cz,field:s.field,step:i},this.terrain.pool.call("slice",s).then(a=>this.paint(a.values,a.min,a.max)).catch(a=>console.error(a)).finally(()=>this.busy=!1)}paint(e,t,i){const r=new ImageData(Hn,Hn),s=Math.max(Math.abs(t),Math.abs(i))||1;for(let a=0;a<e.length;a++){const o=Math.max(-1,Math.min(1,e[a]/s)),l=o<0?rv:sv,c=Math.abs(o);r.data[a*4]=Ii[0]+(l[0]-Ii[0])*c,r.data[a*4+1]=Ii[1]+(l[1]-Ii[1])*c,r.data[a*4+2]=Ii[2]+(l[2]-Ii[2])*c,r.data[a*4+3]=255}this.image=r,this.legend.textContent=`${(-s).toFixed(3)}  …  0  …  ${s.toFixed(3)}    每像素 ${this.last.step} 格`}draw(){if(!this.image)return;const e=this.canvas.getContext("2d");this.canvas.width=Hn,this.canvas.height=Hn,e.putImageData(this.image,0,0);const t=this.control.feet,i=Hn/2+(t.x-this.last.x)/this.last.step,r=Hn/2+(t.z-this.last.z)/this.last.step,s=this.control.camera.getWorldDirection(new O);e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(i-4,r),e.lineTo(i+4,r),e.moveTo(i,r-4),e.lineTo(i,r+4),e.moveTo(i,r),e.lineTo(i+s.x*12,r+s.z*12),e.stroke()}}class ov{constructor(e,t,i){this.core=e,this.terrain=t,this.control=i,this.f3=new iv(e,t,i),this.noiseMap=new av(t,i),this.initMenu(),this.initHotbar()}f3;noiseMap;menu=$t("menu");playButton=$t("play");status=$t("loadingStatus");hotbar=$t("hotbar");frames=0;fps=0;fpsTime=performance.now();lastSlot=-1;initMenu=()=>{const e=$t("seedInput"),t=$t("distance"),i=new URLSearchParams(location.search);e.value=i.get("seed")??"42",t.value=String(this.terrain.distance),this.playButton.addEventListener("click",()=>{if(nv)return alert("暂不支持手机，请用电脑浏览器打开");this.control.control.lock()}),this.control.control.addEventListener("lock",()=>this.menu.classList.add("hidden")),this.control.control.addEventListener("unlock",()=>{this.menu.classList.remove("hidden"),this.playButton.textContent="继续游戏"}),$t("regenerate").addEventListener("click",()=>{const s=new URLSearchParams({seed:e.value.trim()||"42",settings:$t("settingsSelect").value,distance:t.value});location.search=s.toString()}),t.addEventListener("change",()=>this.setDistance(Number(t.value)));const r=$t("bobbing");r.addEventListener("change",()=>this.control.bobbing=r.checked),i.get("distance")&&(t.value=i.get("distance"),this.setDistance(Number(t.value)))};setDistance(e){this.terrain.distance=e,this.core.setFogDistance(e*16)}onWorldReady(e){$t("settingsSelect").innerHTML=e.allSettings.map(i=>`<option${i===e.settings?" selected":""}>${i}</option>`).join("");const t=e.packs.some(i=>i.name!=="builtin");$t("worldInfo").textContent=`种子 ${e.seed} · ${e.settings}`+(t?"":" · 没有检测到原版数据包，正在使用 demo 简化地形（见 datapacks/README.md）"),this.noiseMap.setFields(e.routerFields),/nether/.test(e.settings)?this.core.setSky(3344392):/end/.test(e.settings)&&this.core.setSky(1314844),this.setDistance(this.terrain.distance)}initHotbar=()=>{this.hotbar.innerHTML=Ba.map((e,t)=>`<div class="slot" title="${St[e].name}"><img src="${tv(e)}" alt=""><span>${t+1}</span></div>`).join("")};update=()=>{this.frames++;const e=performance.now();if(e-this.fpsTime>=1e3&&(this.fps=Math.round(this.frames*1e3/(e-this.fpsTime)),this.frames=0,this.fpsTime=e),this.control.slot!==this.lastSlot&&(this.lastSlot=this.control.slot,this.hotbar.querySelectorAll(".slot").forEach((t,i)=>t.classList.toggle("on",i===this.lastSlot)),$t("slotName").textContent=St[Ba[this.lastSlot]].name),this.control.spawned)this.playButton.disabled&&(this.status.textContent="准备好了",this.playButton.disabled=!1);else{const{loaded:t}=this.terrain.stats;this.status.textContent=this.terrain.info?`正在生成出生点附近的区块…（已完成 ${t} 个）`:"正在读取数据包…",this.playButton.disabled=!0}this.core.setMedium(this.control.medium),this.f3.update(this.fps),this.noiseMap.update()}}const Mr=new dr,co=Mr.camera,ho=Mr.scene,lv=Mr.renderer,Yc=new um,br=new J0(ho,co),uo=new N0(ho,co,Yc,br),fo=new ov(Mr,br,uo);br.init(tc("seed")??"42",tc("settings")??"").then(n=>fo.onWorldReady(n));const cv=new nm;(function n(){requestAnimationFrame(n);const e=cv.getDelta();uo.update(e),br.update(),fo.update(),lv.render(ho,co)})();Object.assign(window,{game:{core:Mr,player:Yc,terrain:br,control:uo,ui:fo}});
//# sourceMappingURL=index-C-Bcpr_e.js.map
