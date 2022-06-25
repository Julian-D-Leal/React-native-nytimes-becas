import React, {useState, useEffect} from 'react';
import { View , Text, StyleSheet,Button} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { Card } from "react-native-paper";
import ModalW from './Modal'
import Constants from '../path'

const activeItem ={
    nombre: "",
    categoria: "",
    porcentaje: 0,
    pais: "",
    universidad: "",
    requerimientos: "",
    vistas:0
}

export default function Popular(){
    const [modal, setModal] = useState(false);
    const [becas, setBecas] = useState([]);
    const [active,setActive] = useState(activeItem);
    //URL: la URL de tu endpoint API
    let postBecas = () => {
        axios
        .get("http://"+Constants.RUTA+"/becas/list/")
        .then(res => setBecas(res.data))
        .catch(err => console.log(err))
    }

    let popularidad = (item) => {
        let activo = item;
        activo.vistas += 1;
        setActive(activo);
        let code = activo.id;
        axios
        .put("http://"+Constants.RUTA+"/becas/list/"+code+"/", activo);
    }

    const detallarItem= (item) => {
        setModal(true);
        setActive(item);
        popularidad(item);
    }

    const toggle= () => {
        setModal(false);
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
                    <Button title='detalles' onPress={() =>detallarItem(item)} /> 
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
            />
            {modal &&
                 <ModalW 
                    activeItem={active}
                    active={modal}
                    toggle={toggle}
                />
            }
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