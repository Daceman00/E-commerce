import type { Resolver } from "react-hook-form";
import type { Rating } from "../../features/Products/ProductTypes";

export type FormValues = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export const resolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, unknown> = {};

    if (!values.title) {
      errors.title = { type: "required", message: "Title is required." };
    }
    if (!values.price) {
      errors.price = { type: "required", message: "Price is required." };
    }
    if (!values.description) {
      errors.description = { type: "required", message: "Description is required." };
    }
    if (!values.category) {
      errors.category = { type: "required", message: "Category is required." };
    }
    if (!values.image) {
      errors.image = { type: "required", message: "Image is required." };
    }

    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };