import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Teams } from '@screens/Teams'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name="teams"
                component={Teams}
            />

            <Screen
                name="newGroup"
                component={NewGroup}
            />

            <Screen
                name="players"
                component={Players}
            />
        </Navigator>
    );
}
