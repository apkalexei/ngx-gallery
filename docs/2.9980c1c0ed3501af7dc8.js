(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{PVhS:function(l,n,u){"use strict";u.r(n);var a=u("LoAr"),e=function(){},o=u("C9Ky"),r=u("7tlY"),t=u("WAtv"),i=u("ChgE"),d=u("fxml"),c=u("YzpY"),s=u("TeY9"),b=u("Gien"),g=u("981U"),V=u("WT9V"),p=u("GcYS"),y=u("WV+C"),h=u("0xYh"),m=u("Z5FQ"),x=function(){this.docs="import { BrowserAnimationsModule } from '@angular/platform-browser/animations';\nimport { GalleryModule } from  '@ngx-gallery/core';\nimport { LightboxModule } from  '@ngx-gallery/lightbox';\nimport { GallerizeModule } from  '@ngx-gallery/gallerize';\n\n@NgModule({\n imports: [\n    BrowserAnimationsModule,\n    GalleryModule.forRoot(galleryConfig?),\n    GalleryLightbox.forRoot(lightboxConfig?),\n    GallerizeModule\n ]\n})",this.importStyle="@import '~@ngx-gallery/core/styles/gallery';\n@import '~@ngx-gallery/core/styles/lightbox';"},O=a.Ma({encapsulation:0,styles:[[""]],data:{}});function f(l){return a.fb(2,[(l()(),a.Oa(0,0,null,null,15,"section",[],null,null,null,null,null)),(l()(),a.Oa(1,0,null,null,2,"section-title",[],null,null,null,i.b,i.a)),a.Na(2,49152,null,0,d.a,[],null,null),(l()(),a.db(-1,0,["Installation"])),(l()(),a.Oa(4,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a.db(-1,null,["Install the following packages"])),(l()(),a.Oa(6,0,null,null,4,"div",[["class","install"]],null,null,null,null,null)),(l()(),a.Oa(7,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.db(-1,null,["NPM"])),(l()(),a.Oa(9,0,null,null,1,"hl-code",[["code","npm i -S @ngx-gallery/core @ngx-gallery/lightbox @ngx-gallery/gallerize @angular/cdk"]],null,null,null,c.b,c.a)),a.Na(10,4243456,null,0,s.a,[a.h],{code:[0,"code"],disabled:[1,"disabled"]},null),(l()(),a.Oa(11,0,null,null,4,"div",[["class","install"]],null,null,null,null,null)),(l()(),a.Oa(12,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.db(-1,null,["YARN"])),(l()(),a.Oa(14,0,null,null,1,"hl-code",[["code","yarn add @ngx-gallery/core @ngx-gallery/lightbox @ngx-gallery/gallerize @angular/cdk"]],null,null,null,c.b,c.a)),a.Na(15,4243456,null,0,s.a,[a.h],{code:[0,"code"],disabled:[1,"disabled"]},null),(l()(),a.Oa(16,0,null,null,41,"section",[],null,null,null,null,null)),(l()(),a.Oa(17,0,null,null,2,"section-title",[],null,null,null,i.b,i.a)),a.Na(18,49152,null,0,d.a,[],null,null),(l()(),a.db(-1,0,["Usage"])),(l()(),a.Oa(20,0,null,null,13,"div",[["class","usage-title"]],null,null,null,null,null)),(l()(),a.Oa(21,0,null,null,1,"span",[["class","section-number"]],null,null,null,null,null)),(l()(),a.db(-1,null,["1"])),(l()(),a.Oa(23,0,null,null,10,"p",[],null,null,null,null,null)),(l()(),a.db(-1,null,["Import "])),(l()(),a.Oa(25,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.db(-1,null,["GalleryModule"])),(l()(),a.db(-1,null,[", "])),(l()(),a.Oa(28,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.db(-1,null,["LightboxModule"])),(l()(),a.db(-1,null,[" and "])),(l()(),a.Oa(31,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),a.db(-1,null,["GallerizeModule"])),(l()(),a.db(-1,null,[" in the root module"])),(l()(),a.Oa(34,0,null,null,1,"hl-code",[],null,null,null,c.b,c.a)),a.Na(35,4243456,null,0,s.a,[a.h],{code:[0,"code"]},null),(l()(),a.Oa(36,0,null,null,0,"p",[],null,null,null,null,null)),(l()(),a.Oa(37,0,null,null,0,"p",[],null,null,null,null,null)),(l()(),a.Oa(38,0,null,null,6,"div",[["class","usage-title"]],null,null,null,null,null)),(l()(),a.Oa(39,0,null,null,1,"span",[["class","section-number"]],null,null,null,null,null)),(l()(),a.db(-1,null,["2"])),(l()(),a.Oa(41,0,null,null,3,"p",[],null,null,null,null,null)),(l()(),a.db(-1,null,["Import gallery styles "])),(l()(),a.Oa(43,0,null,null,1,"code",[["class","hljs"]],null,null,null,null,null)),(l()(),a.db(-1,null,["src/styles.scss"])),(l()(),a.Oa(45,0,null,null,1,"hl-code",[],null,null,null,c.b,c.a)),a.Na(46,4243456,null,0,s.a,[a.h],{code:[0,"code"]},null),(l()(),a.Oa(47,0,null,null,0,"p",[],null,null,null,null,null)),(l()(),a.Oa(48,0,null,null,0,"p",[],null,null,null,null,null)),(l()(),a.Oa(49,0,null,null,8,"div",[["class","usage-title"]],null,null,null,null,null)),(l()(),a.Oa(50,0,null,null,1,"span",[["class","section-number"]],null,null,null,null,null)),(l()(),a.db(-1,null,["3"])),(l()(),a.Oa(52,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),a.db(-1,null,["See "])),(l()(),a.Oa(54,0,null,null,3,"a",[["class","inline-button"],["color","accent"],["mat-button",""],["routerLink","/gallerize"],["style","padding: 0 0.5em"]],[[1,"target",0],[8,"href",4],[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==a.Xa(l,55).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),"click"===n&&(e=!1!==a.Xa(l,56)._haltDisabledEvents(u)&&e),e},b.c,b.a)),a.Na(55,671744,null,0,g.q,[g.o,g.a,V.h],{routerLink:[0,"routerLink"]},null),a.Na(56,180224,null,0,p.a,[y.a,h.b,a.k,[2,m.a]],{color:[0,"color"]},null),(l()(),a.db(-1,0,["Gallerize Example"]))],function(l,n){var u=n.component;l(n,10,0,"npm i -S @ngx-gallery/core @ngx-gallery/lightbox @ngx-gallery/gallerize @angular/cdk",!0),l(n,15,0,"yarn add @ngx-gallery/core @ngx-gallery/lightbox @ngx-gallery/gallerize @angular/cdk",!0),l(n,35,0,u.docs),l(n,46,0,u.importStyle),l(n,55,0,"/gallerize"),l(n,56,0,"accent")},function(l,n){l(n,54,0,a.Xa(n,55).target,a.Xa(n,55).href,a.Xa(n,56).disabled?-1:0,a.Xa(n,56).disabled||null,a.Xa(n,56).disabled.toString(),"NoopAnimations"===a.Xa(n,56)._animationMode)})}var k=a.Ka("app-doc-gallerize",x,function(l){return a.fb(0,[(l()(),a.Oa(0,0,null,null,1,"app-doc-gallerize",[],null,null,null,f,O)),a.Na(1,49152,null,0,x,[],null,null)],null,null)},{},{},[]),z=u("y7gG"),v=u("LYzL"),M=u("eXL1"),N=u("C7Lb"),L=u("s8WJ"),w=u("SPdK"),G=u("+3V+"),S=u("Ho7M"),X=u("dgjn"),j=u("/hyk"),C=u("rXXt"),K=u("abkR"),A=u("IvSS"),Y=u("V3Ng"),W=u("a198"),R=u("w9fW"),I=u("vvyD"),U=u("AFqu"),D=u("UelK"),E=u("WgBV"),F=u("LxDK"),P=u("V7OE"),B=u("wwR/"),J=u("ResS"),_=u("9LWm"),q=u("U+go"),T=u("FOLC"),H=u("PCNd"),Q=u("rh80");u.d(n,"DocGallerizeModuleNgFactory",function(){return Z});var Z=a.La(e,[],function(l){return a.Ua([a.Va(512,a.j,a.Aa,[[8,[o.a,r.a,t.a,k]],[3,a.j],a.v]),a.Va(4608,V.m,V.l,[a.s,[2,V.y]]),a.Va(4608,z.c,z.c,[]),a.Va(4608,v.a,v.a,[]),a.Va(4608,M.a,M.a,[M.g,M.c,a.j,M.f,M.d,a.p,a.x,V.d,N.b]),a.Va(5120,M.h,M.i,[M.a]),a.Va(5120,L.c,L.d,[M.a]),a.Va(4608,L.e,L.e,[M.a,a.p,[2,V.g],[2,L.b],L.c,[3,L.e],M.c]),a.Va(4608,w.k,w.j,[w.d,w.h]),a.Va(5120,a.b,function(l,n){return[w.n(l,n)]},[V.d,a.z]),a.Va(1073742336,V.c,V.c,[]),a.Va(1073742336,g.r,g.r,[[2,g.x],[2,g.o]]),a.Va(1073742336,z.d,z.d,[]),a.Va(1073742336,y.b,y.b,[]),a.Va(1073742336,G.b,G.b,[]),a.Va(1073742336,S.a,S.a,[]),a.Va(1073742336,X.a,X.a,[]),a.Va(1073742336,N.a,N.a,[]),a.Va(1073742336,v.d,v.d,[[2,v.b]]),a.Va(1073742336,j.b,j.b,[]),a.Va(1073742336,v.f,v.f,[]),a.Va(1073742336,p.c,p.c,[]),a.Va(1073742336,C.b,C.b,[]),a.Va(1073742336,K.g,K.g,[]),a.Va(1073742336,A.b,A.b,[]),a.Va(1073742336,M.e,M.e,[]),a.Va(1073742336,L.j,L.j,[]),a.Va(1073742336,Y.h,Y.h,[]),a.Va(1073742336,W.b,W.b,[]),a.Va(1073742336,R.j,R.j,[]),a.Va(1073742336,I.a,I.a,[]),a.Va(1073742336,U.c,U.c,[]),a.Va(1073742336,w.e,w.e,[]),a.Va(1073742336,D.b,D.b,[]),a.Va(1073742336,E.a,E.a,[]),a.Va(1073742336,F.a,F.a,[]),a.Va(1073742336,P.a,P.a,[[2,w.l],a.z]),a.Va(1073742336,B.d,B.d,[]),a.Va(1073742336,J.c,J.c,[]),a.Va(1073742336,_.b,_.b,[]),a.Va(1073742336,q.b,q.b,[]),a.Va(1073742336,T.e,T.e,[]),a.Va(1073742336,H.a,H.a,[]),a.Va(1073742336,e,e,[]),a.Va(256,W.a,{separatorKeyCodes:[Q.f]},[]),a.Va(1024,g.m,function(){return[[{path:"",component:x}]]},[])])})}}]);