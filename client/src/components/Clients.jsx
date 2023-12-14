import ClientRow from "./ClientsRow.jsx";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQueries.jsx";
import Spinner from "./Spinner";
import AddClient from "./AddClient.jsx";

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return <Spinner />;
    if (error) {
        console.log(error);
        return <p>Something went wrong</p>;
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client, ind) => {
                        return <ClientRow key={ind} client={client} />;
                    })}
                </tbody>
            </table>
        </>
    );
}
