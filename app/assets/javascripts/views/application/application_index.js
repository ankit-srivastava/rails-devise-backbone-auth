App.Views.AppIndex = Backbone.View.extend({

	el : ".app-content",

	template: JST['application/index'],

	events : {
		'click .sign-out-session' : 'sign_out_session',
		'click #login' : 'render_login',
		'click #signup' : 'render_signup',
		'click #retrievepassword' : 'render_retrievepassword'

	},	

	initialize: function() 
	{
	    Backbone.history.navigate('/');
	    return this.render();
	},
    render: function() 
    {
	    $(this.el).empty;
	    $(this.el).html(this.template());
	    this;

    	$.ajax('/user_info.json', {
			type: 'GET',
			dataType: 'JSON',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				if (data['logged_in'] === true) {
					console.log("ALREADY LOGGED IN");
					return new App.Views.Users(data);
					// return $('.alert-top').html('<div class="alert alert-info">you are signed in <a href="/sign_out" class="sign-out-session" style="float: right;">sign out</a></div>');
				}
				else
				{
					return new App.Views.UserSession;
				}
			},
			error: function(userSession, response) {
		        // el.find('form').prepend(BD.Helpers.Notifications.error("The email you entered did not match an email in our database."));
		        // el.find('input.btn-primary').button('reset');
		        console.log("current user call failed");
		        return new App.Views.UserSession;
	        }
    	});
    
  	},

  	AppView : function(view)
  	{
 	    
	    if (this.currentView){
			this.currentView.close();
	    }
	    this.currentView = new view;
	    // this.currentView.render();
	},

  	render_login : function() 
    {
		this.AppView(App.Views.UserSession);
    },

    render_signup : function() 
    {
    	this.AppView(App.Views.UserRegistration);
    },

    render_retrievepassword : function() 
    {
    	this.AppView(App.Views.UserPasswordRecovery);
    },

	sign_out_session: function() {
		event.preventDefault();
		return $.ajax('/users/sign_out.json', {
			type: 'GET',
			dataType: 'JSON',
			success: function(data, textStatus, jqXHR) {
				console.log("SUCCESSFULLY LOGGED OUT");
				new App.Views.AppIndex;
				return $('.alert-top').html('<div class="alert alert-warning">you are not signed in</div>');
			}
		});
	}
});			