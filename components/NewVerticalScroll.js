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

const datas = [
  {
    image:'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
    title:"태국여행이 가고싶어지게 만드는 코끼리",
    content:"코끼리의 눈을 보면 내면의 모습과 마주할 수 있다는 속설이 있어요.\n\n코끼리는 슬픔을 잘 느끼는 동물 중 하나입니다. 코끼리의 경우 길을 가다 코끼리의 뼈만 발견해도 한참 동안 멈춰 서 가족이나 친구의 뼈가 아닌지 살펴보기 때문입니다.\n\n모성애가 강한 동물은 새끼가 다치거나 죽으면 슬퍼하다 못해 고통스러워하는데요.\n\n그 슬픔은 사람이나 코끼리나 다를게 없으며 어쩌면 그런점은 정말 사람과 닮은점이 아닐까 싶네요."
  },
  {
    image:'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
    title:"",
    content:""},
  {
    image:'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
    title:"",
    content:""
  },
  {
    image:'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
    title:"",
    content:""
  },
];

const data = datas.map((data, index) => ({
  key: String(index),
  photo: data.image,
  title: data.title,
  content: data.content,
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
                  borderWidth: 5,
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
                  marginTop : 15,
                  marginBottom : 25,
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
              {item.title!=="" && item.title!==undefined?<Text style={{fontSize:30, paddingLeft:25,fontFamily:'NanumR'}}>{item.title}</Text>:null}
              {item.content!=="" && item.content!==undefined?<Text style={{fontSize:17, paddingLeft:25, marginTop : 10,fontFamily:'NanumR'}}>{item.content}</Text>:null}
            </>
          )
        }}/>
    </View>
  );
}

