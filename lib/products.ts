export const getAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

export const getProductsByCategory = async (categoryId: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${(categoryId)}`);
    const data = await response.json();
    return data;
}

