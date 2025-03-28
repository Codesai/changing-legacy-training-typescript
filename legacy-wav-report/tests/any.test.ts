import {App} from "../src/App";

describe('Test', () => {
  it('canary test', () => {
    App.main(["/home/freyes/workspace/legacy-wav-report-ts/src/examples"]);
    expect(true).toBe(true);
  });
})
