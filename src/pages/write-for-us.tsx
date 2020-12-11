import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from "../components/layout"
import SEO from "../components/seo"

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default function Write() {
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
            <SEO title="Write For Us " />


            <div className="article-wrapper">

                <article>

                    <header>
                        <h1 className="text-center title-header"> Write For  Us !! </h1>

                        <p className="text-center">  Dont Wait Write a Line  💌 !! </p>
                        <h2>We're Looking for Content Collaborators</h2>
                        <p>👋 Howdy! Linux Lovers , theLinuxTerminal is growing and we’re looking for content collaborators to write  backend development posts .                       You Can Contribute to multiple topics or a single post as well . We prefer content that provides value to our readers.                        If you have faced any issue you can share witht the community as well.
</p>
                        <h3>Here are Some of the topics we would like to Cover</h3>
                        <ul>
                            <li>System Admi</li>
                            <li>Linux</li>
                            <li>Shell Scripting</li>
                            <li>Debian </li>
                            <li>RedHat</li>
                            
                        </ul>


                        <h2>What Perks Would You get ?  </h2>


                        <p>Help you learn new skills. There’s no better way to learn something than to teach it! </p>
                        <p>Get your name out there on our Author list </p>


                        <p>Help the Open Source community in general by bringing more easily digestible learning material </p>


                        <p>Be part of our private Slack channel </p>


                        <p> Get some cool Tshirt /Stickers! ( Not Delivering Due to  Covid19 - Stay Safe  )</p>


                        <form
                            name="writeform"
                            method="post"
                            action="/thanks/"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                        >
                            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                            <input type="hidden" name="form-name" value="writeform" />
                            <p hidden>
                                <label>
                                    Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                </label>
                            </p>
                            <div className="form-group">
                                <label >Full Name</label>
                                <input type="text" name="name" className="form-control" onChange={handleChange} placeholder="John Doe" />
                            </div>

                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} placeholder="name@example.com " />
                            </div>
                          
                           <div className="form-group">
                                <label >Your Message</label>
                                <textarea name="message" className="form-control" placeholder="Let us Know if you have a topic in Mind or if you have any questions" onChange={handleChange}  ></textarea>
                            </div>

                            <p><button type="submit" className="btn btn-primary">Submit</button> </p>
                        </form>
                    </header>

                </article>
            </div>
        </Layout>
    )
}
