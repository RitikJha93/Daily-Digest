import newsCategoryList from "@/constants/Categories"
import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react"

export const useCountries = () => {

    const [countries, setCountries] = useState(CountryList)

    const toggleNewsCountry = useCallback((id: number) => {
        setCountries((prev: any) => {
            return prev.map((item: any, index: number) => {
                if (index === id) {
                    return {
                        ...item,
                        selected: !item.selected
                    };
                }
                // Return the category unchanged if it's not the one being toggled
                return item;
            });
        });
    }, []);


    return {
        countries,
        toggleNewsCountry
    }
}
