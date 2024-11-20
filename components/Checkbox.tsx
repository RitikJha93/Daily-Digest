import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native"
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, LinearTransition, useAnimatedStyle, withTiming } from "react-native-reanimated";

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChecked: () => void;
}
const Checkbox = ({ label, checked, onChecked }: CheckboxProps) => {

    const checkedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(checked ? "rgba(239,142,82,0.1)" : "transparent", { duration: 150 }),
            borderColor: withTiming(checked ? Colors.tint : Colors.black, {
                duration: 150
            }),
            paddingLeft: 16,
            paddingRight: checked ? 16 : 10
        }
    }, [checked])

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, { duration: 150 })
        }
    }, [checked])

    return (
        <Animated.View style={checkedStyle} onTouchEnd={onChecked} className={"border rounded-[50] py-2 w-fit flex-row gap-2 justify-center items-center"}>
            <Animated.Text style={[rnTextStyle, { fontFamily: "Inter_500Medium" }]}>{label}</Animated.Text>
            {
                checked && <Animated.View >
                    <AntDesign name="checkcircle" size={14} color={Colors.tint} />
                </Animated.View>
            }
        </Animated.View>
    )
}
export default Checkbox