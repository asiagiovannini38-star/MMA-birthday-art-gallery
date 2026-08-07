const artworks = [
  ["896466A1-971E-4510-84D5-767D05913AE8.gif","Daddygrey"],
  ["IMG_6894.jpeg","WhiteMad"],
  ["IMG_6965.jpeg","Kokoro"],
  ["IMG_6998.png","Lordbunny"],
  ["IMG_7001.png","Vanpiu"],
  ["IMG_7003.png","Rudytran"],
  ["IMG_7004.png","JK"],
  ["IMG_7008.png","Linhchi"],
  ["IMG_7009.png","Thaddy"],
  ["IMG_7010.png","Joyboy"],
  ["IMG_7012.png","Hxney"],
  ["IMG_7017.png","Odel"],
  ["IMG_7025.png","Rinya"],
  ["IMG_7030.png","Boog"],
  ["IMG_7032.png","Tiberos"],
  ["IMG_7062.png","Erste"],
  ["IMG_7063.png","Tidows"]
];

const gallery=document.getElementById("gallery");
const viewer=document.getElementById("viewer");
const viewerImage=document.getElementById("viewer-image");
const viewerName=document.getElementById("viewer-name");
const viewerNumber=document.getElementById("viewer-number");
let current=0;

if(gallery){
  artworks.forEach((item,i)=>{
    const [file,name]=item;
    const card=document.createElement("article");
    card.className="art-card";
    card.innerHTML=`
      <div class="art-image-wrap">
        <img src="images/${encodeURIComponent(file)}" alt="Artwork by ${name}" loading="lazy">
      </div>
      <div class="art-info">
        <div class="art-number">EXHIBIT ${String(i+1).padStart(2,"0")}</div>
        <div class="art-name">${name}</div>
      </div>`;
    card.addEventListener("click",()=>openViewer(i));
    gallery.appendChild(card);
  });
}

function openViewer(i){
  current=(i+artworks.length)%artworks.length;
  const [file,name]=artworks[current];
  viewerImage.src="images/"+encodeURIComponent(file);
  viewerImage.alt="Artwork by "+name;
  viewerName.textContent=name;
  viewerNumber.textContent=`Exhibit ${String(current+1).padStart(2,"0")} of ${artworks.length}`;
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden","false");
}
function closeViewer(){
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden","true");
  viewerImage.src="";
}
function moveViewer(step){openViewer(current+step)}

if(viewer){
  document.querySelector(".viewer-close").addEventListener("click",closeViewer);
  document.querySelector(".viewer-prev").addEventListener("click",()=>moveViewer(-1));
  document.querySelector(".viewer-next").addEventListener("click",()=>moveViewer(1));
  viewer.addEventListener("click",e=>{if(e.target===viewer)closeViewer()});
  document.addEventListener("keydown",e=>{
    if(!viewer.classList.contains("open"))return;
    if(e.key==="Escape")closeViewer();
    if(e.key==="ArrowLeft")moveViewer(-1);
    if(e.key==="ArrowRight")moveViewer(1);
  });
}

