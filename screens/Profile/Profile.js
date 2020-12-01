import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.85;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  title: "안녕하세요",
  content: "별건아니지만 이렇게 인사드립니다. DevOpsProgrammer 강성운입니다.\n세상살이가 참많이 변했죠"
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={(item)=>item.key}
        showsVerticalScrollIndicator={false}
        onScroll = {Animated.event(
          [{nativeEvent:{contentOffset:{y:scrollY}}}],
          {useNativeDriver:true}
        )}
        renderItem={({item,index})=>{
          const inputRange=[
            (index - 1) * height,
            index * height,
            (index + 1) * height
          ]
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange : [-height * .1, 0, height * .1]
          })
          return(
            <>
              <View style={{width,alignItems:'center'}}>
                <View style = {{
                  borderRadius: 18,
                  borderWidth: 10,
                  borderColor:'white',
                  shadowColor:'#000',
                  shadowOpacity:1,
                  shadowRadius:20,
                  shadowOffset:{
                    width:0,
                    height:0,
                  },
                  padding:4,
                  elevation:20,
                  backgroundColor:'white'
                }}>
                <View style={{
                  width : ITEM_WIDTH , 
                  height : ITEM_HEIGHT,
                  overflow:'hidden',
                  alignItems:'center',
                  borderRadius:14,
                }}>
                  <Animated.Image
                    source = {{uri:item.photo}}
                    style={{
                      width : ITEM_WIDTH, 
                      height : ITEM_HEIGHT * 1.3,
                      resizeMode:'cover',
                      transform:[{translateY,}]
                    }}/>
                  </View>
                </View>
              </View>
              <Text style={{fontSize:30, paddingLeft:20, fontFamily:'NanumR'}}>{item.title}</Text>
              <Text style={{fontSize:17, paddingLeft:20, fontFamily:'NanumR'}}>{item.content}</Text>
            </>
          )
        }}/>
    </View>
  );
}

