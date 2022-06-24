import React, {useState, useEffect} from 'react';
import { View , Text, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { Card } from "react-native-paper";

export default function Popular(){

    const [becas, setBecas] = useState([]);
    //URL: la URL de tu endpoint API
    let postBecas = () => {
        axios
        .get("http://192.168.20.172:8000/becas/list/")
        .then(res => setBecas(res.data))
        .catch(err => console.log(err))
    }
    
    useEffect(()=>{
        postBecas()
    },[]);
    //alert(becas)
    //console.log(becas);
    var orden = becas.sort(function (a, b) {
        var x = a['vistas'],
        y = b['vistas'];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    const renderItem = ({item}) => {
        return (
          <Card style={styles.box}> 
            <View key={item.id}>
                <View >
                    <Text style={styles.title}>{item.nombre}</Text>
                    <Text >{item.universidad}</Text>
                    <Text style={styles.p}>{item.pais}</Text>
                </View>
            </View>
          </Card>
        )
      }

    return (
        <View>
            <Carousel 
                sliderWidth={300}
                itemWidth={300}
                layout="car"
                data={orden.slice(0,3)}
                renderItem={renderItem}
                inactiveSlideShift={true}
            />
        </View>
        
      );
  }

const styles = StyleSheet.create({
    box: {
        width: 250,
        border: 15,
        border: 'blue',
        padding: 5,
        marginLeft: 35,
        backgroundColor: '#0d6efd',
        borderRadius: 10,
        boxShadow: 4,
        boxShadow: '#FFFF',
    },
    title: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: "600",
        flexDirection: 'row'
    },
    p:{
        marginLeft: 180,
    }

});