# transitionsJS
JavaScript Library for controlling sliding elements on and off screen as the user scrolls down the page.

See a pretty demo here: www.designcortex.com

See a bare bones demo here: https://jsfiddle.net/nicholasdunbar/mvdjcm1j/4/

    //set up custom transitions
    var transitions = new Transitions();

    //set custom default easing functions
    transitions.setEaseIn('easeInOutQuint');
    transitions.setEaseOut('easeInOutQuint');

    //set up the elements to slide and the elements that will trigger the sliding
    transitions.addSlider('#strip-to-slide','#slide-in-while-scrolling-over-this');
    transitions.addSlider('#strip-to-slide2','#slide-in-while-scrolling-over-this2');

    //init scroller
    transitions.doScroll();
    //init scroll listener
    $(window).on
    (
            "scroll",
            transitions.doScroll
    );
			
