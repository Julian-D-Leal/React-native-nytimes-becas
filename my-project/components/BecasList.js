import React, {useState, useEffect} from 'react';
import { View , Text, StyleSheet, Button} from 'react-native';
import { Card } from "react-native-paper";
import axios from 'axios';
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

export default function Becas(){
    const [becas, setBecas] = useState([]);
    const [views, setViews] = useState(1);
    const [active,setActive] = useState(activeItem);
    const [modal, setModal] = useState(false);

    let postBecas = () => {
        axios
        .get("https://restframeworkbecasandlogin.herokuapp.com/becas/list/")
        .then(res => setBecas(res.data))
        .catch(err => console.log(err))
    }

    let popularidad = (item) => {
        let activo = item;
        activo.vistas += 1;
        setActive(activo);
        let code = activo.id;
        axios
        .put("https://restframeworkbecasandlogin.herokuapp.com/becas/list/"+code+"/", activo);
    }

    const display = status => {
        if(status){
            return setViews(2);
        }else{
            return setViews(1);
        }
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

    let int = becas.filter(
        (item) => item.categoria === views)

    
    return (
        <View>
            <View style={styles.a}>
                <Button title='Nacionales' onPress={() => display(false)}/>
                <Button title='Internacional' onPress={() =>display(true)}/>
            </View>
            <View style={styles.tarjetas}>
                {int.map((item) =>(
                    <Card key={item.id} style={styles.box}> 
                        <View>
                            <View >
                                <Text style={styles.title}>{item.nombre}</Text>
                                <Text >{item.universidad}</Text>
                                <Text style={styles.p}>{item.pais}</Text>
                                <Button title='detalles' onPress={() =>detallarItem(item)} /> 
                            </View>
                        </View>
                    </Card>
                ))}
            </View>
            {modal &&
                 <ModalW 
                activeItem={active}
                active={modal}
                toggle={toggle}/>
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
        marginLeft: 30,
        backgroundColor: '#0d6efd',
        borderRadius: 10,
        boxShadow: 4,
        boxShadow: '#FFFF',
        margin:5
    },
    title: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: "600",
        flexDirection: 'row'
    },
    p:{
        marginLeft: 180,
    },
    tarjetas:{
        margin: 10,
        marginBottom: 50,
    },
    a:{
        marginTop: 10,
    }
});