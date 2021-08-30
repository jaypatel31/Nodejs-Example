import React, {useState} from "react";
import {Switch, Route, Link} from "react-router-dom";
import RestaurantDataServices from "../services/restaurant";

const AddReview = (props) => {
  let initalReviewState = ""

  let editing =false;

  if(props.location.state && props.location.state.currentReview){
    editing=true;
    initalReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initalReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  }

  const saveReview = () =>{
    var data = {
      text:review,
      name:props.user.name,
      user_id:props.user.id,
      restaurant_id:props.match.params.id
    };

    if(editing){
      data.review_id = props.location.state.currentReview._id;
      RestaurantDataServices.updateReview(data)
        .then(response=>{
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e=>console.log(e))
    }else{
      RestaurantDataServices.createReview(data)
        .then(response=>{
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e=>console.log(e))
    }
  }

  return (
    <div>
      {
        props.user ?(
          <div className="submit-form">
              {
                submitted?(
                  <div>
                    <h4>You Submited Successfully</h4>
                    <Link to={"/restaurants/"+props.match.params.id} className="btn btn-success">
                      Back to Restaurant
                    </Link>
                  </div>
                ):(
                  <div>
                    <div className="form-group">
                      <label htmlFOr="description">{editing ? "Edit": "Create"} Review</label>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        required
                        value={review}
                        onChange={handleInputChange}
                        name="text"
                      />
                    </div>
                    <button onClick={saveReview} className="btn btn-success mt-4">
                      Submit
                    </button>
                  </div>
                )
              }
          </div>
        ):(
          <div>
            Please Log in.
          </div>
        )
      }
    </div>
  )
}

export default AddReview

