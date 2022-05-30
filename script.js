let searchPeram=location.search.split('=').pop();
const accessKey = "6XUEJhNw9iyCQGHjX1elo5NSk0kpCqhA8DS25PnrJ5Y";
const rendomImg = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const searchImg = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchPeram}&per_page=50`;

const galleryImg = document.querySelector(".gallery");
let allImages;
let currentImage=0;

const getData = () => {
  fetch(rendomImg)
    .then((ress) => ress.json())
    .then((data) => {
      allImages = data;
      makeImg(allImages);
    });
};
const searchData = () => {
  fetch(searchImg)
    .then((ress) => ress.json())
    .then((data) => {
      allImages = data.results;
      console.log(data.results)
      makeImg(allImages);
    });
};

const makeImg = (data) => {
  
  data.forEach((item,index) => {
    let image = document.createElement("img");
    image.src = item.urls.regular;
    image.className = "gallery-img";

    galleryImg.appendChild(image);

    // popup functon
    image.addEventListener('click',()=>{
      currentImage=index;
     showPopUp(item)
    })
  });

};

// Show PopUp 
const showPopUp=(item)=>{
  // main popup 
  let popUp=document.querySelector('.image-popup');
  let largeImg=document.querySelector('.large-image');
  let closeBtn=document.querySelector('.close-btn');
  let downloadBtn=document.querySelector('.download-btn');

  popUp.classList.remove('hide');
  largeImg.src=item.urls.regular;
  downloadBtn.href=item.links.download;


// popup Topbar
  let userId=document.querySelector('.userId');
  let userName=document.querySelector('.userName');
  let userImg=document.querySelector('.userImg');

  userName.innerText=item.user.name;
  userId.innerText='@'+item.user.username;
  userImg.src=item.user.profile_image.small;


  // poopup footer
  let imageLike=document.querySelector('.imageLike');
  let imageDownload=document.querySelector('.imageDownload');
  let imageStock=document.querySelector('.stockImg');

  imageLike.innerHTML=item.user.total_collections;
  imageDownload.innerHTML=item.user.total_likes;
  imageStock.innerHTML=item.user.total_photos;

  //  closing Popup
  closeBtn.addEventListener('click',()=>{
    popUp.classList.add('hide');
  })
 
}

// Slide Popup
const prevBtn=document.querySelector('.prev-btn');
const nxtBtn=document.querySelector('.nxt-btn');

prevBtn.addEventListener('click', () => {
  if(currentImage > 0){
      currentImage--;
      showPopUp(allImages[currentImage]);
  }
})

nxtBtn.addEventListener('click', () => {
  if(currentImage < allImages.length - 1){
      currentImage++;
      showPopUp(allImages[currentImage]);
  }
  })
  if(searchPeram==''){
    getData()
  }else{
    searchData()
  }