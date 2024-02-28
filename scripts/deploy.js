const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("contractV1");
  const proxy = await upgrades.deployProxy(BoxV1, [123]);
  // await proxy.waitForDeployment();

  console.log(proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });