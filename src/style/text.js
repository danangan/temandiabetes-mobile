import color from './color';
import Style from './defaultStyle';

const text = {
	p: {
		color: color.black,
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_SMALLER
  },
  title: {
    color: color.black,
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_TITLE
  },
  number: {
    color: color.black,
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_SMALLER
  },
  subTitle: {
    color: color.black,
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE
  },
  sectionTitle: {
    color: color.black,
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE_SMALL,
    fontWeight: '700'
  },
  labelText: {
    color: color.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER
  }
};

export default text;
