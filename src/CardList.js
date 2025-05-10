import React from "react";

const CardList = ({ ads }) => {
  return (
    <ul className="grid_layout">
      {ads.map((ad, idx) => {
        return (
          <li className="card" key={idx}>
            <h2 className="campaign_name">{ad.campaign}</h2>
            <h3 className="adset">{ad.adset}</h3>
            <h3 className="adcreative">{ad.creative}</h3>
            <h3 className="spend">Spend: {ad.spend}</h3>
            <h3 className="impressions">Impressions: {ad.impressions}</h3>
            <h3 className="clicks">Click Count: {ad.clicks}</h3>
            <h3 className="results">Results: {ad.results}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
