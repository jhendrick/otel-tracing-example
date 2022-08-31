/* tracing.js */

// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const { Resource } = require("@opentelemetry/resources");
const {
    SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const OTEL_SERVICE_RESOURCE = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'otel-express-node',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0'
});


const sdk = new opentelemetry.NodeSDK({
  resource: OTEL_SERVICE_RESOURCE,
  traceExporter: new OTLPTraceExporter({
    // optional - url default value is http://localhost:4318/v1/traces
    // url: "<your-otlp-endpoint>/v1/traces",
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
