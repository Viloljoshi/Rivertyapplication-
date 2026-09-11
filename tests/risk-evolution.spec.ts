import { expect, test } from "@playwright/test";

test("decision room prioritizes common platform primitives", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Make change safer." })).toBeVisible();
  await expect(page.getByText("Decision Ledger + replay", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: /CCD2 explanation/ }).click();
  await expect(page.getByRole("heading", { name: "CCD2 explanation + review flow" })).toBeVisible();
  await expect(page.getByText(/Reason taxonomy, evidence bundle/)).toBeVisible();
});

test("live decision changes customer action and reveals explanation", async ({ page }) => {
  await page.goto("/live-decision/");
  await expect(page.getByRole("heading", { name: "One checkout. More than yes or no." })).toBeVisible();
  await page.getByRole("button", { name: /Blanket reject/ }).click();
  await expect(page.getByRole("heading", { name: "Decline" })).toBeVisible();
  await page.getByRole("button", { name: /Conditional approval/ }).click();
  await expect(page.getByRole("heading", { name: "Approve with controls" })).toBeVisible();
  await page.getByRole("button", { name: /Preview customer explanation/ }).click();
  await expect(page.getByText(/We could not offer the full amount/)).toBeVisible();
});

test("portfolio and shadow simulations expose guardrails", async ({ page }) => {
  await page.goto("/portfolio/");
  const slider = page.getByLabel("Proposed limit");
  await slider.focus();
  await slider.press("End");
  await expect(page.getByText("Guardrail breached")).toBeVisible();

  await page.goto("/shadow-lab/");
  await page.getByRole("button", { name: "Global challenger" }).click();
  await expect(page.getByText(/SE new-customer regression/)).toBeVisible();
  await page.getByRole("button", { name: "Segmented release" }).click();
  await expect(page.getByText("Approve segmented ramp")).toBeVisible();
});

test("modernization rehearses a customer-safe fallback", async ({ page }) => {
  await page.goto("/modernization/");
  await page.getByRole("button", { name: "Fraud model down" }).click();
  await expect(page.getByText("Fraud model unavailable")).toBeVisible();
  await expect(page.getByText(/deterministic velocity policy/)).toBeVisible();
});

test("all routes render without horizontal overflow", async ({ page }, testInfo) => {
  const routes = ["/", "/live-decision/", "/portfolio/", "/shadow-lab/", "/modernization/", "/regulation/", "/roadmap/", "/why-me/", "/about/"];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow, `${route} overflows in ${testInfo.project.name}`).toBeFalsy();
  }
});
