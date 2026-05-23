import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CandidatesListPage() {
  const [getCandidates, setCandidates] = useState([]);

  function fetchData() {
    fetch("https://app-gestion-candidatos-am-api.onrender.com/candidates")
      .then((response) => response.json())
      .then((data) => setCandidates(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Candidates</h1>
          <p className="page__subtitle">Create, review and track candidates</p>
        </div>
        <div className="page__actions">
          <Link className="btn btn--primary" to="/candidates/new">
            New candidate
          </Link>
        </div>
      </header>

      <section className="card">
        <header className="card__header">
          <div>
            <h2 className="card__title">Search and filters</h2>
            <p className="card__subtitle">
              Find candidates by status, seniority or offer
            </p>
          </div>
        </header>

        <div className="filters">
          <div className="field">
            <label className="label" htmlFor="qCandidates">
              Search
            </label>
            <input
              id="qCandidates"
              className="input"
              placeholder="Name, email, skill"
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="statusCandidates">
              Status
            </label>
            <select id="statusCandidates" className="select">
              <option>Any</option>
              <option>New</option>
              <option>In review</option>
              <option>Interview</option>
              <option>Hired</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="seniorityCandidates">
              Seniority
            </label>
            <select id="seniorityCandidates" className="select">
              <option>Any</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="offerCandidates">
              Applied offer
            </label>
            <select id="offerCandidates" className="select">
              <option>Any</option>
              <option>Backend Developer (Node.js)</option>
              <option>Frontend Developer (React)</option>
              <option>QA Engineer</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card">
        <header className="card__header">
          <div>
            <h2 className="card__title">Results</h2>
            <p className="card__subtitle">Showing 3 candidates</p>
          </div>
          <div className="card__header-actions">
            <button className="btn" type="button">
              Export
            </button>
          </div>
        </header>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Location</th>
                <th>Seniority</th>
                <th>Status</th>
                <th className="right">Actions</th>
              </tr>
            </thead>
            {getCandidates.length <= 0 ? (
              <h1>No hay candidatos disponibles</h1>
            ) : (
              <tbody>
                {getCandidates.map((candidate) => (
                  <tr>
                    <td>
                      <div className="cell-title">{candidate.fullName}</div>
                      <div className="muted">
                        {candidate.email} · {candidate.phone}
                      </div>
                    </td>
                    <td>{candidate.location}</td>
                    <td>{candidate.seniority}</td>
                    <td>
                      <span className="badge">{candidate.status}</span>
                    </td>
                    <td className="right">
                      <div className="row-actions">
                        <Link className="btn btn--sm" to={"/candidates/"+candidate.id}>
                          Open
                        </Link>
                        <Link className="btn btn--sm" to="/candidates/1/edit">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <footer className="card__footer">
          <div className="pagination">
            <button className="btn" type="button">
              Previous
            </button>
            <div className="muted">Page 1 of 1</div>
            <button className="btn" type="button">
              Next
            </button>
          </div>
        </footer>
      </section>
    </section>
  );
}
