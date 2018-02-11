**CLONE THIS PROJECT FROM REPOSITORY**

### Version :
* [react : 16.2.0 ](https://reactjs.org/)

* [react-native : 0.53.0](https://facebook.github.io/react-native/)

        $ git clone https://YOUR_USERNAME@bitbucket.org/techgs/temandiabetes-mobile.git && temandiabetes-mobile
        $ npm install

---

COMPONENT REUSABLE : 

* [Card](https://bitbucket.org/techgs/temandiabetes-mobile/overview#markdown-header-card)

---

## ESLint Setup

* EsLint setup with **VSCode**.

        $ npm install -g eslint
        $ npm install --save-dev eslint-config-rallycoding

    create new file .eslintrc in your project
    
        {
            "extends": "rallycoding"
        }

    Install eslint extension from editor VSCode

![Scheme](./eslintVsCode.png)


* EsLint setup with **ATOM**.

    Install eslint extention from editor ATOM
![Scheme](./eslintAtom.png)

        $ npm install --save-dev eslint-config-rallycoding 
    
    create new file .eslintrc in yout project.
    
        {
            "extends": "rallycoding"
        }

---

## Card

    import { Card, CardSection, Button, TextField } from '../../components';

    <View style={styles.container}>
	    <Card>
		    <CardSection>
			    <Text style={styles.text}>ON BOARDING</Text>
		    </CardSection>
	    </Card>
    </View>

---

## LIBRARIES
* [react-native-navigation](https://wix.github.io/react-native-navigation/#/)