/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
  TextInput,
  Text,
} from 'react-native';
import ZendriveSDK from 'react-native-zendrive';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [driverId, setDriverId] = useState('');
  const [isSdkSetup, setSdkSetup] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [activityPermission, setActivityPermission] = useState(false);

  const buttonHandler = d => {
    console.log('Button Pressed' + d);
    ZendriveSDK.setup({
      driverId: d,
      sdkKey: 'RZgwNQ4iCjDzdO1pFxTZBijgAL3X98l7',
    })
      .then(setSdkSetup(true))
      .catch(e => console.log('Sdk setup failed' + JSON.stringify(e)));
  };

  const activityPermissionHandler = () => {
    ZendriveSDK.permissions()
      .request('motion')
      .then(setActivityPermission(true))
      .catch(console.log('No Activity Permission'));
  };

  const requestPermission = () => {
    ZendriveSDK.permissions()
      .request('location')
      .then(setLocationPermission(true))
      .catch(console.log('Location Permission Denied'));
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.rectangle}>
          {isSdkSetup ? (
            <View style={{paddingVertical: 10}}>
              <Text> SDK Initialised Please provide permission</Text>
              {locationPermission ? (
                <Text> Location Permission Obtained</Text>
              ) : (
                <Button
                  title="Give Location Permission "
                  onPress={requestPermission}
                />
              )}
              {activityPermission ? (
                <Text> Activity Permission Obtained</Text>
              ) : (
                <Button
                  title="Give Activity Permission"
                  onPress={activityPermissionHandler}
                />
              )}
            </View>
          ) : (
            <>
              <TextInput onChangeText={v => setDriverId(v)} value={driverId} />
              <Button
                title="Initialise SDK"
                onPress={() => buttonHandler(driverId)}
              />
            </>
          )}
          <Button
            title="Upload Logs"
            onPress={() => {
              ZendriveSDK.uploadAllDebugDataAndLogs()
                .then(result => {
                  console.log(JSON.stringify(result));
                })
                .catch(console.log('Failed to execute'));
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    padding: 8,
  },
  rectangle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey,
    minWidth: '70%',
    maxWidth: '70%',
    minHeight: '50%',
    maxHeight: '70%',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
