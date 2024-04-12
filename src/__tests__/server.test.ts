import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");
describe("connectDB", () => {
  it("should handle database conection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("Hubo un error al conectar a la Base de datos")
      );
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la Base de datos")
    );
  });
});
