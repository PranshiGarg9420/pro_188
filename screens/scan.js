import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";


export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            faces:[],
        };
        this.onFacesDetected= this.onFacesDetected.bind(this);
    }

    async componentDidMount(){
        const {status}= await Camera.requestCameraPermissionsAsync();
        this.setState({hasCameraPermission: status === 'granted'});
    }

    onFacesDetected({faces}){
        this.setState({faces: faces})
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render(){
        var { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.upperContainer}>
                    <Text style={styles.appName}>Scanning In Process..</Text>
                </View>
                <View style={styles.middleContainer}>
                    <Camera 
                        style={{flex:1}}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast, 
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectedError={this.onFacesDetectionError}
                    />
                </View>
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E7F2F8"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    upperContainer: {
      flex: 0.13,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E7F2F8",
      flexDirection: "row"
    },
    appIcon: {
      width: RFValue(50),
      height: RFValue(50),
      borderRadius: RFValue(25),
      borderWidth: 2,
      borderColor: "#FFA384",
      marginRight: RFValue(10)
    },
    appName: {
      color: "#FFA384",
      fontSize: RFValue(25),
      fontWeight: "800",
      fontStyle: "italic"
    },
    middleContainer: { flex: 0.67 },
    lowerContainer: {
      flex: 0.2,
      backgroundColor: "#E7F2F8"
    },
    lowerTopContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    lowerBottomContainer: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EFE7BC"
    },
    filters: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    filterButton: {
      height: RFValue(70),
      width: RFValue(70),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(35),
      backgroundColor: "#E7F2F8",
      borderWidth: 5,
      marginRight: RFValue(20),
      marginBottom: RFValue(10)
    },
    filterImage: {
      height: "60%",
      width: "60%",
      alignSelf: "center",
      resizeMode: "contain"
    }
  });