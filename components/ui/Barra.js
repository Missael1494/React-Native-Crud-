import React from 'react'
import { Button } from 'react-native-paper'

const BarraSuperior = ({navigation, route}) => {

    //const { guardarConsultarAPI } = route.params

    const handlePress = () => {
        //console.log('Vamos a crear un cliente')
        navigation.navigate("NuevoCliente",)
    }


  return (
    <Button
        icon="plus"
        color="#FFF"
        onPress={ () => handlePress() }
    >
        Cliente
    </Button>
  )
}

export default BarraSuperior
