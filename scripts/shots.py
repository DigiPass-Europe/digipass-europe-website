import sys, asyncio
from playwright.async_api import async_playwright
base = "http://localhost:3100"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--no-proxy-server"])
        ctx = await b.new_context(viewport={"width": 1440, "height": 900})
        pg = await ctx.new_page()
        # demo login as admin
        await pg.goto(base + "/en/login", wait_until="load")
        await pg.locator("form button", has_text="Association administrator").click()
        await pg.wait_for_url("**/en/portal**")
        await pg.screenshot(path="/tmp/portal.png", full_page=True)
        await pg.goto(base + "/en/portal/admin", wait_until="load"); await pg.screenshot(path="/tmp/portal-admin.png", full_page=True)
        for path, name, w in [("/en/membership","membership",1440),("/en/join","join",1440),("/fr/working-groups/testing-pilots-demonstrators","wg",1440),("/en/members?country=AT","members",1440),("/en/events","events-m",390)]:
            p2 = await b.new_page(viewport={"width": w, "height": 900}); await p2.goto(base + path, wait_until="load"); await p2.screenshot(path=f"/tmp/{name}.png", full_page=True); await p2.close()
        await b.close()
asyncio.run(main())
