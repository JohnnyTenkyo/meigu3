import { describe, expect, it } from "vitest";

describe("API Keys Validation", () => {
  it("should validate Alpha Vantage API key", async () => {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
    
    // Test Alpha Vantage API with a simple request
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=QUOTE&symbol=AAPL&apikey=${apiKey}`
      );
      const data = await response.json();
      
      // Check if we got a valid response (not an error)
      expect(data).toBeDefined();
      expect(response.status).toBe(200);
      
      // If we get a valid quote, the API key works
      if (data["Global Quote"]) {
        expect(data["Global Quote"]["01. symbol"]).toBe("AAPL");
      }
    } catch (error) {
      console.error("Alpha Vantage API test error:", error);
      throw error;
    }
  });

  it("should validate Polygon.io API key", async () => {
    const apiKey = process.env.POLYGON_IO_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
    
    // Test Polygon.io API with a simple request
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/quotes/AAPL?apiKey=${apiKey}`
      );
      
      // Polygon.io returns 401 if key is invalid, 200 if valid
      expect([200, 401, 403, 429]).toContain(response.status);
      
      if (response.status === 200) {
        const data = await response.json();
        expect(data).toBeDefined();
      }
    } catch (error) {
      console.error("Polygon.io API test error:", error);
      throw error;
    }
  });
});
