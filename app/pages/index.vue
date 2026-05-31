<template>
    <main style="display: flex; width: 100vw; height: 100vh;">
        <div style="margin: auto;">
            <div style="text-align: center;">{{ is_loading ? 'Loading...' : 'Not Running' }}</div>
            <div>{{ data }}</div>
            <button @click="open">Click</button>
            <button @click="openWith">Click with Capacitor Plugin</button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { StreamHttp } from 'capacitor-stream-http-v2';

const data = ref()
const is_loading = ref(false)
const url = ref('http://192.168.100.4:3000/api/sse');

const open = async () => {
    // Create an AbortController Instance
    const controller = new AbortController();

    // Obtain a reference to the AbortSignal
    const signal = controller.signal;

    try {
        is_loading.value = true;
        await fetchEventSource(url.value, {
            openWhenHidden: true,
            method: 'POST',
            body: JSON.stringify({
                date: Date.now()
            }),
            headers: {
                "Accept": "text/event-stream",
                "Content-Type": "application/json;charset=UTF-8"
            },
            signal,
            onmessage(ev) {
                data.value = ev
            },
            onerror(err) {
                alert(err);
                is_loading.value = false
                throw err; // rethrow to stop the operation
            },
            onclose() {
                controller.abort();
                is_loading.value = false
                alert('Closed')
            },
        });
    } catch(error) {
        console.error(error);
        alert(error)
    }
}

let CapacitorStream;
const openWith = async () => {
    CapacitorStream = await StreamHttp.startStream({
        url: url.value,
        method: 'POST',
        headers: {
            "Accept": "text/event-stream",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ date: Date.now() })
    });
}

onMounted(async () => {
    // Listen for chunks
    await StreamHttp.addListener('chunk', (_data) => {
        console.log('Received chunk:', _data.chunk);
        data.value = _data;
    });

    // Listen for stream end
    await StreamHttp.addListener('end', (data) => {
        console.log('Stream ended');
        console.log(data)
        alert('Stream Ended')
    });

    // Listen for errors
    await StreamHttp.addListener('error', (data) => {
        console.error('Stream error:', data.error);
        alert(JSON.stringify(data))
    });
})
</script>