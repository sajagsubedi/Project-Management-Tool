import React from "react";
import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects.jsx";
import NotFound from "./components/NotFound.jsx"
import ProjectPage from "./components/ProjectPage.jsx"
import AddBtnGroup from "./components/AddBtnGroup.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
    truePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});
const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache
});
function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Header />
                    <main className="container">
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <>
                       <AddBtnGroup/>                 <Projects />
                                        <Clients />
                                    </>
                                }
                            />
                            <Route exact path="project/:id" element={<ProjectPage/>}/>
                            <Route exact path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </BrowserRouter>
            </ApolloProvider>
        </>
    );
}

export default App;
