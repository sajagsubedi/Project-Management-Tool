import { useState } from "react";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { useMutation } from "@apollo/client";
import {FaUser} from "react-icons/fa"
export default function AddClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            });
        }
    });
    const handleSubmit = e => {
        e.preventDefault();
        addClient(formData.name, formData.email, formData.phone);
        setFormData({ name: "", email: "", phone: "" });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
      <>
      
            <button
                type="button"
                className="btn btn-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target="#addclient"
            >
            <FaUser/>
               Add Client
            </button>
        <div
            className="modal fade"
            id="addclient"
            tabIndex="-1"
            aria-labelledby="addclientlabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-1">
                                <h2 className="text-center">Add Client</h2>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputEmail3"
                                    className="col-sm-2 col-form-label"
                                >
                                    Name
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputEmail3"
                                    className="col-sm-2 col-form-label"
                                >
                                    Email
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-2 col-form-label"
                                >
                                    Phone
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
