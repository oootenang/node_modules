import { getProfileName, parseKnownFiles } from "@aws-sdk/shared-ini-file-loader";
import { resolveProfileData } from "./resolveProfileData";
export const fromIni = (init = {}) => async () => {
    const profiles = await parseKnownFiles(init);
    return resolveProfileData(getProfileName(init), profiles, init);
};
