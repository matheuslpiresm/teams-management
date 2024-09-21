import { TouchableOpacityProps } from 'react-native';

import { Container, Content, Icon, Title } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
}

export function GroupCard({ title, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Content>
                <Icon />
                <Title>
                    {title}
                </Title>
            </Content>
        </Container>
    );
}