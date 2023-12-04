const authorsAPI = require('../data/AuthorsGetSchema.json');
const authorsPost = require('../data/AuthorsPostSchema.json');
const { sendHttpRequest, postHttpRequest, putHttpRequest, deleteHttpRequest } = require('../helpers/sendHTTPrequest');

describe(`Get authors method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const config = {
        url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
      };
      response = await sendHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should be valid response body`, async () => {
      expect(response).toBeValidSchema(authorsAPI);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1',
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });
  });
});

describe(`Post authors method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const config = {
        url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
        data: {
          id: 0,
          idBook: 0,
          firstName: 'string',
          lastName: 'string',
        },
      };
      response = await postHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should be valid response body`, async () => {
      expect(response).toBeValidSchema(authorsPost);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1',
        };
        response = await postHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 400 without request body`, async () => {
      try {
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors`,
        };
        response = await postHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 with invalid parameters in request body`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
          data: {
            id: 100,
            idBook: 'string',
            firstName: 'string',
            lastName: 'string',
          },
        };
        response = await postHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 without any parameter in request body`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors',
          data: {
            id: 100,
            idBook: 'string',
            lastName: 'string',
          },
        };
        response = await postHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });
  });
});

describe(`Get authors book id method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const idBook = 10;
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/${idBook}`,
      };
      response = await sendHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should be valid response body`, async () => {
      expect(response).toBeValidSchema(authorsAPI);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books',
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    //bug
    test.skip(`Should return status code 404 with invalid book id`, async () => {
      try {
        const idBook = 10000;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/${idBook}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    //bug, it works with 0 book id, returning no data
    test.skip(`Should return status code 404 with 0 book id`, async () => {
      try {
        const idBook = 0;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/${idBook}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 400 with string book id`, async () => {
      try {
        const id = 'string';
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });
  });
});

describe(`Get authors id method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const id = 100;
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
      };
      response = await sendHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should return status code 200 and authors list if there is no id parameter`, async () => {
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/`,
      };
      response = await sendHttpRequest(config);
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should be valid response body`, async () => {
      expect(response).toBeValidSchema(authorsAPI);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1',
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 404 with invalid author id`, async () => {
      try {
        const id = 1000;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 404 with 0 author id`, async () => {
      try {
        const id = 0;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 400 with string author id`, async () => {
      try {
        const id = 'string';
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await sendHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });
  });
});

describe(`Put authors id method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const id = 333;
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        data: {
          id: 666,
          idBook: 666,
          firstName: 'Donald',
          lastName: 'Trump',
        },
      };
      response = await putHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });

    test(`Should return status code 200 if put with 0 id`, async () => {
      const id = 0;
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        data: {
          id: 666,
          idBook: 666,
          firstName: 'Donald',
          lastName: 'Trump',
        },
      };
      response = await putHttpRequest(config);

      expect(response).toBeValidStatusCode(200);
    });

    test(`Should be valid response body`, async () => {
      expect(response).toBeValidSchema(authorsPost);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1',
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    test(`Should return status code 405 with request without id`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors/',
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(405);
    });

    test(`Should return status code 400 without id parameter`, async () => {
      try {
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/100`,
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 without request body`, async () => {
      try {
        const id = 1000;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 with invalid patrameters in request body`, async () => {
      try {
        const id = 100;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
          data: {
            id: 'BLM',
            idBook: 666,
            firstName: 'Donald',
            lastName: 'Trump',
          },
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 without any parameter in request body`, async () => {
      try {
        const id = 100;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
          data: {
            id: 'BLM',
            firstName: 'Donald',
            lastName: 'Trump',
          },
        };
        response = await putHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });
  });
});

describe(`Delete authors method tests`, function() {
  describe(`Valid cases`, function() {
    let response;
    beforeAll(async () => {
      const id = 1;
      const config = {
        url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
      };
      response = await deleteHttpRequest(config);
    });

    test(`Should return status code 200`, async () => {
      expect(response).toBeValidStatusCode(200);
    });
  });

  describe(`Negative cases`, function() {
    let response;
    test(`Should return status code 404 with invalid url`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1',
        };
        response = await deleteHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(404);
    });

    // bug? it works without id parameter
    test(`Should return status code 405 with request without id`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors/',
        };
        response = await deleteHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(405);
    });

    // bug? it works without id parameter but through id in the url
    test.skip(`Should return status code 400 without id parameter`, async () => {
      try {
        const config = {
          url: 'https://fakerestapi.azurewebsites.net/api/v1/Authors/1',
        };
        response = await deleteHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    // bug? it works with invalid id
    test.skip(`Should return status code 400 with invalid id`, async () => {
      try {
        const id = 100000;
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await deleteHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });

    test(`Should return status code 400 with string id`, async () => {
      try {
        const id = 'qwerty';
        const config = {
          url: `https://fakerestapi.azurewebsites.net/api/v1/Authors/${id}`,
        };
        response = await deleteHttpRequest(config);
      } catch (err) {
        response = err;
      }
      expect(response).toBeValidStatusCode(400);
    });
  });
});
