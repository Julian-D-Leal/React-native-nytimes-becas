import React, {useState, useEffect} from 'react';
import { View , Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function News(){
    const [data, setData] = useState([]);
    //URL: la URL de tu endpoint API
    function postData() {
        const response =  fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=AmrV4WvGf6xJJBXTAwZJbegx9XxErAOJ", {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }).then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        //console.log(typeof responseJson);
        setData(responseJson.results);
      })
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
      }

      useEffect(()=>{
        postData()
      },[]);
      //alert(data)
    //console.log(data);

    const renderItem = ({ item}) => {
        return (
          <View >
            <View key={item.title}>
                <View style={styles.newsContainer}>
                    <Image source={{uri: item.multimedia[0].url}} style={styles.image}/>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.newsDescription}>{item.abstract}</Text>
                </View>
            </View>
          </View>
        )
      }

    return (
        <Carousel 
        sliderWidth={300}
        itemWidth={300}
        layout="default"
        data={data.slice(3,8)}
        renderItem={renderItem}
        inactiveSlideShift={1}
        />
      );
  }

  const styles = StyleSheet.create({
    newsContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: "600"
    },
    newsDescription: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 14
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
    },
    image:{
        width: 350,
        height: 250,
        resizeMode: 'cover',
    }
});