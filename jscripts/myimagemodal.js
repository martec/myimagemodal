function open_img(src_this) {
	$.jGrowl('<i class="fa fa-spinner fa-spin fa-4x"></i>');
	src_elem = $(src_this).attr('data-link').replace(/.*?:/g, "");
	var src_order = $(src_this).attr('data-order');
	var src_val = $(src_this).text();
	$('<div id="image_mod_'+ src_order +'" style="display: none; width: initial;"><table><tr><th>'+ src_val +'</th></tr><tr><td><img style="max-width:'+window.innerWidth*0.8+'px;max-height:'+window.innerHeight*0.8+'px;" class="img_mod_src_'+ src_order +'" src="'+ src_elem +'"/></td></tr></table></div>').appendTo('body');
	$('.img_mod_src_'+ src_order +'').one("load", function() {
		if($(".jGrowl-notification:last-child").length) {
			$(".jGrowl-notification:last-child").remove();
		}
		$('#image_mod_'+ src_order +'').modal({ zIndex: 7 });
	}).each(function() {
		if(this.complete) $(this).load();
	});
}

function open_yt_bf(src_this) {
	var url = $(src_this).attr('href'),
	regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
	match = url.match(regExp);
	if (match&&match[2].length==11){
		url = match[2];
	}
	else {
		url = url.replace(/^[^v]+v.(.{11}).*/,"$1");
	}
	$(src_this).attr('data-yt', url);
}

function open_yt_at(src_this) {
	src_elem = $(src_this).attr('data-yt');
	$('<div id="yt_mod" style="display: none; width: initial;"><iframe width="560" height="315" src="//www.youtube.com/embed/'+ src_elem +'?html5=1&autoplay=1" frameborder="0" allowfullscreen ></iframe></div>').appendTo('body');
	$(src_this).attr({'href':'#yt_mod', 'rel':'modal:open'});
	var elem = $(src_this).attr('data-yt');
	setTimeout(function(){
		$("a[data-yt*='"+elem+"']").attr('href', '//youtu.be/'+elem+'?html5=1');
	}, 200);
}

$(document).ready(function() {
	var number = 0;
	$("a[href*='.jpg'], a[href*='.gif'], a[href*='.png']").each(function(e) {
		$(this).attr({'data-link':$(this).attr('href'), 'data-order':number++});
	});
	$("a[href*='.jpg'], a[href*='.gif'], a[href*='.png']").click(function(e) {
		e.preventDefault();
		open_img(this);
	});

	$("a[href*='youtu.be'], a[href*='youtube']").each(function(e) {
		open_yt_bf(this);
	});
	$("a[href*='youtu.be'], a[href*='youtube']").click(function(e) {
		if ($(this).attr('data-yt').length==11) {
			e.preventDefault();
			open_yt_at(this);
		}
	});
});

$(document).ajaxComplete(function() {
	var number = 0;
	$("a[href*='.jpg'], a[href*='.gif'], a[href*='.png']").each(function(e) {
		$(this).attr({'data-link':$(this).attr('href'), 'data-order':number++});
	});
	$("a[href*='.jpg'], a[href*='.gif'], a[href*='.png']").click(function(e) {
		e.preventDefault();
		open_img(this);
	});

	$("a[href*='youtu.be'], a[href*='youtube']").each(function(e) {
		open_yt_bf(this);
	});
	$("a[href*='youtu.be'], a[href*='youtube']").click(function(e) {
		if ($(this).attr('data-yt').length==11) {
			e.preventDefault();
			open_yt_at(this);
		}
	});
});