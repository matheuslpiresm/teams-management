import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function NewTeam() {
    return(
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlight 
                    title="Nova Equipe"
                    subtitle="Crie uma nova equipe para jogar com você"
                />

                <Input 
                    placeholder='Nome da equipe'
                />

                <Button 
                    title="Criar"
                    style={{ marginTop:20}}
                />

            </Content>
        </Container>
    )
}
