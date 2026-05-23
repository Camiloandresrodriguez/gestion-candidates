import { Link } from 'react-router-dom'
import { end_points } from '../../services/api'
import { useState, useEffect } from 'react';

export default function CandidateFormPage() {
  const [getCandidates, setCandidates] = useState([]);

  function fetchData() {
    fetch("https://app-gestion-candidatos-am-api.onrender.com/candidates")
      .then((response) => response.json())
      .then((data) => setCandidates(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function createCandidate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    let data = Object.fromEntries(formData.entries())
    let skills = data.skills.split(", ")
    data.skills = skills
    data.createdAt = new Date()
    let auth = getCandidates.some((item) => item.email === data.email)
    if (auth) {
      return alert("El candidato ya está registrado")
    }
    fetch(end_points.candidates, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((reponse) => reponse.json())
      .then(()=> fetchData())
  }

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
            <span className="breadcrumbs__current">Candidate form</span>
          </div>
          <h1 className="page__title">Candidate</h1>
          <p className="page__subtitle">Create or edit candidate information</p>
        </div>
        <div className="page__actions">
          <button className="btn" type="button">
            Cancel
          </button>
          <button className="btn btn--primary" type="button">
            Save
          </button>
        </div>
      </header>

      <form onSubmit={createCandidate} className="form">
        <div className="grid grid--2">
          <section className="card">
            <header className="card__header">
              <div>
                <h2 className="card__title">Basic info</h2>
                <p className="card__subtitle">Identity and contact details</p>
              </div>
            </header>

            <div className="form__grid">
              <div className="field">
                <label className="label" htmlFor="cFullName">
                  Full name
                </label>
                <input
                  name='fullName'
                  id="cFullName"
                  className="input"
                  placeholder="Ana Martínez"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="cEmail">
                  Email
                </label>
                <input
                  id="cEmail"
                  name='email'
                  className="input"
                  type="email"
                  placeholder="ana.martinez@gmail.com"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="cPhone">
                  Phone
                </label>
                <input
                  name='phone'
                  id="cPhone"
                  className="input"
                  placeholder="+57 301 555 0101"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="cLocation">
                  Location
                </label>
                <input name='location' id="cLocation" className="input" placeholder="Bogotá, CO" />
              </div>
            </div>
          </section>

          <section className="card">
            <header className="card__header">
              <div>
                <h2 className="card__title">Professional</h2>
                <p className="card__subtitle">Experience, status and offer</p>
              </div>
            </header>

            <div className="form__grid">
              <div className="field">
                <label className="label" htmlFor="cSeniority">
                  Seniority
                </label>
                <select name="seniority" id="cSeniority" className="select">
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="cYears">
                  Years of experience
                </label>
                <input name='yearsExperience' id="cYears" className="input" type="number" placeholder="1" />
              </div>

              <div className="field">
                <label className="label" htmlFor="cStatus">
                  Status
                </label>
                <select name="status" id="cStatus" className="select">
                  <option>New</option>
                  <option>In review</option>
                  <option>Interview</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="cOffer">
                  Applied offer
                </label>
                <select name='appliedOfferId' id="cOffer" className="select">
                  <option>Backend Developer (Node.js)</option>
                  <option>Frontend Developer (React)</option>
                  <option>QA Engineer</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <section className="card">
          <header className="card__header">
            <div>
              <h2 className="card__title">Skills</h2>
              <p className="card__subtitle">Add skills as tags</p>
            </div>
          </header>

          <div className="form__grid form__grid--3">
            <div className="field">
              <label className="label" htmlFor="cSkill">
                New skill
              </label>
              <input name='skills' id="cSkill" className="input" placeholder="React" />
            </div>
            <div className="field field--actions">
              <label className="label" aria-hidden="true">
                Add
              </label>
            </div>
          </div>

          <div className="chips mt-12">
            <span className="chip">React</span>
            <span className="chip">JavaScript</span>
            <span className="chip">HTML</span>
            <span className="chip">CSS</span>
          </div>
        </section>
        <button className="btn btn--primary" type="submit">
          Save
        </button>
      </form>
    </section>
  )
}
