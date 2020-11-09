import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  align-items: center;
  margin-top: 10px;
`;

const Text = styled.Text`
  font-family:NanumB
  padding: 5px;
  color: ${props => props.theme.PURPLE};
`;

const AuthButton = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
