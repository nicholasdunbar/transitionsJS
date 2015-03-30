# transitionsJS
JavaScript Library for controlling sliding elements on and off screen as the user scrolls down the page.

See a demo here: www.designcortex.com

    //set up custom transitions
    var transitions = new Transitions();
    //set custom default easing functions
    transitions.setEaseIn('easeInOutQuint');
    transitions.setEaseOut('easeInOutQuint');


    transitions.addSlider('#strip-to-slide','#slide-in-while-scrolling-over-this');
    transitions.addSlider('#strip-to-slide2','#slide-in-while-scrolling-over-this2');
    transitions.addSlider('#quote2','#section-quote2');
    //init scroller
    transitions.doScroll();
    //init scroll listener
    $(window).on
    (
            "scroll",
            transitions.doScroll
    );
			
