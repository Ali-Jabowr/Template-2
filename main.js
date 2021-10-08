const leftBtn = document.querySelector(".landing .left"),
      rightBtn = document.querySelector(".landing .right"),
      landing = document.querySelector(".landing ");


//setting localStorge
let mainColor = localStorage.getItem("color_option");
let transparentColor = localStorage.getItem("transparentColor_op");

if (mainColor !== null && transparentColor !== null){
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.documentElement.style.setProperty("--transparent-color", transparentColor);

  //remove active class from all colors
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //add active class to the saved color
    if (element.dataset.color === mainColor){
      element.classList.add("active")
    }
  });

}

//create settings box
const settingBtn = document.querySelector(".settings");
const settingBox = document.querySelector(".setting-box");

settingBox.onclick = (e) => e.stopPropagation();

//open and close setting box
settingBtn.onclick = (e) => {
  e.stopPropagation()
  settingBox.classList.toggle("opened");
}
//open and close toggle menu
const toggle = document.querySelector(".toggle-menu");
toggle.onclick = (e) => {
  e.stopPropagation()
  toggle.classList.toggle("opened")
}


// set the target color as the main color and transparent color
const listColors = document.querySelectorAll(".colors-list li");
listColors.forEach((color) => {
  color.addEventListener("click", (eve) =>{
    document.documentElement.style.setProperty("--main-color", eve.target.dataset.color)
    document.documentElement.style.setProperty("--transparent-color", hexToRgbA(eve.target.dataset.color))

    //remove active class from all colors
    eve.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    //set active class on the selected colors
    eve.target.classList.add("active")

    //set the values in localStorage
    localStorage.setItem("color_option", eve.target.dataset.color)
    localStorage.setItem("transparentColor_op", hexToRgbA(eve.target.dataset.color))
  })
});

//function to convert hex color to rgba color
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
    }
    throw new Error('Bad Hex');
}
// click any where to close the settings popup and toggle menu
document.addEventListener("click", (e)=>{
  if (e.target !== settingBtn && e.target !== settingBox && e.target !== toggle){
    if (settingBox.classList.contains("opened")) {
      settingBox.classList.toggle("opened");
    }
    //check if the toggle menu is opened
    if (toggle.classList.contains("opened")){
      toggle.classList.toggle("opened")
    }
  }
})


// start making the slid images
let index = 1;
// array from the desired images
let imgsCollection = ["landing.jpg","landing-01.jpg","landing-02.jpg"];

leftBtn.onclick = prevImg;
rightBtn.onclick = nextImg;

//create the bullets
let listOfBullets = document.createElement("ul");
listOfBullets.classList.add("bullets");

for (let i=1; i<=imgsCollection.length; i++){
  let bullet = document.createElement("li");
  bullet.setAttribute("data-set", i);

  listOfBullets.append(bullet);
}
landing.append(listOfBullets);

let theList = document.querySelector(".bullets");
let bullets = Array.from(document.querySelectorAll(".bullets li"));

check()
function prevImg(){
  index--
  check()
}

function nextImg(){
  index++
  check()
}

//checker function to check if the index greater than the length of the photos or if its the first photo
function check(){
  clearActive()
  if (index > imgsCollection.length){
    index = 1;
    // return false;
  }
  if (index < 1) {
    index = imgsCollection.length;
  }
  landing.style.backgroundImage = `url("images/${imgsCollection[index - 1]}")`;
  bullets[index - 1].classList.add("active");
}

//clear active class function
function clearActive(){
  bullets.forEach(bullet => bullet.classList.remove("active"));
}
//create setinterval function to automatic change the photos
setInterval(function(){
  check();
  index++
},10000)
// end of img slider

//start making photo popup
const imgsContainer = document.querySelector(".imgs-container")
const portfolio = document.querySelectorAll(".imgs-container .box");

