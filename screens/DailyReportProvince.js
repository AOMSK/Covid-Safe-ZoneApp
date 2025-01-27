import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

const DailyReportCovidProvince = ({ route }) => {
    const [selectProvince, setSelectProvince] = useState("")
    const [dailyProvinceData, setDailyProvinceData] = useState([])
    const [masterData, setMasterData] = useState([])
    // const [updateDate, setUpdateDate] = useState("")
    const [totalCase, setTotalCase] = useState("")
    const [totalRecovered, setTotalRecovered] = useState("")
    const [totalDeath, setTotalDeath] = useState("")
    useEffect(() => {
        axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces")
        .then((response) => {
            setDailyProvinceData(response.data)
            setMasterData(response.data)
            // setUpdateDate(response.data[0].update_date)
        }).catch((error) => {
            console.log(error)
        })

        axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
        .then((response) => {
            // console.log(response.data)
            setTotalCase(response.data[0].total_case)
            setTotalRecovered(response.data[0].total_recovered)
            setTotalDeath(response.data[0].total_death)
        }).catch((error) => {
            console.log(error)
        })
        return () => {}
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

    const renderReportProvinceData = ({ item }) => {
        return(
            <TouchableOpacity>
                <View style={{ flex: 1, margin: 5, backgroundColor: "#E5E7E9", borderRadius: 5, height: 50, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.provinceText}>{ item.province }</Text>
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: 'red', alignItems: 'center', marginLeft: 25 }}>
                        <Text style={styles.itemText}>{ item.new_case }</Text>
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: 'red', alignItems: 'center', marginLeft: 205 }}>
                        <Text style={styles.itemText}>{ item.total_case }</Text>
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: 'red', alignItems: 'center', marginLeft: 350 }}>
                        <Text style={styles.itemText}>{ item.new_death }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const searchFilter = (itemValue) => {
        console.log(itemValue)
        if (itemValue) {
            const newData = masterData.filter((item) => {
                const itemData = item.province
                return itemData.indexOf(itemValue) > -1
            });
            setDailyProvinceData(newData)
            setSelectProvince(itemValue)
        }
        if (itemValue == "ทั้งหมด") {
            setDailyProvinceData(masterData)
            setSelectProvince(itemValue)
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <View style={{ borderBottomColor: '#48586f', borderWidth: 0.7, width: '98%', borderRadius: 10, marginTop: 5 }}>
                        <Picker
                            selectedValue={selectProvince}
                            // style={{ width: "95%", fontSize: 20, fontFamily: "Kanit_400Regular", borderWidth: 1, alignSelf: 'center', marginTop: 10, backgroundColor: '#fff' }}
                            onValueChange={(itemValue, itemIndex) => searchFilter(itemValue)}
                        >
                            <Picker.Item label="ทั้งหมด" value="ทั้งหมด" style={{ fontSize: 18, fontFamily: "Kanit_400Regular"}}/>
                            {
                                masterData.map((item, index) => {
                                    return(<Picker.Item label={item.province} value={item.province} key={index} style={{ fontSize: 18, fontFamily: "Kanit_400Regular"}}/>)
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.totalBox}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Kanit_600SemiBold', marginLeft: 8 }}>ผู้ติดเชื้อทั้งหมด</Text>
                            <Text style={{ fontSize: 25, color: "#fff", fontFamily: 'Kanit_400Regular', marginLeft: 5 }}>{ totalCase }</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Kanit_600SemiBold' }}>รักษาหาย</Text>
                            <Text style={{ fontSize: 25, color: "#fff", fontFamily: 'Kanit_400Regular', marginLeft: -10 }}>{ totalRecovered }</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Kanit_600SemiBold', marginLeft: -11 }}>เสียชีวิต</Text>
                            <Text style={{ fontSize: 25, color: "#fff", fontFamily: 'Kanit_400Regular', marginLeft: -20 }}>{ totalDeath }</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ marginLeft: -5, marginRight: 40, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Province</Text>
                    <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>New Case</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Kanit_700Bold'}}>Total</Text>
                    <Text style={{ marginRight: -5, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Death</Text>
                </View>
                <FlatList 
                    data={dailyProvinceData}
                    renderItem={renderReportProvinceData}
                    keyExtractor={item => item.province}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // marginBottom: 20,
    },
    newCaseBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E7E9",
        borderRadius: 5,
        margin: 5,
        width: '95%',
    },
    searchContainer: {
        marginLeft: 10,
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        marginRight: 5
    },
    itemRow: {
        flex: 5,
        backgroundColor: '#fff'
    },
    provinceText: {
        fontSize: 18,
        fontFamily: "Kanit_700Bold",
        paddingLeft: 10,
        color: "black",
    },
    itemText: {
        fontSize: 16,
        alignSelf: 'center',
        color: "black",
        fontFamily: "Kanit_400Regular",
        marginTop: -25
    },
    searchInput: {
        width: "85%",
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        color: "black",
        marginTop: 10,
        fontFamily: "Kanit_400Regular"
    },
    searchImage: {
        width: 30, 
        height: 30, 
        alignSelf: 'flex-start', 
        marginLeft:15, 
        marginTop: -33
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: -35,
        marginRight: 5,
    },
    itemContainer: {
        flex: 2,
    },
    totalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        backgroundColor: '#41b59e',
        width: '98%',
        height: 90,
        borderRadius: 10,
        padding: 15
    },
    headerContainer: {
        alignItems: 'center'
    }
})
export default DailyReportCovidProvince;