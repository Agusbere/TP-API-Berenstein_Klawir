import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPelicula = async () => {
      try {
        setCargando(true);
        await new Promise((res) => setTimeout(res, 3000));
        const response = await axios.get('https://www.omdbapi.com/?i=tt0298148&apikey=a41637f6');
        setPelicula(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPelicula();
  }, []);

  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando película...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pelicula && (
        <>
          <Text style={styles.titulo}>Titulo: {pelicula.Title} </Text>
          
          <Image source={{ uri: pelicula.Poster }} style={styles.poster} />

          <Text style={styles.label}>Director:</Text>
          <Text style={styles.valor}>{pelicula.Director}</Text>

          <Text style={styles.label}>Actores:</Text>
          <Text style={styles.valor}>{pelicula.Actors}</Text>

          <Text style={styles.label}>Género:</Text>
          <Text style={styles.valor}>{pelicula.Genre}</Text>

          <Text style={styles.label}>Ratings:</Text>
          {pelicula.Ratings?.map((rating, index) => (
            <Text key={index} style={styles.valor}>
              {rating.Source}: {rating.Value}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});
