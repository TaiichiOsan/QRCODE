import React,{
  Component,
  View,
  Text,
  StyleSheet,
  TouchableHightlight
} from 'react-native';

class First extends Component{
  onButtonPress(){
    this.props.navigator.push({
      id:'Second'
    })
  }
  render(){
    return(
      <View>
      <Text>
      eieiei
      </Text>
      <TouchableHightlight onPress={this.onButtonPress.bind(this)} >
      <Text>
      kikikiki
      </Text>
      </TouchableHightlight>
      </View>
    )
  }
}
