import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.tabIconSelected,headerTitleStyle : {fontSize : 20} }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name='home' size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <Ionicons name='compass-outline' size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => <Ionicons name='bookmark-outline' size={24} color={color} />
        }}
      />
    </Tabs>
  )
}

export default TabLayout