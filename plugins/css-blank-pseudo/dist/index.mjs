import e from"postcss-selector-parser";const s=[" ",">","~",":","+","@","#","(",")"];function isValidReplacement(e){let n=!0;for(let t=0,l=s.length;t<l&&n;t++)e.indexOf(s[t])>-1&&(n=!1);return n}const n="js-blank-pseudo",t=":blank",creator=s=>{const l=Object.assign({preserve:!0,replaceWith:"[blank]",disablePolyfillReadyClass:!1},s),o=e().astSync(l.replaceWith);return isValidReplacement(l.replaceWith)?{postcssPlugin:"css-blank-pseudo",prepare(){const s=new WeakSet;return{Rule(r,{result:a}){if(s.has(r))return;if(!r.selector.toLowerCase().includes(t))return;const i=r.selectors.flatMap((s=>{if(!s.toLowerCase().includes(t))return[s];let i;try{i=e().astSync(s)}catch(e){return r.warn(a,`Failed to parse selector : "${s}" with message: "${e instanceof Error?e.message:e}"`),[s]}if(void 0===i)return[s];let c=!1;if(i.walkPseudos((e=>{e.value.toLowerCase()===t&&(e.nodes&&e.nodes.length||(c=!0,e.replaceWith(o.clone({}))))})),!c)return[s];const d=i.clone();if(!l.disablePolyfillReadyClass){var u,p;if(null!=(u=i.nodes)&&null!=(u=u[0])&&null!=(u=u.nodes)&&u.length)for(let s=0;s<i.nodes[0].nodes.length;s++){const t=i.nodes[0].nodes[s];if("combinator"===t.type||e.isPseudoElement(t)){i.nodes[0].insertBefore(t,e.className({value:n}));break}if(s===i.nodes[0].nodes.length-1){i.nodes[0].append(e.className({value:n}));break}}return null!=(p=i.nodes)&&null!=(p=p[0])&&p.nodes&&(d.nodes[0].prepend(e.combinator({value:" "})),d.nodes[0].prepend(e.className({value:n}))),[i.toString(),d.toString()]}return[i.toString()]}));i.join(",")!==r.selectors.join(",")&&(s.add(r),r.cloneBefore({selectors:i}),l.preserve||r.remove())}}}}:{postcssPlugin:"css-blank-pseudo",Once:(e,{result:s})=>{e.warn(s,`${l.replaceWith} is not a valid replacement since it can't be applied to single elements.`)}}};creator.postcss=!0;export{creator as default};
