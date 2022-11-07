import { ethers } from "hardhat";

async function main() {
  const StudentSocietyDAO = await ethers.getContractFactory("StudentSocietyDAO");
  const studentSocietyDAO = await StudentSocietyDAO.deploy();
  await studentSocietyDAO.deployed();
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = await StudentSocietyDAO.deploy();
  await myERC20.deployed();
  console.log(`StudentSocietyDAO deployed to ${studentSocietyDAO.address}`);
  console.log(`MyERC20 deployed to ${myERC20.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
