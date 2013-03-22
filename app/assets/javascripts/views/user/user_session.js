App.Views.UserSession = Backbone.View.extend({		
	
	el : "#tab-content",

	template: JST['user/user_session'],

	events : {
		'submit #signin-form' : 'login',
		'click .cancel-login' : 'cancel'
	},	

	initialize : function() {
		console.log("SESSION VIEW INIT");
		this.modelBinder = new Backbone.ModelBinder;
	    this.model = new App.Models.UserSession;
	    return this.render();
  	},

	render : function() {
	    var bindings = {};
	    $(this.el).empty;
	    $(this.el).html(this.template());
	    this;

	    bindings = {
	        email: '#email',
	        password: '#password'
	    };
	    return this.modelBinder.bind(this.model, this.el, bindings);
  	},

  	onRender: function() {
	    // this.modelBinder.bind(this.model, this.el);
    },

  	login: function() {
		event.preventDefault();
   		return this.model.save(this.model.attributes, 
   		{
      		success: function(userSession, response) 
      		{
		        var currentUser;
		        console.log(response);
		        currentUser = new App.Models.User();
		        new App.Views.Users;
		        return $('.alert-top').html('<div class="alert alert-info">you are signed in <a href="/sign_out" class="sign-out-session" style="float: right;">sign out</a></div>');
	        },
      		error: function(xhr, userSession, response) {
		        var result;
		        return $('.alert-top').html('<div class="alert alert-warning">Incorrect Username/Password</div>');
		        // return result = $.parseJSON(response.responseText);
	        }
    	});
	},

	cancel: function() {
		return event.preventDefault();
	},

	close: function() { 
		console.log("SESSION VIEW CLOSED");
		// this.remove();
	 //    this.unbind();
	 //    this.model.unbind();
	 //    this.modelBinder.unbind();  
	 //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();

    this.$el.removeData().unbind(); 

    //Remove view from DOM
    // this.remove();  
    // Backbone.View.prototype.remove.call(this);

	}


});	