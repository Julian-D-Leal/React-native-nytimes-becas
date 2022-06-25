import React, {useState, useEffect} from 'react';
import { View , Text, StyleSheet, Button, Pressable, TextInput } from 'react-native';
import { Card } from "react-native-paper";
import axios from 'axios';
import ModalW from './Modal'
import Constants from '../path'

export default function Admin(){
    const [becas, setBecas] = useState([]);
    const [modal, setModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState(1);
    const [porcentaje, setPorcentaje] = useState('');
    const [pais, setPais] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [requerimientos, setRequerimientos] = useState('');
    const [vista, setVista] = useState('');
    
    let postBecas = () => {
        axios
        .get("http://"+Constants.RUTA+"/becas/list/")
        .then(res => setBecas(res.data))
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        postBecas()
    },[]);

    const handleDelete = (item) => {
        axios
          .delete(`http://${Constants.RUTA}/becas/list/${item.id}/`)
          .then((res) => postBecas());
        alert("Beca eliminada con exito");
    };

    handleSubmit = () => {
        const prueba = {
            nombre:nombre,
            categoria:categoria,
            porcentaje:porcentaje,
            pais:pais,
            universidad:universidad,
            requerimientos:requerimientos,
            vistas:parseInt(vista)
        }
        axios 
            .post("http://"+Constants.RUTA+"/becas/list/", prueba)
            .then((res) => postBecas());
        alert("Accion realizada con exito");
        };

    const detallarItem= (item) => {
        setModal(true);
        setActive(item);
    }

    const toggle= () => {
        setModal(false);
    }

    useEffect(()=>{
        postBecas()
    },[]);

    return (
        <View style={{marginLeft: 30, marginTop: 10}}>
            <View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Agregar una Beca</Text>
                        <TextInput
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder={'Nombre'}
                            style={styles.input}
                        />
                        <TextInput
                            value={categoria}
                            onChangeText={setCategoria}
                            placeholder={'Categoria'}
                            style={styles.input}
                        />
                        <TextInput
                            value={porcentaje}
                            onChangeText={setPorcentaje}
                            placeholder={'Porcentaje'}
                            style={styles.input}
                        />
                        <TextInput
                            value={pais}
                            onChangeText={setPais}
                            placeholder={'País'}
                            style={styles.input}
                        />
                        <TextInput
                            value={universidad}
                            onChangeText={setUniversidad}
                            placeholder={'Universidad'}
                            style={styles.input}
                        />
                        <TextInput
                            value={requerimientos}
                            onChangeText={setRequerimientos}
                            placeholder={'Requerimientos'}
                            style={styles.input}
                        />
                        <TextInput
                            value={vista}
                            onChangeText={setVista}
                            placeholder={'Vistas'}
                            style={styles.input}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                    <Button
                        title={'Agregar'}
                        onPress={() => handleSubmit()}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.title2}>Dashboard</Text>
            <View style={styles.tarjetas}>
                {becas.map((item) =>(
                    <Card key={item.id} style={styles.box}> 
                        <View>
                            <View >
                                <Text style={styles.title}>{item.nombre}</Text>
                                <Text >{item.universidad}</Text>
                                <Text style={styles.p}>{item.pais}</Text>
                                <View style={styles.row}>
                                    <Pressable style={[styles.edit, styles.button]}>
                                        <Text>Editar</Text>
                                    </Pressable>
                                    <Pressable style={[styles.delete, styles.button]} onPress={() => handleDelete(item)}>
                                        <Text>Eliminar</Text>
                                    </Pressable>
                                </View>
                                
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
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    container: {
        position: 'relative',
        marginLeft: -38,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
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
    },
    title2:{
        fontSize: 25,
        marginTop: 10,
        fontWeight: "600",
        flexDirection: 'row',
        marginLeft: 100
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 15,
    },
    button: {
        width: 120,
        alignItems: "center",
        paddingTop: 5,
        borderRadius: 15,
        height: 35,
        marginTop: 1,
        spaceBetween: 30,
    },  
    delete:{
        backgroundColor: '#e80f10',
    },
    edit:{
        backgroundColor: '#74c468',
    }
});