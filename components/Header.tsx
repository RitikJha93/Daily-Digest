import { Ionicons } from "@expo/vector-icons"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Header = () => {
    return (
        <View className="flex-row py-2 pt-6 w-full items-center justify-between">
            <View className="flex-row gap-4 items-start">
                <Image
                    className="w-[50] h-[50] rounded-full"
                    resizeMode="cover"
                    source={{ uri: "https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_960_720.jpg" }} />
                <View>
                    <Text style={{fontFamily : "Inter_400Regular"}} className="text-base">
                        Welcome
                    </Text>
                    <Text style={{fontFamily : "Inter_600SemiBold"}} className="text-xl">
                        John Doe
                    </Text>
                </View>
            </View>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={26} />
            </TouchableOpacity>
        </View>
    )
}
export default Header