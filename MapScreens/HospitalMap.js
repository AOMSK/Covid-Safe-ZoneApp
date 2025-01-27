import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Circle, Marker, Callout } from 'react-native-maps';
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { HospitalLocation } from "../Data/mockData";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const HospitalMap = () =>  {
    //useSelector section
    const latitude = useSelector((state) => state.LatLong.lat)
    const longitude = useSelector((state) => state.LatLong.long)

    //useState section
    const [mapPosition, setMapPosition] = useState({
        latitude: 13.759097420443796,
        longitude: 100.49290832015825,
        latitudeDelta: 1.0,
        longitudeDelta: 1.0,
    })
    const [vacList, setVacList] = useState([])
    const sortFunction = (para_input) => {
        let array_at_current_function = [];
        let array_of_distance_for_reference = []
        for (let i=0; i<para_input.length; i++) {
            // search for matching object
            let distance = null;
            for (let j=0; j<vacList.length; j++) {
                if (para_input[i].id == vacList[j].id) {
                    distance = vacList[j].distance
                }
            }
            array_of_distance_for_reference.push({
                id: para_input[i].id,
                hospitalName: para_input[i].hospitalName,
                latitude: para_input[i].latitude,
                longitude: para_input[i].longitude,
                distance: distance,
            })
        }
        let array_of_object_with_least_distance = []
        for (let i=0; i<para_input.length; i++) {
            let object_with_least_distance = [];
            // ------------------------------------------
            for (let j=0; j<array_of_distance_for_reference.length; j++) {
                if (j == 0) {
                    object_with_least_distance = {
                        id: array_of_distance_for_reference[j].id,
                        hospitalName: array_of_distance_for_reference[j].hospitalName,
                        latitude: array_of_distance_for_reference[j].latitude,
                        longitude: array_of_distance_for_reference[j].longitude,
                        distance: array_of_distance_for_reference[j].distance,
                    }
                }
                if (j != 0) {
                    if (
                        array_of_distance_for_reference[j].distance
                        < object_with_least_distance.distance)
                    {
                        object_with_least_distance = {
                            id: array_of_distance_for_reference[j].id,
                            hospitalName: array_of_distance_for_reference[j].hospitalName,
                            latitude: array_of_distance_for_reference[j].latitude,
                            longitude: array_of_distance_for_reference[j].longitude,
                            distance: array_of_distance_for_reference[j].distance,
                        }
                    }
                }
            }
            let object_without_least_item = [];
            for (let j=0; j<array_of_distance_for_reference.length; j++) {
                if (array_of_distance_for_reference[j].id != object_with_least_distance.id) {
                    object_without_least_item.push(
                        array_of_distance_for_reference[j]
                    );
                }
            }
            array_of_distance_for_reference = object_without_least_item;
            // ------------------------------------------
            array_of_object_with_least_distance.push(
                object_with_least_distance
            )
        }
        array_at_current_function = array_of_object_with_least_distance;
        return array_at_current_function;
    }

    useEffect(() => {
        setVacList([]);
        for (let i=0; i<HospitalLocation.length; i++) {
            let routes_url = (
                'https://maps.googleapis.com/maps/api/'
                + 'directions/json?'
                + 'origin='
                + latitude
                + ','
                + longitude
                + '&destination='
                + HospitalLocation[i].latitude
                + ','
                + HospitalLocation[i].longitude
                + '&key=AIzaSyBDAbqYFsZYkYVPkja-T6YCDFHkgR-YJtc'
            );
            fetch(routes_url)
                .then((response) => response.json())
                .then((json) => {
                    setVacList(prevItems => {
                        return [
                            ...prevItems,
                            {
                                id: HospitalLocation[i].id,
                                distance: json.routes[0].legs[0].distance.value / 1000,
                            },
                        ];
                    })
                })
                .catch((error => console.log(error)));
        }
    }, [])

    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_600SemiBold,
        Kanit_700Bold,
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            {/* <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 18 }}>
                Hello HospitalMap Page
            </Text> */}
            <MapView style={styles.map}
                provider={ PROVIDER_GOOGLE }
                region={{
                    latitude: mapPosition.latitude,
                    longitude: mapPosition.longitude,
                    latitudeDelta: mapPosition.latitudeDelta,
                    longitudeDelta: mapPosition.longitudeDelta,
                }}
            >
                {
                    HospitalLocation.map((val, index) => {
                        return (
                            <Marker
                                coordinate={{ latitude: val.latitude, longitude: val.longitude }}
                                key={index}
                                title={val.hospitalName}
                                >
                                <MaterialCommunityIcons name="hospital-marker" size={35} color="#F92D2D" />
                            </Marker>
                        )
                    })
                }
                <Marker coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}>
                    <MaterialCommunityIcons name="human-handsdown" size={50} color="#2958D1" />
                        <Callout style={{height: 36}}>
                            <Text style={{fontSize: 12, fontFamily: 'Kanit_400Regular'}}>ตำแหน่งของคุณ</Text>
                        </Callout>
                </Marker>
            </MapView>

            {/* <View style={styles.scrollViewStyling}><ScrollView>
                <Text>
                    {vacList.length}/{HospitalLocation.length},
                    {
                        (vacList.length==HospitalLocation.length)
                        ?'done' + ' ' + JSON.stringify(vacList)
                        :'not_done'
                    },
                </Text>
            </ScrollView></View> */}
            <View style={styles.flatListStyling}>
                {
                (vacList.length==HospitalLocation.length)
                // ?<ScrollView>
                //     <Text>{JSON.stringify(sortFunction(HospitalLocation))}</Text>
                // </ScrollView>
                ?<FlatList
                    data={sortFunction(HospitalLocation)}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={()=>{
                                    setMapPosition({
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    })
                                }}
                            >
                                <View style={styles.listItemView}>
                                    <Text style={styles.listItemText}>
                                        {item.hospitalName} ({item.distance} กม.)
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                />
                :<Text>กำลังโหลด</Text>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * (3 / 5),
    },
    listItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
        width: 500,
        alignItems: 'flex-start'
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemText: {
        fontSize: 18,
        fontFamily: 'Kanit_400Regular'
    },
    flatListStyling: {
        height: Dimensions.get('window').height * (16 / 100),
        // borderWidth: 1,
    },
    scrollViewStyling: {
        height: Dimensions.get('window').height * (1 / 20),
        borderWidth: 1,
    },
});

export default HospitalMap;