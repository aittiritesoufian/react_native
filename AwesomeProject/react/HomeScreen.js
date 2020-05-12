import React, { useState, useEffect } from "react";
import { Avatar, Title, Card, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const HomeScreen = () =>{
    const [count, setCount] = useState(null);
    const onSave = () => {
        AsyncStorage.setItem('count', JSON.stringify(count)).then(() => alert('saved'))
    }

    const logged = async () => {
        const text = await AsyncStorage.getItem('count');
        console.log(text);
        return text;
    }

    useEffect(() => {
        fetch('https://api.safeshop.fr/shop/all').then(response => response.json()).then(data => console.log(data))
    }, []);

    if(logged === null){
        return <ActivityIndicator />;
    }
    return (<Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
        <Title>Card title {count}</Title>
        <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button onPress={()=> setCount(count+1)}>+1</Button>
      <Button onPress={onSave}>Save</Button>
    </Card.Actions>
  </Card>)
};

export default HomeScreen