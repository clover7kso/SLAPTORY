import React,{useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../config'

const Touchable = styled.TouchableOpacity`
  flex:1
`;

const Container = styled.View`
  flex:1
  justify-content:center
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

const CustomAlert = ({visible, onCancle, onConfirm, title, content}) => (
    <Container>
        <Modal isVisible={visible.value}>
        <InnerContainer>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <ButtonContainer>
                <Touchable onPress={()=>{
                    if(onConfirm!==undefined) onConfirm()
                    visible.onChange(false)
                }} >
                    <Confirm>확인</Confirm>
                </Touchable>
                
                <Touchable onPress={()=>{
                    if(onCancle!==undefined) onCancle()
                    visible.onChange(false)
                }}>
                    <Cancel>취소</Cancel>
                </Touchable>
            </ButtonContainer>
        </InnerContainer>
        </Modal>
    </Container>
);

CustomAlert.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default CustomAlert;
