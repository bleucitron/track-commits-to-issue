import { cli } from "@testlib/cli";
import { saveToken, deleteToken, getToken } from "@testlib/token";
import { checkRepo } from "@tracker";

const params = {
    token: getToken(),
    srcOwner: "sveltejs",
    srcRepo: "svelte.dev",
    srcDirs: [
        "apps/svelte.dev/content/docs/svelte/01-introduction",
        "apps/svelte.dev/content/docs/svelte/02-runes",
    ],
    dstOwner: "bleucitron",
    dstRepo: "track-commits-to-issue",
    return: true,
};

const prog = cli();

prog.command("main", async () => {
    const result = await checkRepo(params);
    console.log(result);
});

prog.command("save-token", (token) => {
    if (!token)
        prog.error(
            "You mast provide a token value: npm run token:save <token>",
        );
    saveToken(token);
});

prog.command("clear-token", deleteToken);

prog.run();
