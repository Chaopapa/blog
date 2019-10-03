$(function() {
  var navList = $(".c-header-nav").children();
  //页面载入通过session中的值确定头部哪个导航应该添加样式
  var index = sessionStorage.getItem("index");
  index ? navList.eq(index).addClass("current_page") : navList.eq(0).addClass("current_page");
  console.log(navList.eq(0));
  navList.click(function() {
    navList.removeClass("current_page");
    $(this).addClass("current_page");
    var listIndex = $(this).attr("data-index");
    //记录下标
    sessionStorage.setItem("index", listIndex);
  });
});
