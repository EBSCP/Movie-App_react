import React from "react";

function Detail({ selected, closeDetail }) {
    if (!selected || Object.keys(selected).length === 0) {
        return null; // Don't render if selected is undefined or empty
    }

    return (
        <section className="detail">
            <div className="content">
                <h2>{selected.Title}</h2>
                <span>{selected.Year}</span>
                <p className="rating">
                    Rating: {selected.imdbRating || "N/A"}
                </p>

                <div className="about">
                    <img src={selected.Poster} alt="Movie Poster" />
                    <p>{selected.Plot || "No description available."}</p>
                </div>
                <button
                    className="close"
                    onClick={closeDetail}
                >
                    Close
                </button>
            </div>
        </section>
    );
}

export default Detail;

