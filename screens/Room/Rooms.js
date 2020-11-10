import React from "react";
import styled from "styled-components";
import { useSignOut } from "../../AppAuthContext";

const OutContainer = styled.View`
  background:${props => props.theme.WHITE}
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Text = styled.Text`
  align-items: center;
  justify-content: center;
`;

const Touchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  const logOut = useSignOut();
  const handleLogOut = () => {
    logOut();
  };

  return (
      <OutContainer>
        <Touchable onPress={handleLogOut}>
          <Text>채팅방들-로그아웃</Text>
        </Touchable>
      </OutContainer>
  )
};
