import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global';
import axios from 'axios'

const NuevoCliente = ({navigation, route}) => {

    const { guardarConsultarAPI } = route.params; // para la funcion useState de guardar consultar porveniente de Inicio

    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    // detectar si estamos editando o no
    useEffect(() => {
      if(route.params.cliente) {
        const { nombre, telefono, correo, empresa } = route.params.cliente;

        guardarNombre(nombre)
        guardarTelefono(telefono)
        guardarCorreo(correo)
        guardarEmpresa(correo)
      }
    
    }, [])
    

    // almacena el cliente en la BD
    const guardarCliente = async () => {
        // validar
        if(nombre === ''  || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true)
            return;
        }

        // generear el cliente
        const cliente = {nombre, telefono, empresa, correo};


        // Si estamos editando o creando un nuevo cliente
        if(route.params.cliente) {

            const {id} = route.params.cliente
            cliente.id = id;
            const url = `http://192.168.0.106:3000/clientes/${id}`

            try {
                await axios.put(url, cliente)
            } catch (error) {
                console.log(error)
            }

        } else {
            // guardar el cliente en la Api
            try {
                console.log('cliente', cliente)
                await axios.post('http://192.168.0.106:3000/clientes', cliente)
            } catch (error) {
                console.log(error)
            }
        }

        
        //redireccionar
        navigation.navigate('Inicio')
        // Limpiar el formulario
        guardarNombre('')
        guardarTelefono('')
        guardarEmpresa('')
        guardarAlerta('')

        // cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }

  return (
    <View style={globalStyles.contenedor}>
        
        <Headline
            style={globalStyles.titulo}
        >
            Añadir Nuevo Cliente
        </Headline>

        <TextInput 
            label='Nombre'
            placeholder='Misa'
            onChangeText={ (texto) => guardarNombre(texto)}
            value={nombre} 
            style={styles.input}
        />
        <TextInput 
            label='Teléfono'
            placeholder='44958931124'
            onChangeText={ (texto) => guardarTelefono(texto)}
            value={telefono}
            style={styles.input}
        />
        <TextInput 
            label='Correo'
            placeholder='correo@correo.com'
            value={correo}
            onChangeText={ (texto) => guardarCorreo(texto)}
            style={styles.input}
        />
        <TextInput 
            label='Empresa'
            placeholder='Misa'
            onChangeText={ (texto) => guardarEmpresa(texto)}
            value={empresa}
            style={styles.input}
        />

        <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()} >
            Guardar Cliente
        </Button>

        <Portal>
            <Dialog
                visible={alerta}
                onDismiss={ () => guardarAlerta(false)}
            >
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Todos los campos son obligatorios</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={ () => guardarAlerta(false)} >Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente