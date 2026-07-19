const fs = require('fs');

async function download() {
    const url = "https://www.instagram.com/reel/DVOOAHaku8N/";
    console.log("Fetching...");
    try {
        const res = await fetch("https://api.cobalt.tools/api/json", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Origin": "https://cobalt.tools",
                "Referer": "https://cobalt.tools/"
            },
            body: JSON.stringify({ url: url })
        });
        const data = await res.json();
        if (data.status === 'error' || !data.url) {
            console.error("Failed:", data);
            return;
        }
        console.log("Found URL:", data.url);
        const vidRes = await fetch(data.url);
        const buffer = await vidRes.arrayBuffer();
        fs.writeFileSync("src/assets/our_beautiful_dream.mp4", Buffer.from(buffer));
        console.log("Done");
    } catch (e) {
        console.error(e);
    }
}
download();
