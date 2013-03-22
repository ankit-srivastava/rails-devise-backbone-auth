App.Views.UserPasswordRecovery = Backbone.View.extend({   
  
  el : "#tab-content",
  
  template: JST['user/retrieve_password'],

  events: {
    'submit #retrieve-password-form': 'retrievePassword'
  },

  initialize: function() {
    
    this.model = new App.Models.UserPasswordRecovery();
    this.modelBinder = new Backbone.ModelBinder();
    return this.render();
  },

  render: function() 
  {
    $(this.el).empty;
    $(this.el).html(this.template());
    this;

  },

  onRender: function() {
    this.modelBinder.bind(this.model, this.el);
  },

  retrievePassword: function(e) {
    var self = this,
        el = $(this.el);

    e.preventDefault();

    el.find('input.btn-primary').button('loading');
    el.find('.alert-error').remove();
    el.find('.alert-success').remove();

    this.model.save(this.model.attributes, {
      success: function(userSession, response) {
        // el.find('form').prepend(BD.Helpers.Notifications.success("Instructions for resetting your password have been sent. Please check your email for further instructions."));
        // el.find('input.btn-primary').button('reset');
        console.log("password recovery success");
      },
      error: function(userSession, response) {
        // el.find('form').prepend(BD.Helpers.Notifications.error("The email you entered did not match an email in our database."));
        // el.find('input.btn-primary').button('reset');
        console.log("password recovery failed");
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
