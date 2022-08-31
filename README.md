# otel-tracing-example

This is an example of how to setup and configure [OpenTelemetry](https://opentelemetry.io) within a sample Node.js application. This example uses [Jaeger](https://www.jaegertracing.io/) as the tracing backend and requires [Docker](https://www.docker.com/).

To run OpenTelemetry with this example, complete the following steps:

1) Clone this repository and cd to the directory

2) Install the express and axios npm modules used in this example:
```
npm install express
npm install axios
```

3) Run the application to make sure it runs correctly
```
node app.js
```
You should see ```Listening for requests on http://localhost:8080``` as the output. Validate it works in a browser, then stop it.

4) Install the OpenTelemetry tracing modules
```
npm install @opentelemetry/sdk-node @opentelemetry/api @opentelemetry/auto-instrumentations-node
```

5) Next, to send trace data to a OTLP endpoint like Jaeger, install the trace exporter dependency
```
npm install --save @opentelemetry/exporter-trace-otlp-http
```

6) Run the application again using the ```--require``` flag to load the tracing code before the application code
```
node --require './tracing.js' app.js
```
Validate it starts as expected.

7) To try out the trace exporter, run Jaegar:
```
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

8) Run the application again using the ```--require``` flag
```
node --require './tracing.js' app.js
```

9) Open a browser to http://localhost:8080 or refresh the page if you have it open. Trace data should now be exported to Jaegar.

10) Open Jaeger at http://localhost:16686. In the Jaegar UI Search screen, look for the service called ```otel-express-node``` under the 'Service' dropdown. Select it and click 'Find Traces' to view the trace. Click on one of the trace results to view the trace spans.
