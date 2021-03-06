import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./ItemList.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Spinner
import Lottie from "../Lottie/Lottie";
//React-Router-DOM
import { Link, useParams } from "react-router-dom";
//Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ItemList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      const docs = [];
      const datos = await getDocs(collection(db, "productos"));
      datos.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
        categoryId
          ? setProducts(docs.filter((e) => e.category === categoryId))
          : setProducts(docs);
      });
      setIsLoading(false);
    };
    obtenerDatos();
  }, [categoryId]);

  return (
    <>
      {IsLoading === false ? (
        <div className="divCardContainer">
          {products.map((e) => {
            return (
              <div key={e.id}>
                <Link
                  to={`/Item/${e.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Item array={e} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <Lottie />
      )}
    </>
  );
};

export default ItemList;
