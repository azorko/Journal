JournalApp.Routers.Posts = Backbone.Router.extend({
	
	initialize: function (options) {
		this.$el = options.$el;
	},
	
	routes: {
		"": "postIndex",
		"posts/new": "postNew",
		"posts/:id": "postShow",
	},
	
	postIndex: function () {
		var newView = new JournalApp.Views.PostsIndex({ 
			collection: JournalApp.posts 
		});
		JournalApp.posts.fetch();
		
		this._swapView(newView);
	},
	
	postShow: function (id) {
		var newView = new JournalApp.Views.PostShow({
			model: JournalApp.posts.getOrFetch(id)
		});
	this._swapView(newView);
	this.postForm(id);
	},
	
	postForm: function (id) {
		var newView = new JournalApp.Views.PostForm({
			model: JournalApp.posts.getOrFetch(id)
		});
		this.$el.append(newView.render().$el);
	},
	
	postNew: function () {
		var newView = new JournalApp.Views.PostForm({
			model: new JournalApp.Models.Post(),
			collection: JournalApp.posts
		});
		this._swapView(newView);
	},
	
	_swapView: function (newView) {
	  this._currentView && this._currentView.remove();
	  this._currentView = newView;
	  this.$el.html(newView.render().$el);
	}
	
});

$(function () {
	var $div = $(".posts");
	var postRouter = new JournalApp.Routers.Posts({$el: $div});
	Backbone.history.start();
});