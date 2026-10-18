import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import DemlabLanding from "@/components/demlab/DemlabLanding";

const { addToCart } = vi.hoisted(() => ({ addToCart: vi.fn() }));
vi.mock("@/demlab/context/CartContext", () => ({ useCart: () => ({ addToCart }) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
}));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
describe("Premium landing interactions", () => {
  it("adds the selected package using the existing cart", () => {
    render(<DemlabLanding />);
    fireEvent.click(screen.getByRole("button", { name: "20 L" }));
    fireEvent.click(screen.getByRole("button", { name: /Sepete Ekle/ }));
    expect(addToCart).toHaveBeenCalledWith(
      expect.objectContaining({ size: "20 L HDPE Bidon", price: 5500 }),
    );
  });
  it("switches between day and night delivery images", () => {
    render(<DemlabLanding />);
    fireEvent.click(screen.getByRole("button", { name: "Gündüz" }));
    expect(screen.getByAltText(/gündüz temsili sahnesi/)).toHaveAttribute(
      "src",
      "/images/demlab/courier-day.webp",
    );
    fireEvent.click(screen.getByRole("button", { name: "Gece" }));
    expect(screen.getByAltText(/yağmurlu gece temsili sahnesi/)).toHaveAttribute(
      "src",
      "/images/demlab/courier-night.webp",
    );
  });
  it("changes campaign artwork and expands FAQ answers", () => {
    render(<DemlabLanding />);
    fireEvent.click(screen.getByRole("button", { name: /Demlab manifestosu/ }));
    expect(screen.getByAltText("Demlab kampanya afişi: Demlab manifestosu")).toHaveAttribute(
      "src",
      "/images/demlab/manifesto.webp",
    );
    const question = screen.getByRole("button", { name: /Parti analiz belgesine/ });
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Ambalajınızdaki lot numarasıyla/)).toBeVisible();
  });
});
