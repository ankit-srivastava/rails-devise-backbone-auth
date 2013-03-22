App.Routers.AppRouter = Backbone.Router.extend({

	routes: {
		'' : 'index'
	},

	index: function(){
		return new App.Views.AppIndex;
	}
}); 