var navList = $(".c-header-nav").children();
console.log(1);
navList.click(function() {
  navList.removeClass("current_page");
  $(this).addClass("current_page");
});
