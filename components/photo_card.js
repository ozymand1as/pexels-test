import {memo} from 'react'
import { Image, Pressable, StyleSheet, Text, View} from 'react-native'

const PhotoCard = (props) => {

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: props.src.medium}}/>
      <Text style={styles.text}>{`by ${props.photographer}`}</Text>
    </View>
  )
}

export default memo(PhotoCard)

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 170,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    marginBottom: 14,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    marginLeft: 8,
  }
})
