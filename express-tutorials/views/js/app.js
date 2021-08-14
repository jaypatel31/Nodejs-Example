const App = () =>{
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = () =>{
        fetch('/api/products')
            .then((res)=>res.json())
            .then(data => {
                setProducts(data.products)
            })
    }
    console.log(products)
    return (
        <ul className="list-group">
            
                {
                    
                        products.map((item,index)=>{
                            return(
                                <li className="list-group-item" key={index}>
                                    <div>
                                        <strong>{item.name}: </strong>
                                        ${item.price}
                                    </div>
                                </li>
                            )
                        })
                
                }
            
        </ul>
    )
}


ReactDOM.render(<App/>,document.getElementById('app'));