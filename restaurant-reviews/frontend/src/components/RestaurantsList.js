import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import RestaurantDataServices from "../services/restaurant";

const RestaurantsList = (props) => {


    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearhZip] = useState("");
    const [searchCuisines, setSearchCuisines] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);
    const [totalResponse, setTotalResponse] = useState(0);
    const [page, setPage] = useState(0);
    

    useEffect(()=>{
        retrieveRestaurants();
        retrieveCuisines();
    },[])

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const onChangeSearchZip = (e) => {
        const zipCode = e.target.value;
        setSearhZip(zipCode);
    }

    const onChangeSearchCuisines = (e) => {
        const searchCuisines = e.target.value;
        setSearchCuisines(searchCuisines);
    }

    const retrieveRestaurants = () =>{
        RestaurantDataServices.getAll()
            .then(response=>{
                console.log(response.data);
                setTotalResponse(Math.floor(response.data.total_results/20));
                setPage(response.data.page);
                setRestaurants(response.data.restaurants);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const retrieveCuisines= () => {
        RestaurantDataServices.getCuisines()
            .then(response => {
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data))
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const refreshList = () =>{
        retrieveRestaurants();
        setSearchName("");
        setSearchCuisines("All Cuisines");
        setSearhZip("");
    }
    
    const find = (query, by,page=0) => {
        RestaurantDataServices.find(query,by,page)
            .then(response=>{
                console.log(response.data);
                setTotalResponse(Math.floor(response.data.total_results/20));
                setPage(response.data.page)
                setRestaurants(response.data.restaurants);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const findByName = () => {
        find(searchName, "name");
        setSearchCuisines("All Cuisines");
        setSearhZip("");
    }

    const findByZip = () =>{
        find(searchZip,"zipcode");
        setSearchName("");
        setSearchCuisines("All Cuisines");
    }

    const findByCuisines = () =>{
        if(searchCuisines === "All Cuisines"){
            refreshList();
        }
        else{
            console.log(searchCuisines);
            find(searchCuisines,"cuisine");
        }
        setSearchName("");
        setSearhZip("");
    }

    const changePage = (e,npage) => {
        console.log(npage)
        if(npage !== totalResponse+1){
            if(searchCuisines === "All Cuisines" && searchZip==="" && searchName===""){
                RestaurantDataServices.getAll(npage)
                    .then(response=>{
                        console.log(response.data);
                        setRestaurants(response.data.restaurants);
                    })
                    .catch(e=>{
                        console.log(e);
                    })
            }
            else if(searchZip==="" && searchName==="" && searchCuisines !== "All Cuisines"){
                find(searchCuisines,"cuisine",npage);
            }
            else if(searchCuisines === "All Cuisines" && searchName===""){
                find(searchZip,"zipcode",npage);
            }
            else if(searchCuisines === "All Cuisines" && searchZip===""){
                find(searchName, "name",npage);
            }
            setPage(npage)
        }
        
    }
    return (
        <div>
            <div className="row pb-4">
                <div className="input-group col-lg-4" style={{width:"auto"}}>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={onChangeSearchName}
                        
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4" style={{width:"auto"}}>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by Zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                        
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4" style={{width:"auto"}}>
                    <select onChange={onChangeSearchCuisines} >
                    {
                        cuisines.map((cuisine, index)=>{
                            return(
                                <option value={cuisine} key={index}>
                                    {cuisine.substr(0,20)}
                                </option>
                            )
                        })
                    }
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={findByCuisines}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                {
                    restaurants.map((restaurant,index)=>{
                        const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;
                        return(
                            <div className="col-lg-4 pb-2" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{restaurant.name}</h5>
                                        <p className="card-text">
                                            <strong>Cuisines: </strong>{restaurant.cuisine}<br/>
                                            <strong>Address: </strong>{address}
                                        </p>
                                        <div className="row">
                                            <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                                View Review
                                            </Link>
                                            <a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/place"+address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    totalResponse > 0 
                    ?
                    (
                        <div>
                            <ul className="pagination">
                                <li className="page-item disabled" onClick={(e)=>changePage(e,page-1)}>
                                    <button className="page-link" href="#" >&laquo;</button>
                                </li>
                                {
                                    [...Array(((totalResponse>=5)?5:totalResponse))].map((x,i)=>{
                                        return(
                                            <li className={`page-item ${page===page+i ? "active" :"disabled"}`} onClick={(e)=>changePage(e,page+i)} >
                                                <button className="page-link" href="#" >{page+i}</button>
                                            </li>
                                        )
                                    })
                                }
                                
                                <li className="page-item disabled" onClick={(e)=>changePage(e,page+1)}>
                                    <button className="page-link" href="#" >&raquo;</button>
                                </li>
                            </ul>
                      </div>  
                    ):""
                }
            </div>
        </div>
    )
}

export default RestaurantsList