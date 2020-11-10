import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Platform, Alert } from "react-native";
import { AVATAR_EDIT } from "./ProfileQueries";
import { useMutation } from "react-apollo-hooks";
import moment from "moment";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {SERVER_URL} from '../../config';

const OutContainer = styled.View`
  background: white;
  align-items: center;
  flex: 1;
`;

const ImageSelected = styled.Image`
  width: 200px;
  height: 200px;
  border-radius:3000px
  margin:30px
`;

const TouchableOpacity = styled.TouchableOpacity`
  margin: 10px;
`;

const ImageSelect = styled.Text`
  font-family:NanumB
  font-size: 20px;
`;

export default ({ navigation, route }) => {
  const { avatar, refresh } = route.params;
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [avatarEditMutation] = useMutation(AVATAR_EDIT);
  const handleSubmit = async () => {
    const formData = new FormData();
    const name = "UserAvatar-"+ id + moment().format("_YYYY:MM:DD_HH:mm:ss") + ".jpg";
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: image,
    });
    try {
      const {
        data: { location },
      } = await axios.post(SERVER_URL+"/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const {
        data: { avatarEdit },
      } = await avatarEditMutation({
        variables: {
          avatar: location,
        },
      });

      if (avatarEdit) {
        navigation.goBack();
        refresh();
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };
  return (
    <OutContainer>
      <ImageSelected
        source={
          image
            ? { uri: image }
            : avatar
            ? { uri: avatar }
            : require("../../assets/images/avatar.png")
        }
      />
      <TouchableOpacity onPress={pickImage}>
        <ImageSelect>사진변경</ImageSelect>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <ImageSelect>확인</ImageSelect>
      </TouchableOpacity>
    </OutContainer>
  );
};
