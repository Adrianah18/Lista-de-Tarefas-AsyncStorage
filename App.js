import React from 'react';
import { View } from 'react-native';
import ListadeTarefas from './src/screens/ListadeTarefas';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <View>
      <ListadeTarefas />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Cor de fundo da tela principal
    padding: 20,
  },
});

export default App;