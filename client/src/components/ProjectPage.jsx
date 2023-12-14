import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_PROJECT, GET_PROJECTS } from "../queries/ProjectQueries.jsx";
import { DELETE_PROJECT } from "../mutations/ProjectMutation.jsx";
import { useQuery, useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import Spinner from "./Spinner";
import EditProject from "./EditProject.jsx";

export default function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    });
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id },
        refetchQueries: [{ query: GET_PROJECTS }]
    });
    const handleDelete = () => {
        deleteProject(id);
        navigate("/")
    };
    if (loading) return <Spinner />;
    if (error) return "Something Went Wrong";
    return (
        <section className="w-75 container shadow-sm mt-5 py-2">
            <div className="d-flex justify-content-end p-3">
                <button className="btn btn-light">Back</button>
            </div>
            <EditProject project={data.project}/>
            <div className="d-flex flex-column">
                <h1 className="text-lg">{data.project.name}</h1>
                <p className="text-sm text-secondary">
                    {data.project.description}
                </p>
                <div className="d-flex align-items-center">
                    <span>Status:</span>
                    <span
                        className={`mx-1 p-1 rounded-1  bg-${
                            data.project.status == "Not Started"
                                ? "light"
                                : data.project.status == "In Progress"
                                ? "warning text-white"
                                : "success text-white"
                        } shadow-sm`}
                    >
                        {data.project.status}
                    </span>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center px-1">
                <h1 className="text-sm-center mt-2">Client Information</h1>
                <div className="mx-auto d-flex flex-column">
                    <p>
                        Name: <span>{data.project.client.name}</span>
                    </p>
                    <p>
                        Phone: <span>{data.project.client.phone}</span>
                    </p>
                    <p>
                        Email: <span>{data.project.client.email}</span>
                    </p>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="btn btn-danger text-center"
            >
                <FaTrash /> Delete Project
            </button>
        </section>
    );
}
