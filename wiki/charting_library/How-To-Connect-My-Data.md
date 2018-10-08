**The Charting Library does NOT include market data.** You must provide your own data in the required format. Quandl historical data is used as a sample. The charts can receive data in two ways:

1. Update in real-time with a PUSH type connection, for example through WebSocket.
    This way your charts will autoupdate with new prices when they arrive.
    To achieve this, you have to use the [JavaScript API](wiki/charting_library/JS-Api.md) and have your own transport method ready.

1. Update on a PULL/pulse/refresh basis (like most web-based charts today),
    where the chart data is updating every X number of seconds (the chart client will ask the server emulating PUSH updates),
    or only get reloaded manually by the user. For this, use the [UDF protocol](wiki/charting_library/UDF.md) and write your own datafeed wrapper.

### JavaScript API or UDF

![images/udf_or_jsapi.png](wiki/charting_library/images/udf_or_jsapi.png.md)

## UDF scheme

![images/udf.png](wiki/charting_library/images/udf.png.md)

## JSAPI scheme

![images/jsapi.png](wiki/charting_library/images/jsapi.png.md)

The pictures above illustrate the difference between UDF and JSAPI. Mandatory Charting Library parts are colored blue. Red parts (default data transport) are included in default package (having non-minimized source code) and may be replaced. You may see the default data transport implements JS API to interact with the chart. Also, default transport implements UDF protocol to communicate with a server.

1. **If you already have a data transport ready** (websocket streaming, pulling, or any other transport),
    or if you don’t but need streaming data - use our [JavaScript API](wiki/charting_library/JS-Api.md), which is extremely compact and simple to implement.
    You will have to create a small **client-side data adapter** between your data transport and our charts using JavaScript.

1. **If you don’t have any transports** and do not need streaming data (e.g., data pulsing is all you need),
    then you will have to create (or use) at least a thin server-side datafeed wrapper.
    You may use any language and technology for this purpose: it’s just necessary for your wrapper to support our data exchange protocol (we call it [UDF](wiki/charting_library/UDF.md)) to be able to feed your Charting Library with data.
    You will have to create a small **server-side data adapter** between your back-end and our charts using your favorite language.

### Examples

A sample implementation of **UDF-compatible** (case #2 described below) server-side wrapper is available [on github](wiki/charting_library/https://github.com/tradingview/yahoo_datafeed.md). It uses Quandl data.

A sample of **JS API** implementation (and UDF client-side at the same time) is a part of Charting Library package (see */datafeeds/udf/* folder).
