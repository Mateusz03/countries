describe("test", () => {
  it("passes", () => {
    const newLocal = "http://localhost:3000";
    cy.visit(newLocal);
    cy.get(":nth-child(2) > .sc-csuSiG > .sc-jrcTuL").type(32);
    cy.intercept("POST", "http://localhost:3002/countries/table").as("table");
    cy.wait("@table").its("response.body");
    cy.get(".sc-eDWCr").click();
    cy.get(":nth-child(3) > .sc-csuSiG > .sc-jrcTuL").should("not.have.value");
    cy.get(":nth-child(2) > .sc-csuSiG > .sc-kDvujY").click();
    cy.wait(500);
    cy.get(".sc-iBYQkv > :nth-child(10)").click();
    cy.get(".sc-ksBlkl").click("left");
    cy.get(":nth-child(3) > .sc-csuSiG > .sc-kDvujY").click();
    cy.wait(500);
    cy.get(".sc-iBYQkv > :nth-child(2)").click();
    cy.get(".sc-ksBlkl").click("left");
    cy.wait(1000);
    cy.get(".sc-eDWCr").click();
  });
});
