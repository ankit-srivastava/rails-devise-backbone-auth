App.Views.RoleSelect = Backbone.View.extend({		
	
	el : "#authed_container",

	template: JST['authenticated/role_select'],

	events : {
		'click .select_role' : 'send_role'
	},	

	initialize : function() {
		this.modelBinder = new Backbone.ModelBinder;
	    this.model = new App.Models.RoleSelect;
	    return this.render();
  	},

	render : function() {
	    $(this.el).empty;
	    $(this.el).html(this.template());
	    this;
  	},

  	send_role: function(e) {
		event.preventDefault();
		// console.log(e.currentTarget.id);
   		return this.model.save({role : e.currentTarget.id}, 
   		{
      		success: function(userSession, response) 
      		{
		        // var currentUser;
		        // console.log(response);
		        // currentUser = new App.Models.User();
		        // new App.Views.Users;
		        // return $('.alert-top').html('<div class="alert alert-info">you are signed in <a href="/sign_out" class="sign-out-session" style="float: right;">sign out</a></div>');
	        },
      		error: function(xhr, userSession, response) {
		        // var result;
		        // return $('.alert-top').html('<div class="alert alert-warning">Incorrect Username/Password</div>');
		        // // return result = $.parseJSON(response.responseText);
	        }
    	});
	},

	cancel: function() {
		return event.preventDefault();
	},

	close: function() { 
		this.undelegateEvents();
	    this.$el.removeData().unbind(); 
	}
});	