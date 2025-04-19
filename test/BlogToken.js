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
      let transaction = await blogToken.safeMint(user.address, "test-uri");
      await transaction.wait();

      expect(await blogToken.balanceOf(user.address)).to.equal(1);
    });

    it("Should mint the correct URI", async () => {
      let transaction = await blogToken.mint(user.address, "test-uri");
      await transaction.wait();

      const tokenId = 0; // Assuming it's the first token minted
      const tokenUri = await blogToken.tokenURI(tokenId);
      expect(tokenUri).to.equal("ipfs://test-uri");
  });

    it("Should emit an event once a blog is minted", async() => {
        let transaction = await blogToken.mint(user.address, "ipfs-uri")
        let receipt = await transaction.wait()
        
        let block = await ethers.provider.getBlock(receipt.blockNumber)

        await expect(transaction).to.emit(blogToken, "BlogMinted").withArgs(user.address, 0, block.timestamp,"ipfs-uri")
    })


    it("Should only allow the owner to mint", async () => {
      await expect(blogToken.connect(user).safeMint(user.address, "uri")).to.be
        .reverted;
    });
  });
});
