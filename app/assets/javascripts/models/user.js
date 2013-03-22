App.Models.User = Backbone.Model.extend({
  url: '/user_info.json',
  paramRoot: 'user',

  defaults: {
    "email": "test email",
    "username" : "test name"
  },


});