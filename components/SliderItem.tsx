import { NewsDataType } from "@/types"
import { Image, Text, useWindowDimensions, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';

type SliderItemProps = {
    news: NewsDataType;
    index: number
}
const SliderItem = ({ news, index }: SliderItemProps) => {

    const { width, height } = useWindowDimensions()

    return (
        <View style={{ width }} className="justify-center items-center relative">
            <Image style={{ width: width - 50, height: height * 0.2 }} className="rounded-xl" resizeMode="cover" source={{ uri: news.image_url }} />
            <LinearGradient
                colors={[
                    'rgba(0, 0, 0, 0)', // Fully transparent black
                    'rgba(0, 0, 0, 0.5)', // Semi-transparent black
                    'rgba(0, 0, 0, 1)', // Fully opaque black
                ]}
                style={{ width: width - 50, height: height * 0.2 }} className="absolute justify-end p-4 gap-2">
                <View className="flex-row gap-2">
                    {

                        news.source_icon && <Image source={{ uri: news.source_icon }} className="w-[20] h-[20] rounded-full" />
                    }
                    <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white">{news.source_name}</Text>
                </View>
                <Text style={{ fontFamily: "Inter_400Regular" }} className="line-clamp-2 text-white text-base">
                    {news.title}
                </Text>
            </LinearGradient>
        </View>
    )
}
export default SliderItem