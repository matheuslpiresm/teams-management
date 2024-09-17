import { useState } from 'react';
import { Container, Content, Icon } from './styles';

import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    function handleAddPlayers() {
        navigation.navigate('players', { group })
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova Equipe"
                    subtitle="Crie uma nova equipe para jogar com você"
                />

                <Input
                    placeholder='Nome da equipe'
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleAddPlayers}
                />

            </Content>
        </Container>
    )
}
