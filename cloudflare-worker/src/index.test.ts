import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return a valid hash", async () => {
		const resp = await worker.fetch('/test');
		if (resp) {
			const text = await resp.text();
			expect(text).toMatchInlineSnapshot(`"0x11a91952fb6afaa68ca64768a26c2d70f3a88e852614e29c5a12bd95c34e49df1ff01b3a808d0962d95531f2e5a8fbcd732f4c12f96e789136dbc9fa6c23a0131b"`);
		}
	});
});
