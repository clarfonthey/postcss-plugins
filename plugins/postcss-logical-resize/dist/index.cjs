"use strict";var o,t,e,i=require("postcss-value-parser");function cloneDeclaration(o,t,e){o.parent&&o.parent.some((o=>"decl"==o.type&&o.prop===e&&o.value===t))||o.cloneBefore({value:t,prop:e})}function transformResize(o){return t=>{const{prop:e,value:n}=t,r=i(n),c=o.inlineIsHorizontal?"horizontal":"vertical",s=o.inlineIsHorizontal?"vertical":"horizontal";r.nodes.forEach((o=>{if("word"===o.type){const t=o.value.toLowerCase();if("inline"===t)return void(o.value=c);"block"===t&&(o.value=s)}}));const l=r.toString();return l!==n&&(cloneDeclaration(t,l,e),!0)}}function directionFlowToAxes(o){switch(o){case t.TopToBottom:return[e.Top,e.Bottom];case t.BottomToTop:return[e.Bottom,e.Top];case t.RightToLeft:return[e.Right,e.Left];case t.LeftToRight:return[e.Left,e.Right]}}!function(o){o.Block="block",o.Inline="inline"}(o||(o={})),function(o){o.TopToBottom="top-to-bottom",o.BottomToTop="bottom-to-top",o.RightToLeft="right-to-left",o.LeftToRight="left-to-right"}(t||(t={})),function(o){o.Top="top",o.Right="right",o.Bottom="bottom",o.Left="left"}(e||(e={}));const creator=o=>{const i=Object.assign({blockDirection:t.TopToBottom,inlineDirection:t.LeftToRight},o),n=Object.values(t);if(!n.includes(i.blockDirection))throw new Error(`[postcss-logical-resize] "blockDirection" must be one of ${n.join(", ")}`);if(!n.includes(i.inlineDirection))throw new Error(`[postcss-logical-resize] "inlineDirection" must be one of ${n.join(", ")}`);const[r,c]=directionFlowToAxes(i.blockDirection),[s,l]=directionFlowToAxes(i.inlineDirection);if(!Object.values(e).every((o=>[r,c,s,l].includes(o))))throw new Error('[postcss-logical-resize] "blockDirection" and "inlineDirection" must be on separate axes');const a={block:[r,c],inline:[s,l],inlineIsHorizontal:[t.LeftToRight,t.RightToLeft].includes(i.inlineDirection)};return{postcssPlugin:"postcss-logical-resize",Declaration:{resize:(u=transformResize(a),(o,{result:t})=>{if(!u)return;let e=!1;try{e=u(o)}catch(e){return void o.warn(t,e instanceof Error?e.message:String(e))}e&&o.remove()})}};var u};creator.postcss=!0,module.exports=creator;
