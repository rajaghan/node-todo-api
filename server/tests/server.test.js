const expect = require('expect');
const request = require('supertest');

const {
  ObjectID
} = require('mongodb');

var {
  app
} = require('./../server.js');
var {
  Todo
} = require('./../models/todo');

var todos = [{
  _id: new ObjectID(),
  text: 'This is first text'
}, {
  _id: new ObjectID(),
  text: 'This is second text'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => {
      done();
    });
  });
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
        Todo.find({
          text
        }).then((todos) => {
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
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all notes from database', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get 404 for an invalid id', (done) => {
    var id = '123';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should get 404 for a valid, but non existing id', (done) => {
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });


  it('should get note for a passedin valid id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
});
