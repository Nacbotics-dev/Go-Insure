import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Policy {
    customer_address: string = "";
    premium_amount: bigint = BigInt(0);
    active_status: boolean = false;
    registration_date: bigint = BigInt(0);
    expiration_date: bigint = BigInt(0);
    claim_status: string = "";
    amount_claimed: bigint = BigInt(0);
    area: string = "";
    state: string = "";
    country: string = "";
    static codec: algosdk.ABIType = algosdk.ABIType.from("(address,uint64,bool,uint64,uint64,string,uint64,string,string,string)");
    static fields: string[] = ["customer_address", "premium_amount", "active_status", "registration_date", "expiration_date", "claim_status", "amount_claimed", "area", "state", "country"];
    static decodeResult(val: algosdk.ABIValue | undefined): Policy {
        return bkr.decodeNamedTuple(val, Policy.fields) as Policy;
    }
    static decodeBytes(val: Uint8Array): Policy {
        return bkr.decodeNamedTuple(Policy.codec.decode(val), Policy.fields) as Policy;
    }
}
export class go_insure extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { coverage_amount: { type: bkr.AVMType.uint64, key: "coverage_amount", desc: "", static: false }, insurer: { type: bkr.AVMType.bytes, key: "insurer", desc: "", static: false }, policy_expiration_date: { type: bkr.AVMType.uint64, key: "policy_expiration_date", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA2NTUzNiAxMDAwMDAwIDMyMCA1MDAwMDAwCmJ5dGVjYmxvY2sgMHggMHgwMCAweDY5NmU3Mzc1NzI2NTcyIDB4NzA2ZjZjNjk2Mzc5NWY2NTc4NzA2OTcyNjE3NDY5NmY2ZTVmNjQ2MTc0NjUgMHg1MDY1NmU2NDY5NmU2Nwp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sMTYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhiZWM3NmQ4NyAvLyAiYm9vdHN0cmFwKCl2b2lkIgo9PQpibnogbWFpbl9sMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyNDFmMDdhYSAvLyAicHVyY2hhc2VfcG9saWN5KHBheSxzdHJpbmcsc3RyaW5nLHN0cmluZyl2b2lkIgo9PQpibnogbWFpbl9sMTQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg2YzZiYzdiNCAvLyAiYXBwcm92ZV9jbGFpbSgpdm9pZCIKPT0KYm56IG1haW5fbDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4OWQ3NTA0MjUgLy8gInJlamVjdF9jbGFpbSgpdm9pZCIKPT0KYm56IG1haW5fbDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NDY1NjZkODMgLy8gImdldF9wb2xpY3koYWRkcmVzcykoYWRkcmVzcyx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjQsc3RyaW5nLHN0cmluZyxzdHJpbmcpIgo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg2OWJkY2Q4NCAvLyAidXBkYXRlX2NvdmVyYWdlX2Ftb3VudCh1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDEwCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YWVkNWQwZDYgLy8gInVwZGF0ZV9leHBpcmF0aW9uX3RpbWVsaW5lKHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sOQplcnIKbWFpbl9sOToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiB1cGRhdGVleHBpcmF0aW9udGltZWxpbmVjYXN0ZXJfMTMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEwOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIHVwZGF0ZWNvdmVyYWdlYW1vdW50Y2FzdGVyXzEyCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRwb2xpY3ljYXN0ZXJfMTEKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIHJlamVjdGNsYWltY2FzdGVyXzEwCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBhcHByb3ZlY2xhaW1jYXN0ZXJfOQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgcHVyY2hhc2Vwb2xpY3ljYXN0ZXJfOAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgYm9vdHN0cmFwY2FzdGVyXzcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxOAplcnIKbWFpbl9sMTg6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydAppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIGJvb3RzdHJhcApib290c3RyYXBfMDoKcHJvdG8gMCAwCmJ5dGVjXzIgLy8gImluc3VyZXIiCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gcHVyY2hhc2VfcG9saWN5CnB1cmNoYXNlcG9saWN5XzE6CnByb3RvIDQgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cG4gMwpieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmJ5dGVjXzAgLy8gIiIKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwCmZyYW1lX2RpZyAtMwpleHRyYWN0IDIgMApieXRlY18wIC8vICIiCiE9Ci8vIEludmFsaWQgYXJlYSwgc3RhdGUgb3IgY291bnRyeQphc3NlcnQKZnJhbWVfZGlnIC0yCmV4dHJhY3QgMiAwCmJ5dGVjXzAgLy8gIiIKIT0KLy8gSW52YWxpZCBhcmVhLCBzdGF0ZSBvciBjb3VudHJ5CmFzc2VydApmcmFtZV9kaWcgLTEKZXh0cmFjdCAyIDAKYnl0ZWNfMCAvLyAiIgohPQovLyBJbnZhbGlkIGFyZWEsIHN0YXRlIG9yIGNvdW50cnkKYXNzZXJ0CmZyYW1lX2RpZyAtNApndHhucyBTZW5kZXIKdHhuIFNlbmRlcgo9PQovLyBTZW5kZXIgbWlzbWF0Y2gKYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKcHVzaGludCAyIC8vIDIKPT0KLy8gR3JvdXAgc2l6ZSBub3QgMgphc3NlcnQKdHhuIFNlbmRlcgpiYWxhbmNlCmludGNfMyAvLyAxMDAwMDAwCj49Ci8vIFNlbmRlciBiYWxhbmNlIGlzIGxvd2VyIHRoYW4gUHJlbWl1bQphc3NlcnQKZnJhbWVfZGlnIC00Cmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KLy8gSW52YWxpZCB0eG4gdHlwZSwgYW1vdW50IG9yIHJlY2VpdmVyLgphc3NlcnQKZnJhbWVfZGlnIC00Cmd0eG5zIEFtb3VudAppbnRjXzMgLy8gMTAwMDAwMAo9PQovLyBJbnZhbGlkIHR4biB0eXBlLCBhbW91bnQgb3IgcmVjZWl2ZXIuCmFzc2VydApmcmFtZV9kaWcgLTQKZ3R4bnMgUmVjZWl2ZXIKYnl0ZWNfMiAvLyAiaW5zdXJlciIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gSW52YWxpZCB0eG4gdHlwZSwgYW1vdW50IG9yIHJlY2VpdmVyLgphc3NlcnQKdHhuIFNlbmRlcgpmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKbGVuCnB1c2hpbnQgMzIgLy8gMzIKPT0KYXNzZXJ0CmludGNfMyAvLyAxMDAwMDAwCmZyYW1lX2J1cnkgMQppbnRjXzEgLy8gMQohCiEKZnJhbWVfYnVyeSAyCmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKZnJhbWVfYnVyeSAzCmZyYW1lX2RpZyAzCmJ5dGVjXzMgLy8gInBvbGljeV9leHBpcmF0aW9uX2RhdGUiCmFwcF9nbG9iYWxfZ2V0CisKZnJhbWVfYnVyeSA0CmJ5dGVjIDQgLy8gIlBlbmRpbmciCmZyYW1lX2J1cnkgNQpmcmFtZV9kaWcgNQpsZW4KaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgNQpjb25jYXQKZnJhbWVfYnVyeSA1CmludGNfMCAvLyAwCmZyYW1lX2J1cnkgNgpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMQppdG9iCmNvbmNhdApieXRlY18xIC8vIDB4MDAKaW50Y18wIC8vIDAKZnJhbWVfZGlnIDIKc2V0Yml0CmNvbmNhdApmcmFtZV9kaWcgMwppdG9iCmNvbmNhdApmcmFtZV9kaWcgNAppdG9iCmNvbmNhdApmcmFtZV9kaWcgNQpmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMQpmcmFtZV9idXJ5IDEwCnB1c2hpbnQgNzMgLy8gNzMKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyA4CmZyYW1lX2RpZyAxMQpsZW4KKwpmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA4Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyA2Cml0b2IKY29uY2F0CmZyYW1lX2RpZyAtMwpmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDkKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyA4CmZyYW1lX2RpZyAxMQpsZW4KKwpmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA4Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAtMgpmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDkKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyA4CmZyYW1lX2RpZyAxMQpsZW4KKwpmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDkKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA4Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAtMQpmcmFtZV9idXJ5IDExCmZyYW1lX2RpZyAxMApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDkKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyA4Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAxMApjb25jYXQKZnJhbWVfYnVyeSA3CnR4biBTZW5kZXIKYm94X2RlbApwb3AKdHhuIFNlbmRlcgpmcmFtZV9kaWcgNwpib3hfcHV0CnJldHN1YgoKLy8gYXBwcm92ZV9jbGFpbQphcHByb3ZlY2xhaW1fMjoKcHJvdG8gMCAwCmJ5dGVjXzAgLy8gIiIKZHVwCmludGNfMCAvLyAwCmR1cG4gMwpieXRlY18wIC8vICIiCmR1cG4gNAppbnRjXzAgLy8gMApkdXBuIDIKYnl0ZWNfMCAvLyAiIgpkdXAKdHhuIFNlbmRlcgpib3hfZ2V0CnN0b3JlIDEKc3RvcmUgMApsb2FkIDEKYXNzZXJ0CmxvYWQgMApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKZXh0cmFjdCAwIDMyCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMApwdXNoaW50IDMyIC8vIDMyCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMAppbnRjIDQgLy8gMzIwCmdldGJpdApmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDAKcHVzaGludCA0MSAvLyA0MQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDQKZnJhbWVfZGlnIDAKcHVzaGludCA0OSAvLyA0OQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCA1NyAvLyA1NwpleHRyYWN0X3VpbnQxNgpmcmFtZV9kaWcgMApwdXNoaW50IDY3IC8vIDY3CmV4dHJhY3RfdWludDE2CnN1YnN0cmluZzMKZnJhbWVfYnVyeSA2CmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAwCnB1c2hpbnQgNjcgLy8gNjcKZXh0cmFjdF91aW50MTYKZnJhbWVfZGlnIDAKcHVzaGludCA2OSAvLyA2OQpleHRyYWN0X3VpbnQxNgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMApwdXNoaW50IDY5IC8vIDY5CmV4dHJhY3RfdWludDE2CmZyYW1lX2RpZyAwCnB1c2hpbnQgNzEgLy8gNzEKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCA3MSAvLyA3MQpleHRyYWN0X3VpbnQxNgpkaWcgMQpsZW4Kc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDkKZnJhbWVfZGlnIDEKdHhuIFNlbmRlcgo9PQphc3NlcnQKZnJhbWVfZGlnIDIKaW50Y18zIC8vIDEwMDAwMDAKPT0KYXNzZXJ0CmZyYW1lX2RpZyAzCmludGNfMSAvLyAxCj09CmFzc2VydApmcmFtZV9kaWcgNgpleHRyYWN0IDIgMApieXRlYyA0IC8vICJQZW5kaW5nIgo9PQphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzEgLy8gcGF5Cml0eG5fZmllbGQgVHlwZUVudW0KZnJhbWVfZGlnIDEKaXR4bl9maWVsZCBSZWNlaXZlcgppbnRjIDUgLy8gNTAwMDAwMAppdHhuX2ZpZWxkIEFtb3VudAppdHhuX3N1Ym1pdApwdXNoYnl0ZXMgMHg0MTcwNzA3MjZmNzY2NTY0IC8vICJBcHByb3ZlZCIKZnJhbWVfYnVyeSAxMApmcmFtZV9kaWcgMTAKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDEwCmNvbmNhdApmcmFtZV9idXJ5IDEwCmludGMgNSAvLyA1MDAwMDAwCmZyYW1lX2J1cnkgMTEKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDIKaXRvYgpjb25jYXQKYnl0ZWNfMSAvLyAweDAwCmludGNfMCAvLyAwCmZyYW1lX2RpZyAzCnNldGJpdApjb25jYXQKZnJhbWVfZGlnIDQKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDEwCmZyYW1lX2J1cnkgMTUKZnJhbWVfZGlnIDE1CmZyYW1lX2J1cnkgMTQKcHVzaGludCA3MyAvLyA3MwpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMgpmcmFtZV9kaWcgMTUKbGVuCisKZnJhbWVfYnVyeSAxMwpmcmFtZV9kaWcgMTMKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyAxMgppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgMTEKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDcKZnJhbWVfYnVyeSAxNQpmcmFtZV9kaWcgMTQKZnJhbWVfZGlnIDE1CmNvbmNhdApmcmFtZV9idXJ5IDE0CmZyYW1lX2RpZyAxMwpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMgpmcmFtZV9kaWcgMTUKbGVuCisKZnJhbWVfYnVyeSAxMwpmcmFtZV9kaWcgMTMKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyAxMgppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgOApmcmFtZV9idXJ5IDE1CmZyYW1lX2RpZyAxNApmcmFtZV9kaWcgMTUKY29uY2F0CmZyYW1lX2J1cnkgMTQKZnJhbWVfZGlnIDEzCmZyYW1lX2J1cnkgMTIKZnJhbWVfZGlnIDEyCmZyYW1lX2RpZyAxNQpsZW4KKwpmcmFtZV9idXJ5IDEzCmZyYW1lX2RpZyAxMwppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDEyCml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyA5CmZyYW1lX2J1cnkgMTUKZnJhbWVfZGlnIDE0CmZyYW1lX2RpZyAxNQpjb25jYXQKZnJhbWVfYnVyeSAxNApmcmFtZV9kaWcgMTMKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDE0CmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDEKYm94X2RlbApwb3AKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDAKYm94X3B1dApyZXRzdWIKCi8vIHJlamVjdF9jbGFpbQpyZWplY3RjbGFpbV8zOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgpkdXAKaW50Y18wIC8vIDAKZHVwbiAzCmJ5dGVjXzAgLy8gIiIKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgpkdXBuIDMKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwCnR4biBTZW5kZXIKYm94X2dldApzdG9yZSAzCnN0b3JlIDIKbG9hZCAzCmFzc2VydApsb2FkIDIKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmV4dHJhY3QgMCAzMgpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKdHhuIFNlbmRlcgo9PQphc3NlcnQKZnJhbWVfZGlnIDAKcHVzaGludCAzMiAvLyAzMgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDAKaW50YyA0IC8vIDMyMApnZXRiaXQKZnJhbWVfYnVyeSAzCmZyYW1lX2RpZyAwCnB1c2hpbnQgNDEgLy8gNDEKZXh0cmFjdF91aW50NjQKZnJhbWVfYnVyeSA0CmZyYW1lX2RpZyAwCnB1c2hpbnQgNDkgLy8gNDkKZXh0cmFjdF91aW50NjQKZnJhbWVfYnVyeSA1CnB1c2hieXRlcyAweDUyNjU2YTY1NjM3NDY1NjQgLy8gIlJlamVjdGVkIgpmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDYKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDYKY29uY2F0CmZyYW1lX2J1cnkgNgpmcmFtZV9kaWcgMApwdXNoaW50IDU5IC8vIDU5CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMApwdXNoaW50IDY3IC8vIDY3CmV4dHJhY3RfdWludDE2CmZyYW1lX2RpZyAwCnB1c2hpbnQgNjkgLy8gNjkKZXh0cmFjdF91aW50MTYKc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCA2OSAvLyA2OQpleHRyYWN0X3VpbnQxNgpmcmFtZV9kaWcgMApwdXNoaW50IDcxIC8vIDcxCmV4dHJhY3RfdWludDE2CnN1YnN0cmluZzMKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAwCnB1c2hpbnQgNzEgLy8gNzEKZXh0cmFjdF91aW50MTYKZGlnIDEKbGVuCnN1YnN0cmluZzMKZnJhbWVfYnVyeSAxMApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMgppdG9iCmNvbmNhdApieXRlY18xIC8vIDB4MDAKaW50Y18wIC8vIDAKZnJhbWVfZGlnIDMKc2V0Yml0CmNvbmNhdApmcmFtZV9kaWcgNAppdG9iCmNvbmNhdApmcmFtZV9kaWcgNQppdG9iCmNvbmNhdApmcmFtZV9kaWcgNgpmcmFtZV9idXJ5IDE1CmZyYW1lX2RpZyAxNQpmcmFtZV9idXJ5IDE0CnB1c2hpbnQgNzMgLy8gNzMKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKZnJhbWVfZGlnIDE1CmxlbgorCmZyYW1lX2J1cnkgMTMKZnJhbWVfZGlnIDEzCmludGNfMiAvLyA2NTUzNgo8CmFzc2VydApmcmFtZV9kaWcgMTIKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDcKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDgKZnJhbWVfYnVyeSAxNQpmcmFtZV9kaWcgMTQKZnJhbWVfZGlnIDE1CmNvbmNhdApmcmFtZV9idXJ5IDE0CmZyYW1lX2RpZyAxMwpmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMgpmcmFtZV9kaWcgMTUKbGVuCisKZnJhbWVfYnVyeSAxMwpmcmFtZV9kaWcgMTMKaW50Y18yIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyAxMgppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgOQpmcmFtZV9idXJ5IDE1CmZyYW1lX2RpZyAxNApmcmFtZV9kaWcgMTUKY29uY2F0CmZyYW1lX2J1cnkgMTQKZnJhbWVfZGlnIDEzCmZyYW1lX2J1cnkgMTIKZnJhbWVfZGlnIDEyCmZyYW1lX2RpZyAxNQpsZW4KKwpmcmFtZV9idXJ5IDEzCmZyYW1lX2RpZyAxMwppbnRjXzIgLy8gNjU1MzYKPAphc3NlcnQKZnJhbWVfZGlnIDEyCml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAxMApmcmFtZV9idXJ5IDE1CmZyYW1lX2RpZyAxNApmcmFtZV9kaWcgMTUKY29uY2F0CmZyYW1lX2J1cnkgMTQKZnJhbWVfZGlnIDEzCmZyYW1lX2J1cnkgMTIKZnJhbWVfZGlnIDEyCml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAxNApjb25jYXQKZnJhbWVfYnVyeSAxMQpmcmFtZV9kaWcgMQpib3hfZGVsCnBvcApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMTEKYm94X3B1dApyZXRzdWIKCi8vIGdldF9wb2xpY3kKZ2V0cG9saWN5XzQ6CnByb3RvIDEgMQpieXRlY18wIC8vICIiCmZyYW1lX2RpZyAtMQpib3hfZ2V0CnN0b3JlIDUKc3RvcmUgNApsb2FkIDUKYXNzZXJ0CmxvYWQgNApmcmFtZV9idXJ5IDAKcmV0c3ViCgovLyB1cGRhdGVfY292ZXJhZ2VfYW1vdW50CnVwZGF0ZWNvdmVyYWdlYW1vdW50XzU6CnByb3RvIDEgMAp0eG4gU2VuZGVyCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CnB1c2hieXRlcyAweDYzNmY3NjY1NzI2MTY3NjU1ZjYxNmQ2Zjc1NmU3NCAvLyAiY292ZXJhZ2VfYW1vdW50IgpmcmFtZV9kaWcgLTEKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyB1cGRhdGVfZXhwaXJhdGlvbl90aW1lbGluZQp1cGRhdGVleHBpcmF0aW9udGltZWxpbmVfNjoKcHJvdG8gMSAwCnR4biBTZW5kZXIKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWNfMyAvLyAicG9saWN5X2V4cGlyYXRpb25fZGF0ZSIKZnJhbWVfZGlnIC0xCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gYm9vdHN0cmFwX2Nhc3Rlcgpib290c3RyYXBjYXN0ZXJfNzoKcHJvdG8gMCAwCmNhbGxzdWIgYm9vdHN0cmFwXzAKcmV0c3ViCgovLyBwdXJjaGFzZV9wb2xpY3lfY2FzdGVyCnB1cmNoYXNlcG9saWN5Y2FzdGVyXzg6CnByb3RvIDAgMAppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCmR1cG4gMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmZyYW1lX2J1cnkgMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmZyYW1lX2J1cnkgMwp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApmcmFtZV9kaWcgMApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMgpmcmFtZV9kaWcgMwpjYWxsc3ViIHB1cmNoYXNlcG9saWN5XzEKcmV0c3ViCgovLyBhcHByb3ZlX2NsYWltX2Nhc3RlcgphcHByb3ZlY2xhaW1jYXN0ZXJfOToKcHJvdG8gMCAwCmNhbGxzdWIgYXBwcm92ZWNsYWltXzIKcmV0c3ViCgovLyByZWplY3RfY2xhaW1fY2FzdGVyCnJlamVjdGNsYWltY2FzdGVyXzEwOgpwcm90byAwIDAKY2FsbHN1YiByZWplY3RjbGFpbV8zCnJldHN1YgoKLy8gZ2V0X3BvbGljeV9jYXN0ZXIKZ2V0cG9saWN5Y2FzdGVyXzExOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgpkdXAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKY2FsbHN1YiBnZXRwb2xpY3lfNApmcmFtZV9idXJ5IDAKcHVzaGJ5dGVzIDB4MTUxZjdjNzUgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1YgoKLy8gdXBkYXRlX2NvdmVyYWdlX2Ftb3VudF9jYXN0ZXIKdXBkYXRlY292ZXJhZ2VhbW91bnRjYXN0ZXJfMTI6CnByb3RvIDAgMAppbnRjXzAgLy8gMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmNhbGxzdWIgdXBkYXRlY292ZXJhZ2VhbW91bnRfNQpyZXRzdWIKCi8vIHVwZGF0ZV9leHBpcmF0aW9uX3RpbWVsaW5lX2Nhc3Rlcgp1cGRhdGVleHBpcmF0aW9udGltZWxpbmVjYXN0ZXJfMTM6CnByb3RvIDAgMAppbnRjXzAgLy8gMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmNhbGxzdWIgdXBkYXRlZXhwaXJhdGlvbnRpbWVsaW5lXzYKcmV0c3Vi";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "bootstrap", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "purchase_policy", desc: "", args: [{ type: "pay", name: "pay_txn", desc: "" }, { type: "string", name: "area", desc: "" }, { type: "string", name: "state", desc: "" }, { type: "string", name: "country", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "approve_claim", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "reject_claim", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_policy", desc: "", args: [{ type: "address", name: "addr", desc: "" }], returns: { type: "(address,uint64,bool,uint64,uint64,string,uint64,string,string,string)", desc: "" } }),
        new algosdk.ABIMethod({ name: "update_coverage_amount", desc: "", args: [{ type: "uint64", name: "amt", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "update_expiration_timeline", desc: "", args: [{ type: "uint64", name: "expiration_timeline", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async bootstrap(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.bootstrap(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async purchase_policy(args: {
        pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        area: string;
        state: string;
        country: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.purchase_policy({ pay_txn: args.pay_txn, area: args.area, state: args.state, country: args.country }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async approve_claim(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.approve_claim(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async reject_claim(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.reject_claim(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_policy(args: {
        addr: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<[
        string,
        bigint,
        boolean,
        bigint,
        bigint,
        string,
        bigint,
        string,
        string,
        string
    ]>> {
        const result = await this.execute(await this.compose.get_policy({ addr: args.addr }, txnParams));
        return new bkr.ABIResult<[
            string,
            bigint,
            boolean,
            bigint,
            bigint,
            string,
            bigint,
            string,
            string,
            string
        ]>(result, result.returnValue as [
            string,
            bigint,
            boolean,
            bigint,
            bigint,
            string,
            bigint,
            string,
            string,
            string
        ]);
    }
    async update_coverage_amount(args: {
        amt: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.update_coverage_amount({ amt: args.amt }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async update_expiration_timeline(args: {
        expiration_timeline: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.update_expiration_timeline({ expiration_timeline: args.expiration_timeline }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        bootstrap: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "bootstrap"), {}, txnParams, atc);
        },
        purchase_policy: async (args: {
            pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
            area: string;
            state: string;
            country: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "purchase_policy"), { pay_txn: args.pay_txn, area: args.area, state: args.state, country: args.country }, txnParams, atc);
        },
        approve_claim: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "approve_claim"), {}, txnParams, atc);
        },
        reject_claim: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "reject_claim"), {}, txnParams, atc);
        },
        get_policy: async (args: {
            addr: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_policy"), { addr: args.addr }, txnParams, atc);
        },
        update_coverage_amount: async (args: {
            amt: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "update_coverage_amount"), { amt: args.amt }, txnParams, atc);
        },
        update_expiration_timeline: async (args: {
            expiration_timeline: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "update_expiration_timeline"), { expiration_timeline: args.expiration_timeline }, txnParams, atc);
        }
    };
}
