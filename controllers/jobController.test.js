const { createJob } = require('../controllers/jobController');
const Job = require('../models/jobModel');
const httpMocks = require('node-mocks-http');

jest.mock('../models/jobModel');

describe('Job Controller - createJob', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    Job.mockClear();
  });
});
