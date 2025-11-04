import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabsParamList } from '../types/navigation';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { BusinessScreen } from '../screens/BusinessScreen';
import { SportsScreen } from '../screens/SportsScreen';
import { TechnologyScreen } from '../screens/TechnologyScreen';
import { EntertainmentScreen } from '../screens/EntertainmentScreen';
import { ScienceScreen } from '../screens/ScienceScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ArticleScreen } from '../screens/ArticleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Business"
        component={BusinessScreen}
        options={{
          tabBarLabel: 'Business',
          tabBarIcon: ({ color }) => <TabIcon icon="💼" color={color} />,
        }}
      />
      <Tab.Screen
        name="Sports"
        component={SportsScreen}
        options={{
          tabBarLabel: 'Sports',
          tabBarIcon: ({ color }) => <TabIcon icon="⚽" color={color} />,
        }}
      />
      <Tab.Screen
        name="Technology"
        component={TechnologyScreen}
        options={{
          tabBarLabel: 'Tech',
          tabBarIcon: ({ color }) => <TabIcon icon="💻" color={color} />,
        }}
      />
      <Tab.Screen
        name="Entertainment"
        component={EntertainmentScreen}
        options={{
          tabBarLabel: 'Fun',
          tabBarIcon: ({ color }) => <TabIcon icon="🎬" color={color} />,
        }}
      />
      <Tab.Screen
        name="Science"
        component={ScienceScreen}
        options={{
          tabBarLabel: 'Science',
          tabBarIcon: ({ color }) => <TabIcon icon="🔬" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <TabIcon icon="🔍" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const TabIcon: React.FC<{ icon: string; color: string }> = ({ icon }) => {
  return <Text style={{ fontSize: 24 }}>{icon}</Text>;
};

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{
            title: 'Article',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
