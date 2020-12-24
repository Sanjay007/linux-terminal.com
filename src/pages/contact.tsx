import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from "../components/layout"
import SEO from "../components/seo"

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default function Contact() {
    const [state, setState] = React.useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    return (
        <Layout>
           
           <SEO title="Contct Us " />

            <div className="article-wrapper">
            <article>
                <header>
                    <h1 className="text-center title-header"> Contact Us !! </h1>

                    <p className="text-center">  Dont Wait Write a Line  💌 !! </p>

                    <form
                            name="contact"
                            method="post"
                            action="/thanks/"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                        >
                            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                            <input type="hidden" name="form-name" value="contact" />
                            <p hidden>
                                <label>
                                    Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                </label>
                            </p>

                        <div className="form-group">


                            <input type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com " onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label >Your Message</label>
                            <textarea className="form-control" placeholder="Write Your Message" name="message" onChange={handleChange} ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>


                </header>

            </article>
               
            </div>
        </Layout>
    )
}