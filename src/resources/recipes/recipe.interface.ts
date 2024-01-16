interface IRecipe {
    name?: string;
    image?: string;
    description?: string;
    date?: Date | string;
    duration?: number;
    category?: string;
    cuisine?: string;
}
export default IRecipe