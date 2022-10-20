import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [page, setPage] = useState(0);
  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/comments?limit=9&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData([...tableData, ...data.comments]);
        setLoading(false);
      });
  }, [skip]);

  const handleSkip = () => {
    setSkip((prev) => prev + 10);
    setCounter(counter + 1);
    setPage(page + 1);
  };

  return (
    <div className="App">
      <div className="table">
        {loading && <p>Loading...</p>}
        {tableData.length > 0 && (
          <table className="full_table">
            <thead>
              <tr>
                <th>Post ID</th>
                <th>Username</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, i) => {
                return (
                  <tr key={i} className="data_row">
                    <td>{el.id}</td>
                    <td>{el.user.username}</td>
                    <td>{el.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <p>You're at page {page}</p>
      <button
        disabled={loading ? true : false}
        className="submit_btn"
        onClick={handleSkip}
        type="submit"
      >
        EXPAND {counter}
      </button>
    </div>
  );
}

export default App;
