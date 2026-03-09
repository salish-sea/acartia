import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { DataIngestion } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, dataIngestion

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  dataIngestion = await DataIngestion.create({ ssemmi_creator: user })
})

test('POST /sightings 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, entry_id: 'test', data_source_name: 'test', data_source_entity: 'test', data_source_id: 'test', created: 'test', photo_url: 'test', no_sighted: 'test', latitude: 'test', longitude: 'test', data_source_witness: 'test', trusted: 'test', data_source_comments: 'test', ssemmi_data_added: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.entry_id).toEqual('test')
  expect(body.data_source_name).toEqual('test')
  expect(body.data_source_entity).toEqual('test')
  expect(body.data_source_id).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.photo_url).toEqual('test')
  expect(body.no_sighted).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.data_source_witness).toEqual('test')
  expect(body.trusted).toEqual('test')
  expect(body.data_source_comments).toEqual('test')
  expect(body.ssemmi_data_added).toEqual('test')
  expect(typeof body.ssemmi_creator).toEqual('object')
})

test('POST /sightings 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sightings 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /sightings/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${dataIngestion.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dataIngestion.id)
})

test('GET /sightings/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /sightings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${dataIngestion.id}`)
    .send({ access_token: userSession, entry_id: 'test', data_source_name: 'test', data_source_entity: 'test', data_source_id: 'test', created: 'test', photo_url: 'test', no_sighted: 'test', latitude: 'test', longitude: 'test', data_source_witness: 'test', trusted: 'test', data_source_comments: 'test', ssemmi_data_added: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dataIngestion.id)
  expect(body.entry_id).toEqual('test')
  expect(body.data_source_name).toEqual('test')
  expect(body.data_source_entity).toEqual('test')
  expect(body.data_source_id).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.photo_url).toEqual('test')
  expect(body.no_sighted).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.data_source_witness).toEqual('test')
  expect(body.trusted).toEqual('test')
  expect(body.data_source_comments).toEqual('test')
  expect(body.ssemmi_data_added).toEqual('test')
  expect(typeof body.ssemmi_creator).toEqual('object')
})

test('PUT /sightings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${dataIngestion.id}`)
    .send({ access_token: anotherSession, entry_id: 'test', data_source_name: 'test', data_source_entity: 'test', data_source_id: 'test', created: 'test', photo_url: 'test', no_sighted: 'test', latitude: 'test', longitude: 'test', data_source_witness: 'test', trusted: 'test', data_source_comments: 'test', ssemmi_data_added: 'test' })
  expect(status).toBe(401)
})

test('PUT /sightings/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${dataIngestion.id}`)
  expect(status).toBe(401)
})

test('PUT /sightings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, entry_id: 'test', data_source_name: 'test', data_source_entity: 'test', data_source_id: 'test', created: 'test', photo_url: 'test', no_sighted: 'test', latitude: 'test', longitude: 'test', data_source_witness: 'test', trusted: 'test', data_source_comments: 'test', ssemmi_data_added: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sightings/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dataIngestion.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /sightings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dataIngestion.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /sightings/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dataIngestion.id}`)
  expect(status).toBe(401)
})

test('DELETE /sightings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
