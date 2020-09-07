import React from "react";

function Table(props) {
    return (
        <table className="createProductTable">
            <thead>
                {props.tableHeaders.map((val) => {
                    <tr key={val}>
                        <th>{val}</th>
                    </tr>;
                })}
            </thead>
            <tbody>
                {products.map((val) => {
                    return (
                        <tr key={val._id}>
                            <td>{val._id}</td>
                            <td>{val.title}</td>
                            <td>${val.price}</td>
                            <td>{val.category}</td>
                            <td>{val.brand}</td>
                            <td>{val.description}</td>
                            <td>{val.rating}</td>
                            <td>{val.numOfReviews}</td>
                            <td>
                                <button onClick={() => editProduct(val)}>Edit</button>{" "}
                                <button onClick={() => deleteProduct(val._id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;
