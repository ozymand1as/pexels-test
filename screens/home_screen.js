import {useCallback} from 'react'
import { useFeed } from '../methods/api'
import PhotoCard from '../components/photo_card'
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native'

function HomeScreen({navigation}) {
  const {photos, canGetMore, getMore, refresh, loading} = useFeed()

  const renderCard = useCallback((el) => (
    <Pressable onPress={() => navigation.navigate('Details', {photo: el.item})}>
      <PhotoCard {...el.item}/>
    </Pressable>
    ), [])


  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(el) => {
          return el.id.toString()
        }}
        renderItem={renderCard}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        onEndReached={() => {
          if (canGetMore()) getMore()
        }}
        onEndReachedThreshold={0.5}
        windowSize={5}
      />
    </View>
  );
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
