import styled from "styled-components/native";
import  SmileySad   from 'phosphor-react-native/src/icons/SmileySad';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Message = styled.Text`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 100px;

    font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
    color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const EmptyIcon = styled(SmileySad).attrs(({ theme }) => ({
    size: 80,
    color: theme.COLORS.WHITE,
}))``;