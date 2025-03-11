import React from 'react';
import Select from 'react-select';
import { categories } from '../data/categories';

interface CategorySelectorProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    selectedCategories,
    setSelectedCategories
}) => {
    const options = categories.map(category => ({
        value: category,
        label: category
    }));

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Categories
            </label>
            <Select
                isMulti
                options={options}
                value={selectedCategories.map(c => ({ value: c, label: c }))}
                onChange={(selected) =>
                    setSelectedCategories(selected.map(option => option.value))
                }
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
};

export default CategorySelector;