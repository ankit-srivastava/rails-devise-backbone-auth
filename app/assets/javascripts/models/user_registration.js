App.Models.UserRegistration = Backbone.Model.extend({
  url: '/users.json',
  paramRoot: 'user',

  defaults: {
    "email": "",
    "name": "",
    "password": "",
    "password_confirmation": ""
  }
});