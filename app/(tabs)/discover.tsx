import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import newsCategoryList from '@/constants/Categories'
import Checkbox from '@/components/Checkbox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useCountries } from '@/hooks/useCountry'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {

  const { top: safeTop } = useSafeAreaInsets()

  const { newsCategories, toggleNewsCategory } = useNewsCategories()
  const { countries, toggleNewsCountry } = useCountries()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop,paddingBottom : 20 }]} className='px-6 mt-2'>
      <Searchbar searchText={(value) => setSearchQuery(value)} />
      <View>
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className='text-2xl'>Categories</Text>
        <View className='flex-row gap-4 flex-wrap mt-4'>
          {
            newsCategories.map((item, i) => (
              <Checkbox
                label={item.title}
                key={item.id}
                checked={item.selected}
                onChecked={() => {
                  toggleNewsCategory(item.id)
                  setSelectedCategory(item.slug)
                }
                }
              />
            ))
          }
        </View>
      </View>

      <View className='mt-6'>
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className='text-2xl'>Countries</Text>
        <View className='flex-row gap-4 flex-wrap mt-4'>
          {
            countries.map((item, i) => (
              <Checkbox
                key={i}
                label={item.name}
                checked={item.selected}
                onChecked={() => {
                  toggleNewsCountry(i)
                  setSelectedCountry(item.code)
                }
                }
              />
            ))
          }
        </View>
      </View>

      <Link href={{ pathname: '/news/search', params: { searchQuery: searchQuery, category: selectedCategory, countryCode: selectedCountry } }} asChild>
        <TouchableOpacity style={{ backgroundColor: Colors.tint }} className=' py-4 justify-center rounded-lg mt-10'>
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className='text-white text-lg text-center'>Search</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})