$(function() {
  require.config({
    baseUrl: "../static/script",
    paths: {
      moduleLoader: "public"
    }
  });

  require(["moduleLoader"], function(loader) {
    loader.loadPublicModule(".header", "../view/header.html");
  });

  require(["moduleLoader"], function(loader) {
    loader.loadPublicModule(".bottom", "../view/bottom.html");
  });
});
