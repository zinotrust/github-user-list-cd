import { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const GithubUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="--bg-primary --py2">
      <div className="container">
        <header>
          <h1 className="--text-center --text-light">GitHub Users</h1>
          <div className="--line"></div>
        </header>

        {isLoading && (
          <div className="--center-all --p">
            <h4 className="--text-light">Loading...</h4>
          </div>
        )}

        <div className="--grid-25 --py">
          {error ? (
            <h4 className="--text-light">Something went wrong.</h4>
          ) : (
            users.map((user) => {
              const { id, login, avatar_url, html_url } = user;
              return (
                <div key={id} className="--card --bg-light --p --flex-start">
                  <img
                    src={avatar_url}
                    alt={login}
                    className="--profile-img --mx"
                  />
                  <span>
                    <h4>{login}</h4>
                    <a href={html_url}>View Profile</a>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubUsers;
