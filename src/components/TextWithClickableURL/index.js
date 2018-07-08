import React from 'react';
import {Text, Linking} from 'react-native';

export const TextWithClickableURL = ({ inputText }) => {
  let text = ''.concat(inputText);

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  class RegExp1 extends RegExp {
    [Symbol.match](str) {
      return RegExp.prototype[Symbol.match].call(this, str);
    }
  }

  var urlList = text.match(new RegExp1(expression)) || [];

  var result = []

  // split the string
  for (let index = 0; index <= urlList.length; index++) {
    if (index !== urlList.length) {
      let item = urlList[index]
      let indexURL = text.indexOf(item)
      let res = text.slice(0, indexURL)
      if (res !== '') {
        result.push(text.slice(0, indexURL))
      }
      text = text.slice(indexURL + item.length)
      result.push(item)
    } else if (text !== '') {
      result.push(text)
    }
  }

  let finalResult = []

  let idx = 0
  result.forEach((item) => {
    if (item === urlList[idx]) {
       finalResult.push(
         <Text
          style={{
            color:'#252C68',
            textDecorationLine: 'underline'
          }}
          onPress={() => {
            let url = item.includes('https://') || item.includes('http://') ? item : `http://${item}`
            Linking.openURL(url)
          } }>
          {item}
         </Text>
       )
       idx++
    } else {
       finalResult.push(<Text>{item}</Text>)
    }
  })

  return finalResult
}
