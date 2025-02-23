import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "./../services/category-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories !!");
      });
  }, []);

  return (
    <div>
      <h5>Categories</h5>
      <ListGroup style={{cursor:'pointer'}}>
        <ListGroupItem tag={Link} to={"/"} action="true">
          <small>All Blogs</small>
        </ListGroupItem>
        {categories &&
          categories.map((cat, index) => {
            return (
              <ListGroupItem tag={Link} to={"/categories/"+cat.categoryId} className="mt-1 border-0 shadow" key={index} action="true">
                <small>{cat.categoryTitle}</small>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategoryMenu;
