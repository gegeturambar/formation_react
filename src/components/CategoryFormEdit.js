import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryModel from "../models/CategoryModel";
import CategoryService from "../services/category.service";
import { productContext } from "../views/Products";

export default function CategoryFormEdit() {
  let params = useParams();

  const { categories, setCategories } = useContext(productContext);

  const [category, setCategory] = useState();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length && params.categoryId) {
      setCategory({
        ...categories.find(
          (category) => parseInt(category.id) === parseInt(params.categoryId)
        ),
      });
    }
  }, [categories, params.categoryId]);

  if (categories.length && params.categoryId) {
    const changeCategory = () => {
      let idx = categories.findIndex(
        (category) => parseInt(category.id) === parseInt(params.categoryId)
      );
      let newCategories = categories.slice();
      newCategories[idx] = category;
      setCategories(newCategories);
    };

    const handleChangeName = (name) => {
      setCategory({ ...category, name });
    };

    const validateName = (name) => {
      let crtEr = {};
      if (!name.length) {
        crtEr.name = "This field cannot be null";
        return crtEr;
      }
      if (name.length > 30)
        crtEr.name = "This field cannot be longer than 30 character";
      return crtEr;
    };

    const handleValidation = (params) => {
      let crtEr = {
        ...validateName(category.name),
      };
      setErrors(crtEr);
      return !Object.keys(crtEr).length;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!handleValidation()) return;
      CategoryService.update(category).then((e) => {
        changeCategory(category);
      });
    };

    if (category)
      return (
        <div className="wrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <fieldset>
              <label>
                <p>Name</p>
                <input
                  type="text"
                  name="Name"
                  value={category.name}
                  onChange={(e) => handleChangeName(e.target.value)}
                />
              </label>
              <span style={{ color: "red" }}>{errors.name}</span>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
  }
  return <div></div>;
}
