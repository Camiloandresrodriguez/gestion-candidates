import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { end_points } from '../../services/api';

export default function CandidateDetailPage() {
  const [candidate, setCandidate] = useState({});
  let id = useParams()

  console.log(candidate.skills)

  function fetchData() {
    fetch(end_points.candidates + "/" + id.candidateId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCandidate(data)
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <div className="breadcrumbs">
            <Link className="link" to="/candidates">
              Candidates
            </Link>
            <span className="breadcrumbs__sep" aria-hidden="true">
              /
            </span>
            <span className="breadcrumbs__current">Profile</span>
          </div>
          <h1 className="page__title">{candidate.fullName}</h1>
          <p className="page__subtitle">
            {candidate.seniority} · {candidate.location} · {candidate.email}
          </p>
        </div>
        <div className="page__actions">
          <Link className="btn" to="/candidates/1/edit">
            Edit
          </Link>
          <button className="btn btn--danger" type="button">
            Delete
          </button>
        </div>
      </header>

      <div className="grid grid--2">
        <section className="card">
          <header className="card__header">
            <div>
              <h2 className="card__title">Candidate details</h2>
              <p className="card__subtitle">Contact and professional info</p>
            </div>
            <span className="badge">New</span>
          </header>

          <div className="dl">
            <div className="dl__row">
              <div className="dl__key">Full name</div>
              <div className="dl__value">{candidate.fullName}</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Email</div>
              <div className="dl__value">{candidate.email}</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Phone</div>
              <div className="dl__value">{candidate.phone}</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Location</div>
              <div className="dl__value">{candidate.location}</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Seniority</div>
              <div className="dl__value">{candidate.seniority}</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">{candidate.yearsExperience}</div>
              <div className="dl__value">1</div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Created at</div>
              <div className="dl__value">{candidate.createdAt}</div>
            </div>
          </div>
        </section>

        <section className="card">
          <header className="card__header">
            <div>
              <h2 className="card__title">Pipeline</h2>
              <p className="card__subtitle">Applied offer and status</p>
            </div>
          </header>

          <div className="dl">
            <div className="dl__row">
              <div className="dl__key">Applied offer</div>
              <div className="dl__value">
                <Link className="link" to="/offers/45">
                  Backend Developer (Node.js)
                </Link>
              </div>
            </div>
            <div className="dl__row">
              <div className="dl__key">Status</div>
              <div className="dl__value">
                <span className="badge">New</span>
              </div>
            </div>
          </div>

          <div className="divider" />

          <h3 className="section-title">Skills</h3>
          <div className="chips">
            {
              candidate.skills && candidate.skills.map((skill) => (
                <span className="chip">{skill}</span>
              ))
            }
          </div>

          <div className="divider" />

          <h3 className="section-title">Notes</h3>
          <div className="muted">
            Add notes, interview feedback and next steps.
          </div>
          <textarea
            className="textarea"
            rows={5}
            placeholder="Write a note..."
          />
          <div className="mt-12">
            <button className="btn btn--primary" type="button">
              Save note
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}
