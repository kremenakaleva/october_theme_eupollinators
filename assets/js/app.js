
$(window).scroll(animateNumbers);
var viewed = false;

var width = $(window).width();

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
var keepFooter = function(documentHasScroll){
    if (!document.getElementById("layout-footer")){
        return;
    }

    if(documentHasScroll){
        document.getElementById("layout-footer").classList.remove('fixed-bottom');
    }else{
        document.getElementById("layout-footer").classList.add('fixed-bottom');
    }
}



$(document).ready(function() {
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line

	if (width > 700) { // desktop
		$("#menuToggle input").on("mouseover", function () {
			this.checked = !this.checked;
			$('#menu').show();
			$('#search').hide();
			$('#menu, #menu *').css({
				'visibility': 'visible'
			});
		});


		$("#menu").on("mouseenter", function () {
			$("#menuToggle input").prop("checked", true);
			$('#search').hide();
			$('#menu, #menu *').css({
				'visibility': 'visible'
			});
		}).on("mouseleave", function () {
			if ($("#search").is(':visible')) {
				$("#menuToggle input").prop("checked", true);
			} else {
				$("#menuToggle input").prop("checked", false);
			}
		});
	}

	if (width < 700) { // mobile
		$('#menuToggle input[type="checkbox"]').change(function(){
			var checked = $(this).is(":checked");
			if(checked){
				$('#menu').show();
				$('#search').hide();
				$('#menu, #menu *').css({
					'visibility': 'visible'
				});
				$('body', 'html').css({
					'overflow': 'hidden'
				});
			}else{
				$('#menu').hide();
				$('#search').hide();
				$('body', 'html').css({
					'overflow': 'auto'
				});
			}
		});
	}

	var loggedInMenuNavbar = $('.navbar-loggedin-user');
	loggedInMenuNavbar.find('#menu').removeAttr('id');

	$('body').on('click', '.work_packages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children().find(".plusminus").text('+');
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children().find(".plusminus").text('-');
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});

	var footerNav = $('.footer-menu');
	footerNav.removeAttr('id');




	$('.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

		$active.addClass('active');

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		if(activeTab.length){
			$content.slideDown(speed);
			//scroll to element
			$('html, body').animate({
				scrollTop:  activeTab.offset().top - $('header').height()
			}, speed);
		}

		// Bind the click event handler
		$(this).find("a").click(function (e) {
			if($(this).hasClass('active')) {
				$content.slideDown({
					scrollTop: $content.offset().top - $('header').height()
				}, speed);
				var screenSize = getScreenSize();
				if (screenSize.width < 800) {
					// scroll to element
					$('html, body').animate({
						scrollTop: $content.offset().top - $('header').height() + 300  // mobile
					}, speed);
				}else{
					//scroll to element icons top
					$('html, body').animate({
						scrollTop:  $content.offset().top - $('header').height() + 300
					}, speed);
				}
				e.preventDefault();
				return false;
			}
			// Make the old tab inactive.
			$active.removeClass('active');
			// $content.slideUp({
			// 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
			// }, speed);
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			location.hash = $active[0].hash;

			// Make the tab active.
			$active.addClass('active');
			$content.slideDown({
				scrollTop: $content.offset().top - $('header').height()
			}, speed);
			var screenSize = getScreenSize();
			if (screenSize.width < 800) {
				// scroll to element
				$('html, body').animate({
					scrollTop: $content.offset().top - $('header').height() + 300 // mobile
				}, speed);
			}else{
				//scroll to element icons top
				$('html, body').animate({
					scrollTop:  $content.offset().top - $('header').height() + 300
				}, speed);
			}

			// Prevent the anchor\'s default click action
			e.preventDefault();
		});
	});



	if (width >= 1024) {
		$('.ri1 .key_1, .ri1 .key_3, .ri1 .key_5, .ri1 .key_7, .ri1 .key_9, .ri1 .key_11').wrapAll('<div class="col-md-6 col-xs-12" />');
		$('.ri1 .key_0, .ri1 .key_2, .ri1 .key_4, .ri1 .key_6, .ri1 .key_8, .ri1 .key_10').wrapAll('<div class="col-md-6 col-xs-12" />');

		$('.ri2 .key_1, .ri2 .key_3, .ri2 .key_5, .ri2 .key_7, .ri2 .key_9, .ri2 .key_11').wrapAll('<div class="col-md-6 col-xs-12" />');
		$('.ri2 .key_0, .ri2 .key_2, .ri2 .key_4, .ri2 .key_6, .ri2 .key_8, .ri2 .key_10').wrapAll('<div class="col-md-6 col-xs-12" />');

		$('.ri3 .key_1, .ri3 .key_3, .ri3 .key_5, .ri3 .key_7, .ri3 .key_9, .ri3 .key_11').wrapAll('<div class="col-md-6 col-xs-12" />');
		$('.ri3 .key_0, .ri3 .key_2, .ri3 .key_4, .ri3 .key_6, .ri3 .key_8, .ri3 .key_10').wrapAll('<div class="col-md-6 col-xs-12" />');
	}

	if (width <= 1024) {
		$('.projects_services .key_1, .projects_services .key_3, .projects_services .key_5, .projects_services .key_7, .projects_services .key_9, .projects_services .key_11, .projects_services .key_13').wrapAll('<div class="col-md-6 col-xs-12" />');
		$('.projects_services .key_0, .projects_services .key_2, .projects_services .key_4, .projects_services .key_6, .projects_services .key_8, .projects_services .key_10, .projects_services .key_12').wrapAll('<div class="col-md-6 col-xs-12" />');
	}


	$('.numbers').attr('data-aos', 'fade-up');
	$('.mission h1.display-1').attr('data-aos', 'fade-up');
	$('.vision h1.display-1').attr('data-aos', 'fade-up');
	$('.results h1.display-1').attr('data-aos', 'fade-up');
	$('.card-img-top').attr('data-aos', 'fade-up');
	$('.logo-container').attr('data-aos', 'fade-up');
	$('.subscribe-items a').attr('data-aos', 'fade-up');
	$('.icons a').attr('data-aos', 'fade-up');
	$('.partners_logos_list li').attr('data-aos', 'fade-up');

	// about page
	$('.find').attr('data-aos', 'fade-up');
	$('.interoperate').attr('data-aos', 'fade-up');
	$('.access').attr('data-aos', 'fade-up');
	$('.reuse').attr('data-aos', 'fade-up');
	$('.researchTools').attr('data-aos', 'fade-up');
	$('.interlinkedKnowledge').attr('data-aos', 'fade-up');
	$('.texAndDataMiningWorkflows').attr('data-aos', 'fade-up');
	$('.fairDataPlace').attr('data-aos', 'fade-up');
	$('.journalProductionWorkflow').attr('data-aos', 'fade-up');
	$('.biodiversityKnowledgeHub').attr('data-aos', 'fade-up');

	$('.project-structure-networking h1').attr('data-aos', 'fade-up');
	$('.project-structure-transnational h1').attr('data-aos', 'fade-up');
	$('.project-structure-jointresearch h1').attr('data-aos', 'fade-up');


	$('.partners svg').attr('data-aos', 'fade-up');
	$('.card_image_container').attr('data-aos', 'fade-up');

	// media
	$('.flyer_image_container img').attr('data-aos', 'fade-up');
	$('.broshure_and_poster img').attr('data-aos', 'fade-up');
	// $('.logo-container img').attr('data-aos', 'fade-up');
	$('.guide-container').attr('data-aos', 'fade-up');



});

