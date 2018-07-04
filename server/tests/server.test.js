const expect = require('expect');
const request = require('supertest');

var {
  app
} = require('./../server.js');
var {
  Todo
} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => {
    done();
  })
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create a todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch(err => done(err));
      });
  });

  it('should get all todos from database', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((docs) => {
          expect(docs.length).toBe(0);
          done();
        }).catch(err => done(err));
      });
  });

});