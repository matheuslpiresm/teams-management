import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storeConfig';

import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupDeleted: string){
    try {
        const storedGroups = await groupsGetAll();
        const groups = storedGroups.filter(group => group !== groupDeleted);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);

        return groups;
    } catch (error) {
        throw error;
    }
}