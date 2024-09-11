var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides01");
  var slides2 = document.getElementsByClassName("mySlides02");
  var slides3 = document.getElementsByClassName("mySlides03");
  var slides4 = document.getElementsByClassName("mySlides04");
  var slides5 = document.getElementsByClassName("mySlides05");
  var slides6 = document.getElementsByClassName("mySlides06");
  var slides7 = document.getElementsByClassName("mySlides07");
  var slides8 = document.getElementsByClassName("mySlides08");
  var slides9 = document.getElementsByClassName("mySlides09");
  var slides10 = document.getElementsByClassName("mySlides10");
  var slides11 = document.getElementsByClassName("mySlides11");
  var slides12 = document.getElementsByClassName("mySlides12");
  var slides13 = document.getElementsByClassName("mySlides13");
  var slides14 = document.getElementsByClassName("mySlides14");
  var slides15 = document.getElementsByClassName("mySlides15");
  var slides16 = document.getElementsByClassName("mySlides16");
  var slides17 = document.getElementsByClassName("mySlides17");
  var slides18 = document.getElementsByClassName("mySlides18");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides2[i].style.display = "none";
    slides3[i].style.display = "none";
    slides4[i].style.display = "none";
    slides5[i].style.display = "none";
    slides6[i].style.display = "none";
    slides7[i].style.display = "none";
    slides8[i].style.display = "none";
    slides9[i].style.display = "none";
    slides10[i].style.display = "none";
    slides11[i].style.display = "none";
    slides12[i].style.display = "none";
    slides13[i].style.display = "none";
    slides14[i].style.display = "none";
    slides15[i].style.display = "none";
    slides16[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  slides2[slideIndex-1].style.display = "block";
  slides3[slideIndex-1].style.display = "block";
  slides4[slideIndex-1].style.display = "block";
  slides5[slideIndex-1].style.display = "block";
  slides6[slideIndex-1].style.display = "block";
  slides7[slideIndex-1].style.display = "block";
  slides8[slideIndex-1].style.display = "block";
  slides9[slideIndex-1].style.display = "block";
  slides10[slideIndex-1].style.display = "block";
  slides11[slideIndex-1].style.display = "block";
  slides12[slideIndex-1].style.display = "block";
  slides13[slideIndex-1].style.display = "block";
  slides14[slideIndex-1].style.display = "block";
  slides15[slideIndex-1].style.display = "block";
  slides16[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}