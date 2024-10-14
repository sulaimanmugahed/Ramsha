import { Box } from "@mui/material";
import AppSlider from "../../app/components/ui/AppSlider"
import { CatalogCategory } from "../../app/models/catalog/catalogCategory";
import CategoryCard from "./CategoryCard"


// const categories = [
//     {
//         label: 'Accessories',
//         imageUrl: '/access.jpg'
//     },
//     {
//         label: 'Clothes',
//         imageUrl: '/clothes.jpg'
//     },
//     {
//         label
//     }
// ]

// const flatCategories = (categories: CategoryDto[], parentId?: string): any[] => {
//     return categories.flatMap((category) => {
//         const currentOption: any = { id: category.id, label: category.label, imageUrl: `https://picsum.photos/200?random=${category.id}`, parentId };

//         if (category.children && category.children.length > 0) {
//             return [currentOption, ...flatCategories(category.children, currentOption.id)];
//         }
//         return [currentOption];
//     });
// };

const CategoriesSlider = ({ categories }: { categories: CatalogCategory[] }) => {

    return (
        <AppSlider
            slidesToShow={5}
            items={categories}
            renderItem={(category) => {
                return (
                    <Box sx={{ p: 2 }}>
                        <CategoryCard category={category} />
                    </Box>
                )
            }}
        />
    )
}

export default CategoriesSlider