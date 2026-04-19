const describeE2E = process.env.RUN_E2E === "1" ? describe : describe.skip;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describeE2E("API (e2e)", () => {
  const baseUrl = process.env.E2E_BASE_URL ?? "http://localhost:3003";

  it("serves swagger UI", async () => {
    const response = await fetch(`${baseUrl}/api-docs/`);
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toContain("Swagger UI");
  });

  it("returns products list", async () => {
    const response = await fetch(`${baseUrl}/products`);
    const body = (await response.json()) as { data: Array<{ id: string }> };

    expect(response.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(typeof body.data[0]?.id).toBe("string");
    expect(body.data[0]?.id).toMatch(uuidPattern);
  });
});
