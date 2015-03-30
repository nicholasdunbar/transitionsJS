# transitionsJS
JavaScript Library for controlling sliding elements on and off screen as the user scrolls down the page


			
			//example of extending the easing library
			$.easing.linearTween = function (x, t, b, c, d) {
				return c*t/d + b;
			};
			
			//set up custom transitions
			var transitions = new Transitions();
			//set custom default easing functions
			transitions.setEaseIn('easeInOutQuint');
			transitions.setEaseOut('easeInOutQuint');
			//create custom transition for the first screen
			topCustomInOutTransition = function (currentTime, beginningValue, changeInValue, durationTime, direction, sliderSelector) {
				var sliderHeight = $(sliderSelector).outerHeight();
				var centerPoint = ($(window).height()-sliderHeight) / 2;
				changeInValue = centerPoint+sliderHeight+5;
				beginningValue = centerPoint+sliderHeight;
				var y = $.easing.easeInOutQuint(1, ((currentTime/2)-150)+((durationTime/2)-150), beginningValue, changeInValue, durationTime);
				//define transform
				$(sliderSelector).css('top',y);
			}
			//define first element you want to slide and use a custom transition
			transitions.addSlider('#skills','#section-skills', null, null, topCustomInOutTransition);
			//define a second element you want to scroll using ease in and out equations from $.easing library
			transitions.addSlider('#quote1','#section-quote1', 'linearTween', 'easeInOutQuint');
			//define the other elements you want to scroll but use the ease equations defined in transitions.setEaseIn and transitions.setEaseOut
			transitions.addSlider('#brand-strip','#section-brand-strip');
			transitions.addSlider('#career-highlights','#section-career-highlights');
			transitions.addSlider('#quote2','#section-quote2');
			//create custom transition for the last screen
			bottomCustomInOutTransition = function (currentTime, beginningValue, changeInValue, durationTime, direction, sliderSelector) {
				var sliderHeight = $(sliderSelector).outerHeight();
				var centerPoint = ($(window).height()-sliderHeight) / 2;
				changeInValue = centerPoint+sliderHeight;
				var y = $.easing.easeInOutQuint(1, currentTime, beginningValue, changeInValue, durationTime/2);
				//define transform
				$(sliderSelector).css('top',y);
			}
			//define last element you want to slide and use a custom transition
			transitions.addSlider('#overview','#section-overview', null, null, bottomCustomInOutTransition);
			//init scroller
			transitions.doScroll();
			//init scroll listener
			$(window).on
			(
				"scroll",
				transitions.doScroll
			);
			
