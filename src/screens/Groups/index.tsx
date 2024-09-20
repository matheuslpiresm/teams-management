import { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Container } from './styles';

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <Highlight
        title="Equipe"
        subtitle="Jogue com a sua equipe"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
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

