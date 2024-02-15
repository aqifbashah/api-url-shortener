import { checkConnection } from "./connection";
import { createRoleType, createUsersTable } from "../models/Users";
import { createStatusType, createUrlTable } from "../models/Urls";

async function dbInit() {
  // check connection
  try {
    await checkConnection();
  } catch (error) {
    console.log("Error connecting to the database");
  }

  // create Users Table
  try {
    await createRoleType();
    await createUsersTable();
  } catch (error) {
    console.log("Error creating Users Table");
  }

  // create Urls Table
  try {
    await createStatusType();
    await createUrlTable();
  } catch (error) {
    console.log("Error creating Urls Table");
  }
}

export default dbInit;
