import { NewsDataType } from "@/types"
import { View } from "react-native"
import NewsCard from "./NewsCard"

type NewsListProps = {
    newsList: NewsDataType[]
}
const NewsList = ({ newsList }: NewsListProps) => {

    return (
        <View className="px-6 pt-6 pb-4">
            {
                newsList.map((news, index) => (
                    <NewsCard news={news} key={index} />
                ))
            }
        </View>
    )
}
export default NewsList