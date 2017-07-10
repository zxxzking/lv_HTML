(function(Proton, undefined) {
    /**
     * The Ease class provides a collection of easing functions for use with Proton
     */
    var ease = ease || {
        easeLinear: function(value) {
            return value;
        },

        easeInQuad: function(value) {
            return Math.pow(value, 2);
        },

        easeOutQuad: function(value) {
            return -(Math.pow((value - 1), 2) - 1);
        },

        easeInOutQuad: function(value) {
            if ((value /= 0.5) < 1)
                return 0.5 * Math.pow(value, 2);
            return -0.5 * ((value -= 2) * value - 2);
        },

        easeInCubic: function(value) {
            return Math.pow(value, 3);
        },

        easeOutCubic: function(value) {
            return (Math.pow((value - 1), 3) + 1);
        },

        easeInOutCubic: function(value) {
            if ((value /= 0.5) < 1)
                return 0.5 * Math.pow(value, 3);
            return 0.5 * (Math.pow((value - 2), 3) + 2);
        },

        easeInQuart: function(value) {
            return Math.pow(value, 4);
        },

        easeOutQuart: function(value) {
            return -(Math.pow((value - 1), 4) - 1);
        },

        easeInOutQuart: function(value) {
            if ((value /= 0.5) < 1)
                return 0.5 * Math.pow(value, 4);
            return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
        },

        easeInSine: function(value) {
            return -Math.cos(value * (Proton.PI / 2)) + 1;
        },

        easeOutSine: function(value) {
            return Math.sin(value * (Proton.PI / 2));
        },

        easeInOutSine: function(value) {
            return (-0.5 * (Math.cos(Proton.PI * value) - 1));
        },

        easeInExpo: function(value) {
            return (value === 0) ? 0 : Math.pow(2, 10 * (value - 1));
        },

        easeOutExpo: function(value) {
            return (value === 1) ? 1 : -Math.pow(2, -10 * value) + 1;
        },

        easeInOutExpo: function(value) {
            if (value === 0)
                return 0;
            if (value === 1)
                return 1;
            if ((value /= 0.5) < 1)
                return 0.5 * Math.pow(2, 10 * (value - 1));
            return 0.5 * (-Math.pow(2, -10 * --value) + 2);
        },

        easeInCirc: function(value) {
            return -(Math.sqrt(1 - (value * value)) - 1);
        },

        easeOutCirc: function(value) {
            return Math.sqrt(1 - Math.pow((value - 1), 2));
        },

        easeInOutCirc: function(value) {
            if ((value /= 0.5) < 1)
                return -0.5 * (Math.sqrt(1 - value * value) - 1);
            return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
        },

        easeInBack: function(value) {
            var s = 1.70158;
            return (value) * value * ((s + 1) * value - s);
        },

        easeOutBack: function(value) {
            var s = 1.70158;
            return (value = value - 1) * value * ((s + 1) * value + s) + 1;
        },

        easeInOutBack: function(value) {
            var s = 1.70158;
            if ((value /= 0.5) < 1)
                return 0.5 * (value * value * (((s *= (1.525)) + 1) * value - s));
            return 0.5 * ((value -= 2) * value * (((s *= (1.525)) + 1) * value + s) + 2);
        },

        setEasingByName: function(easeName) {
            if (!!ease[easeName])
                return ease[easeName];
            else
                return ease.easeLinear;
        }
    }


    for (var id in ease) {
        if (id != "setEasingByName") Proton[id] = ease[id];
    }

    Proton.ease = ease;

})(Proton);
