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
			this.model.save(attrs, {
				success: (function () {
					$('.errors').empty();
					Backbone.history.navigate("#/posts/" + id, {trigger: true})
				}).bind(this),
				
				error: (function (model, response) {
					var resp = JSON.parse(response.responseText);
					var str = "";
					if(resp.body) 
						str += "Body " + resp.body;
					if(resp.title)
						str += " <br>Title " + resp.title;
					$('.errors').html(str);
				}).bind(this)
			});
		} else {
			var newModel = new JournalApp.Models.Post();
			var that = this;
			newModel.save(attrs, {
				success: (function () {
					this.collection.add(newModel);
					$('.errors').empty();
					Backbone.history.navigate("#/posts/" + newModel.get('id'), {trigger: true});
				}).bind(this), 
				error: (function (model, response) {
					var resp = JSON.parse(response.responseText);
					var str = "";
					if(resp.body) 
						str += "Body " + resp.body;
					if(resp.title)
						str += " <br>Title " + resp.title;
					$('.errors').html(str);
				}).bind(this)
			});
		}
	}	
});