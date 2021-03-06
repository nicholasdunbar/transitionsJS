# transitionsJS
JavaScript Library for controlling sliding elements on and off 

the screen as the user scrolls up and down the page.

EXAMPLES:

Bare bones demo: 
https://jsfiddle.net/nicholasdunbar/ps2yypmp/12/

Custom transition/easing function: 
https://jsfiddle.net/nicholasdunbar/hzz9Ln19/

Custom transition/easing function for specific panels: 
https://jsfiddle.net/nicholasdunbar/7k217dt2/

Pretty demo (what's possible): 
www.designcortex.com


Here is a basic example of how the javascript looks:

    //set up transitions
    var transitions = new Transitions();

    //set default easing functions
    //To see the different easing functions in action go here: http://easings.net/
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

This is to give you an idea of how the basic code looks. 
Check out the JSFiddle examples above for an example of a full set up.

Some people call these "parallax" scrollers but in the truest sense of the word
paralax is a very specific visual effect. I only mention it here so that there
are more keywords in this description to help you find what your looking for
from google.
