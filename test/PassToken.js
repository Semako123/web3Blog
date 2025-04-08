const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("A web3 blogging platform", () => {
    let passToken, signer, user

  beforeEach(async () => {
    [signer, user] = await ethers.getSigners();
    const PassToken = await ethers.getContractFactory("PassToken")
    passToken = await PassToken.deploy(signer.address)
  });

  describe("Deployment", () => {
    it("Properly mints the passToken for user", async () => {
        let mint = await passToken.safeMint(user, "uri");
        await mint.wait()

        expect(await passToken.balanceOf(user)).to.equal(1)
    })
    
    it("Tests if only the owner can mint", async () => {
        await expect(
          passToken.connect(user).safeMint(user, "uri")
        ).to.be.reverted;
    })    
  });
});
