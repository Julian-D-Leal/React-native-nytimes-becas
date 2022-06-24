import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalW = ({activeItem, visible}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.buttonClose,styles.button]}
            >    
              <Text style={styles.modalText}>X</Text>
            </Pressable> 
            <Text style={styles.modalText}>Nombre: {activeItem.nombre}</Text>
            <Text style={styles.modalText}>Categoria: {activeItem.categoria}</Text>
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
        marginTop: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
    },
        buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#ff110c",
        width: 40,
        marginLeft: 90,
        alignItems: "center",
        paddingTop: 10,
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