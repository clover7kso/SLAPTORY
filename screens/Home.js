import React from "react";
import styled from "styled-components";

const OutContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Text = styled.Text`
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  return (
      <OutContainer>
          <Text>테스트중입니다</Text>
      </OutContainer>
  )
};
