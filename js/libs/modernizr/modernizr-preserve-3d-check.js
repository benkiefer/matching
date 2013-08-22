Modernizr.addTest('csstransformspreserve3d', function () {

  var prop,
	  val,
	  cssText,
	  ret;
 
  prop = 'transform-style';
  if ('webkitTransformStyle' in document.documentElement.style) {
	prop = '-webkit-' + prop;
  }
  val = 'preserve-3d';
  cssText = '#modernizr { ' + prop + ': ' + val + '; }';
 
  Modernizr.testStyles(cssText, function (el, rule) {
	ret = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
  });
 
  return (ret === val);
});
