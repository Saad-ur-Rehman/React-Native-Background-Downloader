import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import RNBackgroundDownloader from 'react-native-background-downloader';


export default function App() {

  const [inputUrl, setInputUrl] = useState('')

  const fileUrl = (enteredText) => {
    setInputUrl(enteredText)
  }

  const getId = () => ('fileId: ' + new Date().getTime())

  let fileName = 'asadBoi2.mp4'

  const downloadFile = (inputUrl, id, fileName) => {
    if (inputUrl === '') return
    let task = RNBackgroundDownloader.download({
      id: id,
      url: inputUrl,
      destination: `${RNBackgroundDownloader.directories.documents}/${fileName}`
    }).begin((expectedBytes) => {
      console.log(`Going to download ${expectedBytes} bytes!`);
    }).progress((percent) => {
      console.log(`Downloaded: ${percent * 100}%`);
    }).done(() => {
      console.log('Download is done!');
      console.log(RNBackgroundDownloader.directories.documents);

    }).error((error) => {
      console.log('Download canceled due to error: ', error);

    });
  }
  return (

    <View style={styles.screen} >
      <View style={styles.txtView}>
        <Text style={styles.txt}>Using React-Native BackGround Downloader </Text>
      </View >
      <TextInput onChangeText={fileUrl} value={inputUrl} placeholder="Enter Video URL" style={styles.txtInput} />
      <View style={styles.btnView}>
        <Button title="Download" onPress={() => { downloadFile(inputUrl, getId(), fileName) }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#dcdcdc',

    // justifyContent: 'center',
    alignItems: 'center'
  },
  txtInput: {
    padding: 30,
    margin: 10,
    borderWidth: 5,
    borderColor: 'black',
    width: '90%'

  },
  btnView: {
    padding: 10,
    width: '70%'
  },
  txtView: {

    // justifyContent: 'flex-start',
    padding: 10,
    marginBottom: '50%'

  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});