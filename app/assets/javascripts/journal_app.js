window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		$sidebar = $('.sidebar');
		
		var $div = $(".posts");
		var postRouter = new JournalApp.Routers.Posts({
			$el: $div,
			$sidebar: $sidebar
		});
		Backbone.history.start();
		
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
