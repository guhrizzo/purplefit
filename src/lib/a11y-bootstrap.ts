/**
 * Script inline executado antes da primeira pintura: aplica as preferências salvas
 * (fonte, contraste, animações...) para evitar "flash" de estilo padrão.
 * Espelha a lógica de `applyPrefsToDom` em src/lib/a11y-store.ts.
 */
export const a11yBootstrapScript = `(function(){try{
var r=window.localStorage.getItem("purplefit:a11y:v1");if(!r)return;
var p=JSON.parse(r);if(!p||typeof p!=="object")return;
var e=document.documentElement,S=["100%","112.5%","125%","143.75%","162.5%"];
var fs=typeof p.fontStep==="number"&&S[p.fontStep]?p.fontStep:0;
var c=p.contrast==="high"||p.contrast==="negative"?p.contrast:"default";
e.style.fontSize=S[fs];e.dataset.contrast=c;e.dataset.negative=String(c==="negative");
e.dataset.links=String(p.highlightLinks===true);e.dataset.readable=String(p.readableFont===true);
e.dataset.spacing=String(p.textSpacing===true);e.dataset.animations=p.animations===false?"off":"on";
var f=[];if(p.grayscale===true)f.push("grayscale(1)");if(c==="negative")f.push("invert(1) hue-rotate(180deg)");
e.style.setProperty("--a11y-filter",f.length?f.join(" "):"none");
}catch(_){}})();`;
