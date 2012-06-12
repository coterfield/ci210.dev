var basePathIcons = 'images/fugue-icons/icons/';

function createIcon(icon) {
	return '<img src="' + basePathIcons + icon + '.png" />';
}

jQuery(function(){
	jQuery('label').each(function(){
		var $entry = jQuery(this).find('.checker, .radio');
		if($entry[0]){
			jQuery(this).mouseenter(function(){
				$entry.addClass('hover');
			}).mouseleave(function(){
				$entry.removeClass('hover');
			});
		}
	});
	
	applyAll();
	
	if(jQuery().validate){
		jQuery('.validate').validate({
			onclick: false,
			onkeyup: false,
			onfocusout: false,
			success: function(label) {
				var c = label.closest('.entry');
				if(!c[0])
					c = label.closest('.check-list');
				if(!c[0])
					c = label.parent();
				c.removeClass('error-container');
			},
			errorPlacement: function(error, element) {
				var p = element.closest('.entry');
				if(!p[0])
					p = element.closest('.check-list');
				if(!p[0])
					p = element.parent();
					
				if(!p.find('.errors')[0])
					p.append('<div class="errors" />');
				p.addClass('error-container').find('.errors').append(error);
			}
		});
	}
	
	if(jQuery().validationEngine){
		jQuery('.validate-engine').each(function(){
			var $form = jQuery(this),
				options = {
					relative: true,
					promptPosition: 'centerRight',
					autoHideDelay: 30000,
					binded: false
				};
			
			if($form.closest('.single')[0]){
				options.onValidationComplete = function(form, success){
					var _this = this;
					if(jQuery(form).closest('.single')[0]){
							jQuery('label').each(function(){
								var $label = jQuery(this), $input = $label.find("["+_this.validateAttribute+"*=validate]");
								
								if($input[0]){
									if($.inArray($label.find('input')[0], _this.InvalidFields) === -1){
										$label.removeClass('ve-error-container').addClass('ve-success-container');
									}else{
										$label.removeClass('ve-success-container').addClass('ve-error-container');
									}
								}
							});
					
							if(success){
								jQuery(form).validationEngine('detach').submit();
							}
						}
				}
			}
			
			$form.validationEngine(options);
		});
	}
	
    /*==================
        Tables
    ====================*/
	if(jQuery().dataTable){
		(function(){
			jQuery.fn.wrapInnerTexts = function($with){
				if(!$with)
					$with = jQuery('<span class="textnode" />');

				jQuery(this).each(function(){
					var kids = this.childNodes;
							for (var i=0,len=kids.length;i<len;i++){
								if (kids[i].nodeName == '#text'){
									jQuery(kids[i]).wrap($with.clone().addClass('i-' + i));
								}
							}
				});
				return jQuery(this);
			};
			
			jQuery('.datatable').dataTable({
				sPaginationType: 'full_numbers',
				sDom: '<"header-table"lf>rt<"footer-table"ip>',
				oLanguage: { oPaginate: {
					sFirst: '<',
					sPrevious: '(',
					sNext: ')',
					sLast: '>'
				}},
				fnInitComplete: function(t){
					var $table = jQuery(t.nTable), $head = $table.prev();
					$head.find('select').uniform();
					
					$head.find('.dataTables_length label').wrapInnerTexts();
					$head.find('.dataTables_filter label').wrapInnerTexts();
					$head.find('input[type=text]').wrap('<div class="entry"></div>').parent().prepend('<div class="helper">' + createIcon('magnifier') + '</div>');
					$table.find('.sorting, .sorting_asc, .sorting_desc').wrapInner(jQuery('<div class="parentsort" />')).find('.parentsort').append('<div class="sorticon" />');
				}
			});
		})();
	}
    
    /*==================
        Submenu
    ====================*/
    jQuery('.menu .with-submenu').each(function(){
        var $this = jQuery(this),
            $nav = $this.find('nav'),
            $a = $this.find('> a');
            
        if(!$this.is('.open, .active'))
            $nav.hide();
            
        $a.click(function(e){
            e.preventDefault();
            
            if($nav.is(':visible')){
                $nav.hide('slow');
                $this.removeClass('open');
            }else{
                $nav.show('slow').addClass('open');
                $this.addClass('open');
            }
        });
    });
    
	
	
    /*==================
        Widget
    ====================*/
	if(jQuery().accordion)
		jQuery('.accordion').accordion();
    
	if(jQuery().reportprogress){
		jQuery('.progressbar').each(function(){
			var $this = jQuery(this), opts = $this.metadata();
			
			$this.reportprogress(opts.value ? opts.value : 0);
		});
	}
	
    if(jQuery().slider){
		jQuery('.slider').each(function(){
			var opts = {}, $this = jQuery(this);
			if($this.attr('id')){
				opts.slide = function( event, ui ) {
					var value, before = '', after = '', value = '';
					
					if(opts.outputBefore){
						before = opts.outputBefore;
					}
					if(opts.outputAfter){
						after = opts.outputAfter;
					}
					
					if(opts.range){
						value = before + ui.values[0] + after + ' - ' + before + ui.values[1] + after;
					}else{
						value = before + ui.value + after;
					}
					
					jQuery('output[for=' + $this.attr('id') + ']').html( value );
				}
			}
			
			opts = $.extend({}, opts, $this.metadata());
			$this.slider(opts);
		});
	}
	
	jQuery('article.item').each(function(){
		var $this = jQuery(this), $content = $this.find('.content .inner');
		
		$this.find('header figure').mouseover(function(){
			jQuery(this).stop(true, true).animate({top: '-10px'}, 'fast');
		}).mouseleave(function(){
			jQuery(this).animate({top: 0}, 'fast');
		});
		
		if(!$this.is('.open'))
			$content.hide();
			
		if($this.is('.minimizable')){
			var $minimize = jQuery('<a href="#" class="minimize"><span class="glyph sort"></span></a>');
			$this.append($minimize);
			$minimize.wrapAll('<div class="minimize-wrap"></div>');
			$minimize.click(function(e){
				if($this.is('.open')){
					$content.slideUp()
					$this.removeClass('open');
				}else{
					var height = $content.show().height();
					$content.hide().css({display: 'block', overflow: 'hidden', height: 0}).animate({height: height}, function(){ $content.css('height', 'auto'); });
					$this.addClass('open');
				}
				e.preventDefault();
			});
		}
		
	});
	
	jQuery('article.item .with-submenu ul, .list.collapsable .with-submenu ul').hide().parent().mouseenter(function(){
		jQuery(this).find('ul').stop(true, true).fadeIn('fast');
	}).mouseleave(function(){
		jQuery(this).find('ul').hide('drop', { direction: 'up' }, 'fast');
	});;
	
    if(jQuery().sparkline){
		jQuery('.sparkline').each(function(){
			jQuery(this).sparkline(jQuery(this).metadata().values, {type: 'bar', barColor: '#729F00', negBarColor: '#B70000', height: '10px'});
		});
	}
	
	applyWidgets();
	
    jQuery('.icon[data-icon]').each(function(){
        var $this = jQuery(this),
            path = basePathIcons + $this.attr('data-icon') + '.png';
        
        $this.css({backgroundImage: 'url(' + path + ')'});
    });
    
	(function(){
		function niceEffect($move){
			$move.mouseenter(function(){
				$move.animate({fontSize: '+=10px', left: '-=5px', opacity: 1}, 'fast');
			}).mouseleave(function(){
				$move.animate({fontSize: '-=10px', left: '+=5px', opacity: .5}, 'fast');
			});
			return $move;
		}
		
		function niceDismiss($el){
			$el.hide('scale', function(){
				$el.show().css('opacity', 0).hide('slow', function(){
					$el.remove();
				});
			});
		}
		
		function niceAdmission($el, fnComplete){
			$el.hide().show('scale', 'slow', fnComplete);
		}
		
		jQuery('.gallery-list').addClass('no-overlay');
		var applyInList = function(){
			jQuery('.gallery-list li').each(function(){
				if(!jQuery(this).data('original')){
					var $this = jQuery(this), $actions = $this.find('.actions').hide(), $caption = $this.find('figcaption').hide();
					var $move = jQuery('<a />', {title: 'Drag', draggable: 'true'}).html('<span class="glyph move"></span>').hide();
					var $overlay = jQuery('<div class="overlay" />').hide();
					
					$this.data('original', $this.clone(true));
					
					$this.find('figure').after($move).before($overlay);
					niceEffect($move.css('top', '-=30px'));
					applyTooltip();
					$this.mouseenter(function(){
						$move.stop(true, true).show().animate({top: '+=30px'}, 'fast');
						$actions.fadeIn();
						$overlay.fadeTo('normal', .7);
						$caption.fadeIn();
					}).mouseleave(function(){
						$move.stop(true, true).animate({top: '-=30px', opacity: 'hide'}, 'fast');
						$actions.fadeOut();
						$overlay.fadeOut();
						$caption.fadeOut();
					});
					
					$this.draggable({
						handle: 'a[draggable]',
						revert: 'invalid',
						helper: 'clone',
						cursor: 'move'
					});
				}
			});
		}
		applyInList();
		
		if(jQuery().disableSelection)
			jQuery('.bin').disableSelection();
			
		jQuery('.bin').droppable({
			activeClass: 'ui-state-hover',
			accept: '.gallery-list li',
			drop: function( event, ui ) {
				var $originalLi = jQuery(ui.draggable), $backupLi = $originalLi.data('original'), $binLi = $originalLi.clone(), $icon = jQuery('<span class="glyph zoom-out" />');
				jQuery(this).find('.delete-all .text').show('slow');
				niceDismiss($originalLi);
				jQuery('.bin ul').prepend($binLi);
				$binLi.find('figcaption, a[draggable], .overlay, .actions').remove().end().find('article').append($icon).end().data('original', $backupLi);
				niceAdmission($binLi);
				niceEffect($icon).click(function(){
					var $c = $backupLi.clone(true);
					jQuery('.gallery-list').prepend($backupLi);
					niceAdmission($backupLi, function(){
						$backupLi.after($c).remove();
						applyInList();
					});
					niceDismiss($binLi);
				});
			}
		}).find('.delete-all .text').hide();
	})();
	
	/*============
		Tasks
	==============*/
	jQuery('.tasks :checkbox').each(function(){
		var $this = jQuery(this), $li = $this.closest('li');
		if($this.prop('checked'))
			$li.addClass('done');
			
		$this.click(function(){
			$li.toggleClass('done');
		});
	});
	
	/*============
		Users
	==============*/
	jQuery('.users [data-icon="light-bulb"], .users [data-icon="light-bulb-off"], .posts [data-icon="light-bulb"], .posts [data-icon="light-bulb-off"]').each(function(){
		var $this = jQuery(this), $li = $this.closest('li'), isOn = $this.is('[data-icon="light-bulb-off"]');
		
		if(isOn)
			$li.addClass('inactive');
			
		leave = function(){
			jQuery(this).prev().show().next().remove();
		}
		$this.mouseover(function(){
			var $icon;
			if(!isOn)
				$icon = jQuery(createIcon('light-bulb-off'));
			else
				$icon = jQuery(createIcon('light-bulb'));
			
			
			$icon.mouseleave(leave);
			$this.hide().after($icon);
		});
	});
	
	/*============
		Notifications
	==============*/
	// air
	jQuery('.air').mouseenter(function(){
		jQuery(this).stop(true, true).animate({opacity: 1});
	}).mouseleave(function(){
		jQuery(this).animate({opacity: .85});
	});

	// close notification
	jQuery('.notification .close').click(function(e){
		jQuery(this).closest('.notification').slideUp(function(){
			jQuery(this).remove();
		});
		e.preventDefault();
	});

    /*==================
        Miscellaneous
    ====================*/
	if (typeof Shadowbox != 'undefined') {
		Shadowbox.init();
	}
	
	if(jQuery().fullCalendar){
		// full calendar
		jQuery('.fullcalendar').fullCalendar({
			editable: true,
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			}
		});
	}
	if(jQuery().elfinder){
		// filemanger
		jQuery('.filemanager').elfinder({
			url : 'connectors/php/connector.php',
			toolbar : [
				['back', 'reload'],
				['select', 'open'],
				['quicklook', 'rename'],
				['resize', 'icons', 'list']
			],
			contextmenu : {
				cwd : ['reload', 'delim', 'info'], 
				file : ['select', 'open', 'rename'], 
			}
		});
	}
	
    jQuery('.set .field:nth-child(even), article.item .inner li:nth-child(even)').addClass('even');
	jQuery('article.item .inner .two li:nth-child(odd)').addClass('odd');
    jQuery('.set .field:last-child, .check-list.button-skin label:last-child, .statistics li:last-child, .pagination li:last-child').addClass('last')
	jQuery('.single nav a').click(function(e){
		if(jQuery(this).attr('href') == '#')
			e.preventDefault();
	});
	
	jQuery('.collapsable.list > li').each(function(){
		var $this = jQuery(this), $section = $this.find('section');
		if(!$this.is('.open'))
			$section.hide();
			
		$this.find('h3 a').click(function(e){ e.preventDefault(); });
		$this.find('header').click(function(){
			if($this.is('.open')){
				$this.removeClass('open').find('section').slideUp();
			}else{
				$this.siblings('.open').removeClass('open').find('section').slideUp();
				$section.slideDown();
				$this.addClass('open');
			}
		}).css('cursor', 'pointer');
	});
	
	jQuery('.statistics li').each(function(){
		var $this = jQuery(this), $all = $this.find('> *');
		$this.mouseenter(function(){
			if(!$this.is('.active'))
				$all.stop(true, true).css('position', 'relative').animate({top: '-5px'});
		}).mouseleave(function(){
			$all.animate({top: '0'}, function(){ jQuery(this).css('position', 'static'); });
		}).click(function(){
			jQuery('.statistics .charts > :eq(' + jQuery('.statistics li.active').index() + ')').hide();
			var c = jQuery('.statistics .charts > :eq(' + $this.index() + ')').show();
			$this.addClass('active').siblings().removeClass('active');
			
			if(c.data('plot')){
				c.data('plot').replot( { resetAxes: true } );
				}
		});
	});
	setTimeout(function(){ jQuery('.statistics .charts > :eq(' + jQuery('.statistics li.active').index() + ')').siblings().hide(); }, 500);
});

