document.addEventListener("DOMContentLoaded", function(){
  var imgs = document.querySelectorAll("section.landing-section.parallax");
  console.log(imgs);
  document.addEventListener("scroll", function(){
    console.log(window.scrollY);
    for(var i = 0;i < imgs.length;i ++){
      var img = imgs[i];
      img.style.backgroundPosition = "center " + (window.scrollY / 4) + "px";
    }
  });
});
