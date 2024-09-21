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
import { Loading } from '@components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      {
        isLoading ? <Loading /> :
<FlatList
  data={groups}
  keyExtractor={item => item}
  renderItem={({ item }) => (
    <GroupCard
      title={item}
      onPress={() => handleOpenGroup(item)}
      style={{ marginRight: 8, marginBottom: 7 }} // Adicione um estilo para espaçamento
    />
  )}
  ListEmptyComponent={() => (
    <ListEmpty message="Que pena, ainda não existem equipes cadastradas!" />
  )}
  showsVerticalScrollIndicator={false}
  numColumns={2} // Ajuste o número de colunas conforme desejado
  contentContainerStyle={groups.length === 0 ? { flex: 1 } : { padding: 10 }} // Padding opcional para espaçamento
/>

      }

      <Button
        title="Criar nova equipe"
        onPress={handleNewGroup}
      />
    </Container>
  );
}

