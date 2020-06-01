import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { local } from '../config/api';

import ImgMarker from '../../assets/marker.png';
import ImgMyMarker from '../../assets/mymarker.png';

const Main = ({ navigation }) => {

  const [myPosition, setMyPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [localDistance, setLocalDistance] = useState([]);

  async function loadInitialLocation() {

    const { granted } = await requestPermissionsAsync();

    if (granted) {

      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { latitude, longitude } = coords;

      setMyPosition({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

    }
  }

  async function loadLocal() {

    const { latitude, longitude } = myPosition;

    try {

      const response = await local.selectByDistance(5, latitude, longitude);
      setLocalDistance(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  function handleRegionChanged(region) {
    const { latitude, longitude } = region;
    setCurrentPosition({ latitude, longitude });
  }

  useEffect(() => {
    loadLocal();
  }, [myPosition]);

  useLayoutEffect(() => {
    loadInitialLocation();
  }, [])

  if (!myPosition) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={myPosition}
        style={styles.map}>

        {myPosition && (
          <Marker coordinate={
            { latitude: myPosition.latitude, longitude: myPosition.longitude }
          }>

            <Image
              style={styles.avatar}
              source={{ uri: 'https://avatars0.githubusercontent.com/u/43609958?s=460&v=4' }} />

            <Callout>
              <View style={stylesCallout.callout}>
                <Text style={stylesCallout.title}>
                  Minha Localização
                        </Text>
                <Text style={stylesCallout.type}>
                  Esta localização foi puxada de seu GPS.
                        </Text>
              </View>
            </Callout>

          </Marker>
        )}

        {currentPosition && (
          <Marker coordinate={
            { latitude: currentPosition.latitude, longitude: currentPosition.longitude }
          }>

            <Image
              style={styles.marker}
              source={ImgMyMarker} />

            <Callout>
              <View style={stylesCallout.callout}>
                <Text style={stylesCallout.title}>
                  Minha Posição
                        </Text>
                <Text style={stylesCallout.type}>
                  Esta é a posição central do mapa.
                        </Text>
              </View>
            </Callout>

          </Marker>
        )}

        {localDistance.map(localMap => (

          <Marker key={localMap.id} coordinate={
            { latitude: localMap.latitude, longitude: localMap.longitude }
          }>

            <Image
              style={styles.marker}
              source={ImgMarker} />

            <Callout>
              <View style={stylesCallout.callout}>
                <Text style={stylesCallout.title}>
                  {localMap.name}
                </Text>
                <Text style={stylesCallout.type}>
                  {localMap.type}
                </Text>
              </View>
            </Callout>

          </Marker>

        ))}

      </MapView>

      <View
        style={styles.searchForm}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddPoint");
          }}
          style={styles.button}>

          <MaterialIcons name="add" size={30} color="#FFF" />

        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  marker: {
    width: 35,
    height: 35,
  },
  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    elevation: 3,
    width: 60,
    height: 60,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    right: 0,
  }
});

const stylesCallout = StyleSheet.create({
  callout: {
    width: 200,
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  type: {
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  }
});

export default Main;