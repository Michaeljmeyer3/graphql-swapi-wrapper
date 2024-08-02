// 4. Produce a test for your star wars character graphQL type/resolver

import fs from 'fs';
import path from 'path';

import { getResolvers } from '../../../resolvers';

const Schema = fs.readFileSync(
  path.join(__dirname, '../../../schema.graphql', 'utf8')
)
const resolvers = getResolvers();

const EasyGraphQLTester = require('easygraphql-tester');
// @ts-ignore: // Ignoring test runner as given the time constraint, 
// I simply wanted the test to run and pass.
let testRunner;
describe("SWAPI Resolve", () => {

  beforeAll(() => {
    testRunner = new EasyGraphQLTester(Schema, resolvers);
  });

  // Of course, this test will fail if the SWAPI is down or the data is changed.
  it('Reads Luke Skywalkers Data when given an ID of 1', async () => {

    const query = `
      query SwapiCharacterById($swapiCharacterByIdId: ID!) {
        swapiCharacterById(id: 1) {
          name
          height
          mass
          gender
        }
      }
    `;
    const args = { id: 1 }
    // @ts-ignore:
    const result = await testRunner.graphql(query, {}, {}, args);
    if (!result) fail("No result returned");

    expect(result.data.name).toBe("Luke Skywalker");
    expect(result.data.height).toBe("172");
    expect(result.data.mass).toBe("77");
    expect(result.data.gender).toBe("MALE");
  })
});

