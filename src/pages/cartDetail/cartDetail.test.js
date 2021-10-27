import { render, screen } from "@testing-library/react";
import CartDetail from ".";

test("should render an empty cart", () => {
  render(<CartDetail />);
  screen.getByText(/cart is empty/i);
});
