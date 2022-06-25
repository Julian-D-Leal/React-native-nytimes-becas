import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalW = ({activeItem, toggle, active}) => {
  const [tipo, setATipo] = useState(activeItem.categoria);
  
  let a= () => {
    if(tipo === 1) {
      setATipo("Nacional")
    }else{
      setATipo("internacional")
    }
  }
  useEffect(()=>{
    a()
  },[]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={active}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              onPress={() => toggle()}
              style={[styles.buttonClose,styles.button]}
            >    
              <Text style={styles.modalText}>X</Text>
            </Pressable> 
            <Text style={styles.modalText}>Nombre: {activeItem.nombre}</Text>
            <Text style={styles.modalText}>Categoria: {tipo}</Text>
            <Text style={styles.modalText}>Porcentaje: {activeItem.porcentaje}</Text>
            <Text style={styles.modalText}>País: {activeItem.pais}</Text>
            <Text style={styles.modalText}>Universidad: {activeItem.universidad}</Text>
            <Text style={styles.modalText}>Requirimientos: {activeItem.requerimientos}</Text>   
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        width: 200,
        marginTop: 250,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        height: 35
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#ff110c",
        width: 40,
        marginLeft: 150,
        alignItems: "center",
        paddingTop: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalW;