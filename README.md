# transitionsJS
JavaScript Library for controlling sliding elements on and off screen as the user scrolls down the page.

Examples:

Pretty demo (what's possible): www.designcortex.com

Bare bones demo: https://jsfiddle.net/nicholasdunbar/ps2yypmp/2/

Custom transition/easing function: https://jsfiddle.net/nicholasdunbar/hzz9Ln19/

Custom transition/easing function for one specific transition: 

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
			
