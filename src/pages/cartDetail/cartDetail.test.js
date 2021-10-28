import { render, screen } from "@testing-library/react";
import CartDetail from ".";

it("should render an empty cart", () => {
  render(<CartDetail />);
  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});
