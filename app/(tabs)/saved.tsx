import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NewsDataType } from '@/types'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import NewsCard from '@/components/NewsCard'

type Props = {}

const Page = (props: Props) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([])

  const getNews = async () => {
    console.log("fetching...")
    setIsLoading(true)
    await AsyncStorage.getItem("bookmark").then(async (token: any) => {
      const res = JSON.parse(token)
      console.log("result", res)
      if (res && res.length > 0) {
        const query_string = res.join(",")
        try {
          const { data } = await axios.get(`https://newsdata.io/api/1/news`, {
            params: {
              apikey: process.env.EXPO_PUBLIC_API_KEY,
              id: query_string
            }
          })
          console.log(data.results)
          setBookmarkNews(data.results)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setBookmarkNews([])
        setIsLoading(false)
      }
    })

  }
  useEffect(() => {
    getNews()
  }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTitle: "Saved",
        headerTitleAlign: "center",
        headerShown : true,
        headerBackVisible : false
      }} />

      {
        isLoading ? <ActivityIndicator /> : bookmarkNews.length === 0 ? <View>
          <Text>No Saved Jobs!</Text>
        </View> :
          <View className='px-6 mt-8 mb-16'>
            <FlatList
              data={bookmarkNews}
              keyExtractor={(_, i) => `list_item_${i}`}
              renderItem={({ item, index }) => {
                return <NewsCard key={index} news={item} />
              }}
            />
          </View>
      }
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})