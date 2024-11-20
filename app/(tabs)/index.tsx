import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import Searchbar from '@/components/Searchbar'
import { useGetAllNewsQuery } from '@/redux/services/base-api-service'
import axios from "axios"
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [categoryNews, setCategoryNews] = useState<NewsDataType[]>([])
  const [newsListLoading, setNewsListLoading] = useState(false)
  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: process.env.EXPO_PUBLIC_API_KEY,
          country: 'in',
          language: 'en',
        }
      })
      setBreakingNews(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  const getCategoryNews = async (category: string = "") => {
    const params: any = {
      apikey: process.env.EXPO_PUBLIC_API_KEY,
      country: 'in',
      language: 'en',
    }
    if (category != "" && category != "All") {
      params["category"] = category
    }

    setNewsListLoading(true)
    try {
      const { data } = await axios.get(`https://newsdata.io/api/1/news`, {
        params: params
      })
      setCategoryNews(data.results)
    } catch (error) {
      console.error(error)
    } finally {
      setNewsListLoading(false)
    }
  }
  useEffect(() => {
    fetchNews()
    getCategoryNews("")
  }, [])

  const handleCategoryChange = (category: string) => {
    console.log(category)

    setCategoryNews([])
    getCategoryNews(category)
  }
  return (
    <ScrollView className='' style={[styles.container, { paddingTop: safeTop }]} >
      <View className='px-6'>
        <StatusBar barStyle={"default"} />
        <Header />
        <Searchbar searchText={() => {}} />
      </View>
      <BreakingNews news={breakingNews} />
      <Categories onCategoryChanged={handleCategoryChange} />
      {
        newsListLoading ? <ActivityIndicator size={24} className='mt-6' /> :
          <NewsList newsList={categoryNews} />
      }
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})