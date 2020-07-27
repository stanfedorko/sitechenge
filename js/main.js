$(document).ready(function() {


	// smaller menu
	$(window).scroll(function() {
		if ($(document).scrollTop() > 100) {
			$('.header-bottom').addClass('smaller-menu');
	
		}
		else {
			$('.header-bottom').removeClass('smaller-menu'); }
		});
	
	
		$(window).scroll(function() {
		if ($(document).scrollTop() > 100) {
			$('.header-bottom').addClass('show');
	
		}
		else {
			$('.header-bottom').removeClass('show'); }
		});
	
	
	
	
		// $('.nav-link').click(function() {
		// 	$('.mobile-nav, .mobile-nav-bg').removeClass('show');
		// 	$('body').removeClass('no-scroll');
		// });
	
	
	
		// $('.mobile-nav-bg').click(function() {
		// 	$('.mobile-nav-bg, .mobile-nav').removeClass('show');
		// 	$('body').removeClass('no-scroll');
		// });
	
		// $('.show-menu').on('click', function() {
		// 	$('.mobile-nav, .mobile-nav-bg').toggleClass('show');
		// 	$('body').toggleClass('no-scroll');
		// });
	
	
		$('.js-navbar-toggler').on('click', function() {
			$('.js-navbar-toggler').toggleClass('active');
			$('.js-sidenav').toggleClass('active');
			$('.js-main').toggleClass('js-ml-sidenav');
		});

		// $('.mobile-nav-bg, .nav-link').click(function() {
		// 	$('.js-navbar-toggler').removeClass('active');
		// });
	// SMOOTH SCROLL TO ANCHOR
		$('.link-smooth').click(function(event) {
			$('body, html').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top-30
			}, 900);
			event.preventDefault();
		});

	$('[data-toggle="tooltip"]').tooltip();
});


