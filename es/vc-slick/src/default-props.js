import PropTypes from '../../_util/vue-types';
var defaultProps = {
  accessibility: PropTypes.looseBool.def(true),
  // 自定义高度
  adaptiveHeight: PropTypes.looseBool.def(false),
  afterChange: PropTypes.any.def(null),
  arrows: PropTypes.looseBool.def(true),
  autoplay: PropTypes.looseBool.def(false),
  autoplaySpeed: PropTypes.number.def(3000),
  beforeChange: PropTypes.any.def(null),
  centerMode: PropTypes.looseBool.def(false),
  centerPadding: PropTypes.string.def('50px'),
  cssEase: PropTypes.string.def('ease'),
  dots: PropTypes.looseBool.def(false),
  dotsClass: PropTypes.string.def('slick-dots'),
  draggable: PropTypes.looseBool.def(true),
  unslick: PropTypes.looseBool.def(false),
  easing: PropTypes.string.def('linear'),
  edgeFriction: PropTypes.number.def(0.35),
  fade: PropTypes.looseBool.def(false),
  focusOnSelect: PropTypes.looseBool.def(false),
  infinite: PropTypes.looseBool.def(true),
  initialSlide: PropTypes.number.def(0),
  lazyLoad: PropTypes.any.def(null),
  verticalSwiping: PropTypes.looseBool.def(false),
  asNavFor: PropTypes.any.def(null),
  // 圆点hover是否暂停
  pauseOnDotsHover: PropTypes.looseBool.def(false),
  // focus是否暂停
  pauseOnFocus: PropTypes.looseBool.def(false),
  // hover是否暂停
  pauseOnHover: PropTypes.looseBool.def(true),
  responsive: PropTypes.array,
  rows: PropTypes.number.def(1),
  rtl: PropTypes.looseBool.def(false),
  slide: PropTypes.string.def('div'),
  slidesPerRow: PropTypes.number.def(1),
  slidesToScroll: PropTypes.number.def(1),
  slidesToShow: PropTypes.number.def(1),
  speed: PropTypes.number.def(500),
  swipe: PropTypes.looseBool.def(true),
  swipeEvent: PropTypes.any.def(null),
  swipeToSlide: PropTypes.looseBool.def(false),
  touchMove: PropTypes.looseBool.def(true),
  touchThreshold: PropTypes.number.def(5),
  useCSS: PropTypes.looseBool.def(true),
  useTransform: PropTypes.looseBool.def(true),
  variableWidth: PropTypes.looseBool.def(false),
  vertical: PropTypes.looseBool.def(false),
  waitForAnimate: PropTypes.looseBool.def(true),
  children: PropTypes.array,
  __propsSymbol__: PropTypes.any
};
export default defaultProps;