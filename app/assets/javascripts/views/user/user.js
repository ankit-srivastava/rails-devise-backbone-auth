App.Views.Users = Backbone.View.extend({

	el : ".app-content",

	template: JST['authenticated/welcome'],

	events : {
	},	

	initialize: function() 
	{
	    // Backbone.history.navigate('/');
	    this.modelBinder = new Backbone.ModelBinder;
	    this.model = new App.Models.User;
	   
	    var self = this;
		this.model.fetch().complete(function(){
		  self.render();
		});
	    this.model.bind('change', this.render, this);
	    // return this.render();
	},
    render: function() 
    {
	    $(this.el).empty;
	    if (this.model.get('logged_in') === true) {
	    	$(this.el).html(this.template(this.model.toJSON()));
	    	$('.dropdown-toggle').dropdown();
	    	// this;
	    	if(this.model.get('role') == ""){
	    		return new App.Views.RoleSelect;
	    	}
			
		}
		else
		{
			return new App.Views.UserSession;
		}

	    

   
  	},
});			