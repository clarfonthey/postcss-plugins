import{tokenize as e,TokenType as r,stringify as t}from"@csstools/css-tokenizer";const n=/(?:license|copyright)/i,o=/sourceMappingURL/i,i=/(?:[\s]|\/\*)/;function minify(n){if(!n||!i.test(n))return n;if(""===n.trim())return" ";const o=e({css:n});for(let e=0;e<o.length;e++){const t=o[e];if(t[0]===r.Comment||t[0]===r.Whitespace){t[1]=" ";let n=o[e+1];for(;n&&(n[0]===r.Comment||n[0]===r.Whitespace);)n[1]="",e++,n=o[e+1]}}return t(...o)}function removeEmptyNodes(e){var r;if("rule"===e.type){if(0===(null==(r=e.nodes)?void 0:r.length)){var t;const r=e.parent;return e.remove(),0===(null==r||null==(t=r.nodes)?void 0:t.length)&&removeEmptyNodes(r),!0}}else if("atrule"===e.type){var n;if(0===(null==(n=e.nodes)?void 0:n.length)&&"layer"!==e.name.toLowerCase()){var o;const r=e.parent;return e.remove(),0===(null==r||null==(o=r.nodes)?void 0:o.length)&&removeEmptyNodes(r),!0}}return!1}const creator=()=>({postcssPlugin:"postcss-minify",OnceExit(e){e.raws={before:"",after:"\n"},e.walk((e=>{if("comment"!==e.type)if("decl"===e.type&&e.variable){var r;e.raws={...e.raws,before:minify(null==(r=e.raws)?void 0:r.before)}}else{if("atrule"===e.type){var t,i,s,l,a;if(removeEmptyNodes(e))return;return e.raws={before:minify(null==(t=e.raws)?void 0:t.before),after:minify(null==(i=e.raws)?void 0:i.after),between:minify(null==(s=e.raws)?void 0:s.between),semicolons:null==(l=e.raws)?void 0:l.semicolons,afterName:minify(null==(a=e.raws)?void 0:a.afterName)},void(e.params=minify(e.params))}if("rule"===e.type){var f,m,u,v;if(removeEmptyNodes(e))return;return e.raws={before:minify(null==(f=e.raws)?void 0:f.before),after:minify(null==(m=e.raws)?void 0:m.after),between:minify(null==(u=e.raws)?void 0:u.between),semicolons:null==(v=e.raws)?void 0:v.semicolons},void(e.selector=minify(e.selector))}var c,d;if("decl"===e.type)e.raws={before:minify(null==(c=e.raws)?void 0:c.before),between:":",semicolons:null==(d=e.raws)?void 0:d.semicolons,important:e.important?"!important":""},e.value=minify(e.value)}else{if(n.test(e.text)||o.test(e.text))return;e.remove()}}))}});creator.postcss=!0;export{creator as default};