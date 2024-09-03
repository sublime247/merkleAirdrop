import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const KSHModule = buildModule("KSHModule", (m) => {

    const ksh = m.contract("KSH", );

    return { ksh };
});

export default KSHModule;
