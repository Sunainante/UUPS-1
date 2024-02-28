const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

async function main() {
  
  const contractV2 = await ethers.getContractFactory("contractV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, contractV2);

  console.log(upgraded.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });