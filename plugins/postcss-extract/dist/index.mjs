import e from"postcss-selector-parser";function notPseudo(e,t){return e.filter((e=>!t.includes(e)))}function adjacentSiblingCombinator(e){return e.map((e=>e.prev())).filter((e=>!!e))}function childCombinator(e){return e.map((e=>e.parent)).filter((e=>!!e))}function descendantCombinator(e){return e.flatMap((t=>{const n=[];let r=t.parent;for(;r;)n.push(r),r=r.parent;return e.length?n:[]})).filter((e=>!!e))}function generalSiblingCombinator(e){return e.flatMap((t=>{const n=[];let r=t.prev();for(;r;)n.push(r),r=r.prev();return e.length?n:[]})).filter((e=>!!e))}var t;function matchAttribute(e,n,r,a,s=!1){if(n.startsWith("__proto__")||null!=r&&r.startsWith("__proto__"))return[];let i=!1;r||""===r||(i=!0);let o="";i||(o=r.toString()),s&&(o=o.toLowerCase());return e.filter((e=>{let r="";if(r="variable"===n.toLowerCase()&&"decl"===e.type&&"variable"in e?"variable":Object.keys(e).find((t=>t.toLowerCase()===n.toLowerCase()&&Object.prototype.hasOwnProperty.call(e,t))),!r)return!1;if("boolean"==typeof e[r])return e[r];if(i)return!0;let u=[e[r].toString()];switch("rule"!==e.type||"selector"!==r&&"selectors"!==r||(u=e.selectors),s&&(u=u.map((e=>e.toLowerCase()))),a){case t.StartsWith:return!!u.find((e=>e.startsWith(o)));case t.EndsWith:return!!u.find((e=>e.endsWith(o)));case t.Contains:return!!u.find((e=>e.includes(o)));case t.Exact:default:return!!u.find((e=>e===o))}}))}function matchTagName(e,t){return e.filter((e=>e.type.toLowerCase()===t.toLowerCase()))}function simplifyASTNode(e){switch(e.type){case"decl":{const t=e;return cleanUndefinedValues({type:t.type,important:t.important,prop:t.prop,value:t.value,variable:t.variable})}case"rule":{const t=e;return cleanUndefinedValues({type:t.type,selectors:t.selectors})}case"atrule":{const t=e;return cleanUndefinedValues({type:t.type,name:t.name,params:t.params})}case"comment":{const t=e;return cleanUndefinedValues({type:t.type,text:t.text})}default:return{}}}function cleanUndefinedValues(e){return Object.keys(e).forEach((t=>{void 0===e[t]&&delete e[t]})),e}function extract(e,t){const n={};for(const[r,a]of t){let t=new Set;a.each((n=>{t=selectNodesForSingleQuery(e,n,t)})),n[r]=[];for(const e of t)n[r].push(simplifyASTNode(e))}return n}function selectNodesForSingleQuery(e,t,n){const r=buildQuery(t);if(!r)return new Set;const a=new Set(n);return e.walk((e=>{if(a.has(e))return;executeConditions(r,[e]).length>0&&a.add(e)})),a}function buildQuery(e){if(!e||!e.nodes)return;let n;return e.each((e=>{switch(e.type){case"universal":n={next:n,run:e=>e};break;case"combinator":switch(e.value){case" ":n={next:n,run:e=>descendantCombinator(e)};break;case">":n={next:n,run:e=>childCombinator(e)};break;case"+":n={next:n,run:e=>adjacentSiblingCombinator(e)};break;case"~":n={next:n,run:e=>generalSiblingCombinator(e)};break;default:n={next:n,run:()=>[]}}break;case"tag":n={next:n,run:t=>matchTagName(t,e.value)};break;case"pseudo":if(":not"===e.value)n={next:n,run:t=>{const n=e.nodes.map((e=>buildQuery(e))),r=t.filter((e=>n.flatMap((t=>t?executeConditions(t,[e]):[])).length>0));return notPseudo(t,r)}};else n={next:n,run:()=>[]};break;case"attribute":switch(e.operator){case"^=":n={next:n,run:n=>matchAttribute(n,e.attribute,e.value,t.StartsWith,e.insensitive)};break;case"$=":n={next:n,run:n=>matchAttribute(n,e.attribute,e.value,t.EndsWith,e.insensitive)};break;case"*=":n={next:n,run:n=>matchAttribute(n,e.attribute,e.value,t.Contains,e.insensitive)};break;default:n={next:n,run:n=>matchAttribute(n,e.attribute,e.value,t.Exact,e.insensitive)}}break;default:n={next:n,run:()=>[]}}})),n}function executeConditions(e,t){let n=e,r=t;for(;n&&r.length>0;)r=n.run(r),n=n.next;return r}!function(e){e.Exact="",e.StartsWith="^",e.EndsWith="$",e.Contains="*"}(t||(t={}));const creator=t=>{const n=Object(t),r=new Map;return Object.keys(n.queries??{}).forEach((t=>{r.set(t,e().astSync(n.queries[t]))})),n.results||(n.results=e=>{console.log(e)}),{postcssPlugin:"postcss-extract",prepare:()=>n.extractLate?{OnceExit:e=>{n.results(extract(e,r))}}:{Once:e=>{n.results(extract(e,r))}}}};creator.postcss=!0;export{creator as default};
