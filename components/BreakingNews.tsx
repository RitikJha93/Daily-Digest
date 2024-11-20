import { NewsDataType } from "@/types"
import { View, Text, FlatList, useWindowDimensions } from "react-native"
import SliderItem from "./SliderItem"

type props = {
    news: NewsDataType[]
}
const BreakingNews = ({ news }: props) => {

    return (
        <View>
            <Text style={{fontFamily : "Inter_600SemiBold"}} className="px-6 text-2xl">Breaking News</Text>
            <View className="justify-center mt-4">
                <FlatList
                    data={news}
                    keyExtractor={(_, index) => `list_item_${index}`}
                    renderItem={({ item, index }) => <SliderItem news={item} index={index} />}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}
export default BreakingNews