function applyAll(){
	applyDatepicker();
	applyWidgets();
	applyForm();
	applyTooltip();
	applyModal();
}

function applyDatepicker(){
    jQuery('input.datepicker:not(.js-init)').each(function(){
        var $this = jQuery(this), options = {};
		$this.addClass('js-init')
        if($this.is('.inline')){
            var other = jQuery('<div />', {'class': 'datepicker'});
            $this.after(other).hide();
            options.altField = $this;
            $this = other;
        }
        $this.datepicker(options);
    });
}

function applyForm(){
	if(jQuery().uniform){
		jQuery(':checkbox:not(.js-init)').each(function(){
			if(!jQuery(this).addClass('js-init').closest('.check-list')[0] && !jQuery(this).closest('.check-list').is('.grey-skin'))
				jQuery(this).uniform();
		});
		
		jQuery('.search select:not(.js-init), .widget select:not(.js-init, .chosen, .spinner-skin, .no-ui, .multiselect), .page-status select:not(.js-init, .chosen, .spinner-skin, .no-ui, .multiselect), .check-list:not(.js-init, .grey-skin, .button-skin, .no-ui) :checkbox, .check-list:not(.js-init, .grey-skin, .button-skin, .no-ui) :radio').each(function(){
			jQuery(this).addClass('js-init').uniform();
		});
		
		jQuery('.grey-skin :radio:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').uniform({radioClass: 'radio grey-skin'});
		});
		
		jQuery('.grey-skin :checkbox:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').uniform({checkboxClass: 'checker grey-skin'});
		});
		jQuery('.widget select.spinner-skin:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').uniform({selectClass: 'selector spinner-skin'});
		});
		
		
		jQuery('.widget :file:not(.no-ui, .js-init)').each(function(){
			var $this = jQuery(this).addClass('js-init');
			$this.uniform();
			var $parent = $this.parent().mousemove(function(e){
				if(!jQuery(e.target).is('input')){
					$this.css({
						left: e.pageX - $parent.offset().left - $this.width() + 15,
						top: e.pageY - $parent.offset().top - 15
					});
				}
			});
		});
	}
	
    
    jQuery('.button-skin label :checkbox, .button-skin label :radio').hide();
    jQuery('.button-skin > label:not(.js-init)').each(function(){
        var $this = jQuery(this).addClass('js-init'),
            $input = $this.find(':radio, :checkbox'),
            is = $input.prop('checked'),
            disabled = $input.prop('disabled');
            
        $this.disableSelection();
        
        if(disabled){
            $this.addClass('disabled')
        }else{
            $this.removeClass('disabled');
        }
        
        if(is){
            $this.addClass('checked')
        }else{
            $this.removeClass('checked');
        }
        
        $this.click(function(e){
            if(!$this.is('.disabled') && jQuery(e.target).is('label')){
                if($input.is(':radio') && !$this.is('.checked')){
                    $this.toggleClass('checked');
                    jQuery(':radio[name="' + $input.attr('name') + '"]').not($input).not('[disabled]').parent().toggleClass('checked');
                }else if($input.is(':checkbox')){
                    $this.toggleClass('checked');
                }
            }
        });
    });
	
    if(jQuery().chosen)
		jQuery('select.chosen:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').chosen();
		});
		
	if(jQuery().spinner)
		jQuery('.spinner:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').spinner();
		});
		
	if(jQuery().multiselect)
		jQuery('.multiselect:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').multiselect();
		});
		
	if(jQuery().elastic)
		jQuery('.elastic:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').elastic();
		});
		
	if(jQuery().miniColors){
		jQuery('.colorpicker:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').miniColors();
		});
		
		jQuery('.miniColors-trigger:not(.js-init)').each(function(){
			var $this = jQuery(this).addClass('js-init');
			if($this.prev().is('input[type=text]')){
				$this.prev().css('float', 'left').css('margin-right', -30);
				$this.css({position: 'relative', top: 3});
			}
		});
	}

	if(jQuery().mask){
		// masks
		jQuery.mask.definitions['~'] = '[+-]';
		jQuery('.mask-date').mask('99/99/9999');
		jQuery('.mask-phone').mask('(999) 999-9999');
		jQuery('.mask-phoneext').mask("(999) 999-9999? x99999");
		jQuery(".mask-tin").mask("99-9999999");
		jQuery(".mask-ssn").mask("999-99-9999");
		jQuery(".mask-product").mask("a*-999-a999",{placeholder:" "});
		jQuery(".mask-eyescript").mask("~9.99 ~9.99 999");
	}
	
	if(jQuery().elrte){
		// wysiwyg
		if($.browser.msie && $.browser.version < 9){
			jQuery('.editor').html('Content');
			jQuery('html').addClass('ie');
		}
		
		jQuery('textarea.editor:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').elrte({
				toolbar: 'normal',
				styleWithCSS : false,
				height: 250
			});
		});
	}
}

