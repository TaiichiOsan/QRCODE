import React from 'react';
import { StyleSheet, Text, View, Button, WebView, Alert, Image, TouchableOpacity, ListView} from 'react-native';
import { StackNavigator } from 'react-navigation';

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



const styles = StyleSheet.create({
	container1:{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',


	},
	
});
export default ListScreen;
