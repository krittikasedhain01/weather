import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

import "isomorphic-fetch";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (_req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds",
          },
        ],
        main: {
          // temp in Kelvin
          temp: 295.372,
        },
      }),
    );
  }),
);

describe("City Weather", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("It shoud render weather data correctly", async () => {
    const { container } = render(<IndexPage />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/Weather Search/i);
    await user.type(input, "New York");
    expect(input.value).toBe("New York");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        /new york/i,
      );
      expect(screen.getByText(/temperature: 72/i)).toBeDefined();
      expect(screen.getByText(/Overcast clouds/i)).toBeDefined();
    });
  });
});
