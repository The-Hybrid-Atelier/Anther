"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supabaseClient_ts_1 = require("./supabaseClient.ts");
var _a = await supabaseClient_ts_1.supabase
    .from("stats_and_tfpdf")
    .select("*")
    .eq("domain", "candle making")
    .order("tfpdf", { ascending: false })
    .range(0, 50), data = _a.data, error = _a.error;
if (error) {
    console.log(error);
}
if (data) {
    console.log(data);
}
