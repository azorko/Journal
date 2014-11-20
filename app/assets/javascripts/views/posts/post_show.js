JournalApp.Views.PostShow = Backbone.View.extend({

  template: JST['posts/show'],
	
	// events: {
	// 	"click button.delete-button" : "deletePost"
	// },
	
	initialize: function () {
		this.listenTo(this.model, "sync add remove change:title reset", this.render.bind(this));
	},
	
	render: function () {
		var renderedPost = this.template({ post: this.model });
		this.$el.html(renderedPost);
		return this;
	},

	// deletePost: function (event) {
	// 	var postId = $(event.currentTarget).data("id");
	// 	this.collection.get(postId).destroy();
	// }
	
});


// $(function () {
// 	var postShowView = new JournalApp.Views.PostShow({
// 		model: new JournalApp.Models.Post()
// 	});
// 	postShowView.render();
// 	postShowView.model.fetch();
// 	$("body").append(postShowView.$el);
// });