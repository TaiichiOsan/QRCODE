import React from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         WebView,
         Alert,
         Image,
         TouchableOpacity,
         TouchableHighlight,
         ListView,
         Modal} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';
import WebScreen from './WebScreen'
import ScanScreen from './ScanScreen'
import ListScreen from './ListScreen'


const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class MainScreen extends React.Component {

  constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				aspect: Camera.constants.Aspect.fill,
				captureTarget: Camera.constants.CaptureTarget.cameraRoll,
				type: Camera.constants.Type.back,
				orientation: Camera.constants.Orientation.auto,
				flashMode: Camera.constants.FlashMode.auto,
				barcodeFinderVisible: true
			},
      cameratest: false,
      count: '',
			modalVisible: false,
		};
	}
   
  onBarCodeRead(scanResult) {
    this.setState({count: ''})
    if(this.state.count != scanResult.data){
			this.setState({pushlink: scanResult.data})
    	this.setState({count: "scanResult : " + scanResult.data})

    }
    else{

    }
		if (scanResult.data != null) {
			if (!this.barcodeCodes.includes(scanResult.data)) {
					this.barcodeCodes.push(scanResult.data);
          Alert.alert(
          'Result',
          scanResult.data,
          [

          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.BarcodeAttendace(scanResult.data)},

        ],
        { cancelable: false }
      )
				}
		}
		return;
	}
  BarcodeAttendace(scanResult){
    fetch(scanResult, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Taiichi osano',
    studnet_id: 26,
    attendance: true
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {

    });
  }

  openModal() {
      this.setState({modalVisible:true});
    }

    closeModal() {
      this.setState({modalVisible:false});
    }
    takePicture() {
   this.camera.capture()
     .then((data) => console.log(data))
     .catch(err => console.error(err));
    }

  static navigationOptions = {
    title: 'MainScreen',
  };
  render() {
		const { navigate } = this.props.navigation;
    this.getMoviesFromApiAsync
    return (
      <View style={styles.container1}>
			<View style={styles.container2}>
      <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
            <Camera
              ref={cam => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={this.state.camera.aspect}
              captureTarget={this.state.camera.captureTarget}
              type={this.state.camera.type}
              flashMode={this.state.camera.flashMode}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
              defaultTouchToFocus
              mirrorImage={false}
              barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
              barcodeFinderWidth={20}
              barcodeFinderHeight={20}
              barcodeFinderBorderColor="red"
              barcodeFinderBorderWidth={2}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
            >

            <TouchableHighlight
                    style={styles.actionButton1}
                    onPress={() => this.closeModal()}>
                   <Image
                   style={{width: 50,height: 50}}
                   source={require('./img/delete.png')} />
               </TouchableHighlight>
            <TouchableHighlight
                   style={styles.actionButton}
                   onPress={this.takePicture.bind(this)}>

                   <Text>Captrue</Text>
               </TouchableHighlight>




            </Camera>
            </View>
          </Modal>

			<TouchableOpacity onPress={() => this.openModal()}>
				 <View style={styles.container1}>
         <Image

         source={require('./img/icon9.png')}
         />
					 <Text style={styles.buttonText}>SCAN QRCODE</Text>
				 </View>
			 </TouchableOpacity>
			 </View>
			 <View style={styles.container3}>
 			<Image
 			source={require('./img/icons8-menu-100.png')}
 			/>

 			<TouchableOpacity onPress={() => navigate('List')}>
 				 <View>
 					 <Text style={styles.buttonText}>Other function</Text>
 				 </View>
 			 </TouchableOpacity>
 			 </View>
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
				flex: 1,

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
  },
  actionButton: {
        position: 'absolute',
        bottom: 25,
        padding: 16,
        right: 20,
        left: 20,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white'
  },
  actionButton1: {
    padding: 30,
        alignItems: 'flex-end',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {

    alignItems: 'flex-start',
  },

});

export default MainScreen
