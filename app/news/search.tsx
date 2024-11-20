import NewsCard from "@/components/NewsCard"
import NewsList from "@/components/NewsList"
import { NewsDataType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native"

const Page = () => {

    const router = useRouter()
    const [newsList, setNewsList] = useState<NewsDataType[]>([])
    const [loading, setLoading] = useState(false)
    const { searchQuery, category, countryCode } = useLocalSearchParams<{
        searchQuery: string,
        category: string,
        countryCode: string
    }>()

    const getNews = async () => {
        const params: any = {
            apikey: process.env.EXPO_PUBLIC_API_KEY,
        }

        if (countryCode != "") {
            params["country"] = countryCode
        }

        if (searchQuery != "") {
            params["q"] = searchQuery
        }
        if (category != "") {
            params["category"] = category
        }
        setLoading(true)
        try {
            const { data } = await axios.get(`https://newsdata.io/api/1/news`, {
                params: params
            })
            setNewsList(data.results)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getNews()
    }, [])

    return (
        <View>
            <Stack.Screen options={{
                headerTitle: "Search",
                headerTitleAlign: "center",
                headerLeft: () => {
                    return <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} />
                    </TouchableOpacity>
                },
            }}>

            </Stack.Screen>
            {
                loading ? <ActivityIndicator className="mt-6" /> :
                    <View className='px-6 mt-8 mb-16'>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={newsList}
                            keyExtractor={(_, index) => `list_item_${index}`}
                            renderItem={({ item, index }) => <NewsCard news={item} />}
                        />
                    </View>
            }
        </View>
    )
}
export default Page