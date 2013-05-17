var content = document.getElementById('content');

// Create the blogger service object
var bloggerService = new google.gdata.blogger.BloggerService('com.appspot.interactivesampler');
var feedUri = 'http://www.blogger.com/feeds/2247976120610883009/posts/default';

// A callback method invoked getBlogPostFeed() returns data
var handleBlogPostFeed = function(postsFeedRoot) {
  var posts = postsFeedRoot.feed.getEntries();
  
  // This variable will buffer HTML output until function completes
  var html = '';
  
  // Display blog's title
  html += '<dl>'
	   + '<dt><strong>Blog Name:</strong> '
	   + '<a href="'
	   + postsFeedRoot.feed.getLink('alternate').getHref()
	   + '">'
	   + postsFeedRoot.feed.getTitle().getText()
	   + '</a></dt>';
  
  // Display blog posts
  html += '<dd><ul>';
  for (var i = 0, post; post = posts[i]; i++) {
	var postTitle = post.getTitle().getText();
	var postURL = post.getHtmlLink().getHref();
	html += '<li><a href="' + postURL + '" target="_blank">'
			  + postTitle
			  + '</a></li>';
  }
  html += '</ul></dd>';
  
  // Write out buffered HTML, and clear the "Loading..." message
  content.innerHTML = html;
};

var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
};

bloggerService.getBlogPostFeed(feedUri, handleBlogPostFeed, handleError);