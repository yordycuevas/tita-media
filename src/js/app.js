
import { CONST } from './const.js'

document.addEventListener("DOMContentLoaded", () => {

  // Init in the first page
  let page = 1;
  const menuClick= () =>{
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  document.getElementById("nav-btn").addEventListener("click", menuClick);
  // Gets data from API
  const getImages = (page) => {
    fetch(`https://api.unsplash.com/photos/?page=${page}&client_id=${CONST.UNSPLASH_KEY}`)
    .then(response => response.json())
    .then(data => showimages(data));
  }

  // Renders images into the DOM
  const showimages = (images) => {
    images.forEach(image => {
      const div = document.createElement('div');
      const img = document.createElement('img');
      div.setAttribute("class", "grid-item");
      img.src = image.urls.regular;
      div.appendChild(img)

      document.getElementById('portfolio').appendChild(div);
    });
  }

  // Listens click over the show more button
  const listenerShowMore = () => {
    document.getElementById("show-more").addEventListener("click", () => {
      getImages(++page);
    });
  }

  // Init app
  const init = () => {
    getImages(page);
    listenerShowMore();
  }

  init();
});