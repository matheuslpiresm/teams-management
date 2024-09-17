import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


export function Teams() {
  const [teams, setTeams] = useState<string[]>(['Equipe Syncorp', 'Equipe Sbcert']);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  return (
    <Container>
      <Header />
      <Highlight
        title="Equipe"
        subtitle="Jogue com a sua equipe"
      />

      <FlatList
        data={teams}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={teams.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Que pena, ainda não existem equipes cadastradas!"
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Criar nova equipe"
        onPress={handleNewGroup}
      />
    </Container>
  );
}

