import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  // Backend API URLs
  const dealer_url = "http://localhost:3030/fetchDealers";
  const dealer_url_by_state = "http://localhost:3030/fetchDealers/";

  const filterDealers = async (state) => {
    try {
      const url = state === "All" ? dealer_url : `${dealer_url_by_state}${state}`;
      const res = await fetch(url);
      const retobj = await res.json();
      setDealersList(retobj);
    } catch (error) {
      console.error("Error fetching dealers by state:", error);
    }
  };

  const get_dealers = async () => {
    try {
      const res = await fetch(dealer_url);
      const retobj = await res.json();
      const all_dealers = Array.from(retobj);
      const states = all_dealers.map((dealer) => dealer.state);
      setStates(Array.from(new Set(states)));
      setDealersList(all_dealers);
    } catch (error) {
      console.error("Error fetching all dealers:", error);
    }
  };

  useEffect(() => {
    get_dealers();
  }, []);

  const isLoggedIn = sessionStorage.getItem("username") != null;

  return (
    <div>
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select
                name="state"
                id="state"
                onChange={(e) => filterDealers(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  State
                </option>
                <option value="All">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td>
                <Link to={`/dealer/${dealer.id}`}>
                  {dealer.full_name}
                </Link>
              </td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <Link to={`/postreview/${dealer.id}`}>
                    <img
                      src={review_icon}
                      className="review_icon"
                      alt="Post Review"
                    />
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
