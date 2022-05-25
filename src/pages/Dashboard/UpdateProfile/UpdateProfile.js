import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';


const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const navigate = useNavigate()
    const imageStorageKey = "78f4ba72d703ea5f83062479e9d4d80f";


    const onSubmit = async (data) => {
        const formData = new FormData();
        const image = data.image[0];
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        console.log(url)
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                if (result.success) {
                    const photo = result.data.url;
                    const profile = {
                        name: data.name,
                        email: data.email,
                        gender: data.gender,
                        photo: photo,
                        education: data.education,
                        location: data.location,
                        phone: data.phone,
                        LinkedIn: data.LinkedIn,


                    };
                    console.log(profile);
                    // send to your database
                    fetch(`http://localhost:5000/userprofile/${user.email}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                        body: JSON.stringify(profile),
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            if (result.acknowledged) {
                                alert("added successfully");
                                reset();
                                navigate('/dashboard/profile')
                            } else {
                                alert("Failed to add profile");
                            }
                        });
                }
            });
    }

    return (
        <div className='container mx-auto'>
            <h2 className='my-10 text-center text-3xl'>Update Profile</h2>

            <div class="card max-w-2xl mx-auto shadow-xl">
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full"
                                    {...register("name")}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={user?.email}
                                    disabled
                                    className="input input-bordered w-full"
                                    {...register("email")}
                                />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <select
                                {...register("gender")}
                                className="select input-bordered w-full"
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other..'>Other..</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                className="input input-bordered w-full"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "Image is Required",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.image.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Education"
                                // disabled
                                // defaultValue={user.displayName}
                                className="input input-bordered w-full"
                                {...register("education")}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Location"
                                // disabled
                                // defaultValue={user.displayName}
                                className="input input-bordered w-full"
                                {...register("location", {
                                    required: {
                                        value: true,
                                        message: "Location is Required",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.location?.type === "required" && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.location.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                // disabled
                                // defaultValue={user.displayName}
                                className="input input-bordered w-full"
                                {...register("phone")}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">LinkedIn profile</span>
                            </label>
                            <input
                                type="text"
                                placeholder="LinkedIn profile link"
                                // disabled
                                // defaultValue=
                                className="input input-bordered w-full"
                                {...register("LinkedIn")}
                            />
                        </div>

                        <input
                            className="btn w-full mt-4 text-white"
                            type="submit"
                            value="Update"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;