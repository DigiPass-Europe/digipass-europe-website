import sys, asyncio
from playwright.async_api import async_playwright
base = "http://localhost:3100"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--no-proxy-server"])
        for w in (390, 820, 1440):
            for path, name in [("/en","home"),("/en/membership","membership")]:
                pg = await b.new_page(viewport={"width": w, "height": 900}); await pg.goto(base+path, wait_until="load"); await pg.screenshot(path=f"/tmp/{name}-{w}.png", full_page=False); await pg.close()
        await b.close()
asyncio.run(main())
