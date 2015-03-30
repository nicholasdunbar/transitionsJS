	/**
	*	TITLE: Transitions 
	*	DESCRIPTION: A class for running different scroll transitions at different 
	*	points durring the scrolling of a web page
	*	built originally for use on the http://designcortex.com home page
	*	
	*	DEPENDANCIES: 
	*	1.) jQuery Easing v1.3 - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
	*	2.) jQuery v1.1
	*	
	*	AUTHOR: Nicholas G. Dunbar http://www.designcortex.com
	*	
	*/
	var Transitions = function Transitions() {
	
		/************************public members*************************/
		//var placeholder = Transitions.prototype.placeholder = null;
		
		
		/************************private methods*************************/
		//css selector that is currently tweening in
		var _currentSelectors = new Array();
		//css selectors for all the sliders and sections
		var _allSliderSelectors = new Array();
		//last registered distance between the document top and the viewport top
		var _lastScrollTop = 0;
		//the direction the user is scrolling
		var _direction;
		//this is the amount of space you have to scroll down before the slider eases in
		var _paddingBeforeScrollIn = 3;
		//default ease in algorithm, if none is specified
		var _easeIn = 'easeInOutQuint';
		//default ease out algorithm, if none is specified
		var _easeOut = 'easeInOutQuint';
		
		
		/**
		*	Hide all the slides
		*/
		var _hideAllSlideWrappers = function (){
			//hide all the sliders so that they can be shown when they scroll
			$('.wrapper').css('visibility','hidden');
		}

		/**
		*	Put the currently selected slide in the correct position based on
		*	its defined transition equation.
		*/
		var _doResizeWindow = function (eventObj){
			var key;
			var value;
			var wrapper;
			var slider;
			var sliderHeight;
			
			for(key in _currentSelectors){
				value = _currentSelectors[key];
				wrapper = value.wrapper;
				slider = value.slider;
				sliderHeight = $(slider).outerHeight()+_paddingBeforeScrollIn;
				$(wrapper).css('top', -1*sliderHeight);
				$(wrapper).css( 'height', $(window).height()+(2*sliderHeight) );
			}
			doScroll(eventObj);
		}
		
		/**
		*	Determine if you are in the corse of scrolling by the element 
		*	with the ID selector, based on scrollPos 
		*/
		var _isInSlide = function(selector, scrollPos){
			var padding = parseInt($(selector).css('padding-top'))+parseInt($(selector).css('margin-top'));
			var top = $(selector).position().top+padding;
			var bottom = top+$(selector).outerHeight();
			
			return ( top <= scrollPos && bottom > scrollPos );
		}
		
		/**
		*	Place the element on the screen where it belongs based on 
		*	based on scrollPos and the contents of 
		*	the object transitionInfoObj
		*/
		var _doTween = function (transitionInfoObj, scrollPos){
	
			var selector = transitionInfoObj.slider;
			var slideSelector = transitionInfoObj.section;
			var customEaseIn = transitionInfoObj.customEaseIn;
			var customEaseOut = transitionInfoObj.customEaseOut;
			var customEaseInOut = transitionInfoObj.customEaseInOut;
			var htmlNode = transitionInfoObj.htmlNode;
			var sliderHeight;
			var delta;
			var padding;
			var startFromPoint;
			var tdelta;
			var t;
			var y;
			
			
			$(htmlNode).appendTo(selector+'_wrapper');
			$(selector).css('visibility','visible');
			$(selector+'_wrapper').css('visibility','visible');
			sliderHeight = $(selector).outerHeight()+_paddingBeforeScrollIn;
			$(selector+'_wrapper').css('top', -1*sliderHeight);
			$(selector+'_wrapper').css( 'height', $(window).height()+(2*sliderHeight) );
			
			delta = $(selector+'_wrapper').height()-$(selector).outerHeight();
			padding = parseInt($(slideSelector).css('padding-top'))+parseInt($(slideSelector).css('margin-top'));
			startFromPoint = $(slideSelector).position().top+padding;
			tdelta = $(slideSelector).outerHeight();
			t = scrollPos-startFromPoint;
			y = 0;
			
			if (t < 0){
				t = 0;
			}
			
			
			
			if (typeof customEaseInOut == 'function'){
				//EASE NOT DIVIDED UP INTO TWO 
				//t: current time, 0: begInnIng value, delta: change In value, tdelta: duration, _direction: UP or DOWN, selector: slide
				customEaseInOut(t, 0, delta, tdelta, _direction, selector);
			} else {
				if (t < tdelta/2){
					//EASE IN
					if (typeof customEaseIn == 'string' && $.easing.hasOwnProperty(customEaseIn)){
						// x:place holder, t: current time, b: begInnIng value, c: change In value, d: duration
						// function (x, t, b, c, d) 
						y = $.easing[customEaseIn](1, t, 0, delta/2, tdelta/2);
					} else if (typeof customEaseIn == 'function'){
						// t: current time, b: begInnIng value, c: change In value, d: duration
						// function (t, b, c, d) 
						y = customEaseIn(t, 0, delta/2, tdelta/2);
					} else {
						// x:place holder, t: current time, b: begInnIng value, c: change In value, d: duration
						// function (x, t, b, c, d) 
						y = $.easing[_easeIn](1, t, 0, delta/2, tdelta/2);
					}  
				} else {
					//EASE OUT
					if (typeof customEaseOut == 'string' && $.easing.hasOwnProperty(customEaseOut)){
						// x:place holder, t: current time, b: begInnIng value, c: change In value, d: duration
						// function (x, t, b, c, d) 
						y = $.easing[customEaseOut](1, t, 0, delta/2, tdelta/2);
					} else if (typeof customEaseOut == 'function'){
						// t: current time, b: begInnIng value, c: change In value, d: duration
						// function (t, b, c, d) 
						y = customEaseOut(t, 0, delta/2, tdelta/2);
					} else {
						// x:place holder, t: current time, b: begInnIng value, c: change In value, d: duration
						// function (x, t, b, c, d) 
						y = $.easing[_easeOut](1, t-(tdelta/2), delta/2, delta/2, tdelta/2);
					}
				}
				//set transition
				$(selector).css('top',y);
			} 
			
				
		}
	
		
		
		
		/************************public members*************************/
		//var placeholder = this.placeholder = "";
		
		/************************public members constants**************/
		var UP = this.UP = "up";
		var DOWN = this.DOWN = "down";
		
		/************************public methods*************************/
		/**
		*	Used to set the easing algorithm used in the tween which 
		*	eases the content in from the top to the middle as you scroll
		*	down the screen or from the middle to off the top of the screen
		*	as you scroll up.
		*
		*	@param algorithName string
		*	One of the names of the jquery easing library functions
		*	a list of such functions can be found at the following URL:
		*	https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
		*/
		var setEaseIn = this.setEaseIn = function(algorithmName){
			_easeIn = algorithmName;
		}
		
		/**
		*	Used to set the easing algorithm used in the tween which 
		*	eases the content out of the screen from the middle to the bottom 
		*	as you scroll down the screen or from the bottom off the screen to 
		*	the middle as you scroll up.
		*
		*	@param algorithmName string
		*	One of the names of the jquery easing library functions
		*	a list of such functions can be found at the following URL:
		*	https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
		*/
		var setEaseOut = this.setEaseOut = function(algorithmName){
			_easeOut = algorithmName;
		}
		
		
		/**
		*	Add in a transition that will occur while scrolling from one section to the next 
		*	Example 1:
		*	transitions = new Transitions();
		*	transitions.addSlider('#quote1','#section-quote1', 'easeInQuint', 'easeOutQuint');
		*	
		*	#quote1 - is where we want to apply the animation ease equation,
		*	or in other words what we want to slide
		*	#section-quote1 - as we scroll by this element we want it to trigger the scrolling of #quote1
		*	easeInQuint - the ease equation we want to use while sliding #quote1  in
		* 	easeOutQuint - the ease equation we want to use while sliding #quote out of the screen
		*	
		*	Example 2:
		*	transitions = new Transitions();
		*	var topCustomInOutTransition = function (currentTime, beginningValue, changeInValue, durationTime, direction, sliderSelector) {
		*		//example of a linear transition
		*		var y = changeInValue*currentTime/durationTime + beginningValue;
		*		//define transform
		*		$(sliderSelector).css('top',y);
		*	}
		*	transitions.addSlider('#skills','#some-div-skills', null, null, topCustomInOutTransition);
		*	
		*	#skills - is the element we are transitioning,
		*	the same as in the #quote1 example
		*	#some-div-skills - same as above, but we will explain it differently to provide more information 
		*	as we scroll by this element when the top of it crosses the top of the window this triggers #skills
		*	to show up on the screen just above the window view port out of view, then as we scroll the
		* 	element #some-div-skills out of view, out of the top of the screen by scrolling down
		*	#some-div-skills will transition on to the screen according to its defined easing equation
		*	as #some-div-skills reaches the top of the view port the #skills element will scroll off the 
		*	screen as defined by its easing equation.
		*	null - the ease in equation is set to null because we are going to use a custom one
		* 	null - the ease out equation is set to null because we are going to use a custom one
		*	topCustomInOutTransition - this is the name of a function that defines our own custom equation to perform the transition
		*
		*	@param sliderSelector string 
		*	A CSS selector ID like you would see use in jQuery to select a unique element. Ex: $('#some-id').css('top');
		*	#some-id being the CSS ID. ThisID would refer to the element to which you want to apply the transition 
		*	@param sectionSelector string
		*	A CSS selector ID like you would see use in jQuery to select a unique element. Ex: $('#some-id').css('top');
		*	#some-id being the CSS ID. This ID would refer to the element that triggers the custom transition on the
		*	sliderSelector we refer to above
		*	@param customEaseIn string, function
		*	This can be a string or a function. 
		*	If it is a string it should be one of the supported equations in the jQuery easing plugin ($.easing)
		*	a list of them can be obtained here http://http://easings.net/
		*	If it is a function then the function needs to have the following API
		*	function (currentTime, beginningValue, changeInValue, durationTime)
		*	this function gets triggered on the FIRST half of the scrolling of sectionSelector
		*	@param customEaseOut string, function
		*	This can be a string or a function. 
		*	If it is a string it should be one of the supported equations in the jQuery easing plugin ($.easing)
		*	a list of them can be obtained here http://http://easings.net/
		*	If it is a function then the function needs to have the following API
		*	function (currentTime, beginningValue, changeInValue, durationTime)
		*	this function gets triggered on the SECOND half of the scrolling of sectionSelector
		*	@param customEaseInOut function
		*	This function makes it so the program ignores customEaseOut and customEaseIn and instead runs one
		* 	custom function through the entre scrolling by of sectionSelector. customEaseInOut must be of the following format:
		*	function (currentTime, beginningValue, changeInValue, durationTime, direction, sliderSelector) {
		*		y = insert equation here;
		*		$(sliderSelector).css('top',y);
		*	}
		*	currentTime - is where in the process of the transition are you
		*	beginningValue - is the location of the top of the transition space
		*	changeInValue - is the length of the total transition space
		*	durationTime - when currentTime == durationTime then the full transition should be complete
		*	direction - which way is being scrolled see the following for the correct constants:
		*	Transitions.prototype.UP
		*	Transitions.prototype.DOWN
		*	sliderSelector - The jQuery style css ID selector for what is being transitioned
		*/
		var addSlider = this.addSlider = function(sliderSelector, sectionSelector, customEaseIn, customEaseOut, customEaseInOut){
			var wrapper = sliderSelector+'_wrapper';
			wrapper = wrapper.replace('#','');
			$('body').prepend('<div id="'+wrapper+'" class="wrapper"></div>');
			$(sliderSelector).addClass('sliders');
			htmlNode = $(sliderSelector).detach();
			_allSliderSelectors.push
			(
				{
					'slider':						sliderSelector, 
					'section':						sectionSelector, 
					'customEaseIn':			customEaseIn,
					'customEaseOut':		customEaseOut,
					'customEaseInOut': 	customEaseInOut,
					'htmlNode':					htmlNode,
					'inDOM':						false
				}
			);
			
		}
		/**
		*	Callback to bind to the mouse wheel and scrolling event. 
		*	You will have to bind this to the scroll event manually like the following:
		*	$(window).on
		*	(
		*		"scroll",
		*		transitions.doScroll
		*	);
		*
		*	@param eventObj
		*	Event object that jquery generates
		*/
		var doScroll = this.doScroll = function(eventObj){
	
			var thingToMove;
			var slideSelector;
			var scrollPos = $(document).scrollTop();
			var key;
			var value;
			var htmlNode;
			var inDOM;
			
			
			_hideAllSlideWrappers();
			_currentSelectors = null;
			_currentSelectors = new Array();
			
			if (scrollPos > _lastScrollTop){
			   // downscroll code
			   _direction = DOWN;
			} else {
			  // upscroll code
			  _direction = UP;
			}
			_lastScrollTop = scrollPos;
			
			for (key in _allSliderSelectors){
				value = _allSliderSelectors[key];
				thingToMove = value.slider;
				slideSelector = value.section;
				htmlNode = value.htmlNode;
				inDOM = value.inDOM;
				
				if (_isInSlide(slideSelector, scrollPos)){
					_allSliderSelectors[key].inDOM = true;
					_currentSelectors.push({'slider':thingToMove, 'wrapper':thingToMove+'_wrapper'});
					 _doTween(value, scrollPos);
				} else if (inDOM){	
					_allSliderSelectors[key].htmlNode = $(thingToMove).detach();
					_allSliderSelectors[key].inDOM = false;
				}
			}
			
			
		}
		
		/************************constructor*******************************/
		//set up repositioning callback
		$(window).resize(_doResizeWindow);
		//init slide states
		_hideAllSlideWrappers();
	}
	
	//define interface
	Transitions.prototype.UP = null;
	Transitions.prototype.DOWN = null;
	Transitions.prototype.setEaseIn = null;
	Transitions.prototype.setEaseOut = null;
	Transitions.prototype.doScroll = null;
	Transitions.prototype.addSlider = null;