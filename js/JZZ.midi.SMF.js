!function(t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t:"function"==typeof define&&define.amd?define("JZZ.midi.SMF",["JZZ"],t):t(JZZ)}(function(h){var o,i,p;function f(t){throw new Error(t)}function e(t){var r="";return 2097151<t&&(r+=String.fromCharCode(128+(t>>21&127))),16383<t&&(r+=String.fromCharCode(128+(t>>14&127))),127<t&&(r+=String.fromCharCode(128+(t>>7&127))),r+=String.fromCharCode(127&t)}function n(t){return String.fromCharCode(t>>8)+String.fromCharCode(255&t)}function s(t){return String.fromCharCode(t>>24&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(255&t)}function a(t){return String.fromCharCode(255&t)+String.fromCharCode(t>>8&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>24&255)}function d(){var t=this instanceof d?this:new d;t.ppqn&&delete t.ppqn;var r,i,o=1,n=96;if(1==arguments.length){if(arguments[0]instanceof d)return arguments[0].copy();if(arguments[0]instanceof D){t.type=0,t.ppqn=n,t.push(new C);for(var e=0;e<arguments[0].length;e++)t[0].add(0,arguments[0][e]);return t}try{if(arguments[0]instanceof ArrayBuffer)return t.load(String.fromCharCode.apply(null,new Uint8Array(arguments[0]))),t}catch(t){}try{if(arguments[0]instanceof Uint8Array||arguments[0]instanceof Int8Array)return t.load(String.fromCharCode.apply(null,new Uint8Array(arguments[0]))),t}catch(t){}try{if(arguments[0]instanceof Buffer)return t.load(arguments[0].toString("binary")),t}catch(t){}if("string"==typeof arguments[0]&&"0"!=arguments[0]&&"1"!=arguments[0]&&"2"!=arguments[0])return t.load(arguments[0]),t;o=parseInt(arguments[0])}else 2==arguments.length?(o=parseInt(arguments[0]),n=parseInt(arguments[1])):3==arguments.length?(o=parseInt(arguments[0]),r=parseInt(arguments[1]),i=parseInt(arguments[2])):arguments.length&&f("Invalid parameters");return(isNaN(o)||o<0||2<o)&&f("Invalid parameters"),t.type=o,void 0===r?((isNaN(n)||n<0||65535<n)&&f("Invalid parameters"),t.ppqn=n):(24!=r&&25!=r&&29!=r&&30!=r&&f("Invalid parameters"),(isNaN(i)||i<0||255<i)&&f("Invalid parameters"),t.fps=r,t.ppf=i),t}function u(t,r,i,o){i={off:t,msg:r,data:i};return void 0!==o&&(i.tick=o),i}function c(t){if(!(this instanceof c))return new c(t);for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r])}function _(t,r){for(var i=0;i<16;i++)r[i],r[i]={}}function l(t){switch(240&t){case 128:case 144:case 160:case 176:case 224:return 2;case 192:case 208:return 1}switch(t){case 241:case 243:return 1;case 242:return 2}return 0}function y(t){var r,i=[],o=[];for(a=0;a<t.length;a++)t[a]instanceof C&&i.push(t[a]);if(1!=t.type)for(a=0;a<i.length;a++)for(r=0;r<i[a].length;r++)i[a][r].track=a,o.push(i[a][r]);else{var n=0,e=[];for(a=0;a<i.length;a++)e[a]=0;for(;;){for(var s=!0,h=0,a=0;a<i.length;a++){for(;e[a]<i[a].length&&i[a][e[a]].tt==n;)i[a][e[a]].track=a,o.push(i[a][e[a]]),e[a]++;e[a]>=i[a].length||(s&&(h=i[a][e[a]].tt),s=!1,h>i[a][e[a]].tt&&(h=i[a][e[a]].tt))}if(n=h,s)break}}return o}function g(t,r,i){if(!(this instanceof g))return new g(t,r,i);var o;if(this.sub[t])return this.sub[t](t,r,i);for("string"==typeof t&&4==t.length||f("Invalid chunk type: "+t),o=0;o<t.length;o++)(t.charCodeAt(o)<0||255<t.charCodeAt(o))&&f("Invalid chunk type: "+t);for("string"!=typeof r&&f("Invalid data type: "+r),o=0;o<r.length;o++)(r.charCodeAt(o)<0||255<r.charCodeAt(o))&&f("Invalid data character: "+r[o]);this.type=t,this.data=r,this._off=i}function m(t,r,i,o,n,e){var s=r.substr(i,o);s.length<o&&(t._complain(e,"Incomplete track data",o-s.length,n),s=(s+"\0\0").substr(0,o));for(var h=0;h<o;h++)127<s.charCodeAt(h)&&(t._complain(e,"Bad MIDI value",s.charCodeAt(h),n),s=s.substr(0,h)+"\0"+s.substr(h+1));return s}function v(t,r,i,o,n){var e=function(t){if(!t.length)return 0;if(t.charCodeAt(0)<128)return[1,t.charCodeAt(0)];var r=127&t.charCodeAt(0);return r<<=7,t.charCodeAt(1)<128?[2,r+t.charCodeAt(1)]:(r+=127&t.charCodeAt(1),r<<=7,t.charCodeAt(2)<128?[3,r+t.charCodeAt(2)]:(r+=127&t.charCodeAt(2),r<<=7,r+=127&t.charCodeAt(3),[4,t.charCodeAt(3)<128?r:-r]))}(r);return n&&(o+=e[1]),e[1]<0?(e[1]=-e[1],t._complain(i,"Bad byte sequence",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2)+"/"+r.charCodeAt(3),o)):4==e[0]&&e[1]<2097152?t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2)+"/"+r.charCodeAt(3),o):3==e[0]&&e[1]<16384?t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2),o):2==e[0]&&e[1]<128&&t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1),o),e}function C(t,r){if(!(this instanceof C))return new C(t,r);if(this._off=r,void((this._orig=this)._tick=0)!==t)for(var i,o,n=0,e=0,s="",h=e+(r+=8);e<t.length;)e+=(o=v(this,t.substr(e,4),h,n,!0))[0],n+=o[1],h=e+r,255==t.charCodeAt(e)?((i=t.substr(e,2)).length<2&&(this._complain(h,"Incomplete track data",3-i.length,n),i="ÿ/"),e+=2,e+=(o=v(this,t.substr(e,4),h+2,n))[0],this.push(new k(n,i,t.substr(e,o[1]),h)),e+=o[1]):240==t.charCodeAt(e)||247==t.charCodeAt(e)?(i=t.substr(e,1),e+=1,e+=(o=v(this,t.substr(e,4),h+1,n))[0],this.push(new k(n,i,t.substr(e,o[1]),h)),e+=o[1]):128&t.charCodeAt(e)?(s=t.substr(e,1),e+=1,o=l(s.charCodeAt(0)),240<s.charCodeAt(0)&&this._complain(h,"Unexpected MIDI message",s.charCodeAt(0).toString(16),n),this.push(new k(n,s,m(this,t,e,o,n,h),h)),e+=o):128&s.charCodeAt(0)&&(o=l(s.charCodeAt(0)),240<s.charCodeAt(0)&&this._complain(h,"Unexpected MIDI message",s.charCodeAt(0).toString(16),n),this.push(new k(n,s,m(this,t,e,o,n,h),h)),e+=o);else this.push(new k(0,"ÿ/",""))}function A(t){t=t.toString();return t=80<t.length?(t=t.substr(0,78)).substr(0,t.lastIndexOf(" "))+" ...":t}function I(t,r,i){return t.dd.length<i?u(t._off,"Invalid "+r+" meta event: "+(t.dd.length?"data too short":"no data"),A(t),t.tt):t.dd.length>i?u(t._off,"Invalid "+r+" meta event: data too long",A(t),t.tt):void 0}function S(t,r){return u(t._off,r+" meta events must be in the first track",A(t),t.tt)}function k(t,r,i,o){var n;if(255==r.charCodeAt(0))n=h.MIDI.smf(r.charCodeAt(1),i);else{for(var e=[r.charCodeAt(0)],s=0;s<i.length;s++)e.push(i.charCodeAt(s));n=h.MIDI(e)}return void 0!==o&&(n._off=o),n.tt=t,n}function M(){var t,r,i=new h.Widget;for(r in i._info.name="MIDI Player",i._info.manufacturer="Jazz-Soft",i._info.version=o,i.playing=!1,i._loop=0,i._data=[],i._pos=0,i._tick=(t=i,function(){t.tick()}),M.prototype)M.prototype.hasOwnProperty(r)&&(i[r]=M.prototype[r]);return i}function r(t){this._receive(t)}function w(t){return(t.charCodeAt(0)<<16)+(t.charCodeAt(1)<<8)+t.charCodeAt(2)}function b(){f("Not a SYX file")}function D(t){var r,i=this instanceof D?this:new D;if(i._orig=i,void 0===t)return i;if(t instanceof d)return i.copy(t.player()._data),i;if(t instanceof D)return i.copy(t),i;try{t instanceof ArrayBuffer&&(t=String.fromCharCode.apply(null,new Uint8Array(t)))}catch(t){}try{(t instanceof Uint8Array||t instanceof Int8Array)&&(t=String.fromCharCode.apply(null,new Uint8Array(t)))}catch(t){}try{t instanceof Buffer&&(t=t.toString("binary"))}catch(t){}"string"!=typeof t&&(t=String.fromCharCode.apply(null,t));for(var o=[],n=0,e=0;n<t.length;){for(240!=t.charCodeAt(n)&&b();n<t.length;){if(r=t.charCodeAt(n),o.push(r),247==r){(o=h.MIDI(o))._off=e,i.push(h.MIDI(o)),o=[],e=n+1;break}n++}n++}return o.length&&b(),i}h.MIDI.SMF||(o="1.6.1",i=h.lib.now,d.version=function(){return o},((d.prototype=[]).constructor=d).prototype.copy=function(){var t=new d;t.type=this.type,t.ppqn=this.ppqn,t.fps=this.fps,t.ppf=this.ppf,t.rmi=this.rmi,t.ntrk=this.ntrk;for(var r=0;r<this.length;r++)t.push(this[r].copy());return t},d.prototype._complain=function(t,r,i){this._warn||(this._warn=[]),this._warn.push(u(t,r,i))},d.prototype.load=function(t){var r=0;"RIFF"==t.substr(0,4)&&"RMIDdata"==t.substr(8,8)&&(this.rmi=!0,t=t.substr(r=20,t.charCodeAt(16)+256*t.charCodeAt(17)+65536*t.charCodeAt(18)+16777216*t.charCodeAt(19))),this.loadSMF(t,r)},p="MThd"+String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(6),d.prototype.loadSMF=function(t,r){var i;t.length||f("Empty file"),t.substr(0,8)!=p&&(-1!=(i=t.indexOf(p))?(t=t.substr(i),this._complain(r,"Extra leading characters",i),r+=i):f("Not a MIDI file")),this._off=r,this.type=16*t.charCodeAt(8)+t.charCodeAt(9),this._off_type=r+8,this.ntrk=16*t.charCodeAt(10)+t.charCodeAt(11),this._off_ntrk=r+10,127<t.charCodeAt(12)?(this.fps=256-t.charCodeAt(12),this.ppf=t.charCodeAt(13),this._off_fps=r+12,this._off_ppf=r+13):(this.ppqn=256*t.charCodeAt(12)+t.charCodeAt(13),this._off_ppqn=r+12),2<this.type?this._complain(8+r,"Invalid MIDI file type",this.type):0==this.type&&1<this.ntrk&&this._complain(10+r,"Wrong number of tracks for the type 0 MIDI file",this.ntrk),this.ppf||this.ppqn||f("Invalid MIDI header");for(var o=0,n=14;n<t.length-8;){var e=n+r,s=t.substr(n,4);"MTrk"==s&&o++;var h=(t.charCodeAt(n+4)<<24)+(t.charCodeAt(n+5)<<16)+(t.charCodeAt(n+6)<<8)+t.charCodeAt(n+7);h<=0&&(h=t.length-n-8,this._complain(n+r+4,"Invalid track length",t.charCodeAt(n+4)+"/"+t.charCodeAt(n+5)+"/"+t.charCodeAt(n+6)+"/"+t.charCodeAt(n+7))),n+=8;var a=t.substr(n,h);this.push(new g(s,a,e)),"MThd"==s&&this._complain(e,"Unexpected chunk type","MThd"),n+=h}o!=this.ntrk&&(this._complain(r+10,"Incorrect number of tracks",this.ntrk),this.ntrk=o),this.ntrk||f("No MIDI tracks"),(!this.type&&1<this.ntrk||2<this.type)&&(this.type=1),n<t.length&&this._complain(r+n,"Extra trailing characters",t.length-n),n>t.length&&this._complain(r+t.length,"Incomplete data",n-t.length)},c.prototype.toString=function(){var t=[];return void 0!==this.off&&t.push("offset "+this.off),void 0!==this.track&&t.push("track "+this.track),void 0!==this.tick&&t.push("tick "+this.tick),t.join(" ")+" -- "+this.msg+" ("+this.data+")"},d.prototype.tracks=function(){for(var t=0,r=0;r<this.length;r++)this[r]instanceof C&&t++;return t},d.prototype.validate=function(){var t=[];if(this._warn)for(o=0;o<this._warn.length;o++)t.push(c(this._warn[o]));for(var r=y(this),i=0,o=0;o<this.length;o++)this[o]instanceof C&&this[o]._validate(t,++i,1==this.type?o:0);var n,e,s={};for(_(0,s),o=0;o<r.length;o++)(e=function(t,r){var i;if(void 0!==t.ff)return 127<t.ff?u(t._off,"Invalid meta event",A(t),t.tt):0!=t.ff?t.ff<10?t.dd.length?void 0:u(t._off,"Invalid Text meta event: no data",A(t),t.tt):32==t.ff?(i=I(t,"Channel Prefix",1))?i:15<t.dd.charCodeAt(0)?u(t._off,"Invalid Channel Prefix meta event: incorrect data",A(t),t.tt):void 0:33==t.ff?(i=I(t,"MIDI Port",1))?i:127<t.dd.charCodeAt(0)?u(t._off,"Invalid MIDI Port meta event: incorrect data",A(t),t.tt):void 0:47!=t.ff?81==t.ff?(i=I(t,"Tempo",3))?i:r&&t.track?S(t,"Tempo"):void 0:84==t.ff?(i=I(t,"SMPTE",5))?i:24<=(31&t.dd.charCodeAt(0))||60<=t.dd.charCodeAt(1)||60<=t.dd.charCodeAt(2)||30<=t.dd.charCodeAt(3)||200<=t.dd.charCodeAt(4)||t.dd.charCodeAt(4)%25?u(t._off,"Invalid SMPTE meta event: incorrect data",A(t),t.tt):3<t.dd.charCodeAt(0)>>5?u(t._off,"Invalid SMPTE meta event: incorrect format",t.dd.charCodeAt(0)>>5,t.tt):r&&t.track?S(t,"SMPTE"):void 0:88==t.ff?(i=I(t,"Time Signature",4))?i:8<t.dd.charCodeAt(1)?u(t._off,"Invalid Time Signature meta event: incorrect data",A(t),t.tt):r&&t.track?S(t,"Time Signature"):void 0:89==t.ff?(i=I(t,"Key Signature",2))?i:1<t.dd.charCodeAt(1)||255<t.dd.charCodeAt(0)||7<t.dd.charCodeAt(0)&&t.dd.charCodeAt(0)<249?u(t._off,"Invalid Key Signature meta event: incorrect data",t.toString(),t.tt):void 0:127!=t.ff?u(t._off,"Unknown meta event",A(t),t.tt):void 0:(i=I(t,"End of Track",0))?i:void 0:(i=I(t,"Sequence Number",2))?i:void 0}(r[o],1==this.type))&&(e.track=r[o].track,t.push(c(e))),n=s,!(e=r[o]).length||e[0]<128||(e.isGmReset()||e.isGsReset()||e.isXgReset())&&_(0,n);if(_(0,s),t.sort(function(t,r){return(t.off||0)-(r.off||0)||(t.track||0)-(r.track||0)||(t.tick||0)-(r.tick||0)}),t.length)return t},d.prototype.dump=function(t){var r="";if(t)return"RIFF"+a((r=this.dump()).length+12)+"RMIDdata"+a(r.length)+r;for(var i=this.ntrk=0;i<this.length;i++)this[i]instanceof C&&this.ntrk++,r+=this[i].dump();return r=(this.ppqn?n(this.ppqn):String.fromCharCode(256-this.fps)+String.fromCharCode(this.ppf))+r,r=p+String.fromCharCode(0)+String.fromCharCode(this.type)+n(this.ntrk)+r},d.prototype.toBuffer=function(t){return Buffer.from(this.dump(t),"binary")},d.prototype.toUint8Array=function(t){for(var r=this.dump(t),t=new ArrayBuffer(r.length),i=new Uint8Array(t),o=0;o<r.length;o++)i[o]=r.charCodeAt(o);return i},d.prototype.toArrayBuffer=function(t){return this.toUint8Array(t).buffer},d.prototype.toInt8Array=function(t){return new Int8Array(this.toArrayBuffer(t))},d.prototype.toString=function(){for(var t=this.ntrk=0;t<this.length;t++)this[t]instanceof C&&this.ntrk++;var r=["SMF:","  type: "+this.type];for(this.ppqn?r.push("  ppqn: "+this.ppqn):r.push("  fps: "+this.fps,"  ppf: "+this.ppf),r.push("  tracks: "+this.ntrk),t=0;t<this.length;t++)r.push(this[t].toString());return r.join("\n")},d.prototype.annotate=function(){for(var t=y(this),r=h.Context(),i=0;i<t.length;i++)t[i].lbl&&(t[i].lbl=void 0),r._read(t[i]);return this},d.prototype.player=function(){var t,r=new M;r.ppqn=this.ppqn,r.fps=this.fps,r.ppf=this.ppf;var i=y(this);if(2==this.type)for(var o=0,n=0,e=0,s=0;s<i.length;s++)o!=(t=h.MIDI(i[s])).track&&(o=t.track,n=e),e=t.tt+n,t.tt=e,r._data.push(t);else for(s=0;s<i.length;s++)t=h.MIDI(i[s]),r._data.push(t);return r._type=this.type,r._tracks=this.tracks(),r._timing(),r},(((d.Chunk=g).prototype=[]).constructor=g).prototype.copy=function(){return new g(this.type,this.data)},g.prototype.sub={MTrk:function(t,r,i){return new C(r,i)}},g.prototype.dump=function(){return this.type+s(this.data.length)+this.data},g.prototype.toString=function(){return this.type+": "+this.data.length+" bytes"},(((d.MTrk=C).prototype=[]).constructor=C).prototype.type="MTrk",C.prototype.copy=function(){for(var t=new C,r=t.length=0;r<this.length;r++)t.push(new h.MIDI(this[r]));return t},C.prototype._validate=function(t,r){var i,o;if(this._warn)for(i=0;i<this._warn.length;i++)(o=c(this._warn[i])).track=r,t.push(o)},C.prototype._complain=function(t,r,i,o){this._warn||(this._warn=[]),this._warn.push(u(t,r,i,o))},C.prototype.dump=function(){for(var t,r="",i=0,o="",n=0;n<this.length;n++)if(r+=e(this[n].tt-i),i=this[n].tt,void 0!==this[n].dd)r+="ÿ",r+=String.fromCharCode(this[n].ff),r+=e(this[n].dd.length),r+=this[n].dd;else if(240==this[n][0]||247==this[n][0])for(r+=String.fromCharCode(this[n][0]),r+=e(this[n].length-1),t=1;t<this[n].length;t++)r+=String.fromCharCode(this[n][t]);else for(this[n][0]!=o&&(o=this[n][0],r+=String.fromCharCode(this[n][0])),t=1;t<this[n].length;t++)r+=String.fromCharCode(this[n][t]);return"MTrk"+s(r.length)+r},C.prototype.toString=function(){for(var t=["MTrk:"],r=0;r<this.length;r++)t.push(this[r].tt+": "+this[r].toString());return t.join("\n  ")},C.prototype.add=function(t,r){if(t=parseInt(t),(isNaN(t)||t<0)&&f("Invalid parameter"),(r=h.MIDI(r)).tt=t,this[this._orig.length-1].tt<t&&(this[this._orig.length-1].tt=t),47==r.ff||240<r[0]&&247!=r[0])return this;for(var i=0;i<this._orig.length-1&&!(this._orig[i].tt>t);i++);return this._orig.splice(i,0,r),this},C.prototype._ch=void 0,C.prototype._sxid=127,C.prototype._image=function(){var t=function(){};t.prototype=this._orig;t=new t;return t._ch=this._ch,t._sxid=this._sxid,t._tick=this._tick,t},C.prototype.send=function(t){return this._orig.add(this._tick,t),this},C.prototype.tick=function(t){if(t!=parseInt(t)||t<0)throw RangeError("Bad tick value: "+t);if(!t)return this;var r=this._image();return r._tick=this._tick+t,r},C.prototype.sxId=function(t){if((t=void 0===t?C.prototype._sxid:t)==this._sxid)return this;if(t!=parseInt(t)||t<0||127<t)throw RangeError("Bad MIDI value: "+t);var r=this._image();return r._sxid=t,r},C.prototype.ch=function(t){if(t==this._ch||void 0===t&&void 0===this._ch)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||15<t))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._ch=t,r},C.prototype.note=function(t,r,i,o){return this.noteOn(t,r,i),void 0===this._ch?0<o&&this.tick(o).noteOff(t,r):0<i&&this.tick(i).noteOff(t),this},h.lib.copyMidiHelpers(C),M.prototype.onEnd=function(){},M.prototype.loop=function(t){t==parseInt(t)&&0<t?this._loop=t:this._loop=t?-1:0},M.prototype.play=function(){this.event=void 0,this.playing=!0,this.paused=!1,this._ptr=0,this._pos=0,this._p0=0,this._t0=i(),this.tick()},M.prototype.stop=function(){this._pos=0,this.playing=!1,this.event="stop",this.paused=void 0},M.prototype.pause=function(){this.event="pause"},M.prototype.resume=function(){this.playing||(this.paused?(this.event=void 0,this._t0=i(),this.playing=!0,this.paused=!1,this.tick()):this.play())},M.prototype.sndOff=function(){for(var t=0;t<16;t++)this._emit(h.MIDI.allSoundOff(t));for(t=0;t<16;t++)this._emit(h.MIDI.resetAllControllers(t))},M.prototype._filter=r,M.prototype.filter=function(t){this._filter=t instanceof Function?t:r},M.prototype._receive=function(t){81==t.ff&&this.ppqn&&(this._mul=1e3*this.ppqn/w(t.dd),this.mul=this._mul*this._speed,this._t0=i(),this._p0=this._pos),this._emit(t)},M.prototype.tick=function(){var t,r=i();for(this._pos=this._p0+(r-this._t0)*this.mul;this._ptr<this._data.length&&!((t=this._data[this._ptr]).tt>this._pos);this._ptr++)this._filter(t);this._ptr>=this._data.length&&(this._loop&&-1!=this._loop&&this._loop--,this._loop?(this._ptr=0,this._p0=0,this._t0=r):this.stop(),this.onEnd()),"stop"==this.event&&(this.playing=!1,this.paused=!1,this._pos=0,this._ptr=0,this.sndOff(),this.event=void 0),"pause"==this.event&&(this.playing=!1,this.paused=!0,this._pos>=this._duration&&(this._pos=this._duration-1),this._p0=this._pos,this.sndOff(),this.event=void 0),this.playing&&h.lib.schedule(this._tick)},M.prototype.trim=function(){for(var t,r=[],i=0,o=0,n=0;n<this._data.length;n++)if((t=this._data[n]).length||1==t.ff||5==t.ff)for(;o<=n;o++)r.push(this._data[o]);return i+=this._data[n-1].tt-this._data[o-1].tt,this._data=r,this._timing(),i},M.prototype._timing=function(){var t,r,i,o;if(this._duration=this._data[this._data.length-1].tt,this._ttt=[],this.ppqn){for(this._mul=this.ppqn/500,r=this._mul,this._durationMS=i=0,this._ttt.push({t:0,m:r,ms:0}),t=0;t<this._data.length;t++)81==(o=this._data[t]).ff&&(this._durationMS+=(o.tt-i)/r,i=o.tt,r=1e3*this.ppqn/w(o.dd),this._ttt.push({t:i,m:r,ms:this._durationMS}));this._durationMS+=(this._duration-i)/r}else this._mul=this.fps*this.ppf/1e3,this._ttt.push({t:0,m:this._mul,ms:0}),this._durationMS=this._duration/this._mul;this._speed=1,this.mul=this._mul,this._ttt.push({t:this._duration,m:0,ms:this._durationMS}),this._durationMS||(this._durationMS=1)},M.prototype.speed=function(t){return void 0!==t&&((isNaN(parseFloat(t))||t<=0)&&(t=1),this._speed=t,this.mul=this._mul*this._speed,this._p0=this._pos-(i()-this._t0)*this.mul),this._speed},M.prototype.type=function(){return this._type},M.prototype.tracks=function(){return this._tracks},M.prototype.duration=function(){return this._duration},M.prototype.durationMS=function(){return this._durationMS},M.prototype.position=function(){return this._pos},M.prototype.positionMS=function(){return this.tick2ms(this._pos)},M.prototype.jump=function(t){isNaN(parseFloat(t))&&f("Not a number: "+t),(t=t<0?0:t)>=this._duration&&(t=this._duration-1),this._goto(t)},M.prototype.jumpMS=function(t){isNaN(parseFloat(t))&&f("Not a number: "+t),(t=t<0?0:t)>=this._durationMS&&(t=this._durationMS-1),this._goto(this._ms2t(t))},M.prototype._t2ms=function(t){if(!t)return 0;for(var r=0;this._ttt[r].t<t;r++);return this._ttt[--r].ms+(t-this._ttt[r].t)/this._ttt[r].m},M.prototype._ms2t=function(t){if(!t)return 0;for(var r=0;this._ttt[r].ms<t;r++);return this._ttt[--r].t+(t-this._ttt[r].ms)*this._ttt[r].m},M.prototype._goto=function(t){this._pos=t,this.playing||(this.paused=!!t),this._toPos(),this.playing&&this.sndOff()},M.prototype._toPos=function(){for(this._ptr=0;this._ptr<this._data.length;this._ptr++){var t=this._data[this._ptr];if(t.tt>=this._pos)break;81==t.ff&&this.ppqn&&(this._mul=1e3*this.ppqn/w(t.dd))}this.mul=this._mul*this._speed,this._t0=i(),this._p0=this._pos},M.prototype.tick2ms=function(t){return isNaN(parseFloat(t))&&f("Not a number: "+t),t<=0?0:t>=this._duration?this._durationMS:this._t2ms(t)},M.prototype.ms2tick=function(t){return isNaN(parseFloat(t))&&f("Not a number: "+t),t<=0?0:t>=this._durationMS?this._duration:this._ms2t(t)},h.MIDI.SMF=d,D.version=function(){return o},((D.prototype=[]).constructor=D).prototype.copy=function(t){for(var r=0;r<t.length;r++)t[r].isSMF()||(t[r].isFullSysEx()?this.push(h.MIDI(t[r])):b())},D.prototype.dump=function(){for(var t,r="",i=0;i<this.length;i++)for(t=0;t<this[i].length;t++)r+=String.fromCharCode(this[i][t]);return r},D.prototype.toBuffer=function(){return Buffer.from(this.dump(),"binary")},D.prototype.toUint8Array=function(){for(var t=this.dump(),r=new ArrayBuffer(t.length),i=new Uint8Array(r),o=0;o<t.length;o++)i[o]=t.charCodeAt(o);return i},D.prototype.toArrayBuffer=function(){return this.toUint8Array().buffer},D.prototype.toInt8Array=function(){return new Int8Array(this.toArrayBuffer())},D.prototype.toString=function(){for(var t=["SYX:"],r=0;r<this.length;r++)t.push(this[r].toString());return t.join("\n  ")},D.prototype.annotate=function(){for(var t=h.Context(),r=0;r<this.length;r++)this[r].lbl&&(this[r].lbl=void 0),t._read(this[r]);return this},D.prototype.player=function(){var t,r=new M;for(r.ppqn=96,t=0;t<this.length;t++){var i=h.MIDI(this[t]);i.tt=0,r._data.push(i)}return r._type=0,r._tracks=1,r._timing(),r.sndOff=function(){},r},D.prototype._ch=void 0,D.prototype._sxid=127,D.prototype._image=function(){var t=function(){};t.prototype=this._orig;t=new t;return t._ch=this._ch,t._sxid=this._sxid,t},D.prototype.add=function(t){return(t=h.MIDI(t)).isFullSysEx()&&this._orig.push(t),this},D.prototype.send=function(t){return this.add(t)},D.prototype.sxId=function(t){if((t=void 0===t?D.prototype._sxid:t)==this._sxid)return this;if(t!=parseInt(t)||t<0||127<t)throw RangeError("Bad MIDI value: "+t);var r=this._image();return r._sxid=t,r},D.prototype.ch=function(t){if(t==this._ch||void 0===t&&void 0===this._ch)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||15<t))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._ch=t,r},h.lib.copyMidiHelpers(D),h.MIDI.SYX=D)});