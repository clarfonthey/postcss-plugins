"use strict";var e=require("path"),r=require("fs"),s=require("module");function parseImport(t,o,a,n){var c;let l="";try{if(a.startsWith("node_modules://")){l=s.createRequire(process.cwd()).resolve(a.slice(15))}else if(a.startsWith("node_modules:")){l=s.createRequire(process.cwd()).resolve(a.slice(13))}else l=e.resolve(a)}catch(e){throw new Error(`Failed to read ${a} with error ${e instanceof Error?e.message:e}`)}if(n.has(l))return!1;n.add(l),o.result.messages.push({type:"dependency",plugin:"postcss-global-data",file:l,parent:null==(c=t.source)||null==(c=c.input)?void 0:c.file});const i=r.readFileSync(l,"utf8");return o.postcss.parse(i,{from:l})}const creator=e=>{const r=Object.assign({files:[]},e);return{postcssPlugin:"postcss-global-data",prepare(){let e=new Set,s=new Set;return{Once:(t,o)=>{r.files.forEach((r=>{if(e.has(r))return;const a=parseImport(t,o,r,e);a&&a.each((e=>{t.append(e),s.add(e)}))}))},OnceExit:()=>{s.forEach((e=>{e.remove()})),s=new Set,e=new Set}}}}};creator.postcss=!0,module.exports=creator;
