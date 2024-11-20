import { NewsDataType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import Moment from "moment"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Colors } from "@/constants/Colors"
import { isLoading } from "expo-font"
const NewsDetails = () => {

    const { width, height } = useWindowDimensions()
    const { id } = useLocalSearchParams<{ id: string }>()
    const [news, setNews] = useState<NewsDataType | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [bookmark, setBookmark] = useState(false)
    const getNews = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://newsdata.io/api/1/news`, {
                params: {
                    apikey: process.env.EXPO_PUBLIC_API_KEY,
                    id: id
                }
            })
            setNews(data.results[0])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getNews()
    }, [])

    useEffect(() => {
        if (!loading) {
            renderBookmark(news?.article_id || "")
        }
    }, [loading])

    const saveBookmark = async (newsId: string) => {
        setBookmark(true)
        await AsyncStorage.getItem("bookmark").then((token: any) => {
            const res = JSON.parse(token)
            if (res != null && res.length > 0) {
                let data = res.find((value: string) => value === newsId)

                if (data == null) {
                    res.push(newsId)
                    AsyncStorage.setItem("bookmark", JSON.stringify(res))
                    alert("News Saved!")
                }
            } else {
                let bookmark = []
                bookmark.push(newsId)
                AsyncStorage.setItem("bookmark", JSON.stringify(bookmark))
                alert("News Saved!")
            }
        })

    }

    const removeBookmark = async (newsId: string) => {
        setBookmark(false)
        const bookmark = await AsyncStorage.getItem("bookmark").then((token: any) => {
            const res = JSON.parse(token)
            return res.filter((id: string) => id != newsId)
        })

        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark))
        alert("News Saved!")
    }

    const renderBookmark = async (newsId: string) => {
        await AsyncStorage.getItem("bookmark").then((token: any) => {
            const res = JSON.parse(token)
            if (res != null && res.length > 0) {
                const data = res.find((id: string) => id === newsId)
                console.log(data)
                return data === null || data === undefined ? setBookmark(false) : setBookmark(true)
            }
        })
    }
    return (
        <View>
            <Stack.Screen options={{
                headerTitle: "",
                headerLeft: () => {
                    return <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} />
                    </TouchableOpacity>
                },
                headerRight: () => {
                    return <TouchableOpacity onPress={() => bookmark ? removeBookmark(news?.article_id || "") : saveBookmark(news?.article_id || "")}>
                        <Ionicons name={bookmark ? "heart" : "heart-outline"} size={28} color={bookmark ? "red" : Colors.black} />
                    </TouchableOpacity>
                }
            }}>

            </Stack.Screen>

            {
                loading ? <ActivityIndicator className="mt-6" /> :
                    <ScrollView>
                        <View className="py-4 px-6 gap-6">
                            <View className="gap-4">
                                <Text className="line-clamp-2 text-xl" style={{ fontFamily: "Inter_700Bold" }}>{news?.title}</Text>
                                <View className="flex-row justify-between w-full gap-2">
                                    <Text style={{ fontFamily: "Inter_500Medium" }}>{Moment(news?.pubDate).format("MMMM DD,hh:mm a")}</Text>
                                    <Text style={{ fontFamily: "Inter_500Medium" }}>{news?.source_name}</Text>
                                </View>
                            </View>
                            <Image width={width - 40} height={height / 3} className="rounded-[30]" source={{ uri: news?.image_url }} />
                            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-lg">{news?.description}</Text>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}
export default NewsDetails