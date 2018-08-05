import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

const styles = {
  containerTextStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
    color: color.black,
    marginLeft: 25.24
  },
  valueStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '200',
    color: 'rgba(65,65,65,1)',
    marginLeft: 25.24
  },
  iconStyle: {
    width: 44.47,
    height: 44.47
  },
  buttonMenuStyle: {
    marginTop: Style.PADDING - 5
  }
};

export default styles;
