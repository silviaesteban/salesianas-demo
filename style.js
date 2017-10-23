
(function (blink) {
	'use strict';

	var salesianas_demo = function () {
			blink.theme.styles.fancy.apply(this, arguments);
		},
		page = blink.currentPage;

	salesianas_demo.prototype = {
		bodyClassName: 'content_type_clase_salesianas_demo',
		extraPlugins: ['image2'],
		ckEditorStyles: {
			name: 'salesianas_demo',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Título 3', element: 'h4', attributes: { 'class': 'bck-title3'} },

				{ name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis' }},
				{ name: 'Enunciado actividad', element: 'h4', attributes: { 'class': 'bck-title-activity' }},

				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Celda encabezado', element: 'td', attributes: { 'class': 'bck-td' } },

				{ name: 'Caja 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Caja 2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Caja 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } }
			]
		},

		init: function () {
			var parent = blink.theme.styles.fancy.prototype;
			parent.init.call(this);
			this.addActivityTitle();
			this.addPageNumber();
			this.formatCarouselindicators();
		},

		removeFinalSlide: function () {
			var parent = blink.theme.styles.fancy.prototype;
			parent.removeFinalSlide.call(this, true);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		addPageNumber: function() {
			$('.js-slider-item').each(function(i,e) {
				var idPage = $(e).attr('id');
				var page = parseInt(idPage.replace("slider-item-", ""))+1;
				$(e).find('.header').prepend('<div class="single-pagination"><div class="page">'+page+'</div></div>');
			});
		},


		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');
			$navbarBottom.find('li').tooltip('destroy');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				dropDown += '<li role="presentation"><a role="menuitem">' + (navigatorIndex+1) + '. ' + stripHTML(slideTitle) + '</a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'">'+(navigatorIndex+1)+'</span>');
				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			$navbarBottom
				.attr('class', 'publisher-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		getEditorStyles: function () {
			return this.ckEditorStyles;
		}
	};

	salesianas_demo.prototype = _.extend({}, new blink.theme.styles.fancy(), salesianas_demo.prototype);

	blink.theme.styles.salesianas_demo = salesianas_demo;

})( blink );

$(document).ready(function () {

	$('body').addClass('content_type_curso_fancy content_type_clase_fancy ');

    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});

	if (!editar) {
		blink.events.on('showSlide:after', function (index) {
			poolReposition();
		});
	}

	// BK-8433 cambiamos el logo de las slides por el del dominio
	var src_logo = $('.content_type_clase_salesianas_demo').find('.logo_slide').attr('logo_dominio');
	if (typeof(src_logo) != 'undefined' && src_logo && src_logo != '' && src_logo.indexOf('gif1x1.gif') == -1) {
		$('.content_type_clase_salesianas_demo').find('.logo-publisher').css('background-image', "url('"+src_logo+"')");
	}

});

$(window).load(function() {
	if (!editar) {
		poolReposition();
	}
});
$(window).resize(function() {
	if (!editar) {
		poolReposition();
	}
});

function poolReposition() {
	$('.pool').each(function(i,e) {
		var poolContainer = $(e).width();
		var poolWidth = $(e).find('.rf-searchgamecontainer').width();
		var wordContainerWidth = poolContainer-poolWidth-20;
		if (wordContainerWidth > 150) {
			$(e).find('.rf-wordcontainer').css('width', wordContainerWidth);
		} else {
			$(e).find('.rf-wordcontainer').css('width', poolWidth);
		}
	});
}

