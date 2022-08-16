import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
  } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global';


const Inicio = ({navigation}) => {

  // state de la app
  const [clientes, guardarClientes] = useState([])
  const [consultarAPI, guardarConsultarAPI] = useState(true)

  useEffect(() => {
    const obtenerclienteApi = async () => {
      try {
        const resultado = await axios.get('http://192.168.0.106:3000/clientes')
        guardarClientes(resultado.data)
        guardarConsultarAPI(false)
      } catch (error) {
        console.log(error)
      }
    }
    if(consultarAPI) {
      obtenerclienteApi();

    }
  }, [consultarAPI])
  

  return (
    <View style={globalStyles.contenedor}> 

      <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI} )}> 
        Nuevo Cliente
      </Button>

      <Headline style={globalStyles.titulo} > { clientes.length > 0 ? "Clientes" : "Aún no hay Clientes" } </Headline>

      <FlatList 
        data={clientes}
        keyExtractor={ cliente => (cliente.id).toString() }
        renderItem={ ({item}) => (
          <List.Item 
            title={item.nombre}
            description={item.empresa}
            onPress={ () => navigation.navigate("DetallesCliente", {item, guardarConsultarAPI})}
          />
        )}
      />

      <FAB 
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI} )}
      />
    </View>
  )
}




export default Inicio