import React from "react";
import { GET_PROJECTS } from "../queries/ProjectQueries.jsx";
import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import {Link} from "react-router-dom"

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return;
    if (error) {
        console.log(error);
        return <p>Something went wrong</p>;
    }
    console.log(data);
    return (
        <section className="d-flex mt-2 flex-wrap">
            {data.projects.map(project => {
                return (
                    <div key={project.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                               {project.name}
                            </h5>
                            <p className="card-text">
                            {project.description}</p>
                            <div className="d-flex gap-5">
                            <Link to={`project/${project.id}`} className="btn btn-light">
                              View
                            </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
