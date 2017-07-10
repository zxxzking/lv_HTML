// SETTINGS
@import "compass/css3/transform";
@import "compass/css3/flexbox";

// COLOR VARIABLES
$c-01: #72bfd1; // Blue
$c-02: #fff; // White
$c-03: rgba($c-02, 0.6); // Baby Blue

// SIZE VARIABLES
$width--lg: 240px; // Resize boat by editing only this variable
$width--sm: $width--lg * 0.67;
$half--sm: $width--sm / 2;
$triangle_top: $width--sm * 0.86567164;
$border: $width--lg / 100;


// LAYOUT
body {
  background-color: $c-01;
}

// PATTERNS
.p {
  &-triangle {
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  &-scalane {
    border-width: 0 $half--sm $width--lg $half--sm;
    border-color: transparent transparent $c-03 transparent;
    
    &--sm {
      backface-visibility: hidden;
      border-width: 0 ($half--sm / 4) ($width--lg / 4) ($half--sm / 4);
      border-color: transparent transparent $c-02 transparent;
    }
  }
  
  &-equilateral {
    border-width: $triangle_top $half--sm 0 $half--sm;
    border-color: $c-02 transparent transparent transparent;
  }
  
  &-flex {
    @include display-flex;
    @include justify-content(center);
  }
}

// ILLUSTRATION
.boat {
  animation: sail_away 2s 2s ease-in-out alternate 40;
  width: $width--lg * 2;
  margin: 10% auto;

  &__top {
    position: relative;
  
    &-flagpole {
      width: $width--sm;
      height: $width--lg;
      border-left: $border solid $c-02;
      margin-left: -($border / 2);
      position: absolute;
      top: $border / 2;
      left: 50%;
        
      > .p-scalane--sm {
        @include transform(rotate(90deg));
        animation: flag 2s ease-in forwards;
        position: absolute;
        top: -($border * 5); // Fallback if no CSS animation support
        left: $border * 3;
      }
    }
  }
  
  &__bottom {        
    > .p-triangle {
      &:nth-child(even) {
        @include transform(rotateX(180deg) translateY(-$half--sm));
        border-top-color: $c-03;
        margin: 0 -($half--sm + 1);
      }
    }
  }
}

// ANIMATIONS
@keyframes flag {
  from {
   top: 100%; 
  }
  to {
    top: -($border * 5);
  }
}

@keyframes sail_away {
  50% {
    @include transform(rotate(2deg) translate(20px));
  }
  100% {
    @include transform(rotate(-3deg) translate(-10px));
  }
}