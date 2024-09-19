import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storeConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupsGetAll();
        
        const groupsAlreadyExists = storedGroups.includes(newGroup);

        if (groupsAlreadyExists){
            throw new AppError('Já existe uma equipe cadastrada com esse nome');
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    } catch (error) {
        throw error;
    }
}