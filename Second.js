import React,{
  Component,
  View,
  Text,
  StyleSheet,
  TouchableHightlight
} from 'react-native';

class Second extends Component{
  onButtonPress(){
    this.props.navigator.push({
      id:'Second'
    });
  }
  render(){
    return(
      <View style={styles.container}>
      <Text>
      cheangdkoeko
      </Text>

      </View>
    )
  }
}

const style= StyleSheet.create({
  flex: 1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: 'red'
});


module.export = Second;
