import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';

import { Alert } from 'react-native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { AppError } from '@utils/AppError';

import { groupCreate } from '@storage/group/groupCreate';

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleAddPlayers() {
        try {
            if (group.trim().length == 0) {
                return Alert.alert('Nova Equipe', 'Digite o nome da equipe');
            }

            await groupCreate(group)
            navigation.navigate('players', { group });

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Equipe', error.message);
            } else {
                Alert.alert('Nova Equipe', 'Não foi possível criar uma nova equipe');
                console.log(error);
            }
        }
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
