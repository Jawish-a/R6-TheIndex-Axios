import React, { useState, useEffect } from "react";

// import authors from "./data.js";
import axios from "axios";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/")
      .then((response) => {
        // console.log(response.data)
        setAuthors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  // useEffect( () => {
  //   axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}`)
  //   .then((response) => {
  //     console.log(response.data);
  //     setCurrentAuthor(author);
  //     setLoading(false);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // } );
  const selectAuthor = (author) => {
    axios
      .get(`https://the-index-api.herokuapp.com/api/authors/${author.id}`)
      .then((response) => {
        console.log(response.data);
        setCurrentAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unselectAuthor = () => setCurrentAuthor(null);

  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        {loading ? (
          <div className="content col-10">
            <h1>Please wait i am loading</h1>
          </div>
        ) : (
          <div className="content col-10">{getContentView()}</div>
        )}
      </div>
    </div>
  );
};

export default App;
