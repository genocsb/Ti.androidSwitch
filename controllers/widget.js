// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.setValue = function( value ) {
	$.value = value;
};
$.getValue = function( value ) {
	return $.value;
};

const animationDuration = 200;
const disableTrackBallColor = "#b9b9b9",
	disableBackgroundColor = "#d6d6d6",
	enableTrackBallColor = "#009999",
	enableBackgroundColor = "#67cfc5";

args.left != undefined && $.container.setLeft( args.left );
args.right != undefined && $.container.setRight( args.right );
args.top != undefined && $.container.setTop( args.top );
args.bottom != undefined && $.container.setBottom( args.bottom );

args.bubbleParent != undefined && $.container.setBubbleParent( args.bubbleParent );
args.touchEnabled != undefined && $.container.setTouchEnabled( args.touchEnabled );

$.background.backgroundColor = disableBackgroundColor;
$.trackBall.backgroundColor = disableTrackBallColor;

var lastValue = false;


Object.defineProperty( $, "value", {
	get: function() {
		return this._name;
	},
	set: function( val ) {
		this._name = val;
		onChangeValueAnimate();
	}
} );
$.value = args.value === true;




function onClick() {
	if( !$.container.touchEnabled ) {
		return;
	}
	$.value = !$.value;
}

function onChangeValueAnimate() {
	if( $.value == lastValue ) {
		return;
	}
	lastValue = $.value;
	var params = {};
	if( $.value ) {
		params = {
			trackBall: enableTrackBallColor,
			leftTrackBall: 16,
			background: enableBackgroundColor
		};
	} else {
		params = {
			trackBall: disableTrackBallColor,
			leftTrackBall: 0,
			background: disableBackgroundColor
		};
	}

	$.trackBall.animate( {
		backgroundColor: params.trackBall,
		duration: animationDuration
	} );

	$.background.animate( {
		backgroundColor: params.background,
		duration: animationDuration
	} );

	$.trackBallContainer.animate( {
		left: params.leftTrackBall,
		duration: animationDuration
	}, forceUI );
}

function forceUI() {
	if( $.value ) {
		params = {
			trackBall: enableTrackBallColor,
			leftTrackBall: 16,
			background: enableBackgroundColor
		};
	} else {
		params = {
			trackBall: disableTrackBallColor,
			leftTrackBall: 0,
			background: disableBackgroundColor
		};
	}
	$.trackBall.backgroundColor = params.trackBall;
	$.background.backgroundColor = params.background;
	$.trackBallContainer.left = params.leftTrackBall;
}
