import styled from "styled-components/native";
import  ArrowLeft   from 'phosphor-react-native/src/icons/ArrowLeft';


export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 50px;
    height: 60px;
`;

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`;

export const BackIcon = styled(ArrowLeft).attrs(({ theme }) => ({
    size: 30,
    color: theme.COLORS.WHITE
}))``;