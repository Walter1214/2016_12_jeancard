/**
 * Copyright 2014 by Rainer Rillke
 * Makes sure Flickr iframes and images always look great.
 * You may use and re-distribute and modify this file, povided
 * that the above copyright notice and this text will be
 * preserved.
 * This software comes without any warranty.
 * You may also use it under the terms of the JSON license.
 */ 

(function() {
'use strict';

var flick = {
	elements: null,
	getUrlForSize: function(sizes, width, originalUrl) {
		if ('string' === typeof sizes) sizes = JSON.parse(sizes);
		var last = {
			width: 0,
			diff: Infinity,
			url: ''
		};
		$.each(sizes, function(k, v) {
			var n = Number(k);
			var diff = n - width;
			if (diff > 0 && last.diff > diff
				|| (last.diff === Infinity)
				|| (last.diff < 0 && diff > last.diff) 
			) {
				last.width = n;
				last.diff = diff;
				last.url = v;
			}
		});
		return {
			newMaxWidth: last.width,
			newUrl: originalUrl.replace(/[a-f0-9]+_\w(\.\w{1,9})$/, last.url + '$1')
		}
	},
	handleResize: function() {
		if (!flick.elements) {
			flick.elements = $('.rlk-autosize');
		};
		var $elements = flick.elements,
			$fullWidthElements = $elements.filter('.rlk-fullwidth'),
			maxWidth = $('.entry-content').innerWidth();

		$fullWidthElements.each(function() {
			var $elem = $(this),
				w = $elem.attr('width'),
				h = $elem.attr('height'),
				sizes = $elem.data('sizes'),
				wToH = w / h,
				newH = maxWidth / wToH;

			switch ($elem.prop('tagName')) {
				case 'IFRAME':
					$elem
						.attr('width', maxWidth)
						.attr('height', newH)
						.attr('src', $elem.attr('src'));
					break;
				case 'IMG':
					var newValues = flick.getUrlForSize(sizes, maxWidth, $elem.attr('src'));
					$elem
						.attr('width', maxWidth)
						.attr('height', newH)
						.attr('src', newValues.newUrl);
					break;
			}
		});
	}
};

$(function() {
	$(window).resize( flick.handleResize );
	$(window).resize();
});

}());