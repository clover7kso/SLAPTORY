import React from "react";
import styled from "styled-components";

const OutContainer = styled.View`
  align-items: center;
  flex: 1;
`;
const Text = styled.Text`
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  return (
      <OutContainer>
          <Text>테스트중입니다</Text>
      </OutContainer>
  )
};
