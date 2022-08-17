/* TABLE OF CONTENT

  1. OFFER SLIDER
    1.1 Buton Handler Function
      1.1.1 See if slider is already moving to avoid skipping
      1.1.2 Checks if button clicked is previous button and dispatch custom event sliderMove

    1.2 Add/Remove Disabled Attribute Functions

    1.3 All Event Listner
      1.3.1 Determinating the button clicked event
      1.3.2 Slider movements and disabled attribute event
        1.3.2.1 Moves the slide to the right or left
        1.3.2.2 Removes disabled attribute
        1.3.2.3 Adds the diabled attribute
      1.3.3 Intersection observer for slider to add disabled attribute to the next button 
      1.3.4 Transition to end event
      1.3.5 Disabling image grag event

  2. NUMBER COUNTER
    2.1 Number Counter Up Callback Function 

    2.2 Number Counter Options 

    2.3 Number Counter Intersection Observer

    2.4 Number Counter Observer Call

  3. FADE UP
    3.1 Fade Up Callback Function 

    3.2 Fade Up Options 

    3.3 Fade Up Intersection Observer

    3.4 Fade Up Observer Call

*/

import './style.css'

// 1. OFFER SLIDER
const slideBtns = document.querySelectorAll('[data-slideBtn]');
const slideContainer = document.querySelector('[data-slideContainer]');
const slides = [...document.querySelectorAll('[data-slide]')];

let currentIndex = 0;
let isMoving = false;

// 1.1 Buton Handler Function
function handleSlideBtnClick(e){
  // 1.1.1 See if slider is already moving to avoid skipping
  if(isMoving)return;
  isMoving = true;
  // 1.1.2 Checks if button clicked is previous button and dispatch custom event sliderMove
  e.currentTarget.id === "prev"
    ? currentIndex--
    : currentIndex++;
   slideContainer.dispatchEvent(new Event("sliderMove"));
}

// 1.2 Add/Remove Disabled Attribute Functions
const removeDisabledAttribute = (els) => els.forEach(el => el.removeAttribute('disabled'));
const addDisabledAttribute = (els) => els.forEach(el => el.setAttribute('disabled','true'));

// 1.3 All Event Listner
  // 1.3.1 Determinating the button clicked event
  slideBtns.forEach(btn => btn.addEventListener('click', handleSlideBtnClick));

  // 1.3.2 Slider movements and disabled attribute event
  slideContainer.addEventListener('sliderMove',() => {
    // 1.3.2.1 Moves the slide to the right or left
    slideContainer.style.transform = `translateX(-${currentIndex*slides[0].clientWidth}px)`;
    // 1.3.2.2 Removes disabled attribute
    removeDisabledAttribute(slideBtns);
    // 1.3.2.3 Adds the diabled attribute   
    currentIndex === 0 && addDisabledAttribute([slideBtns[0]]);

  })

  // 1.3.3 Intersection observer for slider to add disabled attribute to the next button 
  const slideObserver = new IntersectionObserver((slide) => {
    if(slide[0].isIntersecting){
      addDisabledAttribute([slideBtns[1]]);
    }
  },{threshold:.75});
  slideObserver.observe(slides[slides.length-1]);

  // 1.3.4 Transition to end event
  slideContainer.addEventListener('transitionend',() => isMoving = false);

  //1.3.5 Disabling image grag event
  document.querySelectorAll('[data-slide] img').forEach(img => img.ondragstart = () => false);

// 2. NUMBER COUNTER
let dispalayValues = document.querySelectorAll(".num");
let interval = 5000;
// 2.1 Number Counter Callback Function
function counterObserverCall(elm){
  elm.forEach((el) => {
    if(el.isIntersecting){
      dispalayValues.forEach((dispalayValue) => {
        let startValue = 0;
        let endValue = parseInt(dispalayValue.getAttribute("data-val"));
        let duration = Math.floor(interval/endValue);
        let counter = setInterval(function(){
          startValue += 2;
          dispalayValue.textContent = startValue;
          if(startValue == endValue){
            clearInterval(counter);
          }
        },duration);
      });
      counterObserver.unobserve(el.target);  
    }
  })
}
// 2.2 Number Counter Options
const counterObserverOptions = {
  threshold: .9,
}
// 2.3 Number Counter Intersection Observer
const counterObserver = new IntersectionObserver (counterObserverCall, counterObserverOptions)
// 2.4 Number Counter Observer Call 
document.querySelectorAll('.end-num').forEach((item) => {
  counterObserver.observe(item);
})

// 3. FADE UP 
// 3.1 Fade Up Callback Function 
function fadeUpObserverCall(elmsToWatch){
  elmsToWatch.forEach((el) =>{
    if(el.isIntersecting){
      el.target.classList.add('faded');
      fadeUpObserver.unobserve(el.target);
      el.target.addEventListener("transitionend", () =>{
        el.target.classList.remove('fade-up','faded');
      }, { once: true })
    }
  })
}
// 3.2 Fade Up Options
const fadeUpObserverOptions = {
  threshold: .5,
}
// 3.3 Fade Up Intersection Observer
const fadeUpObserver = new IntersectionObserver (fadeUpObserverCall, fadeUpObserverOptions)
// 3.4 Fade Up Observer Call
document.querySelectorAll('.fade-up').forEach((item) => {
  fadeUpObserver.observe(item);
})