function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 94 }, 0);
}

function showSearchForm(){
	if ($(".search").is(':visible')) {
		$('#menu').show();
	} else {
		$(".search").slideDown(300);
		$('#menu').hide();
	}

	$('#menu').hide();
	$('#search').toggle();
}

window.addEventListener('scroll', function (e) {
	var headernavbar = document.getElementById("headernavbar");
	if (window.scrollY > headernavbar.offsetHeight){
		var headerNavbarNav = document.querySelector('#headerNavbarNav')
		headernavbar.classList.add('scrolled');
		headernavbar.classList.add('fixed');

	}else{
		headernavbar.classList.remove('scrolled');
	}
});



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarLogin');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarLogin');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\"></a></li>';
	var liSocial = '<li class="nav-item social"><a href=\"https://www.facebook.com/BiCIKLProjectH2020\" target=\"_blank\" class=\"pr p-facebook big\" target=\"_blank\"></a><a href=\"https://twitter.com/BiCIKL_H2020\" target=\"_blank\" class=\"pr p-twitter big\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	menu.find('>ul').append(liSearch).append(liSocial);
}

function initAccordeon(pElem) {
	$('body').on('click', '.accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").html('<span class="plus"></span>');
			$(this).children(".read-more").text('read more');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").html('<span class="minus"></span>');
			$(this).children(".read-more").text('hide');
		}
	});
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') { 
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') { 
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
        keepFooter(documentHasScroll());
		appendSearchAndSocialMedia();

    });
    // appendProfile()
    // appendSignIn()
    // appendSignOut()

}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}

function animateNumbers() {
	if (isScrolledIntoView($(".numbers")) && !viewed) {
		viewed = true;
		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 1500,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}
}


function getScreenSize() {
	var myHeight = 0;
	var myWidth = 0;
	if (window.innerWidth && window.innerHeight) {
		// Netscape & Mozilla
		myHeight = window.innerHeight;
		myWidth = window.innerWidth;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE > 6
		myHeight = document.documentElement.clientHeight;
		myWidth = document.documentElement.clientWidth;
	} else if (document.body.offsetWidth && document.body.offsetHeight) {
		// IE = 6
		myHeight = document.body.offsetHeight;
		myWidth = document.body.offsetWidth;
	} else if (document.body.clientWidth && document.body.clientHeight) {
		// IE < 6
		myHeight = document.body.clientHeight;
		myWidth = document.body.clientWidth;
	}

	return {'width': myWidth, 'height': myHeight};
}

init()
