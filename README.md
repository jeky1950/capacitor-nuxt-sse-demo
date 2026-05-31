# Using Server-Sent Events (SSE) in Capacitor 8 with Nuxt 4

Using Server-Sent Events using [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) or microsoft's popular [fetchEventSource](https://github.com/Azure/fetch-event-source) library does work in Capacitor 8 as was clearly detailed in [#6582](https://github.com/ionic-team/capacitor/issues/6582).

Special thanks to the brilliant work done by the [chatboxai](https://github.com/chatboxai) team for their library [capacitor-stream-http](https://github.com/chatboxai/capacitor-stream-http) and for [mbmaas3-tech](https://www.jsdelivr.com/?query=author%3A%20mbmaas3-tech) who forked it and updated it to support Capacitor 8 with [capacitor-stream-http-v2](https://www.jsdelivr.com/package/npm/capacitor-stream-http-v2).

This is a demostration repo on how to do Server-Sent Events (SSE) in Capacitor 8 using Nuxt 4 (You can achieve the same with other Vite based frameworks).

### Step 1
Clone the repo
```
git clone https://github.com/jeky1950/capacitor-nuxt-sse-demo.git
```

## Step 2
Install packages
```
npm Install
```

## Step 3
Sync the capacitor plugins
```
npx cap sync
```

### Step 4
Build the static files 
```
npm run generate
```

### Step 5
Copy the static files to Capacitor
```
npx cap copy
```

### Step 6
Open Android Studio (or Xcode if you are building for iOS)
```
npx cap open android
```

### Step 7
Run the app in Android Studio (or Xcode if you are building for iOS)

### Step 8
Switch on the Nuxt Development Server with the public flag
```
npx nuxi dev --public
```
Make sure that the `Network` url on the command line output matches the `url` ref on line 18 in file `/app/pages/index.vue`

### App Structure
On the app there are two buttons, the one on the left demostrates the current functionality of trying the use SSE in Capacitor 8 that is detailed in [#6582](https://github.com/ionic-team/capacitor/issues/6582). The button on the right shows SSE working with the help of [capacitor-stream-http-v2](https://www.jsdelivr.com/package/npm/capacitor-stream-http-v2).
