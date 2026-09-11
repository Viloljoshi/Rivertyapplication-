import { expect, test } from "@playwright/test";

test("decision room prioritizes common platform primitives", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Make change safer." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "An interactive Product Management Lead work sample." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose the question you want to test" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start this path" }).first()).toBeVisible();
  await expect(page.getByText("2 squads")).toHaveCount(0);
  await expect(page.getByText("PL", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Decision Ledger + replay", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Start guided tour" }).click();
  await expect(page.getByRole("dialog", { name: "Begin with the decision, not the dashboard." })).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("heading", { name: "Follow one checkout from signals to customer action." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Live Decision" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  const help = page.getByRole("button", { name: "More information about Decide" });
  await help.focus();
  await expect(page.getByRole("tooltip").filter({ hasText: "Use this path to discuss product judgment" })).toBeVisible();
  await help.press("Escape");

  await page.getByRole("button", { name: /CCD2 explanation/ }).click();
  await expect(page.getByRole("heading", { name: "CCD2 explanation + review flow" })).toBeVisible();
  await expect(page.getByText(/Reason taxonomy, evidence bundle/)).toBeVisible();
});

test("research basis connects public signals to product responses", async ({ page }) => {
  await page.goto("/about/");
  await expect(page.getByRole("heading", { name: "The case for safer change." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "From signal to product response" })).toBeVisible();
  await expect(page.getByText("The mandate is broader than model performance.")).toBeVisible();
  await expect(page.getByText(/Treat decision change as a product surface/)).toBeVisible();
  await expect(page.getByText("What is inferred")).toHaveCount(0);
  await expect(page.getByText("Prototype use")).toHaveCount(0);
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