portfolio.forEach((box) => {
  box.addEventListener("click", function(e){
    //create overlay layer
    const overlay = document.createElement("div");
    overlay.classList.add("img-overlay");
    overlay.classList.add("open");

    //create div for the selected img
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgs-div");

    // console.log(box.firstElementChild.src);
    const popupImg = document.createElement("img");
    popupImg.src = box.firstElementChild.src
    imgDiv.append(popupImg);
    overlay.append(imgDiv);

    //create close button for img
    const closeSpan = document.createElement("span");
    closeSpan.classList.add("close-img")
    const closeBtn = document.createTextNode("X");
    closeSpan.append(closeBtn);
    imgDiv.append(closeSpan);

    //remove overlay when clicking on the close button
    closeSpan.onclick = () => {
      overlay.remove()
    }
    imgsContainer.append(overlay);
  })
});
//end popup img

//start skill animating
const mySkill = document.querySelector(".skills-content");

window.onscroll = function(){
  const skillsOffsetTop = mySkill.offsetTop,
        skillsOuterHeight = mySkill.offsetHeight,
        windowHeight = this.innerHeight,
        windowScrollTop = this.pageYOffset;

  if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    const allSkills = document.querySelectorAll(".skills .container .skills-content .progress .prog-bar span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });

  }
}
//end skills animating

//start pricing plnas
const buyBtn = document.querySelectorAll("[name = button]");

buyBtn.forEach(btn => {
  btn.addEventListener("click", function(e){
    let btnOverlay = document.createElement("div");
    btnOverlay.classList.add("btn-overlay");

    let successDv = document.createElement("div");
    successDv.classList.add("successDv");

    let successTxth3 = document.createElement("h3");
    let successTxt = document.createTextNode("Success");
    successTxth3.append(successTxt);
    successDv.append(successTxth3);

    let successImg = document.createElement("img");
    successImg.src = "images/check.svg";
    successDv.append(successImg);

    let closeSpan = document.createElement("span");
    closeSpan.classList.add("close-span")
    let closeSpanTxt = document.createTextNode("Close");
    closeSpan.append(closeSpanTxt);
    successDv.append(closeSpan);

    btnOverlay.append(successDv);
    btn.parentElement.append(btnOverlay);

    closeSpan.onclick = function(){
      btnOverlay.remove()
    }
  })
})
//end pricing plnas

//make the header in fixed postion;
const body = document.querySelector("body");
const header = document.querySelector("header");
body.style.paddingTop = header.offsetHeight + 20;

//smoothly scrooling to the selected sections using jquery
$(function(){
  'use strict';
  //smoothly scrol to element
  $("header nav .links li a").click(function(e){
    e.preventDefault();
    $('html, body').animate({

      // "+1" here is for letting us enter the area of the section to let the below function work proparly
      scrollTop: $('#' + $(this).data('scroll')).offset().top + 1
    }, 1000)
  })
})

// sync sections with the navigation bar

// get all main sectoins
const sections = Array.from(document.querySelector("body").children);
//get all the anchor of the header
const nav = document.querySelectorAll("header nav .links li a");

//function to make the sync
window.onscroll = function(){
  sections.slice(1).forEach((section) => {
    //check if we get into the area of the section
    if(window.pageYOffset > section.offsetTop){
      //check if the section has id
      if (section.getAttribute('id')){
        let sectionID = section.getAttribute('id');
        //get the relevant anchor tag with id
        let navBar = document.querySelector(`header .links li a[data-scroll=${sectionID}]`);

        //remove active class from all sibilings and add it to the choosen one.
        nav.forEach(item => item.classList.remove("active"))
        navBar.classList.add("active");
      }
    }
  });
}

const scrollBtn = document.querySelector(".scroll-top")
// scroll to top button functionality
window.onscroll = function(){
  if (window.pageYOffset > 1000){
    scrollBtn.style.display = 'block'
  } else {
    scrollBtn.style.display = 'none'
  }
}

scrollBtn.onclick = function(){
  window.scrollTop = 0;
}
