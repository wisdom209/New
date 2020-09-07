import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterElectronics, filterWomenClothing, filterJewellery, filterMenClothing, filterAll } from "../Redux/Actions.js/FilterActions";

function SideBar(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    return (
        <div ref={props.sideBarRef} className={props.sideBarClass}>
            <div className="sideBarTitle">
                <div>Shopping Category</div>
                <div>
                    <button onClick={props.removeSideBar}>&times;</button>
                </div>
            </div>
            <div className="sideBarCategory">
                <Link to="#" onClick={() => dispatch(filterAll(products))}>
                    All categories
                </Link>
            </div>
            <div className="sideBarCategory">
                <Link to="#" onClick={() => dispatch(filterMenClothing(products))}>
                    Men clothing
                </Link>
            </div>
            <div className="sideBarCategory">
                <Link to="#" onClick={() => dispatch(filterWomenClothing(products))}>
                    Women clothing
                </Link>
            </div>
            <div className="sideBarCategory">
                <Link to="#" onClick={() => dispatch(filterElectronics(products))}>
                    Electronics
                </Link>
            </div>
            <div className="sideBarCategory">
                <Link to="#" onClick={() => dispatch(filterJewellery(products))}>
                    Jewellery
                </Link>
            </div>
        </div>
    );
}

export default SideBar;
