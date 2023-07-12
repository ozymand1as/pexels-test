import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native'

const {width} = Dimensions.get('window')

function DetailsScreen({route}) {
  const { photo } = route.params

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Image style={{width: width - 20, height: (width - 20) * (photo.height / photo.width)}} source={{uri: photo.src.original}}/>
      <Text style={styles.text}>{`by ${photo.photographer}`}</Text>
    </ScrollView>
  );
}

export default DetailsScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  scroll: {
    alignItems: 'center'
  },
});
