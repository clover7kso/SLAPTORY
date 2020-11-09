import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  padding-left: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${props => props.theme.WHITE};
  border: 1px solid ${props => props.theme.PURPLE};
  border-radius: 4px;
  font-size:15px
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  secureTextEntry = false,
  returnKeyType = "done",
  onEndEditing = () => null,
  autoCorrect = true,
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      autoCorrect={autoCorrect}
      value={value}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onEndEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

export default AuthInput;
