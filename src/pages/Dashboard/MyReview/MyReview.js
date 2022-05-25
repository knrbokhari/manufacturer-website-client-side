import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { format } from 'date-fns'
import useReview from '../../../hooks/useReview';
import Review from '../Review/Review';



const MyReview = () => {
    const [reviews] = useReview()
    const [user] = useAuthState(auth)


    const handleSubmit = (e) => {
        e.preventDefault();
        const rating = e.target.rating.value || 5;
        const userName = user?.displayName;
        const review = e.target.review.value;
        const dateTime = format(new Date(), "PPp")

        const myReview = {
            rating: rating,
            name: userName,
            review: review,
            time: dateTime,
            image: user.photoURL
        }
        // console.log(myReview)
        fetch("http://localhost:5000/review", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(myReview),
        })
            .then((res) => res.json())
            .then((data) => (e.target.reset()));
    }

    return (
        <div className='container mx-auto pb-14'>
            <h2 className='text-center text-3xl my-9'>Review</h2>
            <div class="card max-w-xl mx-auto p-7 border bg-base-100 shadow-xl">
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="form-control w-full">
                            <input type="text" placeholder="Type here" value={user?.displayName} disabled class="input input-bordered w-full text-xl" />
                        </div>
                        <label class="label">
                            <span class="label-text text-xl">Your rating</span>
                        </label>
                        <div class="rating rating-md">
                            <input type="radio" name="rating" value='1' class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating" value='2' class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating" value='3' class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating" value='4' class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating" value='5' class="mask mask-star-2 bg-orange-400" />
                        </div>

                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text text-xl">Your review *</span>
                            </label>
                            <textarea type="text" name='review' cols='5' placeholder="Your review" class="textarea textarea-bordered text-xl h-28 w-full" required />
                        </div>
                        <button type='submit' className='btn btn-primary mt-5 mx-auto block'>Send</button>
                    </form>
                </div>
            </div>

            {
                reviews.reverse().map(review => <Review key={review._id} review={review}></Review>)
            }

        </div>
    );
};

export default MyReview;