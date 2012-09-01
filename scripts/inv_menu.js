jQuery.fn.inv_menu = function(options) {
    var options = jQuery.extend({
      bg: '#000', 
      font: '#fff', 
      activeclass: 'active', 
      upperclass: 'nonclone_menu',
      cloneclass: 'menu_clone', 
      navcursorclass: 'menu_navcursor', 
      speed: 500 
    },options);
    return this.each(function() {
	$('div' + '#' + 'main_content').css( {'display': 'block'} );
	$('div' + '#' + 'main_content' + ' p').css( {'display': 'block'} );
		    
        var menu = jQuery(this);
        if( menu.length <= 0)
            return;
        var timeout = null;
        var start = {};
        menu.wrap( '<div style = "position:relative"></div>' );
		
        if( menu.find( '.' +options.activeclass ).length > 0 ) {
            var current = menu.find( '.' + options.activeclass );
            current.removeClass( options.activeclass );
	    
	    start.height = current.height() + parseInt( current.css( 'paddingTop' ) ) + parseInt( current.css( 'paddingBottom' ) );
            start.width = current.width() + parseInt( current.css( 'paddingLeft' ) ) + parseInt( current.css( 'paddingRight' ) );
            start.left = current.position().left + 1;
            start.top = current.position().top + 1 -  menu.height() - parseInt( menu.css ( 'marginBottom' ) );// - parseInt( current.css( 'paddingTop' ) );
            }
        else {
            obj = menu.find( ':first-child' );
	    start.height = obj.height() + parseInt( obj.css( 'paddingTop' ) ) + parseInt( obj.css( 'paddingBottom' ) );
            start.width = 0;
            start.left = obj.position().left + 1;
            start.top = obj.position().top + 1 - menu.height() - parseInt( menu.css ( 'marginBottom' ) );
            
        }
	
	
	var position = current;
        menu.parent().append( '<div class = "' + options.navcursorclass + '"></div>' );
        var navcursor =  menu.parent().find( '.' + options.navcursorclass );

        navcursor.css( {'marginTop': start.top, 'marginLeft':start.left, 'width':start.width, 'height':start.height, 'overflow':'hidden',  'whiteSpace':'nowrap', 'position':'absolute' } );

        var clone = menu.clone();
        clone.css( { 'marginLeft': -start.left , 'marginTop': 0 , 
			  'background':options.bg, 'width':menu.width(), 
		          'height':menu.height()} );
        clone.find( 'a' ).css( 'color', options.font );
        clone.addClass( options.cloneclass );
        clone = clone.appendTo( navcursor );
	clone.children().css( { 'border-width':0 } );

        clone.children().hover( function() {
            clearTimeout(timeout);
        },
        navcursorback );
	
	menu.addClass(options.upperclass);
        
	clone.children().click( function() {
		
		position = $('.' + options.upperclass + ' #' + this.id);
		current = position;
	
		if($('div' + '#' + this.id).css('display') == 'none' ) {
			$('div' + '.content').css( { 'display':'none' } );
			$('div' + '.content' + ' p').slideUp();
			$('div' + '#' + this.id).css( { 'display':'block' } );
			$('div' + '#' + this.id + ' p').slideDown();	
			}
				
		start.height = current.height() + parseInt( current.css( 'paddingTop' ) ) + parseInt( current.css( 'paddingBottom' ) );
		start.width = current.width() + parseInt( current.css( 'paddingLeft' ) ) + parseInt( current.css( 'paddingRight' ) );
		
		start.left = current.position().left +1;
		start.top = current.position().top - menu.height() - parseInt( menu.css ( 'marginBottom' ) ) + 1;
		});
	
	menu.children().hover( function() {
            clearTimeout(timeout);
            if(  jQuery(this) == current )
		return;
	   	
            current = jQuery(this);
            navcursor.stop().animate({
                                'marginLeft':jQuery(this).position().left + 1,
                                'marginTop':jQuery(this).position().top-menu.height() - parseInt( menu.css ( 'marginBottom' ) ) + 1,
                                'width':jQuery(this).width() + parseInt( jQuery(this).css( 'paddingLeft' ) ) + parseInt ( jQuery(this).css( 'paddingRight' ) ),
				'height':jQuery(this).height() + parseInt( jQuery(this).css( 'paddingTop' ) ) + parseInt ( jQuery(this).css( 'paddingBottom' ) )
                                    
		    },
                            {
                                duration:options.speed,
                                step: function(){
                                    clone.css( { 'marginLeft': -parseFloat(navcursor.css('marginLeft')) + 1, 'marginTop': 0  } );
                                }
                            });
        },
        navcursorback );
	
        function navcursorback() {
            clearTimeout(timeout);
            timeout = setTimeout(function(){
            current = position;
            navcursor.stop(true).animate({
                                'marginLeft':start.left,
                                'marginTop': start.top,
                                'width':start.width,
		                'height':start.height
                            },
                            {
                                duration:options.speed,
                                step: function(){
                                    clone.css( { 'marginLeft': -parseFloat(navcursor.css('marginLeft')) + 1, 'marginTop': 0 } );
                                }
                            });
            },100);
        }
    });
}