import{i as n,a as d,S as m}from"./assets/vendor-u8rapaCG.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const p="45735019-5668e0368fbdb80eca42c52b3",u="https://pixabay.com/api/",f=document.getElementById("search-form"),g=document.getElementById("search-input"),c=document.getElementById("gallery"),l=document.getElementById("loading");f.addEventListener("submit",async i=>{i.preventDefault();const o=g.value.trim();if(!o){n.error({title:"Error",message:"Search field cannot be empty!"});return}l.style.display="block",c.innerHTML="";try{const a=await d.get(u,{params:{key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}),{hits:s}=a.data;s.length===0?n.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):(s.forEach(e=>{const r=document.createElement("a");r.classList.add("card"),r.href=e.largeImageURL,r.dataset.caption=`
                    <p>Likes: ${e.likes}</p>
                    <p>Views: ${e.views}</p>
                    <p>Comments: ${e.comments}</p>
                    <p>Downloads: ${e.downloads}</p>
                `,r.innerHTML=`
                    <img src="${e.webformatURL}" alt="${e.tags}">
                    <div class="card-info">${e.tags}</div>
                `,c.appendChild(r)}),new m(".gallery a",{captionsData:"data-caption",captionDelay:250}).refresh())}catch{n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
