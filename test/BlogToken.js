const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlogToken", () => {
  let blogToken, user, owner;
  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const BlogToken = await ethers.getContractFactory("BlogToken");
    blogToken = await BlogToken.deploy(owner.address);
  });

  describe("Deployment", () => {
    it("Should mint the token to a user", async () => {
      let transaction = await blogToken.safeMint(user.address, "uri");
      await transaction.wait();

      expect(await blogToken.balanceOf(user.address)).to.equal(1);
    });

    it("Should only allow the owner to mint", async () => {
      await expect(blogToken.connect(user).safeMint(user.address, "uri")).to.be
        .reverted;
    });
  });
});
