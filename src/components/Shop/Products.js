import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA=[
  {
    id:"p1",
    title:'Book',
    price:500,
    description:'This is a first product'
  },
  {
    id:"p2",
    title:'Pen',
    price:10,
    description:'This is a second product'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((item)=>(<ProductItem
          key={item.id} 
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />))}
        
      </ul>
    </section>
  );
};

export default Products;
