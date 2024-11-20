import { Ionicons } from "@expo/vector-icons"
import { TextInput, View } from "react-native"

interface SearchbarProps {
  searchText: (text: string) => void;
}
const Searchbar = ({ searchText }: SearchbarProps) => {
  return (
    <View className="py-4">
      <View className="flex-row items-center gap-x-1 bg-gray-200 py-2 px-4 rounded-lg">
        <Ionicons name="search" size={22} style={{ color: "grey" }} className="text-slate-700" />
        <TextInput
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-lg"
          placeholder="Search for news.."
          onChangeText={text => searchText(text)}
        />
      </View>
    </View>
  )
}
export default Searchbar