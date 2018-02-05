import React from 'react';
import { StyleSheet, Text, View, Button, WebView, Alert, Image, TouchableOpacity, ListView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';

const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
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
			pushlink: ''
		};
	}
	onBarCodeRead(scanResult) {
    console.warn(scanResult.data)
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
          // this.BarcodeAttendace()
				}
		}
		return;
	}
  BarcodeAttendace(scanResult){
    return fetch(scanResult)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });

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
	renderbarcode(){

const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>

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
				/>
				<View style={styles.container1}>
					<Text>{this.state.count}</Text>
					<Button
          onPress={() => this.pushtoWebView()}
          title="Open Link"
        />
				</View>
			</View>
		);
  }
	pushtoWebView(){
		const { navigate } = this.props.navigation;

		if (this.state.pushlink != '') {
			navigate("Web",{name: this.state.pushlink})


		}else{
			Alert.alert(
      'Error',
      'Please Scan yuor qrcdoe',
      [

      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

    ],
    { cancelable: false }
  )
		}
	}

  render() {

    return (

			  this.renderbarcode()


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
				alignItems: 'center',

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

export default ScanScreen;
