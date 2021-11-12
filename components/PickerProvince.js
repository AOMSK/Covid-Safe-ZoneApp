import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
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
// const PickerProvince = React.memo(props => {
//     const [selectProvince, setSelectProvince] = useState("")
//     return (
//         <View style={styles.container}>
//             <Picker
//                 selectedValue={selectProvince}
//                 style={{ height: 50, width: "100%", borderRadius: 10, }}
//                 onValueChange={(itemValue, itemIndex) => setSelectProvince(itemValue)}
//             >
//                 {
//                     props.data.map((item, index) => {
//                         return(<Picker.Item label={item.province} value={item.province} key={index}/>)
//                     })
//                 }
//             </Picker>
//             <Text style={{ textAlign: "center", fontSize: 20 }}>value : {selectProvince}</Text>
//         </View>
//     )
// });

const PickerProvince = () => {
    const [selectProvince, setSelectProvince] = useState("")
    const [dailyProvinceData, setDailyProvinceData] = useState([])
    useEffect(() => {
        axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces")
        .then((response) => {
            setDailyProvinceData(response.data)
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
            <View style={styles.vaccineBox}>
                <Text style={styles.provinceText}>{ item.province }</Text>
                <Text style={styles.itemText}>ผู้ป่วยรายใหม่ { item.new_case }</Text>
                <Text style={styles.itemText}>รวมท้งหมด { item.total_case }</Text>
                <Text style={styles.itemText}>จำนวนผู้เสียชีวิตรายใหม่ { item.new_death }</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectProvince}
                style={{ height: 50, width: "100%", borderRadius: 10, fontSize: 20, fontFamily: "Kanit_400Regular"}}
                onValueChange={(itemValue, itemIndex) => setSelectProvince(itemValue)}
            >
                {
                    dailyProvinceData.map((item, index) => {
                        return(<Picker.Item label={item.province} value={item.province} key={index} style={{ fontSize: 18, fontFamily: "Kanit_400Regular"}}/>)
                    })
                }
            </Picker>
            <Text style={{ textAlign: "center", fontFamily: "Kanit_400Regular", fontSize: 20 }}>value : {selectProvince}</Text>
            <View style={styles.container}>
                <View style={styles.itemRow}>
                    <FlatList 
                        data={dailyProvinceData}
                        renderItem={renderReportProvinceData}
                        keyExtractor={item => item.province}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    vaccineBox: {
        // backgroundColor: "#27AE60",
        borderRadius: 10,
        margin: 5
    },
    searchContainer: {
        // flex: 1,
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
        fontWeight: "400",
        paddingLeft: 20,
        color: "black",
        fontFamily: "Kanit_400Regular"
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
    touchButton: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        padding: 10,
        borderRadius: 10,
        marginRight: 3,
    },
})
export default PickerProvince;