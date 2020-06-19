const faker = require("faker");
const jsonserver = require("json-server");
const middlewares = jsonserver.defaults();
const image = require("./Image");
const server = jsonserver.create();
server.use(jsonserver.bodyParser);
server.use(middlewares);

const timeoutValue = 500;
const regions = ["karnataka", "central-government"];
const imageDataSample = image;

server.get("/regions", (request, response) => {
  return response.jsonp(regions);
});

server.get("/:id/list", (request, response) => {
  if (
    request.query.range === undefined ||
    !regions.includes(request.param.id)
  ) {
    response.sendStatus(400);
    return;
  }
  const length = request.query.range.split("-");
  let resObjects = new Array();

  for (let i = parseInt(length[0]); i < parseInt(length[1]); i++) {
    resObjects.push({
      title: faker.lorem.lines(1),
      encoded_image: imageDataSample,
      schemeId: parseInt(i),
    });
  }

  setTimeout(() => {
    response.jsonp(resObjects);
  }, timeoutValue);
});

server.get("/:id/search", (request, response) => {
  if (
    request.query.phrase === undefined ||
    !regions.includes(request.param.id)
  ) {
    response.sendStatus(400);
    return;
  }
  let resObjects = new Array();

  for (let i = 0; i < 10; i++) {
    resObjects.push({
      title: faker.lorem.lines(2),
      encoded_image: imageDataSample,
      schemeId: i,
    });
  }
  setTimeout(() => {
    response.jsonp(resObjects);
  }, timeoutValue);
});

server.get("/:id/content", (request, response) => {
  if (
    request.query.schemeId === undefined ||
    !regions.includes(request.param.id)
  ) {
    response.sendStatus(400);
    return;
  }

  const finalObject = {
    "000-section": {
      "000-title": faker.lorem.lines(2),
    },
  };

  let intermediate = {};
  for (let j = 1; j < 2; j++) {
    intermediate[`00${j}-title`] = faker.lorem.lines(2);
    intermediate[`00${j}-normal`] = faker.lorem.paragraph(20);
    intermediate[`00${j}-image`] = {
      encoded_image: imageDataSample,
    };
  }

  for (let j = 0; j < 10; j++) {
    intermediate[`00${j}-listElement`] = `- ${faker.lorem.lines(1)}\n`;
  }

  let data = [];
  for (let j = 0; j < 10; j++) {
    let tempArray = [];
    for (let k = 0; k < 6; k++) {
      tempArray.push(faker.name.firstName());
    }
    data.push(tempArray);
  }

  intermediate[`001-table`] = {
    row: 10,
    column: 6,
    data: data,
  };

  finalObject[`001-section`] = intermediate;

  setTimeout(() => {
    response.jsonp(finalObject);
  }, timeoutValue);
});

server.listen(5000, () => {
  console.log("Mock API Server is Listening");
});
