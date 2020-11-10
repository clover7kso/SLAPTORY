import React,{useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../config'

const Container = styled.View`
  flex:1
  justify-content:center
  position : absolute
`;


const Touchable = styled.TouchableOpacity`
  flex:1
`;


const InnerContainer = styled.View`
  padding-top:40px
  padding-bottom:40px
  border-radius:20px
  justify-content:center
  background: ${props => props.theme.WHITE}
`;

const ButtonContainer = styled.View`
  flex-direction:row
  justify-content:space-around
  align-items:center
`;

const Title = styled.Text`
  font-family:NanumB
  color: ${props => props.theme.GREY}
  text-align: center;
  font-size:25px
  margin-bottom:20px
`;

const Content = styled.Text`
  font-family:NanumB
  color: ${props => props.theme.GREY}
  font-size:16px
  text-align: center;
  margin-bottom:30px
`;

const Confirm = styled.Text`
  font-family:NanumB
  color: ${props => props.theme.GREY}
  text-align: center;
  font-size:20px
`;

const Cancel = styled.Text`
  font-family:NanumB
  color: ${props => props.theme.GREY}
  text-align: center;
  font-size:20px
`;

const CustomAlert = ({ alertValue, onConfirm, onCancle}) => {
  return (
    <Container>
        <Modal isVisible={alertValue.visible}>
        <InnerContainer>
            <Title>{alertValue.title}</Title>
            <Content>{alertValue.content}</Content>
            <ButtonContainer>
                <Touchable onPress={()=>{
                    if(onConfirm!==undefined) onConfirm()
                    alertValue.onChange(false)
                }} >
                    <Confirm>확인</Confirm>
                </Touchable>
                {onCancle!==undefined?
                  <Touchable onPress={()=>{
                      if(onCancle!==undefined) onCancle()
                      alertValue.onChange(false)
                  }}>
                      <Cancel>취소</Cancel>
                  </Touchable>:null
                }
            </ButtonContainer>
        </InnerContainer>
        </Modal>
    </Container>
  );
}

CustomAlert.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default CustomAlert;
