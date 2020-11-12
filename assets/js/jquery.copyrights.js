(function($){
	
	// copyrigths year
	$.fn.copyrights = function(){
		
		// to use this for variable selectors
		return this.each(function(){
			let d = new Date();
			return $(this).html(d.getFullYear());
		});
	};
	
	// Developer
	$.fn.developer = function(){
		return this.each(function(){
			$(this).html('<a href="https://potterincorporated.com" target="_blank">Potter Inc&trade;</a>');
		})
	}

}(jQuery));
