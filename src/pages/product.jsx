import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';


const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);

  const product = all_product.find(item => item.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      
      <div>
        {/* <h1>{product.name}</h1> */}
        <p>{product.description}</p>
        {/* <img src={product.image} alt={product.name} /> */}
        {/* <p>Price: {product.new_price}</p> */}
      </div>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  );
};

export default Product;
