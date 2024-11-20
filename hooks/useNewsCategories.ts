import newsCategoryList from "@/constants/Categories"
import { useCallback, useState } from "react"

export const useNewsCategories = () => {

    const [newsCategories, setNewsCategories] = useState(newsCategoryList)

    const toggleNewsCategory = useCallback((id: number) => {
        setNewsCategories((prev: any) => {
            return prev.map((category: any) => {
                if (category.id === id) {
                    return {
                        ...category,
                        selected: !category.selected
                    };
                }
                // Return the category unchanged if it's not the one being toggled
                return category;
            });
        });
    }, []);


    return {
        newsCategories,
        toggleNewsCategory
    }
}
