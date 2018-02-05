import React from 'react';
import { StyleSheet, Text, View, Button, WebView, Alert, Image, TouchableOpacity, ListView} from 'react-native';
import { StackNavigator } from 'react-navigation';

import WebScreen from './WebScreen'
import ScanScreen from './ScanScreen'
import MainScreen from './MainScreen'

const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




class ListScreen extends React.Component {
	constructor() {
	    super();
	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
	    };
	  }
  static navigationOptions = {
    title: 'Other function',
  };
  render() {
		console.warn(this.name)
    return (
      <View style={styles.container1}>
			<ListView
			 dataSource={this.state.dataSource}
			 renderRow={(rowData) => <Text>{rowData}</Text>}
		 />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
				Main: { screen: MainScreen },
			  Scan: { screen: ScanScreen },
			  Web: { screen: WebScreen },
				List: { screen: ListScreen }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp/>;
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
    		width: 360,
    		flex: 1
  },
	buttonText: {
		fontSize: 20,
    padding: 20,
    color: 'darkblue'
  }

});
