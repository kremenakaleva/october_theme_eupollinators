$(window).scroll(animateNumbers);
$(window).scroll(hideMenuMobileOnScropll);
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


	$('.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		var width = $(window).width();
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
				if (width < 800) {
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
			if (width < 800) {
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

function initAccordeon(pElem) {
	$('body').on('click', '.accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").html('<span class="minus"></span>');
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


function hideMenuMobileOnScropll() {
	if (width < 1030 && $('.content-wrapper').hasClass('home')) {
		var scroll = $(window).scrollTop();
		if(scroll > 50){
			$('#menuToggle').fadeOut();
		}else {
			$('#menuToggle').fadeIn();
		}

	}
}

function redirectAndActivate(elem, url, tab_class){
	$(".tabs a.join").each(function() {
		this.href = window.location.hash;
	});

	window.open(url, '_blank');
	location.reload();
}


init()
