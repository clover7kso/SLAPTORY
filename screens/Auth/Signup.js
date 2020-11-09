import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {  useMutation } from "react-apollo-hooks";
import { CHECK_ID_PHONE, PHONE_CHECK, PHONE_REQUEST } from "./AuthQueries";
import {
  ScrollView,
  BackHandler,
} from "react-native";
import BackPressHeaderAuth from "../../components/BackPressHeaderAuth";

const OutContainer = styled.View`
  background : white
  flex: 1;
`;

const InContainer1 = styled.View`
  flex: 2.5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

const InContainer2 = styled.View`
  margin-right:15px
  flex: 2.5;
  justify-content: center;
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  padding-left:17px
  padding-top:13px
  padding-bottom:13px
  padding-right:17px
  background-color: ${props => props.theme.PURPLE};
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-family:NanumB
  color: white;
  text-align: center;
  font-size:15px
`;

const ContainerFinal = styled.View`
  margin-bottom: 10px;
`;

const TextFinal = styled.Text`
  color:black
  padding-left: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 4px;
  
  background-color: ${(props) => props.theme.darkGreyColor};
  border: 1px solid ${(props) => props.theme.darkGreyColor};
`;


const Row = styled.View`
  flex-direction:row
  align-items: center;
  justify-content: space-between;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const phoneInput = useInput("");
  const validInput = useInput("");
  const [sendValid, setSendValid] = useState(false);
  const [validCheck, setValidCheck] = useState(false);
  const pwInput = useInput("");
  const pwConfirmInput = useInput("");
  const nameInput = useInput("");

  const [registerLoading, setRegisterLoading] = useState(false);

  
  const [uploadMutaion] = useMutation(CHECK_ID_PHONE, {
    variables: {
      id: emailInput.value,
      phone: phoneInput.value,
    },
  });

  const [phoneRequest] = useMutation(PHONE_REQUEST);
  const [checkValid] = useMutation(PHONE_CHECK);

  const handleSubmit = async (navigateTo) => {
    try {
      const {
        data: { checkIdPhone },
      } = await uploadMutaion();

      if (checkIdPhone) {
        navigation.navigate(navigateTo, {
          id: emailInput.value,
          password: pwInput.value,
          phone: phoneInput.value,
          name: nameInput.value
        });
      }
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
  };

  const handleRegister = async (navigateTo) => {
    try {
      if(!validCheck)
        return Alert.alert("전화번호 인증이 필요합니다.");
      setRegisterLoading(true);
      const emailValue = emailInput.value;
      const phoneValue = phoneInput.value;
      const pwValue = pwInput.value;
      const pwConfirmValue = pwConfirmInput.value;
      const nameValue = nameInput.value;
      

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex =  /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      const nameRegex = /^[가-힣]{2,4}$/;
      

      if (emailValue === "") {
        return Alert.alert("이메일이 비어있습니다");
      } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      } else if (!emailRegex.test(emailValue)) {
        return Alert.alert("올바른 이메일형식을 입력해주세요");
      }
      if (phoneValue === "") {
        return Alert.alert("전화번호가 비어있습니다");
      } else if (!phoneRegex.test(phoneValue)) {
        return Alert.alert(
          "잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요"
        );
      }
      if (pwValue === "") {
        return Alert.alert("비밀번호가 비어있습니다");
      } else if (pwValue !== pwConfirmValue) {
        return Alert.alert("비밀번호가 일치하지 않습니다");
      } else if (!pwRegex.test(pwValue)) {
        return Alert.alert(
          "특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식"
        );
      }
      if (nameValue === "") {
        return Alert.alert("실명이 비어있습니다");
      } else if (!nameRegex.test(nameValue)) {
        return Alert.alert("실명은 2 ~ 4글자 한글로 입력 해 주세요.");
      }

      handleSubmit(navigateTo);
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    } finally {
      setRegisterLoading(false);
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "회원가입이 완료되지 않았습니다",
        "화원가입이 완료되지 않은 상태에서 뒤로가면 내용은 저장되지 않습니다",
        [
          { text: "머무르기", style: "cancel", onPress: () => {} },
          {
            text: "뒤로가기",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.pop(1),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
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
            <AuthInput
              {...pwConfirmInput}
              placeholder="비밀번호 확인"
              keyboardType="default"
              secureTextEntry={true}
            />
            <AuthInput
              {...nameInput}
              placeholder="실명"
              keyboardType="default"
            />

          {!sendValid?
            <Row>
              <InContainer2>
                <AuthInput
                  {...phoneInput}
                  placeholder="전화번호"
                  keyboardType="number-pad"
                />
              </InContainer2>
              <Touchable onPress={()=>{
                if(phoneInput.value==="")
                  return Alert.alert("전화번호를 입력해주세요")
                phoneRequest(
                  {
                    variables:{
                    phoneNumber:phoneInput.value
                  }
                })
                Alert.alert("인증번호가 발송되었습니다")
                setSendValid(true)
              }}>
                <Container>
                  <Text>인증코드요청</Text>
                </Container>
              </Touchable>
            </Row>:
            <ContainerFinal>
              <TextFinal>{phoneInput.value}</TextFinal>
            </ContainerFinal>
          }
          {!validCheck?
            <Row>
              <InContainer2>
                <AuthInput
                    {...validInput}
                    placeholder="인증번호"
                    keyboardType="number-pad"
                  />
              </InContainer2>
              <Touchable onPress={async()=>
                {
                  if(validInput.value==="")
                    return Alert.alert("인증번호를 입력해주세요")
                    const {
                      data: { phoneCheck },
                    } = await checkValid(
                    {
                      variables:{
                        phoneNumber:phoneInput.value,
                        checkNumber:validInput.value
                      }
                  })
                  console.log(phoneCheck)
                  if(!phoneCheck){
                    setSendValid(false)
                    setValidCheck(false)
                    validInput.onChange("")
                    return Alert.alert("인증번호가 재요청이 필요합니다")
                  }else{
                    setValidCheck(phoneCheck)
                    return Alert.alert("인증번호가 확인되었습니다")
                  }
                }
              }>
                <Container>
                  <Text>번호확인</Text>
                </Container>
              </Touchable>
            </Row>:
            <ContainerFinal>
              <TextFinal>{validInput.value}</TextFinal>
            </ContainerFinal>
          }

            

            <AuthButton
              disabled={registerLoading}
              loading={registerLoading}
              onPress={()=>handleRegister("SignupDoctor")}
              text="회원가입"
            />
          </InContainer1>

        </OutContainer>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
};
