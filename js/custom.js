jQuery(document).ready(function() {
	var $logo 	= $('#logo');

	$('.tab-resume,.tab-portfolio,.tab-contact').click(function() {
	  $logo.fadeIn('slow');
	});

	$('.tab-identity').click(function() {
	  $logo.fadeOut('slow');
	});

	var iPrev = 1;
	var iRnd = 1;
	
	$(document).ready(function() {
		var preloadImages = ['img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg'];
			for (var i=0, len = preloadImages.length; i < len; i++) {
				(new Image()).src = preloadImages[i];
			}
		
		$("#backdrop").css({
			"background" : "url(img/bg1.jpg)",
			"background-size" : "cover"
		});
		setInterval(function() {
			Loadimg();
		},12000);
	});
	function LoadImage(iNr) {
		$("#backdrop").fadeOut('slow', function() {
		$("#backdrop").css({
		"background" : "url(img/bg"+iNr+".jpg)",
		"background-size" : "cover",
		"background-position" : "center center"
		}).fadeIn('slow');
		}); 
	};
	function Loadimg() {
		if(iRnd < 5) {
			//while(iPrev == iRnd) {
			//iRnd = Math.floor(Math.random()*5+1);
			iRnd++;
		}else{
			iRnd = 1;
		}
		LoadImage(iRnd);
		iPrev = iRnd;
	};

	var $content 		= $("#content");
  	$content.easytabs({
	  animate			: true,
	  transitionIn		:'slideDown',
	  transitionOut		:'slideUp',
	  animationSpeed	:600,
	  updateHash		:false,
	  tabs				:"> nav > ul > li",
	  tabActiveClass	:'active',
	});

	$content.find('.tabs li a').hover(
		function() {
			$(this).stop().animate({ marginTop: "-4px" }, 200);
		},function() {
			$(this).stop().animate({ marginTop: "0px" }, 300);
		}
	);

	var $container	 	= $('#portfolio-list');
	var $filter 		= $('#portfolio-filter');

	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	

	$filter.find('a').click(function() {
	  var selector = $(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false,
	   }
	  });
	  return false;
	});

	$filter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$filter.find('a').removeClass('current');
		$(this).addClass('current');
	});

	$(window).load(function() {
		var itemimg = $("a.folio img");
		itemimg.fadeIn(500);
		
		itemimg.each(function() {
			var el = $(this);
			el.css({"position":"relative"}).clone().addClass('img_color').css({"position":"absolute","z-index":"1","opacity":"0"}).insertBefore(el).queue(function() {
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
			});
			this.src = grayscale(this.src);
		});
		
		// Fade image 
		$('#portfolio-list li').mouseover(function() {
			$(this).find("img.img_color").stop().animate({opacity:1}, 300);
		})
		$('#portfolio-list li').mouseout(function() {
			$(this).find("img.img_color").stop().animate({opacity:0}, 300);
		});		
	});
	
	// Grayscale w canvas method
	function grayscale(src) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var r = 10, // Red tint (0-255)
			g = 10, // Green tint (0-255)
			b = 50, // Blue tint (0-255)
			t = 0.75; // Tint strength (0-1)
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++) {
			for(var x = 0; x < imgPixels.width; x++) {
				var i = (y * 4) * imgPixels.width + x * 4;
				//var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				//imgPixels.data[i] = avg; 
				//imgPixels.data[i + 1] = avg; 
				//imgPixels.data[i + 2] = avg;
				imgPixels.data[i] = imgPixels.data[i++] * (1-t) + (r*t);
				imgPixels.data[i] = imgPixels.data[i++] * (1-t) + (g*t);
				imgPixels.data[i] = imgPixels.data[i++] * (1-t) + (b*t);
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }
	
	/* ---------------------------------------------------------------------- */
	/*	Fancybox 
	/* ---------------------------------------------------------------------- */
    $container.find('.folio').fancybox({
        padding    : 0,
        margin     : 5,
        autoCenter : false,
		maxHeight : '90%',
		maxWidth : '90%',
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		
	$contactform.submit(function() {
		$.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND') {
					response = '<div class="success">'+ $success +'</div>';
				}
				else{
					response = '<div class="error">'+ msg +'</div>';
				}
				// Hide any previous response text
				$(".error,.success").remove();
				// Show response message
				$contactform.prepend(response);
			}
		 });
		return false;
	});
});	