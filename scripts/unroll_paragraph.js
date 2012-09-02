jQuery.fn.unroll_paragraph = function () {
	jQuery(this).find('a').click( function() {
		var paragraph = jQuery(this).parent().find( '.answer' );

		jQuery(this).find('.closed').toggle();
		jQuery(this).find('.opened').toggle();
		
		if(jQuery(this).find('.closed').css('display') == 'none') {
			paragraph.slideDown( 'slow' );
		}
		if(jQuery(this).find('.opened').css('display') == 'none') {
			paragraph.slideUp( 'slow' );
		}
	});
}
