JournalApp.Views.PostsIndex = Backbone.View.extend({

  template: JST['posts/index'],
	
	events: {
		"click button.delete-button" : "deletePost"
	},
	
	initialize: function () {
		this.listenTo(
			this.collection, 
			"sync add remove change:title reset", 
			this.render
		);
	},
	
	render: function () {
		var renderedPosts = this.template({ posts: this.collection });
		this.$el.html(renderedPosts);
		return this;
	},

	deletePost: function (event) {
		var postId = $(event.currentTarget).data("id");
		this.collection.get(postId).destroy();
	}
});


//
// $(function () {
// 	var postIndView = new JournalApp.Views.PostsIndex({
// 		collection: JournalApp.posts
// 	});
// 	postIndView.render();
// 	postIndView.collection.fetch();
// 	$("body").append(postIndView.$el);
// });