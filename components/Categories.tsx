import newsCategoryList from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type CategoryPropps = {
    onCategoryChanged: (category: string) => void;
}
const Categories = ({ onCategoryChanged }: CategoryPropps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const scrollRef = useRef<ScrollView>(null)
    const itemRef = useRef<View[] | null[]>([])

    const handleSelectedCategory = (index: number) => {
        const selected = itemRef.current[index]
        setActiveIndex(index)

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x, y: 0, animated: true })
        })
        onCategoryChanged(newsCategoryList[index].title)
    }
    return (
        <View className='px-6 pt-6'>
            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-2xl">Trending Right Now</Text>
            <ScrollView ref={scrollRef} showsHorizontalScrollIndicator={false} horizontal className='mt-4'>
                {
                    newsCategoryList.map((item, i) => (
                        <TouchableOpacity ref={(el) => (itemRef.current[i] = el)} onPress={() => handleSelectedCategory(i)} style={{ backgroundColor: i === activeIndex ? Colors.tabIconSelected : "transparent" }} className={`rounded-[50] ${activeIndex != i ? "border border-gray-600" : ""} py-2 px-5 mr-2`}>
                            <Text style={{ fontFamily: "Inter_500Medium" }} className={`text-lg ${activeIndex === i ? "text-white" : "text-gray-600"} `}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        padding: 20,
        height: 10,
        margin: 10, // Add margin for spacing
    },
});

export default Categories;