App.Views.UserRegistration = Backbone.View.extend({		
	
  el : "#tab-content",

  template: JST['user/user_registration'],

  events: {
    'submit #signup-form': 'signup'
  },

  initialize: function() {
    this.modelBinder = new Backbone.ModelBinder;
    this.model = new App.Models.UserRegistration;
    return this.render();
  },

  render: function() 
  {
    var bindings = {};
    $(this.el).empty;
    $(this.el).html(this.template());
    this;

    bindings = {
        email: '#email',
        name: '#name',
        password: '#password',
        password_confirmation: '#password_confirmation'
    };
    return this.modelBinder.bind(this.model, this.el, bindings);
  },

  onRender: function() {
    // this.modelBinder.bind(this.model, this.el);
  },

  signup: function(e) {

    var self = this,
    el = $(this.el);

    e.preventDefault();

    el.find('input.btn-primary').button('loading');
    el.find('.alert-error').remove();
    el.find('.help-block').remove();
    el.find('.control-group.error').removeClass('error');

    this.model.save(this.model.attributes, {
      success: function(userSession, response) {
        el.find('input.btn-primary').button('reset');
        App.currentUser = new App.Models.User(response);
        // BD.vent.trigger("authentication:logged_in");
        return new App.Views.Users;
        // console.log("registration successful");
        // return $('.alert-top').html('<div class="alert alert-info">you are signed in <a href="/sign_out" class="sign-out-session" style="float: right;">sign out</a></div>');
      },
      error: function(userSession, response) {
        // var result = $.parseJSON(response.responseText);
        // el.find('form').prepend(BD.Helpers.Notifications.error("Unable to complete signup."));
        // _(result.errors).each(function(errors,field) {
        //   $('#'+field+'_group').addClass('error');
        //   _(errors).each(function(error, i) {
        //     $('#'+field+'_group .controls').append(BD.Helpers.FormHelpers.fieldHelp(error));
        //   });
        // });
        // el.find('input.btn-primary').button('reset');
        console.log("error in registration");
      }
    });
  },

  close: function() { 
    console.log("closed called");
    // this.remove();
    // this.unbind();
    // this.model.unbind();
    // this.modelBinder.unbind(); 
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();

    this.$el.removeData().unbind(); 

    //Remove view from DOM
    // this.remove();  
    // Backbone.View.prototype.remove.call(this);

  }

});