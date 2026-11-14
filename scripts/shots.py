import sys, asyncio
from playwright.async_api import async_playwright
base = "http://localhost:3100"
shots = [a.split("@") for a in sys.argv[1:]]  # path@width@name
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--no-proxy-server","--disable-background-networking"])
        for path, w, name in shots:
            pg = await b.new_page(viewport={"width": int(w), "height": 900})
            await pg.goto(base + path, wait_until="load")
            await pg.screenshot(path=f"/tmp/{name}.png", full_page=True)
            await pg.close()
        await b.close()
asyncio.run(main())
