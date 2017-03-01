'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'
import Checkbox from 'muicss/lib/react/checkbox'
import Radio from 'muicss/lib/react/radio'
import Head from '../components/head'
const config = require('../config')
const getSession = require('../lib/get-session')
const postForm = require('../lib/post-form')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props.session, {mobil: 'Samsung A5'})
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps (ctx) {
    const jwt = ctx.query.jwt
    if (!jwt) {
      const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
      if (typeof window !== 'undefined') {
        window.location = url
      } else {
        ctx.res.writeHead(302,
          {Location: url}
        )
        ctx.res.end()
      }
    } else {
      const data = await getSession(jwt)
      return {session: data}
    }
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = Object.assign({}, this.state)
    postForm(formData)
      .then(response => {
        const url = `/mottatt?ticket=${response.data.id}`
        window.location = url
      }).catch(error => {
      const url = `/feil?error=${error}`
      window.location = url
    })
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <h1 className='mui--text-title'>Bestill mobiltelefon</h1>
          <Form onSubmit={this.handleSubmit}>
            <Input name='bestiller' label='Bestillers navn' floatingLabel defaultValue={this.state.bestiller} onChange={this.handleChange} required />
            <legend>Mobiltelefon</legend>
            <Radio name='mobil' value='Samsung A5' label='Samsung A5' defaultChecked onChange={this.handleChange} />
            <Radio name='mobil' value='Samsung S7' label='Samsung S7' onChange={this.handleChange} />
            <Radio name='mobil' value='Iphone 7 - 128 GB' label='Iphone 7 - 128 GB' onChange={this.handleChange} />
            <Radio name='mobil' value='Iphone 7 Plus - 128 GB' label='Iphone 7 Plus - 128 GB' onChange={this.handleChange} />
            <legend>Ekstrautstyr</legend>
            <Checkbox name='ekstrautstyr1' value='Billader Android (Samsung)' label='Billader Android (Samsung)' onChange={this.handleChange} />
            <Checkbox name='ekstrautstyr2' value='Ekstra lader 110v-240v Samsung (Android)' label='Ekstra lader 110v-240v Samsung (Android)' onChange={this.handleChange} />
            <Checkbox name='ekstrautstyr3' value='Etui/skjermbeskytter (må spesifiseres om det er Samsung eller Apple)' label='Etui/skjermbeskytter (må spesifiseres om det er Samsung eller Apple)' onChange={this.handleChange} />
            <Checkbox name='ekstrautstyr4' value='Sim kort (ekstra eller datakort)' label='Sim kort (ekstra eller datakort)' onChange={this.handleChange} />
            <Checkbox name='ekstrautstyr5' value='Billader iPhone' label='Billader iPhone' onChange={this.handleChange} />
            <Checkbox name='ekstrautstyr6' value='Ekstra lader 110v-240v iPhone 5, 6, 6s, 6s Plus og iPhone SE' label='Ekstra lader 110v-240v iPhone 5, 6, 6s, 6s Plus og iPhone SE' onChange={this.handleChange} />
            <Textarea name='begrunnelse' label='Begrunnelse' floatingLabel onChange={this.handleChange} />
            <Checkbox name='godkjent' value='ja' label='Godkjent av leder' onChange={this.handleChange} required />
            <Input name='leder' label='Leders navn' floatingLabel defaultValue={this.state.leder} onChange={this.handleChange} required />
            <Button variant='raised'>Send bestilling</Button>
          </Form>
        </Container>
      </div>
    )
  }
}
