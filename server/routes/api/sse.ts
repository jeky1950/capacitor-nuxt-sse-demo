export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Setup SSE
    const stream = createEventStream(event);
    let stream_id = 0;

    // Setup SSE response header
    setResponseHeader(event, 'Content-Type', 'text/event-stream');
    setResponseHeader(event, 'Cache-Control', 'no-cache');
    setResponseHeader(event, 'Connection', 'keep-alive');
    
    stream.push({
        id: String(stream_id++),
        event: "update",
        data: JSON.stringify(body)
    });
    
    const interval = setInterval(async () => {
        stream.push({
            id: String(stream_id++),
            event: "update",
            data: Date.now().toString()
        });

        if(stream_id > 5) {
            clearInterval(interval)
            stream.close()
        }
    }, 2000)

    stream.onClosed(() => clearInterval(interval))

    return stream.send()
})