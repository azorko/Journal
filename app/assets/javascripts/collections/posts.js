JournalApp.Collections.Posts = Backbone.Collection.extend({
  model: JournalApp.Models.Post,
  url: "/posts",
	
  getOrFetch: function (id) {
    var posts = this;

    var post;
    if (!(post = this.get(id))) {
      post = new JournalApp.Models.Post({ id: id });
      post.fetch({
				success: function () { posts.add(post); }
     	});
		 }

     return post;
  	}
});

JournalApp.posts = new JournalApp.Collections.Posts();