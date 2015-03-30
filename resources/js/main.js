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

// form search
(function search(){
	var form = document.getElementById('s');

	form.addEventListener('submit', function(e) {
	    form.q.value = form.q.value + ' site:' + window.location.hostname.replace(/www./g, '');
	});
})();

// scrolltop
(function scrollTop(){
	var goToTop = document.getElementById('goToTop');

	if (goToTop) {
		goToTop.addEventListener('click', function(){
		    $('html, body').animate({scrollTop : 0}, 1000);
		});
	}
})();

// diskus
(function diskus(id){
   if(document.getElementById(id)) {
        var disqus_shortname = 'es6rocks';

        (function() {
            var dsq = document.createElement('script');

            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }
})('#disqus_thread');

// Another post
(function otherPosts (){
	var otherPosts = document.getElementById('otherPosts');

	if (otherPosts) {
		var harmonic = new Harmonic(),
			posts 	 = harmonic.getPosts(),
			pathname = window.location.pathname,
			re 		 = /\/pt-br\//.exec(pathname),
			article  = '',
			articleCat,
			linkCat,
			categoriesLen,
			category,
			post;

		if (re && re[0] === '/pt-br/') {
			posts = posts['pt-br'];
			linkCat  = '/categories/pt-br/';
		} else {
			posts = posts['en'];
			linkCat  = '/categories/';
		}

		for (var i = 0; i < 3; i++) {
			articleCat  = '';
			post = posts[i];
			categoriesLen = post.categories.length;

			for (var j = 0; j < categoriesLen; j++) {
				category = post.categories[j].toLowerCase().trim();
				articleCat += '<li class="item-tag-post"><a href="'+ window.location.origin + linkCat + category +'">' + category + '</a></li>';
			}
			
			// posts template
			article += '<article class="col-md-4 col-sm-6 col-xs-12 post-normal item-post post-fade-6">';
			article += '<div class="container-post">';
			article +=     '<aside class="share-post">';
			article +=         '<a href="#" data-provider="https://www.facebook.com/sharer.php?u=" data-post-url="/' + post.link + '" class="share-face share-item" title="Share this post"><img src="/images/icon-face-header.png" alt="icon facebook"></a>';
			article +=         '<a href="#" data-provider="https://twitter.com/intent/tweet?url=" data-post-url="/' + post.link + '" class="share-twitter share-item" title="Tweet this post"><img src="/images/icon-twitter-header.png" alt="icon twitter"></a>';
			article +=     '</aside>';
			article +=     '<div class="date-post">' + post.date + '</div>';
			article +=     '<h1 class="title-post"><a href="'+ window.location.origin + '/' + post.link + '">' + post.title + '</a></h1>';
			article +=     '<p class="intro-post">' + post.content + '</p>';
			article +=     '<section class="footer-post">';
			article +=         '<ul class="tags-post">' + articleCat + '</ul>';
			article +=         '<div class="author-post">';
			article +=             '<div class="avatar-author"><img src="' + post.authorPicture + '" alt="avatar post"></div>';
			article +=             '<div class="info-author">';
			article +=                 '<span>Posted by</span>';
			article +=                 '<a href="' + post.authorLink + '" class="author">' + post.authorName + '</a>';
			article +=             '</div>';
			article +=         '</div>';
			article +=     '</section>';
			article += '</div>';
			article += '</article>';
		}

		otherPosts.innerHTML = article;
	}
})();

(function morePosts() {
	var btnMorePosts = document.getElementById('morePosts'),
		containerMorePosts = document.getElementById('containerMorePosts'),
		
		// DRY
		harmonic = new Harmonic(),
		posts 	 = harmonic.getPosts(),
		pathname = window.location.pathname,
		re 		 = /\/pt-br\//.exec(pathname),
		article,
		articleCat,
		linkCat,
		categoriesLen,
		category,
		post,

		postLen;

	// DRY
	if (re && re[0] === '/pt-br/') {
		posts 	= posts['pt-br'];
		linkCat = '/categories/pt-br/';
	} else {
		posts 	= posts['en'];
		linkCat = '/categories/';
	}

	posts.splice(0,8);

	if (btnMorePosts && containerMorePosts) {

		btnMorePosts.addEventListener('click', function(){
			postLen = posts.length;
			article  = '';

			if (postLen >= 6) {
				for (var i = 0; i < 6; i++) {
					articleCat  = '';
					post = posts[i];
					categoriesLen = post.categories.length;

					for (var j = 0; j < categoriesLen; j++) {
						category = post.categories[j].toLowerCase().trim();
						articleCat += '<li class="item-tag-post"><a href="'+ window.location.origin + linkCat + category +'">' + category + '</a></li>';
					}
					
					// posts template
					article += '<article class="col-md-4 col-sm-6 col-xs-12 post-normal item-post post-fade-6">';
					article += '<div class="container-post">';
					article +=     '<aside class="share-post">';
					article +=         '<a href="#" data-provider="https://www.facebook.com/sharer.php?u=" data-post-url="/' + post.link + '" class="share-face share-item" title="Share this post"><img src="/images/icon-face-header.png" alt="icon facebook"></a>';
					article +=         '<a href="#" data-provider="https://twitter.com/intent/tweet?url=" data-post-url="/' + post.link + '" class="share-twitter share-item" title="Tweet this post"><img src="/images/icon-twitter-header.png" alt="icon twitter"></a>';
					article +=     '</aside>';
					article +=     '<div class="date-post">' + post.date + '</div>';
					article +=     '<h1 class="title-post"><a href="'+ window.location.origin + '/' + post.link + '">' + post.title + '</a></h1>';
					article +=     '<p class="intro-post">' + post.content + '</p>';
					article +=     '<section class="footer-post">';
					article +=         '<ul class="tags-post">' + articleCat + '</ul>';
					article +=         '<div class="author-post">';
					article +=             '<div class="avatar-author"><img src="' + post.authorPicture + '" alt="avatar post"></div>';
					article +=             '<div class="info-author">';
					article +=                 '<span>Posted by</span>';
					article +=                 '<a href="' + post.authorLink + '" class="author">' + post.authorName + '</a>';
					article +=             '</div>';
					article +=         '</div>';
					article +=     '</section>';
					article += '</div>';
					article += '</article>';
				}

				containerMorePosts.innerHTML = article;
				posts.splice(0, 6);	

			} else {
				for (var i = 0; i < postLen; i++) {
					articleCat  = '';
					post = posts[i];
					categoriesLen = post.categories.length;

					for (var j = 0; j < categoriesLen; j++) {
						category = post.categories[j].toLowerCase().trim();
						articleCat += '<li class="item-tag-post"><a href="'+ window.location.origin + linkCat + category +'">' + category + '</a></li>';
					}

					console.log(post.content);
					
					// posts template
					article += '<article class="col-md-4 col-sm-6 col-xs-12 post-normal item-post post-fade-6">';
					article += '<div class="container-post">';
					article +=     '<aside class="share-post">';
					article +=         '<a href="#" data-provider="https://www.facebook.com/sharer.php?u=" data-post-url="/' + post.link + '" class="share-face share-item" title="Share this post"><img src="/images/icon-face-header.png" alt="icon facebook"></a>';
					article +=         '<a href="#" data-provider="https://twitter.com/intent/tweet?url=" data-post-url="/' + post.link + '" class="share-twitter share-item" title="Tweet this post"><img src="/images/icon-twitter-header.png" alt="icon twitter"></a>';
					article +=     '</aside>';
					article +=     '<div class="date-post">' + post.date + '</div>';
					article +=     '<h1 class="title-post"><a href="'+ window.location.origin + '/' + post.link + '">' + post.title + '</a></h1>';
					article +=     '<p class="intro-post">' + post.content + '</p>';
					article +=     '<section class="footer-post">';
					article +=         '<ul class="tags-post">' + articleCat + '</ul>';
					article +=         '<div class="author-post">';
					article +=             '<div class="avatar-author"><img src="' + post.authorPicture + '" alt="avatar post"></div>';
					article +=             '<div class="info-author">';
					article +=                 '<span>Posted by</span>';
					article +=                 '<a href="' + post.authorLink + '" class="author">' + post.authorName + '</a>';
					article +=             '</div>';
					article +=         '</div>';
					article +=     '</section>';
					article += '</div>';
					article += '</article>';
				}

				containerMorePosts.innerHTML = article;
				posts.splice(0, postLen);
			}

			$('.item-post').addClass('fadeInBox');
		});
	}
})();

//share socialneytwork
(function shareSocialnetwork(){
	var btns = document.querySelectorAll('.share-item'),
	    btnLen,
	    btn,
	    i;

	if (btns) {
		btnLen = btns.length
		
		for (i = 0; i < btnLen; i++) {
		    btn = btns[i];
		    btn.setAttribute('href', btn.getAttribute('data-provider') + window.location.host + btn.getAttribute('data-post-url'));
		}
	}
})();
