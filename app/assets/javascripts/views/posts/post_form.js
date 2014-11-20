JournalApp.Views.PostForm = Backbone.View.extend({

  template: JST['posts/post_form'],
	
	events: {
		"click button.submit-button" : "updatePost"
	},
	
	initialize: function () {
		this.listenTo(
			this.model, 
			"sync add remove change:title reset", 
			this.render
		);
	},
	
	render: function () {
		var renderedPost = this.template({ post: this.model });
		this.$el.html(renderedPost);
		return this;
	},

	updatePost: function (event) {
		event.preventDefault();
		var attrs = $(".post-form").serializeJSON().post;
		var id = $(event.currentTarget).data("id");
		if (id) {
			this.collection.create(attrs, {
				success: (function () {
					Backbone.history.navigate("#", {trigger: true})
				}).bind(this)
			});
		} else {
			this.model.save(attrs, {
				success: (function () {
					Backbone.history.navigate("#", {trigger: true})
				}).bind(this), 
				error: (function () {
					Backbone.history.navigate("#/posts/" + this.model.get("id"), {trigger: true})
				}).bind(this)
			});
		}
	}	
});