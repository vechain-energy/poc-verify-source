const hre = require("hardhat");

async function main() {
  console.log("Deploying Echo...");
  await hre.run('compile');

  const Echo = await hre.thor.getContractFactory("Echo");
  const echo = await Echo.deploy();

  await echo.deployed();
  console.log("Echo deployed to:", echo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });