$(document).ready(function() {     
	
	//Animations Timing
	setTimeout(function() { $(".logo").addClass("fadeIn")}, 100);

	setTimeout(function() { $(".search").addClass("slideLeft")}, 200);
	setTimeout(function() { $(".main-menu").addClass("slideRight")}, 200);

	setTimeout(function() { $(".row-button").addClass("slideUp")}, 500);

	setTimeout(function() { $(".row-down").addClass("slideDown")}, 600);
	setTimeout(function() { $(".item-post").addClass("fadeInBox")}, 600);
	setTimeout(function() { $(".row-comments").addClass("fadeInBox")}, 600);
	setTimeout(function() { $(".row-other-posts").addClass("fadeInBox")}, 600);
	setTimeout(function() { $(".header-article").addClass("slideUp")}, 600);
	setTimeout(function() { $(".article-content").addClass("slideUp")}, 600);

	setTimeout(function() { $(".testemonials").addClass("fadeInBox")}, 700);
	setTimeout(function() { $(".footer").addClass("slideUp")}, 700);
	setTimeout(function() { $(".row-more-posts").addClass("slideUp")}, 700);


	//Hoverbla Classes
	$(".button-post").hover(function() {
		$(this).toggleClass("button-thunder");
	});

	$(".input-search").hover(function () {
	  $(".icon-search-white").toggleClass("icon-search-hover");
	});

	$(".input-search").on('focus blur', function(){
    	$(".icon-search-white").toggleClass("icon-search-focus");
    	$(".icon-search").toggleClass("hide-bg");
	});

	$(".button-top").hover(function() {
		$(".button-top img").toggleClass("floating");
	});
});

var JsRocks = function() {
	'use strict';

	/**
	*
	* DEFINE
	*
	**/
	var	HARMONIC = new Harmonic(),
			   W = window,
			   D = document,
		HOSTNAME = W.location.hostname,
		PATHNAME = W.location.pathname,
		  ORIGIN = W.location.origin,
		  PAGE   = D.querySelectorAll('body')[0].getAttribute('data-page'),
	INFORMATIONS = {},
		TEMPLATE = {},
		 JSROCKS = {},
		 PRIVATE = {},
		  PUBLIC = this,
	harmonicInfo = {};


	/**
	*
	* GET INFORMATIONS
	*
	**/
	INFORMATIONS.lang = function () {
		var re = /\/pt-br\//.exec(PATHNAME),
			lang;

		if (re && re[0] === '/pt-br/') {
			lang = 'pt-br';
		} else {
			lang = 'en';
		}

		return lang;
	};

	INFORMATIONS.categoryPath = function (lang) {
		var pathCategory;

		switch (lang) {
			case 'pt-br':
				pathCategory  = '/categories/pt-br/';
				break;
			default:
				pathCategory  = '/categories/';
				break;			
		}

		return pathCategory;
	};


	/**
	*
	* TEMPLATE
	*
	**/
	TEMPLATE.article = function (postLink, date, origin, title, content, category, authorPicture, authorLink, authorName) {
		var tpl = '';

		tpl += '<article class="col-md-4 col-sm-6 col-xs-12 post-normal item-post post-fade-6">';
		tpl += '<div class="container-post">';
		tpl +=     '<aside class="share-post">';
		tpl +=         '<a href="#" data-provider="https://www.facebook.com/sharer.php?u=" data-post-url="/' + postLink + '" class="share-face share-item" title="Share this post"><img src="/images/icon-face-header.png" alt="icon facebook"></a>';
		tpl +=         '<a href="#" data-provider="https://twitter.com/intent/tweet?url=" data-post-url="/' + postLink + '" class="share-twitter share-item" title="Tweet this post"><img src="/images/icon-twitter-header.png" alt="icon twitter"></a>';
		tpl +=     '</aside>';
		tpl +=     '<div class="date-post">' + date + '</div>';
		tpl +=     '<h1 class="title-post"><a href="'+ origin + '/' + postLink + '">' + title + '</a></h1>';
		tpl +=     '<p class="intro-post">' + content + '</p>';
		tpl +=     '<section class="footer-post">';
		tpl +=         '<ul class="tags-post">' + category + '</ul>';
		tpl +=         '<div class="author-post">';
		tpl +=             '<div class="avatar-author"><img src="' + authorPicture + '" alt="avatar post"></div>';
		tpl +=             '<div class="info-author">';
		tpl +=                 '<span>Posted by</span>';
		tpl +=                 '<a href="' + authorLink + '" class="author">' + authorName + '</a>';
		tpl +=             '</div>';
		tpl +=         '</div>';
		tpl +=     '</section>';
		tpl += '</div>';
		tpl += '</article>';

		return tpl;
	};

	
	/**
	*
	* PRIVATE
	*
	**/
	PRIVATE.googleSearch = function () {
		var form = D.getElementById('s');

		if (form) {
			form.addEventListener('submit', function(e) {
			    form.q.value = form.q.value + ' site:' + HOSTNAME.replace(/www./g, '');
			});			
		}
	};

	PRIVATE.disqus = function (id) {
	   if (document.getElementById(id)) {
	        var disqus_shortname = 'es6rocks';

	        (function() {
	            var dsq = document.createElement('script');

	            dsq.type = 'text/javascript';
	            dsq.async = true;
	            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

	            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	        })();
	    }
	};

	PRIVATE.shareSocialnetwork = function () {
		var btns = D.querySelectorAll('.share-item'),
		    btnLen,
		    btn;

		if (btns) {
			btnLen = btns.length;
			
			for (var i = 0; i < btnLen; i++) {
			    btn = btns[i];
			    btn.setAttribute('href', btn.getAttribute('data-provider') + window.location.host + btn.getAttribute('data-post-url'));
			}
		}
	};

	PRIVATE.otherPosts = function () {
		var postsContainer = D.getElementById('otherPosts'),
			article = '',
			articleCat,
			post,
			categoriesLen,
			category,
			re;

		if (postsContainer) {
			for (var i = 0; i < 3; i++) {
				articleCat    = '';
				post 		  = harmonicInfo.posts[i];
				categoriesLen = post.categories.length,
				re = /<p>/.exec(post.content);

				if (re && re[0] === '<p>') {
					post.content = post.content.replace('<p>', '').replace('</p>', '');
				}
				
				for (var j = 0; j < categoriesLen; j++) {
				 	category = post.categories[j].toLowerCase().trim();
				 	articleCat += '<li class="item-tag-post"><a href="'+ ORIGIN + harmonicInfo.categoryPath + category +'">' + category + '</a></li>\n';
				}

				article += TEMPLATE.article(post.link, post.date, ORIGIN, post.title, post.content, articleCat, post.authorPicture, post.authorLink, post.authorName);
			}

			postsContainer.innerHTML = article;
		}
	};

	PRIVATE.morePosts = function () {
		var postsContainer = D.getElementById('containerMorePosts'),
			btnMorePosts = D.getElementById('morePosts'),
			posts = harmonicInfo.posts,
			post,
			article,
			articleCat,
			categoriesLen,
			category,
			re;

		if (PAGE === 'home' && posts.length > 8) {
			posts.splice(0, 8);
		} else {
			btnMorePosts.style.display = 'none';
		}

		if (postsContainer && btnMorePosts) {

			btnMorePosts.addEventListener('click', function(){
				article = '';

				if (posts.length >= 6) {
					for (var i = 0; i < 6; i++) {
						articleCat    = '';
						post 		  = posts[i];
						categoriesLen = post.categories.length,
						re = /<p>/.exec(post.content);

						if (re && re[0] === '<p>') {
							post.content = post.content.replace('<p>', '').replace('</p>', '');
						}
						
						for (var j = 0; j < categoriesLen; j++) {
						 	category = post.categories[j].toLowerCase().trim();
						 	articleCat += '<li class="item-tag-post"><a href="'+ ORIGIN + harmonicInfo.categoryPath + category +'">' + category + '</a></li>\n';
						}

						article += TEMPLATE.article(post.link, post.date, ORIGIN, post.title, post.content, articleCat, post.authorPicture, post.authorLink, post.authorName);
					}

					postsContainer.innerHTML = article;
					posts.splice(0, 6);	
				} else {

					for (var i = 0; i < posts.length; i++) {
						articleCat    = '';
						post 		  = posts[i];
						categoriesLen = post.categories.length,
						re = /<p>/.exec(post.content);

						if (re && re[0] === '<p>') {
							post.content = post.content.replace('<p>', '').replace('</p>', '');
						}
						
						for (var j = 0; j < categoriesLen; j++) {
						 	category = post.categories[j].toLowerCase().trim();
						 	articleCat += '<li class="item-tag-post"><a href="'+ ORIGIN + harmonicInfo.categoryPath + category +'">' + category + '</a></li>\n';
						}

						article += TEMPLATE.article(post.link, post.date, ORIGIN, post.title, post.content, articleCat, post.authorPicture, post.authorLink, post.authorName);
					}

					postsContainer.innerHTML = article;
					posts.splice(0, posts.length);	
				}

				if (posts.length === 0) {
					btnMorePosts.style.display = 'none';
				}

				$('.item-post').addClass('fadeInBox');
			});

		}
	}


	/**
	*
	* PUBLIC
	*
	**/
	PUBLIC.scrollTop = function (btn, event, posTop, time) {
		var btn = document.getElementById(btn);

		if (btn) {
			btn.addEventListener(event, function(){
			    $('html, body').animate({scrollTop : posTop}, time);
			});
		}
	};

	PUBLIC.init = function (){
		/**
		*
		* HARMONIC INFO SET
		*
		**/
		        harmonicInfo.lang = INFORMATIONS.lang();
		       harmonicInfo.posts = HARMONIC.getPosts()[harmonicInfo.lang];
		      harmonicInfo.length = harmonicInfo.posts.length;
		harmonicInfo.categoryPath = INFORMATIONS.categoryPath(harmonicInfo.lang);

		/**
		*
		* INIT
		*
		**/
		PRIVATE.googleSearch();
		PRIVATE.otherPosts();
		PRIVATE.morePosts();
		PRIVATE.disqus('#disqus_thread');
		PRIVATE.shareSocialnetwork();

		PUBLIC.scrollTop('goToTop', 'click', 0, 1000);
	};

	return PUBLIC;
};


var jsrocks = new JsRocks();
jsrocks.init();