import { NewsDataType } from "@/types"
import { Link } from "expo-router"
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"

interface NewsCardProps {
    news: NewsDataType
}
const NewsCard = ({ news }: NewsCardProps) => {

    const { width, height } = useWindowDimensions()
    return (
        <View className="mb-4">
            <Link href={{
                pathname: '/news/[id]',
                params: { id: news.article_id }
            }} asChild>
                <TouchableOpacity>
                    <View className="flex-row gap-4">
                        <Image height={110} width={width * 0.25} className="rounded-[20]" source={{ uri: news.image_url }} />
                        <View className="w-[70%] gap-2">
                            <Text style={{ fontFamily: "Inter_500Medium" }} className="uppercase text-gray-700 ">{news.category}</Text>
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="line-clamp-2">{news.title}</Text>
                            <View className="flex-row items-center gap-2">
                                {
                                    news.source_icon && <Image className="w-[20] h-[20] rounded-full" source={{ uri: news.source_icon }} />
                                }
                                <Text>{news.source_name}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}
export default NewsCard