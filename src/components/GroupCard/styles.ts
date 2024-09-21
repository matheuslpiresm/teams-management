import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import UsersThree from 'phosphor-react-native/src/icons/UsersThree'

export const Container = styled(TouchableOpacity)`
    width: 49%;
    height: 145px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_500};
    border-radius: 6px;

    flex-direction: row;
    align-items: center;

    padding: 24px;
    margin-bottom: 12px;
`;

export const Content = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
    size: 38,
    color: theme.COLORS.BLUE_500,
    weight: 'fill'
}))`
    margin-bottom: 15px;
`;