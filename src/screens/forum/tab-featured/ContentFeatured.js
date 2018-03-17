import React from 'react';
import { ScrollView } from 'react-native';
import HTMLView from 'react-native-render-html';

import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

const htmlContent = `
  <div class="comment">
    <span class="c00">
      <b><i>&gt; Dwayne’s only companion at night was a Labrador retriever named Sparky.</i></b>
    <p>
    <i>Sparky could not wag his tail-because of an automobile accident many years ago, so he had no way of telling other dogs how friendly he was.
    He opened the door of the cage, something Bill couldn’t have done in a thousand years. Bill flew over to a windowsill.
    <b>The undippable flag was a beauty, and the anthem and the vacant motto might not have mattered much, if it weren’t for this: a lot of citizens were so ignored and cheated and insulted that they thought they might be in the wrong country, or even on the wrong planet, that some terrible mistake had been made.
    </p>
    <p>
      [1] <a href="https://code.facebook.com/posts/1505962329687926/flow-a-new-static-type-checker-for-javascript/" rel="nofollow">https://code.facebook.com/posts/1505962329687926/flow-a-new-...</a>
    </p>
    <img src="https://i.redd.it/1l01wjsv22my.jpg" width="400" height="400" />
    <h1>Dwayne’s only companion at night</h1>
    <h2>Dwayne’s only companion at night</h2>
    <h3>Dwayne’s only companion at night</h3>
    <h4>Dwayne’s only companion at night</h4>
    <h5>Dwayne’s only companion at night</h5>
    <h6>Dwayne’s only companion at night</h6>
    ayyy
    <iframe src="google.com" />
  </span>
</div>
`;

const ContentFeatured = () => (
	<ScrollView style={styles.containerStyle}>
		<HTMLView html={htmlContent} />
	</ScrollView>
);

const styles = {
	containerStyle: {
		flex: 1
	},
	cardSectionStyle: {
		backgroundColor: color.solitude,
		margin: 0
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		fontStyle: 'normal',
		paddingLeft: 10,
		paddingRight: 5,
		textAlign: 'justify'
	},
	borderLine: {
		borderBottomColor: color.midGray,
		borderBottomWidth: 2,
		opacity: 0.2,
		width: '90%',
		alignSelf: 'center',
		marginTop: 10
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE * 1.1,
		fontStyle: 'normal',
		padding: 10,
		textAlign: 'justify'
	},
	imageContent: {
		height: Style.DEVICE_WIDTH / 1.7,
		width: Style.DEVICE_WIDTH - 20
	}
};

export default ContentFeatured;
