import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Components/Search";
import Detail from "./Components/Detail";
import './App.css';

function App() {
    const [state, setState] = useState({
        s: "sherlock",
        results: [],
        selected: {},
        taglines: null, // New state for the fetched taglines
    });

    const apiurl = 'http://www.omdbapi.com/?apikey=6d49d9f1';

    const searchInput = (e) => {
        let s = e.target.value;
        setState((prevState) => ({ ...prevState, s: s }));
    };

    const search = (e) => {
        if (e.key === "Enter") {
            axios(apiurl + "&s=" + state.s).then(({ data }) => {
                let result = data.Search || [];
                console.log(result);
                setState((prevState) => ({ ...prevState, results: result }));
            });
        }
    };

    const fetchTaglines = async (tconst) => {
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/title/get-taglines',
            params: { tconst },
            headers: {
                'x-rapidapi-key': 'f75ba9c0d3mshd2366200b001e26p1ce676jsnb492deb04326',
                'x-rapidapi-host': 'imdb-com.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setState((prevState) => ({ ...prevState, taglines: response.data }));
        } catch (error) {
            console.error(error);
        }
    };

    const openDetail = (id) => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            let result = data;
            setState((prevState) => ({ ...prevState, selected: result }));
            fetchTaglines(id); // Fetch taglines when opening details
        });
    };

    const closeDetail = () => {
        setState((prevState) => ({ ...prevState, selected: {}, taglines: null }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Search</h1>
            </header>
            <main>
                <Search searchInput={searchInput} search={search} />
                <div className="container">
                    {state.results.map((e) => (
                        <div
                            key={e.imdbID} // Ensure unique key
                            className="item"
                            onClick={() => openDetail(e.imdbID)}
                        >
                            <img style={{ width: "200px" }} src={e.Poster} alt="" />
                            <h3 style={{ color: "white" }}>{e.Title}</h3>
                        </div>
                    ))}
                </div>
                {typeof state.selected.Title !== "undefined" ? (
                    <Detail selected={state.selected} closeDetail={closeDetail} />
                ) : null}
                {state.taglines && (
                    <div className="taglines">
                        <h2>Taglines</h2>
                        <ul>
                            {state.taglines.map((tagline, index) => (
                                <li key={index}>{tagline}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
