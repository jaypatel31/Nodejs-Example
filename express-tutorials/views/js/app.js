const App = () =>{
    const [products, setProducts] = React.useState([]);
    const [form, updateForm] = React.useState({
        name:'',
        price:''
    });

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

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!form.name || !form.price){
            return
        }

        fetch('/api/products',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
        })
            .then(res=>res.json())
            .then(data => {
                fetchProducts();
                updateForm({name:'',price:''})
            })
    }

    const deleteProduct = (id) =>{
        fetch(`/api/products/${id}`,{
            method:'DELETE',
        })
            .then(res=>res.json())
            .then(data => {
                fetchProducts();
                console.log(data);
            })
    }

    return (
        <>
        <div className="card">
            <div className="card-header">
                Add products
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={form.name} onChange={(e)=>updateForm({...form,name:e.target.value})} placeholder="product name" className="form-control mt-3"/>
                    <input type="text" value={form.price} onChange={(e)=>updateForm({...form,price:e.target.value})} placeholder="product price" className="form-control mt-3"/>
                    <button className="btn btn-primary mt-3">Add</button>
                </form>
            </div>
        </div>
        <ul className="list-group mt-5">
            
                {
                    
                        products.map((item,index)=>{
                            return(
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <div>
                                        <strong>{item.name}: </strong>
                                        ${item.price}
                                    </div>
                                    <button className="btn btn-danger" onClick={()=>deleteProduct(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </li>
                            )
                        })
                
                }
            
        </ul>
        </>
    )
}


ReactDOM.render(<App/>,document.getElementById('app'));