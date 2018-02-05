import React from 'react';
import { StyleSheet, Text, View, Button, WebView, Alert, Image, TouchableOpacity, ListView} from 'react-native';
import { StackNavigator } from 'react-navigation';



const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class WebScreen extends React.Component {
	constructor(props){
		super(props)
		this.name = this.props.navigation.state.params.name;

	}
  static navigationOptions = {
    title: 'WebView',
  };
  render() {
		console.warn(this.name)
    return (
      <View style={styles.container1}>

			<WebView
			style={styles.video}
        source={{uri: this.name}}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
			   flex: 1,

  },
	container1:{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',


	},
	container2:{
				flex: 1,
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 30,
				width: width - 20,


	},
	container3:{
				flex: 1,
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
				marginVertical: 30,
				width: width - 20,


	},
	end:{
				flex: 1 ,
				alignItems: 'flex-end',
				justifyContent: 'flex-end'
	},
	preview: {
				flex: 6,
				marginTop: 5,
				justifyContent: 'center',
				alignItems: 'center'
			},
	video: {
    		marginVertical: 10,
    		width: width - 5,
    		flex: 1
  },
	buttonText: {
		fontSize: 20,
    padding: 20,
    color: 'darkblue'
  }

});

export default WebScreen;
