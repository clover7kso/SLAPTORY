import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import { useLogIn } from "../../AppAuthContext";
import BackPressHeaderAuth from "../../components/BackPressHeaderAuth";

const OutContainer = styled.View`
  flex: 1;
  background:${props => props.theme.WHITE}
`;

const InContainer1 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const pwInput = useInput("");
  const logIn = useLogIn();

  const [loading, setLoading] = useState(false);
  const [signInMutation] = useMutation(LOG_IN, {
    variables: {
      id: emailInput.value,
      password: pwInput.value,
    },
  });
  const handleLogin = async () => {
    const emailValue = emailInput.value;
    const pwValue = pwInput.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValue === "") {
      return Alert.alert("이메일이 비어있습니다");
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      return Alert.alert("올바른 이메일형식을 입력해주세요");
    } else if (!emailRegex.test(emailValue)) {
      return Alert.alert("올바른 이메일형식을 입력해주세요");
    }
    if (pwValue === "") {
      return Alert.alert("비밀번호가 비어있습니다");
    }
    try {
      setLoading(true);
      const {
        data: { signIn },
      } = await signInMutation();

      if (signIn) {
        logIn(signIn);
        return;
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OutContainer>
        <BackPressHeaderAuth navigation = {navigation}/>
        <InContainer1>
          <AuthInput
            {...emailInput}
            placeholder="이메일"
            keyboardType="email-address"
          />
          <AuthInput
            {...pwInput}
            placeholder="비밀번호"
            keyboardType="default"
            secureTextEntry={true}
          />
          <AuthButton
            disabled={loading}
            loading={loading}
            onPress={handleLogin}
            text="로그인"
          />
          <AuthButtonText
            onPress={() => navigation.navigate("Findpw")}
            text={"비밀번호를 잊으셨나요?"}
          />
        </InContainer1>
      </OutContainer>
    </TouchableWithoutFeedback>
  );
};
