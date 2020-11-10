import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import useAlert from "../../hooks/useAlert";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import {  useMutation } from "react-apollo-hooks";
import {SIGN_UP, PHONE_CHECK, PHONE_REQUEST } from "./AuthQueries";
import {
  ScrollView,
  BackHandler,
} from "react-native";
import BackPressHeaderAuth from "../../components/BackPressHeaderAuth";
import CustomAlert from "../../components/CustomAlert";

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
  color:white
  padding-left: 12px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 4px;
  
  background-color: ${(props) => props.theme.PURPLE};
  border: 1px solid ${(props) => props.theme.PURPLE};
`;


const Row = styled.View`
  flex-direction:row
  align-items: center;
  justify-content: space-between;
`;

export default ({ navigation }) => {
  const alert_1 = useAlert(false,"뒤로가기하려구요?","현재까지 내용은 저장되지 않습니다");
  const alert_2 = useAlert(false,"회원가입 TITLE", "회원가입 CONTENT");
  const alert_3 = useAlert(false,"회원가입 완료","로그인을 로그인해주세요!");

  const emailInput = useInput("");
  const phoneInput = useInput("");
  const validInput = useInput("");
  const [sendValid, setSendValid] = useState(false);
  const [validCheck, setValidCheck] = useState(false);
  const pwInput = useInput("");
  const pwConfirmInput = useInput("");
  const nameInput = useInput("");

  const [registerLoading, setRegisterLoading] = useState(false);

  const [signUpMutation] = useMutation(SIGN_UP);
  const [phoneRequestMutation] = useMutation(PHONE_REQUEST);
  const [checkValidMutation] = useMutation(PHONE_CHECK);

  const handleRegister = async () => {
    try {
      if(!validCheck)
        return alert_2.onChange(true,"회원가입 오류","전화번호 인증이 필요합니다.")
      setRegisterLoading(true);
      const emailValue = emailInput.value;
      const phoneValue = phoneInput.value;
      const pwValue = pwInput.value;
      const pwConfirmValue = pwConfirmInput.value;
      const nameValue = nameInput.value;
      

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex =  /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;
      

      if (emailValue === "") {
        return alert_2.onChange(true,"회원가입 오류","이메일이 비어있습니다")
      } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
        return alert_2.onChange(true,"회원가입 오류","올바른 이메일형식을 입력해주세요")
      } else if (!emailRegex.test(emailValue)) {
        return alert_2.onChange(true,"회원가입 오류","올바른 이메일형식을 입력해주세요")
      }
      if (phoneValue === "") {
        return alert_2.onChange(true,"회원가입 오류","전화번호가 비어있습니다")
      } else if (!phoneRegex.test(phoneValue)) {
        return alert_2.onChange(true,"회원가입 오류", "잘못된 휴대폰 번호입니다.")
      }
      if (pwValue === "") {
        return alert_2.onChange(true,"회원가입 오류","비밀번호가 비어있습니다")
      } else if (pwValue !== pwConfirmValue) {
        return alert_2.onChange(true,"회원가입 오류","비밀번호가 일치하지 않습니다")
      } else if (!pwRegex.test(pwValue)) {
        return alert_2.onChange(true,"회원가입 오류","특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식")
      }
      if (nameValue === "") {
        return alert_2.onChange(true,"회원가입 오류","실명이 비어있습니다")
      } else if (!nameRegex.test(nameValue)) {
        return alert_2.onChange(true,"회원가입 오류","닉네임은 2 ~ 12글자로 입력해주세요")
      }

      const {
        data: { signUp },
      } = await signUpMutation(
        {
          variables:{
            id:emailValue,
            password:pwValue,
            name:nameValue,
            phone:phoneValue
          }
        }
      );
      if(signUp){
        alert_3.onChange(true)
      }

    } catch (e) {
      alert_2.onChange(true,"회원가입 오류",e.message.replace("GraphQL error: ", ""))
    } finally {
      setRegisterLoading(false);
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      alert_1.onChange(true)
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <OutContainer>
      <BackPressHeaderAuth navigation = {navigation}/>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
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
              <AuthInput
                {...pwConfirmInput}
                placeholder="비밀번호 확인"
                keyboardType="default"
                secureTextEntry={true}
              />
              <AuthInput
                {...nameInput}
                placeholder="닉네임 (채널명)"
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
                <Touchable onPress={async()=>{
                  if(phoneInput.value==="")
                    return alert_2.onChange(true,"회원가입 오류","전화번호를 입력해주세요")
                  try{
                    const {
                      data: { phoneRequest },
                    } = await phoneRequestMutation({
                        variables:{
                          phoneNumber:phoneInput.value
                        }
                    })
                    if(phoneRequest)
                    {
                      alert_2.onChange(true,"회원가입","인증번호가 발송되었습니다")
                      setSendValid(true)
                    }
                  }
                  catch (e) {
                    alert_2.onChange(true,"회원가입 오류",e.message.replace("GraphQL error: ", ""))
                  }
                  
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
                      return  alert_2.onChange(true,"회원가입 오류","인증번호를 입력해주세요")
                      const {
                        data: { phoneCheck },
                      } = await checkValidMutation(
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
                      return alert_2.onChange(true,"회원가입 오류","인증번호 재요청이 필요합니다")
                    }else{
                      setValidCheck(phoneCheck)
                      return alert_2.onChange(true,"회원가입","인증번호가 확인되었습니다")
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
                onPress={()=>handleRegister()}
                text="회원가입"
              />
            </InContainer1>
            
            <CustomAlert alertValue = {alert_1} onConfirm={()=>navigation.pop(1)} onCancle={()=>{}}/>
            <CustomAlert alertValue = {alert_2}/>
            <CustomAlert alertValue = {alert_3} onConfirm={()=>navigation.pop(1)}/>
          </OutContainer>
        </TouchableWithoutFeedback>
      </ScrollView>
    </OutContainer>
  )
};
