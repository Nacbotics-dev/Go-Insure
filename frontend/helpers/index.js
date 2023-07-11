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

const algodURL = "https://node.testnet.algoexplorerapi.io";
const token = "";
const port = 443;
const client = new algosdk.Algodv2(token, algodURL, port);

const SourceSpecType = new ABITupleType([
  new ABIUintType(32),
  new ABIArrayDynamicType(new ABIArrayDynamicType(new ABIByteType())), // source args...this is usually the JSON path
  new ABIUintType(64), //max age of the data in seconds
]);

const RequestArgsType = new ABITupleType([
  new ABIArrayDynamicType(SourceSpecType),
  new ABIUintType(32),
  new ABIArrayDynamicType(new ABIByteType()),
]);

const DestinationType = new ABITupleType([
  new ABIUintType(64), //app id of the destination
  new ABIArrayDynamicType(new ABIByteType()), //method signature of the method in the destination app
]);

function createSourceArr(sourceID, source_args, maxAgeSeconds) {
  return [sourceID, source_args, maxAgeSeconds];
}

function createRequestArgs(sourceSpecArray, aggregationType, userData) {
  //=========================================
  return RequestArgsType.encode([sourceSpecArray, aggregationType, userData]);
}

function createDestinationArg(destinationAppID, destinationMethod) {
  //=========================================
  return DestinationType.encode([destinationAppID, destinationMethod]);
}



// PARAMETERS
const userData = new Uint8Array(Buffer.from("test"));
const sourceArr = createSourceArr(
  11, // weather
  [
    Buffer.from("005CbGKDn22fNWfXuWQu"),
    Buffer.from("Kenya"),
    Buffer.from("nairobi"),
    Buffer.from("metric"),
    Buffer.from("$.data.temparature"),
    Buffer.from("$.data.timestamp"),
  ],
  60
);

const requestArgs = createRequestArgs([sourceArr], 0, userData);
const destMethod = Buffer.from("test_endpoint");
const destination = createDestinationArg(165038377, destMethod);
const randomKey = Buffer.from(`${Date.now()}`);

// const requestObj = {
//   appID: 228009344,
//   destination: destination,
//   requestArgs: requestArgs,
//   user: mnemonicToSecretKey(creator_mnemonic),
//   suggestedParams: params,
//   type: 1,
//   key: randomKey,
//   appRefs: [228009344],
//   assetRefs: [227418519],
//   //TO DO: Add custom algorand address account
//   accountRefs: [process.env.account],
//   boxRefs: [],
// };
//   165038377, 162365438  destination id


// CALL ABI METHODS

const request = (requestParams /** Object containing all needed data */) => {

	
};