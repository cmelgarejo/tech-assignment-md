import swaggerAutogen from "swagger-autogen";

const options = {
  openapi: "3.0.0", // Enable/Disable OpenAPI.                        By default is null
  language: "en-US", // Change response language.                      By default is 'en-US'
  disableLogs: false, // Enable/Disable logs.                           By default is false
  // autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
  // autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
  // autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
  // writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
const doc = {
  info: {
    title: "Tech Assignment DM",
    description: "Assignment API for DigiMint",
  },
  host: "localhost:3000",
};
//Swagger autogen init
swaggerAutogen(options)("./swagger.json", ["./src/app.ts"], doc);