function applyWidgets() {
    jQuery('.widget:not(.js-init)').each(function(){
        var $this = jQuery(this),
            minimize,
            $content = $this.find('.content'),
            currentActiveTab = $this.find('> header nav li.active a').attr('href');
        $this.addClass('js-init');
        $content.find('> section:not(' + currentActiveTab + ')').hide();
            
        // open-close
        if($this.is('.minimizable')){
            minimize = jQuery('<div class="minimize" />').html('<span class="glyph zoom-out"></span>');
            $this.find('> header').append(minimize);
            
			minimize.click(function(){
				minimize.find('.glyph').toggleClass('zoom-out').toggleClass('zoom-in');
				$content.slideToggle();
				$this.toggleClass('close');
			});
			
			if($this.is('.close')){
				minimize.click();
			}
        }
		
        
        // change tabs
        $this.find('> header nav li a').click(function(e){
            var $self = jQuery(this), is = $self.is(jQuery('a[href=' + currentActiveTab + ']'));
            
            if($self.attr('href')[0] == '#'){
                var cur = jQuery(currentActiveTab);
                var origHeight = cur.css('height');
                cur.hide();
                currentActiveTab = $self.attr('href');
                cur = jQuery(currentActiveTab);
                var realHeight = cur.show().height(); cur.hide();
                $self.closest('nav').find('li').removeClass('active').filter($self.parent()).addClass('active');


                cur.show().css('opacity', 0).height(origHeight).animate({height: realHeight}, function(){
                    cur.height('auto').css('opacity', '1').hide().fadeIn();
                });
            
                e.preventDefault();
            }else if(is){
                e.preventDefault();
            }
        });
    });
}

function applyModal(){
	if(jQuery().modal){
		// open link as modal
		jQuery('.modal:not(.js-init)').each(function(){
			jQuery(this).addClass('js-init').click(function(e){
				var modal = jQuery(jQuery(this).attr('href')).modal({closeButton: '.widget .close'});
				e.preventDefault();
			});
		})
	}
}

function applyTooltip(){
	if(jQuery().tipsy){
		jQuery('.tooltip:not(.js-init)').each(function(){
			if(!jQuery(this).addClass('js-init').attr('original-title')){
				var gravity = jQuery(this).attr('data-position');

				if(!gravity)
					gravity = $.fn.tipsy.autoNS;
					
				jQuery(this).tipsy({gravity: gravity});
			}
		});
	}
}