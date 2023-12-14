import { useState } from "react";
import { ADD_PROJECT } from "../mutations/ProjectMutation";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries.jsx";
import { useMutation ,useQuery} from "@apollo/client";
import { FaList } from "react-icons/fa";

export default function AddProject() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "",
        clientId:""
    });
    const {loading,error,data}=useQuery(GET_CLIENTS);
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: formData,
            refetchQueries: [{ query: GET_PROJECTS }],});
    const handleSubmit = e => {
        e.preventDefault();
        addProject(formData.name, formData.description, formData.status,formData.clientId);
        setFormData({ name: "", description: "", status: "uninitiated",clientId:"" });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(name,value);
        console.log(formData);
    };
    if(loading) return
    return (
        <>
            <button
                type="button"
                className="btn btn-secondary mt-3 "
                data-bs-toggle="modal"
                data-bs-target="#addproject"
            >
                <FaList />
                Add Project
            </button>
            <div
                className="modal fade"
                id="addproject"
                tabIndex="-1"
                aria-labelledby="addprojectlabel"
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
                                    <h2 className="text-center">Add Project</h2>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="inputdescription3"
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
                                        htmlFor="inputdescription3"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Description
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="description"
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="status"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Status
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="uninitiated">
                                                Not Started
                                            </option>
                                            <option value="progress">
                                                In Progress
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label
                                        htmlFor="Client"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Client
                                    </label>
                                    <div className="col-sm-10">
                                        <select                 name="clientId"
                      value={formData.clientId}
                     onChange={handleChange}
                                        >
                        <option value="">Choose Client</option>                    {data.clients.map(client => (
                                              <option
                                                    key={client.id}
                                                    value={client.id}
                                                >
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
