App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    new App.Routers.AppRouter;
    return Backbone.history.start({
      pushState: true
    });
  }
};

$(document).ready(function() {
  if (window.location.hash == "#_=_") {
    window.location.hash = "";   }
  return App.init();
});
