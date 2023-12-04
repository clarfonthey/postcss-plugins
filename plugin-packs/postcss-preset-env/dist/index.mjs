import s from"autoprefixer";import o from"cssdb";import e from"browserslist";import t from"@csstools/postcss-initial";import i from"postcss-pseudo-class-any-link";import r from"css-blank-pseudo";import a from"postcss-page-break";import p from"@csstools/postcss-cascade-layers";import c from"postcss-attribute-case-insensitive";import n from"postcss-clamp";import l from"@csstools/postcss-color-function";import m from"postcss-color-functional-notation";import u from"@csstools/postcss-color-mix-function";import d from"postcss-custom-media";import f from"postcss-custom-properties";import g from"postcss-custom-selectors";import b from"postcss-dir-pseudo-class";import h from"@csstools/postcss-normalize-display-values";import v from"postcss-double-position-gradients";import N from"@csstools/postcss-exponential-functions";import y from"@csstools/postcss-logical-float-and-clear";import k from"postcss-focus-visible";import w from"postcss-focus-within";import x from"@csstools/postcss-font-format-keywords";import F from"postcss-font-variant";import O from"@csstools/postcss-gamut-mapping";import $ from"postcss-gap-properties";import S from"@csstools/postcss-gradients-interpolation-method";import P from"css-has-pseudo";import C from"postcss-color-hex-alpha";import I from"@csstools/postcss-hwb-function";import L from"@csstools/postcss-ic-unit";import E from"postcss-image-set-function";import B from"@csstools/postcss-is-pseudo-class";import U from"postcss-lab-function";import A from"@csstools/postcss-logical-overflow";import _ from"@csstools/postcss-logical-overscroll-behavior";import q from"postcss-logical";import j from"@csstools/postcss-logical-resize";import M from"@csstools/postcss-logical-viewport-units";import z from"@csstools/postcss-media-queries-aspect-ratio-number-values";import D from"@csstools/postcss-media-minmax";import R from"@csstools/postcss-nested-calc";import V from"postcss-nesting";import T from"postcss-selector-not";import H from"@csstools/postcss-oklab-function";import W from"postcss-opacity-percentage";import G from"postcss-overflow-shorthand";import K from"postcss-replace-overflow-wrap";import Z from"postcss-place";import Q from"css-prefers-color-scheme";import J from"@csstools/postcss-progressive-custom-properties";import X from"postcss-color-rebeccapurple";import Y from"@csstools/postcss-relative-color-syntax";import ss from"@csstools/postcss-scope-pseudo-class";import os from"@csstools/postcss-stepped-value-functions";import es from"@csstools/postcss-text-decoration-shorthand";import ts from"@csstools/postcss-trigonometric-functions";import is from"@csstools/postcss-unset-value";const rs={"blank-pseudo-class":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-blank-pseudo/README.md#browser","focus-visible-pseudo-class":"https://github.com/WICG/focus-visible","focus-within-pseudo-class":"https://github.com/csstools/postcss-plugins/blob/main/plugins/postcss-focus-within/README.md#browser","has-pseudo-class":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-has-pseudo/README.md#browser","prefers-color-scheme-query":"https://github.com/csstools/postcss-plugins/blob/main/plugins/css-prefers-color-scheme/README.md#browser"},as=["blank-pseudo-class","focus-visible-pseudo-class","focus-within-pseudo-class","has-pseudo-class","prefers-color-scheme-query"];function logFeaturesList(s,o,e){if(o.debug){e.log("Enabling the following feature(s):");const t=[],i=[];!1!==o.autoprefixer&&i.push("  autoprefixer"),s.forEach((s=>{s.id.startsWith("before")||s.id.startsWith("after")?i.push(`  ${s.id} (injected via options)`):i.push(`  ${s.id}`),void 0!==rs[s.id]&&t.push(s.id)})),i.sort(((s,o)=>s.localeCompare(o))),t.sort(((s,o)=>s.localeCompare(o))),i.forEach((s=>e.log(s))),t.length&&(e.log("These feature(s) need a browser library to work:"),t.forEach((s=>e.log(` ${s}: ${rs[s]}`))))}}function initializeSharedOptions(s){if("preserve"in s){const o={};return o.preserve=s.preserve,o}return!1}function clamp(s,o,e){return Math.max(s,Math.min(o,e))}const ps=2,cs=5;function stageFromOptions(s,o){let e=ps;if(void 0===s.stage)return o.log(`Using features from Stage ${e} (default)`),e;if(!1===s.stage)e=cs;else{let o=parseInt(s.stage,10);Number.isNaN(o)&&(o=0),e=clamp(0,o,cs)}return e===cs?o.log('Stage has been disabled, features will be handled via the "features" option.'):o.log(`Using features from Stage ${e}`),e}const ns=Symbol("insertBefore"),ls=Symbol("insertAfter"),ms=Symbol("insertOrder"),us=Symbol("plugin");function getTransformedInsertions(s,o,e){if("insertBefore"!==e&&"insertAfter"!==e)return[];const t="insertBefore"===e?ns:ls,i=[];for(const e in o){if(!Object.hasOwnProperty.call(o,e))continue;if(!s.find((s=>s.id===e)))continue;let r=o[e];Array.isArray(r)||(r=[r]);for(let s=0;s<r.length;s++)i.push({id:e,[us]:r[s],[ms]:s,[t]:!0})}return i}var ds=["custom-media-queries","environment-variables","image-set-function","media-query-ranges","media-queries-aspect-ratio-number-values","prefers-color-scheme-query","nesting-rules","custom-selectors","any-link-pseudo-class","case-insensitive-attributes","focus-visible-pseudo-class","focus-within-pseudo-class","not-pseudo-class","logical-properties-and-values","float-clear-logical-values","logical-overflow","logical-overscroll-behavior","logical-resize","logical-viewport-units","dir-pseudo-class","all-property","gradients-interpolation-method","color-mix","relative-color-syntax","lab-function","oklab-function","color-function","hwb-function","color-functional-notation","rebeccapurple-color","hexadecimal-alpha-notation","double-position-gradients","blank-pseudo-class","break-properties","font-variant-property","is-pseudo-class","scope-pseudo-class","has-pseudo-class","gap-properties","overflow-property","overflow-wrap-property","place-properties","system-ui-font-family","font-format-keywords","display-two-values","ic-unit","opacity-percentage","text-decoration-shorthand","unset-value","stepped-value-functions","trigonometric-functions","exponential-functions","clamp","nested-calc","custom-properties","cascade-layers","progressive-custom-properties","gamut-mapping"];function featureIsLess(s,o){return s.id===o.id?s[ns]&&o[ns]||s[ls]&&o[ls]?clamp(-1,s[ms]-o[ms],1):s[ns]||o[ls]?-1:s[ls]||o[ns]?1:0:clamp(-1,ds.indexOf(s.id)-ds.indexOf(o.id),1)}function postcssSystemUiFont(){return{postcssPlugin:"postcss-system-ui-font",Declaration(s){fs.test(s.prop)&&(s.value.includes(hs)||(s.value=s.value.replace(vs,Ns)))}}}postcssSystemUiFont.postcss=!0;const fs=/(?:^(?:-|\\002d){2})|(?:^font(?:-family)?$)/i,gs="[\\f\\n\\r\\x09\\x20]",bs=["system-ui","-apple-system","Segoe UI","Roboto","Ubuntu","Cantarell","Noto Sans","sans-serif"],hs=bs.join(", "),vs=new RegExp(`(^|,|${gs}+)(?:system-ui${gs}*)(?:,${gs}*(?:${bs.join("|")})${gs}*)?(,|$)`,"i"),Ns=`$1${hs}$2`,ys=new Map([["all-property",t],["any-link-pseudo-class",i],["blank-pseudo-class",r],["break-properties",a],["cascade-layers",p],["case-insensitive-attributes",c],["clamp",n],["color-function",l],["color-functional-notation",m],["color-mix",u],["custom-media-queries",d],["custom-properties",f],["custom-selectors",g],["dir-pseudo-class",b],["display-two-values",h],["double-position-gradients",v],["exponential-functions",N],["float-clear-logical-values",y],["focus-visible-pseudo-class",k],["focus-within-pseudo-class",w],["font-format-keywords",x],["font-variant-property",F],["gamut-mapping",O],["gap-properties",$],["gradients-interpolation-method",S],["has-pseudo-class",P],["hexadecimal-alpha-notation",C],["hwb-function",I],["ic-unit",L],["image-set-function",E],["is-pseudo-class",B],["lab-function",U],["logical-overflow",A],["logical-overscroll-behavior",_],["logical-properties-and-values",q],["logical-resize",j],["logical-viewport-units",M],["media-queries-aspect-ratio-number-values",z],["media-query-ranges",D],["nested-calc",R],["nesting-rules",V],["not-pseudo-class",T],["oklab-function",H],["opacity-percentage",W],["overflow-property",G],["overflow-wrap-property",K],["place-properties",Z],["prefers-color-scheme-query",Q],["progressive-custom-properties",J],["rebeccapurple-color",X],["relative-color-syntax",Y],["scope-pseudo-class",ss],["stepped-value-functions",os],["system-ui-font-family",postcssSystemUiFont],["text-decoration-shorthand",es],["trigonometric-functions",ts],["unset-value",is]]);function featureIsInsertedOrHasAPlugin(s){return!!s[ns]||(!!s[ls]||!!ys.has(s.id))}function prepareFeaturesList(s,o,e){return s.concat(getTransformedInsertions(s,o,"insertBefore"),getTransformedInsertions(s,e,"insertAfter")).filter((s=>featureIsInsertedOrHasAPlugin(s))).sort(((s,o)=>featureIsLess(s,o)))}const ks=["and_chr","and_ff","android","chrome","edge","firefox","ie","ios_saf","op_mini","op_mob","opera","safari","samsung"];function getUnsupportedBrowsersByFeature(s){if(!s)return[];if(!("browser_support"in s))return["> 0%"];const o=[];return ks.forEach((e=>{if("op_mini"===e&&void 0===s.browser_support[e])return void o.push("op_mini all");const t=s.browser_support[e];"string"==typeof t&&/^[0-9|.]+$/.test(t)?o.push(`${e} < ${s.browser_support[e]}`):o.push(`${e} >= 1`)})),o}function getOptionsForBrowsersByFeature(s,o,e,t,i){switch(o.id){case"is-pseudo-class":return{onComplexSelector:"warning"};case"nesting-rules":if(needsOptionFor(e.find((s=>"is-pseudo-class"===s.id)),s))return i.log('Disabling :is on "nesting-rules" due to lack of browser support.'),{noIsPseudoSelector:!0};return{};case"any-link-pseudo-class":if(s.find((s=>s.startsWith("ie ")||s.startsWith("edge "))))return i.log('Adding area[href] fallbacks for ":any-link" support in Edge and IE.'),{subFeatures:{areaHrefNeedsFixing:!0}};return{};case"logical-properties-and-values":case"float-clear-logical-values":case"logical-resize":case"logical-viewport-units":case"logical-overflow":case"logical-overscroll-behavior":return"logical"in t?t.logical:{};default:return{}}}function needsOptionFor(s,o){const t=getUnsupportedBrowsersByFeature(s),i=e(t,{ignoreUnknownVersions:!0});return!!o.some((s=>i.some((o=>o===s))))}function formatPolyfillableFeature(s){const o=getUnsupportedBrowsersByFeature(s);if(s[ns]||s[ls]){let e=s.id;return e=s.insertBefore?`before-${e}`:`after-${e}`,{browsers:o,vendors_implementations:s.vendors_implementations,plugin:s[us],id:e,stage:cs+1}}return{browsers:o,vendors_implementations:s.vendors_implementations,plugin:ys.get(s.id),id:s.id,stage:s.stage}}function formatStagedFeature(s,o,e,t,i,r,a){let p,c;return p=getOptionsForBrowsersByFeature(o,t,s,r,a),!0===e[t.id]?i&&(p=Object.assign({},p,i)):p=i?Object.assign({},p,i,e[t.id]):Object.assign({},p,e[t.id]),"progressive-custom-properties"!==t.id&&(p.enableProgressiveCustomProperties=!1),"overflow-wrap-property"===t.id&&"preserve"in p&&(p.method=p.preserve?"copy":"replace"),c=t.plugin.postcss&&"function"==typeof t.plugin?t.plugin(p):t.plugin&&t.plugin.default&&"function"==typeof t.plugin.default&&t.plugin.default.postcss?t.plugin.default(p):t.plugin,{browsers:t.browsers,vendors_implementations:t.vendors_implementations,plugin:c,pluginOptions:p,id:t.id}}function intOrZero(s){const o=parseInt(s,10);return Number.isNaN(o)?0:o}const ws=new Set(["progressive-custom-properties"]);function listFeatures(s,o,t,i){const r=Object(o.features),a="enableClientSidePolyfills"in o&&o.enableClientSidePolyfills,p=Object(o.insertBefore),c=Object(o.insertAfter),n=o.browsers?void 0:o.env,l=o.browsers,m=clamp(0,intOrZero(o.minimumVendorImplementations),3);m>0&&i.log(`Using features with ${m} or more vendor implementations`);const u=stageFromOptions(o,i),d=prepareFeaturesList([...s,{id:"progressive-custom-properties"}],p,c).map((s=>formatPolyfillableFeature(s))).filter((s=>!!ws.has(s.id)||(0===m||(!(!s[ns]&&!s[ls])||(m<=s.vendors_implementations||(r[s.id]?(i.log(`  ${s.id} does not meet the required vendor implementations but has been enabled by options`),!0):(i.log(`  ${s.id} with ${s.vendors_implementations} vendor implementations has been disabled`),!1))))))),f=e(l,{env:n,ignoreUnknownVersions:!0}).filter((s=>ks.includes(s.split(" ")[0])));return d.filter((s=>{if(ws.has(s.id))return!0;const o=s.stage>=u,e=a||!as.includes(s.id),t=!1===r[s.id],p=r[s.id]?r[s.id]:o&&e;return t?i.log(`  ${s.id} has been disabled by options`):o?e||i.log(`  ${s.id} has been disabled by "enableClientSidePolyfills: false".`):p?i.log(`  ${s.id} does not meet the required stage but has been enabled by options`):i.log(`  ${s.id} with stage ${s.stage} has been disabled`),p})).map((e=>formatStagedFeature(s,f,r,e,t,o,i))).filter((s=>{if(ws.has(s.id))return!0;if(s.id in r)return r[s.id];const o=e(s.browsers,{ignoreUnknownVersions:!0}),t=f.some((s=>o.some((o=>o===s))));return t||i.log(`${s.id} disabled due to browser support`),t}))}class Logger{constructor(){this.logs=[]}log(s){this.logs.push(s)}resetLogger(){this.logs.length=0}dumpLogs(s){s&&s.warn(this.logs.join("\n")),this.resetLogger()}}var xs=[{packageName:"css-blank-pseudo",id:"blank-pseudo-class",importName:"postcssBlankPseudo"},{packageName:"css-has-pseudo",id:"has-pseudo-class",importName:"postcssHasPseudo"},{packageName:"css-prefers-color-scheme",id:"prefers-color-scheme-query",importName:"postcssPrefersColorScheme"},{packageName:"postcss-attribute-case-insensitive",id:"case-insensitive-attributes",importName:"postcssAttributeCaseInsensitive"},{packageName:"postcss-clamp",id:"clamp",importName:"postcssClamp"},{packageName:"@csstools/postcss-color-mix-function",id:"color-mix",importName:"postcssColorMixFunction"},{packageName:"@csstools/postcss-color-function",id:"color-function",importName:"postcssColorFunction"},{packageName:"postcss-color-functional-notation",id:"color-functional-notation",importName:"postcssColorFunctionalNotation"},{packageName:"postcss-color-hex-alpha",id:"hexadecimal-alpha-notation",importName:"postcssColorHexAlpha"},{packageName:"postcss-color-rebeccapurple",id:"rebeccapurple-color",importName:"postcssColorRebeccapurple"},{packageName:"postcss-custom-media",id:"custom-media-queries",importName:"postcssCustomMedia"},{packageName:"postcss-custom-properties",id:"custom-properties",importName:"postcssCustomProperties"},{packageName:"postcss-custom-selectors",id:"custom-selectors",importName:"postcssCustomSelectors"},{packageName:"postcss-dir-pseudo-class",id:"dir-pseudo-class",importName:"postcssDirPseudoClass"},{packageName:"postcss-double-position-gradients",id:"double-position-gradients",importName:"postcssDoublePositionGradients"},{packageName:"@csstools/postcss-exponential-functions",id:"exponential-functions",importName:"postcssExponentialFunctions"},{packageName:"postcss-focus-visible",id:"focus-visible-pseudo-class",importName:"postcssFocusVisible"},{packageName:"postcss-focus-within",id:"focus-within-pseudo-class",importName:"postcssFocusWithin"},{packageName:"@csstools/postcss-font-format-keywords",id:"font-format-keywords",importName:"postcssFontFormatKeywords"},{packageName:"postcss-font-variant",id:"font-variant-property",importName:"postcssFontVariant"},{packageName:"@csstools/postcss-gamut-mapping",id:"gamut-mapping",importName:"postcssGamutMapping"},{packageName:"postcss-gap-properties",id:"gap-properties",importName:"postcssGapProperties"},{packageName:"@csstools/postcss-gradients-interpolation-method",id:"gradients-interpolation-method",importName:"postcssGradientsInterpolationMethod"},{packageName:"@csstools/postcss-hwb-function",id:"hwb-function",importName:"postcssHWBFunction"},{packageName:"@csstools/postcss-ic-unit",id:"ic-unit",importName:"postcssICUnit"},{packageName:"postcss-image-set-function",id:"image-set-function",importName:"postcssImageSetFunction"},{packageName:"@csstools/postcss-initial",id:"all-property",importName:"postcssInitial"},{packageName:"@csstools/postcss-is-pseudo-class",id:"is-pseudo-class",importName:"postcssIsPseudoClass"},{packageName:"@csstools/postcss-scope-pseudo-class",id:"scope-pseudo-class",importName:"postcssScopePseudoClass"},{packageName:"postcss-lab-function",id:"lab-function",importName:"postcssLabFunction"},{packageName:"postcss-logical",id:"logical-properties-and-values",importName:"postcssLogical"},{packageName:"@csstools/postcss-logical-float-and-clear",id:"float-clear-logical-values",importName:"postcssLogicalFloatAndClear"},{packageName:"@csstools/postcss-logical-overflow",id:"logical-overflow",importName:"postcssLogicalOverflow"},{packageName:"@csstools/postcss-logical-overscroll-behavior",id:"logical-overscroll-behavior",importName:"postcssLogicalOverscrollBehavor"},{packageName:"@csstools/postcss-logical-resize",id:"logical-resize",importName:"postcssLogicalResize"},{packageName:"@csstools/postcss-logical-viewport-units",id:"logical-viewport-units",importName:"postcssLogicalViewportUnits"},{packageName:"@csstools/postcss-media-minmax",id:"media-query-ranges",importName:"postcssMediaMinmax"},{packageName:"@csstools/postcss-media-queries-aspect-ratio-number-values",id:"media-queries-aspect-ratio-number-values",importName:"postcssMediaQueriesAspectRatioNumberValues"},{packageName:"postcss-nesting",id:"nesting-rules",importName:"postcssNesting"},{packageName:"@csstools/postcss-normalize-display-values",id:"display-two-values",importName:"postcssNormalizeDisplayValues"},{packageName:"@csstools/postcss-oklab-function",id:"oklab-function",importName:"postcssOKLabFunction"},{packageName:"@csstools/postcss-relative-color-syntax",id:"relative-color-syntax",importName:"postcssRelativeColorSyntax"},{packageName:"postcss-opacity-percentage",id:"opacity-percentage",importName:"postcssOpacityPercentage"},{packageName:"postcss-overflow-shorthand",id:"overflow-property",importName:"postcssOverflowShorthand"},{packageName:"postcss-page-break",id:"break-properties",importName:"postcssPageBreak"},{packageName:"postcss-place",id:"place-properties",importName:"postcssPlace"},{packageName:"postcss-pseudo-class-any-link",id:"any-link-pseudo-class",importName:"postcssPseudoClassAnyLink"},{packageName:"postcss-replace-overflow-wrap",id:"overflow-wrap-property",importName:"postcssReplaceOverflowWrap"},{packageName:"postcss-selector-not",id:"not-pseudo-class",importName:"postcssSelectorNot"},{packageName:"@csstools/postcss-stepped-value-functions",id:"stepped-value-functions",importName:"postcssSteppedValueFunctions"},{packageName:"postcss-system-ui-font-family",importedPackage:"../patch/postcss-system-ui-font-family.mjs",id:"system-ui-font-family",importName:"postcssFontFamilySystemUI"},{packageName:"@csstools/postcss-unset-value",id:"unset-value",importName:"postcssUnsetValue"},{packageName:"@csstools/postcss-cascade-layers",id:"cascade-layers",importName:"postcssCascadeLayers"},{packageName:"@csstools/postcss-trigonometric-functions",id:"trigonometric-functions",importName:"postcssTrigonometricFunctions"},{packageName:"@csstools/postcss-nested-calc",id:"nested-calc",importName:"postcssNestedCalc"},{packageName:"@csstools/postcss-text-decoration-shorthand",id:"text-decoration-shorthand",importName:"postcssTextDecorationShorthand"},{packageName:"@csstools/postcss-progressive-custom-properties",id:"progressive-custom-properties",importName:"postcssProgressiveCustomProperties",omitTypedOptions:!0,omitDocs:!0}];function getPackageNamesToIds(){const s={};return xs.forEach((o=>{s[o.packageName]=o.id})),s}function pluginIdHelp(s,o,e){const t=xs.map((s=>s.id)),i=xs.map((s=>s.packageName)),r=getPackageNamesToIds();s.forEach((s=>{if(t.includes(s))return;const a=[...t.map((o=>[o,levenshteinDistance(s,o)])),...i.map((o=>[r[o],levenshteinDistance(s,o)]))].sort(((s,o)=>s[1]-o[1])).filter((s=>s[1]<10)),p=new Set;for(let s=0;s<a.length&&(p.add(a[s][0]),!(p.size>=3));s++);if(!p.size)return void o.warn(e,`Unknown feature: "${s}", see the list of features https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md`);let c='"';c+=Array.from(p).join('", "'),c+='"',o.warn(e,`Unknown feature: "${s}", did you mean one of: ${c}`)}))}function levenshteinDistance(s,o){if(!s.length)return o.length;if(!o.length)return s.length;const e=[];for(let t=0;t<=o.length;t++){e[t]=[t];for(let i=1;i<=s.length;i++)e[t][i]=0===t?i:Math.min(e[t-1][i]+1,e[t][i-1]+1,e[t-1][i-1]+(s[i-1]===o[t-1]?0:1))}return e[o.length][s.length]}const creator=e=>{const t=new Logger,i=Object(e),r=Object.keys(Object(i.features)),a=i.browsers?void 0:i.env,p=i.browsers,c=initializeSharedOptions(i),n=listFeatures(o,i,c,t),l=n.map((s=>s.plugin));!1!==i.autoprefixer&&l.push(s(Object.assign({env:a,overrideBrowserslist:p},i.autoprefixer))),logFeaturesList(n,i,t);const internalPlugin=()=>({postcssPlugin:"postcss-preset-env",OnceExit:function(s,{result:o}){pluginIdHelp(r,s,o),i.debug&&t.dumpLogs(o),t.resetLogger()}});return internalPlugin.postcss=!0,{postcssPlugin:"postcss-preset-env",plugins:[...l,internalPlugin()]}};creator.postcss=!0;export{creator as default};
