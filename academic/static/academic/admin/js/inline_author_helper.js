(function( $ ) {
    $.widget( "ui.combobox", {
	_create: function() {
	    var self = this,
	    select = this.element.hide(),
	    selected = select.children( ":selected" ),
	    value = selected.val() ? selected.text() : "";
	    var input = this.input = $( "<input>" )
		.insertAfter( select )
		.val( value )
		.autocomplete({
		    delay: 0,
		    minLength: 0,
		    source: function( request, response ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			response( select.children( "option" ).map(function() {
			    var text = $( this ).text();
			    if ( this.value && ( !request.term || matcher.test(text) ) )
				return {
				    label: text.replace(
					new RegExp(
					    "(?![^&;]+;)(?!<[^<>]*)(" +
						$.ui.autocomplete.escapeRegex(request.term) +
						")(?![^<>]*>)(?![^&;]+;)", "gi"
					), "<strong>$1</strong>" ),
				    value: text,
				    option: this
				};
			}) );
		    },

		    select: function( event, ui ) {
			ui.item.option.selected = true;
                        var previous_value = parseInt($(this)
                            .parents('div.tbody')
                            .prev('div.tbody')
                            .find('.order input').val());
                        
                        if (!previous_value)
                            previous_value = 0;

                        $(this).parent().siblings('.order').children('input').val(previous_value + 1);
                            
			self._trigger( "selected", event, {
			    item: ui.item.option
			});
		    },

		    change: function( event, ui ) {
			if ( !ui.item ) {
			    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
			    valid = false;
			    select.children( "option" ).each(function() {
				if ( $( this ).text().match( matcher ) ) {
				    this.selected = valid = true;
				    return false;
				}
			    });
			    if ( !valid ) {
				// remove invalid value, as it didn't match anything
				$( this ).val( "" );
				select.val( "" );
				input.data( "autocomplete" ).term = "";
				return false;
			    }
			}
		    }
		})
		.addClass( "ui-widget ui-widget-content ui-corner-left" );

	    input.data( "autocomplete" )._renderItem = function( ul, item ) {
		return $( "<li></li>" )
		    .data( "item.autocomplete", item )
		    .append( "<a>" + item.label + "</a>" )
		    .appendTo( ul );
	    };
	},
        
	destroy: function() {
	    this.input.remove();
	    this.button.remove();
	    this.element.show();
	    $.Widget.prototype.destroy.call( this );
	}
    });
})(django.jQuery );


(function($) {
    $(document).ready(function($) {
        $('.group select').combobox();
    });    
})(django.jQuery);