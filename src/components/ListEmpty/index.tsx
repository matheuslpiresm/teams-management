import { Container, EmptyIcon, Message } from './styles';

type Props = {
    message: string;
}

export function ListEmpty({ message }: Props) {
    return (
        <Container>
            <EmptyIcon />
            <Message>
                {message}
            </Message>
        </Container>
    );
}