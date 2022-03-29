//============================================= Start User Defined Function =====================================
//Handel Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //Add Active Class To The Target
  ev.target.classList.add("active");
}
//============================================= Start User Defined Function =====================================
//============================================= Start Landing Section ===========================================
//---------------------------------------- Start Color Section-----------------------------
//Check If There's Local Color Option
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  //Remove Active Class From All Children
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //Add Active Class On Element With Data-color === Local Storge Item
    if (element.dataset.color === mainColor) {
      //Add Active Class
      element.classList.add("active");
    }
  });
}
//----------------------------------------End Color Section-------------------------------
//============================================== Start Setting Box================================================
//----------------------------------------Start Spin Icon---------------------------------
//Toggle Spin Class On Icon
document.querySelector(".set-icon .fa-gear").onclick = function () {
  //Toggle Class Fa-spin For Rotation On Self
  this.classList.toggle("fa-spin");
  //Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};
//----------------------------------------End Spin Icon-----------------------------------
//---------------------------------------- Start Color Section-----------------------------
//Switch Color
const colorLi = document.querySelectorAll(".colors-list li");
//Loop On All List Items
colorLi.forEach((li) => {
  //Click On Every List Items
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //Set Color On Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
    //Remove Active Class From All Children
    handleActive(e);
  });
});
//----------------------------------------End Color Section-------------------------------
//---------------------------------------- Start Background Section-----------------------
//Random Background Option
let backgroundOption = true;
//Variable To Control The Background Interval
let backgroundInterval;
//check If There's Local Storage Random Background Items
let backgrounLocalItem = localStorage.getItem("background-option");
//Check If Random Background Local Storage Is Not Empty
if (backgrounLocalItem !== null) {
  if (backgrounLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
}
//Remove Active Class From All Spans
document.querySelectorAll(".randome-background span").forEach((element) => {
  element.classList.remove("active");
});
if (backgrounLocalItem === "true") {
  document.querySelector(".randome-background .yes").classList.add("active");
} else {
  document.querySelector(".randome-background .no").classList.add("active");
}
//Switch Backgrounds
const randomBckElment = document.querySelectorAll(".randome-background span");
//Loop On All Spans
randomBckElment.forEach((span) => {
  //Click On Every Spans
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBackgrounds();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
//---------------------------------------- End Background Section-------------------------
//---------------------------------------- Start Bullet Section---------------------------
// Switch Bullets
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullet-option");
if (bulletLocalStorage !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }
    handleActive(e);
  });
});
//---------------------------------------- End Bullet Section-----------------------------
//---------------------------------------- Start Reset Button-----------------------------
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");
  window.location.reload();
};
//---------------------------------------- End Reset Button-------------------------------
//============================================== End Setting Box==================================================
//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
//Get Array Of Images
let imageArray = [
  "bck-ground.jpg",
  "lay1.jpg",
  "lay2.jpg",
  "lay3.jpg",
  "lay4.jpg",
];
//Function To Randomize Background
function randomizeBackgrounds() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imageArray.length);
      //Change Background Image Url
      landingPage.style.backgroundImage =
        "url('image/" + imageArray[randomNumber] + "')";
    }, 1000);
  }
}
randomizeBackgrounds();
//============================================= End Landing Section ================================================
//============================================= Start Our Skills Section ===========================================
//Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //Window Height
  let windowHeight = this.innerHeight;

  //Window Scroll Top
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//============================================= End Our Skills Section =============================================
//============================================= Start Gallery Section ==============================================
//Create Popup With Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element
    let overlay = document.createElement("div");
    //Add Class To Overlay
    overlay.className = "popup-overlay";
    //Append Overlay To The Body
    document.body.appendChild(overlay);
    //Create The Popup Box
    let popupBox = document.createElement("div");
    //Add Class To The Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      //Create Heading
      let imgHeading = document.createElement("h3");
      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      //Append The Text To The Heading
      imgHeading.appendChild(imgText);
      //Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }
    //Create The Image
    let popupImage = document.createElement("img");
    //Set Image Source
    popupImage.src = img.src;
    //Add Image To Popup Box
    popupBox.appendChild(popupImage);
    //Append The Popup Box To Body
    document.body.appendChild(popupBox);
    //Create The Close Span
    let closeButton = document.createElement("span");
    //Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    //Add Class To Close Button
    closeButton.className = "close-button";
    //Append Close Button To Popup Box
    popupBox.appendChild(closeButton);
  });
});
//Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //Remove The Current Popup
    e.target.parentNode.remove();
    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});
//============================================= End Gallery Section ================================================
//============================================= Start Nav Bullets ==================================================
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToX(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToX(allBullets);
scrollToX(allLinks);
//============================================= End Nav Bullets ====================================================
//============================================= Start Toogle Menu ==================================================
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
};
//============================================= End Toogle Menu ====================================================
