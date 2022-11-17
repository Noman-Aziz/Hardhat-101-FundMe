const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Would only be deployed on local node of hardhat and not live testnet
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")

        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })

        log("Mocks deployed!")
        log("--------------------------------------------------")
    }
}

// run only when we specify these tags in deploy command i.e `yarn hardhat deploy --tags mocks`
module.exports.tags = ["all", "mocks"]
