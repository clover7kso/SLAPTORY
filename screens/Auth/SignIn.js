import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import useAlert from "../../hooks/useAlert";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { SIGN_IN } from "./AuthQueries";
import { useSignIn } from "../../AppAuthContext";
import CustomAlert from "../../components/CustomAlert";

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
  const alert_1 = useAlert(false,"로그인 TITLE", "로그인 CONTENT");

  const signInApp = useSignIn();

  const emailInput = useInput("");
  const pwInput = useInput("");

  const [loading, setLoading] = useState(false);
  const [signInMutation] = useMutation(SIGN_IN, {
    variables: {
      id: emailInput.value,
      password: pwInput.value,
    },
  });
  const handleSignIn = async () => {
    const emailValue = emailInput.value;
    const pwValue = pwInput.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValue === "") {
      return alert_1.onChange(true,"로그인 오류","이메일이 비어있습니다")
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      return alert_1.onChange(true,"로그인 오류","올바른 이메일형식을 입력해주세요")
    } else if (!emailRegex.test(emailValue)) {
      return alert_1.onChange(true,"로그인 오류","올바른 이메일형식을 입력해주세요")
    }
    if (pwValue === "") {
      return alert_1.onChange(true,"로그인 오류","비밀번호가 비어있습니다")
    }
    try {
      setLoading(true);
      const {
        data: { signIn },
      } = await signInMutation();

      if (signIn) {
        signInApp(signIn);
        return;
      }
    } catch (e) {
      alert_1.onChange(true,"로그인 오류",e.message.replace("GraphQL error: ", ""))
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OutContainer>
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
            onPress={handleSignIn}
            text="로그인"
          />
          <AuthButtonText
            onPress={() => navigation.navigate("Findpw")}
            text={"비밀번호를 잊으셨나요?"}
          />
        </InContainer1>
        
        <CustomAlert alertValue = {alert_1}/>
      </OutContainer>
    </TouchableWithoutFeedback>
  );
};
