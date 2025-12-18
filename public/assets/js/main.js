/* ===================================================================
	Author          : Valid Theme
	Template Name   : Agrica - Organic Farm Agriculture Template
	Version         : 1.0 (Hardened)
=================================================================== */

(function ($) {
	"use strict";

	if (typeof $ === "undefined") return;

	$(document).ready(function () {

		/* ================================
		   Tooltip
		================================= */
		try {
			if ($.fn.tooltip) {
				$('[data-toggle="tooltip"]').tooltip();
			}
		} catch (e) {
			console.warn("Tooltip init failed", e);
		}

		/* ================================
		   YouTube Background
		================================= */
		try {
			if ($.fn.mb_YTPlayer) {
				$('.player').mb_YTPlayer();
			}
		} catch (e) {
			console.warn("YTPlayer init failed", e);
		}

		/* ================================
		   Scroll Animations
		================================= */
		try {
			if ($.fn.scrolla) {
				$('.animate').scrolla();
			}
		} catch (e) {
			console.warn("Scrolla init failed", e);
		}

		/* ================================
		   Masonry / Isotope
		================================= */
		try {
			if ($.fn.imagesLoaded && $.fn.isotope) {
				$('#gallery-masonary, #shop-masonary').imagesLoaded(function () {

					$('.mix-item-menu').on('click', 'button', function () {
						const filterValue = $(this).attr('data-filter');
						$('.isotope-grid').isotope({ filter: filterValue });
					});

					$('.mix-item-menu button').on('click', function (e) {
						e.preventDefault();
						$(this).siblings('.active').removeClass('active');
						$(this).addClass('active');
					});

					$('#gallery-masonary').addClass('isotope-grid').isotope({
						itemSelector: '.gallery-item',
						percentPosition: true,
						masonry: { columnWidth: '.gallery-item' }
					});

					$('#shop-masonary').addClass('isotope-grid').isotope({
						itemSelector: '.product',
						percentPosition: true,
						masonry: { columnWidth: '.product' }
					});

				});
			}
		} catch (e) {
			console.warn("Isotope init failed", e);
		}

		/* ================================
		   Counters
		================================= */
		try {
			if ($.fn.countTo) {
				$('.timer').countTo();
			}

			if ($.fn.appear) {
				$('.fun-fact').appear(function () {
					$('.timer').countTo();
				}, { accY: -100 });
			}
		} catch (e) {
			console.warn("Counter init failed", e);
		}

		/* ================================
		   Magnific Popup
		================================= */
		try {
			if ($.fn.magnificPopup) {

				$(".popup-link").magnificPopup({ type: 'image' });

				$(".popup-gallery").magnificPopup({
					type: 'image',
					gallery: { enabled: true }
				});

				$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
					type: "iframe",
					mainClass: "mfp-fade",
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});

			}
		} catch (e) {
			console.warn("MagnificPopup init failed", e);
		}

		/* ================================
		   Progress Circles
		================================= */
		try {
			if ($.fn.circleProgress) {
				const animateProgress = function () {
					$('.progressbar').each(function () {
						const $el = $(this);
						if ($el.data('animate')) return;

						if ($el.offset().top < $(window).scrollTop() + $(window).height() - 30) {
							$el.data('animate', true);
							$el.find('.circle')
								.circleProgress({
									value: $el.find('.circle').data('percent') / 100,
									size: 130,
									thickness: 3,
									lineCap: 'round',
									emptyFill: '#f1f1f1',
									fill: { gradient: ['#49a760', '#49a760'] }
								})
								.on('circle-animation-progress', function (_, __, stepValue) {
									$(this).find('strong').text(Math.round(stepValue * 100) + "%");
								});
						}
					});
				};

				animateProgress();
				$(window).on('scroll', animateProgress);
			}
		} catch (e) {
			console.warn("Circle progress failed", e);
		}

		/* ================================
		   Swiper Carousels
		================================= */
		try {
			if (typeof Swiper !== "undefined") {

				document.querySelectorAll('[data-swiper]').forEach(el => {
					new Swiper(el, JSON.parse(el.dataset.swiper));
				});

			}
		} catch (e) {
			console.warn("Swiper init failed", e);
		}

		/* ================================
		   Contact Form
		================================= */
		try {
			$('.contact-form').on('submit', function (e) {
				e.preventDefault();

				const $form = $(this);
				const action = $form.attr('action');

				$('#submit').prop('disabled', true);

				$.post(action, $form.serialize())
					.done(data => {
						$('#message').html(data).slideDown();
					})
					.always(() => {
						$('#submit').prop('disabled', false);
					});
			});
		} catch (e) {
			console.warn("Contact form failed", e);
		}

		/* ================================
		   GSAP Animations
		================================= */
		try {
			if (window.gsap && window.ScrollTrigger) {
				gsap.set(".animation-shape", { yPercent: 10 });

				gsap.to(".animation-shape", {
					yPercent: -100,
					ease: "none",
					scrollTrigger: {
						trigger: ".animation-shape",
						scrub: 1
					}
				});
			}
		} catch (e) {
			console.warn("GSAP failed", e);
		}

	});

	/* ================================
	   Preloader
	================================= */
	try {
		$(window).on('load', function () {
			$('#agrica-preloader').addClass('loaded');
			$('#loading').fadeOut(500);
			$('#preloader').delay(900).queue(function () {
				$(this).remove();
			});
		});
	} catch (e) {
		console.warn("Preloader failed", e);
	}

})(jQuery);
