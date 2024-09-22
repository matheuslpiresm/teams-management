import { useState, useEffect, useRef } from 'react';

import { Alert, FlatList, TextInput } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {

        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Novo participante', 'Digite o nome do participante para adiciona-lo!')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }
        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo participante', error.message);
                setNewPlayerName('');

            } else {
                console.log(error);
                Alert.alert('Novo participante', 'Não foi possível adicionar o participante.');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert('Participantes', 'Não foi possível carregar os participantes da equipe selecionada.')
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);

            fetchPlayersByTeam();

        } catch (error) {
            console.log(error);
            Alert.alert('Remover Participante', 'Não foi possível remover esse participante.')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert('Remover Equipe', 'Não foi possível remover essa equipe.')
        }
    }

    async function handleRemoveGroup() {
        Alert.alert(
            'Remover',
            'Deseja remover a equipe?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);


    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle='Adicione a galera e separe os times'
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder='Nome do participante'
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />
                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item == team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>


            {
                isLoading ? <Loading /> :

                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => handleRemovePlayer(item.name)}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmpty
                                message="Não há participantes nessa equipe"
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            { paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
                    />
            }


            <Button
                title='Remover Equipe'
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    )

}