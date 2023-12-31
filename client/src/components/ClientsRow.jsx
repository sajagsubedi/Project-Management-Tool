import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { useMutation } from "@apollo/client";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache,{data:{deleteClient}}){
      const {clients}=cache.readQuery({query:GET_CLIENTS});
      cache.writeQuery({
        query:GET_CLIENTS,
        data:{
          clients:clients.filter(client=>client.id!==deleteClient.id)
        },
      },
      )
    }
  });
  const handleClick=(e)=>{
    deleteClient(client.id);
  }

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <center>
          <button className="btn btn-danger py-1" onClick={handleClick}>
            <FaTrash />
          </button>
        </center>
      </td>
    </tr>
  );
}

