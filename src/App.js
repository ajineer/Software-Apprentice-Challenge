import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { attachResults, normailzeData } from "./utils";
import CardList from "./CardList";
import SearchBar from "./SearchBar";
import Sort from "./Sort";

function App() {
  const [error, setError] = useState(null);
  const [raw_ads, setRawAds] = useState([]);
  const [GAData, setGAData] = useState([]);
  const [sort_order, setSortOrder] = useState("");
  const [search_term, setSearchTerm] = useState("");

  const complete_ads = useMemo(() => {
    if (!raw_ads.length) {
      return [];
    }
    let result = raw_ads.map(normailzeData);
    result = attachResults(result, GAData);

    if (search_term) {
      result = result.filter((ad) =>
        ad.campaign.toLowerCase().includes(search_term.toLowerCase())
      );
    }

    if (sort_order === "asc") {
      result.sort((a, b) => a.spend - b.spend);
    } else if (sort_order === "desc") {
      result.sort((a, b) => b.spend - a.spend);
    }

    return result;
  }, [raw_ads, search_term, sort_order]);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch("http://localhost:3000/fakeDataSet");
        const json = await response.json();
        if (!response.ok) {
          setError(response.error);
        } else {
          const { facebook_ads, twitter_ads, snapchat_ads, google_analytics } =
            json;
          const merged = [...facebook_ads, ...twitter_ads, ...snapchat_ads];
          setRawAds(merged);
          setGAData(google_analytics);
        }
      } catch (error) {
        setError("something went wrong");
      }
    };

    fetch_data();
  }, []);
  return (
    <main className="main_page">
      <header className="header_component">
        <h1>Ad Dashboard</h1>
      </header>
      <section className="widgets">
        <SearchBar setSearch={setSearchTerm} />
        <Sort setSort={setSortOrder} />
      </section>
      <section>
        <CardList ads={complete_ads} />
      </section>
      {error && <h2>{error}</h2>}
    </main>
  );
}

export default App;
