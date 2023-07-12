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
    static codec: algosdk.ABIType = algosdk.ABIType.from("(address,uint64,bool,uint64,uint64,string,uint64)");
    static fields: string[] = ["customer_address", "premium_amount", "active_status", "registration_date", "expiration_date", "claim_status", "amount_claimed"];
    static decodeResult(val: algosdk.ABIValue | undefined): Policy {
        return bkr.decodeNamedTuple(val, Policy.fields) as Policy;
    }
    static decodeBytes(val: Uint8Array): Policy {
        return bkr.decodeNamedTuple(Policy.codec.decode(val), Policy.fields) as Policy;
    }
}
export class InsurancedApp extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { box_name: { type: bkr.AVMType.bytes, key: "box_name", desc: "", static: false }, coverage_amount: { type: bkr.AVMType.uint64, key: "coverage_amount", desc: "", static: false }, insurer: { type: bkr.AVMType.bytes, key: "insurer", desc: "", static: false }, policy_expiration_date: { type: bkr.AVMType.uint64, key: "policy_expiration_date", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSAxMDAwMDAwIDMyIDMyMCAxNTUzCmJ5dGVjYmxvY2sgMHggMHg2MjZmNzg1ZjZlNjE2ZDY1IDB4Njk2ZTczNzU3MjY1NzIgMHg3MDZmNmM2OTYzNzk1ZjY1Nzg3MDY5NzI2MTc0Njk2ZjZlNWY2NDYxNzQ2NSAweDAwIDB4NjM2Zjc2NjU3MjYxNjc2NTVmNjE2ZDZmNzU2ZTc0IDB4NTA2NTZlNjQ2OTZlNjcKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDI2CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4MzBjNmQ1OGEgLy8gIm9wdF9pbigpdm9pZCIKPT0KYm56IG1haW5fbDI1CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YTU2NWU5YjIgLy8gIndyaXRlX3RvX2RhdGFfYm94KGJ5dGVbXSxieXRlW10pdm9pZCIKPT0KYm56IG1haW5fbDI0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YmVjNzZkODcgLy8gImJvb3RzdHJhcCgpdm9pZCIKPT0KYm56IG1haW5fbDIzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZTQ2OTFlYmQgLy8gInB1cmNoYXNlX3BvbGljeShwYXkpdm9pZCIKPT0KYm56IG1haW5fbDIyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4MmE5NGI5ZWUgLy8gImFwcHJvdmVfY2xhaW0oYWRkcmVzcyx1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDIxCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NDM0ODNlMzEgLy8gInJlamVjdF9jbGFpbShhZGRyZXNzKXZvaWQiCj09CmJueiBtYWluX2wyMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDZmMWFjZDZkIC8vICJyZXZpZXdfY2xhaW0oYnl0ZVtdLGJ5dGVbXSl2b2lkIgo9PQpibnogbWFpbl9sMTkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyZmM4NTE1YSAvLyAic2VuZF9yZXF1ZXN0KHVpbnQ2NCxzdHJpbmcsYnl0ZVtdLGJ5dGVbXSx1aW50NjQsKHVpbnQzMixieXRlW10sdWludDY0KVtdLHVpbnQzMixieXRlW10sYXBwbGljYXRpb24pdm9pZCIKPT0KYm56IG1haW5fbDE4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ODhhMTc2YjIgLy8gImdldF9wb2xpY3koYWRkcmVzcykoYWRkcmVzcyx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjQpIgo9PQpibnogbWFpbl9sMTcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg2OWJkY2Q4NCAvLyAidXBkYXRlX2NvdmVyYWdlX2Ftb3VudCh1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDE2CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YWVkNWQwZDYgLy8gInVwZGF0ZV9leHBpcmF0aW9uX3RpbWVsaW5lKHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgzNDVkNTFmZSAvLyAib3B0X2luX2dvcmEoYXNzZXQsYXBwbGljYXRpb24pdm9pZCIKPT0KYm56IG1haW5fbDE0CmVycgptYWluX2wxNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBvcHRpbmdvcmFjYXN0ZXJfMjYKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIHVwZGF0ZWV4cGlyYXRpb250aW1lbGluZWNhc3Rlcl8yNQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTY6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgdXBkYXRlY292ZXJhZ2VhbW91bnRjYXN0ZXJfMjQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGdldHBvbGljeWNhc3Rlcl8yMwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTg6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgc2VuZHJlcXVlc3RjYXN0ZXJfMjIKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIHJldmlld2NsYWltY2FzdGVyXzIxCmludGNfMSAvLyAxCnJldHVybgptYWluX2wyMDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiByZWplY3RjbGFpbWNhc3Rlcl8yMAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgYXBwcm92ZWNsYWltY2FzdGVyXzE5CmludGNfMSAvLyAxCnJldHVybgptYWluX2wyMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBwdXJjaGFzZXBvbGljeWNhc3Rlcl8xOAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjM6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgYm9vdHN0cmFwY2FzdGVyXzE3CmludGNfMSAvLyAxCnJldHVybgptYWluX2wyNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiB3cml0ZXRvZGF0YWJveGNhc3Rlcl8xNgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18xIC8vIE9wdEluCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIG9wdGluY2FzdGVyXzE1CmludGNfMSAvLyAxCnJldHVybgptYWluX2wyNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sMzAKdHhuIE9uQ29tcGxldGlvbgpwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KPT0KYm56IG1haW5fbDI5CmVycgptYWluX2wyOToKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgZGVsZXRlXzMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDMwOgp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAo9PQphc3NlcnQKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBvcHRfaW4Kb3B0aW5fMDoKcHJvdG8gMSAwCml0eG5fYmVnaW4KcHVzaGludCA2IC8vIGFwcGwKaXR4bl9maWVsZCBUeXBlRW51bQpmcmFtZV9kaWcgLTEKaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECmludGNfMSAvLyBPcHRJbgppdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIG9wdF9pbl9hc3NldApvcHRpbmFzc2V0XzE6CnByb3RvIDEgMAppdHhuX2JlZ2luCnB1c2hpbnQgNCAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmZyYW1lX2RpZyAtMQppdHhuX2ZpZWxkIFhmZXJBc3NldApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBBc3NldEFtb3VudAppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIG9wdF9pbgpvcHRpbl8yOgpwcm90byAwIDAKaW50Y18wIC8vIDAKcmV0dXJuCgovLyBkZWxldGUKZGVsZXRlXzM6CnByb3RvIDAgMAppbnRjXzAgLy8gMApyZXR1cm4KCi8vIHdyaXRlX3RvX2RhdGFfYm94CndyaXRldG9kYXRhYm94XzQ6CnByb3RvIDIgMApieXRlY18wIC8vICIiCmR1cG4gMgppbnRjXzAgLy8gMApmcmFtZV9kaWcgLTEKZXh0cmFjdCAyIDAKZnJhbWVfYnVyeSAxCmZyYW1lX2RpZyAxCmZyYW1lX2RpZyAxCnB1c2hpbnQgNjQgLy8gNjQKZXh0cmFjdF91aW50MTYKZnJhbWVfZGlnIDEKcHVzaGludCA2NiAvLyA2NgpleHRyYWN0X3VpbnQxNgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgMgpieXRlY18xIC8vICJib3hfbmFtZSIKYXBwX2dsb2JhbF9nZXQKYm94X2RlbApwb3AKYnl0ZWNfMSAvLyAiYm94X25hbWUiCmFwcF9nbG9iYWxfZ2V0CmZyYW1lX2RpZyAyCmludGNfMCAvLyAwCmV4dHJhY3RfdWludDE2CmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgMwpwdXNoaW50IDIgLy8gMgorCmJveF9jcmVhdGUKcG9wCmludGNfMSAvLyAxCmludGNfMSAvLyAxCj09CmFzc2VydApieXRlY18xIC8vICJib3hfbmFtZSIKYXBwX2dsb2JhbF9nZXQKZnJhbWVfZGlnIDIKYm94X3B1dApyZXRzdWIKCi8vIGJvb3RzdHJhcApib290c3RyYXBfNToKcHJvdG8gMCAwCmJ5dGVjXzEgLy8gImJveF9uYW1lIgpieXRlY18wIC8vICIiCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDUgLy8gImNvdmVyYWdlX2Ftb3VudCIKcHVzaGludCA1MDAwMDAwIC8vIDUwMDAwMDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAiaW5zdXJlciIKYnl0ZWNfMCAvLyAiIgphcHBfZ2xvYmFsX3B1dApieXRlY18zIC8vICJwb2xpY3lfZXhwaXJhdGlvbl9kYXRlIgpwdXNoaW50IDMxNTM2MDAwIC8vIDMxNTM2MDAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gImluc3VyZXIiCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gcHVyY2hhc2VfcG9saWN5CnB1cmNoYXNlcG9saWN5XzY6CnByb3RvIDEgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cG4gMwpieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmJ5dGVjXzAgLy8gIiIKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwCmZyYW1lX2RpZyAtMQpndHhucyBTZW5kZXIKdHhuIFNlbmRlcgo9PQovLyBTZW5kZXIgbWlzbWF0Y2gKYXNzZXJ0Cmdsb2JhbCBHcm91cFNpemUKcHVzaGludCAyIC8vIDIKPT0KLy8gR3JvdXAgc2l6ZSBub3QgMgphc3NlcnQKdHhuIFNlbmRlcgpiYWxhbmNlCmludGNfMiAvLyAxMDAwMDAwCj49Ci8vIFNlbmRlciBiYWxhbmNlIGlzIGxvd2VyIHRoYW4gUHJlbWl1bQphc3NlcnQKZnJhbWVfZGlnIC0xCmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KLy8gSW52YWxpZCB0eG4gdHlwZSwgYW1vdW50IG9yIHJlY2VpdmVyLgphc3NlcnQKZnJhbWVfZGlnIC0xCmd0eG5zIEFtb3VudAppbnRjXzIgLy8gMTAwMDAwMAo9PQovLyBJbnZhbGlkIHR4biB0eXBlLCBhbW91bnQgb3IgcmVjZWl2ZXIuCmFzc2VydApmcmFtZV9kaWcgLTEKZ3R4bnMgUmVjZWl2ZXIKYnl0ZWNfMiAvLyAiaW5zdXJlciIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gSW52YWxpZCB0eG4gdHlwZSwgYW1vdW50IG9yIHJlY2VpdmVyLgphc3NlcnQKdHhuIFNlbmRlcgpmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKbGVuCmludGNfMyAvLyAzMgo9PQphc3NlcnQKaW50Y18yIC8vIDEwMDAwMDAKZnJhbWVfYnVyeSAxCmludGNfMSAvLyAxCiEKIQpmcmFtZV9idXJ5IDIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDMKYnl0ZWNfMyAvLyAicG9saWN5X2V4cGlyYXRpb25fZGF0ZSIKYXBwX2dsb2JhbF9nZXQKKwpmcmFtZV9idXJ5IDQKYnl0ZWMgNiAvLyAiUGVuZGluZyIKZnJhbWVfYnVyeSA1CmZyYW1lX2RpZyA1CmxlbgppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyA1CmNvbmNhdApmcmFtZV9idXJ5IDUKaW50Y18wIC8vIDAKZnJhbWVfYnVyeSA2CmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAxCml0b2IKY29uY2F0CmJ5dGVjIDQgLy8gMHgwMAppbnRjXzAgLy8gMApmcmFtZV9kaWcgMgpzZXRiaXQKY29uY2F0CmZyYW1lX2RpZyAzCml0b2IKY29uY2F0CmZyYW1lX2RpZyA0Cml0b2IKY29uY2F0CmZyYW1lX2RpZyA1CmZyYW1lX2J1cnkgMTEKZnJhbWVfZGlnIDExCmZyYW1lX2J1cnkgMTAKcHVzaGludCA2NyAvLyA2NwpmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDgKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDYKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDEwCmNvbmNhdApmcmFtZV9idXJ5IDcKdHhuIFNlbmRlcgpib3hfZGVsCnBvcAp0eG4gU2VuZGVyCmZyYW1lX2RpZyA3CmJveF9wdXQKcmV0c3ViCgovLyBhcHByb3ZlX2NsYWltCmFwcHJvdmVjbGFpbV83Ogpwcm90byAyIDAKYnl0ZWNfMCAvLyAiIgpkdXAKaW50Y18wIC8vIDAKZHVwbiAzCmJ5dGVjXzAgLy8gIiIKZHVwCmludGNfMCAvLyAwCmR1cG4gMgpieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTIKYm94X2dldApzdG9yZSAxCnN0b3JlIDAKbG9hZCAxCmFzc2VydApsb2FkIDAKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmV4dHJhY3QgMCAzMgpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKaW50Y18zIC8vIDMyCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMAppbnRjIDQgLy8gMzIwCmdldGJpdApmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDAKcHVzaGludCA0MSAvLyA0MQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDQKZnJhbWVfZGlnIDAKcHVzaGludCA0OSAvLyA0OQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDAKcHVzaGludCA1NyAvLyA1NwpleHRyYWN0X3VpbnQxNgpkaWcgMQpsZW4Kc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIC0yCj09CmFzc2VydApmcmFtZV9kaWcgMgppbnRjXzIgLy8gMTAwMDAwMAo9PQphc3NlcnQKZnJhbWVfZGlnIDMKaW50Y18xIC8vIDEKPT0KYXNzZXJ0CmZyYW1lX2RpZyA2CmV4dHJhY3QgMiAwCmJ5dGVjIDYgLy8gIlBlbmRpbmciCj09CmFzc2VydAppdHhuX2JlZ2luCmludGNfMSAvLyBwYXkKaXR4bl9maWVsZCBUeXBlRW51bQpmcmFtZV9kaWcgLTIKaXR4bl9maWVsZCBSZWNlaXZlcgpmcmFtZV9kaWcgLTEKaXR4bl9maWVsZCBBbW91bnQKaXR4bl9zdWJtaXQKcHVzaGJ5dGVzIDB4NDE3MDcwNzI2Zjc2NjU2NCAvLyAiQXBwcm92ZWQiCmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgNwpsZW4KaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgNwpjb25jYXQKZnJhbWVfYnVyeSA3CmZyYW1lX2RpZyAtMQpmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDIKaXRvYgpjb25jYXQKYnl0ZWMgNCAvLyAweDAwCmludGNfMCAvLyAwCmZyYW1lX2RpZyAzCnNldGJpdApjb25jYXQKZnJhbWVfZGlnIDQKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDcKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKZnJhbWVfYnVyeSAxMQpwdXNoaW50IDY3IC8vIDY3CmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgOAppdG9iCmNvbmNhdApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgLTIKYm94X2RlbApwb3AKZnJhbWVfZGlnIC0yCmZyYW1lX2RpZyAwCmJveF9wdXQKcmV0c3ViCgovLyByZWplY3RfY2xhaW0KcmVqZWN0Y2xhaW1fODoKcHJvdG8gMSAwCmJ5dGVjXzAgLy8gIiIKZHVwCmludGNfMCAvLyAwCmR1cG4gMwpieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmJ5dGVjXzAgLy8gIiIKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwCmZyYW1lX2RpZyAtMQpib3hfZ2V0CnN0b3JlIDMKc3RvcmUgMgpsb2FkIDMKYXNzZXJ0CmxvYWQgMgpmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKZXh0cmFjdCAwIDMyCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMAppbnRjXzMgLy8gMzIKZXh0cmFjdF91aW50NjQKZnJhbWVfYnVyeSAyCmZyYW1lX2RpZyAwCmludGMgNCAvLyAzMjAKZ2V0Yml0CmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgMApwdXNoaW50IDQxIC8vIDQxCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNApmcmFtZV9kaWcgMApwdXNoaW50IDQ5IC8vIDQ5CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNQpwdXNoYnl0ZXMgMHg1MjY1NmE2NTYzNzQ2NTY0IC8vICJSZWplY3RlZCIKZnJhbWVfYnVyeSA2CmZyYW1lX2RpZyA2CmxlbgppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyA2CmNvbmNhdApmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDAKcHVzaGludCA1OSAvLyA1OQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDcKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIDIKaXRvYgpjb25jYXQKYnl0ZWMgNCAvLyAweDAwCmludGNfMCAvLyAwCmZyYW1lX2RpZyAzCnNldGJpdApjb25jYXQKZnJhbWVfZGlnIDQKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDYKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKZnJhbWVfYnVyeSAxMQpwdXNoaW50IDY3IC8vIDY3CmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgNwppdG9iCmNvbmNhdApmcmFtZV9kaWcgMTEKY29uY2F0CmZyYW1lX2J1cnkgOAp0eG4gU2VuZGVyCmJveF9kZWwKcG9wCnR4biBTZW5kZXIKZnJhbWVfZGlnIDgKYm94X3B1dApyZXRzdWIKCi8vIHJldmlld19jbGFpbQpyZXZpZXdjbGFpbV85Ogpwcm90byAyIDAKZnJhbWVfZGlnIC0yCmZyYW1lX2RpZyAtMQpjYWxsc3ViIHdyaXRldG9kYXRhYm94XzQKcmV0c3ViCgovLyBzZW5kX3JlcXVlc3QKc2VuZHJlcXVlc3RfMTA6CnByb3RvIDkgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cG4gMwppbnRjXzAgLy8gMApkdXAKYnl0ZWNfMCAvLyAiIgpkdXAKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgpkdXBuIDIKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cG4gMgppbnRjXzAgLy8gMApkdXAKYnl0ZWNfMCAvLyAiIgpkdXBuIDMKaW50Y18wIC8vIDAKZHVwCmJ5dGVjXzAgLy8gIiIKZHVwbiAzCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cG4gMwppbnRjXzAgLy8gMApkdXAKYnl0ZWNfMCAvLyAiIgpkdXAKaW50Y18wIC8vIDAKdHhuIFNlbmRlcgpib3hfZ2V0CnN0b3JlIDUKc3RvcmUgNApsb2FkIDUKYXNzZXJ0CmxvYWQgNApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKcHVzaGludCA0MSAvLyA0MQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKcHVzaGludCA0OSAvLyA0OQpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIC04CmV4dHJhY3QgMiAwCmJ5dGVjXzAgLy8gIiIKIT0KYXNzZXJ0CmZyYW1lX2RpZyAtOQpmcmFtZV9kaWcgMQo+CmFzc2VydApmcmFtZV9kaWcgLTkKZnJhbWVfZGlnIDIKPD0KYXNzZXJ0CmJ5dGVjXzEgLy8gImJveF9uYW1lIgpmcmFtZV9kaWcgLTcKZXh0cmFjdCAyIDAKYXBwX2dsb2JhbF9wdXQKaW50YyA1IC8vIDE1NTMKdHhuYSBBcHBsaWNhdGlvbnMgMQo9PQphc3NlcnQKZnJhbWVfZGlnIC00CmZyYW1lX2J1cnkgMTAKZnJhbWVfZGlnIDEwCmZyYW1lX2J1cnkgOQpwdXNoaW50IDggLy8gOApmcmFtZV9idXJ5IDcKZnJhbWVfZGlnIDcKZnJhbWVfZGlnIDEwCmxlbgorCmZyYW1lX2J1cnkgOApmcmFtZV9kaWcgOApwdXNoaW50IDY1NTM2IC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA3Cml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIC0zCml0b2IKZXh0cmFjdCA0IDAKY29uY2F0CmZyYW1lX2RpZyAtMgpmcmFtZV9idXJ5IDEwCmZyYW1lX2RpZyA5CmZyYW1lX2RpZyAxMApjb25jYXQKZnJhbWVfYnVyeSA5CmZyYW1lX2RpZyA4CmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgNwppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgOQpjb25jYXQKZnJhbWVfYnVyeSA2CnR4bmEgQXBwbGljYXRpb25zIDAKZnJhbWVfYnVyeSAxMQpwdXNoYnl0ZXMgMHg3MjY1NzY2OTY1Nzc1ZjYzNmM2MTY5NmQyODYyNzk3NDY1NWI1ZDJjNjI3OTc0NjU1YjVkMjk3NjZmNjk2NCAvLyAicmV2aWV3X2NsYWltKGJ5dGVbXSxieXRlW10pdm9pZCIKZnJhbWVfYnVyeSAxMgpmcmFtZV9kaWcgMTIKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDEyCmNvbmNhdApmcmFtZV9idXJ5IDEyCmZyYW1lX2RpZyAxMQppdG9iCmZyYW1lX2RpZyAxMgpmcmFtZV9idXJ5IDE4CmZyYW1lX2RpZyAxOApmcmFtZV9idXJ5IDE3CnB1c2hpbnQgMTAgLy8gMTAKZnJhbWVfYnVyeSAxNQpmcmFtZV9kaWcgMTUKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDE3CmNvbmNhdApmcmFtZV9idXJ5IDE0CmludGNfMSAvLyAxCmZyYW1lX2J1cnkgMTkKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECmZyYW1lX2J1cnkgMjAKZnJhbWVfZGlnIDIwCml0b2IKZnJhbWVfYnVyeSAyMQpmcmFtZV9kaWcgLTUKaXRvYgpmcmFtZV9idXJ5IDI2Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmZyYW1lX2J1cnkgMzEKZnJhbWVfZGlnIDMxCmxlbgppbnRjXzMgLy8gMzIKPT0KYXNzZXJ0CmZyYW1lX2RpZyAzMQpmcmFtZV9idXJ5IDMyCmZyYW1lX2RpZyAtNwpmcmFtZV9idXJ5IDQyCmZyYW1lX2RpZyA0MgpmcmFtZV9idXJ5IDQxCnB1c2hpbnQgMTAgLy8gMTAKZnJhbWVfYnVyeSAzOQpmcmFtZV9kaWcgMzkKaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgMjAKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDQxCmNvbmNhdApmcmFtZV9idXJ5IDM4CmludGNfMSAvLyAxCmZyYW1lX2J1cnkgNDkKZnJhbWVfZGlnIDQ5Cml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDM4CmZyYW1lX2J1cnkgNDgKZnJhbWVfZGlnIDQ4CmZyYW1lX2J1cnkgNDcKcHVzaGludCAyIC8vIDIKZnJhbWVfYnVyeSA0NQpmcmFtZV9kaWcgNDUKaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgNDcKY29uY2F0CmNvbmNhdApmcmFtZV9idXJ5IDQ0Cml0eG5fYmVnaW4KcHVzaGludCA2IC8vIGFwcGwKaXR4bl9maWVsZCBUeXBlRW51bQppbnRjIDUgLy8gMTU1MwppdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKcHVzaGJ5dGVzIDB4NmY2YWU5OGIgLy8gInJlcXVlc3QoYnl0ZVtdLGJ5dGVbXSx1aW50NjQsYnl0ZVtdLHVpbnQ2NFtdLHVpbnQ2NFtdLGFkZHJlc3NbXSwoYnl0ZVtdLHVpbnQ2NClbXSl2b2lkIgppdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwpmcmFtZV9kaWcgNgppdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwpmcmFtZV9kaWcgMTQKaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKZnJhbWVfZGlnIDE5Cml0b2IKaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKZnJhbWVfZGlnIC02Cml0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCmZyYW1lX2RpZyAyMQppdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwpmcmFtZV9kaWcgMjYKaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKZnJhbWVfZGlnIDMyCml0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCmZyYW1lX2RpZyA0NAppdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIGdldF9wb2xpY3kKZ2V0cG9saWN5XzExOgpwcm90byAxIDEKYnl0ZWNfMCAvLyAiIgpmcmFtZV9kaWcgLTEKYm94X2dldApzdG9yZSA3CnN0b3JlIDYKbG9hZCA3CmFzc2VydApsb2FkIDYKZnJhbWVfYnVyeSAwCnJldHN1YgoKLy8gdXBkYXRlX2NvdmVyYWdlX2Ftb3VudAp1cGRhdGVjb3ZlcmFnZWFtb3VudF8xMjoKcHJvdG8gMSAwCnR4biBTZW5kZXIKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWMgNSAvLyAiY292ZXJhZ2VfYW1vdW50IgpmcmFtZV9kaWcgLTEKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyB1cGRhdGVfZXhwaXJhdGlvbl90aW1lbGluZQp1cGRhdGVleHBpcmF0aW9udGltZWxpbmVfMTM6CnByb3RvIDEgMAp0eG4gU2VuZGVyCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjXzMgLy8gInBvbGljeV9leHBpcmF0aW9uX2RhdGUiCmZyYW1lX2RpZyAtMQphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIG9wdF9pbl9nb3JhCm9wdGluZ29yYV8xNDoKcHJvdG8gMiAwCnR4biBTZW5kZXIKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CmFzc2VydAp0eG5hIEFzc2V0cyAwCmNhbGxzdWIgb3B0aW5hc3NldF8xCnR4bmEgQXBwbGljYXRpb25zIDEKY2FsbHN1YiBvcHRpbl8wCnJldHN1YgoKLy8gb3B0X2luX2Nhc3RlcgpvcHRpbmNhc3Rlcl8xNToKcHJvdG8gMCAwCmNhbGxzdWIgb3B0aW5fMgpyZXRzdWIKCi8vIHdyaXRlX3RvX2RhdGFfYm94X2Nhc3Rlcgp3cml0ZXRvZGF0YWJveGNhc3Rlcl8xNjoKcHJvdG8gMCAwCmJ5dGVjXzAgLy8gIiIKZHVwCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKZnJhbWVfYnVyeSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKZnJhbWVfYnVyeSAxCmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAxCmNhbGxzdWIgd3JpdGV0b2RhdGFib3hfNApyZXRzdWIKCi8vIGJvb3RzdHJhcF9jYXN0ZXIKYm9vdHN0cmFwY2FzdGVyXzE3Ogpwcm90byAwIDAKY2FsbHN1YiBib290c3RyYXBfNQpyZXRzdWIKCi8vIHB1cmNoYXNlX3BvbGljeV9jYXN0ZXIKcHVyY2hhc2Vwb2xpY3ljYXN0ZXJfMTg6CnByb3RvIDAgMAppbnRjXzAgLy8gMAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApmcmFtZV9kaWcgMApjYWxsc3ViIHB1cmNoYXNlcG9saWN5XzYKcmV0c3ViCgovLyBhcHByb3ZlX2NsYWltX2Nhc3RlcgphcHByb3ZlY2xhaW1jYXN0ZXJfMTk6CnByb3RvIDAgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKZnJhbWVfYnVyeSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKZnJhbWVfZGlnIDEKY2FsbHN1YiBhcHByb3ZlY2xhaW1fNwpyZXRzdWIKCi8vIHJlamVjdF9jbGFpbV9jYXN0ZXIKcmVqZWN0Y2xhaW1jYXN0ZXJfMjA6CnByb3RvIDAgMApieXRlY18wIC8vICIiCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmNhbGxzdWIgcmVqZWN0Y2xhaW1fOApyZXRzdWIKCi8vIHJldmlld19jbGFpbV9jYXN0ZXIKcmV2aWV3Y2xhaW1jYXN0ZXJfMjE6CnByb3RvIDAgMApieXRlY18wIC8vICIiCmR1cAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMApmcmFtZV9kaWcgMQpjYWxsc3ViIHJldmlld2NsYWltXzkKcmV0c3ViCgovLyBzZW5kX3JlcXVlc3RfY2FzdGVyCnNlbmRyZXF1ZXN0Y2FzdGVyXzIyOgpwcm90byAwIDAKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgpkdXBuIDIKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpmcmFtZV9idXJ5IDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpmcmFtZV9idXJ5IDEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpmcmFtZV9idXJ5IDIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNApmcmFtZV9idXJ5IDMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQpidG9pCmZyYW1lX2J1cnkgNAp0eG5hIEFwcGxpY2F0aW9uQXJncyA2CmZyYW1lX2J1cnkgNQp0eG5hIEFwcGxpY2F0aW9uQXJncyA3CmludGNfMCAvLyAwCmV4dHJhY3RfdWludDMyCmZyYW1lX2J1cnkgNgp0eG5hIEFwcGxpY2F0aW9uQXJncyA4CmZyYW1lX2J1cnkgNwp0eG5hIEFwcGxpY2F0aW9uQXJncyA5CmludGNfMCAvLyAwCmdldGJ5dGUKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAxCmZyYW1lX2RpZyAyCmZyYW1lX2RpZyAzCmZyYW1lX2RpZyA0CmZyYW1lX2RpZyA1CmZyYW1lX2RpZyA2CmZyYW1lX2RpZyA3CmZyYW1lX2RpZyA4CmNhbGxzdWIgc2VuZHJlcXVlc3RfMTAKcmV0c3ViCgovLyBnZXRfcG9saWN5X2Nhc3RlcgpnZXRwb2xpY3ljYXN0ZXJfMjM6CnByb3RvIDAgMApieXRlY18wIC8vICIiCmR1cAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpjYWxsc3ViIGdldHBvbGljeV8xMQpmcmFtZV9idXJ5IDAKcHVzaGJ5dGVzIDB4MTUxZjdjNzUgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1YgoKLy8gdXBkYXRlX2NvdmVyYWdlX2Ftb3VudF9jYXN0ZXIKdXBkYXRlY292ZXJhZ2VhbW91bnRjYXN0ZXJfMjQ6CnByb3RvIDAgMAppbnRjXzAgLy8gMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJ0b2kKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmNhbGxzdWIgdXBkYXRlY292ZXJhZ2VhbW91bnRfMTIKcmV0c3ViCgovLyB1cGRhdGVfZXhwaXJhdGlvbl90aW1lbGluZV9jYXN0ZXIKdXBkYXRlZXhwaXJhdGlvbnRpbWVsaW5lY2FzdGVyXzI1Ogpwcm90byAwIDAKaW50Y18wIC8vIDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpidG9pCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApjYWxsc3ViIHVwZGF0ZWV4cGlyYXRpb250aW1lbGluZV8xMwpyZXRzdWIKCi8vIG9wdF9pbl9nb3JhX2Nhc3RlcgpvcHRpbmdvcmFjYXN0ZXJfMjY6CnByb3RvIDAgMAppbnRjXzAgLy8gMApkdXAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCmZyYW1lX2J1cnkgMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKZnJhbWVfYnVyeSAxCmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAxCmNhbGxzdWIgb3B0aW5nb3JhXzE0CnJldHN1Yg==";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "opt_in", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "write_to_data_box", desc: "", args: [{ type: "byte[]", name: "response_type_bytes", desc: "" }, { type: "byte[]", name: "response_body_bytes", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "bootstrap", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "purchase_policy", desc: "", args: [{ type: "pay", name: "pay_txn", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "approve_claim", desc: "", args: [{ type: "address", name: "receiver_addr", desc: "" }, { type: "uint64", name: "coverage_amt", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "reject_claim", desc: "", args: [{ type: "address", name: "receiver_addr", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "review_claim", desc: "", args: [{ type: "byte[]", name: "response_type_bytes", desc: "" }, { type: "byte[]", name: "response_body_bytes", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "send_request", desc: "", args: [{ type: "uint64", name: "time_of_event", desc: "" }, { type: "string", name: "location_of_event", desc: "" }, { type: "byte[]", name: "box_name", desc: "" }, { type: "byte[]", name: "key", desc: "" }, { type: "uint64", name: "token_asset_id", desc: "" }, { type: "(uint32,byte[],uint64)[]", name: "source_arr", desc: "" }, { type: "uint32", name: "agg_method", desc: "" }, { type: "byte[]", name: "user_data", desc: "" }, { type: "application", name: "main_app_reference", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_policy", desc: "", args: [{ type: "address", name: "addr", desc: "" }], returns: { type: "(address,uint64,bool,uint64,uint64,string,uint64)", desc: "" } }),
        new algosdk.ABIMethod({ name: "update_coverage_amount", desc: "", args: [{ type: "uint64", name: "amt", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "update_expiration_timeline", desc: "", args: [{ type: "uint64", name: "expiration_timeline", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "opt_in_gora", desc: "", args: [{ type: "asset", name: "asset_reference", desc: "" }, { type: "application", name: "main_app_reference", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async opt_in(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.opt_in(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async write_to_data_box(args: {
        response_type_bytes: Uint8Array;
        response_body_bytes: Uint8Array;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.write_to_data_box({ response_type_bytes: args.response_type_bytes, response_body_bytes: args.response_body_bytes }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async bootstrap(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.bootstrap(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async purchase_policy(args: {
        pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.purchase_policy({ pay_txn: args.pay_txn }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async approve_claim(args: {
        receiver_addr: string;
        coverage_amt: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.approve_claim({ receiver_addr: args.receiver_addr, coverage_amt: args.coverage_amt }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async reject_claim(args: {
        receiver_addr: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.reject_claim({ receiver_addr: args.receiver_addr }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async review_claim(args: {
        response_type_bytes: Uint8Array;
        response_body_bytes: Uint8Array;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.review_claim({ response_type_bytes: args.response_type_bytes, response_body_bytes: args.response_body_bytes }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async send_request(args: {
        time_of_event: bigint;
        location_of_event: string;
        box_name: Uint8Array;
        key: Uint8Array;
        token_asset_id: bigint;
        source_arr: [
            bigint,
            Uint8Array,
            bigint
        ][];
        agg_method: bigint;
        user_data: Uint8Array;
        main_app_reference: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.send_request({ time_of_event: args.time_of_event, location_of_event: args.location_of_event, box_name: args.box_name, key: args.key, token_asset_id: args.token_asset_id, source_arr: args.source_arr, agg_method: args.agg_method, user_data: args.user_data, main_app_reference: args.main_app_reference }, txnParams));
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
        bigint
    ]>> {
        const result = await this.execute(await this.compose.get_policy({ addr: args.addr }, txnParams));
        return new bkr.ABIResult<[
            string,
            bigint,
            boolean,
            bigint,
            bigint,
            string,
            bigint
        ]>(result, result.returnValue as [
            string,
            bigint,
            boolean,
            bigint,
            bigint,
            string,
            bigint
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
    async opt_in_gora(args: {
        asset_reference: bigint;
        main_app_reference: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.opt_in_gora({ asset_reference: args.asset_reference, main_app_reference: args.main_app_reference }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        opt_in: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "opt_in"), {}, txnParams, atc);
        },
        write_to_data_box: async (args: {
            response_type_bytes: Uint8Array;
            response_body_bytes: Uint8Array;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "write_to_data_box"), { response_type_bytes: args.response_type_bytes, response_body_bytes: args.response_body_bytes }, txnParams, atc);
        },
        bootstrap: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "bootstrap"), {}, txnParams, atc);
        },
        purchase_policy: async (args: {
            pay_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "purchase_policy"), { pay_txn: args.pay_txn }, txnParams, atc);
        },
        approve_claim: async (args: {
            receiver_addr: string;
            coverage_amt: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "approve_claim"), { receiver_addr: args.receiver_addr, coverage_amt: args.coverage_amt }, txnParams, atc);
        },
        reject_claim: async (args: {
            receiver_addr: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "reject_claim"), { receiver_addr: args.receiver_addr }, txnParams, atc);
        },
        review_claim: async (args: {
            response_type_bytes: Uint8Array;
            response_body_bytes: Uint8Array;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "review_claim"), { response_type_bytes: args.response_type_bytes, response_body_bytes: args.response_body_bytes }, txnParams, atc);
        },
        send_request: async (args: {
            time_of_event: bigint;
            location_of_event: string;
            box_name: Uint8Array;
            key: Uint8Array;
            token_asset_id: bigint;
            source_arr: [
                bigint,
                Uint8Array,
                bigint
            ][];
            agg_method: bigint;
            user_data: Uint8Array;
            main_app_reference: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "send_request"), { time_of_event: args.time_of_event, location_of_event: args.location_of_event, box_name: args.box_name, key: args.key, token_asset_id: args.token_asset_id, source_arr: args.source_arr, agg_method: args.agg_method, user_data: args.user_data, main_app_reference: args.main_app_reference }, txnParams, atc);
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
        },
        opt_in_gora: async (args: {
            asset_reference: bigint;
            main_app_reference: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "opt_in_gora"), { asset_reference: args.asset_reference, main_app_reference: args.main_app_reference }, txnParams, atc);
        }
    };
}
