import algosdk from "algosdk";
import {
  ABITupleType,
  ABIUintType,
  decodeAddress,
  ABIArrayDynamicType,
  ABIByteType,
  Algodv2,
  ABIContract,
  AtomicTransactionComposer,
  makeBasicAccountTransactionSigner,
  mnemonicToSecretKey,
} from "algosdk";
import { sha512_256 } from "js-sha512";

// const mainAbi = require("./main-contract.json");
// const requestContract = new ABIContract(mainAbi);


const algodURL = "https://node.testnet.algoexplorerapi.io";
const token = "";
const port = 443;
const client = new algosdk.Algodv2(token, algodURL, port);
